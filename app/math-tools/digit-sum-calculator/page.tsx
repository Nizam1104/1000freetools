"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DigitSumCalculator() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<{
    sum: number;
    digits: string[];
    recursiveSum: number;
    steps: string[];
  } | null>(null);

  const calculateDigitSum = () => {
    const numStr = number.replace(/[^0-9]/g, "");
    if (!numStr) {
      setResult(null);
      return;
    }

    const digits = numStr.split("");
    const steps: string[] = [];

    steps.push(`Number: ${numStr}`);
    steps.push(`Digits: ${digits.join(", ")}`);
    steps.push(`Sum: ${digits.join(" + ")} = ${digits.reduce((acc, digit) => acc + parseInt(digit), 0)}`);

    let sum = digits.reduce((acc, digit) => acc + parseInt(digit), 0);
    let recursiveSum = sum;
    let stepCount = 1;

    while (recursiveSum >= 10) {
      const recursiveDigits = String(recursiveSum).split("");
      steps.push(`Step ${++stepCount}: ${recursiveDigits.join(" + ")} = ${recursiveDigits.reduce((acc, d) => acc + parseInt(d), 0)}`);
      recursiveSum = recursiveDigits.reduce((acc, d) => acc + parseInt(d), 0);
    }

    steps.push(`Digital root: ${recursiveSum}`);

    setResult({ sum, digits, recursiveSum, steps });
  };

  const loadExample = (num: string) => {
    setNumber(num);
    setResult(null);
  };

  const reset = () => {
    setNumber("");
    setResult(null);
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Digit Sum Calculator – Find Sum of Digits Online</h1>
        <p className="text-muted-foreground">
          Calculate the sum of all digits in any number instantly with our free online digit sum calculator. Also finds the recursive digit sum (digital root) down to a single digit with step-by-step breakdown.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Enter a number</Label>
          <Input
            type="text"
            placeholder="e.g., 12345"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">Enter any positive integer (up to 100 digits)</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculateDigitSum}>Calculate Digit Sum</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("12345")}>12345</Button>
          <Button variant="outline" onClick={() => loadExample("999999")}>999999</Button>
          <Button variant="outline" onClick={() => loadExample("1234567890")}>1234567890</Button>
          <Button variant="outline" onClick={() => loadExample("854")}>854</Button>
          <Button variant="outline" onClick={() => loadExample("1000000")}>1000000</Button>
          <Button variant="outline" onClick={() => loadExample("9876543210")}>9876543210</Button>
        </div>

        {result && (
          <div className="space-y-4 pt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Original Number</div>
                <div className="text-2xl font-mono">{number}</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Sum of Digits</div>
                <div className="text-4xl font-bold">{result.sum}</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Digital Root</div>
                <div className="text-4xl font-bold">{result.recursiveSum}</div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Digit Breakdown</div>
              <div className="text-2xl font-mono">
                {result.digits.join(" + ")} = {result.sum}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Calculation</h4>
              <div className="space-y-2 text-sm font-mono">
                {result.steps.map((step, i) => (
                  <div key={i}>{step}</div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Divisibility Check</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Divisible by 3:</span>
                  <span className={`ml-2 font-semibold ${result.recursiveSum % 3 === 0 ? 'text-green-600' : ''}`}>
                    {result.recursiveSum % 3 === 0 ? 'Yes' : 'No'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Divisible by 9:</span>
                  <span className={`ml-2 font-semibold ${result.recursiveSum === 9 ? 'text-green-600' : ''}`}>
                    {result.recursiveSum === 9 ? 'Yes' : 'No'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Number of Digits:</span>
                  <span className="ml-2 font-semibold">{result.digits.length}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Digit Sums and Digital Roots</h2>
        <p className="text-muted-foreground">
          The digit sum is exactly what it sounds like – add up all the individual digits in a number. For 12345, that's 1 + 2 + 3 + 4 + 5 = 15. Simple enough. But there's more to discover when you keep going.
        </p>
        <p className="text-muted-foreground">
          The digital root takes this further. Keep summing the digits of your result until you get a single digit. For 12345: first sum is 15, then 1 + 5 = 6. That final single digit is the digital root. This process always ends at a single digit (1-9, or 0 for the number 0).
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How Digit Sum Calculation Works</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Extract individual digits</p>
                <p className="text-muted-foreground">
                  Break the number into its component digits. 9876 becomes [9, 8, 7, 6].
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Add all digits together</p>
                <p className="text-muted-foreground">
                  Sum them: 9 + 8 + 7 + 6 = 30. This is the digit sum.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Repeat until single digit</p>
                <p className="text-muted-foreground">
                  If the sum has multiple digits, repeat: 3 + 0 = 3. This is the digital root.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Digit Sum of 12345</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Digits: 1, 2, 3, 4, 5</div>
              <div>Sum: 1 + 2 + 3 + 4 + 5 = 15</div>
              <div>Digital root: 1 + 5 = 6</div>
              <p className="text-muted-foreground">A straightforward example. The digit sum is 15, and the digital root is 6.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Digit Sum of 999999</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Digits: 9, 9, 9, 9, 9, 9</div>
              <div>Sum: 9 × 6 = 54</div>
              <div>Digital root: 5 + 4 = 9</div>
              <p className="text-muted-foreground">Any number made entirely of 9s has a digital root of 9. This is a useful pattern.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Digit Sum of 1234567890</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Digits: 1, 2, 3, 4, 5, 6, 7, 8, 9, 0</div>
              <div>Sum: 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 0 = 45</div>
              <div>Digital root: 4 + 5 = 9</div>
              <p className="text-muted-foreground">The digits 0-9 sum to 45, which reduces to 9. This works for any permutation of 0-9.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Digit Sum of 854</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Digits: 8, 5, 4</div>
              <div>Sum: 8 + 5 + 4 = 17</div>
              <div>Digital root: 1 + 7 = 8</div>
              <p className="text-muted-foreground">Notice the digital root (8) equals one of the original digits. This is coincidence, not a pattern.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: Digit Sum of 1000000</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Digits: 1, 0, 0, 0, 0, 0, 0</div>
              <div>Sum: 1 + 0 + 0 + 0 + 0 + 0 + 0 = 1</div>
              <div>Digital root: 1</div>
              <p className="text-muted-foreground">Powers of 10 always have digit sum 1. The zeros contribute nothing to the sum.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 6: Digit Sum of 9876543210</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Digits: 9, 8, 7, 6, 5, 4, 3, 2, 1, 0</div>
              <div>Sum: 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 + 0 = 45</div>
              <div>Digital root: 4 + 5 = 9</div>
              <p className="text-muted-foreground">Same as example 3 – the order doesn't matter for digit sums. All digits 0-9 always sum to 45.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>The digital root reveals divisibility by 9.</strong> A number is divisible by 9 if and only if its digital root is 9. Similarly, a number is divisible by 3 if its digital root is 3, 6, or 9. This "casting out nines" technique was used by ancient mathematicians to check arithmetic calculations before calculators existed.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the digit sum used for?</h4>
            <p className="text-sm text-muted-foreground">
              Digit sums are used for divisibility tests (especially for 3 and 9), checksums in identification numbers like ISBNs and credit cards, and in number theory for exploring patterns. They're also used in "casting out nines" to verify arithmetic.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between digit sum and digital root?</h4>
            <p className="text-sm text-muted-foreground">
              The digit sum is the result of adding all digits once. The digital root is what you get after repeatedly summing digits until you reach a single digit. For 9876: digit sum = 30, digital root = 3.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use negative numbers?</h4>
            <p className="text-sm text-muted-foreground">
              This calculator uses only the absolute value of digits, so negative signs are ignored. The digit sum of -123 is the same as 123: 1 + 2 + 3 = 6.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is the digital root always between 1 and 9?</h4>
            <p className="text-sm text-muted-foreground">
              Because we keep summing until we get a single digit. The only single digits are 0-9. Zero only occurs for the number 0 itself. All positive integers have digital roots from 1 to 9.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is there a shortcut for finding digital roots?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! The digital root of n equals n mod 9 (with 9 instead of 0). So the digital root of 12345 is 12345 mod 9 = 6. If the mod result is 0, the digital root is 9 (unless the number is 0).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's special about digital root 9?</h4>
            <p className="text-sm text-muted-foreground">
              Numbers with digital root 9 are divisible by 9. Also, multiplying any number by 9 gives a result with digital root 9. This is why the "nines trick" works in multiplication tables.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
