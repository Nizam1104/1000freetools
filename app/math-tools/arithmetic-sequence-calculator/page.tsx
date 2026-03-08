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

    </div>
  );
}
