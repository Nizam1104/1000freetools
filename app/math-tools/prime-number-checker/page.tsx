"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PrimeNumberChecker() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    isPrime: boolean;
    explanation: string;
    factors?: number[];
  } | null>(null);
  const [error, setError] = useState("");

  const isPrime = (num: number): { isPrime: boolean; factors: number[] } => {
    if (num < 2) return { isPrime: false, factors: [] };
    if (num === 2) return { isPrime: true, factors: [1, 2] };
    if (num % 2 === 0) return { isPrime: false, factors: [1, 2, num / 2, num] };

    const factors: number[] = [1];
    const sqrt = Math.sqrt(num);

    for (let i = 3; i <= sqrt; i += 2) {
      if (num % i === 0) {
        factors.push(i);
        if (i !== num / i) {
          factors.push(num / i);
        }
      }
    }

    factors.push(num);
    factors.sort((a, b) => a - b);

    return { isPrime: factors.length === 2, factors };
  };

  const checkPrime = () => {
    const num = parseInt(number);

    if (isNaN(num)) {
      setError("Please enter a valid integer");
      setResult(null);
      return;
    }

    if (num < 0) {
      setError("Please enter a positive integer");
      setResult(null);
      return;
    }

    if (num > 1000000000) {
      setError("Please enter a number up to 1,000,000,000 for performance reasons");
      setResult(null);
      return;
    }

    setError("");
    const { isPrime: prime, factors } = isPrime(num);

    let explanation: string;
    if (num < 2) {
      explanation = `${num} is not prime. Prime numbers must be greater than 1.`;
    } else if (prime) {
      explanation = `${num} is prime. It has exactly two factors: 1 and itself.`;
    } else {
      explanation = `${num} is not prime (composite). It can be divided evenly by ${factors.slice(1, -1).join(", ")}.`;
    }

    setResult({
      isPrime: prime,
      explanation,
      factors,
    });
  };

  const reset = () => {
    setNumber("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Prime Number Checker – Is It Prime? Find Out Instantly</h1>
        <p className="text-muted-foreground">
          Check if any number is prime or composite instantly with our free online prime number checker. Fast, accurate prime testing for any positive integer with a clear explanation.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number</Label>
          <Input
            type="number"
            placeholder="Enter a positive integer (e.g., 17)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={checkPrime}>Check if Prime</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg text-center ${result.isPrime ? "bg-green-500/10 border border-green-500/30" : "bg-muted"}`}>
              <p className={`text-5xl font-bold mb-2 ${result.isPrime ? "text-green-600" : ""}`}>
                {result.isPrime ? "Prime Number" : "Not Prime"}
              </p>
              <p className="text-sm text-muted-foreground">{result.explanation}</p>
            </div>

            {result.factors && result.factors.length > 0 && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">All Factors</p>
                <p className="font-semibold">{result.factors.join(", ")}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Total: {result.factors.length} factor{result.factors.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
