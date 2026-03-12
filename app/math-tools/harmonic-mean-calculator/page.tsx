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

  const loadExample = (data: string) => {
    setInput(data);
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate Harmonic Mean</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("4, 8, 16")}>4, 8, 16</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("60, 40")}>Speeds: 60, 40</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2, 3, 4, 5, 6")}>2, 3, 4, 5, 6</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10, 20, 30, 40")}>10, 20, 30, 40</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("0.5, 1, 2, 4")}>0.5, 1, 2, 4</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100, 200, 300")}>100, 200, 300</Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Harmonic Mean</h2>
        <p className="text-muted-foreground">
          The harmonic mean is a type of average especially useful for rates and ratios. While the arithmetic mean adds values and divides by the count, the harmonic mean uses reciprocals – it's the reciprocal of the arithmetic mean of the reciprocals.
        </p>
        <p className="text-muted-foreground">
          Use harmonic mean when averaging rates like speed, work rates, or prices per unit. For example, if you drive 60 mph one way and 40 mph back, your average speed isn't 50 mph – it's the harmonic mean: 48 mph. This is because you spend more time at the slower speed.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Calculate Harmonic Mean</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Find reciprocals</p>
                <p className="text-muted-foreground">
                  Take 1 divided by each number. For 4, 8, 16: reciprocals are 1/4, 1/8, 1/16.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Add the reciprocals</p>
                <p className="text-muted-foreground">
                  Sum all the reciprocal values.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Divide count by the sum</p>
                <p className="text-muted-foreground">
                  HM = n / (sum of reciprocals). This gives the harmonic mean.
                </p>
              </div>
            </li>
          </ol>
          <div className="mt-4 p-3 bg-background rounded">
            <p className="font-mono text-sm">HM = n / (1/x₁ + 1/x₂ + ... + 1/xₙ)</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Harmonic Mean of 4, 8, 16</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Reciprocals: 1/4 = 0.25, 1/8 = 0.125, 1/16 = 0.0625</div>
              <div>Sum of reciprocals: 0.25 + 0.125 + 0.0625 = 0.4375</div>
              <div>n = 3</div>
              <div>HM = 3 / 0.4375 = 6.857</div>
              <div className="text-muted-foreground mt-2">Compare: AM = 9.33, GM = 8</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Average Speed Problem</h4>
            <div className="text-sm space-y-2">
              <p>Drive 120 miles at 60 mph, return 120 miles at 40 mph. What's the average speed?</p>
              <div className="font-mono">Total distance: 240 miles</div>
              <div className="font-mono">Time out: 120/60 = 2 hours</div>
              <div className="font-mono">Time back: 120/40 = 3 hours</div>
              <div className="font-mono">Total time: 5 hours</div>
              <div className="font-mono">Average speed: 240/5 = 48 mph</div>
              <div className="font-mono mt-2">Using harmonic mean: HM = 2/(1/60 + 1/40) = 2/(0.0167 + 0.025) = 48 mph ✓</div>
              <p className="text-muted-foreground mt-2">NOT (60+40)/2 = 50! You spend more time at the slower speed.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Two Numbers Formula</h4>
            <div className="font-mono text-sm space-y-2">
              <div>For two numbers a and b:</div>
              <div>HM = 2ab / (a + b)</div>
              <div className="mt-2">Example: a = 6, b = 12</div>
              <div>HM = 2×6×12 / (6+12) = 144/18 = 8</div>
              <div className="text-muted-foreground mt-2">Verify: 2/(1/6 + 1/12) = 2/(0.167 + 0.083) = 8 ✓</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Work Rate Problem</h4>
            <div className="text-sm space-y-2">
              <p>Worker A completes a job in 6 hours. Worker B completes it in 4 hours. Working together?</p>
              <div className="font-mono">A's rate: 1/6 job per hour</div>
              <div className="font-mono">B's rate: 1/4 job per hour</div>
              <div className="font-mono">Combined rate: 1/6 + 1/4 = 5/12 job per hour</div>
              <div className="font-mono">Time together: 12/5 = 2.4 hours</div>
              <p className="text-muted-foreground mt-2">This uses the same reciprocal principle as harmonic mean.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            The harmonic mean was known to ancient Greek mathematicians and got its name from music theory. In a musical string, lengths in harmonic proportion (like 1, 2/3, 1/2) produce harmonious sounds. The Pythagoreans discovered these relationships around 500 BCE.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I use harmonic mean instead of arithmetic mean?</h4>
            <p className="text-sm text-muted-foreground">
              Use harmonic mean for rates and ratios – speeds, work rates, prices per unit, fuel efficiency. Use arithmetic mean for quantities that add together directly. If you're averaging "per something" values, consider harmonic mean.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why can't harmonic mean include zero?</h4>
            <p className="text-sm text-muted-foreground">
              The harmonic mean uses reciprocals (1/x). Division by zero is undefined. Also, if one rate is zero (like speed = 0), you'd never complete the journey, making the average meaningless.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the relationship between the three means?</h4>
            <p className="text-sm text-muted-foreground">
              For any positive numbers: Harmonic Mean ≤ Geometric Mean ≤ Arithmetic Mean. They're equal only when all values are identical. This is the HM-GM-AM inequality.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How does harmonic mean handle outliers?</h4>
            <p className="text-sm text-muted-foreground">
              Harmonic mean is pulled toward smaller values. A very large number has less effect than a very small number. This makes it useful when you want to penalize poor performance more than reward excellent performance.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can harmonic mean be used with negative numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Technically yes, but it's rarely meaningful. Rates and ratios are typically positive. If you have mixed positive and negative values, the harmonic mean might not give an interpretable result.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a real-world application?</h4>
            <p className="text-sm text-muted-foreground">
              The P/E ratio in finance often uses harmonic mean when averaging across companies. Fuel efficiency (mpg) should be averaged harmonically. In physics, parallel resistors combine like a harmonic mean.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
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
