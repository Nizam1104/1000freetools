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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is Prime Factorization?</h2>
        <p className="text-muted-foreground">
          Prime factorization breaks down a composite number into its prime factors – the prime numbers that multiply together to give the original number. Every integer greater than 1 has a unique prime factorization.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Example: 60</p>
          <p className="text-sm font-mono">60 = 2 × 30 = 2 × 2 × 15 = 2 × 2 × 3 × 5 = 2² × 3 × 5</p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">How to Find Prime Factorization</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-3">1</div>
            <h3 className="font-semibold text-sm mb-2">Divide by 2</h3>
            <p className="text-xs text-muted-foreground">
              Keep dividing by 2 until you get an odd number.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-3">2</div>
            <h3 className="font-semibold text-sm mb-2">Try odd primes</h3>
            <p className="text-xs text-muted-foreground">
              Divide by 3, 5, 7, 11... until you reach 1.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-3">3</div>
            <h3 className="font-semibold text-sm mb-2">Write in exponential form</h3>
            <p className="text-xs text-muted-foreground">
              Group repeated primes using exponents.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Prime Factorization Examples</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">24 = 2³ × 3</p>
            <p className="text-sm font-mono">24 → 2×12 → 2×2×6 → 2×2×2×3</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">36 = 2² × 3²</p>
            <p className="text-sm font-mono">36 → 2×18 → 2×2×9 → 2×2×3×3</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">100 = 2² × 5²</p>
            <p className="text-sm font-mono">100 → 2×50 → 2×2×25 → 2×2×5×5</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">84 = 2² × 3 × 7</p>
            <p className="text-sm font-mono">84 → 2×42 → 2×2×21 → 2×2×3×7</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What is prime factorization?</h3>
          <p className="text-sm text-muted-foreground">
            Prime factorization is expressing a number as a product of its prime factors. For example, 12 = 2² × 3.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Why is prime factorization useful?</h3>
          <p className="text-sm text-muted-foreground">
            It helps find GCD, LCM, simplify fractions, and is fundamental in cryptography and number theory.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can prime numbers be factorized?</h3>
          <p className="text-sm text-muted-foreground">
            A prime number's factorization is just itself. For example, 17 = 17.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Is prime factorization unique?</h3>
          <p className="text-sm text-muted-foreground">
            Yes, by the Fundamental Theorem of Arithmetic, every integer greater than 1 has exactly one unique prime factorization (ignoring order).
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/prime-number-checker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Prime Number Checker</p>
            <p className="text-xs text-muted-foreground">Test if prime</p>
          </a>
          <a href="/math-tools/gcd-hcf-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">GCD Calculator</p>
            <p className="text-xs text-muted-foreground">Greatest common divisor</p>
          </a>
          <a href="/math-tools/lcm-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">LCM Calculator</p>
            <p className="text-xs text-muted-foreground">Least common multiple</p>
          </a>
        </div>
      </section>
    </div>
  );
}
