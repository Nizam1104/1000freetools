"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MultiplicationCalculator() {
  const [numbers, setNumbers] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const nums = numbers.split(",").map((n) => parseFloat(n.trim())).filter((n) => !isNaN(n));
    if (nums.length > 0) {
      setResult(nums.reduce((a, b) => a * b, 1));
    }
  };

  const reset = () => {
    setNumbers("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Multiplication Calculator</CardTitle>
          <CardDescription>Multiply multiple numbers together</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Enter numbers (comma-separated)
              </label>
              <Input
                type="text"
                placeholder="e.g., 5, 10, 3"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-2xl font-semibold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Multiplication Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your numbers</p>
                  <p>Type or paste numbers separated by commas. You can multiply 2 numbers or 20 — the calculator handles any quantity.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Include decimals and negatives</p>
                  <p>The calculator works with decimal numbers (3.14, 2.5) and negative numbers (-5, -10) automatically.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Calculate</p>
                  <p>Get your product instantly. The result appears below the input field with clear formatting.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Multiplication Sign Rules
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">First Number</th>
                    <th className="text-left py-3 px-2 font-semibold">Second Number</th>
                    <th className="text-left py-3 px-2 font-semibold">Result</th>
                    <th className="text-left py-3 px-2 font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Positive (+)</td>
                    <td className="py-3 px-2">Positive (+)</td>
                    <td className="py-3 px-2">Positive (+)</td>
                    <td className="py-3 px-2">5 × 3 = 15</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Negative (−)</td>
                    <td className="py-3 px-2">Negative (−)</td>
                    <td className="py-3 px-2">Positive (+)</td>
                    <td className="py-3 px-2">−5 × −3 = 15</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Positive (+)</td>
                    <td className="py-3 px-2">Negative (−)</td>
                    <td className="py-3 px-2">Negative (−)</td>
                    <td className="py-3 px-2">5 × −3 = −15</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Negative (−)</td>
                    <td className="py-3 px-2">Positive (+)</td>
                    <td className="py-3 px-2">Negative (−)</td>
                    <td className="py-3 px-2">−5 × 3 = −15</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Any number</td>
                    <td className="py-3 px-2">Zero (0)</td>
                    <td className="py-3 px-2">Zero (0)</td>
                    <td className="py-3 px-2">5 × 0 = 0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Multiplication
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is Multiplication?</h4>
                <p>
                  Multiplication is repeated addition. When you multiply 5 × 3, you are adding 5 three times:
                  5 + 5 + 5 = 15. The numbers being multiplied are called factors, and the result is called
                  the product. Multiplication is one of the four basic arithmetic operations.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Multiplication Properties</h4>
                <p>
                  Multiplication has several key properties. The commutative property means order does not
                  matter (3 × 5 = 5 × 3). The associative property means grouping does not matter
                  ((2 × 3) × 4 = 2 × (3 × 4)). The distributive property connects multiplication to addition:
                  a × (b + c) = (a × b) + (a × c).
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Multiplying Multiple Numbers</h4>
                <p>
                  When multiplying more than two numbers, work left to right or group them strategically.
                  For example, 2 × 3 × 4 × 5 can be calculated as (2 × 3) × (4 × 5) = 6 × 20 = 120.
                  Grouping numbers that make round products (like 2 × 5 = 10) can simplify mental math.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Better Multiplication
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Learn times tables</p>
                  <p>Knowing multiplication facts up to 12 × 12 makes complex calculations much faster and reduces errors.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use rounding for estimates</p>
                  <p>Round numbers to check if your answer is reasonable. 47 × 52 is close to 50 × 50 = 2,500.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Break down large numbers</p>
                  <p>Split numbers into easier parts: 16 × 15 = (10 × 15) + (6 × 15) = 150 + 90 = 240.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Watch decimal places</p>
                  <p>Count total decimal places in factors. The product has that many decimal places: 2.5 × 0.4 = 1.00 = 1.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I multiply numbers with decimals?</h4>
                <p>
                  Multiply as if they were whole numbers, then count total decimal places in both factors.
                  Place the decimal point in the product so it has the same number of decimal places.
                  For example: 2.5 × 0.4 → 25 × 4 = 100 → 2 decimal places → 1.00 = 1.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why does negative times negative equal positive?</h4>
                <p>
                  Think of it as reversing a reversal. If positive means forward, negative means backward.
                  Going backward (negative) while facing backward (negative) actually moves you forward (positive).
                  Mathematically, this rule maintains consistency across all arithmetic operations.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the product of any number and zero?</h4>
                <p>
                  Any number multiplied by zero equals zero. This is the zero property of multiplication.
                  No matter how large the other factor is, if one factor is zero, the product is zero.
                  Think of it as having zero groups of something — you have nothing.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I multiply large numbers without a calculator?</h4>
                <p>
                  Use long multiplication or break numbers into parts. For 23 × 47, calculate (20 × 47) + (3 × 47) =
                  940 + 141 = 1,081. Alternatively, use the lattice method or Russian peasant multiplication
                  for different approaches that may suit your thinking style.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the difference between product and sum?</h4>
                <p>
                  Product is the result of multiplication. Sum is the result of addition. For 3 and 4:
                  the product is 3 × 4 = 12, while the sum is 3 + 4 = 7. Products grow much faster than
                  sums as numbers increase, which is why exponential growth is so powerful.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Related Tools
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="/calculators/long-multiplication-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Long Multiplication Calculator</span>
                <p className="text-muted-foreground">See step-by-step long multiplication with work shown</p>
              </a>
              <a
                href="/calculators/division-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Division Calculator</span>
                <p className="text-muted-foreground">Divide numbers and see quotient with remainder</p>
              </a>
              <a
                href="/calculators/exponent-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Exponent Calculator</span>
                <p className="text-muted-foreground">Calculate powers and exponential expressions</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
