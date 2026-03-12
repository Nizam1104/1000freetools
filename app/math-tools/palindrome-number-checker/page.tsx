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

  const examples = [
    { name: "Simple Palindrome", num: "121" },
    { name: "Single Digit", num: "7" },
    { name: "Not Palindrome", num: "123" },
    { name: "Large Palindrome", num: "12321" },
    { name: "Even Digits", num: "1221" },
    { name: "All Same", num: "5555" },
    { name: "Zero", num: "0" }
  ];

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

  const loadExample = (index: number) => {
    setNumber(examples[index].num);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Palindrome Number Checker – Is It a Palindrome?</h1>
        <p className="text-muted-foreground">
          Check if any number is a palindrome with our free online palindrome number checker. Instantly determine whether a number reads the same in both directions.
        </p>
      </div>

      <div className="space-y-4">
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

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Examples:</span>
            {examples.map((ex, idx) => (
              <Button key={idx} variant="outline" size="sm" onClick={() => loadExample(idx)}>{ex.name}</Button>
            ))}
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Palindrome Numbers</h2>
        <p className="text-muted-foreground">
          A palindrome is a number that reads the same forwards and backwards. Just like the words "radar," "level," and "racecar," palindrome numbers have symmetry in their digits. The term comes from the Greek "palindromos," meaning "running back again."
        </p>
        <p className="text-muted-foreground">
          Palindrome numbers appear in mathematics, computer science, and even nature. They're fun mathematical curiosities that also have practical applications in error detection and data validation algorithms.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Palindrome Properties</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Single Digits</h4>
            <p className="text-sm text-muted-foreground">
              All single-digit numbers (0-9) are palindromes. They read the same forwards and backwards trivially.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Two Digits</h4>
            <p className="text-sm text-muted-foreground">
              Two-digit palindromes have identical digits: 11, 22, 33, 44, 55, 66, 77, 88, 99.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Symmetry</h4>
            <p className="text-sm text-muted-foreground">
              For longer palindromes, the first half mirrors the second half. In 12321, "12" mirrors "21".
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Three-Digit Palindrome</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Number: 121</div>
              <div>Reverse: 121</div>
              <div>Compare: 121 = 121 ✓</div>
              <div className="text-green-600">Result: Palindrome!</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Five-Digit Palindrome</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Number: 12321</div>
              <div>Reverse: 12321</div>
              <div>Compare: 12321 = 12321 ✓</div>
              <div className="text-green-600">Result: Palindrome!</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Not a Palindrome</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Number: 123</div>
              <div>Reverse: 321</div>
              <div>Compare: 123 ≠ 321 ✗</div>
              <div className="text-muted-foreground">Result: Not a palindrome</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Even-Digit Palindrome</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Number: 1221</div>
              <div>Reverse: 1221</div>
              <div>Compare: 1221 = 1221 ✓</div>
              <div className="text-green-600">Result: Palindrome!</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Palindrome Patterns</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Palindromic Squares</h4>
            <p className="text-sm text-muted-foreground mb-2">Some perfect squares are palindromes:</p>
            <div className="font-mono text-sm space-y-1">
              <div>1² = 1 (palindrome)</div>
              <div>2² = 4 (palindrome)</div>
              <div>3² = 9 (palindrome)</div>
              <div>11² = 121 (palindrome!)</div>
              <div>22² = 484 (palindrome!)</div>
              <div>26² = 676 (palindrome!)</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Creating Palindromes</h4>
            <p className="text-sm text-muted-foreground mb-2">Take any number and add its reverse:</p>
            <div className="font-mono text-sm space-y-1">
              <div>56 + 65 = 121 (palindrome in 1 step!)</div>
              <div>57 + 75 = 132, then 132 + 231 = 363 (2 steps)</div>
              <div className="text-muted-foreground">Some numbers take many steps (196 may never produce one!)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm">
            The largest known palindromic prime has over 400,000 digits! Palindromic primes are prime numbers that are also palindromes. Examples include 2, 3, 5, 7, 11, 101, 131, 151... The search for large palindromic primes is an active area of recreational mathematics.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Are negative numbers palindromes?</h4>
            <p className="text-sm text-muted-foreground">
              By convention, we typically don't consider negative numbers as palindromes because the minus sign breaks the symmetry. -121 reversed would be 121-, which isn't the same. This checker only accepts non-negative integers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is 0 a palindrome?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! Zero is a single-digit number, and all single-digit numbers are palindromes. Reading "0" forwards or backwards gives "0".
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How many palindromes are there?</h4>
            <p className="text-sm text-muted-foreground">
              Infinitely many! For any number of digits, you can construct palindromes. For n digits: 9 palindromes for n=1, 9 for n=2, 90 for n=3, 90 for n=4, and so on.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What are palindrome dates?</h4>
            <p className="text-sm text-muted-foreground">
              Dates that read the same forwards and backwards. For example, 02/02/2020 or 12/02/2021 (in DD/MM/YYYY format). These are fun calendar curiosities that happen occasionally.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can decimals be palindromes?</h4>
            <p className="text-sm text-muted-foreground">
              If you include the decimal point, technically yes (like 12.21), but this is unusual. Typically, palindrome discussions focus on integers. This checker handles whole numbers only.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the 196 algorithm?</h4>
            <p className="text-sm text-muted-foreground">
              Start with a number, add its reverse, and repeat. Most numbers become palindromes quickly. But 196 has been tested for billions of iterations without producing a palindrome. It might be a "Lychrel number" that never produces one!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
