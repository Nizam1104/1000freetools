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
          <h2 className="text-2xl font-semibold mb-6">How to Find Factors</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Start with 1</h3>
              <p className="text-sm text-muted-foreground">1 and the number itself are always factors.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Test Divisors</h3>
              <p className="text-sm text-muted-foreground">Check each number up to the square root.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">Find Pairs</h3>
              <p className="text-sm text-muted-foreground">Each divisor gives a factor pair.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
              <h3 className="font-semibold mb-2">List All</h3>
              <p className="text-sm text-muted-foreground">Combine and sort all factors.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Factor Calculator?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Complete Factor List</h3>
              <p className="text-sm text-muted-foreground">Finds every factor of a number, sorted in ascending order.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Prime Factorization</h3>
              <p className="text-sm text-muted-foreground">Shows the prime factor decomposition with exponents.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Factor Pairs</h3>
              <p className="text-sm text-muted-foreground">Displays all pairs of numbers that multiply to give the original.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Educational Tool</h3>
              <p className="text-sm text-muted-foreground">Perfect for learning about divisibility and number theory.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">What Are Factors?</h2>
          <div className="p-5 bg-muted rounded-lg mb-6">
            <p className="text-sm text-muted-foreground mb-4">
              Factors are whole numbers that divide evenly into another number without leaving a remainder.
              If a × b = n, then both a and b are factors of n.
            </p>
            <div className="bg-background p-4 rounded-md">
              <p className="text-sm font-medium mb-2">Example: Factors of 12</p>
              <p className="text-sm text-muted-foreground">1 × 12 = 12</p>
              <p className="text-sm text-muted-foreground">2 × 6 = 12</p>
              <p className="text-sm text-muted-foreground">3 × 4 = 12</p>
              <p className="text-sm font-semibold mt-2">Factors: 1, 2, 3, 4, 6, 12</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Factor Examples</h2>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Prime Number: 17</h3>
              <p className="text-sm text-muted-foreground mb-2">Factors: 1, 17</p>
              <p className="text-xs text-muted-foreground">Prime numbers have exactly 2 factors.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Composite Number: 24</h3>
              <p className="text-sm text-muted-foreground mb-2">Factors: 1, 2, 3, 4, 6, 8, 12, 24</p>
              <p className="text-sm text-muted-foreground mb-2">Prime factorization: 2³ × 3</p>
              <p className="text-xs text-muted-foreground">Factor pairs: 1×24, 2×12, 3×8, 4×6</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Perfect Square: 36</h3>
              <p className="text-sm text-muted-foreground mb-2">Factors: 1, 2, 3, 4, 6, 9, 12, 18, 36</p>
              <p className="text-sm text-muted-foreground mb-2">Prime factorization: 2² × 3²</p>
              <p className="text-xs text-muted-foreground">Perfect squares have an odd number of factors.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Factor Properties</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Key Facts</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 1 is a factor of every number</li>
                <li>• Every number is a factor of itself</li>
                <li>• Prime numbers have exactly 2 factors</li>
                <li>• Perfect squares have an odd number of factors</li>
                <li>• Factors are always ≤ the number</li>
              </ul>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Divisibility Rules</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Divisible by 2: Last digit is even</li>
                <li>• Divisible by 3: Sum of digits divisible by 3</li>
                <li>• Divisible by 5: Last digit is 0 or 5</li>
                <li>• Divisible by 10: Last digit is 0</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is a factor?</h3>
              <p className="text-sm text-muted-foreground">A factor is a whole number that divides another number evenly without leaving a remainder. For example, 3 is a factor of 12 because 12 ÷ 3 = 4 with no remainder.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is prime factorization?</h3>
              <p className="text-sm text-muted-foreground">Prime factorization breaks down a number into its prime factors – the prime numbers that multiply together to give the original number. For example, 12 = 2² × 3.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How do you find all factors of a number?</h3>
              <p className="text-sm text-muted-foreground">Test each number from 1 up to the square root. If it divides evenly, both the divisor and quotient are factors. List them all in order.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What are factor pairs?</h3>
              <p className="text-sm text-muted-foreground">Factor pairs are two numbers that multiply together to give the original number. For 12, the factor pairs are (1,12), (2,6), and (3,4).</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is the difference between factors and multiples?</h3>
              <p className="text-sm text-muted-foreground">Factors divide into a number (12's factors: 1,2,3,4,6,12). Multiples are what you get when you multiply (12's multiples: 12,24,36,48...).</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Related Math Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/math-tools/prime-factorization-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Prime Factorization</h3>
              <p className="text-sm text-muted-foreground">Get detailed prime factor trees.</p>
            </a>
            <a href="/math-tools/gcd-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">GCD Calculator</h3>
              <p className="text-sm text-muted-foreground">Find greatest common divisor.</p>
            </a>
            <a href="/math-tools/lcm-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">LCM Calculator</h3>
              <p className="text-sm text-muted-foreground">Find least common multiple.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
