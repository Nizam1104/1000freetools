"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DefiniteIntegralCalculator() {
  const [functionStr, setFunctionStr] = useState("");
  const [lowerBound, setLowerBound] = useState("");
  const [upperBound, setUpperBound] = useState("");
  const [intervals, setIntervals] = useState("1000");
  const [result, setResult] = useState<{
    integral: number;
    method: string;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const integrate = () => {
    setError("");
    setResult(null);

    if (!functionStr.trim()) {
      setError("Please enter a function");
      return;
    }

    const a = parseFloat(lowerBound);
    const b = parseFloat(upperBound);
    const n = parseInt(intervals);

    if (isNaN(a) || isNaN(b)) {
      setError("Please enter valid numbers for bounds");
      return;
    }

    if (isNaN(n) || n < 1) {
      setError("Please enter a valid number of intervals (at least 1)");
      return;
    }

    if (n > 10000) {
      setError("Please enter up to 10000 intervals for practical computation");
      return;
    }

    try {
      // Use Simpson's Rule for numerical integration
      const h = (b - a) / n;
      let sum = evaluateFunction(functionStr, a) + evaluateFunction(functionStr, b);

      for (let i = 1; i < n; i++) {
        const x = a + i * h;
        const fx = evaluateFunction(functionStr, x);

        if (i % 2 === 0) {
          sum += 2 * fx;
        } else {
          sum += 4 * fx;
        }
      }

      const integral = (h / 3) * sum;
      const roundedIntegral = Math.round(integral * 1000000) / 1000000;

      const steps = [
        `Using Simpson's Rule with n = ${n} intervals`,
        `Interval: [${a}, ${b}]`,
        `Step size: h = (${b} - ${a}) / ${n} = ${h.toFixed(6)}`,
        `Simpson's Rule: ∫f(x)dx ≈ (h/3) * [f(a) + 4f(x₁) + 2f(x₂) + 4f(x₃) + ... + f(b)]`,
        `f(${a}) = ${evaluateFunction(functionStr, a).toFixed(6)}`,
        `f(${b}) = ${evaluateFunction(functionStr, b).toFixed(6)}`,
        ``,
        `Calculated integral: ${roundedIntegral}`
      ];

      setResult({
        integral: roundedIntegral,
        method: "Simpson's Rule",
        steps
      });
    } catch (e) {
      setError("Unable to evaluate the function. Please check the format.");
    }
  };

  const evaluateFunction = (func: string, x: number): number => {
    const clean = func.replace(/\s/g, "").toLowerCase();

    // Replace x with actual value
    let expr = clean.replace(/x/g, `(${x})`);

    // Handle common functions
    expr = expr.replace(/sin\(/g, "Math.sin(");
    expr = expr.replace(/cos\(/g, "Math.cos(");
    expr = expr.replace(/tan\(/g, "Math.tan(");
    expr = expr.replace(/exp\(/g, "Math.exp(");
    expr = expr.replace(/log\(/g, "Math.log10(");
    expr = expr.replace(/ln\(/g, "Math.log(");
    expr = expr.replace(/sqrt\(/g, "Math.sqrt(");
    expr = expr.replace(/abs\(/g, "Math.abs(");
    expr = expr.replace(/pi/g, Math.PI.toString());
    expr = expr.replace(/e(?![x])/g, Math.E.toString());

    // Handle powers
    expr = expr.replace(/\^/g, "**");

    try {
      return eval(expr);
    } catch {
      throw new Error("Invalid function");
    }
  };

  const reset = () => {
    setFunctionStr("");
    setLowerBound("");
    setUpperBound("");
    setIntervals("1000");
    setResult(null);
    setError("");
  };

  const loadExample = (func: string, a: string, b: string) => {
    setFunctionStr(func);
    setLowerBound(a);
    setUpperBound(b);
    setIntervals("1000");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Definite Integral Calculator – Compute Integrals Numerically</h1>
        <p className="text-muted-foreground">
          Calculate definite integrals numerically with our free online integral calculator. Evaluate the area under any function curve over any interval with accurate numerical results using Simpson's Rule.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="function">Function f(x):</Label>
            <Input
              id="function"
              placeholder="e.g., x^2, sin(x), x*exp(-x)"
              value={functionStr}
              onChange={(e) => setFunctionStr(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Supports: x^2, sin(x), cos(x), exp(x), ln(x), sqrt(x), etc.
            </p>
          </div>
          <div>
            <Label>Number of Intervals (n):</Label>
            <Input
              type="number"
              placeholder="1000"
              value={intervals}
              onChange={(e) => setIntervals(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Higher values give more accurate results (max 10000)
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Lower Bound (a):</Label>
            <Input
              type="number"
              placeholder="e.g., 0"
              value={lowerBound}
              onChange={(e) => setLowerBound(e.target.value)}
            />
          </div>
          <div>
            <Label>Upper Bound (b):</Label>
            <Input
              type="number"
              placeholder="e.g., 1"
              value={upperBound}
              onChange={(e) => setUpperBound(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={integrate}>Calculate Integral</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("x^2", "0", "1")}>∫x² dx [0,1]</Button>
          <Button variant="outline" onClick={() => loadExample("sin(x)", "0", "3.14159")}>∫sin(x) dx [0,π]</Button>
          <Button variant="outline" onClick={() => loadExample("exp(-x)", "0", "1")}>∫e⁻ˣ dx [0,1]</Button>
          <Button variant="outline" onClick={() => loadExample("1/x", "1", "2")}>∫1/x dx [1,2]</Button>
          <Button variant="outline" onClick={() => loadExample("sqrt(x)", "0", "4")}>∫√x dx [0,4]</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Definite Integral</p>
              <p className="text-4xl font-bold">∫ f(x)dx = {result.integral}</p>
              <p className="text-sm text-muted-foreground mt-2">
                from x = {lowerBound} to x = {upperBound}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Method: {result.method}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                {result.steps.map((step, i) => (
                  <div key={i} className={step === "" ? "h-4" : ""}>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="space-y-6 pt-8 border-t">
        <h2 className="text-2xl font-semibold">Understanding Definite Integrals</h2>

        <div className="space-y-4">
          <p>
            A definite integral calculates the area under a curve between two points. It's one of the two main operations in calculus (the other being differentiation), connected by the Fundamental Theorem of Calculus.
          </p>

          <h3 className="text-xl font-semibold">What Is a Definite Integral?</h3>
          <div className="p-4 bg-muted rounded-lg">
            <code className="text-sm font-mono block">
              ∫[a to b] f(x) dx = Area under f(x) from x=a to x=b
            </code>
          </div>
          <p>
            The integral adds up infinitely many infinitely thin rectangles under the curve. The result tells you the net signed area — regions above the x-axis count positive, regions below count negative.
          </p>

          <h3 className="text-xl font-semibold">Simpson's Rule for Numerical Integration</h3>
          <p>
            Not all integrals can be solved with a neat formula. For those, we use numerical methods. This calculator uses Simpson's Rule, which approximates the curve with parabolas instead of rectangles.
          </p>
          <div className="p-4 bg-muted rounded-lg">
            <code className="text-sm font-mono block">
              ∫f(x)dx ≈ (h/3) × [f(a) + 4f(x₁) + 2f(x₂) + 4f(x₃) + ... + f(b)]
            </code>
          </div>
          <p>
            The pattern 1, 4, 2, 4, 2, ..., 4, 1 weights the function values. More intervals mean better accuracy.
          </p>

          <h3 className="text-xl font-semibold">Worked Examples</h3>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 1: ∫x² dx from 0 to 1</h4>
              <p className="text-sm text-muted-foreground mb-2">
                The exact answer is 1/3 ≈ 0.333...
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                ∫[0 to 1] x² dx = [x³/3][0 to 1] = 1/3 - 0 = 0.333...
              </code>
              <p className="text-sm mt-2">
                This represents the area under the parabola y = x² from x=0 to x=1.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 2: ∫sin(x) dx from 0 to π</h4>
              <p className="text-sm text-muted-foreground mb-2">
                The area under one hump of the sine curve.
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                ∫[0 to π] sin(x) dx = [-cos(x)][0 to π] = -(-1) - (-1) = 2
              </code>
              <p className="text-sm mt-2">
                The result is exactly 2 — the area of the region bounded by y=sin(x) and the x-axis.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 3: ∫(1/x) dx from 1 to 2</h4>
              <p className="text-sm text-muted-foreground mb-2">
                This gives us ln(2).
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                ∫[1 to 2] (1/x) dx = [ln(x)][1 to 2] = ln(2) - ln(1) ≈ 0.693
              </code>
              <p className="text-sm mt-2">
                The natural logarithm is defined as this integral.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold">A Quick Fact</h3>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">
              The integral symbol ∫ was introduced by Gottfried Wilhelm Leibniz in 1675. It's an elongated "S" standing for "summa" (Latin for sum) — because integration is fundamentally about summing infinitely many infinitesimal pieces.
            </p>
          </div>

          <h3 className="text-xl font-semibold">Common Questions</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Why use numerical integration instead of exact formulas?</h4>
              <p className="text-sm">
                Many functions don't have elementary antiderivatives. Functions like e^(-x²), sin(x)/x, or 1/ln(x) can't be integrated in closed form. Numerical methods work for any continuous function.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">How accurate is Simpson's Rule?</h4>
              <p className="text-sm">
                The error is proportional to 1/n⁴, where n is the number of intervals. Doubling the intervals reduces error by about 16x. With 1000 intervals, you typically get 6+ decimal places of accuracy.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">What if the function goes below the x-axis?</h4>
              <p className="text-sm">
                The integral gives the net signed area. Regions below the axis subtract from the total. If you want total area (ignoring signs), you'd integrate the absolute value.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Can I integrate functions with discontinuities?</h4>
              <p className="text-sm">
                Not directly with this tool. Improper integrals (with infinite discontinuities or infinite bounds) require special handling. The numerical method may fail or give incorrect results near singularities.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Where do definite integrals appear in real applications?</h4>
              <p className="text-sm">
                Everywhere in physics and engineering: computing work done by a variable force, finding centers of mass, calculating probabilities from density functions, determining total growth from a rate.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
