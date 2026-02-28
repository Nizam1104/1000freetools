"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VolumeOfCuboidCalculator() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<{ volume: number; surfaceArea: number; spaceDiagonal: number } | null>(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (!isNaN(l) && !isNaN(w) && !isNaN(h) && l > 0 && w > 0 && h > 0) {
      setResult({
        volume: l * w * h,
        surfaceArea: 2 * (l * w + w * h + h * l),
        spaceDiagonal: Math.sqrt(l * l + w * w + h * h)
      });
    }
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Volume of Cuboid Calculator</CardTitle>
          <CardDescription>Calculate volume and surface area of a rectangular prism</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Length (l)</label>
                <Input
                  type="number"
                  placeholder="e.g., 5"
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
                  placeholder="e.g., 3"
                  step="any"
                  min="0"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
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
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Volume (lwh)</p>
                  <p className="text-2xl font-semibold">{result.volume.toFixed(4)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Surface Area</p>
                    <p className="text-lg">{result.surfaceArea.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Space Diagonal</p>
                    <p className="text-lg">{result.spaceDiagonal.toFixed(4)}</p>
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
