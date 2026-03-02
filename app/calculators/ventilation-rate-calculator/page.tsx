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

interface RoomType {
  name: string;
  ach: number; // Air changes per hour
  cfmPerPerson: number;
  description: string;
}

const roomTypes: RoomType[] = [
  { name: "Bedroom", ach: 5, cfmPerPerson: 10, description: "Sleeping area" },
  { name: "Living Room", ach: 4, cfmPerPerson: 15, description: "General living space" },
  { name: "Kitchen", ach: 7, cfmPerPerson: 20, description: "Cooking area" },
  { name: "Bathroom", ach: 8, cfmPerPerson: 25, description: "Bathing area" },
  { name: "Office", ach: 6, cfmPerPerson: 20, description: "Work space" },
  { name: "Conference Room", ach: 6, cfmPerPerson: 25, description: "Meeting space" },
  { name: "Gym/Exercise", ach: 8, cfmPerPerson: 30, description: "Exercise area" },
  { name: "Classroom", ach: 6, cfmPerPerson: 15, description: "Educational space" },
  { name: "Restaurant", ach: 8, cfmPerPerson: 25, description: "Dining area" },
  { name: "Retail Store", ach: 4, cfmPerPerson: 15, description: "Shopping area" },
  { name: "Warehouse", ach: 3, cfmPerPerson: 10, description: "Storage area" },
  { name: "Laboratory", ach: 10, cfmPerPerson: 30, description: "Research space" },
  { name: "Hospital Room", ach: 6, cfmPerPerson: 25, description: "Medical space" },
  { name: "Custom", ach: 6, cfmPerPerson: 15, description: "Custom space" },
];

interface VentilationResult {
  roomVolume: number;
  requiredACH: number;
  requiredCFM: number;
  cfmPerPerson: number;
  totalCFM: number;
  litersPerSecond: number;
  cubicMetersPerHour: number;
  recommendation: string;
}

export default function VentilationRateCalculatorPage() {
  const [roomLength, setRoomLength] = useState<string>("");
  const [roomWidth, setRoomWidth] = useState<string>("");
  const [roomHeight, setRoomHeight] = useState<string>("");
  const [numOccupants, setNumOccupants] = useState<string>("1");
  const [roomType, setRoomType] = useState<string>("Living Room");
  const [customACH, setCustomACH] = useState<string>("");
  const [unit, setUnit] = useState<string>("feet");
  const [result, setResult] = useState<VentilationResult | null>(null);

  const calculate = () => {
    const length = parseFloat(roomLength);
    const width = parseFloat(roomWidth);
    const height = parseFloat(roomHeight);
    const occupants = parseInt(numOccupants) || 1;

    if (isNaN(length) || isNaN(width) || isNaN(height)) return;

    // Calculate room volume
    let volume = length * width * height;
    let volumeUnit = "ft³";

    if (unit === "meters") {
      volumeUnit = "m³";
    }

    // Get ACH requirement for room type
    const selectedRoomType = roomTypes.find((rt) => rt.name === roomType);
    let ach = selectedRoomType?.ach || 6;

    if (roomType === "Custom" && customACH) {
      ach = parseFloat(customACH);
    }

    // Calculate required CFM based on ACH
    // CFM = (Volume × ACH) / 60
    const requiredCFM = (volume * ach) / 60;

    // Calculate CFM based on occupancy
    const cfmPerPerson = selectedRoomType?.cfmPerPerson || 15;
    const occupancyCFM = cfmPerPerson * occupants;

    // Total CFM is the greater of the two methods
    const totalCFM = Math.max(requiredCFM, occupancyCFM);

    // Convert to other units
    const litersPerSecond = totalCFM * 0.471947;
    const cubicMetersPerHour = totalCFM * 1.69901;

    let recommendation = "";
    if (totalCFM === requiredCFM) {
      recommendation = `Based on room volume and ${ach} ACH requirement.`;
    } else {
      recommendation = `Based on occupancy (${occupants} people × ${cfmPerPerson} CFM/person).`;
    }

    setResult({
      roomVolume: parseFloat(volume.toFixed(2)),
      requiredACH: ach,
      requiredCFM: parseFloat(requiredCFM.toFixed(1)),
      cfmPerPerson: occupancyCFM,
      totalCFM: parseFloat(totalCFM.toFixed(1)),
      litersPerSecond: parseFloat(litersPerSecond.toFixed(1)),
      cubicMetersPerHour: parseFloat(cubicMetersPerHour.toFixed(1)),
      recommendation,
    });
  };

  const reset = () => {
    setRoomLength("");
    setRoomWidth("");
    setRoomHeight("");
    setNumOccupants("1");
    setRoomType("Living Room");
    setCustomACH("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Ventilation Rate Calculator – Calculate Required Airflow (ACH & CFM) per ASHRAE
          </h1>
          <p className="text-muted-foreground">
            Design healthy indoor spaces with our Ventilation Rate Calculator.
            Enter room volume, occupancy, and space type to calculate the required
            air changes per hour (ACH) and CFM airflow rate per ASHRAE 62.1 standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="length">Length</Label>
                  <Input
                    id="length"
                    type="number"
                    value={roomLength}
                    onChange={(e) => setRoomLength(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    value={roomWidth}
                    onChange={(e) => setRoomWidth(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={roomHeight}
                    onChange={(e) => setRoomHeight(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feet">Feet</SelectItem>
                    <SelectItem value="meters">Meters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="room-type">Room Type</Label>
                <Select value={roomType} onValueChange={setRoomType}>
                  <SelectTrigger id="room-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((rt) => (
                      <SelectItem key={rt.name} value={rt.name}>
                        {rt.name} ({rt.ach} ACH)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {roomType === "Custom" && (
                <div className="space-y-2">
                  <Label htmlFor="custom-ach">Custom ACH</Label>
                  <Input
                    id="custom-ach"
                    type="number"
                    value={customACH}
                    onChange={(e) => setCustomACH(e.target.value)}
                    placeholder="e.g., 6"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="occupants">Number of Occupants</Label>
                <Input
                  id="occupants"
                  type="number"
                  min="1"
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
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Required CFM</p>
                      <p className="text-2xl font-bold text-primary">{result.totalCFM}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Air Changes/Hour</p>
                      <p className="text-2xl font-bold text-primary">{result.requiredACH}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Room Volume:</span>
                      <span className="font-semibold">{result.roomVolume} ft³</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Volume-based CFM:</span>
                      <span className="font-semibold">{result.requiredCFM}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Occupancy-based CFM:</span>
                      <span className="font-semibold">{result.cfmPerPerson}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">L/s</p>
                      <p className="text-lg font-semibold">{result.litersPerSecond}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">m³/h</p>
                      <p className="text-lg font-semibold">{result.cubicMetersPerHour}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Recommendation:</strong> {result.recommendation}
                    </p>
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Ventilation Requirements
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Proper ventilation is essential for maintaining indoor air quality (IAQ).
                  ASHRAE 62.1 provides guidelines for minimum ventilation rates in buildings.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>ACH (Air Changes per Hour):</strong> Number of times the air in a
                    room is replaced per hour.
                  </li>
                  <li>
                    <strong>CFM (Cubic Feet per Minute):</strong> Volume of air flow rate.
                  </li>
                  <li>
                    <strong>Formula:</strong> CFM = (Room Volume × ACH) / 60
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> These are minimum requirements. Consider additional
                  ventilation for high-pollutant activities, climate conditions, or specific
                  health requirements.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
