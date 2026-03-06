"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RectangleAreaCalculator() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [result, setResult] = useState<{ area: number; perimeter: number; diagonal: number } | null>(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    if (!isNaN(l) && !isNaN(w) && l > 0 && w > 0) {
      setResult({
        area: l * w,
        perimeter: 2 * (l + w),
        diagonal: Math.sqrt(l * l + w * w)
      });
    }
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Length (l)</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                step="any"
                min="0"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Width (w)</label>
              <Input
                type="number"
                placeholder="e.g., 5"
                step="any"
                min="0"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
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

      <div className="mt-8 space-y-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Rectangle Area Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the length</p>
                  <p>Input the longer side of the rectangle. Use any unit — the calculator works with all measurements.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the width</p>
                  <p>Input the shorter side. Both values must be positive numbers.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Get instant results</p>
                  <p>The calculator shows area, perimeter, and diagonal length automatically.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Rectangle Formulas
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="p-4 bg-muted rounded-lg font-mono space-y-2">
                <div><strong>Area:</strong> A = l × w</div>
                <div><strong>Perimeter:</strong> P = 2(l + w)</div>
                <div><strong>Diagonal:</strong> d = √(l² + w²)</div>
              </div>
              <p>
                The area formula multiplies length by width. Perimeter adds all four sides.
                The diagonal uses the Pythagorean theorem since it forms a right triangle.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Rectangle Examples
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-mono text-xs mb-1">Room: 12 ft × 10 ft</p>
                <p className="text-muted-foreground">Area: 120 sq ft | Perimeter: 44 ft | Diagonal: 15.6 ft</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-mono text-xs mb-1">TV Screen: 32" × 18"</p>
                <p className="text-muted-foreground">Area: 576 sq in | Perimeter: 100" | Diagonal: 36.7" (diagonal size)</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-mono text-xs mb-1">Garden Plot: 5 m × 3 m</p>
                <p className="text-muted-foreground">Area: 15 sq m | Perimeter: 16 m | Diagonal: 5.8 m</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-mono text-xs mb-1">Square: 8 cm × 8 cm</p>
                <p className="text-muted-foreground">Area: 64 sq cm | Perimeter: 32 cm | Diagonal: 11.3 cm</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Practical Applications
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">1</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Flooring and Carpet</p>
                  <p>Calculate how much material you need for a rectangular room. Add 10% for waste.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">2</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Paint Coverage</p>
                  <p>Find wall area to estimate paint needed. One gallon typically covers 350-400 sq ft.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">3</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Fencing</p>
                  <p>Use perimeter to determine how much fencing material you need for a rectangular yard.</p>
                </div>
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
                <h4 className="font-medium text-foreground mb-2">Is a square a rectangle?</h4>
                <p>
                  Yes. A square is a special rectangle where all four sides are equal. The same formulas
                  work — just use the same value for length and width.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I find the diagonal of a rectangle?</h4>
                <p>
                  Use the Pythagorean theorem: diagonal = √(length² + width²). The diagonal splits the
                  rectangle into two right triangles.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What units should I use?</h4>
                <p>
                  Any consistent units work. If length and width are in feet, area is in square feet
                  and perimeter is in feet. The calculator does not convert between units.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I use decimals?</h4>
                <p>
                  Yes. Enter decimals like 10.5 or 3.14. The calculator handles fractional measurements
                  and gives precise results.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What if I only know area and one side?</h4>
                <p>
                  Divide area by the known side to find the other. For example, if area is 120 sq ft
                  and length is 12 ft, width = 120 ÷ 12 = 10 ft.
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
                href="/calculators/square-area-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Square Area Calculator</span>
                <p className="text-muted-foreground">Calculate area and perimeter of squares</p>
              </a>
              <a
                href="/calculators/triangle-area-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Triangle Area Calculator</span>
                <p className="text-muted-foreground">Find area of triangles using various methods</p>
              </a>
              <a
                href="/calculators/circle-area-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Circle Area Calculator</span>
                <p className="text-muted-foreground">Calculate circle area, circumference, and diameter</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
