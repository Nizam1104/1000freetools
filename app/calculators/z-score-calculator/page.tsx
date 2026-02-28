"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ZScoreCalculator() {
  const [value, setValue] = useState<string>("");
  const [mean, setMean] = useState<string>("");
  const [stdDev, setStdDev] = useState<string>("");
  const [result, setResult] = useState<{ zScore: number; percentile: number } | null>(null);

  const calculate = () => {
    const v = parseFloat(value);
    const m = parseFloat(mean);
    const s = parseFloat(stdDev);
    
    if (!isNaN(v) && !isNaN(m) && !isNaN(s) && s !== 0) {
      const zScore = (v - m) / s;
      // Approximate percentile using standard normal distribution
      const percentile = (1 / (1 + Math.exp(-1.702 * zScore))) * 100;
      setResult({ zScore, percentile: Math.min(99.99, Math.max(0.01, percentile)) });
    }
  };

  const reset = () => {
    setValue("");
    setMean("");
    setStdDev("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Z-Score Calculator</CardTitle>
          <CardDescription>Calculate the standard score and percentile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Value (X)</label>
              <Input
                type="number"
                placeholder="e.g., 85"
                step="any"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Mean (μ)</label>
              <Input
                type="number"
                placeholder="e.g., 75"
                step="any"
                value={mean}
                onChange={(e) => setMean(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Standard Deviation (σ)</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                step="any"
                value={stdDev}
                onChange={(e) => setStdDev(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Z-Score</p>
                  <p className="text-2xl font-semibold">{result.zScore.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Percentile</p>
                  <p className="text-xl font-semibold">{result.percentile.toFixed(2)}%</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
