import React from "react"

export default function BubbleChartCreatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your data with X position, Y position, and bubble size. Each data point becomes a circle positioned by X and Y, sized by the third variable. Optionally add a fourth dimension with color.
          </p>
          <p>
            The chart displays bubbles of varying sizes at different positions. Larger bubbles represent larger values. Color can encode categories or a fourth numeric variable.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Data format:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Country, GDP, Life Expectancy, Population, Region
USA, 21000, 78.5, 331, North America
China, 14000, 76.9, 1441, Asia
India, 2900, 69.7, 1380, Asia</pre>
          </div>
          <p>
            Interactive tooltips show all values for each bubble. Hover to see exact numbers. Export for reports showing multi-dimensional data relationships.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Economic indicator comparison</h3>
            <p className="text-sm text-muted-foreground">
              Plot GDP vs life expectancy, bubble size by population. See development patterns across countries. Policymakers identify outliers and trends.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Market segmentation analysis</h3>
            <p className="text-sm text-muted-foreground">
              Map customer segments by revenue and growth. Bubble size shows segment size. Strategy focuses on attractive segments.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Product portfolio visualization</h3>
            <p className="text-sm text-muted-foreground">
              Plot products by market share and growth rate. Bubble size shows revenue. BCG matrix style analysis for portfolio decisions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Research paper citation analysis</h3>
            <p className="text-sm text-muted-foreground">
              Map papers by publication year and citations. Bubble size shows impact factor. Researchers identify influential work and trends.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Investment portfolio display</h3>
            <p className="text-sm text-muted-foreground">
              Plot holdings by risk and return. Bubble size shows allocation. Investors see portfolio balance and concentration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sports player comparison</h3>
            <p className="text-sm text-muted-foreground">
              Compare players by two stats, bubble by salary or playing time. Scouts identify value and performance patterns.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Bubble area represents value, not radius.</strong>
              A bubble with 4x the area represents 4x the value. But it looks only 2x wider. This can mislead viewers about magnitude differences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Overlapping bubbles hide data.</strong>
              Dense clusters obscure individual bubbles. Consider transparency or jittering. Too much overlap reduces chart effectiveness.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Four dimensions is the practical limit.</strong>
              X, Y, size, and color is maximum readable. More dimensions requires animation, interactivity, or multiple charts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Size perception is imprecise.</strong>
              Humans aren't great at comparing circle areas. Add value labels for precision. Use bubble charts for patterns, tables for exact values.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Cap maximum bubble size to prevent domination. One huge bubble can overwhelm the chart. Set reasonable size limits.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many bubbles work best?</h3>
            <p className="text-sm text-muted-foreground">
              10-30 bubbles is ideal. Fewer than 10 may not show patterns. More than 50 becomes cluttered. For many points, consider scatter plots.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if bubbles overlap too much?</h3>
            <p className="text-sm text-muted-foreground">
              Use transparency so overlapping bubbles show through. Or enable labels only on hover. Consider jittering to separate overlapping points.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use negative values for size?</h3>
            <p className="text-sm text-muted-foreground">
              No, bubble size must be positive. Negative values don't make sense for size. Use different colors or positions for negative categories.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How is this different from scatter plots?</h3>
            <p className="text-sm text-muted-foreground">
              Scatter plots show X-Y relationships with uniform points. Bubble charts add size as a third dimension. Same chart type, different encoding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use color for categories or values?</h3>
            <p className="text-sm text-muted-foreground">
              Categories work better with distinct colors. Continuous values work with color gradients. Choose based on your fourth variable type.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I animate bubble charts?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, animation shows changes over time. Hans Rosling's famous presentations used animated bubble charts. Requires interactive visualization tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I export for presentations?</h3>
            <p className="text-sm text-muted-foreground">
              Download as PNG for slides. SVG for editing and scaling. Add annotations in presentation software to highlight key insights.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
