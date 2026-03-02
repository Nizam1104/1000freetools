"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FactorialCalculator() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<{ factorial: string; steps: string } | null>(null);
  const [error, setError] = useState<string>("");

  const calculate = () => {
    const num = parseInt(number);
    
    if (isNaN(num) || num < 0) {
      setError("Please enter a non-negative integer");
      return;
    }
    
    if (num > 170) {
      setError("Number too large (max 170)");
      return;
    }
    
    setError("");
    
    if (num === 0 || num === 1) {
      setResult({ factorial: "1", steps: `${num}! = 1` });
      return;
    }

    let factorial = BigInt(1);
    const steps: string[] = [];

    for (let i = 1; i <= num; i++) {
      factorial *= BigInt(i);
      steps.push(i.toString());
    }

    setResult({
      factorial: factorial.toString(),
      steps: `${num}! = ${steps.join(" × ")} = ${factorial.toString()}`
    });
  };

  const reset = () => {
    setNumber("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Factorial Calculator</CardTitle>
          <CardDescription>Calculate the factorial of a number (n!)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Number (n)</label>
              <Input
                type="number"
                placeholder="e.g., 5"
                min="0"
                max="170"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
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
                  <p className="text-sm text-muted-foreground">Result</p>
                  <p className="text-2xl font-semibold break-all">{result.factorial}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Calculation</p>
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
