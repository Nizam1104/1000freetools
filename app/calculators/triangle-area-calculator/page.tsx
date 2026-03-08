"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TriangleAreaCalculator() {
  const [base, setBase] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const b = parseFloat(base);
    const h = parseFloat(height);
    if (!isNaN(b) && !isNaN(h) && b > 0 && h > 0) {
      setResult(0.5 * b * h);
    }
  };

  const reset = () => {
    setBase("");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
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
                placeholder="e.g., 5"
                step="any"
                min="0"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Area</p>
                <p className="text-2xl font-semibold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Triangle Area Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <p className="font-semibold">Enter the base length</p>
              <p className="text-sm text-muted-foreground">The base can be any side of the triangle. Enter its length in your preferred unit (cm, m, inches, etc.).</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <p className="font-semibold">Enter the height</p>
              <p className="text-sm text-muted-foreground">The height is the perpendicular distance from the base to the opposite vertex. It must be at a 90-degree angle to the base.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <p className="font-semibold">Get your result</p>
              <p className="text-sm text-muted-foreground">Click Calculate to see the area. The result is in square units matching your input (square cm, square meters, etc.).</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Triangle Area</CardTitle>
          <CardDescription>The formula and why it works</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The area of a triangle equals half the base times the height: A = ½ × b × h. This formula works for all triangles – right, acute, obtuse, scalene, isosceles, or equilateral.
          </p>
          <p className="text-sm text-muted-foreground">
            Why divide by 2? Picture a rectangle with the same base and height as your triangle. That rectangle's area is b × h. Now draw a diagonal – you've split it into two identical triangles. Each triangle is exactly half the rectangle's area.
          </p>
          <p className="text-sm text-muted-foreground">
            The height must be perpendicular to the base. In a right triangle, one leg serves as the height when the other leg is the base. In other triangles, you may need to draw an altitude line from the vertex straight down to the base.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Triangle Area Formulas Reference</CardTitle>
          <CardDescription>Different methods for different situations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-semibold">Method</th>
                  <th className="text-left py-2 px-3 font-semibold">Formula</th>
                  <th className="text-left py-2 px-3 font-semibold">When to Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3">Base and Height</td>
                  <td className="py-2 px-3 font-mono">A = ½bh</td>
                  <td className="py-2 px-3">When you know base and perpendicular height</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Heron's Formula</td>
                  <td className="py-2 px-3 font-mono">A = √[s(s-a)(s-b)(s-c)]</td>
                  <td className="py-2 px-3">When you know all three sides (s = semi-perimeter)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Two Sides and Angle</td>
                  <td className="py-2 px-3 font-mono">A = ½ab sin(C)</td>
                  <td className="py-2 px-3">When you know two sides and the included angle</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Equilateral Triangle</td>
                  <td className="py-2 px-3 font-mono">A = (√3/4) × s²</td>
                  <td className="py-2 px-3">When all three sides are equal</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Coordinates</td>
                  <td className="py-2 px-3 font-mono">A = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|</td>
                  <td className="py-2 px-3">When you have vertex coordinates on a grid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Triangle Types and Properties</CardTitle>
          <CardDescription>Common triangle classifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-semibold mb-2">By Side Lengths</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><strong>Equilateral:</strong> All three sides equal, all angles 60°. Area = (√3/4) × side²</li>
                <li><strong>Isosceles:</strong> Two sides equal, two angles equal. Height splits base in half.</li>
                <li><strong>Scalene:</strong> All sides different, all angles different. Use base-height or Heron's formula.</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-semibold mb-2">By Angles</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><strong>Right Triangle:</strong> One 90° angle. The two legs can serve as base and height.</li>
                <li><strong>Acute Triangle:</strong> All angles less than 90°. Height falls inside the triangle.</li>
                <li><strong>Obtuse Triangle:</strong> One angle greater than 90°. Height may fall outside the triangle.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Triangle Area Examples</CardTitle>
          <CardDescription>Real-world applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-semibold">Application</th>
                  <th className="text-left py-2 px-3 font-semibold">Example</th>
                  <th className="text-left py-2 px-3 font-semibold">Calculation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3">Roofing</td>
                  <td className="py-2 px-3">Gable end of house</td>
                  <td className="py-2 px-3">Base = 30 ft, Height = 12 ft → Area = 180 sq ft</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Land Surveying</td>
                  <td className="py-2 px-3">Triangular plot of land</td>
                  <td className="py-2 px-3">Use Heron's formula with measured sides</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Sailing</td>
                  <td className="py-2 px-3">Sail area calculation</td>
                  <td className="py-2 px-3">Base = boom length, Height = mast height</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Construction</td>
                  <td className="py-2 px-3">Triangular support beam</td>
                  <td className="py-2 px-3">Calculate cross-sectional area for load analysis</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Art and Design</td>
                  <td className="py-2 px-3">Triangular canvas or frame</td>
                  <td className="py-2 px-3">Determine material needed for coverage</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-1">What is the formula for triangle area?</h4>
            <p className="text-sm text-muted-foreground">
              The basic formula is Area = ½ × base × height. The base can be any side, and the height is the perpendicular distance from that base to the opposite vertex. This formula works for all triangle types.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">How do I find the height of a triangle?</h4>
            <p className="text-sm text-muted-foreground">
              In a right triangle, one leg is the height when the other leg is the base. For other triangles, draw a line from the vertex perpendicular to the base (or its extension). If you know the area and base, rearrange the formula: height = 2 × area ÷ base.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Can I calculate area without the height?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. If you know all three sides, use Heron's formula. If you know two sides and the angle between them, use A = ½ab sin(C). For equilateral triangles, use A = (√3/4) × side².
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Why is triangle area half of base times height?</h4>
            <p className="text-sm text-muted-foreground">
              A triangle is exactly half of a parallelogram with the same base and height. Two identical triangles can always be arranged to form a parallelogram. Since parallelogram area is base × height, triangle area is half that.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">What units should I use?</h4>
            <p className="text-sm text-muted-foreground">
              Use any consistent units for base and height. The area will be in square units – if you measure in centimeters, area is in square centimeters. If you measure in feet, area is in square feet.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
