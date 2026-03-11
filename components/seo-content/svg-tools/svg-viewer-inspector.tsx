import React from "react"

export default function SvgViewerInspectorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Choose between pasting SVG code directly or entering a URL to an SVG file. The tool parses the SVG and builds an interactive tree view of all elements.
          </p>
          <p>
            The element tree shows the hierarchical structure - svg at the root, containing groups, shapes, paths, and other elements. Click any element in the tree to select it.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Tree view features:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Element tags:</strong> Shows element type (path, circle, rect, etc.)</li>
              <li><strong>Attribute preview:</strong> Displays key attributes inline</li>
              <li><strong>Child count:</strong> Shows how many children each element has</li>
              <li><strong>Clickable selection:</strong> Click to inspect element details</li>
            </ul>
          </div>
          <p>
            Selected elements display their full attribute list in the details panel. See all fill, stroke, transform, and other properties. Perfect for debugging and learning SVG structure.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging broken SVG graphics</h3>
            <p className="text-sm text-muted-foreground">
              SVG not rendering correctly? Inspect the element tree to find missing elements, wrong attributes, or structure issues. Identify problems quickly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning SVG structure</h3>
            <p className="text-sm text-muted-foreground">
              New to SVG? Explore how complex graphics are built. See how designers nest groups, structure paths, and organize elements. Learn by example.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Understanding exported files</h3>
            <p className="text-sm text-muted-foreground">
              Design tools export complex SVG. Inspect what Figma, Illustrator, or Sketch generated. Understand the structure before editing or optimizing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Finding specific elements</h3>
            <p className="text-sm text-muted-foreground">
              Need to change one color in a complex SVG? Navigate the tree to find the exact element. See its attributes and understand its role.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Auditing SVG accessibility</h3>
            <p className="text-sm text-muted-foreground">
              Check for title and desc elements. Verify proper structure for screen readers. Ensure your SVGs are accessible to all users.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing SVG for animation</h3>
            <p className="text-sm text-muted-foreground">
              Understand element hierarchy before animating. Identify which elements to target. Plan your animation structure based on the SVG organization.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Tree shows structure, not styling.</strong>
              CSS classes and external stylesheets aren't fully represented. Inline styles and attributes are shown. Computed styles require browser dev tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Large SVGs may load slowly.</strong>
              Complex SVGs with thousands of elements take time to parse. Allow a moment for tree generation. Very large files may timeout.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">URL loading requires CORS.</strong>
              Loading SVG from URL requires the server to allow cross-origin requests. Local files and same-origin URLs work best.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Preview may differ from browser rendering.</strong>
              Some SVG features (filters, blend modes) may not render identically. Use this for structure inspection, not visual fidelity testing.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use browser DevTools for complete SVG debugging. This tool is great for structure overview, but DevTools shows computed styles and live editing.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I edit elements in the tree?</h3>
            <p className="text-sm text-muted-foreground">
              This is a viewer/inspector, not an editor. Use the information to edit your source SVG file. For live editing, use browser DevTools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why don't all attributes show?</h3>
            <p className="text-sm text-muted-foreground">
              The preview shows first few attributes for brevity. Click the element to see all attributes in the details panel.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I search for specific elements?</h3>
            <p className="text-sm text-muted-foreground">
              Current version doesn't have search. Scroll through the tree or use browser find (Ctrl+F) to locate specific tags.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with external references?</h3>
            <p className="text-sm text-muted-foreground">
              External images and references may not load due to CORS. Inline SVG content works best. External stylesheets aren't processed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I copy element code?</h3>
            <p className="text-sm text-muted-foreground">
              The details panel shows attributes. For full element code, use your source file or browser DevTools element inspector.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What SVG versions are supported?</h3>
            <p className="text-sm text-muted-foreground">
              SVG 1.1 and SVG 2 features are parsed. Some very new features may not display correctly. Standard SVG elements work reliably.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How is this different from browser DevTools?</h3>
            <p className="text-sm text-muted-foreground">
              This provides a focused SVG-only view with cleaner presentation. DevTools shows everything mixed with HTML. Use both for complete debugging.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
