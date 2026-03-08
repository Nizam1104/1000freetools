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

    </div>
  );
}
