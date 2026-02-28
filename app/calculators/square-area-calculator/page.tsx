"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SquareAreaCalculator() {
  const [side, setSide] = useState<string>("");
  const [result, setResult] = useState<{ area: number; perimeter: number; diagonal: number } | null>(null);

  const calculate = () => {
    const s = parseFloat(side);
    if (!isNaN(s) && s > 0) {
      setResult({
        area: s * s,
        perimeter: 4 * s,
        diagonal: s * Math.sqrt(2)
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
          <CardTitle>Square Area Calculator</CardTitle>
          <CardDescription>Calculate area, perimeter, and diagonal of a square</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Side length (s)</label>
              <Input
                type="number"
                placeholder="e.g., 5"
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
                  <p className="text-sm text-muted-foreground">Area (s²)</p>
                  <p className="text-2xl font-semibold">{result.area.toFixed(4)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Perimeter</p>
                    <p className="text-lg">{result.perimeter.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Diagonal</p>
                    <p className="text-lg">{result.diagonal.toFixed(4)}</p>
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
