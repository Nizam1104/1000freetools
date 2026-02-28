"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CircleAreaCalculator() {
  const [radius, setRadius] = useState<string>("");
  const [result, setResult] = useState<{ area: number; circumference: number; diameter: number } | null>(null);

  const calculate = () => {
    const r = parseFloat(radius);
    if (!isNaN(r) && r > 0) {
      setResult({
        area: Math.PI * r * r,
        circumference: 2 * Math.PI * r,
        diameter: 2 * r
      });
    }
  };

  const reset = () => {
    setRadius("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Circle Area Calculator</CardTitle>
          <CardDescription>Calculate area, circumference, and diameter of a circle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Radius (r)</label>
              <Input
                type="number"
                placeholder="e.g., 5"
                step="any"
                min="0"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Area (πr²)</p>
                  <p className="text-2xl font-semibold">{result.area.toFixed(4)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Circumference</p>
                    <p className="text-lg">{result.circumference.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Diameter</p>
                    <p className="text-lg">{result.diameter.toFixed(4)}</p>
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
