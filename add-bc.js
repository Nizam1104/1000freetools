#!/usr/bin/env node

/**
 * add-breadcrumbs.js
 *
 * Usage: node add-breadcrumbs.js <folder-path>
 *
 * Goes into every immediate subfolder of <folder-path>, finds layout.tsx,
 * and adds a breadcrumb block if one doesn't already exist.
 *
 * Example folder structure:
 *   app/math-tools/age-calculator/layout.tsx
 *   app/math-tools/date-calculator/layout.tsx
 *
 * Running: node add-breadcrumbs.js app/math-tools
 *   => breadcrumb: Home > Math Tools > Age Calculator
 *   => breadcrumb: Home > Math Tools > Date Calculator
 */

const fs = require("fs");
const path = require("path");

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Convert a kebab-case slug to Title Case label.
 *  e.g. "age-calculator" → "Age Calculator"
 */
function slugToLabel(slug) {
    return slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

/** Build the JSX breadcrumb block from an ordered array of { label, href } */
function buildBreadcrumbJSX(crumbs) {
    const items = crumbs
        .map(
            ({ label, href }, i) => `            <BreadcrumbItem>
              <BreadcrumbLink href="${href}">${label}</BreadcrumbLink>
            </BreadcrumbItem>${i < crumbs.length - 1 ? "\n            <BreadcrumbSeparator />" : ""}`
        )
        .join("\n");

    return `      <div>
        <Breadcrumb>
          <BreadcrumbList>
${items}
          </BreadcrumbList>
        </Breadcrumb>
      </div>`;
}

/** The import lines to inject (only if not already present) */
const BREADCRUMB_IMPORT = `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";`;

// ─── Core transform ──────────────────────────────────────────────────────────

/**
 * @param {string} layoutPath   - absolute path to layout.tsx
 * @param {string} categorySlug - e.g. "math-tools"
 * @param {string} toolSlug     - e.g. "age-calculator"
 */
function addBreadcrumbs(layoutPath, categorySlug, toolSlug) {
    let src = fs.readFileSync(layoutPath, "utf8");

    // ── Guard: skip if breadcrumbs already present ──
    if (src.includes("<Breadcrumb>")) {
        console.log(`  ⚠  Skipping (breadcrumb already exists): ${layoutPath}`);
        return;
    }

    // ── 1. Add import (after the last existing import line) ──
    if (!src.includes("BreadcrumbLink")) {
        // Find the last import statement and insert after it
        const lastImportMatch = [...src.matchAll(/^import .+;$/gm)].pop();
        if (!lastImportMatch) {
            console.error(`  ✗  Could not find import section in: ${layoutPath}`);
            return;
        }
        const insertAt = lastImportMatch.index + lastImportMatch[0].length;
        src = src.slice(0, insertAt) + "\n" + BREADCRUMB_IMPORT + src.slice(insertAt);
    }

    // ── 2. Build crumb data ──
    const categoryLabel = slugToLabel(categorySlug);
    const toolLabel = slugToLabel(toolSlug);

    // href for category: derive from the layout file's grandparent folder name
    // We use the same slug the file lives under, prefixed with /
    const categoryHref = `/${categorySlug}`;
    const toolHref = `/${categorySlug}/${toolSlug}`;

    const crumbs = [
        { label: "Home", href: "/" },
        { label: categoryLabel, href: categoryHref },
        { label: toolLabel, href: toolHref },
    ];

    const breadcrumbBlock = buildBreadcrumbJSX(crumbs);

    // ── 3. Inject breadcrumb block inside the return's top-level container,
    //       just before {children} ──
    //
    // We look for the pattern:
    //   return (
    //     <div ...>
    //       {children}          ← insert before this
    //
    // Strategy: find the first occurrence of `{children}` inside the return
    // statement and prepend the block before it (with proper indentation).

    const childrenIdx = src.indexOf(`<div className="mb-8">`);
    if (childrenIdx === -1) {
        console.error(`  ✗  Could not find {children} in: ${layoutPath}`);
        return;
    }

    // Find the start of that line so we can preserve indentation
    const lineStart = src.lastIndexOf("\n", childrenIdx) + 1;
    const indentation = src.slice(lineStart, childrenIdx).match(/^(\s*)/)?.[1] ?? "      ";

    // Re-indent the breadcrumb block to match the {children} indentation level.
    // The block is authored with 6-space base indent; we replace that with
    // whatever indentation level {children} sits at.
    const BASE_INDENT = "      "; // 6 spaces — matches buildBreadcrumbJSX
    const indentedBlock =
        breadcrumbBlock
            .split("\n")
            .map((line) => {
                if (line.trim() === "") return "";
                // Replace leading BASE_INDENT with the actual indentation
                if (line.startsWith(BASE_INDENT)) {
                    return indentation + line.slice(BASE_INDENT.length);
                }
                return indentation + line.trimStart();
            })
            .join("\n") + "\n";

    src = src.slice(0, lineStart) + indentedBlock + src.slice(lineStart);

    fs.writeFileSync(layoutPath, src, "utf8");
    console.log(`  ✓  Updated: ${layoutPath}`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
    const [, , folderArg] = process.argv;

    if (!folderArg) {
        console.error("Usage: node add-breadcrumbs.js <folder-path>");
        process.exit(1);
    }

    const folderPath = path.resolve(folderArg);

    if (!fs.existsSync(folderPath)) {
        console.error(`Folder not found: ${folderPath}`);
        process.exit(1);
    }

    // The category slug is the name of the folder passed in
    // e.g. if folderArg = "app/math-tools", categorySlug = "math-tools"
    const categorySlug = path.basename(folderPath);

    const entries = fs.readdirSync(folderPath, { withFileTypes: true });
    const subfolders = entries.filter((e) => e.isDirectory());

    if (subfolders.length === 0) {
        console.log("No subfolders found.");
        return;
    }

    console.log(`\nProcessing category: "${categorySlug}" (${subfolders.length} subfolders)\n`);

    let processed = 0;
    for (const dir of subfolders) {
        const toolSlug = dir.name;
        const layoutPath = path.join(folderPath, toolSlug, "layout.tsx");

        if (!fs.existsSync(layoutPath)) {
            console.log(`  –  No layout.tsx found in: ${toolSlug}/`);
            continue;
        }

        addBreadcrumbs(layoutPath, categorySlug, toolSlug);
        processed++;
    }

    console.log(`\nDone. Processed ${processed} layout file(s).`);
}

main();