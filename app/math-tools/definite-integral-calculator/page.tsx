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

    </div>
  );
}
