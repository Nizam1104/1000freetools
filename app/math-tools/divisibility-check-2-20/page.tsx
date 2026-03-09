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
          Check if a number is divisible by any integer from 2 to 20 with our free online divisibility checker. Get remainders, divisibility rules, and quick results for all divisors at once.
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={checkDivisibility}>Check Divisibility</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("120")}>120</Button>
          <Button variant="outline" onClick={() => loadExample("2520")}>2520</Button>
          <Button variant="outline" onClick={() => loadExample("1001")}>1001</Button>
          <Button variant="outline" onClick={() => loadExample("720")}>720</Button>
          <Button variant="outline" onClick={() => loadExample("999")}>999</Button>
          <Button variant="outline" onClick={() => loadExample("10000")}>10000</Button>
          <Button variant="outline" onClick={() => loadExample("362880")}>362880</Button>
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

            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Divisibility Rules</h2>
        <p className="text-muted-foreground">
          Divisibility rules are shortcuts that let you determine if one number divides another without doing the actual division. These mental math tricks have been used for centuries – ancient Greek mathematicians knew many of them. They're especially useful when working with large numbers or when you need a quick answer.
        </p>
        <p className="text-muted-foreground">
          Some rules are obvious (divisible by 2 if the last digit is even). Others are surprisingly clever (divisible by 7 if you double the last digit, subtract from the rest, and the result is divisible by 7). This calculator checks all divisors from 2 to 20 at once and shows which rules apply.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Divisibility Rules</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Simple Rules (2, 5, 10)</h4>
            <div className="space-y-2 text-sm">
              <div><strong>2:</strong> Last digit is even (0, 2, 4, 6, 8)</div>
              <div><strong>5:</strong> Last digit is 0 or 5</div>
              <div><strong>10:</strong> Last digit is 0</div>
              <p className="text-muted-foreground text-xs mt-2">These only require looking at the last digit.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Digit Sum Rules (3, 9)</h4>
            <div className="space-y-2 text-sm">
              <div><strong>3:</strong> Sum of digits divisible by 3</div>
              <div><strong>9:</strong> Sum of digits divisible by 9</div>
              <p className="text-muted-foreground text-xs mt-2">Add all digits together and check the sum.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Last Digits Rules (4, 8, 16)</h4>
            <div className="space-y-2 text-sm">
              <div><strong>4:</strong> Last two digits divisible by 4</div>
              <div><strong>8:</strong> Last three digits divisible by 8</div>
              <div><strong>16:</strong> Last four digits divisible by 16</div>
              <p className="text-muted-foreground text-xs mt-2">Check only the last 2, 3, or 4 digits.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Combined Rules (6, 12, 15, 18)</h4>
            <div className="space-y-2 text-sm">
              <div><strong>6:</strong> Divisible by both 2 and 3</div>
              <div><strong>12:</strong> Divisible by both 3 and 4</div>
              <div><strong>15:</strong> Divisible by both 3 and 5</div>
              <div><strong>18:</strong> Divisible by both 2 and 9</div>
              <p className="text-muted-foreground text-xs mt-2">Check the component prime factors.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Divisibility of 120</h4>
            <div className="text-sm space-y-2">
              <p>Number: 120</p>
              <p>Divisible by: 2, 3, 4, 5, 6, 8, 10, 12, 15, 20 (10 divisors)</p>
              <p>Not divisible by: 7, 9, 11, 13, 14, 16, 17, 18, 19</p>
              <p className="text-muted-foreground">120 is highly composite. It's the product 2³ × 3 × 5, giving it many factors.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Divisibility of 2520</h4>
            <div className="text-sm space-y-2">
              <p>Number: 2520</p>
              <p>Divisible by: 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 18, 20 (14 divisors!)</p>
              <p>Not divisible by: 11, 13, 16, 17, 19</p>
              <p className="text-muted-foreground">2520 is the smallest number divisible by 1-10. It's the LCM of 1 through 10.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Divisibility of 1001</h4>
            <div className="text-sm space-y-2">
              <p>Number: 1001</p>
              <p>Divisible by: 7, 11, 13</p>
              <p>Not divisible by: 2, 3, 4, 5, 6, 8, 9, 10, 12, 14, 15, 16, 17, 18, 19, 20</p>
              <p className="text-muted-foreground">1001 = 7 × 11 × 13. This product of three consecutive primes has an interesting pattern.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Divisibility of 720</h4>
            <div className="text-sm space-y-2">
              <p>Number: 720 (which is 6!)</p>
              <p>Divisible by: 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20 (13 divisors)</p>
              <p>Not divisible by: 7, 11, 13, 14, 17, 19</p>
              <p className="text-muted-foreground">720 = 6! = 720. Factorials have many divisors because they're products of all numbers up to n.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: Divisibility of 999</h4>
            <div className="text-sm space-y-2">
              <p>Number: 999</p>
              <p>Divisible by: 3, 9</p>
              <p>Not divisible by: 2, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20</p>
              <p className="text-muted-foreground">999 = 27 × 37 = 3³ × 37. Only divisible by 3 and 9 in our range because it's odd and doesn't end in 0 or 5.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 6: Divisibility of 362880</h4>
            <div className="text-sm space-y-2">
              <p>Number: 362880 (which is 9!)</p>
              <p>Divisible by: 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20 (15 divisors!)</p>
              <p>Not divisible by: 11, 13, 17, 19</p>
              <p className="text-muted-foreground">362880 = 9! is divisible by every number from 1 to 9. Only prime numbers greater than 9 don't divide it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>2520 is the smallest number divisible by 1 through 10.</strong> This highly composite number was known to ancient mathematicians. It's the least common multiple (LCM) of 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. The next such number divisible by 1-12 is 27720. These numbers are useful for creating measurement systems with many convenient subdivisions.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why check divisibility up to 20?</h4>
            <p className="text-sm text-muted-foreground">
              Numbers 2-20 cover the most commonly used divisors in everyday math. They include all single-digit numbers and the most useful two-digit divisors. For larger divisors, you'd typically just do the division.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How does the divisibility by 7 rule work?</h4>
            <p className="text-sm text-muted-foreground">
              Take the last digit, double it, and subtract from the rest of the number. If the result is divisible by 7, so is the original. Example: 343 → 34 - 2(3) = 28, which is divisible by 7.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does "remainder" mean?</h4>
            <p className="text-sm text-muted-foreground">
              The remainder is what's left after division. If 17 ÷ 5 = 3 remainder 2, it means 5 goes into 17 three times with 2 left over. A remainder of 0 means the number is exactly divisible.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is 1 not included in the checks?</h4>
            <p className="text-sm text-muted-foreground">
              Every integer is divisible by 1, so checking would be pointless. We start at 2 because that's the first meaningful divisibility test.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use this for very large numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, but there may be performance limits. JavaScript can safely handle integers up to about 9 quadrillion (9 × 10¹⁵). Beyond that, precision may be lost.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a highly composite number?</h4>
            <p className="text-sm text-muted-foreground">
              A highly composite number has more divisors than any smaller positive integer. Examples include 12, 60, 120, 2520, and 5040. These numbers are useful for measurement systems and scheduling.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/divisibility-checker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Divisibility Checker</p>
            <p className="text-xs text-muted-foreground">Check single divisor</p>
          </a>
          <a href="/math-tools/factor-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Factor Calculator</p>
            <p className="text-xs text-muted-foreground">Find all factors</p>
          </a>
          <a href="/math-tools/prime-factorization-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Prime Factorization</p>
            <p className="text-xs text-muted-foreground">Break into primes</p>
          </a>
        </div>
      </section>
    </div>
  );
}
