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
      </section>
    </div>
  );
}
