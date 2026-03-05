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
        <h2 className="text-2xl font-semibold">What Is a Perfect Number?</h2>
        <p className="text-muted-foreground">
          A perfect number is a positive integer that equals the sum of its proper divisors (all positive divisors except the number itself). It's a rare and special property in number theory.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Example: 28</p>
          <p className="text-sm text-muted-foreground mb-2">
            Proper divisors: 1, 2, 4, 7, 14<br />
            Sum: 1 + 2 + 4 + 7 + 14 = 28
          </p>
          <p className="text-sm font-semibold text-green-600">28 is a perfect number</p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Known Perfect Numbers</h2>
        <p className="text-muted-foreground">
          Perfect numbers are extremely rare. Only 51 are known as of 2024, and they grow enormous very quickly. All known perfect numbers are even – whether odd perfect numbers exist remains an open question in mathematics.
        </p>
        <div className="space-y-3">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="font-semibold text-sm mb-1">6</p>
            <p className="text-sm text-muted-foreground">Divisors: 1, 2, 3 | Sum: 1 + 2 + 3 = 6</p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="font-semibold text-sm mb-1">28</p>
            <p className="text-sm text-muted-foreground">Divisors: 1, 2, 4, 7, 14 | Sum: 1 + 2 + 4 + 7 + 14 = 28</p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="font-semibold text-sm mb-1">496</p>
            <p className="text-sm text-muted-foreground">Divisors: 1, 2, 4, 8, 16, 31, 62, 124, 248 | Sum: 496</p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="font-semibold text-sm mb-1">8,128</p>
            <p className="text-sm text-muted-foreground">The 4th perfect number. Discovered by Nicomachus around 100 CE.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">33,550,336</p>
            <p className="text-sm text-muted-foreground">The 5th perfect number. You can see how quickly they grow.</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Number Types by Divisor Sum</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h3 className="font-semibold mb-2">Perfect</h3>
            <p className="text-xs text-muted-foreground mb-2">Sum of proper divisors = number</p>
            <p className="text-xs font-mono">6: 1+2+3 = 6</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Deficient</h3>
            <p className="text-xs text-muted-foreground mb-2">Sum of proper divisors &lt; number</p>
            <p className="text-xs font-mono">8: 1+2+4 = 7 &lt; 8</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Abundant</h3>
            <p className="text-xs text-muted-foreground mb-2">Sum of proper divisors &gt; number</p>
            <p className="text-xs font-mono">12: 1+2+3+4+6 = 16 &gt; 12</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Euclid-Euler Theorem</h2>
        <p className="text-muted-foreground">
          Every even perfect number has the form 2^(p-1) × (2^p - 1), where 2^p - 1 is a Mersenne prime. This connection between perfect numbers and Mersenne primes is one of the beautiful results in number theory.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-mono mb-2">For p = 2: 2¹ × (2² - 1) = 2 × 3 = 6</p>
          <p className="text-sm font-mono mb-2">For p = 3: 2² × (2³ - 1) = 4 × 7 = 28</p>
          <p className="text-sm font-mono mb-2">For p = 5: 2⁴ × (2⁵ - 1) = 16 × 31 = 496</p>
          <p className="text-sm font-mono">For p = 7: 2⁶ × (2⁷ - 1) = 64 × 127 = 8,128</p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What makes a number perfect?</h3>
          <p className="text-sm text-muted-foreground">
            A perfect number equals the sum of its proper divisors (all divisors except itself). For example, 6 has divisors 1, 2, 3, and 1 + 2 + 3 = 6.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How many perfect numbers are there?</h3>
          <p className="text-sm text-muted-foreground">
            Only 51 perfect numbers are known. They grow extremely large – the 51st has over 49 million digits. Whether there are infinitely many remains unknown.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Are there any odd perfect numbers?</h3>
          <p className="text-sm text-muted-foreground">
            None have been found. Mathematicians have proven that if an odd perfect number exists, it must be larger than 10^1500 and satisfy many restrictive conditions. Most experts doubt they exist.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What are perfect numbers used for?</h3>
          <p className="text-sm text-muted-foreground">
            Perfect numbers don't have practical applications – they're studied for their mathematical beauty. They connect to Mersenne primes and appear in ancient Greek mathematics.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/armstrong-number-checker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Armstrong Number Checker</p>
            <p className="text-xs text-muted-foreground">Narcissistic numbers</p>
          </a>
          <a href="/math-tools/factors-list-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Factors List Generator</p>
            <p className="text-xs text-muted-foreground">Find all factors</p>
          </a>
          <a href="/math-tools/prime-number-checker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Prime Number Checker</p>
            <p className="text-xs text-muted-foreground">Test if prime</p>
          </a>
        </div>
      </section>
    </div>
  );
}
