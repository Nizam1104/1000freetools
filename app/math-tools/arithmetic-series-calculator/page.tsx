"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ArithmeticSeriesCalculator() {
  const [firstTerm, setFirstTerm] = useState("");
  const [commonDiff, setCommonDiff] = useState("");
  const [numTerms, setNumTerms] = useState("");
  const [lastTerm, setLastTerm] = useState("");
  const [result, setResult] = useState<{
    sum: number;
    terms: number[];
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const a1 = parseFloat(firstTerm);
    const d = parseFloat(commonDiff);
    const n = parseInt(numTerms);
    const an = lastTerm ? parseFloat(lastTerm) : null;

    if (isNaN(a1)) {
      setError("Please enter the first term");
      return;
    }

    if (isNaN(n) || n < 1) {
      setError("Please enter at least 1 term");
      return;
    }

    if (n > 100) {
      setError("Please enter 100 or fewer terms");
      return;
    }

    try {
      // Calculate last term if not provided
      const last = an !== null ? an : a1 + (n - 1) * d;
      
      // Calculate sum: Sn = n/2 * (a1 + an)
      const sum = (n / 2) * (a1 + last);

      // Generate terms for display
      const terms: number[] = [];
      for (let i = 0; i < Math.min(n, 20); i++) {
        terms.push(a1 + i * d);
      }

      const steps = [
        `Given: a₁ = ${a1}, n = ${n}${d !== undefined ? `, d = ${d}` : ''}${an !== null ? `, aₙ = ${an}` : ''}`,
        ``,
        `Step 1: Find the last term (if not given)`,
        `aₙ = a₁ + (n-1)d`,
        `aₙ = ${a1} + (${n}-1) × ${d} = ${a1} + ${(n - 1) * d} = ${last}`,
        ``,
        `Step 2: Apply the sum formula`,
        `Sₙ = n/2 × (a₁ + aₙ)`,
        `Sₙ = ${n}/2 × (${a1} + ${last})`,
        `Sₙ = ${n/2} × ${a1 + last}`,
        `Sₙ = ${sum}`,
        ``,
        `Final Answer: The sum of ${n} terms is ${sum}`
      ];

      setResult({
        sum: Math.round(sum * 1000000) / 1000000,
        terms,
        steps
      });
    } catch (e) {
      setError("Unable to calculate. Please check your inputs.");
    }
  };

  const reset = () => {
    setFirstTerm("");
    setCommonDiff("");
    setNumTerms("");
    setLastTerm("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setFirstTerm("5");
    setCommonDiff("3");
    setNumTerms("15");
    setLastTerm("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Sum of Arithmetic Series Calculator</h1>
        <p className="text-muted-foreground">
          Calculate the sum of an arithmetic series with our free online calculator. Enter the first term, common difference, and number of terms to find the sum instantly with step-by-step solutions.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <Label>First Term (a₁):</Label>
            <Input
              type="number"
              placeholder="e.g., 5"
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
              placeholder="e.g., 15"
              value={numTerms}
              onChange={(e) => setNumTerms(e.target.value)}
            />
          </div>
          <div>
            <Label>Last Term (aₙ) - Optional:</Label>
            <Input
              type="number"
              placeholder="Auto-calculated"
              value={lastTerm}
              onChange={(e) => setLastTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Sum</Button>
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
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Sum of Series (Sₙ)</p>
              <p className="text-5xl font-bold">{result.sum}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Sum of {numTerms} terms
              </p>
            </div>

            {result.terms.length > 0 && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-3">First {result.terms.length} Terms</h4>
                <div className="flex flex-wrap gap-2">
                  {result.terms.map((term, i) => (
                    <div key={i} className="p-2 bg-muted rounded text-center min-w-12">
                      <p className="text-xs text-muted-foreground">{term}</p>
                    </div>
                  ))}
                  {parseInt(numTerms) > 20 && (
                    <div className="p-2 text-muted-foreground">... and {parseInt(numTerms) - 20} more</div>
                  )}
                </div>
              </div>
            )}

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                {result.steps.map((step, i) => (
                  <div key={i} className={step === "" ? "h-4" : ""}>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Arithmetic Series</h2>
        <p className="text-muted-foreground">
          An arithmetic series is the sum of the terms in an arithmetic sequence. While a sequence lists the numbers, a series adds them together. For example, the arithmetic sequence 2, 5, 8, 11 becomes the series 2 + 5 + 8 + 11 = 26.
        </p>
        <p className="text-muted-foreground">
          The sum formula was famously discovered by mathematician Carl Friedrich Gauss as a child when he quickly summed the numbers 1 to 100.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Sum Formulas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">When You Know First and Last Terms</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              Sₙ = n/2 × (a₁ + aₙ)
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Multiply the number of terms by the average of first and last terms
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">When You Know First Term and Common Difference</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              Sₙ = n/2 × [2a₁ + (n-1)d]
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Substitute aₙ = a₁ + (n-1)d into the first formula
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Examples</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example 1: Sum of First 100 Natural Numbers</h3>
            <p className="text-sm text-muted-foreground mb-2">
              1 + 2 + 3 + ... + 100 (a₁ = 1, d = 1, n = 100, a₁₀₀ = 100)
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              S₁₀₀ = 100/2 × (1 + 100) = 50 × 101 = 5,050
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example 2: Sum with Given Difference</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Sum of first 20 terms: 3, 7, 11, 15... (a₁ = 3, d = 4, n = 20)
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              a₂₀ = 3 + 19×4 = 79<br/>
              S₂₀ = 20/2 × (3 + 79) = 10 × 82 = 820
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between a sequence and a series?</h3>
            <p className="text-sm text-muted-foreground">
              A sequence is a list of numbers (1, 2, 3, 4...). A series is the sum of those numbers (1 + 2 + 3 + 4 = 10). Sequence = list, Series = sum.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why does the sum formula work?</h3>
            <p className="text-sm text-muted-foreground">
              Pair the first and last terms, second and second-to-last, etc. Each pair sums to the same value (a₁ + aₙ). With n terms, there are n/2 such pairs.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can the sum be negative?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! If the terms are mostly negative (negative first term and/or negative common difference), the sum will be negative.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/arithmetic-sequence-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Arithmetic Sequence</p>
            <p className="text-xs text-muted-foreground">Find individual terms</p>
          </a>
          <a href="/math-tools/geometric-series-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Geometric Series</p>
            <p className="text-xs text-muted-foreground">Sum of GP terms</p>
          </a>
          <a href="/math-tools/average-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Average Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate means</p>
          </a>
        </div>
      </section>
    </div>
  );
}
