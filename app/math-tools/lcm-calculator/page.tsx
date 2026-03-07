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
      </section>
    </div>
  );
}
