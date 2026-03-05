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
        <h2 className="text-2xl font-semibold">What Are Factors?</h2>
        <p className="text-muted-foreground">
          Factors are whole numbers that divide evenly into another number. If you can multiply two whole numbers to get a number, both are factors of that number.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Example: Factors of 24</p>
          <p className="text-sm text-muted-foreground mb-2">
            1 × 24 = 24<br />
            2 × 12 = 24<br />
            3 × 8 = 24<br />
            4 × 6 = 24
          </p>
          <p className="text-sm font-semibold">Factors: 1, 2, 3, 4, 6, 8, 12, 24</p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">How to Find Factors</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-3">1</div>
            <h3 className="font-semibold text-sm mb-2">Start from 1</h3>
            <p className="text-xs text-muted-foreground">
              1 and the number itself are always factors.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-3">2</div>
            <h3 className="font-semibold text-sm mb-2">Test up to √n</h3>
            <p className="text-xs text-muted-foreground">
              Check each number up to the square root. If it divides evenly, both it and the quotient are factors.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-3">3</div>
            <h3 className="font-semibold text-sm mb-2">List in order</h3>
            <p className="text-xs text-muted-foreground">
              Sort all factors from smallest to largest.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Factor Examples</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">Prime Number: 17</p>
            <p className="text-sm text-muted-foreground">Factors: 1, 17</p>
            <p className="text-xs text-muted-foreground mt-1">Prime numbers have exactly 2 factors.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">Composite: 24</p>
            <p className="text-sm text-muted-foreground">Factors: 1, 2, 3, 4, 6, 8, 12, 24</p>
            <p className="text-xs text-muted-foreground mt-1">8 factors total. Factor pairs: (1,24), (2,12), (3,8), (4,6)</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">Perfect Square: 36</p>
            <p className="text-sm text-muted-foreground">Factors: 1, 2, 3, 4, 6, 9, 12, 18, 36</p>
            <p className="text-xs text-muted-foreground mt-1">9 factors (odd count because 6×6 is a single pair).</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">Highly Composite: 60</p>
            <p className="text-sm text-muted-foreground">Factors: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60</p>
            <p className="text-xs text-muted-foreground mt-1">12 factors – more than any smaller number.</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Factor Properties</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Key Facts</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• 1 is a factor of every number</li>
              <li>• Every number is a factor of itself</li>
              <li>• Prime numbers have exactly 2 factors</li>
              <li>• Perfect squares have an odd number of factors</li>
              <li>• Factors are always ≤ the number</li>
              <li>• Sum of all factors includes the number itself</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Quick Divisibility Checks</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Ends in 0,2,4,6,8 → divisible by 2</li>
              <li>• Sum of digits ÷ 3 → divisible by 3</li>
              <li>• Ends in 0 or 5 → divisible by 5</li>
              <li>• Last two digits ÷ 4 → divisible by 4</li>
              <li>• Last digit 0 → divisible by 10</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What is a factor?</h3>
          <p className="text-sm text-muted-foreground">
            A factor is a whole number that divides another number evenly. For example, 3 is a factor of 12 because 12 ÷ 3 = 4 with no remainder.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How many factors does a number have?</h3>
          <p className="text-sm text-muted-foreground">
            It depends on the number's prime factorization. Prime numbers have 2 factors. Composite numbers have more. Perfect squares have an odd count.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What are factor pairs?</h3>
          <p className="text-sm text-muted-foreground">
            Factor pairs are two numbers that multiply to give the original number. For 12: (1,12), (2,6), (3,4).
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's the difference between factors and multiples?</h3>
          <p className="text-sm text-muted-foreground">
            Factors divide into a number (finite list). Multiples are what you get when you multiply (infinite list). Factors of 12: 1,2,3,4,6,12. Multiples of 12: 12,24,36,48...
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/prime-factorization-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Prime Factorization</p>
            <p className="text-xs text-muted-foreground">Break into primes</p>
          </a>
          <a href="/math-tools/gcd-hcf-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">GCD Calculator</p>
            <p className="text-xs text-muted-foreground">Greatest common divisor</p>
          </a>
          <a href="/math-tools/divisibility-checker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Divisibility Checker</p>
            <p className="text-xs text-muted-foreground">Test divisibility</p>
          </a>
        </div>
      </section>
    </div>
  );
}
