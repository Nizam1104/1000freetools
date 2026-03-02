"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RangeEstimatorEvPage() {
  const [batteryCapacity, setBatteryCapacity] = useState<string>("");
  const [energyConsumption, setEnergyConsumption] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("70");
  const [drivingMode, setDrivingMode] = useState<"city" | "highway" | "mixed">("mixed");
  const [terrain, setTerrain] = useState<"flat" | "hilly" | "mountainous">("flat");
  const [result, setResult] = useState<{
    estimatedRange: number;
    adjustedRange: number;
    rangeWithBuffer: number;
    consumptionRate: number;
  } | null>(null);
  const [distanceUnit, setDistanceUnit] = useState<"miles" | "km">("miles");

  const calculate = () => {
    const capacity = parseFloat(batteryCapacity);
    const consumption = parseFloat(energyConsumption);
    const temp = parseFloat(temperature);

    if (isNaN(capacity) || isNaN(consumption) || isNaN(temp) || capacity <= 0 || consumption <= 0) return;

    // Base range calculation (in miles if consumption is in kWh/100mi, or km if kWh/100km)
    // Assuming consumption is in kWh/100 miles by default
    let baseRange = (capacity / consumption) * 100;

    // Temperature adjustment (optimal is 70°F/21°C)
    // Cold weather significantly reduces EV range
    let tempFactor = 1.0;
    if (temp < 32) {
      tempFactor = 0.6; // Below freezing: -40%
    } else if (temp < 50) {
      tempFactor = 0.8; // Cold: -20%
    } else if (temp < 70) {
      tempFactor = 0.9; // Cool: -10%
    } else if (temp > 90) {
      tempFactor = 0.9; // Hot: -10% (AC usage)
    } else if (temp > 100) {
      tempFactor = 0.85; // Very hot: -15%
    }

    // Driving mode adjustment
    const modeFactors = {
      city: 1.15, // Regenerative braking helps in city
      highway: 0.85, // Higher speeds = more drag
      mixed: 1.0,
    };

    // Terrain adjustment
    const terrainFactors = {
      flat: 1.0,
      hilly: 0.85,
      mountainous: 0.7,
    };

    const adjustedRange = baseRange * tempFactor * modeFactors[drivingMode] * terrainFactors[terrain];

    // Recommended buffer (don't drain below 10-20%)
    const rangeWithBuffer = adjustedRange * 0.85;

    setResult({
      estimatedRange: Math.round(baseRange),
      adjustedRange: Math.round(adjustedRange),
      rangeWithBuffer: Math.round(rangeWithBuffer),
      consumptionRate: consumption,
    });
  };

  const reset = () => {
    setBatteryCapacity("");
    setEnergyConsumption("");
    setTemperature("70");
    setDrivingMode("mixed");
    setTerrain("flat");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            EV Range Estimator – Calculate How Far Your Electric Car Can Go
          </h1>
          <p className="text-muted-foreground">
            Find out exactly how far your electric vehicle can travel on a full charge with our EV
            Range Estimator. Input your battery capacity and average energy consumption to get an
            accurate range estimate in miles or kilometers. Perfect for trip planning and avoiding
            range anxiety.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="batteryCapacity">Battery Capacity (kWh)</Label>
                <Input
                  id="batteryCapacity"
                  type="number"
                  placeholder="e.g., 75"
                  value={batteryCapacity}
                  onChange={(e) => setBatteryCapacity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="energyConsumption">Energy Consumption</Label>
                <div className="flex gap-2">
                  <Input
                    id="energyConsumption"
                    type="number"
                    placeholder="e.g., 30"
                    value={energyConsumption}
                    onChange={(e) => setEnergyConsumption(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={distanceUnit} onValueChange={(v) => setDistanceUnit(v as "miles" | "km")}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="miles">kWh/100 mi</SelectItem>
                      <SelectItem value="km">kWh/100 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">
                  Typical EVs: 25-40 kWh/100 mi
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperature">Outside Temperature (°F)</Label>
                <Input
                  id="temperature"
                  type="number"
                  placeholder="70"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Optimal: 70°F (21°C)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="drivingMode">Driving Mode</Label>
                <Select value={drivingMode} onValueChange={(v) => setDrivingMode(v as "city" | "highway" | "mixed")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="city">City (Best for EVs)</SelectItem>
                    <SelectItem value="mixed">Mixed Driving</SelectItem>
                    <SelectItem value="highway">Highway (Reduced Range)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="terrain">Terrain</Label>
                <Select value={terrain} onValueChange={(v) => setTerrain(v as "flat" | "hilly" | "mountainous")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="hilly">Hilly</SelectItem>
                    <SelectItem value="mountainous">Mountainous</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Range Estimate Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Real-World Range</p>
                    <p className="text-3xl font-bold text-primary">
                      {result.adjustedRange} {distanceUnit === "miles" ? "miles" : "km"}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Ideal Range</p>
                      <p className="text-lg font-bold">
                        {result.estimatedRange} {distanceUnit === "miles" ? "mi" : "km"}
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Safe Range (85%)</p>
                      <p className="text-lg font-bold">
                        {result.rangeWithBuffer} {distanceUnit === "miles" ? "mi" : "km"}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Energy Consumption Rate</p>
                    <p className="text-xl font-bold">
                      {result.consumptionRate} kWh/100 {distanceUnit === "miles" ? "mi" : "km"}
                    </p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground">
                    <p>
                      <strong>Note:</strong> Range estimates account for temperature, driving mode,
                      and terrain. Always keep a 15-20% buffer for safety.
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
          <h3 className="text-lg font-semibold mb-3">Understanding EV Range</h3>
          <p className="text-muted-foreground text-sm mb-3">
            EV range is affected by multiple factors beyond just battery capacity:
          </p>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            Base Range = (Battery Capacity ÷ Energy Consumption) × 100
          </div>
          <ul className="text-muted-foreground text-sm mt-3 space-y-1 list-disc list-inside">
            <li><strong>Temperature:</strong> Cold weather can reduce range by 20-40%</li>
            <li><strong>Driving mode:</strong> Highway driving uses 15% more energy</li>
            <li><strong>Terrain:</strong> Hills and mountains significantly impact range</li>
            <li><strong>Speed:</strong> Higher speeds increase aerodynamic drag</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
