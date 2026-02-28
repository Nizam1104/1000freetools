"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LawOfSinesCalculator() {
  const [angleA, setAngleA] = useState<string>("");
  const [sideA, setSideA] = useState<string>("");
  const [angleB, setAngleB] = useState<string>("");
  const [sideB, setSideB] = useState<string>("");
  const [result, setResult] = useState<{ missing: string; value: number } | null>(null);

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const calculate = () => {
    const A = angleA ? parseFloat(angleA) : null;
    const a = sideA ? parseFloat(sideA) : null;
    const B = angleB ? parseFloat(angleB) : null;
    const b = sideB ? parseFloat(sideB) : null;
    
    // a/sin(A) = b/sin(B)
    if (A && a && B && !b) {
      // Find side b
      const bCalc = (a * Math.sin(toRad(B))) / Math.sin(toRad(A));
      setResult({ missing: "Side b", value: bCalc });
    } else if (A && a && b && !B) {
      // Find angle B
      const sinB = (b * Math.sin(toRad(A))) / a;
      if (sinB <= 1) {
        setResult({ missing: "Angle B", value: toDeg(Math.asin(sinB)) });
      }
    } else if (B && b && A && !a) {
      // Find side a
      const aCalc = (b * Math.sin(toRad(A))) / Math.sin(toRad(B));
      setResult({ missing: "Side a", value: aCalc });
    } else if (B && b && a && !A) {
      // Find angle A
      const sinA = (a * Math.sin(toRad(B))) / b;
      if (sinA <= 1) {
        setResult({ missing: "Angle A", value: toDeg(Math.asin(sinA)) });
      }
    }
  };

  const reset = () => {
    setAngleA("");
    setSideA("");
    setAngleB("");
    setSideB("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Law of Sines Calculator</CardTitle>
          <CardDescription>Solve triangles using a/sin(A) = b/sin(B)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-md text-center font-mono text-sm">
              a/sin(A) = b/sin(B)
            </div>
            <p className="text-sm text-muted-foreground">Enter 3 values to find the 4th</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Angle A (degrees)</label>
                <Input
                  type="number"
                  placeholder="e.g., 30"
                  step="any"
                  min="0"
                  max="180"
                  value={angleA}
                  onChange={(e) => setAngleA(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Side a</label>
                <Input
                  type="number"
                  placeholder="e.g., 10"
                  step="any"
                  min="0"
                  value={sideA}
                  onChange={(e) => setSideA(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Angle B (degrees)</label>
                <Input
                  type="number"
                  placeholder="e.g., 45"
                  step="any"
                  min="0"
                  max="180"
                  value={angleB}
                  onChange={(e) => setAngleB(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Side b</label>
                <Input
                  type="number"
                  placeholder="e.g., 12"
                  step="any"
                  min="0"
                  value={sideB}
                  onChange={(e) => setSideB(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">{result.missing}</p>
                <p className="text-2xl font-semibold">{result.value.toFixed(4)}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
