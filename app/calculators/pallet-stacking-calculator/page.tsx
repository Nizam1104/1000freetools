"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
                        <div key={i} className={`p-3 rounded-lg ${
                          pattern.boxesPerLayer === result.boxesPerLayer
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
        </div>
      </div>
    </div>
  );
}
