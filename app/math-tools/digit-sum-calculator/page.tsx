"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DigitSumCalculator() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<{
    sum: number;
    digits: string[];
    recursiveSum: number;
  } | null>(null);

  const calculateDigitSum = () => {
    const numStr = number.replace(/[^0-9]/g, "");
    if (!numStr) {
      setResult(null);
      return;
    }

    const digits = numStr.split("");
    const sum = digits.reduce((acc, digit) => acc + parseInt(digit), 0);
    
    let recursiveSum = sum;
    while (recursiveSum >= 10) {
      recursiveSum = String(recursiveSum)
        .split("")
        .reduce((acc, d) => acc + parseInt(d), 0);
    }

    setResult({ sum, digits, recursiveSum });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Digit Sum Calculator – Find Sum of Digits Online</h1>
        <p className="text-muted-foreground">
          Calculate the sum of all digits in any number instantly with our free online digit sum calculator. Also finds the recursive digit sum down to a single digit.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calculate Digit Sum</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Enter a number</label>
            <Input
              type="text"
              placeholder="e.g., 12345"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="text-lg"
            />
          </div>
          <Button onClick={calculateDigitSum} className="w-full">
            Calculate Digit Sum
          </Button>

          {result && (
            <div className="space-y-4 pt-4 border-t">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Digits</div>
                <div className="text-2xl font-mono">
                  {result.digits.join(" + ")}
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Sum of Digits</div>
                <div className="text-4xl font-bold">{result.sum}</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Recursive Sum (Digital Root)</div>
                <div className="text-4xl font-bold">{result.recursiveSum}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Keep adding digits until you get a single digit
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What is a Digit Sum?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The digit sum is the sum of all individual digits in a number. For example, the digit sum of 12345 is 1 + 2 + 3 + 4 + 5 = 15.
          </p>
          <p className="text-sm text-muted-foreground">
            The recursive digit sum (also called the digital root) keeps adding the digits of the result until you get a single digit. For 12345: 1 + 2 + 3 + 4 + 5 = 15, then 1 + 5 = 6.
          </p>
          <div className="p-4 bg-muted rounded-lg">
            <div className="font-semibold text-sm mb-2">Example: Digit Sum of 9876</div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Digits: 9, 8, 7, 6</div>
              <div>Sum: 9 + 8 + 7 + 6 = 30</div>
              <div>Recursive: 3 + 0 = 3</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Applications of Digit Sums</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-2">Divisibility Rules</div>
              <p className="text-xs text-muted-foreground">
                A number is divisible by 3 or 9 if its digit sum is divisible by 3 or 9 respectively.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-2">Checksums</div>
              <p className="text-xs text-muted-foreground">
                Digit sums are used in error detection for identification numbers like ISBNs.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-2">Number Theory</div>
              <p className="text-xs text-muted-foreground">
                Digital roots reveal patterns in numbers and are used in recreational mathematics.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-2">Casting Out Nines</div>
              <p className="text-xs text-muted-foreground">
                An ancient method to check arithmetic calculations using digit sums.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the digit sum used for?</h4>
            <p className="text-xs text-muted-foreground">
              Digit sums are used for divisibility tests, checksums in identification numbers, and in number theory for exploring patterns in integers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is a digital root?</h4>
            <p className="text-xs text-muted-foreground">
              The digital root is the single-digit result you get after repeatedly summing the digits of a number until only one digit remains.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use negative numbers?</h4>
            <p className="text-xs text-muted-foreground">
              This calculator uses only the absolute value of digits, so negative signs are ignored in the calculation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
