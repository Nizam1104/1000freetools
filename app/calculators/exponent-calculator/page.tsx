"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ExponentCalculator() {
  const [base, setBase] = useState<string>("");
  const [exponent, setExponent] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const b = parseFloat(base);
    const e = parseFloat(exponent);
    if (!isNaN(b) && !isNaN(e)) {
      setResult(Math.pow(b, e));
    }
  };

  const reset = () => {
    setBase("");
    setExponent("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Exponent Calculator</CardTitle>
          <CardDescription>Calculate base raised to a power (bⁿ)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Base (b)</label>
              <Input
                type="number"
                placeholder="e.g., 2"
                step="any"
                value={base}
                onChange={(e) => setBase(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Exponent (n)</label>
              <Input
                type="number"
                placeholder="e.g., 8"
                step="any"
                value={exponent}
                onChange={(e) => setExponent(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result ({base}<sup>{exponent}</sup>)</p>
                <p className="text-2xl font-semibold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
