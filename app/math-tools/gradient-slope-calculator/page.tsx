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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
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

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Gradient</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
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

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
