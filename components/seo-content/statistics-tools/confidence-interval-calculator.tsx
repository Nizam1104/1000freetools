import React from "react"

export default function ConfidenceIntervalCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Confidence Interval Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Choose whether you're estimating a population mean or a proportion. For means, enter sample mean, sample standard deviation, and sample size. For proportions, enter the number of successes and sample size (or enter the sample proportion directly).
          </p>
          <p>
            Select your confidence level - typically 90%, 95%, or 99%. Higher confidence produces wider intervals. The calculator uses the t-distribution for means (when population SD is unknown) or the normal distribution for proportions with large samples.
          </p>
          <p>
            Results show the confidence interval bounds, margin of error, and point estimate. The interval represents the range of plausible values for the population parameter. A visual display shows the interval with the point estimate marked.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Survey result reporting</h3>
            <p className="text-sm text-muted-foreground">
              Report poll results with margin of error. "52% support (95% CI: 48%-56%)" shows the precision of your estimate from sample data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control specifications</h3>
            <p className="text-sm text-muted-foreground">
              Estimate average product dimension with confidence bounds. Verify if the entire confidence interval falls within specification limits.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Clinical trial outcomes</h3>
            <p className="text-sm text-muted-foreground">
              Report treatment effect with confidence interval. Shows both the estimated effect and the precision of that estimate for medical decision-making.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">A/B test result analysis</h3>
            <p className="text-sm text-muted-foreground">
              Show conversion rate difference with confidence bounds. If the interval excludes zero, the difference is statistically significant.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Manufacturing process validation</h3>
            <p className="text-sm text-muted-foreground">
              Estimate process capability with confidence. Ensure the entire interval meets quality requirements, not just the point estimate.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Academic research reporting</h3>
            <p className="text-sm text-muted-foreground">
              Report study findings with confidence intervals. Modern journals prefer CIs over just p-values as they show effect size and precision.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Confidence level is about the method, not the interval.</strong>
              95% confidence means 95% of intervals from repeated sampling would contain the true value. Your specific interval either does or doesn't contain it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Larger samples give narrower intervals.</strong>
              Margin of error decreases with √n. Quadrupling sample size halves the margin of error. More data means more precise estimates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Higher confidence means wider intervals.</strong>
              99% CI is wider than 95% CI. You gain confidence but lose precision. Choose based on how critical it is to capture the true value.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">t-distribution accounts for SD uncertainty.</strong>
              When using sample SD (not population SD), t-distribution gives wider intervals, especially for small samples. Approaches normal for large n.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Confidence intervals that include the null value (0 for differences, 1 for ratios) indicate non-significant results at the corresponding alpha level. A 95% CI excluding 0 means p < 0.05.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the margin of error?</h3>
            <p className="text-sm text-muted-foreground">
              Margin of error is half the confidence interval width. If CI is 45% to 55%, the margin of error is ±5%. It's the maximum expected difference from the true value.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why use t-distribution for means?</h3>
            <p className="text-sm text-muted-foreground">
              When population SD is unknown and estimated from sample, there's extra uncertainty. The t-distribution accounts for this, giving appropriately wider intervals.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can confidence intervals be one-sided?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, when you only care about an upper or lower bound. A one-sided 95% CI uses the same critical value as a two-sided 90% CI.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my sample is small?</h3>
            <p className="text-sm text-muted-foreground">
              For means with n < 30, ensure data is approximately normal. The t-distribution handles small samples but assumes normality. For proportions, need np ≥ 10 and n(1-p) ≥ 10.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I interpret overlapping CIs?</h3>
            <p className="text-sm text-muted-foreground">
              Overlapping CIs don't necessarily mean no significant difference. For comparing two means, check if the CI for the difference excludes zero.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the standard error?</h3>
            <p className="text-sm text-muted-foreground">
              Standard error = SD / √n. It's the SD of the sampling distribution. Margin of error = critical value × standard error.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for medians?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly. This calculator is for means and proportions. Median confidence intervals require bootstrapping or other non-parametric methods.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
