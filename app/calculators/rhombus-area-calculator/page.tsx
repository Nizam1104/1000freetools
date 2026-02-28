"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RhombusAreaCalculator() {
  const [diagonal1, setDiagonal1] = useState<string>("");
  const [diagonal2, setDiagonal2] = useState<string>("");
  const [side, setSide] = useState<string>("");
  const [result, setResult] = useState<{ area: number; perimeter: number } | null>(null);

  const calculate = () => {
    const d1 = parseFloat(diagonal1);
    const d2 = parseFloat(diagonal2);
    const s = parseFloat(side);
    if (!isNaN(d1) && !isNaN(d2) && !isNaN(s) && d1 > 0 && d2 > 0 && s > 0) {
      setResult({
        area: (d1 * d2) / 2,
        perimeter: 4 * s
      });
    }
  };

  const reset = () => {
    setDiagonal1("");
    setDiagonal2("");
    setSide("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Rhombus Area Calculator</CardTitle>
          <CardDescription>Calculate area and perimeter of a rhombus</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Diagonal 1 (d₁)</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                step="any"
                min="0"
                value={diagonal1}
                onChange={(e) => setDiagonal1(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Diagonal 2 (d₂)</label>
              <Input
                type="number"
                placeholder="e.g., 8"
                step="any"
                min="0"
                value={diagonal2}
                onChange={(e) => setDiagonal2(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Side length (s)</label>
              <Input
                type="number"
                placeholder="e.g., 6"
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
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="text-2xl font-semibold">{result.area.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Perimeter</p>
                  <p className="text-lg">{result.perimeter.toFixed(4)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
