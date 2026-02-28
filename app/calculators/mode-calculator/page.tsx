"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ModeCalculator() {
  const [numbers, setNumbers] = useState<string>("");
  const [result, setResult] = useState<{ modes: number[]; frequencies: Record<number, number> } | null>(null);

  const calculate = () => {
    const nums = numbers.split(",").map((n) => parseFloat(n.trim())).filter((n) => !isNaN(n));
    if (nums.length > 0) {
      const frequencies: Record<number, number> = {};
      nums.forEach((n) => {
        frequencies[n] = (frequencies[n] || 0) + 1;
      });
      
      const maxFreq = Math.max(...Object.values(frequencies));
      const modes = Object.entries(frequencies)
        .filter(([_, freq]) => freq === maxFreq)
        .map(([num]) => parseFloat(num));
      
      setResult({ modes, frequencies });
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
          <CardTitle>Mode Calculator</CardTitle>
          <CardDescription>Find the most frequently occurring value(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Enter numbers (comma-separated)
              </label>
              <Input
                type="text"
                placeholder="e.g., 1, 2, 2, 3, 4, 4, 4"
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
                  <p className="text-sm text-muted-foreground">Mode(s)</p>
                  <p className="text-2xl font-semibold">{result.modes.join(", ")}</p>
                </div>
                {result.modes.length > 1 && (
                  <p className="text-xs text-muted-foreground">This dataset is multimodal</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
