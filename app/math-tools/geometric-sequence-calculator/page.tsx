"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GeometricSequenceCalculator() {
  const [firstTerm, setFirstTerm] = useState("");
  const [commonRatio, setCommonRatio] = useState("");
  const [numTerms, setNumTerms] = useState("");
  const [result, setResult] = useState<{
    sequence: number[];
    nthTerm: number;
    sum: number | string;
    formula: string;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const a1 = parseFloat(firstTerm);
    const r = parseFloat(commonRatio);
    const n = parseInt(numTerms);

    if (isNaN(a1) || isNaN(r)) {
      setError("Please enter valid numbers for first term and common ratio");
      return;
    }

    if (isNaN(n) || n < 1) {
      setError("Please enter at least 1 term");
      return;
    }

    if (n > 50) {
      setError("Please enter 50 or fewer terms for display");
      return;
    }

    // Generate sequence
    const sequence: number[] = [];
    for (let i = 0; i < n; i++) {
      sequence.push(a1 * Math.pow(r, i));
    }

    // nth term: an = a1 * r^(n-1)
    const nthTerm = a1 * Math.pow(r, n - 1);

    // Sum: Sn = a1 * (1 - r^n) / (1 - r) for r ≠ 1
    let sum: number | string;
    if (r === 1) {
      sum = a1 * n;
    } else {
      sum = a1 * (1 - Math.pow(r, n)) / (1 - r);
    }

    setResult({
      sequence,
      nthTerm: Math.round(nthTerm * 1000000) / 1000000,
      sum: typeof sum === 'number' ? Math.round(sum * 1000000) / 1000000 : sum,
      formula: `aₙ = ${a1} × ${r}^${n - 1} = ${a1} × ${Math.pow(r, n - 1)}`
    });
  };

  const reset = () => {
    setFirstTerm("");
    setCommonRatio("");
    setNumTerms("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setFirstTerm("2");
    setCommonRatio("2");
    setNumTerms("8");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Geometric Sequence Calculator – Find Terms & Sum Online</h1>
        <p className="text-muted-foreground">
          Calculate any term, common ratio, or sum of a geometric sequence with our free online calculator. Solve geometric progressions for any number of terms with full solutions.
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
            <Label>Common Ratio (r):</Label>
            <Input
              type="number"
              step="0.1"
              placeholder="e.g., 2"
              value={commonRatio}
              onChange={(e) => setCommonRatio(e.target.value)}
            />
          </div>
          <div>
            <Label>Number of Terms (n):</Label>
            <Input
              type="number"
              placeholder="e.g., 8"
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
                    <p className="font-mono">{typeof term === 'number' ? term.toPrecision(6) : term}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Formulas Used</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                <div><strong>nth Term:</strong> aₙ = a₁ × r^(n-1)</div>
                <div><strong>Sum (r ≠ 1):</strong> Sₙ = a₁ × (1 - r^n) / (1 - r)</div>
                <div><strong>Sum (r = 1):</strong> Sₙ = n × a₁</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Geometric Sequences</h2>
        <p className="text-muted-foreground">
          A geometric sequence (or geometric progression) is a sequence where each term is found by multiplying the previous term by a constant value called the common ratio. For example: 2, 6, 18, 54, 162... has a common ratio of 3.
        </p>
        <p className="text-muted-foreground">
          Geometric sequences model exponential growth and decay, appearing in finance (compound interest), biology (population growth), and physics (radioactive decay).
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Key Formulas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">nth Term Formula</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              aₙ = a₁ × r^(n-1)
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Where a₁ is the first term, r is the common ratio, and n is the position
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Sum Formula</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              Sₙ = a₁ × (1 - r^n) / (1 - r)
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              For r ≠ 1. If r = 1, then Sₙ = n × a₁
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Examples</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example 1: Growth (r &gt; 1)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Sequence: 3, 6, 12, 24, 48... (a₁ = 3, r = 2)
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              a₅ = 3 × 2^4 = 3 × 16 = 48<br/>
              S₅ = 3 × (1 - 2^5) / (1 - 2) = 3 × (-31) / (-1) = 93
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example 2: Decay (0 &lt; r &lt; 1)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Sequence: 100, 50, 25, 12.5, 6.25... (a₁ = 100, r = 0.5)
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              a₅ = 100 × 0.5^4 = 100 × 0.0625 = 6.25
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example 3: Negative Ratio</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Sequence: 5, -10, 20, -40, 80... (a₁ = 5, r = -2)
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              a₅ = 5 × (-2)^4 = 5 × 16 = 80
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is a geometric sequence?</h3>
            <p className="text-sm text-muted-foreground">
              A geometric sequence is a list of numbers where each term is found by multiplying the previous term by a constant (common ratio). The pattern is exponential.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I find the common ratio?</h3>
            <p className="text-sm text-muted-foreground">
              Divide any term by the previous term: r = a₂/a₁. The ratio should be the same for any consecutive pair in a geometric sequence.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What happens when r is negative?</h3>
            <p className="text-sm text-muted-foreground">
              With a negative ratio, the sequence alternates between positive and negative values. For example: 2, -6, 18, -54... with r = -3.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is an infinite geometric series?</h3>
            <p className="text-sm text-muted-foreground">
              When |r| &lt; 1, the infinite sum converges to S∞ = a₁/(1-r). This is used for repeating decimals and infinite processes.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/arithmetic-sequence-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Arithmetic Sequence</p>
            <p className="text-xs text-muted-foreground">Add common difference</p>
          </a>
          <a href="/math-tools/geometric-series-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Geometric Series</p>
            <p className="text-xs text-muted-foreground">Sum of geometric terms</p>
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
