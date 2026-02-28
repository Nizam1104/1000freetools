"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DistanceFormulaCalculator() {
  const [x1, setX1] = useState<string>("");
  const [y1, setY1] = useState<string>("");
  const [x2, setX2] = useState<string>("");
  const [y2, setY2] = useState<string>("");
  const [result, setResult] = useState<{ distance: number; midpoint: { x: number; y: number } } | null>(null);

  const calculate = () => {
    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const x2Val = parseFloat(x2);
    const y2Val = parseFloat(y2);
    
    if (!isNaN(x1Val) && !isNaN(y1Val) && !isNaN(x2Val) && !isNaN(y2Val)) {
      const distance = Math.sqrt(Math.pow(x2Val - x1Val, 2) + Math.pow(y2Val - y1Val, 2));
      const midpoint = {
        x: (x1Val + x2Val) / 2,
        y: (y1Val + y2Val) / 2
      };
      setResult({ distance, midpoint });
    }
  };

  const reset = () => {
    setX1("");
    setY1("");
    setX2("");
    setY2("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Distance Formula Calculator</CardTitle>
          <CardDescription>Calculate distance and midpoint between two points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-md text-center font-mono text-sm">
              d = √[(x₂-x₁)² + (y₂-y₁)²]
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Point 1 (x₁, y₁)</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="x₁"
                    step="any"
                    value={x1}
                    onChange={(e) => setX1(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="y₁"
                    step="any"
                    value={y1}
                    onChange={(e) => setY1(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Point 2 (x₂, y₂)</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="x₂"
                    step="any"
                    value={x2}
                    onChange={(e) => setX2(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="y₂"
                    step="any"
                    value={y2}
                    onChange={(e) => setY2(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Distance</p>
                  <p className="text-2xl font-semibold">{result.distance.toFixed(4)}</p>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Midpoint</p>
                  <p className="text-lg">({result.midpoint.x.toFixed(4)}, {result.midpoint.y.toFixed(4)})</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
