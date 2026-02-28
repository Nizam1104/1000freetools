"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PrimeFactorizationCalculator() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<{ factors: number[]; exponential: string } | null>(null);

  const calculate = () => {
    const num = parseInt(number);
    
    if (!isNaN(num) && num > 1) {
      const factors: number[] = [];
      let n = num;
      
      // Check for 2
      while (n % 2 === 0) {
        factors.push(2);
        n = n / 2;
      }
      
      // Check odd numbers
      for (let i = 3; i <= Math.sqrt(n); i += 2) {
        while (n % i === 0) {
          factors.push(i);
          n = n / i;
        }
      }
      
      if (n > 2) {
        factors.push(n);
      }
      
      // Create exponential form
      const factorCount: Record<number, number> = {};
      factors.forEach((f) => {
        factorCount[f] = (factorCount[f] || 0) + 1;
      });
      
      const exponential = Object.entries(factorCount)
        .map(([factor, exp]) => exp > 1 ? `${factor}^${exp}` : factor)
        .join(" × ");
      
      setResult({ factors, exponential });
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
          <CardTitle>Prime Factorization Calculator</CardTitle>
          <CardDescription>Find the prime factors of a number</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Number</label>
              <Input
                type="number"
                placeholder="e.g., 84"
                min="2"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Factorize</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Prime Factors</p>
                  <p className="text-lg">{result.factors.join(" × ")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Exponential Form</p>
                  <p className="text-xl font-semibold">{result.exponential}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
