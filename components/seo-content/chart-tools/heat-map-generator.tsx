import React from "react"

export default function HeatMapGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your data as a matrix with row labels, column labels, and values. Each cell becomes a colored square, with color intensity representing the value. Higher values get more intense colors.
          </p>
          <p>
            Choose a color scheme: sequential (light to dark) for magnitude, diverging (two colors) for positive/negative values, or categorical for distinct groups. The color scale automatically adjusts to your data range.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Data format:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Day, 9AM, 10AM, 11AM, 12PM
Monday, 45, 78, 92, 65
Tuesday, 52, 81, 88, 71
Wednesday, 48, 75, 95, 68</pre>
          </div>
          <p>
            Interactive tooltips show exact values on hover. Patterns emerge instantly - high and low values cluster visibly. Export for reports showing patterns across two dimensions.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Website click tracking</h3>
            <p className="text-sm text-muted-foreground">
              Show which page areas get most clicks. Designers see hot and cold zones. UX improvements target low-engagement areas.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sales by day and hour</h3>
            <p className="text-sm text-muted-foreground">
              Identify peak sales times. Staff scheduling matches demand patterns. Revenue increases with optimal staffing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Correlation matrix visualization</h3>
            <p className="text-sm text-muted-foreground">
              Show correlations between many variables. Strong correlations stand out. Data scientists identify relationships quickly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Gene expression analysis</h3>
            <p className="text-sm text-muted-foreground">
              Biologists visualize gene activity across conditions. Patterns reveal gene clusters and relationships. Research insights emerge visually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Performance metrics dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Show KPIs across departments and time. Red cells flag problems instantly. Management attention goes where needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Calendar activity visualization</h3>
            <p className="text-sm text-muted-foreground">
              GitHub-style contribution graphs show activity over time. Streaks and gaps are obvious. Motivation comes from visual consistency.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Color choice affects interpretation.</strong>
              Sequential schemes show magnitude. Diverging schemes show deviation from center. Choose based on your data story.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Colorblind accessibility matters.</strong>
              Red-green colorblindness is common. Use colorblind-safe palettes. Add patterns or labels for critical distinctions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Cell size affects pattern visibility.</strong>
              Too small: patterns blur together. Too large: subtle variations hide. Adjust cell size for your data density.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Outliers can compress the scale.</strong>
              One extreme value makes all others look similar. Consider log scale or capping extremes for better differentiation.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Add row and column clustering to group similar patterns. Related rows/columns appear adjacent, revealing hidden structures.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many cells work best?</h3>
            <p className="text-sm text-muted-foreground">
              10x10 to 20x20 works well. Smaller matrices may be better as tables. Larger matrices become hard to read individually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What color scheme should I use?</h3>
            <p className="text-sm text-muted-foreground">
              Sequential (light blue to dark blue) for magnitude. Diverging (blue-white-red) for positive/negative. Categorical for distinct groups.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I show missing data?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use gray or white for missing values. This distinguishes missing from zero. Important for accurate interpretation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I add value labels?</h3>
            <p className="text-sm text-muted-foreground">
              For small matrices, yes. For large ones, labels create clutter. Use tooltips for exact values, colors for patterns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle negative values?</h3>
            <p className="text-sm text-muted-foreground">
              Use a diverging color scheme with neutral center. Negative values one color, positive another. Zero or mean at center.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I reorder rows and columns?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, clustering or manual reordering reveals patterns. Group similar rows/columns together. Order affects pattern visibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference from choropleth maps?</h3>
            <p className="text-sm text-muted-foreground">
              Heat maps show data matrices. Choropleth maps show geographic data. Same visual encoding, different data types.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
