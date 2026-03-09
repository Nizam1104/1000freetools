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

  const loadExample = (
    mode: "two-points" | "equation",
    vals: { x1?: string; y1?: string; x2?: string; y2?: string; eq?: string }
  ) => {
    setMode(mode);
    if (vals.x1) setX1(vals.x1);
    if (vals.y1) setY1(vals.y1);
    if (vals.x2) setX2(vals.x2);
    if (vals.y2) setY2(vals.y2);
    if (vals.eq) setEquation(vals.eq);
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

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("two-points", { x1: "1", y1: "2", x2: "4", y2: "8" })}>(1,2) to (4,8)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("two-points", { x1: "-3", y1: "5", x2: "2", y2: "-1" })}>(-3,5) to (2,-1)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("two-points", { x1: "0", y1: "0", x2: "5", y2: "3" })}>(0,0) to (5,3)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("equation", { eq: "y = 3x + 2" })}>y = 3x + 2</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("equation", { eq: "y = -2x + 5" })}>y = -2x + 5</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("equation", { eq: "2x + 3y = 12" })}>2x + 3y = 12</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("two-points", { x1: "1.5", y1: "2.5", x2: "4.5", y2: "7.5" })}>(1.5,2.5) to (4.5,7.5)</Button>
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

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Understanding Slope</h2>
          <p className="text-muted-foreground">
            Slope measures how steep a line is. It tells you how much the line rises (or falls) for every unit it moves horizontally. A positive slope goes uphill from left to right. A negative slope goes downhill. A slope of zero is perfectly flat (horizontal). And a vertical line? Its slope is undefined – you'd be dividing by zero.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Think of slope as "rise over run." If you're walking up a ramp that rises 1 foot for every 10 feet forward, the slope is 1/10 = 0.1. Steeper ramps have higher slopes. This concept shows up everywhere – roof pitches, road grades, wheelchair ramp requirements, and even in economics when analyzing supply and demand curves.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Slope Formula</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-lg font-mono text-center mb-4">m = (y₂ - y₁) / (x₂ - x₁)</p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-1">What it means:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><strong>m</strong> = slope (gradient)</li>
                <li><strong>(x₁, y₁)</strong> = first point</li>
                <li><strong>(x₂, y₂)</strong> = second point</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-1">Slope-Intercept Form:</p>
              <p className="text-muted-foreground font-mono">y = mx + b</p>
              <p className="text-muted-foreground mt-2">Where b is the y-intercept</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Positive slope</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Find the slope through points (1, 2) and (4, 8)
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: m = (8 - 2) / (4 - 1) = 6 / 3 = 2
            </p>
            <p className="text-sm text-muted-foreground">
              The line rises 2 units for every 1 unit it moves right.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Negative slope</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Find the slope through points (-3, 5) and (2, -1)
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: m = (-1 - 5) / (2 - (-3)) = -6 / 5 = -1.2
            </p>
            <p className="text-sm text-muted-foreground">
              The line falls 1.2 units for every 1 unit it moves right.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Zero slope (horizontal line)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Find the slope through points (1, 4) and (7, 4)
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: m = (4 - 4) / (7 - 1) = 0 / 6 = 0
            </p>
            <p className="text-sm text-muted-foreground">
              Horizontal lines have zero slope – no rise, only run.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: From equation y = -3x + 7</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Identify the slope from y = -3x + 7
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: In y = mx + b form, m = -3
            </p>
            <p className="text-sm text-muted-foreground">
              The slope is -3, and the y-intercept is (0, 7).
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: From standard form 2x + 3y = 12</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Find the slope from 2x + 3y = 12
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Convert to slope-intercept form:
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              3y = -2x + 12 → y = (-2/3)x + 4
            </p>
            <p className="text-sm text-muted-foreground">
              The slope is -2/3 ≈ -0.667
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm">
            The concept of slope dates back to ancient Greece. Archimedes (287-212 BCE) used early forms of slope in his work on levers and inclined planes. The modern notation "m" for slope first appeared in the mid-1800s, though mathematicians still debate why "m" was chosen. Some say it stands for "modulus of slope," others suggest it comes from the French "monter" (to climb).
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Interpreting Slope Values</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Positive Slope (m &gt; 0)</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Line rises from left to right</li>
              <li>• As x increases, y increases</li>
              <li>• Example: m = 2 means rise 2, run 1</li>
              <li>• Real-world: climbing a hill, increasing profits</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Negative Slope (m &lt; 0)</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Line falls from left to right</li>
              <li>• As x increases, y decreases</li>
              <li>• Example: m = -3 means fall 3, run 1</li>
              <li>• Real-world: descending stairs, depreciation</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Zero Slope (m = 0)</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Horizontal line</li>
              <li>• y stays constant regardless of x</li>
              <li>• Equation: y = b (no x term)</li>
              <li>• Real-world: flat ground, constant temperature</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Undefined Slope</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Vertical line</li>
              <li>• Division by zero (x₂ - x₁ = 0)</li>
              <li>• Equation: x = a (no y term)</li>
              <li>• Real-world: a wall, elevator shaft</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What does a slope of 1/2 mean?</h4>
            <p className="text-sm text-muted-foreground">
              A slope of 1/2 means the line rises 1 unit for every 2 units it moves right. It's a gentle incline – less steep than a 45° angle (which would be slope = 1). In percentage terms, that's a 50% grade.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can slope be a decimal or fraction?</h4>
            <p className="text-sm text-muted-foreground">
              Absolutely. Slopes are often fractions (like 3/4) or decimals (like 0.75). Both represent the same thing: rise over run. A slope of 0.75 means the line rises 0.75 units for every 1 unit forward.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is slope related to angle?</h4>
            <p className="text-sm text-muted-foreground">
              Slope equals the tangent of the angle the line makes with the horizontal. If a line makes a 30° angle, its slope is tan(30°) ≈ 0.577. A 45° angle gives slope = 1. A 60° angle gives slope ≈ 1.732.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between slope and gradient?</h4>
            <p className="text-sm text-muted-foreground">
              In basic algebra, they're the same thing. "Gradient" is more common in physics and engineering, while "slope" is standard in math class. In advanced calculus, gradient refers to a vector of partial derivatives, but that's beyond basic line slope.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I find slope from a graph?</h4>
            <p className="text-sm text-muted-foreground">
              Pick any two points on the line. Count the vertical change (rise) and horizontal change (run) between them. Slope = rise/run. You can use grid squares if the graph has them. The slope is the same no matter which two points you pick on a straight line.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is vertical slope undefined?</h4>
            <p className="text-sm text-muted-foreground">
              For a vertical line, x doesn't change, so x₂ - x₁ = 0. The slope formula becomes (y₂ - y₁) / 0, and division by zero is undefined in mathematics. You can think of it as "infinitely steep" – the line goes straight up with no horizontal movement.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/distance-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Distance Calculator</p>
            <p className="text-xs text-muted-foreground">Distance between points</p>
          </a>
          <a href="/math-tools/midpoint-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Midpoint Calculator</p>
            <p className="text-xs text-muted-foreground">Find midpoints</p>
          </a>
          <a href="/math-tools/line-equation-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Line Equation Calculator</p>
            <p className="text-xs text-muted-foreground">Find line equations</p>
          </a>
        </div>
      </section>
    </div>
  );
}
