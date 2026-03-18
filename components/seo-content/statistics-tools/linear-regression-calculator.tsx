import React from "react"

export default function LinearRegressionCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Linear Regression Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter paired X and Y data values. Each X value (independent variable) corresponds to a Y value (dependent variable) in the same position. Input numbers separated by commas, spaces, or newlines. Minimum 2 data points required, but 10+ recommended for reliable results.
          </p>
          <p>
            The calculator uses least squares method to find the best-fitting line: Y = a + bX. It minimizes the sum of squared vertical distances between data points and the line. The slope (b) shows how much Y changes per unit change in X. The intercept (a) is the Y value when X = 0.
          </p>
          <p>
            Results include the regression equation, R-squared (coefficient of determination), correlation coefficient, and standard error. The scatter plot displays data points with the fitted regression line. Prediction intervals show uncertainty around predictions.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sales forecasting</h3>
            <p className="text-sm text-muted-foreground">
              Predict future sales based on advertising spend. If historical data shows consistent relationship, estimate sales for planned marketing budgets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Real estate price modeling</h3>
            <p className="text-sm text-muted-foreground">
              Model home prices based on square footage. Find how much value each additional square foot adds in your market area.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scientific calibration curves</h3>
            <p className="text-sm text-muted-foreground">
              Create calibration curves for lab instruments. Relate instrument readings to known concentrations, then use the equation to find unknown concentrations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Economic trend analysis</h3>
            <p className="text-sm text-muted-foreground">
              Analyze relationship between economic indicators. Study how unemployment relates to inflation, or GDP growth to interest rates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Performance prediction</h3>
            <p className="text-sm text-muted-foreground">
              Predict employee performance from test scores. Use regression to estimate job performance based on pre-employment assessment results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Energy consumption modeling</h3>
            <p className="text-sm text-muted-foreground">
              Model building energy use based on temperature. Predict heating/cooling costs and identify weather-related consumption patterns.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Correlation doesn't imply causation.</strong>
              A strong relationship doesn't prove X causes Y. Both might be caused by a third variable, or the relationship could be coincidental.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">R-squared shows fit quality.</strong>
              R² ranges from 0 to 1. Higher values mean the line explains more variance. But high R² doesn't guarantee the model is appropriate.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Extrapolation is risky.</strong>
              Predictions outside your data range are unreliable. The relationship might change beyond observed values. Stay within your data range.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Outliers heavily influence regression.</strong>
              A single extreme point can dramatically change the slope. Always examine residuals and consider robust regression for outlier-prone data.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Always plot your data before interpreting regression. Anscombe's quartet shows four datasets with identical regression statistics but completely different patterns. Visual inspection catches issues statistics miss.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does the slope mean?</h3>
            <p className="text-sm text-muted-foreground">
              Slope is the change in Y per one-unit increase in X. A slope of 2.5 means Y increases by 2.5 for every 1-unit increase in X.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a good R-squared value?</h3>
            <p className="text-sm text-muted-foreground">
              Depends on your field. Physics experiments might expect 0.99+. Social sciences often accept 0.3-0.5. Context matters more than arbitrary thresholds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for non-linear relationships?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly. For curved relationships, consider polynomial regression, log transformation, or other non-linear models. Check residual plots for patterns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the intercept?</h3>
            <p className="text-sm text-muted-foreground">
              The intercept is the predicted Y when X = 0. Sometimes it has no practical meaning (like weight when height = 0). Don't over-interpret it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many data points do I need?</h3>
            <p className="text-sm text-muted-foreground">
              Minimum is 2, but that's not useful. Aim for at least 10-20 points for stable estimates. More data gives more precise estimates and better outlier detection.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are residuals?</h3>
            <p className="text-sm text-muted-foreground">
              Residuals are the vertical distances from points to the line (observed - predicted). Analyzing residuals checks if linear model is appropriate.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I compare slopes between groups?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, using interaction terms or separate regressions. Test if slopes differ significantly to see if the relationship varies between groups.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
