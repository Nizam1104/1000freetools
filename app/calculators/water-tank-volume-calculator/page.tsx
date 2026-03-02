"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WaterTankVolumeCalculatorPage() {
  const [tankShape, setTankShape] = useState<"cylindrical" | "rectangular" | "spherical" | "cone">("cylindrical");
  
  // Cylindrical dimensions
  const [cylDiameter, setCylDiameter] = useState<string>("");
  const [cylHeight, setCylHeight] = useState<string>("");
  
  // Rectangular dimensions
  const [rectLength, setRectLength] = useState<string>("");
  const [rectWidth, setRectWidth] = useState<string>("");
  const [rectHeight, setRectHeight] = useState<string>("");
  
  // Spherical dimensions
  const [sphereDiameter, setSphereDiameter] = useState<string>("");
  
  // Cone dimensions
  const [coneRadius, setConeradius] = useState<string>("");
  const [coneHeight, setConeHeight] = useState<string>("");
  
  const [unit, setUnit] = useState<"meters" | "feet" | "inches" | "cm">("meters");
  const [outputUnit, setOutputUnit] = useState<"liters" | "gallons" | "cubic-meters" | "cubic-feet">("liters");
  const [result, setResult] = useState<{
    volume: number;
    volumeUnit: string;
    cubicMeters: number;
    gallons: number;
    liters: number;
  } | null>(null);

  const calculate = () => {
    let volume: number = 0;
    let dimUnit = unit;

    if (tankShape === "cylindrical") {
      const diameter = parseFloat(cylDiameter);
      const height = parseFloat(cylHeight);
      if (isNaN(diameter) || isNaN(height) || diameter <= 0 || height <= 0) return;
      
      const radius = diameter / 2;
      // V = π × r² × h
      volume = Math.PI * radius * radius * height;
    } else if (tankShape === "rectangular") {
      const length = parseFloat(rectLength);
      const width = parseFloat(rectWidth);
      const height = parseFloat(rectHeight);
      if (isNaN(length) || isNaN(width) || isNaN(height) || length <= 0 || width <= 0 || height <= 0) return;
      
      // V = l × w × h
      volume = length * width * height;
    } else if (tankShape === "spherical") {
      const diameter = parseFloat(sphereDiameter);
      if (isNaN(diameter) || diameter <= 0) return;
      
      const radius = diameter / 2;
      // V = (4/3) × π × r³
      volume = (4/3) * Math.PI * Math.pow(radius, 3);
    } else if (tankShape === "cone") {
      const radius = parseFloat(coneRadius);
      const height = parseFloat(coneHeight);
      if (isNaN(radius) || isNaN(height) || radius <= 0 || height <= 0) return;
      
      // V = (1/3) × π × r² × h
      volume = (1/3) * Math.PI * radius * radius * height;
    }

    // Convert to cubic meters first (base unit)
    let volumeInCubicMeters = volume;
    
    if (unit === "feet") {
      volumeInCubicMeters = volume * 0.0283168;
    } else if (unit === "inches") {
      volumeInCubicMeters = volume * 0.0000163871;
    } else if (unit === "cm") {
      volumeInCubicMeters = volume * 0.000001;
    }
    // If meters, already in cubic meters

    // Convert to output unit
    let outputVolume = volumeInCubicMeters;
    let outputLabel = "";

    if (outputUnit === "liters") {
      outputVolume = volumeInCubicMeters * 1000;
      outputLabel = "Liters";
    } else if (outputUnit === "gallons") {
      outputVolume = volumeInCubicMeters * 264.172;
      outputLabel = "US Gallons";
    } else if (outputUnit === "cubic-meters") {
      outputLabel = "Cubic Meters";
    } else if (outputUnit === "cubic-feet") {
      outputVolume = volumeInCubicMeters * 35.3147;
      outputLabel = "Cubic Feet";
    }

    setResult({
      volume: Math.round(outputVolume * 100) / 100,
      volumeUnit: outputLabel,
      cubicMeters: Math.round(volumeInCubicMeters * 1000) / 1000,
      gallons: Math.round(volumeInCubicMeters * 264.172 * 100) / 100,
      liters: Math.round(volumeInCubicMeters * 1000 * 100) / 100,
    });
  };

  const reset = () => {
    setCylDiameter("");
    setCylHeight("");
    setRectLength("");
    setRectWidth("");
    setRectHeight("");
    setSphereDiameter("");
    setConeradius("");
    setConeHeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Water Tank Volume Calculator – Calculate Tank Capacity in Liters & Gallons
          </h1>
          <p className="text-muted-foreground">
            Quickly find out how much water your tank can hold with our Water Tank Volume
            Calculator. Supports cylindrical, rectangular, and other tank shapes. Get results in
            liters, gallons, or cubic meters instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Tank Shape</Label>
                <Select value={tankShape} onValueChange={(v) => setTankShape(v as "cylindrical" | "rectangular" | "spherical" | "cone")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cylindrical">Cylindrical (Round)</SelectItem>
                    <SelectItem value="rectangular">Rectangular (Box)</SelectItem>
                    <SelectItem value="spherical">Spherical (Ball)</SelectItem>
                    <SelectItem value="cone">Conical (Cone)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Input Unit</Label>
                <Select value={unit} onValueChange={(v) => setUnit(v as "meters" | "feet" | "inches" | "cm")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meters">Meters (m)</SelectItem>
                    <SelectItem value="feet">Feet (ft)</SelectItem>
                    <SelectItem value="inches">Inches (in)</SelectItem>
                    <SelectItem value="cm">Centimeters (cm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Output Unit</Label>
                <Select value={outputUnit} onValueChange={(v) => setOutputUnit(v as "liters" | "gallons" | "cubic-meters" | "cubic-feet")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="liters">Liters (L)</SelectItem>
                    <SelectItem value="gallons">US Gallons (gal)</SelectItem>
                    <SelectItem value="cubic-meters">Cubic Meters (m³)</SelectItem>
                    <SelectItem value="cubic-feet">Cubic Feet (ft³)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t pt-4">
                {tankShape === "cylindrical" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="diameter">Diameter</Label>
                      <Input
                        id="diameter"
                        type="number"
                        placeholder={unit === "meters" ? "1" : unit === "feet" ? "3" : "100"}
                        value={cylDiameter}
                        onChange={(e) => setCylDiameter(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder={unit === "meters" ? "1.5" : unit === "feet" ? "5" : "150"}
                        value={cylHeight}
                        onChange={(e) => setCylHeight(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {tankShape === "rectangular" && (
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="length">Length</Label>
                      <Input
                        id="length"
                        type="number"
                        placeholder={unit === "meters" ? "1.5" : "5"}
                        value={rectLength}
                        onChange={(e) => setRectLength(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="width">Width</Label>
                      <Input
                        id="width"
                        type="number"
                        placeholder={unit === "meters" ? "1" : "3"}
                        value={rectWidth}
                        onChange={(e) => setRectWidth(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rectHeight">Height</Label>
                      <Input
                        id="rectHeight"
                        type="number"
                        placeholder={unit === "meters" ? "1" : "3"}
                        value={rectHeight}
                        onChange={(e) => setRectHeight(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {tankShape === "spherical" && (
                  <div className="space-y-2">
                    <Label htmlFor="sphereDiameter">Diameter</Label>
                    <Input
                      id="sphereDiameter"
                      type="number"
                      placeholder={unit === "meters" ? "1" : "3"}
                      value={sphereDiameter}
                      onChange={(e) => setSphereDiameter(e.target.value)}
                    />
                  </div>
                )}

                {tankShape === "cone" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="radius">Base Radius</Label>
                      <Input
                        id="radius"
                        type="number"
                        placeholder={unit === "meters" ? "0.5" : "1.5"}
                        value={coneRadius}
                        onChange={(e) => setConeradius(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coneHeight">Height</Label>
                      <Input
                        id="coneHeight"
                        type="number"
                        placeholder={unit === "meters" ? "1" : "3"}
                        value={coneHeight}
                        onChange={(e) => setConeHeight(e.target.value)}
                      />
                    </div>
                  </div>
                )}
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
              <h3 className="text-lg font-semibold mb-4">Tank Volume Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Tank Capacity</p>
                    <p className="text-3xl font-bold text-primary">
                      {result.volume.toLocaleString()} {result.volumeUnit}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Liters</p>
                      <p className="text-lg font-bold">{result.liters.toLocaleString()} L</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Gallons</p>
                      <p className="text-lg font-bold">{result.gallons.toLocaleString()} gal</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Cubic Meters</p>
                    <p className="text-xl font-bold">{result.cubicMeters} m³</p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground">
                    <p>
                      <strong>Water weight:</strong> {result.liters} liters of water weighs approximately {(result.liters).toLocaleString()} kg or {(result.liters * 2.20462).toFixed(0)} lbs
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Volume Formulas</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-2">
            <div><strong>Cylindrical:</strong> V = π × r² × h</div>
            <div><strong>Rectangular:</strong> V = length × width × height</div>
            <div><strong>Spherical:</strong> V = (4/3) × π × r³</div>
            <div><strong>Conical:</strong> V = (1/3) × π × r² × h</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Conversion factors:</strong><br />
            1 m³ = 1,000 liters = 264.17 gallons = 35.31 cubic feet
          </p>
        </div>
      </div>
    </div>
  );
}
