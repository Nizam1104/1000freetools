"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ExponentCalculator() {
  const [base, setBase] = useState("");
  const [exponent, setExponent] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const b = parseFloat(base);
    const e = parseFloat(exponent);
    if (!isNaN(b) && !isNaN(e)) {
      setResult(Math.pow(b, e));
    }
  };

  const reset = () => {
    setBase("");
    setExponent("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Exponent Calculator – Calculate Base to the Power of n
          </h1>
          <p className="text-xl text-muted-foreground">
            Easily calculate any number raised to a power with our free exponent calculator. Supports positive, negative, and fractional exponents for fast and accurate results.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Base (b)</label>
              <Input
                type="number"
                placeholder="Enter base number (e.g., 2)"
                step="any"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Exponent (n)</label>
              <Input
                type="number"
                placeholder="Enter exponent/power (e.g., 3)"
                step="any"
                value={exponent}
                onChange={(e) => setExponent(e.target.value)}
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
                  {base}<sup>{exponent}</sup> = {result}
                </p>
              </div>
            )}
          </div>
        </div>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Exponents</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Enter the Base</h3>
              <p className="text-sm text-muted-foreground">Input the base number that will be multiplied by itself.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Enter the Exponent</h3>
              <p className="text-sm text-muted-foreground">Specify the power to raise the base to (how many times to multiply).</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">Get the Result</h3>
              <p className="text-sm text-muted-foreground">Instantly see the calculated value of base raised to the exponent power.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Exponent Calculator?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Handle Any Exponent</h3>
              <p className="text-sm text-muted-foreground">Calculate positive, negative, and decimal exponents with precision.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-sm text-muted-foreground">Get exponentiation results immediately without manual calculation.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Large Number Support</h3>
              <p className="text-sm text-muted-foreground">Handle very large results that would be tedious to calculate by hand.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Educational Tool</h3>
              <p className="text-sm text-muted-foreground">Perfect for students learning about powers and exponential notation.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Exponent Rules Reference</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Basic Rules</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><code className="bg-background px-2 py-1 rounded">bⁿ = b × b × ... × b</code> (n times)</li>
                <li><code className="bg-background px-2 py-1 rounded">b⁰ = 1</code> (any non-zero base)</li>
                <li><code className="bg-background px-2 py-1 rounded">b¹ = b</code></li>
                <li><code className="bg-background px-2 py-1 rounded">b⁻ⁿ = 1/bⁿ</code></li>
              </ul>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Operation Rules</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><code className="bg-background px-2 py-1 rounded">bᵐ × bⁿ = bᵐ⁺ⁿ</code></li>
                <li><code className="bg-background px-2 py-1 rounded">bᵐ ÷ bⁿ = bᵐ⁻ⁿ</code></li>
                <li><code className="bg-background px-2 py-1 rounded">(bᵐ)ⁿ = bᵐˣⁿ</code></li>
                <li><code className="bg-background px-2 py-1 rounded">(ab)ⁿ = aⁿbⁿ</code></li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-5 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Examples</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>2³ = 2 × 2 × 2 = 8</li>
              <li>5² = 5 × 5 = 25</li>
              <li>10⁰ = 1</li>
              <li>2⁻³ = 1/2³ = 1/8 = 0.125</li>
            </ul>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is an exponent?</h3>
              <p className="text-sm text-muted-foreground">An exponent indicates how many times a number (the base) is multiplied by itself. For example, 2³ means 2 × 2 × 2 = 8.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What happens when the exponent is 0?</h3>
              <p className="text-sm text-muted-foreground">Any non-zero number raised to the power of 0 equals 1. This is because b⁰ = bⁿ ÷ bⁿ = 1 for any non-zero b.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How do negative exponents work?</h3>
              <p className="text-sm text-muted-foreground">A negative exponent means taking the reciprocal: b⁻ⁿ = 1/bⁿ. For example, 2⁻³ = 1/2³ = 1/8.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Can exponents be decimals?</h3>
              <p className="text-sm text-muted-foreground">Yes, decimal exponents represent roots combined with powers. For example, x⁰·⁵ = √x (square root) and x¹·⁵ = x × √x.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is the difference between power and exponent?</h3>
              <p className="text-sm text-muted-foreground">The exponent is the small number indicating the power. The power is the result of the operation. In 2³ = 8, 3 is the exponent, and 8 is the power.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Related Math Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/math-tools/logarithm-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Logarithm Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate logarithms, the inverse operation of exponentiation.</p>
            </a>
            <a href="/math-tools/square-root-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Square Root Calculator</h3>
              <p className="text-sm text-muted-foreground">Find the square root of any number instantly.</p>
            </a>
            <a href="/math-tools/factorial-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Factorial Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate factorials (n!) for combinatorics and probability.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
