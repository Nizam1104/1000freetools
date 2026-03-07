"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SquareRootCalculator() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const num = parseFloat(number);
    if (isNaN(num)) return;

    if (num < 0) {
      setResult({
        error: "Cannot calculate square root of a negative number (in real numbers)",
        complex: `√(${num}) = ${Math.sqrt(Math.abs(num))}i (imaginary)`
      });
      return;
    }

    const sqrt = Math.sqrt(num);
    const sqrtRounded = Math.round(sqrt * 1000000) / 1000000;
    const isPerfect = Number.isInteger(sqrt);
    const squared = sqrtRounded * sqrtRounded;

    let simplifiedRadical = null;
    if (!isPerfect) {
      simplifiedRadical = simplifyRadical(num);
    }

    setResult({
      number: num,
      sqrt: sqrtRounded,
      isPerfect,
      squared: squared,
      simplifiedRadical,
      steps: generateSteps(num, sqrtRounded, isPerfect, simplifiedRadical)
    });
  };

  const simplifyRadical = (num: number): { coefficient: number; radicand: number } | null => {
    let coefficient = 1;
    let radicand = num;

    for (let i = 2; i * i <= radicand; i++) {
      while (radicand % (i * i) === 0) {
        coefficient *= i;
        radicand /= (i * i);
      }
    }

    if (coefficient === 1) return null;
    return { coefficient, radicand };
  };

  const generateSteps = (num: number, sqrt: number, isPerfect: boolean, simplified: any): string[] => {
    const steps: string[] = [];
    steps.push(`Find √${num}`);
    steps.push(``);

    if (isPerfect) {
      steps.push(`${num} is a perfect square`);
      steps.push(`√${num} = ${sqrt}`);
      steps.push(`Check: ${sqrt}² = ${sqrt * sqrt}`);
    } else {
      steps.push(`${num} is not a perfect square`);
      if (simplified) {
        steps.push(``);
        steps.push(`Simplify the radical:`);
        steps.push(`√${num} = √(${simplified.coefficient}² × ${simplified.radicand})`);
        steps.push(`= ${simplified.coefficient}√${simplified.radicand}`);
      }
      steps.push(``);
      steps.push(`Decimal approximation:`);
      steps.push(`√${num} ≈ ${sqrt}`);
    }

    return steps;
  };

  const reset = () => {
    setNumber("");
    setResult(null);
  };

  const loadExample = (value: string) => {
    setNumber(value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Square Root Calculator – Compute √ of Any Number</h1>
        <p className="text-muted-foreground">
          Find the square root of any number instantly with our free online square root calculator. Supports both perfect and imperfect squares with high precision decimal results
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Square Root Calculator</CardTitle>
          <CardDescription>
            Calculate the square root of any positive number with high precision.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Enter a Number</Label>
              <Input
                type="number"
                placeholder="e.g., 144"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Enter any positive number to find its square root
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample("16")} className="text-xs h-8">
                √16 (Perfect)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("2")} className="text-xs h-8">
                √2 (Irrational)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("72")} className="text-xs h-8">
                √72 (Simplify)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("1000")} className="text-xs h-8">
                √1000
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("-9")} className="text-xs h-8">
                √-9 (Complex)
              </Button>
            </div>

            {result && (
              <div className="space-y-4">
                {result.error ? (
                  <div className="p-6 bg-destructive/10 rounded-lg text-center">
                    <p className="text-sm text-destructive mb-2">{result.error}</p>
                    <p className="text-lg font-mono">{result.complex}</p>
                  </div>
                ) : (
                  <>
                    <div className="p-6 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-2">Square Root of {result.number}</p>
                      <p className="text-5xl font-bold mb-2">
                        {result.isPerfect ? result.sqrt : result.sqrt.toFixed(10)}
                      </p>
                      {result.isPerfect ? (
                        <p className="text-sm text-muted-foreground">
                          Perfect square: {result.sqrt} × {result.sqrt} = {result.number}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {result.sqrt.toFixed(6)}² ≈ {result.number}
                        </p>
                      )}
                      {result.simplifiedRadical && (
                        <p className="text-lg mt-3">
                          Simplified radical: <strong>{result.simplifiedRadical.coefficient}√{result.simplifiedRadical.radicand}</strong>
                        </p>
                      )}
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
                      <div className="space-y-2 text-sm">
                        {result.steps.map((step: string, i: number) => (
                          <div key={i} className={`font-mono text-xs ${step === "" ? "h-4" : ""}`}>
                            {step || "\u00A0"}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">Radical Form</div>
                        <div className="text-xl font-semibold">√{result.number}</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">Exponent Form</div>
                        <div className="text-xl font-semibold">{result.number}<sup>1/2</sup></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Square Root Calculator – Compute √ of Any Number</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Find the square root of any number instantly with our free online square root calculator. Supports both perfect and imperfect squares with high precision decimal results.
          </p>
          <p className="text-sm text-muted-foreground">
            Perfect squares like 16, 25, or 144 give clean integer answers. But most numbers have irrational square roots – decimals that go on forever without repeating. This calculator shows up to 10 decimal places of precision.
          </p>
          <p className="text-sm text-muted-foreground">
            Need to simplify a radical for homework? The calculator shows simplified radical form too. √72 becomes 6√2, making it easier to work with in algebra problems.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Square Roots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">What is a Square Root?</h4>
              <p className="text-xs text-muted-foreground mb-2">
                The square root of a number is a value that, when multiplied by itself, gives the original number.
              </p>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                If x² = n, then x = √n
              </code>
              <div className="mt-2 text-xs text-muted-foreground">
                Example: √25 = 5 because 5 × 5 = 25
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Perfect Squares</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Numbers whose square roots are whole numbers. These are easy to recognize and calculate.
              </p>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                1, 4, 9, 16, 25, 36, 49, 64, 81, 100,<br />
                121, 144, 169, 196, 225, 256, 289, 324, 361, 400
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Irrational Square Roots</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Most numbers have square roots that are irrational – they can't be written as exact fractions and their decimals never end or repeat.
              </p>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                √2 ≈ 1.4142135623...
              </code>
              <div className="mt-2 text-xs text-muted-foreground">
                The decimal continues infinitely without a pattern
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Simplifying Radicals</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Factor out perfect squares from under the radical to simplify.
              </p>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                √72 = √(36 × 2) = 6√2
              </code>
              <div className="mt-2 text-xs text-muted-foreground">
                Pull out √36 = 6, leave √2 inside
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Square Roots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Number</th>
                  <th className="text-left p-2">Square Root</th>
                  <th className="text-left p-2">Simplified</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-mono">√2</td>
                  <td className="p-2 font-mono">1.4142135624</td>
                  <td className="p-2 text-muted-foreground">Irrational</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">√3</td>
                  <td className="p-2 font-mono">1.7320508076</td>
                  <td className="p-2 text-muted-foreground">Irrational</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">√5</td>
                  <td className="p-2 font-mono">2.2360679775</td>
                  <td className="p-2 text-muted-foreground">Irrational</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">√8</td>
                  <td className="p-2 font-mono">2.8284271247</td>
                  <td className="p-2 font-mono">2√2</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">√10</td>
                  <td className="p-2 font-mono">3.1622776602</td>
                  <td className="p-2 text-muted-foreground">Irrational</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">√12</td>
                  <td className="p-2 font-mono">3.4641016151</td>
                  <td className="p-2 font-mono">2√3</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">√18</td>
                  <td className="p-2 font-mono">4.2426406871</td>
                  <td className="p-2 font-mono">3√2</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">√20</td>
                  <td className="p-2 font-mono">4.4721359550</td>
                  <td className="p-2 font-mono">2√5</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">√50</td>
                  <td className="p-2 font-mono">7.0710678119</td>
                  <td className="p-2 font-mono">5√2</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">√72</td>
                  <td className="p-2 font-mono">8.4852813742</td>
                  <td className="p-2 font-mono">6√2</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">√100</td>
                  <td className="p-2 font-mono">10</td>
                  <td className="p-2 font-mono">10 (Perfect)</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">√144</td>
                  <td className="p-2 font-mono">12</td>
                  <td className="p-2 font-mono">12 (Perfect)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Square Roots by Hand</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Method 1: Prime Factorization</h4>
              <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
                <li>Break the number into prime factors</li>
                <li>Group factors into pairs</li>
                <li>Take one from each pair outside the radical</li>
                <li>Multiply remaining factors stay inside</li>
              </ol>
              <div className="mt-2 p-2 bg-muted rounded text-xs font-mono">
                √144 = √(2×2×2×2×3×3) = 2×2×3 = 12
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Method 2: Estimation</h4>
              <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
                <li>Find perfect squares around your number</li>
                <li>Estimate where your number falls between them</li>
                <li>Refine by squaring your guess</li>
                <li>Adjust up or down based on result</li>
              </ol>
              <div className="mt-2 p-2 bg-muted rounded text-xs font-mono">
                √50: Between √49=7 and √64=8<br />
                Try 7.1: 7.1² = 50.41 (close!)<br />
                Try 7.07: 7.07² ≈ 49.98 (very close)
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Method 3: Long Division Method</h4>
              <p className="text-xs text-muted-foreground mb-2">
                A systematic algorithm similar to long division. Works for any number, gives as many decimal places as needed. Best learned with visual demonstration.
              </p>
              <div className="text-xs text-muted-foreground">
                This method was commonly taught before calculators. It's reliable but time-consuming for most everyday uses.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Square Root Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Product Rule</h4>
              <code className="text-xs font-mono bg-background px-2 py-1 rounded block mb-2">
                √(a × b) = √a × √b
              </code>
              <p className="text-xs text-muted-foreground">
                √(16 × 9) = √16 × √9 = 4 × 3 = 12
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Quotient Rule</h4>
              <code className="text-xs font-mono bg-background px-2 py-1 rounded block mb-2">
                √(a / b) = √a / √b
              </code>
              <p className="text-xs text-muted-foreground">
                √(100 / 4) = √100 / √4 = 10 / 2 = 5
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Square Root of a Square</h4>
              <code className="text-xs font-mono bg-background px-2 py-1 rounded block mb-2">
                √(a²) = |a|
              </code>
              <p className="text-xs text-muted-foreground">
                √(5²) = 5, but √((-5)²) = 5 (always positive)
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Exponent Form</h4>
              <code className="text-xs font-mono bg-background px-2 py-1 rounded block mb-2">
                √a = a^(1/2)
              </code>
              <p className="text-xs text-muted-foreground">
                Square root equals raising to the power of 1/2
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the square root of a negative number?</h4>
            <p className="text-xs text-muted-foreground">
              In real numbers, you can't take the square root of a negative. But in complex numbers, √(-9) = 3i, where i is the imaginary unit (i² = -1).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why simplify radicals?</h4>
            <p className="text-xs text-muted-foreground">
              Simplified form makes calculations easier and answers cleaner. 6√2 is more useful than √72 when doing algebra. It's the standard form teachers expect.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is √2 a rational number?</h4>
            <p className="text-xs text-muted-foreground">
              No. √2 is irrational – it can't be written as a fraction of integers. The ancient Greeks proved this around 500 BCE. The decimal never ends or repeats.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can a square root have two answers?</h4>
            <p className="text-xs text-muted-foreground">
              Every positive number has two square roots: one positive and one negative. √25 = 5 (principal root), but -5 is also a square root since (-5)² = 25. The radical symbol √ means the positive root only.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I type square root on my keyboard?</h4>
            <p className="text-xs text-muted-foreground">
              Use the √ symbol (Alt+251 on Windows, Option+V on Mac), or write sqrt(x), or use exponent notation: x^(1/2). In most math software, sqrt() is the standard function name.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the square root of 0?</h4>
            <p className="text-xs text-muted-foreground">
              √0 = 0. Zero is the only number whose square root equals itself. It's also the boundary – positive numbers have real square roots, negative numbers don't (in the real number system).
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Math Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="/math-tools/scientific-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Scientific Calculator</p>
              <p className="text-xs text-muted-foreground">Advanced math functions</p>
            </a>
            <a href="/math-tools/exponent-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Exponent Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate powers</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
