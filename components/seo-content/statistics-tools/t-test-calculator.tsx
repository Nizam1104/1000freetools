import React from "react"

export default function TTestCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the T-Test Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select your test type: one-sample (compare mean to a known value), two-sample independent (compare means from two groups), or paired (compare before/after measurements on same subjects). Enter your data or summary statistics accordingly.
          </p>
          <p>
            For one-sample tests, enter your data values and the hypothesized mean. For two-sample tests, enter data for both groups or their summary statistics (mean, SD, n). For paired tests, enter the paired differences or both sets of measurements.
          </p>
          <p>
            The calculator computes the t-statistic, degrees of freedom, and p-value. It also provides the confidence interval for the mean difference. Results indicate whether the observed difference is statistically significant at common alpha levels.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">One-sample: Quality specification testing</h3>
            <p className="text-sm text-muted-foreground">
              Test if product weight differs from the target 500g. Determine if your manufacturing process is centered correctly on the specification.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Two-sample: Treatment comparison</h3>
            <p className="text-sm text-muted-foreground">
              Compare blood pressure reduction between drug and placebo groups. Assess if the treatment produces significantly different outcomes than control.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Paired: Pre-post intervention analysis</h3>
            <p className="text-sm text-muted-foreground">
              Measure employee productivity before and after training. Paired test accounts for individual differences, focusing on change within each person.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Two-sample: A/B testing analysis</h3>
            <p className="text-sm text-muted-foreground">
              Compare average order value between website versions. Test if the new design leads to higher spending per transaction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Paired: Method comparison studies</h3>
            <p className="text-sm text-muted-foreground">
              Compare two measurement techniques on the same samples. Determine if a new faster method gives equivalent results to the gold standard.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">One-sample: Survey benchmark comparison</h3>
            <p className="text-sm text-muted-foreground">
              Test if your customer satisfaction score differs from industry average of 7.5. See if you're performing above or below the benchmark.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">T-tests assume normal distribution.</strong>
              Data should be approximately normally distributed, especially for small samples. T-tests are robust to mild violations with larger samples.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Two-sample tests have variance assumptions.</strong>
              Equal variance (pooled) or unequal variance (Welch's) options available. Use Welch's when group variances differ substantially.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Paired tests are more powerful.</strong>
              When you can pair observations, use paired t-test. It removes between-subject variability, making it easier to detect true differences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">One-tailed vs two-tailed matters.</strong>
              Two-tailed tests detect any difference. One-tailed tests only detect difference in specified direction. Choose before seeing data.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Always check for outliers before running t-tests. A single extreme value can dramatically affect the mean and inflate variance, leading to misleading results.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use Welch's t-test?</h3>
            <p className="text-sm text-muted-foreground">
              Use Welch's when group variances are unequal or sample sizes differ greatly. It's safer and nearly as powerful as pooled when variances are equal.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the minimum sample size?</h3>
            <p className="text-sm text-muted-foreground">
              Technically 2 per group, but that's not useful. Aim for at least 15-20 per group for reasonable power. More is better for detecting small effects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I check normality?</h3>
            <p className="text-sm text-muted-foreground">
              Use histograms, Q-Q plots, or Shapiro-Wilk test. For n {">"} 30, the Central Limit Theorem makes normality less critical for the mean.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my data isn't normal?</h3>
            <p className="text-sm text-muted-foreground">
              Try data transformation (log, square root) or use non-parametric alternatives: Wilcoxon signed-rank (paired) or Mann-Whitney U (two-sample).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does the confidence interval tell me?</h3>
            <p className="text-sm text-muted-foreground">
              The CI shows the range of plausible values for the true mean difference. If it excludes 0, the difference is statistically significant.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for more than two groups?</h3>
            <p className="text-sm text-muted-foreground">
              No, use ANOVA for three or more groups. Multiple t-tests inflate Type I error rate. ANOVA controls the overall error rate.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's Cohen's d?</h3>
            <p className="text-sm text-muted-foreground">
              Cohen's d is the standardized effect size: mean difference divided by pooled SD. Values: 0.2 small, 0.5 medium, 0.8 large effect.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
