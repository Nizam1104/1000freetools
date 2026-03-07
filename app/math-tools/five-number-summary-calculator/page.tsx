"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FiveNumberSummaryCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
    iqr: number;
    n: number;
  } | null>(null);
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
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n));

    if (numbers.length === 0) {
      setError("Please enter at least one number");
      return;
    }

    if (numbers.length < 4) {
      setError("Please enter at least 4 numbers for meaningful quartiles");
      return;
    }

    const sorted = [...numbers].sort((a, b) => a - b);
    const n = sorted.length;

    const min = sorted[0];
    const max = sorted[n - 1];
    const median = getMedian(sorted);
    const lowerHalf = sorted.slice(0, Math.floor(n / 2));
    const upperHalf = sorted.slice(Math.ceil(n / 2));
    const q1 = getMedian(lowerHalf);
    const q3 = getMedian(upperHalf);
    const iqr = q3 - q1;

    const calculationSteps = [
      "Step 1: Sort the data in ascending order",
      `  ${sorted.join(", ")}`,
      "",
      `Step 2: Count of numbers (n) = ${n}`,
      "",
      "Step 3: Find minimum and maximum",
      `  Min = ${min}`,
      `  Max = ${max}`,
      "",
      "Step 4: Find the median (Q2)",
      n % 2 === 1
        ? `  Position ${(n + 1) / 2} (middle value) = ${median}`
        : `  Average of positions ${n / 2} and ${n / 2 + 1}: (${sorted[n / 2 - 1]} + ${sorted[n / 2]}) / 2 = ${median}`,
      "",
      "Step 5: Find Q1 (median of lower half)",
      `  Lower half: ${lowerHalf.join(", ")}`,
      `  Q1 = ${q1}`,
      "",
      "Step 6: Find Q3 (median of upper half)",
      `  Upper half: ${upperHalf.join(", ")}`,
      `  Q3 = ${q3}`,
      "",
      "Step 7: Calculate Interquartile Range (IQR)",
      `  IQR = Q3 - Q1 = ${q3} - ${q1} = ${iqr}`,
    ];

    setResult({ min, q1, median, q3, max, iqr, n });
    setSteps(calculationSteps);
  };

  const reset = () => {
    setInput("");
    setResult(null);
    setSteps([]);
    setError("");
  };

  const loadExample = () => {
    setInput("12, 5, 8, 20, 15, 10, 25, 18, 30, 7");
    setResult(null);
    setSteps([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Five Number Summary Calculator – Min Q1 Median Q3 Max</h1>
        <p className="text-muted-foreground">
          Find the five-number summary of any dataset with our free online calculator. Instantly compute the minimum, Q1, median, Q3, and maximum for complete data analysis.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Enter Numbers</Label>
          <Textarea
            placeholder="Enter numbers separated by commas, spaces, or newlines"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter at least 4 numbers for meaningful quartile calculations.
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Five-Number Summary</Button>
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
            <div className="grid grid-cols-5 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Minimum</p>
                <p className="text-2xl font-bold">{result.min}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Q1 (25%)</p>
                <p className="text-2xl font-bold">{result.q1}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Median (Q2)</p>
                <p className="text-2xl font-bold">{result.median}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Q3 (75%)</p>
                <p className="text-2xl font-bold">{result.q3}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Maximum</p>
                <p className="text-2xl font-bold">{result.max}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Additional Statistics</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Count (n):</span>
                  <span className="ml-2 font-semibold">{result.n}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Range:</span>
                  <span className="ml-2 font-semibold">{result.max - result.min}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">IQR:</span>
                  <span className="ml-2 font-semibold">{result.iqr}</span>
                </div>
              </div>
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
              <h4 className="font-semibold text-sm mb-2">Visual Representation</h4>
              <div className="relative h-12 bg-border rounded">
                <div
                  className="absolute h-4 bg-primary/30 rounded"
                  style={{
                    left: `${((result.q1 - result.min) / (result.max - result.min || 1)) * 100}%`,
                    width: `${((result.iqr) / (result.max - result.min || 1)) * 100}%`,
                  }}
                />
                <div
                  className="absolute h-6 w-0.5 bg-primary"
                  style={{ left: `${((result.min - result.min) / (result.max - result.min || 1)) * 100}%` }}
                />
                <div
                  className="absolute h-8 w-0.5 bg-primary"
                  style={{ left: `${((result.q1 - result.min) / (result.max - result.min || 1)) * 100}%` }}
                />
                <div
                  className="absolute h-8 w-0.5 bg-primary"
                  style={{ left: `${((result.median - result.min) / (result.max - result.min || 1)) * 100}%` }}
                />
                <div
                  className="absolute h-8 w-0.5 bg-primary"
                  style={{ left: `${((result.q3 - result.min) / (result.max - result.min || 1)) * 100}%` }}
                />
                <div
                  className="absolute h-6 w-0.5 bg-primary"
                  style={{ left: `${((result.max - result.min) / (result.max - result.min || 1)) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{result.min}</span>
                <span>Q1: {result.q1}</span>
                <span>Med: {result.median}</span>
                <span>Q3: {result.q3}</span>
                <span>{result.max}</span>
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

function getMedian(sorted: number[]): number {
  const n = sorted.length;
  if (n === 0) return 0;
  if (n % 2 === 1) {
    return sorted[Math.floor(n / 2)];
  }
  return (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
}
