"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const examples = [
  { a: "2", b: "5", c: "15", label: "2x + 5 = 15" },
  { a: "3", b: "-7", c: "14", label: "3x - 7 = 14" },
  { a: "-4", b: "12", c: "28", label: "-4x + 12 = 28" },
  { a: "5", b: "0", c: "35", label: "5x = 35" },
  { a: "1", b: "8", c: "3", label: "x + 8 = 3" },
  { a: "7", b: "-21", c: "0", label: "7x - 21 = 0" },
];

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

  const loadExample = (exampleIndex: number) => {
    const ex = examples[exampleIndex];
    setA(ex.a);
    setB(ex.b);
    setC(ex.c);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Linear Equation Solver – Solve ax + b = c Online</h1>
        <p className="text-muted-foreground">
          Solve any linear equation of the form ax + b = c instantly with our free online linear equation solver. Get step-by-step solutions for one-variable linear equations.
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-md">
          <p className="text-sm font-medium mb-2">Equation Format:</p>
          <p className="text-lg font-mono">ax + b = c</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">a (coefficient of x)</Label>
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
            <Label className="text-sm font-medium mb-2 block">b (constant)</Label>
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
            <Label className="text-sm font-medium mb-2 block">c (result)</Label>
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
        <div className="flex gap-2 flex-wrap">
          <Button onClick={solve}>Solve</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          {examples.map((ex, i) => (
            <Button key={i} variant="ghost" size="sm" onClick={() => loadExample(i)}>
              {ex.label}
            </Button>
          ))}
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Linear Equations</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            A linear equation in one variable is an equation where the variable (usually x) appears only to the first power – no x², no x³, just plain x. The standard form is ax + b = c, where a, b, and c are known numbers and a ≠ 0.
          </p>
          <p className="text-muted-foreground">
            Solving a linear equation means finding the value of x that makes the equation true. There's always exactly one solution (unless a = 0, which creates special cases). The process involves isolating x on one side of the equation.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Solving Method</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Identify the coefficients</p>
                <p className="text-muted-foreground">
                  Write your equation in the form ax + b = c. Identify which numbers are a, b, and c.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Subtract b from both sides</p>
                <p className="text-muted-foreground">
                  This moves the constant term to the right side: ax = c - b
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Divide both sides by a</p>
                <p className="text-muted-foreground">
                  This isolates x: x = (c - b) / a
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Verify your answer</p>
                <p className="text-muted-foreground">
                  Plug your solution back into the original equation to confirm it works.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Basic Equation</h4>
            <p className="text-sm text-muted-foreground mb-3">Solve: 2x + 5 = 15</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>2x + 5 = 15</div>
              <div>2x = 15 - 5</div>
              <div>2x = 10</div>
              <div>x = 10 / 2</div>
              <div className="pt-2 font-semibold">Answer: x = 5</div>
              <div className="text-xs text-muted-foreground">Check: 2(5) + 5 = 10 + 5 = 15 ✓</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Negative Coefficient</h4>
            <p className="text-sm text-muted-foreground mb-3">Solve: -4x + 12 = 28</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>-4x + 12 = 28</div>
              <div>-4x = 28 - 12</div>
              <div>-4x = 16</div>
              <div>x = 16 / (-4)</div>
              <div className="pt-2 font-semibold">Answer: x = -4</div>
              <div className="text-xs text-muted-foreground">Check: -4(-4) + 12 = 16 + 12 = 28 ✓</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Negative Constant</h4>
            <p className="text-sm text-muted-foreground mb-3">Solve: 3x - 7 = 14</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>3x - 7 = 14</div>
              <div>3x = 14 - (-7)</div>
              <div>3x = 14 + 7</div>
              <div>3x = 21</div>
              <div>x = 21 / 3</div>
              <div className="pt-2 font-semibold">Answer: x = 7</div>
              <div className="text-xs text-muted-foreground">Check: 3(7) - 7 = 21 - 7 = 14 ✓</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: No x Term on Right</h4>
            <p className="text-sm text-muted-foreground mb-3">Solve: 7x - 21 = 0</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>7x - 21 = 0</div>
              <div>7x = 0 + 21</div>
              <div>7x = 21</div>
              <div>x = 21 / 7</div>
              <div className="pt-2 font-semibold">Answer: x = 3</div>
              <div className="text-xs text-muted-foreground">Check: 7(3) - 21 = 21 - 21 = 0 ✓</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-sm">
            The word "algebra" comes from the Arabic "al-jabr," meaning "reunion of broken parts." It was coined by the 9th-century Persian mathematician Al-Khwarizmi in his book about solving linear and quadratic equations. His methods for balancing equations are still taught today.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What if a = 0?</h4>
            <p className="text-sm text-muted-foreground">
              If a = 0, the equation becomes b = c. If b equals c, any value of x works (infinite solutions). If b doesn't equal c, no value of x works (no solution). These are called degenerate cases.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the solution be a fraction or decimal?</h4>
            <p className="text-sm text-muted-foreground">
              Absolutely. If (c - b) doesn't divide evenly by a, you'll get a fraction or decimal. For example, 2x = 7 gives x = 3.5. Both are perfectly valid solutions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if my equation isn't in ax + b = c form?</h4>
            <p className="text-sm text-muted-foreground">
              Rearrange it first. Move all x terms to one side and constants to the other. For example, 3x + 5 = 2x + 10 becomes 3x - 2x = 10 - 5, which simplifies to x = 5.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do I need to do the same thing to both sides?</h4>
            <p className="text-sm text-muted-foreground">
              An equation is a balance – both sides are equal. If you change one side without changing the other the same way, you break the equality. Doing the same operation to both sides preserves the balance.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I check my answer?</h4>
            <p className="text-sm text-muted-foreground">
              Substitute your solution back into the original equation. If both sides equal the same number, your answer is correct. Always check – it catches careless errors.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between linear and quadratic equations?</h4>
            <p className="text-sm text-muted-foreground">
              Linear equations have x to the first power only (ax + b = c) and always have one solution. Quadratic equations have x² terms (ax² + bx + c = 0) and can have zero, one, or two solutions.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
