"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RoundingCalculator() {
  const [number, setNumber] = useState<string>("");
  const [places, setPlaces] = useState<string>("0");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const num = parseFloat(number);
    const p = parseInt(places);
    
    if (!isNaN(num) && !isNaN(p) && p >= 0) {
      setResult(Number(num.toFixed(p)));
    }
  };

  const reset = () => {
    setNumber("");
    setPlaces("0");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Rounding Calculator – Round Numbers to Decimal Places</CardTitle>
          <CardDescription>
            Round any number to specified decimal places instantly with our free Rounding Calculator. Enter your number and choose decimal places for currency, science, or general math — uses standard round-half-up method for accurate results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Number</label>
              <Input
                type="number"
                placeholder="e.g., 3.14159"
                step="any"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Decimal Places</label>
              <Input
                type="number"
                placeholder="e.g., 2"
                min="0"
                value={places}
                onChange={(e) => setPlaces(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Round</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Rounded Result</p>
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
              How to Use This Rounding Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your number</p>
                  <p>Type any decimal number you want to round. This can be positive, negative, or have many decimal places.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Choose decimal places</p>
                  <p>Enter how many decimal places to round to. Use 0 for whole numbers, 2 for currency, or any positive integer.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Get rounded result</p>
                  <p>Click Round to see the result instantly. The calculator uses standard rounding rules (round half up).</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Rounding Examples Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Original Number</th>
                    <th className="text-left py-3 px-2 font-semibold">0 Places</th>
                    <th className="text-left py-3 px-2 font-semibold">1 Place</th>
                    <th className="text-left py-3 px-2 font-semibold">2 Places</th>
                    <th className="text-left py-3 px-2 font-semibold">3 Places</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">3.14159</td>
                    <td className="py-3 px-2">3</td>
                    <td className="py-3 px-2">3.1</td>
                    <td className="py-3 px-2">3.14</td>
                    <td className="py-3 px-2">3.142</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">2.71828</td>
                    <td className="py-3 px-2">3</td>
                    <td className="py-3 px-2">2.7</td>
                    <td className="py-3 px-2">2.72</td>
                    <td className="py-3 px-2">2.718</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1.41421</td>
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2">1.4</td>
                    <td className="py-3 px-2">1.41</td>
                    <td className="py-3 px-2">1.414</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">0.99999</td>
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2">1.0</td>
                    <td className="py-3 px-2">1.00</td>
                    <td className="py-3 px-2">1.000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">12.34567</td>
                    <td className="py-3 px-2">12</td>
                    <td className="py-3 px-2">12.3</td>
                    <td className="py-3 px-2">12.35</td>
                    <td className="py-3 px-2">12.346</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">99.999</td>
                    <td className="py-3 px-2">100</td>
                    <td className="py-3 px-2">100.0</td>
                    <td className="py-3 px-2">100.00</td>
                    <td className="py-3 px-2">99.999</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">-5.678</td>
                    <td className="py-3 px-2">-6</td>
                    <td className="py-3 px-2">-5.7</td>
                    <td className="py-3 px-2">-5.68</td>
                    <td className="py-3 px-2">-5.678</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">0.00156</td>
                    <td className="py-3 px-2">0</td>
                    <td className="py-3 px-2">0.0</td>
                    <td className="py-3 px-2">0.00</td>
                    <td className="py-3 px-2">0.002</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: All examples use standard rounding (round half up). 5 and above rounds up, below 5 rounds down.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Rounding
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Rounding simplifies a number by reducing its decimal places while keeping it close to the original value. The most common method is &quot;round half up&quot; — if the digit after your target place is 5 or higher, round up. If it&apos;s 4 or lower, round down.
              </p>
              <p>
                Consider 3.14159 rounded to 2 decimal places. Look at the third decimal (1). Since 1 is less than 5, you round down to 3.14. But 3.146 rounded to 2 decimals becomes 3.15 because 6 is 5 or higher. This is the method taught in most schools and used in everyday calculations.
              </p>
              <p>
                Rounding matters in real life. Prices round to cents (2 decimals). Scientific measurements round to significant figures. Tax calculations often round to whole dollars. The key is consistency — once you choose a precision level, apply it throughout your work.
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Watch out:</strong> Rounding intermediate results can cause errors. Keep full precision during calculations, then round only the final answer. This prevents &quot;rounding error accumulation.&quot;
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Rounding Best Practices
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Currency always uses 2 decimals</h4>
                <p>
                  Dollar amounts round to cents — two decimal places. $12.345 becomes $12.35. Some countries use different subdivisions, but 2 decimals is standard for USD, EUR, GBP, and most major currencies.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Significant figures for science</h4>
                <p>
                  Scientific measurements round to significant figures, not decimal places. The number 0.00123 has 3 significant figures. Your result should match the precision of your least precise measurement.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Banker&apos;s rounding exists</h4>
                <p>
                  Some systems use &quot;round half to even&quot; (banker&apos;s rounding) to reduce bias. With this method, 2.5 rounds to 2, but 3.5 also rounds to 4 (the nearest even number). This calculator uses standard round-half-up instead.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Negative numbers round the same way</h4>
                <p>
                  -5.678 rounded to 2 decimals is -5.68. The sign doesn&apos;t change the rounding rule — you still look at the next digit and round based on whether it&apos;s 5 or higher.
                </p>
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
                <h4 className="font-medium text-foreground mb-2">What happens when rounding 0.5?</h4>
                <p>
                  With standard rounding, 0.5 rounds up to 1. The rule is &quot;5 or above rounds up.&quot; So 2.5 becomes 3, and 3.5 becomes 4. Some systems use banker&apos;s rounding (round to even), but this calculator uses the common round-half-up method.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I round to negative decimal places?</h4>
                <p>
                  This calculator rounds to 0 or more decimal places. Rounding to negative places would round to tens, hundreds, etc. (1234 rounded to -2 places = 1200). That&apos;s a different operation not supported here.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why does 0.99999 round to 1?</h4>
                <p>
                  When you round 0.99999 to 0 decimal places, you look at the first decimal (9). Since 9 ≥ 5, you round up. The ones digit (0) becomes 1. This is correct — 0.99999 is extremely close to 1.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is rounding the same as truncating?</h4>
                <p>
                  No. Truncating just chops off digits without rounding. Truncating 3.9 gives 3. Rounding 3.9 to 0 decimals gives 4. Truncation always rounds toward zero; rounding goes to the nearest value.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I round to the nearest whole number?</h4>
                <p>
                  Set decimal places to 0. This rounds to the nearest integer. Numbers like 3.1, 3.2, 3.3, 3.4 round down to 3. Numbers like 3.5, 3.6, 3.7, 3.8, 3.9 round up to 4.
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
                href="/calculators/significant-figures-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Significant Figures Calculator</span>
                <p className="text-muted-foreground">Round numbers to specified significant figures</p>
              </a>
              <a
                href="/calculators/decimal-to-fraction-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Decimal to Fraction Calculator</span>
                <p className="text-muted-foreground">Convert decimals to simplified fractions</p>
              </a>
              <a
                href="/calculators/fraction-to-decimal-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Fraction to Decimal Calculator</span>
                <p className="text-muted-foreground">Convert fractions to decimal form</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
