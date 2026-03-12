"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GradientSlopeCalculator() {
  const [mode, setMode] = useState<"two-points" | "function" | "implicit">("two-points");
  const [x1, setX1] = useState("");
  const [y1, setY1] = useState("");
  const [x2, setX2] = useState("");
  const [y2, setY2] = useState("");
  const [functionStr, setFunctionStr] = useState("x^2");
  const [pointX, setPointX] = useState("2");
  const [result, setResult] = useState<any>(null);
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

  const numericalDerivative = (expr: string, x: number, h: number = 0.0001): number | null => {
    const y1 = evaluateFunction(expr, x - h);
    const y2 = evaluateFunction(expr, x + h);
    if (y1 === null || y2 === null) return null;
    return (y2 - y1) / (2 * h);
  };

  const calculate = () => {
    setError("");
    setResult(null);

    if (mode === "two-points") {
      const px1 = parseFloat(x1);
      const py1 = parseFloat(y1);
      const px2 = parseFloat(x2);
      const py2 = parseFloat(y2);

      if ([px1, py1, px2, py2].some(isNaN)) {
        setError("Please enter all four coordinates");
        return;
      }

      if (px1 === px2) {
        setError("Vertical line: gradient is undefined (division by zero)");
        return;
      }

      const dx = px2 - px1;
      const dy = py2 - py1;
      const gradient = dy / dx;
      const angle = Math.atan(gradient) * 180 / Math.PI;

      setResult({
        gradient: Math.round(gradient * 10000) / 10000,
        dx,
        dy,
        angle: Math.round(angle * 100) / 100,
        steps: [
          `Points: (${px1}, ${py1}) and (${px2}, ${py2})`,
          `Gradient formula: m = (y₂ - y₁) / (x₂ - x₁)`,
          `m = (${py2} - ${py1}) / (${px2} - ${px1})`,
          `m = ${dy} / ${dx}`,
          `m = ${gradient.toFixed(6)}`,
          `Angle with x-axis: ${angle.toFixed(2)}°`
        ]
      });
    } else if (mode === "function") {
      const x = parseFloat(pointX);
      if (isNaN(x)) {
        setError("Please enter a valid x-value");
        return;
      }

      const y = evaluateFunction(functionStr, x);
      if (y === null) {
        setError("Could not evaluate function at this point");
        return;
      }

      const gradient = numericalDerivative(functionStr, x);
      if (gradient === null) {
        setError("Could not calculate derivative");
        return;
      }

      const angle = Math.atan(gradient) * 180 / Math.PI;
      const yIntercept = y - gradient * x;

      setResult({
        point: { x, y },
        gradient: Math.round(gradient * 10000) / 10000,
        angle: Math.round(angle * 100) / 100,
        tangentEquation: `y = ${gradient.toFixed(4)}x + ${yIntercept.toFixed(4)}`,
        steps: [
          `Function: f(x) = ${functionStr}`,
          `Point: x = ${x}`,
          `f(${x}) = ${y.toFixed(6)}`,
          `Using numerical differentiation (central difference)`,
          `f'(x) ≈ [f(x+h) - f(x-h)] / (2h) where h = 0.0001`,
          `Gradient at x=${x}: ${gradient.toFixed(6)}`,
          `Tangent line: y - ${y.toFixed(4)} = ${gradient.toFixed(4)}(x - ${x})`,
          `Tangent equation: y = ${gradient.toFixed(4)}x + ${yIntercept.toFixed(4)}`
        ]
      });
    }

    setError("");
  };

  const reset = () => {
    setX1("");
    setY1("");
    setX2("");
    setY2("");
    setFunctionStr("x^2");
    setPointX("2");
    setResult(null);
    setError("");
  };

  const loadExample = (m: "two-points" | "function", data: any) => {
    setMode(m);
    if (m === "two-points") {
      setX1(data.x1);
      setY1(data.y1);
      setX2(data.x2);
      setY2(data.y2);
    } else {
      setFunctionStr(data.fn);
      setPointX(data.x);
    }
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Gradient/Slope Calculator – Find Gradient at a Point</h1>
        <p className="text-muted-foreground">
          Calculate the gradient or slope of a line or curve with our free online calculator. Find gradients from two points or as the derivative of a function at any point.
        </p>
      </div>

      <div className="space-y-4">
        <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
          <TabsList>
            <TabsTrigger value="two-points">Two Points</TabsTrigger>
            <TabsTrigger value="function">Function Derivative</TabsTrigger>
          </TabsList>

          <TabsContent value="two-points" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Point 1: (x₁, y₁)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" placeholder="x₁" value={x1} onChange={(e) => setX1(e.target.value)} />
                  <Input type="number" placeholder="y₁" value={y1} onChange={(e) => setY1(e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Point 2: (x₂, y₂)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" placeholder="x₂" value={x2} onChange={(e) => setX2(e.target.value)} />
                  <Input type="number" placeholder="y₂" value={y2} onChange={(e) => setY2(e.target.value)} />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="function" className="space-y-4 mt-4">
            <div>
              <Label>Function f(x)</Label>
              <Input
                placeholder="e.g., x^2, sin(x), x^3 - 2x"
                value={functionStr}
                onChange={(e) => setFunctionStr(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Supports: +, -, *, /, ^, sin, cos, tan, sqrt, log, ln, abs, exp
              </p>
            </div>
            <div>
              <Label>x-value to evaluate</Label>
              <Input
                type="number"
                placeholder="2"
                value={pointX}
                onChange={(e) => setPointX(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate Gradient</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("two-points", { x1: "1", y1: "2", x2: "4", y2: "8" })}>(1,2) to (4,8)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("two-points", { x1: "-3", y1: "5", x2: "2", y2: "-1" })}>(-3,5) to (2,-1)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("function", { fn: "x^2", x: "2" })}>x² at x=2</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("function", { fn: "x^3 - 2x", x: "1" })}>x³-2x at x=1</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("function", { fn: "sin(x)", x: "0" })}>sin(x) at x=0</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("function", { fn: "sqrt(x)", x: "4" })}>√x at x=4</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Gradient (m)</p>
                <p className="text-2xl font-bold">{result.gradient}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Angle</p>
                <p className="text-2xl font-bold">{result.angle}°</p>
              </div>
              {result.dx !== undefined && (
                <>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Δx (run)</p>
                    <p className="text-2xl font-bold">{result.dx}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Δy (rise)</p>
                    <p className="text-2xl font-bold">{result.dy}</p>
                  </div>
                </>
              )}
              {result.point && (
                <>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Point</p>
                    <p className="text-lg font-bold">({result.point.x}, {result.point.y})</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Steepness</p>
                    <p className="text-lg font-bold">
                      {Math.abs(result.gradient) < 0.5 ? 'Gentle' : Math.abs(result.gradient) < 2 ? 'Moderate' : 'Steep'}
                    </p>
                  </div>
                </>
              )}
            </div>

            {result.tangentEquation && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Tangent Line Equation</h4>
                <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                  {result.tangentEquation}
                </code>
              </div>
            )}

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                {result.steps.map((step: string, i: number) => (
                  <div key={i}>{step}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Gradient and Slope</h2>
        <p className="text-muted-foreground">
          Gradient (or slope) measures how steep a line or curve is. For a straight line, it's the ratio of vertical change (rise) to horizontal change (run). For a curve, the gradient at a point is the slope of the tangent line – the line that just touches the curve at that point.
        </p>
        <p className="text-muted-foreground">
          Positive gradient means the line goes uphill (left to right). Negative gradient means downhill. Zero gradient is horizontal. Undefined gradient (division by zero) is a vertical line.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Calculate Gradient</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-3">From Two Points</h4>
            <div className="font-mono text-center p-3 bg-background rounded mb-3">
              m = (y₂ - y₁) / (x₂ - x₁)
            </div>
            <ol className="space-y-2 text-sm">
              <li>Find the difference in y-values (rise)</li>
              <li>Find the difference in x-values (run)</li>
              <li>Divide rise by run</li>
            </ol>
          </div>

          <div className="p-6 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-3">From a Function</h4>
            <div className="font-mono text-center p-3 bg-background rounded mb-3">
              m = f'(x) = dy/dx
            </div>
            <ol className="space-y-2 text-sm">
              <li>Find the derivative of the function</li>
              <li>Evaluate at the given x-value</li>
              <li>This gives the instantaneous rate of change</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Gradient from Two Points</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Points: (1, 2) and (4, 8)</div>
              <div>Rise = 8 - 2 = 6</div>
              <div>Run = 4 - 1 = 3</div>
              <div>Gradient = 6 / 3 = 2</div>
              <div className="text-muted-foreground mt-2">For every 1 unit right, go up 2 units</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Negative Gradient</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Points: (-3, 5) and (2, -1)</div>
              <div>Rise = -1 - 5 = -6</div>
              <div>Run = 2 - (-3) = 5</div>
              <div>Gradient = -6 / 5 = -1.2</div>
              <div className="text-muted-foreground mt-2">Negative slope: line goes downhill</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Gradient of y = x² at x = 2</h4>
            <div className="font-mono text-sm space-y-2">
              <div>f(x) = x²</div>
              <div>f'(x) = 2x (derivative)</div>
              <div>f'(2) = 2(2) = 4</div>
              <div>Point: (2, 4) since f(2) = 4</div>
              <div>Tangent: y - 4 = 4(x - 2)</div>
              <div>Tangent equation: y = 4x - 4</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Gradient of sin(x) at x = 0</h4>
            <div className="font-mono text-sm space-y-2">
              <div>f(x) = sin(x)</div>
              <div>f'(x) = cos(x)</div>
              <div>f'(0) = cos(0) = 1</div>
              <div className="text-muted-foreground mt-2">At x=0, sine curve has gradient 1 (45° angle)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            The concept of gradient as "rise over run" dates back to ancient builders and surveyors. However, the mathematical formalization of finding gradients of curves (calculus) was independently developed by Newton and Leibniz in the 1670s, revolutionizing mathematics and science.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What does a gradient of 0 mean?</h4>
            <p className="text-sm text-muted-foreground">
              Zero gradient means a horizontal line – no rise, only run. The y-value stays constant. For curves, zero gradient indicates a maximum, minimum, or inflection point.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is an undefined gradient?</h4>
            <p className="text-sm text-muted-foreground">
              Undefined gradient occurs with vertical lines where x₁ = x₂, causing division by zero. The line goes straight up and down – infinite steepness.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How does gradient relate to angle?</h4>
            <p className="text-sm text-muted-foreground">
              Angle = arctan(gradient). A gradient of 1 gives 45°. Gradient of 0 gives 0°. As gradient approaches infinity, angle approaches 90°.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between gradient and slope?</h4>
            <p className="text-sm text-muted-foreground">
              They're the same thing! "Slope" is more common in American English, "gradient" in British English. In multivariable calculus, gradient has a more specific meaning (a vector of partial derivatives).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is gradient used in real life?</h4>
            <p className="text-sm text-muted-foreground">
              Road signs show gradient as percentages (10% grade = 0.1 gradient). Roof pitch, wheelchair ramp requirements, and ski slope difficulty all use gradient. In economics, gradient represents marginal rates.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can gradient be greater than 1?</h4>
            <p className="text-sm text-muted-foreground">
              Absolutely! A gradient of 2 means rising 2 units for every 1 unit across. Steep hills, roller coasters, and rocket trajectories can have gradients much greater than 1.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
