"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ArithmeticSequenceCalculator() {
  const [firstTerm, setFirstTerm] = useState("");
  const [commonDiff, setCommonDiff] = useState("");
  const [numTerms, setNumTerms] = useState("");
  const [result, setResult] = useState<{
    sequence: number[];
    nthTerm: number;
    sum: number;
    formula: string;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const a1 = parseFloat(firstTerm);
    const d = parseFloat(commonDiff);
    const n = parseInt(numTerms);

    if (isNaN(a1) || isNaN(d)) {
      setError("Please enter valid numbers for first term and common difference");
      return;
    }

    if (isNaN(n) || n < 1) {
      setError("Please enter at least 1 term");
      return;
    }

    if (n > 100) {
      setError("Please enter 100 or fewer terms for display");
      return;
    }

    // Generate sequence
    const sequence: number[] = [];
    for (let i = 0; i < n; i++) {
      sequence.push(a1 + i * d);
    }

    // nth term: an = a1 + (n-1)d
    const nthTerm = a1 + (n - 1) * d;

    // Sum: Sn = n/2 * (a1 + an)
    const sum = (n / 2) * (a1 + nthTerm);

    setResult({
      sequence,
      nthTerm: Math.round(nthTerm * 1000000) / 1000000,
      sum: Math.round(sum * 1000000) / 1000000,
      formula: `aₙ = ${a1} + (n-1) × ${d} = ${a1} + ${(n - 1) * d}`
    });
  };

  const reset = () => {
    setFirstTerm("");
    setCommonDiff("");
    setNumTerms("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setFirstTerm("2");
    setCommonDiff("3");
    setNumTerms("10");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Arithmetic Sequence Calculator – Find Terms & Sum Online</h1>
        <p className="text-muted-foreground">
          Calculate any term, common difference, or partial sum of an arithmetic sequence with our free online calculator. Enter known values to solve arithmetic progressions instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>First Term (a₁):</Label>
            <Input
              type="number"
              placeholder="e.g., 2"
              value={firstTerm}
              onChange={(e) => setFirstTerm(e.target.value)}
            />
          </div>
          <div>
            <Label>Common Difference (d):</Label>
            <Input
              type="number"
              placeholder="e.g., 3"
              value={commonDiff}
              onChange={(e) => setCommonDiff(e.target.value)}
            />
          </div>
          <div>
            <Label>Number of Terms (n):</Label>
            <Input
              type="number"
              placeholder="e.g., 10"
              value={numTerms}
              onChange={(e) => setNumTerms(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Sequence</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">nth Term (aₙ)</p>
                  <p className="text-3xl font-bold">{result.nthTerm}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Sum (Sₙ)</p>
                  <p className="text-3xl font-bold">{result.sum}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Formula</p>
                  <p className="text-sm font-mono">{result.formula}</p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Sequence Terms</h4>
              <div className="flex flex-wrap gap-2">
                {result.sequence.map((term, i) => (
                  <div key={i} className="p-2 bg-muted rounded text-center min-w-16">
                    <p className="text-xs text-muted-foreground">a<sub>{i + 1}</sub></p>
                    <p className="font-mono">{term}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Formulas Used</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                <div><strong>nth Term:</strong> aₙ = a₁ + (n-1)d</div>
                <div><strong>Sum:</strong> Sₙ = n/2 × (a₁ + aₙ)</div>
                <div><strong>Alternative Sum:</strong> Sₙ = n/2 × [2a₁ + (n-1)d]</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Arithmetic Sequences</h2>
        <p className="text-muted-foreground">
          An arithmetic sequence (or arithmetic progression) is a sequence where each term differs from the previous one by a constant amount called the common difference. For example: 2, 5, 8, 11, 14... has a common difference of 3.
        </p>
        <p className="text-muted-foreground">
          Arithmetic sequences appear in many real-world situations, from calculating loan payments to analyzing patterns in data.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Key Formulas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">nth Term Formula</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              aₙ = a₁ + (n-1)d
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Where a₁ is the first term, d is the common difference, and n is the position
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Sum Formula</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              Sₙ = n/2 × (a₁ + aₙ)
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Or: Sₙ = n/2 × [2a₁ + (n-1)d]
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Examples</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example 1: Positive Difference</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Sequence: 3, 7, 11, 15, 19... (a₁ = 3, d = 4)
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              a₅ = 3 + (5-1) × 4 = 3 + 16 = 19
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example 2: Negative Difference</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Sequence: 20, 17, 14, 11, 8... (a₁ = 20, d = -3)
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              a₆ = 20 + (6-1) × (-3) = 20 - 15 = 5
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example 3: Sum Calculation</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Find sum of first 10 terms: 1, 3, 5, 7, 9... (a₁ = 1, d = 2)
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              a₁₀ = 1 + 9×2 = 19<br/>
              S₁₀ = 10/2 × (1 + 19) = 5 × 20 = 100
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is an arithmetic sequence?</h3>
            <p className="text-sm text-muted-foreground">
              An arithmetic sequence is a list of numbers where each term is found by adding a constant value (common difference) to the previous term. The pattern is linear.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I find the common difference?</h3>
            <p className="text-sm text-muted-foreground">
              Subtract any term from the next term: d = a₂ - a₁. The difference should be the same for any consecutive pair in an arithmetic sequence.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can the common difference be negative?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! A negative common difference creates a decreasing sequence. For example: 10, 7, 4, 1, -2... has d = -3.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between a sequence and a series?</h3>
            <p className="text-sm text-muted-foreground">
              A sequence is a list of numbers. A series is the sum of those numbers. For example, 1, 2, 3, 4 is a sequence; 1+2+3+4=10 is a series.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/geometric-sequence-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Geometric Sequence</p>
            <p className="text-xs text-muted-foreground">Multiply by common ratio</p>
          </a>
          <a href="/math-tools/arithmetic-series-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Arithmetic Series</p>
            <p className="text-xs text-muted-foreground">Sum of arithmetic terms</p>
          </a>
          <a href="/math-tools/nth-term-finder" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">nth Term Finder</p>
            <p className="text-xs text-muted-foreground">Find specific terms</p>
          </a>
        </div>
      </section>
    </div>
  );
}
