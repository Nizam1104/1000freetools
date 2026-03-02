"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Fish, Info, Droplets, Ruler } from "lucide-react";

interface AquariumResult {
  volumeGallons: number;
  volumeLiters: number;
  surfaceArea: number;
  fishCapacity: string;
  waterWeight: number;
}

export default function AquariumVolumeCalculatorPage() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [waterLevel, setWaterLevel] = useState<string>("");
  const [unit, setUnit] = useState<"inches" | "cm">("inches");
  const [shape, setShape] = useState<"rectangular" | "cylinder">("rectangular");
  const [diameter, setDiameter] = useState<string>("");
  const [result, setResult] = useState<AquariumResult | null>(null);

  const calculateVolume = () => {
    let len = parseFloat(length);
    let wid = parseFloat(width);
    let hgt = parseFloat(height);
    let water = parseFloat(waterLevel) || hgt;
    let dia = parseFloat(diameter);

    if (isNaN(len) || isNaN(wid) || isNaN(hgt)) return;

    let volumeCubicInches: number;
    let surfaceAreaSqInches: number;

    if (shape === "cylinder") {
      if (isNaN(dia)) return;
      const radius = dia / 2;
      volumeCubicInches = Math.PI * radius * radius * water;
      surfaceAreaSqInches = Math.PI * radius * radius;
    } else {
      volumeCubicInches = len * wid * water;
      surfaceAreaSqInches = len * wid;
    }

    if (unit === "cm") {
      volumeCubicInches *= 0.0610237;
      surfaceAreaSqInches *= 0.155;
    }

    const volumeGallons = volumeCubicInches * 0.00372094;
    const volumeLiters = volumeGallons * 3.78541;
    const waterWeight = volumeGallons * 8.34;

    let fishCapacity: string;
    const inchesOfFish = volumeGallons;
    if (inchesOfFish < 5) {
      fishCapacity = "Too small for fish (consider betta or shrimp)";
    } else if (inchesOfFish < 20) {
      fishCapacity = `${Math.round(inchesOfFish)} inches of small fish (e.g., neon tetras)`;
    } else if (inchesOfFish < 55) {
      fishCapacity = `${Math.round(inchesOfFish * 0.8)} inches of medium fish`;
    } else {
      fishCapacity = `${Math.round(inchesOfFish * 0.6)} inches of larger fish`;
    }

    setResult({
      volumeGallons: Math.round(volumeGallons * 10) / 10,
      volumeLiters: Math.round(volumeLiters * 10) / 10,
      surfaceArea: Math.round(surfaceAreaSqInches * 100) / 100,
      fishCapacity,
      waterWeight: Math.round(waterWeight * 10) / 10,
    });
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setHeight("");
    setWaterLevel("");
    setDiameter("");
    setResult(null);
  };

  useEffect(() => {
    calculateVolume();
  }, [length, width, height, waterLevel, diameter, unit, shape]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Aquarium Volume Calculator – Calculate Fish Tank Water Capacity</h1>
          <p className="text-muted-foreground">
            Calculate your aquarium's water volume instantly with our free Aquarium Volume Calculator. Enter tank dimensions to find gallons, liters, and recommended fish capacity — essential for proper stocking and water treatment.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Tank Shape & Dimensions</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shape">Tank Shape</Label>
                    <Select value={shape} onValueChange={(v) => setShape(v as "rectangular" | "cylinder")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rectangular">Rectangular</SelectItem>
                        <SelectItem value="cylinder">Cylindrical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={unit} onValueChange={(v) => setUnit(v as "inches" | "cm")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inches">Inches</SelectItem>
                        <SelectItem value="cm">Centimeters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {shape === "rectangular" ? (
                  <div className="grid sm:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="length">Length</Label>
                      <Input
                        id="length"
                        type="number"
                        placeholder={unit === "inches" ? "e.g., 36" : "e.g., 90"}
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="width">Width</Label>
                      <Input
                        id="width"
                        type="number"
                        placeholder={unit === "inches" ? "e.g., 18" : "e.g., 45"}
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder={unit === "inches" ? "e.g., 20" : "e.g., 50"}
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="diameter">Diameter</Label>
                      <Input
                        id="diameter"
                        type="number"
                        placeholder={unit === "inches" ? "e.g., 18" : "e.g., 45"}
                        value={diameter}
                        onChange={(e) => setDiameter(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height-cyl">Height</Label>
                      <Input
                        id="height-cyl"
                        type="number"
                        placeholder={unit === "inches" ? "e.g., 24" : "e.g., 60"}
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="waterLevel">Water Level (optional)</Label>
                <Input
                  id="waterLevel"
                  type="number"
                  placeholder="Leave empty for full tank"
                  value={waterLevel}
                  onChange={(e) => setWaterLevel(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Typically fill to 1-2 inches below the rim
                </p>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Fish capacity follows the "1 inch of fish per gallon" rule for small fish. Larger fish require more space.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateVolume} className="flex-1">
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
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Water Volume</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold text-primary">{result.volumeGallons} gal</p>
                      <p className="text-lg text-muted-foreground">({result.volumeLiters} L)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Droplets className="h-3 w-3" />
                        Water Weight
                      </p>
                      <p className="text-lg font-bold">{result.waterWeight} lbs</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Ruler className="h-3 w-3" />
                        Surface Area
                      </p>
                      <p className="text-lg font-bold">{result.surfaceArea} in²</p>
                    </div>
                  </div>

                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Fish className="h-4 w-4 text-green-500" />
                      <p className="text-sm font-semibold text-green-500">Fish Capacity</p>
                    </div>
                    <p className="text-sm">{result.fishCapacity}</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formulas:</strong></p>
                    <p className="font-mono text-xs mt-1">Rectangular: L × W × H</p>
                    <p className="font-mono text-xs">Cylinder: π × r² × h</p>
                    <p className="font-mono text-xs">1 cubic inch = 0.00372 gallons</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Fish className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter tank dimensions to calculate volume</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Fish className="h-5 w-5" />
              Aquarium Stocking Guidelines
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2">General Rules:</h4>
                <ul className="space-y-2">
                  <li>• <strong>1 inch per gallon:</strong> For small fish (tetras, guppies)</li>
                  <li>• <strong>1 inch per 2 gallons:</strong> For medium fish (angelfish, gouramis)</li>
                  <li>• <strong>1 inch per 3+ gallons:</strong> For large fish (cichlids, goldfish)</li>
                  <li>• Consider filtration capacity and swimming space</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Important Considerations:</h4>
                <ul className="space-y-2">
                  <li>• Account for decorations displacing water</li>
                  <li>• Surface area affects oxygen exchange</li>
                  <li>• Some fish need schools/groups</li>
                  <li>• Research adult size, not juvenile size</li>
                  <li>• Consider territorial behavior</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
