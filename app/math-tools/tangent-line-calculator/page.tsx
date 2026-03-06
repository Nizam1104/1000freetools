"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TangentLineCalculator() {
  const [functionStr, setFunctionStr] = useState("");
  const [xValue, setXValue] = useState("");
  const [result, setResult] = useState<{
    slope: number;
    point: { x: number; y: number };
    equation: string;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculateTangent = () => {
    setError("");
    setResult(null);

    if (!functionStr.trim()) {
      setError("Please enter a function");
      return;
    }

    if (!xValue.trim()) {
      setError("Please enter an x-value");
      return;
    }

    const x = parseFloat(xValue);
    if (isNaN(x)) {
      setError("Please enter a valid number for x");
      return;
    }

    try {
      const y = evaluateFunction(functionStr, x);
      const derivative = numericalDerivative(functionStr, x);
      const slope = Math.round(derivative * 1000000) / 1000000;
      const yRounded = Math.round(y * 1000000) / 1000000;

      // y - y1 = m(x - x1)
      // y = mx - mx1 + y1
      const intercept = yRounded - slope * x;
      const interceptRounded = Math.round(intercept * 1000000) / 1000000;

      let equation = "";
      if (Math.abs(slope) === 1) {
        equation = `y = ${slope === 1 ? "" : "-"}x ${interceptRounded >= 0 ? "+ " : ""}${interceptRounded}`;
      } else if (Math.abs(slope) === 0) {
        equation = `y = ${yRounded}`;
      } else {
        equation = `y = ${slope}x ${interceptRounded >= 0 ? "+ " : ""}${interceptRounded}`;
      }

      const steps = [
        `Given function: f(x) = ${functionStr}`,
        `Point of tangency: x = ${x}`,
        ``,
        `Step 1: Find the y-coordinate`,
        `f(${x}) = ${yRounded}`,
        `Point: (${x}, ${yRounded})`,
        ``,
        `Step 2: Find the derivative (slope function)`,
        `f'(x) = derivative of ${functionStr}`,
        ``,
        `Step 3: Evaluate the derivative at x = ${x}`,
        `f'(${x}) = ${slope}`,
        `Slope of tangent line: m = ${slope}`,
        ``,
        `Step 4: Use point-slope form`,
        `y - y₁ = m(x - x₁)`,
        `y - ${yRounded} = ${slope}(x - ${x})`,
        `y = ${slope}x - ${slope * x} + ${yRounded}`,
        `y = ${slope}x ${interceptRounded >= 0 ? "+ " : ""}${interceptRounded}`,
        ``,
        `Final Answer: ${equation}`
      ];

      setResult({
        slope,
        point: { x, y: yRounded },
        equation,
        steps
      });
    } catch (e) {
      setError("Unable to calculate. Please check the function format.");
    }
  };

  const evaluateFunction = (func: string, x: number): number => {
    const clean = func.replace(/\s/g, "").toLowerCase();
    let expr = clean.replace(/x/g, `(${x})`);
    
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
    expr = expr.replace(/\^/g, "**");
    
    try {
      return eval(expr);
    } catch {
      throw new Error("Invalid function");
    }
  };

  const numericalDerivative = (func: string, x: number, h: number = 0.000001): number => {
    // Central difference method for better accuracy
    const f1 = evaluateFunction(func, x + h);
    const f2 = evaluateFunction(func, x - h);
    return (f1 - f2) / (2 * h);
  };

  const reset = () => {
    setFunctionStr("");
    setXValue("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setFunctionStr("x^2");
    setXValue("2");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Tangent Line Calculator – Find Tangent Line Equation Online</h1>
        <p className="text-muted-foreground">
          Find the equation of the tangent line to any function at any point with our free online tangent line calculator. Get slope, y-intercept, and the full tangent equation with step-by-step solutions.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="function">Function f(x):</Label>
            <Input
              id="function"
              placeholder="e.g., x^2, sin(x), x^3-2x"
              value={functionStr}
              onChange={(e) => setFunctionStr(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Supports: polynomials, trig, exp, log functions
            </p>
          </div>
          <div>
            <Label>x-value for tangent point:</Label>
            <Input
              type="number"
              placeholder="e.g., 2"
              value={xValue}
              onChange={(e) => setXValue(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateTangent}>Calculate Tangent Line</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2">Tangent Line Equation</p>
                <p className="text-3xl font-bold font-mono">{result.equation}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Point of Tangency</p>
                  <p className="text-xl font-mono">({result.point.x}, {result.point.y})</p>
                </div>
                <div className="p-4 bg-background rounded border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Slope (derivative)</p>
                  <p className="text-xl font-mono">m = {result.slope}</p>
                </div>
              </div>
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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Tangent Lines</h2>
        <p className="text-muted-foreground">
          A tangent line is a straight line that touches a curve at exactly one point and has the same slope as the curve at that point. The slope of the tangent line equals the derivative of the function at the point of tangency.
        </p>
        <p className="text-muted-foreground">
          Tangent lines are fundamental in calculus and are used to approximate functions locally, analyze rates of change, and solve optimization problems.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Tangent Line Formula</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Point-Slope Form</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              y - y₁ = m(x - x₁)
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Where (x₁, y₁) is the point of tangency and m = f'(x₁)
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Slope-Intercept Form</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              y = mx + b
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Where b = y₁ - mx₁ (the y-intercept)
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Derivatives for Tangents</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Power Functions</h3>
            <ul className="space-y-1 text-sm font-mono">
              <li>f(x) = x² → f'(x) = 2x</li>
              <li>f(x) = x³ → f'(x) = 3x²</li>
              <li>f(x) = √x → f'(x) = 1/(2√x)</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Trigonometric</h3>
            <ul className="space-y-1 text-sm font-mono">
              <li>f(x) = sin(x) → f'(x) = cos(x)</li>
              <li>f(x) = cos(x) → f'(x) = -sin(x)</li>
              <li>f(x) = tan(x) → f'(x) = sec²(x)</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Exponential/Log</h3>
            <ul className="space-y-1 text-sm font-mono">
              <li>f(x) = eˣ → f'(x) = eˣ</li>
              <li>f(x) = ln(x) → f'(x) = 1/x</li>
              <li>f(x) = aˣ → f'(x) = aˣ·ln(a)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is a tangent line?</h3>
            <p className="text-sm text-muted-foreground">
              A tangent line is a line that touches a curve at a single point and has the same direction (slope) as the curve at that point. It represents the best linear approximation of the function near that point.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do you find the slope of a tangent?</h3>
            <p className="text-sm text-muted-foreground">
              The slope of the tangent line equals the derivative of the function evaluated at the point of tangency. If f(x) is the function and you want the tangent at x = a, the slope is f'(a).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between tangent and secant?</h3>
            <p className="text-sm text-muted-foreground">
              A secant line passes through two points on a curve. A tangent line touches at one point. As the two secant points get closer together, the secant approaches the tangent.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can a tangent line cross the curve?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! A tangent line can cross the curve at the point of tangency (like y = 0 for y = x³ at x = 0). The defining property is matching the slope, not staying on one side.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/derivative-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Derivative Calculator</p>
            <p className="text-xs text-muted-foreground">Find derivatives</p>
          </a>
          <a href="/math-tools/limit-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Limit Calculator</p>
            <p className="text-xs text-muted-foreground">Evaluate limits</p>
          </a>
          <a href="/math-tools/definite-integral-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Definite Integral</p>
            <p className="text-xs text-muted-foreground">Compute integrals</p>
          </a>
        </div>
      </section>
    </div>
  );
}
