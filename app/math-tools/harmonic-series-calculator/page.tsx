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

    if (nValue > 100000) {
      setError("Please enter n ≤ 100,000 for practical computation");
      return;
    }

    let sum = 0;
    const terms: number[] = [];

    for (let i = startValue; i < startValue + nValue; i++) {
      const term = 1 / i;
      terms.push(term);
      sum += term;
    }

    const gamma = 0.5772156649015328606;
    const n_end = startValue + nValue - 1;
    const approxSum = Math.log(n_end) + gamma - (Math.log(startValue - 1) + gamma);

    setResult({
      n: nValue,
      start: startValue,
      end: startValue + nValue - 1,
      sum: Math.round(sum * 1000000) / 1000000,
      terms: terms.slice(0, 20),
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
    <div className="w-full mx-auto space-y-8">
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
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10", "1")}>H₁₀</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100", "1")}>H₁₀₀</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1000", "1")}>H₁₀₀₀</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10000", "1")}>H₁₀₀₀₀</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("50", "5")}>Start at 5</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("20", "10")}>Start at 10</Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding the Harmonic Series</h2>
        <p className="text-muted-foreground">
          The harmonic series is the sum of reciprocals of all positive integers: 1 + 1/2 + 1/3 + 1/4 + ... Despite the terms getting smaller and smaller, this series never stops growing – it diverges to infinity. However, it grows extremely slowly.
        </p>
        <p className="text-muted-foreground">
          The partial sum Hₙ (the sum of the first n terms) is called the nth harmonic number. These numbers appear in many areas of mathematics, from number theory to analysis of algorithms. The harmonic series grows approximately like the natural logarithm of n.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Harmonic Series Formula</h3>
        <div className="p-6 bg-muted rounded-lg">
          <div className="font-mono text-center text-lg p-4 bg-background rounded mb-4">
            Hₙ = 1 + 1/2 + 1/3 + ... + 1/n = Σ(k=1 to n) 1/k
          </div>
          <p className="text-sm mb-4">For large n, the harmonic number can be approximated by:</p>
          <div className="font-mono text-center p-3 bg-background rounded mb-4">
            Hₙ ≈ ln(n) + γ
          </div>
          <p className="text-sm text-muted-foreground">
            Where γ (gamma) ≈ 0.5772 is the Euler-Mascheroni constant. This approximation becomes more accurate as n increases.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: H₅ (First 5 Terms)</h4>
            <div className="font-mono text-sm space-y-2">
              <div>H₅ = 1 + 1/2 + 1/3 + 1/4 + 1/5</div>
              <div>H₅ = 1 + 0.5 + 0.333... + 0.25 + 0.2</div>
              <div>H₅ = 2.283333...</div>
              <div className="text-muted-foreground mt-2">Exact fraction: 137/60</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: H₁₀</h4>
            <div className="font-mono text-sm space-y-2">
              <div>H₁₀ = 1 + 1/2 + 1/3 + ... + 1/10</div>
              <div>H₁₀ ≈ 2.928968</div>
              <div>Approximation: ln(10) + 0.5772 ≈ 2.3026 + 0.5772 = 2.8798</div>
              <div className="text-muted-foreground mt-2">The approximation underestimates slightly for small n.</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: H₁₀₀₀</h4>
            <div className="font-mono text-sm space-y-2">
              <div>H₁₀₀₀ ≈ 7.485471</div>
              <div>Approximation: ln(1000) + 0.5772 ≈ 6.9078 + 0.5772 = 7.485</div>
              <div className="text-muted-foreground mt-2">Very close! The approximation improves for larger n.</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: How Large for Hₙ &gt; 10?</h4>
            <div className="text-sm space-y-2">
              <p>Using the approximation Hₙ ≈ ln(n) + γ:</p>
              <div className="font-mono">ln(n) + 0.5772 &gt; 10</div>
              <div className="font-mono">ln(n) &gt; 9.4228</div>
              <div className="font-mono">n &gt; e^9.4228 ≈ 12,367</div>
              <p className="text-muted-foreground mt-2">You need over 12,000 terms just to exceed 10!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            Despite diverging to infinity, the harmonic series grows so slowly that H₁₀₀₀₀₀₀₀₀₀ (one billion terms) is only about 21.3. Nicole Oresme proved the series diverges around 1350 – one of the first rigorous proofs of divergence in mathematics.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does the harmonic series diverge?</h4>
            <p className="text-sm text-muted-foreground">
              Even though terms approach zero, they don't approach zero fast enough. Oresme's proof groups terms: (1) + (1/2) + (1/3+1/4) + (1/5+...+1/8) + ... Each group sums to at least 1/2, so the total exceeds any bound.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the Euler-Mascheroni constant?</h4>
            <p className="text-sm text-muted-foreground">
              γ ≈ 0.5772 is the limiting difference between Hₙ and ln(n). It appears throughout mathematics but remains mysterious – we don't even know if it's irrational! It's named after the two mathematicians who studied it extensively.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Where does the harmonic series appear in real life?</h4>
            <p className="text-sm text-muted-foreground">
              In the "coupon collector problem" – how many purchases to collect all n different coupons? Expected value is n × Hₙ. Also in analysis of quicksort algorithm, harmonic numbers determine average-case complexity.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference from geometric series?</h4>
            <p className="text-sm text-muted-foreground">
              Geometric series have a constant ratio between terms (1, 1/2, 1/4, 1/8...). Harmonic series have denominators increasing by 1 (1, 1/2, 1/3, 1/4...). Geometric series with |r|&lt;1 converge; harmonic series diverges.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I calculate Hₙ for very large n?</h4>
            <p className="text-sm text-muted-foreground">
              For very large n, use the approximation Hₙ ≈ ln(n) + γ + 1/(2n) - 1/(12n²). This is much faster than adding millions of terms and is extremely accurate for large n.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What are harmonic numbers used for?</h4>
            <p className="text-sm text-muted-foreground">
              Beyond the coupon collector problem, harmonic numbers appear in number theory (divisor sums), combinatorics (Stirling numbers), physics (quantum mechanics), and computer science (algorithm analysis).
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
