import React from "react"

export default function DescriptiveStatisticsCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Descriptive Statistics Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your dataset as numbers separated by commas, spaces, or newlines. The calculator accepts integers, decimals, positive and negative values. Large datasets process quickly with comprehensive results.
          </p>
          <p>
            The tool calculates measures of central tendency (mean, median, mode), measures of spread (range, variance, standard deviation, IQR), and distribution shape (skewness, kurtosis). It also computes quartiles, percentiles, and the five-number summary.
          </p>
          <p>
            Results display in an organized table with clear labels. A histogram shows the distribution shape. Box plot visualization highlights the spread and any outliers. All statistics update instantly as you modify your data.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Exploratory data analysis</h3>
            <p className="text-sm text-muted-foreground">
              Get your first look at a new dataset. Understand the basic characteristics before running complex analyses. Identify data quality issues early.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Report generation</h3>
            <p className="text-sm text-muted-foreground">
              Create summary statistics for stakeholder reports. Provide mean, median, and spread measures to give a complete picture of your data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control dashboards</h3>
            <p className="text-sm text-muted-foreground">
              Monitor process metrics over time. Track mean and standard deviation of key measurements to ensure consistent product quality.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Academic research</h3>
            <p className="text-sm text-muted-foreground">
              Report sample characteristics in research papers. Descriptive statistics are required in the methods or results section of most studies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Business intelligence</h3>
            <p className="text-sm text-muted-foreground">
              Summarize sales, customer, or operational data. Understand typical values and variability to make informed business decisions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Data validation</h3>
            <p className="text-sm text-muted-foreground">
              Check if data looks reasonable. Unexpected min/max values or unusual skewness can reveal data collection or entry problems.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Mean is sensitive to outliers.</strong>
              Extreme values pull the mean toward them. Median is more robust. Report both when data is skewed or has outliers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Standard deviation uses same units as data.</strong>
              Variance is in squared units, harder to interpret. SD is in original units, making it easier to understand spread in context.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Skewness indicates asymmetry.</strong>
              Positive skew: long right tail (like income). Negative skew: long left tail. Zero skew: symmetric distribution.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">IQR shows middle 50% spread.</strong>
              Interquartile range (Q3 - Q1) is resistant to outliers. Better than range for describing typical spread in skewed data.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Always visualize your data alongside descriptive statistics. Anscombe's quartet proves datasets can have identical statistics but completely different patterns. Graphs reveal what numbers hide.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use median instead of mean?</h3>
            <p className="text-sm text-muted-foreground">
              Use median for skewed data or data with outliers. Income, home prices, and reaction times are often skewed. Mean is fine for symmetric distributions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between sample and population SD?</h3>
            <p className="text-sm text-muted-foreground">
              Sample SD divides by (n-1), population SD divides by n. Use sample SD when your data is a subset of a larger population you're studying.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does kurtosis tell me?</h3>
            <p className="text-sm text-muted-foreground">
              Kurtosis measures tail heaviness. High kurtosis: more extreme values than normal. Low kurtosis: fewer extremes. Normal distribution has kurtosis of 3.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can standard deviation be negative?</h3>
            <p className="text-sm text-muted-foreground">
              No. SD is always zero or positive. Zero SD means all values are identical. Larger SD means more spread in the data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the coefficient of variation?</h3>
            <p className="text-sm text-muted-foreground">
              CV = (SD / mean) × 100%. It's relative variability as a percentage. Useful for comparing spread across datasets with different units or scales.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I interpret skewness values?</h3>
            <p className="text-sm text-muted-foreground">
              Between -0.5 and 0.5: approximately symmetric. -0.5 to -1 or 0.5 to 1: moderately skewed. Beyond ±1: highly skewed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the five-number summary?</h3>
            <p className="text-sm text-muted-foreground">
              Minimum, Q1, median, Q3, maximum. These five values describe the distribution's center, spread, and range. Used to create box plots.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
