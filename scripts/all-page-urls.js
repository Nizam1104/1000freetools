const fs = require("fs");
const path = require("path");

const BASE_URL = "https://1000freetools.com";
const APP_DIR = path.join(__dirname, "..", "app");
const OUTPUT_FILE = path.join(__dirname, "pageUrls.js");

const urls = [];

function scan(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            scan(fullPath);
        }

        if (item.isFile() && item.name === "page.tsx") {
            const relative = path.relative(APP_DIR, dir);

            let urlPath = relative.replace(/\\/g, "/");

            if (urlPath === "") {
                urlPath = "/";
            } else {
                urlPath = "/" + urlPath;
            }

            urls.push(`${BASE_URL}${urlPath}`);
        }
    }
}

scan(APP_DIR);

const content =
    `export const pageUrls = ${JSON.stringify(urls, null, 2)};
`;

fs.writeFileSync(OUTPUT_FILE, content);

console.log(`✅ Generated ${urls.length} URLs`);