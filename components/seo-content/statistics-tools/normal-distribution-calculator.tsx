import React from "react"

export default function NormalDistributionCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Normal Distribution Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the mean (μ) and standard deviation (σ) for your normal distribution. These parameters define the bell curve's center and spread. Use sample statistics or population parameters depending on your data.
          </p>
          <p>
            Choose what to calculate: probability below a value (left tail), above a value (right tail), between two values, or find the value for a given percentile. Input your x-value(s) or target probability, and the calculator computes the result using the cumulative distribution function.
          </p>
          <p>
            The interactive bell curve displays your distribution with the relevant area shaded. Z-scores show how many standard deviations values are from the mean. Results include both the probability and its interpretation in context.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control specifications</h3>
            <p className="text-sm text-muted-foreground">
              Find what percentage of products fall within tolerance limits. If widget diameters are normally distributed, calculate the defect rate outside specs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Test score percentile ranking</h3>
            <p className="text-sm text-muted-foreground">
              Determine what percentile a score represents. If SAT scores have mean 1050 and SD 200, find what percentage scored below 1300.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Setting cutoff thresholds</h3>
            <p className="text-sm text-muted-foreground">
              Find the score that separates top 10% from the rest. Useful for grading curves, scholarship eligibility, or identifying outliers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Confidence interval calculations</h3>
            <p className="text-sm text-muted-foreground">
              Find critical values for confidence intervals. The middle 95% of a normal distribution falls within ±1.96 standard deviations of the mean.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Risk assessment modeling</h3>
            <p className="text-sm text-muted-foreground">
              Model financial returns or measurement errors. Calculate probability of losses exceeding a threshold or errors beyond acceptable limits.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Biological measurements analysis</h3>
            <p className="text-sm text-muted-foreground">
              Analyze heights, blood pressures, or lab values. Determine what percentage of a population falls in normal ranges or outside clinical thresholds.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">The 68-95-99.7 rule applies.</strong>
              About 68% of values fall within 1 SD of mean, 95% within 2 SD, 99.7% within 3 SD. This quick rule helps estimate probabilities without calculation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Z-scores standardize any normal distribution.</strong>
              Z = (x - μ) / σ converts any normal to standard normal (mean 0, SD 1). Z-tables and calculators work with these standardized values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Normal distribution is symmetric.</strong>
              Mean, median, and mode are all equal. Left and right halves are mirror images. This symmetry simplifies many probability calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Many phenomena approximate normality.</strong>
              Heights, test scores, measurement errors often follow normal distributions due to the Central Limit Theorem. But not everything is normal.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Always check if your data is approximately normal before using these calculations. Use histograms, Q-Q plots, or normality tests. Skewed or heavy-tailed data need different approaches.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if I don't know the standard deviation?</h3>
            <p className="text-sm text-muted-foreground">
              Use the sample standard deviation as an estimate. For small samples, use t-distribution instead of normal. The t-distribution accounts for SD uncertainty.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I find the z-score?</h3>
            <p className="text-sm text-muted-foreground">
              Z = (x - mean) / standard deviation. A z-score of 1.5 means the value is 1.5 standard deviations above the mean. Negative z-scores are below the mean.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the standard normal distribution?</h3>
            <p className="text-sm text-muted-foreground">
              Normal distribution with mean 0 and standard deviation 1. Any normal distribution can be converted to standard normal using z-scores.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for sample means?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, by the Central Limit Theorem. Sample means are normally distributed with SD = σ/√n. This is the basis for confidence intervals and hypothesis tests.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What percentile is the mean?</h3>
            <p className="text-sm text-muted-foreground">
              The mean is the 50th percentile (median) in a normal distribution. Half the values fall below the mean, half above, due to symmetry.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate are the calculations?</h3>
            <p className="text-sm text-muted-foreground">
              Very accurate - using numerical integration of the normal CDF. Results are precise to many decimal places. Real-world data uncertainty usually dominates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my data isn't normal?</h3>
            <p className="text-sm text-muted-foreground">
              Consider data transformation (like log), use non-parametric methods, or apply the Central Limit Theorem for sample means with large n.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
