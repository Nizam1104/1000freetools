"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MedianCalculator() {
  const [numbers, setNumbers] = useState<string>("");
  const [result, setResult] = useState<{ median: number; sorted: number[] } | null>(null);

  const calculate = () => {
    const nums = numbers.split(",").map((n) => parseFloat(n.trim())).filter((n) => !isNaN(n));
    if (nums.length > 0) {
      const sorted = [...nums].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      const median = sorted.length % 2 !== 0 
        ? sorted[mid] 
        : (sorted[mid - 1] + sorted[mid]) / 2;
      setResult({ median, sorted });
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
          <CardTitle>Median Calculator</CardTitle>
          <CardDescription>Find the middle value of a dataset</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Enter numbers (comma-separated)
              </label>
              <Input
                type="text"
                placeholder="e.g., 5, 2, 8, 1, 9"
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
                  <p className="text-sm text-muted-foreground">Median</p>
                  <p className="text-2xl font-semibold">{result.median}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sorted Values</p>
                  <p className="text-lg">{result.sorted.join(", ")}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
