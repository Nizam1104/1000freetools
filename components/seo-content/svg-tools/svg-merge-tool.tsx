import React from "react"

export default function SvgMergeToolSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste multiple SVG files into the input fields, or add more fields as needed. Each SVG is parsed and its contents are extracted from the individual SVG wrappers.
          </p>
          <p>
            Choose a layout: Horizontal places SVGs side by side, Vertical stacks them top to bottom, and Grid arranges them in rows and columns. Set the spacing between elements in pixels.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Layout options:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Horizontal:</strong> Icons in a row, perfect for sprite sheets</li>
              <li><strong>Vertical:</strong> Stacked elements, great for infographics</li>
              <li><strong>Grid:</strong> 2D arrangement, ideal for icon sets</li>
            </ul>
          </div>
          <p>
            The tool calculates the combined dimensions, wraps each SVG content in a transform group, and outputs a single merged SVG. Preview the result and download or copy the code.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating SVG sprite sheets</h3>
            <p className="text-sm text-muted-foreground">
              Combine multiple icons into one SVG sprite file. Reference individual icons with fragment identifiers. Reduces HTTP requests and simplifies icon management in web projects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building composite illustrations</h3>
            <p className="text-sm text-muted-foreground">
              Assemble complex scenes from separate SVG components. Merge a background, characters, and foreground elements into one cohesive illustration file.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing print layouts</h3>
            <p className="text-sm text-muted-foreground">
              Combine multiple vector graphics into a single print-ready file. Arrange business card designs, stickers, or labels on one sheet for efficient printing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Consolidating design assets</h3>
            <p className="text-sm text-muted-foreground">
              Merge related graphics from different sources into one organized file. Hand off a single SVG to developers instead of multiple scattered files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating comparison visuals</h3>
            <p className="text-sm text-muted-foreground">
              Place before/after designs side by side. Merge multiple versions of a logo or icon for client presentations or design reviews.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Generating thumbnail grids</h3>
            <p className="text-sm text-muted-foreground">
              Arrange multiple graphics in a grid for portfolio previews, product catalogs, or design system documentation. Export as a single reference image.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">SVG dimensions affect layout.</strong>
              The tool uses each SVG's width/height or viewBox to calculate positioning. SVGs without explicit dimensions may not arrange as expected.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">IDs may conflict when merging.</strong>
              If multiple SVGs use the same element IDs (for gradients, patterns), they'll conflict. Rename IDs before merging complex SVGs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Styles don't automatically scope.</strong>
              CSS classes and styles from different SVGs may interact. Inline styles are safer for merged documents.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Grid layout uses automatic columns.</strong>
              Grid mode arranges elements in a square-ish grid. For custom row/column counts, use horizontal or vertical layout and arrange manually.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For sprite sheets, add unique IDs to each merged element. This lets you reference individual icons with &lt;use href="#icon-id"&gt; in your HTML.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many SVGs can I merge?</h3>
            <p className="text-sm text-muted-foreground">
              There's no hard limit, but performance may slow with many large files. For 20+ SVGs, consider desktop tools like Illustrator or command-line utilities.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I adjust spacing after merging?</h3>
            <p className="text-sm text-muted-foreground">
              Regenerate with different spacing settings. The tool recalculates positions each time. For fine adjustments, edit the transform values in the output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens to SVG metadata?</h3>
            <p className="text-sm text-muted-foreground">
              Only the visual content is merged. Metadata, titles, and descriptions from individual SVGs are not preserved in the output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I merge SVGs with different sizes?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, each SVG maintains its original dimensions. The merged canvas expands to fit all elements with your specified spacing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the merged SVG editable?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the output is standard SVG code. Open it in any vector editor like Figma, Illustrator, or Inkscape for further editing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I unmerge a combined SVG?</h3>
            <p className="text-sm text-muted-foreground">
              Use the SVG Splitter tool to extract individual elements from a merged file. It identifies separate groups and exports them as individual SVGs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why use SVG merge instead of a design tool?</h3>
            <p className="text-sm text-muted-foreground">
              Quick merges without opening software. Great for automated workflows, CI/CD pipelines, or when you don't have design tools installed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
