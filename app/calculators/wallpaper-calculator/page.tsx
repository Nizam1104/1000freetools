"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WallpaperCalculatorPage() {
  const [roomLength, setRoomLength] = useState<string>("");
  const [roomWidth, setRoomWidth] = useState<string>("");
  const [ceilingHeight, setCeilingHeight] = useState<string>("");
  const [doorHeight, setDoorHeight] = useState<string>("7");
  const [doorWidth, setDoorWidth] = useState<string>("3");
  const [numDoors, setNumDoors] = useState<string>("1");
  const [windowHeight, setWindowHeight] = useState<string>("4");
  const [windowWidth, setWindowWidth] = useState<string>("3");
  const [numWindows, setNumWindows] = useState<string>("1");
  const [rollLength, setRollLength] = useState<string>("33");
  const [rollWidth, setRollWidth] = useState<string>("20.5");
  const [patternRepeat, setPatternRepeat] = useState<string>("0");
  const [unit, setUnit] = useState<"feet" | "meters">("feet");
  const [result, setResult] = useState<{
    wallArea: number;
    wallpaperArea: number;
    rollsNeeded: number;
    rollsWithWaste: number;
    wastePercentage: number;
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
    let rLength = parseFloat(rollLength) || 33;
    let rWidth = parseFloat(rollWidth) || 1.71; // 20.5 inches in feet
    let patternRep = parseFloat(patternRepeat) || 0;

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
      rLength *= 3.28084;
      rWidth *= 3.28084;
      patternRep *= 3.28084;
    } else {
      // Convert roll width from inches to feet if in feet mode
      rWidth = rWidth / 12;
    }

    // Calculate wall area (perimeter × height)
    const perimeter = 2 * (length + width);
    const grossWallArea = perimeter * height;

    // Calculate door area
    const doorArea = dHeight * dWidth * doors;

    // Calculate window area
    const windowArea = wHeight * wWidth * windows;

    // Net wallpaperable area
    const wallpaperArea = grossWallArea - doorArea - windowArea;

    // Calculate rolls needed
    const rollArea = rLength * rWidth;

    // Add waste factor for pattern matching (10-20% depending on pattern repeat)
    let wasteFactor = 0.10; // Base 10% waste
    if (patternRep > 0) {
      // Larger pattern repeats need more waste
      wasteFactor = Math.min(0.25, 0.10 + (patternRep / 100));
    }

    const totalRollsNeeded = (wallpaperArea / rollArea) * (1 + wasteFactor);
    const rollsToBuy = Math.ceil(totalRollsNeeded);

    setResult({
      wallArea: Math.round(grossWallArea * 100) / 100,
      wallpaperArea: Math.round(wallpaperArea * 100) / 100,
      rollsNeeded: Math.round(totalRollsNeeded * 100) / 100,
      rollsWithWaste: rollsToBuy,
      wastePercentage: Math.round(wasteFactor * 100),
    });
  };

  const reset = () => {
    setRoomLength("");
    setRoomWidth("");
    setCeilingHeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Wallpaper Calculator – Calculate How Many Rolls You Need for Your Room
          </h1>
          <p className="text-muted-foreground">
            Avoid over- or under-buying wallpaper with our free Wallpaper Calculator. Enter your
            room dimensions and roll size to instantly find out how many rolls you need, including
            a waste allowance for pattern matching.
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
                    <SelectItem value="feet">Feet/Inches</SelectItem>
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
                <p className="text-sm font-semibold mb-3">Doors & Windows</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="doors">Number of Doors</Label>
                    <Input
                      id="doors"
                      type="number"
                      placeholder="1"
                      value={numDoors}
                      onChange={(e) => setNumDoors(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="windows">Number of Windows</Label>
                    <Input
                      id="windows"
                      type="number"
                      placeholder="1"
                      value={numWindows}
                      onChange={(e) => setNumWindows(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-semibold mb-3">Wallpaper Roll Specs</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="rollLength">Roll Length</Label>
                    <Input
                      id="rollLength"
                      type="number"
                      placeholder={unit === "feet" ? "33" : "10"}
                      value={rollLength}
                      onChange={(e) => setRollLength(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rollWidth">Roll Width ({unit === "feet" ? "inches" : "cm"})</Label>
                    <Input
                      id="rollWidth"
                      type="number"
                      placeholder={unit === "feet" ? "20.5" : "52"}
                      value={rollWidth}
                      onChange={(e) => setRollWidth(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="patternRepeat">Pattern Repeat (optional, {unit})</Label>
                <Input
                  id="patternRepeat"
                  type="number"
                  placeholder="0 (no pattern match)"
                  value={patternRepeat}
                  onChange={(e) => setPatternRepeat(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Check wallpaper label for pattern repeat measurement
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
              <h3 className="text-lg font-semibold mb-4">Wallpaper Estimate Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Rolls to Buy</p>
                    <p className="text-3xl font-bold text-primary">{result.rollsWithWaste} rolls</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Exact Rolls Needed</p>
                      <p className="text-lg font-bold">{result.rollsNeeded}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Waste Factor</p>
                      <p className="text-lg font-bold">{result.wastePercentage}%</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Wallpaperable Area</p>
                    <p className="text-xl font-bold">{result.wallpaperArea} sq ft</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Wall Area</p>
                    <p className="text-xl font-bold">{result.wallArea} sq ft</p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground">
                    <p>
                      <strong>Tip:</strong> Always buy 1 extra roll for pattern matching and future
                      repairs. Check all roll batch numbers match.
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
          <h3 className="text-lg font-semibold mb-3">How to Calculate Wallpaper Needed</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Wall Area = Perimeter × Height</div>
            <div>Net Area = Wall Area - (Doors + Windows)</div>
            <div>Roll Area = Roll Length × Roll Width</div>
            <div>Rolls Needed = (Net Area ÷ Roll Area) × (1 + Waste Factor)</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Standard US roll:</strong> 33 ft × 20.5 in = 56 sq ft<br />
            <strong>Standard EU roll:</strong> 10 m × 53 cm = 57 sq ft<br />
            <strong>Waste factor:</strong> 10% for no pattern, 15-25% for pattern matching
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Wallpaper Needed</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Measure Your Room</h3>
                <p className="text-sm text-muted-foreground">Input room length, width, and ceiling height. Measure in feet or meters.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Add Openings</h3>
                <p className="text-sm text-muted-foreground">Enter door and window dimensions to subtract areas that won&apos;t be papered.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get Roll Count</h3>
                <p className="text-sm text-muted-foreground">Enter roll specs and pattern repeat to get exact number of rolls needed.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Key Features of This Wallpaper Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">**Pattern Repeat Support**</h3>
              <p className="text-sm text-muted-foreground">Accounts for extra wallpaper needed when matching patterns across strips.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Door & Window Deduction**</h3>
              <p className="text-sm text-muted-foreground">Automatically subtracts areas that won&apos;t be covered to avoid overbuying.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Waste Factor Calculation**</h3>
              <p className="text-sm text-muted-foreground">Includes recommended waste percentage for trimming and mistakes.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Dual Unit Support**</h3>
              <p className="text-sm text-muted-foreground">Works with both imperial (feet) and metric (meters) measurements.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How do I measure my room for wallpaper?</h3>
              <p className="text-sm text-muted-foreground">Measure the perimeter (add length + width, multiply by 2) and multiply by ceiling height. This gives total wall area before subtracting doors and windows.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What is pattern repeat?</h3>
              <p className="text-sm text-muted-foreground">Pattern repeat is the vertical distance before the design repeats. Larger repeats require more wallpaper because you need to align the pattern between strips.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How much extra wallpaper should I buy?</h3>
              <p className="text-sm text-muted-foreground">Add 10-15% for simple patterns, 15-25% for large pattern repeats. Always buy an extra roll for future repairs if possible.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What size is a standard wallpaper roll?</h3>
              <p className="text-sm text-muted-foreground">US standard: 33 ft long × 20.5 in wide (56 sq ft). European standard: 10 m long × 53 cm wide (57 sq ft). Always check your specific roll dimensions.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Should I remove doors and windows from calculation?</h3>
              <p className="text-sm text-muted-foreground">Yes, but professionals often don&apos;t subtract small windows. For DIY, subtract all openings but add extra for waste to be safe.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
      </div>
    </div>
  );
}
