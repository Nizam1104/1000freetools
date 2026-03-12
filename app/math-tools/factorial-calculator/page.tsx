"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FactorialCalculator() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    factorial: bigint;
    displayValue: string;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculateFactorial = () => {
    const num = parseInt(number);

    if (isNaN(num) || num < 0) {
      setError("Please enter a non-negative integer");
      setResult(null);
      return;
    }

    if (num > 50000) {
      setError("Please enter a number up to 100000 for practical computation");
      setResult(null);
      return;
    }

    setError("");

    const steps: string[] = [];
    let factorial = BigInt(1);

    if (num === 0 || num === 1) {
      steps.push(`${num}! = 1 (by definition)`);
    } else {
      const stepParts: string[] = [];
      for (let i = num; i >= 1; i--) {
        factorial *= BigInt(i);
        stepParts.push(i.toString());
      }
      steps.push(`${num}! = ${stepParts.join(" × ")}`);
      steps.push(`${num}! = ${factorial.toLocaleString()}`);
    }

    setResult({
      factorial,
      displayValue: num <= 20 ? factorial.toString() : factorial.toString().replace(/(\d{4})/g, "$1 ").trim(),
      steps,
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
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Factorial Calculator – Compute n! Instantly Online</h1>
        <p className="text-muted-foreground">
          Calculate the factorial of any non-negative integer instantly with our free online factorial calculator. Supports large factorials with exact results.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number (n)</Label>
          <Input
            type="number"
            placeholder="Enter a non-negative integer (e.g., 5)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            min="0"
            max="500"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculateFactorial}>Calculate Factorial</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("5")}>5!</Button>
          <Button variant="outline" onClick={() => loadExample("10")}>10!</Button>
          <Button variant="outline" onClick={() => loadExample("20")}>20!</Button>
          <Button variant="outline" onClick={() => loadExample("50")}>50!</Button>
          <Button variant="outline" onClick={() => loadExample("100")}>100!</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {parseInt(number) > 20 && (
              <p className="break-all text-xs text-muted-foreground mt-2">
                {result.factorial.toString()}
              </p>
            )}
            <div className="p-6 bg-muted rounded-lg text-center max-h-[400px] overflow-y-auto">
              <p className="text-sm text-muted-foreground mb-2">{number}! (Factorial of {number})</p>
              <p className="text-4xl font-bold break-all">{result.displayValue}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Calculation Steps</h4>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {result.steps.map((step, index) => (
                  <code key={index} className="text-sm font-mono bg-muted px-3 py-2 rounded block max-">
                    {step}
                  </code>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="space-y-6 pt-8 border-t">
        <h2 className="text-2xl font-semibold">Understanding Factorials</h2>

        <div className="space-y-4">
          <p>
            The factorial of a number n (written as n!) is the product of all positive integers from 1 up to n. It's one of the most fundamental operations in combinatorics, probability, and calculus.
          </p>

          <h3 className="text-xl font-semibold">The Factorial Formula</h3>
          <div className="p-4 bg-muted rounded-lg">
            <code className="text-sm font-mono block">
              n! = n × (n-1) × (n-2) × ... × 2 × 1
            </code>
          </div>
          <p>
            For example, 5! = 5 × 4 × 3 × 2 × 1 = 120. By definition, 0! = 1 — this isn't a mistake, it's a convention that makes many formulas work cleanly.
          </p>

          <h3 className="text-xl font-semibold">Worked Examples</h3>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 1: 5!</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                5! = 5 × 4 × 3 × 2 × 1 = 120
              </code>
              <p className="text-sm mt-2">
                Small factorials like this show up in permutation problems — like arranging 5 books on a shelf.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 2: 10!</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                10! = 3,628,800
              </code>
              <p className="text-sm mt-2">
                Factorials grow fast. 10! is already over 3.6 million. This is why they're useful for counting large numbers of arrangements.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 3: 20!</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                20! = 2,432,902,008,176,640,000
              </code>
              <p className="text-sm mt-2">
                20! is about 2.4 quintillion — more than the number of grains of sand on Earth. This is why we use BigInt for exact calculations.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold">A Quick Fact</h3>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">
              The factorial notation was introduced by French mathematician Christian Kramp in 1808. Before that, mathematicians wrote out "factorial n" in words. The exclamation point is surprisingly fitting — factorials do tend to produce astonishingly large numbers.
            </p>
          </div>

          <h3 className="text-xl font-semibold">Common Questions</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Why is 0! equal to 1?</h4>
              <p className="text-sm">
                It's not arbitrary — defining 0! = 1 makes formulas work. For example, the number of ways to arrange 0 objects is 1 (do nothing). The binomial coefficient C(n,0) = n!/(0!×n!) only works if 0! = 1.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">How fast do factorials grow?</h4>
              <p className="text-sm">
                Faster than exponential. 10! is 3.6 million, 20! is 2.4 quintillion, and 70! is about 1.2 × 10^100 — larger than the number of atoms in the observable universe.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Can I calculate factorials of negative numbers?</h4>
              <p className="text-sm">
                Not with the standard definition. The factorial is only defined for non-negative integers. There's a related function called the gamma function that extends the idea to negative and non-integer values, but that's beyond this calculator's scope.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">What's the largest factorial I can calculate here?</h4>
              <p className="text-sm">
                This calculator handles up to 500!. The result has 1,135 digits. JavaScript's BigInt handles it exactly, but displaying larger values becomes impractical.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Where do factorials show up in real problems?</h4>
              <p className="text-sm">
                Anywhere you count arrangements or permutations. Password combinations, seating arrangements, card shuffles, scheduling problems — if you're counting "how many ways can I order these things," factorials are involved.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
