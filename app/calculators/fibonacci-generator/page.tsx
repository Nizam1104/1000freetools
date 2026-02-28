"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FibonacciGenerator() {
  const [n, setN] = useState<string>("");
  const [result, setResult] = useState<{ sequence: number[]; nth: number; sum: number } | null>(null);

  const calculate = () => {
    const nVal = parseInt(n);
    
    if (!isNaN(nVal) && nVal > 0 && nVal <= 100) {
      const sequence: number[] = [];
      let a = 0, b = 1;
      
      for (let i = 0; i < nVal; i++) {
        sequence.push(a);
        [a, b] = [b, a + b];
      }
      
      setResult({
        sequence,
        nth: sequence[nVal - 1] || 0,
        sum: sequence.reduce((sum, val) => sum + val, 0)
      });
    }
  };

  const reset = () => {
    setN("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Fibonacci Generator</CardTitle>
          <CardDescription>Generate Fibonacci sequence up to n terms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Number of terms (n)</label>
              <Input
                type="number"
                placeholder="e.g., 15"
                min="1"
                max="100"
                value={n}
                onChange={(e) => setN(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Generate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">n-th Fibonacci</p>
                    <p className="text-xl font-semibold">{result.nth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sum of terms</p>
                    <p className="text-xl font-semibold">{result.sum}</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Sequence</p>
                  <p className="text-sm break-all">{result.sequence.join(", ")}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
