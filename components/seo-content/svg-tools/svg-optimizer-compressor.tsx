import React from "react"

export default function SvgOptimizerCompressorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your SVG code into the input area. The optimizer applies multiple cleaning and compression techniques based on your selected options. Each option targets different types of SVG bloat.
          </p>
          <p>
            Enable "Remove Comments" to strip HTML-style comments from the code. "Remove Metadata" deletes title, description, and metadata elements added by design tools. "Remove Empty Defs" cleans up unused definition blocks.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What each option does:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Remove Comments:</strong> Deletes &lt;!-- comments --&gt;</li>
              <li><strong>Remove Metadata:</strong> Strips title, desc, metadata tags</li>
              <li><strong>Remove Empty Defs:</strong> Cleans empty &lt;defs&gt; blocks</li>
              <li><strong>Minify Whitespace:</strong> Removes unnecessary spaces and line breaks</li>
              <li><strong>Decimal Precision:</strong> Rounds coordinates to fewer decimal places</li>
            </ul>
          </div>
          <p>
            Click Optimize SVG to process your file. The stats panel shows original size, optimized size, and percentage savings. Preview the result and download or copy the optimized code.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reducing website load times</h3>
            <p className="text-sm text-muted-foreground">
              Large SVGs slow down page loads. Optimizing can cut file sizes 50-80%. Faster pages improve user experience and search rankings. Critical for mobile users on slow connections.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning exported SVG files</h3>
            <p className="text-sm text-muted-foreground">
              Design tools add tons of metadata. Illustrator, Figma, and Sketch export bloated SVGs. Strip the junk before using in production. Keep only what's needed for rendering.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing SVGs for inline use</h3>
            <p className="text-sm text-muted-foreground">
              Inline SVGs become part of your HTML. Every byte counts. Optimized SVGs keep your HTML lean. Important for critical above-the-fold graphics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reducing CDN bandwidth costs</h3>
            <p className="text-sm text-muted-foreground">
              At scale, file size savings add up. Smaller SVGs mean lower bandwidth bills. Optimization pays for itself on high-traffic sites.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Improving git repository size</h3>
            <p className="text-sm text-muted-foreground">
              Bloated SVGs bloat your repo. Optimized files keep git history smaller. Faster clones, pulls, and less storage usage over time.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Meeting performance budgets</h3>
            <p className="text-sm text-muted-foreground">
              Team has a 100KB per-page budget? Optimized SVGs help you stay under limit. Every kilobyte saved leaves room for other assets.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Metadata removal is permanent.</strong>
              Titles and descriptions help with accessibility and SEO. Keep them if your SVG needs to be searchable or screen-reader friendly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Precision affects curve quality.</strong>
              Lower precision rounds coordinates more aggressively. Values below 2 may cause visible artifacts in curved paths. Test before deploying.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Minified code is hard to read.</strong>
              Minification removes all formatting. Keep an unminified version for editing. Use minified only for production.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some tools add required metadata.</strong>
              Certain SVG features may depend on metadata. If optimization breaks your SVG, try with fewer options enabled.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For production, use precision 2-3 decimals. Most displays can't resolve finer detail. This alone can cut file size 20-30%.
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
              Typical savings are 40-70%. Files from design tools see the biggest reductions. Already-clean SVGs see modest 10-30% savings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will optimization break my SVG?</h3>
            <p className="text-sm text-muted-foreground">
              Rarely. The tool only removes non-essential data. Always preview before deploying. If something breaks, try with fewer options enabled.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I keep titles and descriptions?</h3>
            <p className="text-sm text-muted-foreground">
              For accessibility, yes. Screen readers use title elements. For decorative icons, you can safely remove them. Consider your use case.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What precision setting is safe?</h3>
            <p className="text-sm text-muted-foreground">
              3 decimals is safe for most graphics. 2 decimals works for simple icons. 1 decimal or 0 only for very basic shapes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I batch optimize multiple SVGs?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles one file at a time. For batch processing, use svgo CLI, SVGOMG, or build tools with svgo plugins.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the optimized SVG still editable?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but minified code is hard to read. Keep your original files for editing. Use optimization as a build step, not a replacement.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between this and SVGO?</h3>
            <p className="text-sm text-muted-foreground">
              This tool uses similar techniques to SVGO but runs in your browser. SVGO is more configurable and supports plugins. Both produce optimized output.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
