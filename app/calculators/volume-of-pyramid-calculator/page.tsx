"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VolumeOfPyramidCalculator() {
  const [baseLength, setBaseLength] = useState<string>("");
  const [baseWidth, setBaseWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<{ volume: number; baseArea: number } | null>(null);

  const calculate = () => {
    const l = parseFloat(baseLength);
    const w = parseFloat(baseWidth);
    const h = parseFloat(height);
    if (!isNaN(l) && !isNaN(w) && !isNaN(h) && l > 0 && w > 0 && h > 0) {
      const baseArea = l * w;
      setResult({
        volume: (1/3) * baseArea * h,
        baseArea
      });
    }
  };

  const reset = () => {
    setBaseLength("");
    setBaseWidth("");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Volume of Pyramid Calculator</CardTitle>
          <CardDescription>Calculate volume of a rectangular pyramid</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Base Length (l)</label>
                <Input
                  type="number"
                  placeholder="e.g., 6"
                  step="any"
                  min="0"
                  value={baseLength}
                  onChange={(e) => setBaseLength(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Base Width (w)</label>
                <Input
                  type="number"
                  placeholder="e.g., 4"
                  step="any"
                  min="0"
                  value={baseWidth}
                  onChange={(e) => setBaseWidth(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Height (h)</label>
                <Input
                  type="number"
                  placeholder="e.g., 8"
                  step="any"
                  min="0"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Volume (⅓Bh)</p>
                  <p className="text-2xl font-semibold">{result.volume.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Base Area</p>
                  <p className="text-lg">{result.baseArea.toFixed(4)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
