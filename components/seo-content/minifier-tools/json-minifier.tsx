import React from "react"

export default function JsonMinifierSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your JSON data into the input area. The minifier processes it instantly, removing all unnecessary whitespace while preserving the data structure exactly.
          </p>
          <p>
            Unlike code minifiers, JSON minification is straightforward - it only removes whitespace. No variable renaming or syntax transformation. The data remains identical, just more compact.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What gets removed:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Spaces:</strong> Whitespace between elements eliminated</li>
              <li><strong>Newlines:</strong> Line breaks removed for single-line output</li>
              <li><strong>Indentation:</strong> Pretty-print indentation stripped</li>
              <li><strong>Trailing commas:</strong> Invalid JSON trailing commas removed</li>
            </ul>
          </div>
          <p>
            The output displays with compression statistics. See original size, minified size, and percentage reduction. Copy the minified JSON for API responses, config files, or data storage.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">API response optimization</h3>
            <p className="text-sm text-muted-foreground">
              Minify JSON API responses to reduce bandwidth. Mobile users on slow connections benefit from smaller payloads. Faster APIs mean better user experience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Configuration file deployment</h3>
            <p className="text-sm text-muted-foreground">
              Ship minified config files to production. Smaller files load faster. Keep pretty-printed versions for development, minified for deployment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Database storage efficiency</h3>
            <p className="text-sm text-muted-foreground">
              Storing JSON in databases? Minify before saving. Reduces storage costs at scale. Every byte saved multiplies across millions of records.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">URL parameter encoding</h3>
            <p className="text-sm text-muted-foreground">
              Passing JSON in URL parameters? Minify first to stay under URL length limits. Essential for sharing complex filters or state via URL.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Local storage optimization</h3>
            <p className="text-sm text-muted-foreground">
              Browser localStorage has 5-10MB limits. Minify JSON before storing. Fit more data within the quota. Important for offline-first applications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging and comparison</h3>
            <p className="text-sm text-muted-foreground">
              Compare two JSON structures? Minify both first. Removes formatting differences, making actual data differences obvious. Useful for API testing.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Minified JSON is hard to read.</strong>
              Single-line JSON is difficult for humans to parse. Keep pretty-printed versions for debugging. Use minification for production only.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Invalid JSON will fail.</strong>
              The minifier validates JSON structure. Syntax errors, trailing commas, or unquoted keys will cause failures. Fix errors before minifying.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">String content is preserved exactly.</strong>
              Whitespace inside string values is kept. Only structural whitespace is removed. Your data content never changes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Unicode characters are preserved.</strong>
              Emoji, international characters, and special symbols remain intact. JSON minification doesn't escape or modify string content.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For APIs, consider gzip compression instead of minification. Gzip achieves better compression ratios. Many servers auto-compress JSON responses.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How much size reduction can I expect?</h3>
            <p className="text-sm text-muted-foreground">
              Pretty-printed JSON typically reduces 40-60%. Heavily indented nested structures see bigger savings. Already-compact JSON sees modest 10-20% reduction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I prettify minified JSON?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use a JSON beautifier or formatter. Most code editors have built-in formatting. The data structure is identical, just formatted differently.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this validate my JSON?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, minification requires valid JSON. If your input has errors, the tool will fail. Use this as an impromptu JSON validator.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about JSON5 or JSONC?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles standard JSON only. JSON5 (with comments) and JSONC need conversion first. Strip comments before minifying.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is there a size limit?</h3>
            <p className="text-sm text-muted-foreground">
              Browser memory limits apply. Very large JSON files (100MB+) may cause issues. For massive files, use command-line tools or streaming processors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I batch minify multiple files?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles one file at a time. For batch processing, use command-line tools like json-minify or write a simple script.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does order of keys matter?</h3>
            <p className="text-sm text-muted-foreground">
              JSON key order is preserved during minification. However, JSON specification says order doesn't matter. Don't rely on key ordering in your code.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
