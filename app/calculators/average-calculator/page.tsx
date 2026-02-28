"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AverageCalculator() {
  const [numbers, setNumbers] = useState<string>("");
  const [result, setResult] = useState<{ mean: number; count: number } | null>(null);

  const calculate = () => {
    const nums = numbers.split(",").map((n) => parseFloat(n.trim())).filter((n) => !isNaN(n));
    if (nums.length > 0) {
      const sum = nums.reduce((a, b) => a + b, 0);
      setResult({
        mean: sum / nums.length,
        count: nums.length
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
          <CardTitle>Average Calculator</CardTitle>
          <CardDescription>Calculate the mean of a set of numbers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Enter numbers (comma-separated)
              </label>
              <Input
                type="text"
                placeholder="e.g., 10, 20, 30, 40, 50"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Mean (Average)</p>
                  <p className="text-2xl font-semibold">{result.mean}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Count</p>
                  <p className="text-xl font-semibold">{result.count} numbers</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
