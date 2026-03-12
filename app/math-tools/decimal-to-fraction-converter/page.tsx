"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DecimalToFractionConverter() {
  const [decimal, setDecimal] = useState<string>("");
  const [result, setResult] = useState<{
    fraction: string;
    numerator: number;
    denominator: number;
    mixedNumber: string | null;
    steps: string[];
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

  const decimalToFraction = (decimalStr: string): {
    numerator: number;
    denominator: number;
    steps: string[];
  } => {
    const steps: string[] = [];
    const isNegative = decimalStr.startsWith("-");
    const cleanDecimal = decimalStr.replace("-", "").trim();

    const num = parseFloat(cleanDecimal);

    if (isNaN(num)) {
      throw new Error("Please enter a valid decimal number");
    }

    if (num === 0) {
      return { numerator: 0, denominator: 1, steps: ["Zero as a fraction: 0/1"] };
    }

    const decimalPart = cleanDecimal.includes(".") ? cleanDecimal.split(".")[1] : "";
    const decimalPlaces = decimalPart.length;

    steps.push(`Original decimal: ${isNegative ? "-" : ""}${cleanDecimal}`);

    if (decimalPlaces === 0) {
      steps.push(`${num} is a whole number`);
      steps.push(`As a fraction: ${num}/1`);
      return { numerator: isNegative ? -num : num, denominator: 1, steps };
    }

    steps.push(`Decimal has ${decimalPlaces} decimal place${decimalPlaces > 1 ? "s" : ""}`);

    let denominator = Math.pow(10, decimalPlaces);
    let numerator = Math.round(num * denominator);

    steps.push(`Multiply by ${denominator.toLocaleString()} (10^${decimalPlaces}) to eliminate decimal`);
    steps.push(`${num} × ${denominator.toLocaleString()} = ${numerator}`);
    steps.push(`Initial fraction: ${numerator}/${denominator}`);

    const commonDivisor = gcd(numerator, denominator);

    if (commonDivisor > 1) {
      steps.push(`\nFind GCD of ${numerator} and ${denominator}`);
      steps.push(`GCD = ${commonDivisor}`);
      steps.push(`Divide both by ${commonDivisor}:`);
      steps.push(`${numerator} ÷ ${commonDivisor} = ${numerator / commonDivisor}`);
      steps.push(`${denominator} ÷ ${commonDivisor} = ${denominator / commonDivisor}`);

      numerator = numerator / commonDivisor;
      denominator = denominator / commonDivisor;
    } else {
      steps.push(`\nGCD is 1, fraction is already in simplest form`);
    }

    steps.push(`\nSimplified fraction: ${numerator}/${denominator}`);

    if (isNegative) {
      numerator = -numerator;
      steps.push(`Apply negative sign: ${numerator}/${denominator}`);
    }

    return { numerator, denominator, steps };
  };

  const convert = () => {
    setError("");
    setResult(null);

    if (!decimal.trim()) {
      setError("Please enter a decimal number");
      return;
    }

    if (!/^-?\d+(\.\d+)?$/.test(decimal.trim())) {
      setError("Please enter a valid decimal number");
      return;
    }

    try {
      const { numerator, denominator, steps } = decimalToFraction(decimal.trim());

      const absNum = Math.abs(numerator);
      let mixedNumber: string | null = null;

      if (absNum >= denominator) {
        const whole = Math.floor(absNum / denominator);
        const remainder = absNum % denominator;
        const sign = numerator < 0 ? "-" : "";

        if (remainder === 0) {
          mixedNumber = `${sign}${whole}`;
        } else {
          mixedNumber = `${sign}${whole} ${remainder}/${denominator}`;
        }
      }

      setResult({
        fraction: `${numerator}/${denominator}`,
        numerator,
        denominator,
        mixedNumber,
        steps
      });
    } catch (e: any) {
      setError(e.message);
    }
  };

  const reset = () => {
    setDecimal("");
    setResult(null);
    setError("");
  };

  const loadExample = (dec: string) => {
    setDecimal(dec);
    setError("");
    setResult(null);
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Decimal to Fraction Converter – Convert Decimals to Fractions</h1>
        <p className="text-muted-foreground">
          Convert any decimal to a fraction instantly with our free online decimal to fraction converter. Returns fully simplified fractions with clear step-by-step conversion process.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Decimal to Fraction Converter</CardTitle>
          <CardDescription>
            Enter a decimal number to convert it to a simplified fraction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Decimal Number</Label>
              <Input
                type="text"
                placeholder="e.g., 0.75 or 2.5"
                value={decimal}
                onChange={(e) => setDecimal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && convert()}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Supports positive and negative decimals
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={convert}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample("0.75")}>0.75</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("0.333")}>0.333</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("2.5")}>2.5</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("0.125")}>0.125</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("-0.6")}>-0.6</Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Fraction Result</p>
                  <div className="flex items-center justify-center gap-4">
                    {result.mixedNumber && (
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Mixed Number</p>
                        <p className="text-3xl font-bold">{result.mixedNumber}</p>
                      </div>
                    )}
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Improper Fraction</p>
                      <div className="flex flex-col items-center">
                        <span className="text-4xl font-bold">{Math.abs(result.numerator)}</span>
                        <div className="w-20 h-0.5 bg-foreground my-1" />
                        <span className="text-4xl font-bold">{result.denominator}</span>
                      </div>
                      {result.numerator < 0 && (
                        <p className="text-sm text-muted-foreground mt-1">(negative)</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    {decimal} = {result.mixedNumber || result.fraction}
                  </p>
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
                      Divide numerator by denominator:
                    </div>
                    <div>
                      {Math.abs(result.numerator)} ÷ {result.denominator} = {(Math.abs(result.numerator) / result.denominator).toFixed(6)}
                    </div>
                    <div className="text-muted-foreground">
                      Original decimal: {decimal.replace("-", "")} ✓
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Decimal to Fraction Converter – Convert Decimals to Fractions</h2>
          <p className="text-muted-foreground">
            Converting decimals to fractions is a fundamental math skill. This calculator shows you exactly how the conversion works, step by step. Enter any terminating decimal and get back a simplified fraction plus the mixed number form.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            The process is straightforward: count the decimal places, write the number over the appropriate power of 10, then simplify by dividing both parts by their greatest common divisor. The calculator walks through each step so you can follow along and learn the method.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How Decimal to Fraction Conversion Works</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Count decimal places</p>
                <p className="text-muted-foreground">
                  Look at how many digits appear after the decimal point. 0.75 has 2 decimal places. 0.125 has 3 decimal places.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Write over power of 10</p>
                <p className="text-muted-foreground">
                  Put the decimal digits (without the point) over 10, 100, 1000, etc. – whichever has the same number of zeros as decimal places.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Simplify the fraction</p>
                <p className="text-muted-foreground">
                  Find the greatest common divisor (GCD) of the numerator and denominator. Divide both by the GCD to get the simplest form.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Convert to mixed number (optional)</p>
                <p className="text-muted-foreground">
                  If the numerator is larger than the denominator, divide to get a whole number plus a proper fraction.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Decimal to Fraction Conversions</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Basic Decimals</h4>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between">
                <span>0.5</span>
                <span>→ 1/2</span>
              </div>
              <div className="flex justify-between">
                <span>0.25</span>
                <span>→ 1/4</span>
              </div>
              <div className="flex justify-between">
                <span>0.75</span>
                <span>→ 3/4</span>
              </div>
              <div className="flex justify-between">
                <span>0.2</span>
                <span>→ 1/5</span>
              </div>
              <div className="flex justify-between">
                <span>0.4</span>
                <span>→ 2/5</span>
              </div>
              <div className="flex justify-between">
                <span>0.6</span>
                <span>→ 3/5</span>
              </div>
              <div className="flex justify-between">
                <span>0.8</span>
                <span>→ 4/5</span>
              </div>
            </div>
          </div>

          <div className="p-3 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Eighths and Sixteenths</h4>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between">
                <span>0.125</span>
                <span>→ 1/8</span>
              </div>
              <div className="flex justify-between">
                <span>0.375</span>
                <span>→ 3/8</span>
              </div>
              <div className="flex justify-between">
                <span>0.625</span>
                <span>→ 5/8</span>
              </div>
              <div className="flex justify-between">
                <span>0.875</span>
                <span>→ 7/8</span>
              </div>
              <div className="flex justify-between">
                <span>0.0625</span>
                <span>→ 1/16</span>
              </div>
              <div className="flex justify-between">
                <span>0.015625</span>
                <span>→ 1/64</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Convert 0.75</h4>
            <div className="font-mono text-sm space-y-2">
              <div>2 decimal places → denominator is 100</div>
              <div>0.75 = 75/100</div>
              <div>GCD of 75 and 100 is 25</div>
              <div>75 ÷ 25 = 3, 100 ÷ 25 = 4</div>
              <div className="text-muted-foreground">Answer: 3/4</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Convert 2.5</h4>
            <div className="font-mono text-sm space-y-2">
              <div>1 decimal place → denominator is 10</div>
              <div>2.5 = 25/10</div>
              <div>GCD of 25 and 10 is 5</div>
              <div>25 ÷ 5 = 5, 10 ÷ 5 = 2</div>
              <div>5/2 = 2½ (mixed number)</div>
              <div className="text-muted-foreground">Answer: 5/2 or 2½</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Convert 0.125</h4>
            <div className="font-mono text-sm space-y-2">
              <div>3 decimal places → denominator is 1000</div>
              <div>0.125 = 125/1000</div>
              <div>GCD of 125 and 1000 is 125</div>
              <div>125 ÷ 125 = 1, 1000 ÷ 125 = 8</div>
              <div className="text-muted-foreground">Answer: 1/8</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Convert 0.333</h4>
            <div className="font-mono text-sm space-y-2">
              <div>3 decimal places → denominator is 1000</div>
              <div>0.333 = 333/1000</div>
              <div>GCD of 333 and 1000 is 1</div>
              <div className="text-muted-foreground">Answer: 333/1000 (already simplified)</div>
              <div className="text-xs text-muted-foreground mt-2">
                Note: This is an approximation of 1/3. The exact decimal 0.333... (repeating) equals 1/3.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Can you convert repeating decimals?</h4>
            <p className="text-sm text-muted-foreground">
              This calculator handles terminating decimals (decimals that end). Repeating decimals like 0.333... or 0.142857... require a different method. For example, 0.333... = 1/3 and 0.142857... = 1/7.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does 0.333 give 333/1000 instead of 1/3?</h4>
            <p className="text-sm text-muted-foreground">
              Because 0.333 is not the same as 0.333... (repeating). 0.333 is exactly 333/1000. The fraction 1/3 equals 0.333... with the 3 repeating forever. They're very close but not identical.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I convert a negative decimal?</h4>
            <p className="text-sm text-muted-foreground">
              Convert the absolute value first, then add the negative sign to the numerator. -0.75 becomes -3/4. The calculator handles this automatically.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if the fraction doesn't simplify?</h4>
            <p className="text-sm text-muted-foreground">
              Some fractions are already in simplest form. For example, 0.333 = 333/1000, and 333 and 1000 share no common factors other than 1. The fraction stays as 333/1000.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When would I use mixed numbers vs improper fractions?</h4>
            <p className="text-sm text-muted-foreground">
              Mixed numbers (like 2½) are easier to visualize and use in everyday contexts. Improper fractions (like 5/2) are often easier for calculations. Both represent the same value.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
