"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ParallelogramAreaCalculator() {
  const [base, setBase] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [side, setSide] = useState<string>("");
  const [result, setResult] = useState<{ area: number; perimeter: number } | null>(null);

  const calculate = () => {
    const b = parseFloat(base);
    const h = parseFloat(height);
    const s = parseFloat(side);
    if (!isNaN(b) && !isNaN(h) && !isNaN(s) && b > 0 && h > 0 && s > 0) {
      setResult({
        area: b * h,
        perimeter: 2 * (b + s)
      });
    }
  };

  const reset = () => {
    setBase("");
    setHeight("");
    setSide("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Base (b)</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                step="any"
                min="0"
                value={base}
                onChange={(e) => setBase(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Height (h)</label>
              <Input
                type="number"
                placeholder="e.g., 6"
                step="any"
                min="0"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Side length (s)</label>
              <Input
                type="number"
                placeholder="e.g., 8"
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
          <CardHeader>
            <CardTitle>How to Use This Parallelogram Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
              <div>
                <p className="font-medium text-foreground">Enter the base length</p>
                <p>Input the length of any side as the base. In a parallelogram, opposite sides are equal.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
              <div>
                <p className="font-medium text-foreground">Enter the height</p>
                <p>The height is the perpendicular distance from the base to the opposite side, not the slanted side length.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
              <div>
                <p className="font-medium text-foreground">Enter the side length and calculate</p>
                <p>Input the length of the slanted side for perimeter calculation. Click Calculate to see area and perimeter.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Parallelogram Properties Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Property</th>
                    <th className="text-left py-3 px-2 font-semibold">Formula</th>
                    <th className="text-left py-3 px-2 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Area</td>
                    <td className="py-3 px-2 font-mono">A = b × h</td>
                    <td className="py-3 px-2">Base times perpendicular height</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Perimeter</td>
                    <td className="py-3 px-2 font-mono">P = 2(b + s)</td>
                    <td className="py-3 px-2">Twice the sum of base and side</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Opposite sides</td>
                    <td className="py-3 px-2 font-mono">a = c, b = d</td>
                    <td className="py-3 px-2">Equal in length and parallel</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Opposite angles</td>
                    <td className="py-3 px-2 font-mono">∠A = ∠C, ∠B = ∠D</td>
                    <td className="py-3 px-2">Equal in measure</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Consecutive angles</td>
                    <td className="py-3 px-2 font-mono">∠A + ∠B = 180°</td>
                    <td className="py-3 px-2">Supplementary (add to 180°)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Parallelograms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">What Is a Parallelogram?</h4>
              <p>A parallelogram is a four-sided shape where both pairs of opposite sides are parallel. This simple definition leads to several important properties: opposite sides are equal in length, opposite angles are equal, and consecutive angles add up to 180 degrees. The diagonals bisect each other.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Why Area Equals Base Times Height</h4>
              <p>Imagine cutting off a triangle from one end of a parallelogram and moving it to the other side. You get a rectangle with the same base and height. Since area doesn't change when you rearrange pieces, the parallelogram's area equals the rectangle's area: base times height.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Special Types of Parallelograms</h4>
              <p>Rectangles are parallelograms with four right angles. Rhombuses are parallelograms with four equal sides. Squares are both rectangles and rhombuses — four equal sides and four right angles. All inherit the basic parallelogram properties.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips for Parallelogram Calculations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Height Is Perpendicular</p>
                <p>The height must be measured at a right angle to the base, not along the slanted side. This is a common mistake.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Any Side Can Be the Base</p>
                <p>You can choose any side as the base. The height is then measured perpendicular to that chosen base.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Check Your Units</p>
                <p>Area is in square units (cm², m², etc.). Perimeter is in linear units (cm, m, etc.). Don't mix them up.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">What's the difference between height and side length?</h4>
              <p>The side length is the actual length of the slanted edge. The height is the perpendicular distance from the base to the opposite side. In a rectangle, height equals side length. In a tilted parallelogram, height is always shorter than the side.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Can a parallelogram have right angles?</h4>
              <p>Yes. A parallelogram with one right angle must have four right angles — it's a rectangle. Rectangles are a special type of parallelogram where all angles are 90 degrees.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">How do I find the height if I only know the sides and angle?</h4>
              <p>Use trigonometry: height = side × sin(angle). If you know one side is 10 units and the angle between that side and the base is 30 degrees, the height is 10 × sin(30°) = 10 × 0.5 = 5 units.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Is a rhombus a parallelogram?</h4>
              <p>Yes. A rhombus is a parallelogram with all four sides equal. It has all the properties of a parallelogram plus perpendicular diagonals that bisect the angles.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Where are parallelograms used in real life?</h4>
              <p>Parallelograms appear in architecture (slanted roofs, modern building facades), engineering (truss bridges, mechanical linkages), and design (tiling patterns, perspective drawings). The parallelogram law of vector addition is fundamental in physics.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <a href="/calculators/rectangle-area-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Rectangle Area Calculator</span>
                <p className="text-muted-foreground">Calculate area and perimeter of rectangles</p>
              </a>
              <a href="/calculators/triangle-area-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Triangle Area Calculator</span>
                <p className="text-muted-foreground">Calculate area of triangles using various methods</p>
              </a>
              <a href="/calculators/trapezoid-area-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Trapezoid Area Calculator</span>
                <p className="text-muted-foreground">Calculate area and perimeter of trapezoids</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
