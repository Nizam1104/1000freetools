"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ZScoreCalculator() {
  const [value, setValue] = useState("");
  const [mean, setMean] = useState("");
  const [stdDev, setStdDev] = useState("");
  const [result, setResult] = useState<{
    zScore: number;
    interpretation: string;
    percentile?: number;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const val = parseFloat(value);
    const m = parseFloat(mean);
    const sd = parseFloat(stdDev);

    if (isNaN(val) || isNaN(m) || isNaN(sd)) {
      setError("Please enter valid numbers for all fields");
      setResult(null);
      return;
    }

    if (sd <= 0) {
      setError("Standard deviation must be greater than 0");
      setResult(null);
      return;
    }

    setError("");
    const zScore = (val - m) / sd;
    const roundedZScore = Math.round(zScore * 10000) / 10000;

    let interpretation = "";
    if (roundedZScore === 0) {
      interpretation = "Exactly at the mean";
    } else if (roundedZScore > 0) {
      interpretation = `${roundedZScore} standard deviation${Math.abs(roundedZScore) !== 1 ? "s" : ""} above the mean`;
    } else {
      interpretation = `${Math.abs(roundedZScore)} standard deviation${Math.abs(roundedZScore) !== 1 ? "s" : ""} below the mean`;
    }

    const percentile = approximatePercentile(zScore);

    setResult({
      zScore: roundedZScore,
      interpretation,
      percentile: Math.round(percentile * 100) / 100,
    });
  };

  const approximatePercentile = (z: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - p : p;
  };

  const reset = () => {
    setValue("");
    setMean("");
    setStdDev("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Z-Score Calculator – Find Standard Score Online</h1>
        <p className="text-muted-foreground">
          Calculate the Z-score of any data point with our free online Z-score calculator. Enter the value, mean, and standard deviation to get the standardized score instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Data Value (X)</Label>
            <Input
              type="number"
              placeholder="e.g., 85"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div>
            <Label>Mean (μ)</Label>
            <Input
              type="number"
              placeholder="e.g., 75"
              value={mean}
              onChange={(e) => setMean(e.target.value)}
            />
          </div>
          <div>
            <Label>Standard Deviation (σ)</Label>
            <Input
              type="number"
              placeholder="e.g., 10"
              value={stdDev}
              onChange={(e) => setStdDev(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Z-Score</Button>
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
              <p className="text-sm text-muted-foreground mb-2">Z-Score</p>
              <p className="text-5xl font-bold">{result.zScore}</p>
              <p className="text-sm text-muted-foreground mt-2">{result.interpretation}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Approximately {result.percentile}th percentile
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Formula Used</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                Z = (X - μ) / σ = ({value} - {mean}) / {stdDev} = {result.zScore}
              </code>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
