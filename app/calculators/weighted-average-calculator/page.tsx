"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function WeightedAverageCalculator() {
  const [values, setValues] = useState<string>("");
  const [weights, setWeights] = useState<string>("");
  const [result, setResult] = useState<{ weightedAvg: number; sumWeights: number } | null>(null);

  const calculate = () => {
    const vals = values.split(",").map((v) => parseFloat(v.trim())).filter((n) => !isNaN(n));
    const wgts = weights.split(",").map((w) => parseFloat(w.trim())).filter((n) => !isNaN(n));
    
    if (vals.length > 0 && vals.length === wgts.length) {
      let weightedSum = 0;
      let weightSum = 0;
      
      for (let i = 0; i < vals.length; i++) {
        weightedSum += vals[i] * wgts[i];
        weightSum += wgts[i];
      }
      
      if (weightSum > 0) {
        setResult({
          weightedAvg: weightedSum / weightSum,
          sumWeights: weightSum
        });
      }
    }
  };

  const reset = () => {
    setValues("");
    setWeights("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Weighted Average Calculator</CardTitle>
          <CardDescription>Calculate weighted average with custom weights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Values (comma-separated)</label>
              <Input
                type="text"
                placeholder="e.g., 80, 90, 75"
                value={values}
                onChange={(e) => setValues(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Weights (comma-separated)</label>
              <Input
                type="text"
                placeholder="e.g., 2, 3, 1"
                value={weights}
                onChange={(e) => setWeights(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Weighted Average</p>
                  <p className="text-2xl font-semibold">{result.weightedAvg.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sum of Weights</p>
                  <p className="text-lg">{result.sumWeights}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
