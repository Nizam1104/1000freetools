"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CircleAreaCalculator() {
  const [radius, setRadius] = useState<string>("");
  const [result, setResult] = useState<{ area: number; circumference: number; diameter: number } | null>(null);

  const calculate = () => {
    const r = parseFloat(radius);
    if (!isNaN(r) && r > 0) {
      setResult({
        area: Math.PI * r * r,
        circumference: 2 * Math.PI * r,
        diameter: 2 * r
      });
    }
  };

  const reset = () => {
    setRadius("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Radius (r)</label>
              <Input
                type="number"
                placeholder="e.g., 5"
                step="any"
                min="0"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Area (πr²)</p>
                  <p className="text-2xl font-semibold">{result.area.toFixed(4)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Circumference</p>
                    <p className="text-lg">{result.circumference.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Diameter</p>
                    <p className="text-lg">{result.diameter.toFixed(4)}</p>
                  </div>
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
              How to Use This Circle Area Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the radius of the circle</p>
                  <p>The radius is the distance from the center to any point on the edge. Enter any positive number in your preferred unit (inches, cm, meters, etc.).</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Calculate</p>
                  <p>The calculator instantly computes the area using the formula A = pi r squared, plus the circumference and diameter.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Review all circle measurements</p>
                  <p>Results show area in square units, circumference (perimeter), and diameter. All values update automatically when you change the radius.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Circle Measurements Reference Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Radius</th>
                    <th className="text-left py-3 px-2 font-semibold">Diameter</th>
                    <th className="text-left py-3 px-2 font-semibold">Circumference</th>
                    <th className="text-left py-3 px-2 font-semibold">Area</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2">2</td>
                    <td className="py-3 px-2">6.283</td>
                    <td className="py-3 px-2">3.142</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">2</td>
                    <td className="py-3 px-2">4</td>
                    <td className="py-3 px-2">12.566</td>
                    <td className="py-3 px-2">12.566</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">3</td>
                    <td className="py-3 px-2">6</td>
                    <td className="py-3 px-2">18.850</td>
                    <td className="py-3 px-2">28.274</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">4</td>
                    <td className="py-3 px-2">8</td>
                    <td className="py-3 px-2">25.133</td>
                    <td className="py-3 px-2">50.265</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">5</td>
                    <td className="py-3 px-2">10</td>
                    <td className="py-3 px-2">31.416</td>
                    <td className="py-3 px-2">78.540</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">10</td>
                    <td className="py-3 px-2">20</td>
                    <td className="py-3 px-2">62.832</td>
                    <td className="py-3 px-2">314.159</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">20</td>
                    <td className="py-3 px-2">40</td>
                    <td className="py-3 px-2">125.664</td>
                    <td className="py-3 px-2">1256.637</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Values are shown to 3 decimal places. Units depend on your input (if radius is in cm, area is in cm squared).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Circle Formulas and Concepts
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Area Formula: A = pi r squared</h4>
                <p>
                  The area of a circle equals pi times the radius squared. Pi (approximately 3.14159) is the ratio of circumference to diameter for any circle. This formula has been known since ancient times. Archimedes proved it by approximating circles with polygons.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Circumference Formula: C = 2 pi r</h4>
                <p>
                  The circumference (perimeter) of a circle equals 2 times pi times the radius. Since diameter equals 2r, you can also write this as C = pi d. The circumference is always a bit more than 3 times the diameter.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Diameter and Radius Relationship</h4>
                <p>
                  The diameter is always twice the radius. The radius extends from center to edge. The diameter spans edge to edge through the center. All radii of a circle have equal length. All diameters of a circle have equal length.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Real-World Applications
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Construction and landscaping</p>
                  <p>Calculate materials for circular patios, round foundations, or circular gardens. Find how much edging material you need (circumference) and how much surface area to cover.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Manufacturing and engineering</p>
                  <p>Determine material requirements for circular parts, calculate cross-sectional areas of pipes and wires, or find the surface area of cylindrical objects.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Education and homework</p>
                  <p>Students learning geometry can verify their calculations and understand the relationships between radius, diameter, circumference, and area.</p>
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
                <h4 className="font-medium text-foreground mb-2">What is pi and why is it used?</h4>
                <p>
                  Pi is a mathematical constant approximately equal to 3.14159. It represents the ratio of any circle&apos;s circumference to its diameter. Pi is irrational, meaning its decimal representation never ends or repeats. It appears in formulas for circles, spheres, waves, and many areas of mathematics and physics.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I find the radius if I know the area?</h4>
                <p>
                  Rearrange the area formula: r = square root of (A / pi). For example, if area is 78.54 square units, divide by pi to get 25, then take the square root to find radius equals 5 units.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What&apos;s the difference between circumference and perimeter?</h4>
                <p>
                  Perimeter is the general term for the distance around any shape. Circumference specifically refers to the perimeter of a circle. For polygons, we say perimeter. For circles, we say circumference.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I use diameter instead of radius?</h4>
                <p>
                  Yes. Since diameter equals 2 times radius, you can use A = pi times (d/2) squared, which simplifies to A = (pi times d squared) / 4. Many people find it easier to measure diameter directly.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why does area use square units?</h4>
                <p>
                  Area measures two-dimensional space. When you multiply radius by radius (r squared), you&apos;re multiplying length times length, which gives square units. If radius is in meters, area is in square meters.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
