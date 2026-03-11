import React from "react"

export default function JavascriptMinifierSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your JavaScript code into the input area. The minifier processes your code instantly, applying multiple optimization techniques to reduce file size without changing functionality.
          </p>
          <p>
            Toggle options to control the minification process. Remove comments to strip documentation and debug notes. Remove whitespace to eliminate unnecessary spaces and line breaks. Enable shorthand optimization to convert verbose syntax to compact forms.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What gets minified:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Comments:</strong> // and /* */ comments removed</li>
              <li><strong>Whitespace:</strong> Extra spaces, tabs, newlines eliminated</li>
              <li><strong>Semicolons:</strong> Unnecessary semicolons removed</li>
              <li><strong>Variable names:</strong> Local variables can be shortened (advanced)</li>
            </ul>
          </div>
          <p>
            The output displays instantly with compression statistics. See original size, minified size, and percentage reduction. Copy the minified code or integrate into your build process.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Production deployment preparation</h3>
            <p className="text-sm text-muted-foreground">
              Minify JavaScript before deploying to production. Smaller files load faster, improving Core Web Vitals. Better performance means better search rankings and user experience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quick code sharing</h3>
            <p className="text-sm text-muted-foreground">
              Need to share a script in a chat or comment? Minify to fit character limits. Useful for code snippets in Slack, Discord, or forum posts with size restrictions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning JavaScript internals</h3>
            <p className="text-sm text-muted-foreground">
              Compare your code before and after minification. Understand what's essential vs. cosmetic. Educational for developers learning code optimization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Embedding scripts in HTML</h3>
            <p className="text-sm text-muted-foreground">
              Inline scripts bloat HTML files. Minify before embedding to reduce page size. Critical for single-file demos or email templates with inline JavaScript.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Code golf and challenges</h3>
            <p className="text-sm text-muted-foreground">
              Participating in code golf competitions? Minification shows the theoretical minimum. Then manually optimize further for the shortest working solution.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Legacy code cleanup</h3>
            <p className="text-sm text-muted-foreground">
              Inherited bloated JavaScript files? Minify to see the essential code. Helps identify dead code and unnecessary complexity in legacy projects.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Keep original files for development.</strong>
              Minified code is hard to read and debug. Always maintain unminified source files. Use minification as a build step, not a replacement.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some comments should be preserved.</strong>
              License headers and important notices use /*! */ syntax. This tool removes all comments. Add critical comments back after minification if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Source maps enable debugging.</strong>
              Production debugging needs source maps. They map minified code back to original. Use build tools like webpack for source map generation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Test after minification.</strong>
              Rarely, minification can break code with edge cases. Always test minified output before deploying. Automated tests catch most issues.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For production, use a bundler with minification (webpack, Rollup, esbuild). They handle tree-shaking, code splitting, and source maps automatically.
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
              Typical reduction is 40-60%. Well-formatted code with comments sees bigger savings. Already-compact code sees modest 20-30% reduction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does minification affect performance?</h3>
            <p className="text-sm text-muted-foreground">
              Minified code often runs slightly faster. Less parsing, smaller download. The main benefit is faster loading, which improves perceived performance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I reverse the minification?</h3>
            <p className="text-sm text-muted-foreground">
              No, minification is one-way. Variable names and formatting are lost permanently. Keep your original source files for future editing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this safe for all JavaScript?</h3>
            <p className="text-sm text-muted-foreground">
              Works for standard JavaScript. Code using eval() with variable names or dynamic property access may break. Test thoroughly before deploying.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about ES6+ features?</h3>
            <p className="text-sm text-muted-foreground">
              Modern minifiers handle ES6+ syntax. Arrow functions, template literals, and destructuring all minify correctly. Older tools may struggle.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use this or a build tool?</h3>
            <p className="text-sm text-muted-foreground">
              This tool is great for quick tasks and learning. For production, use build tools (webpack, Vite, etc.) that integrate minification into your workflow.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with TypeScript?</h3>
            <p className="text-sm text-muted-foreground">
              Minify after compiling TypeScript to JavaScript. TypeScript syntax needs to be transpiled first. Then minify the resulting JavaScript.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
