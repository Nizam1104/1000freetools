import React from "react"

export default function CorrelationCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Correlation Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter two sets of paired data in the X and Y fields. Each value in X corresponds to the value in the same position in Y. Enter numbers separated by commas, spaces, or newlines.
          </p>
          <p>
            Choose Pearson correlation for linear relationships or Spearman correlation for monotonic (consistently increasing or decreasing) relationships. Pearson measures straight-line association. Spearman measures rank-based association.
          </p>
          <p>
            The result shows the correlation coefficient (r or rho), R-squared (variance explained), and strength interpretation. Coefficients range from -1 (perfect negative) through 0 (no correlation) to +1 (perfect positive).
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing study time vs test scores</h3>
            <p className="text-sm text-muted-foreground">
              Track hours studied and exam scores for 20 students. A positive correlation shows whether more study time associates with higher scores.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Marketing spend vs sales revenue</h3>
            <p className="text-sm text-muted-foreground">
              Compare monthly advertising budget to sales figures. Strong positive correlation suggests ad spending drives revenue. Weak correlation means other factors dominate.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Temperature vs energy consumption</h3>
            <p className="text-sm text-muted-foreground">
              Plot daily temperature against electricity usage. Expect positive correlation (more AC in summer, more heating in winter) creating a U-shaped relationship.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Stock price relationships</h3>
            <p className="text-sm text-muted-foreground">
              Compare two stock prices over time. High positive correlation means they move together. Negative correlation means they move oppositely - useful for diversification.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scientific research data</h3>
            <p className="text-sm text-muted-foreground">
              Your experiment measures drug dosage and response level. Correlation quantifies the relationship strength before running regression analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control variables</h3>
            <p className="text-sm text-muted-foreground">
              Check if machine temperature correlates with defect rate. Strong correlation suggests temperature control could reduce defects.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Correlation doesn't prove causation.</strong>
              Two variables can correlate without one causing the other. Both might be caused by a third factor, or it could be coincidence.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Pearson assumes linear relationship.</strong>
              Pearson correlation measures straight-line association. Curved relationships (U-shaped, exponential) may show low Pearson correlation despite strong association.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Spearman handles non-linear monotonic relationships.</strong>
              Spearman uses ranks instead of raw values. It detects any consistently increasing or decreasing pattern, not just straight lines.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Outliers can distort correlation.</strong>
              A single extreme point can dramatically change Pearson correlation. Check your data for outliers before interpreting results.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> R-squared tells you what percentage of Y's variation is explained by X. An r of 0.8 means r-squared is 0.64 - so 64% of variation is explained, 36% is due to other factors.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does a correlation of 0.5 mean?</h3>
            <p className="text-sm text-muted-foreground">
              A correlation of 0.5 indicates moderate positive relationship. As X increases, Y tends to increase, but with considerable scatter. About 25% of Y's variance is explained by X.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can correlation be greater than 1?</h3>
            <p className="text-sm text-muted-foreground">
              No. Correlation coefficients range from -1 to +1. Values outside this range indicate a calculation error. Perfect correlation is exactly 1 or -1.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a strong correlation?</h3>
            <p className="text-sm text-muted-foreground">
              Generally, 0.7 or above (or -0.7 or below) is considered strong. 0.3 to 0.7 is moderate. Below 0.3 is weak. Context matters - in social sciences, 0.3 may be meaningful.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use Spearman instead of Pearson?</h3>
            <p className="text-sm text-muted-foreground">
              Use Spearman when data isn't normally distributed, contains outliers, or has a monotonic but non-linear relationship. Also use for ordinal (ranked) data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many data points do I need?</h3>
            <p className="text-sm text-muted-foreground">
              Minimum is 2, but that's not meaningful. Aim for at least 10-15 pairs for preliminary analysis. 30+ gives more reliable estimates. More is better.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does negative correlation mean?</h3>
            <p className="text-sm text-muted-foreground">
              Negative correlation means as X increases, Y decreases. Example: temperature and heating costs. Perfect negative correlation (-1) means they move oppositely in lockstep.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does zero correlation mean no relationship?</h3>
            <p className="text-sm text-muted-foreground">
              Zero Pearson correlation means no linear relationship. There could still be a curved relationship. Always plot your data to check for non-linear patterns.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
