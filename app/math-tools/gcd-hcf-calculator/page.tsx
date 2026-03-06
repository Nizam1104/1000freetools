"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GcdHcfCalculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [useThreeNumbers, setUseThreeNumbers] = useState(false);
  const [result, setResult] = useState<{
    gcd: number;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const gcd = (a: number, b: number): { result: number; steps: string[] } => {
    const steps: string[] = [];
    let x = a, y = b;

    while (y !== 0) {
      steps.push(`GCD(${x}, ${y}): ${x} = ${y} × ${Math.floor(x / y)} + ${x % y}`);
      const temp = y;
      y = x % y;
      x = temp;
    }

    steps.push(`GCD found: ${x}`);
    return { result: x, steps };
  };

  const calculateGcd = () => {
    const n1 = parseInt(num1);
    const n2 = parseInt(num2);
    const n3 = useThreeNumbers ? parseInt(num3) : null;

    if (isNaN(n1) || isNaN(n2) || (useThreeNumbers && isNaN(n3!))) {
      setError("Please enter valid integers");
      setResult(null);
      return;
    }

    if (n1 <= 0 || n2 <= 0 || (useThreeNumbers && n3! <= 0)) {
      setError("Please enter positive integers");
      setResult(null);
      return;
    }

    setError("");
    let gcdResult: number;
    let allSteps: string[] = [];

    if (useThreeNumbers && n3) {
      const first = gcd(n1, n2);
      const second = gcd(first.result, n3);
      gcdResult = second.result;
      allSteps = [
        `Step 1: Find GCD of ${n1} and ${n2}`,
        ...first.steps,
        "",
        `Step 2: Find GCD of ${first.result} and ${n3}`,
        ...second.steps,
      ];
    } else {
      const res = gcd(n1, n2);
      gcdResult = res.result;
      allSteps = res.steps;
    }

    setResult({
      gcd: gcdResult,
      steps: allSteps,
    });
  };

  const reset = () => {
    setNum1("");
    setNum2("");
    setNum3("");
    setUseThreeNumbers(false);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">GCD / HCF Calculator – Find Greatest Common Divisor Online</h1>
        <p className="text-muted-foreground">
          Calculate the GCD or HCF of two or more numbers instantly with our free online calculator. Uses the Euclidean algorithm to find the greatest common divisor with step-by-step solutions.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="threeNumbers"
            checked={useThreeNumbers}
            onChange={(e) => setUseThreeNumbers(e.target.checked)}
            className="w-4 h-4"
          />
          <Label htmlFor="threeNumbers">Calculate GCD of 3 numbers</Label>
        </div>

        <div className={`grid ${useThreeNumbers ? "md:grid-cols-3" : "md:grid-cols-2"} gap-4`}>
          <div>
            <Label>First Number</Label>
            <Input
              type="number"
              placeholder="e.g., 48"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
            />
          </div>
          <div>
            <Label>Second Number</Label>
            <Input
              type="number"
              placeholder="e.g., 60"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
            />
          </div>
          {useThreeNumbers && (
            <div>
              <Label>Third Number</Label>
              <Input
                type="number"
                placeholder="e.g., 72"
                value={num3}
                onChange={(e) => setNum3(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateGcd}>Calculate GCD</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Greatest Common Divisor</p>
              <p className="text-5xl font-bold">{result.gcd}</p>
              <p className="text-sm text-muted-foreground mt-2">
                GCD({num1}, {num2}{useThreeNumbers ? `, ${num3}` : ""}) = {result.gcd}
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Euclidean Algorithm Steps</p>
              <div className="space-y-1 font-mono text-sm">
                {result.steps.map((step, idx) => (
                  <p key={idx} className={step === "" ? "h-4" : ""}>{step || " "}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding GCD and HCF</h2>
        <p className="text-muted-foreground">
          GCD (Greatest Common Divisor) and HCF (Highest Common Factor) are the same thing – the largest number that divides two or more numbers without leaving a remainder.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example: GCD of 48 and 60</h3>
            <p className="text-sm text-muted-foreground mb-2">Factors of 48: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48</p>
            <p className="text-sm text-muted-foreground mb-2">Factors of 60: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60</p>
            <p className="text-sm font-semibold">Common factors: 1, 2, 3, 4, 6, 12</p>
            <p className="text-lg font-bold mt-2">GCD = 12</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Euclidean Algorithm</h3>
            <p className="text-sm text-muted-foreground mb-2">
              An efficient method to find GCD by repeated division:
            </p>
            <p className="text-sm font-mono">48 = 36 × 1 + 12</p>
            <p className="text-sm font-mono">36 = 12 × 3 + 0</p>
            <p className="text-sm font-semibold mt-2">GCD = 12 (last non-zero remainder)</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">GCD Properties</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Key Facts</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• GCD(a, b) = GCD(b, a) – commutative</li>
              <li>• GCD(a, 0) = a</li>
              <li>• GCD(a, a) = a</li>
              <li>• GCD(a, 1) = 1</li>
              <li>• If a divides b, GCD(a, b) = a</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Applications</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Simplifying fractions</li>
              <li>• Finding LCM: LCM(a,b) = (a×b)/GCD(a,b)</li>
              <li>• Solving Diophantine equations</li>
              <li>• Cryptography (RSA algorithm)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What is GCD?</h3>
          <p className="text-sm text-muted-foreground">
            GCD (Greatest Common Divisor), also called HCF (Highest Common Factor), is the largest positive integer that divides two or more numbers without a remainder.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How do you find GCD?</h3>
          <p className="text-sm text-muted-foreground">
            Use the Euclidean algorithm: divide the larger by smaller, then divide the divisor by the remainder, repeating until remainder is 0. The last non-zero remainder is the GCD.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is GCD of coprime numbers?</h3>
          <p className="text-sm text-muted-foreground">
            Coprime (relatively prime) numbers have GCD = 1. For example, GCD(8, 15) = 1 because they share no common factors other than 1.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can GCD be calculated for more than 2 numbers?</h3>
          <p className="text-sm text-muted-foreground">
            Yes. Find GCD of first two numbers, then find GCD of that result with the next number, and so on. GCD(a, b, c) = GCD(GCD(a, b), c).
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/lcm-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">LCM Calculator</p>
            <p className="text-xs text-muted-foreground">Least common multiple</p>
          </a>
          <a href="/math-tools/prime-factorization-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Prime Factorization</p>
            <p className="text-xs text-muted-foreground">Find prime factors</p>
          </a>
          <a href="/math-tools/fraction-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Fraction Calculator</p>
            <p className="text-xs text-muted-foreground">Simplify fractions</p>
          </a>
        </div>
      </section>
    </div>
  );
}
