"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function QuadraticEquationSolver() {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [c, setC] = useState<string>("");
  const [result, setResult] = useState<{
    x1: number | string;
    x2: number | string;
    discriminant: number;
    nature: string;
    vertex: { x: number; y: number };
  } | null>(null);

  const calculate = () => {
    const aVal = parseFloat(a);
    const bVal = parseFloat(b);
    const cVal = parseFloat(c);
    
    if (!isNaN(aVal) && !isNaN(bVal) && !isNaN(cVal) && aVal !== 0) {
      const discriminant = bVal * bVal - 4 * aVal * cVal;
      const vertexX = -bVal / (2 * aVal);
      const vertexY = aVal * vertexX * vertexX + bVal * vertexX + cVal;
      
      let x1: number | string;
      let x2: number | string;
      let nature: string;
      
      if (discriminant > 0) {
        x1 = (-bVal + Math.sqrt(discriminant)) / (2 * aVal);
        x2 = (-bVal - Math.sqrt(discriminant)) / (2 * aVal);
        nature = "Two distinct real roots";
      } else if (discriminant === 0) {
        x1 = x2 = -bVal / (2 * aVal);
        nature = "One repeated real root";
      } else {
        const realPart = -bVal / (2 * aVal);
        const imagPart = Math.sqrt(-discriminant) / (2 * aVal);
        x1 = `${realPart.toFixed(4)} + ${Math.abs(imagPart).toFixed(4)}i`;
        x2 = `${realPart.toFixed(4)} - ${Math.abs(imagPart).toFixed(4)}i`;
        nature = "Two complex conjugate roots";
      }
      
      setResult({ x1, x2, discriminant, nature, vertex: { x: vertexX, y: vertexY } });
    }
  };

  const reset = () => {
    setA("");
    setB("");
    setC("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-md text-center font-mono">
              ax² + bx + c = 0
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">a</label>
                <Input
                  type="number"
                  placeholder="e.g., 1"
                  step="any"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">b</label>
                <Input
                  type="number"
                  placeholder="e.g., -5"
                  step="any"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">c</label>
                <Input
                  type="number"
                  placeholder="e.g., 6"
                  step="any"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Solve</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Root x₁</p>
                    <p className="text-xl font-semibold">{typeof result.x1 === 'number' ? result.x1.toFixed(4) : result.x1}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Root x₂</p>
                    <p className="text-xl font-semibold">{typeof result.x2 === 'number' ? result.x2.toFixed(4) : result.x2}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Discriminant (Δ)</p>
                    <p className="text-lg">{result.discriminant}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nature</p>
                    <p className="text-lg">{result.nature}</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Vertex</p>
                  <p className="text-lg">({result.vertex.x.toFixed(4)}, {result.vertex.y.toFixed(4)})</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Quadratic Equation Solver
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your coefficients</p>
                  <p>Input the values for a, b, and c from your equation ax² + bx + c = 0. Make sure a is not zero.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Solve</p>
                  <p>The calculator will compute the discriminant and find the roots using the quadratic formula.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Review the results</p>
                  <p>You will see both roots (x₁ and x₂), the discriminant value, the nature of roots, and the vertex of the parabola.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Quadratic Equations
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                A quadratic equation is a second-degree polynomial equation in the form ax² + bx + c = 0,
                where a, b, and c are constants and a ≠ 0. The graph of a quadratic equation is a parabola.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-center">
                x = (-b ± √(b² - 4ac)) / 2a
              </div>
              <p>
                The quadratic formula gives you the roots (solutions) of any quadratic equation. The ± symbol
                means there are typically two solutions: one using addition and one using subtraction.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              The Discriminant and Nature of Roots
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Discriminant (Δ)</th>
                    <th className="text-left py-3 px-2 font-semibold">Nature of Roots</th>
                    <th className="text-left py-3 px-2 font-semibold">Graph Behavior</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Δ &gt; 0</td>
                    <td className="py-3 px-2">Two distinct real roots</td>
                    <td className="py-3 px-2">Parabola crosses x-axis twice</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Δ = 0</td>
                    <td className="py-3 px-2">One repeated real root</td>
                    <td className="py-3 px-2">Parabola touches x-axis once</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Δ &lt; 0</td>
                    <td className="py-3 px-2">Two complex conjugate roots</td>
                    <td className="py-3 px-2">Parabola does not cross x-axis</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              The discriminant (Δ = b² - 4ac) tells you what kind of solutions to expect before solving.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Finding the Vertex
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                The vertex is the highest or lowest point on a parabola. For a quadratic equation,
                the vertex coordinates (h, k) are:
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono space-y-2">
                <div>h = -b / 2a</div>
                <div>k = f(h) = a(h)² + b(h) + c</div>
              </div>
              <p>
                If a &gt; 0, the parabola opens upward and the vertex is a minimum.
                If a &lt; 0, the parabola opens downward and the vertex is a maximum.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Quadratic Equation Examples
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-mono text-xs mb-1">x² - 5x + 6 = 0</p>
                <p className="text-muted-foreground">a=1, b=-5, c=6 → Roots: x=2, x=3</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-mono text-xs mb-1">2x² + 4x - 6 = 0</p>
                <p className="text-muted-foreground">a=2, b=4, c=-6 → Roots: x=1, x=-3</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-mono text-xs mb-1">x² - 4x + 4 = 0</p>
                <p className="text-muted-foreground">a=1, b=-4, c=4 → One root: x=2 (repeated)</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-mono text-xs mb-1">x² + x + 1 = 0</p>
                <p className="text-muted-foreground">a=1, b=1, c=1 → Complex roots: -0.5 ± 0.866i</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the quadratic formula?</h4>
                <p>
                  The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a. It solves any quadratic equation
                  ax² + bx + c = 0. The formula comes from completing the square on the general quadratic equation.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What does the discriminant tell me?</h4>
                <p>
                  The discriminant (b² - 4ac) reveals the nature of the roots. Positive means two real roots,
                  zero means one repeated root, and negative means two complex roots. You can check this before
                  solving to know what to expect.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can a be zero in a quadratic equation?</h4>
                <p>
                  No. If a = 0, the equation becomes linear (bx + c = 0), not quadratic. The quadratic formula
                  would also fail because it divides by 2a. Make sure your equation has an x² term.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the vertex of a parabola?</h4>
                <p>
                  The vertex is the turning point of the parabola — its highest or lowest point. The x-coordinate
                  is -b/2a, and you find the y-coordinate by plugging this back into the equation. The vertex
                  tells you the maximum or minimum value of the quadratic function.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">When do quadratic equations have complex roots?</h4>
                <p>
                  Complex roots occur when the discriminant is negative (b² - 4ac &lt; 0). This happens when the
                  parabola does not cross the x-axis. The roots come in conjugate pairs: a + bi and a - bi,
                  where i is the imaginary unit (√-1).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
