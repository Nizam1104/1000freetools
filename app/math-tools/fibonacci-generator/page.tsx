"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FibonacciGenerator() {
  const [mode, setMode] = useState<"sequence" | "nth">("sequence");
  const [terms, setTerms] = useState("");
  const [result, setResult] = useState<{
    sequence?: number[];
    nthValue?: number;
    n: number;
  } | null>(null);
  const [error, setError] = useState("");

  const generateFibonacci = (n: number): number[] => {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const seq = [0, 1];
    for (let i = 2; i < n; i++) {
      seq.push(seq[i - 1] + seq[i - 2]);
    }
    return seq;
  };

  const getNthFibonacci = (n: number): number => {
    if (n <= 0) return 0;
    if (n === 1) return 0;
    if (n === 2) return 1;

    let a = 0, b = 1;
    for (let i = 3; i <= n; i++) {
      const temp = a + b;
      a = b;
      b = temp;
    }
    return b;
  };

  const calculate = () => {
    const n = parseInt(terms);

    if (isNaN(n) || n <= 0) {
      setError("Please enter a positive integer");
      setResult(null);
      return;
    }

    if (n > 1000) {
      setError("Please enter a number up to 1000 for performance reasons");
      setResult(null);
      return;
    }

    setError("");

    if (mode === "sequence") {
      setResult({
        sequence: generateFibonacci(n),
        n,
      });
    } else {
      setResult({
        nthValue: getNthFibonacci(n),
        n,
      });
    }
  };

  const reset = () => {
    setTerms("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Fibonacci Sequence Generator – Calculate Fibonacci Numbers Online</h1>
        <p className="text-muted-foreground">
          Generate the Fibonacci sequence up to any number of terms or find the nth Fibonacci number with our free online Fibonacci calculator. Fast and accurate for any value of n.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Mode</Label>
          <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sequence">Generate Sequence (first n terms)</SelectItem>
              <SelectItem value="nth">Find nth Fibonacci Number</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>{mode === "sequence" ? "Number of Terms" : "Position (n)"}</Label>
          <Input
            type="number"
            placeholder={mode === "sequence" ? "e.g., 10" : "e.g., 10"}
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {mode === "sequence" && result.sequence && (
              <div className="p-6 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-3">First {result.n} Fibonacci Numbers</p>
                <div className="flex flex-wrap gap-2">
                  {result.sequence.map((num, idx) => (
                    <div key={idx} className="px-3 py-2 bg-background rounded-lg border text-center min-w-[60px]">
                      <p className="text-xs text-muted-foreground">F({idx})</p>
                      <p className="font-semibold">{num}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Sequence: {result.sequence.join(", ")}
                </p>
              </div>
            )}

            {mode === "nth" && result.nthValue !== undefined && (
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">The {result.n}{result.n === 1 ? "st" : result.n === 2 ? "nd" : result.n === 3 ? "rd" : "th"} Fibonacci Number</p>
                <p className="text-5xl font-bold">{result.nthValue}</p>
                <p className="text-sm text-muted-foreground mt-2 font-mono">
                  F({result.n}) = {result.nthValue}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is the Fibonacci Sequence?</h2>
        <p className="text-muted-foreground">
          The Fibonacci sequence is a series where each number is the sum of the two preceding ones. Starting with 0 and 1, the sequence goes: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Mathematical Definition</p>
          <p className="text-sm font-mono">F(0) = 0</p>
          <p className="text-sm font-mono">F(1) = 1</p>
          <p className="text-sm font-mono">F(n) = F(n-1) + F(n-2) for n &gt; 1</p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Fibonacci in Nature</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Flower Petals</h3>
            <p className="text-xs text-muted-foreground">
              Lilies have 3 petals, buttercups have 5, chicory has 21, and daisies often have 34 or 55 – all Fibonacci numbers.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Spiral Patterns</h3>
            <p className="text-xs text-muted-foreground">
              Sunflower seeds, pinecones, and pineapples show spiral patterns that follow Fibonacci numbers.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Golden Ratio</h3>
            <p className="text-xs text-muted-foreground">
              The ratio of consecutive Fibonacci numbers approaches the golden ratio φ ≈ 1.618 as n increases.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">First 20 Fibonacci Numbers</h2>
        <div className="grid grid-cols-5 gap-2">
          {generateFibonacci(20).map((num, idx) => (
            <div key={idx} className="p-3 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground">F({idx})</p>
              <p className="font-semibold">{num}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Fibonacci Properties</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Key Facts</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• F(n) = F(n-1) + F(n-2)</li>
              <li>• F(0) = 0, F(1) = 1</li>
              <li>• Every 3rd number is even</li>
              <li>• Every 4th number is divisible by 3</li>
              <li>• Every 5th number is divisible by 5</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Golden Ratio Connection</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• lim F(n+1)/F(n) = φ ≈ 1.618</li>
              <li>• F(n) ≈ φⁿ/√5 (Binet's formula)</li>
              <li>• Appears in art, architecture, nature</li>
              <li>• Considered aesthetically pleasing</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What is the Fibonacci sequence?</h3>
          <p className="text-sm text-muted-foreground">
            The Fibonacci sequence is a series where each number is the sum of the two preceding numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21...
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is the 10th Fibonacci number?</h3>
          <p className="text-sm text-muted-foreground">
            The 10th Fibonacci number (F(9) if starting from F(0)=0) is 34. The sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Where is Fibonacci used in real life?</h3>
          <p className="text-sm text-muted-foreground">
            Fibonacci appears in nature (flower petals, shells), art and architecture (golden ratio), computer algorithms, and financial market analysis.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is the golden ratio?</h3>
          <p className="text-sm text-muted-foreground">
            The golden ratio (φ ≈ 1.618) is the limit of the ratio of consecutive Fibonacci numbers. It appears in geometry, art, and nature.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/prime-number-checker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Prime Number Checker</p>
            <p className="text-xs text-muted-foreground">Test if prime</p>
          </a>
          <a href="/math-tools/scientific-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Scientific Calculator</p>
            <p className="text-xs text-muted-foreground">Advanced calculations</p>
          </a>
          <a href="/math-tools/number-base-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Number Base Converter</p>
            <p className="text-xs text-muted-foreground">Convert between bases</p>
          </a>
        </div>
      </section>
    </div>
  );
}
