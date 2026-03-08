"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ModuloCalculator() {
  const [dividend, setDividend] = useState<string>("");
  const [divisor, setDivisor] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(dividend);
    const n = parseFloat(divisor);
    
    if (!isNaN(a) && !isNaN(n) && n !== 0) {
      setResult(((a % n) + n) % n);
    }
  };

  const reset = () => {
    setDividend("");
    setDivisor("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Dividend (a)</label>
              <Input
                type="number"
                placeholder="e.g., 17"
                step="any"
                value={dividend}
                onChange={(e) => setDividend(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Divisor (n)</label>
              <Input
                type="number"
                placeholder="e.g., 5"
                step="any"
                value={divisor}
                onChange={(e) => setDivisor(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-2xl font-semibold">{dividend} mod {divisor} = {result}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Verification: {dividend} = {divisor} × {Math.floor(parseFloat(dividend) / parseFloat(divisor))} + {result}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold text-sm mb-2">What Is Modulo?</h4>
            <p className="text-xs text-muted-foreground">
              The modulo operation finds the remainder after division. "a mod n" asks: when you divide a by n, what's left over? Example: 17 mod 5 = 2, because 17 = 5×3 + 2.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use This Modulo Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">1</div>
              <div>
                <p className="font-medium text-foreground">Enter the dividend (a)</p>
                <p>This is the number being divided. Can be positive, negative, or decimal.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">2</div>
              <div>
                <p className="font-medium text-foreground">Enter the divisor (n)</p>
                <p>This is the number you're dividing by. Cannot be zero.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">3</div>
              <div>
                <p className="font-medium text-foreground">Calculate the remainder</p>
                <p>The result is always between 0 and the divisor (exclusive).</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Understanding Modulo Operations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Modulo arithmetic is sometimes called "clock arithmetic." On a 12-hour clock, 15:00 is the same as 3:00 because 15 mod 12 = 3. The pattern repeats every 12 hours.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 font-semibold">Expression</th>
                  <th className="text-left py-2 px-2 font-semibold">Calculation</th>
                  <th className="text-left py-2 px-2 font-semibold">Result</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2 px-2">17 mod 5</td>
                  <td className="py-2 px-2">17 = 5×3 + 2</td>
                  <td className="py-2 px-2">2</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">20 mod 4</td>
                  <td className="py-2 px-2">20 = 4×5 + 0</td>
                  <td className="py-2 px-2">0</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">7 mod 3</td>
                  <td className="py-2 px-2">7 = 3×2 + 1</td>
                  <td className="py-2 px-2">1</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">100 mod 7</td>
                  <td className="py-2 px-2">100 = 7×14 + 2</td>
                  <td className="py-2 px-2">2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-muted/50 rounded text-xs font-mono">
            <div>Formula: a mod n = a - n × floor(a/n)</div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Common Applications of Modulo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="p-3 bg-muted/50 rounded">
              <p className="font-medium text-foreground">Cryptography</p>
              <p className="text-xs">RSA encryption and many cryptographic algorithms rely on modular arithmetic with large prime numbers.</p>
            </div>
            <div className="p-3 bg-muted/50 rounded">
              <p className="font-medium text-foreground">Computer Science</p>
              <p className="text-xs">Hash functions, circular buffers, and determining even/odd (n mod 2) all use modulo operations.</p>
            </div>
            <div className="p-3 bg-muted/50 rounded">
              <p className="font-medium text-foreground">Time Calculations</p>
              <p className="text-xs">Converting between 24-hour and 12-hour time, calculating day of week, handling wraparound.</p>
            </div>
            <div className="p-3 bg-muted/50 rounded">
              <p className="font-medium text-foreground">Checksums</p>
              <p className="text-xs">ISBN check digits, credit card validation (Luhn algorithm), and error detection use modulo.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">What does mod mean in math?</h4>
            <p className="text-xs text-muted-foreground">
              "Mod" is short for "modulo." It gives the remainder after division. 17 mod 5 = 2 means when you divide 17 by 5, the remainder is 2. Written as: 17 ≡ 2 (mod 5).
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Can modulo handle negative numbers?</h4>
            <p className="text-xs text-muted-foreground">
              Yes, but conventions vary. This calculator uses the mathematical convention where the result is always non-negative. -7 mod 3 = 2, because -7 = 3×(-3) + 2.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">What is modulo used for in programming?</h4>
            <p className="text-xs text-muted-foreground">
              Common uses include: checking if a number is even (n % 2 == 0), cycling through array indices, implementing hash tables, limiting values to a range, and creating repeating patterns.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">How is modulo different from remainder?</h4>
            <p className="text-xs text-muted-foreground">
              For positive numbers, they're the same. For negative numbers, they can differ. The modulo result always has the same sign as the divisor. Remainder takes the sign of the dividend.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">What happens if I divide by zero?</h4>
            <p className="text-xs text-muted-foreground">
              Modulo by zero is undefined, just like regular division. The calculator will not produce a result. Mathematically, there's no meaningful answer to "a mod 0."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
