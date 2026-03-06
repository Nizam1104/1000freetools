"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LinearEquationSolver() {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [result, setResult] = useState<{ x: number; steps: string } | null>(null);

  const calculate = () => {
    const aVal = parseFloat(a);
    const bVal = parseFloat(b);

    if (!isNaN(aVal) && !isNaN(bVal) && aVal !== 0) {
      const x = -bVal / aVal;
      setResult({
        x,
        steps: `${aVal}x + ${bVal} = 0\n${aVal}x = -${bVal}\nx = ${-bVal}/${aVal}\nx = ${x}`
      });
    }
  };

  const reset = () => {
    setA("");
    setB("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-md text-center font-mono">
              ax + b = 0
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Coefficient a</label>
              <Input
                type="number"
                placeholder="e.g., 2"
                step="any"
                value={a}
                onChange={(e) => setA(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Constant b</label>
              <Input
                type="number"
                placeholder="e.g., -6"
                step="any"
                value={b}
                onChange={(e) => setB(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Solve</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Solution</p>
                  <p className="text-2xl font-semibold">x = {result.x}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Steps</p>
                  <pre className="text-sm whitespace-pre-wrap font-mono">{result.steps}</pre>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Linear Equation Solving Works</CardTitle>
          <CardDescription>Step-by-step algebraic solution method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold">Isolate the Variable Term</h4>
                <p className="text-sm text-muted-foreground">
                  Start with ax + b = 0. Subtract b from both sides to get ax = -b. This moves the constant to the right side, leaving the variable term alone on the left.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold">Divide by the Coefficient</h4>
                <p className="text-sm text-muted-foreground">
                  Divide both sides by a to isolate x: x = -b/a. This gives the solution directly. The coefficient a must not be zero for a unique solution.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold">Verify the Solution</h4>
                <p className="text-sm text-muted-foreground">
                  Substitute x back into the original equation. If a(-b/a) + b = 0 simplifies to 0 = 0, the solution is correct. This check catches calculation errors.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Linear Equation Features and Properties</CardTitle>
          <CardDescription>Understanding first-degree equations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Standard Form**</h4>
              <p className="text-xs text-muted-foreground">
                Linear equations have the form ax + b = 0 where a ≠ 0. The variable x has exponent 1 (not squared or higher). Graph is always a straight line with slope a.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Unique Solution**</h4>
              <p className="text-xs text-muted-foreground">
                Every linear equation with a ≠ 0 has exactly one solution: x = -b/a. This distinguishes linear from quadratic equations which can have 0, 1, or 2 solutions.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Special Cases**</h4>
              <p className="text-xs text-muted-foreground">
                If a = 0 and b ≠ 0, there is no solution (contradiction). If a = 0 and b = 0, every x is a solution (identity). These edge cases require special handling.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Graphical Interpretation**</h4>
              <p className="text-xs text-muted-foreground">
                The solution x = -b/a is where the line y = ax + b crosses the x-axis (x-intercept). This is the root or zero of the linear function.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3">Linear Equation Examples</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equation</TableHead>
                  <TableHead>a</TableHead>
                  <TableHead>b</TableHead>
                  <TableHead>Solution</TableHead>
                  <TableHead>Verification</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-xs">2x - 6 = 0</TableCell>
                  <TableCell className="font-mono">2</TableCell>
                  <TableCell className="font-mono">-6</TableCell>
                  <TableCell className="font-mono">x = 3</TableCell>
                  <TableCell className="text-xs">2(3)-6=0 ✓</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs">-3x + 12 = 0</TableCell>
                  <TableCell className="font-mono">-3</TableCell>
                  <TableCell className="font-mono">12</TableCell>
                  <TableCell className="font-mono">x = 4</TableCell>
                  <TableCell className="text-xs">-3(4)+12=0 ✓</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs">5x + 20 = 0</TableCell>
                  <TableCell className="font-mono">5</TableCell>
                  <TableCell className="font-mono">20</TableCell>
                  <TableCell className="font-mono">x = -4</TableCell>
                  <TableCell className="text-xs">5(-4)+20=0 ✓</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs">0.5x - 2 = 0</TableCell>
                  <TableCell className="font-mono">0.5</TableCell>
                  <TableCell className="font-mono">-2</TableCell>
                  <TableCell className="font-mono">x = 4</TableCell>
                  <TableCell className="text-xs">0.5(4)-2=0 ✓</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs">7x + 1 = 0</TableCell>
                  <TableCell className="font-mono">7</TableCell>
                  <TableCell className="font-mono">1</TableCell>
                  <TableCell className="font-mono">x = -1/7</TableCell>
                  <TableCell className="text-xs">7(-1/7)+1=0 ✓</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is a linear equation?</h4>
            <p className="text-xs text-muted-foreground">
              A linear equation is an algebraic equation where the variable has exponent 1. The standard form is ax + b = 0. When graphed, it produces a straight line – hence the name "linear."
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do you solve a linear equation?</h4>
            <p className="text-xs text-muted-foreground">
              Isolate the variable by performing the same operations on both sides. First move constants to one side, then divide by the coefficient. The goal is to get x alone on one side.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if a = 0 in ax + b = 0?</h4>
            <p className="text-xs text-muted-foreground">
              If a = 0 and b ≠ 0, there is no solution (e.g., 0x + 5 = 0 is impossible). If a = 0 and b = 0, every number is a solution (0x + 0 = 0 is always true).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can linear equations have fractions as solutions?</h4>
            <p className="text-xs text-muted-foreground">
              Yes, solutions can be any real number: integers, fractions, decimals, or irrational numbers. For example, 3x = 1 gives x = 1/3, and √2x = 2 gives x = √2.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is this different from quadratic equations?</h4>
            <p className="text-xs text-muted-foreground">
              Linear equations have x to the first power and always have one solution. Quadratic equations have x² and can have 0, 1, or 2 solutions. Linear graphs are lines; quadratic graphs are parabolas.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/calculators/quadratic-equation-solver" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Quadratic Equation Solver</p>
              <p className="text-xs text-muted-foreground">Solve ax² + bx + c = 0</p>
            </a>
            <a href="/calculators/system-of-equations-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">System of Equations Calculator</p>
              <p className="text-xs text-muted-foreground">Solve multiple equations</p>
            </a>
            <a href="/calculators/algebra-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Algebra Calculator</p>
              <p className="text-xs text-muted-foreground">General algebra solver</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
