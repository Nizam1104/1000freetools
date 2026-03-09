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

    if (num > 100000000) {
      setError("Please enter a number up to 100,000,000 for performance reasons");
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

  const loadExample = (num: string) => {
    setNumber(num);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Prime Factorization Calculator - Find Prime Factors Instantly</h1>
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

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Find Prime Factors</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("60")}>60</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("84")}>84</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100")}>100</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("256")}>256 (power of 2)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("17")}>17 (prime)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1001")}>1001</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2310")}>2310</Button>
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

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Verification</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Multiply the prime factors to verify:
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                {result.primeFactors.map(({ prime, exponent }) => 
                  exponent === 1 ? `${prime}` : `${prime}^${exponent}`
                ).join(" × ")} = {number}
              </code>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Prime Factorization</h2>
        <p className="text-muted-foreground">
          Prime factorization breaks down any composite number into its building blocks - the prime numbers that multiply together to create it. Just as molecules are made of atoms, every whole number greater than 1 is made of prime numbers multiplied together.
        </p>
        <p className="text-muted-foreground">
          The Fundamental Theorem of Arithmetic guarantees that every number has exactly one prime factorization (ignoring order). This makes prime factorization a unique "fingerprint" for each number.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Find Prime Factorization</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Method: Trial Division</h4>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Start with the smallest prime (2) and divide if possible</li>
              <li>Keep dividing by 2 until you can't anymore</li>
              <li>Move to the next prime (3), then 5, 7, 11, etc.</li>
              <li>Continue until the quotient is itself prime</li>
              <li>Write the result using exponents for repeated factors</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Factorizing 60</h4>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>60 ÷ 2 = 30</div>
              <div>30 ÷ 2 = 15</div>
              <div>15 ÷ 3 = 5</div>
              <div>5 is prime, stop</div>
              <div>60 = 2 × 2 × 3 × 5 = 2² × 3 × 5</div>
              <div className="text-green-600 font-semibold">Prime factorization: 2² × 3 × 5</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Factorizing 84</h4>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>84 ÷ 2 = 42</div>
              <div>42 ÷ 2 = 21</div>
              <div>21 ÷ 3 = 7</div>
              <div>7 is prime, stop</div>
              <div>84 = 2 × 2 × 3 × 7 = 2² × 3 × 7</div>
              <div className="text-green-600 font-semibold">Prime factorization: 2² × 3 × 7</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Factorizing 100</h4>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>100 ÷ 2 = 50</div>
              <div>50 ÷ 2 = 25</div>
              <div>25 ÷ 5 = 5</div>
              <div>5 is prime, stop</div>
              <div>100 = 2 × 2 × 5 × 5 = 2² × 5²</div>
              <div className="text-green-600 font-semibold">Prime factorization: 2² × 5²</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Factorizing 256 (Power of 2)</h4>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>256 ÷ 2 = 128</div>
              <div>128 ÷ 2 = 64</div>
              <div>64 ÷ 2 = 32</div>
              <div>32 ÷ 2 = 16</div>
              <div>16 ÷ 2 = 8</div>
              <div>8 ÷ 2 = 4</div>
              <div>4 ÷ 2 = 2</div>
              <div>2 is prime, stop</div>
              <div>256 = 2⁸</div>
              <div className="text-green-600 font-semibold">Prime factorization: 2⁸</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Factorizing 1001</h4>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>1001 is odd, skip 2</div>
              <div>1001 ÷ 7 = 143</div>
              <div>143 ÷ 11 = 13</div>
              <div>13 is prime, stop</div>
              <div>1001 = 7 × 11 × 13</div>
              <div className="text-green-600 font-semibold">Prime factorization: 7 × 11 × 13</div>
              <div className="text-muted-foreground">Interesting: three consecutive primes!</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            Prime factorization is the foundation of modern cryptography. RSA encryption, which secures online banking and e-commerce, relies on the fact that multiplying two large primes is easy, but factoring their product back is extremely hard. A 2048-bit RSA key would take classical computers billions of years to factor - though quantum computers could potentially break this someday.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is 1 not considered a prime number?</h4>
            <p className="text-sm text-muted-foreground">
              If 1 were prime, prime factorization wouldn't be unique - you could add as many 1s as you want (6 = 2×3 = 1×2×3 = 1×1×2×3, etc.). Excluding 1 preserves the Fundamental Theorem of Arithmetic. Historically, 1 was considered prime until the 19th century.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the prime factorization of a prime number?</h4>
            <p className="text-sm text-muted-foreground">
              A prime number's factorization is just itself. For example, 17 = 17. It has only one prime factor (itself) with exponent 1. This makes sense - primes are the "atoms" that can't be broken down further.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is prime factorization useful?</h4>
            <p className="text-sm text-muted-foreground">
              It's essential for finding GCD and LCM, simplifying fractions, solving Diophantine equations, understanding number properties (perfect squares have even exponents), and cryptography. It reveals the fundamental structure of numbers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the fastest way to factor large numbers?</h4>
            <p className="text-sm text-muted-foreground">
              For hand calculation, trial division works up to about 10,000. For larger numbers, algorithms like Pollard's rho, quadratic sieve, or the general number field sieve are used. The largest factored number (as of 2024) has 829 bits - a massive computational effort.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can negative numbers have prime factorization?</h4>
            <p className="text-sm text-muted-foreground">
              In standard arithmetic, prime factorization applies to positive integers only. You can factor -60 as -1 × 2² × 3 × 5, but -1 isn't considered prime. In more advanced number theory (Gaussian integers), negative and complex factorizations exist.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What are coprime numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Two numbers are coprime (relatively prime) if they share no prime factors. Their GCD is 1. For example, 8 (2³) and 15 (3×5) are coprime. This concept is crucial in modular arithmetic and cryptography.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
