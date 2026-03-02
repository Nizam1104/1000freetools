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

interface EVResult {
  originalCapacity: number;
  age: number;
  cycles: number;
  degradationRate: number;
  currentCapacity: number;
  range: number;
  health: string;
  recommendations: string[];
}

export default function EVBatteryCapacityEstimatorPage() {
  const [originalCapacity, setOriginalCapacity] = useState<string>("");
  const [vehicleAge, setVehicleAge] = useState<string>("");
  const [mileage, setMileage] = useState<string>("");
  const [chargingHabits, setChargingHabits] = useState<string>("normal");
  const [climate, setClimate] = useState<string>("moderate");
  const [result, setResult] = useState<EVResult | null>(null);

  const calculate = () => {
    const capacityNum = parseFloat(originalCapacity) || 0;
    const ageNum = parseFloat(vehicleAge) || 0;
    const mileageNum = parseFloat(mileage) || 0;

    if (capacityNum === 0) return;

    // Base degradation: ~2% per year
    let degradationRate = 2;

    // Adjust for charging habits
    const chargingFactors: Record<string, number> = {
      gentle: -0.5,  // Mostly Level 2, rarely above 80%
      normal: 0,     // Mix of charging
      aggressive: 1, // Frequent DC fast charging, often to 100%
    };
    degradationRate += chargingFactors[chargingHabits] || 0;

    // Adjust for climate
    const climateFactors: Record<string, number> = {
      cold: 0.5,     // Cold climates accelerate degradation
      moderate: 0,   // Ideal conditions
      hot: 0.5,      // Hot climates also accelerate degradation
    };
    degradationRate += climateFactors[climate] || 0;

    // Mileage factor (high mileage = more cycles)
    const cyclesPerYear = mileageNum / (ageNum * 300) || 1; // Assume 300km per full cycle
    if (cyclesPerYear > 1.5) {
      degradationRate += 0.5;
    }

    // Calculate total degradation
    const totalDegradation = Math.min(30, degradationRate * ageNum); // Cap at 30%
    const currentCapacity = capacityNum * (1 - totalDegradation / 100);

    // Estimate range (rough estimate: 5-6 km per kWh)
    const rangePerKwh = 5.5;
    const range = currentCapacity * rangePerKwh;

    // Health assessment
    let health = "";
    if (totalDegradation < 10) {
      health = "Excellent - Minimal degradation";
    } else if (totalDegradation < 20) {
      health = "Good - Normal degradation for age";
    } else if (totalDegradation < 30) {
      health = "Fair - Above average degradation";
    } else {
      health = "Poor - Consider battery service/replacement";
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`🔋 Current capacity: ${currentCapacity.toFixed(1)} kWh (${(100 - totalDegradation).toFixed(1)}% of original)`);
    recommendations.push(`📏 Estimated range: ${range.toFixed(0)} km`);

    if (chargingHabits === "aggressive") {
      recommendations.push("⚡ Consider reducing DC fast charging frequency");
      recommendations.push("🔌 Try to keep charge between 20-80% for daily use");
    }

    if (climate === "hot" || climate === "cold") {
      recommendations.push("🌡️ Park in garage/shade when possible");
      recommendations.push("❄️🔥 Pre-condition battery while plugged in");
    }

    if (totalDegradation > 20) {
      recommendations.push("🔍 Consider battery health check at service center");
    }

    recommendations.push("📊 Degradation rate: ~" + degradationRate.toFixed(1) + "% per year");

    setResult({
      originalCapacity: capacityNum,
      age: ageNum,
      cycles: Math.round(mileageNum / 300),
      degradationRate: parseFloat(degradationRate.toFixed(1)),
      currentCapacity: parseFloat(currentCapacity.toFixed(1)),
      range: parseFloat(range.toFixed(0)),
      health,
      recommendations,
    });
  };

  const reset = () => {
    setOriginalCapacity("");
    setVehicleAge("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            EV Battery Capacity Estimator – Calculate Your Electric Car&apos;s Real Battery Life
          </h1>
          <p className="text-muted-foreground">
            Estimate your EV&apos;s effective battery capacity after degradation with our
            EV Battery Capacity Estimator. Understand how aging and usage patterns affect
            your range and plan accordingly for long trips.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Original Battery Capacity (kWh)</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={originalCapacity}
                  onChange={(e) => setOriginalCapacity(e.target.value)}
                  placeholder="e.g., 75"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="age">Vehicle Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={vehicleAge}
                    onChange={(e) => setVehicleAge(e.target.value)}
                    placeholder="3"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="mileage">Total Mileage (km)</Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    placeholder="50000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="charging">Charging Habits</Label>
                <Select value={chargingHabits} onValueChange={setChargingHabits}>
                  <SelectTrigger id="charging">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gentle">Gentle (Mostly Level 2, 20-80%)</SelectItem>
                    <SelectItem value="normal">Normal (Mixed charging)</SelectItem>
                    <SelectItem value="aggressive">Aggressive (Frequent DC fast, 100%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="climate">Climate</Label>
                <Select value={climate} onValueChange={setClimate}>
                  <SelectTrigger id="climate">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cold">Cold (Regular sub-zero temps)</SelectItem>
                    <SelectItem value="moderate">Moderate (10-25°C average)</SelectItem>
                    <SelectItem value="hot">Hot (Regular above 30°C)</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Battery Health</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.currentCapacity / result.originalCapacity > 0.9 ? "bg-green-100 dark:bg-green-900/20" :
                    result.currentCapacity / result.originalCapacity > 0.8 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Current Capacity</p>
                    <p className="text-4xl font-bold">{result.currentCapacity} kWh</p>
                    <p className="text-sm mt-1">{result.health}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Est. Range</p>
                      <p className="text-lg font-bold">{result.range} km</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Degradation</p>
                      <p className="text-lg font-bold">{result.degradationRate}%/yr</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Original Capacity:</span>
                      <span className="font-semibold">{result.originalCapacity} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current Capacity:</span>
                      <span className="font-semibold">{((result.currentCapacity / result.originalCapacity) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Full Cycles:</span>
                      <span className="font-semibold">{result.cycles}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter vehicle details and click Calculate to see battery health</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                EV Battery Degradation Facts
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Typical degradation:</strong> 2-3% per year
                  </li>
                  <li>
                    <strong>Warranty threshold:</strong> Most warranties cover below 70%
                  </li>
                  <li>
                    <strong>DC fast charging:</strong> Can accelerate degradation if used frequently
                  </li>
                  <li>
                    <strong>Temperature:</strong> Extreme heat and cold both accelerate degradation
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> For daily use, keep charge between 20-80% and use
                  Level 2 charging when possible. Save DC fast charging for road trips.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
