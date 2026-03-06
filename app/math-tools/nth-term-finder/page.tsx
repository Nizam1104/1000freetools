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
      setError("Please enter a valid position (n ≥ 1)");
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
        steps.push(`Given: a₁ = ${a1}, a₂ = ${a2}, n = ${n}`);
        steps.push(``);
        steps.push(`Step 1: Find the common difference`);
        steps.push(`d = a₂ - a₁ = ${a2} - ${a1} = ${d}`);
        steps.push(``);
        steps.push(`Step 2: Apply the nth term formula`);
        steps.push(`aₙ = a₁ + (n-1)d`);
        steps.push(`aₙ = ${a1} + (${n}-1) × ${d}`);
        steps.push(`aₙ = ${a1} + ${(n - 1) * d}`);
        steps.push(`aₙ = ${Math.round(nthTerm * 1000000) / 1000000}`);
        
        formula = `aₙ = ${a1} + (n-1) × ${d} = ${a1 > 0 ? a1 : `(${a1})`} ${d >= 0 ? '+' : '-'} ${Math.abs(d)}(n-1)`;
      } else {
        if (a1 === 0) {
          setError("First term cannot be 0 for geometric sequence");
          return;
        }
        const r = a2 / a1;
        nthTerm = a1 * Math.pow(r, n - 1);
        
        steps.push(`Geometric Sequence`);
        steps.push(`Given: a₁ = ${a1}, a₂ = ${a2}, n = ${n}`);
        steps.push(``);
        steps.push(`Step 1: Find the common ratio`);
        steps.push(`r = a₂ / a₁ = ${a2} / ${a1} = ${r}`);
        steps.push(``);
        steps.push(`Step 2: Apply the nth term formula`);
        steps.push(`aₙ = a₁ × r^(n-1)`);
        steps.push(`aₙ = ${a1} × ${r}^(${n}-1)`);
        steps.push(`aₙ = ${a1} × ${r}^${n - 1}`);
        steps.push(`aₙ = ${a1} × ${Math.pow(r, n - 1)}`);
        steps.push(`aₙ = ${Math.round(nthTerm * 1000000) / 1000000}`);
        
        formula = `aₙ = ${a1} × ${r}^(n-1)`;
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

  const loadExample = () => {
    if (sequenceType === "arithmetic") {
      setFirstTerm("3");
      setSecondTerm("7");
      setNthPosition("25");
    } else {
      setFirstTerm("2");
      setSecondTerm("6");
      setNthPosition("10");
    }
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">nth Term Finder – Find Any Term of a Sequence Online</h1>
        <p className="text-muted-foreground">
          Find the nth term of any arithmetic or geometric sequence with our free online nth term finder. Enter the first two terms to calculate any specific term instantly with step-by-step solutions.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
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
              <SelectItem value="geometric">Geometric (×r)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={loadExample}>Load Example</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>First Term (a₁):</Label>
            <Input
              type="number"
              placeholder="e.g., 3"
              value={firstTerm}
              onChange={(e) => setFirstTerm(e.target.value)}
            />
          </div>
          <div>
            <Label>Second Term (a₂):</Label>
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
              <p className="text-sm text-muted-foreground mb-2">Term {nthPosition} (aₙ)</p>
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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding nth Terms</h2>
        <p className="text-muted-foreground">
          The nth term formula allows you to find any term in a sequence without calculating all the previous terms. This is especially useful for finding terms at large positions like the 100th or 1000th term.
        </p>
        <p className="text-muted-foreground">
          For arithmetic sequences, each term increases by a constant difference. For geometric sequences, each term is multiplied by a constant ratio.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">nth Term Formulas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Arithmetic Sequence</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              aₙ = a₁ + (n-1)d
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Where d = a₂ - a₁ (common difference)
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Geometric Sequence</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              aₙ = a₁ × r^(n-1)
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Where r = a₂ / a₁ (common ratio)
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Examples</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Arithmetic Example</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Find the 50th term: 5, 9, 13, 17... (a₁ = 5, a₂ = 9)
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              d = 9 - 5 = 4<br/>
              a₅₀ = 5 + (50-1) × 4 = 5 + 196 = 201
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Geometric Example</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Find the 8th term: 3, 6, 12, 24... (a₁ = 3, a₂ = 6)
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              r = 6 / 3 = 2<br/>
              a₈ = 3 × 2^7 = 3 × 128 = 384
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I know if a sequence is arithmetic or geometric?</h3>
            <p className="text-sm text-muted-foreground">
              Check the pattern: if consecutive terms have a constant difference, it's arithmetic. If they have a constant ratio, it's geometric. Some sequences are neither.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can the common difference or ratio be negative?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! A negative difference creates a decreasing arithmetic sequence. A negative ratio creates an alternating geometric sequence (positive, negative, positive...).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What if I only know non-consecutive terms?</h3>
            <p className="text-sm text-muted-foreground">
              You can still find the pattern. For arithmetic: d = (aₘ - aₙ) / (m - n). For geometric: r = (aₘ / aₙ)^(1/(m-n)).
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/arithmetic-sequence-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Arithmetic Sequence</p>
            <p className="text-xs text-muted-foreground">Full sequence calculator</p>
          </a>
          <a href="/math-tools/geometric-sequence-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Geometric Sequence</p>
            <p className="text-xs text-muted-foreground">Full sequence calculator</p>
          </a>
          <a href="/math-tools/fibonacci-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Fibonacci Generator</p>
            <p className="text-xs text-muted-foreground">Special sequence</p>
          </a>
        </div>
      </section>
    </div>
  );
}
