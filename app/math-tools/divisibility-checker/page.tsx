"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DivisibilityChecker() {
  const [number, setNumber] = useState("");
  const [divisor, setDivisor] = useState("");
  const [result, setResult] = useState<{
    isDivisible: boolean;
    quotient: number;
    remainder: number;
    rule?: string;
  } | null>(null);
  const [error, setError] = useState("");

  const getDivisibilityRule = (d: number): string => {
    const rules: Record<number, string> = {
      2: "Last digit is even (0, 2, 4, 6, 8)",
      3: "Sum of digits is divisible by 3",
      4: "Last two digits form a number divisible by 4",
      5: "Last digit is 0 or 5",
      6: "Divisible by both 2 and 3",
      7: "Double the last digit, subtract from the rest. Result divisible by 7",
      8: "Last three digits form a number divisible by 8",
      9: "Sum of digits is divisible by 9",
      10: "Last digit is 0",
      11: "Alternating sum of digits is divisible by 11",
      12: "Divisible by both 3 and 4",
      13: "Add 4 times the last digit to the rest. Result divisible by 13",
      14: "Divisible by both 2 and 7",
      15: "Divisible by both 3 and 5",
      16: "Last four digits form a number divisible by 16",
      17: "Subtract 5 times the last digit from the rest. Result divisible by 17",
      18: "Divisible by both 2 and 9",
      19: "Add 2 times the last digit to the rest. Result divisible by 19",
      20: "Divisible by both 4 and 5 (ends in 00, 20, 40, 60, 80)",
      25: "Last two digits are 00, 25, 50, or 75",
      50: "Last two digits are 00 or 50",
      100: "Last two digits are 00"
    };
    return rules[d] || `No simple rule for ${d} – perform the division`;
  };

  const checkDivisibility = () => {
    const num = parseInt(number);
    const div = parseInt(divisor);

    if (isNaN(num) || isNaN(div)) {
      setError("Please enter valid integers");
      setResult(null);
      return;
    }

    if (div === 0) {
      setError("Division by zero is undefined");
      setResult(null);
      return;
    }

    if (num < 0 || div < 0) {
      setError("Please enter positive integers");
      setResult(null);
      return;
    }

    setError("");
    const isDivisible = num % div === 0;
    const quotient = Math.floor(num / div);
    const remainder = num % div;

    setResult({
      isDivisible,
      quotient,
      remainder,
      rule: div <= 25 || div === 50 || div === 100 ? getDivisibilityRule(div) : undefined,
    });
  };

  const reset = () => {
    setNumber("");
    setDivisor("");
    setResult(null);
    setError("");
  };

  const loadExample = (num: string, div: string) => {
    setNumber(num);
    setDivisor(div);
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Divisibility Checker – Test Divisibility Rules Instantly</h1>
        <p className="text-muted-foreground">
          Check if any number is divisible by another with our free online divisibility checker. Displays the relevant divisibility rule and provides instant yes or no results with quotient and remainder.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Number to Test</Label>
            <Input
              type="number"
              placeholder="e.g., 144"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div>
            <Label>Divisor</Label>
            <Input
              type="number"
              placeholder="e.g., 12"
              value={divisor}
              onChange={(e) => setDivisor(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={checkDivisibility}>Check Divisibility</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("144", "12")}>144 ÷ 12</Button>
          <Button variant="outline" onClick={() => loadExample("1000", "8")}>1000 ÷ 8</Button>
          <Button variant="outline" onClick={() => loadExample("2025", "9")}>2025 ÷ 9</Button>
          <Button variant="outline" onClick={() => loadExample("1001", "7")}>1001 ÷ 7</Button>
          <Button variant="outline" onClick={() => loadExample("555", "15")}>555 ÷ 15</Button>
          <Button variant="outline" onClick={() => loadExample("123456", "11")}>123456 ÷ 11</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg text-center ${result.isDivisible ? "bg-green-500/10 border border-green-500/30" : "bg-muted"}`}>
              <p className={`text-5xl font-bold mb-2 ${result.isDivisible ? "text-green-600" : ""}`}>
                {result.isDivisible ? "Yes, Divisible" : "Not Divisible"}
              </p>
              <p className="text-sm text-muted-foreground">
                {number} ÷ {divisor} = {result.quotient} remainder {result.remainder}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Quotient</p>
                <p className="text-3xl font-bold">{result.quotient}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Remainder</p>
                <p className="text-3xl font-bold">{result.remainder}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Exact?</p>
                <p className={`text-3xl font-bold ${result.remainder === 0 ? 'text-green-600' : ''}`}>
                  {result.remainder === 0 ? 'Yes' : 'No'}
                </p>
              </div>
            </div>

            {result.rule && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-semibold mb-2">Divisibility Rule for {divisor}</p>
                <p className="text-sm text-muted-foreground">{result.rule}</p>
              </div>
            )}

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">Verification</p>
              <p className="text-sm font-mono">
                {number} = {divisor} × {result.quotient} + {result.remainder}
              </p>
              {result.remainder === 0 && (
                <p className="text-xs text-green-600 mt-2">✓ Perfect division – no remainder</p>
              )}
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Decimal Result</h4>
              <p className="text-2xl font-mono">{(parseFloat(number) / parseFloat(divisor)).toFixed(6)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {result.remainder === 0 ? 'Exact integer result' : `Rounded to 6 decimal places`}
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Divisibility</h2>
        <p className="text-muted-foreground">
          Divisibility is one of the most fundamental concepts in arithmetic. When we say "a is divisible by b," we mean that a can be divided by b with no remainder. In other words, b goes into a an exact whole number of times. This simple idea underlies much of number theory and has practical applications everywhere from simplifying fractions to cryptography.
        </p>
        <p className="text-muted-foreground">
          The divisibility rule for a number is a shortcut that lets you determine divisibility without doing the full division. Some rules are trivial (check if the last digit is even for divisibility by 2). Others are surprisingly clever (for 7, double the last digit and subtract from the rest). This calculator shows both the result and the applicable rule.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Division Terminology</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Key Terms</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Dividend:</strong> The number being divided (the top number)</div>
              <div><strong>Divisor:</strong> The number you're dividing by</div>
              <div><strong>Quotient:</strong> The result of division</div>
              <div><strong>Remainder:</strong> What's left over after division</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Division Formula</h4>
            <div className="p-3 bg-muted rounded font-mono text-sm text-center">
              Dividend = Divisor × Quotient + Remainder
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Also written as: a = bq + r, where 0 ≤ r &lt; b
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: 144 ÷ 12</h4>
            <div className="text-sm space-y-2">
              <p>Dividend: 144</p>
              <p>Divisor: 12</p>
              <p>Result: Yes, divisible</p>
              <p>Quotient: 12, Remainder: 0</p>
              <p>Rule: Divisible by both 3 and 4</p>
              <p className="text-muted-foreground">144 is 12², so it's perfectly divisible by 12. This is a perfect square.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: 1000 ÷ 8</h4>
            <div className="text-sm space-y-2">
              <p>Dividend: 1000</p>
              <p>Divisor: 8</p>
              <p>Result: Yes, divisible</p>
              <p>Quotient: 125, Remainder: 0</p>
              <p>Rule: Last three digits (000) form a number divisible by 8</p>
              <p className="text-muted-foreground">1000 = 10³ = 2³ × 5³ = 8 × 125. Powers of 10 are divisible by 8.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: 2025 ÷ 9</h4>
            <div className="text-sm space-y-2">
              <p>Dividend: 2025</p>
              <p>Divisor: 9</p>
              <p>Result: Yes, divisible</p>
              <p>Quotient: 225, Remainder: 0</p>
              <p>Rule: Sum of digits (2+0+2+5=9) is divisible by 9</p>
              <p className="text-muted-foreground">2025 = 45². The digit sum is 9, so it's divisible by 9.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: 1001 ÷ 7</h4>
            <div className="text-sm space-y-2">
              <p>Dividend: 1001</p>
              <p>Divisor: 7</p>
              <p>Result: Yes, divisible</p>
              <p>Quotient: 143, Remainder: 0</p>
              <p>Rule: 100 - 2(1) = 98, which is divisible by 7</p>
              <p className="text-muted-foreground">1001 = 7 × 11 × 13. This product of three consecutive primes appears often in math puzzles.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: 555 ÷ 15</h4>
            <div className="text-sm space-y-2">
              <p>Dividend: 555</p>
              <p>Divisor: 15</p>
              <p>Result: Yes, divisible</p>
              <p>Quotient: 37, Remainder: 0</p>
              <p>Rule: Divisible by both 3 and 5</p>
              <p className="text-muted-foreground">555 ends in 5 (divisible by 5) and digit sum is 15 (divisible by 3), so divisible by 15.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 6: 123456 ÷ 11</h4>
            <div className="text-sm space-y-2">
              <p>Dividend: 123456</p>
              <p>Divisor: 11</p>
              <p>Result: Not divisible</p>
              <p>Quotient: 11223, Remainder: 3</p>
              <p>Rule: Alternating sum (1-2+3-4+5-6=-3) not divisible by 11</p>
              <p className="text-muted-foreground">For 11, add and subtract digits alternately. If the result is divisible by 11, so is the original.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>The divisibility rule for 11 is based on alternating sums.</strong> Add the first digit, subtract the second, add the third, and so on. If the result is divisible by 11 (including 0), the original number is divisible by 11. For example, 121: 1 - 2 + 1 = 0, so 121 is divisible by 11 (121 = 11 × 11).
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What does it mean if remainder is 0?</h4>
            <p className="text-sm text-muted-foreground">
              A remainder of 0 means the division is exact – the divisor goes into the dividend a whole number of times with nothing left over. We say the dividend is "divisible by" the divisor.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the remainder be larger than the divisor?</h4>
            <p className="text-sm text-muted-foreground">
              No. By definition, the remainder must be less than the divisor. If you get a remainder equal to or larger than the divisor, you haven't finished dividing – the divisor can go in at least one more time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why can't we divide by zero?</h4>
            <p className="text-sm text-muted-foreground">
              Division by zero is undefined because it leads to contradictions. If 10 ÷ 0 = x, then 0 × x = 10, but 0 times anything is 0, not 10. There's no number that satisfies this equation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I check divisibility for large divisors?</h4>
            <p className="text-sm text-muted-foreground">
              For divisors without simple rules (like 17, 19, 23), just do the division and check if the remainder is 0. The divisibility rules become more complex for larger primes and aren't worth memorizing.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between quotient and result?</h4>
            <p className="text-sm text-muted-foreground">
              The quotient is the whole number part of the division result. The full result includes any remainder or decimal. For 17 ÷ 5: quotient is 3, remainder is 2, decimal result is 3.4.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is 0 divisible by any number?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, 0 is divisible by every non-zero integer. 0 ÷ n = 0 with remainder 0 for any n ≠ 0. However, 0 cannot be a divisor (you can't divide by 0).
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
