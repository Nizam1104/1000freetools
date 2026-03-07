"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function HarmonicMeanCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);
    setSteps([]);

    const numbers = input
      .split(/[,\s\n]+/)
      .map((s) => s.trim())
      .filter((s) => s !== "")
      .map((s) => parseFloat(s));

    if (numbers.length === 0) {
      setError("Please enter at least one number");
      return;
    }

    if (numbers.some((n) => isNaN(n))) {
      setError("Please enter valid numbers only");
      return;
    }

    if (numbers.some((n) => n === 0)) {
      setError("Numbers cannot be zero for harmonic mean");
      return;
    }

    const n = numbers.length;
    const reciprocalSum = numbers.reduce((acc, num) => acc + 1 / num, 0);
    const harmonicMean = n / reciprocalSum;

    const reciprocalStr = numbers.map((num) => `1/${num}`).join(" + ");
    const reciprocals = numbers.map((num) => (1 / num).toFixed(6));

    const calculationSteps = [
      "Formula: Harmonic Mean = n / (1/x₁ + 1/x₂ + ... + 1/xₙ)",
      "",
      `Step 1: Count of numbers (n) = ${n}`,
      "",
      "Step 2: Find reciprocals of each number:",
      `  ${reciprocalStr}`,
      `  = ${reciprocals.join(" + ")}`,
      "",
      `Step 3: Sum of reciprocals = ${reciprocalSum.toFixed(6)}`,
      "",
      "Step 4: Calculate harmonic mean:",
      `  HM = ${n} / ${reciprocalSum.toFixed(6)} = ${harmonicMean.toFixed(6)}`,
    ];

    setResult(harmonicMean);
    setSteps(calculationSteps);
  };

  const reset = () => {
    setInput("");
    setResult(null);
    setSteps([]);
    setError("");
  };

  const loadExample = () => {
    setInput("4, 8, 16");
    setResult(null);
    setSteps([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Harmonic Mean Calculator – Find Harmonic Average Online</h1>
        <p className="text-muted-foreground">
          Calculate the harmonic mean of any dataset with our free online harmonic mean calculator. Ideal for rates and ratios where harmonic averaging is more appropriate.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Enter Numbers</Label>
          <Textarea
            placeholder="Enter numbers separated by commas, spaces, or newlines (e.g., 4, 8, 16)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Numbers cannot be zero. Separate with commas, spaces, or newlines.
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Harmonic Mean</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result !== null && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Harmonic Mean</p>
              <p className="text-4xl font-bold">{result.toFixed(6)}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Calculation Steps</h4>
              <div className="font-mono text-sm space-y-1 whitespace-pre-wrap">
                {steps.map((step, i) => (
                  <div key={i}>{step}</div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Comparison of Means</h4>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <p className="text-muted-foreground">Harmonic</p>
                  <p className="font-semibold text-lg">{result.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Geometric</p>
                  <p className="font-semibold text-lg">{calculateGeometric(input).toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Arithmetic</p>
                  <p className="font-semibold text-lg">{calculateArithmetic(input).toFixed(4)}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                HM ≤ GM ≤ AM (unless all values equal)
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}

function calculateGeometric(input: string): number {
  const numbers = input
    .split(/[,\s\n]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => parseFloat(s))
    .filter((n) => !isNaN(n) && n > 0);
  if (numbers.length === 0) return 0;
  const product = numbers.reduce((acc, num) => acc * num, 1);
  return Math.pow(product, 1 / numbers.length);
}

function calculateArithmetic(input: string): number {
  const numbers = input
    .split(/[,\s\n]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => parseFloat(s))
    .filter((n) => !isNaN(n));
  if (numbers.length === 0) return 0;
  return numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
}
