"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DivisibilityChecker() {
  const [number, setNumber] = useState("");
  const [divisor, setDivisor] = useState("");
  const [result, setResult] = useState<{
    isDivisible: boolean;
    quotient: number;
    remainder: number;
    rule?: string;
  } | null>(null);
  const [error, setError] = useState("");

  const getDivisibilityRule = (d: number): string => {
    const rules: Record<number, string> = {
      2: "Last digit is even (0, 2, 4, 6, 8)",
      3: "Sum of digits is divisible by 3",
      4: "Last two digits form a number divisible by 4",
      5: "Last digit is 0 or 5",
      6: "Divisible by both 2 and 3",
      7: "Double the last digit, subtract from the rest. Result divisible by 7",
      8: "Last three digits form a number divisible by 8",
      9: "Sum of digits is divisible by 9",
      10: "Last digit is 0",
      11: "Alternating sum of digits is divisible by 11",
    };
    return rules[d] || `No simple rule for ${d} – perform the division`;
  };

  const checkDivisibility = () => {
    const num = parseInt(number);
    const div = parseInt(divisor);

    if (isNaN(num) || isNaN(div)) {
      setError("Please enter valid integers");
      setResult(null);
      return;
    }

    if (div === 0) {
      setError("Division by zero is undefined");
      setResult(null);
      return;
    }

    if (num < 0 || div < 0) {
      setError("Please enter positive integers");
      setResult(null);
      return;
    }

    setError("");
    const isDivisible = num % div === 0;
    const quotient = Math.floor(num / div);
    const remainder = num % div;

    setResult({
      isDivisible,
      quotient,
      remainder,
      rule: div <= 11 ? getDivisibilityRule(div) : undefined,
    });
  };

  const reset = () => {
    setNumber("");
    setDivisor("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Divisibility Checker – Test Divisibility Rules Instantly</h1>
        <p className="text-muted-foreground">
          Check if any number is divisible by another with our free online divisibility checker. Displays the relevant divisibility rule and provides instant yes or no results.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Number to Test</Label>
            <Input
              type="number"
              placeholder="e.g., 144"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div>
            <Label>Divisor</Label>
            <Input
              type="number"
              placeholder="e.g., 12"
              value={divisor}
              onChange={(e) => setDivisor(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={checkDivisibility}>Check Divisibility</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg text-center ${result.isDivisible ? "bg-green-500/10 border border-green-500/30" : "bg-muted"}`}>
              <p className={`text-5xl font-bold mb-2 ${result.isDivisible ? "text-green-600" : ""}`}>
                {result.isDivisible ? "Yes, Divisible" : "Not Divisible"}
              </p>
              <p className="text-sm text-muted-foreground">
                {number} ÷ {divisor} = {result.quotient} remainder {result.remainder}
              </p>
            </div>

            {result.rule && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-semibold mb-2">Divisibility Rule for {divisor}</p>
                <p className="text-sm text-muted-foreground">{result.rule}</p>
              </div>
            )}

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">Verification</p>
              <p className="text-sm font-mono">
                {number} = {divisor} × {result.quotient} + {result.remainder}
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Divisibility Rules</h2>
        <p className="text-muted-foreground">
          Quick tricks to test if a number is divisible without doing the full division. These work because of patterns in our base-10 number system.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Divisible by 2</h3>
            <p className="text-sm text-muted-foreground mb-2">Last digit is even (0, 2, 4, 6, 8)</p>
            <p className="text-xs font-mono">348 → ends in 8 → divisible by 2</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Divisible by 3</h3>
            <p className="text-sm text-muted-foreground mb-2">Sum of digits is divisible by 3</p>
            <p className="text-xs font-mono">348 → 3+4+8=15 → 15÷3=5 → divisible by 3</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Divisible by 4</h3>
            <p className="text-sm text-muted-foreground mb-2">Last two digits form a number divisible by 4</p>
            <p className="text-xs font-mono">1,348 → 48÷4=12 → divisible by 4</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Divisible by 5</h3>
            <p className="text-sm text-muted-foreground mb-2">Last digit is 0 or 5</p>
            <p className="text-xs font-mono">275 → ends in 5 → divisible by 5</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Divisible by 6</h3>
            <p className="text-sm text-muted-foreground mb-2">Divisible by both 2 and 3</p>
            <p className="text-xs font-mono">348 → even AND sum=15 (÷3) → divisible by 6</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Divisible by 9</h3>
            <p className="text-sm text-muted-foreground mb-2">Sum of digits is divisible by 9</p>
            <p className="text-xs font-mono">729 → 7+2+9=18 → 18÷9=2 → divisible by 9</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Divisible by 10</h3>
            <p className="text-sm text-muted-foreground mb-2">Last digit is 0</p>
            <p className="text-xs font-mono">1,230 → ends in 0 → divisible by 10</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Divisible by 11</h3>
            <p className="text-sm text-muted-foreground mb-2">Alternating sum of digits is divisible by 11</p>
            <p className="text-xs font-mono">1,353 → 1-3+5-3=0 → divisible by 11</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Examples</h2>
        <div className="space-y-3">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="font-semibold text-sm mb-1">144 ÷ 12 = 12 (remainder 0)</p>
            <p className="text-sm text-muted-foreground">144 is divisible by 12. Also divisible by 2, 3, 4, 6, 8, 9, 16, 18, 24, 36, 48, 72.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">100 ÷ 7 = 14 (remainder 2)</p>
            <p className="text-sm text-muted-foreground">100 is not divisible by 7. Rule: 10 - 2×0 = 10, not divisible by 7.</p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="font-semibold text-sm mb-1">1,000 ÷ 8 = 125 (remainder 0)</p>
            <p className="text-sm text-muted-foreground">1,000 is divisible by 8. Rule: last three digits (000) form 0, which is divisible by 8.</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What does divisible mean?</h3>
          <p className="text-sm text-muted-foreground">
            A number is divisible by another if the division gives a whole number with no remainder. For example, 15 is divisible by 3 because 15 ÷ 3 = 5 exactly.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Why learn divisibility rules?</h3>
          <p className="text-sm text-muted-foreground">
            They let you quickly test divisibility without a calculator. Useful for simplifying fractions, factoring, and checking your work.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Is 0 divisible by any number?</h3>
          <p className="text-sm text-muted-foreground">
            Yes, 0 is divisible by every non-zero integer. 0 ÷ n = 0 for any n ≠ 0. But you cannot divide by 0 – that's undefined.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's the rule for 7?</h3>
          <p className="text-sm text-muted-foreground">
            Take the last digit, double it, and subtract from the rest of the number. If the result is divisible by 7, so is the original. For 161: 16 - 2×1 = 14, which is divisible by 7.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/factors-list-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Factors List Generator</p>
            <p className="text-xs text-muted-foreground">Find all factors</p>
          </a>
          <a href="/math-tools/prime-factorization-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Prime Factorization</p>
            <p className="text-xs text-muted-foreground">Break into primes</p>
          </a>
          <a href="/math-tools/gcd-hcf-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">GCD Calculator</p>
            <p className="text-xs text-muted-foreground">Greatest common divisor</p>
          </a>
        </div>
      </section>
    </div>
  );
}
