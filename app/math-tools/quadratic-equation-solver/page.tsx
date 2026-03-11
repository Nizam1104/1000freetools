"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const loadExample = (aVal: string, bVal: string, cVal: string) => {
    setA(aVal);
    setB(bVal);
    setC(cVal);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Quadratic Equation Solver – Find Roots of ax² + bx + c = 0</h1>
        <p className="text-muted-foreground">
          Solve any quadratic equation instantly with our free online quadratic equation solver. Find real and complex roots using the quadratic formula with detailed step-by-step solutions.
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-md">
          <p className="text-sm font-medium mb-2">Equation Format:</p>
          <p className="text-lg font-mono">ax² + bx + c = 0</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>a</Label>
            <Input
              type="number"
              placeholder="e.g., 1"
              step="any"
              value={a}
              onChange={(e) => setA(e.target.value)}
            />
          </div>
          <div>
            <Label>b</Label>
            <Input
              type="number"
              placeholder="e.g., -5"
              step="any"
              value={b}
              onChange={(e) => setB(e.target.value)}
            />
          </div>
          <div>
            <Label>c</Label>
            <Input
              type="number"
              placeholder="e.g., 6"
              step="any"
              value={c}
              onChange={(e) => setC(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={solve}>Solve</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("1", "-5", "6")}>x²-5x+6</Button>
          <Button variant="outline" onClick={() => loadExample("1", "2", "1")}>x²+2x+1</Button>
          <Button variant="outline" onClick={() => loadExample("1", "0", "-4")}>x²-4</Button>
          <Button variant="outline" onClick={() => loadExample("2", "4", "-6")}>2x²+4x-6</Button>
          <Button variant="outline" onClick={() => loadExample("1", "2", "5")}>x²+2x+5</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground mb-2">Nature of Roots</p>
              <p className="text-lg font-semibold">{result.nature}</p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground mb-2">Discriminant (Δ)</p>
              <p className="text-2xl font-semibold">{result.discriminant}</p>
            </div>
            <div className="p-4 bg-muted rounded-md">
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
            <div className="p-4 bg-muted rounded-md">
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
          </div>
        )}
      </div>

      <section className="space-y-6 pt-8 border-t">
        <h2 className="text-2xl font-semibold">Understanding Quadratic Equations</h2>
        
        <div className="space-y-4">
          <p>
            A quadratic equation is any equation that can be written in the form ax² + bx + c = 0, where a ≠ 0. The name comes from "quadratus," Latin for square — the variable is squared.
          </p>

          <h3 className="text-xl font-semibold">The Quadratic Formula</h3>
          <div className="p-4 bg-muted rounded-lg">
            <code className="text-sm font-mono block">
              x = (-b ± √(b² - 4ac)) / (2a)
            </code>
          </div>
          <p>
            The formula gives you both roots at once. The ± symbol means you calculate two values: one with addition and one with subtraction. The expression under the square root, b² - 4ac, is called the discriminant.
          </p>

          <h3 className="text-xl font-semibold">What the Discriminant Tells You</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Δ &gt; 0</h4>
              <p className="text-sm">Two distinct real roots. The parabola crosses the x-axis at two points.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Δ = 0</h4>
              <p className="text-sm">One repeated real root. The parabola just touches the x-axis at its vertex.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Δ &lt; 0</h4>
              <p className="text-sm">Two complex conjugate roots. The parabola never touches the x-axis.</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold">Worked Examples</h3>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 1: x² - 5x + 6 = 0</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Here a=1, b=-5, c=6. The discriminant is Δ = 25 - 24 = 1.
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                x = (5 ± √1) / 2 = (5 ± 1) / 2<br/>
                x₁ = 6/2 = 3<br/>
                x₂ = 4/2 = 2
              </code>
              <p className="text-sm mt-2">
                Two real roots: x = 3 and x = 2. You can verify: (3)² - 5(3) + 6 = 0 ✓
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 2: x² + 2x + 1 = 0</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Here a=1, b=2, c=1. The discriminant is Δ = 4 - 4 = 0.
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                x = (-2 ± √0) / 2 = -2/2 = -1
              </code>
              <p className="text-sm mt-2">
                One repeated root: x = -1. This factors as (x+1)² = 0.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 3: x² + 2x + 5 = 0</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Here a=1, b=2, c=5. The discriminant is Δ = 4 - 20 = -16.
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                x = (-2 ± √(-16)) / 2 = (-2 ± 4i) / 2<br/>
                x₁ = -1 + 2i<br/>
                x₂ = -1 - 2i
              </code>
              <p className="text-sm mt-2">
                Two complex roots. The parabola y = x² + 2x + 5 never crosses the x-axis.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold">A Quick Fact</h3>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">
              The quadratic formula in its modern form was developed by the Persian mathematician Al-Khwarizmi around 820 CE. His book "Al-Kitab al-Mukhtasar fi Hisab al-Jabr wal-Muqabala" (The Compendious Book on Calculation by Completion and Balancing) gave us the word "algebra."
            </p>
          </div>

          <h3 className="text-xl font-semibold">Common Questions</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">What if a = 0?</h4>
              <p className="text-sm">
                Then it's not a quadratic equation anymore — it becomes linear: bx + c = 0. You'd solve it as x = -c/b. This calculator requires a ≠ 0 to use the quadratic formula.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Can I use this for equations not set to zero?</h4>
              <p className="text-sm">
                First rearrange so one side equals zero. For example, x² + 3x = 10 becomes x² + 3x - 10 = 0. Then a=1, b=3, c=-10.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Why do complex roots come in pairs?</h4>
              <p className="text-sm">
                For polynomials with real coefficients, complex roots always appear as conjugate pairs (a + bi and a - bi). This ensures the coefficients stay real when you expand (x - r₁)(x - r₂).
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">When would I need complex solutions?</h4>
              <p className="text-sm">
                In electrical engineering, complex numbers describe AC circuits. In physics, they appear in quantum mechanics and wave equations. The complex roots aren't "fake" — they represent real phenomena.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Is the quadratic formula the only way to solve?</h4>
              <p className="text-sm">
                No. You can also factor (when possible), complete the square, or graph and find x-intercepts. The quadratic formula always works, but factoring is faster when the equation factors nicely.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
