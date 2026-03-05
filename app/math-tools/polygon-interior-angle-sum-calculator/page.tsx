"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PolygonInteriorAngleSumCalculator() {
  const [sides, setSides] = useState<string>("");
  const [result, setResult] = useState<{
    sum: number;
    eachAngle: number;
    exteriorAngle: number;
    diagonals: number;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState<string>("");

  const calculate = () => {
    setError("");
    setResult(null);

    const n = parseInt(sides);

    if (isNaN(n) || n < 3) {
      setError("A polygon must have at least 3 sides");
      return;
    }

    if (n > 1000) {
      setError("Please enter a reasonable number (max 1000)");
      return;
    }

    const steps: string[] = [];
    
    // Sum of interior angles: (n - 2) × 180°
    const sum = (n - 2) * 180;
    
    // Each interior angle (regular polygon): sum / n
    const eachAngle = sum / n;
    
    // Each exterior angle (regular polygon): 360° / n
    const exteriorAngle = 360 / n;
    
    // Number of diagonals: n(n-3)/2
    const diagonals = (n * (n - 3)) / 2;

    steps.push("Polygon Interior Angle Sum Formula: Sum = (n - 2) × 180°");
    steps.push("");
    steps.push(`Number of sides (n) = ${n}`);
    steps.push(`Polygon name: ${getPolygonName(n)}`);
    steps.push("");
    steps.push("Step 1: Apply the formula");
    steps.push(`Sum = (n - 2) × 180°`);
    steps.push(`Sum = (${n} - 2) × 180°`);
    steps.push(`Sum = ${n - 2} × 180°`);
    steps.push(`Sum = ${sum}°`);
    steps.push("");
    steps.push("Step 2: Find each interior angle (for regular polygon)");
    steps.push(`Each angle = Sum / n`);
    steps.push(`Each angle = ${sum}° / ${n}`);
    steps.push(`Each angle = ${eachAngle.toFixed(4)}°`);
    steps.push("");
    steps.push("Step 3: Find each exterior angle (for regular polygon)");
    steps.push(`Exterior angle = 360° / n`);
    steps.push(`Exterior angle = 360° / ${n}`);
    steps.push(`Exterior angle = ${exteriorAngle.toFixed(4)}°`);
    steps.push("");
    steps.push("Step 4: Calculate number of diagonals");
    steps.push(`Diagonals = n(n - 3) / 2`);
    steps.push(`Diagonals = ${n}(${n} - 3) / 2`);
    steps.push(`Diagonals = ${n * (n - 3)} / 2`);
    steps.push(`Diagonals = ${diagonals}`);

    setResult({ sum, eachAngle, exteriorAngle, diagonals, steps });
  };

  const getPolygonName = (n: number): string => {
    const names: Record<number, string> = {
      3: "Triangle",
      4: "Quadrilateral",
      5: "Pentagon",
      6: "Hexagon",
      7: "Heptagon",
      8: "Octagon",
      9: "Nonagon",
      10: "Decagon",
      11: "Hendecagon",
      12: "Dodecagon",
      13: "Tridecagon",
      14: "Tetradecagon",
      15: "Pentadecagon",
      16: "Hexadecagon",
      17: "Heptadecagon",
      18: "Octadecagon",
      19: "Enneadecagon",
      20: "Icosagon"
    };

    if (n <= 20) return names[n] || `${n}-gon`;
    
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    const tensNames: Record<number, string> = {
      2: "icosi", 3: "triaconta", 4: "tetraconta", 5: "pentaconta",
      6: "hexaconta", 7: "heptaconta", 8: "octaconta", 9: "enneaconta"
    };
    const onesNames: Record<number, string> = {
      1: "hen", 2: "di", 3: "tri", 4: "tetra", 5: "penta",
      6: "hexa", 7: "hepta", 8: "octa", 9: "ennea"
    };

    if (ones === 0) return `${tensNames[tens]}gon`;
    return `${tensNames[tens]}${onesNames[ones]}gon`;
  };

  const reset = () => {
    setSides("");
    setResult(null);
    setError("");
  };

  const loadExample = (n: number) => {
    setSides(n.toString());
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Polygon Interior Angle Sum Calculator – Find Angle Sum of Polygon</h1>
        <p className="text-muted-foreground">
          Calculate the sum of interior angles of any polygon with our free online calculator. Enter the number of sides and instantly find the total interior angle sum and each angle for regular polygons.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Polygon Interior Angle Sum Calculator</CardTitle>
          <CardDescription>
            Enter the number of sides to calculate interior angle sum.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-2">Interior Angle Sum Formula</div>
              <div className="font-mono text-lg">Sum = (n - 2) × 180°</div>
            </div>

            <div>
              <Label>Number of Sides (n)</Label>
              <Input
                type="number"
                placeholder="e.g., 6"
                min="3"
                value={sides}
                onChange={(e) => setSides(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && calculate()}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter 3 or greater. For regular polygons, each angle will also be calculated.
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample(3)}>
                Triangle (3)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample(4)}>
                Quadrilateral (4)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample(5)}>
                Pentagon (5)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample(6)}>
                Hexagon (6)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample(8)}>
                Octagon (8)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample(10)}>
                Decagon (10)
              </Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Sum of Interior Angles</p>
                    <p className="text-3xl font-bold">{result.sum}°</p>
                  </div>
                  <div className="p-5 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Each Angle (Regular)</p>
                    <p className="text-3xl font-bold">{result.eachAngle.toFixed(2)}°</p>
                  </div>
                  <div className="p-5 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Each Exterior Angle</p>
                    <p className="text-3xl font-bold">{result.exteriorAngle.toFixed(2)}°</p>
                  </div>
                  <div className="p-5 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Number of Diagonals</p>
                    <p className="text-3xl font-bold">{result.diagonals}</p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
                  <div className="space-y-2 text-sm font-mono">
                    {result.steps.map((step, i) => (
                      <div key={i} className={step === "" ? "h-2" : ""}>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Understanding Polygon Interior Angles</h2>
          <p className="text-muted-foreground">
            A polygon is any closed shape with straight sides – triangles, squares, pentagons, and so on. The interior angles are the angles inside the polygon at each vertex. No matter how many sides a polygon has, there's a simple formula to find the sum of all its interior angles.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            The formula (n - 2) × 180° works because any polygon can be divided into (n - 2) triangles by drawing diagonals from one vertex. Since each triangle has 180°, multiply by the number of triangles. This calculator shows you the total sum, plus each individual angle if the polygon is regular (all sides and angles equal).
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Formula Explained</h3>
        
        <div className="p-6 bg-muted rounded-lg">
          <div className="font-mono text-2xl text-center mb-4">Sum = (n - 2) × 180°</div>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Where n is the number of sides (or vertices) of the polygon.
          </p>
          <div className="border-t pt-4">
            <h4 className="font-semibold text-sm mb-2">Why This Formula Works</h4>
            <p className="text-sm text-muted-foreground">
              Pick any vertex of a polygon. Draw diagonals from that vertex to all other non-adjacent vertices. This divides the polygon into triangles. A polygon with n sides creates exactly (n - 2) triangles. Since each triangle contributes 180° to the total, the sum is (n - 2) × 180°.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-3">Each Interior Angle (Regular Polygon)</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded mb-3">Each angle = (n - 2) × 180° / n</div>
            <p className="text-sm text-muted-foreground">
              For regular polygons (all sides equal, all angles equal), divide the total sum by the number of angles to find each one.
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-3">Each Exterior Angle (Regular Polygon)</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded mb-3">Exterior angle = 360° / n</div>
            <p className="text-sm text-muted-foreground">
              The exterior angles of any polygon always sum to 360°. For regular polygons, divide 360° by n to find each exterior angle.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Polygons Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-muted">
                <th className="text-left py-3 px-4 font-semibold border-b">Sides</th>
                <th className="text-left py-3 px-4 font-semibold border-b">Name</th>
                <th className="text-left py-3 px-4 font-semibold border-b">Interior Angle Sum</th>
                <th className="text-left py-3 px-4 font-semibold border-b">Each Angle (Regular)</th>
                <th className="text-left py-3 px-4 font-semibold border-b">Exterior Angle</th>
              </tr>
            </thead>
            <tbody>
              {[3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((n) => {
                const sum = (n - 2) * 180;
                const each = sum / n;
                const ext = 360 / n;
                return (
                  <tr key={n} className="border-b">
                    <td className="py-3 px-4 font-mono">{n}</td>
                    <td className="py-3 px-4">{getPolygonName(n)}</td>
                    <td className="py-3 px-4 font-mono">{sum}°</td>
                    <td className="py-3 px-4 font-mono">{each.toFixed(2)}°</td>
                    <td className="py-3 px-4 font-mono">{ext.toFixed(2)}°</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Polygon Properties</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Regular vs Irregular Polygons</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Regular polygons have all sides equal and all angles equal (equilateral triangle, square, regular pentagon). Irregular polygons have sides and/or angles of different measures.
            </p>
            <div className="bg-muted p-3 rounded text-sm">
              The interior angle sum formula works for both regular and irregular polygons. Only the "each angle" calculation assumes regularity.
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Convex vs Concave Polygons</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Convex polygons have all interior angles less than 180° – no "dents" or inward-pointing vertices. Concave polygons have at least one interior angle greater than 180°.
            </p>
            <div className="bg-muted p-3 rounded text-sm">
              The angle sum formula (n - 2) × 180° works for both convex and concave polygons. The sum depends only on the number of sides, not the shape.
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Number of Diagonals</h4>
            <p className="text-sm text-muted-foreground mb-3">
              A diagonal connects two non-adjacent vertices. The formula for the number of diagonals in an n-sided polygon is:
            </p>
            <div className="font-mono text-sm bg-muted p-3 rounded mb-2">Diagonals = n(n - 3) / 2</div>
            <p className="text-sm text-muted-foreground">
              Each vertex connects to (n - 3) other vertices via diagonals (not itself or its two neighbors). Multiply by n vertices, then divide by 2 since each diagonal is counted twice.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Exterior Angle Sum</h4>
            <p className="text-sm text-muted-foreground mb-3">
              The exterior angles of any polygon (one at each vertex, measured by extending each side) always sum to exactly 360° – regardless of the number of sides.
            </p>
            <div className="bg-muted p-3 rounded text-sm">
              This is why each exterior angle of a regular n-gon is 360°/n. Walk around any polygon, turning at each corner – you make exactly one full rotation (360°).
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Hexagon</h4>
            <p className="text-sm text-muted-foreground mb-3">Find the sum of interior angles of a hexagon (6 sides)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Sum = (n - 2) × 180°</div>
              <div>Sum = (6 - 2) × 180°</div>
              <div>Sum = 4 × 180°</div>
              <div>Sum = 720°</div>
              <div className="pt-2">Each angle (regular) = 720° / 6 = 120°</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Decagon</h4>
            <p className="text-sm text-muted-foreground mb-3">Find the sum of interior angles of a decagon (10 sides)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Sum = (n - 2) × 180°</div>
              <div>Sum = (10 - 2) × 180°</div>
              <div>Sum = 8 × 180°</div>
              <div>Sum = 1440°</div>
              <div className="pt-2">Each angle (regular) = 1440° / 10 = 144°</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Finding Sides from Angle Sum</h4>
            <p className="text-sm text-muted-foreground mb-3">A regular polygon has interior angles of 150°. How many sides?</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Each angle = (n - 2) × 180° / n</div>
              <div>150 = (n - 2) × 180 / n</div>
              <div>150n = 180n - 360</div>
              <div>30n = 360</div>
              <div>n = 12</div>
              <div className="pt-2 font-semibold">The polygon has 12 sides (dodecagon)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Using Exterior Angles</h4>
            <p className="text-sm text-muted-foreground mb-3">A regular polygon has exterior angles of 30°. How many sides?</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Exterior angle = 360° / n</div>
              <div>30 = 360 / n</div>
              <div>n = 360 / 30</div>
              <div>n = 12</div>
              <div className="pt-2 font-semibold">The polygon has 12 sides (dodecagon)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the sum of interior angles of a polygon?</h4>
            <p className="text-sm text-muted-foreground">
              The sum is (n - 2) × 180°, where n is the number of sides. A triangle (3 sides) has 180°, a quadrilateral (4 sides) has 360°, a pentagon has 540°, and so on. Each additional side adds 180° to the sum.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does the formula use (n - 2)?</h4>
            <p className="text-sm text-muted-foreground">
              Any polygon can be divided into triangles by drawing diagonals from one vertex. An n-sided polygon creates exactly (n - 2) triangles. Since each triangle has 180°, multiply (n - 2) by 180°.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does this work for irregular polygons?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. The sum depends only on the number of sides, not whether the polygon is regular or irregular. A irregular hexagon still has interior angles summing to 720° – they're just not all equal.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What about concave polygons?</h4>
            <p className="text-sm text-muted-foreground">
              The formula still works. Even if a polygon has "dents" (interior angles greater than 180°), the total sum is still (n - 2) × 180°. The formula counts the total angular measure, regardless of individual angle sizes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I find the number of sides from the angle sum?</h4>
            <p className="text-sm text-muted-foreground">
              Rearrange the formula: if Sum = (n - 2) × 180°, then n = (Sum / 180°) + 2. For example, if the sum is 1080°, then n = (1080 / 180) + 2 = 6 + 2 = 8 sides.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the sum of exterior angles?</h4>
            <p className="text-sm text-muted-foreground">
              The exterior angles of any polygon always sum to exactly 360°, regardless of the number of sides. This is true for both regular and irregular polygons, convex and concave.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/perimeter-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Perimeter Calculator</p>
            <p className="text-xs text-muted-foreground">2D perimeter</p>
          </a>
          <a href="/math-tools/area-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Area Calculator</p>
            <p className="text-xs text-muted-foreground">2D area calculations</p>
          </a>
          <a href="/math-tools/angle-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Triangle Angle Calculator</p>
            <p className="text-xs text-muted-foreground">Triangle angles</p>
          </a>
        </div>
      </section>
    </div>
  );
}
