"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VolumeOfSphereCalculator() {
  const [radius, setRadius] = useState<string>("");
  const [result, setResult] = useState<{ volume: number; surfaceArea: number; diameter: number } | null>(null);

  const calculate = () => {
    const r = parseFloat(radius);
    if (!isNaN(r) && r > 0) {
      setResult({
        volume: (4/3) * Math.PI * r * r * r,
        surfaceArea: 4 * Math.PI * r * r,
        diameter: 2 * r
      });
    }
  };

  const reset = () => {
    setRadius("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
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
                  <p className="text-sm text-muted-foreground">Volume (4/3 πr³)</p>
                  <p className="text-2xl font-semibold">{result.volume.toFixed(4)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Surface Area</p>
                    <p className="text-lg">{result.surfaceArea.toFixed(4)}</p>
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

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Sphere Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <p className="font-semibold">Measure the radius</p>
              <p className="text-sm text-muted-foreground">The radius is the distance from the center to any point on the surface. Enter it in any unit (cm, inches, meters).</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <p className="font-semibold">Click Calculate</p>
              <p className="text-sm text-muted-foreground">The calculator instantly computes volume, surface area, and diameter.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <p className="font-semibold">Read your results</p>
              <p className="text-sm text-muted-foreground">Volume is in cubic units, surface area in square units, and diameter in linear units.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Sphere Measurements</CardTitle>
          <CardDescription>Formulas and what they mean</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            A sphere is a perfectly round 3D shape where every point on the surface is the same distance from the center. This symmetry gives spheres unique mathematical properties.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Volume</strong> measures how much space the sphere occupies or how much it can hold. The formula V = 4/3 πr³ was discovered by Archimedes over 2,200 years ago. He proved that a sphere's volume is exactly 2/3 the volume of the cylinder that contains it.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Surface Area</strong> tells you how much material you'd need to cover the sphere. The formula A = 4πr² means the surface area equals four times the area of a circle with the same radius.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Diameter</strong> is the distance across the sphere through its center. It's simply twice the radius. The diameter is the longest possible straight line you can draw inside a sphere.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sphere Formulas Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-semibold">Measurement</th>
                  <th className="text-left py-2 px-3 font-semibold">Formula</th>
                  <th className="text-left py-2 px-3 font-semibold">Example (r=5)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3">Volume</td>
                  <td className="py-2 px-3 font-mono">V = 4/3 πr³</td>
                  <td className="py-2 px-3">4/3 × π × 125 = 523.6</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Surface Area</td>
                  <td className="py-2 px-3 font-mono">A = 4πr²</td>
                  <td className="py-2 px-3">4 × π × 25 = 314.2</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Diameter</td>
                  <td className="py-2 px-3 font-mono">d = 2r</td>
                  <td className="py-2 px-3">2 × 5 = 10</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Circumference</td>
                  <td className="py-2 px-3 font-mono">C = 2πr</td>
                  <td className="py-2 px-3">2 × π × 5 = 31.4</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Radius from Volume</td>
                  <td className="py-2 px-3 font-mono">r = ∛(3V/4π)</td>
                  <td className="py-2 px-3">Cube root of (3V ÷ 4π)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Sphere Applications</CardTitle>
          <CardDescription>Real-world uses of sphere calculations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-semibold mb-2">Engineering and Manufacturing</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Ball bearings – calculate volume for material costs and weight</li>
                <li>Pressure vessels – determine surface area for heat transfer</li>
                <li>Tanks and silos – spherical tanks minimize surface area for given volume</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-semibold mb-2">Science and Astronomy</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Planets and stars – calculate volume and density of celestial bodies</li>
                <li>Atoms and molecules – model atomic structure as spheres</li>
                <li>Droplets and bubbles – surface tension creates spherical shapes</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-semibold mb-2">Sports and Recreation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Ball specifications – official sizes for basketballs, soccer balls, etc.</li>
                <li>Inflatable products – calculate air volume needed</li>
                <li>Pool and spa design – spherical hot tubs and features</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-semibold mb-2">Food and Packaging</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Spherical candies and chocolates – volume for recipe scaling</li>
                <li>Fruit sizing – oranges, apples, and melons approximated as spheres</li>
                <li>Packaging design – spherical containers for products</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interesting Sphere Facts</CardTitle>
          <CardDescription>Why spheres are mathematically special</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Minimum Surface Area</h4>
                <p className="text-sm text-muted-foreground">For any given volume, a sphere has the smallest possible surface area. This is why soap bubbles are spherical – surface tension minimizes area.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">No Edges or Corners</h4>
                <p className="text-sm text-muted-foreground">A sphere has no vertices, edges, or flat faces. It's the only 3D shape with constant curvature everywhere on its surface.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Archimedes' Discovery</h4>
                <p className="text-sm text-muted-foreground">Archimedes proved that a sphere's volume is 2/3 that of its circumscribed cylinder. He was so proud of this discovery he requested it be carved on his tombstone.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Natural Occurrence</h4>
                <p className="text-sm text-muted-foreground">Spheres appear throughout nature: planets, stars, atoms, water droplets, and many fruits. Gravity and surface tension both favor spherical shapes.</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-1">What is the formula for sphere volume?</h4>
            <p className="text-sm text-muted-foreground">
              Volume = 4/3 × π × r³, where r is the radius. This means you cube the radius, multiply by pi, then multiply by 4/3. For a sphere with radius 3, volume = 4/3 × π × 27 = 36π ≈ 113.1 cubic units.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">How do you calculate sphere surface area?</h4>
            <p className="text-sm text-muted-foreground">
              Surface Area = 4 × π × r². Square the radius, multiply by pi, then multiply by 4. Interestingly, this equals the lateral surface area of a cylinder with the same radius and height equal to the diameter.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">What's the difference between radius and diameter?</h4>
            <p className="text-sm text-muted-foreground">
              The radius is the distance from the center to the surface. The diameter is the distance across the sphere through the center. Diameter always equals 2 times the radius.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Can I find the radius if I know the volume?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Rearrange the volume formula: r = ∛(3V/4π). Take the volume, multiply by 3, divide by 4π, then take the cube root. This gives you the radius.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Why is there a 4/3 in the volume formula?</h4>
            <p className="text-sm text-muted-foreground">
              The 4/3 comes from calculus integration of circular cross-sections. Archimedes discovered it geometrically by comparing spheres to cylinders and cones. The factor ensures the volume calculation accounts for the sphere's curved shape.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
