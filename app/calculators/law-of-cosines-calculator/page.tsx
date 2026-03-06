"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LawOfCosinesCalculator() {
  const [sideA, setSideA] = useState<string>("");
  const [sideB, setSideB] = useState<string>("");
  const [sideC, setSideC] = useState<string>("");
  const [angleC, setAngleC] = useState<string>("");
  const [result, setResult] = useState<{ missing: string; value: number } | null>(null);

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const calculate = () => {
    const a = sideA ? parseFloat(sideA) : null;
    const b = sideB ? parseFloat(sideB) : null;
    const c = sideC ? parseFloat(sideC) : null;
    const C = angleC ? parseFloat(angleC) : null;
    
    // c² = a² + b² - 2ab*cos(C)
    if (a && b && C && !c) {
      // Find side c
      const cCalc = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(toRad(C)));
      setResult({ missing: "Side c", value: cCalc });
    } else if (a && b && c && !C) {
      // Find angle C
      const cosC = (a * a + b * b - c * c) / (2 * a * b);
      if (cosC >= -1 && cosC <= 1) {
        setResult({ missing: "Angle C", value: toDeg(Math.acos(cosC)) });
      }
    }
  };

  const reset = () => {
    setSideA("");
    setSideB("");
    setSideC("");
    setAngleC("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-md text-center font-mono text-sm">
              c² = a² + b² - 2ab·cos(C)
            </div>
            <p className="text-sm text-muted-foreground">Enter 3 values to find the 4th</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Side a</label>
                <Input
                  type="number"
                  placeholder="e.g., 5"
                  step="any"
                  min="0"
                  value={sideA}
                  onChange={(e) => setSideA(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Side b</label>
                <Input
                  type="number"
                  placeholder="e.g., 7"
                  step="any"
                  min="0"
                  value={sideB}
                  onChange={(e) => setSideB(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Side c</label>
                <Input
                  type="number"
                  placeholder="e.g., 8"
                  step="any"
                  min="0"
                  value={sideC}
                  onChange={(e) => setSideC(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Angle C (degrees)</label>
                <Input
                  type="number"
                  placeholder="e.g., 60"
                  step="any"
                  min="0"
                  max="180"
                  value={angleC}
                  onChange={(e) => setAngleC(e.target.value)}
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
