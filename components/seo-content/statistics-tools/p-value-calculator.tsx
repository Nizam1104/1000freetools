import React from "react"

export default function PValueCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the P-Value Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select your test statistic distribution: Z (normal), T (Student's t), Chi-square, or F. Enter your calculated test statistic value. For t, chi-square, and F distributions, also enter the degrees of freedom.
          </p>
          <p>
            Choose your test type: one-tailed (less than), one-tailed (greater than), or two-tailed. One-tailed tests look for effects in a specific direction. Two-tailed tests detect any difference from the null hypothesis.
          </p>
          <p>
            The calculator computes the p-value from the appropriate distribution. Results show the p-value with interpretation against common significance levels (0.05, 0.01). A visual display shows the test statistic's position on the distribution with the p-value area shaded.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Hypothesis testing conclusions</h3>
            <p className="text-sm text-muted-foreground">
              Convert your test statistic to a p-value for decision making. Compare to your alpha level to determine statistical significance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Research paper reporting</h3>
            <p className="text-sm text-muted-foreground">
              Report exact p-values in manuscripts. "p = 0.023" is more informative than "p < 0.05". Journals increasingly require exact values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Verifying statistical software output</h3>
            <p className="text-sm text-muted-foreground">
              Double-check p-values from R, Python, or SPSS. Manual calculation confirms software results, especially for unusual test statistics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Statistics homework problems</h3>
            <p className="text-sm text-muted-foreground">
              Find p-values for textbook problems. Verify your table lookups or calculator results for z-tests, t-tests, chi-square tests, and ANOVA.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Meta-analysis calculations</h3>
            <p className="text-sm text-muted-foreground">
              Convert reported test statistics to p-values for combining studies. Some papers report only test statistics without p-values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control chart analysis</h3>
            <p className="text-sm text-muted-foreground">
              Assess if process measurements deviate significantly from target. Calculate p-values for control chart violations to prioritize investigations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">P-value is the probability of data this extreme.</strong>
              Specifically, it's P(observing data this extreme | null hypothesis is true). It's not the probability the null is true.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Smaller p-values indicate stronger evidence.</strong>
              p < 0.05 is conventionally "significant." p < 0.01 is "highly significant." But these are arbitrary thresholds - report exact values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">One-tailed vs two-tailed matters.</strong>
              Two-tailed p-value is double the one-tailed (for symmetric distributions). Choose based on your hypothesis before seeing data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Degrees of freedom affect the distribution.</strong>
              T-distribution approaches normal as df increases. Chi-square and F shapes depend heavily on df. Always use correct df.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> P-values don't measure effect size or practical importance. A tiny effect can be "significant" with huge samples. Always report effect sizes and confidence intervals alongside p-values.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does p = 0.05 mean?</h3>
            <p className="text-sm text-muted-foreground">
              If the null hypothesis were true, there's a 5% chance of observing data this extreme or more. It's the threshold for "statistical significance" by convention.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can p-value be greater than 1?</h3>
            <p className="text-sm text-muted-foreground">
              No. P-values range from 0 to 1. They're probabilities. Values outside this range indicate calculation errors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between Z and T?</h3>
            <p className="text-sm text-muted-foreground">
              Use Z when population SD is known or sample is large (n > 30). Use T when population SD is unknown and estimated from small samples.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When do I use chi-square?</h3>
            <p className="text-sm text-muted-foreground">
              Chi-square tests are for categorical data: goodness of fit tests and contingency tables. The test statistic follows chi-square distribution.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the F-distribution for?</h3>
            <p className="text-sm text-muted-foreground">
              F-tests compare variances. Used in ANOVA to compare group means, and in regression to test overall model significance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is p = 0.051 non-significant?</h3>
            <p className="text-sm text-muted-foreground">
              By the 0.05 threshold, yes. But don't treat 0.049 and 0.051 as fundamentally different. Report exact p-values and consider the full context.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if p is very small (like 0.00001)?</h3>
            <p className="text-sm text-muted-foreground">
              Report as "p < 0.001" or give the exact value. Very small p-values indicate strong evidence against the null, but check for data errors or violations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
