"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DivisibilityCheck2to20() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const checkDivisibility = () => {
    setError("");
    setResult(null);

    const num = parseInt(number);
    if (isNaN(num) || num <= 0) {
      setError("Please enter a positive integer");
      return;
    }

    const checks: { divisor: number; divisible: boolean; remainder: number; rule: string }[] = [];

    const rules: Record<number, string> = {
      2: "Last digit is even (0, 2, 4, 6, 8)",
      3: "Sum of digits is divisible by 3",
      4: "Last two digits form a number divisible by 4",
      5: "Last digit is 0 or 5",
      6: "Divisible by both 2 and 3",
      7: "Double the last digit, subtract from rest; repeat if needed",
      8: "Last three digits form a number divisible by 8",
      9: "Sum of digits is divisible by 9",
      10: "Last digit is 0",
      11: "Alternating sum of digits is divisible by 11",
      12: "Divisible by both 3 and 4",
      13: "Add 4 times the last digit to the rest; repeat if needed",
      14: "Divisible by both 2 and 7",
      15: "Divisible by both 3 and 5",
      16: "Last four digits form a number divisible by 16",
      17: "Subtract 5 times the last digit from the rest; repeat",
      18: "Divisible by both 2 and 9",
      19: "Add 2 times the last digit to the rest; repeat",
      20: "Divisible by both 4 and 5 (ends in 00, 20, 40, 60, 80)"
    };

    for (let i = 2; i <= 20; i++) {
      const remainder = num % i;
      checks.push({
        divisor: i,
        divisible: remainder === 0,
        remainder,
        rule: rules[i]
      });
    }

    const divisibleBy = checks.filter(c => c.divisible).map(c => c.divisor);
    const notDivisibleBy = checks.filter(c => !c.divisible).map(c => c.divisor);

    setResult({
      number: num,
      checks,
      divisibleBy,
      notDivisibleBy,
      totalDivisors: divisibleBy.length,
      digitSum: String(num).split('').reduce((a, b) => a + parseInt(b), 0)
    });
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
        <h1 className="text-3xl font-semibold mb-2">Divisibility Check (2-20) – Test Number Divisibility</h1>
        <p className="text-muted-foreground">
          Check if a number is divisible by any integer from 2 to 20 with our free online divisibility checker. Get remainders, divisibility rules, and quick results.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number to Check</Label>
          <Input
            type="number"
            placeholder="Enter a positive integer"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={checkDivisibility}>Check Divisibility</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("120")}>120</Button>
          <Button variant="outline" onClick={() => loadExample("2520")}>2520</Button>
          <Button variant="outline" onClick={() => loadExample("1001")}>1001</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Number</p>
              <p className="text-4xl font-bold">{result.number.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Divisible by {result.totalDivisors} numbers from 2-20
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {result.checks.map((check: any) => (
                <div
                  key={check.divisor}
                  className={`p-3 rounded-lg text-center ${
                    check.divisible ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                  }`}
                >
                  <p className="text-sm font-semibold">÷ {check.divisor}</p>
                  <p className={`text-lg font-bold ${check.divisible ? 'text-green-600' : 'text-red-600'}`}>
                    {check.divisible ? 'Yes' : 'No'}
                  </p>
                  {!check.divisible && (
                    <p className="text-xs text-muted-foreground">Rem: {check.remainder}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-3">Divisible By</h4>
                <div className="flex flex-wrap gap-2">
                  {result.divisibleBy.length > 0 ? (
                    result.divisibleBy.map((d: number) => (
                      <span key={d} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
                        {d}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">None</p>
                  )}
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-3">Not Divisible By</h4>
                <div className="flex flex-wrap gap-2">
                  {result.notDivisibleBy.length > 0 ? (
                    result.notDivisibleBy.map((d: number) => (
                      <span key={d} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-semibold">
                        {d}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">None (divisible by all!)</p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Divisibility Rules Applied</h4>
              <div className="space-y-2">
                {result.checks.filter((c: any) => c.divisible).map((check: any) => (
                  <div key={check.divisor} className="flex gap-2 text-sm">
                    <span className="font-semibold min-w-[30px]">{check.divisor}:</span>
                    <span className="text-muted-foreground">{check.rule}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Number Properties</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Digit Sum</p>
                  <p className="text-lg font-semibold">{result.digitSum}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Is Even</p>
                  <p className="text-lg font-semibold">{result.number % 2 === 0 ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Number of Digits</p>
                  <p className="text-lg font-semibold">{String(result.number).length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Digit</p>
                  <p className="text-lg font-semibold">{String(result.number).slice(-1)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
