"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ParallelogramAreaCalculator() {
  const [base, setBase] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [side, setSide] = useState<string>("");
  const [result, setResult] = useState<{ area: number; perimeter: number } | null>(null);

  const calculate = () => {
    const b = parseFloat(base);
    const h = parseFloat(height);
    const s = parseFloat(side);
    if (!isNaN(b) && !isNaN(h) && !isNaN(s) && b > 0 && h > 0 && s > 0) {
      setResult({
        area: b * h,
        perimeter: 2 * (b + s)
      });
    }
  };

  const reset = () => {
    setBase("");
    setHeight("");
    setSide("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Parallelogram Area Calculator</CardTitle>
          <CardDescription>Calculate area and perimeter of a parallelogram</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Base (b)</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                step="any"
                min="0"
                value={base}
                onChange={(e) => setBase(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Height (h)</label>
              <Input
                type="number"
                placeholder="e.g., 6"
                step="any"
                min="0"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Side length (s)</label>
              <Input
                type="number"
                placeholder="e.g., 8"
                step="any"
                min="0"
                value={side}
                onChange={(e) => setSide(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="text-2xl font-semibold">{result.area.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Perimeter</p>
                  <p className="text-lg">{result.perimeter.toFixed(4)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
