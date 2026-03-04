"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PythagoreanTheoremCalculator() {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [c, setC] = useState<string>("");
  const [result, setResult] = useState<{ side: string; value: number } | null>(null);

  const calculate = () => {
    const aVal = a ? parseFloat(a) : null;
    const bVal = b ? parseFloat(b) : null;
    const cVal = c ? parseFloat(c) : null;
    
    if (aVal && bVal && !c) {
      // Calculate hypotenuse
      const cCalc = Math.sqrt(aVal * aVal + bVal * bVal);
      setResult({ side: "c (hypotenuse)", value: cCalc });
    } else if (aVal && cVal && !b && cVal > aVal) {
      // Calculate leg b
      const bCalc = Math.sqrt(cVal * cVal - aVal * aVal);
      setResult({ side: "b (leg)", value: bCalc });
    } else if (bVal && cVal && !a && cVal > bVal) {
      // Calculate leg a
      const aCalc = Math.sqrt(cVal * cVal - bVal * bVal);
      setResult({ side: "a (leg)", value: aCalc });
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
        <CardHeader>
          <CardTitle>Pythagorean Theorem Calculator</CardTitle>
          <CardDescription>Calculate the missing side of a right triangle: a² + b² = c²</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-md text-center font-mono">
              a² + b² = c²
            </div>
            <p className="text-sm text-muted-foreground">
              Enter any two sides to calculate the third
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Side a</label>
                <Input
                  type="number"
                  placeholder="Leg"
                  step="any"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Side b</label>
                <Input
                  type="number"
                  placeholder="Leg"
                  step="any"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Side c</label>
                <Input
                  type="number"
                  placeholder="Hypotenuse"
                  step="any"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">{result.side}</p>
                <p className="text-2xl font-semibold">{result.value.toFixed(4)}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Pythagorean Theorem Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter two known sides</p>
                  <p>Input any two sides of the right triangle. Leave the side you want to find empty.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Calculate</p>
                  <p>The calculator automatically determines which side to solve for based on which fields you filled in.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Get the missing side</p>
                  <p>See the calculated length of the missing side with four decimal precision.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Pythagorean Theorem Formula
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                The Pythagorean theorem states that in a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-center text-lg">
                a² + b² = c²
              </div>
              <p>
                Where <strong>c</strong> is the hypotenuse (longest side, opposite the right angle) and <strong>a</strong> and <strong>b</strong> are the legs (the two shorter sides forming the right angle).
              </p>
              <div className="space-y-2">
                <p className="font-medium">To find the hypotenuse:</p>
                <div className="p-3 bg-muted/50 rounded font-mono text-sm">c = √(a² + b²)</div>
                <p className="font-medium">To find a leg:</p>
                <div className="p-3 bg-muted/50 rounded font-mono text-sm">a = √(c² - b²) or b = √(c² - a²)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Pythagorean Triples
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Side a</th>
                    <th className="text-left py-3 px-2 font-semibold">Side b</th>
                    <th className="text-left py-3 px-2 font-semibold">Hypotenuse c</th>
                    <th className="text-left py-3 px-2 font-semibold">Verification</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">3</td>
                    <td className="py-3 px-2">4</td>
                    <td className="py-3 px-2">5</td>
                    <td className="py-3 px-2">9 + 16 = 25</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">5</td>
                    <td className="py-3 px-2">12</td>
                    <td className="py-3 px-2">13</td>
                    <td className="py-3 px-2">25 + 144 = 169</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">8</td>
                    <td className="py-3 px-2">15</td>
                    <td className="py-3 px-2">17</td>
                    <td className="py-3 px-2">64 + 225 = 289</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">7</td>
                    <td className="py-3 px-2">24</td>
                    <td className="py-3 px-2">25</td>
                    <td className="py-3 px-2">49 + 576 = 625</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">9</td>
                    <td className="py-3 px-2">40</td>
                    <td className="py-3 px-2">41</td>
                    <td className="py-3 px-2">81 + 1600 = 1681</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Pythagorean triples are sets of three whole numbers that satisfy a² + b² = c².
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Real-World Applications
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Construction and Carpentry</h4>
                <p>
                  Builders use the 3-4-5 rule to ensure corners are perfectly square. Measure 3 feet along one wall, 4 feet along the other — if the diagonal is exactly 5 feet, the corner is a perfect 90 degrees.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Navigation</h4>
                <p>
                  The shortest distance between two points on a grid is a straight line. Pilots and sailors use the theorem to calculate direct distances when traveling north-south and east-west.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Computer Graphics</h4>
                <p>
                  Video games and 3D rendering calculate distances between points using the Pythagorean theorem. It determines collision detection, object placement, and camera positioning.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Surveying</h4>
                <p>
                  Surveyors measure horizontal and vertical distances to calculate the direct distance to a point. This is essential for mapping property boundaries and construction sites.
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
                <h4 className="font-medium text-foreground mb-2">What is the Pythagorean theorem?</h4>
                <p>
                  The Pythagorean theorem states that in a right triangle, the square of the hypotenuse (longest side) equals the sum of the squares of the other two sides: a² + b² = c². It only works for right triangles.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I know which side is the hypotenuse?</h4>
                <p>
                  The hypotenuse is always the longest side and is opposite the right angle (90°). In the formula a² + b² = c², c is always the hypotenuse.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I use this for non-right triangles?</h4>
                <p>
                  No. For non-right triangles, use the Law of Cosines: c² = a² + b² - 2ab·cos(C). The Pythagorean theorem only applies when one angle is exactly 90 degrees.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What are Pythagorean triples?</h4>
                <p>
                  Pythagorean triples are three whole numbers that satisfy a² + b² = c². Common examples include (3,4,5), (5,12,13), and (8,15,17). These create right triangles with integer side lengths.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Who discovered the Pythagorean theorem?</h4>
                <p>
                  Although named after Greek mathematician Pythagoras (570-495 BCE), the theorem was known to Babylonian mathematicians over 1000 years earlier. Pythagoras or his followers provided the first known proof.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Related Tools
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="/calculators/triangle-area-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Triangle Area Calculator</span>
                <p className="text-muted-foreground">Calculate the area of triangles using various methods</p>
              </a>
              <a
                href="/calculators/distance-formula-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Distance Formula Calculator</span>
                <p className="text-muted-foreground">Calculate distance between two points on a coordinate plane</p>
              </a>
              <a
                href="/calculators/triangle-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Triangle Calculator</span>
                <p className="text-muted-foreground">Solve for all sides and angles of any triangle</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
