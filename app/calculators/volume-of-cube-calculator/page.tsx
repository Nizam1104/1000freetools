"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VolumeOfCubeCalculator() {
  const [side, setSide] = useState<string>("");
  const [result, setResult] = useState<{ volume: number; surfaceArea: number; spaceDiagonal: number; faceDiagonal: number } | null>(null);

  const calculate = () => {
    const s = parseFloat(side);
    if (!isNaN(s) && s > 0) {
      setResult({
        volume: s * s * s,
        surfaceArea: 6 * s * s,
        spaceDiagonal: s * Math.sqrt(3),
        faceDiagonal: s * Math.sqrt(2)
      });
    }
  };

  const reset = () => {
    setSide("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Volume of Cube Calculator</CardTitle>
          <CardDescription>Calculate volume and surface area of a cube</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Side length (s)</label>
              <Input
                type="number"
                placeholder="e.g., 4"
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
                  <p className="text-sm text-muted-foreground">Volume (s³)</p>
                  <p className="text-2xl font-semibold">{result.volume.toFixed(4)}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Surface Area</p>
                    <p className="text-lg">{result.surfaceArea.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Space Diagonal</p>
                    <p className="text-lg">{result.spaceDiagonal.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Face Diagonal</p>
                    <p className="text-lg">{result.faceDiagonal.toFixed(4)}</p>
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
