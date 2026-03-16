import React from "react"

export default function SvgSplitterExtractorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your SVG code containing multiple elements. The tool parses the SVG structure and identifies individual elements like paths, circles, rectangles, groups, and other SVG shapes.
          </p>
          <p>
            Choose extraction mode: "By Elements" separates each SVG element type into individual files. "By Layers" (coming soon) will extract based on group hierarchy and layer structure.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Extractable element types:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Paths:</strong> Complex shapes and icons</li>
              <li><strong>Circles/Ellipses:</strong> Round elements</li>
              <li><strong>Rectangles:</strong> Box shapes</li>
              <li><strong>Groups:</strong> Combined elements</li>
              <li><strong>Text:</strong> Text elements</li>
              <li><strong>Lines/Polylines:</strong> Linear elements</li>
            </ul>
          </div>
          <p>
            Click Extract Elements to process. Each extracted element becomes a standalone SVG with proper viewBox and dimensions. Copy individual elements or use them separately in your projects.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Breaking apart icon sets</h3>
            <p className="text-sm text-muted-foreground">
              Downloaded an SVG sprite with 50 icons? Extract each icon as a separate file. Use only the icons you need without manual copying and pasting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Isolating design components</h3>
            <p className="text-sm text-muted-foreground">
              Complex illustrations contain many parts. Extract individual components for reuse. Turn a complex scene into a library of reusable elements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Recovering elements from combined files</h3>
            <p className="text-sm text-muted-foreground">
              Someone sent you a merged SVG but you need just one piece. Extract that specific element without recreating it. Save hours of redesign work.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating component libraries</h3>
            <p className="text-sm text-muted-foreground">
              Build a design system from existing graphics. Extract consistent elements, organize them, and create a reusable component library for your team.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing SVG structure</h3>
            <p className="text-sm text-muted-foreground">
              Learning how complex SVGs are built? Extract elements to study them individually. Understand how designers construct intricate graphics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing assets for development</h3>
            <p className="text-sm text-muted-foreground">
              Hand off individual icons to developers instead of one big file. Each element as a separate SVG is easier to import and manage in code.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Extracted elements get new viewBox.</strong>
              Each element receives the original SVG's viewBox. This may create extra whitespace. Adjust viewBox in a vector editor for tight cropping.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Shared definitions aren't duplicated.</strong>
              If elements reference shared gradients or symbols in &lt;defs&gt;, those references may break. Add required defs to each extracted SVG.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Grouped elements stay together.</strong>
              Elements inside &lt;g&gt; tags are extracted as a unit. For individual element extraction, ungroup first in your vector editor.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Styles may not transfer perfectly.</strong>
              Inherited styles and CSS classes might not work in isolated elements. Check each extracted SVG for visual consistency.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> After extraction, batch-rename files descriptively. "icon-01.svg" becomes "search-icon.svg". Future you will be grateful.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many elements can I extract?</h3>
            <p className="text-sm text-muted-foreground">
              No hard limit, but large SVGs with hundreds of elements may slow down. For very complex files, consider extracting in batches.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I choose which elements to extract?</h3>
            <p className="text-sm text-muted-foreground">
              Currently all elements are extracted. For selective extraction, copy the elements you want from the output and save them separately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do extracted SVGs keep their colors?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, inline styles and attributes are preserved. CSS class references may not work if the styles were in external stylesheets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I download all extracted elements?</h3>
            <p className="text-sm text-muted-foreground">
              Copy each element individually using the Copy button. For batch download, use a desktop tool or script to process the extracted code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens to nested elements?</h3>
            <p className="text-sm text-muted-foreground">
              Nested structures are preserved within each extracted element. A group containing paths stays together as one extracted SVG.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I recombine extracted elements?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use the SVG Merge tool to combine extracted elements back together. Arrange them in your preferred layout.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why extract instead of using the original?</h3>
            <p className="text-sm text-muted-foreground">
              Smaller files load faster. Individual elements are easier to manage. You can use only what you need without carrying unused graphics.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
