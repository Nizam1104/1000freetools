"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SectorAreaCalculator() {
  const [radius, setRadius] = useState<string>("");
  const [angle, setAngle] = useState<string>("");
  const [result, setResult] = useState<{ area: number; arcLength: number; perimeter: number } | null>(null);

  const calculate = () => {
    const r = parseFloat(radius);
    const theta = parseFloat(angle);
    if (!isNaN(r) && !isNaN(theta) && r > 0 && theta > 0 && theta <= 360) {
      const thetaRad = (theta * Math.PI) / 180;
      const area = 0.5 * r * r * thetaRad;
      const arcLength = r * thetaRad;
      const perimeter = arcLength + 2 * r;
      setResult({ area, arcLength, perimeter });
    }
  };

  const reset = () => {
    setRadius("");
    setAngle("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Sector Area Calculator</CardTitle>
          <CardDescription>Calculate area and arc length of a circular sector</CardDescription>
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
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Central Angle (θ) in degrees</label>
              <Input
                type="number"
                placeholder="e.g., 60"
                step="any"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
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
                    <p className="text-sm text-muted-foreground">Arc Length</p>
                    <p className="text-lg">{result.arcLength.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Perimeter</p>
                    <p className="text-lg">{result.perimeter.toFixed(4)}</p>
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
