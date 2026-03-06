"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GeometricSeriesCalculator() {
  const [firstTerm, setFirstTerm] = useState("");
  const [commonRatio, setCommonRatio] = useState("");
  const [numTerms, setNumTerms] = useState("");
  const [isInfinite, setIsInfinite] = useState(false);
  const [result, setResult] = useState<{
    sum: number | string;
    terms: number[];
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const a1 = parseFloat(firstTerm);
    const r = parseFloat(commonRatio);

    if (isNaN(a1) || isNaN(r)) {
      setError("Please enter valid numbers for first term and common ratio");
      return;
    }

    if (!isInfinite) {
      const n = parseInt(numTerms);
      if (isNaN(n) || n < 1) {
        setError("Please enter at least 1 term");
        return;
      }
      if (n > 50) {
        setError("Please enter 50 or fewer terms");
        return;
      }
    }

    try {
      let sum: number | string;
      const steps: string[] = [];
      const terms: number[] = [];

      if (isInfinite) {
        if (Math.abs(r) >= 1) {
          setError("For infinite series, |r| must be less than 1 for convergence");
          return;
        }
        // S∞ = a₁ / (1 - r)
        sum = a1 / (1 - r);
        steps.push(`Infinite Geometric Series`);
        steps.push(`Given: a₁ = ${a1}, r = ${r}`);
        steps.push(``);
        steps.push(`Step 1: Check convergence`);
        steps.push(`|r| = |${r}| = ${Math.abs(r)} < 1 ✓ (series converges)`);
        steps.push(``);
        steps.push(`Step 2: Apply infinite sum formula`);
        steps.push(`S∞ = a₁ / (1 - r)`);
        steps.push(`S∞ = ${a1} / (1 - ${r})`);
        steps.push(`S∞ = ${a1} / ${1 - r}`);
        steps.push(`S∞ = ${Math.round(sum * 1000000) / 1000000}`);

        // Generate first 10 terms for display
        for (let i = 0; i < 10; i++) {
          terms.push(a1 * Math.pow(r, i));
        }
      } else {
        const n = parseInt(numTerms);
        // Sn = a₁ × (1 - r^n) / (1 - r)
        if (r === 1) {
          sum = a1 * n;
          steps.push(`Special case: r = 1`);
          steps.push(`Sₙ = n × a₁ = ${n} × ${a1} = ${sum}`);
        } else {
          sum = a1 * (1 - Math.pow(r, n)) / (1 - r);
          steps.push(`Finite Geometric Series`);
          steps.push(`Given: a₁ = ${a1}, r = ${r}, n = ${n}`);
          steps.push(``);
          steps.push(`Step 1: Apply sum formula`);
          steps.push(`Sₙ = a₁ × (1 - r^n) / (1 - r)`);
          steps.push(`Sₙ = ${a1} × (1 - ${r}^${n}) / (1 - ${r})`);
          steps.push(`Sₙ = ${a1} × (1 - ${Math.pow(r, n)}) / ${1 - r}`);
          steps.push(`Sₙ = ${a1} × ${1 - Math.pow(r, n)} / ${1 - r}`);
          steps.push(`Sₙ = ${Math.round(sum * 1000000) / 1000000}`);
        }

        // Generate terms for display
        for (let i = 0; i < Math.min(n, 15); i++) {
          terms.push(a1 * Math.pow(r, i));
        }
      }

      setResult({
        sum: typeof sum === 'number' ? Math.round(sum * 1000000) / 1000000 : sum,
        terms,
        steps
      });
    } catch (e) {
      setError("Unable to calculate. Please check your inputs.");
    }
  };

  const reset = () => {
    setFirstTerm("");
    setCommonRatio("");
    setNumTerms("");
    setIsInfinite(false);
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setFirstTerm("1");
    setCommonRatio("0.5");
    setNumTerms("10");
    setIsInfinite(false);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Sum of Geometric Series Calculator</h1>
        <p className="text-muted-foreground">
          Calculate the sum of a geometric series with our free online calculator. Supports both finite series and infinite convergent series with step-by-step solutions.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isInfinite}
              onChange={(e) => setIsInfinite(e.target.checked)}
              className="h-4 w-4"
            />
            Infinite Series (|r| &lt; 1)
          </Label>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>First Term (a₁):</Label>
            <Input
              type="number"
              placeholder="e.g., 1"
              value={firstTerm}
              onChange={(e) => setFirstTerm(e.target.value)}
            />
          </div>
          <div>
            <Label>Common Ratio (r):</Label>
            <Input
              type="number"
              step="0.1"
              placeholder="e.g., 0.5"
              value={commonRatio}
              onChange={(e) => setCommonRatio(e.target.value)}
            />
          </div>
          {!isInfinite && (
            <div>
              <Label>Number of Terms (n):</Label>
              <Input
                type="number"
                placeholder="e.g., 10"
                value={numTerms}
                onChange={(e) => setNumTerms(e.target.value)}
              />
            </div>
          )}
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
              <p className="text-sm text-muted-foreground mb-2">
                {isInfinite ? 'Infinite Sum (S∞)' : `Sum of ${numTerms} Terms (Sₙ)`}
              </p>
              <p className="text-5xl font-bold">{result.sum}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">
                {isInfinite ? 'First 10 Terms' : `First ${Math.min(parseInt(numTerms), 15)} Terms`}
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.terms.map((term, i) => (
                  <div key={i} className="p-2 bg-muted rounded text-center min-w-16">
                    <p className="text-xs text-muted-foreground">a<sub>{i + 1}</sub></p>
                    <p className="font-mono text-sm">{term.toPrecision(5)}</p>
                  </div>
                ))}
              </div>
            </div>

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
        <h2 className="text-2xl font-semibold">Understanding Geometric Series</h2>
        <p className="text-muted-foreground">
          A geometric series is the sum of terms in a geometric sequence. Unlike arithmetic series, geometric series can converge to a finite value even with infinitely many terms, as long as the common ratio has absolute value less than 1.
        </p>
        <p className="text-muted-foreground">
          Geometric series appear in finance (present value of annuities), physics (decay processes), and mathematics (representing repeating decimals as fractions).
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Sum Formulas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Finite Series (n terms)</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              Sₙ = a₁ × (1 - r^n) / (1 - r)
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              For r ≠ 1. If r = 1, then Sₙ = n × a₁
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Infinite Series (|r| &lt; 1)</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              S∞ = a₁ / (1 - r)
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Only converges when |r| &lt; 1. Otherwise diverges to infinity.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Examples</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example 1: Finite Series</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Sum of first 6 terms: 2 + 6 + 18 + 54 + 162 + 486 (a₁ = 2, r = 3, n = 6)
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              S₆ = 2 × (1 - 3^6) / (1 - 3) = 2 × (1 - 729) / (-2) = 2 × (-728) / (-2) = 728
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example 2: Infinite Series</h3>
            <p className="text-sm text-muted-foreground mb-2">
              1 + 1/2 + 1/4 + 1/8 + ... (a₁ = 1, r = 1/2)
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              |r| = 0.5 &lt; 1, so converges<br/>
              S∞ = 1 / (1 - 0.5) = 1 / 0.5 = 2
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example 3: Repeating Decimal</h3>
            <p className="text-sm text-muted-foreground mb-2">
              0.333... = 0.3 + 0.03 + 0.003 + ... (a₁ = 0.3, r = 0.1)
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              S∞ = 0.3 / (1 - 0.1) = 0.3 / 0.9 = 1/3
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">When does an infinite geometric series converge?</h3>
            <p className="text-sm text-muted-foreground">
              An infinite geometric series converges only when |r| &lt; 1. If |r| ≥ 1, the series diverges (the sum grows without bound or oscillates).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What if r = 1?</h3>
            <p className="text-sm text-muted-foreground">
              When r = 1, every term equals a₁. For n terms, the sum is simply n × a₁. The infinite series diverges.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can r be negative?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! With negative r, terms alternate sign. The series still converges if |r| &lt; 1. For example: 1 - 1/2 + 1/4 - 1/8 + ... converges to 2/3.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/geometric-sequence-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Geometric Sequence</p>
            <p className="text-xs text-muted-foreground">Find individual terms</p>
          </a>
          <a href="/math-tools/arithmetic-series-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Arithmetic Series</p>
            <p className="text-xs text-muted-foreground">Sum of AP terms</p>
          </a>
          <a href="/math-tools/fraction-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Fraction Calculator</p>
            <p className="text-xs text-muted-foreground">Work with fractions</p>
          </a>
        </div>
      </section>
    </div>
  );
}
