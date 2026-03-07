"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FactorialCalculator() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<{
    factorial: string;
    steps: string;
  } | null>(null);
  const [error, setError] = useState<string>("");

  const calculate = () => {
    const num = parseInt(number);

    if (isNaN(num) || num < 0) {
      setError("Please enter a non-negative integer");
      return;
    }

    if (num > 170) {
      setError("Number too large (max 170)");
      return;
    }

    setError("");

    if (num === 0 || num === 1) {
      setResult({ factorial: "1", steps: `${num}! = 1` });
      return;
    }

    let factorial = BigInt(1);
    const steps: string[] = [];

    for (let i = 1; i <= num; i++) {
      factorial *= BigInt(i);
      steps.push(i.toString());
    }

    setResult({
      factorial: factorial.toString(),
      steps: `${num}! = ${steps.join(" × ")} = ${factorial.toString()}`,
    });
  };

  const reset = () => {
    setNumber("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Number (n)
              </label>
              <Input
                type="number"
                placeholder="e.g., 5"
                min="0"
                max="170"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>
                Reset
              </Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Result</p>
                  <p className="text-2xl font-semibold break-all">
                    {result.factorial}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Calculation</p>
                  <p className="text-sm">{result.steps}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Factorials</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
            <h3 className="font-semibold mb-2">Enter a Number</h3>
            <p className="text-sm text-muted-foreground">Input any non-negative integer (0-170) to calculate its factorial.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
            <h3 className="font-semibold mb-2">Click Calculate</h3>
            <p className="text-sm text-muted-foreground">The calculator multiplies all integers from 1 to your number.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
            <h3 className="font-semibold mb-2">View Result & Steps</h3>
            <p className="text-sm text-muted-foreground">See the factorial value and the multiplication steps showing the calculation.</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Why Use This Factorial Calculator?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Handle Large Numbers
            </h3>
            <p className="text-sm text-muted-foreground">Calculate factorials up to 170! using BigInt for precise results beyond standard number limits.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Step-by-Step Display
            </h3>
            <p className="text-sm text-muted-foreground">See the full multiplication sequence to understand how factorials are computed.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Zero and One Support
            </h3>
            <p className="text-sm text-muted-foreground">Correctly handles special cases where 0! = 1 and 1! = 1 by definition.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Input Validation
            </h3>
            <p className="text-sm text-muted-foreground">Validates input to ensure non-negative integers within calculable range.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Educational Tool
            </h3>
            <p className="text-sm text-muted-foreground">Perfect for learning combinatorics, probability, and discrete mathematics.</p>
          </div>
        </div>

        <div className="mt-6 p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-3">Factorial Formula & Examples</h3>
          <div className="bg-card p-4 rounded font-mono text-sm mb-4">
            n! = n × (n-1) × (n-2) × ... × 2 × 1
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-2">Special Cases:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 0! = 1 (by definition)</li>
                <li>• 1! = 1</li>
                <li>• n! = n × (n-1)! for n &gt; 1</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Example Calculations:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 5! = 5×4×3×2×1 = 120</li>
                <li>• 6! = 720</li>
                <li>• 10! = 3,628,800</li>
                <li>• 20! ≈ 2.43 × 10¹⁸</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions About Factorials</h2>
        <div className="space-y-4">
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is a factorial?</h3>
            <p className="text-sm text-muted-foreground">A factorial (denoted n!) is the product of all positive integers from 1 to n. For example, 5! = 5×4×3×2×1 = 120.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Why is 0! equal to 1?</h3>
            <p className="text-sm text-muted-foreground">Zero factorial equals 1 by mathematical convention. This definition ensures formulas like permutations and combinations work correctly for edge cases.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Where are factorials used?</h3>
            <p className="text-sm text-muted-foreground">Factorials are essential in combinatorics (permutations, combinations), probability theory, series expansions, and algorithm analysis.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Can factorials be calculated for negative numbers?</h3>
            <p className="text-sm text-muted-foreground">No, factorials are only defined for non-negative integers. Negative factorials are undefined in standard mathematics.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How fast do factorials grow?</h3>
            <p className="text-sm text-muted-foreground">Factorials grow extremely fast - faster than exponential. 10! is 3.6 million, 20! is 2.4 quintillion, and 170! is the largest calculable in standard systems.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
    </div>
  );
}
