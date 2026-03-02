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

interface GravelResult {
  area: number;
  volume: number;
  volumeCubicYards: number;
  volumeCubicMeters: number;
  weightTons: number;
  weightKg: number;
  bags60lb: number;
  bags80lb: number;
  bags40kg: number;
  estimatedCost: number;
  gravelType: string;
}

export default function GravelQuantityCalculatorPage() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [depth, setDepth] = useState<string>("");
  const [shape, setShape] = useState<string>("rectangle");
  const [diameter, setDiameter] = useState<string>("");
  const [lengthUnit, setLengthUnit] = useState<string>("feet");
  const [gravelType, setGravelType] = useState<string>("crushed");
  const [pricePerTon, setPricePerTon] = useState<string>("50");
  const [result, setResult] = useState<GravelResult | null>(null);

  const calculate = () => {
    const lengthNum = parseFloat(length) || 0;
    const widthNum = parseFloat(width) || 0;
    const depthNum = parseFloat(depth) || 0;
    const diameterNum = parseFloat(diameter) || 0;
    const priceNum = parseFloat(pricePerTon) || 50;

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
    if (lengthUnit === "inches") {
      depthFeet = depthNum / 12;
    } else if (lengthUnit === "cm") {
      depthFeet = depthNum / 30.48;
    } else if (lengthUnit === "meters") {
      depthFeet = depthNum * 3.281;
    }

    // Calculate volume in cubic feet
    const volumeCuFt = areaSqFt * depthFeet;

    // Convert to cubic yards (1 cubic yard = 27 cubic feet)
    const volumeCuYards = volumeCuFt / 27;

    // Convert to cubic meters
    const volumeCuMeters = volumeCuFt * 0.0283168;

    // Calculate weight based on gravel type
    // Density in lbs per cubic foot
    const densities: Record<string, number> = {
      "crushed": 100,      // Crushed stone
      "pea": 95,           // Pea gravel
      "river": 105,        // River rock
      "decomposed": 90,    // Decomposed granite
      "limestone": 110,    // Limestone
      "base": 105,         // Road base
    };

    const density = densities[gravelType] || 100;
    const weightLbs = volumeCuFt * density;
    const weightTons = weightLbs / 2000;
    const weightKg = weightLbs * 0.453592;

    // Calculate bags needed
    const bags60lb = Math.ceil(weightLbs / 60);
    const bags80lb = Math.ceil(weightLbs / 80);
    const bags40kg = Math.ceil(weightKg / 40);

    // Estimated cost
    const estimatedCost = weightTons * priceNum;

    // Gravel type name
    const gravelNames: Record<string, string> = {
      "crushed": "Crushed Stone",
      "pea": "Pea Gravel",
      "river": "River Rock",
      "decomposed": "Decomposed Granite",
      "limestone": "Limestone",
      "base": "Road Base",
    };

    setResult({
      area: parseFloat(areaSqFt.toFixed(1)),
      volume: parseFloat(volumeCuFt.toFixed(2)),
      volumeCubicYards: parseFloat(volumeCuYards.toFixed(2)),
      volumeCubicMeters: parseFloat(volumeCuMeters.toFixed(2)),
      weightTons: parseFloat(weightTons.toFixed(2)),
      weightKg: parseFloat(weightKg.toFixed(0)),
      bags60lb,
      bags80lb,
      bags40kg,
      estimatedCost: parseFloat(estimatedCost.toFixed(2)),
      gravelType: gravelNames[gravelType] || gravelType,
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
            Gravel Quantity Calculator – Calculate Gravel Needed for Driveways & Landscaping
          </h1>
          <p className="text-muted-foreground">
            Estimate the exact amount of gravel for your project with our Gravel Quantity Calculator.
            Enter area dimensions and desired depth to get volume in cubic yards or meters and weight
            in tons — perfect for driveways, garden paths, and construction bases.
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
                  <Label htmlFor="depth">Depth</Label>
                  <Input
                    id="depth"
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="length-unit">Unit</Label>
                  <Select value={lengthUnit} onValueChange={setLengthUnit}>
                    <SelectTrigger id="length-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feet">Feet</SelectItem>
                      <SelectItem value="inches">Inches</SelectItem>
                      <SelectItem value="cm">Centimeters</SelectItem>
                      <SelectItem value="meters">Meters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gravel-type">Gravel Type</Label>
                <Select value={gravelType} onValueChange={setGravelType}>
                  <SelectTrigger id="gravel-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crushed">Crushed Stone</SelectItem>
                    <SelectItem value="pea">Pea Gravel</SelectItem>
                    <SelectItem value="river">River Rock</SelectItem>
                    <SelectItem value="decomposed">Decomposed Granite</SelectItem>
                    <SelectItem value="limestone">Limestone</SelectItem>
                    <SelectItem value="base">Road Base</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price per Ton ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={pricePerTon}
                  onChange={(e) => setPricePerTon(e.target.value)}
                  placeholder="50"
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
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Volume</p>
                      <p className="text-2xl font-bold text-primary">{result.volumeCubicYards} yd³</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="text-2xl font-bold text-primary">{result.weightTons} tons</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Area:</span>
                      <span className="font-semibold">{result.area} sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Volume (cu ft):</span>
                      <span className="font-semibold">{result.volume} ft³</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Volume (metric):</span>
                      <span className="font-semibold">{result.volumeCubicMeters} m³</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Weight (metric):</span>
                      <span className="font-semibold">{result.weightKg} kg</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Bagged Gravel Options</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 bg-muted/50 rounded text-center">
                        <p className="text-xs text-muted-foreground">60 lb bags</p>
                        <p className="text-lg font-bold">{result.bags60lb}</p>
                      </div>
                      <div className="p-2 bg-muted/50 rounded text-center">
                        <p className="text-xs text-muted-foreground">80 lb bags</p>
                        <p className="text-lg font-bold">{result.bags80lb}</p>
                      </div>
                      <div className="p-2 bg-muted/50 rounded text-center">
                        <p className="text-xs text-muted-foreground">40 kg bags</p>
                        <p className="text-lg font-bold">{result.bags40kg}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Estimated Cost:</span>
                      <span className="text-2xl font-bold text-green-700 dark:text-green-300">
                        ${result.estimatedCost}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on ${pricePerTon}/ton for {result.gravelType}
                    </p>
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Gravel Depth Recommendations
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Driveways:</strong> 4-6 inches (10-15 cm)
                  </li>
                  <li>
                    <strong>Walkways/Paths:</strong> 2-3 inches (5-7.5 cm)
                  </li>
                  <li>
                    <strong>Patios:</strong> 3-4 inches (7.5-10 cm)
                  </li>
                  <li>
                    <strong>Landscaping/Ground Cover:</strong> 2-4 inches (5-10 cm)
                  </li>
                  <li>
                    <strong>Drainage/Base Layer:</strong> 4-8 inches (10-20 cm)
                  </li>
                </ul>
                <p className="pt-2">
                  <strong>Tip:</strong> Add 10% extra for compaction and settling.
                  For driveways, consider a layered approach with larger stone at the base.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
