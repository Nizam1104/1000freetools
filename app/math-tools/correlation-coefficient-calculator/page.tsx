"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CorrelationCoefficientCalculator() {
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

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    if (denominator === 0) {
      setError("Cannot calculate correlation: one variable has no variation");
      return;
    }

    const r = numerator / denominator;
    const rSquared = r * r;

    const meanX = sumX / n;
    const meanY = sumY / n;
    const stdX = Math.sqrt((sumX2 - sumX * sumX / n) / (n - 1));
    const stdY = Math.sqrt((sumY2 - sumY * sumY / n) / (n - 1));

    let strength = "";
    let direction = "";
    
    const absR = Math.abs(r);
    if (absR >= 0.9) strength = "Very strong";
    else if (absR >= 0.7) strength = "Strong";
    else if (absR >= 0.5) strength = "Moderate";
    else if (absR >= 0.3) strength = "Weak";
    else strength = "Very weak or none";
    
    direction = r > 0 ? "positive" : r < 0 ? "negative" : "no";

    setResult({
      r: Math.round(r * 10000) / 10000,
      rSquared: Math.round(rSquared * 10000) / 10000,
      n,
      meanX: Math.round(meanX * 10000) / 10000,
      meanY: Math.round(meanY * 10000) / 10000,
      stdX: Math.round(stdX * 10000) / 10000,
      stdY: Math.round(stdY * 10000) / 10000,
      strength,
      direction,
      steps: [
        `n = ${n} data points`,
        `Σx = ${sumX}, Σy = ${sumY}`,
        `Σxy = ${sumXY}, Σx² = ${sumX2}, Σy² = ${sumY2}`,
        `r = (nΣxy - ΣxΣy) / √[(nΣx² - (Σx)²)(nΣy² - (Σy)²)]`,
        `r = (${n}(${sumXY}) - ${sumX}(${sumY})) / √[(${n}(${sumX2}) - ${sumX}²)(${n}(${sumY2}) - ${sumY}²)]`,
        `r = ${numerator.toFixed(4)} / ${denominator.toFixed(4)} = ${r.toFixed(6)}`
      ]
    });
  };

  const reset = () => {
    setXData("");
    setYData("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setXData("1, 2, 3, 4, 5, 6, 7, 8, 9, 10");
    setYData("2.1, 3.9, 6.2, 7.8, 10.1, 12.3, 14.2, 16.1, 18.2, 20.1");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Correlation Coefficient Calculator – Find Pearson r Online</h1>
        <p className="text-muted-foreground">
          Calculate the Pearson correlation coefficient between two variables with our free online calculator. Measure the strength and direction of linear relationships in your data.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>X Values (Variable 1)</Label>
            <Textarea
              placeholder="Enter values separated by commas or newlines"
              value={xData}
              onChange={(e) => setXData(e.target.value)}
              rows={6}
            />
          </div>
          <div>
            <Label>Y Values (Variable 2)</Label>
            <Textarea
              placeholder="Enter values separated by commas or newlines"
              value={yData}
              onChange={(e) => setYData(e.target.value)}
              rows={6}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Correlation</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Correlation (r)</p>
                <p className={`text-2xl font-bold ${
                  result.r > 0.7 ? 'text-green-600' : 
                  result.r < -0.7 ? 'text-red-600' : ''
                }`}>{result.r}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">R²</p>
                <p className="text-2xl font-bold">{result.rSquared}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Data Points</p>
                <p className="text-2xl font-bold">{result.n}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Relationship</p>
                <p className="text-sm font-semibold">{result.strength} {result.direction}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">X Statistics</p>
                <p className="text-sm">Mean: <span className="font-semibold">{result.meanX}</span></p>
                <p className="text-sm">Std Dev: <span className="font-semibold">{result.stdX}</span></p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Y Statistics</p>
                <p className="text-sm">Mean: <span className="font-semibold">{result.meanY}</span></p>
                <p className="text-sm">Std Dev: <span className="font-semibold">{result.stdY}</span></p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Step-by-Step Calculation</h4>
              <div className="space-y-2">
                {result.steps.map((step: string, index: number) => (
                  <code key={index} className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                    {step}
                  </code>
                ))}
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Interpretation</h4>
              <p className="text-sm text-muted-foreground">
                r = {result.r} indicates a <strong>{result.strength.toLowerCase()} {result.direction}</strong> linear correlation.
                {result.rSquared > 0.5 
                  ? ` About ${Math.round(result.rSquared * 100)}% of the variation in Y can be explained by X.`
                  : ` Only about ${Math.round(result.rSquared * 100)}% of the variation in Y can be explained by X.`
                }
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Pearson Correlation</h2>
        <p className="text-muted-foreground">
          The Pearson correlation coefficient (r) measures the strength and direction of a linear relationship between two variables. It ranges from -1 to +1, where the sign indicates direction and the magnitude indicates strength.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Pearson Correlation Formula</p>
          <code className="text-xs font-mono">
            r = (nΣxy - ΣxΣy) / √[(nΣx² - (Σx)²)(nΣy² - (Σy)²)]
          </code>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Interpreting Correlation Values</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
            <div className="w-32 text-sm font-semibold">+0.7 to +1.0</div>
            <div className="flex-1 h-3 bg-gradient-to-r from-green-300 to-green-600 rounded"></div>
            <div className="text-sm text-muted-foreground">Strong positive</div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
            <div className="w-32 text-sm font-semibold">+0.3 to +0.7</div>
            <div className="flex-1 h-3 bg-gradient-to-r from-green-200 to-green-400 rounded"></div>
            <div className="text-sm text-muted-foreground">Moderate positive</div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
            <div className="w-32 text-sm font-semibold">-0.3 to +0.3</div>
            <div className="flex-1 h-3 bg-gray-300 rounded"></div>
            <div className="text-sm text-muted-foreground">Weak or none</div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
            <div className="w-32 text-sm font-semibold">-0.7 to -0.3</div>
            <div className="flex-1 h-3 bg-gradient-to-r from-red-400 to-red-200 rounded"></div>
            <div className="text-sm text-muted-foreground">Moderate negative</div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
            <div className="w-32 text-sm font-semibold">-1.0 to -0.7</div>
            <div className="flex-1 h-3 bg-gradient-to-r from-red-600 to-red-300 rounded"></div>
            <div className="text-sm text-muted-foreground">Strong negative</div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Correlation Examples</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Positive Correlation (r ≈ 0.99)</h3>
            <p className="text-sm text-muted-foreground mb-2">Study hours vs. test scores</p>
            <p className="text-xs text-muted-foreground">
              More study time generally leads to higher scores. As X increases, Y increases proportionally.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Negative Correlation (r ≈ -0.85)</h3>
            <p className="text-sm text-muted-foreground mb-2">Car speed vs. fuel efficiency</p>
            <p className="text-xs text-muted-foreground">
              Higher speeds typically reduce miles per gallon. As X increases, Y decreases.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">No Correlation (r ≈ 0.02)</h3>
            <p className="text-sm text-muted-foreground mb-2">Shoe size vs. IQ scores</p>
            <p className="text-xs text-muted-foreground">
              These variables have no meaningful linear relationship. Changes in X don't predict changes in Y.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">Does correlation imply causation?</h3>
          <p className="text-sm text-muted-foreground">
            No. Correlation only shows that two variables move together. It doesn't prove one causes the other. Both could be caused by a third variable, or it could be coincidence. Always consider confounding factors.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's the difference between r and R²?</h3>
          <p className="text-sm text-muted-foreground">
            r (correlation coefficient) measures the strength and direction of linear relationship. R² (coefficient of determination) tells you what percentage of variance in Y is explained by X. R² = r² for simple linear regression.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can correlation be used for non-linear relationships?</h3>
          <p className="text-sm text-muted-foreground">
            Pearson correlation only detects linear relationships. A perfect U-shaped relationship could have r ≈ 0. For non-linear relationships, consider Spearman rank correlation or other methods.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How many data points do I need?</h3>
          <p className="text-sm text-muted-foreground">
            Technically you need at least 3 points. For reliable results, aim for at least 10-20 data points. With small samples, even strong correlations might not be statistically significant.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What affects correlation strength?</h3>
          <p className="text-sm text-muted-foreground">
            Outliers can dramatically change r. Restricted range (limited variability) weakens correlation. Non-linear relationships aren't captured well. Always plot your data before interpreting correlation.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/linear-regression-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Linear Regression</p>
            <p className="text-xs text-muted-foreground">Best fit line</p>
          </a>
          <a href="/math-tools/scatter-plot-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Scatter Plot</p>
            <p className="text-xs text-muted-foreground">Visualize data</p>
          </a>
          <a href="/math-tools/standard-deviation-variance-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Standard Deviation</p>
            <p className="text-xs text-muted-foreground">Measure spread</p>
          </a>
        </div>
      </section>
    </div>
  );
}
