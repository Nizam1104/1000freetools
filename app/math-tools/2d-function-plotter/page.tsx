"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FunctionPlotter() {
  const [expression, setExpression] = useState("x^2");
  const [xMin, setXMin] = useState("-10");
  const [xMax, setXMax] = useState("10");
  const [yMin, setYMin] = useState("-10");
  const [yMax, setYMax] = useState("10");
  const [points, setPoints] = useState<{x: number; y: number; xNorm: number; yNorm: number}[]>([]);
  const [error, setError] = useState("");

  const evaluateFunction = (expr: string, x: number): number | null => {
    try {
      const cleanExpr = expr
        .replace(/\^/g, "**")
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/sqrt/g, "Math.sqrt")
        .replace(/log/g, "Math.log10")
        .replace(/ln/g, "Math.log")
        .replace(/abs/g, "Math.abs")
        .replace(/exp/g, "Math.exp")
        .replace(/pi/g, "Math.PI")
        .replace(/e(?![xp])/g, "Math.E");
      
      const func = new Function("x", `return ${cleanExpr}`);
      const result = func(x);
      return isFinite(result) ? result : null;
    } catch {
      return null;
    }
  };

  const plot = () => {
    setError("");
    setPoints([]);

    const xmin = parseFloat(xMin);
    const xmax = parseFloat(xMax);
    const ymin = parseFloat(yMin);
    const ymax = parseFloat(yMax);

    if ([xmin, xmax, ymin, ymax].some(isNaN)) {
      setError("Please enter valid range values");
      return;
    }

    if (xmin >= xmax || ymin >= ymax) {
      setError("Min values must be less than max values");
      return;
    }

    const plotPoints: {x: number; y: number; xNorm: number; yNorm: number}[] = [];
    const numPoints = 200;
    const step = (xmax - xmin) / numPoints;

    for (let i = 0; i <= numPoints; i++) {
      const x = xmin + i * step;
      const y = evaluateFunction(expression, x);
      
      if (y !== null && isFinite(y)) {
        const xNorm = ((x - xmin) / (xmax - xmin)) * 80 + 10;
        const yNorm = 90 - ((y - ymin) / (ymax - ymin)) * 70 - 10;
        
        if (yNorm >= 0 && yNorm <= 100) {
          plotPoints.push({ x, y, xNorm, yNorm });
        }
      }
    }

    if (plotPoints.length < 2) {
      setError("Function could not be plotted in the given range. Try adjusting the range.");
      return;
    }

    setPoints(plotPoints);
  };

  const reset = () => {
    setExpression("x^2");
    setXMin("-10");
    setXMax("10");
    setYMin("-10");
    setYMax("10");
    setPoints([]);
    setError("");
  };

  const loadExample = (expr: string) => {
    setExpression(expr);
    setPoints([]);
    setError("");
  };

  const pathD = points.length > 0 ? points.map((p, i) => 
    `${i === 0 ? "M" : "L"} ${p.xNorm} ${p.yNorm}`
  ).join(" ") : "";

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">2D Function Plotter – Graph Functions Online Free</h1>
        <p className="text-muted-foreground">
          Plot any mathematical function y = f(x) with our free online 2D function plotter. Visualize equations, explore graphs, and understand function behavior instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="expression">Function f(x) =</Label>
          <Input
            id="expression"
            placeholder="e.g., x^2, sin(x), x^3 - 2x + 1"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Supports: +, -, *, /, ^ (power), sin, cos, tan, sqrt, log, ln, abs, exp, pi, e
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label>X Min</Label>
            <Input type="number" value={xMin} onChange={(e) => setXMin(e.target.value)} />
          </div>
          <div>
            <Label>X Max</Label>
            <Input type="number" value={xMax} onChange={(e) => setXMax(e.target.value)} />
          </div>
          <div>
            <Label>Y Min</Label>
            <Input type="number" value={yMin} onChange={(e) => setYMin(e.target.value)} />
          </div>
          <div>
            <Label>Y Max</Label>
            <Input type="number" value={yMax} onChange={(e) => setYMax(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={plot}>Plot Function</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("x^2")}>x²</Button>
          <Button variant="outline" onClick={() => loadExample("sin(x)")}>sin(x)</Button>
          <Button variant="outline" onClick={() => loadExample("x^3 - 3*x")}>x³ - 3x</Button>
          <Button variant="outline" onClick={() => loadExample("sqrt(x)")}>√x</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {points.length > 0 && (
          <div className="p-6 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-4">Function Graph: y = {expression}</h4>
            <div className="relative w-full aspect-video border-2 border-border bg-background">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((pos) => (
                  <g key={pos}>
                    <line x1={pos} y1="0" x2={pos} y2="100" stroke="currentColor" strokeWidth="0.3" className="text-muted" strokeDasharray="1,1" />
                    <line x1="0" y1={pos} x2="100" y2={pos} stroke="currentColor" strokeWidth="0.3" className="text-muted" strokeDasharray="1,1" />
                  </g>
                ))}
                
                {/* Axes */}
                <line x1="10" y1="90" x2="95" y2="90" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
                <line x1="10" y1="10" x2="10" y2="95" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
                
                {/* Zero lines if in range */}
                {parseFloat(yMin) < 0 && parseFloat(yMax) > 0 && (
                  <line 
                    x1="10" 
                    y1={90 - ((0 - parseFloat(yMin)) / (parseFloat(yMax) - parseFloat(yMin))) * 70 - 10}
                    x2="95" 
                    y2={90 - ((0 - parseFloat(yMin)) / (parseFloat(yMax) - parseFloat(yMin))) * 70 - 10}
                    stroke="currentColor" 
                    strokeWidth="0.5" 
                    className="text-muted"
                    strokeDasharray="2,2"
                  />
                )}
                {parseFloat(xMin) < 0 && parseFloat(xMax) > 0 && (
                  <line 
                    x1={10 + ((0 - parseFloat(xMin)) / (parseFloat(xMax) - parseFloat(xMin))) * 80}
                    y1="10"
                    x2={10 + ((0 - parseFloat(xMin)) / (parseFloat(xMax) - parseFloat(xMin))) * 80}
                    y2="90"
                    stroke="currentColor" 
                    strokeWidth="0.5" 
                    className="text-muted"
                    strokeDasharray="2,2"
                  />
                )}
                
                {/* Function path */}
                <path d={pathD} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                
                {/* Labels */}
                <text x="95" y="88" textAnchor="end" className="text-xs fill-muted-foreground">x</text>
                <text x="12" y="14" textAnchor="start" className="text-xs fill-muted-foreground">y</text>
              </svg>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                X: {xMin} to {xMax}
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground origin-center">
                Y: {yMin} to {yMax}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Function Graphs</h2>
        <p className="text-muted-foreground">
          A function graph is a visual representation of all points (x, y) where y equals the function value f(x). Graphing functions helps you understand their behavior, find roots, identify maximum and minimum values, and analyze trends.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Linear Functions</h3>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">y = mx + b</code>
            <p className="text-xs text-muted-foreground mt-2">
              Straight lines with constant slope. Example: y = 2x + 1
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Quadratic Functions</h3>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">y = ax² + bx + c</code>
            <p className="text-xs text-muted-foreground mt-2">
              Parabolic curves. Example: y = x² - 4
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Trigonometric Functions</h3>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">y = sin(x), cos(x)</code>
            <p className="text-xs text-muted-foreground mt-2">
              Periodic wave patterns. Example: y = sin(x)
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What functions can I plot?</h3>
          <p className="text-sm text-muted-foreground">
            You can plot any function that can be expressed as y = f(x), including polynomials, trigonometric functions, exponential functions, logarithms, and combinations thereof.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How do I enter powers?</h3>
          <p className="text-sm text-muted-foreground">
            Use the caret symbol (^) for exponents. For example, x squared is x^2, and x cubed is x^3.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What if my function has asymptotes?</h3>
          <p className="text-sm text-muted-foreground">
            Functions with vertical asymptotes (like 1/x) may show gaps in the graph. Adjust the range to avoid plotting directly at the asymptote.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can I plot multiple functions?</h3>
          <p className="text-sm text-muted-foreground">
            This tool plots one function at a time. To compare functions, plot them separately and observe the differences in shape and position.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How accurate is the plot?</h3>
          <p className="text-sm text-muted-foreground">
            The plot uses 200 sample points across the range. For most functions, this provides a smooth and accurate representation.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/derivative-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Derivative Calculator</p>
            <p className="text-xs text-muted-foreground">Find derivatives</p>
          </a>
          <a href="/math-tools/coordinate-plane-plotter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Coordinate Plane Plotter</p>
            <p className="text-xs text-muted-foreground">Plot points</p>
          </a>
          <a href="/math-tools/slope-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Slope Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate slope</p>
          </a>
        </div>
      </section>
    </div>
  );
}
