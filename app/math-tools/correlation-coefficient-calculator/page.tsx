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

    </div>
  );
}
