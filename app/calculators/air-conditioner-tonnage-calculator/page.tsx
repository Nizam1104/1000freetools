"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AirConditionerTonnageCalculatorPage() {
  const [roomLength, setRoomLength] = useState<string>("");
  const [roomWidth, setRoomWidth] = useState<string>("");
  const [ceilingHeight, setCeilingHeight] = useState<string>("8");
  const [insulation, setInsulation] = useState<"poor" | "average" | "good" | "excellent">("average");
  const [climate, setClimate] = useState<"cool" | "moderate" | "hot" | "very-hot">("moderate");
  const [sunExposure, setSunExposure] = useState<"shaded" | "normal" | "full-sun">("normal");
  const [roomType, setRoomType] = useState<"bedroom" | "living-room" | "kitchen" | "office" | "server-room">("bedroom");
  const [numOccupants, setNumOccupants] = useState<string>("2");
  const [unit, setUnit] = useState<"feet" | "meters">("feet");
  const [result, setResult] = useState<{
    baseBtu: number;
    adjustedBtu: number;
    tonnage: number;
    recommendedSize: number;
    kw: number;
  } | null>(null);

  const calculate = () => {
    let length = parseFloat(roomLength);
    let width = parseFloat(roomWidth);
    let height = parseFloat(ceilingHeight) || 8;
    let occupants = parseInt(numOccupants) || 2;

    if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) return;

    // Convert to feet if in meters
    if (unit === "meters") {
      length *= 3.28084;
      width *= 3.28084;
      height *= 3.28084;
    }

    // Calculate area in square feet
    const area = length * width;
    
    // Calculate volume
    const volume = area * height;

    // Base BTU calculation (20 BTU per sq ft is standard baseline)
    let baseBtu = area * 20;

    // Ceiling height adjustment (standard is 8ft)
    if (height > 8) {
      baseBtu *= (height / 8);
    }

    // Insulation factor
    const insulationFactors = {
      poor: 1.3,
      average: 1.0,
      good: 0.85,
      excellent: 0.75,
    };

    // Climate factor
    const climateFactors = {
      cool: 0.8,
      moderate: 1.0,
      hot: 1.2,
      "very-hot": 1.4,
    };

    // Sun exposure factor
    const sunFactors = {
      shaded: 0.9,
      normal: 1.0,
      "full-sun": 1.2,
    };

    // Room type factor (heat-generating appliances, equipment)
    const roomTypeFactors = {
      bedroom: 1.0,
      "living-room": 1.1,
      kitchen: 1.3,
      office: 1.1,
      "server-room": 2.0,
    };

    let adjustedBtu = baseBtu;
    adjustedBtu *= insulationFactors[insulation];
    adjustedBtu *= climateFactors[climate];
    adjustedBtu *= sunFactors[sunExposure];
    adjustedBtu *= roomTypeFactors[roomType];

    // Add heat from occupants (600 BTU per person)
    adjustedBtu += (occupants - 2) * 600;

    // Convert to tonnage (1 ton = 12,000 BTU/hr)
    const tonnage = adjustedBtu / 12000;

    // Convert to kW (1 ton ≈ 3.517 kW)
    const kw = tonnage * 3.517;

    // Round to standard AC sizes
    const standardSizes = [0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0];
    let recommendedSize = standardSizes.find(size => size >= tonnage) || Math.ceil(tonnage * 2) / 2;

    setResult({
      baseBtu: Math.round(baseBtu),
      adjustedBtu: Math.round(adjustedBtu),
      tonnage: Math.round(tonnage * 100) / 100,
      recommendedSize,
      kw: Math.round(kw * 100) / 100,
    });
  };

  const reset = () => {
    setRoomLength("");
    setRoomWidth("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            AC Tonnage Calculator – Find the Right Air Conditioner Size for Your Room
          </h1>
          <p className="text-muted-foreground">
            Choose the right air conditioner for your space with our AC Tonnage Calculator. Enter
            your room size, ceiling height, insulation quality, and climate zone to get the
            recommended BTU or tonnage — ensuring comfort and energy efficiency.
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
                    placeholder={unit === "feet" ? "15" : "4.5"}
                    value={roomLength}
                    onChange={(e) => setRoomLength(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Room Width</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder={unit === "feet" ? "12" : "3.5"}
                    value={roomWidth}
                    onChange={(e) => setRoomWidth(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Ceiling Height (ft)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="8"
                  value={ceilingHeight}
                  onChange={(e) => setCeilingHeight(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type</Label>
                <Select value={roomType} onValueChange={(v) => setRoomType(v as "bedroom" | "living-room" | "kitchen" | "office" | "server-room")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bedroom">Bedroom</SelectItem>
                    <SelectItem value="living-room">Living Room</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="office">Home Office</SelectItem>
                    <SelectItem value="server-room">Server Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="insulation">Insulation Quality</Label>
                <Select value={insulation} onValueChange={(v) => setInsulation(v as "poor" | "average" | "good" | "excellent")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poor">Poor (Old/Uninsulated)</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="excellent">Excellent (Well Insulated)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="climate">Climate Zone</Label>
                <Select value={climate} onValueChange={(v) => setClimate(v as "cool" | "moderate" | "hot" | "very-hot")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cool">Cool</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="hot">Hot</SelectItem>
                    <SelectItem value="very-hot">Very Hot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sunExposure">Sun Exposure</Label>
                <Select value={sunExposure} onValueChange={(v) => setSunExposure(v as "shaded" | "normal" | "full-sun")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shaded">Mostly Shaded</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="full-sun">Full Sun</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupants">Regular Occupants</Label>
                <Input
                  id="occupants"
                  type="number"
                  placeholder="2"
                  value={numOccupants}
                  onChange={(e) => setNumOccupants(e.target.value)}
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
              <h3 className="text-lg font-semibold mb-4">AC Size Recommendations</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Recommended AC Size</p>
                    <p className="text-3xl font-bold text-primary">{result.recommendedSize} Ton</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Cooling Capacity</p>
                      <p className="text-lg font-bold">{result.adjustedBtu.toLocaleString()} BTU/hr</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Power</p>
                      <p className="text-lg font-bold">{result.kw} kW</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Base BTU (Area Only)</p>
                    <p className="text-xl font-bold">{result.baseBtu.toLocaleString()} BTU/hr</p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>Important:</strong> This is an estimate. A professional HVAC load
                      calculation (Manual J) is recommended for precise sizing.
                    </p>
                    <p>
                      <strong>Tip:</strong> An oversized AC will short-cycle and waste energy.
                      An undersized AC will run continuously and struggle to cool.
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
          <h3 className="text-lg font-semibold mb-3">AC Sizing Reference</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Base BTU = Area (sq ft) × 20 BTU/sq ft</div>
            <div>Adjusted BTU = Base BTU × Insulation × Climate × Sun × Room Type</div>
            <div>Tonnage = Adjusted BTU ÷ 12,000</div>
          </div>
          <table className="w-full text-sm mt-3">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">AC Size</th>
                <th className="text-left py-2">BTU/hr</th>
                <th className="text-left py-2">Room Size</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">0.5 Ton</td>
                <td className="py-2">6,000</td>
                <td className="py-2">150-250 sq ft</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">1.0 Ton</td>
                <td className="py-2">12,000</td>
                <td className="py-2">400-500 sq ft</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">1.5 Ton</td>
                <td className="py-2">18,000</td>
                <td className="py-2">700-850 sq ft</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">2.0 Ton</td>
                <td className="py-2">24,000</td>
                <td className="py-2">950-1,100 sq ft</td>
              </tr>
              <tr>
                <td className="py-2">2.5 Ton</td>
                <td className="py-2">30,000</td>
                <td className="py-2">1,200-1,400 sq ft</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
