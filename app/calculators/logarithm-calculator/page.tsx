"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LogarithmCalculator() {
  const [number, setNumber] = useState<string>("");
  const [base, setBase] = useState<string>("10");
  const [result, setResult] = useState<{ natural: number; base10: number; customBase: number } | null>(null);

  const calculate = () => {
    const num = parseFloat(number);
    const b = parseFloat(base);
    
    if (!isNaN(num) && !isNaN(b) && num > 0 && b > 0 && b !== 1) {
      setResult({
        natural: Math.log(num),
        base10: Math.log10(num),
        customBase: Math.log(num) / Math.log(b)
      });
    }
  };

  const reset = () => {
    setNumber("");
    setBase("10");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Logarithm Calculator</CardTitle>
          <CardDescription>Calculate logarithms with different bases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Number (x)</label>
              <Input
                type="number"
                placeholder="e.g., 100"
                step="any"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Base (optional, default: 10)</label>
              <Input
                type="number"
                placeholder="e.g., 2"
                step="any"
                value={base}
                onChange={(e) => setBase(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Natural Log (ln)</p>
                    <p className="text-xl font-semibold">{result.natural.toFixed(6)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Log Base 10</p>
                    <p className="text-xl font-semibold">{result.base10.toFixed(6)}</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Log Base {base}</p>
                  <p className="text-lg">{result.customBase.toFixed(6)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
