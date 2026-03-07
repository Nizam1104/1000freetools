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
      </section>
    </div>
  );
}
