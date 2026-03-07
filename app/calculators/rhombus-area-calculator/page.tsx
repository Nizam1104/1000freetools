"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RhombusAreaCalculator() {
  const [diagonal1, setDiagonal1] = useState<string>("");
  const [diagonal2, setDiagonal2] = useState<string>("");
  const [side, setSide] = useState<string>("");
  const [result, setResult] = useState<{ area: number; perimeter: number } | null>(null);

  const calculate = () => {
    const d1 = parseFloat(diagonal1);
    const d2 = parseFloat(diagonal2);
    const s = parseFloat(side);
    if (!isNaN(d1) && !isNaN(d2) && !isNaN(s) && d1 > 0 && d2 > 0 && s > 0) {
      setResult({
        area: (d1 * d2) / 2,
        perimeter: 4 * s
      });
    }
  };

  const reset = () => {
    setDiagonal1("");
    setDiagonal2("");
    setSide("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Diagonal 1 (d₁)</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                step="any"
                min="0"
                value={diagonal1}
                onChange={(e) => setDiagonal1(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Diagonal 2 (d₂)</label>
              <Input
                type="number"
                placeholder="e.g., 8"
                step="any"
                min="0"
                value={diagonal2}
                onChange={(e) => setDiagonal2(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Side length (s)</label>
              <Input
                type="number"
                placeholder="e.g., 6"
                step="any"
                min="0"
                value={side}
                onChange={(e) => setSide(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="text-2xl font-semibold">{result.area.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Perimeter</p>
                  <p className="text-lg">{result.perimeter.toFixed(4)}</p>
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
              How to Use This Rhombus Area Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the diagonal lengths</p>
                  <p>Input the lengths of both diagonals (d1 and d2). These are the lines connecting opposite corners of the rhombus.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the side length</p>
                  <p>Input the length of one side. All four sides of a rhombus are equal, so you only need one measurement.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Calculate</p>
                  <p>The calculator computes the area using A = (d1 x d2) / 2 and the perimeter using P = 4 x side length.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Rhombus Properties Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Property</th>
                    <th className="text-left py-3 px-2 font-semibold">Formula</th>
                    <th className="text-left py-3 px-2 font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Area</td>
                    <td className="py-3 px-2 font-mono text-xs">(d1 x d2) / 2</td>
                    <td className="py-3 px-2">(10 x 8) / 2 = 40</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Perimeter</td>
                    <td className="py-3 px-2 font-mono text-xs">4 x s</td>
                    <td className="py-3 px-2">4 x 6 = 24</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Side from diagonals</td>
                    <td className="py-3 px-2 font-mono text-xs">s = sqrt((d1/2)² + (d2/2)²)</td>
                    <td className="py-3 px-2">sqrt(25 + 16) = 6.4</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Area from side & height</td>
                    <td className="py-3 px-2 font-mono text-xs">s x h</td>
                    <td className="py-3 px-2">6 x 5 = 30</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Area from side & angle</td>
                    <td className="py-3 px-2 font-mono text-xs">s² x sin(θ)</td>
                    <td className="py-3 px-2">36 x sin(60°) = 31.2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Rhombuses
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                A rhombus is a quadrilateral with four equal sides. It&apos;s a special type of parallelogram where all sides have the same length. You might know it as a &quot;diamond&quot; shape — though mathematically, a diamond is just a rhombus oriented with its diagonals vertical and horizontal.
              </p>
              <p>
                The diagonals of a rhombus have two important properties: they bisect each other at right angles (90°), and they bisect the corner angles. This means the diagonals split the rhombus into four congruent right triangles. This property is why the area formula uses diagonals — you&apos;re essentially calculating the area of those four triangles.
              </p>
              <p>
                A square is a special case of a rhombus where all angles are 90°. All squares are rhombuses, but not all rhombuses are squares. The rhombus is more flexible — it can be squashed or stretched while keeping all four sides equal.
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Key insight:</strong> The area formula A = (d1 x d2) / 2 works because the diagonals create four right triangles. Each triangle has area (d1/2 x d2/2) / 2, and four of them give (d1 x d2) / 2.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Rhombus vs Other Quadrilaterals
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Rhombus vs Square</h4>
                <p>
                  Both have four equal sides. A square also has four 90° angles and equal diagonals. A rhombus has opposite angles equal but not necessarily 90°, and its diagonals are usually different lengths.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Rhombus vs Rectangle</h4>
                <p>
                  Rectangles have four 90° angles but opposite sides equal (not all four). A rhombus has all sides equal but angles aren&apos;t necessarily 90°. A square is both a rhombus and a rectangle.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Rhombus vs Parallelogram</h4>
                <p>
                  All rhombuses are parallelograms (opposite sides parallel), but not all parallelograms are rhombuses. A parallelogram only requires opposite sides to be equal, not all four sides.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Rhombus vs Kite</h4>
                <p>
                  A kite has two pairs of adjacent equal sides. A rhombus has all four sides equal. Both have perpendicular diagonals, but only the rhombus has diagonals that bisect each other.
                </p>
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
                <h4 className="font-medium text-foreground mb-2">What if I only know the side length?</h4>
                <p>
                  You need more information — either the height, one angle, or one diagonal. With just the side length, there are infinitely many rhombuses possible (think of a square being squashed flatter and flatter while keeping the same side length).
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I find the diagonals if I know the side and angle?</h4>
                <p>
                  Use trigonometry: d1 = 2 x s x cos(θ/2) and d2 = 2 x s x sin(θ/2), where θ is any corner angle. The diagonals bisect the angles, so you use half the angle in the formulas.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is a rhombus always a parallelogram?</h4>
                <p>
                  Yes. By definition, a rhombus has opposite sides parallel (that&apos;s what makes all four sides equal possible). Every rhombus is a parallelogram, but the reverse isn&apos;t true.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can a rhombus have right angles?</h4>
                <p>
                  Yes — if all four angles are 90°, it&apos;s a square. A square is a rhombus with right angles. If only some angles are 90°, it&apos;s not a valid rhombus (opposite angles must be equal).
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What units should I use?</h4>
                <p>
                  Any consistent units work. If diagonals are in centimeters, area is in square centimeters. If sides are in meters, perimeter is in meters. The calculator doesn&apos;t assume units — just be consistent.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
