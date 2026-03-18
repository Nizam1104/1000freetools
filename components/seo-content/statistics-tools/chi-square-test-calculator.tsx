import React from "react"

export default function ChiSquareTestCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Chi-Square Test Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Choose between goodness of fit test or independence test (contingency table). For goodness of fit, enter your observed frequencies and expected frequencies or proportions. For independence, enter data in a table format with rows and columns representing different categories.
          </p>
          <p>
            The calculator computes the chi-square statistic by summing the squared differences between observed and expected values, divided by expected values. It then determines degrees of freedom and calculates the p-value from the chi-square distribution.
          </p>
          <p>
            Results include the chi-square value, degrees of freedom, p-value, and interpretation of statistical significance. A small p-value (typically less than 0.05) indicates the observed data differs significantly from what was expected.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing survey response distributions</h3>
            <p className="text-sm text-muted-foreground">
              You surveyed 200 people about their favorite color. Compare observed preferences to an equal distribution to see if some colors are genuinely more popular.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing A/B test conversion rates</h3>
            <p className="text-sm text-muted-foreground">
              Test if conversion rates differ across multiple page variants. Enter conversions and non-conversions for each variant in a contingency table.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control defect analysis</h3>
            <p className="text-sm text-muted-foreground">
              Compare defect counts across different production shifts or machines. Determine if certain shifts produce significantly more defects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Genetics inheritance patterns</h3>
            <p className="text-sm text-muted-foreground">
              Test if offspring phenotypes match expected Mendelian ratios. Enter observed counts and compare to predicted 3:1 or 9:3:3:1 ratios.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Market research segmentation</h3>
            <p className="text-sm text-muted-foreground">
              Check if product preference is independent of demographic factors like age group or gender. Use a contingency table to test for associations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Medical treatment outcomes</h3>
            <p className="text-sm text-muted-foreground">
              Compare recovery rates across multiple treatment groups. Determine if treatment type is associated with patient outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Expected frequencies should be adequate.</strong>
              Each expected cell count should ideally be 5 or more. Smaller expected values can make the test unreliable. Consider combining categories if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Data must be independent observations.</strong>
              Each observation should belong to only one category. Repeated measures or paired data require different statistical tests.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Goodness of fit tests one variable.</strong>
              Use goodness of fit to compare one categorical variable to a theoretical distribution. Use independence test for relationships between two variables.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Degrees of freedom depend on categories.</strong>
              For goodness of fit: df = number of categories minus 1. For independence: df = (rows - 1) × (columns - 1).
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> A significant chi-square tells you there's a difference, but not where it is. For contingency tables with more than 2×2, follow up with post-hoc tests or examine standardized residuals to identify which cells contribute most to the difference.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does a significant p-value mean?</h3>
            <p className="text-sm text-muted-foreground">
              A p-value less than 0.05 suggests the observed frequencies differ significantly from expected. For independence tests, it means the two variables are associated.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use percentages instead of counts?</h3>
            <p className="text-sm text-muted-foreground">
              No. Chi-square requires raw frequency counts, not percentages or proportions. The test uses actual sample size in its calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my expected values are small?</h3>
            <p className="text-sm text-muted-foreground">
              If more than 20% of cells have expected counts below 5, consider combining categories or using Fisher's exact test for 2×2 tables.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is chi-square one-tailed or two-tailed?</h3>
            <p className="text-sm text-muted-foreground">
              Chi-square is always right-tailed. Large chi-square values indicate greater deviation from expected, leading to smaller p-values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I interpret effect size?</h3>
            <p className="text-sm text-muted-foreground">
              For 2×2 tables, use phi coefficient. For larger tables, use Cramer's V. Values around 0.1 are small, 0.3 medium, 0.5 large effects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can chi-square tell me direction of relationship?</h3>
            <p className="text-sm text-muted-foreground">
              No. Chi-square only tells you if variables are associated, not the direction. Examine the observed vs expected counts to see which categories differ.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the minimum sample size?</h3>
            <p className="text-sm text-muted-foreground">
              There's no strict minimum, but you need enough observations for expected cell counts of at least 5. Very small samples limit the test's reliability.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
