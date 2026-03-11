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

    if (n > 1000) {
      setError("Please enter 1000 or fewer terms for display");
      return;
    }

    const sequence: number[] = [];
    for (let i = 0; i < n; i++) {
      sequence.push(a1 * Math.pow(r, i));
    }

    const nthTerm = a1 * Math.pow(r, n - 1);

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

  const loadExample = (a1: string, r: string, n: string) => {
    setFirstTerm(a1);
    setCommonRatio(r);
    setNumTerms(n);
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate Sequence</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2", "2", "8")}>2, 4, 8, 16...</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1", "3", "6")}>1, 3, 9, 27...</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100", "0.5", "6")}>100, 50, 25...</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("3", "-2", "7")}>3, -6, 12... (alt.)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1", "1.1", "10")}>1, 1.1, 1.21... (growth)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("5", "1", "10")}>5, 5, 5... (constant)</Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Geometric Sequences</h2>
        <p className="text-muted-foreground">
          A geometric sequence is a list of numbers where each term is found by multiplying the previous term by a constant called the common ratio. If you start with 2 and multiply by 3 each time, you get: 2, 6, 18, 54, 162... This pattern appears everywhere from finance to biology.
        </p>
        <p className="text-muted-foreground">
          Geometric sequences model exponential growth and decay. Population growth, compound interest, radioactive decay, and the spread of viruses all follow geometric patterns. The common ratio determines whether the sequence grows (r {'>'} 1), shrinks (0 {'<'} r {'<'} 1), or alternates (r {'<'} 0).
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Geometric Sequence Formulas</h3>
        <div className="p-6 bg-muted rounded-lg">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-sm mb-3">nth Term Formula</h4>
              <div className="font-mono text-center p-3 bg-background rounded mb-3">
                aₙ = a₁ × r^(n-1)
              </div>
              <p className="text-sm text-muted-foreground">
                To find any term, multiply the first term by the common ratio raised to the power of (position - 1).
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Sum Formula</h4>
              <div className="font-mono text-center p-3 bg-background rounded mb-3">
                Sₙ = a₁(1 - r^n) / (1 - r)
              </div>
              <p className="text-sm text-muted-foreground">
                The sum of the first n terms. When r = 1, the sum is simply n × a₁.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Find the 8th term of 2, 4, 8, 16...</h4>
            <div className="font-mono text-sm space-y-2">
              <div>a₁ = 2, r = 2, n = 8</div>
              <div>a₈ = 2 × 2^(8-1) = 2 × 2^7</div>
              <div>a₈ = 2 × 128 = 256</div>
              <div className="text-muted-foreground mt-2">The 8th term is 256</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Sum of first 6 terms of 1, 3, 9, 27...</h4>
            <div className="font-mono text-sm space-y-2">
              <div>a₁ = 1, r = 3, n = 6</div>
              <div>S₆ = 1 × (1 - 3^6) / (1 - 3)</div>
              <div>S₆ = (1 - 729) / (-2)</div>
              <div>S₆ = -728 / -2 = 364</div>
              <div className="text-muted-foreground mt-2">Sum = 1 + 3 + 9 + 27 + 81 + 243 = 364 ✓</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Decay Sequence (r = 0.5)</h4>
            <div className="font-mono text-sm space-y-2">
              <div>a₁ = 100, r = 0.5</div>
              <div>Sequence: 100, 50, 25, 12.5, 6.25, 3.125...</div>
              <div>a₆ = 100 × 0.5^5 = 100 × 0.03125 = 3.125</div>
              <div className="text-muted-foreground mt-2">Each term is half the previous – exponential decay</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Alternating Sequence (r = -2)</h4>
            <div className="font-mono text-sm space-y-2">
              <div>a₁ = 3, r = -2</div>
              <div>Sequence: 3, -6, 12, -24, 48, -96...</div>
              <div>a₅ = 3 × (-2)^4 = 3 × 16 = 48</div>
              <div className="text-muted-foreground mt-2">Negative ratio creates alternating signs</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            The famous "wheat and chessboard" problem involves a geometric sequence. When a inventor asked for 1 grain on the first square, 2 on the second, 4 on the third (doubling each time), the total for all 64 squares is 2^64 - 1 = over 18 quintillion grains – more wheat than exists on Earth!
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between geometric and arithmetic sequences?</h4>
            <p className="text-sm text-muted-foreground">
              Arithmetic sequences add a constant each time (2, 5, 8, 11...). Geometric sequences multiply by a constant each time (2, 6, 18, 54...). Arithmetic grows linearly; geometric grows exponentially.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What happens when the ratio is negative?</h4>
            <p className="text-sm text-muted-foreground">
              The sequence alternates between positive and negative values. For r = -2: a, -2a, 4a, -8a, 16a... The magnitude still grows exponentially, but the sign flips each term.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the ratio be a fraction?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! When 0 {'<'} r {'<'} 1, the sequence decays toward zero. For example, with r = 0.5: 100, 50, 25, 12.5, 6.25... This models radioactive decay and depreciation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What&apos;s an infinite geometric series?</h4>
            <p className="text-sm text-muted-foreground">
              When |r| {'<'} 1, the infinite sum converges to a finite value: S∞ = a₁ / (1 - r). For example, 1 + 1/2 + 1/4 + 1/8 + ... = 2. If |r| ≥ 1, the sum diverges to infinity.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I find the common ratio?</h4>
            <p className="text-sm text-muted-foreground">
              Divide any term by the previous term: r = aₙ / aₙ₋₁. For the sequence 2, 6, 18, 54: r = 6/2 = 3, or r = 18/6 = 3. The ratio should be the same for any consecutive pair.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Where are geometric sequences used in real life?</h4>
            <p className="text-sm text-muted-foreground">
              Compound interest, population growth, radioactive decay, computer algorithm analysis, fractal geometry, musical scales, and the spread of diseases all involve geometric sequences.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/geometric-series-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Geometric Series</p>
            <p className="text-xs text-muted-foreground">Sum of geometric terms</p>
          </a>
          <a href="/math-tools/arithmetic-sequence-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Arithmetic Sequence</p>
            <p className="text-xs text-muted-foreground">Linear patterns</p>
          </a>
          <a href="/math-tools/fibonacci-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Fibonacci Sequence</p>
            <p className="text-xs text-muted-foreground">Famous number pattern</p>
          </a>
        </div>
      </section>
    </div>
  );
}
