"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DefiniteIntegralCalculator() {
  const [functionStr, setFunctionStr] = useState("");
  const [lowerBound, setLowerBound] = useState("");
  const [upperBound, setUpperBound] = useState("");
  const [intervals, setIntervals] = useState("100");
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
    setIntervals("100");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setFunctionStr("x^2");
    setLowerBound("0");
    setUpperBound("1");
    setIntervals("100");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
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
              placeholder="100"
              value={intervals}
              onChange={(e) => setIntervals(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Higher values give more accurate results
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

        <div className="flex gap-2">
          <Button onClick={integrate}>Calculate Integral</Button>
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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Definite Integrals</h2>
        <p className="text-muted-foreground">
          A definite integral represents the signed area between a function and the x-axis over a specific interval [a, b]. It's written as ∫[a to b] f(x)dx and gives a numerical value representing the net area.
        </p>
        <p className="text-muted-foreground">
          Positive areas (above the x-axis) add to the total, while negative areas (below the x-axis) subtract from it. This is why it's called a "signed" area.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Numerical Integration Methods</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Simpson's Rule (Used Here)</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              ∫f(x)dx ≈ (h/3)[f(x₀) + 4f(x₁) + 2f(x₂) + 4f(x₃) + ... + f(xₙ)]
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Uses parabolic approximations. Very accurate for smooth functions.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Trapezoidal Rule</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              ∫f(x)dx ≈ (h/2)[f(x₀) + 2f(x₁) + ... + 2f(xₙ₋₁) + f(xₙ)]
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Uses trapezoids to approximate area. Simpler but less accurate.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Integrals</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Power Functions</h3>
            <ul className="space-y-1 text-sm font-mono">
              <li>∫x dx = x²/2 + C</li>
              <li>∫x² dx = x³/3 + C</li>
              <li>∫xⁿ dx = xⁿ⁺¹/(n+1) + C</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Trigonometric</h3>
            <ul className="space-y-1 text-sm font-mono">
              <li>∫sin(x) dx = -cos(x) + C</li>
              <li>∫cos(x) dx = sin(x) + C</li>
              <li>∫sec²(x) dx = tan(x) + C</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Exponential</h3>
            <ul className="space-y-1 text-sm font-mono">
              <li>∫eˣ dx = eˣ + C</li>
              <li>∫aˣ dx = aˣ/ln(a) + C</li>
              <li>∫1/x dx = ln|x| + C</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is a definite integral?</h3>
            <p className="text-sm text-muted-foreground">
              A definite integral calculates the signed area under a curve between two points. Unlike indefinite integrals, it gives a specific numerical value, not a function.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why use numerical integration?</h3>
            <p className="text-sm text-muted-foreground">
              Many functions don't have closed-form antiderivatives. Numerical methods like Simpson's Rule approximate the integral when exact solutions aren't possible.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How accurate is Simpson's Rule?</h3>
            <p className="text-sm text-muted-foreground">
              Simpson's Rule is very accurate for smooth functions. The error decreases as n⁴, so doubling the intervals reduces error by about 16x.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can integrals be negative?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. If more area lies below the x-axis than above it in the interval, the definite integral will be negative.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/riemann-sum-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Riemann Sum Calculator</p>
            <p className="text-xs text-muted-foreground">Approximate with rectangles</p>
          </a>
          <a href="/math-tools/derivative-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Derivative Calculator</p>
            <p className="text-xs text-muted-foreground">Find derivatives</p>
          </a>
          <a href="/math-tools/area-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Area Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate geometric areas</p>
          </a>
        </div>
      </section>
    </div>
  );
}
