"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HarmonicSeriesCalculator() {
  const [n, setN] = useState("10");
  const [start, setStart] = useState("1");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const nValue = parseInt(n);
    const startValue = parseInt(start);

    if (isNaN(nValue) || nValue <= 0) {
      setError("Please enter a positive integer for n");
      return;
    }

    if (isNaN(startValue) || startValue <= 0) {
      setError("Please enter a positive integer for starting term");
      return;
    }

    if (nValue > 10000) {
      setError("Please enter n ≤ 10000 for practical computation");
      return;
    }

    let sum = 0;
    const terms: number[] = [];

    for (let i = startValue; i < startValue + nValue; i++) {
      const term = 1 / i;
      terms.push(term);
      sum += term;
    }

    // Approximation using Euler-Mascheroni constant
    const gamma = 0.5772156649015328606;
    const n_end = startValue + nValue - 1;
    const approxSum = Math.log(n_end) + gamma - (Math.log(startValue - 1) + gamma);

    setResult({
      n: nValue,
      start: startValue,
      end: startValue + nValue - 1,
      sum: Math.round(sum * 1000000) / 1000000,
      terms: terms.slice(0, 20), // Show first 20 terms
      moreTerms: terms.length > 20,
      approximation: Math.round(approxSum * 1000000) / 1000000,
      formula: `H_n = 1 + 1/2 + 1/3 + ... + 1/n`
    });
  };

  const reset = () => {
    setN("10");
    setStart("1");
    setResult(null);
    setError("");
  };

  const loadExample = (nVal: string, startVal: string) => {
    setN(nVal);
    setStart(startVal);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Harmonic Series Calculator – Calculate Harmonic Sum</h1>
        <p className="text-muted-foreground">
          Calculate the sum of harmonic series with our free online calculator. Find Hₙ = 1 + 1/2 + 1/3 + ... + 1/n with step-by-step solutions and approximations.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Number of Terms (n)</Label>
            <Input
              type="number"
              placeholder="10"
              value={n}
              onChange={(e) => setN(e.target.value)}
            />
          </div>
          <div>
            <Label>Starting Term (default: 1)</Label>
            <Input
              type="number"
              placeholder="1"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate Sum</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("10", "1")}>H₁₀</Button>
          <Button variant="outline" onClick={() => loadExample("100", "1")}>H₁₀₀</Button>
          <Button variant="outline" onClick={() => loadExample("1000", "1")}>H₁₀₀₀</Button>
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
                Harmonic Sum H<sub>{result.n}</sub> (terms {result.start} to {result.end})
              </p>
              <p className="text-4xl font-bold">{result.sum}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Sum of {result.n} terms: 1/{result.start} + 1/{result.start + 1} + ... + 1/{result.end}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Formula</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                {result.formula}
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                The harmonic series is the sum of reciprocals of positive integers.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">First {Math.min(20, result.terms.length)} Terms</h4>
              <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                {result.terms.map((term: number, i: number) => (
                  <div key={i} className="p-2 bg-muted rounded text-center">
                    <p className="text-xs text-muted-foreground">1/{result.start + i}</p>
                    <p className="font-mono text-sm">{term.toFixed(6)}</p>
                  </div>
                ))}
              </div>
              {result.moreTerms && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  ... and {result.terms.length - 20} more terms
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Exact Sum</h4>
                <p className="text-2xl font-bold">{result.sum}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Calculated by adding all {result.n} terms
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Approximation (ln n + γ)</h4>
                <p className="text-2xl font-bold">{result.approximation}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Using natural log and Euler-Mascheroni constant
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Calculation</h4>
              <div className="space-y-2 text-sm bg-muted p-3 rounded font-mono">
                <div>H<sub>{result.n}</sub> = 1/{result.start} + 1/{result.start + 1} + ... + 1/{result.end}</div>
                <div>H<sub>{result.n}</sub> = {result.terms.slice(0, 5).map((t: number, i: number) => t.toFixed(4)).join(' + ')} + ...</div>
                <div>H<sub>{result.n}</sub> = {result.sum}</div>
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
