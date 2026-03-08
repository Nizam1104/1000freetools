"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FractionToDecimalCalculator() {
  const [numerator, setNumerator] = useState<string>("");
  const [denominator, setDenominator] = useState<string>("");
  const [result, setResult] = useState<{ decimal: number; percentage: number } | null>(null);

  const calculate = () => {
    const num = parseFloat(numerator);
    const den = parseFloat(denominator);
    
    if (!isNaN(num) && !isNaN(den) && den !== 0) {
      setResult({
        decimal: num / den,
        percentage: (num / den) * 100
      });
    }
  };

  const reset = () => {
    setNumerator("");
    setDenominator("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-2 block">Numerator</label>
                <Input
                  type="number"
                  placeholder="e.g., 3"
                  step="any"
                  value={numerator}
                  onChange={(e) => setNumerator(e.target.value)}
                />
              </div>
              <div className="text-2xl font-bold pb-3">/</div>
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-2 block">Denominator</label>
                <Input
                  type="number"
                  placeholder="e.g., 4"
                  step="any"
                  value={denominator}
                  onChange={(e) => setDenominator(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Decimal</p>
                  <p className="text-2xl font-semibold">{result.decimal}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Percentage</p>
                  <p className="text-xl">{result.percentage}%</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Fraction to Decimal Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the numerator</p>
                  <p>Type the top number of your fraction. For 3/4, enter 3. For mixed numbers like 2 1/2, convert to an improper fraction first (5/2).</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the denominator</p>
                  <p>Type the bottom number of your fraction. For 3/4, enter 4. The denominator cannot be zero.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Convert</p>
                  <p>The calculator divides the numerator by the denominator and displays the decimal result along with the equivalent percentage.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Fraction to Decimal Conversions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Fraction</th>
                    <th className="text-left py-3 px-2 font-semibold">Decimal</th>
                    <th className="text-left py-3 px-2 font-semibold">Percentage</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">1/2</td>
                    <td className="py-3 px-2">0.5</td>
                    <td className="py-3 px-2">50%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1/3</td>
                    <td className="py-3 px-2">0.333...</td>
                    <td className="py-3 px-2">33.33%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1/4</td>
                    <td className="py-3 px-2">0.25</td>
                    <td className="py-3 px-2">25%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1/5</td>
                    <td className="py-3 px-2">0.2</td>
                    <td className="py-3 px-2">20%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1/8</td>
                    <td className="py-3 px-2">0.125</td>
                    <td className="py-3 px-2">12.5%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1/10</td>
                    <td className="py-3 px-2">0.1</td>
                    <td className="py-3 px-2">10%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">3/4</td>
                    <td className="py-3 px-2">0.75</td>
                    <td className="py-3 px-2">75%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">2/3</td>
                    <td className="py-3 px-2">0.666...</td>
                    <td className="py-3 px-2">66.67%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">3/8</td>
                    <td className="py-3 px-2">0.375</td>
                    <td className="py-3 px-2">37.5%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">5/8</td>
                    <td className="py-3 px-2">0.625</td>
                    <td className="py-3 px-2">62.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Fraction to Decimal Conversion
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">The Division Method</h4>
                <p>
                  Converting a fraction to a decimal is simple: divide the numerator by the denominator.
                  For 3/4, you calculate 3 ÷ 4 = 0.75. This works for any fraction. The numerator
                  represents how many parts you have, and the denominator shows how many parts make a whole.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Terminating vs Repeating Decimals</h4>
                <p>
                  Some fractions produce terminating decimals that end, like 1/4 = 0.25. Others produce
                  repeating decimals that go on forever, like 1/3 = 0.333... Fractions with denominators
                  that are powers of 2 or 5 (or products of 2 and 5) always terminate. Others repeat.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Converting Mixed Numbers</h4>
                <p>
                  For mixed numbers like 2 1/2, first convert to an improper fraction. Multiply the whole
                  number by the denominator, add the numerator: (2 × 2) + 1 = 5, so 2 1/2 = 5/2. Then
                  divide: 5 ÷ 2 = 2.5. Alternatively, convert just the fraction part and add: 1/2 = 0.5,
                  so 2 + 0.5 = 2.5.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Working with Fractions and Decimals
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Know common conversions</p>
                  <p>Memorizing fractions like 1/4 = 0.25, 1/2 = 0.5, and 3/4 = 0.75 speeds up mental math. These appear constantly in cooking, construction, and finance.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use decimals for calculations</p>
                  <p>When adding, subtracting, or comparing values, decimals are often easier than fractions. Convert first, calculate, then convert back if needed.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Round repeating decimals appropriately</p>
                  <p>For repeating decimals like 1/3 = 0.333..., round to a practical number of places. Two decimal places (0.33) works for most everyday calculations.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Check your work with estimation</p>
                  <p>Before calculating, estimate the answer. For 7/8, think &quot;almost 1&quot; so the decimal should be close to 1 (it is 0.875). This catches input errors.</p>
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
                <h4 className="font-medium text-foreground mb-2">How do I convert a fraction to a decimal?</h4>
                <p>
                  Divide the numerator (top number) by the denominator (bottom number). For example,
                  3/4 means 3 ÷ 4 = 0.75. You can do this by hand with long division or use a calculator.
                  The result is the decimal equivalent of the fraction.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is 1/3 as a decimal?</h4>
                <p>
                  1/3 as a decimal is 0.333... with the 3 repeating forever. This is written as 0.3 with
                  a bar over the 3, or rounded to a practical number of places like 0.33 or 0.333.
                  As a percentage, 1/3 is approximately 33.33%.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I convert a mixed number to a decimal?</h4>
                <p>
                  Keep the whole number part and convert only the fraction. For 2 3/4, the whole number
                  is 2. Convert 3/4 to 0.75. Add them: 2 + 0.75 = 2.75. Alternatively, convert to an
                  improper fraction first: 2 3/4 = 11/4, then divide: 11 ÷ 4 = 2.75.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why do some fractions produce repeating decimals?</h4>
                <p>
                  A fraction produces a repeating decimal when the denominator has prime factors other
                  than 2 or 5. For example, 3 has a prime factor of 3, so 1/3 repeats. Fractions with
                  denominators like 2, 4, 5, 8, 10, 16, 20, 25 always terminate because their only
                  prime factors are 2 and/or 5.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I convert decimals back to fractions?</h4>
                <p>
                  Yes. Write the decimal as a fraction over a power of 10, then simplify. For 0.75,
                  write 75/100, then simplify to 3/4. For repeating decimals, use algebra: if x = 0.333...,
                  then 10x = 3.333..., so 9x = 3, and x = 3/9 = 1/3.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
