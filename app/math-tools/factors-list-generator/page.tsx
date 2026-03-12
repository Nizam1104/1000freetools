"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FactorsListGenerator() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    factors: number[];
    count: number;
    factorPairs: [number, number][];
    sum: number;
  } | null>(null);
  const [error, setError] = useState("");

  const findFactors = (num: number) => {
    const factors: number[] = [];
    const factorPairs: [number, number][] = [];

    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        factors.push(i);
        if (i !== num / i) {
          factorPairs.push([i, num / i]);
        } else {
          factorPairs.push([i, i]);
        }
      }
    }

    const allFactors = [...factors];
    factorPairs.forEach(([a, b]) => {
      if (a !== b) {
        allFactors.push(b);
      }
    });
    allFactors.sort((a, b) => a - b);

    return {
      factors: allFactors,
      count: allFactors.length,
      factorPairs,
      sum: allFactors.reduce((a, b) => a + b, 0),
    };
  };

  const calculate = () => {
    const num = parseInt(number);

    if (isNaN(num) || num <= 0) {
      setError("Please enter a positive integer");
      setResult(null);
      return;
    }

    if (num > 100000000) {
      setError("Please enter a number up to 100,000,000 for performance reasons");
      setResult(null);
      return;
    }

    setError("");
    setResult(findFactors(num));
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
        <h1 className="text-3xl font-semibold mb-2">Factors List Generator – Find All Factors of a Number</h1>
        <p className="text-muted-foreground">
          Generate a complete sorted list of all factors of any number instantly with our free online factors calculator. Ideal for math homework, LCM/GCD problems, and number theory.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number</Label>
          <Input
            type="number"
            placeholder="Enter a positive integer (e.g., 36)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Find All Factors</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("12")}>12</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("48")}>48</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("72")}>72</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100")}>100</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("81")}>81</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("120")}>120</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("256")}>256</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">All Factors of {number}</p>
              <p className="text-2xl font-bold">{result.factors.join(", ")}</p>
              <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                <span>Total: {result.count} factors</span>
                <span>Sum: {result.sum}</span>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Factor Pairs</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {result.factorPairs.map(([a, b], idx) => (
                  <div key={idx} className="p-2 bg-background rounded border text-center text-sm font-mono">
                    {a} × {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Factors</h2>
        <p className="text-muted-foreground">
          Factors are the building blocks of numbers. When you break down a number into its factors, you're finding all the whole numbers that divide into it evenly. This is different from prime factorization, which breaks a number down into only prime numbers.
        </p>
        <p className="text-muted-foreground">
          The sum of all factors (excluding the number itself) tells you something interesting about the number. If the sum equals the number, it's a perfect number like 6 or 28. If the sum is greater, it's abundant. If less, it's deficient.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Generate a Factors List</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Start with 1</p>
                <p className="text-muted-foreground">
                  Every number has 1 as a factor. Write it down first.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Work through each number</p>
                <p className="text-muted-foreground">
                  Test 2, 3, 4, and so on. If the number divides evenly, write down both the divisor and the quotient.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Stop at the square root</p>
                <p className="text-muted-foreground">
                  Once you reach the square root, you've found all unique factor pairs. Any further testing just repeats what you already have.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Sort the list</p>
                <p className="text-muted-foreground">
                  Arrange all factors from smallest to largest for a clean, organized list.
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
            <h4 className="font-semibold text-sm mb-3">Example 1: Factors of 28</h4>
            <div className="font-mono text-sm space-y-2">
              <div>1 × 28 = 28 ✓</div>
              <div>2 × 14 = 28 ✓</div>
              <div>4 × 7 = 28 ✓</div>
              <div>√28 ≈ 5.3, check up to 5</div>
              <div>3, 5 don't divide evenly ✗</div>
              <div className="text-muted-foreground mt-2">Factors: 1, 2, 4, 7, 14, 28</div>
              <div className="text-muted-foreground">Sum: 1 + 2 + 4 + 7 + 14 + 28 = 56</div>
              <div className="text-amber-600">Note: 1 + 2 + 4 + 7 + 14 = 28, so 28 is a perfect number!</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Factors of 45</h4>
            <div className="font-mono text-sm space-y-2">
              <div>1 × 45 = 45 ✓</div>
              <div>3 × 15 = 45 ✓ (4 + 5 = 9, divisible by 3)</div>
              <div>5 × 9 = 45 ✓ (ends in 5)</div>
              <div>√45 ≈ 6.7, check up to 6</div>
              <div>2, 4, 6 don't divide (45 is odd) ✗</div>
              <div className="text-muted-foreground mt-2">Factors: 1, 3, 5, 9, 15, 45</div>
              <div className="text-muted-foreground">Sum: 1 + 3 + 5 + 9 + 15 + 45 = 78</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Factors of 64</h4>
            <div className="font-mono text-sm space-y-2">
              <div>1 × 64 = 64 ✓</div>
              <div>2 × 32 = 64 ✓</div>
              <div>4 × 16 = 64 ✓</div>
              <div>8 × 8 = 64 ✓ (perfect square!)</div>
              <div className="text-muted-foreground mt-2">Factors: 1, 2, 4, 8, 16, 32, 64</div>
              <div className="text-muted-foreground">Sum: 1 + 2 + 4 + 8 + 16 + 32 + 64 = 127</div>
              <div className="text-amber-600">Note: 64 = 2⁶, so it has 6 + 1 = 7 factors</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Factors of 100</h4>
            <div className="font-mono text-sm space-y-2">
              <div>1 × 100 = 100 ✓</div>
              <div>2 × 50 = 100 ✓</div>
              <div>4 × 25 = 100 ✓</div>
              <div>5 × 20 = 100 ✓</div>
              <div>10 × 10 = 100 ✓ (perfect square)</div>
              <div className="text-muted-foreground mt-2">Factors: 1, 2, 4, 5, 10, 20, 25, 50, 100</div>
              <div className="text-muted-foreground">Sum: 217</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            Perfect numbers are incredibly rare. The first four are 6, 28, 496, and 8128. The ancient Greeks knew these four. The fifth perfect number, 33,550,336, wasn't discovered until the 15th century. Today, only 51 perfect numbers are known, all discovered using computers.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the fastest way to find all factors?</h4>
            <p className="text-sm text-muted-foreground">
              Use divisibility rules first. Check 2 (even numbers), 3 (digit sum), 5 (ends in 0 or 5), then test remaining numbers up to the square root. This eliminates many candidates quickly.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I know if I found all factors?</h4>
            <p className="text-sm text-muted-foreground">
              If you've tested every number up to the square root and recorded both the divisor and quotient for each successful division, you have them all. The square root itself is a factor only for perfect squares.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does the sum of factors tell me?</h4>
            <p className="text-sm text-muted-foreground">
              Compare the sum of proper factors (excluding the number itself) to the number. Equal means perfect (like 6). Greater means abundant (like 12). Less means deficient (like 8).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why are factor pairs useful?</h4>
            <p className="text-sm text-muted-foreground">
              Factor pairs help visualize multiplication and division relationships. They're essential for factoring polynomials, simplifying fractions, and understanding number structure.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can decimals have factors?</h4>
            <p className="text-sm text-muted-foreground">
              Factors are defined for integers only. While you can divide decimals, the concept of "factors" specifically refers to whole number divisors that produce whole number quotients.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a proper factor?</h4>
            <p className="text-sm text-muted-foreground">
              Proper factors exclude the number itself. For 12, proper factors are 1, 2, 3, 4, 6. Some definitions also exclude 1, giving just 2, 3, 4, 6. Context determines which definition applies.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
