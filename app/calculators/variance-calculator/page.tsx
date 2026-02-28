"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VarianceCalculator() {
  const [numbers, setNumbers] = useState<string>("");
  const [result, setResult] = useState<{ population: number; sample: number; mean: number } | null>(null);

  const calculate = () => {
    const nums = numbers.split(",").map((n) => parseFloat(n.trim())).filter((n) => !isNaN(n));
    if (nums.length > 1) {
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
      const squaredDiffs = nums.map((n) => Math.pow(n - mean, 2));
      const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);
      
      setResult({
        population: sumSquaredDiffs / nums.length,
        sample: sumSquaredDiffs / (nums.length - 1),
        mean
      });
    }
  };

  const reset = () => {
    setNumbers("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Variance Calculator</CardTitle>
          <CardDescription>Calculate population and sample variance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Enter numbers (comma-separated)
              </label>
              <Input
                type="text"
                placeholder="e.g., 4, 8, 6, 5, 3, 7"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Population Variance (σ²)</p>
                    <p className="text-xl font-semibold">{result.population.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sample Variance (s²)</p>
                    <p className="text-xl font-semibold">{result.sample.toFixed(4)}</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Mean</p>
                  <p className="text-lg">{result.mean.toFixed(4)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
