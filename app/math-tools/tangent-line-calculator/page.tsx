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

  const loadExample = (func: string, x: string) => {
    setFunctionStr(func);
    setXValue(x);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
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
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("x^2", "2")}>f(x)=x² at x=2</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("x^3", "1")}>f(x)=x³ at x=1</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("sin(x)", "0")}>f(x)=sin(x) at x=0</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("sqrt(x)", "4")}>f(x)=√x at x=4</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("ln(x)", "1")}>f(x)=ln(x) at x=1</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("exp(x)", "0")}>f(x)=eˣ at x=0</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("x^2-4x+3", "3")}>f(x)=x²-4x+3 at x=3</Button>
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

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Understanding Tangent Lines</h2>
          <p className="text-muted-foreground">
            A tangent line touches a curve at exactly one point and has the same slope as the curve at that point. It's the best linear approximation of the function near the point of tangency. Think of it as the direction the curve is heading at that exact moment.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            The derivative of a function gives you the slope of the tangent line at any point. This is why calculus is essential for finding tangent lines – the derivative f'(x) tells you the instantaneous rate of change, which is exactly the slope you need.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Find a Tangent Line</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Step 1: Find the point</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Evaluate the function at the given x-value to get the y-coordinate.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
              Point: (x₀, f(x₀))
            </code>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Step 2: Find the derivative</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Calculate f'(x), the derivative function that gives the slope at any point.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
              f'(x) = d/dx[f(x)]
            </code>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Step 3: Evaluate the slope</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Plug the x-value into the derivative to get the slope at that point.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
              m = f'(x₀)
            </code>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Step 4: Write the equation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Use point-slope form, then convert to slope-intercept form.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
              y - y₀ = m(x - x₀)<br />
              y = mx + b
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Parabola</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Find the tangent line to f(x) = x² at x = 2
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 1: Point: f(2) = 4, so point is (2, 4)
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 2: Derivative: f'(x) = 2x
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 3: Slope: f'(2) = 2(2) = 4
            </p>
            <p className="text-sm text-muted-foreground">
              Step 4: Equation: y - 4 = 4(x - 2) → y = 4x - 4
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Cubic function</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Find the tangent line to f(x) = x³ at x = 1
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 1: Point: f(1) = 1, so point is (1, 1)
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 2: Derivative: f'(x) = 3x²
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 3: Slope: f'(1) = 3(1)² = 3
            </p>
            <p className="text-sm text-muted-foreground">
              Step 4: Equation: y - 1 = 3(x - 1) → y = 3x - 2
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Sine function</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Find the tangent line to f(x) = sin(x) at x = 0
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 1: Point: f(0) = sin(0) = 0, so point is (0, 0)
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 2: Derivative: f'(x) = cos(x)
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 3: Slope: f'(0) = cos(0) = 1
            </p>
            <p className="text-sm text-muted-foreground">
              Step 4: Equation: y - 0 = 1(x - 0) → y = x
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Square root function</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Find the tangent line to f(x) = √x at x = 4
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 1: Point: f(4) = 2, so point is (4, 2)
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 2: Derivative: f'(x) = 1/(2√x)
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 3: Slope: f'(4) = 1/(2×2) = 1/4 = 0.25
            </p>
            <p className="text-sm text-muted-foreground">
              Step 4: Equation: y - 2 = 0.25(x - 4) → y = 0.25x + 1
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Natural logarithm</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Find the tangent line to f(x) = ln(x) at x = 1
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 1: Point: f(1) = ln(1) = 0, so point is (1, 0)
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 2: Derivative: f'(x) = 1/x
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 3: Slope: f'(1) = 1/1 = 1
            </p>
            <p className="text-sm text-muted-foreground">
              Step 4: Equation: y - 0 = 1(x - 1) → y = x - 1
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm">
            The word "tangent" comes from Latin "tangere," meaning "to touch." Gottfried Wilhelm Leibniz coined the term in 1684 when he published his work on differential calculus. The tangent line problem – finding a line that just touches a curve – was one of the key motivations that led Newton and Leibniz to independently develop calculus in the 17th century.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Derivatives Reference</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Power Rule</h4>
            <code className="text-xs font-mono bg-background px-2 py-1 rounded block">
              d/dx(xⁿ) = nxⁿ⁻¹
            </code>
            <p className="text-xs text-muted-foreground mt-1">
              Example: d/dx(x³) = 3x²
            </p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Sine</h4>
            <code className="text-xs font-mono bg-background px-2 py-1 rounded block">
              d/dx(sin x) = cos x
            </code>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Cosine</h4>
            <code className="text-xs font-mono bg-background px-2 py-1 rounded block">
              d/dx(cos x) = -sin x
            </code>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Exponential</h4>
            <code className="text-xs font-mono bg-background px-2 py-1 rounded block">
              d/dx(eˣ) = eˣ
            </code>
            <p className="text-xs text-muted-foreground mt-1">
              eˣ is its own derivative!
            </p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Natural Log</h4>
            <code className="text-xs font-mono bg-background px-2 py-1 rounded block">
              d/dx(ln x) = 1/x
            </code>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Square Root</h4>
            <code className="text-xs font-mono bg-background px-2 py-1 rounded block">
              d/dx(√x) = 1/(2√x)
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between tangent and secant lines?</h4>
            <p className="text-sm text-muted-foreground">
              A secant line passes through two points on a curve. A tangent line touches at exactly one point and has the same slope as the curve there. As the two secant points get closer together, the secant line approaches the tangent line – this is the foundation of the derivative.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can a tangent line cross the curve?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! Despite the name "tangent" meaning "to touch," a tangent line can cross the curve at the point of tangency. This happens with inflection points, like the tangent to y = x³ at x = 0, which is the x-axis (y = 0).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if the derivative is zero?</h4>
            <p className="text-sm text-muted-foreground">
              A zero derivative means a horizontal tangent line. This occurs at local maxima, minima, and some inflection points. The tangent equation becomes y = constant (the y-value at that point).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if the derivative is undefined?</h4>
            <p className="text-sm text-muted-foreground">
              An undefined derivative means a vertical tangent line (infinite slope). This happens at sharp corners or cusps. The tangent equation is x = constant (the x-value at that point).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is this used in real applications?</h4>
            <p className="text-sm text-muted-foreground">
              Tangent lines approximate complex functions with simple linear ones. Engineers use this for small-signal analysis in circuits. Economists use it for marginal analysis. Physicists use it for instantaneous velocity. Linear approximation is everywhere in science and engineering.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the normal line?</h4>
            <p className="text-sm text-muted-foreground">
              The normal line is perpendicular to the tangent line at the point of tangency. If the tangent slope is m, the normal slope is -1/m (negative reciprocal). Normal lines are used in optics, computer graphics, and physics for reflection calculations.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
