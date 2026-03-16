import React from "react"

export default function BoxPlotMakerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Choose between raw data mode or summary statistics mode. In raw data mode, enter individual values for each group. The tool calculates quartiles, median, and identifies outliers automatically.
          </p>
          <p>
            In summary mode, enter the five-number summary directly: minimum, first quartile (Q1), median, third quartile (Q3), and maximum. Use this when you already have calculated statistics.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Box plot components:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Box:</strong> Spans from Q1 to Q3 (the IQR)</li>
              <li><strong>Median line:</strong> Line inside the box at median value</li>
              <li><strong>Whiskers:</strong> Lines extending to min and max (excluding outliers)</li>
              <li><strong>Outliers:</strong> Individual points beyond the whiskers</li>
              <li><strong>Mean point:</strong> Optional marker showing average</li>
            </ul>
          </div>
          <p>
            The box plot renders with interactive tooltips showing exact values. A statistics table displays all calculated values including IQR and range. Export for reports and presentations.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Comparing test scores across classes</h3>
            <p className="text-sm text-muted-foreground">
              Compare exam results between different class sections. See which class has higher median, more variability, or unusual outliers. Identify teaching effectiveness patterns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control in manufacturing</h3>
            <p className="text-sm text-muted-foreground">
              Compare product measurements across production lines or shifts. Spot which line has more variability. Outliers indicate potential quality issues needing investigation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Clinical trial data analysis</h3>
            <p className="text-sm text-muted-foreground">
              Compare treatment responses across dosage groups. Box plots show median response, variability, and extreme reactions. Essential for pharmaceutical research.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Salary benchmarking</h3>
            <p className="text-sm text-muted-foreground">
              Compare compensation across departments, roles, or companies. See median salaries, pay ranges, and outliers. HR teams use this for compensation planning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">A/B testing results</h3>
            <p className="text-sm text-muted-foreground">
              Compare metric distributions between test variants. Box plots show if one variant consistently outperforms. More informative than just comparing means.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Environmental data comparison</h3>
            <p className="text-sm text-muted-foreground">
              Compare pollution levels across locations or time periods. Identify which sites exceed norms. Outliers may indicate contamination events.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Outliers use the 1.5 IQR rule.</strong>
              Points beyond 1.5 times the IQR from the quartiles are marked as outliers. This is the standard statistical definition. Some fields use different thresholds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Box shows the middle 50%.</strong>
              The box spans Q1 to Q3, containing half your data. A tall box means high variability. A short box means data is concentrated.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Median is more robust than mean.</strong>
              The median line isn't affected by outliers. The optional mean point shows the average. Compare them - big differences indicate skew.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Whiskers don't always reach min/max.</strong>
              Whiskers extend to the furthest non-outlier points. Actual min/max may be outliers beyond the whiskers. Check the statistics table for exact values.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For skewed distributions, the median won't be centered in the box. This is informative - it shows the data isn't symmetric. Don't force symmetry.
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
              Minimum 4-5 points per group for meaningful quartiles. 20+ points gives reliable statistics. Small samples produce unstable box plots.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if all values are the same?</h3>
            <p className="text-sm text-muted-foreground">
              The box collapses to a line. Q1, median, and Q3 are identical. This indicates zero variability - all values are the same.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I compare many groups?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but readability decreases with many groups. 5-8 groups work well. For more, consider splitting into multiple charts or using a different visualization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are quartiles calculated?</h3>
            <p className="text-sm text-muted-foreground">
              Using the standard method: Q1 is the 25th percentile, Q3 is the 75th percentile. For small datasets, different methods give slightly different results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does overlapping boxes mean?</h3>
            <p className="text-sm text-muted-foreground">
              Overlapping IQR boxes suggest groups may not be significantly different. Non-overlapping boxes suggest real differences. Statistical tests confirm significance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I export the statistics?</h3>
            <p className="text-sm text-muted-foreground">
              The statistics table shows all values. Copy from the table or export the chart. For raw data export, copy your input data before closing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use box plots vs histograms?</h3>
            <p className="text-sm text-muted-foreground">
              Box plots excel at comparing groups side by side. Histograms show distribution shape better. Use box plots for comparison, histograms for single distribution analysis.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
