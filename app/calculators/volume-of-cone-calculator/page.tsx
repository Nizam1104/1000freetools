"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VolumeOfConeCalculator() {
  const [radius, setRadius] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<{ volume: number; slantHeight: number; lateralArea: number; totalArea: number } | null>(null);

  const calculate = () => {
    const r = parseFloat(radius);
    const h = parseFloat(height);
    if (!isNaN(r) && !isNaN(h) && r > 0 && h > 0) {
      const slantHeight = Math.sqrt(r * r + h * h);
      setResult({
        volume: (1/3) * Math.PI * r * r * h,
        slantHeight,
        lateralArea: Math.PI * r * slantHeight,
        totalArea: Math.PI * r * (r + slantHeight)
      });
    }
  };

  const reset = () => {
    setRadius("");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Volume of Cone Calculator</CardTitle>
          <CardDescription>Calculate volume and surface area of a cone</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Radius (r)</label>
              <Input
                type="number"
                placeholder="e.g., 3"
                step="any"
                min="0"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Height (h)</label>
              <Input
                type="number"
                placeholder="e.g., 8"
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
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Volume (⅓πr²h)</p>
                  <p className="text-2xl font-semibold">{result.volume.toFixed(4)}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Slant Height</p>
                    <p className="text-lg">{result.slantHeight.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lateral Area</p>
                    <p className="text-lg">{result.lateralArea.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Area</p>
                    <p className="text-lg">{result.totalArea.toFixed(4)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Cone Volume</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Radius</h3>
              <p className="text-sm text-muted-foreground">Input the radius of the circular base of the cone in your preferred unit.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Input Height</h3>
              <p className="text-sm text-muted-foreground">Enter the perpendicular height from the base to the apex (tip) of the cone.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Complete Results</h3>
              <p className="text-sm text-muted-foreground">Click calculate to see volume, slant height, lateral area, and total surface area.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Key Features of This Cone Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">**Complete Calculations**</h3>
            <p className="text-sm text-muted-foreground">Computes volume, slant height, lateral surface area, and total surface area in one go.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Accurate Formulas**</h3>
            <p className="text-sm text-muted-foreground">Uses V = ⅓πr²h for volume and proper geometric formulas for all measurements.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**4 Decimal Precision**</h3>
            <p className="text-sm text-muted-foreground">Results shown to 4 decimal places for engineering and academic accuracy.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Free & Instant</h3>
            <p className="text-sm text-muted-foreground">No registration needed. Get accurate cone calculations immediately.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is the formula for the volume of a cone?</h3>
            <p className="text-sm text-muted-foreground">The volume of a cone is V = ⅓πr²h, where r is the radius of the base and h is the height. A cone&apos;s volume is exactly one-third of a cylinder with the same base and height.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How do I find the slant height of a cone?</h3>
            <p className="text-sm text-muted-foreground">The slant height is calculated using the Pythagorean theorem: s = √(r² + h²), where r is the radius and h is the height of the cone.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is the difference between lateral and total surface area?</h3>
            <p className="text-sm text-muted-foreground">Lateral area is just the curved side surface (πrs). Total surface area includes the base: πr(r + s), where s is the slant height.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Where are cone volume calculations used?</h3>
            <p className="text-sm text-muted-foreground">Cone calculations are used in engineering (funnels, hoppers), food industry (ice cream cones, traffic cones), architecture (towers, spires), and mathematics education.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Can this calculator handle oblique cones?</h3>
            <p className="text-sm text-muted-foreground">This calculator is designed for right circular cones where the apex is directly above the center of the base. For oblique cones, the same volume formula applies if you use perpendicular height.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Related Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/calculators/volume-of-cylinder-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Volume of Cylinder Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate volume and surface area of cylinders for tanks and pipes.</p>
          </a>
          <a href="/calculators/volume-of-sphere-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Volume of Sphere Calculator</h3>
            <p className="text-sm text-muted-foreground">Find the volume and surface area of spheres for balls and domes.</p>
          </a>
          <a href="/calculators/volume-of-pyramid-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Volume of Pyramid Calculator</h3>
            <p className="text-sm text-muted-foreground">Compute the volume of rectangular pyramids for architecture and design.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
