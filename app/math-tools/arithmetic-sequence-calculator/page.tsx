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

    if (n > 1000) {
      setError("Please enter 1000 or fewer terms for display");
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

        <div className="flex gap-2 flex-wrap">
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

      <section className="space-y-6 pt-8 border-t">
        <h2 className="text-2xl font-semibold">Understanding Arithmetic Sequences</h2>
        
        <div className="space-y-4">
          <p>
            An arithmetic sequence (or arithmetic progression) is a list of numbers where each term differs from the previous one by a constant amount. That constant is called the common difference.
          </p>

          <h3 className="text-xl font-semibold">The Arithmetic Sequence Formula</h3>
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <code className="text-sm font-mono block">
              nth Term: aₙ = a₁ + (n-1)d
            </code>
            <code className="text-sm font-mono block">
              Sum: Sₙ = n/2 × (a₁ + aₙ)
            </code>
          </div>
          <p>
            Where a₁ is the first term, d is the common difference, and n is the position of the term you want to find.
          </p>

          <h3 className="text-xl font-semibold">Worked Examples</h3>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 1: Basic Sequence</h4>
              <p className="text-sm text-muted-foreground mb-2">
                First term a₁ = 2, common difference d = 3, find 10 terms.
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                a₁₀ = 2 + (10-1) × 3 = 2 + 27 = 29<br/>
                S₁₀ = 10/2 × (2 + 29) = 5 × 31 = 155
              </code>
              <p className="text-sm mt-2">
                Sequence: 2, 5, 8, 11, 14, 17, 20, 23, 26, 29
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 2: Negative Difference</h4>
              <p className="text-sm text-muted-foreground mb-2">
                a₁ = 100, d = -5, find 8 terms.
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                a₈ = 100 + (8-1) × (-5) = 100 - 35 = 65<br/>
                S₈ = 8/2 × (100 + 65) = 4 × 165 = 660
              </code>
              <p className="text-sm mt-2">
                Sequence: 100, 95, 90, 85, 80, 75, 70, 65
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 3: Finding the Sum</h4>
              <p className="text-sm text-muted-foreground mb-2">
                What's the sum of the first 50 positive integers?
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                a₁ = 1, d = 1, n = 50<br/>
                a₅₀ = 1 + 49 × 1 = 50<br/>
                S₅₀ = 50/2 × (1 + 50) = 25 × 51 = 1275
              </code>
              <p className="text-sm mt-2">
                This is the famous formula Gauss supposedly discovered as a schoolboy.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold">A Quick Fact</h3>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">
              The story goes that 7-year-old Carl Friedrich Gauss was told to add all numbers from 1 to 100 as busywork. He instantly replied 5050. He'd realized 1+100=101, 2+99=101, and so on — 50 pairs of 101. That's the arithmetic series formula in action.
            </p>
          </div>

          <h3 className="text-xl font-semibold">Common Questions</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">What if the common difference is zero?</h4>
              <p className="text-sm">
                Then every term equals the first term. It's a constant sequence: 5, 5, 5, 5... The sum is just n times the first term.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Can the common difference be negative?</h4>
              <p className="text-sm">
                Absolutely. A negative d means the sequence decreases. These show up in real situations like depreciation or countdown patterns.
            </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">How do I find which term equals a specific value?</h4>
              <p className="text-sm">
                Rearrange the nth term formula: n = (aₙ - a₁)/d + 1. If n comes out as a whole number, that value exists in the sequence.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">What's the difference between a sequence and a series?</h4>
              <p className="text-sm">
                A sequence is the list of numbers. A series is the sum of those numbers. This calculator gives you both — the sequence itself and its partial sum.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Where do arithmetic sequences appear in real life?</h4>
              <p className="text-sm">
                Staircase steps, seating arrangements in theaters, regular salary increases, depreciation schedules — anywhere something changes by a fixed amount each time.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
