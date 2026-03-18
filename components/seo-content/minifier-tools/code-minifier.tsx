import React from "react"

export default function CodeMinifierSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How Code Minification Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The minifier strips unnecessary characters from code without changing functionality. It removes comments, collapses whitespace, and compacts operators—turning human-readable code into the smallest possible version.
          </p>
          <p>
            For JavaScript, the tool removes <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">/* */</code> and <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">//</code> comments, replaces multiple spaces with single spaces, and removes spaces around operators. CSS minification does the same plus removes semicolons where optional. HTML minification collapses whitespace between tags and removes HTML comments.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Before and after example:</p>
            <div className="text-xs space-y-2">
              <div className="bg-background rounded p-2">
                <p className="text-muted-foreground mb-1">Original (247 bytes):</p>
                <code className="block whitespace-pre-wrap">/* Calculate total */
const total = price * quantity;
return total; // Final amount</code>
              </div>
              <div className="bg-background rounded p-2">
                <p className="text-muted-foreground mb-1">Minified (43 bytes):</p>
                <code className="block whitespace-pre-wrap">const total=price*quantity;return total;</code>
              </div>
            </div>
          </div>
          <p>
            JSON minification is different—it parses and re-serializes to remove all formatting. This ensures valid output even if the input has syntax issues like trailing commas.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Deploying to production</h3>
            <p className="text-sm text-muted-foreground">
              Your development code has comments and nice formatting. Before deploying, minify to reduce file size and load times. Users download less data, pages render faster.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Inlining critical CSS</h3>
            <p className="text-sm text-muted-foreground">
              For above-the-fold styles, inline minified CSS directly in HTML <code className="font-mono text-xs">&lt;style&gt;</code> tags. Removes an HTTP request and speeds up first paint.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Embedding code in documentation</h3>
            <p className="text-sm text-muted-foreground">
              Your docs include small code snippets. Minified examples take less space and keep focus on functionality rather than formatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating bookmarklets</h3>
            <p className="text-sm text-muted-foreground">
              Bookmarklets are JavaScript URLs. Minification shrinks them to fit URL length limits and makes the bookmark manageable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing code size</h3>
            <p className="text-sm text-muted-foreground">
              Compare original vs. minified size to understand overhead. If minification only saves 10%, your code is already lean. If it saves 70%, you have bloated source files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing code for CDN embedding</h3>
            <p className="text-sm text-muted-foreground">
              Sharing a snippet via CDN? Minify first. Smaller files mean faster CDN propagation and lower bandwidth costs.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Minification is not compression.</strong>
              Minification removes characters. Compression (gzip, brotli) encodes the file. Use both: minify first, then serve compressed. Combined savings reach 70-80%.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Source maps enable debugging.</strong>
              Production minified code is unreadable. Generate source maps to map minified code back to original for debugging. Browser dev tools use them automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">This is basic minification.</strong>
              The tool does simple text transformations. Production builds should use proper minifiers (Terser for JS, cssnano for CSS, html-minifier for HTML) that understand syntax.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Keep original source files.</strong>
              Never overwrite your source. Minify to separate files (<code className="font-mono text-xs">app.min.js</code>). You'll need the readable version for future development.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Warning:</strong> Don't minify code with meaningful whitespace. Python, YAML, and similar languages break if you remove indentation. This tool targets JavaScript, CSS, HTML, and JSON only.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How much does minification reduce file size?</h3>
            <p className="text-sm text-muted-foreground">
              Typical savings: 30-50% for JavaScript, 40-60% for CSS, 20-40% for HTML. Heavily commented code saves more. Already-compact code saves less.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does minification affect performance?</h3>
            <p className="text-sm text-muted-foreground">
              Minified code parses slightly faster (less to parse) and downloads faster (smaller files). The difference is milliseconds for small files, significant for large bundles.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I reverse minification?</h3>
            <p className="text-sm text-muted-foreground">
              No, not perfectly. Comments and formatting are lost forever. You can beautify minified code, but it won't match the original. Always keep source files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I minify during development?</h3>
            <p className="text-sm text-muted-foreground">
              No. Debugging minified code is painful even with source maps. Minify only for production builds. Development should prioritize readability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about obfuscation?</h3>
            <p className="text-sm text-muted-foreground">
              Minification isn't obfuscation. Variable names stay intact. For security-through-obscurity (not recommended), use dedicated obfuscators that rename variables to <code className="font-mono text-xs">_0xabc123</code>.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does minification break code?</h3>
            <p className="text-sm text-muted-foreground">
              Proper minification preserves functionality. However, simple text-based minifiers might mishandle edge cases. Always test minified code before deploying.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
