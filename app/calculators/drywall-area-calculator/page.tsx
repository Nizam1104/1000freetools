"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface DrywallResult {
  totalWallArea: number;
  adjustedArea: number;
  sheets4x8: number;
  sheets4x10: number;
  sheets4x12: number;
  wastePercentage: number;
  totalCost4x8: number;
  totalCost4x10: number;
  totalCost4x12: number;
}

export default function DrywallAreaCalculatorPage() {
  const [roomLength, setRoomLength] = useState<string>("");
  const [roomWidth, setRoomWidth] = useState<string>("");
  const [roomHeight, setRoomHeight] = useState<string>("");
  const [doorOpenings, setDoorOpenings] = useState<string>("");
  const [windowOpenings, setWindowOpenings] = useState<string>("");
  const [wasteFactor, setWasteFactor] = useState<number>(10);
  const [includeCeiling, setIncludeCeiling] = useState<boolean>(false);
  const [pricePerSheet4x8, setPricePerSheet4x8] = useState<string>("15");
  const [pricePerSheet4x10, setPricePerSheet4x10] = useState<string>("20");
  const [pricePerSheet4x12, setPricePerSheet4x12] = useState<string>("25");
  const [result, setResult] = useState<DrywallResult | null>(null);

  const calculateDrywall = () => {
    const length = parseFloat(roomLength);
    const width = parseFloat(roomWidth);
    const height = parseFloat(roomHeight);
    const doors = parseFloat(doorOpenings) || 0;
    const windows = parseFloat(windowOpenings) || 0;
    const price4x8 = parseFloat(pricePerSheet4x8) || 15;
    const price4x10 = parseFloat(pricePerSheet4x10) || 20;
    const price4x12 = parseFloat(pricePerSheet4x12) || 25;

    if (isNaN(length) || isNaN(width) || isNaN(height) || length <= 0 || width <= 0 || height <= 0) {
      return;
    }

    const perimeter = 2 * (length + width);
    const wallArea = perimeter * height;

    const doorArea = doors * 21;
    const windowArea = windows * 12;
    const totalOpenings = doorArea + windowArea;

    let adjustedArea = wallArea - totalOpenings;

    if (includeCeiling) {
      const ceilingArea = length * width;
      adjustedArea += ceilingArea;
    }

    if (adjustedArea < 0) adjustedArea = 0;

    const wasteMultiplier = 1 + (wasteFactor / 100);
    const areaWithWaste = adjustedArea * wasteMultiplier;

    const sheetArea4x8 = 32;
    const sheetArea4x10 = 40;
    const sheetArea4x12 = 48;

    const sheets4x8 = Math.ceil(areaWithWaste / sheetArea4x8);
    const sheets4x10 = Math.ceil(areaWithWaste / sheetArea4x10);
    const sheets4x12 = Math.ceil(areaWithWaste / sheetArea4x12);

    setResult({
      totalWallArea: Math.round(wallArea * 100) / 100,
      adjustedArea: Math.round(adjustedArea * 100) / 100,
      sheets4x8,
      sheets4x10,
      sheets4x12,
      wastePercentage: wasteFactor,
      totalCost4x8: Math.round(sheets4x8 * price4x8 * 100) / 100,
      totalCost4x10: Math.round(sheets4x10 * price4x10 * 100) / 100,
      totalCost4x12: Math.round(sheets4x12 * price4x12 * 100) / 100,
    });
  };

  const reset = () => {
    setRoomLength("");
    setRoomWidth("");
    setRoomHeight("");
    setDoorOpenings("");
    setWindowOpenings("");
    setWasteFactor(10);
    setIncludeCeiling(false);
    setResult(null);
  };

  useEffect(() => {
    calculateDrywall();
  }, [roomLength, roomWidth, roomHeight, doorOpenings, windowOpenings, wasteFactor, includeCeiling, pricePerSheet4x8, pricePerSheet4x10, pricePerSheet4x12]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Drywall Calculator – Calculate How Many Drywall Sheets You Need</h1>
          <p className="text-muted-foreground">
            Take the guesswork out of drywall installation with our Drywall Area Calculator. Enter room dimensions and drywall sheet size to calculate the exact number of sheets needed, including a waste factor for cuts and openings.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Room Dimensions</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="length">Room Length (ft)</Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="e.g., 12"
                      value={roomLength}
                      onChange={(e) => setRoomLength(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width">Room Width (ft)</Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="e.g., 10"
                      value={roomWidth}
                      onChange={(e) => setRoomWidth(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Ceiling Height (ft)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="e.g., 8"
                      value={roomHeight}
                      onChange={(e) => setRoomHeight(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Openings (to subtract)</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="doors">Number of Doors</Label>
                    <Input
                      id="doors"
                      type="number"
                      placeholder="e.g., 1"
                      value={doorOpenings}
                      onChange={(e) => setDoorOpenings(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Standard door: 21 sq ft (3'×7')</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="windows">Number of Windows</Label>
                    <Input
                      id="windows"
                      type="number"
                      placeholder="e.g., 2"
                      value={windowOpenings}
                      onChange={(e) => setWindowOpenings(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Standard window: 12 sq ft (3'×4')</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ceiling"
                      checked={includeCeiling}
                      onCheckedChange={(checked) => setIncludeCeiling(checked as boolean)}
                    />
                    <Label htmlFor="ceiling">Include ceiling drywall</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waste">Waste Factor: {wasteFactor}%</Label>
                    <input
                      type="range"
                      id="waste"
                      min="0"
                      max="30"
                      value={wasteFactor}
                      onChange={(e) => setWasteFactor(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">Recommended: 10-15% for simple rooms, 20%+ for complex cuts</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Price per Sheet (optional)</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price4x8">4'×8' Sheet ($)</Label>
                    <Input
                      id="price4x8"
                      type="number"
                      placeholder="15"
                      value={pricePerSheet4x8}
                      onChange={(e) => setPricePerSheet4x8(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price4x10">4'×10' Sheet ($)</Label>
                    <Input
                      id="price4x10"
                      type="number"
                      placeholder="20"
                      value={pricePerSheet4x10}
                      onChange={(e) => setPricePerSheet4x10(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price4x12">4'×12' Sheet ($)</Label>
                    <Input
                      id="price4x12"
                      type="number"
                      placeholder="25"
                      value={pricePerSheet4x12}
                      onChange={(e) => setPricePerSheet4x12(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDrywall} className="flex-1">
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
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Wall Area</p>
                    <p className="text-2xl font-bold">{result.totalWallArea} sq ft</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Adjusted Area (after openings)</p>
                    <p className="text-2xl font-bold">{result.adjustedArea} sq ft</p>
                    {includeCeiling && (
                      <p className="text-xs text-muted-foreground mt-1">Includes ceiling</p>
                    )}
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <p className="font-semibold">Drywall Sheets Needed:</p>
                    <p className="text-sm text-muted-foreground">With {result.wastePercentage}% waste factor</p>

                    <div className="p-3 bg-primary/10 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">4'×8' Sheets</p>
                          <p className="text-xs text-muted-foreground">32 sq ft each</p>
                        </div>
                        <p className="text-2xl font-bold text-primary">{result.sheets4x8}</p>
                      </div>
                      <p className="text-sm mt-2">Estimated cost: ${result.totalCost4x8}</p>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">4'×10' Sheets</p>
                          <p className="text-xs text-muted-foreground">40 sq ft each</p>
                        </div>
                        <p className="text-2xl font-bold">{result.sheets4x10}</p>
                      </div>
                      <p className="text-sm mt-2">Estimated cost: ${result.totalCost4x10}</p>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">4'×12' Sheets</p>
                          <p className="text-xs text-muted-foreground">48 sq ft each</p>
                        </div>
                        <p className="text-2xl font-bold">{result.sheets4x12}</p>
                      </div>
                      <p className="text-sm mt-2">Estimated cost: ${result.totalCost4x12}</p>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formulas:</strong></p>
                    <p>Wall Area = Perimeter × Height</p>
                    <p>Perimeter = 2 × (Length + Width)</p>
                    <p>Sheets = (Adjusted Area × Waste Factor) / Sheet Area</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter room dimensions and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Drywall Installation Tips</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="space-y-2">
                <p><strong>Sheet Sizes:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>4'×8' = 32 sq ft (most common)</li>
                  <li>4'×10' = 40 sq ft (fewer seams)</li>
                  <li>4'×12' = 48 sq ft (professional use)</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p><strong>Waste Guidelines:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Simple rooms: 10%</li>
                  <li>Rooms with many openings: 15%</li>
                  <li>Complex cuts/angles: 20-25%</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
