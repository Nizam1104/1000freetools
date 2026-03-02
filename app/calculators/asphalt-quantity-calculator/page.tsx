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

interface AsphaltResult {
  area: number;
  depth: number;
  volume: number;
  weight: number;
  tons: number;
  truckLoads: number;
  cost: number;
  recommendations: string[];
}

export default function AsphaltQuantityCalculatorPage() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [depth, setDepth] = useState<string>("");
  const [shape, setShape] = useState<string>("rectangle");
  const [diameter, setDiameter] = useState<string>("");
  const [unit, setUnit] = useState<string>("feet");
  const [pricePerTon, setPricePerTon] = useState<string>("100");
  const [result, setResult] = useState<AsphaltResult | null>(null);

  const calculate = () => {
    const lengthNum = parseFloat(length) || 0;
    const widthNum = parseFloat(width) || 0;
    const depthNum = parseFloat(depth) || 0;
    const diameterNum = parseFloat(diameter) || 0;
    const priceNum = parseFloat(pricePerTon) || 100;

    if (lengthNum === 0 || widthNum === 0 || depthNum === 0) return;

    // Calculate area based on shape
    let areaSqFt = 0;
    
    if (shape === "rectangle") {
      areaSqFt = lengthNum * widthNum;
    } else if (shape === "circle") {
      const radius = diameterNum / 2;
      areaSqFt = Math.PI * Math.pow(radius, 2);
    }

    // Convert depth to feet if needed
    let depthFeet = depthNum;
    if (unit === "inches") {
      depthFeet = depthNum / 12;
    } else if (unit === "cm") {
      depthFeet = depthNum / 30.48;
    }

    // Calculate volume in cubic feet
    const volumeCuFt = areaSqFt * depthFeet;

    // Convert to cubic yards (1 cubic yard = 27 cubic feet)
    const volumeCuYards = volumeCuFt / 27;

    // Asphalt density: ~145-150 lbs per cubic foot (compacted)
    const density = 148;
    const weightLbs = volumeCuFt * density;
    const weightTons = weightLbs / 2000;

    // Truck loads (standard dump truck: 10-14 tons)
    const truckLoads = Math.ceil(weightTons / 12);

    // Cost estimate
    const cost = weightTons * priceNum;

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📐 Area: ${areaSqFt.toFixed(0)} sq ft`);
    recommendations.push(`📊 Volume: ${volumeCuYards.toFixed(2)} cubic yards`);
    recommendations.push(`⚖️ Weight: ${weightTons.toFixed(2)} tons`);
    recommendations.push(`🚛 Truck loads (12 ton): ${truckLoads}`);
    
    if (depthFeet < 0.17) { // Less than 2 inches
      recommendations.push("⚠️ Depth less than 2\" - may not be sufficient for driveways");
    } else if (depthFeet >= 0.17 && depthFeet < 0.33) {
      recommendations.push("✅ 2-4\" depth suitable for residential driveways");
    } else {
      recommendations.push("✅ 4\"+ depth suitable for commercial/heavy traffic");
    }

    recommendations.push("💡 Order 5-10% extra for waste and compaction");
    recommendations.push("🌡️ Asphalt should be laid at 275-300°F");

    setResult({
      area: parseFloat(areaSqFt.toFixed(0)),
      depth: parseFloat(depthFeet.toFixed(2)),
      volume: parseFloat(volumeCuYards.toFixed(2)),
      weight: parseFloat(weightLbs.toFixed(0)),
      tons: parseFloat(weightTons.toFixed(2)),
      truckLoads,
      cost: parseFloat(cost.toFixed(2)),
      recommendations,
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Asphalt Quantity Calculator – Calculate Asphalt Needed for Roads & Driveways
          </h1>
          <p className="text-muted-foreground">
            Accurately estimate asphalt requirements for any paving project with our
            Asphalt Quantity Calculator. Enter the area and compacted depth to calculate
            volume in cubic yards and weight in tons — enabling accurate material
            ordering and cost estimation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shape">Area Shape</Label>
                <Select value={shape} onValueChange={setShape}>
                  <SelectTrigger id="shape">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rectangle">Rectangle/Square</SelectItem>
                    <SelectItem value="circle">Circle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {shape === "rectangle" ? (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="length">Length</Label>
                    <Input
                      id="length"
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <Label htmlFor="diameter">Diameter</Label>
                  <Input
                    id="diameter"
                    type="number"
                    value={diameter}
                    onChange={(e) => setDiameter(e.target.value)}
                    placeholder="0"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="depth">Depth/Thickness</Label>
                  <Input
                    id="depth"
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    placeholder="4"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inches">Inches</SelectItem>
                      <SelectItem value="feet">Feet</SelectItem>
                      <SelectItem value="cm">Centimeters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price per Ton ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={pricePerTon}
                  onChange={(e) => setPricePerTon(e.target.value)}
                  placeholder="100"
                />
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
              <h3 className="text-lg font-semibold mb-4">Asphalt Estimate</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Tons Needed</p>
                      <p className="text-2xl font-bold text-primary">{result.tons}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Estimated Cost</p>
                      <p className="text-2xl font-bold text-primary">${result.cost}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Area:</span>
                      <span className="font-semibold">{result.area} sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Volume:</span>
                      <span className="font-semibold">{result.volume} cu yd</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Weight:</span>
                      <span className="font-semibold">{result.weight} lbs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Truck Loads:</span>
                      <span className="font-semibold">{result.truckLoads}</span>
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
                  <p>Enter dimensions and click Calculate to see estimate</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Asphalt Paving Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Driveways:</strong> 2-4 inches compacted thickness
                  </li>
                  <li>
                    <strong>Parking lots:</strong> 3-5 inches compacted thickness
                  </li>
                  <li>
                    <strong>Roads:</strong> 4-8 inches compacted thickness
                  </li>
                  <li>
                    <strong>Base layer:</strong> 4-6 inches of crushed stone
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Always prepare a proper base before laying asphalt.
                  Poor base preparation is the #1 cause of pavement failure. Order 5-10%
                  extra for waste, spillage, and compaction adjustments.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
