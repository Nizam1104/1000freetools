#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Configuration - Update this with your actual domain
const DOMAIN = "https://1000freetools.com"; // Replace with your actual domain
const CHANGE_FREQ = "monthly";
const PRIORITY = {
  home: 1.0,
  category: 0.9,
  tools: 0.8,
};

// Function to read existing sitemap and extract lastmod dates
function getExistingLastmodDates() {
  const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
  try {
    if (!fs.existsSync(sitemapPath)) {
      return {};
    }
    const sitemapContent = fs.readFileSync(sitemapPath, "utf8");
    const lastmodMap = {};

    // Extract <url> entries and their lastmod dates
    const urlRegex =
      /<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]*)<\/lastmod>/g;
    let match;
    while ((match = urlRegex.exec(sitemapContent)) !== null) {
      const url = match[1];
      const lastmod = match[2];
      lastmodMap[url] = lastmod;
    }

    return lastmodMap;
  } catch (error) {
    console.warn("Warning: Could not read existing sitemap:", error.message);
    return {};
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

  // Get existing lastmod dates from the current sitemap
  const existingLastmodDates = getExistingLastmodDates();

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Add homepage
  const homepageLastmod = existingLastmodDates[DOMAIN] || currentDate;
  sitemap +=
    generateUrlEntry(DOMAIN, homepageLastmod, CHANGE_FREQ, PRIORITY.home) +
    "\n\n";

  // Add all pages found in the app directory
  for (const pageFile of pageFiles) {
    const route = convertPathToRoute(pageFile, appDir);

    // Skip the homepage and dynamic routes
    if (route === "/" || route.includes("[") || route.includes("]")) {
      continue;
    }

    const url = `${DOMAIN}${route}`;
    // Use existing lastmod if available, otherwise use current date for new pages
    const lastmod = existingLastmodDates[url] || currentDate;

    // Determine priority based on route characteristics
    let priority = PRIORITY.tools;
    if (route.includes("/tools") || route.includes("/category")) {
      priority = PRIORITY.category;
    }

    sitemap += generateUrlEntry(url, lastmod, CHANGE_FREQ, priority) + "\n\n";
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

    const sitemapContent = generateSitemap();
    saveSitemap(sitemapContent);

    // Print stats - count the number of URLs in the sitemap
    const urlCount = (sitemapContent.match(/<url>/g) || []).length;
    console.log(`📊 Sitemap contains ${urlCount} URLs`);
    console.log("🚀 Ready to submit to Google Search Console!");
  } catch (error) {
    console.error("❌ Error generating sitemap:", error.message);
    process.exit(1);
  }
}

// Run the script
main();
