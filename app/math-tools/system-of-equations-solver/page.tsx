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

  const loadExample = (vals: { a1: string; b1: string; c1: string; a2: string; b2: string; c2: string }) => {
    setA1(vals.a1);
    setB1(vals.b1);
    setC1(vals.c1);
    setA2(vals.a2);
    setB2(vals.b2);
    setC2(vals.c2);
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">System of Linear Equations Solver – Solve 2x2 Equation Systems</h1>
        <p className="text-muted-foreground">
          Solve a system of two linear equations with two variables online. Our free solver uses substitution and elimination methods to find exact solutions with step-by-step explanations.
        </p>
      </div>

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

        <div className="flex gap-2">
          <Button onClick={solve}>Solve</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample({ a1: "2", b1: "3", c1: "8", a2: "4", b2: "-1", c2: "5" })}>2x+3y=8, 4x-y=5</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample({ a1: "1", b1: "1", c1: "10", a2: "2", b2: "-1", c2: "5" })}>x+y=10, 2x-y=5</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample({ a1: "3", b1: "2", c1: "12", a2: "5", b2: "4", c2: "22" })}>3x+2y=12, 5x+4y=22</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample({ a1: "2", b1: "-3", c1: "1", a2: "4", b2: "1", c2: "15" })}>2x-3y=1, 4x+y=15</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample({ a1: "1", b1: "-2", c1: "3", a2: "3", b2: "-6", c2: "9" })}>Infinite solutions</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample({ a1: "2", b1: "4", c1: "8", a2: "1", b2: "2", c2: "5" })}>No solution</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample({ a1: "5", b1: "2", c1: "20", a2: "3", b2: "7", c2: "31" })}>5x+2y=20, 3x+7y=31</Button>
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
          </>
        )}
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Understanding Systems of Linear Equations</h2>
          <p className="text-muted-foreground">
            A system of linear equations is a set of two or more equations with the same variables. The solution is the point where all equations are satisfied simultaneously – geometrically, where the lines intersect. For two equations with two variables, you're finding the single (x, y) point that lies on both lines.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            These systems appear everywhere: balancing chemical equations, optimizing business profits, analyzing electrical circuits, and solving mixture problems. Master the elimination and substitution methods, and you can tackle a huge range of practical problems.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Solution Methods Explained</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Elimination Method</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Add or subtract equations to eliminate one variable, solve for the other, then substitute back.
            </p>
            <ol className="text-xs text-muted-foreground list-decimal list-inside space-y-1">
              <li>Multiply equations to match coefficients</li>
              <li>Add or subtract to eliminate a variable</li>
              <li>Solve for the remaining variable</li>
              <li>Substitute back to find the other</li>
            </ol>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Substitution Method</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Solve one equation for one variable, substitute into the other equation, then solve.
            </p>
            <ol className="text-xs text-muted-foreground list-decimal list-inside space-y-1">
              <li>Solve one equation for x or y</li>
              <li>Substitute that expression into the other equation</li>
              <li>Solve for the remaining variable</li>
              <li>Substitute back to find the other variable</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Basic elimination</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Solve 2x + 3y = 8 and 4x - y = 5
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution (Elimination): Multiply equation 2 by 3: 12x - 3y = 15
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Add to equation 1: 14x = 23, so x = 23/14 ≈ 1.64
            </p>
            <p className="text-sm text-muted-foreground">
              Substitute back: 4(23/14) - y = 5, solve for y = 11/7 ≈ 1.57
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Substitution method</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Solve x + y = 10 and 2x - y = 5
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: From equation 1: y = 10 - x
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Substitute into equation 2: 2x - (10 - x) = 5
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Simplify: 3x - 10 = 5, so 3x = 15, x = 5
            </p>
            <p className="text-sm text-muted-foreground">
              Then y = 10 - 5 = 5. Solution: (5, 5)
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Infinite solutions</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Solve x - 2y = 3 and 3x - 6y = 9
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Notice equation 2 = 3 × equation 1. They're the same line!
            </p>
            <p className="text-sm text-muted-foreground">
              Every point on the line is a solution. Infinite solutions: (x, y) where x = 3 + 2y.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: No solution (parallel lines)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Solve 2x + 4y = 8 and x + 2y = 5
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Multiply equation 2 by 2: 2x + 4y = 10
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              But equation 1 says 2x + 4y = 8. Contradiction!
            </p>
            <p className="text-sm text-muted-foreground">
              The lines are parallel (same slope, different intercepts). No solution exists.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Real-world application</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Adult tickets cost $12, child tickets cost $8. 50 tickets sold for $500. How many of each?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Let a = adult tickets, c = child tickets.
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              a + c = 50 (total tickets)
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              12a + 8c = 500 (total revenue)
            </p>
            <p className="text-sm text-muted-foreground">
              Solution: a = 25 adult tickets, c = 25 child tickets.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm">
            The method of solving simultaneous equations dates back over 2,000 years to ancient China. The "Nine Chapters on the Mathematical Art" (circa 200 BCE) describes a method called "fangcheng" that's essentially Gaussian elimination – the same technique taught in algebra classes today. The Babylonians also solved systems of equations around 1800 BCE using geometric methods.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Types of Solutions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Unique Solution</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Lines intersect at exactly one point.
            </p>
            <p className="text-xs font-mono bg-muted p-2 rounded">
              Different slopes
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">No Solution</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Lines are parallel and never meet.
            </p>
            <p className="text-xs font-mono bg-muted p-2 rounded">
              Same slope, different intercepts
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Infinite Solutions</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Lines are identical (coincident).
            </p>
            <p className="text-xs font-mono bg-muted p-2 rounded">
              Same slope and intercept
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Which method is better: elimination or substitution?</h4>
            <p className="text-sm text-muted-foreground">
              It depends on the equations. If one variable has coefficient 1 or -1, substitution is often easier. If coefficients are already matched or easily matched, elimination is faster. Both methods always give the same answer – choose whichever feels more comfortable.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I know if a system has no solution?</h4>
            <p className="text-sm text-muted-foreground">
              During elimination, if you get a contradiction like 0 = 5, there's no solution. The lines are parallel. Algebraically, this happens when the coefficients are proportional but the constants aren't.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does it mean when I get 0 = 0?</h4>
            <p className="text-sm text-muted-foreground">
              That means infinite solutions! The equations represent the same line. Any point on that line satisfies both equations. Express the solution as one variable in terms of the other, like "x = 3 + 2y for any y."
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I solve systems with more than 2 variables?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! You need as many equations as variables. For 3 variables, you need 3 equations. The methods extend: eliminate variables one at a time until you have one equation with one variable. This is called Gaussian elimination.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I check my solution?</h4>
            <p className="text-sm text-muted-foreground">
              Substitute your x and y values back into BOTH original equations. If both equations are satisfied (left side equals right side), your solution is correct. Always check – it catches arithmetic errors.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if my answer has fractions?</h4>
            <p className="text-sm text-muted-foreground">
              Fractional answers are perfectly valid! Not all solutions are nice integers. Keep fractions exact rather than converting to decimals unless the problem specifically asks for decimal approximation.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/matrix-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Calculator</p>
            <p className="text-xs text-muted-foreground">Matrix operations</p>
          </a>
          <a href="/math-tools/graphing-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Graphing Calculator</p>
            <p className="text-xs text-muted-foreground">Plot equations</p>
          </a>
          <a href="/math-tools/linear-algebra-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Linear Algebra</p>
            <p className="text-xs text-muted-foreground">Advanced systems</p>
          </a>
        </div>
      </section>
    </div>
  );
}
