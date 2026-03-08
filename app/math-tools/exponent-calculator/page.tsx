"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ExponentCalculator() {
  const [base, setBase] = useState("");
  const [exponent, setExponent] = useState("");
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Exponent Calculator – Calculate Base to the Power of n
          </h1>
          <p className="text-xl text-muted-foreground">
            Easily calculate any number raised to a power with our free exponent calculator. Supports positive, negative, and fractional exponents for fast and accurate results.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Base (b)</label>
              <Input
                type="number"
                placeholder="Enter base number (e.g., 2)"
                step="any"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Exponent (n)</label>
              <Input
                type="number"
                placeholder="Enter exponent/power (e.g., 3)"
                step="any"
                value={exponent}
                onChange={(e) => setExponent(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md mt-4">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-2xl font-semibold">
                  {base}<sup>{exponent}</sup> = {result}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
