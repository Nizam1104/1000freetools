"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ScientificNotationCalculator() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<{ scientific: string; eNotation: string } | null>(null);

  const calculate = () => {
    const num = parseFloat(number);
    
    if (!isNaN(num) && num !== 0) {
      const exponent = Math.floor(Math.log10(Math.abs(num)));
      const mantissa = num / Math.pow(10, exponent);
      setResult({
        scientific: `${mantissa.toFixed(6)} × 10^${exponent}`,
        eNotation: `${mantissa.toFixed(6)}e${exponent >= 0 ? "+" : ""}${exponent}`
      });
    } else if (num === 0) {
      setResult({ scientific: "0 × 10^0", eNotation: "0e0" });
    }
  };

  const reset = () => {
    setNumber("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Scientific Notation Calculator</CardTitle>
          <CardDescription>Convert numbers to scientific notation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Number</label>
              <Input
                type="number"
                placeholder="e.g., 123456789 or 0.0000123"
                step="any"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Scientific Notation</p>
                  <p className="text-xl font-semibold">{result.scientific}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-Notation</p>
                  <p className="text-lg font-mono">{result.eNotation}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
