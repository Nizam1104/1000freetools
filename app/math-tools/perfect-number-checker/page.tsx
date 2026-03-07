"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PerfectNumberChecker() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    isPerfect: boolean;
    properDivisors: number[];
    sum: number;
    explanation: string;
  } | null>(null);
  const [error, setError] = useState("");

  const getProperDivisors = (num: number): number[] => {
    if (num <= 1) return [];
    
    const divisors = [1];
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        divisors.push(i);
        if (i !== num / i && num / i !== num) {
          divisors.push(num / i);
        }
      }
    }
    return divisors.sort((a, b) => a - b);
  };

  const checkPerfect = () => {
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
    const properDivisors = getProperDivisors(num);
    const sum = properDivisors.reduce((a, b) => a + b, 0);
    const isPerfect = sum === num && num > 1;

    let explanation: string;
    if (num === 1) {
      explanation = "1 is not a perfect number. By definition, perfect numbers must be greater than 1.";
    } else if (isPerfect) {
      explanation = `${num} is a perfect number! The sum of its proper divisors equals ${num}.`;
    } else if (sum < num) {
      explanation = `${num} is deficient. The sum of its proper divisors (${sum}) is less than ${num}.`;
    } else {
      explanation = `${num} is abundant. The sum of its proper divisors (${sum}) is greater than ${num}.`;
    }

    setResult({
      isPerfect,
      properDivisors,
      sum,
      explanation,
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
        <h1 className="text-3xl font-semibold mb-2">Perfect Number Checker – Is It a Perfect Number?</h1>
        <p className="text-muted-foreground">
          Check if any number is a perfect number with our free online perfect number checker. Instantly determine if the sum of proper divisors equals the number itself.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number</Label>
          <Input
            type="number"
            placeholder="Enter a positive integer (e.g., 28)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={checkPerfect}>Check if Perfect</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg text-center ${result.isPerfect ? "bg-green-500/10 border border-green-500/30" : "bg-muted"}`}>
              <p className={`text-5xl font-bold mb-2 ${result.isPerfect ? "text-green-600" : ""}`}>
                {result.isPerfect ? "Perfect Number" : "Not Perfect"}
              </p>
              <p className="text-sm text-muted-foreground">{result.explanation}</p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">Proper Divisors of {number}</p>
              <p className="text-lg font-mono">{result.properDivisors.join(", ")}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Sum: {result.properDivisors.join(" + ")} = {result.sum}
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
