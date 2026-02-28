"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TrapezoidAreaCalculator() {
  const [baseA, setBaseA] = useState<string>("");
  const [baseB, setBaseB] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(baseA);
    const b = parseFloat(baseB);
    const h = parseFloat(height);
    if (!isNaN(a) && !isNaN(b) && !isNaN(h) && a > 0 && b > 0 && h > 0) {
      setResult(((a + b) * h) / 2);
    }
  };

  const reset = () => {
    setBaseA("");
    setBaseB("");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Trapezoid Area Calculator</CardTitle>
          <CardDescription>Calculate the area of a trapezoid</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Base 1 (a)</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                step="any"
                min="0"
                value={baseA}
                onChange={(e) => setBaseA(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Base 2 (b)</label>
              <Input
                type="number"
                placeholder="e.g., 6"
                step="any"
                min="0"
                value={baseB}
                onChange={(e) => setBaseB(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Height (h)</label>
              <Input
                type="number"
                placeholder="e.g., 4"
                step="any"
                min="0"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Area</p>
                <p className="text-2xl font-semibold">{result.toFixed(4)}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
