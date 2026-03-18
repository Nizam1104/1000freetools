import React from "react"

export default function RealTimeMinifierSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Real-Time Minifier Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool minifies code instantly as you type - no button to click, no waiting. Paste or write JavaScript, CSS, HTML, or JSON, and see the minified output update within milliseconds. The debounced processing ensures smooth performance even with large files.
          </p>
          <p>
            Minification removes unnecessary characters: whitespace, comments, line breaks, and optional semicolons. Variable names stay intact (this isn't obfuscation), but the file shrinks significantly - often 30-60% smaller than the original.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What gets removed during minification:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Comments (// single-line and /* multi-line */)</li>
              <li>Extra whitespace and indentation</li>
              <li>Line breaks and carriage returns</li>
              <li>Optional semicolons in JavaScript</li>
              <li>HTML comments and unnecessary attributes</li>
              <li>CSS comments and whitespace around selectors</li>
            </ul>
          </div>
          <p>
            Live statistics show original size, minified size, and percentage reduction. Copy the minified output with one click or download as a file ready for production deployment.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quick production builds</h3>
            <p className="text-sm text-muted-foreground">
              Need to deploy a hotfix but don't want to run the full build pipeline? Paste your JavaScript, grab the minified version, deploy immediately. Faster than waiting for webpack or rollup for simple changes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Inlining critical CSS</h3>
            <p className="text-sm text-muted-foreground">
              Above-the-fold CSS should be inlined in HTML for performance. Minify it first to reduce the inline payload. A 5KB stylesheet becomes 3KB - meaningful for initial page load.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating bookmarklets</h3>
            <p className="text-sm text-muted-foreground">
              Bookmarklets are JavaScript URLs with a character limit. Minify your code to fit more functionality. Real-time feedback helps you iterate until it fits under the limit.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing minification impact</h3>
            <p className="text-sm text-muted-foreground">
              Wondering how much minification saves? Paste code, see the reduction percentage instantly. Helps decide if setting up a build process is worth it for your project size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing code for embedding</h3>
            <p className="text-sm text-muted-foreground">
              Embedding a script in a README, documentation, or code snippet? Minified code takes less space. For small utilities, the entire minified code fits in a single code block.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning how minification works</h3>
            <p className="text-sm text-muted-foreground">
              Type code and watch what gets removed. See how comments disappear, whitespace compresses, and optional characters drop. Educational for understanding build optimization.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">This is minification, not obfuscation.</strong>
              Variable names remain readable. For code protection, you need obfuscation (renaming variables to a, b, c) which this tool doesn't do. Minification is for performance, not security.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Source maps aren't generated.</strong>
              Production builds typically create source maps for debugging minified code. This tool doesn't generate source maps. Keep your original code for debugging purposes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Very large files may lag.</strong>
              Real-time processing with 10,000+ lines can cause typing lag. The debounced update helps, but for huge files, consider a build tool with incremental compilation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Minification doesn't optimize logic.</strong>
              Inefficient algorithms stay inefficient after minification. A O(n²) loop doesn't become O(n). Minification only removes characters, it doesn't improve code quality.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For production, use a proper build pipeline (webpack, esbuild, terser) with tree-shaking and code splitting. This tool is great for quick tasks but lacks advanced optimizations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is minified code still valid?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, minification preserves functionality. The minified code executes identically to the original. If minification breaks your code, it's a bug in the minifier - report it with a reproduction case.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I un-minify code?</h3>
            <p className="text-sm text-muted-foreground">
              Use a beautifier/prettifier to restore readability. It won't recover comments or original formatting, but it makes minified code human-readable again for debugging purposes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does minification improve performance?</h3>
            <p className="text-sm text-muted-foreground">
              Indirectly - smaller files download faster, especially on slow connections. Parsing time is marginally reduced. The main benefit is reduced bandwidth, not faster execution.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I minify JSON?</h3>
            <p className="text-sm text-muted-foreground">
              For API responses, yes - removes whitespace, reduces bandwidth. For config files humans edit, no - keep them readable. Minify JSON that's shipped to browsers or stored long-term.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between minify and compress?</h3>
            <p className="text-sm text-muted-foreground">
              Minification removes characters. Compression (gzip, brotli) encodes the file more efficiently. Use both: minify first, then serve compressed. They're complementary, not alternatives.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I minify TypeScript directly?</h3>
            <p className="text-sm text-muted-foreground">
              This tool minifies JavaScript. For TypeScript, compile to JavaScript first (tsc), then minify the output. TypeScript syntax isn't valid JavaScript and would cause minification errors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How much size reduction should I expect?</h3>
            <p className="text-sm text-muted-foreground">
              Typical reduction: 30-60% depending on code style. Well-formatted code with comments shrinks more. Already-compact code shrinks less. The stats panel shows exact reduction for your code.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
