import fs from "fs";
import path from "path";

// ── Categories that already have JSON link files ──────────────────────────────
const ALREADY_DONE = new Set([
  "calculators",
  "unit-converters",
  "color-tools",
  "json-tools",
  "video-tools",
  "image-tools",
  "math-tools",
]);

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Convert a kebab-case folder name to a Title Case label */
function toTitleCase(str) {
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Very small hand-rolled extractor – no JSX parser needed.
 * Finds the FIRST <h1 …> … </h1> block and the next <p …> … </p> block
 * that follows it in the raw source text.
 */
function extractH1AndNextP(source) {
  // Strip JSX / TS clutter just enough to work on text content
  // We look for the raw tags in the file string.

  const h1Match = source.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!h1Match) return null;

  const h1Text = h1Match[1]
    .replace(/<[^>]+>/g, "") // strip inner tags
    .replace(/\{[^}]+\}/g, "") // strip JSX expressions
    .trim();

  // Find the <p> that starts AFTER the h1 match ends
  const afterH1 = source.slice(h1Match.index + h1Match[0].length);
  const pMatch = afterH1.match(/<p[^>]*>([\s\S]*?)<\/p>/);

  const pText = pMatch
    ? pMatch[1]
        .replace(/<[^>]+>/g, "")
        .replace(/\{[^}]+\}/g, "")
        .trim()
    : "";

  return { h1: h1Text, p: pText };
}

// ── Main ──────────────────────────────────────────────────────────────────────

const APP_DIR = path.resolve("app"); // run from project root
const OUTPUT_DIR = path.resolve("json-assets");

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const categoryFolders = fs
  .readdirSync(APP_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !ALREADY_DONE.has(d.name))
  .map((d) => d.name);

console.log(`\nFound ${categoryFolders.length} remaining category folders.\n`);

for (const category of categoryFolders) {
  const categoryPath = path.join(APP_DIR, category);
  const toolFolders = fs
    .readdirSync(categoryPath, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  if (toolFolders.length === 0) continue;

  const links = [];

  for (const tool of toolFolders) {
    const toolPath = path.join(categoryPath, tool.name);
    const layoutFile = path.join(toolPath, "layout.tsx");

    const pageFile = path.join(toolPath, "page.tsx");

    let sourceFile = null;
    if (fs.existsSync(layoutFile)) {
      sourceFile = layoutFile;
    } else if (fs.existsSync(pageFile)) {
      sourceFile = pageFile;
    } else {
      console.warn(`  ⚠  No layout.tsx or page.tsx in ${toolPath}`);
      continue;
    }

    const source = fs.readFileSync(sourceFile, "utf8");
    const extracted = extractH1AndNextP(source);

    if (!extracted) {
      console.warn(`  ⚠  No <h1> found in ${layoutFile}`);
      continue;
    }

    const description = [extracted.h1, extracted.p].filter(Boolean).join(" ");
    const href = `/${category}/${tool.name}`;
    const name = toTitleCase(tool.name);

    links.push({ name, description, href });
  }

  if (links.length === 0) {
    console.log(`  — ${category}: no tool pages found, skipping.`);
    continue;
  }

  const outputFile = path.join(OUTPUT_DIR, `${category}-links.json`);
  fs.writeFileSync(outputFile, JSON.stringify(links, null, 2));
  console.log(`  ✓  ${category}: wrote ${links.length} links → ${outputFile}`);
}

console.log("\nDone!\n");

calculator tools , color Tools , footer tools , image tools , index page links , json tools , math tools , unit converters , video tools