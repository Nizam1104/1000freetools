"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DecimalToFractionCalculator() {
  const [decimal, setDecimal] = useState<string>("");
  const [result, setResult] = useState<{ fraction: string; steps: string } | null>(null);

  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const calculate = () => {
    const dec = parseFloat(decimal);
    
    if (!isNaN(dec)) {
      const str = decimal.toString();
      const decimalPlaces = str.includes(".") ? str.split(".")[1].length : 0;
      const denominator = Math.pow(10, decimalPlaces);
      const numerator = Math.round(dec * denominator);
      const commonDivisor = gcd(numerator, denominator);
      
      const simplifiedNum = numerator / commonDivisor;
      const simplifiedDen = denominator / commonDivisor;
      
      setResult({
        fraction: `${simplifiedNum}/${simplifiedDen}`,
        steps: `${dec} = ${numerator}/${denominator} = ${simplifiedNum}/${simplifiedDen}`
      });
    }
  };

  const reset = () => {
    setDecimal("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Decimal to Fraction Calculator</CardTitle>
          <CardDescription>Convert a decimal to a simplified fraction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Decimal</label>
              <Input
                type="number"
                placeholder="e.g., 0.75"
                step="any"
                value={decimal}
                onChange={(e) => setDecimal(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Fraction</p>
                  <p className="text-2xl font-semibold">{result.fraction}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Steps</p>
                  <p className="text-sm">{result.steps}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
