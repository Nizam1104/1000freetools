"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VolumeOfConeCalculator() {
  const [radius, setRadius] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<{ volume: number; slantHeight: number; lateralArea: number; totalArea: number } | null>(null);

  const calculate = () => {
    const r = parseFloat(radius);
    const h = parseFloat(height);
    if (!isNaN(r) && !isNaN(h) && r > 0 && h > 0) {
      const slantHeight = Math.sqrt(r * r + h * h);
      setResult({
        volume: (1/3) * Math.PI * r * r * h,
        slantHeight,
        lateralArea: Math.PI * r * slantHeight,
        totalArea: Math.PI * r * (r + slantHeight)
      });
    }
  };

  const reset = () => {
    setRadius("");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Volume of Cone Calculator</CardTitle>
          <CardDescription>Calculate volume and surface area of a cone</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Radius (r)</label>
              <Input
                type="number"
                placeholder="e.g., 3"
                step="any"
                min="0"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
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
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Volume (⅓πr²h)</p>
                  <p className="text-2xl font-semibold">{result.volume.toFixed(4)}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Slant Height</p>
                    <p className="text-lg">{result.slantHeight.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lateral Area</p>
                    <p className="text-lg">{result.lateralArea.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Area</p>
                    <p className="text-lg">{result.totalArea.toFixed(4)}</p>
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
