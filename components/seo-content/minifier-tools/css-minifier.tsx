import React from "react"

export default function CssMinifierSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your CSS code into the input area. The minifier processes it instantly, applying multiple optimization techniques to reduce file size without changing how your styles render.
          </p>
          <p>
            Toggle options to control the minification process. Remove comments to strip documentation. Remove whitespace to eliminate spaces and line breaks. Enable shorthand optimization to convert verbose properties to compact forms.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What gets minified:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Comments:</strong> /* comments */ removed</li>
              <li><strong>Whitespace:</strong> Spaces, tabs, newlines eliminated</li>
              <li><strong>Semicolons:</strong> Last semicolon in blocks removed</li>
              <li><strong>Shorthand:</strong> margin: 1px 2px 1px 2px becomes margin: 1px 2px</li>
              <li><strong>Colors:</strong> #ffffff becomes #fff where applicable</li>
              <li><strong>Zeros:</strong> 0px becomes 0, 10.0px becomes 10px</li>
            </ul>
          </div>
          <p>
            The output displays with compression statistics. See original size, minified size, and percentage reduction. Copy the minified CSS for your stylesheets.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Production stylesheet deployment</h3>
            <p className="text-sm text-muted-foreground">
              Minify CSS before deploying to production. Smaller files load faster, improving Core Web Vitals. Faster CSS means faster render times and better user experience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Critical CSS extraction</h3>
            <p className="text-sm text-muted-foreground">
              Inline critical CSS in HTML head? Minify to reduce page weight. Every byte counts for above-the-fold styles that block rendering.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Component library distribution</h3>
            <p className="text-sm text-muted-foreground">
              Publishing a CSS framework or component library? Include minified versions. Users get smaller bundles. Professional packages always ship minified.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Email CSS optimization</h3>
            <p className="text-sm text-muted-foreground">
              Email clients have strict size limits. Minify inline CSS to stay under thresholds. Critical for HTML emails with extensive styling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Performance auditing</h3>
            <p className="text-sm text-muted-foreground">
              Compare CSS before and after minification. Identify bloated stylesheets. Large reduction percentages indicate optimization opportunities.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning CSS efficiency</h3>
            <p className="text-sm text-muted-foreground">
              Study what the minifier changes. Learn shorthand properties and optimization techniques. Improve your CSS writing habits over time.
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
              Minified CSS is nearly impossible to read and debug. Always maintain unminified source files. Use source maps for production debugging.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">License comments should be preserved.</strong>
              Important comments use /*! */ syntax to survive minification. This tool removes all comments. Add license headers back if required.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">CSS variables are preserved.</strong>
              Custom properties (CSS variables) work correctly in minified output. Their values are minified, but variable names stay intact.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Media queries remain functional.</strong>
              Responsive breakpoints and media queries work identically after minification. Only whitespace is removed, not structural elements.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For production, use PostCSS with cssnano or build tools like webpack. They handle advanced optimizations like autoprefixing and tree-shaking.
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
              Typical reduction is 30-50%. Well-commented, formatted CSS sees bigger savings. Already-compact CSS sees modest 15-25% reduction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will minification break my styles?</h3>
            <p className="text-sm text-muted-foreground">
              Proper CSS minification preserves all styling. Always test minified output before deploying. Visual regression testing catches any issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with Sass/Less?</h3>
            <p className="text-sm text-muted-foreground">
              Minify after compiling to CSS. Sass and Less syntax needs to be processed first. Minify the compiled CSS output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about CSS frameworks?</h3>
            <p className="text-sm text-muted-foreground">
              Frameworks like Bootstrap already ship minified. If customizing, minify your custom CSS. Consider using only needed framework components.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I reverse the minification?</h3>
            <p className="text-sm text-muted-foreground">
              You can beautify minified CSS, but original formatting is lost. Keep your source files. Use CSS beautifiers for readability if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does order of rules matter?</h3>
            <p className="text-sm text-muted-foreground">
              CSS rule order is preserved during minification. Cascade and specificity work identically. Don't reorder rules expecting different results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use this or a build tool?</h3>
            <p className="text-sm text-muted-foreground">
              This tool is great for quick tasks. For production, use build tools (webpack, Vite, etc.) that integrate minification into your workflow automatically.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
