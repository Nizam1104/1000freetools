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
        <h2 className="text-2xl font-semibold">What Does It Mean to Reverse a Number?</h2>
        <p className="text-muted-foreground">
          Reversing a number means writing its digits in opposite order. The rightmost digit becomes the leftmost, and vice versa. For example, reversing 12345 gives you 54321.
        </p>
        <p className="text-muted-foreground">
          This simple operation shows up in math puzzles, programming challenges, and number theory. It's also the key to understanding palindromic numbers – numbers that read the same forwards and backwards, like 121 or 1331.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-sm mb-2">Examples</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="p-2 bg-background rounded border">
              <span className="text-muted-foreground">123 → </span>
              <span className="font-mono font-bold">321</span>
            </div>
            <div className="p-2 bg-background rounded border">
              <span className="text-muted-foreground">9876 → </span>
              <span className="font-mono font-bold">6789</span>
            </div>
            <div className="p-2 bg-background rounded border">
              <span className="text-muted-foreground">100 → </span>
              <span className="font-mono font-bold">001 = 1</span>
            </div>
            <div className="p-2 bg-background rounded border">
              <span className="text-muted-foreground">505 → </span>
              <span className="font-mono font-bold">505</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">How to Reverse a Number</h2>
        <p className="text-muted-foreground">
          Reversing a number is straightforward. Here's the process:
        </p>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Method 1: Write and Flip</h3>
            <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
              <li>Write down the number</li>
              <li>Read the digits from right to left</li>
              <li>Write them in that order</li>
              <li>Remove any leading zeros from the result</li>
            </ol>
            <p className="text-xs font-mono mt-2">Example: 4567 → read right to left → 7654</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Method 2: Mathematical Approach</h3>
            <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
              <li>Get the last digit using modulo 10</li>
              <li>Add it to the reversed number (multiply reversed by 10 first)</li>
              <li>Remove the last digit from original (divide by 10)</li>
              <li>Repeat until original becomes 0</li>
            </ol>
            <p className="text-xs font-mono mt-2">Example: 123 → 3, then 32, then 321</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Interesting Number Patterns</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Palindromic Numbers</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Numbers that stay the same when reversed:
            </p>
            <p className="text-sm font-mono">1, 2, 3... 9, 11, 22, 33... 101, 111, 121...</p>
            <p className="text-xs text-muted-foreground mt-2">
              These are called palindromes. They're symmetric around their center digit.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Reverse and Add</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Add a number to its reverse, repeat until you get a palindrome:
            </p>
            <p className="text-xs font-mono">
              56 + 65 = 121 (palindrome!)<br />
              125 + 521 = 646 (palindrome!)<br />
              89 + 98 = 187 → 187 + 781 = 968 → ... (takes 24 steps!)
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Kaprekar's Routine</h3>
            <p className="text-sm text-muted-foreground mb-2">
              For 4-digit numbers, arrange digits high to low, subtract reverse:
            </p>
            <p className="text-xs font-mono">
              3524 → 5432 - 2345 = 3087<br />
              3087 → 8730 - 0378 = 8352<br />
              8352 → 8532 - 2358 = 6174 (Kaprekar's constant!)
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Zero Handling</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Leading zeros disappear when reversed:
            </p>
            <p className="text-xs font-mono">
              100 → 001 = 1<br />
              2030 → 0302 = 302<br />
              1000 → 0001 = 1
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Uses of Number Reversal</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Programming Challenges</h3>
            <p className="text-sm text-muted-foreground">
              Reversing numbers is a common beginner programming exercise. It teaches loops, modulo operations, and integer manipulation. Many coding interview questions involve digit reversal.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Math Puzzles</h3>
            <p className="text-sm text-muted-foreground">
              Number reversal appears in recreational math puzzles. Find numbers where the reverse is double the original, or where adding a number to its reverse creates a palindrome.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Checksums and Validation</h3>
            <p className="text-sm text-muted-foreground">
              Some identification numbers use digit manipulation (including reversal) as part of their checksum algorithms to detect errors.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What happens when you reverse a number ending in zero?</h3>
          <p className="text-sm text-muted-foreground">
            Leading zeros are dropped. For example, reversing 100 gives 001, which is just 1. The zeros at the end of the original number become leading zeros in the reversed number and don't affect the value.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can you reverse negative numbers?</h3>
          <p className="text-sm text-muted-foreground">
            This calculator handles non-negative integers only. Mathematically, you could reverse -123 as -321, keeping the negative sign. But by convention, we typically work with the absolute value.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's a palindromic number?</h3>
          <p className="text-sm text-muted-foreground">
            A palindromic number reads the same forwards and backwards. Examples include 121, 1331, and 12321. These numbers are their own reverse.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Is there a largest number that equals its reverse?</h3>
          <p className="text-sm text-muted-foreground">
            No – there are infinitely many palindromic numbers. You can always create a bigger one by adding matching digits on both ends, like going from 121 to 11211.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is Kaprekar's constant?</h3>
          <p className="text-sm text-muted-foreground">
            Take any 4-digit number with at least two different digits. Arrange digits high to low, subtract the reverse arrangement, and repeat. You'll always reach 6174 within 7 steps. This is Kaprekar's constant.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/palindrome-number-checker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Palindrome Number Checker</p>
            <p className="text-xs text-muted-foreground">Check if number reads same forwards</p>
          </a>
          <a href="/math-tools/digit-sum-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Digit Sum Calculator</p>
            <p className="text-xs text-muted-foreground">Sum of all digits</p>
          </a>
          <a href="/math-tools/number-sorter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Number Sorter</p>
            <p className="text-xs text-muted-foreground">Sort numbers ascending or descending</p>
          </a>
        </div>
      </section>
    </div>
  );
}
