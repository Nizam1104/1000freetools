"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ModuloCalculator() {
  const [dividend, setDividend] = useState<string>("");
  const [divisor, setDivisor] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(dividend);
    const n = parseFloat(divisor);
    
    if (!isNaN(a) && !isNaN(n) && n !== 0) {
      setResult(((a % n) + n) % n);
    }
  };

  const reset = () => {
    setDividend("");
    setDivisor("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Modulo Calculator</CardTitle>
          <CardDescription>Calculate the remainder: a mod n</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Dividend (a)</label>
              <Input
                type="number"
                placeholder="e.g., 17"
                step="any"
                value={dividend}
                onChange={(e) => setDividend(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Divisor (n)</label>
              <Input
                type="number"
                placeholder="e.g., 5"
                step="any"
                value={divisor}
                onChange={(e) => setDivisor(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-2xl font-semibold">{dividend} mod {divisor} = {result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
