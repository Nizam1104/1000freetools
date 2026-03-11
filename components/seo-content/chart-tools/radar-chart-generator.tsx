import React from "react"

export default function RadarChartGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your variables and their values. Each variable becomes an axis radiating from the center. Values are plotted on their axis and connected to form a polygon shape.
          </p>
          <p>
            Multiple data series can be overlaid for comparison. Each series gets a different color. The resulting shapes show strengths and weaknesses across all dimensions at once.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Data format:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Variable, Product A, Product B
Performance, 85, 72
Design, 90, 65
Value, 70, 88
Support, 75, 80
Features, 88, 75</pre>
          </div>
          <p>
            The chart renders with concentric grid lines showing value levels. Interactive tooltips display exact values. Compare shapes to see which excels in which areas.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Product comparison matrices</h3>
            <p className="text-sm text-muted-foreground">
              Compare products across multiple attributes. See which product excels where. Consumers make informed decisions based on their priorities.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Employee performance reviews</h3>
            <p className="text-sm text-muted-foreground">
              Show performance across competencies. Managers and employees see strengths and development areas. Career planning becomes data-driven.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Video game character stats</h3>
            <p className="text-sm text-muted-foreground">
              Display character attributes: strength, speed, intelligence, etc. Gamers compare characters. Game balance becomes visible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Restaurant review scoring</h3>
            <p className="text-sm text-muted-foreground">
              Rate food, service, ambiance, value, location. Diners see overall profile. Restaurants identify improvement areas.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Skills assessment visualization</h3>
            <p className="text-sm text-muted-foreground">
              Map individual skills across categories. Job seekers show capabilities. Employers assess candidate fit across dimensions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Country development indicators</h3>
            <p className="text-sm text-muted-foreground">
              Compare nations across GDP, education, health, freedom, etc. Policymakers see relative standing. International comparisons become clear.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">All axes should use the same scale.</strong>
              Variables must be comparable (0-100, 1-5, etc.). Different scales distort the shape. Normalize data if scales differ.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Axis order affects shape appearance.</strong>
              Adjacent variables connect directly. Different ordering creates different shapes from same data. Order logically or alphabetically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Area doesn't equal overall score.</strong>
              A larger polygon doesn't necessarily mean better. A balanced profile may have smaller area than a spiky one. Consider average too.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Too many variables creates clutter.</strong>
              5-8 variables work well. More than 10 becomes hard to read. Group related variables or create multiple charts.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use transparency for overlapping series. This lets viewers see all shapes clearly. 50-70% opacity works well for 2-3 series.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many variables work best?</h3>
            <p className="text-sm text-muted-foreground">
              5-7 variables is ideal. 3-4 works but looks sparse. 8-10 is the practical maximum. More becomes visually overwhelming.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I compare many series?</h3>
            <p className="text-sm text-muted-foreground">
              2-4 series overlay well. More than that becomes confusing. For many series, use small multiples or interactive highlighting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference from spider charts?</h3>
            <p className="text-sm text-muted-foreground">
              They're the same thing. "Radar chart", "spider chart", and "web chart" are different names for the same visualization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I connect the last point to first?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, radar charts are closed polygons. The last variable connects back to the first. This creates the characteristic web shape.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle missing data?</h3>
            <p className="text-sm text-muted-foreground">
              Gaps in the polygon indicate missing values. Or use zero/null and note it in legend. Don't interpolate missing values without noting it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use non-numeric data?</h3>
            <p className="text-sm text-muted-foreground">
              No, radar charts require numeric values. Convert ratings (poor/fair/good) to numbers (1/2/3) first. Ordinal data works with numeric mapping.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use bar charts instead?</h3>
            <p className="text-sm text-muted-foreground">
              Bar charts are better for precise value comparison. Radar charts show overall profiles. Use bars for accuracy, radar for patterns.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
