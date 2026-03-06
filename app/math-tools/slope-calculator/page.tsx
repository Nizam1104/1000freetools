"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SlopeCalculator() {
  const [mode, setMode] = useState<"two-points" | "equation">("two-points");
  const [x1, setX1] = useState("");
  const [y1, setY1] = useState("");
  const [x2, setX2] = useState("");
  const [y2, setY2] = useState("");
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

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
        setError("Vertical line: slope is undefined (division by zero)");
        return;
      }

      const slope = (py2 - py1) / (px2 - px1);
      const yIntercept = py1 - slope * px1;
      const xIntercept = -yIntercept / slope;

      setResult({
        slope: Math.round(slope * 10000) / 10000,
        yIntercept: Math.round(yIntercept * 10000) / 10000,
        xIntercept: Math.round(xIntercept * 10000) / 10000,
        equation: `y = ${slope.toFixed(4)}x + ${yIntercept.toFixed(4)}`,
        steps: [
          `m = (y₂ - y₁) / (x₂ - x₁)`,
          `m = (${py2} - ${py1}) / (${px2} - ${px1})`,
          `m = ${py2 - py1} / ${px2 - px1}`,
          `m = ${slope.toFixed(6)}`,
          ``,
          `y-intercept: b = y₁ - mx₁ = ${py1} - ${slope.toFixed(4)}(${px1}) = ${yIntercept.toFixed(4)}`,
          `Equation: y = ${slope.toFixed(4)}x + ${yIntercept.toFixed(4)}`
        ]
      });
    } else {
      if (!equation.trim()) {
        setError("Please enter a linear equation");
        return;
      }

      const eq = equation.trim().toLowerCase().replace(/\s+/g, '');
      let slope = 0;
      let yIntercept = 0;

      const slopeInterceptMatch = eq.match(/^y=(-?\d*\.?\d*)?x([+-]\d*\.?\d*)?$/);
      if (slopeInterceptMatch) {
        slope = slopeInterceptMatch[1] ? parseFloat(slopeInterceptMatch[1]) : 1;
        yIntercept = slopeInterceptMatch[2] ? parseFloat(slopeInterceptMatch[2]) : 0;
      } else {
        const standardMatch = eq.match(/^(-?\d*\.?\d*)?x([+-]\d*\.?\d*)?y=(-?\d*\.?\d*)$/);
        if (standardMatch) {
          const a = standardMatch[1] ? parseFloat(standardMatch[1]) : 1;
          const bSign = standardMatch[2]?.startsWith('-') ? -1 : 1;
          const b = standardMatch[2] ? parseFloat(standardMatch[2].replace(/[+-]/, '')) : 1;
          const c = standardMatch[3] ? parseFloat(standardMatch[3]) : 0;
          slope = -a / (bSign * b);
          yIntercept = c / (bSign * b);
        } else {
          setError("Please enter equation in y = mx + b or Ax + By = C format");
          return;
        }
      }

      const xIntercept = -yIntercept / slope;

      setResult({
        slope: Math.round(slope * 10000) / 10000,
        yIntercept: Math.round(yIntercept * 10000) / 10000,
        xIntercept: Math.round(xIntercept * 10000) / 10000,
        equation: equation,
        steps: [
          `From equation: ${equation}`,
          `Slope (m) = ${slope.toFixed(4)}`,
          `y-intercept (b) = ${yIntercept.toFixed(4)}`,
          `x-intercept = -b/m = ${xIntercept.toFixed(4)}`
        ]
      });
    }
  };

  const reset = () => {
    setX1("");
    setY1("");
    setX2("");
    setY2("");
    setEquation("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Slope Calculator – Find the Slope of a Line Online</h1>
        <p className="text-muted-foreground">
          Calculate the slope or gradient of any line using two points or a linear equation with our free online slope calculator. Find slope, intercepts, and line equations easily.
        </p>
      </div>

      <div className="space-y-4">
        <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
          <TabsList>
            <TabsTrigger value="two-points">Two Points</TabsTrigger>
            <TabsTrigger value="equation">From Equation</TabsTrigger>
          </TabsList>

          <TabsContent value="two-points" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Point 1: (x₁, y₁)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="x₁"
                    value={x1}
                    onChange={(e) => setX1(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="y₁"
                    value={y1}
                    onChange={(e) => setY1(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>Point 2: (x₂, y₂)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="x₂"
                    value={x2}
                    onChange={(e) => setX2(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="y₂"
                    value={y2}
                    onChange={(e) => setY2(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="equation" className="space-y-4 mt-4">
            <div>
              <Label>Linear Equation</Label>
              <Input
                type="text"
                placeholder="e.g., y = 2x + 3 or 2x + 3y = 6"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Accepts slope-intercept form (y = mx + b) or standard form (Ax + By = C)
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Slope</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Slope (m)</p>
                <p className="text-2xl font-bold">{result.slope}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">y-intercept</p>
                <p className="text-2xl font-bold">(0, {result.yIntercept})</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">x-intercept</p>
                <p className="text-2xl font-bold">({result.xIntercept}, 0)</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Line Equation</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                {result.equation}
              </code>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Step-by-Step Solution</h4>
              <div className="space-y-2">
                {result.steps.map((step: string, index: number) => (
                  <code key={index} className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                    {step || '\u00A0'}
                  </code>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Slope</h2>
        <p className="text-muted-foreground">
          Slope measures the steepness and direction of a line. It tells you how much y changes for each unit increase in x. A positive slope rises from left to right; a negative slope falls.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Slope Formula (Two Points)</h3>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              m = (y₂ - y₁) / (x₂ - x₁)
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Rise over run: the change in y divided by the change in x.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Slope-Intercept Form</h3>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              y = mx + b
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              m is the slope, b is the y-intercept (where the line crosses the y-axis).
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Types of Slopes</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="w-16 h-16 mx-auto mb-2 border-2 border-border flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-12 h-12">
                <line x1="5" y1="35" x2="35" y2="5" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="font-semibold text-sm">Positive Slope</h3>
            <p className="text-xs text-muted-foreground">Line rises left to right (m &gt; 0)</p>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="w-16 h-16 mx-auto mb-2 border-2 border-border flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-12 h-12">
                <line x1="5" y1="5" x2="35" y2="35" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="font-semibold text-sm">Negative Slope</h3>
            <p className="text-xs text-muted-foreground">Line falls left to right (m &lt; 0)</p>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="w-16 h-16 mx-auto mb-2 border-2 border-border flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-12 h-12">
                <line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="font-semibold text-sm">Zero Slope</h3>
            <p className="text-xs text-muted-foreground">Horizontal line (m = 0)</p>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="w-16 h-16 mx-auto mb-2 border-2 border-border flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-12 h-12">
                <line x1="20" y1="5" x2="20" y2="35" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="font-semibold text-sm">Undefined Slope</h3>
            <p className="text-xs text-muted-foreground">Vertical line (division by zero)</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Slope Examples</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Example 1: Positive Slope</h3>
            <p className="text-sm text-muted-foreground mb-2">Points: (1, 2) and (4, 8)</p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              m = (8 - 2) / (4 - 1) = 6 / 3 = 2
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              For every 1 unit right, the line goes up 2 units.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Example 2: Negative Slope</h3>
            <p className="text-sm text-muted-foreground mb-2">Points: (0, 5) and (3, 2)</p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              m = (2 - 5) / (3 - 0) = -3 / 3 = -1
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              For every 1 unit right, the line goes down 1 unit.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Example 3: From Equation</h3>
            <p className="text-sm text-muted-foreground mb-2">Equation: 3x + 2y = 12</p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              2y = -3x + 12{'\n'}
              y = (-3/2)x + 6{'\n'}
              Slope = -1.5, y-intercept = 6
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What does slope represent?</h3>
          <p className="text-sm text-muted-foreground">
            Slope represents the rate of change. In real-world terms: speed (distance over time), grade of a road (rise over run), or cost per unit. A slope of 0.5 means y increases by 0.5 for every 1-unit increase in x.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can slope be a fraction?</h3>
          <p className="text-sm text-muted-foreground">
            Absolutely. Slopes like 1/2, -3/4, or 2/3 are common. A slope of 1/2 means the line rises 1 unit for every 2 units it runs horizontally.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's the difference between slope and gradient?</h3>
          <p className="text-sm text-muted-foreground">
            In basic algebra, they're the same thing. "Gradient" is more common in physics and multivariable calculus, where it can refer to a vector of partial derivatives.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How do I find slope from a graph?</h3>
          <p className="text-sm text-muted-foreground">
            Pick any two points on the line. Count the vertical change (rise) and horizontal change (run) between them. Slope = rise / run. You can use a slope triangle to visualize this.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Why is the slope of a vertical line undefined?</h3>
          <p className="text-sm text-muted-foreground">
            Vertical lines have the same x-coordinate for all points. Using the slope formula gives you division by zero (x₂ - x₁ = 0), which is undefined in mathematics.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/distance-between-two-points-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Distance Calculator</p>
            <p className="text-xs text-muted-foreground">Distance between points</p>
          </a>
          <a href="/math-tools/midpoint-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Midpoint Calculator</p>
            <p className="text-xs text-muted-foreground">Find midpoint</p>
          </a>
          <a href="/math-tools/linear-equation-solver" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Linear Equation Solver</p>
            <p className="text-xs text-muted-foreground">Solve for x</p>
          </a>
        </div>
      </section>
    </div>
  );
}
