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
      if (n > 1000) {
        setError("Please enter 1000 or fewer terms");
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

        for (let i = 0; i < 10; i++) {
          terms.push(a1 * Math.pow(r, i));
        }
      } else {
        const n = parseInt(numTerms);
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

  const loadExample = (a1: string, r: string, n: string, infinite: boolean) => {
    setFirstTerm(a1);
    setCommonRatio(r);
    setNumTerms(n);
    setIsInfinite(infinite);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate Sum</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1", "0.5", "10", false)}>1 + 1/2 + 1/4...</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1", "0.5", "100", true)}>Infinite: 1/(1-0.5)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2", "3", "6", false)}>2 + 6 + 18...</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("3", "0.25", "8", false)}>3 + 0.75 + 0.1875...</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1", "0.1", "50", true)}>Infinite: 1/(1-0.1)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("5", "1.2", "10", false)}>5 + 6 + 7.2... (growth)</Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Geometric Series</h2>
        <p className="text-muted-foreground">
          A geometric series is the sum of the terms of a geometric sequence. While a sequence lists the numbers (2, 6, 18, 54...), a series adds them together (2 + 6 + 18 + 54 + ...). Geometric series appear in finance (present value of annuities), physics (total distance of bouncing ball), and pure mathematics.
        </p>
        <p className="text-muted-foreground">
          Infinite geometric series are fascinating – they can sum to a finite value even though they have infinitely many terms. This happens when the common ratio is between -1 and 1, causing terms to shrink toward zero fast enough that the sum converges.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Geometric Series Formulas</h3>
        <div className="p-6 bg-muted rounded-lg">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-sm mb-3">Finite Series Sum</h4>
              <div className="font-mono text-center p-3 bg-background rounded mb-3">
                Sₙ = a₁(1 - r^n) / (1 - r), for r ≠ 1
              </div>
              <p className="text-sm text-muted-foreground">
                Sum of the first n terms. When r = 1, all terms equal a₁, so Sₙ = n × a₁.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Infinite Series Sum</h4>
              <div className="font-mono text-center p-3 bg-background rounded mb-3">
                S∞ = a₁ / (1 - r), for |r| &lt; 1
              </div>
              <p className="text-sm text-muted-foreground">
                Only converges when the absolute value of r is less than 1. Otherwise, the sum diverges.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Finite Series (r = 0.5)</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Find: 1 + 1/2 + 1/4 + 1/8 + ... (10 terms)</div>
              <div>a₁ = 1, r = 0.5, n = 10</div>
              <div>S₁₀ = 1 × (1 - 0.5^10) / (1 - 0.5)</div>
              <div>S₁₀ = (1 - 0.0009766) / 0.5</div>
              <div>S₁₀ = 0.9990234 / 0.5 = 1.998</div>
              <div className="text-muted-foreground mt-2">Approaches 2 as n increases</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Infinite Series</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Find: 1 + 1/2 + 1/4 + 1/8 + ... (forever)</div>
              <div>a₁ = 1, r = 0.5</div>
              <div>|r| = 0.5 &lt; 1 ✓ (converges)</div>
              <div>S∞ = 1 / (1 - 0.5) = 1 / 0.5 = 2</div>
              <div className="text-muted-foreground mt-2">The infinite sum equals exactly 2!</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Growing Series (r = 3)</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Find: 2 + 6 + 18 + 54 + 162 + 486 (6 terms)</div>
              <div>a₁ = 2, r = 3, n = 6</div>
              <div>S₆ = 2 × (1 - 3^6) / (1 - 3)</div>
              <div>S₆ = 2 × (1 - 729) / (-2)</div>
              <div>S₆ = 2 × (-728) / (-2) = 728</div>
              <div className="text-muted-foreground mt-2">Verify: 2+6+18+54+162+486 = 728 ✓</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Zeno's Paradox</h4>
            <div className="text-sm space-y-2">
              <p>To walk across a room, you must first go halfway, then half of remaining, etc.</p>
              <div className="font-mono">1/2 + 1/4 + 1/8 + 1/16 + ...</div>
              <div className="font-mono">a₁ = 0.5, r = 0.5</div>
              <div className="font-mono">S∞ = 0.5 / (1 - 0.5) = 0.5 / 0.5 = 1</div>
              <p className="text-muted-foreground mt-2">You DO reach the other side! The infinite sum equals 1 (the whole distance).</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            Archimedes used geometric series around 250 BCE to calculate the area of a parabola. He showed that the area is 4/3 times the area of a certain triangle – essentially summing an infinite geometric series centuries before the formal concept existed.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does the infinite series only work for |r| &lt; 1?</h4>
            <p className="text-sm text-muted-foreground">
              When |r| ≥ 1, terms don't shrink – they stay the same size or grow. Adding infinitely many non-shrinking terms gives infinity. When |r| &lt; 1, terms approach zero fast enough that the sum converges to a finite value.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if r is negative?</h4>
            <p className="text-sm text-muted-foreground">
              For infinite series, we need |r| &lt; 1, so -1 &lt; r &lt; 1. With negative r, terms alternate signs but still converge. For example, 1 - 1/2 + 1/4 - 1/8 + ... = 1/(1-(-0.5)) = 2/3.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is this used in finance?</h4>
            <p className="text-sm text-muted-foreground">
              Present value calculations use geometric series. If you receive $100 yearly forever (a perpetuity) and discount at 5%, the present value is $100/0.05 = $2000. This is an infinite geometric series.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the connection to repeating decimals?</h4>
            <p className="text-sm text-muted-foreground">
              Repeating decimals are geometric series! 0.333... = 3/10 + 3/100 + 3/1000 + ... = (3/10)/(1-1/10) = 3/9 = 1/3. Every repeating decimal equals a fraction.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I find the sum starting from a term other than the first?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Find which term you're starting from, treat it as your new a₁, and adjust n accordingly. Or calculate the full sum and subtract the terms you don't want.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What happens when r = 1?</h4>
            <p className="text-sm text-muted-foreground">
              Every term equals a₁. The finite sum is n × a₁. The infinite series diverges (goes to infinity) unless a₁ = 0. The standard formula doesn't work because it divides by (1-r) = 0.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
