"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RoomHeaterWattageCalculatorPage() {
  const [roomLength, setRoomLength] = useState<string>("");
  const [roomWidth, setRoomWidth] = useState<string>("");
  const [ceilingHeight, setCeilingHeight] = useState<string>("8");
  const [insulation, setInsulation] = useState<"poor" | "average" | "good" | "excellent">("average");
  const [climate, setClimate] = useState<"mild" | "moderate" | "cold" | "very-cold">("moderate");
  const [roomType, setRoomType] = useState<"bedroom" | "living-room" | "bathroom" | "kitchen" | "basement">("bedroom");
  const [windowType, setWindowType] = useState<"single" | "double" | "triple">("double");
  const [unit, setUnit] = useState<"feet" | "meters">("feet");
  const [result, setResult] = useState<{
    requiredWatts: number;
    requiredBTU: number;
    recommendedHeater: string;
    estimatedCostPerHour: number;
    estimatedCostPerDay: number;
  } | null>(null);

  const calculate = () => {
    let length = parseFloat(roomLength);
    let width = parseFloat(roomWidth);
    let height = parseFloat(ceilingHeight) || 8;
    
    if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) return;

    // Convert to feet if in meters
    if (unit === "meters") {
      length *= 3.28084;
      width *= 3.28084;
      height *= 3.28084;
    }

    // Calculate area and volume
    const area = length * width;
    const volume = area * height;

    // Base wattage calculation (10 watts per sq ft is standard baseline)
    let baseWatts = area * 10;

    // Ceiling height adjustment (standard is 8ft)
    if (height > 8) {
      baseWatts *= (height / 8);
    }

    // Insulation factor
    const insulationFactors = {
      poor: 1.5,
      average: 1.0,
      good: 0.8,
      excellent: 0.6,
    };

    // Climate factor (based on temperature difference needed)
    const climateFactors = {
      mild: 0.7,
      moderate: 1.0,
      cold: 1.3,
      "very-cold": 1.6,
    };

    // Room type factor
    const roomTypeFactors = {
      bedroom: 1.0,
      "living-room": 1.1,
      bathroom: 1.3,
      kitchen: 0.8, // Already has heat from appliances
      basement: 1.4, // Typically colder
    };

    // Window type factor
    const windowFactors = {
      single: 1.3,
      double: 1.0,
      triple: 0.85,
    };

    let requiredWatts = baseWatts;
    requiredWatts *= insulationFactors[insulation];
    requiredWatts *= climateFactors[climate];
    requiredWatts *= roomTypeFactors[roomType];
    requiredWatts *= windowFactors[windowType];

    // Round up to nearest 100W
    requiredWatts = Math.ceil(requiredWatts / 100) * 100;

    // Convert to BTU (1 watt = 3.412 BTU/hr)
    const requiredBTU = requiredWatts * 3.412;

    // Recommend heater type
    let recommendedHeater = "";
    if (requiredWatts <= 500) {
      recommendedHeater = "Personal/Desktop Heater (500W)";
    } else if (requiredWatts <= 1000) {
      recommendedHeater = "Small Space Heater (750-1000W)";
    } else if (requiredWatts <= 1500) {
      recommendedHeater = "Standard Space Heater (1500W)";
    } else if (requiredWatts <= 2000) {
      recommendedHeater = "Large Space Heater (2000W)";
    } else if (requiredWatts <= 3000) {
      recommendedHeater = "Heavy-Duty Heater (2500-3000W)";
    } else {
      recommendedHeater = "Multiple Heaters or Central Heating Required";
    }

    // Estimate running cost (assuming $0.13/kWh)
    const electricityRate = 0.13;
    const costPerHour = (requiredWatts / 1000) * electricityRate;
    const costPerDay = costPerHour * 8; // Assuming 8 hours/day

    setResult({
      requiredWatts,
      requiredBTU: Math.round(requiredBTU),
      recommendedHeater,
      estimatedCostPerHour: Math.round(costPerHour * 100) / 100,
      estimatedCostPerDay: Math.round(costPerDay * 100) / 100,
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
            Room Heater Wattage Calculator – Find the Right Heater Size for Your Room
          </h1>
          <p className="text-muted-foreground">
            Choose the right room heater with our Wattage Calculator. Enter your room dimensions,
            insulation level, and local climate to find the recommended heater wattage for
            efficient and comfortable heating.
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
                <Select value={roomType} onValueChange={(v) => setRoomType(v as "bedroom" | "living-room" | "bathroom" | "kitchen" | "basement")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bedroom">Bedroom</SelectItem>
                    <SelectItem value="living-room">Living Room</SelectItem>
                    <SelectItem value="bathroom">Bathroom</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="basement">Basement</SelectItem>
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
                    <SelectItem value="poor">Poor (Old/Drafty)</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="excellent">Excellent (Well Insulated)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="climate">Climate Zone</Label>
                <Select value={climate} onValueChange={(v) => setClimate(v as "mild" | "moderate" | "cold" | "very-cold")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mild">Mild (50-60°F winter)</SelectItem>
                    <SelectItem value="moderate">Moderate (30-50°F winter)</SelectItem>
                    <SelectItem value="cold">Cold (10-30°F winter)</SelectItem>
                    <SelectItem value="very-cold">Very Cold (Below 10°F)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="windowType">Window Type</Label>
                <Select value={windowType} onValueChange={(v) => setWindowType(v as "single" | "double" | "triple")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Pane</SelectItem>
                    <SelectItem value="double">Double Pane</SelectItem>
                    <SelectItem value="triple">Triple Pane</SelectItem>
                  </SelectContent>
                </Select>
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
              <h3 className="text-lg font-semibold mb-4">Heater Recommendations</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Recommended Heater</p>
                    <p className="text-xl font-bold text-primary">{result.recommendedHeater}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Power Required</p>
                      <p className="text-2xl font-bold">{result.requiredWatts} W</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">BTU/hr</p>
                      <p className="text-xl font-bold">{result.requiredBTU.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Estimated Running Cost</p>
                    <p className="text-lg font-bold">${result.estimatedCostPerHour.toFixed(2)}/hour</p>
                    <p className="text-sm text-muted-foreground">
                      ~${result.estimatedCostPerDay.toFixed(2)}/day (8 hours)
                    </p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>Safety tip:</strong> Never leave space heaters unattended. Keep
                      flammable materials at least 3 feet away.
                    </p>
                    <p>
                      <strong>Efficiency tip:</strong> Use a programmable thermostat and zone
                      heating to reduce energy costs.
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
          <h3 className="text-lg font-semibold mb-3">Heater Sizing Guide</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Base Watts = Area (sq ft) × 10 W/sq ft</div>
            <div>Required Watts = Base × Insulation × Climate × Room Type × Windows</div>
            <div>BTU/hr = Watts × 3.412</div>
          </div>
          <table className="w-full text-sm mt-3">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Factor</th>
                <th className="text-left py-2">Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Poor insulation</td>
                <td className="py-2">+50% wattage needed</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Very cold climate</td>
                <td className="py-2">+60% wattage needed</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Single pane windows</td>
                <td className="py-2">+30% heat loss</td>
              </tr>
              <tr>
                <td className="py-2">High ceilings</td>
                <td className="py-2">Proportional increase</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
