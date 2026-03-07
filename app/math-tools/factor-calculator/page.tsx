"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FactorCalculator() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    factors: number[];
    count: number;
    primeFactorization: string;
    factorPairs: [number, number][];
  } | null>(null);
  const [error, setError] = useState("");

  const findFactors = () => {
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

    const primeFactors = getPrimeFactorization(num);

    setResult({
      factors: allFactors,
      count: allFactors.length,
      primeFactorization: primeFactors,
      factorPairs,
    });
  };

  const getPrimeFactorization = (num: number): string => {
    const factors: Map<number, number> = new Map();
    let n = num;

    while (n % 2 === 0) {
      factors.set(2, (factors.get(2) || 0) + 1);
      n = n / 2;
    }

    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      while (n % i === 0) {
        factors.set(i, (factors.get(i) || 0) + 1);
        n = n / i;
      }
    }

    if (n > 2) {
      factors.set(n, (factors.get(n) || 0) + 1);
    }

    return Array.from(factors.entries())
      .map(([prime, power]) => power === 1 ? `${prime}` : `${prime}^${power}`)
      .join(" × ");
  };

  const reset = () => {
    setNumber("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Factor Calculator – Find All Factors of Any Integer
          </h1>
          <p className="text-xl text-muted-foreground">
            Find all factors of any integer instantly with our free online factor calculator. Lists every factor in ascending order – perfect for simplifying fractions and solving number theory problems.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Number</label>
              <Input
                type="number"
                placeholder="Enter a positive integer (e.g., 24)"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={findFactors}>Find Factors</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-md mt-4">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {result && (
              <>
                <div className="p-4 bg-muted rounded-md mt-4">
                  <p className="text-sm text-muted-foreground mb-2">All Factors of {number}</p>
                  <p className="text-lg font-semibold">{result.factors.join(", ")}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Total: {result.count} factor{result.count !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-md mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Prime Factorization</p>
                  <p className="text-xl font-semibold font-mono">
                    {number} = {result.primeFactorization}
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-md mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Factor Pairs</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {result.factorPairs.map(([a, b], index) => (
                      <div key={index} className="bg-background p-2 rounded text-center text-sm">
                        {a} × {b}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <section className="mb-12 border-t pt-8">
        </section>
      </div>
    </div>
  );
}
