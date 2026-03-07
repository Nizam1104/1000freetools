"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FactorsListGenerator() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    factors: number[];
    count: number;
    factorPairs: [number, number][];
    sum: number;
  } | null>(null);
  const [error, setError] = useState("");

  const findFactors = (num: number) => {
    const factors: number[] = [];
    const factorPairs: [number, number][] = [];

    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        factors.push(i);
        if (i !== num / i) {
          factorPairs.push([i, num / i]);
        } else {
          factorPairs.push([i, i]);
        }
      }
    }

    const allFactors = [...factors];
    factorPairs.forEach(([a, b]) => {
      if (a !== b) {
        allFactors.push(b);
      }
    });
    allFactors.sort((a, b) => a - b);

    return {
      factors: allFactors,
      count: allFactors.length,
      factorPairs,
      sum: allFactors.reduce((a, b) => a + b, 0),
    };
  };

  const calculate = () => {
    const num = parseInt(number);

    if (isNaN(num) || num <= 0) {
      setError("Please enter a positive integer");
      setResult(null);
      return;
    }

    if (num > 10000000) {
      setError("Please enter a number up to 10,000,000 for performance reasons");
      setResult(null);
      return;
    }

    setError("");
    setResult(findFactors(num));
  };

  const reset = () => {
    setNumber("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Factors List Generator – Find All Factors of a Number</h1>
        <p className="text-muted-foreground">
          Generate a complete sorted list of all factors of any number instantly with our free online factors calculator. Ideal for math homework, LCM/GCD problems, and number theory.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number</Label>
          <Input
            type="number"
            placeholder="Enter a positive integer (e.g., 36)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Find All Factors</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">All Factors of {number}</p>
              <p className="text-2xl font-bold">{result.factors.join(", ")}</p>
              <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                <span>Total: {result.count} factors</span>
                <span>Sum: {result.sum}</span>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Factor Pairs</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {result.factorPairs.map(([a, b], idx) => (
                  <div key={idx} className="p-2 bg-background rounded border text-center text-sm font-mono">
                    {a} × {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
