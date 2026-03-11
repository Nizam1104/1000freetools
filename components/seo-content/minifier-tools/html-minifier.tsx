import React from "react"

export default function HtmlMinifierSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your HTML code into the input area. The minifier processes it instantly, applying multiple optimization techniques to reduce file size while preserving the document structure and functionality.
          </p>
          <p>
            Toggle options to control the minification process. Remove comments to strip HTML comments. Remove whitespace to collapse unnecessary spaces and line breaks. Enable additional optimizations for maximum compression.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What gets minified:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Comments:</strong> &lt;!-- comments --&gt; removed</li>
              <li><strong>Whitespace:</strong> Extra spaces, tabs, newlines eliminated</li>
              <li><strong>Optional tags:</strong> Some closing tags are optional</li>
              <li><strong>Attribute quotes:</strong> Unnecessary quotes removed</li>
            </ul>
          </div>
          <p>
            The output displays with compression statistics. See original size, minified size, and percentage reduction. Copy the minified HTML for deployment or further processing.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Static site deployment</h3>
            <p className="text-sm text-muted-foreground">
              Minify HTML before deploying static sites. Smaller files load faster, improving page speed scores. Better performance means better SEO rankings and user experience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Email template optimization</h3>
            <p className="text-sm text-muted-foreground">
              Email clients have size limits. Minify HTML templates to stay under Gmail's 102KB clipping threshold. Ensures your entire email displays correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Inline HTML for JavaScript</h3>
            <p className="text-sm text-muted-foreground">
              Embedding HTML templates in JavaScript? Minify to reduce bundle size. Critical for single-page applications with inline templates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">CMS template optimization</h3>
            <p className="text-sm text-muted-foreground">
              Minify HTML templates in WordPress, Drupal, or other CMS platforms. Reduces server response size. Faster page delivery for all visitors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Landing page A/B testing</h3>
            <p className="text-sm text-muted-foreground">
              Testing multiple landing page variants? Minify all versions. Ensures size differences don't affect test results. Fair comparison of design effectiveness.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documentation generation</h3>
            <p className="text-sm text-muted-foreground">
              Auto-generated documentation can be verbose. Minify before publishing. Reduces bandwidth for documentation sites with many pages.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Conditional comments may break.</strong>
              IE conditional comments contain important logic. Some minifiers preserve them. Check output if you support older Internet Explorer versions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Inline scripts and styles need care.</strong>
              Minifying HTML doesn't minify inline CSS or JavaScript. For complete optimization, minify those separately or use a comprehensive build tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some whitespace is significant.</strong>
              Inline elements with surrounding whitespace can render differently. Good minifiers preserve significant whitespace. Test visual output after minification.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Server compression complements minification.</strong>
              Gzip or Brotli compression works on top of minification. Use both for maximum size reduction. Most servers support automatic compression.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For production, use build tools (webpack, Gulp, etc.) with HTML minification plugins. They integrate into your deployment workflow automatically.
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
              Typical reduction is 20-40%. Heavily formatted HTML with comments sees bigger savings. Already-compact HTML sees modest 10-15% reduction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this break my website?</h3>
            <p className="text-sm text-muted-foreground">
              Proper HTML minification preserves functionality. Always test minified output before deploying. Visual regression testing catches rendering issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with templating engines?</h3>
            <p className="text-sm text-muted-foreground">
              Minify after template rendering, not before. Template syntax (Blade, EJS, Handlebars) needs to be processed first. Minify the final HTML output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about SEO meta tags?</h3>
            <p className="text-sm text-muted-foreground">
              Meta tags are preserved exactly. Minification doesn't remove or modify content. Search engines read minified HTML the same as formatted HTML.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I reverse the minification?</h3>
            <p className="text-sm text-muted-foreground">
              You can beautify/format minified HTML, but original formatting is lost. Keep your source files. Use minification as a build step, not a replacement.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this minify CSS and JavaScript too?</h3>
            <p className="text-sm text-muted-foreground">
              No, this only minifies HTML structure. Inline CSS and JavaScript remain unchanged. Use dedicated minifiers for those, or a comprehensive build tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I minify during development?</h3>
            <p className="text-sm text-muted-foreground">
              No, minify only for production. Development needs readable code for debugging. Configure your build to minify only in production mode.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
