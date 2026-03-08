"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PalindromeNumberChecker() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    isPalindrome: boolean;
    reversed: string;
    explanation: string;
  } | null>(null);
  const [error, setError] = useState("");

  const checkPalindrome = (num: string) => {
    const reversed = num.split("").reverse().join("");
    const isPalindrome = num === reversed;

    let explanation: string;
    if (isPalindrome) {
      explanation = `${num} reads the same forwards and backwards`;
    } else {
      explanation = `${num} reversed is ${reversed} – not the same`;
    }

    return {
      isPalindrome,
      reversed,
      explanation,
    };
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
    setResult(checkPalindrome(num));
  };

  const reset = () => {
    setNumber("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Palindrome Number Checker – Is It a Palindrome?</h1>
        <p className="text-muted-foreground">
          Check if any number is a palindrome with our free online palindrome number checker. Instantly determine whether a number reads the same in both directions.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number</Label>
          <Input
            type="text"
            placeholder="Enter a number (e.g., 12321)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Check Palindrome</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg text-center ${result.isPalindrome ? "bg-green-500/10 border border-green-500/30" : "bg-muted"}`}>
              <p className={`text-5xl font-bold mb-2 ${result.isPalindrome ? "text-green-600" : ""}`}>
                {result.isPalindrome ? "Palindrome" : "Not Palindrome"}
              </p>
              <p className="text-sm text-muted-foreground">{result.explanation}</p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">Comparison</p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-background rounded border">
                  <p className="text-xs text-muted-foreground mb-1">Original</p>
                  <p className="text-2xl font-mono">{number}</p>
                </div>
                <div className="p-3 bg-background rounded border">
                  <p className="text-xs text-muted-foreground mb-1">Reversed</p>
                  <p className="text-2xl font-mono">{result.reversed}</p>
                </div>
              </div>
            </div>

            {!result.isPalindrome && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-semibold mb-2">How to Make It a Palindrome</p>
                <p className="text-sm text-muted-foreground">
                  Append the reverse to create: <span className="font-mono">{number}{result.reversed}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Or prepend: <span className="font-mono">{result.reversed}{number}</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
