"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RiemannSumCalculator() {
  const [functionStr, setFunctionStr] = useState("");
  const [lowerBound, setLowerBound] = useState("0");
  const [upperBound, setUpperBound] = useState("1");
  const [intervals, setIntervals] = useState("4");
  const [method, setMethod] = useState<"left" | "right" | "midpoint" | "trapezoidal">("left");
  const [result, setResult] = useState<{
    sum: number;
    rectangles: { x: number; height: number; width: number }[];
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculateRiemannSum = () => {
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
      setError("Please enter at least 1 interval");
      return;
    }

    try {
      const width = (b - a) / n;
      const rectangles: { x: number; height: number; width: number }[] = [];
      let sum = 0;
      const steps: string[] = [];

      steps.push(`Using ${method} Riemann Sum with n = ${n} intervals`);
      steps.push(`Interval: [${a}, ${b}]`);
      steps.push(`Width of each rectangle: Δx = (${b} - ${a}) / ${n} = ${width.toFixed(4)}`);
      steps.push(``);

      for (let i = 0; i < n; i++) {
        let xPoint: number;
        
        if (method === "left") {
          xPoint = a + i * width;
        } else if (method === "right") {
          xPoint = a + (i + 1) * width;
        } else if (method === "midpoint") {
          xPoint = a + (i + 0.5) * width;
        } else {
          xPoint = a + i * width;
        }

        const height = evaluateFunction(functionStr, xPoint);
        const area = height * width;
        sum += area;

        rectangles.push({ x: xPoint, height, width });

        if (method === "trapezoidal") {
          const x1 = a + i * width;
          const x2 = a + (i + 1) * width;
          const h1 = evaluateFunction(functionStr, x1);
          const h2 = evaluateFunction(functionStr, x2);
          const trapArea = (h1 + h2) / 2 * width;
          
          if (i < n - 1 || n <= 5) {
            steps.push(`Trapezoid ${i + 1}: x ∈ [${x1.toFixed(4)}, ${x2.toFixed(4)}]`);
            steps.push(`  f(${x1.toFixed(4)}) = ${h1.toFixed(4)}, f(${x2.toFixed(4)}) = ${h2.toFixed(4)}`);
            steps.push(`  Area = (${h1.toFixed(4)} + ${h2.toFixed(4)})/2 × ${width.toFixed(4)} = ${trapArea.toFixed(4)}`);
          }
        } else {
          if (n <= 10) {
            steps.push(`Rectangle ${i + 1}: x = ${xPoint.toFixed(4)}`);
            steps.push(`  f(${xPoint.toFixed(4)}) = ${height.toFixed(4)}`);
            steps.push(`  Area = ${height.toFixed(4)} × ${width.toFixed(4)} = ${area.toFixed(4)}`);
          }
        }
      }

      if (method === "trapezoidal") {
        sum = 0;
        for (let i = 0; i < n; i++) {
          const x1 = a + i * width;
          const x2 = a + (i + 1) * width;
          const h1 = evaluateFunction(functionStr, x1);
          const h2 = evaluateFunction(functionStr, x2);
          sum += (h1 + h2) / 2 * width;
        }
      }

      const roundedSum = Math.round(sum * 1000000) / 1000000;

      steps.push(``);
      steps.push(`Total ${method} Riemann Sum: ${roundedSum}`);

      setResult({
        sum: roundedSum,
        rectangles,
        steps
      });
    } catch (e) {
      setError("Unable to evaluate the function. Please check the format.");
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
      return 0;
    }
  };

  const reset = () => {
    setFunctionStr("");
    setLowerBound("0");
    setUpperBound("1");
    setIntervals("4");
    setMethod("left");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setFunctionStr("x^2");
    setLowerBound("0");
    setUpperBound("1");
    setIntervals("4");
    setMethod("left");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Riemann Sum Calculator – Approximate Integral with Rectangles</h1>
        <p className="text-muted-foreground">
          Approximate integrals using Riemann sums with our free online Riemann sum calculator. Choose from left, right, midpoint, or trapezoidal methods with detailed step-by-step calculations.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="function">Function f(x):</Label>
            <Input
              id="function"
              placeholder="e.g., x^2, sin(x), x+1"
              value={functionStr}
              onChange={(e) => setFunctionStr(e.target.value)}
            />
          </div>
          <div>
            <Label>Method:</Label>
            <Select value={method} onValueChange={(v) => setMethod(v as typeof method)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left Riemann Sum</SelectItem>
                <SelectItem value="right">Right Riemann Sum</SelectItem>
                <SelectItem value="midpoint">Midpoint Rule</SelectItem>
                <SelectItem value="trapezoidal">Trapezoidal Rule</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Lower Bound (a):</Label>
            <Input
              type="number"
              placeholder="0"
              value={lowerBound}
              onChange={(e) => setLowerBound(e.target.value)}
            />
          </div>
          <div>
            <Label>Upper Bound (b):</Label>
            <Input
              type="number"
              placeholder="1"
              value={upperBound}
              onChange={(e) => setUpperBound(e.target.value)}
            />
          </div>
          <div>
            <Label>Number of Intervals (n):</Label>
            <Input
              type="number"
              placeholder="4"
              value={intervals}
              onChange={(e) => setIntervals(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateRiemannSum}>Calculate Riemann Sum</Button>
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
              <p className="text-sm text-muted-foreground mb-2">{method.charAt(0).toUpperCase() + method.slice(1)} Riemann Sum</p>
              <p className="text-4xl font-bold">Rₙ = {result.sum}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Approximation of ∫ f(x)dx from {lowerBound} to {upperBound}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Calculation</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded max-h-96 overflow-y-auto">
                {result.steps.map((step, i) => (
                  <div key={i} className={step === "" ? "h-4" : ""}>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {result.rectangles.length <= 10 && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-3">Rectangle Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {result.rectangles.map((rect, i) => (
                    <div key={i} className="p-2 bg-muted rounded text-center">
                      <p className="text-xs text-muted-foreground">Rect {i + 1}</p>
                      <p className="text-sm font-mono">h = {rect.height.toFixed(4)}</p>
                      <p className="text-xs text-muted-foreground">A = {(rect.height * rect.width).toFixed(4)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Riemann Sums</h2>
        <p className="text-muted-foreground">
          A Riemann sum approximates the area under a curve by dividing it into rectangles (or trapezoids) and summing their areas. As the number of intervals increases, the approximation becomes more accurate, approaching the exact definite integral.
        </p>
        <p className="text-muted-foreground">
          Riemann sums are the foundation of integral calculus and provide a practical way to estimate integrals when exact solutions are difficult or impossible to find.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Riemann Sum Methods</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Left Riemann Sum</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              Lₙ = Σ f(xᵢ₋₁) · Δx
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Uses the left endpoint of each subinterval. Underestimates for increasing functions.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Right Riemann Sum</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              Rₙ = Σ f(xᵢ) · Δx
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Uses the right endpoint of each subinterval. Overestimates for increasing functions.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Midpoint Rule</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              Mₙ = Σ f((xᵢ₋₁ + xᵢ)/2) · Δx
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Uses the midpoint of each subinterval. Generally more accurate than left/right.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Trapezoidal Rule</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              Tₙ = (Δx/2) · [f(x₀) + 2f(x₁) + ... + f(xₙ)]
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Uses trapezoids instead of rectangles. Average of left and right sums.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Which Riemann sum method is most accurate?</h3>
            <p className="text-sm text-muted-foreground">
              The midpoint rule and trapezoidal rule are generally more accurate than left or right sums. For smooth functions, the midpoint rule often gives the best approximation for a given number of intervals.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I improve accuracy?</h3>
            <p className="text-sm text-muted-foreground">
              Increase the number of intervals (n). More intervals mean narrower rectangles, which better approximate the curve. Doubling n roughly halves the error for left/right sums.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">When is a left sum an overestimate?</h3>
            <p className="text-sm text-muted-foreground">
              Left sums overestimate when the function is decreasing. Right sums overestimate when the function is increasing. For curves that change direction, the error depends on the specific interval.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the connection to integrals?</h3>
            <p className="text-sm text-muted-foreground">
              The definite integral is defined as the limit of Riemann sums as n approaches infinity. Riemann sums provide the conceptual foundation for integration.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/definite-integral-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Definite Integral</p>
            <p className="text-xs text-muted-foreground">Compute exact integrals</p>
          </a>
          <a href="/math-tools/area-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Area Calculator</p>
            <p className="text-xs text-muted-foreground">Geometric areas</p>
          </a>
          <a href="/math-tools/derivative-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Derivative Calculator</p>
            <p className="text-xs text-muted-foreground">Find derivatives</p>
          </a>
        </div>
      </section>
    </div>
  );
}
