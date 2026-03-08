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

    </div>
  );
}
