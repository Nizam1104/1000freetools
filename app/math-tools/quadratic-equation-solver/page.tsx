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

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Quadratic Formula</h2>
          <div className="p-5 bg-muted rounded-lg mb-6">
            <p className="text-lg font-semibold mb-3 font-mono text-center">x = (-b ± √(b² - 4ac)) / 2a</p>
            <p className="text-sm text-muted-foreground">
              The quadratic formula gives the solutions to any quadratic equation ax² + bx + c = 0.
            </p>
          </div>
          <div className="p-5 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">The Discriminant</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Δ = b² - 4ac determines the nature of the roots:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span><strong>Δ &gt; 0:</strong> Two distinct real roots</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span><strong>Δ = 0:</strong> One repeated real root</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span><strong>Δ &lt; 0:</strong> Two complex conjugate roots</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Quadratic Equation Solver?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Complete Solutions</h3>
              <p className="text-sm text-muted-foreground">Finds both real and complex roots with full step-by-step working.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Discriminant Analysis</h3>
              <p className="text-sm text-muted-foreground">Shows the discriminant and explains the nature of roots.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Educational Tool</h3>
              <p className="text-sm text-muted-foreground">Learn the quadratic formula with detailed examples.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Accurate Results</h3>
              <p className="text-sm text-muted-foreground">Precise calculations for all types of quadratic equations.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Worked Examples</h2>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Example 1: Two Real Roots</h3>
              <p className="text-sm font-mono mb-2">x² - 5x + 6 = 0</p>
              <p className="text-sm text-muted-foreground">a = 1, b = -5, c = 6</p>
              <p className="text-sm text-muted-foreground">Δ = 25 - 24 = 1</p>
              <p className="text-sm text-muted-foreground">x₁ = (5 + 1) / 2 = 3</p>
              <p className="text-sm text-muted-foreground">x₂ = (5 - 1) / 2 = 2</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Example 2: One Repeated Root</h3>
              <p className="text-sm font-mono mb-2">x² - 6x + 9 = 0</p>
              <p className="text-sm text-muted-foreground">a = 1, b = -6, c = 9</p>
              <p className="text-sm text-muted-foreground">Δ = 36 - 36 = 0</p>
              <p className="text-sm text-muted-foreground">x = 6 / 2 = 3 (repeated)</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Example 3: Complex Roots</h3>
              <p className="text-sm font-mono mb-2">x² + 4x + 5 = 0</p>
              <p className="text-sm text-muted-foreground">a = 1, b = 4, c = 5</p>
              <p className="text-sm text-muted-foreground">Δ = 16 - 20 = -4</p>
              <p className="text-sm text-muted-foreground">x₁ = -2 + i, x₂ = -2 - i</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is a quadratic equation?</h3>
              <p className="text-sm text-muted-foreground">A quadratic equation is a second-degree polynomial equation of the form ax² + bx + c = 0, where a ≠ 0.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How do you solve a quadratic equation?</h3>
              <p className="text-sm text-muted-foreground">Use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a. First calculate the discriminant, then find the roots.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What does the discriminant tell us?</h3>
              <p className="text-sm text-muted-foreground">The discriminant (b² - 4ac) reveals the nature of roots: positive means two real roots, zero means one repeated root, negative means two complex roots.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Can quadratic equations have complex solutions?</h3>
              <p className="text-sm text-muted-foreground">Yes. When the discriminant is negative, the solutions are complex numbers involving the imaginary unit i.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What if a = 0?</h3>
              <p className="text-sm text-muted-foreground">If a = 0, the equation is not quadratic but linear. This solver requires a ≠ 0.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Related Math Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/math-tools/linear-equation-solver" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Linear Equation Solver</h3>
              <p className="text-sm text-muted-foreground">Solve equations with x terms.</p>
            </a>
            <a href="/math-tools/system-of-equations-solver" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">System of Equations</h3>
              <p className="text-sm text-muted-foreground">Solve multiple equations together.</p>
            </a>
            <a href="/math-tools/polynomial-evaluator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Polynomial Evaluator</h3>
              <p className="text-sm text-muted-foreground">Evaluate polynomials at any x value.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
