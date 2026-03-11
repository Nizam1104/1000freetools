import React from "react"

export default function BarGraphGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your data as category labels and values. Each category becomes a bar, with height proportional to its value. Bars can be displayed vertically (column chart) or horizontally.
          </p>
          <p>
            Customize colors, orientations, and labeling. Group multiple data series for comparison. Add value labels on bars for precise reading. The chart updates instantly as you type.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Data format:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Category, Value
Q1, 45000
Q2, 52000
Q3, 48000
Q4, 61000</pre>
          </div>
          <p>
            Interactive tooltips show exact values on hover. A data table displays all values with percentages of total. Download as PNG or SVG for reports and presentations.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sales performance by period</h3>
            <p className="text-sm text-muted-foreground">
              Compare monthly, quarterly, or yearly sales. Spot trends and seasonal patterns immediately. Management sees performance at a glance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Survey result comparison</h3>
            <p className="text-sm text-muted-foreground">
              Display response counts for each option. Bar lengths make differences obvious. More precise than pie charts for comparing similar values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Website analytics reporting</h3>
            <p className="text-sm text-muted-foreground">
              Show page views by page, sessions by channel, or conversions by source. Digital marketers track performance across dimensions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Inventory level monitoring</h3>
            <p className="text-sm text-muted-foreground">
              Compare stock levels across products or warehouses. Identify overstock and understock situations. Procurement teams make data-driven decisions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sports statistics visualization</h3>
            <p className="text-sm text-muted-foreground">
              Compare player stats, team records, or game results. Fans and analysts grasp performance differences. Great for sports presentations and articles.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Budget vs actual comparison</h3>
            <p className="text-sm text-muted-foreground">
              Side-by-side bars show budgeted vs actual spending. Variances are immediately visible. Finance teams track budget adherence effectively.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Bar charts work for categorical data.</strong>
              Categories should be distinct, not continuous. For continuous data over time, use line charts. Bar charts compare discrete items.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Start axis at zero.</strong>
              Truncated axes exaggerate differences. Always start at zero for honest representation. Non-zero bases can mislead viewers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Order matters for readability.</strong>
              Sort by value (descending) for easy comparison. Or use natural order (months, age groups). Random ordering makes patterns hard to see.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Horizontal bars for long labels.</strong>
              Category names fit better on horizontal bar charts. Vertical bars work for short labels. Choose orientation based on your label length.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use consistent colors for the same categories across multiple charts. Red for Product A in all charts builds visual consistency.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many bars work best?</h3>
            <p className="text-sm text-muted-foreground">
              5-10 bars is ideal for readability. More than 15 becomes cluttered. For many categories, consider grouping or using a different visualization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use horizontal vs vertical?</h3>
            <p className="text-sm text-muted-foreground">
              Vertical for time series or short labels. Horizontal for long category names or many categories. Horizontal also works better on mobile.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I show negative values?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, bars extend below the axis for negative values. Useful for profit/loss, temperature, or any metric that goes below zero.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference from histograms?</h3>
            <p className="text-sm text-muted-foreground">
              Bar charts compare categories. Histograms show distribution of continuous data. Bar charts have gaps between bars; histograms touch.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I compare multiple series?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use grouped or stacked bars. Grouped bars show side-by-side comparison. Stacked bars show part-to-whole relationships within categories.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I add value labels?</h3>
            <p className="text-sm text-muted-foreground">
              Value labels add precision but can clutter. Add them when exact values matter. For trend visualization, labels may be unnecessary.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I export for reports?</h3>
            <p className="text-sm text-muted-foreground">
              Download as PNG for documents and presentations. SVG for print publications where scalability matters. Both formats preserve quality.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
