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

    if (num > 1000000000) {
      setError("Please enter a number up to 1,000,000,000 for performance reasons");
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

        <div className="flex gap-2">
          <Button onClick={calculate}>Check Armstrong</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What Is an Armstrong Number?</h2>
        <p className="text-muted-foreground">
          An Armstrong number (also called a narcissistic number) is a number that equals the sum of its own digits, each raised to the power of the total number of digits. The name comes from Michael F. Armstrong, though these numbers have been studied since the 1960s.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Example: 153</p>
          <p className="text-sm text-muted-foreground mb-2">
            153 has 3 digits, so we raise each digit to the power of 3:<br />
            1³ + 5³ + 3³ = 1 + 125 + 27 = 153
          </p>
          <p className="text-sm font-semibold text-green-600">153 is an Armstrong number</p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Armstrong Numbers by Digit Count</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">1-Digit (0-9)</h3>
            <p className="text-sm text-muted-foreground mb-2">All single-digit numbers are Armstrong numbers</p>
            <p className="text-xs font-mono">0ⁱ = 0, 1ⁱ = 1, 2ⁱ = 2, ... 9ⁱ = 9</p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h3 className="font-semibold text-sm mb-2">3-Digit Armstrong Numbers</h3>
            <p className="text-sm font-mono mb-2">153, 370, 371, 407</p>
            <p className="text-xs text-muted-foreground">
              153: 1³ + 5³ + 3³ = 1 + 125 + 27 = 153<br />
              370: 3³ + 7³ + 0³ = 27 + 343 + 0 = 370<br />
              371: 3³ + 7³ + 1³ = 27 + 343 + 1 = 371<br />
              407: 4³ + 0³ + 7³ = 64 + 0 + 343 = 407
            </p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h3 className="font-semibold text-sm mb-2">4-Digit Armstrong Numbers</h3>
            <p className="text-sm font-mono mb-2">1634, 8208, 9474</p>
            <p className="text-xs text-muted-foreground">
              1634: 1⁴ + 6⁴ + 3⁴ + 4⁴ = 1 + 1296 + 81 + 256 = 1634<br />
              8208: 8⁴ + 2⁴ + 0⁴ + 8⁴ = 4096 + 16 + 0 + 4096 = 8208<br />
              9474: 9⁴ + 4⁴ + 7⁴ + 4⁴ = 6561 + 256 + 2401 + 256 = 9474
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">5-Digit and Beyond</h3>
            <p className="text-sm text-muted-foreground mb-2">5-digit: 54748, 92727, 93084</p>
            <p className="text-xs text-muted-foreground">
              6-digit: 548834<br />
              7-digit: 1741725, 4210818, 9800817, 9926315<br />
              There are only 88 Armstrong numbers total in base 10.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Why "Narcissistic"?</h2>
        <p className="text-muted-foreground">
          The term "narcissistic number" comes from the Greek myth of Narcissus, who fell in love with his own reflection. These numbers are "in love with themselves" – they equal the sum of their own digits raised to their own power.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Also Known As</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Armstrong numbers</li>
              <li>• Narcissistic numbers</li>
              <li>• Plus perfect numbers</li>
              <li>• Perfect digital invariants</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Key Property</h3>
            <p className="text-xs text-muted-foreground">
              For an n-digit number d₁d₂...dₙ, it's Armstrong if:<br />
              d₁ⁿ + d₂ⁿ + ... + dₙⁿ = the original number
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What is an Armstrong number?</h3>
          <p className="text-sm text-muted-foreground">
            An Armstrong number equals the sum of its digits each raised to the power of the total digit count. For example, 153 = 1³ + 5³ + 3³.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Is 0 an Armstrong number?</h3>
          <p className="text-sm text-muted-foreground">
            Yes, 0 is an Armstrong number. It has 1 digit, and 0¹ = 0.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How many Armstrong numbers exist?</h3>
          <p className="text-sm text-muted-foreground">
            There are exactly 88 Armstrong numbers in base 10. The largest has 39 digits. No Armstrong numbers exist beyond 39 digits.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Are Armstrong numbers useful?</h3>
          <p className="text-sm text-muted-foreground">
            They're mainly a mathematical curiosity with no practical applications. They're popular in programming exercises and recreational mathematics.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/perfect-number-checker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Perfect Number Checker</p>
            <p className="text-xs text-muted-foreground">Sum of divisors</p>
          </a>
          <a href="/math-tools/palindrome-number-checker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Palindrome Checker</p>
            <p className="text-xs text-muted-foreground">Reads same forwards/backwards</p>
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
