import React from "react"

export default function ParetoChartMakerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your categories and their frequencies or costs. The tool sorts them from highest to lowest and creates bars for each category. A cumulative percentage line shows the running total.
          </p>
          <p>
            The chart combines a bar chart (individual values) with a line graph (cumulative percentage). This reveals which few categories account for most of the impact - the essence of the 80/20 rule.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Data format:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Category, Count
Defect A, 45
Defect B, 32
Defect C, 18
Defect D, 12
Defect E, 8</pre>
          </div>
          <p>
            The 80% line highlights the vital few categories. Focus improvement efforts there for maximum impact. Export for quality reports and presentations.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control defect analysis</h3>
            <p className="text-sm text-muted-foreground">
              Identify which defects occur most frequently. Fix the top 20% of defect types to eliminate 80% of problems. Quality teams prioritize effectively.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Customer complaint categorization</h3>
            <p className="text-sm text-muted-foreground">
              Analyze complaint types by frequency. Address top complaint categories first. Customer satisfaction improves with focused improvements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Inventory ABC analysis</h3>
            <p className="text-sm text-muted-foreground">
              Classify items by value contribution. A items (top 20%) drive 80% of value. Inventory control focuses on A items for maximum ROI.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Website error tracking</h3>
            <p className="text-sm text-muted-foreground">
              Track 404 errors by page. Fix top error sources first. User experience improves with targeted fixes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sales by customer analysis</h3>
            <p className="text-sm text-muted-foreground">
              Identify which customers drive most revenue. Focus relationship management on top accounts. Sales strategy becomes data-driven.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Time tracking by activity</h3>
            <p className="text-sm text-muted-foreground">
              See which activities consume most time. Eliminate or delegate low-value activities. Productivity improves with focused time allocation.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Data must be sortable by impact.</strong>
              Categories need numeric values (count, cost, time). The tool sorts by this value. Non-numeric data can't create a Pareto chart.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">The 80/20 rule isn't exact.</strong>
              It might be 70/30 or 90/10. The principle is that few causes create most effects. Don't fixate on exactly 80%.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">"Other" category goes last.</strong>
              Group minor categories as "Other" regardless of sort order. This keeps the chart focused on the vital few.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Two Y-axes can confuse readers.</strong>
              Left axis shows counts, right shows cumulative %. Label clearly. Some viewers miss the dual-axis nature.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Add a vertical line at 80% cumulative. This visually marks the vital few vs trivial many. Makes the insight immediate.
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
              5-10 categories is ideal. Fewer than 5 may not show the pattern. More than 10 becomes cluttered. Group minor items as "Other".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if there's no clear 80/20 split?</h3>
            <p className="text-sm text-muted-foreground">
              Not all data follows Pareto distribution. Uniform distribution means no category dominates. This is useful information too - problems are spread out.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use percentages instead of counts?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, percentages work fine. The cumulative line will still show the concentration. Just ensure percentages sum to 100%.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should bars be sorted descending?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, always sort from highest to lowest. This is essential for Pareto analysis. Unsorted bars defeat the purpose of the chart.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference from histogram?</h3>
            <p className="text-sm text-muted-foreground">
              Histograms show distribution of continuous data. Pareto charts show categorical data sorted by frequency. Different purposes, different data types.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I compare multiple Pareto charts?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, side-by-side Pareto charts show changes over time or between groups. Compare before/after improvements. Ensure same scale for valid comparison.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I present Pareto findings?</h3>
            <p className="text-sm text-muted-foreground">
              Highlight the vital few categories. Show what percentage of total they represent. Recommend focusing improvement efforts there.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
