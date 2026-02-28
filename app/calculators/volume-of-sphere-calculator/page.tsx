"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VolumeOfSphereCalculator() {
  const [radius, setRadius] = useState<string>("");
  const [result, setResult] = useState<{ volume: number; surfaceArea: number; diameter: number } | null>(null);

  const calculate = () => {
    const r = parseFloat(radius);
    if (!isNaN(r) && r > 0) {
      setResult({
        volume: (4/3) * Math.PI * r * r * r,
        surfaceArea: 4 * Math.PI * r * r,
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
          <CardTitle>Volume of Sphere Calculator</CardTitle>
          <CardDescription>Calculate volume and surface area of a sphere</CardDescription>
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
                  <p className="text-sm text-muted-foreground">Volume (⁴⁄₃πr³)</p>
                  <p className="text-2xl font-semibold">{result.volume.toFixed(4)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Surface Area</p>
                    <p className="text-lg">{result.surfaceArea.toFixed(4)}</p>
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
