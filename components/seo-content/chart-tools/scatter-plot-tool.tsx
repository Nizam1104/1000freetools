import React from "react"

export default function ScatterPlotToolSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your data as comma-separated values with label, X coordinate, Y coordinate, and optional size for bubble charts. Each line represents one data point on the scatter plot.
          </p>
          <p>
            Customize the chart appearance with point shapes (circle, cross, diamond, square, star, triangle), sizes, and colors. Enable bubble chart mode to size points by a third variable. Add trend lines to visualize correlations.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Data format:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Label, X, Y, Size
Point A, 10, 20, 5
Point B, 15, 25, 8</pre>
          </div>
          <p>
            The chart renders instantly with interactive tooltips. Zoom in to examine clusters, hover for details. Statistics panel shows mean, median, and standard deviation for both axes.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scientific research data visualization</h3>
            <p className="text-sm text-muted-foreground">
              Plot experimental results to identify correlations. X-axis for independent variable, Y-axis for dependent. Trend lines show relationship strength with R-squared values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Business analytics dashboards</h3>
            <p className="text-sm text-muted-foreground">
              Compare marketing spend vs revenue, price vs demand, or any two business metrics. Bubble size can represent a third dimension like market share or customer count.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control analysis</h3>
            <p className="text-sm text-muted-foreground">
              Plot production measurements to identify outliers. Points outside expected ranges indicate quality issues. Visual pattern reveals systematic problems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Academic statistics assignments</h3>
            <p className="text-sm text-muted-foreground">
              Students create scatter plots for statistics coursework. Calculate correlations, identify relationships, and present findings visually. Export for reports.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Real estate market analysis</h3>
            <p className="text-sm text-muted-foreground">
              Plot property size vs price, distance from city vs value, or age vs price. Identify market trends and pricing patterns across neighborhoods.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Health and fitness tracking</h3>
            <p className="text-sm text-muted-foreground">
              Correlate exercise minutes vs weight loss, calories vs energy levels, or sleep vs performance. Visual patterns motivate behavior changes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Correlation doesn't imply causation.</strong>
              A trend line shows relationship, not cause. Two variables may correlate due to a third factor. Be careful drawing conclusions from scatter plots alone.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Outliers affect trend lines.</strong>
              Extreme values pull the trend line toward them. Consider whether outliers are errors or valid data. You may need to analyze with and without them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">R-squared indicates fit quality.</strong>
              R-squared near 1 means strong linear relationship. Near 0 means weak or no linear relationship. Low R-squared doesn't mean no relationship - it might be non-linear.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Bubble size can mislead.</strong>
              Area scales with the square of radius. A bubble twice as wide represents 4x the value. Consider this when interpreting bubble charts.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For publication-quality charts, export as SVG and edit in vector software. Adjust fonts, add annotations, and ensure accessibility compliance.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many data points do I need?</h3>
            <p className="text-sm text-muted-foreground">
              Minimum 2 points for a trend line. 10+ points show meaningful patterns. 30+ points reveal distribution characteristics. More data = more reliable correlations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I import data from Excel?</h3>
            <p className="text-sm text-muted-foreground">
              Copy cells from Excel and paste directly. Or save as CSV and paste the content. The tool accepts comma-separated values in the specified format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does the trend line tell me?</h3>
            <p className="text-sm text-muted-foreground">
              The trend line shows the general direction of the relationship. Upward slope = positive correlation. Downward = negative. Flat = no linear correlation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I identify outliers?</h3>
            <p className="text-sm text-muted-foreground">
              Outliers appear far from the main cluster or trend line. The statistics panel shows standard deviation. Points beyond 2-3 standard deviations may be outliers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I compare multiple datasets?</h3>
            <p className="text-sm text-muted-foreground">
              Enter all data with different labels. Each unique label gets a different color. The legend identifies each group for easy comparison.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between scatter and bubble chart?</h3>
            <p className="text-sm text-muted-foreground">
              Scatter plots show X-Y relationships with uniform points. Bubble charts add a third dimension - point size represents another variable. Same chart, different encoding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I export for presentations?</h3>
            <p className="text-sm text-muted-foreground">
              Use the Download button for PNG export. For PowerPoint, PNG works best. For print publications, SVG provides infinite scalability without quality loss.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
