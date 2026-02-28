"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RectangleAreaCalculator() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [result, setResult] = useState<{ area: number; perimeter: number; diagonal: number } | null>(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    if (!isNaN(l) && !isNaN(w) && l > 0 && w > 0) {
      setResult({
        area: l * w,
        perimeter: 2 * (l + w),
        diagonal: Math.sqrt(l * l + w * w)
      });
    }
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Rectangle Area Calculator</CardTitle>
          <CardDescription>Calculate area, perimeter, and diagonal of a rectangle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Length (l)</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                step="any"
                min="0"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Width (w)</label>
              <Input
                type="number"
                placeholder="e.g., 5"
                step="any"
                min="0"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
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
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Perimeter</p>
                    <p className="text-lg">{result.perimeter.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Diagonal</p>
                    <p className="text-lg">{result.diagonal.toFixed(4)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
