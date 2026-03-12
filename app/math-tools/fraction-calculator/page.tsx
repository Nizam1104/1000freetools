"use client";

import { useState } from "react";
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

  const loadExample = (op: "add" | "subtract" | "multiply" | "divide", f1: Fraction, f2: Fraction) => {
    setOperation(op);
    setFraction1(f1);
    setFraction2(f2);
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("add", { whole: 0, numerator: 1, denominator: 4 }, { whole: 0, numerator: 1, denominator: 6 })}>1/4 + 1/6</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("subtract", { whole: 0, numerator: 3, denominator: 4 }, { whole: 0, numerator: 1, denominator: 2 })}>3/4 - 1/2</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("multiply", { whole: 0, numerator: 2, denominator: 3 }, { whole: 0, numerator: 3, denominator: 5 })}>2/3 × 3/5</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("divide", { whole: 0, numerator: 3, denominator: 4 }, { whole: 0, numerator: 1, denominator: 2 })}>3/4 ÷ 1/2</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("add", { whole: 1, numerator: 1, denominator: 2 }, { whole: 2, numerator: 1, denominator: 3 })}>1½ + 2⅓</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("multiply", { whole: 2, numerator: 1, denominator: 2 }, { whole: 1, numerator: 1, denominator: 3 })}>2½ × 1⅓</Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Fraction Operations</h2>
        <p className="text-muted-foreground">
          Fractions represent parts of a whole. When you work with fractions, you're dealing with numbers that have a numerator (top number) showing how many parts you have, and a denominator (bottom number) showing how many parts make up the whole.
        </p>
        <p className="text-muted-foreground">
          Each operation with fractions follows its own logic. Addition and subtraction need common denominators because you can only combine parts of the same size. Multiplication is straightforward – multiply across. Division flips the second fraction and multiplies. Mixed numbers combine whole numbers with fractions, requiring conversion to improper fractions for calculations.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Work with Fractions</h3>
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
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Add 1/3 + 1/4</h4>
            <div className="font-mono text-sm space-y-2">
              <div>LCM(3, 4) = 12</div>
              <div>1/3 = 4/12</div>
              <div>1/4 = 3/12</div>
              <div>4/12 + 3/12 = 7/12</div>
              <div className="text-muted-foreground mt-2">Answer: 7/12 (already simplified)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Subtract 5/6 - 1/3</h4>
            <div className="font-mono text-sm space-y-2">
              <div>LCM(6, 3) = 6</div>
              <div>5/6 stays as 5/6</div>
              <div>1/3 = 2/6</div>
              <div>5/6 - 2/6 = 3/6</div>
              <div>Simplify: 3/6 = 1/2</div>
              <div className="text-muted-foreground mt-2">Answer: 1/2</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Multiply 3/5 × 10/9</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Multiply across: (3 × 10) / (5 × 9) = 30/45</div>
              <div>Find GCD(30, 45) = 15</div>
              <div>30 ÷ 15 = 2</div>
              <div>45 ÷ 15 = 3</div>
              <div className="text-muted-foreground mt-2">Answer: 2/3</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Divide 2½ ÷ 1¼</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Convert to improper: 2½ = 5/2, 1¼ = 5/4</div>
              <div>5/2 ÷ 5/4 = 5/2 × 4/5</div>
              <div>= 20/10 = 2</div>
              <div className="text-muted-foreground mt-2">Answer: 2</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: Add 1⅔ + 2¾</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Convert: 1⅔ = 5/3, 2¾ = 11/4</div>
              <div>LCM(3, 4) = 12</div>
              <div>5/3 = 20/12</div>
              <div>11/4 = 33/12</div>
              <div>20/12 + 33/12 = 53/12</div>
              <div>Convert to mixed: 53/12 = 4⅚</div>
              <div className="text-muted-foreground mt-2">Answer: 4⅚</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            The fraction bar (vinculum) we use today was introduced by Arab mathematicians around the 12th century. Before that, fractions were written with the numerator above the denominator but without a line between them. The horizontal fraction bar made mathematical expressions much clearer.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I enter mixed numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Use the whole number box alongside the fraction boxes. For 2½, enter 2 in the whole box, 1 in the numerator, and 2 in the denominator.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do I need a common denominator for addition?</h4>
            <p className="text-sm text-muted-foreground">
              Fractions represent parts of a whole. You can only add parts when they're the same size. 1/2 and 1/3 are different-sized pieces – converting to 3/6 and 2/6 makes them comparable.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if my denominator is zero?</h4>
            <p className="text-sm text-muted-foreground">
              Division by zero is undefined in mathematics. The calculator won't let you compute with zero denominators.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I simplify a fraction?</h4>
            <p className="text-sm text-muted-foreground">
              Find the greatest common divisor (GCD) of the numerator and denominator, then divide both by it. For 12/18, GCD is 6, so 12÷6 = 2 and 18÷6 = 3, giving 2/3.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I work with negative fractions?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Enter a negative whole number or numerator. The calculator handles negative values correctly for all operations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I use improper fractions vs mixed numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Improper fractions are easier for calculations. Mixed numbers are clearer for understanding quantities. Most math classes prefer mixed numbers for final answers, but improper fractions for intermediate steps.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
