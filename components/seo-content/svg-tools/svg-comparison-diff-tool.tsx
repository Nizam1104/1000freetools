import React from "react"

export default function SvgComparisonDiffToolSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How SVG Comparison and Diff Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool compares two SVG files and highlights what changed between them. It's useful for tracking design iterations, debugging unexpected visual changes, or reviewing what a teammate modified.
          </p>
          <p>
            The comparison works on two levels: visual diff (overlaying the rendered SVGs to show pixel differences) and code diff (comparing the SVG markup line by line). Visual diff catches changes that affect appearance; code diff shows structural modifications.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What gets compared:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Element structure - added, removed, or moved SVG elements</li>
              <li>Attribute changes - modified colors, positions, sizes, transforms</li>
              <li>Path data - changes to d-attributes (shape modifications)</li>
              <li>Text content - modified labels, titles, descriptions</li>
              <li>Style changes - fill colors, stroke widths, opacity values</li>
              <li>Visual differences - rendered output comparison with highlight overlay</li>
            </ul>
          </div>
          <p>
            The visual diff uses blend modes to show differences: areas that match appear normal, changed areas highlight in color (often red/cyan for side-by-side comparison). Code diff uses standard diff formatting with green for additions, red for deletions.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reviewing design revisions</h3>
            <p className="text-sm text-muted-foreground">
              A designer updated an icon but you're not sure what changed. Compare v1 and v2 - the diff shows the stroke width increased from 1.5 to 2, and the corner radius changed. Quick verification without manual inspection.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging broken SVG exports</h3>
            <p className="text-sm text-muted-foreground">
              An SVG that worked yesterday looks wrong today. Compare the working version with the broken one. Maybe a transform got corrupted or a path lost a coordinate during export.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Code review for SVG changes</h3>
            <p className="text-sm text-muted-foreground">
              A pull request modifies SVG files. Instead of squinting at path data in the diff, use this tool to see visual impact. Confirm the icon changed as intended before merging.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Tracking optimization results</h3>
            <p className="text-sm text-muted-foreground">
              Ran SVGO or similar optimizer? Compare before and after to ensure optimization didn't break anything. Sometimes aggressive optimization removes "redundant" data that was actually needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Detecting unauthorized modifications</h3>
            <p className="text-sm text-muted-foreground">
              Someone edited your SVG and you need to know what. Compare the original with the suspicious version. Changes to metadata, added scripts, or modified paths become obvious.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Merging conflicting SVG edits</h3>
            <p className="text-sm text-muted-foreground">
              Two designers edited the same SVG file independently. Compare both versions to see what each person changed, then manually merge the modifications without losing either person's work.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Whitespace changes can clutter diffs.</strong>
              Reformatting or re-indenting SVG code creates massive diffs with no visual impact. Enable "ignore whitespace" if available, or use a code formatter on both files before comparing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Path data diffs are hard to read.</strong>
              A single character change in path data (d="M10,10 L20,20") can significantly alter the shape. Code diffs show the character change; visual diffs show the actual impact. Use both views together.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">ID changes create false positives.</strong>
              If element IDs changed (Layer_1 to Layer_2) but nothing else, the code diff shows changes but visual diff shows nothing different. Focus on visual diff for appearance changes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Transform order matters.</strong>
              <code>rotate(45) translate(10, 0)</code> produces different results than <code>translate(10, 0) rotate(45)</code>. The diff shows the attribute changed, but you need to understand transform math to know the visual impact.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For icon sets, compare the entire folder using a batch diff tool. See which icons changed across a design update, not just individual files.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can this compare more than two SVGs?</h3>
            <p className="text-sm text-muted-foreground">
              This tool compares two files at a time. For multi-file comparison, use version control (git diff) or a dedicated diff tool like Beyond Compare. Compare sequentially: A vs B, then B vs C.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does visual diff work for different-sized SVGs?</h3>
            <p className="text-sm text-muted-foreground">
              Visual diff typically aligns by center or top-left corner. If SVGs have different viewBox or dimensions, the overlay might not align perfectly. Normalize sizes first if precise alignment matters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I export the diff report?</h3>
            <p className="text-sm text-muted-foreground">
              Some tools offer export options (PNG of visual diff, text file of code diff). If this tool doesn't, screenshot the visual diff and copy-paste the code diff into a document.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do identical-looking SVGs show differences?</h3>
            <p className="text-sm text-muted-foreground">
              Export settings, software versions, or even save timestamps can create metadata differences. Use "ignore metadata" or "ignore whitespace" options to focus on meaningful changes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can this detect color changes?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, both visually and in code. Visual diff highlights color-changed areas. Code diff shows the exact hex/rgb values that changed (e.g., #FF0000 to #00FF00).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about animated SVGs?</h3>
            <p className="text-sm text-muted-foreground">
              Code diff works fine for animated SVGs. Visual diff shows a static frame comparison. To compare animations, you'd need frame-by-frame analysis or a video diff tool - beyond this tool's scope.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is there an API for automated comparison?</h3>
            <p className="text-sm text-muted-foreground">
              This is a web tool, not an API. For automated SVG comparison in CI/CD, look into libraries like pixelmatch (visual) or standard text diff libraries (code) integrated into your build pipeline.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
