"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SquareAreaCalculator() {
  const [side, setSide] = useState<string>("");
  const [result, setResult] = useState<{ area: number; perimeter: number; diagonal: number } | null>(null);

  const calculate = () => {
    const s = parseFloat(side);
    if (!isNaN(s) && s > 0) {
      setResult({
        area: s * s,
        perimeter: 4 * s,
        diagonal: s * Math.sqrt(2)
      });
    }
  };

  const reset = () => {
    setSide("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Side length (s)</label>
              <Input
                type="number"
                placeholder="e.g., 5"
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
                  <p className="text-sm text-muted-foreground">Area (s²)</p>
                  <p className="text-2xl font-semibold">{result.area.toFixed(4)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Perimeter</p>
                    <p className="text-lg">{result.perimeter.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Diagonal</p>
                    <p className="text-lg">{result.diagonal.toFixed(4)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Square Area Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <p className="font-semibold">Measure one side</p>
              <p className="text-sm text-muted-foreground">Since all sides of a square are equal, you only need to measure one. Enter the length in any unit.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <p className="font-semibold">Click Calculate</p>
              <p className="text-sm text-muted-foreground">The calculator instantly computes the area, perimeter, and diagonal length.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <p className="font-semibold">Read your results</p>
              <p className="text-sm text-muted-foreground">Get all three measurements at once. Area is in square units, perimeter and diagonal in linear units.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Square Measurements</CardTitle>
          <CardDescription>Formulas and properties</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            A square is a special quadrilateral with four equal sides and four right angles. This symmetry makes calculations straightforward – you only need one measurement to find everything else.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Area</strong> tells you how much space the square covers. It's calculated by squaring the side length (s²). If a square has sides of 5 cm, its area is 25 square centimeters.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Perimeter</strong> is the total distance around the square. Since all four sides are equal, perimeter = 4 × side. A 5 cm square has a perimeter of 20 cm.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Diagonal</strong> runs from one corner to the opposite corner. Using the Pythagorean theorem, diagonal = side × √2 (approximately side × 1.414). A 5 cm square has a diagonal of about 7.07 cm.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Square Formulas Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-semibold">Measurement</th>
                  <th className="text-left py-2 px-3 font-semibold">Formula</th>
                  <th className="text-left py-2 px-3 font-semibold">Example (s=5)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3">Area</td>
                  <td className="py-2 px-3 font-mono">A = s²</td>
                  <td className="py-2 px-3">5² = 25 sq units</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Perimeter</td>
                  <td className="py-2 px-3 font-mono">P = 4s</td>
                  <td className="py-2 px-3">4 × 5 = 20 units</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Diagonal</td>
                  <td className="py-2 px-3 font-mono">d = s√2</td>
                  <td className="py-2 px-3">5 × 1.414 = 7.07 units</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Side from Area</td>
                  <td className="py-2 px-3 font-mono">s = √A</td>
                  <td className="py-2 px-3">√25 = 5 units</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Side from Perimeter</td>
                  <td className="py-2 px-3 font-mono">s = P/4</td>
                  <td className="py-2 px-3">20/4 = 5 units</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Square Properties</CardTitle>
          <CardDescription>What makes a square special</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Four Equal Sides</h4>
                <p className="text-sm text-muted-foreground">All sides have the same length, making squares a special type of rhombus.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Four Right Angles</h4>
                <p className="text-sm text-muted-foreground">Each corner measures exactly 90 degrees, making squares a special type of rectangle.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Equal Diagonals</h4>
                <p className="text-sm text-muted-foreground">Both diagonals are the same length and bisect each other at 90 degrees.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Lines of Symmetry</h4>
                <p className="text-sm text-muted-foreground">Squares have four lines of symmetry: two through opposite sides and two through opposite corners.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Rotational Symmetry</h4>
                <p className="text-sm text-muted-foreground">A square looks the same after 90°, 180°, 270°, and 360° rotations.</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Square Applications</CardTitle>
          <CardDescription>Where square calculations matter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-semibold">Field</th>
                  <th className="text-left py-2 px-3 font-semibold">Application</th>
                  <th className="text-left py-2 px-3 font-semibold">What to Calculate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3">Construction</td>
                  <td className="py-2 px-3">Floor tiles, ceiling tiles</td>
                  <td className="py-2 px-3">Area for material quantity, perimeter for edging</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Gardening</td>
                  <td className="py-2 px-3">Raised beds, lawn sections</td>
                  <td className="py-2 px-3">Area for soil/mulch, perimeter for borders</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Crafts</td>
                  <td className="py-2 px-3">Quilting, scrapbooking</td>
                  <td className="py-2 px-3">Cutting squares to exact sizes</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Real Estate</td>
                  <td className="py-2 px-3">Room measurements</td>
                  <td className="py-2 px-3">Square footage for pricing</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Manufacturing</td>
                  <td className="py-2 px-3">Sheet metal, fabric cutting</td>
                  <td className="py-2 px-3">Minimize waste by optimizing square cuts</td>
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
            <h4 className="font-semibold text-sm mb-1">How do you calculate the area of a square?</h4>
            <p className="text-sm text-muted-foreground">
              Multiply the side length by itself: Area = s². If one side is 6 inches, the area is 36 square inches. This works because a square's length equals its width.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">How do you find the diagonal of a square?</h4>
            <p className="text-sm text-muted-foreground">
              Use the formula diagonal = side × √2. The diagonal creates two right triangles inside the square, and by the Pythagorean theorem, d² = s² + s² = 2s², so d = s√2.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">What's the difference between area and perimeter?</h4>
            <p className="text-sm text-muted-foreground">
              Area measures the space inside the square (square units). Perimeter measures the distance around the outside (linear units). A 4×4 square has area 16 sq units and perimeter 16 units – same number but different meanings.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Can I find the side length if I know the area?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Take the square root of the area: side = √area. If the area is 64 square meters, the side length is √64 = 8 meters.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Is a square a rectangle?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, a square is a special type of rectangle where all sides are equal. All squares are rectangles, but not all rectangles are squares. A square is also a special type of rhombus with right angles.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/calculators/rectangle-area-calculator" className="text-primary hover:underline">
                Rectangle Area Calculator
              </a>
              <span className="text-muted-foreground ml-2">– Calculate area and perimeter of rectangles</span>
            </li>
            <li>
              <a href="/calculators/triangle-area-calculator" className="text-primary hover:underline">
                Triangle Area Calculator
              </a>
              <span className="text-muted-foreground ml-2">– Find area from base and height</span>
            </li>
            <li>
              <a href="/calculators/circle-area-calculator" className="text-primary hover:underline">
                Circle Area Calculator
              </a>
              <span className="text-muted-foreground ml-2">– Calculate circle area and circumference</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
