"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MixedNumber {
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

export default function MixedNumberCalculator() {
  const [operation, setOperation] = useState<"add" | "subtract" | "multiply" | "divide">("add");
  const [mixed1, setMixed1] = useState<MixedNumber>({ whole: 1, numerator: 1, denominator: 2 });
  const [mixed2, setMixed2] = useState<MixedNumber>({ whole: 2, numerator: 1, denominator: 3 });
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string>("");

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

  const toImproper = (m: MixedNumber): { numerator: number; denominator: number } => {
    const numerator = m.whole * m.denominator + m.numerator;
    return { numerator, denominator: m.denominator };
  };

  const toMixed = (numerator: number, denominator: number): { whole: number; numerator: number; denominator: number } => {
    const absNum = Math.abs(numerator);
    const whole = Math.floor(absNum / denominator);
    const remainingNumerator = absNum % denominator;
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
    setError("");
    setResult(null);

    if (mixed1.denominator === 0 || mixed2.denominator === 0) {
      setError("Denominators cannot be zero");
      return;
    }

    if (mixed1.numerator >= mixed1.denominator || mixed2.numerator >= mixed2.denominator) {
      setError("Numerator must be less than denominator (proper fraction part)");
      return;
    }

    const imp1 = toImproper(mixed1);
    const imp2 = toImproper(mixed2);
    let resultNum: number, resultDen: number;
    let steps: string[] = [];

    steps.push(`Convert mixed numbers to improper fractions:`);
    steps.push(`  ${mixed1.whole} ${mixed1.numerator}/${mixed1.denominator} = (${mixed1.whole} × ${mixed1.denominator} + ${mixed1.numerator})/${mixed1.denominator} = ${imp1.numerator}/${imp1.denominator}`);
    steps.push(`  ${mixed2.whole} ${mixed2.numerator}/${mixed2.denominator} = (${mixed2.whole} × ${mixed2.denominator} + ${mixed2.numerator})/${mixed2.denominator} = ${imp2.numerator}/${imp2.denominator}`);

    switch (operation) {
      case "add":
        const commonDenAdd = lcm(imp1.denominator, imp2.denominator);
        const num1Add = imp1.numerator * (commonDenAdd / imp1.denominator);
        const num2Add = imp2.numerator * (commonDenAdd / imp2.denominator);
        resultNum = num1Add + num2Add;
        resultDen = commonDenAdd;
        steps.push(`\nAdd fractions with common denominator:`);
        steps.push(`  LCM(${imp1.denominator}, ${imp2.denominator}) = ${commonDenAdd}`);
        steps.push(`  ${imp1.numerator}/${imp1.denominator} = ${num1Add}/${commonDenAdd}`);
        steps.push(`  ${imp2.numerator}/${imp2.denominator} = ${num2Add}/${commonDenAdd}`);
        steps.push(`  ${num1Add}/${commonDenAdd} + ${num2Add}/${commonDenAdd} = ${resultNum}/${resultDen}`);
        break;

      case "subtract":
        const commonDenSub = lcm(imp1.denominator, imp2.denominator);
        const num1Sub = imp1.numerator * (commonDenSub / imp1.denominator);
        const num2Sub = imp2.numerator * (commonDenSub / imp2.denominator);
        resultNum = num1Sub - num2Sub;
        resultDen = commonDenSub;
        steps.push(`\nSubtract fractions with common denominator:`);
        steps.push(`  LCM(${imp1.denominator}, ${imp2.denominator}) = ${commonDenSub}`);
        steps.push(`  ${imp1.numerator}/${imp1.denominator} = ${num1Sub}/${commonDenSub}`);
        steps.push(`  ${imp2.numerator}/${imp2.denominator} = ${num2Sub}/${commonDenSub}`);
        steps.push(`  ${num1Sub}/${commonDenSub} - ${num2Sub}/${commonDenSub} = ${resultNum}/${resultDen}`);
        break;

      case "multiply":
        resultNum = imp1.numerator * imp2.numerator;
        resultDen = imp1.denominator * imp2.denominator;
        steps.push(`\nMultiply fractions:`);
        steps.push(`  ${imp1.numerator}/${imp1.denominator} × ${imp2.numerator}/${imp2.denominator}`);
        steps.push(`  = (${imp1.numerator} × ${imp2.numerator}) / (${imp1.denominator} × ${imp2.denominator})`);
        steps.push(`  = ${resultNum}/${resultDen}`);
        break;

      case "divide":
        resultNum = imp1.numerator * imp2.denominator;
        resultDen = imp1.denominator * imp2.numerator;
        steps.push(`\nDivide fractions (multiply by reciprocal):`);
        steps.push(`  ${imp1.numerator}/${imp1.denominator} ÷ ${imp2.numerator}/${imp2.denominator}`);
        steps.push(`  = ${imp1.numerator}/${imp1.denominator} × ${imp2.denominator}/${imp2.numerator}`);
        steps.push(`  = ${resultNum}/${resultDen}`);
        break;
    }

    const simplified = simplify(resultNum, resultDen);
    const mixed = toMixed(simplified.numerator, simplified.denominator);
    const decimal = resultNum / resultDen;

    steps.push(`\nSimplify by dividing by GCD(${Math.abs(resultNum)}, ${resultDen}) = ${gcd(resultNum, resultDen)}:`);
    steps.push(`  ${simplified.numerator}/${simplified.denominator}`);
    
    if (mixed.whole !== 0 || (mixed.numerator !== simplified.numerator && mixed.numerator !== 0)) {
      steps.push(`\nConvert to mixed number:`);
      steps.push(`  ${simplified.numerator} ÷ ${simplified.denominator} = ${mixed.whole} R${mixed.numerator}`);
      steps.push(`  = ${mixed.whole} ${mixed.numerator}/${mixed.denominator}`);
    }
    
    steps.push(`\nDecimal: ${decimal.toFixed(6)}`);

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
    setMixed1({ whole: 1, numerator: 1, denominator: 2 });
    setMixed2({ whole: 2, numerator: 1, denominator: 3 });
    setResult(null);
    setError("");
  };

  const MixedNumberInput = ({ 
    value, 
    onChange, 
    label 
  }: { 
    value: MixedNumber; 
    onChange: (m: MixedNumber) => void; 
    label: string 
  }) => (
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
        <h1 className="text-3xl font-semibold mb-2">Mixed Number Calculator – Add, Subtract, Multiply Mixed Numbers</h1>
        <p className="text-muted-foreground">
          Calculate with mixed numbers easily using our free online mixed number calculator. Add, subtract, multiply, and divide mixed numbers with instant simplified results and full steps.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mixed Number Calculator</CardTitle>
          <CardDescription>
            Perform arithmetic operations with mixed numbers.
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
              <MixedNumberInput value={mixed1} onChange={setMixed1} label="" />
              <span className="text-xl font-bold text-muted-foreground">
                {operation === "add" ? "+" : operation === "subtract" ? "−" : operation === "multiply" ? "×" : "÷"}
              </span>
              <MixedNumberInput value={mixed2} onChange={setMixed2} label="" />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => {
                setMixed1({ whole: 1, numerator: 1, denominator: 2 });
                setMixed2({ whole: 2, numerator: 1, denominator: 3 });
                setOperation("add");
                setResult(null);
              }}>1½ + 2⅓</Button>
              <Button variant="ghost" size="sm" onClick={() => {
                setMixed1({ whole: 3, numerator: 3, denominator: 4 });
                setMixed2({ whole: 1, numerator: 1, denominator: 2 });
                setOperation("subtract");
                setResult(null);
              }}>3¾ − 1½</Button>
              <Button variant="ghost" size="sm" onClick={() => {
                setMixed1({ whole: 2, numerator: 1, denominator: 2 });
                setMixed2({ whole: 1, numerator: 1, denominator: 3 });
                setOperation("multiply");
                setResult(null);
              }}>2½ × 1⅓</Button>
              <Button variant="ghost" size="sm" onClick={() => {
                setMixed1({ whole: 3, numerator: 1, denominator: 2 });
                setMixed2({ whole: 1, numerator: 3, denominator: 4 });
                setOperation("divide");
                setResult(null);
              }}>3½ ÷ 1¾</Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

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

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Mixed Number Calculator – Add, Subtract, Multiply Mixed Numbers</h2>
          <p className="text-muted-foreground">
            Mixed numbers combine whole numbers and fractions. Working with them requires converting to improper fractions first, performing the operation, then converting back. This calculator handles all four operations and shows every step of the process.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Enter mixed numbers using the three input fields: whole number, numerator, and denominator. The calculator converts to improper fractions, finds common denominators when needed, performs the operation, simplifies, and converts back to mixed number form.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Mixed Number Operations</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Adding Mixed Numbers</h4>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Convert both to improper fractions</li>
              <li>Find a common denominator (LCM)</li>
              <li>Add the numerators</li>
              <li>Simplify and convert back to mixed number</li>
            </ol>
            <div className="mt-3 p-2 bg-muted rounded text-xs font-mono">
              1½ + 2¼ = 3/2 + 9/4 = 6/4 + 9/4 = 15/4 = 3¾
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Subtracting Mixed Numbers</h4>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Convert both to improper fractions</li>
              <li>Find a common denominator</li>
              <li>Subtract the numerators</li>
              <li>Simplify and convert back (may be negative)</li>
            </ol>
            <div className="mt-3 p-2 bg-muted rounded text-xs font-mono">
              3½ − 1¾ = 7/2 − 7/4 = 14/4 − 7/4 = 7/4 = 1¾
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Multiplying Mixed Numbers</h4>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Convert both to improper fractions</li>
              <li>Multiply numerators together</li>
              <li>Multiply denominators together</li>
              <li>Simplify and convert back to mixed number</li>
            </ol>
            <div className="mt-3 p-2 bg-muted rounded text-xs font-mono">
              2½ × 1⅓ = 5/2 × 4/3 = 20/6 = 10/3 = 3⅓
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Dividing Mixed Numbers</h4>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Convert both to improper fractions</li>
              <li>Multiply by the reciprocal of the second</li>
              <li>Simplify the result</li>
              <li>Convert back to mixed number</li>
            </ol>
            <div className="mt-3 p-2 bg-muted rounded text-xs font-mono">
              3½ ÷ 1¾ = 7/2 ÷ 7/4 = 7/2 × 4/7 = 28/14 = 2
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Converting Between Forms</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Mixed to Improper</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Multiply the whole number by the denominator, add the numerator, keep the same denominator.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>Formula: (whole × denom + num) / denom</div>
              <div>2⅗ = (2 × 5 + 3) / 5 = 13/5</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Improper to Mixed</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Divide numerator by denominator. The quotient is the whole number, remainder is the new numerator.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>13 ÷ 5 = 2 R3</div>
              <div>13/5 = 2⅗</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Add 1½ + 2⅓</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Convert: 1½ = 3/2, 2⅓ = 7/3</div>
              <div>LCM(2,3) = 6</div>
              <div>3/2 = 9/6, 7/3 = 14/6</div>
              <div>9/6 + 14/6 = 23/6</div>
              <div className="text-muted-foreground">Answer: 3⅚</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Subtract 3¾ − 1½</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Convert: 3¾ = 15/4, 1½ = 3/2</div>
              <div>LCM(4,2) = 4</div>
              <div>15/4 − 6/4 = 9/4</div>
              <div className="text-muted-foreground">Answer: 2¼</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Multiply 2½ × 1⅓</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Convert: 2½ = 5/2, 1⅓ = 4/3</div>
              <div>5/2 × 4/3 = 20/6</div>
              <div>Simplify: 20/6 = 10/3</div>
              <div className="text-muted-foreground">Answer: 3⅓</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Divide 3½ ÷ 1¾</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Convert: 3½ = 7/2, 1¾ = 7/4</div>
              <div>7/2 ÷ 7/4 = 7/2 × 4/7</div>
              <div>= 28/14 = 2</div>
              <div className="text-muted-foreground">Answer: 2</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why convert to improper fractions first?</h4>
            <p className="text-sm text-muted-foreground">
              It's simpler and less error-prone. Trying to add the whole parts and fraction parts separately requires extra steps and can get confusing with borrowing or carrying. Improper fractions streamline the process.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the result be negative?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, when subtracting a larger mixed number from a smaller one. The calculator handles negative results correctly, showing them as negative mixed numbers or improper fractions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if the fraction part is improper?</h4>
            <p className="text-sm text-muted-foreground">
              The calculator expects proper fractions (numerator less than denominator) in the input. If you enter an improper fraction part, it will show an error. Convert it to a mixed number first.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I simplify the result?</h4>
            <p className="text-sm text-muted-foreground">
              The calculator automatically simplifies by dividing both parts by their greatest common divisor. 8/12 becomes 2/3, and 15/6 becomes 2½.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use this for just fractions (no whole part)?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Set the whole number to 0. The calculator works fine with proper fractions like 0 3/4 (which is just 3/4).
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
