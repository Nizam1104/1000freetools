"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function GeometricMeanCalculator() {
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

    if (numbers.some((n) => n <= 0)) {
      setError("All numbers must be positive for geometric mean");
      return;
    }

    const n = numbers.length;
    const product = numbers.reduce((acc, num) => acc * num, 1);
    const geometricMean = Math.pow(product, 1 / n);

    const productStr = numbers.join(" × ");
    const logSum = numbers.reduce((acc, num) => acc + Math.log(num), 0);

    const calculationSteps = [
      "Formula: Geometric Mean = ⁿ√(x₁ × x₂ × ... × xₙ)",
      "",
      `Step 1: Count of numbers (n) = ${n}`,
      "",
      "Step 2: Calculate the product:",
      `  ${productStr} = ${product.toExponential(6)}`,
      "",
      "Step 3: Take the nth root:",
      `  ${n}√${product.toExponential(4)} = ${geometricMean.toFixed(6)}`,
      "",
      "Alternative method using logarithms:",
      `  ln(GM) = (ln(x₁) + ln(x₂) + ... + ln(xₙ)) / n`,
      `  ln(GM) = ${logSum.toFixed(6)} / ${n} = ${(logSum / n).toFixed(6)}`,
      `  GM = e^${(logSum / n).toFixed(6)} = ${geometricMean.toFixed(6)}`,
    ];

    setResult(geometricMean);
    setSteps(calculationSteps);
  };

  const reset = () => {
    setInput("");
    setResult(null);
    setSteps([]);
    setError("");
  };

  const loadExample = () => {
    setInput("2, 8, 4, 16");
    setResult(null);
    setSteps([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Geometric Mean Calculator – Find Geometric Average Online</h1>
        <p className="text-muted-foreground">
          Calculate the geometric mean of any set of numbers with our free online calculator. Ideal for finance, biology, and statistics where multiplicative relationships matter.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Enter Numbers</Label>
          <Textarea
            placeholder="Enter numbers separated by commas, spaces, or newlines (e.g., 2, 8, 4, 16)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
          />
          <p className="text-xs text-muted-foreground mt-1">
            All numbers must be positive. Separate with commas, spaces, or newlines.
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Geometric Mean</Button>
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
              <p className="text-sm text-muted-foreground mb-2">Geometric Mean</p>
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
              <h4 className="font-semibold text-sm mb-2">Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Numbers entered:</span>
                  <span className="ml-2 font-semibold">{input.split(/[,\s\n]+/).filter((s) => s.trim() !== "").length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Product:</span>
                  <span className="ml-2 font-semibold">
                    {numbersProduct(input).toExponential(4)}
                  </span>
                </div>
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

function numbersProduct(input: string): number {
  const numbers = input
    .split(/[,\s\n]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => parseFloat(s))
    .filter((n) => !isNaN(n));
  return numbers.reduce((acc, num) => acc * num, 1);
}
