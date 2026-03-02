"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      </div>
    </div>
  );
}
