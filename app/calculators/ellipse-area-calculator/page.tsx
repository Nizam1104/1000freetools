"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EllipseAreaCalculator() {
  const [semiMajor, setSemiMajor] = useState<string>("");
  const [semiMinor, setSemiMinor] = useState<string>("");
  const [result, setResult] = useState<{ area: number; circumference: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(semiMajor);
    const b = parseFloat(semiMinor);
    if (!isNaN(a) && !isNaN(b) && a > 0 && b > 0) {
      const area = Math.PI * a * b;
      // Ramanujan's approximation for ellipse circumference
      const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
      const circumference = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
      setResult({ area, circumference });
    }
  };

  const reset = () => {
    setSemiMajor("");
    setSemiMinor("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Ellipse Area Calculator</CardTitle>
          <CardDescription>Calculate area and circumference of an ellipse</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Semi-major axis (a)</label>
              <Input
                type="number"
                placeholder="e.g., 5"
                step="any"
                min="0"
                value={semiMajor}
                onChange={(e) => setSemiMajor(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Semi-minor axis (b)</label>
              <Input
                type="number"
                placeholder="e.g., 3"
                step="any"
                min="0"
                value={semiMinor}
                onChange={(e) => setSemiMinor(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Area (πab)</p>
                  <p className="text-2xl font-semibold">{result.area.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Circumference (approx.)</p>
                  <p className="text-lg">{result.circumference.toFixed(4)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
