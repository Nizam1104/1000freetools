"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VolumeOfPyramidCalculator() {
  const [baseLength, setBaseLength] = useState<string>("");
  const [baseWidth, setBaseWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<{ volume: number; baseArea: number } | null>(null);

  const calculate = () => {
    const l = parseFloat(baseLength);
    const w = parseFloat(baseWidth);
    const h = parseFloat(height);
    if (!isNaN(l) && !isNaN(w) && !isNaN(h) && l > 0 && w > 0 && h > 0) {
      const baseArea = l * w;
      setResult({
        volume: (1/3) * baseArea * h,
        baseArea
      });
    }
  };

  const reset = () => {
    setBaseLength("");
    setBaseWidth("");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Base Length (l)</label>
                <Input
                  type="number"
                  placeholder="e.g., 6"
                  step="any"
                  min="0"
                  value={baseLength}
                  onChange={(e) => setBaseLength(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Base Width (w)</label>
                <Input
                  type="number"
                  placeholder="e.g., 4"
                  step="any"
                  min="0"
                  value={baseWidth}
                  onChange={(e) => setBaseWidth(e.target.value)}
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
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Volume (⅓Bh)</p>
                  <p className="text-2xl font-semibold">{result.volume.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Base Area</p>
                  <p className="text-lg">{result.baseArea.toFixed(4)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Pyramid Volume</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Base Dimensions</h3>
              <p className="text-sm text-muted-foreground">Input the length and width of the rectangular base of the pyramid.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Input Height</h3>
              <p className="text-sm text-muted-foreground">Enter the perpendicular height from the base to the apex (top point).</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Instant Results</h3>
              <p className="text-sm text-muted-foreground">Click calculate to see the volume and base area computed instantly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Key Features of This Pyramid Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">**Accurate Formula**</h3>
            <p className="text-sm text-muted-foreground">Uses V = ⅓ × Base Area × Height for precise volume calculations.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Rectangular Base Support**</h3>
            <p className="text-sm text-muted-foreground">Handles any rectangular base - squares, rectangles, and everything in between.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**4 Decimal Precision**</h3>
            <p className="text-sm text-muted-foreground">Results shown to 4 decimal places for engineering and academic accuracy.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Free & Easy to Use**</h3>
            <p className="text-sm text-muted-foreground">No signup required. Simple interface gets you results in seconds.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is the formula for pyramid volume?</h3>
            <p className="text-sm text-muted-foreground">The volume of a pyramid is V = ⅓Bh, where B is the base area and h is the height. For a rectangular base, B = length × width, so V = ⅓ × l × w × h.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Why is pyramid volume one-third of a prism?</h3>
            <p className="text-sm text-muted-foreground">A pyramid with the same base and height as a prism occupies exactly one-third of the prism&apos;s volume. This is a fundamental geometric relationship proven by calculus.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is the difference between height and slant height?</h3>
            <p className="text-sm text-muted-foreground">Height is the perpendicular distance from base to apex. Slant height is the distance along the triangular face from base edge to apex. This calculator uses perpendicular height.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Where are pyramid calculations used?</h3>
            <p className="text-sm text-muted-foreground">Pyramid volume is used in architecture (roof design, monuments), construction (hoppers, silos), packaging (pyramid-shaped containers), and mathematics education.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Can this calculate square pyramid volume?</h3>
            <p className="text-sm text-muted-foreground">Yes! For a square pyramid, simply enter the same value for both length and width. A square is a special case of a rectangle.</p>
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
          <a href="/calculators/volume-of-cylinder-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Volume of Cylinder Calculator</h3>
            <p className="text-sm text-muted-foreground">Find volume and surface area of cylinders for tanks and pipes.</p>
          </a>
          <a href="/calculators/triangle-area-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Triangle Area Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate the area of triangles for geometry and construction projects.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
