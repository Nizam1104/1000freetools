"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VolumeOfCylinderCalculator() {
  const [radius, setRadius] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<{ volume: number; lateralArea: number; totalArea: number } | null>(null);

  const calculate = () => {
    const r = parseFloat(radius);
    const h = parseFloat(height);
    if (!isNaN(r) && !isNaN(h) && r > 0 && h > 0) {
      setResult({
        volume: Math.PI * r * r * h,
        lateralArea: 2 * Math.PI * r * h,
        totalArea: 2 * Math.PI * r * (r + h)
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
                placeholder="e.g., 10"
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
                  <p className="text-sm text-muted-foreground">Volume (πr²h)</p>
                  <p className="text-2xl font-semibold">{result.volume.toFixed(4)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Lateral Area</p>
                    <p className="text-lg">{result.lateralArea.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Surface Area</p>
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
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Cylinder Volume</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Radius</h3>
              <p className="text-sm text-muted-foreground">Input the radius of the circular base of the cylinder in your preferred unit.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Input Height</h3>
              <p className="text-sm text-muted-foreground">Enter the height (length) of the cylinder from base to top.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Complete Results</h3>
              <p className="text-sm text-muted-foreground">Click calculate to see volume, lateral area, and total surface area instantly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Key Features of This Cylinder Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">**Complete Calculations**</h3>
            <p className="text-sm text-muted-foreground">Computes volume, lateral surface area, and total surface area in one calculation.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Accurate Formulas**</h3>
            <p className="text-sm text-muted-foreground">Uses V = πr²h for volume and proper geometric formulas for all measurements.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**4 Decimal Precision</h3>
            <p className="text-sm text-muted-foreground">Results shown to 4 decimal places for engineering and academic accuracy.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Free & Instant**</h3>
            <p className="text-sm text-muted-foreground">No registration needed. Get accurate cylinder calculations immediately.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is the formula for cylinder volume?</h3>
            <p className="text-sm text-muted-foreground">The volume of a cylinder is V = πr²h, where r is the radius of the base and h is the height. This formula calculates the space inside the cylinder.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How do I calculate cylinder surface area?</h3>
            <p className="text-sm text-muted-foreground">Total surface area = 2πr(r + h). This includes both circular bases (2πr²) plus the lateral area (2πrh) that wraps around the side.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is lateral area of a cylinder?</h3>
            <p className="text-sm text-muted-foreground">Lateral area is the curved side surface only, calculated as 2πrh. Imagine unrolling the side of a can - that rectangle is the lateral area.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Where are cylinder calculations used?</h3>
            <p className="text-sm text-muted-foreground">Cylinder calculations are used for water tanks, pipes, engine cylinders, storage drums, beverage cans, hydraulic systems, and construction columns.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Can I use diameter instead of radius?</h3>
            <p className="text-sm text-muted-foreground">Yes! Simply divide the diameter by 2 to get the radius. If your cylinder is 10 cm across, the radius is 5 cm.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Related Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/calculators/volume-of-cone-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Volume of Cone Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate volume and surface area of cones for funnels and hoppers.</p>
          </a>
          <a href="/calculators/volume-of-sphere-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Volume of Sphere Calculator</h3>
            <p className="text-sm text-muted-foreground">Find the volume and surface area of spheres for tanks and domes.</p>
          </a>
          <a href="/calculators/water-tank-volume-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Water Tank Volume Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate water tank capacity in gallons or liters for storage planning.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
