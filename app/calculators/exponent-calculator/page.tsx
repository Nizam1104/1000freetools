"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ExponentCalculator() {
  const [base, setBase] = useState<string>("");
  const [exponent, setExponent] = useState<string>("");
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
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Base (b)</label>
              <Input
                type="number"
                placeholder="e.g., 2"
                step="any"
                value={base}
                onChange={(e) => setBase(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Exponent (n)</label>
              <Input
                type="number"
                placeholder="e.g., 8"
                step="any"
                value={exponent}
                onChange={(e) => setExponent(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result ({base}<sup>{exponent}</sup>)</p>
                <p className="text-2xl font-semibold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Exponents</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
            <h3 className="font-semibold mb-2">Enter the Base</h3>
            <p className="text-sm text-muted-foreground">Input the base number that will be multiplied by itself.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
            <h3 className="font-semibold mb-2">Enter the Exponent</h3>
            <p className="text-sm text-muted-foreground">Specify the power to raise the base to (how many times to multiply).</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
            <h3 className="font-semibold mb-2">Get the Result</h3>
            <p className="text-sm text-muted-foreground">Instantly see the calculated value of base raised to the exponent power.</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Why Use This Exponent Calculator?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Handle Any Exponent
            </h3>
            <p className="text-sm text-muted-foreground">Calculate positive, negative, and decimal exponents with precision.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Instant Results
            </h3>
            <p className="text-sm text-muted-foreground">Get exponentiation results immediately without manual calculation.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Large Number Support
            </h3>
            <p className="text-sm text-muted-foreground">Handle very large results that would be tedious to calculate by hand.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Educational Tool
            </h3>
            <p className="text-sm text-muted-foreground">Perfect for students learning about powers and exponential notation.</p>
          </div>
        </div>

        <div className="mt-6 p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-3">Exponent Rules Reference</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-2">Basic Rules:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• bⁿ = b × b × ... × b (n times)</li>
                <li>• b⁰ = 1 (any non-zero base)</li>
                <li>• b¹ = b</li>
                <li>• b⁻ⁿ = 1/bⁿ</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Operation Rules:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• bᵐ × bⁿ = bᵐ⁺ⁿ</li>
                <li>• bᵐ ÷ bⁿ = bᵐ⁻ⁿ</li>
                <li>• (bᵐ)ⁿ = bᵐˣⁿ</li>
                <li>• (ab)ⁿ = aⁿbⁿ</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-card rounded">
            <p className="font-semibold mb-2">Examples:</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• 2³ = 2 × 2 × 2 = 8</li>
              <li>• 5² = 5 × 5 = 25</li>
              <li>• 10⁰ = 1</li>
              <li>• 2⁻³ = 1/2³ = 1/8 = 0.125</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions About Exponents</h2>
        <div className="space-y-4">
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is an exponent?</h3>
            <p className="text-sm text-muted-foreground">An exponent indicates how many times a number (the base) is multiplied by itself. For example, 2³ means 2 × 2 × 2 = 8.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What happens when the exponent is 0?</h3>
            <p className="text-sm text-muted-foreground">Any non-zero number raised to the power of 0 equals 1. This is because b⁰ = bⁿ ÷ bⁿ = 1 for any non-zero b.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How do negative exponents work?</h3>
            <p className="text-sm text-muted-foreground">A negative exponent means taking the reciprocal: b⁻ⁿ = 1/bⁿ. For example, 2⁻³ = 1/2³ = 1/8.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Can exponents be decimals?</h3>
            <p className="text-sm text-muted-foreground">Yes, decimal exponents represent roots combined with powers. For example, x⁰·⁵ = √x (square root) and x¹·⁵ = x × √x.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is the difference between power and exponent?</h3>
            <p className="text-sm text-muted-foreground">The exponent is the small number indicating the power. The power is the result of the operation. In 2³ = 8, 3 is the exponent, and 8 is the power.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
    </div>
  );
}
