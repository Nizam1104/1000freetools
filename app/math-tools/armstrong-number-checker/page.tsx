"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ArmstrongNumberChecker() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    isArmstrong: boolean;
    digits: number[];
    numDigits: number;
    calculation: string;
    sum: number;
  } | null>(null);
  const [error, setError] = useState("");

  const checkArmstrong = (num: number) => {
    const digits = String(num).split("").map(Number);
    const numDigits = digits.length;
    
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, numDigits), 0);
    
    const calculation = digits
      .map((d, i) => `${d}^${numDigits}${i < digits.length - 1 ? " + " : ""}`)
      .join("");

    return {
      digits,
      numDigits,
      calculation,
      sum,
      isArmstrong: sum === num,
    };
  };

  const calculate = () => {
    const num = parseInt(number);

    if (isNaN(num) || num < 0) {
      setError("Please enter a non-negative integer");
      setResult(null);
      return;
    }

    if (num > 1000000000) {
      setError("Please enter a number up to 1,000,000,000 for performance reasons");
      setResult(null);
      return;
    }

    setError("");
    const armstrongResult = checkArmstrong(num);
    setResult(armstrongResult);
  };

  const reset = () => {
    setNumber("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Armstrong Number Checker – Verify Narcissistic Numbers</h1>
        <p className="text-muted-foreground">
          Check if any number is an Armstrong or narcissistic number with our free online tool. Instantly verify whether the sum of each digit raised to the number of digits equals the original number.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number</Label>
          <Input
            type="number"
            placeholder="Enter a non-negative integer (e.g., 153)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Check Armstrong</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg text-center ${result.isArmstrong ? "bg-green-500/10 border border-green-500/30" : "bg-muted"}`}>
              <p className={`text-5xl font-bold mb-2 ${result.isArmstrong ? "text-green-600" : ""}`}>
                {result.isArmstrong ? "Armstrong Number" : "Not Armstrong"}
              </p>
              <p className="text-sm text-muted-foreground">
                {result.numDigits}-digit number
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">Calculation</p>
              <p className="text-sm font-mono">
                {result.calculation} = {result.sum}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {result.sum} {result.isArmstrong ? "=" : "≠"} {number}
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">Breakdown</p>
              <div className="flex flex-wrap gap-2">
                {result.digits.map((digit, idx) => (
                  <div key={idx} className="px-3 py-2 bg-background rounded border text-center">
                    <p className="text-xs text-muted-foreground">Digit {idx + 1}</p>
                    <p className="font-semibold">{digit}^{result.numDigits} = {Math.pow(digit, result.numDigits)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
