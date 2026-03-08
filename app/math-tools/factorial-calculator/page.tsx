"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FactorialCalculator() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    factorial: bigint;
    displayValue: string;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculateFactorial = () => {
    const num = parseInt(number);

    if (isNaN(num) || num < 0) {
      setError("Please enter a non-negative integer");
      setResult(null);
      return;
    }

    if (num > 170) {
      setError("Please enter a number up to 170 for display purposes");
      setResult(null);
      return;
    }

    setError("");

    const steps: string[] = [];
    let factorial = BigInt(1);

    if (num === 0 || num === 1) {
      steps.push(`${num}! = 1 (by definition)`);
    } else {
      const stepParts: string[] = [];
      for (let i = num; i >= 1; i--) {
        factorial *= BigInt(i);
        stepParts.push(i.toString());
      }
      steps.push(`${num}! = ${stepParts.join(" × ")}`);
      steps.push(`${num}! = ${factorial.toLocaleString()}`);
    }

    setResult({
      factorial,
      displayValue: num <= 20 ? factorial.toString() : factorial.toString().replace(/(\d{4})/g, "$1 ").trim(),
      steps,
    });
  };

  const reset = () => {
    setNumber("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Factorial Calculator – Compute n! Instantly Online</h1>
        <p className="text-muted-foreground">
          Calculate the factorial of any non-negative integer instantly with our free online factorial calculator. Supports large factorials with exact results.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number (n)</Label>
          <Input
            type="number"
            placeholder="Enter a non-negative integer (e.g., 5)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            min="0"
            max="170"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateFactorial}>Calculate Factorial</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">{number}! (Factorial of {number})</p>
              <p className="text-4xl font-bold break-all">{result.displayValue}</p>
              {parseInt(number) > 20 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Full value: {result.factorial.toString()}
                </p>
              )}
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Calculation Steps</h4>
              <div className="space-y-2">
                {result.steps.map((step, index) => (
                  <code key={index} className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                    {step}
                  </code>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
