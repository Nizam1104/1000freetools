"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NthTermFinder() {
  const [sequenceType, setSequenceType] = useState<"arithmetic" | "geometric">("arithmetic");
  const [firstTerm, setFirstTerm] = useState("");
  const [secondTerm, setSecondTerm] = useState("");
  const [nthPosition, setNthPosition] = useState("");
  const [result, setResult] = useState<{
    nthTerm: number;
    formula: string;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const examples = [
    { name: "Arithmetic +4", type: "arithmetic" as const, a1: "3", a2: "7", n: "25" },
    { name: "Arithmetic -3", type: "arithmetic" as const, a1: "50", a2: "47", n: "20" },
    { name: "Geometric x2", type: "geometric" as const, a1: "2", a2: "4", n: "10" },
    { name: "Geometric x3", type: "geometric" as const, a1: "1", a2: "3", n: "8" },
    { name: "Geometric Fraction", type: "geometric" as const, a1: "100", a2: "50", n: "6" },
    { name: "Large Position", type: "arithmetic" as const, a1: "5", a2: "9", n: "100" },
    { name: "Negative Start", type: "arithmetic" as const, a1: "-10", a2: "-5", n: "15" }
  ];

  const calculate = () => {
    setError("");
    setResult(null);

    const a1 = parseFloat(firstTerm);
    const a2 = parseFloat(secondTerm);
    const n = parseInt(nthPosition);

    if (isNaN(a1) || isNaN(a2)) {
      setError("Please enter valid numbers for the first two terms");
      return;
    }

    if (isNaN(n) || n < 1) {
      setError("Please enter a valid position (n >= 1)");
      return;
    }

    try {
      let nthTerm: number;
      let formula: string;
      const steps: string[] = [];

      if (sequenceType === "arithmetic") {
        const d = a2 - a1;
        nthTerm = a1 + (n - 1) * d;

        steps.push(`Arithmetic Sequence`);
        steps.push(`Given: a1 = ${a1}, a2 = ${a2}, n = ${n}`);
        steps.push(``);
        steps.push(`Step 1: Find the common difference`);
        steps.push(`d = a2 - a1 = ${a2} - ${a1} = ${d}`);
        steps.push(``);
        steps.push(`Step 2: Apply the nth term formula`);
        steps.push(`an = a1 + (n-1)d`);
        steps.push(`an = ${a1} + (${n}-1) x ${d}`);
        steps.push(`an = ${a1} + ${(n - 1) * d}`);
        steps.push(`an = ${Math.round(nthTerm * 1000000) / 1000000}`);

        formula = `an = ${a1} + (n-1) x ${d} = ${a1 > 0 ? a1 : `(${a1})`} ${d >= 0 ? '+' : '-'} ${Math.abs(d)}(n-1)`;
      } else {
        if (a1 === 0) {
          setError("First term cannot be 0 for geometric sequence");
          return;
        }
        const r = a2 / a1;
        nthTerm = a1 * Math.pow(r, n - 1);

        steps.push(`Geometric Sequence`);
        steps.push(`Given: a1 = ${a1}, a2 = ${a2}, n = ${n}`);
        steps.push(``);
        steps.push(`Step 1: Find the common ratio`);
        steps.push(`r = a2 / a1 = ${a2} / ${a1} = ${r}`);
        steps.push(``);
        steps.push(`Step 2: Apply the nth term formula`);
        steps.push(`an = a1 x r^(n-1)`);
        steps.push(`an = ${a1} x ${r}^(${n}-1)`);
        steps.push(`an = ${a1} x ${r}^${n - 1}`);
        steps.push(`an = ${a1} x ${Math.pow(r, n - 1)}`);
        steps.push(`an = ${Math.round(nthTerm * 1000000) / 1000000}`);

        formula = `an = ${a1} x ${r}^(n-1)`;
      }

      setResult({
        nthTerm: Math.round(nthTerm * 1000000) / 1000000,
        formula,
        steps
      });
    } catch (e) {
      setError("Unable to calculate. Please check your inputs.");
    }
  };

  const reset = () => {
    setFirstTerm("");
    setSecondTerm("");
    setNthPosition("");
    setResult(null);
    setError("");
  };

  const loadExample = (index: number) => {
    const ex = examples[index];
    setSequenceType(ex.type);
    setFirstTerm(ex.a1);
    setSecondTerm(ex.a2);
    setNthPosition(ex.n);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">nth Term Finder – Find Any Term of a Sequence Online</h1>
        <p className="text-muted-foreground">
          Find the nth term of any arithmetic or geometric sequence with our free online nth term finder. Enter the first two terms to calculate any specific term instantly with step-by-step solutions.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Label>Sequence Type:</Label>
            <Select value={sequenceType} onValueChange={(v) => {
              setSequenceType(v as typeof sequenceType);
              setResult(null);
              setError("");
            }}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arithmetic">Arithmetic (+d)</SelectItem>
                <SelectItem value="geometric">Geometric (xr)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Examples:</span>
            {examples.map((ex, idx) => (
              <Button key={idx} variant="outline" size="sm" onClick={() => loadExample(idx)}>{ex.name}</Button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>First Term (a1):</Label>
              <Input
                type="number"
                placeholder="e.g., 3"
                value={firstTerm}
                onChange={(e) => setFirstTerm(e.target.value)}
              />
            </div>
            <div>
              <Label>Second Term (a2):</Label>
              <Input
                type="number"
                placeholder="e.g., 7"
                value={secondTerm}
                onChange={(e) => setSecondTerm(e.target.value)}
              />
            </div>
            <div>
              <Label>Find Term Number (n):</Label>
              <Input
                type="number"
                placeholder="e.g., 25"
                value={nthPosition}
                onChange={(e) => setNthPosition(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculate}>Find nth Term</Button>
            <Button variant="outline" onClick={reset}>Reset</Button>
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-md">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Term {nthPosition} (an)</p>
                <p className="text-5xl font-bold">{result.nthTerm}</p>
                <p className="text-sm text-muted-foreground mt-2 font-mono">{result.formula}</p>
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
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Sequences and nth Terms</h2>
        <p className="text-muted-foreground">
          A sequence is an ordered list of numbers following a pattern. The nth term formula lets you find any term in the sequence without calculating all the previous terms. This is essential for finding distant terms like the 100th or 1000th term efficiently.
        </p>
        <p className="text-muted-foreground">
          There are two main types of sequences: arithmetic (adding a constant each time) and geometric (multiplying by a constant each time). Each has its own nth term formula that we'll explore below.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Sequence Formulas</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Arithmetic Sequence</h4>
            <code className="text-sm font-mono block">an = a1 + (n-1)d</code>
            <p className="text-xs text-muted-foreground mt-2">
              where d = common difference = a2 - a1
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Example: 3, 7, 11, 15... (d = 4)
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Geometric Sequence</h4>
            <code className="text-sm font-mono block">an = a1 x r^(n-1)</code>
            <p className="text-xs text-muted-foreground mt-2">
              where r = common ratio = a2 / a1
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Example: 2, 6, 18, 54... (r = 3)
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Arithmetic Sequence</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Sequence: 3, 7, 11, 15... Find the 25th term</div>
              <div>a1 = 3, d = 7-3 = 4</div>
              <div>a25 = 3 + (25-1)(4)</div>
              <div>a25 = 3 + 96 = 99</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Decreasing Arithmetic</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Sequence: 50, 47, 44... Find the 20th term</div>
              <div>a1 = 50, d = 47-50 = -3</div>
              <div>a20 = 50 + (20-1)(-3)</div>
              <div>a20 = 50 - 57 = -7</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Geometric Sequence</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Sequence: 2, 6, 18, 54... Find the 10th term</div>
              <div>a1 = 2, r = 6/2 = 3</div>
              <div>a10 = 2 x 3^(10-1)</div>
              <div>a10 = 2 x 3^9 = 2 x 19683 = 39,366</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Geometric Decay</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Sequence: 100, 50, 25... Find the 6th term</div>
              <div>a1 = 100, r = 50/100 = 0.5</div>
              <div>a6 = 100 x (0.5)^(6-1)</div>
              <div>a6 = 100 x 0.03125 = 3.125</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm">
            The Fibonacci sequence (1, 1, 2, 3, 5, 8...) is neither arithmetic nor geometric – each term is the sum of the two previous terms. It has its own special nth term formula called Binet's formula, which involves the golden ratio φ = (1 + √5)/2.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I know if a sequence is arithmetic or geometric?</h4>
            <p className="text-sm text-muted-foreground">
              Check the differences between consecutive terms. If they're constant, it's arithmetic. If the ratios between consecutive terms are constant, it's geometric. If neither, it might be a different type of sequence.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the common difference or ratio be negative?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! A negative common difference creates a decreasing arithmetic sequence. A negative common ratio creates an alternating sequence (positive, negative, positive...). A ratio between -1 and 1 causes the terms to approach zero.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if the first term is 0 in a geometric sequence?</h4>
            <p className="text-sm text-muted-foreground">
              If a1 = 0, every term in a geometric sequence is 0 (since you keep multiplying by r). This is a trivial case. Also, you can't find r by dividing a2/a1 if a1 = 0.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I find which term equals a specific value?</h4>
            <p className="text-sm text-muted-foreground">
              Set the nth term formula equal to your target value and solve for n. For arithmetic: n = (target - a1)/d + 1. For geometric: n = log_r(target/a1) + 1.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What are real-world applications of sequences?</h4>
            <p className="text-sm text-muted-foreground">
              Arithmetic sequences model linear growth (salary increases, depreciation). Geometric sequences model exponential growth/decay (population, compound interest, radioactive decay). Both appear in computer science algorithms and financial calculations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can n be a decimal or negative?</h4>
            <p className="text-sm text-muted-foreground">
              In standard sequence notation, n represents a position and must be a positive integer (1, 2, 3...). However, the formulas can be extended to real values for interpolation or continuous models.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
