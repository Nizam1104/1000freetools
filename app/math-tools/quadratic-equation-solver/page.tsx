"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function QuadraticEquationSolver() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState<{
    x1: number | string;
    x2: number | string;
    discriminant: number;
    steps: string[];
    nature: string;
  } | null>(null);
  const [error, setError] = useState("");

  const solve = () => {
    const aVal = parseFloat(a);
    const bVal = parseFloat(b);
    const cVal = parseFloat(c);

    if (isNaN(aVal) || isNaN(bVal) || isNaN(cVal)) {
      setError("Please enter valid numbers for all coefficients");
      setResult(null);
      return;
    }

    if (aVal === 0) {
      setError("Coefficient 'a' cannot be zero for a quadratic equation");
      setResult(null);
      return;
    }

    setError("");
    const discriminant = bVal * bVal - 4 * aVal * cVal;
    const steps: string[] = [];

    steps.push(`Equation: ${aVal}x² + ${bVal}x + ${cVal} = 0`);
    steps.push(`Discriminant Δ = b² - 4ac = ${bVal}² - 4(${aVal})(${cVal})`);
    steps.push(`Δ = ${bVal * bVal} - ${4 * aVal * cVal} = ${discriminant}`);

    let x1: number | string;
    let x2: number | string;
    let nature: string;

    if (discriminant > 0) {
      x1 = (-bVal + Math.sqrt(discriminant)) / (2 * aVal);
      x2 = (-bVal - Math.sqrt(discriminant)) / (2 * aVal);
      nature = "Two distinct real roots";
      steps.push(`√Δ = √${discriminant} = ${Math.sqrt(discriminant).toFixed(4)}`);
      steps.push(`x₁ = (-b + √Δ) / 2a = (-${bVal} + ${Math.sqrt(discriminant).toFixed(4)}) / ${2 * aVal} = ${x1}`);
      steps.push(`x₂ = (-b - √Δ) / 2a = (-${bVal} - ${Math.sqrt(discriminant).toFixed(4)}) / ${2 * aVal} = ${x2}`);
    } else if (discriminant === 0) {
      x1 = -bVal / (2 * aVal);
      x2 = x1;
      nature = "One repeated real root";
      steps.push(`√Δ = √0 = 0`);
      steps.push(`x = -b / 2a = -${bVal} / ${2 * aVal} = ${x1}`);
    } else {
      const realPart = -bVal / (2 * aVal);
      const imagPart = Math.sqrt(-discriminant) / (2 * aVal);
      x1 = `${realPart} + ${imagPart}i`;
      x2 = `${realPart} - ${imagPart}i`;
      nature = "Two complex conjugate roots";
      steps.push(`√Δ = √${discriminant} = i√${-discriminant} = ${Math.sqrt(-discriminant).toFixed(4)}i`);
      steps.push(`x₁ = ${realPart} + ${imagPart.toFixed(4)}i`);
      steps.push(`x₂ = ${realPart} - ${imagPart.toFixed(4)}i`);
    }

    setResult({ x1, x2, discriminant, steps, nature });
  };

  const reset = () => {
    setA("");
    setB("");
    setC("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Quadratic Equation Solver – Find Roots of ax² + bx + c = 0
          </h1>
          <p className="text-xl text-muted-foreground">
            Solve any quadratic equation instantly with our free online quadratic equation solver. Find real and complex roots using the quadratic formula with detailed step-by-step solutions.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium mb-2">Equation Format:</p>
              <p className="text-lg font-mono">ax² + bx + c = 0</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">a</label>
                <Input
                  type="number"
                  placeholder="e.g., 1"
                  step="any"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">b</label>
                <Input
                  type="number"
                  placeholder="e.g., -5"
                  step="any"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">c</label>
                <Input
                  type="number"
                  placeholder="e.g., 6"
                  step="any"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={solve}>Solve</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-md mt-4">
                <p className="text-sm">{error}</p>
              </div>
            )}
            {result && (
              <>
                <div className="p-4 bg-muted rounded-md mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Nature of Roots</p>
                  <p className="text-lg font-semibold">{result.nature}</p>
                </div>
                <div className="p-4 bg-muted rounded-md mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Discriminant (Δ)</p>
                  <p className="text-2xl font-semibold">{result.discriminant}</p>
                </div>
                <div className="p-4 bg-muted rounded-md mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Solutions</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">x₁</p>
                      <p className="text-xl font-semibold">{result.x1}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">x₂</p>
                      <p className="text-xl font-semibold">{result.x2}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            {result && result.steps && (
              <div className="p-4 bg-muted rounded-md mt-4">
                <p className="text-sm font-medium mb-3">Step-by-Step Solution</p>
                <ol className="space-y-2 text-sm">
                  {result.steps.map((step, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-muted-foreground">{index + 1}.</span>
                      <span className="font-mono">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
