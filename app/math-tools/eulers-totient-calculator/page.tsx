"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EulersTotientCalculator() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    totient: number;
    primeFactors: number[];
    coprimes: number[];
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const n = parseInt(number);

    if (isNaN(n) || n < 1) {
      setError("Please enter a positive integer");
      return;
    }

    if (n > 10000) {
      setError("Please enter a number up to 10,000 for performance");
      return;
    }

    try {
      // Find prime factorization
      const primeFactors: number[] = [];
      let temp = n;
      
      for (let i = 2; i <= temp; i++) {
        while (temp % i === 0) {
          if (!primeFactors.includes(i)) {
            primeFactors.push(i);
          }
          temp = temp / i;
        }
      }

      // Calculate φ(n) using the formula: φ(n) = n × ∏(1 - 1/p) for each prime p
      let totient = n;
      for (const p of primeFactors) {
        totient = totient * (p - 1) / p;
      }
      totient = Math.floor(totient);

      // Find all coprimes (numbers less than n that are coprime to n)
      const coprimes: number[] = [];
      for (let i = 1; i <= n; i++) {
        if (gcd(i, n) === 1) {
          coprimes.push(i);
        }
      }

      const steps = [
        `Finding Euler's totient function φ(${n})`,
        ``,
        `Step 1: Find prime factorization of ${n}`,
        `${n} = ${primeFactors.join(' × ')}`,
        `Distinct prime factors: ${primeFactors.join(', ')}`,
        ``,
        `Step 2: Apply Euler's totient formula`,
        `φ(n) = n × ∏(1 - 1/p) for each prime p`,
        `φ(${n}) = ${n} × ${primeFactors.map(p => `(1 - 1/${p})`).join(' × ')}`,
        `φ(${n}) = ${n} × ${primeFactors.map(p => `${p-1}/${p}`).join(' × ')}`,
        `φ(${n}) = ${totient}`,
        ``,
        `Step 3: Verify by counting coprimes`,
        `Numbers coprime to ${n}: ${coprimes.slice(0, 20).join(', ')}${coprimes.length > 20 ? '...' : ''}`,
        `Count: ${coprimes.length}`
      ];

      setResult({
        totient,
        primeFactors,
        coprimes,
        steps
      });
    } catch (e) {
      setError("Unable to calculate. Please check your input.");
    }
  };

  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const reset = () => {
    setNumber("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setNumber("12");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Euler's Totient Function Calculator – Compute φ(n) Online</h1>
        <p className="text-muted-foreground">
          Calculate Euler's totient function φ(n) for any integer with our free online calculator. Find the count of integers up to n that share no common factor with n, with step-by-step solutions.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="number">Enter a positive integer (n):</Label>
          <Input
            id="number"
            type="number"
            placeholder="e.g., 12"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate φ(n)</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2">Euler's Totient Function</p>
                <p className="text-5xl font-bold">φ({number}) = {result.totient}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {result.totient} numbers are coprime to {number}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded border">
                  <p className="text-xs text-muted-foreground mb-2">Prime Factors</p>
                  <p className="text-lg font-mono">{result.primeFactors.join(' × ')}</p>
                </div>
                <div className="p-4 bg-background rounded border">
                  <p className="text-xs text-muted-foreground mb-2">Coprime Count</p>
                  <p className="text-lg">Out of {number} numbers, {result.totient} are coprime</p>
                  <p className="text-sm text-muted-foreground">
                    ({Math.round(result.totient / parseFloat(number) * 100)}%)
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Coprime Numbers</h4>
              <div className="flex flex-wrap gap-2">
                {result.coprimes.map((num) => (
                  <div key={num} className="p-2 bg-muted rounded text-center min-w-10">
                    <p className="font-mono text-sm">{num}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                {result.steps.map((step, i) => (
                  <div key={i} className={step === "" ? "h-4" : ""}>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
