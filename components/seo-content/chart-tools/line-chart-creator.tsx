import React from "react"

export default function LineChartCreatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your data as X-Y pairs, typically time periods and values. Each point connects to the next with a line, showing trends over the sequence. Multiple data series can be plotted together for comparison.
          </p>
          <p>
            Customize line colors, styles (solid, dashed, dotted), and point markers. Add trend lines, grid lines, and axis labels. The chart updates instantly as you modify data.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Data format:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Date, Sales, Profit
Jan 2024, 45000, 12000
Feb 2024, 52000, 15000
Mar 2024, 48000, 11000</pre>
          </div>
          <p>
            Interactive tooltips display exact values on hover. Statistics show trend direction and rate of change. Download for reports, presentations, or dashboards.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Stock price tracking</h3>
            <p className="text-sm text-muted-foreground">
              Plot stock prices over days, weeks, or years. Identify trends, support/resistance levels, and patterns. Investors make decisions based on price history.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Website traffic monitoring</h3>
            <p className="text-sm text-muted-foreground">
              Track daily visitors, page views, or conversions. Spot traffic spikes and drops. Correlate with marketing campaigns or content changes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Temperature or weather data</h3>
            <p className="text-sm text-muted-foreground">
              Plot temperature changes over time. Show seasonal patterns or climate trends. Scientists and meteorologists communicate findings visually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Project progress tracking</h3>
            <p className="text-sm text-muted-foreground">
              Show completed tasks, budget spent, or hours logged over time. Compare planned vs actual progress. Project managers identify delays early.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fitness progress monitoring</h3>
            <p className="text-sm text-muted-foreground">
              Track weight, running times, or strength gains. Visual progress motivates continued effort. See long-term trends beyond daily fluctuations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Economic indicator analysis</h3>
            <p className="text-sm text-muted-foreground">
              Plot GDP, unemployment, or inflation over time. Economists identify cycles and trends. Policy makers use historical patterns for decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Line charts show continuous data.</strong>
              Best for time series or ordered sequences. Don't use for unrelated categories. Line implies connection between points.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Time intervals should be consistent.</strong>
              Equal spacing between points (daily, monthly, yearly). Irregular intervals can mislead. Use scatter plots for irregular time data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Too many lines create clutter.</strong>
              3-5 lines work well together. More becomes confusing. For many series, use small multiples or interactive filtering.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Correlation isn't causation.</strong>
              Two lines moving together doesn't mean one causes the other. There may be a third factor. Be careful drawing conclusions.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use different line styles (solid, dashed, dotted) in addition to colors. This helps colorblind users and black-and-white printing.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many data points work best?</h3>
            <p className="text-sm text-muted-foreground">
              Minimum 3-4 points to show a trend. 10-20 points shows clear patterns. 50+ points reveals detailed trends. Too few points may misrepresent the pattern.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I show missing data?</h3>
            <p className="text-sm text-muted-foreground">
              Gaps in the line indicate missing data points. This is honest representation. Don't connect across gaps - it implies data that doesn't exist.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I start the Y-axis at zero?</h3>
            <p className="text-sm text-muted-foreground">
              For absolute values, yes. For changes or indices, starting at non-zero can be appropriate. Be transparent about axis choices to avoid misleading.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference from area charts?</h3>
            <p className="text-sm text-muted-foreground">
              Line charts show trends with lines. Area charts fill below the line, emphasizing volume. Use lines for precise values, areas for cumulative impact.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add a trend line?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, add a linear regression line to show overall direction. Helps distinguish signal from noise. Useful for forecasting future values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I compare different scales?</h3>
            <p className="text-sm text-muted-foreground">
              Use dual Y-axes (left and right) for different scales. Or normalize data to percentages. Be careful - dual axes can be misleading if not labeled clearly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about logarithmic scales?</h3>
            <p className="text-sm text-muted-foreground">
              Log scales show percentage changes equally. Useful for exponential growth or wide value ranges. Label clearly - log scales aren't intuitive for all viewers.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
