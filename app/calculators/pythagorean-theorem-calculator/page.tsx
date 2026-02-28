"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PythagoreanTheoremCalculator() {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [c, setC] = useState<string>("");
  const [result, setResult] = useState<{ side: string; value: number } | null>(null);

  const calculate = () => {
    const aVal = a ? parseFloat(a) : null;
    const bVal = b ? parseFloat(b) : null;
    const cVal = c ? parseFloat(c) : null;
    
    if (aVal && bVal && !c) {
      // Calculate hypotenuse
      const cCalc = Math.sqrt(aVal * aVal + bVal * bVal);
      setResult({ side: "c (hypotenuse)", value: cCalc });
    } else if (aVal && cVal && !b && cVal > aVal) {
      // Calculate leg b
      const bCalc = Math.sqrt(cVal * cVal - aVal * aVal);
      setResult({ side: "b (leg)", value: bCalc });
    } else if (bVal && cVal && !a && cVal > bVal) {
      // Calculate leg a
      const aCalc = Math.sqrt(cVal * cVal - bVal * bVal);
      setResult({ side: "a (leg)", value: aCalc });
    }
  };

  const reset = () => {
    setA("");
    setB("");
    setC("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Pythagorean Theorem Calculator</CardTitle>
          <CardDescription>Calculate the missing side of a right triangle: a² + b² = c²</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-md text-center font-mono">
              a² + b² = c²
            </div>
            <p className="text-sm text-muted-foreground">
              Enter any two sides to calculate the third
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Side a</label>
                <Input
                  type="number"
                  placeholder="Leg"
                  step="any"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Side b</label>
                <Input
                  type="number"
                  placeholder="Leg"
                  step="any"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Side c</label>
                <Input
                  type="number"
                  placeholder="Hypotenuse"
                  step="any"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">{result.side}</p>
                <p className="text-2xl font-semibold">{result.value.toFixed(4)}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
