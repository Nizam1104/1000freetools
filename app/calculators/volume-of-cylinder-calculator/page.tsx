"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VolumeOfCylinderCalculator() {
  const [radius, setRadius] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<{ volume: number; lateralArea: number; totalArea: number } | null>(null);

  const calculate = () => {
    const r = parseFloat(radius);
    const h = parseFloat(height);
    if (!isNaN(r) && !isNaN(h) && r > 0 && h > 0) {
      setResult({
        volume: Math.PI * r * r * h,
        lateralArea: 2 * Math.PI * r * h,
        totalArea: 2 * Math.PI * r * (r + h)
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
          <CardTitle>Volume of Cylinder Calculator</CardTitle>
          <CardDescription>Calculate volume and surface area of a cylinder</CardDescription>
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
                placeholder="e.g., 10"
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
                  <p className="text-sm text-muted-foreground">Volume (πr²h)</p>
                  <p className="text-2xl font-semibold">{result.volume.toFixed(4)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Lateral Area</p>
                    <p className="text-lg">{result.lateralArea.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Surface Area</p>
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
