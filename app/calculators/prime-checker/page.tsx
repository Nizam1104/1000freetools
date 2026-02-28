"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PrimeChecker() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<{ isPrime: boolean; factors?: number[] } | null>(null);

  const isPrime = (num: number): { isPrime: boolean; factors: number[] } => {
    if (num < 2) return { isPrime: false, factors: [] };
    if (num === 2) return { isPrime: true, factors: [1, 2] };
    if (num % 2 === 0) return { isPrime: false, factors: [1, 2, num / 2, num] };
    
    const factors: number[] = [1, num];
    const sqrt = Math.sqrt(num);
    
    for (let i = 3; i <= sqrt; i += 2) {
      if (num % i === 0) {
        factors.push(i, num / i);
      }
    }
    
    return { isPrime: factors.length === 2, factors: factors.sort((a, b) => a - b) };
  };

  const calculate = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 0) return;
    
    setResult(isPrime(num));
  };

  const reset = () => {
    setNumber("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Prime Number Checker</CardTitle>
          <CardDescription>Check if a number is prime and see its factors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Number</label>
              <Input
                type="number"
                placeholder="e.g., 17"
                min="0"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Check</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Result</p>
                  <p className={`text-2xl font-semibold ${result.isPrime ? 'text-green-600' : 'text-destructive'}`}>
                    {result.isPrime ? "Prime Number ✓" : "Not a Prime Number ✗"}
                  </p>
                </div>
                {!result.isPrime && result.factors && result.factors.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground">Factors</p>
                    <p className="text-lg">{result.factors.join(", ")}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
