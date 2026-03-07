"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PrimeFactorizationCalculator() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    primeFactors: Array<{ prime: number; exponent: number }>;
    expandedForm: string;
    factorTree: Array<{ num: number; factors: [number, number] }>;
  } | null>(null);
  const [error, setError] = useState("");

  const getPrimeFactorization = (num: number) => {
    const factors: Map<number, number> = new Map();
    const factorTree: Array<{ num: number; factors: [number, number] }> = [];
    let n = num;

    while (n % 2 === 0) {
      factors.set(2, (factors.get(2) || 0) + 1);
      if (n > 2) factorTree.push({ num: n, factors: [2, n / 2] });
      n = n / 2;
    }

    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      while (n % i === 0) {
        factors.set(i, (factors.get(i) || 0) + 1);
        if (n > i) factorTree.push({ num: n, factors: [i, n / i] });
        n = n / i;
      }
    }

    if (n > 2) {
      factors.set(n, (factors.get(n) || 0) + 1);
    }

    const primeFactors = Array.from(factors.entries())
      .map(([prime, exponent]) => ({ prime, exponent }))
      .sort((a, b) => a.prime - b.prime);

    const expandedForm = primeFactors
      .map(({ prime, exponent }) => exponent === 1 ? `${prime}` : `${prime}^${exponent}`)
      .join(" × ");

    return { primeFactors, expandedForm, factorTree: factorTree.slice(0, 10) };
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
    setResult(getPrimeFactorization(num));
  };

  const reset = () => {
    setNumber("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Prime Factorization Calculator – Find Prime Factors Instantly</h1>
        <p className="text-muted-foreground">
          Find the prime factorization of any number with our free online calculator. Displays all prime factors in exponential form and as a factor tree for easy understanding.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number</Label>
          <Input
            type="number"
            placeholder="Enter a positive integer (e.g., 60)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Find Prime Factors</Button>
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
              <p className="text-sm text-muted-foreground mb-2">Prime Factorization of {number}</p>
              <p className="text-3xl font-bold font-mono">{result.expandedForm}</p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-3">Prime Factors with Exponents</p>
              <div className="flex flex-wrap gap-2">
                {result.primeFactors.map(({ prime, exponent }) => (
                  <div key={prime} className="px-4 py-2 bg-background rounded-lg border">
                    <p className="text-sm font-semibold">{prime}<sup>{exponent}</sup></p>
                    <p className="text-xs text-muted-foreground">{exponent} time{exponent !== 1 ? "s" : ""}</p>
                  </div>
                ))}
              </div>
            </div>

            {result.factorTree.length > 0 && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-3">Factor Tree (first steps)</p>
                <div className="space-y-2 font-mono text-sm">
                  {result.factorTree.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-muted-foreground">{step.num}</span>
                      <span>→</span>
                      <span>{step.factors[0]} × {step.factors[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
