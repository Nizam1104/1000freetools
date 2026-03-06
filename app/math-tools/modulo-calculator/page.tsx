"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ModuloCalculator() {
  const [dividend, setDividend] = useState("");
  const [divisor, setDivisor] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseInt(dividend);
    const n = parseInt(divisor);
    if (!isNaN(a) && !isNaN(n) && n !== 0) {
      const mod = ((a % n) + n) % n;
      setResult(mod);
    }
  };

  const reset = () => {
    setDividend("");
    setDivisor("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Modulo Calculator – Find the Remainder of Division
          </h1>
          <p className="text-xl text-muted-foreground">
            Calculate the modulo or remainder of any division instantly with our free online modulo calculator. Essential for programming, number theory, and cryptography applications.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Dividend (a)</label>
              <Input
                type="number"
                placeholder="Enter dividend (e.g., 17)"
                value={dividend}
                onChange={(e) => setDividend(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Divisor (n)</label>
              <Input
                type="number"
                placeholder="Enter divisor (e.g., 5)"
                value={divisor}
                onChange={(e) => setDivisor(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md mt-4">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-2xl font-semibold">
                  {dividend} mod {divisor} = {result}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {dividend} = {Math.floor(parseInt(dividend) / parseInt(divisor))} × {divisor} + {result}
                </p>
              </div>
            )}
          </div>
        </div>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">How the Modulo Operation Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Enter Dividend</h3>
              <p className="text-sm text-muted-foreground">Input the number to be divided (the dividend).</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Enter Divisor</h3>
              <p className="text-sm text-muted-foreground">Specify the number to divide by (the divisor or modulus).</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">Get Remainder</h3>
              <p className="text-sm text-muted-foreground">See the remainder when dividend is divided by divisor.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Modulo Calculator?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Programming Applications</h3>
              <p className="text-sm text-muted-foreground">Essential for cyclic operations, array indexing, hash functions, and cryptography algorithms.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Negative Number Support</h3>
              <p className="text-sm text-muted-foreground">Handles negative dividends correctly using mathematical modulo (not truncated division).</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Number Theory</h3>
              <p className="text-sm text-muted-foreground">Useful for modular arithmetic, congruence relations, and divisibility testing.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-sm text-muted-foreground">Get modulo results immediately with step-by-step breakdown.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Modulo Operation Formula</h2>
          <div className="p-5 bg-muted rounded-lg mb-6">
            <p className="text-lg font-semibold mb-3">a mod n = r</p>
            <p className="text-sm text-muted-foreground mb-4">
              Where: a = dividend, n = divisor (modulus), r = remainder
            </p>
            <p className="text-sm text-muted-foreground">
              The modulo operation finds the remainder r when a is divided by n, where 0 ≤ r &lt; |n|
            </p>
          </div>
          <div className="p-5 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Examples</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>17 mod 5 = 2 (because 17 = 3 × 5 + 2)</li>
              <li>10 mod 3 = 1 (because 10 = 3 × 3 + 1)</li>
              <li>15 mod 4 = 3 (because 15 = 3 × 4 + 3)</li>
              <li>-7 mod 3 = 2 (because -7 = -3 × 3 + 2)</li>
              <li>20 mod 20 = 0 (because 20 = 1 × 20 + 0)</li>
            </ul>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Modular Arithmetic Properties</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Addition</h3>
              <p className="text-sm text-muted-foreground mb-2">(a + b) mod n = [(a mod n) + (b mod n)] mod n</p>
              <p className="text-xs text-muted-foreground">Example: (17 + 23) mod 5 = (2 + 3) mod 5 = 0</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Subtraction</h3>
              <p className="text-sm text-muted-foreground mb-2">(a - b) mod n = [(a mod n) - (b mod n)] mod n</p>
              <p className="text-xs text-muted-foreground">Example: (17 - 8) mod 5 = (2 - 3) mod 5 = 4</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Multiplication</h3>
              <p className="text-sm text-muted-foreground mb-2">(a × b) mod n = [(a mod n) × (b mod n)] mod n</p>
              <p className="text-xs text-muted-foreground">Example: (17 × 3) mod 5 = (2 × 3) mod 5 = 1</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Exponentiation</h3>
              <p className="text-sm text-muted-foreground mb-2">aᵇ mod n = [(a mod n)ᵇ] mod n</p>
              <p className="text-xs text-muted-foreground">Example: 17² mod 5 = 2² mod 5 = 4</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is the modulo operation?</h3>
              <p className="text-sm text-muted-foreground">The modulo operation finds the remainder when one number is divided by another. For example, 17 mod 5 = 2 because 17 ÷ 5 = 3 remainder 2.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How is modulo different from remainder?</h3>
              <p className="text-sm text-muted-foreground">In mathematics, modulo always returns a non-negative result. For negative numbers, programming languages may differ: some return negative remainders, but mathematical modulo is always positive.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What are common uses of modulo?</h3>
              <p className="text-sm text-muted-foreground">Modulo is used for: checking if a number is even (n mod 2), cycling through array indices, implementing hash tables, cryptography (RSA algorithm), and determining leap years.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Can the divisor be negative?</h3>
              <p className="text-sm text-muted-foreground">Yes, but the result follows the sign convention of the mathematical modulo operation. This calculator handles negative divisors correctly.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What does "congruent modulo n" mean?</h3>
              <p className="text-sm text-muted-foreground">Two numbers are congruent modulo n if they have the same remainder when divided by n. Written as a ≡ b (mod n), it means a mod n = b mod n.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Related Math Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/math-tools/factor-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Factor Calculator</h3>
              <p className="text-sm text-muted-foreground">Find all factors of any integer instantly.</p>
            </a>
            <a href="/math-tools/prime-factorization-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Prime Factorization</h3>
              <p className="text-sm text-muted-foreground">Break down numbers into prime factors.</p>
            </a>
            <a href="/math-tools/gcd-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">GCD Calculator</h3>
              <p className="text-sm text-muted-foreground">Find the greatest common divisor of numbers.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
