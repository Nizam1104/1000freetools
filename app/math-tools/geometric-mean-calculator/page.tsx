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
        <h2 className="text-2xl font-semibold">What is Geometric Mean?</h2>
        <p className="text-muted-foreground">
          The geometric mean is a type of average that uses the product of values rather than their sum. It's calculated by multiplying all numbers together and then taking the nth root, where n is the count of numbers.
        </p>
        <p className="text-muted-foreground">
          Unlike the arithmetic mean, the geometric mean is appropriate for data that grows multiplicatively, such as investment returns, population growth, and ratios. It always gives a value less than or equal to the arithmetic mean (unless all values are equal).
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Geometric Mean Formula</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
            GM = ⁿ√(x₁ × x₂ × ... × xₙ) = (x₁ × x₂ × ... × xₙ)^(1/n)
          </code>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">GM</p>
              <p className="text-xs text-muted-foreground">Geometric mean</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">n</p>
              <p className="text-xs text-muted-foreground">Count of numbers</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">x₁, x₂, ...</p>
              <p className="text-xs text-muted-foreground">Individual values</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">When to Use Geometric Mean</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Investment Returns</h3>
            <p className="text-sm text-muted-foreground">
              For calculating average rate of return over multiple periods. If an investment grows 10%, then 20%, then loses 5%, the geometric mean gives the true average growth rate.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Population Growth</h3>
            <p className="text-sm text-muted-foreground">
              When measuring growth rates that compound over time, such as bacterial growth, population increase, or viral spread.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Aspect Ratios</h3>
            <p className="text-sm text-muted-foreground">
              In video and film, geometric mean is used to find compromise aspect ratios between different formats.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Normalized Scores</h3>
            <p className="text-sm text-muted-foreground">
              When combining scores from different scales or indices, geometric mean prevents high-scale items from dominating.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Real-World Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Investment Growth Rate</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Annual returns: +10%, +20%, -5%, +15%
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Growth factors: 1.10, 1.20, 0.95, 1.15<br />
              GM = ⁴√(1.10 × 1.20 × 0.95 × 1.15)<br />
              GM = ⁴√1.4421 = 1.0956<br />
              Average return = 9.56% per year
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Camera Aperture Stops</h3>
            <p className="text-sm text-muted-foreground mb-2">
              f-stop sequence uses geometric progression
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              f/1.4, f/2, f/2.8, f/4, f/5.6, f/8<br />
              Each stop = √2 ≈ 1.414× the previous<br />
              This creates equal light ratio steps
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why can't geometric mean handle negative numbers?</h3>
            <p className="text-sm text-muted-foreground">
              The geometric mean involves taking roots of products. With negative numbers, you could end up trying to take even roots of negative products, which gives complex (imaginary) results.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Geometric mean vs arithmetic mean?</h3>
            <p className="text-sm text-muted-foreground">
              Geometric mean is always ≤ arithmetic mean (AM-GM inequality). Use geometric for multiplicative data (growth rates), arithmetic for additive data (test scores, temperatures).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What if one value is zero?</h3>
            <p className="text-sm text-muted-foreground">
              If any value is zero, the geometric mean is zero (since the product becomes zero). This reflects that zero growth in any period means no overall growth.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How is geometric mean used in finance?</h3>
            <p className="text-sm text-muted-foreground">
              It calculates the compound annual growth rate (CAGR). For investment returns over multiple periods, geometric mean gives the equivalent constant rate that would produce the same final value.
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
          <a href="/math-tools/harmonic-mean-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Harmonic Mean</p>
            <p className="text-xs text-muted-foreground">Average of rates</p>
          </a>
          <a href="/math-tools/weighted-average-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Weighted Average</p>
            <p className="text-xs text-muted-foreground">Weighted mean</p>
          </a>
        </div>
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
