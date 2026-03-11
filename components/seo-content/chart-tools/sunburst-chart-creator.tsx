import React from "react"

export default function SunburstChartCreatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter hierarchical data with parent-child relationships. Each level of the hierarchy becomes a ring, with the root at the center. Segment sizes represent values, showing proportions at each level.
          </p>
          <p>
            The innermost ring shows top-level categories. Outer rings break down each category into subcategories. Click segments to drill down or zoom to specific branches of the hierarchy.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Data format:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Category, Subcategory, Item, Value
Electronics, Phones, iPhone, 500
Electronics, Phones, Android, 400
Electronics, Laptops, MacBook, 300</pre>
          </div>
          <p>
            Interactive tooltips show exact values and percentages at each level. Color coding distinguishes branches. Export for reports showing hierarchical data distribution.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">File system storage analysis</h3>
            <p className="text-sm text-muted-foreground">
              Visualize disk usage by folder and file type. See which directories consume most space. IT teams identify cleanup opportunities quickly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sales by region and product</h3>
            <p className="text-sm text-muted-foreground">
              Show sales hierarchy: region → store → product category. Compare performance across dimensions. Management sees where revenue comes from.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Website content structure</h3>
            <p className="text-sm text-muted-foreground">
              Map site sections, pages, and content types. See which sections have most content. Information architects plan site structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Budget breakdown visualization</h3>
            <p className="text-sm text-muted-foreground">
              Show department → category → line item hierarchy. Understand where money is allocated. Finance teams communicate budget structure clearly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Species taxonomy display</h3>
            <p className="text-sm text-muted-foreground">
              Biology students visualize kingdom → phylum → class → order relationships. See distribution of species across classifications. Educational tool for taxonomy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Survey response breakdown</h3>
            <p className="text-sm text-muted-foreground">
              Show demographic → response category → answer distribution. Understand how different groups responded. Researchers spot patterns across segments.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Sunbursts show part-to-whole relationships.</strong>
              Each ring adds to 100% of its parent. Inner rings are parents of outer rings. The complete chart shows the full hierarchy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Too many levels becomes hard to read.</strong>
              3-5 levels work well. More than that, outer rings become thin slivers. Consider collapsing deep branches or using drill-down interaction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Angle perception is imprecise.</strong>
              Humans aren't great at comparing angles. Add value labels for precision. Use for overview, tables for exact numbers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Center space can be utilized.</strong>
              The center can show total, selected segment info, or remain empty. Don't waste the space - use it for context.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use consistent colors for the same branches across rings. This helps users track a category from center to edge.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How is this different from pie charts?</h3>
            <p className="text-sm text-muted-foreground">
              Pie charts show one level of categories. Sunbursts show multiple hierarchical levels. Each ring is like a pie chart for that level's parent.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if some branches are deeper?</h3>
            <p className="text-sm text-muted-foreground">
              Uneven depth is fine. Shallower branches end at inner rings. Deeper branches extend to outer rings. The chart accommodates varying depths.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I compare multiple sunbursts?</h3>
            <p className="text-sm text-muted-foreground">
              Side-by-side sunbursts work for comparison. Ensure same scale and color scheme. For many comparisons, consider small multiples layout.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle zero values?</h3>
            <p className="text-sm text-muted-foreground">
              Zero-value segments don't appear (no angle). This is correct - they represent nothing. Consider whether zero categories should be shown at all.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about negative values?</h3>
            <p className="text-sm text-muted-foreground">
              Sunbursts don't support negative values. They show parts of a whole, which can't be negative. Use different charts for data with negatives.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I export interactive sunbursts?</h3>
            <p className="text-sm text-muted-foreground">
              This tool generates static images. For interactive web sunbursts, use D3.js or similar libraries. Static exports work for reports and presentations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use treemap instead?</h3>
            <p className="text-sm text-muted-foreground">
              Treemaps use rectangles, better for precise comparison. Sunbursts are more visually appealing. Use treemaps for analysis, sunbursts for presentation.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
