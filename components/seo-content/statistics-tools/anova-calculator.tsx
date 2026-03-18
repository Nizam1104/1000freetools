import React from "react"

export default function AnovaCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the ANOVA Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Choose one-way ANOVA (comparing groups on one factor) or two-way ANOVA (examining two factors and their interaction). Enter your data organized by groups - either paste values for each group or upload a formatted file.
          </p>
          <p>
            The calculator partitions total variance into between-group and within-group components. It computes the F-statistic by dividing between-group variance by within-group variance. Degrees of freedom are calculated based on number of groups and total sample size.
          </p>
          <p>
            Results include the ANOVA table with sum of squares, degrees of freedom, mean squares, F-value, and p-value. For significant results, post-hoc tests (Tukey's HSD, Bonferroni) identify which specific groups differ. Effect size (eta-squared) shows practical significance.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Comparing multiple treatment groups</h3>
            <p className="text-sm text-muted-foreground">
              Test if three different drugs produce different pain relief scores. ANOVA tells you if any differ, then post-hoc tests identify which pairs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Agricultural field trials</h3>
            <p className="text-sm text-muted-foreground">
              Compare crop yields across multiple fertilizer types. Determine if fertilizer choice significantly affects harvest, and which fertilizers outperform others.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Manufacturing process optimization</h3>
            <p className="text-sm text-muted-foreground">
              Test product strength from different machine settings. Find which temperature-pressure combinations produce the strongest materials.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Educational intervention studies</h3>
            <p className="text-sm text-muted-foreground">
              Compare test scores across different teaching methods. Assess whether instructional approach affects student learning outcomes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Marketing campaign analysis</h3>
            <p className="text-sm text-muted-foreground">
              Evaluate sales across different advertising channels and regions (two-way ANOVA). Check for interaction - does channel effectiveness vary by region?
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Psychology experiment analysis</h3>
            <p className="text-sm text-muted-foreground">
              Compare reaction times across age groups. Determine if cognitive processing speed differs significantly between younger, middle-aged, and older adults.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">ANOVA assumes normal distributions.</strong>
              Data in each group should be approximately normally distributed. ANOVA is robust to mild violations, especially with equal sample sizes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Homogeneity of variance is required.</strong>
              Groups should have similar variances. Use Levene's test to check. If violated, consider Welch's ANOVA or transform your data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Observations must be independent.</strong>
              Each data point should be from a different subject or unit. Repeated measures on the same subjects need repeated-measures ANOVA.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Significant F doesn't tell which groups differ.</strong>
              A significant result means at least one group differs, but not which ones. Post-hoc tests with multiple comparison corrections are needed.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Always check assumptions before trusting ANOVA results. Plot residuals, run normality tests, and check variance homogeneity. If assumptions are badly violated, consider non-parametric alternatives like Kruskal-Wallis test.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why not just do multiple t-tests?</h3>
            <p className="text-sm text-muted-foreground">
              Multiple t-tests inflate Type I error rate. With 5 groups, that's 10 comparisons. ANOVA controls overall error rate at your chosen alpha level.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does the F-value mean?</h3>
            <p className="text-sm text-muted-foreground">
              F is the ratio of between-group to within-group variance. Larger F means groups differ more relative to within-group variation. F = 1 suggests no group differences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which post-hoc test should I use?</h3>
            <p className="text-sm text-muted-foreground">
              Tukey's HSD is most common for all pairwise comparisons. Bonferroni is more conservative. Scheffé is most conservative but allows complex comparisons.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's eta-squared?</h3>
            <p className="text-sm text-muted-foreground">
              Eta-squared (η²) is the proportion of total variance explained by group differences. Values: 0.01 small, 0.06 medium, 0.14 large effect.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can ANOVA handle unequal sample sizes?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but it's less robust to assumption violations. Type III sums of squares handle unbalanced designs. Equal sample sizes are ideal but not required.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between one-way and two-way?</h3>
            <p className="text-sm text-muted-foreground">
              One-way has one independent variable (factor). Two-way has two factors and can test their interaction. Interaction means one factor's effect depends on the other.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my p-value is borderline?</h3>
            <p className="text-sm text-muted-foreground">
              Report the exact p-value, don't just say "significant" or "not significant." Consider effect size and confidence intervals, not just p-values.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
