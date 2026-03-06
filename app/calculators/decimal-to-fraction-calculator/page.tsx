"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DecimalToFractionCalculator() {
  const [decimal, setDecimal] = useState<string>("");
  const [result, setResult] = useState<{ fraction: string; steps: string } | null>(null);

  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const calculate = () => {
    const dec = parseFloat(decimal);
    
    if (!isNaN(dec)) {
      const str = decimal.toString();
      const decimalPlaces = str.includes(".") ? str.split(".")[1].length : 0;
      const denominator = Math.pow(10, decimalPlaces);
      const numerator = Math.round(dec * denominator);
      const commonDivisor = gcd(numerator, denominator);
      
      const simplifiedNum = numerator / commonDivisor;
      const simplifiedDen = denominator / commonDivisor;
      
      setResult({
        fraction: `${simplifiedNum}/${simplifiedDen}`,
        steps: `${dec} = ${numerator}/${denominator} = ${simplifiedNum}/${simplifiedDen}`
      });
    }
  };

  const reset = () => {
    setDecimal("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Decimal</label>
              <Input
                type="number"
                placeholder="e.g., 0.75"
                step="any"
                value={decimal}
                onChange={(e) => setDecimal(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Fraction</p>
                  <p className="text-2xl font-semibold">{result.fraction}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Steps</p>
                  <p className="text-sm">{result.steps}</p>
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
              How to Use This Decimal to Fraction Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your decimal number</p>
                  <p>Input any decimal value like 0.75, 2.5, or 0.333. The calculator handles both terminating and repeating decimals.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Convert</p>
                  <p>The calculator converts the decimal to a fraction and simplifies it to lowest terms using the greatest common divisor.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Review the result and steps</p>
                  <p>See the final simplified fraction and the conversion steps showing how the calculation was performed.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Decimal to Fraction Conversions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Decimal</th>
                    <th className="text-left py-3 px-2 font-semibold">Fraction</th>
                    <th className="text-left py-3 px-2 font-semibold">Percent</th>
                    <th className="text-left py-3 px-2 font-semibold">Common Use</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">0.1</td>
                    <td className="py-3 px-2">1/10</td>
                    <td className="py-3 px-2">10%</td>
                    <td className="py-3 px-2">General</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">0.125</td>
                    <td className="py-3 px-2">1/8</td>
                    <td className="py-3 px-2">12.5%</td>
                    <td className="py-3 px-2">Measurements</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">0.2</td>
                    <td className="py-3 px-2">1/5</td>
                    <td className="py-3 px-2">20%</td>
                    <td className="py-3 px-2">General</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">0.25</td>
                    <td className="py-3 px-2">1/4</td>
                    <td className="py-3 px-2">25%</td>
                    <td className="py-3 px-2">Measurements, cooking</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">0.333...</td>
                    <td className="py-3 px-2">1/3</td>
                    <td className="py-3 px-2">33.33%</td>
                    <td className="py-3 px-2">General</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">0.5</td>
                    <td className="py-3 px-2">1/2</td>
                    <td className="py-3 px-2">50%</td>
                    <td className="py-3 px-2">Universal</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">0.625</td>
                    <td className="py-3 px-2">5/8</td>
                    <td className="py-3 px-2">62.5%</td>
                    <td className="py-3 px-2">Measurements</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">0.75</td>
                    <td className="py-3 px-2">3/4</td>
                    <td className="py-3 px-2">75%</td>
                    <td className="py-3 px-2">Measurements, cooking</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">0.875</td>
                    <td className="py-3 px-2">7/8</td>
                    <td className="py-3 px-2">87.5%</td>
                    <td className="py-3 px-2">Measurements</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Repeating decimals like 0.333... are shown with ellipsis. The calculator converts them to exact fractions (1/3 in this case).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Decimal to Fraction Conversion
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">The Conversion Process</h4>
                <p>
                  To convert a decimal to a fraction, write the decimal as a fraction over 1, then multiply both top and bottom by 10 for each digit after the decimal point. For 0.75: write 0.75/1, multiply by 100/100 to get 75/100, then simplify.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Simplifying Fractions</h4>
                <p>
                  After converting, divide both numerator and denominator by their greatest common divisor (GCD). For 75/100, the GCD is 25, so 75÷25=3 and 100÷25=4, giving 3/4.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Terminating vs Repeating Decimals</h4>
                <p>
                  Terminating decimals (0.25, 0.125) convert to exact fractions. Repeating decimals (0.333..., 0.1666...) also convert to exact fractions using algebra: if x = 0.333..., then 10x = 3.333..., so 9x = 3, and x = 1/3.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Mixed Numbers</h4>
                <p>
                  For decimals greater than 1, like 2.75, separate the whole number from the decimal. Convert 0.75 to 3/4, then combine: 2.75 = 2 and 3/4, or as an improper fraction, 11/4.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Working with Fractions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Memorize Common Conversions</p>
                  <p>Know that 0.5=1/2, 0.25=1/4, 0.75=3/4, 0.2=1/5, 0.125=1/8, and 0.333...=1/3. These appear constantly in cooking, measurements, and everyday math.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use Fractions for Precision</p>
                  <p>Fractions are exact; decimals often round. 1/3 is exactly one-third, while 0.333 is an approximation. Use fractions when precision matters.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Know When to Use Each Form</p>
                  <p>Use decimals for money and measurements with metric units. Use fractions for cooking (US), woodworking, and when exact ratios matter.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Check Your Work</p>
                  <p>Divide the numerator by the denominator to verify. If you converted 0.75 to 3/4, check: 3÷4=0.75. This catches simplification errors.</p>
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
                <h4 className="font-medium text-foreground mb-2">How do I convert a decimal to a fraction?</h4>
                <p>
                  Count digits after the decimal point. Write the number over 10, 100, 1000, etc. (one zero per digit). Simplify by dividing both by their GCD. Example: 0.75 = 75/100 = 3/4.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is 0.333 as a fraction?</h4>
                <p>
                  0.333 (terminating) = 333/1000. But 0.333... (repeating) = 1/3 exactly. The ellipsis matters — repeating decimals have exact fraction forms.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I convert a repeating decimal?</h4>
                <p>
                  Use algebra: if x = 0.333..., then 10x = 3.333.... Subtract: 10x - x = 3.333... - 0.333..., so 9x = 3, and x = 1/3. For 0.1666..., use 100x - 10x to isolate the repeating part.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can all decimals be converted to fractions?</h4>
                <p>
                  Terminating and repeating decimals can be converted to exact fractions. Irrational numbers like π or √2 cannot — their decimals never repeat or terminate.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is 2.5 as a fraction?</h4>
                <p>
                  2.5 = 25/10 = 5/2 as an improper fraction, or 2 and 1/2 as a mixed number. Both are correct — use improper fractions for calculations, mixed numbers for everyday use.
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
                href="/calculators/fraction-to-decimal-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Fraction to Decimal Calculator</span>
                <p className="text-muted-foreground">Convert fractions to decimal form with step-by-step division</p>
              </a>
              <a
                href="/calculators/fraction-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Fraction Calculator</span>
                <p className="text-muted-foreground">Add, subtract, multiply, and divide fractions with detailed steps</p>
              </a>
              <a
                href="/calculators/percent-to-fraction-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Percent to Fraction Calculator</span>
                <p className="text-muted-foreground">Convert percentages to simplified fractions</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
