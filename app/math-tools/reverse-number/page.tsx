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

  const loadExample = (num: string) => {
    setNumber(num);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Reverse Number Calculator - Flip Digits Instantly</h1>
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

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Reverse Number</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("12345")}>12345</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1000")}>1000</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("12321")}>12321 (palindrome)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("987654321")}>987654321</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1089")}>1089</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("7")}>Single digit</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2024")}>Year 2024</Button>
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

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Number of Digits</p>
                <p className="text-2xl font-bold">{result.original.length}</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">First Digit</p>
                <p className="text-2xl font-bold">{result.original[0]}</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Last Digit</p>
                <p className="text-2xl font-bold">{result.original[result.original.length - 1]}</p>
              </div>
            </div>

            {result.original === result.reversed && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                <p className="text-lg font-semibold text-green-600">🎉 This is a Palindrome!</p>
                <p className="text-sm text-muted-foreground">The number reads the same forwards and backwards</p>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Number Reversal</h2>
        <p className="text-muted-foreground">
          Reversing a number means writing its digits in opposite order. The rightmost digit becomes the leftmost, the second-to-last becomes the second, and so on. This simple operation reveals interesting mathematical properties and is fundamental to many number puzzles.
        </p>
        <p className="text-muted-foreground">
          Number reversal is used in programming challenges, cryptography, checksum algorithms, and recreational mathematics. It's also the basis for identifying palindromic numbers - numbers that read the same forwards and backwards.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How Number Reversal Works</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-3">
            To reverse a number, we process each digit from right to left:
          </p>
          <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
            <li>Read the original number's digits from right to left</li>
            <li>Write them in order to form the new number</li>
            <li>Leading zeros in the result are dropped (0321 becomes 321)</li>
          </ol>
          <p className="text-sm text-muted-foreground mt-3">
            For example, reversing 1234: read 4, then 3, then 2, then 1 → write 4321
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Simple Reversal</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Reverse the number 12345
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Original: 12345</div>
              <div>Read right to left: 5, 4, 3, 2, 1</div>
              <div>Reversed: 54321</div>
              <div className="text-green-600 font-semibold">12345 reversed is 54321</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Reversal with Trailing Zeros</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Reverse the number 1000
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Original: 1000</div>
              <div>Read right to left: 0, 0, 0, 1</div>
              <div>Reversed (raw): 0001</div>
              <div>Reversed (as number): 1</div>
              <div className="text-muted-foreground">Leading zeros are dropped in the numeric result</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Palindromic Number</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Reverse the number 12321
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Original: 12321</div>
              <div>Read right to left: 1, 2, 3, 2, 1</div>
              <div>Reversed: 12321</div>
              <div className="text-green-600 font-semibold">12321 is a palindrome - same forwards and backwards!</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: The 1089 Trick</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A famous number puzzle: Take any 3-digit number where first and last digits differ by at least 2. Reverse it, subtract smaller from larger, reverse the result, and add. You always get 1089!
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Start with: 753</div>
              <div>Reverse: 357</div>
              <div>Subtract: 753 - 357 = 396</div>
              <div>Reverse 396: 693</div>
              <div>Add: 396 + 693 = 1089 ✨</div>
              <div className="text-green-600 font-semibold">Try it with any valid 3-digit number!</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Large Number Reversal</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Reverse 987654321
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Original: 987654321</div>
              <div>Read right to left: 1,2,3,4,5,6,7,8,9</div>
              <div>Reversed: 123456789</div>
              <div className="text-muted-foreground">Notice how the descending sequence becomes ascending!</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            The number 1089 is magical in recreational mathematics. Not only does the reversal trick always produce 1089, but 1089 × 9 = 9801 - its own reversal! Also, 1089 = 33², and it appears in the decimal expansion of 1/11 = 0.090909... (09 + 09 + 09... patterns relate to 1089).
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is a palindromic number?</h4>
            <p className="text-sm text-muted-foreground">
              A palindromic number reads the same forwards and backwards, like 121, 1331, or 12321. Single-digit numbers (0-9) are all palindromes. There are infinitely many palindromic numbers in any base.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What happens when I reverse a number ending in zero?</h4>
            <p className="text-sm text-muted-foreground">
              The reversed number will have leading zeros, which are dropped when treated as a number. For example, 100 reversed is 001, which equals 1. The string representation shows "001" but the numeric value is just 1.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can negative numbers be reversed?</h4>
            <p className="text-sm text-muted-foreground">
              This calculator handles non-negative integers only. In programming, you might choose to preserve the negative sign (reverse of -123 = -321) or treat the absolute value. Mathematically, reversal is typically defined for positive integers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Are there numbers that are palindromes in multiple bases?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! For example, 585 is a palindrome in base 10 (585) and also in binary (1001001001). Numbers that are palindromic in multiple bases are rare and mathematically interesting.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the largest known palindromic prime?</h4>
            <p className="text-sm text-muted-foreground">
              As of 2024, the largest known palindromic prime has over 470,000 digits. Palindromic primes are primes that are also palindromes, like 131, 151, or 10301. They become increasingly rare as numbers get larger.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Where is number reversal used in real applications?</h4>
            <p className="text-sm text-muted-foreground">
              Reversal appears in checksum algorithms (like Luhn algorithm for credit cards), data encoding, cryptography, error detection, and programming puzzles. It's also used in digital signal processing for certain transformations.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
