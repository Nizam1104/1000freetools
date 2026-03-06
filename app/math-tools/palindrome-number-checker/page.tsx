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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What Is a Palindrome Number?</h2>
        <p className="text-muted-foreground">
          A palindrome number reads the same forwards and backwards. The word "palindrome" comes from Greek "palin" (again) and "dromos" (direction). Just like the words "radar" and "level," these numbers are symmetric.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h3 className="font-semibold mb-2">Examples</h3>
            <p className="text-sm font-mono mb-2">121, 1331, 12321, 45654</p>
            <p className="text-xs text-muted-foreground">
              121 → reverse → 121 ✓<br />
              12321 → reverse → 12321 ✓
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Not Palindromes</h3>
            <p className="text-sm font-mono mb-2">123, 1234, 9876</p>
            <p className="text-xs text-muted-foreground">
              123 → reverse → 321 ✗<br />
              1234 → reverse → 4321 ✗
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Palindrome Patterns</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Single Digits (0-9)</h3>
            <p className="text-sm text-muted-foreground">All single-digit numbers are palindromes</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Two-Digit Palindromes</h3>
            <p className="text-sm font-mono">11, 22, 33, 44, 55, 66, 77, 88, 99</p>
            <p className="text-xs text-muted-foreground mt-1">Only 9 two-digit palindromes exist (both digits must match)</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Three-Digit Palindromes</h3>
            <p className="text-sm font-mono mb-2">101, 111, 121, 131, ... 191, 202, 212, ... 999</p>
            <p className="text-xs text-muted-foreground">
              Pattern: ABA where A is 1-9 and B is 0-9<br />
              Total: 9 × 10 = 90 three-digit palindromes
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Four-Digit Palindromes</h3>
            <p className="text-sm font-mono mb-2">1001, 1111, 1221, ... 9999</p>
            <p className="text-xs text-muted-foreground">
              Pattern: ABBA where A is 1-9 and B is 0-9<br />
              Total: 9 × 10 = 90 four-digit palindromes
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Palindrome Properties</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Key Facts</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• All single digits are palindromes</li>
              <li>• Two-digit palindromes: 11, 22, 33... 99</li>
              <li>• Palindromes are symmetric around the center</li>
              <li>• Even-length palindromes are divisible by 11</li>
              <li>• There are infinitely many palindromic primes</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Fun Palindromes</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• 121 = 11² (palindromic square)</li>
              <li>• 1331 = 11³ (palindromic cube)</li>
              <li>• 12345678987654321 is a palindrome</li>
              <li>• Prime palindromes: 2, 3, 5, 7, 11, 101, 131...</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Palindrome Dates</h2>
        <p className="text-muted-foreground">
          Palindromes aren't just for numbers – dates can be palindromic too. In MMDDYYYY format, 12/02/2021 reads the same forwards and backwards.
        </p>
        <div className="space-y-2">
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-mono">10/02/2001 → 10022001</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-mono">11/11/1111 → 11111111</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-mono">12/02/2021 → 12022021</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What is a palindrome number?</h3>
          <p className="text-sm text-muted-foreground">
            A palindrome number reads identically forwards and backwards. Examples include 121, 1331, and 12321.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Is 0 a palindrome?</h3>
          <p className="text-sm text-muted-foreground">
            Yes, 0 is a palindrome. Single-digit numbers (0-9) all read the same forwards and backwards.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How do you check if a number is a palindrome?</h3>
          <p className="text-sm text-muted-foreground">
            Reverse the digits and compare to the original. If they match, it's a palindrome. For example, 12321 reversed is 12321 – same number.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Are negative numbers palindromes?</h3>
          <p className="text-sm text-muted-foreground">
            By convention, negative numbers aren't considered palindromes because the minus sign breaks the symmetry. -121 reversed would be 121-, which isn't the same.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's the largest palindrome number?</h3>
          <p className="text-sm text-muted-foreground">
            There's no largest palindrome – you can always create a bigger one. For any number n, you can make a palindrome by appending its reverse.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/armstrong-number-checker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Armstrong Number Checker</p>
            <p className="text-xs text-muted-foreground">Narcissistic numbers</p>
          </a>
          <a href="/math-tools/perfect-number-checker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Perfect Number Checker</p>
            <p className="text-xs text-muted-foreground">Sum of divisors</p>
          </a>
          <a href="/math-tools/prime-number-checker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Prime Number Checker</p>
            <p className="text-xs text-muted-foreground">Test if prime</p>
          </a>
        </div>
      </section>
    </div>
  );
}
