"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TriangleAreaCalculator() {
  const [base, setBase] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const b = parseFloat(base);
    const h = parseFloat(height);
    if (!isNaN(b) && !isNaN(h) && b > 0 && h > 0) {
      setResult(0.5 * b * h);
    }
  };

  const reset = () => {
    setBase("");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Triangle Area Calculator</CardTitle>
          <CardDescription>Calculate the area of a triangle</CardDescription>
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
                placeholder="e.g., 5"
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
                <p className="text-2xl font-semibold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
