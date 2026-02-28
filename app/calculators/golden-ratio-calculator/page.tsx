"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function GoldenRatioCalculator() {
  const [value, setValue] = useState<string>("");
  const [mode, setMode] = useState<"a" | "b">("a");
  const [result, setResult] = useState<{ a: number; b: number; ratio: number } | null>(null);

  const PHI = (1 + Math.sqrt(5)) / 2; // 1.618...

  const calculate = () => {
    const val = parseFloat(value);
    
    if (!isNaN(val) && val > 0) {
      if (mode === "a") {
        // Given a, find b
        const b = val / PHI;
        setResult({ a: val, b, ratio: PHI });
      } else {
        // Given b, find a
        const a = val * PHI;
        setResult({ a, b: val, ratio: PHI });
      }
    }
  };

  const reset = () => {
    setValue("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Golden Ratio Calculator</CardTitle>
          <CardDescription>Calculate proportions using the golden ratio (φ ≈ 1.618)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-md text-center font-mono text-sm">
              a : b = φ ≈ 1.618
            </div>
            <div className="flex gap-2">
              <Button
                variant={mode === "a" ? "default" : "outline"}
                onClick={() => { setMode("a"); setResult(null); }}
              >
                Given a, find b
              </Button>
              <Button
                variant={mode === "b" ? "default" : "outline"}
                onClick={() => { setMode("b"); setResult(null); }}
              >
                Given b, find a
              </Button>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                {mode === "a" ? "Value of a" : "Value of b"}
              </label>
              <Input
                type="number"
                placeholder="e.g., 100"
                step="any"
                min="0"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">a (larger)</p>
                    <p className="text-xl font-semibold">{result.a.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">b (smaller)</p>
                    <p className="text-xl font-semibold">{result.b.toFixed(4)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ratio (a/b)</p>
                  <p className="text-lg">{result.ratio.toFixed(6)} (φ)</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
