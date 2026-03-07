"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TrapezoidAreaCalculator() {
  const [baseA, setBaseA] = useState<string>("");
  const [baseB, setBaseB] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(baseA);
    const b = parseFloat(baseB);
    const h = parseFloat(height);
    if (!isNaN(a) && !isNaN(b) && !isNaN(h) && a > 0 && b > 0 && h > 0) {
      setResult(((a + b) * h) / 2);
    }
  };

  const reset = () => {
    setBaseA("");
    setBaseB("");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Base 1 (a)</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                step="any"
                min="0"
                value={baseA}
                onChange={(e) => setBaseA(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Base 2 (b)</label>
              <Input
                type="number"
                placeholder="e.g., 6"
                step="any"
                min="0"
                value={baseB}
                onChange={(e) => setBaseB(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Height (h)</label>
              <Input
                type="number"
                placeholder="e.g., 4"
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
                <p className="text-2xl font-semibold">{result.toFixed(4)}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Trapezoid Area</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Base Lengths</h3>
              <p className="text-sm text-muted-foreground">Input the lengths of both parallel sides (bases) of the trapezoid in your preferred unit.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Input Height</h3>
              <p className="text-sm text-muted-foreground">Enter the perpendicular distance between the two parallel bases.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Instant Results</h3>
              <p className="text-sm text-muted-foreground">Click calculate to see the area computed using the trapezoid formula A = ((a + b) × h) / 2.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Key Features of This Trapezoid Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">**Accurate Formula**</h3>
            <p className="text-sm text-muted-foreground">Uses the standard geometric formula A = ((a + b) × h) / 2 for precise area calculations.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Any Unit Support**</h3>
            <p className="text-sm text-muted-foreground">Works with any unit of measurement - inches, feet, meters, centimeters, and more.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Decimal Precision**</h3>
            <p className="text-sm text-muted-foreground">Results displayed to 4 decimal places for accuracy in engineering and construction.</p>
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
            <h3 className="font-semibold mb-2">What is the formula for trapezoid area?</h3>
            <p className="text-sm text-muted-foreground">The area of a trapezoid is calculated as A = ((a + b) × h) / 2, where a and b are the lengths of the parallel bases and h is the height (perpendicular distance between bases).</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is a trapezoid?</h3>
            <p className="text-sm text-muted-foreground">A trapezoid is a four-sided geometric shape (quadrilateral) with exactly one pair of parallel sides. The parallel sides are called bases, and the non-parallel sides are called legs.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How do I find the height of a trapezoid?</h3>
            <p className="text-sm text-muted-foreground">The height is the perpendicular distance between the two parallel bases. It&apos;s not the length of the slanted sides. Measure straight across from one base to the other at a 90-degree angle.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Can this calculator handle irregular trapezoids?</h3>
            <p className="text-sm text-muted-foreground">Yes! As long as you know the two base lengths and the perpendicular height, this calculator works for any trapezoid shape, including right trapezoids and isosceles trapezoids.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Where is trapezoid area used in real life?</h3>
            <p className="text-sm text-muted-foreground">Trapezoid calculations are used in construction (roof areas, land plots), engineering (beam cross-sections), architecture (window designs), and landscaping (garden bed planning).</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
    </div>
  );
}
