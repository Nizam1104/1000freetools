"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function inverseStandardNormalCDF(p: number): number {
  if (p <= 0 || p >= 1) {
    return p <= 0 ? -Infinity : Infinity;
  }
  
  const a = [
    -3.969683028665376e+01, 2.209460984245205e+02,
    -2.759285104469687e+02, 1.383577518672690e+02,
    -3.066479806614716e+01, 2.506628277459239e+00
  ];
  const b = [
    -5.447609879822406e+01, 1.615858368580409e+02,
    -1.556989798598866e+02, 6.680131188771972e+01,
    -1.328068155288572e+01
  ];
  
  const pLow = 0.02425;
  const pHigh = 1 - pLow;
  
  let q: number, r: number, x: number;
  
  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    x = (((((a[0] * q + a[1]) * q + a[2]) * q + a[3]) * q + a[4]) * q + a[5]) /
        ((((a[0] * 0 + b[1]) * q + b[2]) * q + b[3]) * q + b[4]) * q + 1;
  } else if (p <= pHigh) {
    q = p - 0.5;
    r = q * q;
    x = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
        (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    x = -(((((a[0] * q + a[1]) * q + a[2]) * q + a[3]) * q + a[4]) * q + a[5]) /
         ((((b[0] * q + b[1]) * q + b[2]) * q + b[3]) * q + 1);
  }
  
  return x;
}

export default function ConfidenceIntervalCalculator() {
  const [sampleMean, setSampleMean] = useState("");
  const [stdDev, setStdDev] = useState("");
  const [sampleSize, setSampleSize] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState("95");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const zScores: Record<string, number> = {
    "90": 1.645,
    "95": 1.96,
    "98": 2.326,
    "99": 2.576,
    "99.9": 3.291
  };

  const calculate = () => {
    setError("");
    setResult(null);

    const mean = parseFloat(sampleMean);
    const sd = parseFloat(stdDev);
    const n = parseInt(sampleSize);

    if ([mean, sd, n].some(isNaN) || n <= 0 || sd <= 0) {
      setError("Please enter valid positive values");
      return;
    }

    if (n < 30) {
      setError("Note: For n < 30, consider using t-distribution instead of z-distribution");
    }

    const z = zScores[confidenceLevel];
    const standardError = sd / Math.sqrt(n);
    const marginOfError = z * standardError;
    const lowerBound = mean - marginOfError;
    const upperBound = mean + marginOfError;

    setResult({
      mean,
      standardError: Math.round(standardError * 10000) / 10000,
      marginOfError: Math.round(marginOfError * 10000) / 10000,
      lowerBound: Math.round(lowerBound * 10000) / 10000,
      upperBound: Math.round(upperBound * 10000) / 10000,
      z,
      steps: [
        `Standard Error (SE) = σ / √n = ${sd} / √${n} = ${standardError.toFixed(4)}`,
        `Z-score for ${confidenceLevel}% confidence = ${z}`,
        `Margin of Error = Z × SE = ${z} × ${standardError.toFixed(4)} = ${marginOfError.toFixed(4)}`,
        `Confidence Interval = mean ± margin of error`,
        `= ${mean} ± ${marginOfError.toFixed(4)}`,
        `= (${lowerBound.toFixed(4)}, ${upperBound.toFixed(4)})`
      ]
    });
  };

  const reset = () => {
    setSampleMean("");
    setStdDev("");
    setSampleSize("");
    setConfidenceLevel("95");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Confidence Interval Calculator – Find CI for Mean Online</h1>
        <p className="text-muted-foreground">
          Calculate confidence intervals for population means with our free online confidence interval calculator. Supports 90%, 95%, and 99% confidence levels with margin of error shown.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Sample Mean (x̄)</Label>
            <Input
              type="number"
              placeholder="Sample mean"
              value={sampleMean}
              onChange={(e) => setSampleMean(e.target.value)}
            />
          </div>
          <div>
            <Label>Std Deviation (σ)</Label>
            <Input
              type="number"
              placeholder="Standard deviation"
              value={stdDev}
              onChange={(e) => setStdDev(e.target.value)}
            />
          </div>
          <div>
            <Label>Sample Size (n)</Label>
            <Input
              type="number"
              placeholder="Sample size"
              value={sampleSize}
              onChange={(e) => setSampleSize(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label>Confidence Level</Label>
          <Select value={confidenceLevel} onValueChange={setConfidenceLevel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90">90% Confidence</SelectItem>
              <SelectItem value="95">95% Confidence</SelectItem>
              <SelectItem value="98">98% Confidence</SelectItem>
              <SelectItem value="99">99% Confidence</SelectItem>
              <SelectItem value="99.9">99.9% Confidence</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Confidence Interval</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">{result.mean} ± {result.marginOfError}</p>
              <p className="text-2xl font-bold">
                ({result.lowerBound}, {result.upperBound})
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {confidenceLevel}% Confidence Interval
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Standard Error</p>
                <p className="text-xl font-semibold">{result.standardError}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Margin of Error</p>
                <p className="text-xl font-semibold">±{result.marginOfError}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Step-by-Step Solution</h4>
              <div className="space-y-2">
                {result.steps.map((step: string, index: number) => (
                  <code key={index} className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                    {step}
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
