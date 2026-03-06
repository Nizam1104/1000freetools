"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RootCalculator() {
  const [radicand, setRadicand] = useState<string>("");
  const [index, setIndex] = useState<string>("2");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const r = parseFloat(radicand);
    const i = parseFloat(index);
    if (!isNaN(r) && !isNaN(i) && i !== 0) {
      if (r < 0 && i % 2 === 0) {
        setResult(NaN);
      } else {
        setResult(Math.pow(r, 1 / i));
      }
    }
  };

  const reset = () => {
    setRadicand("");
    setIndex("2");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Radicand (number)</label>
              <Input
                type="number"
                placeholder="e.g., 64"
                step="any"
                value={radicand}
                onChange={(e) => setRadicand(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Root Index (n)</label>
              <Input
                type="number"
                placeholder="e.g., 3 for cube root"
                value={index}
                onChange={(e) => setIndex(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">
                  Result ({index}√{radicand})
                </p>
                <p className="text-2xl font-semibold">
                  {isNaN(result) ? "Undefined (complex result)" : result}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Root Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the radicand</p>
                  <p>Type the number you want to find the root of. This can be any positive number, or negative for odd roots.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Set the root index</p>
                  <p>Enter 2 for square root, 3 for cube root, or any other positive integer for higher-order roots.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Calculate instantly</p>
                  <p>Click Calculate to see the result. The calculator shows the nth root with full precision.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Root Values Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Number</th>
                    <th className="text-left py-3 px-2 font-semibold">Square Root (√)</th>
                    <th className="text-left py-3 px-2 font-semibold">Cube Root (³√)</th>
                    <th className="text-left py-3 px-2 font-semibold">4th Root (⁴√)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2">1.000</td>
                    <td className="py-3 px-2">1.000</td>
                    <td className="py-3 px-2">1.000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">4</td>
                    <td className="py-3 px-2">2.000</td>
                    <td className="py-3 px-2">1.587</td>
                    <td className="py-3 px-2">1.414</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">8</td>
                    <td className="py-3 px-2">2.828</td>
                    <td className="py-3 px-2">2.000</td>
                    <td className="py-3 px-2">1.682</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">9</td>
                    <td className="py-3 px-2">3.000</td>
                    <td className="py-3 px-2">2.080</td>
                    <td className="py-3 px-2">1.732</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">16</td>
                    <td className="py-3 px-2">4.000</td>
                    <td className="py-3 px-2">2.000</td>
                    <td className="py-3 px-2">2.000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">25</td>
                    <td className="py-3 px-2">5.000</td>
                    <td className="py-3 px-2">2.924</td>
                    <td className="py-3 px-2">2.236</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">27</td>
                    <td className="py-3 px-2">5.196</td>
                    <td className="py-3 px-2">3.000</td>
                    <td className="py-3 px-2">2.280</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">64</td>
                    <td className="py-3 px-2">8.000</td>
                    <td className="py-3 px-2">4.000</td>
                    <td className="py-3 px-2">2.828</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">81</td>
                    <td className="py-3 px-2">9.000</td>
                    <td className="py-3 px-2">4.327</td>
                    <td className="py-3 px-2">3.000</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">100</td>
                    <td className="py-3 px-2">10.000</td>
                    <td className="py-3 px-2">4.642</td>
                    <td className="py-3 px-2">3.162</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Values rounded to 3 decimal places. Perfect squares and cubes have integer roots.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding nth Roots
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                The nth root of a number x is the value that, when raised to the power of n, equals x. In mathematical notation: if yⁿ = x, then y = ⁿ√x. The square root (n=2) and cube root (n=3) are the most common, but you can calculate any positive integer root.
              </p>
              <p>
                Square roots appear everywhere in math and science. The Pythagorean theorem uses them to find distances. Standard deviation in statistics is a square root. Even the quadratic formula has a square root in it. Cube roots show up in volume calculations — if you know a cube&apos;s volume, the cube root gives you the side length.
              </p>
              <p>
                Higher roots have practical uses too. The 4th root appears in physics formulas for radiation and in engineering stress calculations. Financial analysts use roots when calculating compound annual growth rates over multiple periods.
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Key insight:</strong> Taking the nth root is the same as raising to the power of 1/n. So ³√8 = 8^(1/3) = 2. This relationship lets calculators compute roots using exponentiation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Root Calculation Tips and Rules
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Even roots of negative numbers</h4>
                <p>
                  Square roots, 4th roots, and all even roots of negative numbers produce complex (imaginary) results. There&apos;s no real number that squares to -4. This calculator shows &quot;Undefined&quot; for these cases since it works with real numbers only.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Odd roots preserve sign</h4>
                <p>
                  Cube roots, 5th roots, and all odd roots of negative numbers are negative. The cube root of -8 is -2 because (-2)³ = -8. This calculator handles negative radicands for odd root indices.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Perfect powers have integer roots</h4>
                <p>
                  When a number is a perfect square (4, 9, 16, 25...), its square root is a whole number. Perfect cubes (8, 27, 64, 125...) have integer cube roots. Recognizing these speeds up mental math.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Root of 1 is always 1</h4>
                <p>
                  No matter what root index you use, the nth root of 1 equals 1. This is because 1 raised to any power stays 1. Similarly, the nth root of 0 is always 0.
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
                <h4 className="font-medium text-foreground mb-2">What is the square root of 2?</h4>
                <p>
                  √2 ≈ 1.41421356... It&apos;s an irrational number, meaning the decimal never ends or repeats. This value appears in geometry — it&apos;s the diagonal of a unit square. The ancient Greeks discovered √2 cannot be written as a fraction.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I calculate the 5th root of a number?</h4>
                <p>
                  Yes. Enter your number as the radicand and 5 as the root index. The 5th root of 32 is 2 because 2⁵ = 32. Higher roots get smaller — the 10th root of 1024 is also 2.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why is the cube root of a negative number defined?</h4>
                <p>
                  Odd roots work with negative numbers because a negative times itself an odd number of times stays negative. (-3)³ = -27, so ³√(-27) = -3. Even roots like square root have no real solution for negatives.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What&apos;s the difference between square root and principal square root?</h4>
                <p>
                  Every positive number has two square roots: one positive, one negative. Both 3 and -3 square to 9. The &quot;principal&quot; square root is the positive one — that&apos;s what the √ symbol means. This calculator returns the principal root.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How accurate are the results?</h4>
                <p>
                  Results use JavaScript&apos;s floating-point precision (about 15-17 significant digits). For most practical purposes this is more than enough. Extremely large or small numbers may have minor rounding in the last digits.
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
                href="/calculators/square-root-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Square Root Calculator</span>
                <p className="text-muted-foreground">Quickly calculate square roots of any number</p>
              </a>
              <a
                href="/calculators/exponent-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Exponent Calculator</span>
                <p className="text-muted-foreground">Calculate powers and exponential expressions</p>
              </a>
              <a
                href="/calculators/radical-simplifier"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Radical Simplifier</span>
                <p className="text-muted-foreground">Simplify square roots and radical expressions</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
