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
      </section>
    </div>
  );
}
