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

    if (num > 170) {
      setError("Please enter a number up to 170 for display purposes");
      setResult(null);
      return;
    }

    setError("");
    
    const steps: string[] = [];
    let factorial = 1n;
    
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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
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
            max="170"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateFactorial}>Calculate Factorial</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">{number}! (Factorial of {number})</p>
              <p className="text-4xl font-bold break-all">{result.displayValue}</p>
              {parseInt(number) > 20 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Full value: {result.factorial.toString()}
                </p>
              )}
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Calculation Steps</h4>
              <div className="space-y-2">
                {result.steps.map((step, index) => (
                  <code key={index} className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                    {step}
                  </code>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is a Factorial?</h2>
        <p className="text-muted-foreground">
          A factorial of a non-negative integer n, denoted as n!, is the product of all positive integers less than or equal to n. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Mathematical Definition</p>
          <p className="text-sm font-mono">n! = n × (n-1) × (n-2) × ... × 2 × 1</p>
          <p className="text-sm font-mono mt-2">0! = 1 (by definition)</p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Factorial Examples</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">5! (Five Factorial)</h3>
            <p className="text-sm font-mono">5! = 5 × 4 × 3 × 2 × 1</p>
            <p className="text-lg font-bold mt-2">= 120</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">7! (Seven Factorial)</h3>
            <p className="text-sm font-mono">7! = 7 × 6 × 5 × 4 × 3 × 2 × 1</p>
            <p className="text-lg font-bold mt-2">= 5,040</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">10! (Ten Factorial)</h3>
            <p className="text-sm font-mono">10! = 10 × 9 × 8 × ... × 1</p>
            <p className="text-lg font-bold mt-2">= 3,628,800</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Why Factorials Matter</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Combinatorics</h3>
            <p className="text-sm text-muted-foreground">
              Factorials count permutations. The number of ways to arrange n distinct objects is n!. For example, 5 books can be arranged on a shelf in 5! = 120 different ways.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Probability & Statistics</h3>
            <p className="text-sm text-muted-foreground">
              Factorials appear in probability formulas, including combinations (nCr) and permutations (nPr). They're essential for calculating odds and statistical distributions.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Calculus</h3>
            <p className="text-sm text-muted-foreground">
              Taylor series and power series expansions use factorials in their denominators. The exponential function e^x = Σ(x^n / n!) is a classic example.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Computer Science</h3>
            <p className="text-sm text-muted-foreground">
              Factorial time complexity O(n!) represents the worst case for algorithms like the traveling salesman problem using brute force.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">First 15 Factorials</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">n</th>
                <th className="text-left py-2 px-3">n!</th>
              </tr>
            </thead>
            <tbody>
              {[
                [0, "1"], [1, "1"], [2, "2"], [3, "6"], [4, "24"],
                [5, "120"], [6, "720"], [7, "5,040"], [8, "40,320"], [9, "362,880"],
                [10, "3,628,800"], [11, "39,916,800"], [12, "479,001,600"],
                [13, "6,227,020,800"], [14, "87,178,291,200"]
              ].map(([n, value]) => (
                <tr key={n} className="border-b">
                  <td className="py-2 px-3 font-mono">{n}</td>
                  <td className="py-2 px-3 font-mono">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What is 0! (zero factorial)?</h3>
          <p className="text-sm text-muted-foreground">
            0! = 1 by definition. This might seem counterintuitive, but it makes mathematical formulas work consistently. There's exactly one way to arrange zero objects (do nothing), so 0! = 1.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can factorials be calculated for negative numbers?</h3>
          <p className="text-sm text-muted-foreground">
            No, factorials are only defined for non-negative integers. Negative factorials don't exist in standard mathematics. The gamma function extends factorials to non-integer values, but that's advanced calculus.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How large can factorials get?</h3>
          <p className="text-sm text-muted-foreground">
            Factorials grow extremely fast. 52! (a deck of cards) is larger than the number of atoms in the observable universe. 170! is approximately 10^306, close to the largest number representable in standard floating-point arithmetic.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is the factorial formula?</h3>
          <p className="text-sm text-muted-foreground">
            The factorial formula is n! = n × (n-1) × (n-2) × ... × 2 × 1. You can also express it recursively: n! = n × (n-1)! with the base case 0! = 1.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Where are factorials used in real life?</h3>
          <p className="text-sm text-muted-foreground">
            Factorials appear in probability (lottery odds), statistics (distributions), computer science (algorithm analysis), physics (quantum mechanics), and anywhere you need to count arrangements or combinations.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/permutation-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Permutation Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate nPr</p>
          </a>
          <a href="/math-tools/combination-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Combination Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate nCr</p>
          </a>
          <a href="/math-tools/probability-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Probability Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate probability</p>
          </a>
        </div>
      </section>
    </div>
  );
}
