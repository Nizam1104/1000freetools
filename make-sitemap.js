#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Configuration - Update this with your actual domain
const DOMAIN = "https://1000freetools.com"; // Replace with your actual domain
const CHANGE_FREQ = "weekly";
const PRIORITY = {
  home: 1.0,
  category: 0.9,
  tools: 0.8,
};

// Function to read the text tools registry and extract slugs
function getTextToolSlugs() {
  try {
    const registryPath = path.join(
      __dirname,
      "components",
      "text-tools",
      "utils",
      "text-tools-registry.ts",
    );
    const registryContent = fs.readFileSync(registryPath, "utf8");

    // Extract slugs from the registry using regex
    const slugMatches = registryContent.match(/"([^"]+)":\s*{/g);
    const slugs = [];

    if (slugMatches) {
      for (const match of slugMatches) {
        const slug = match.match(/"([^"]+)":/)[1];
        slugs.push(slug);
      }
    }

    return slugs;
  } catch (error) {
    console.warn("Warning: Could not read text tools registry:", error.message);
    return [];
  }
}

// Function to recursively find all page files in the app directory
function findPageFiles(dir, rootDir = dir, pages = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      // Skip . directories (like .next, .git, etc.) and node_modules
      if (!item.startsWith(".") && item !== "node_modules") {
        findPageFiles(itemPath, rootDir, pages);
      }
    } else if (
      item === "page.tsx" ||
      item === "page.jsx" ||
      item === "page.js"
    ) {
      // Found a page file, add its path to the pages array
      pages.push(itemPath);
    }
  }

  return pages;
}

// Function to convert file paths to URL routes
function convertPathToRoute(filePath, appDir) {
  // Get the relative path from the app directory
  const relativePath = path.relative(appDir, filePath);

  // Remove the filename (page.tsx/jsx/js) to get the directory path
  const dirPath = path.dirname(relativePath);

  // Convert path separators to URL format and handle special cases
  let route = dirPath
    .replace(/\\/g, "/") // Convert Windows path separators to forward slashes
    .replace(/^(\.\.[\/\\])+/, "") // Remove any leading ../
    .replace(/\/+$/, ""); // Remove trailing slashes

  // Handle root page
  if (route === "" || route === ".") {
    return "/";
  }

  // Ensure the route starts with a slash
  if (!route.startsWith("/")) {
    route = "/" + route;
  }

  return route;
}

function generateUrlEntry(url, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateSitemap() {
  const currentDate = new Date().toISOString().split("T")[0];

  // Find all page files in the app directory
  const appDir = path.join(__dirname, "app");
  const pageFiles = findPageFiles(appDir);

  // Get text tool slugs from the registry
  const textToolSlugs = getTextToolSlugs();

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Add homepage
  sitemap +=
    generateUrlEntry(DOMAIN, currentDate, CHANGE_FREQ, PRIORITY.home) + "\n\n";

  // Add all pages found in the app directory
  for (const pageFile of pageFiles) {
    const route = convertPathToRoute(pageFile, appDir);

    // Skip the homepage and dynamic routes
    if (route === "/" || route.includes("[") || route.includes("]")) {
      continue;
    }

    // Determine priority based on route characteristics
    let priority = PRIORITY.tools;
    if (route.includes("/tools") || route.includes("/category")) {
      priority = PRIORITY.category;
    }

    sitemap +=
      generateUrlEntry(
        `${DOMAIN}${route}`,
        currentDate,
        CHANGE_FREQ,
        priority,
      ) + "\n\n";
  }

  // Add dynamic text tool routes
  for (const slug of textToolSlugs) {
    sitemap +=
      generateUrlEntry(
        `${DOMAIN}/text-tools/${slug}`,
        currentDate,
        CHANGE_FREQ,
        PRIORITY.tools,
      ) + "\n\n";
  }

  sitemap += `</urlset>`;

  return sitemap;
}

function saveSitemap(sitemapContent) {
  // Save to public directory so it's accessible at https://yourdomain.com/sitemap.xml
  const publicPath = path.join(__dirname, "public", "sitemap.xml");

  fs.writeFileSync(publicPath, sitemapContent, "utf8");
  console.log(`✅ Sitemap generated successfully at: ${publicPath}`);
  console.log(`🌐 Accessible at: ${DOMAIN}/sitemap.xml`);
}

function main() {
  try {
    console.log("🔧 Generating sitemap...");

    // Get text tool slugs for stats
    const textToolSlugs = getTextToolSlugs();
    console.log(`📝 Found ${textToolSlugs.length} text tools in registry`);

    const sitemapContent = generateSitemap();
    saveSitemap(sitemapContent);

    // Print stats - count the number of URLs in the sitemap
    // Count <url> tags to get the actual number of URLs
    const urlCount = (sitemapContent.match(/<url>/g) || []).length;
    console.log(
      `📊 Sitemap contains ${urlCount} URLs (including ${textToolSlugs.length} dynamic text tool routes)`,
    );
    console.log("🚀 Ready to submit to Google Search Console!");
  } catch (error) {
    console.error("❌ Error generating sitemap:", error.message);
    process.exit(1);
  }
}

// Run the script
main();
