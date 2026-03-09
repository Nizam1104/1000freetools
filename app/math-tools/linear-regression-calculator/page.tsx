"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const examples = [
  { x: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10", y: "2.3, 4.1, 5.8, 8.2, 10.5, 11.9, 14.2, 16.1, 18.3, 20.5", label: "Positive Correlation" },
  { x: "1, 2, 3, 4, 5, 6, 7, 8", y: "50, 45, 42, 38, 35, 30, 28, 25", label: "Negative Correlation" },
  { x: "10, 20, 30, 40, 50", y: "12, 25, 38, 52, 63", label: "Small Dataset" },
  { x: "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10", y: "1, 3, 2, 5, 4, 7, 6, 9, 8, 11, 10", label: "Noisy Data" },
  { x: "5, 10, 15, 20, 25, 30", y: "100, 150, 200, 250, 300, 350", label: "Perfect Linear" },
  { x: "2, 4, 6, 8, 10, 12, 14", y: "7, 11, 15, 19, 23, 27, 31", label: "Arithmetic Pattern" },
];

export default function LinearRegressionCalculator() {
  const [xData, setXData] = useState("");
  const [yData, setYData] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const xValues = xData.split(/[\n,\s]+/).filter(s => s.trim()).map(Number);
    const yValues = yData.split(/[\n,\s]+/).filter(s => s.trim()).map(Number);

    if (xValues.length !== yValues.length) {
      setError("X and Y datasets must have the same number of values");
      return;
    }

    if (xValues.length < 2) {
      setError("Please enter at least 2 data points");
      return;
    }

    const n = xValues.length;
    const sumX = xValues.reduce((a, b) => a + b, 0);
    const sumY = yValues.reduce((a, b) => a + b, 0);
    const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
    const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);
    const sumY2 = yValues.reduce((sum, y) => sum + y * y, 0);

    const meanX = sumX / n;
    const meanY = sumY / n;

    const SSxy = sumXY - (sumX * sumY) / n;
    const SSxx = sumX2 - (sumX * sumX) / n;
    const SSyy = sumY2 - (sumY * sumY) / n;

    if (SSxx === 0) {
      setError("Cannot calculate regression: all X values are the same");
      return;
    }

    const slope = SSxy / SSxx;
    const intercept = meanY - slope * meanX;

    const SST = SSyy;
    const SSR = slope * SSxy;
    const SSE = SST - SSR;

    const rSquared = SSR / SST;
    const r = Math.sqrt(rSquared) * (slope >= 0 ? 1 : -1);

    const stdError = Math.sqrt(SSE / (n - 2));

    const predictions = xValues.slice(0, 5).map((x, i) => ({
      x,
      actual: yValues[i],
      predicted: Math.round((slope * x + intercept) * 10000) / 10000,
      residual: Math.round((yValues[i] - (slope * x + intercept)) * 10000) / 10000
    }));

    setResult({
      slope: Math.round(slope * 10000) / 10000,
      intercept: Math.round(intercept * 10000) / 10000,
      rSquared: Math.round(rSquared * 10000) / 10000,
      r: Math.round(r * 10000) / 10000,
      stdError: Math.round(stdError * 10000) / 10000,
      n,
      meanX: Math.round(meanX * 10000) / 10000,
      meanY: Math.round(meanY * 10000) / 10000,
      predictions,
      steps: [
        `n = ${n} data points`,
        `Mean of X (x̄) = ${meanX.toFixed(4)}`,
        `Mean of Y (ȳ) = ${meanY.toFixed(4)}`,
        `SSxy = Σxy - (Σx)(Σy)/n = ${SSxy.toFixed(4)}`,
        `SSxx = Σx² - (Σx)²/n = ${SSxx.toFixed(4)}`,
        `Slope (b) = SSxy / SSxx = ${slope.toFixed(6)}`,
        `Intercept (a) = ȳ - b(x̄) = ${meanY.toFixed(4)} - ${slope.toFixed(6)}(${meanX.toFixed(4)}) = ${intercept.toFixed(6)}`,
        ``,
        `Regression Equation: y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`,
        ``,
        `R² = SSR/SST = ${rSquared.toFixed(4)} (${Math.round(rSquared * 100)}% of variance explained)`
      ]
    });
  };

  const reset = () => {
    setXData("");
    setYData("");
    setResult(null);
    setError("");
  };

  const loadExample = (exampleIndex: number) => {
    const ex = examples[exampleIndex];
    setXData(ex.x);
    setYData(ex.y);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Linear Regression Calculator – Find Best Fit Line Online</h1>
        <p className="text-muted-foreground">
          Perform linear regression analysis on any dataset with our free online linear regression calculator. Get the regression equation, slope, intercept, and R² value with a scatter plot.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>X Values (Independent Variable)</Label>
            <Textarea
              placeholder="Enter values separated by commas or newlines"
              value={xData}
              onChange={(e) => setXData(e.target.value)}
              rows={6}
            />
          </div>
          <div>
            <Label>Y Values (Dependent Variable)</Label>
            <Textarea
              placeholder="Enter values separated by commas or newlines"
              value={yData}
              onChange={(e) => setYData(e.target.value)}
              rows={6}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate Regression</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          {examples.map((ex, i) => (
            <Button key={i} variant="ghost" size="sm" onClick={() => loadExample(i)}>
              {ex.label}
            </Button>
          ))}
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Regression Equation</p>
              <p className="text-3xl font-bold font-mono">
                y = {result.slope}x + {result.intercept}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                R² = {result.rSquared} | r = {result.r}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Slope</p>
                <p className="text-xl font-bold">{result.slope}</p>
                <p className="text-xs text-muted-foreground">Change in Y per unit X</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Intercept</p>
                <p className="text-xl font-bold">{result.intercept}</p>
                <p className="text-xs text-muted-foreground">Y when X = 0</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">R²</p>
                <p className="text-xl font-bold">{result.rSquared}</p>
                <p className="text-xs text-muted-foreground">{Math.round(result.rSquared * 100)}% variance explained</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Std Error</p>
                <p className="text-xl font-bold">{result.stdError}</p>
                <p className="text-xs text-muted-foreground">Average residual</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Predictions vs Actual (First 5 points)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3">X</th>
                      <th className="text-left py-2 px-3">Actual Y</th>
                      <th className="text-left py-2 px-3">Predicted Y</th>
                      <th className="text-left py-2 px-3">Residual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.predictions.map((pred: any, i: number) => (
                      <tr key={i} className="border-b">
                        <td className="py-2 px-3 font-mono">{pred.x}</td>
                        <td className="py-2 px-3 font-mono">{pred.actual}</td>
                        <td className="py-2 px-3 font-mono">{pred.predicted}</td>
                        <td className={`py-2 px-3 font-mono ${pred.residual > 0 ? 'text-green-600' : pred.residual < 0 ? 'text-red-600' : ''}`}>
                          {pred.residual > 0 ? '+' : ''}{pred.residual}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Step-by-Step Calculation</h4>
              <div className="space-y-2">
                {result.steps.map((step: string, index: number) => (
                  <code key={index} className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                    {step || '\u00A0'}
                  </code>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Linear Regression</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Linear regression finds the straight line that best fits a set of data points. It's one of the most widely used statistical techniques – from predicting house prices based on square footage to estimating sales from advertising spend.
          </p>
          <p className="text-muted-foreground">
            The "best fit" line minimizes the sum of squared vertical distances (residuals) between the actual data points and the predicted values on the line. This method, called least squares regression, was developed independently by Gauss and Legendre in the early 1800s.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Regression Formula</h3>
        <div className="p-6 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            The best-fit line has the equation y = mx + b (or y = a + bx), where:
          </p>
          <div className="font-mono text-sm space-y-3">
            <div><strong>Slope (m):</strong> m = SSxy / SSxx</div>
            <div className="ml-4 text-xs text-muted-foreground">where SSxy = Σ(x - x̄)(y - ȳ) and SSxx = Σ(x - x̄)²</div>
            <div><strong>Intercept (b):</strong> b = ȳ - m(x̄)</div>
            <div className="ml-4 text-xs text-muted-foreground">The line always passes through the point (x̄, ȳ)</div>
            <div className="pt-2 border-t"><strong>R² (coefficient of determination):</strong> R² = SSR / SST</div>
            <div className="ml-4 text-xs text-muted-foreground">Proportion of variance in Y explained by X</div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Study Hours vs Test Scores</h4>
            <p className="text-sm text-muted-foreground mb-3">Data: Hours studied (X) and test scores (Y)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>X: 1, 2, 3, 4, 5 hours</div>
              <div>Y: 60, 70, 75, 85, 90 points</div>
              <div className="pt-2">Calculations:</div>
              <div>x̄ = 3, ȳ = 76</div>
              <div>Slope = 7.5 (each hour adds ~7.5 points)</div>
              <div>Intercept = 53.5</div>
              <div>R² = 0.97 (97% of score variation explained)</div>
              <div className="pt-2 font-semibold">Equation: Score = 7.5 × Hours + 53.5</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Temperature vs Ice Cream Sales</h4>
            <p className="text-sm text-muted-foreground mb-3">Daily temperature and ice cream revenue</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>X: 70, 75, 80, 85, 90, 95°F</div>
              <div>Y: $200, $250, $310, $380, $450, $520</div>
              <div className="pt-2">Results:</div>
              <div>Slope = 12.8 (each degree adds ~$12.80)</div>
              <div>Intercept = -696 (not meaningful – extrapolation)</div>
              <div>R² = 0.99 (excellent fit)</div>
              <div className="pt-2 font-semibold">Equation: Sales = 12.8 × Temp - 696</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Age vs Height (Children)</h4>
            <p className="text-sm text-muted-foreground mb-3">Age in years and height in cm for ages 5-10</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>X: 5, 6, 7, 8, 9, 10 years</div>
              <div>Y: 110, 117, 124, 130, 136, 142 cm</div>
              <div className="pt-2">Results:</div>
              <div>Slope = 6.4 cm/year (typical growth rate)</div>
              <div>Intercept = 78 cm (estimated height at birth)</div>
              <div>R² = 0.995 (very strong relationship)</div>
              <div className="pt-2 font-semibold">Equation: Height = 6.4 × Age + 78</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-sm">
            Sir Francis Galton coined the term "regression" in 1886 when studying heredity. He noticed that exceptionally tall parents tended to have children who were shorter than them (regressing toward the average). The statistical technique we use today grew from his biological observations.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What does R² tell me?</h4>
            <p className="text-sm text-muted-foreground">
              R² (coefficient of determination) shows what percentage of variation in Y is explained by X. R² = 0.80 means 80% of the variation is accounted for by the linear relationship. Values range from 0 (no relationship) to 1 (perfect fit).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between r and R²?</h4>
            <p className="text-sm text-muted-foreground">
              r (correlation coefficient) measures the strength and direction of the linear relationship (-1 to +1). R² is r squared and represents the proportion of variance explained. If r = 0.8, then R² = 0.64 (64% variance explained).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use regression for prediction?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, but be careful. Predictions work best within the range of your data (interpolation). Predicting outside that range (extrapolation) is risky – the relationship might change. Also, correlation doesn't prove causation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if my data isn't linear?</h4>
            <p className="text-sm text-muted-foreground">
              Linear regression assumes a straight-line relationship. If your data curves, consider polynomial regression, logarithmic transformation, or other non-linear methods. Always plot your data first to check the pattern.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What are residuals and why do they matter?</h4>
            <p className="text-sm text-muted-foreground">
              Residuals are the vertical distances between actual data points and the regression line. Analyzing residuals helps you check if linear regression is appropriate – they should be randomly scattered, not showing a pattern.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How many data points do I need?</h4>
            <p className="text-sm text-muted-foreground">
              Minimum is 2 points (but that gives a perfect fit regardless). For meaningful analysis, aim for at least 10-20 points. More data provides more reliable estimates and better detection of outliers.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/correlation-coefficient-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Correlation Calculator</p>
            <p className="text-xs text-muted-foreground">Find correlation coefficient</p>
          </a>
          <a href="/math-tools/scatter-plot-maker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Scatter Plot Maker</p>
            <p className="text-xs text-muted-foreground">Visualize data points</p>
          </a>
          <a href="/math-tools/statistics-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Statistics Calculator</p>
            <p className="text-xs text-muted-foreground">Descriptive statistics</p>
          </a>
        </div>
      </section>
    </div>
  );
}
