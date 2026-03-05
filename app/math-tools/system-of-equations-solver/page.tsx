"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SystemOfEquationsSolver() {
  const [a1, setA1] = useState("");
  const [b1, setB1] = useState("");
  const [c1, setC1] = useState("");
  const [a2, setA2] = useState("");
  const [b2, setB2] = useState("");
  const [c2, setC2] = useState("");
  const [result, setResult] = useState<{
    x: number | string;
    y: number | string;
    steps: string[];
    method: string;
    nature: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [method, setMethod] = useState<"elimination" | "substitution">("elimination");

  const solve = () => {
    const a1Val = parseFloat(a1);
    const b1Val = parseFloat(b1);
    const c1Val = parseFloat(c1);
    const a2Val = parseFloat(a2);
    const b2Val = parseFloat(b2);
    const c2Val = parseFloat(c2);

    if (
      isNaN(a1Val) || isNaN(b1Val) || isNaN(c1Val) ||
      isNaN(a2Val) || isNaN(b2Val) || isNaN(c2Val)
    ) {
      setError("Please enter valid numbers for all coefficients");
      setResult(null);
      return;
    }

    const determinant = a1Val * b2Val - a2Val * b1Val;
    const steps: string[] = [];

    steps.push(`Equation 1: ${a1Val}x + ${b1Val}y = ${c1Val}`);
    steps.push(`Equation 2: ${a2Val}x + ${b2Val}y = ${c2Val}`);

    if (determinant === 0) {
      const ratio1 = a1Val !== 0 ? c1Val / a1Val : null;
      const ratio2 = a2Val !== 0 ? c2Val / a2Val : null;
      
      if (ratio1 !== null && ratio2 !== null && Math.abs(ratio1 - ratio2) < 0.0001) {
        setError("Infinite solutions: the equations represent the same line");
      } else {
        setError("No solution: the equations represent parallel lines");
      }
      setResult(null);
      return;
    }

    setError("");

    let x: number, y: number;
    const methodSteps: string[] = [...steps];

    if (method === "elimination") {
      methodSteps.push(`\nUsing Elimination Method:`);
      methodSteps.push(`Determinant = a₁b₂ - a₂b₁ = ${a1Val}(${b2Val}) - ${a2Val}(${b1Val}) = ${determinant}`);
      
      const xNum = c1Val * b2Val - c2Val * b1Val;
      const yNum = a1Val * c2Val - a2Val * c1Val;
      
      methodSteps.push(`x = (c₁b₂ - c₂b₁) / det = (${c1Val}(${b2Val}) - ${c2Val}(${b1Val})) / ${determinant} = ${xNum} / ${determinant}`);
      methodSteps.push(`y = (a₁c₂ - a₂c₁) / det = (${a1Val}(${c2Val}) - ${a2Val}(${c1Val})) / ${determinant} = ${yNum} / ${determinant}`);
      
      x = xNum / determinant;
      y = yNum / determinant;
      
      methodSteps.push(`x = ${x}`);
      methodSteps.push(`y = ${y}`);
    } else {
      methodSteps.push(`\nUsing Substitution Method:`);
      
      if (Math.abs(b1Val) >= Math.abs(a1Val)) {
        methodSteps.push(`Solve Equation 1 for y: y = (${c1Val} - ${a1Val}x) / ${b1Val}`);
        const slope = -a1Val / b1Val;
        const intercept = c1Val / b1Val;
        methodSteps.push(`y = ${slope}x + ${intercept}`);
        methodSteps.push(`Substitute into Equation 2: ${a2Val}x + ${b2Val}(${slope}x + ${intercept}) = ${c2Val}`);
        const newCoeff = a2Val + b2Val * slope;
        const newConst = c2Val - b2Val * intercept;
        methodSteps.push(`${newCoeff}x = ${newConst}`);
        x = newConst / newCoeff;
        methodSteps.push(`x = ${x}`);
        y = slope * x + intercept;
        methodSteps.push(`y = ${slope}(${x}) + ${intercept} = ${y}`);
      } else {
        methodSteps.push(`Solve Equation 1 for x: x = (${c1Val} - ${b1Val}y) / ${a1Val}`);
        const slope = -b1Val / a1Val;
        const intercept = c1Val / a1Val;
        methodSteps.push(`x = ${slope}y + ${intercept}`);
        methodSteps.push(`Substitute into Equation 2: ${a2Val}(${slope}y + ${intercept}) + ${b2Val}y = ${c2Val}`);
        const newCoeff = a2Val * slope + b2Val;
        const newConst = c2Val - a2Val * intercept;
        methodSteps.push(`${newCoeff}y = ${newConst}`);
        y = newConst / newCoeff;
        methodSteps.push(`y = ${y}`);
        x = slope * y + intercept;
        methodSteps.push(`x = ${slope}(${y}) + ${intercept} = ${x}`);
      }
    }

    setResult({
      x,
      y,
      steps: methodSteps,
      method: method === "elimination" ? "Elimination" : "Substitution",
      nature: "Unique solution",
    });
  };

  const reset = () => {
    setA1("");
    setB1("");
    setC1("");
    setA2("");
    setB2("");
    setC2("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            System of Linear Equations Solver – Solve 2x2 Equation Systems
          </h1>
          <p className="text-xl text-muted-foreground">
            Solve a system of two linear equations with two variables online. Our free solver uses substitution and elimination methods to find exact solutions with step-by-step explanations.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium mb-2">Equation Format:</p>
              <p className="text-sm font-mono">a₁x + b₁y = c₁</p>
              <p className="text-sm font-mono">a₂x + b₂y = c₂</p>
            </div>

            <Tabs value={method} onValueChange={(v) => setMethod(v as "elimination" | "substitution")}>
              <TabsList className="mb-4">
                <TabsTrigger value="elimination">Elimination Method</TabsTrigger>
                <TabsTrigger value="substitution">Substitution Method</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-3">Equation 1</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">a₁</label>
                    <Input
                      type="number"
                      placeholder="e.g., 2"
                      step="any"
                      value={a1}
                      onChange={(e) => setA1(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">b₁</label>
                    <Input
                      type="number"
                      placeholder="e.g., 3"
                      step="any"
                      value={b1}
                      onChange={(e) => setB1(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">c₁</label>
                    <Input
                      type="number"
                      placeholder="e.g., 8"
                      step="any"
                      value={c1}
                      onChange={(e) => setC1(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-3">Equation 2</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">a₂</label>
                    <Input
                      type="number"
                      placeholder="e.g., 4"
                      step="any"
                      value={a2}
                      onChange={(e) => setA2(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">b₂</label>
                    <Input
                      type="number"
                      placeholder="e.g., -1"
                      step="any"
                      value={b2}
                      onChange={(e) => setB2(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">c₂</label>
                    <Input
                      type="number"
                      placeholder="e.g., 5"
                      step="any"
                      value={c2}
                      onChange={(e) => setC2(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
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
                  <p className="text-sm text-muted-foreground mb-2">Solution</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">x</p>
                      <p className="text-xl font-semibold">{result.x}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">y</p>
                      <p className="text-xl font-semibold">{result.y}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-md mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Method Used</p>
                  <p className="text-lg font-semibold">{result.method}</p>
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

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">How to Solve Systems of Linear Equations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Elimination Method</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. Multiply equations to align coefficients</li>
                <li>2. Add or subtract to eliminate one variable</li>
                <li>3. Solve for the remaining variable</li>
                <li>4. Substitute back to find the other variable</li>
              </ol>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Substitution Method</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. Solve one equation for one variable</li>
                <li>2. Substitute into the other equation</li>
                <li>3. Solve for the remaining variable</li>
                <li>4. Substitute back to find the first variable</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Why Use This System Solver?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Two Methods Available</h3>
              <p className="text-sm text-muted-foreground">Choose between elimination or substitution method based on your preference.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Step-by-Step Solutions</h3>
              <p className="text-sm text-muted-foreground">See every step clearly explained to understand the solution process.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Handles All Cases</h3>
              <p className="text-sm text-muted-foreground">Detects unique solutions, no solution (parallel lines), and infinite solutions.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Educational Tool</h3>
              <p className="text-sm text-muted-foreground">Perfect for students learning algebra and linear systems.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Types of Solutions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Unique Solution</h3>
              <p className="text-sm text-muted-foreground mb-2">Lines intersect at one point</p>
              <p className="text-xs text-muted-foreground">Determinant ≠ 0</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">No Solution</h3>
              <p className="text-sm text-muted-foreground mb-2">Lines are parallel</p>
              <p className="text-xs text-muted-foreground">Same slope, different intercepts</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Infinite Solutions</h3>
              <p className="text-sm text-muted-foreground mb-2">Lines are identical</p>
              <p className="text-xs text-muted-foreground">Same slope and intercept</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Worked Example</h2>
          <div className="p-5 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-3">Solve using elimination:</p>
            <p className="text-sm font-mono mb-3">2x + 3y = 8</p>
            <p className="text-sm font-mono mb-3">4x - y = 5</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Multiply equation 2 by 3: 12x - 3y = 15</p>
              <p>Add to equation 1: 14x = 23</p>
              <p>x = 23/14 ≈ 1.64</p>
              <p>Substitute back: 2(23/14) + 3y = 8</p>
              <p>3y = 8 - 46/14 = 66/14</p>
              <p>y = 22/14 ≈ 1.57</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is a system of linear equations?</h3>
              <p className="text-sm text-muted-foreground">A system of linear equations is a set of two or more linear equations with the same variables. We find values that satisfy all equations simultaneously.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Which method is better: elimination or substitution?</h3>
              <p className="text-sm text-muted-foreground">Elimination works well when coefficients are easy to align. Substitution is better when one equation is already solved for a variable.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Can a system have no solution?</h3>
              <p className="text-sm text-muted-foreground">Yes. If the lines are parallel (same slope but different y-intercepts), they never intersect, so there's no solution.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What does infinite solutions mean?</h3>
              <p className="text-sm text-muted-foreground">If both equations represent the same line, every point on that line satisfies both equations – infinitely many solutions.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How do you verify the solution?</h3>
              <p className="text-sm text-muted-foreground">Substitute x and y back into both original equations. If both equations are true, your solution is correct.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Related Math Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/math-tools/linear-equation-solver" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Linear Equation Solver</h3>
              <p className="text-sm text-muted-foreground">Solve single linear equations.</p>
            </a>
            <a href="/math-tools/quadratic-equation-solver" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Quadratic Equation Solver</h3>
              <p className="text-sm text-muted-foreground">Solve equations with x² terms.</p>
            </a>
            <a href="/math-tools/matrix-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Matrix Calculator</h3>
              <p className="text-sm text-muted-foreground">Solve systems using matrices.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
