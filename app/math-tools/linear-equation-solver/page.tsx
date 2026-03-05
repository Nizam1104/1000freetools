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
          <h2 className="text-2xl font-semibold mb-6">How to Solve Linear Equations</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Identify Coefficients</h3>
              <p className="text-sm text-muted-foreground">Find a, b, and c in your equation ax + b = c.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Isolate the Term</h3>
              <p className="text-sm text-muted-foreground">Subtract b from both sides to get ax alone.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">Divide</h3>
              <p className="text-sm text-muted-foreground">Divide both sides by a to solve for x.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
              <h3 className="font-semibold mb-2">Verify</h3>
              <p className="text-sm text-muted-foreground">Plug x back into the original equation to check.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Linear Equation Solver?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Step-by-Step Solutions</h3>
              <p className="text-sm text-muted-foreground">See every step of the solution process to understand the method.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Handles All Cases</h3>
              <p className="text-sm text-muted-foreground">Detects equations with no solution or infinite solutions.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Decimal Support</h3>
              <p className="text-sm text-muted-foreground">Works with integers, decimals, and negative numbers.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Learning Tool</h3>
              <p className="text-sm text-muted-foreground">Perfect for students learning algebra fundamentals.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Linear Equation Formula</h2>
          <div className="p-5 bg-muted rounded-lg mb-6">
            <p className="text-lg font-semibold mb-3">ax + b = c</p>
            <p className="text-sm text-muted-foreground mb-4">
              Solution: x = (c - b) / a
            </p>
            <p className="text-sm text-muted-foreground">
              Where: a ≠ 0 (if a = 0, the equation is either always true or never true)
            </p>
          </div>
          <div className="p-5 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Worked Examples</h3>
            <ul className="space-y-3 text-sm">
              <li className="pb-3 border-b border-border">
                <p className="font-medium">Example 1: 2x + 5 = 15</p>
                <p className="text-muted-foreground">2x = 15 - 5 → 2x = 10 → x = 5</p>
              </li>
              <li className="pb-3 border-b border-border">
                <p className="font-medium">Example 2: 3x - 7 = 8</p>
                <p className="text-muted-foreground">3x = 8 + 7 → 3x = 15 → x = 5</p>
              </li>
              <li className="pb-3 border-b border-border">
                <p className="font-medium">Example 3: -4x + 12 = 0</p>
                <p className="text-muted-foreground">-4x = -12 → x = 3</p>
              </li>
              <li>
                <p className="font-medium">Example 4: 0.5x + 2.5 = 7.5</p>
                <p className="text-muted-foreground">0.5x = 5 → x = 10</p>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Special Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">No Solution</h3>
              <p className="text-sm text-muted-foreground mb-2">When a = 0 and b ≠ c</p>
              <p className="text-xs text-muted-foreground">Example: 0x + 5 = 10 has no solution because 5 ≠ 10</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Infinite Solutions</h3>
              <p className="text-sm text-muted-foreground mb-2">When a = 0 and b = c</p>
              <p className="text-xs text-muted-foreground">Example: 0x + 5 = 5 is true for any value of x</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is a linear equation?</h3>
              <p className="text-sm text-muted-foreground">A linear equation is an equation where the highest power of the variable is 1. It forms a straight line when graphed.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How do you solve a linear equation?</h3>
              <p className="text-sm text-muted-foreground">Isolate the variable by performing the same operations on both sides: first move constants, then divide by the coefficient.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Can a linear equation have no solution?</h3>
              <p className="text-sm text-muted-foreground">Yes. If simplifying leads to a contradiction like 5 = 10, the equation has no solution.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What does infinite solutions mean?</h3>
              <p className="text-sm text-muted-foreground">If simplifying gives an identity like 5 = 5, any value of x works – there are infinitely many solutions.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How do you check your solution?</h3>
              <p className="text-sm text-muted-foreground">Substitute your answer back into the original equation. If both sides are equal, your solution is correct.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Related Math Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/math-tools/quadratic-equation-solver" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Quadratic Equation Solver</h3>
              <p className="text-sm text-muted-foreground">Solve equations with x² terms.</p>
            </a>
            <a href="/math-tools/system-of-equations-solver" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">System of Equations</h3>
              <p className="text-sm text-muted-foreground">Solve multiple equations together.</p>
            </a>
            <a href="/math-tools/inequality-solver" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Inequality Solver</h3>
              <p className="text-sm text-muted-foreground">Solve linear inequalities.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
