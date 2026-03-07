"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LinearEquationSolver() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState<{ x: number; steps: string[] } | null>(null);
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
      if (bVal === cVal) {
        setError("Infinite solutions: any value of x satisfies the equation");
      } else {
        setError("No solution: the equation is inconsistent");
      }
      setResult(null);
      return;
    }

    setError("");
    const x = (cVal - bVal) / aVal;
    const steps = [
      `Starting equation: ${aVal}x + ${bVal} = ${cVal}`,
      `Subtract ${bVal} from both sides: ${aVal}x = ${cVal} - ${bVal}`,
      `${aVal}x = ${cVal - bVal}`,
      `Divide both sides by ${aVal}: x = ${cVal - bVal} / ${aVal}`,
      `x = ${x}`,
    ];

    setResult({ x, steps });
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
            Linear Equation Solver – Solve ax + b = c Online
          </h1>
          <p className="text-xl text-muted-foreground">
            Solve any linear equation of the form ax + b = c instantly with our free online linear equation solver. Get step-by-step solutions for one-variable linear equations.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium mb-2">Equation Format:</p>
              <p className="text-lg font-mono">ax + b = c</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">a (coefficient of x)</label>
                <Input
                  type="number"
                  placeholder="e.g., 2"
                  step="any"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">b (constant)</label>
                <Input
                  type="number"
                  placeholder="e.g., 5"
                  step="any"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">c (result)</label>
                <Input
                  type="number"
                  placeholder="e.g., 15"
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
              <div className="p-4 bg-muted rounded-md mt-4">
                <p className="text-sm text-muted-foreground mb-2">Solution</p>
                <p className="text-2xl font-semibold">x = {result.x}</p>
              </div>
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

        <section className="mb-12 border-t pt-8">
        </section>
      </div>
    </div>
  );
}
