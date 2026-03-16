"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function NumberSequenceSolver() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ type: string; next: number[]; rule: string } | null>(null);
  const [error, setError] = useState("");

  const parseSequence = (str: string) => {
    return str.split(/[\s,]+/).map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
  };

  const detectArithmetic = (seq: number[]) => {
    if (seq.length < 3) return null;
    const diff = seq[1] - seq[0];
    for (let i = 2; i < seq.length; i++) {
      if (seq[i] - seq[i - 1] !== diff) return null;
    }
    return { diff };
  };

  const detectGeometric = (seq: number[]) => {
    if (seq.length < 3 || seq.includes(0)) return null;
    const ratio = seq[1] / seq[0];
    for (let i = 2; i < seq.length; i++) {
      if (Math.abs(seq[i] / seq[i - 1] - ratio) > 0.0001) return null;
    }
    return { ratio };
  };

  const detectFibonacci = (seq: number[]) => {
    if (seq.length < 3) return null;
    for (let i = 2; i < seq.length; i++) {
      if (seq[i] !== seq[i - 1] + seq[i - 2]) return null;
    }
    return {};
  };

  const detectSquare = (seq: number[]) => {
    const squares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];
    if (seq.every((n, i) => squares[i] === n)) {
      return { start: 1 };
    }
    return null;
  };

  const detectCube = (seq: number[]) => {
    const cubes = [1, 8, 27, 64, 125, 216, 343];
    if (seq.every((n, i) => cubes[i] === n)) {
      return { start: 1 };
    }
    return null;
  };

  const detectPrime = (seq: number[]) => {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
    if (seq.every((n, i) => primes[i] === n)) {
      return {};
    }
    return null;
  };

  const analyzeSequence = (seq: number[]) => {
    // Try arithmetic
    const arithmetic = detectArithmetic(seq);
    if (arithmetic) {
      const next = Array.from({ length: 3 }, (_, i) => 
        seq[seq.length - 1] + arithmetic.diff * (i + 1)
      );
      return {
        type: "Arithmetic Sequence",
        next,
        rule: `Common difference: ${arithmetic.diff}`,
      };
    }

    // Try geometric
    const geometric = detectGeometric(seq);
    if (geometric) {
      const next = Array.from({ length: 3 }, (_, i) => 
        seq[seq.length - 1] * Math.pow(geometric.ratio, i + 1)
      );
      return {
        type: "Geometric Sequence",
        next: next.map((n) => Math.round(n * 1000) / 1000),
        rule: `Common ratio: ${geometric.ratio.toFixed(3)}`,
      };
    }

    // Try Fibonacci
    if (detectFibonacci(seq)) {
      const next = [];
      let a = seq[seq.length - 2], b = seq[seq.length - 1];
      for (let i = 0; i < 3; i++) {
        const c = a + b;
        next.push(c);
        a = b;
        b = c;
      }
      return {
        type: "Fibonacci Sequence",
        next,
        rule: "Each number is the sum of the two preceding ones",
      };
    }

    // Try square numbers
    if (detectSquare(seq)) {
      const start = seq.length;
      const next = Array.from({ length: 3 }, (_, i) => Math.pow(start + i + 1, 2));
      return {
        type: "Square Numbers",
        next,
        rule: "n² where n = 1, 2, 3, ...",
      };
    }

    // Try cube numbers
    if (detectCube(seq)) {
      const start = seq.length;
      const next = Array.from({ length: 3 }, (_, i) => Math.pow(start + i + 1, 3));
      return {
        type: "Cube Numbers",
        next,
        rule: "n³ where n = 1, 2, 3, ...",
      };
    }

    // Try prime numbers
    if (detectPrime(seq)) {
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
      const startIdx = seq.length;
      const next = primes.slice(startIdx, startIdx + 3);
      return {
        type: "Prime Numbers",
        next,
        rule: "Numbers divisible only by 1 and themselves",
      };
    }

    return null;
  };

  const handleSolve = () => {
    const seq = parseSequence(input);
    
    if (seq.length < 3) {
      setError("Please enter at least 3 numbers");
      setResult(null);
      return;
    }
    
    setError("");
    const analysis = analyzeSequence(seq);
    
    if (analysis) {
      setResult(analysis);
    } else {
      setResult(null);
      setError("Could not detect a pattern. Try a different sequence.");
    }
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Number Sequence Solver</h2>
        <p className="text-sm text-muted-foreground">
          Identify patterns and predict the next numbers in a sequence
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="input">Number Sequence</Label>
        <Input
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="2, 4, 6, 8 or 1 2 4 8 16"
        />
        <div className="flex gap-2">
          <Button onClick={handleSolve} className="flex-1">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Solve
          </Button>
          <Button variant="outline" onClick={handleClear}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {error && (
        <Card className="p-4 border-destructive">
          <p className="text-destructive">{error}</p>
        </Card>
      )}

      {result && (
        <div className="space-y-4">
          <Card className="p-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Sequence Type</Label>
              <div className="text-xl font-bold">{result.type}</div>
              <div className="text-muted-foreground">{result.rule}</div>
            </div>
          </Card>

          <Card className="p-4">
            <Label className="text-sm text-muted-foreground">Next Numbers</Label>
            <div className="flex gap-4 mt-2">
              {result.next.map((n, i) => (
                <div key={i} className="flex-1 text-center p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Position {i + 1}</div>
                  <div className="text-2xl font-bold font-mono">{n}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Supported Patterns</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="bg-muted p-3 rounded">
            <div className="font-semibold">Arithmetic</div>
            <div className="text-sm text-muted-foreground">2, 4, 6, 8... (diff: +2)</div>
          </div>
          <div className="bg-muted p-3 rounded">
            <div className="font-semibold">Geometric</div>
            <div className="text-sm text-muted-foreground">2, 4, 8, 16... (ratio: ×2)</div>
          </div>
          <div className="bg-muted p-3 rounded">
            <div className="font-semibold">Fibonacci</div>
            <div className="text-sm text-muted-foreground">1, 1, 2, 3, 5, 8...</div>
          </div>
          <div className="bg-muted p-3 rounded">
            <div className="font-semibold">Square Numbers</div>
            <div className="text-sm text-muted-foreground">1, 4, 9, 16, 25...</div>
          </div>
          <div className="bg-muted p-3 rounded">
            <div className="font-semibold">Cube Numbers</div>
            <div className="text-sm text-muted-foreground">1, 8, 27, 64...</div>
          </div>
          <div className="bg-muted p-3 rounded">
            <div className="font-semibold">Prime Numbers</div>
            <div className="text-sm text-muted-foreground">2, 3, 5, 7, 11...</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
