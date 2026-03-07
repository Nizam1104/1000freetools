"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PalletResult {
  palletSize: string;
  boxDimensions: { length: number; width: number; height: number };
  maxStackHeight: number;
  boxesPerLayer: number;
  layers: number;
  totalBoxes: number;
  palletWeight: number;
  utilizationRate: number;
  patterns: Array<{ name: string; boxesPerLayer: number; description: string }>;
  recommendations: string[];
}

export default function PalletStackingCalculatorPage() {
  const [boxLength, setBoxLength] = useState<string>("");
  const [boxWidth, setBoxWidth] = useState<string>("");
  const [boxHeight, setBoxHeight] = useState<string>("");
  const [boxWeight, setBoxWeight] = useState<string>("");
  const [palletSize, setPalletSize] = useState<string>("standard");
  const [maxStackHeight, setMaxStackHeight] = useState<string>("180");
  const [palletWeight, setPalletWeight] = useState<string>("25");
  const [maxLoadWeight, setMaxLoadWeight] = useState<string>("1500");
  const [result, setResult] = useState<PalletResult | null>(null);

  const calculate = () => {
    const boxL = parseFloat(boxLength) || 0;
    const boxW = parseFloat(boxWidth) || 0;
    const boxH = parseFloat(boxHeight) || 0;
    const boxWgt = parseFloat(boxWeight) || 0;
    const maxH = parseFloat(maxStackHeight) || 180;
    const palletWgt = parseFloat(palletWeight) || 25;
    const maxLoad = parseFloat(maxLoadWeight) || 1500;

    if (boxL === 0 || boxW === 0 || boxH === 0) return;

    // Pallet dimensions (cm)
    const palletSizes: Record<string, { length: number; width: number; name: string }> = {
      standard: { length: 120, width: 100, name: "Standard (120×100cm)" },
      euro: { length: 120, width: 80, name: "Euro (120×80cm)" },
      us: { length: 122, width: 102, name: "US (48×40 inch)" },
      half: { length: 80, width: 60, name: "Half (80×60cm)" },
    };

    const pallet = palletSizes[palletSize] || palletSizes.standard;

    // Calculate boxes per layer (simple grid pattern)
    // Pattern 1: Length along pallet length
    const boxesLL = Math.floor(pallet.length / boxL);
    const boxesLW = Math.floor(pallet.width / boxW);
    const pattern1 = boxesLL * boxesLW;

    // Pattern 2: Rotated 90 degrees
    const boxesRL = Math.floor(pallet.length / boxW);
    const boxesRW = Math.floor(pallet.width / boxL);
    const pattern2 = boxesRL * boxesRW;

    // Pattern 3: Mixed/pinned pattern (approximate)
    const pattern3 = Math.floor((pattern1 + pattern2) / 2 * 1.1);

    const boxesPerLayer = Math.max(pattern1, pattern2, pattern3);

    // Calculate layers based on height
    const layersByHeight = Math.floor(maxH / boxH);

    // Calculate layers based on weight
    const maxBoxesByWeight = Math.floor((maxLoad - palletWgt) / boxWgt);
    const layersByWeight = Math.floor(maxBoxesByWeight / boxesPerLayer);

    // Use the limiting factor
    const layers = Math.min(layersByHeight, layersByWeight);
    const totalBoxes = boxesPerLayer * layers;

    // Total weight
    const totalWeight = totalBoxes * boxWgt + palletWgt;

    // Utilization rate
    const palletArea = pallet.length * pallet.width;
    const boxArea = boxL * boxW;
    const utilizationRate = ((boxesPerLayer * boxArea) / palletArea) * 100;

    // Patterns
    const patterns = [
      { name: "Standard", boxesPerLayer: pattern1, description: "Boxes aligned with pallet length" },
      { name: "Rotated", boxesPerLayer: pattern2, description: "Boxes rotated 90 degrees" },
      { name: "Mixed", boxesPerLayer: pattern3, description: "Alternating pattern for stability" },
    ];

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📦 Total boxes: ${totalBoxes} (${layers} layers × ${boxesPerLayer} per layer)`);
    recommendations.push(`⚖️ Total weight: ${totalWeight}kg (pallet: ${palletWgt}kg, boxes: ${totalBoxes * boxWgt}kg)`);
    recommendations.push(`📊 Pallet utilization: ${utilizationRate.toFixed(1)}%`);

    if (utilizationRate < 70) {
      recommendations.push("⚠️ Low utilization - consider different box size");
    } else if (utilizationRate >= 85) {
      recommendations.push("✅ Excellent pallet utilization");
    }

    if (layersByWeight < layersByHeight) {
      recommendations.push("⚠️ Weight limit reached before height limit");
    }

    recommendations.push("💡 Use edge protectors for stacked boxes");
    recommendations.push("🎯 Heavier boxes on bottom, lighter on top");

    setResult({
      palletSize: pallet.name,
      boxDimensions: { length: boxL, width: boxW, height: boxH },
      maxStackHeight: maxH,
      boxesPerLayer,
      layers,
      totalBoxes,
      palletWeight: parseFloat(totalWeight.toFixed(1)),
      utilizationRate: parseFloat(utilizationRate.toFixed(1)),
      patterns,
      recommendations,
    });
  };

  const reset = () => {
    setBoxLength("");
    setBoxWidth("");
    setBoxHeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Pallet Stacking Calculator – Maximize Box Quantities Per Pallet
          </h1>
          <p className="text-muted-foreground">
            Optimize pallet loads and reduce shipping costs with our Pallet Stacking Calculator.
            Enter box and pallet dimensions along with maximum stack height to calculate
            optimal arrangement and total boxes per pallet — improving warehouse and
            logistics efficiency.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="box-length">Box L (cm)</Label>
                  <Input
                    id="box-length"
                    type="number"
                    value={boxLength}
                    onChange={(e) => setBoxLength(e.target.value)}
                    placeholder="40"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="box-width">Box W (cm)</Label>
                  <Input
                    id="box-width"
                    type="number"
                    value={boxWidth}
                    onChange={(e) => setBoxWidth(e.target.value)}
                    placeholder="30"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="box-height">Box H (cm)</Label>
                  <Input
                    id="box-height"
                    type="number"
                    value={boxHeight}
                    onChange={(e) => setBoxHeight(e.target.value)}
                    placeholder="25"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="box-weight">Box Weight (kg)</Label>
                <Input
                  id="box-weight"
                  type="number"
                  step="0.1"
                  value={boxWeight}
                  onChange={(e) => setBoxWeight(e.target.value)}
                  placeholder="5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pallet-size">Pallet Size</Label>
                <Select value={palletSize} onValueChange={setPalletSize}>
                  <SelectTrigger id="pallet-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard (120×100cm)</SelectItem>
                    <SelectItem value="euro">Euro (120×80cm)</SelectItem>
                    <SelectItem value="us">US (48×40&quot;)</SelectItem>
                    <SelectItem value="half">Half (80×60cm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="max-height">Max Stack Height (cm)</Label>
                  <Input
                    id="max-height"
                    type="number"
                    value={maxStackHeight}
                    onChange={(e) => setMaxStackHeight(e.target.value)}
                    placeholder="180"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="max-load">Max Load (kg)</Label>
                  <Input
                    id="max-load"
                    type="number"
                    value={maxLoadWeight}
                    onChange={(e) => setMaxLoadWeight(e.target.value)}
                    placeholder="1500"
                  />
                </div>
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
              <h3 className="text-lg font-semibold mb-4">Pallet Load Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Total Boxes</p>
                      <p className="text-3xl font-bold text-primary">{result.totalBoxes}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Total Weight</p>
                      <p className="text-3xl font-bold text-primary">{result.palletWeight}kg</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Per Layer</p>
                      <p className="text-lg font-bold">{result.boxesPerLayer}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Layers</p>
                      <p className="text-lg font-bold">{result.layers}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Utilization</p>
                      <p className="text-lg font-bold">{result.utilizationRate}%</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Stacking Patterns</h4>
                    <div className="space-y-2">
                      {result.patterns.map((pattern, i) => (
                        <div key={i} className={`p-3 rounded-lg ${pattern.boxesPerLayer === result.boxesPerLayer
                            ? "bg-primary/10 border border-primary"
                            : "bg-muted/50"
                          }`}>
                          <div className="flex justify-between">
                            <span className="font-medium">{pattern.name}</span>
                            <span className="font-bold">{pattern.boxesPerLayer} boxes/layer</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{pattern.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter box dimensions and click Calculate to see pallet load</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Pallet Stacking Best Practices
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Weight distribution:</strong> Heaviest boxes on bottom
                  </li>
                  <li>
                    <strong>Interlocking:</strong> Alternate box direction between layers
                  </li>
                  <li>
                    <strong>Overhang:</strong> Keep boxes within pallet edges (max 2cm)
                  </li>
                  <li>
                    <strong>Height limit:</strong> Standard max is 180cm for shipping
                  </li>
                  <li>
                    <strong>Securing:</strong> Use stretch wrap and edge protectors
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Always check carrier-specific pallet requirements
                  before shipping. Some have different height and weight restrictions.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">How to Calculate Pallet Stacking Capacity</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                  <h3 className="font-semibold mb-2">Enter Box Dimensions</h3>
                  <p className="text-sm text-muted-foreground">Input the length, width, height, and weight of your boxes.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                  <h3 className="font-semibold mb-2">Select Pallet Size</h3>
                  <p className="text-sm text-muted-foreground">Choose from standard, euro, US, or half pallet sizes with preset dimensions.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                  <h3 className="font-semibold mb-2">Get Stacking Results</h3>
                  <p className="text-sm text-muted-foreground">View total boxes per pallet, layers, weight, and utilization rate with recommendations.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Key Features of This Pallet Calculator</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Multiple Stacking Patterns
                  </h3>
                  <p className="text-sm text-muted-foreground">Compare standard, rotated, and mixed patterns to find the optimal box arrangement for your pallet.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Weight Limit Calculations
                  </h3>
                  <p className="text-sm text-muted-foreground">Automatically calculates maximum layers based on both height restrictions and weight capacity limits.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Utilization Rate Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground">See what percentage of pallet surface area is used and get alerts for inefficient box sizes.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Standard Pallet Presets
                  </h3>
                  <p className="text-sm text-muted-foreground">Quick-select from common pallet sizes including standard (120×100cm), euro, and US (48×40&quot;).</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Shipping Recommendations
                  </h3>
                  <p className="text-sm text-muted-foreground">Get practical tips for weight distribution, securing loads, and meeting carrier requirements.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions About Pallet Stacking</h2>
              <div className="space-y-4">
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2">How do you calculate boxes per pallet?</h3>
                  <p className="text-sm text-muted-foreground">Divide pallet length by box length and pallet width by box width, then multiply the results. For example: a 120×100cm pallet with 40×30cm boxes fits 3×3=9 boxes per layer. Multiply by the number of layers based on height limits.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2">What is the maximum pallet stacking height?</h3>
                  <p className="text-sm text-muted-foreground">Standard shipping pallets are typically limited to 180cm (72 inches) total height including the pallet itself. Some carriers allow up to 200cm. Always check with your specific freight carrier for their height restrictions.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2">How much weight can a standard pallet hold?</h3>
                  <p className="text-sm text-muted-foreground">Standard wooden pallets can typically support 1,000-1,500kg (2,200-3,300 lbs) when properly loaded. Heavy-duty pallets can hold up to 2,500kg. The actual limit depends on pallet construction and whether it&apos;s static or moving.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2">What is the best pattern for stacking boxes on a pallet?</h3>
                  <p className="text-sm text-muted-foreground">Interlocking or pinwheel patterns provide the best stability by alternating box direction between layers. This prevents vertical columns that can collapse. Edge alignment should keep boxes within the pallet perimeter to prevent damage.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2">How do you calculate pallet utilization?</h3>
                  <p className="text-sm text-muted-foreground">Divide the total area covered by boxes on one layer by the pallet surface area, then multiply by 100. Good utilization is 80% or higher. Low utilization (under 70%) means you may want to consider different box sizes.</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
