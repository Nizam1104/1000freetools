import React from "react"

export default function PieChartMakerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your data as comma-separated values with category label and numeric value. Each row becomes a slice of the pie. The tool automatically calculates percentages based on the total.
          </p>
          <p>
            Customize the chart with a title, donut hole size (0 for pie, higher for donut), and toggle labels and legend. Colors are automatically assigned from a vibrant palette.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Data format:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Category, Value
Sales, 35
Marketing, 25
Engineering, 40</pre>
          </div>
          <p>
            The chart renders instantly with interactive tooltips showing exact values and percentages. A data summary table displays all categories with their values and percentage of total.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Budget allocation visualization</h3>
            <p className="text-sm text-muted-foreground">
              Show how budget is distributed across departments or categories. Stakeholders instantly see where money goes. Useful for board presentations and annual reports.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Market share comparison</h3>
            <p className="text-sm text-muted-foreground">
              Display company market share vs competitors. Visual impact of being #1 or #2 is immediate. Investors grasp competitive position at a glance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Survey response breakdown</h3>
            <p className="text-sm text-muted-foreground">
              Show distribution of multiple-choice responses. What percentage chose each option? Pie charts make proportions intuitive for non-technical audiences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Website traffic sources</h3>
            <p className="text-sm text-muted-foreground">
              Break down traffic by source: organic, paid, social, direct. Marketing teams see channel performance. Helps allocate marketing budget effectively.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Product category sales</h3>
            <p className="text-sm text-muted-foreground">
              Show revenue contribution by product line. Identify which products drive most revenue. Inventory and marketing decisions become data-driven.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Time allocation tracking</h3>
            <p className="text-sm text-muted-foreground">
              Visualize how time is spent across activities. Personal productivity or team capacity planning. Identify where time actually goes vs where you think it goes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Limit the number of slices.</strong>
              More than 6-7 slices becomes hard to read. Small slices look similar. Group minor categories into "Other" for cleaner charts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Pie charts show parts of whole.</strong>
              All slices must add to 100%. Don't use for unrelated values. If categories don't form a complete whole, use a bar chart instead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Humans aren't great at angle comparison.</strong>
              Similar-sized slices are hard to distinguish. Add percentage labels for precision. Consider bar charts for precise comparisons.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Donut charts have the same data.</strong>
              Donut (with hole) vs pie (solid) is aesthetic preference. Donuts can show a total in the center. Both encode data the same way.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Order slices from largest to smallest, starting at 12 o'clock. This creates a natural reading order. Put "Other" last regardless of size.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many categories work best?</h3>
            <p className="text-sm text-muted-foreground">
              3-5 categories is ideal. 6-7 is acceptable. More than that, consider grouping or using a different chart type. Readability decreases with more slices.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use negative values?</h3>
            <p className="text-sm text-muted-foreground">
              No, pie charts require positive values that sum to a meaningful total. Negative values don't make sense in a parts-of-whole visualization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I show percentages or values?</h3>
            <p className="text-sm text-muted-foreground">
              Show both if space allows. Percentages show proportion, values show magnitude. Labels can display "Category: Value (Percentage)" format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if two slices are similar size?</h3>
            <p className="text-sm text-muted-foreground">
              Add percentage labels for clarity. Consider exploding (pulling out) similar slices. Or use a bar chart which makes small differences more visible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize the colors?</h3>
            <p className="text-sm text-muted-foreground">
              This tool auto-assigns colors from a palette. For custom colors, download the SVG and edit in a vector tool, or use a more advanced charting library.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use a donut instead of pie?</h3>
            <p className="text-sm text-muted-foreground">
              Donuts look modern and can display a total in the center. Some studies suggest donuts are slightly easier to read. It's mostly aesthetic preference.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I export for presentations?</h3>
            <p className="text-sm text-muted-foreground">
              Download as PNG for PowerPoint or Google Slides. For print publications, SVG provides infinite scalability. Both formats preserve chart quality.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
