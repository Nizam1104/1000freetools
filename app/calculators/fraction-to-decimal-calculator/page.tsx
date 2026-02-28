"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FractionToDecimalCalculator() {
  const [numerator, setNumerator] = useState<string>("");
  const [denominator, setDenominator] = useState<string>("");
  const [result, setResult] = useState<{ decimal: number; percentage: number } | null>(null);

  const calculate = () => {
    const num = parseFloat(numerator);
    const den = parseFloat(denominator);
    
    if (!isNaN(num) && !isNaN(den) && den !== 0) {
      setResult({
        decimal: num / den,
        percentage: (num / den) * 100
      });
    }
  };

  const reset = () => {
    setNumerator("");
    setDenominator("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Fraction to Decimal Calculator</CardTitle>
          <CardDescription>Convert a fraction to decimal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-2 block">Numerator</label>
                <Input
                  type="number"
                  placeholder="e.g., 3"
                  step="any"
                  value={numerator}
                  onChange={(e) => setNumerator(e.target.value)}
                />
              </div>
              <div className="text-2xl font-bold pb-3">/</div>
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-2 block">Denominator</label>
                <Input
                  type="number"
                  placeholder="e.g., 4"
                  step="any"
                  value={denominator}
                  onChange={(e) => setDenominator(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Decimal</p>
                  <p className="text-2xl font-semibold">{result.decimal}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Percentage</p>
                  <p className="text-xl">{result.percentage}%</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
