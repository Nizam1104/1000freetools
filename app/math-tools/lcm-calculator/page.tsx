"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LcmCalculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [useThreeNumbers, setUseThreeNumbers] = useState(false);
  const [result, setResult] = useState<{
    lcm: number;
    gcd: number;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const lcm = (a: number, b: number): { lcm: number; gcd: number; steps: string[] } => {
    const gcdValue = gcd(a, b);
    const lcmValue = Math.abs(a * b) / gcdValue;

    const steps = [
      `Formula: LCM(a, b) = (a × b) / GCD(a, b)`,
      `Step 1: Find GCD(${a}, ${b}) = ${gcdValue}`,
      `Step 2: Calculate (${a} × ${b}) / ${gcdValue}`,
      `Step 3: ${a * b} / ${gcdValue} = ${lcmValue}`,
    ];

    return { lcm: lcmValue, gcd: gcdValue, steps };
  };

  const calculateLcm = () => {
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
    let lcmResult: number;
    let gcdResult: number;
    let allSteps: string[] = [];

    if (useThreeNumbers && n3) {
      const first = lcm(n1, n2);
      const second = lcm(first.lcm, n3);
      lcmResult = second.lcm;
      gcdResult = second.gcd;
      allSteps = [
        `Finding LCM of ${n1}, ${n2}, and ${n3}`,
        "",
        `First, find LCM(${n1}, ${n2}):`,
        ...first.steps,
        "",
        `Then, find LCM(${first.lcm}, ${n3}):`,
        ...second.steps,
      ];
    } else {
      const res = lcm(n1, n2);
      lcmResult = res.lcm;
      gcdResult = res.gcd;
      allSteps = res.steps;
    }

    setResult({
      lcm: lcmResult,
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
        <h1 className="text-3xl font-semibold mb-2">LCM Calculator – Find Least Common Multiple Online</h1>
        <p className="text-muted-foreground">
          Calculate the Least Common Multiple (LCM) of two or more numbers instantly with our free online LCM calculator. Get accurate results with step-by-step explanations.
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
          <Label htmlFor="threeNumbers">Calculate LCM of 3 numbers</Label>
        </div>

        <div className={`grid ${useThreeNumbers ? "md:grid-cols-3" : "md:grid-cols-2"} gap-4`}>
          <div>
            <Label>First Number</Label>
            <Input
              type="number"
              placeholder="e.g., 12"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
            />
          </div>
          <div>
            <Label>Second Number</Label>
            <Input
              type="number"
              placeholder="e.g., 18"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
            />
          </div>
          {useThreeNumbers && (
            <div>
              <Label>Third Number</Label>
              <Input
                type="number"
                placeholder="e.g., 24"
                value={num3}
                onChange={(e) => setNum3(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateLcm}>Calculate LCM</Button>
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
              <p className="text-sm text-muted-foreground mb-2">Least Common Multiple</p>
              <p className="text-5xl font-bold">{result.lcm}</p>
              <p className="text-sm text-muted-foreground mt-2">
                LCM({num1}, {num2}{useThreeNumbers ? `, ${num3}` : ""}) = {result.lcm}
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Calculation Steps</p>
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
        <h2 className="text-2xl font-semibold">Understanding LCM</h2>
        <p className="text-muted-foreground">
          The Least Common Multiple (LCM) is the smallest positive number that is divisible by two or more given numbers. It's essential for adding fractions with different denominators.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example: LCM of 12 and 18</h3>
            <p className="text-sm text-muted-foreground mb-2">Multiples of 12: 12, 24, 36, 48, 60, 72...</p>
            <p className="text-sm text-muted-foreground mb-2">Multiples of 18: 18, 36, 54, 72, 90...</p>
            <p className="text-sm font-semibold">Common multiples: 36, 72...</p>
            <p className="text-lg font-bold mt-2">LCM = 36</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Using GCD to Find LCM</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Formula: LCM(a, b) = (a × b) / GCD(a, b)
            </p>
            <p className="text-sm font-mono">LCM(12, 18) = (12 × 18) / GCD(12, 18)</p>
            <p className="text-sm font-mono">LCM(12, 18) = 216 / 6 = 36</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Methods to Find LCM</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Listing Multiples</h3>
            <p className="text-xs text-muted-foreground">
              List multiples of each number until you find the smallest common one. Works well for small numbers.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Prime Factorization</h3>
            <p className="text-xs text-muted-foreground">
              Find prime factors of each number, then multiply the highest power of each prime factor.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">GCD Formula</h3>
            <p className="text-xs text-muted-foreground">
              Use LCM(a,b) = (a×b)/GCD(a,b). Fastest method for larger numbers.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">LCM Examples</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">LCM of 6 and 8 = 24</p>
            <p className="text-sm text-muted-foreground">Multiples of 6: 6, 12, 18, 24... | Multiples of 8: 8, 16, 24...</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">LCM of 15 and 20 = 60</p>
            <p className="text-sm text-muted-foreground">GCD(15, 20) = 5, so LCM = (15×20)/5 = 60</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">LCM of 4, 6, and 8 = 24</p>
            <p className="text-sm text-muted-foreground">LCM(4, 6) = 12, then LCM(12, 8) = 24</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">LCM of 7 and 11 = 77</p>
            <p className="text-sm text-muted-foreground">Coprime numbers: LCM = 7 × 11 = 77</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What is LCM?</h3>
          <p className="text-sm text-muted-foreground">
            LCM (Least Common Multiple) is the smallest positive integer that is divisible by two or more given numbers without a remainder.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How do you find LCM?</h3>
          <p className="text-sm text-muted-foreground">
            Use the formula LCM(a,b) = (a×b)/GCD(a,b), or list multiples of each number until you find the first common one, or use prime factorization.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is LCM used for?</h3>
          <p className="text-sm text-muted-foreground">
            LCM is used to add or subtract fractions with different denominators, find common periods in repeating events, and solve scheduling problems.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can LCM be calculated for more than 2 numbers?</h3>
          <p className="text-sm text-muted-foreground">
            Yes. Find LCM of first two numbers, then find LCM of that result with the next number. LCM(a,b,c) = LCM(LCM(a,b), c).
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/gcd-hcf-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">GCD Calculator</p>
            <p className="text-xs text-muted-foreground">Greatest common divisor</p>
          </a>
          <a href="/math-tools/fraction-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Fraction Calculator</p>
            <p className="text-xs text-muted-foreground">Add and subtract fractions</p>
          </a>
          <a href="/math-tools/prime-factorization-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Prime Factorization</p>
            <p className="text-xs text-muted-foreground">Find prime factors</p>
          </a>
        </div>
      </section>
    </div>
  );
}
