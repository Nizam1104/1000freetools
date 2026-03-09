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

  const loadExample = (data: string) => {
    setInput(data);
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate Geometric Mean</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2, 8, 4, 16")}>2, 8, 4, 16</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1, 3, 9, 27")}>1, 3, 9, 27</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("5, 10, 20, 40, 80")}>5, 10, 20, 40, 80</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100, 121, 144")}>100, 121, 144</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2, 3, 5, 7, 11")}>2, 3, 5, 7, 11</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("0.5, 1, 2, 4, 8")}>0.5, 1, 2, 4, 8</Button>
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
              <h4 className="font-semibold text-sm mb-2">Comparison of Means</h4>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <p className="text-muted-foreground">Harmonic</p>
                  <p className="font-semibold text-lg">{calculateHarmonic(input).toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Geometric</p>
                  <p className="font-semibold text-lg">{result.toFixed(4)}</p>
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
        <h2 className="text-2xl font-semibold">Understanding Geometric Mean</h2>
        <p className="text-muted-foreground">
          The geometric mean is a type of average that's especially useful when dealing with quantities that multiply together, like growth rates, investment returns, or ratios. Unlike the arithmetic mean (the usual average), the geometric mean uses multiplication and roots instead of addition and division.
        </p>
        <p className="text-muted-foreground">
          For two numbers, the geometric mean is the square root of their product. For three numbers, it's the cube root. For n numbers, it's the nth root of their product. This makes it perfect for averaging percentages, growth rates, and anything that compounds.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Calculate Geometric Mean</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Multiply all numbers together</p>
                <p className="text-muted-foreground">
                  Find the product of all values in your dataset.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Count the numbers</p>
                <p className="text-muted-foreground">
                  Determine n, the total count of values.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Take the nth root</p>
                <p className="text-muted-foreground">
                  Raise the product to the power of 1/n. This is the geometric mean.
                </p>
              </div>
            </li>
          </ol>
          <div className="mt-4 p-3 bg-background rounded">
            <p className="font-mono text-sm">GM = ⁿ√(x₁ × x₂ × ... × xₙ) = (x₁ × x₂ × ... × xₙ)^(1/n)</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Geometric Mean of 2, 8, 4, 16</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Product = 2 × 8 × 4 × 16 = 1024</div>
              <div>n = 4 numbers</div>
              <div>GM = ⁴√1024 = 1024^(1/4)</div>
              <div>GM = 5.657 (or exactly 4√2)</div>
              <div className="text-muted-foreground mt-2">Compare: Arithmetic mean = (2+8+4+16)/4 = 7.5</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Average Growth Rate</h4>
            <div className="text-sm space-y-2">
              <p>An investment grows: +20%, +30%, -10%, +15% over 4 years</p>
              <div className="font-mono">Growth factors: 1.20, 1.30, 0.90, 1.15</div>
              <div className="font-mono">Product = 1.20 × 1.30 × 0.90 × 1.15 = 1.6146</div>
              <div className="font-mono">GM = ⁴√1.6146 = 1.126</div>
              <div className="text-muted-foreground mt-2">Average annual return: 12.6%</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Geometric Mean of 1, 3, 9, 27</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Product = 1 × 3 × 9 × 27 = 729</div>
              <div>n = 4</div>
              <div>GM = ⁴√729 = 729^(1/4)</div>
              <div>GM = 5.20 (or exactly 3^(3/2) = 3√3)</div>
              <div className="text-muted-foreground mt-2">Note: These are powers of 3: 3⁰, 3¹, 3², 3³</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Two Numbers (4 and 9)</h4>
            <div className="font-mono text-sm space-y-2">
              <div>GM = √(4 × 9) = √36 = 6</div>
              <div className="text-muted-foreground mt-2">The geometric mean of 4 and 9 is exactly 6</div>
              <div className="text-muted-foreground">Arithmetic mean = (4+9)/2 = 6.5</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            The geometric mean was known to ancient Greek mathematicians. Euclid described it in his Elements as the "mean proportional." If you have a rectangle with sides a and b, a square with the same area has side length equal to the geometric mean of a and b.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I use geometric mean instead of arithmetic mean?</h4>
            <p className="text-sm text-muted-foreground">
              Use geometric mean for rates of change, growth rates, ratios, and percentages. Use arithmetic mean for quantities that add together. Investment returns, population growth, and inflation rates are better averaged with geometric mean.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why must all numbers be positive?</h4>
            <p className="text-sm text-muted-foreground">
              The geometric mean involves taking roots of products. With negative numbers, you might need to take even roots of negative values, which aren't real numbers. Also, geometric mean represents multiplicative relationships, which don't work with negatives.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the relationship between the three means?</h4>
            <p className="text-sm text-muted-foreground">
              For any set of positive numbers: Harmonic Mean ≤ Geometric Mean ≤ Arithmetic Mean. They're equal only when all values are identical. This is called the AM-GM-HM inequality.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate geometric mean for large datasets?</h4>
            <p className="text-sm text-muted-foreground">
              Use logarithms: GM = e^((ln(x₁) + ln(x₂) + ... + ln(xₙ))/n). This avoids overflow from multiplying many large numbers. Add the logs, divide by n, then take e to that power.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can geometric mean be used with zero?</h4>
            <p className="text-sm text-muted-foreground">
              Technically yes, but if any value is zero, the geometric mean is zero (since the product is zero). This usually isn't useful. Consider whether zero values should be excluded or if another measure is more appropriate.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a real-world application?</h4>
            <p className="text-sm text-muted-foreground">
              The Human Development Index (HDI) uses geometric mean to combine life expectancy, education, and income. This ensures that a deficiency in one dimension can't be fully compensated by another – all dimensions matter.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/arithmetic-mean-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Arithmetic Mean</p>
            <p className="text-xs text-muted-foreground">Standard average</p>
          </a>
          <a href="/math-tools/harmonic-mean-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Harmonic Mean</p>
            <p className="text-xs text-muted-foreground">For rates and ratios</p>
          </a>
          <a href="/math-tools/mean-median-mode-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Mean Median Mode</p>
            <p className="text-xs text-muted-foreground">All central tendencies</p>
          </a>
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

function calculateHarmonic(input: string): number {
  const numbers = input
    .split(/[,\s\n]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => parseFloat(s))
    .filter((n) => !isNaN(n) && n > 0);
  if (numbers.length === 0) return 0;
  const reciprocalSum = numbers.reduce((acc, num) => acc + 1 / num, 0);
  return numbers.length / reciprocalSum;
}
