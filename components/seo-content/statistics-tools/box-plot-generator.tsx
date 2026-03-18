import React from "react"

export default function BoxPlotGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Box Plot Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your dataset as numbers separated by commas, spaces, or newlines. You can input multiple groups by adding separate datasets, each labeled for comparison. The tool accepts decimal values and handles negative numbers.
          </p>
          <p>
            The generator calculates the five-number summary: minimum, first quartile (Q1), median (Q2), third quartile (Q3), and maximum. It then identifies outliers using the 1.5 × IQR rule, marking them as individual points beyond the whiskers.
          </p>
          <p>
            The box spans from Q1 to Q3 with a line at the median. Whiskers extend to the furthest non-outlier values. Outliers appear as dots beyond the whiskers. Multiple groups display side-by-side for easy visual comparison.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Comparing test scores across classes</h3>
            <p className="text-sm text-muted-foreground">
              Visualize exam results from different sections. See which class has higher median scores, more variability, or unusual outliers affecting averages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing product quality measurements</h3>
            <p className="text-sm text-muted-foreground">
              Compare dimensions from different production batches. Identify which batches have consistent measurements versus those with problematic variation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Salary distribution analysis</h3>
            <p className="text-sm text-muted-foreground">
              Display compensation ranges across departments or job levels. Spot pay equity issues and understand the spread beyond just average salaries.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Clinical trial results comparison</h3>
            <p className="text-sm text-muted-foreground">
              Show treatment response distributions for different drug dosages. Compare medians and variability to assess treatment effectiveness.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Website performance metrics</h3>
            <p className="text-sm text-muted-foreground">
              Compare page load times across different browsers or regions. Identify which combinations have consistent performance versus problematic outliers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sports statistics visualization</h3>
            <p className="text-sm text-muted-foreground">
              Display player performance distributions across a season. Compare different players or teams to see consistency and exceptional performances.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Box plots show distribution shape, not individual values.</strong>
              You see quartiles and outliers, but not the exact data points (except outliers). Use alongside other visualizations for complete understanding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">The IQR method defines outliers.</strong>
              Points beyond Q1 - 1.5×IQR or Q3 + 1.5×IQR are marked as outliers. This is standard but may flag valid extreme values in some datasets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Median is more robust than mean.</strong>
              The box plot center line shows the median, which isn't affected by extreme values. This makes box plots ideal for skewed distributions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Box width doesn't indicate sample size.</strong>
              All boxes appear the same width regardless of how many data points they represent. Consider noting sample sizes in labels.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When comparing groups, look at both median differences and box overlap. Non-overlapping boxes suggest meaningful differences. Also check if one group has much larger IQR - that indicates more variability worth investigating.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What do the whiskers represent?</h3>
            <p className="text-sm text-muted-foreground">
              Whiskers extend to the most extreme data points that aren't outliers. They show the range of typical values, excluding extreme outliers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are quartiles calculated?</h3>
            <p className="text-sm text-muted-foreground">
              Q1 is the 25th percentile, median is 50th, Q3 is 75th. Different methods exist for interpolation; this tool uses a standard percentile calculation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use box plots for small datasets?</h3>
            <p className="text-sm text-muted-foreground">
              Technically yes, but box plots work best with 20+ data points per group. Smaller datasets may not show meaningful quartile divisions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if the median line is off-center?</h3>
            <p className="text-sm text-muted-foreground">
              That indicates skewness. Median closer to Q1 means right skew (long tail above). Median closer to Q3 means left skew (long tail below).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I download the plot?</h3>
            <p className="text-sm text-muted-foreground">
              Use the download button to save as PNG or SVG. SVG is better for publications as it scales without quality loss. PNG works for presentations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize colors?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use the customization options to change box colors, whisker styles, and outlier markers. Match your organization's branding or publication requirements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference from violin plots?</h3>
            <p className="text-sm text-muted-foreground">
              Box plots show summary statistics. Violin plots show the full distribution density. Box plots are cleaner for comparing many groups side-by-side.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
