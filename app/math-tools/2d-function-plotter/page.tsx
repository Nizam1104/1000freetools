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
  const [points, setPoints] = useState<{ x: number; y: number; xNorm: number; yNorm: number }[]>([]);
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

    const plotPoints: { x: number; y: number; xNorm: number; yNorm: number }[] = [];
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
    <div className="w-full mx-auto space-y-8">
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Graph Any Mathematical Function in 2D</h2>
        <p className="text-muted-foreground">
          This 2D function plotter lets you visualize any mathematical function y = f(x) instantly. Type in your function, set the x and y range, and see the graph appear. No sign-up, no installation — it runs entirely in your browser.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">How to Plot a Function</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Enter your function in the f(x) field using standard math notation. The plotter understands powers (x^2, x^3), trig functions (sin, cos, tan), logarithms (log for base-10, ln for natural log), square roots (sqrt), and constants like pi and e.
          </p>
          <p className="text-muted-foreground">
            Adjust the viewing window by setting X Min, X Max, Y Min, and Y Max. The default range of -10 to 10 works for many functions, but you will want to zoom in or out depending on what you are studying.
          </p>
          <p className="text-muted-foreground">
            Click "Plot Function" and the graph appears below. The x-axis runs horizontally, the y-axis vertically. Where the curve crosses the x-axis, y = 0 — these are the roots or x-intercepts of your function.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Supported Functions and Syntax</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Basic Operations</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><code className="bg-muted px-1">+</code> Addition</li>
              <li><code className="bg-muted px-1">-</code> Subtraction</li>
              <li><code className="bg-muted px-1">*</code> Multiplication</li>
              <li><code className="bg-muted px-1">/</code> Division</li>
              <li><code className="bg-muted px-1">^</code> Power (x^2 means x²)</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Trigonometric Functions</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><code className="bg-muted px-1">sin(x)</code> Sine (x in radians)</li>
              <li><code className="bg-muted px-1">cos(x)</code> Cosine</li>
              <li><code className="bg-muted px-1">tan(x)</code> Tangent</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Logarithmic &amp; Exponential</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><code className="bg-muted px-1">log(x)</code> Base-10 logarithm</li>
              <li><code className="bg-muted px-1">ln(x)</code> Natural logarithm (base e)</li>
              <li><code className="bg-muted px-1">exp(x)</code> e^x</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Other Functions</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><code className="bg-muted px-1">sqrt(x)</code> Square root</li>
              <li><code className="bg-muted px-1">abs(x)</code> Absolute value</li>
              <li><code className="bg-muted px-1">pi</code> π ≈ 3.14159</li>
              <li><code className="bg-muted px-1">e</code> Euler's number ≈ 2.71828</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Example Functions to Try</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Quadratic: x^2</h3>
            <p className="text-sm text-muted-foreground">
              The classic parabola. Opens upward, vertex at origin. Try x^2 - 4 to see it shift down, or (x-2)^2 to shift right.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Cubic: x^3 - 3*x</h3>
            <p className="text-sm text-muted-foreground">
              An S-shaped curve with two turning points. This specific cubic has local max and min — good for studying calculus.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Sine Wave: sin(x)</h3>
            <p className="text-sm text-muted-foreground">
              The fundamental periodic function. Try 2*sin(x) for double amplitude, or sin(2*x) for double frequency.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Exponential: exp(x)</h3>
            <p className="text-sm text-muted-foreground">
              Rapid growth curve. Compare with exp(-x) for exponential decay. Both appear in physics and finance.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Square Root: sqrt(x)</h3>
            <p className="text-sm text-muted-foreground">
              Defined only for x ≥ 0. The curve starts at origin and grows slower as x increases.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Rational: 1/x</h3>
            <p className="text-sm text-muted-foreground">
              Hyperbola with two branches. Has vertical asymptote at x=0 and horizontal asymptote at y=0.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Function Graphs</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            A function graph shows the relationship between input (x) and output (y). Each point on the curve represents one input-output pair. If you pick any x-value and draw a vertical line, it hits the curve at exactly one point — that is what makes it a function.
          </p>
          <p className="text-muted-foreground">
            The shape of the graph tells you about the function's behavior. Where the curve goes up as you move right, the function is increasing. Where it goes down, the function is decreasing. Flat spots (horizontal tangents) often mark maximum or minimum values.
          </p>
          <p className="text-muted-foreground">
            Intercepts matter. The y-intercept (where x=0) shows the starting value. X-intercepts (where y=0) are the function's roots — solutions to f(x) = 0. These points have practical meaning in physics, economics, and engineering problems.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Quick Fact: The Language of Functions</h2>
        <p className="text-muted-foreground">
          The term "function" was coined by German mathematician Gottfried Wilhelm Leibniz in 1694, from the Latin "functio" meaning "performance" or "execution." Swiss mathematician Leonhard Euler introduced the notation f(x) in 1734, which we still use today. Euler also popularized using letters like f, g, h for functions and x, y, z for variables. Before this standardization, mathematicians described relationships in verbose prose — imagine writing "the square of the number" every time instead of just x².
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-2">What types of functions can this plotter graph?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles most single-variable functions you encounter in high school and early college math: polynomials, rational functions, trigonometric functions, exponential and logarithmic functions, and combinations of these. It plots any function y = f(x) where f can be evaluated numerically.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Why does my graph look choppy or disconnected?</h3>
            <p className="text-sm text-muted-foreground">
              Some functions have discontinuities or vertical asymptotes (like 1/x at x=0). The plotter samples 200 points across your range — if the function shoots to infinity between samples, you will see gaps. Try narrowing the x-range around the problem area for a clearer view.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Can I plot multiple functions on the same graph?</h3>
            <p className="text-sm text-muted-foreground">
              This version plots one function at a time. To compare functions, plot the first one, note key points, then enter the second function. For serious multi-function work, tools like Desmos or GeoGebra offer that capability.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What should I do if the graph doesn't appear?</h3>
            <p className="text-sm text-muted-foreground">
              First, check that your function uses valid syntax — use * for multiplication (write 2*x, not 2x). Second, adjust your viewing window. If you plot x^2 with Y Max = 5, nothing shows because x^2 exceeds 5 for most x values. Try Y Max = 100 instead.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Does this work for parametric or polar equations?</h3>
            <p className="text-sm text-muted-foreground">
              No, this plotter only handles standard Cartesian functions y = f(x). Parametric equations (x(t), y(t)) and polar equations (r = f(θ)) require different plotting logic. Those are available in specialized graphing tools.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How accurate is the plotted curve?</h3>
            <p className="text-sm text-muted-foreground">
              The plotter evaluates your function at 200 evenly-spaced x-values and connects the points with straight lines. For smooth functions like polynomials, the result is visually indistinguishable from the true curve. For rapidly oscillating functions, increase detail by zooming in on a smaller range.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Can I use this on my phone or tablet?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the plotter runs in any modern browser on any device. The graph scales to fit your screen. Touch devices work fine — just tap the input fields and use the on-screen keyboard.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
