"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SimplifyFractionCalculator() {
  const [numerator, setNumerator] = useState<string>("");
  const [denominator, setDenominator] = useState<string>("");
  const [result, setResult] = useState<{ simplified: string; gcd: number; decimal: number } | null>(null);

  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const calculate = () => {
    const num = parseInt(numerator);
    const den = parseInt(denominator);
    
    if (!isNaN(num) && !isNaN(den) && den !== 0) {
      const commonDivisor = gcd(Math.abs(num), Math.abs(den));
      const simplifiedNum = num / commonDivisor;
      const simplifiedDen = den / commonDivisor;
      
      setResult({
        simplified: `${simplifiedNum}/${simplifiedDen}`,
        gcd: commonDivisor,
        decimal: num / den
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
          <CardTitle>Simplify Fraction Calculator</CardTitle>
          <CardDescription>Reduce a fraction to its simplest form</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-2 block">Numerator</label>
                <Input
                  type="number"
                  placeholder="e.g., 12"
                  value={numerator}
                  onChange={(e) => setNumerator(e.target.value)}
                />
              </div>
              <div className="text-2xl font-bold pb-3">/</div>
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-2 block">Denominator</label>
                <Input
                  type="number"
                  placeholder="e.g., 18"
                  value={denominator}
                  onChange={(e) => setDenominator(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Simplify</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Simplified Fraction</p>
                  <p className="text-2xl font-semibold">{result.simplified}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">GCD</p>
                    <p className="text-lg">{result.gcd}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Decimal</p>
                    <p className="text-lg">{result.decimal.toFixed(6)}</p>
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
