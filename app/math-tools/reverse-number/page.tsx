"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ReverseNumber() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    original: string;
    reversed: string;
    reversedNumber: number;
  } | null>(null);
  const [error, setError] = useState("");

  const reverseNumber = (num: string) => {
    const reversed = num.split("").reverse().join("");
    const reversedNum = parseInt(reversed);
    return { original: num, reversed, reversedNumber: reversedNum };
  };

  const calculate = () => {
    const num = number.trim();

    if (!num) {
      setError("Please enter a number");
      setResult(null);
      return;
    }

    if (!/^\d+$/.test(num)) {
      setError("Please enter a valid non-negative integer");
      setResult(null);
      return;
    }

    setError("");
    setResult(reverseNumber(num));
  };

  const reset = () => {
    setNumber("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Reverse Number Calculator – Flip Digits Instantly</h1>
        <p className="text-muted-foreground">
          Reverse any number's digits with our free online reverse number calculator. Perfect for math puzzles, palindromes, and number exploration.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Enter a number</Label>
          <Input
            type="text"
            placeholder="e.g., 12345"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Reverse Number</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Original Number</p>
                <p className="text-3xl font-mono font-bold">{result.original}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Reversed Number</p>
                <p className="text-3xl font-mono font-bold">{result.reversed}</p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">Step by Step</p>
              <div className="flex items-center gap-2 flex-wrap">
                {result.original.split("").map((digit, i) => (
                  <div key={i} className="flex items-center">
                    <span className="w-10 h-10 flex items-center justify-center bg-background border rounded font-mono">
                      {digit}
                    </span>
                    {i < result.original.length - 1 && (
                      <span className="mx-1 text-muted-foreground">→</span>
                    )}
                  </div>
                ))}
                <span className="mx-2 text-muted-foreground">=</span>
                {result.reversed.split("").map((digit, i) => (
                  <div key={i} className="flex items-center">
                    <span className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded font-mono">
                      {digit}
                    </span>
                    {i < result.reversed.length - 1 && (
                      <span className="mx-1 text-muted-foreground">→</span>
                    )}
                  </div>
                ))}
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
