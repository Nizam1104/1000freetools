"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

  const loadExample = () => {
    setXData("1, 2, 3, 4, 5, 6, 7, 8, 9, 10");
    setYData("2.3, 4.1, 5.8, 8.2, 10.5, 11.9, 14.2, 16.1, 18.3, 20.5");
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

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Regression</Button>
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

    </div>
  );
}
