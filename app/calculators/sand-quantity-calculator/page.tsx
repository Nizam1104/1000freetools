"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SandQuantityCalculatorPage() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [depth, setDepth] = useState<string>("");
  const [lengthUnit, setLengthUnit] = useState<string>("m");
  const [depthUnit, setDepthUnit] = useState<string>("cm");
  const [result, setResult] = useState<{
    volumeM3: number;
    volumeFt3: number;
    weightKg: number;
    weightTons: number;
    bags: number;
  } | null>(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth);

    if (isNaN(l) || isNaN(w) || isNaN(d)) return;

    // Convert to meters
    let lengthM = l;
    let widthM = w;
    let depthM = d;

    if (lengthUnit === "ft") {
      lengthM = l * 0.3048;
      widthM = w * 0.3048;
    } else if (lengthUnit === "cm") {
      lengthM = l / 100;
      widthM = w / 100;
    }

    if (depthUnit === "m") {
      depthM = d;
    } else if (depthUnit === "mm") {
      depthM = d / 1000;
    } else if (depthUnit === "in") {
      depthM = d * 0.0254;
    }

    // Calculate volume in cubic meters
    const volumeM3 = lengthM * widthM * depthM;
    const volumeFt3 = volumeM3 * 35.3147;

    // Sand density: approximately 1600 kg/m³ (dry sand)
    const weightKg = volumeM3 * 1600;
    const weightTons = weightKg / 1000;

    // Assuming 25kg bags
    const bags = Math.ceil(weightKg / 25);

    setResult({
      volumeM3: Math.round(volumeM3 * 1000) / 1000,
      volumeFt3: Math.round(volumeFt3 * 100) / 100,
      weightKg: Math.round(weightKg),
      weightTons: Math.round(weightTons * 100) / 100,
      bags
    });
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setDepth("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Sand Quantity Calculator – Calculate How Much Sand You Need for Construction</h1>
          <p className="text-muted-foreground">
            Avoid material shortages and over-ordering with our Sand Quantity Calculator. Enter the area and depth of your project to calculate the exact volume and weight of sand required in cubic meters, cubic feet, or tons.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="length">Length</Label>
                  <Input
                    id="length"
                    type="number"
                    placeholder="Enter length"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  />
                </div>
                <Select value={lengthUnit} onValueChange={setLengthUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">Meters</SelectItem>
                    <SelectItem value="ft">Feet</SelectItem>
                    <SelectItem value="cm">Centimeters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder="Enter width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                </div>
                <Select value={lengthUnit} onValueChange={setLengthUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">Meters</SelectItem>
                    <SelectItem value="ft">Feet</SelectItem>
                    <SelectItem value="cm">Centimeters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="depth">Depth</Label>
                  <Input
                    id="depth"
                    type="number"
                    placeholder="Enter depth"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                  />
                </div>
                <Select value={depthUnit} onValueChange={setDepthUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">Centimeters</SelectItem>
                    <SelectItem value="m">Meters</SelectItem>
                    <SelectItem value="mm">Millimeters</SelectItem>
                    <SelectItem value="in">Inches</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-muted-foreground">Volume (m³)</p>
                      <p className="text-xl font-bold text-primary">{result.volumeM3}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-muted-foreground">Volume (ft³)</p>
                      <p className="text-xl font-bold text-primary">{result.volumeFt3}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Weight (kg)</p>
                      <p className="text-xl font-semibold">{result.weightKg}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Weight (tons)</p>
                      <p className="text-xl font-semibold">{result.weightTons}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Estimated Bags (25kg each)</p>
                    <p className="text-2xl font-bold text-primary">{result.bags} bags</p>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-1">Pro Tip:</p>
                    <p className="text-sm">Order 10-15% extra sand to account for compaction and waste during construction.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter dimensions and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How to Calculate Sand Quantity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <p className="font-semibold mb-1">Measure the area</p>
                <p className="text-sm text-muted-foreground">Enter the length and width of the area to be filled with sand.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <p className="font-semibold mb-1">Set the depth</p>
                <p className="text-sm text-muted-foreground">Input how deep you want the sand layer in cm, mm, meters, or inches.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <p className="font-semibold mb-1">Get quantity estimates</p>
                <p className="text-sm text-muted-foreground">Receive volume in cubic meters and feet, plus weight and bag count.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Why Use This Sand Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">Accurate material orders</p>
                <p className="text-sm text-muted-foreground">Prevents over-ordering or running short during construction.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Multiple unit options</p>
                <p className="text-sm text-muted-foreground">Work in meters, feet, centimeters, or inches as needed.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Weight and volume</p>
                <p className="text-sm text-muted-foreground">Get both cubic meters and tons for delivery planning.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Bag estimates</p>
                <p className="text-sm text-muted-foreground">See how many 25kg bags you need for smaller projects.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Budget planning</p>
                <p className="text-sm text-muted-foreground">Know exact quantities before getting quotes from suppliers.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">How do I calculate how much sand I need?</p>
                <p className="text-sm text-muted-foreground">Multiply length × width × depth. For a 3m × 2m area at 10cm deep: 3 × 2 × 0.1 = 0.6 cubic meters.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">How much does sand weigh?</p>
                <p className="text-sm text-muted-foreground">Dry sand weighs about 1600 kg per cubic meter. Wet sand is heavier at around 1900 kg/m³.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">How many bags of sand do I need?</p>
                <p className="text-sm text-muted-foreground">Divide total weight by bag size. For 960kg needed with 25kg bags: 960 / 25 = 39 bags.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Should I order extra sand?</p>
                <p className="text-sm text-muted-foreground">Yes, add 10-15% for compaction, settling, and waste during installation.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">What type of sand for construction?</p>
                <p className="text-sm text-muted-foreground">Use sharp sand for concrete, building sand for mortar, and play sand for sandboxes.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Related Construction Calculators</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Try our other building tools: the <a href="/calculators/concrete-volume-calculator" className="text-primary hover:underline">concrete volume calculator</a> for foundations, the <a href="/calculators/gravel-quantity-calculator" className="text-primary hover:underline">gravel quantity calculator</a> for landscaping, and the <a href="/calculators/asphalt-quantity-calculator" className="text-primary hover:underline">asphalt quantity calculator</a> for paving projects.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
