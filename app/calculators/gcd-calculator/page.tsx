"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function GCDCalculator() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const calculate = () => {
    const n1 = parseInt(num1);
    const n2 = parseInt(num2);
    if (!isNaN(n1) && !isNaN(n2) && (n1 !== 0 || n2 !== 0)) {
      setResult(gcd(n1, n2));
    }
  };

  const reset = () => {
    setNum1("");
    setNum2("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>GCD / HCF Calculator</CardTitle>
          <CardDescription>Find the Greatest Common Divisor (Highest Common Factor)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">First Number</label>
              <Input
                type="number"
                placeholder="e.g., 48"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Second Number</label>
              <Input
                type="number"
                placeholder="e.g., 18"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">GCD / HCF</p>
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
              How to Use This GCD Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the first number</p>
                  <p>Input any positive integer. For example, enter 48 to find the GCD of 48 and another number.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the second number</p>
                  <p>Input the second positive integer. The calculator will find the largest number that divides both evenly.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Calculate</p>
                  <p>The calculator uses the Euclidean algorithm to find the GCD instantly. The result is the largest number that divides both inputs without a remainder.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              GCD Examples Reference Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Number 1</th>
                    <th className="text-left py-3 px-2 font-semibold">Number 2</th>
                    <th className="text-left py-3 px-2 font-semibold">GCD</th>
                    <th className="text-left py-3 px-2 font-semibold">Common Factors</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">12</td>
                    <td className="py-3 px-2">18</td>
                    <td className="py-3 px-2">6</td>
                    <td className="py-3 px-2">1, 2, 3, 6</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">24</td>
                    <td className="py-3 px-2">36</td>
                    <td className="py-3 px-2">12</td>
                    <td className="py-3 px-2">1, 2, 3, 4, 6, 12</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">48</td>
                    <td className="py-3 px-2">18</td>
                    <td className="py-3 px-2">6</td>
                    <td className="py-3 px-2">1, 2, 3, 6</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">17</td>
                    <td className="py-3 px-2">23</td>
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2">1 (coprime)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">100</td>
                    <td className="py-3 px-2">75</td>
                    <td className="py-3 px-2">25</td>
                    <td className="py-3 px-2">1, 5, 25</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">144</td>
                    <td className="py-3 px-2">60</td>
                    <td className="py-3 px-2">12</td>
                    <td className="py-3 px-2">1, 2, 3, 4, 6, 12</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: When GCD equals 1, the numbers are called coprime or relatively prime - they share no common factors other than 1.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Greatest Common Divisor
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What is GCD?</h4>
                <p>
                  The Greatest Common Divisor (GCD), also called Highest Common Factor (HCF), is the
                  largest positive integer that divides two or more numbers without leaving a remainder.
                  For example, the GCD of 12 and 18 is 6, because 6 is the largest number that divides
                  both 12 and 18 evenly.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">The Euclidean Algorithm</h4>
                <p>
                  This calculator uses the Euclidean algorithm, one of the oldest known algorithms
                  (dating back to 300 BCE). To find GCD(a, b): divide a by b, get the remainder r,
                  then replace a with b and b with r. Repeat until the remainder is 0. The last
                  non-zero remainder is the GCD. For GCD(48, 18): 48÷18=2 remainder 12, then
                  18÷12=1 remainder 6, then 12÷6=2 remainder 0. GCD is 6.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">GCD and Fraction Simplification</h4>
                <p>
                  GCD is essential for simplifying fractions. To reduce 48/18 to lowest terms, divide
                  both numerator and denominator by their GCD (which is 6): 48÷6=7, 18÷6=3, so
                  48/18 = 8/3. This gives the fraction in its simplest form.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Finding GCD
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use prime factorization for small numbers</p>
                  <p>Break each number into prime factors, then multiply the common factors. For 24 (2³×3) and 36 (2²×3²), common factors are 2²×3 = 12.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Recognize coprime numbers quickly</p>
                  <p>If both numbers are prime and different, their GCD is always 1. Also, consecutive integers (like 15 and 16) are always coprime with GCD = 1.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use the relationship with LCM</p>
                  <p>GCD(a,b) × LCM(a,b) = a × b. If you know the LCM, you can find GCD by dividing the product by the LCM. This is useful for checking your work.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">GCD works for negative numbers too</p>
                  <p>GCD is always positive. GCD(-48, 18) = GCD(48, 18) = 6. The calculator handles negative inputs by using absolute values.</p>
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
                <h4 className="font-medium text-foreground mb-2">What is the difference between GCD and HCF?</h4>
                <p>
                  There is no difference. GCD (Greatest Common Divisor) and HCF (Highest Common Factor)
                  are two names for the same concept. Different regions and textbooks prefer different
                  terms, but they mean exactly the same thing.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I find GCD of more than two numbers?</h4>
                <p>
                  Find GCD of the first two numbers, then find GCD of that result with the third number,
                  and continue. For GCD(12, 18, 24): first GCD(12, 18) = 6, then GCD(6, 24) = 6.
                  So GCD(12, 18, 24) = 6.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What does it mean if GCD is 1?</h4>
                <p>
                  When GCD equals 1, the numbers are coprime (or relatively prime). They share no
                  common factors other than 1. For example, 8 and 15 are coprime because their only
                  common factor is 1, even though neither number is prime.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can GCD be used for decimal numbers?</h4>
                <p>
                  GCD is defined for integers only. For decimals, multiply all numbers by a power of 10
                  to make them integers, find the GCD, then divide by the same power of 10. However,
                  this is rarely needed in practice.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What are practical uses of GCD?</h4>
                <p>
                  GCD is used to simplify fractions, find common denominators, solve Diophantine equations,
                  and in cryptography (RSA encryption relies on properties related to GCD). It is also
                  useful for dividing things into equal groups - like finding the largest tile size that
                  fits evenly into two different room dimensions.
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
                href="/calculators/lcm-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">LCM Calculator</span>
                <p className="text-muted-foreground">Find the Least Common Multiple of two or more numbers</p>
              </a>
              <a
                href="/calculators/fraction-simplifier"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Fraction Simplifier</span>
                <p className="text-muted-foreground">Reduce fractions to lowest terms using GCD</p>
              </a>
              <a
                href="/calculators/prime-factorization-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Prime Factorization Calculator</span>
                <p className="text-muted-foreground">Break down numbers into their prime factors</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
