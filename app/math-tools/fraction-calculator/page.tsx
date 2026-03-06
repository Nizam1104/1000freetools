"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Fraction {
  whole: number;
  numerator: number;
  denominator: number;
}

interface Result {
  whole: number;
  numerator: number;
  denominator: number;
  improperNumerator: number;
  improperDenominator: number;
  decimal: number;
  steps: string[];
}

export default function FractionCalculator() {
  const [operation, setOperation] = useState<"add" | "subtract" | "multiply" | "divide">("add");
  const [fraction1, setFraction1] = useState<Fraction>({ whole: 0, numerator: 1, denominator: 2 });
  const [fraction2, setFraction2] = useState<Fraction>({ whole: 0, numerator: 1, denominator: 3 });
  const [result, setResult] = useState<Result | null>(null);

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  const lcm = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b);
  };

  const toImproper = (f: Fraction): { numerator: number; denominator: number } => {
    const numerator = f.whole * f.denominator + f.numerator;
    return { numerator, denominator: f.denominator };
  };

  const toMixed = (numerator: number, denominator: number): { whole: number; numerator: number; denominator: number } => {
    const whole = Math.floor(Math.abs(numerator) / denominator);
    const remainingNumerator = Math.abs(numerator) % denominator;
    const sign = numerator < 0 ? -1 : 1;
    return {
      whole: sign * whole,
      numerator: remainingNumerator,
      denominator
    };
  };

  const simplify = (numerator: number, denominator: number): { numerator: number; denominator: number } => {
    const common = gcd(numerator, denominator);
    return {
      numerator: numerator / common,
      denominator: denominator / common
    };
  };

  const calculate = () => {
    if (fraction1.denominator === 0 || fraction2.denominator === 0) return;

    const imp1 = toImproper(fraction1);
    const imp2 = toImproper(fraction2);
    let resultNum: number, resultDen: number;
    let steps: string[] = [];

    steps.push(`Convert to improper fractions:`);
    steps.push(`  ${fraction1.whole} ${fraction1.numerator}/${fraction1.denominator} = ${imp1.numerator}/${imp1.denominator}`);
    steps.push(`  ${fraction2.whole} ${fraction2.numerator}/${fraction2.denominator} = ${imp2.numerator}/${imp2.denominator}`);

    switch (operation) {
      case "add":
        const commonDenAdd = lcm(imp1.denominator, imp2.denominator);
        const num1Add = imp1.numerator * (commonDenAdd / imp1.denominator);
        const num2Add = imp2.numerator * (commonDenAdd / imp2.denominator);
        resultNum = num1Add + num2Add;
        resultDen = commonDenAdd;
        steps.push(`\nFind common denominator: LCM(${imp1.denominator}, ${imp2.denominator}) = ${commonDenAdd}`);
        steps.push(`Convert fractions:`);
        steps.push(`  ${imp1.numerator}/${imp1.denominator} = ${num1Add}/${commonDenAdd}`);
        steps.push(`  ${imp2.numerator}/${imp2.denominator} = ${num2Add}/${commonDenAdd}`);
        steps.push(`Add numerators: ${num1Add} + ${num2Add} = ${resultNum}`);
        steps.push(`Result: ${resultNum}/${resultDen}`);
        break;

      case "subtract":
        const commonDenSub = lcm(imp1.denominator, imp2.denominator);
        const num1Sub = imp1.numerator * (commonDenSub / imp1.denominator);
        const num2Sub = imp2.numerator * (commonDenSub / imp2.denominator);
        resultNum = num1Sub - num2Sub;
        resultDen = commonDenSub;
        steps.push(`\nFind common denominator: LCM(${imp1.denominator}, ${imp2.denominator}) = ${commonDenSub}`);
        steps.push(`Convert fractions:`);
        steps.push(`  ${imp1.numerator}/${imp1.denominator} = ${num1Sub}/${commonDenSub}`);
        steps.push(`  ${imp2.numerator}/${imp2.denominator} = ${num2Sub}/${commonDenSub}`);
        steps.push(`Subtract numerators: ${num1Sub} - ${num2Sub} = ${resultNum}`);
        steps.push(`Result: ${resultNum}/${resultDen}`);
        break;

      case "multiply":
        resultNum = imp1.numerator * imp2.numerator;
        resultDen = imp1.denominator * imp2.denominator;
        steps.push(`\nMultiply numerators: ${imp1.numerator} × ${imp2.numerator} = ${resultNum}`);
        steps.push(`Multiply denominators: ${imp1.denominator} × ${imp2.denominator} = ${resultDen}`);
        steps.push(`Result: ${resultNum}/${resultDen}`);
        break;

      case "divide":
        resultNum = imp1.numerator * imp2.denominator;
        resultDen = imp1.denominator * imp2.numerator;
        steps.push(`\nMultiply by reciprocal:`);
        steps.push(`  ${imp1.numerator}/${imp1.denominator} ÷ ${imp2.numerator}/${imp2.denominator}`);
        steps.push(`= ${imp1.numerator}/${imp1.denominator} × ${imp2.denominator}/${imp2.numerator}`);
        steps.push(`= ${resultNum}/${resultDen}`);
        break;
    }

    const simplified = simplify(resultNum, resultDen);
    const mixed = toMixed(simplified.numerator, simplified.denominator);
    const decimal = resultNum / resultDen;

    steps.push(`\nSimplify by dividing by GCD(${Math.abs(resultNum)}, ${resultDen}) = ${gcd(resultNum, resultDen)}`);
    steps.push(`Simplified: ${simplified.numerator}/${simplified.denominator}`);
    if (mixed.whole !== 0 || mixed.numerator !== simplified.numerator) {
      steps.push(`Mixed number: ${mixed.whole} ${mixed.numerator}/${mixed.denominator}`);
    }
    steps.push(`Decimal: ${decimal.toFixed(6)}`);

    setResult({
      whole: mixed.whole,
      numerator: mixed.numerator,
      denominator: mixed.denominator,
      improperNumerator: simplified.numerator,
      improperDenominator: simplified.denominator,
      decimal,
      steps
    });
  };

  const reset = () => {
    setFraction1({ whole: 0, numerator: 1, denominator: 2 });
    setFraction2({ whole: 0, numerator: 1, denominator: 3 });
    setResult(null);
  };

  const FractionInput = ({ value, onChange, label }: { value: Fraction; onChange: (f: Fraction) => void; label: string }) => (
    <div className="flex items-center gap-2">
      <div className="w-16">
        <Label className="text-xs">Whole</Label>
        <Input
          type="number"
          value={value.whole}
          onChange={(e) => onChange({ ...value, whole: parseInt(e.target.value) || 0 })}
          className="text-center"
        />
      </div>
      <div className="flex flex-col items-center">
        <Input
          type="number"
          value={value.numerator}
          onChange={(e) => onChange({ ...value, numerator: parseInt(e.target.value) || 0 })}
          className="w-16 text-center border-b-0 rounded-b-none"
        />
        <div className="w-full h-px bg-border my-1" />
        <Input
          type="number"
          value={value.denominator}
          onChange={(e) => onChange({ ...value, denominator: parseInt(e.target.value) || 1 })}
          className="w-16 text-center border-t-0 rounded-t-none"
        />
      </div>
      <span className="text-2xl font-bold self-center">{label}</span>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Fraction Calculator – Add, Subtract, Multiply & Divide Fractions</h1>
        <p className="text-muted-foreground">
          Easily add, subtract, multiply, and divide fractions with our free online fraction calculator. Get instant simplified results and step-by-step solutions for all fraction operations.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Fraction Calculator</CardTitle>
          <CardDescription>
            Add, subtract, multiply, and divide fractions with step-by-step solutions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Operation</Label>
              <Select value={operation} onValueChange={(v) => setOperation(v as typeof operation)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add (+)</SelectItem>
                  <SelectItem value="subtract">Subtract (−)</SelectItem>
                  <SelectItem value="multiply">Multiply (×)</SelectItem>
                  <SelectItem value="divide">Divide (÷)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap items-center gap-4 justify-center">
              <FractionInput value={fraction1} onChange={setFraction1} label="" />
              <span className="text-xl font-bold text-muted-foreground">
                {operation === "add" ? "+" : operation === "subtract" ? "−" : operation === "multiply" ? "×" : "÷"}
              </span>
              <FractionInput value={fraction2} onChange={setFraction2} label="" />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-lg text-center">
                  <div className="text-sm text-muted-foreground mb-2">Result</div>
                  {result.whole !== 0 ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold">{result.whole}</span>
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold">{result.numerator}</span>
                        <div className="w-full h-0.5 bg-foreground my-1" />
                        <span className="text-2xl font-bold">{result.denominator}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="text-4xl font-bold">{result.numerator}</span>
                      <div className="w-16 h-0.5 bg-foreground my-1" />
                      <span className="text-4xl font-bold">{result.denominator}</span>
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground mt-4">
                    Improper: {result.improperNumerator}/{result.improperDenominator}
                    <span className="mx-2">•</span>
                    Decimal: {result.decimal.toFixed(6)}
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
                  <div className="space-y-2 text-sm font-mono">
                    {result.steps.map((step, i) => (
                      <div key={i} className={step.startsWith("\n") ? "mt-4" : ""}>
                        {step.replace("\n", "")}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fraction Calculator – Add, Subtract, Multiply & Divide Fractions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Easily add, subtract, multiply, and divide fractions with our free online fraction calculator. Get instant simplified results and step-by-step solutions for all fraction operations.
          </p>
          <p className="text-sm text-muted-foreground">
            Working with mixed numbers? No problem. Enter whole numbers along with numerators and denominators. The calculator converts everything to improper fractions, performs the operation, then simplifies back to mixed number form.
          </p>
          <p className="text-sm text-muted-foreground">
            Every calculation shows the complete working. See how common denominators are found for addition and subtraction, watch the multiply-and-simplify process, and understand fraction division through reciprocals.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Work with Fractions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Adding & Subtracting Fractions</h4>
              <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
                <li>Find a common denominator (LCM of both denominators)</li>
                <li>Convert each fraction to equivalent form with common denominator</li>
                <li>Add or subtract the numerators, keep the denominator</li>
                <li>Simplify the result if possible</li>
              </ol>
              <div className="mt-3 p-2 bg-muted rounded text-xs font-mono">
                1/4 + 1/6 = 3/12 + 2/12 = 5/12
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Multiplying Fractions</h4>
              <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
                <li>Multiply the numerators together</li>
                <li>Multiply the denominators together</li>
                <li>Simplify the resulting fraction</li>
              </ol>
              <div className="mt-3 p-2 bg-muted rounded text-xs font-mono">
                2/3 × 3/4 = 6/12 = 1/2
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Dividing Fractions</h4>
              <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
                <li>Keep the first fraction as is</li>
                <li>Flip the second fraction (find reciprocal)</li>
                <li>Multiply the first by the reciprocal of the second</li>
                <li>Simplify the result</li>
              </ol>
              <div className="mt-3 p-2 bg-muted rounded text-xs font-mono">
                3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 3/2 = 1½
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Mixed Numbers to Improper</h4>
              <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
                <li>Multiply the whole number by the denominator</li>
                <li>Add the numerator to that product</li>
                <li>Keep the same denominator</li>
              </ol>
              <div className="mt-3 p-2 bg-muted rounded text-xs font-mono">
                2⅓ = (2×3 + 1)/3 = 7/3
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fraction Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Add 1/2 + 1/3</div>
              <div className="font-mono text-xs text-muted-foreground">
                LCM(2,3) = 6<br />
                1/2 = 3/6, 1/3 = 2/6<br />
                3/6 + 2/6 = 5/6
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Subtract 3/4 − 1/2</div>
              <div className="font-mono text-xs text-muted-foreground">
                LCM(4,2) = 4<br />
                3/4 − 2/4 = 1/4
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Multiply 2/3 × 5/8</div>
              <div className="font-mono text-xs text-muted-foreground">
                (2×5)/(3×8) = 10/24 = 5/12
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Divide 3/5 ÷ 2/3</div>
              <div className="font-mono text-xs text-muted-foreground">
                3/5 × 3/2 = 9/10
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Mixed: 1½ + 2⅓</div>
              <div className="font-mono text-xs text-muted-foreground">
                3/2 + 7/3 = 9/6 + 14/6 = 23/6 = 3⅚
              </div>
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
            <h4 className="font-semibold text-sm mb-2">How do I enter mixed numbers?</h4>
            <p className="text-xs text-muted-foreground">
              Use the whole number box alongside the fraction boxes. For 2½, enter 2 in the whole box, 1 in the numerator, and 2 in the denominator.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do I need a common denominator for addition?</h4>
            <p className="text-xs text-muted-foreground">
              Fractions represent parts of a whole. You can only add parts when they're the same size. 1/2 and 1/3 are different-sized pieces – converting to 3/6 and 2/6 makes them comparable.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if my denominator is zero?</h4>
            <p className="text-xs text-muted-foreground">
              Division by zero is undefined in mathematics. The calculator won't let you compute with zero denominators.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I simplify a fraction?</h4>
            <p className="text-xs text-muted-foreground">
              Find the greatest common divisor (GCD) of the numerator and denominator, then divide both by it. For 12/18, GCD is 6, so 12÷6 = 2 and 18÷6 = 3, giving 2/3.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I work with negative fractions?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. Enter a negative whole number or numerator. The calculator handles negative values correctly for all operations.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Math Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/math-tools/standard-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Standard Calculator</p>
              <p className="text-xs text-muted-foreground">Basic arithmetic</p>
            </a>
            <a href="/math-tools/percentage-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Percentage Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate percentages</p>
            </a>
            <a href="/math-tools/ratio-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Ratio Calculator</p>
              <p className="text-xs text-muted-foreground">Simplify and solve ratios</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
