import React from "react"

export default function AbTestSignificanceCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the A/B Test Significance Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the number of visitors and conversions for both your control (A) and variation (B) groups. Visitors are the total exposed to each version. Conversions are the number who completed your desired action (purchase, signup, click, etc.).
          </p>
          <p>
            The calculator performs a two-proportion z-test to compare conversion rates. It calculates the pooled proportion, standard error, and z-statistic. From this, it derives the p-value and determines if the difference is statistically significant at your chosen confidence level.
          </p>
          <p>
            Results show conversion rates for both versions, the absolute and relative improvement, confidence interval for the difference, and significance determination. A visual display compares the two rates with their confidence intervals.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Website conversion optimization</h3>
            <p className="text-sm text-muted-foreground">
              Test new landing page designs against the original. Determine if a new headline, layout, or CTA button genuinely improves conversion rates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Email marketing campaigns</h3>
            <p className="text-sm text-muted-foreground">
              Compare subject lines, send times, or content variations. Find which email version drives more opens, clicks, or conversions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">E-commerce pricing tests</h3>
            <p className="text-sm text-muted-foreground">
              Test different price points or discount offers. Measure impact on purchase rate while accounting for random variation in customer behavior.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Mobile app feature testing</h3>
            <p className="text-sm text-muted-foreground">
              Roll out new features to a subset of users. Compare engagement metrics between users with and without the feature to assess impact.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Ad creative performance</h3>
            <p className="text-sm text-muted-foreground">
              Compare click-through rates for different ad versions. Determine which creative elements resonate better with your target audience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Checkout flow optimization</h3>
            <p className="text-sm text-muted-foreground">
              Test simplified checkout processes. Measure if removing steps or changing form fields reduces cart abandonment and increases completions.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Sample size affects reliability.</strong>
              Small samples can produce misleading results. Ensure each variant has enough visitors (typically 100+ conversions minimum) for trustworthy conclusions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Statistical significance isn't practical significance.</strong>
              A tiny improvement can be "significant" with huge samples. Consider if the observed difference justifies the cost of implementing the change.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Don't peek at results early.</strong>
              Checking significance before the test completes inflates false positive rates. Pre-determine sample size and wait until you reach it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Multiple testing increases false positives.</strong>
              Testing many variations or metrics increases chance of false discoveries. Use corrections like Bonferroni for multiple comparisons.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Always run A/B tests for full business cycles (usually 1-2 weeks minimum). Day-of-week and time-of-day effects can skew results from short tests.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What confidence level should I use?</h3>
            <p className="text-sm text-muted-foreground">
              95% is standard for most business decisions. Use 99% for high-stakes changes. 90% might suffice for low-risk tests where you want faster results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How long should I run the test?</h3>
            <p className="text-sm text-muted-foreground">
              Run until you reach your pre-calculated sample size, typically 1-4 weeks. Don't stop early just because you see significance - that inflates false positives.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between one and two-tailed?</h3>
            <p className="text-sm text-muted-foreground">
              Two-tailed tests detect any difference (better or worse). One-tailed only detects improvement. Two-tailed is safer and more common for A/B testing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why did my significant result disappear?</h3>
            <p className="text-sm text-muted-foreground">
              Early results are volatile. As sample size grows, estimates stabilize. Initial "significance" was likely random noise that averaged out.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I test more than two versions?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, that's A/B/n testing. But this calculator handles two versions. For multiple versions, use chi-square test or ANOVA for proportions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a meaningful lift?</h3>
            <p className="text-sm text-muted-foreground">
              Depends on your baseline and business. A 1% relative lift on high-volume sites can be valuable. Small sites need larger lifts to be worthwhile.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I always implement winning variants?</h3>
            <p className="text-sm text-muted-foreground">
              Consider implementation cost, maintenance burden, and potential negative side effects. Sometimes a non-significant but promising result warrants further testing.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
