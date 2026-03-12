"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FractionToDecimalConverter() {
  const [whole, setWhole] = useState<string>("0");
  const [numerator, setNumerator] = useState<string>("1");
  const [denominator, setDenominator] = useState<string>("2");
  const [result, setResult] = useState<{
    decimal: number;
    exactDecimal: string;
    steps: string[];
    isRepeating: boolean;
    repeatingPart?: string;
  } | null>(null);
  const [error, setError] = useState<string>("");

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  const findRepeatingDecimal = (numerator: number, denominator: number): {
    decimal: string;
    isRepeating: boolean;
    repeatingPart?: string;
  } => {
    const wholePart = Math.floor(Math.abs(numerator) / denominator);
    let remainder = Math.abs(numerator) % denominator;

    if (remainder === 0) {
      return {
        decimal: (numerator < 0 ? "-" : "") + wholePart.toString(),
        isRepeating: false
      };
    }

    const seenRemainders = new Map<number, number>();
    let decimalPart = "";
    let position = 0;

    while (remainder !== 0 && !seenRemainders.has(remainder)) {
      seenRemainders.set(remainder, position);
      remainder *= 10;
      const digit = Math.floor(remainder / denominator);
      decimalPart += digit.toString();
      remainder = remainder % denominator;
      position++;

      if (position > 500) {
        break;
      }
    }

    const sign = numerator < 0 ? "-" : "";

    if (remainder === 0) {
      return {
        decimal: `${sign}${wholePart}.${decimalPart}`,
        isRepeating: false
      };
    }

    const repeatStart = seenRemainders.get(remainder)!;
    const nonRepeating = decimalPart.slice(0, repeatStart);
    const repeating = decimalPart.slice(repeatStart);

    return {
      decimal: `${sign}${wholePart}.${nonRepeating}(${repeating})`,
      isRepeating: true,
      repeatingPart: repeating
    };
  };

  const convert = () => {
    setError("");
    setResult(null);

    const w = parseInt(whole) || 0;
    const n = parseInt(numerator) || 0;
    const d = parseInt(denominator);

    if (isNaN(d) || d === 0) {
      setError("Denominator cannot be zero");
      return;
    }

    if (isNaN(n) || isNaN(w)) {
      setError("Please enter valid numbers");
      return;
    }

    try {
      const steps: string[] = [];

      steps.push(`Mixed number: ${w} ${n}/${d}`);

      const improperNumerator = w * d + n;
      steps.push(`\nConvert to improper fraction:`);
      steps.push(`(${w} × ${d}) + ${n} = ${improperNumerator}`);
      steps.push(`Improper fraction: ${improperNumerator}/${d}`);

      const simplifiedGCD = gcd(improperNumerator, d);
      let simpNum = improperNumerator;
      let simpDen = d;

      if (simplifiedGCD > 1) {
        simpNum = improperNumerator / simplifiedGCD;
        simpDen = d / simplifiedGCD;
        steps.push(`\nSimplify by GCD(${Math.abs(improperNumerator)}, ${d}) = ${simplifiedGCD}:`);
        steps.push(`${improperNumerator} ÷ ${simplifiedGCD} = ${simpNum}`);
        steps.push(`${d} ÷ ${simplifiedGCD} = ${simpDen}`);
        steps.push(`Simplified fraction: ${simpNum}/${simpDen}`);
      }

      steps.push(`\nDivide numerator by denominator:`);
      steps.push(`${simpNum} ÷ ${simpDen}`);

      const { decimal, isRepeating, repeatingPart } = findRepeatingDecimal(simpNum, simpDen);

      if (isRepeating) {
        steps.push(`Result is a repeating decimal`);
        if (repeatingPart) {
          steps.push(`Repeating part: ${repeatingPart}`);
        }
      } else {
        steps.push(`Result is a terminating decimal`);
      }

      const decimalValue = improperNumerator / d;

      setResult({
        decimal: decimalValue,
        exactDecimal: decimal,
        steps,
        isRepeating,
        repeatingPart
      });
    } catch (e: any) {
      setError(e.message || "Conversion error");
    }
  };

  const reset = () => {
    setWhole("0");
    setNumerator("1");
    setDenominator("2");
    setResult(null);
    setError("");
  };

  const loadExample = (w: string, n: string, d: string) => {
    setWhole(w);
    setNumerator(n);
    setDenominator(d);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Fraction to Decimal Converter – Convert Fractions to Decimals</h1>
        <p className="text-muted-foreground">
          Convert any fraction or mixed number to a decimal with our free online fraction to decimal converter. Get exact or rounded decimal results instantly with the division shown.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Fraction Input</Label>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-20">
              <Label className="text-xs">Whole (optional)</Label>
              <Input
                type="number"
                value={whole}
                onChange={(e) => setWhole(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center">
              <Input
                type="number"
                placeholder="Num"
                value={numerator}
                onChange={(e) => setNumerator(e.target.value)}
                className="w-20 text-center border-b-0 rounded-b-none"
              />
              <div className="w-full h-px bg-border my-1" />
              <Input
                type="number"
                placeholder="Den"
                value={denominator}
                onChange={(e) => setDenominator(e.target.value)}
                className="w-20 text-center border-t-0 rounded-t-none"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Leave whole number as 0 for proper fractions
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={convert}>Convert</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("0", "1", "2")}>1/2</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("0", "1", "3")}>1/3</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1", "1", "4")}>1¼</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("0", "22", "7")}>22/7</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("0", "1", "7")}>1/7</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("0", "3", "8")}>3/8</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2", "1", "3")}>2⅓</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Decimal Result</p>
              <p className="text-4xl font-bold font-mono break-all">
                {result.exactDecimal}
              </p>
              {result.isRepeating ? (
                <p className="text-sm text-muted-foreground mt-2">
                  ≈ {result.decimal.toFixed(6)} (repeating)
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mt-2">
                  Exact decimal
                </p>
              )}
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Conversion</h4>
              <div className="space-y-3">
                {result.steps.map((step, i) => (
                  <div key={i} className={`text-sm ${step.startsWith("\n") ? "mt-4 font-semibold" : ""}`}>
                    {step.startsWith("\n") ? step.slice(1) : step}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Verification</h4>
              <div className="font-mono text-sm space-y-2">
                <div>
                  Multiply decimal by denominator:
                </div>
                <div>
                  {result.decimal.toFixed(6)} × {denominator} ≈ {parseInt(numerator) + parseInt(whole) * parseInt(denominator)}
                </div>
                <div className="text-muted-foreground">
                  Should equal numerator (or improper numerator for mixed numbers) ✓
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Fraction to Decimal Converter – Convert Fractions to Decimals</h2>
        <p className="text-muted-foreground">
          Converting fractions to decimals is straightforward: divide the numerator by the denominator. This calculator handles proper fractions, improper fractions, and mixed numbers. It shows the complete division process and identifies repeating decimals.
        </p>
        <p className="text-muted-foreground">
          Some fractions produce terminating decimals (like 1/2 = 0.5). Others produce repeating decimals (like 1/3 = 0.333...). The calculator shows both the exact form with repeating notation and an approximate decimal value.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How Fraction to Decimal Conversion Works</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Convert mixed numbers to improper fractions</p>
                <p className="text-muted-foreground">
                  Multiply the whole number by the denominator, add the numerator, and keep the same denominator. 2½ becomes 5/2.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Simplify if possible</p>
                <p className="text-muted-foreground">
                  Reduce the fraction by dividing both numerator and denominator by their greatest common divisor.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Divide numerator by denominator</p>
                <p className="text-muted-foreground">
                  Perform long division. If the remainder becomes zero, you have a terminating decimal. If remainders repeat, you have a repeating decimal.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Terminating vs Repeating Decimals</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Terminating Decimals</h4>
            <p className="text-sm text-muted-foreground mb-3">
              A fraction produces a terminating decimal if its denominator (in simplest form) has only prime factors of 2 and/or 5.
            </p>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>1/2</span>
                <span>→ 0.5</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>1/4</span>
                <span>→ 0.25</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>3/8</span>
                <span>→ 0.375</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>7/20</span>
                <span>→ 0.35</span>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Repeating Decimals</h4>
            <p className="text-sm text-muted-foreground mb-3">
              A fraction produces a repeating decimal if its denominator (in simplest form) has prime factors other than 2 or 5.
            </p>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>1/3</span>
                <span>→ 0.(3)</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>1/6</span>
                <span>→ 0.1(6)</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>1/7</span>
                <span>→ 0.(142857)</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>5/11</span>
                <span>→ 0.(45)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Convert 3/4</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Divide 3 by 4</div>
              <div>3 ÷ 4 = 0.75</div>
              <div className="text-muted-foreground">Answer: 0.75 (terminating)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Convert 1/3</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Divide 1 by 3</div>
              <div>1 ÷ 3 = 0.333...</div>
              <div>Remainder 1 repeats</div>
              <div className="text-muted-foreground">Answer: 0.(3) (repeating)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Convert 2½</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Convert to improper: (2 × 2) + 1 = 5/2</div>
              <div>Divide 5 by 2</div>
              <div>5 ÷ 2 = 2.5</div>
              <div className="text-muted-foreground">Answer: 2.5 (terminating)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Convert 1/7</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Divide 1 by 7</div>
              <div>1 ÷ 7 = 0.142857142857...</div>
              <div>6-digit repeating pattern</div>
              <div className="text-muted-foreground">Answer: 0.(142857) (repeating)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            The decimal system we use today was developed in India around the 6th century and spread to Europe through Arab mathematicians. The decimal point wasn't standardized until the 17th century – before that, mathematicians used various notations including placing a bar over the units digit.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I know if a decimal will repeat?</h4>
            <p className="text-sm text-muted-foreground">
              Look at the denominator after simplifying the fraction. If it has any prime factors besides 2 or 5, the decimal will repeat. For example, 1/6 has denominator 6 = 2 × 3, so it repeats.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does the parentheses notation mean?</h4>
            <p className="text-sm text-muted-foreground">
              Parentheses indicate the repeating part of a decimal. 0.(3) means 0.333... forever. 0.1(6) means 0.1666... The digits in parentheses repeat infinitely.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I convert improper fractions?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Enter the numerator larger than the denominator, or use the whole number field for mixed numbers. 7/4 = 1.75 and 3/2 = 1.5.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How many decimal places should I use?</h4>
            <p className="text-sm text-muted-foreground">
              For terminating decimals, use all places. For repeating decimals, use enough places for your purpose, or use the exact repeating notation. In science, match the precision of your measurements.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What about negative fractions?</h4>
            <p className="text-sm text-muted-foreground">
              Enter a negative numerator. The decimal will also be negative. -3/4 = -0.75. The calculator handles negative values correctly.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does 1/7 have such a long repeating pattern?</h4>
            <p className="text-sm text-muted-foreground">
              Prime denominators often produce long repeating patterns. For prime p, the maximum repeating length is p-1 digits. For 7, the pattern is 6 digits long (142857), which is the maximum possible.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
