"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AbsoluteValueCalculator() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const num = parseFloat(number);
    if (!isNaN(num)) {
      setResult(Math.abs(num));
    }
  };

  const reset = () => {
    setNumber("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Absolute Value Calculator – Find |x| of Any Number
          </h1>
          <p className="text-xl text-muted-foreground">
            Calculate the absolute value of any number or expression instantly with our free online absolute value calculator. Supports positive, negative, and decimal numbers.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Number (x)</label>
              <Input
                type="number"
                placeholder="Enter any number (e.g., -15)"
                step="any"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md mt-4">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-2xl font-semibold">
                  |{number}| = {result}
                </p>
              </div>
            )}
          </div>
        </div>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">How to Find Absolute Value</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Enter Your Number</h3>
              <p className="text-sm text-muted-foreground">Input any real number – positive, negative, or zero.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Click Calculate</h3>
              <p className="text-sm text-muted-foreground">The calculator removes the sign to find the magnitude.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">View the Result</h3>
              <p className="text-sm text-muted-foreground">See the absolute value – the distance from zero.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Absolute Value Calculator?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-sm text-muted-foreground">Get absolute values immediately without manual calculation.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Decimal Support</h3>
              <p className="text-sm text-muted-foreground">Handle both integers and decimal numbers with precision.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Visual Understanding</h3>
              <p className="text-sm text-muted-foreground">See the notation |x| and understand the concept clearly.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Educational Tool</h3>
              <p className="text-sm text-muted-foreground">Perfect for students learning about magnitude and distance.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Absolute Value Definition</h2>
          <div className="p-5 bg-muted rounded-lg mb-6">
            <p className="text-lg font-semibold mb-3">|x| = x if x ≥ 0, |x| = -x if x &lt; 0</p>
            <p className="text-sm text-muted-foreground">
              The absolute value of a number is its distance from zero on the number line, regardless of direction.
            </p>
          </div>
          <div className="p-5 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Examples</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>|5| = 5 (positive numbers stay the same)</li>
              <li>|-7| = 7 (negative numbers become positive)</li>
              <li>|0| = 0 (zero is neither positive nor negative)</li>
              <li>|3.14| = 3.14 (decimals work the same way)</li>
              <li>|-100| = 100 (large numbers too)</li>
            </ul>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Absolute Value Properties</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Non-negativity</h3>
              <p className="text-sm text-muted-foreground mb-2">|x| ≥ 0 for all real numbers x</p>
              <p className="text-xs text-muted-foreground">Absolute value is always zero or positive.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Identity</h3>
              <p className="text-sm text-muted-foreground mb-2">|x| = 0 if and only if x = 0</p>
              <p className="text-xs text-muted-foreground">Only zero has an absolute value of zero.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Symmetry</h3>
              <p className="text-sm text-muted-foreground mb-2">|-x| = |x|</p>
              <p className="text-xs text-muted-foreground">A number and its opposite have the same absolute value.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Triangle Inequality</h3>
              <p className="text-sm text-muted-foreground mb-2">|a + b| ≤ |a| + |b|</p>
              <p className="text-xs text-muted-foreground">The absolute value of a sum is at most the sum of absolute values.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Absolute Value on Number Line</h2>
          <div className="p-5 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">
              Think of absolute value as distance. On a number line, the absolute value of a number is how far it is from zero, regardless of which direction.
            </p>
            <div className="bg-background p-4 rounded-md">
              <p className="text-center text-sm font-mono mb-2">
                &lt;---|-------|-------|-------|-------|-------|---&gt;
              </p>
              <p className="text-center text-sm font-mono mb-2">
                &nbsp;&nbsp;-3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3
              </p>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Both -3 and 3 are exactly 3 units from zero, so |-3| = |3| = 3
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is absolute value?</h3>
              <p className="text-sm text-muted-foreground">Absolute value is the magnitude of a number without regard to its sign. It represents the distance of a number from zero on the number line.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Why is absolute value always positive?</h3>
              <p className="text-sm text-muted-foreground">Absolute value measures distance, and distance cannot be negative. Whether you walk 5 steps forward or 5 steps backward, you've still walked 5 steps.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is the absolute value of zero?</h3>
              <p className="text-sm text-muted-foreground">The absolute value of zero is zero. Zero is already at the origin, so its distance from zero is 0.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Can absolute value be negative?</h3>
              <p className="text-sm text-muted-foreground">No. By definition, absolute value is always non-negative. The smallest possible absolute value is 0.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How do you solve absolute value equations?</h3>
              <p className="text-sm text-muted-foreground">Split into two cases: one where the expression inside equals the positive value, and one where it equals the negative value. For |x| = 5, solve x = 5 and x = -5.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Related Math Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/math-tools/inequality-solver" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Inequality Solver</h3>
              <p className="text-sm text-muted-foreground">Solve linear inequalities with absolute values.</p>
            </a>
            <a href="/math-tools/distance-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Distance Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate distance between two points.</p>
            </a>
            <a href="/math-tools/number-line-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Number Line Tools</h3>
              <p className="text-sm text-muted-foreground">Visualize numbers and operations on a number line.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
