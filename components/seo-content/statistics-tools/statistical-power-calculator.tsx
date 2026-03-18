import React from "react"

export default function StatisticalPowerCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Statistical Power Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select what you want to calculate: power, sample size, effect size, or significance level. Choose your test type (one-sample t-test, two-sample t-test, proportion test, etc.) and enter the known parameters.
          </p>
          <p>
            For sample size calculations, input desired power (typically 0.80), significance level (usually 0.05), and expected effect size. For power calculations, enter your sample size, effect size, and alpha level. The calculator uses non-central t-distributions or normal approximations.
          </p>
          <p>
            Results include the calculated value plus interpretation. Power curves show how power changes with sample size or effect size. This helps you understand trade-offs in study design and make informed decisions about resource allocation.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Planning clinical trials</h3>
            <p className="text-sm text-muted-foreground">
              Determine how many patients you need to detect a meaningful treatment effect. Ensure your trial has adequate power to find differences if they exist.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing A/B tests</h3>
            <p className="text-sm text-muted-foreground">
              Calculate sample size needed to detect a 5% conversion lift. Balance statistical rigor with practical constraints like traffic volume and test duration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Grant proposal preparation</h3>
            <p className="text-sm text-muted-foreground">
              Justify your requested sample size to reviewers. Show that your study is adequately powered to detect hypothesized effects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Evaluating completed studies</h3>
            <p className="text-sm text-muted-foreground">
              Calculate post-hoc power for non-significant results. Low power suggests the study couldn't detect effects, not that effects don't exist.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Psychology experiment design</h3>
            <p className="text-sm text-muted-foreground">
              Plan participant numbers for detecting expected effect sizes. Account for anticipated dropout rates by inflating initial sample size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality improvement projects</h3>
            <p className="text-sm text-muted-foreground">
              Determine how many measurements you need to detect process improvements. Avoid wasting resources on oversized samples or risking missed improvements with undersized ones.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Power is the probability of detecting an effect.</strong>
              Power = 1 - beta, where beta is Type II error rate. Conventionally, 0.80 power means 80% chance of finding an effect if it exists.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Effect size must be specified.</strong>
              Use Cohen's d for means (0.2 small, 0.5 medium, 0.8 large) or proportions for rates. Base estimates on prior research or pilot data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Alpha level controls false positives.</strong>
              Standard alpha is 0.05. Lower alpha reduces false positives but requires larger samples. Consider your tolerance for Type I vs Type II errors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">One-tailed tests have more power.</strong>
              If you're certain about effect direction, one-tailed tests need smaller samples. But you can't detect effects in the opposite direction.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Always calculate power before collecting data, not after. Post-hoc power calculations using observed effect sizes are controversial and often misleading. Use them only for planning future studies.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a good power level?</h3>
            <p className="text-sm text-muted-foreground">
              0.80 (80%) is standard in most fields. Some areas like clinical trials use 0.90. Higher power requires larger samples but reduces risk of missing real effects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I estimate effect size?</h3>
            <p className="text-sm text-muted-foreground">
              Use previous studies, pilot data, or subject-matter expertise. Consider the minimum effect that would be practically meaningful, not just statistically detectable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is my required sample size so large?</h3>
            <p className="text-sm text-muted-foreground">
              Small effects need large samples to detect. High power requirements also increase sample size. Consider if you're targeting an unrealistically small effect.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between one and two-sample?</h3>
            <p className="text-sm text-muted-foreground">
              One-sample compares a mean to a known value. Two-sample compares means between two groups. Two-sample tests typically need more total participants.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I adjust for dropout?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, inflate your calculated sample size. If you expect 20% dropout, divide by 0.80. For 100 needed participants, recruit 100/0.80 = 125.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if I can't get enough participants?</h3>
            <p className="text-sm text-muted-foreground">
              Accept lower power, increase effect size target (study only large effects), or use more sensitive measures. Consider collaborative multi-site studies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does power matter for significant results?</h3>
            <p className="text-sm text-muted-foreground">
              If you found significance, power was sufficient for that effect. But low-powered studies that find significance often overestimate effect sizes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
