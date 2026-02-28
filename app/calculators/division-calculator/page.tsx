"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DivisionCalculator() {
  const [dividend, setDividend] = useState<string>("");
  const [divisor, setDivisor] = useState<string>("");
  const [result, setResult] = useState<{ quotient: number; remainder: number } | null>(null);
  const [error, setError] = useState<string>("");

  const calculate = () => {
    const n1 = parseFloat(dividend);
    const n2 = parseFloat(divisor);
    
    if (isNaN(n1) || isNaN(n2)) {
      setError("Please enter valid numbers");
      return;
    }
    
    if (n2 === 0) {
      setError("Division by zero is not allowed");
      return;
    }
    
    setError("");
    setResult({
      quotient: n1 / n2,
      remainder: n1 % n2
    });
  };

  const reset = () => {
    setDividend("");
    setDivisor("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Division Calculator</CardTitle>
          <CardDescription>Divide one number by another</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Dividend</label>
              <Input
                type="number"
                placeholder="e.g., 100"
                value={dividend}
                onChange={(e) => setDividend(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Divisor</label>
              <Input
                type="number"
                placeholder="e.g., 5"
                value={divisor}
                onChange={(e) => setDivisor(e.target.value)}
              />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Quotient</p>
                  <p className="text-2xl font-semibold">{result.quotient}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Remainder</p>
                  <p className="text-xl font-semibold">{result.remainder}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
