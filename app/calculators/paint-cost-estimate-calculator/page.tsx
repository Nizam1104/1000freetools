"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PaintCostEstimateCalculatorPage() {
  const [roomLength, setRoomLength] = useState<string>("");
  const [roomWidth, setRoomWidth] = useState<string>("");
  const [ceilingHeight, setCeilingHeight] = useState<string>("");
  const [doorHeight, setDoorHeight] = useState<string>("7");
  const [doorWidth, setDoorWidth] = useState<string>("3");
  const [numDoors, setNumDoors] = useState<string>("1");
  const [windowHeight, setWindowHeight] = useState<string>("4");
  const [windowWidth, setWindowWidth] = useState<string>("3");
  const [numWindows, setNumWindows] = useState<string>("1");
  const [coats, setCoats] = useState<string>("2");
  const [paintPrice, setPaintPrice] = useState<string>("");
  const [coveragePerGallon, setCoveragePerGallon] = useState<string>("350");
  const [unit, setUnit] = useState<"feet" | "meters">("feet");
  const [result, setResult] = useState<{
    wallArea: number;
    paintableArea: number;
    gallonsNeeded: number;
    totalCost: number;
    costPerSquareFoot: number;
  } | null>(null);

  const calculate = () => {
    let length = parseFloat(roomLength);
    let width = parseFloat(roomWidth);
    let height = parseFloat(ceilingHeight);
    let dHeight = parseFloat(doorHeight) || 7;
    let dWidth = parseFloat(doorWidth) || 3;
    let doors = parseInt(numDoors) || 0;
    let wHeight = parseFloat(windowHeight) || 4;
    let wWidth = parseFloat(windowWidth) || 3;
    let windows = parseInt(numWindows) || 0;
    let numCoats = parseInt(coats) || 2;
    let price = parseFloat(paintPrice) || 0;
    let coverage = parseFloat(coveragePerGallon) || 350;

    if (isNaN(length) || isNaN(width) || isNaN(height) || length <= 0 || width <= 0 || height <= 0) return;

    // Convert to feet if in meters
    if (unit === "meters") {
      length *= 3.28084;
      width *= 3.28084;
      height *= 3.28084;
      dHeight *= 3.28084;
      dWidth *= 3.28084;
      wHeight *= 3.28084;
      wWidth *= 3.28084;
    }

    // Calculate wall area (perimeter × height)
    const perimeter = 2 * (length + width);
    const grossWallArea = perimeter * height;

    // Calculate door area
    const doorArea = dHeight * dWidth * doors;

    // Calculate window area
    const windowArea = wHeight * wWidth * windows;

    // Net paintable area
    const paintableArea = grossWallArea - doorArea - windowArea;

    // Total area to cover (including multiple coats)
    const totalArea = paintableArea * numCoats;

    // Gallons needed
    const gallonsNeeded = totalArea / coverage;

    // Round up to nearest whole gallon
    const gallonsToBuy = Math.ceil(gallonsNeeded);

    // Total cost
    const totalCost = gallonsToBuy * price;

    // Cost per square foot
    const costPerSqFt = paintableArea > 0 ? totalCost / paintableArea : 0;

    setResult({
      wallArea: Math.round(grossWallArea * 100) / 100,
      paintableArea: Math.round(paintableArea * 100) / 100,
      gallonsNeeded: Math.round(gallonsToBuy * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      costPerSquareFoot: Math.round(costPerSqFt * 100) / 100,
    });
  };

  const reset = () => {
    setRoomLength("");
    setRoomWidth("");
    setCeilingHeight("");
    setPaintPrice("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Paint Cost Estimate Calculator – How Much Paint Do You Need for a Room?
          </h1>
          <p className="text-muted-foreground">
            Calculate the exact amount of paint and budget needed for your next painting project
            with our Paint Cost Estimate Calculator. Enter room dimensions, number of coats, and
            paint price per liter to get an accurate estimate instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Unit System</Label>
                <Select value={unit} onValueChange={(v) => setUnit(v as "feet" | "meters")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feet">Feet</SelectItem>
                    <SelectItem value="meters">Meters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="length">Room Length</Label>
                  <Input
                    id="length"
                    type="number"
                    placeholder={unit === "feet" ? "12" : "4"}
                    value={roomLength}
                    onChange={(e) => setRoomLength(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Room Width</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder={unit === "feet" ? "10" : "3"}
                    value={roomWidth}
                    onChange={(e) => setRoomWidth(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Ceiling Height</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder={unit === "feet" ? "8" : "2.4"}
                  value={ceilingHeight}
                  onChange={(e) => setCeilingHeight(e.target.value)}
                />
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-semibold mb-3">Doors & Windows (to exclude)</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="doors">Doors</Label>
                    <Input
                      id="doors"
                      type="number"
                      placeholder="1"
                      value={numDoors}
                      onChange={(e) => setNumDoors(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="windows">Windows</Label>
                    <Input
                      id="windows"
                      type="number"
                      placeholder="1"
                      value={numWindows}
                      onChange={(e) => setNumWindows(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coats">Coats</Label>
                    <Input
                      id="coats"
                      type="number"
                      placeholder="2"
                      value={coats}
                      onChange={(e) => setCoats(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paintPrice">Paint Price per Gallon ($)</Label>
                <Input
                  id="paintPrice"
                  type="number"
                  placeholder="e.g., 45"
                  value={paintPrice}
                  onChange={(e) => setPaintPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverage">Coverage per Gallon (sq ft)</Label>
                <Input
                  id="coverage"
                  type="number"
                  placeholder="350"
                  value={coveragePerGallon}
                  onChange={(e) => setCoveragePerGallon(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Standard: 350-400 sq ft/gallon
                </p>
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
              <h3 className="text-lg font-semibold mb-4">Paint Estimate Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Paint Cost</p>
                    <p className="text-3xl font-bold text-primary">${result.totalCost.toFixed(2)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Paint Needed</p>
                      <p className="text-lg font-bold">{result.gallonsNeeded} gallons</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Paintable Area</p>
                      <p className="text-lg font-bold">{result.paintableArea} sq ft</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Wall Area</p>
                    <p className="text-xl font-bold">{result.wallArea} sq ft</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Cost per Square Foot</p>
                    <p className="text-xl font-bold">${result.costPerSquareFoot.toFixed(2)}</p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground">
                    <p>
                      <strong>Tip:</strong> Buy 10-15% extra paint for touch-ups and color matching.
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
          <h3 className="text-lg font-semibold mb-3">How to Calculate Paint Needed</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Wall Area = Perimeter × Height</div>
            <div>Paintable Area = Wall Area - (Doors + Windows)</div>
            <div>Gallons Needed = (Paintable Area × Coats) ÷ Coverage per Gallon</div>
            <div>Total Cost = Gallons × Price per Gallon</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Average door size:</strong> 7ft × 3ft = 21 sq ft<br />
            <strong>Average window size:</strong> 4ft × 3ft = 12 sq ft
          </p>
        </div>
      </div>
    </div>
  );
}
