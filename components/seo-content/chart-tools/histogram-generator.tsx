import React from "react"

export default function HistogramGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your raw data values, one per line or comma-separated. The tool automatically groups values into bins (ranges) and counts how many fall into each bin. This creates the histogram distribution.
          </p>
          <p>
            Adjust the number of bins to control granularity. More bins show finer detail, fewer bins show broader patterns. The tool suggests an optimal bin count based on your data size.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Histogram vs bar chart:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Histogram:</strong> Shows distribution of continuous data, bars touch</li>
              <li><strong>Bar chart:</strong> Compares categories, bars have gaps</li>
              <li><strong>Histogram:</strong> X-axis is numeric ranges (bins)</li>
              <li><strong>Bar chart:</strong> X-axis is categorical labels</li>
            </ul>
          </div>
          <p>
            Statistics panel shows mean, median, standard deviation, and skewness. Understand your data's central tendency and spread. Export for statistical reports.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Test score distribution analysis</h3>
            <p className="text-sm text-muted-foreground">
              See how students performed across the range. Normal distribution shows fair test. Skewed distribution indicates too easy or hard. Educators adjust teaching accordingly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control measurements</h3>
            <p className="text-sm text-muted-foreground">
              Plot product dimensions or weights. Normal distribution centered on target means good process. Wide spread or off-center indicates process issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Website session duration</h3>
            <p className="text-sm text-muted-foreground">
              Understand how long visitors stay. Right-skewed is normal - many short visits, few long ones. Changes in distribution signal content or UX issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Income or salary distribution</h3>
            <p className="text-sm text-muted-foreground">
              Visualize wealth distribution in populations. Right-skewed is typical. Compare distributions across regions or time periods for economic analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scientific measurement analysis</h3>
            <p className="text-sm text-muted-foreground">
              Plot experimental measurements. Normal distribution validates measurement process. Outliers or unusual shapes indicate experimental issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Call center wait times</h3>
            <p className="text-sm text-muted-foreground">
              Analyze customer wait time distribution. Target is tight distribution around low values. Long tail indicates occasional excessive waits needing attention.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Bin count affects appearance.</strong>
              Too few bins hides patterns. Too many bins creates noise. Sturges' formula (used here) suggests bins = 1 + log2(n). Experiment to find the best view.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Sample size matters.</strong>
              Small samples (under 30) produce unreliable histograms. 100+ data points gives meaningful distributions. Very large samples reveal fine structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Normal distribution is common.</strong>
              Many natural phenomena follow the bell curve. But don't force normal expectations. Skewed, bimodal, and uniform distributions are all valid.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Outliers affect binning.</strong>
              Extreme values stretch the axis, compressing the main distribution. Consider whether outliers are errors or valid data before removing.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Overlay a normal curve on your histogram to compare actual vs expected distribution. Deviations from normal reveal interesting patterns.
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
              Minimum 20-30 points for basic shape. 100+ for reliable patterns. 500+ reveals fine structure. More data = more trustworthy distribution.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does skewness tell me?</h3>
            <p className="text-sm text-muted-foreground">
              Positive skew (right tail) means most values are low with some high outliers. Negative skew (left tail) means most values are high. Zero skew is symmetric.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are there gaps in my histogram?</h3>
            <p className="text-sm text-muted-foreground">
              Gaps mean no data in those ranges. This could indicate bimodal distribution (two peaks) or data issues. Investigate why certain ranges have no values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I set custom bin ranges?</h3>
            <p className="text-sm text-muted-foreground">
              This tool auto-calculates bins. For custom ranges, use statistical software like R, Python, or Excel. Custom bins are useful for specific thresholds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference from box plots?</h3>
            <p className="text-sm text-muted-foreground">
              Histograms show full distribution shape. Box plots show summary statistics. Use histograms for shape analysis, box plots for group comparison.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I identify outliers?</h3>
            <p className="text-sm text-muted-foreground">
              Look for isolated bars far from the main distribution. Values beyond 3 standard deviations are typically outliers. Consider their validity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I compare two distributions?</h3>
            <p className="text-sm text-muted-foreground">
              Create separate histograms and place side by side. Or use overlapping transparent histograms. For formal comparison, use statistical tests.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
