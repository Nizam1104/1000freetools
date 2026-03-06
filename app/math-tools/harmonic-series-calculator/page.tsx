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
        <h2 className="text-2xl font-semibold">Understanding Harmonic Series</h2>
        <p className="text-muted-foreground">
          The harmonic series is the sum of reciprocals of positive integers: Hₙ = 1 + 1/2 + 1/3 + ... + 1/n. Despite terms getting smaller, the series diverges (grows without bound) as n approaches infinity.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Harmonic Numbers</h3>
            <p className="text-sm text-muted-foreground">
              Hₙ represents the nth harmonic number. These appear in many areas of mathematics and computer science.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Divergence</h3>
            <p className="text-sm text-muted-foreground">
              The harmonic series diverges very slowly. H₁₀₀₀₀₀₀ ≈ 14.4, showing how slowly it grows.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Approximation</h3>
            <p className="text-sm text-muted-foreground">
              Hₙ ≈ ln(n) + γ where γ ≈ 0.5772 is the Euler-Mascheroni constant.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Harmonic Series Values</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">n</th>
                <th className="p-2 text-left">Hₙ</th>
                <th className="p-2 text-left">ln(n) + γ</th>
                <th className="p-2 text-left">Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">1</td>
                <td className="p-2">1.000000</td>
                <td className="p-2">0.577216</td>
                <td className="p-2">0.422784</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">10</td>
                <td className="p-2">2.928968</td>
                <td className="p-2">2.879801</td>
                <td className="p-2">0.049167</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">100</td>
                <td className="p-2">5.187378</td>
                <td className="p-2">5.182386</td>
                <td className="p-2">0.004992</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">1000</td>
                <td className="p-2">7.485471</td>
                <td className="p-2">7.484971</td>
                <td className="p-2">0.000500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What is the harmonic series?</h3>
          <p className="text-sm text-muted-foreground">
            The harmonic series is the infinite sum 1 + 1/2 + 1/3 + 1/4 + ... It's called "harmonic" because the terms correspond to the wavelengths of harmonics in music.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Does the harmonic series converge?</h3>
          <p className="text-sm text-muted-foreground">
            No, the harmonic series diverges to infinity. This was proven by Nicole Oresme in the 14th century using a comparison test.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is the Euler-Mascheroni constant?</h3>
          <p className="text-sm text-muted-foreground">
            γ ≈ 0.5772 is the limiting difference between the harmonic series and the natural logarithm: γ = lim(n→∞) (Hₙ - ln n).
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Where are harmonic numbers used?</h3>
          <p className="text-sm text-muted-foreground">
            Harmonic numbers appear in algorithm analysis (quicksort), number theory, physics (quantum mechanics), and probability theory.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How fast does the harmonic series grow?</h3>
          <p className="text-sm text-muted-foreground">
            Very slowly! Hₙ grows like ln(n). To reach a sum of 100, you'd need about e^99 ≈ 10^43 terms.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/arithmetic-series-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Arithmetic Series</p>
            <p className="text-xs text-muted-foreground">Sum of sequences</p>
          </a>
          <a href="/math-tools/geometric-series-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Geometric Series</p>
            <p className="text-xs text-muted-foreground">Geometric sums</p>
          </a>
          <a href="/math-tools/factorial-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Factorial Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate n!</p>
          </a>
        </div>
      </section>
    </div>
  );
}
