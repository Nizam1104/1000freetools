"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ArmstrongNumberChecker() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    isArmstrong: boolean;
    digits: number[];
    numDigits: number;
    calculation: string;
    sum: number;
  } | null>(null);
  const [error, setError] = useState("");

  const checkArmstrong = (num: number) => {
    const digits = String(num).split("").map(Number);
    const numDigits = digits.length;

    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, numDigits), 0);

    const calculation = digits
      .map((d, i) => `${d}^${numDigits}${i < digits.length - 1 ? " + " : ""}`)
      .join("");

    return {
      digits,
      numDigits,
      calculation,
      sum,
      isArmstrong: sum === num,
    };
  };

  const calculate = () => {
    const num = parseInt(number);

    if (isNaN(num) || num < 0) {
      setError("Please enter a non-negative integer");
      setResult(null);
      return;
    }

    if (num > 1000000000000000) {
      setError("Please enter a number up to 1 quadrillion for performance reasons");
      setResult(null);
      return;
    }

    setError("");
    const armstrongResult = checkArmstrong(num);
    setResult(armstrongResult);
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
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Armstrong Number Checker – Verify Narcissistic Numbers</h1>
        <p className="text-muted-foreground">
          Check if any number is an Armstrong or narcissistic number with our free online tool. Instantly verify whether the sum of each digit raised to the number of digits equals the original number.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number</Label>
          <Input
            type="number"
            placeholder="Enter a non-negative integer (e.g., 153)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Check Armstrong</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("153")}>153</Button>
          <Button variant="outline" onClick={() => loadExample("370")}>370</Button>
          <Button variant="outline" onClick={() => loadExample("1634")}>1634</Button>
          <Button variant="outline" onClick={() => loadExample("9474")}>9474</Button>
          <Button variant="outline" onClick={() => loadExample("54748")}>54748</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg text-center ${result.isArmstrong ? "bg-green-500/10 border border-green-500/30" : "bg-muted"}`}>
              <p className={`text-5xl font-bold mb-2 ${result.isArmstrong ? "text-green-600" : ""}`}>
                {result.isArmstrong ? "Armstrong Number" : "Not Armstrong"}
              </p>
              <p className="text-sm text-muted-foreground">
                {result.numDigits}-digit number
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">Calculation</p>
              <p className="text-sm font-mono">
                {result.calculation} = {result.sum}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {result.sum} {result.isArmstrong ? "=" : "≠"} {number}
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">Breakdown</p>
              <div className="flex flex-wrap gap-2">
                {result.digits.map((digit, idx) => (
                  <div key={idx} className="px-3 py-2 bg-background rounded border text-center">
                    <p className="text-xs text-muted-foreground">Digit {idx + 1}</p>
                    <p className="font-semibold">{digit}^{result.numDigits} = {Math.pow(digit, result.numDigits)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="space-y-6 pt-8 border-t">
        <h2 className="text-2xl font-semibold">Understanding Armstrong Numbers</h2>
        
        <div className="space-y-4">
          <p>
            An Armstrong number (also called a narcissistic number) is a number that equals the sum of its own digits, each raised to the power of the total number of digits. It's a curious mathematical property that's more recreational than practical — but fascinating nonetheless.
          </p>

          <h3 className="text-xl font-semibold">The Armstrong Number Formula</h3>
          <div className="p-4 bg-muted rounded-lg">
            <code className="text-sm font-mono block">
              For an n-digit number: digit₁^n + digit₂^n + ... + digitₙ^n = original number
            </code>
          </div>
          <p>
            For a 3-digit number like 153, you'd calculate: 1³ + 5³ + 3³ = 1 + 125 + 27 = 153 ✓
          </p>

          <h3 className="text-xl font-semibold">Worked Examples</h3>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 1: Is 153 an Armstrong number?</h4>
              <p className="text-sm text-muted-foreground mb-2">
                153 has 3 digits, so we raise each to the 3rd power.
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                1³ + 5³ + 3³ = 1 + 125 + 27 = 153 ✓
              </code>
              <p className="text-sm mt-2">
                Yes! 153 is the smallest 3-digit Armstrong number.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 2: Is 370 an Armstrong number?</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Also 3 digits.
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                3³ + 7³ + 0³ = 27 + 343 + 0 = 370 ✓
              </code>
              <p className="text-sm mt-2">
                Yes! 370 is another 3-digit Armstrong number.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 3: Is 1634 an Armstrong number?</h4>
              <p className="text-sm text-muted-foreground mb-2">
                1634 has 4 digits, so we use the 4th power.
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                1⁴ + 6⁴ + 3⁴ + 4⁴ = 1 + 1296 + 81 + 256 = 1634 ✓
              </code>
              <p className="text-sm mt-2">
                Yes! 1634 is the smallest 4-digit Armstrong number.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold">A Quick Fact</h3>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">
              The term "narcissistic number" was coined by mathematician Douglas Hofstadter in 1985, inspired by the Greek myth of Narcissus. The name fits — these numbers are literally in love with themselves, defined entirely by their own digits.
            </p>
          </div>

          <h3 className="text-xl font-semibold">Common Questions</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Are there infinitely many Armstrong numbers?</h4>
              <p className="text-sm">
                No. There are only 88 Armstrong numbers in base 10. The largest has 39 digits. Beyond that, the sum of digits raised to the power can never catch up to the original number.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">What are all the 3-digit Armstrong numbers?</h4>
              <p className="text-sm">
                There are exactly four: 153, 370, 371, and 407. You can verify each one by cubing its digits and adding them up.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Do single-digit numbers count?</h4>
              <p className="text-sm">
                Yes! 0, 1, 2, 3, 4, 5, 6, 7, 8, and 9 are all Armstrong numbers. Each has one digit, and that digit to the 1st power equals itself.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">What's the largest Armstrong number?</h4>
              <p className="text-sm">
                The largest Armstrong number in base 10 is 115,132,219,018,763,992,565,095,597,973,971,522,401 — a 39-digit number. No Armstrong numbers exist with 40 or more digits.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Do Armstrong numbers have any practical use?</h4>
              <p className="text-sm">
                Not really. They're a recreational mathematics curiosity — interesting to study but not applied in cryptography, physics, or engineering. They're more like mathematical art.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
