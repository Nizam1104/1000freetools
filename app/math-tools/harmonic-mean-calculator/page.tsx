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
        <h2 className="text-2xl font-semibold">What is Harmonic Mean?</h2>
        <p className="text-muted-foreground">
          The harmonic mean is a type of average calculated by dividing the count of numbers by the sum of their reciprocals. It's particularly useful for averaging rates, ratios, and situations involving inverse relationships.
        </p>
        <p className="text-muted-foreground">
          Among the three Pythagorean means (arithmetic, geometric, harmonic), the harmonic mean always gives the smallest value (unless all numbers are equal). It's especially appropriate when dealing with rates like speed, work rates, or price-earnings ratios.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Harmonic Mean Formula</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
            HM = n / (1/x₁ + 1/x₂ + ... + 1/xₙ)
          </code>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">HM</p>
              <p className="text-xs text-muted-foreground">Harmonic mean</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">n</p>
              <p className="text-xs text-muted-foreground">Count of numbers</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">1/x</p>
              <p className="text-xs text-muted-foreground">Reciprocal of each value</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">When to Use Harmonic Mean</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Average Speed</h3>
            <p className="text-sm text-muted-foreground">
              When traveling equal distances at different speeds, use harmonic mean. For example, driving 60 mph one way and 40 mph back gives an average of 48 mph (not 50 mph).
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Work Rates</h3>
            <p className="text-sm text-muted-foreground">
              When combining work rates (tasks per hour), harmonic mean gives the correct average. If one worker takes 4 hours and another takes 6 hours, their combined rate uses harmonic mean.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Price-Earnings Ratio</h3>
            <p className="text-sm text-muted-foreground">
              In finance, when averaging P/E ratios across a portfolio, harmonic mean prevents high P/E stocks from skewing the average upward.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Electrical Resistance</h3>
            <p className="text-sm text-muted-foreground">
              For parallel resistors, the equivalent resistance follows the harmonic mean pattern. Two 10Ω resistors in parallel give 5Ω total.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Real-World Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Average Speed Example</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Drive 120 miles at 60 mph, return 120 miles at 40 mph
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              HM = 2 / (1/60 + 1/40)<br />
              HM = 2 / (0.0167 + 0.025)<br />
              HM = 2 / 0.0417 = 48 mph<br />
              <br />
              Verify: Total distance = 240 mi<br />
              Total time = 2 + 3 = 5 hours<br />
              Average = 240/5 = 48 mph ✓
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Parallel Resistors</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Three resistors in parallel: 6Ω, 12Ω, 4Ω
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              1/R = 1/6 + 1/12 + 1/4<br />
              1/R = 0.167 + 0.083 + 0.25 = 0.5<br />
              R = 2Ω (equivalent resistance)
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Work Rate Problem</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Pipe A fills tank in 3 hours, Pipe B in 5 hours
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Combined rate = 1/3 + 1/5 = 8/15 tank/hour<br />
              Time together = 15/8 = 1.875 hours<br />
              (Harmonic mean of 3 and 5 divided by 2)
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why can't harmonic mean handle zero?</h3>
            <p className="text-sm text-muted-foreground">
              The harmonic mean uses reciprocals (1/x). Division by zero is undefined, so any zero value makes the calculation impossible.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">When is harmonic mean better than arithmetic mean?</h3>
            <p className="text-sm text-muted-foreground">
              Use harmonic mean for rates and ratios (speed, work rates, P/E ratios). Use arithmetic mean for simple averages of quantities (test scores, temperatures, heights).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the relationship between the three means?</h3>
            <p className="text-sm text-muted-foreground">
              For any dataset: Harmonic Mean ≤ Geometric Mean ≤ Arithmetic Mean. They're equal only when all values in the dataset are identical.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can harmonic mean handle negative numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but interpretation becomes tricky. Negative rates are uncommon in practice. The formula works mathematically, but results may not be meaningful.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/average-mean-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Arithmetic Mean</p>
            <p className="text-xs text-muted-foreground">Simple average</p>
          </a>
          <a href="/math-tools/geometric-mean-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Geometric Mean</p>
            <p className="text-xs text-muted-foreground">Multiplicative average</p>
          </a>
          <a href="/math-tools/mean-median-mode-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Mean, Median, Mode</p>
            <p className="text-xs text-muted-foreground">Central tendency</p>
          </a>
        </div>
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
