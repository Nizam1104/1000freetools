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

interface CO2Result {
  activityType: string;
  activityValue: number;
  emissions: number;
  emissionsFormatted: string;
  equivalentTrees: number;
  equivalentMiles: number;
  recommendations: string[];
}

export default function COEmissionsCalculatorPage() {
  const [activityType, setActivityType] = useState<string>("car");
  const [activityValue, setActivityValue] = useState<string>("");
  const [result, setResult] = useState<CO2Result | null>(null);

  const calculate = () => {
    const valueNum = parseFloat(activityValue) || 0;
    if (valueNum === 0) return;

    // Emission factors (kg CO2 per unit)
    const emissionFactors: Record<string, { factor: number; unit: string; name: string }> = {
      car: { factor: 0.192, unit: "km", name: "Car (average)" },
      carMiles: { factor: 0.309, unit: "miles", name: "Car (average)" },
      flight: { factor: 0.255, unit: "km", name: "Flight (short-haul)" },
      electricity: { factor: 0.4, unit: "kWh", name: "Electricity (grid average)" },
      naturalGas: { factor: 2.0, unit: "m³", name: "Natural Gas" },
      beef: { factor: 27, unit: "kg", name: "Beef production" },
      tree: { factor: -22, unit: "trees", name: "Tree (annual absorption)" },
    };

    const factorData = emissionFactors[activityType] || emissionFactors.car;
    const emissions = valueNum * factorData.factor;

    // Equivalent trees needed to offset (1 tree absorbs ~22 kg CO2/year)
    const equivalentTrees = emissions / 22;

    // Equivalent miles driven (0.192 kg CO2/km)
    const equivalentMiles = emissions / 0.309;

    // Format emissions
    let emissionsFormatted = "";
    if (emissions < 1) {
      emissionsFormatted = `${(emissions * 1000).toFixed(0)} g CO₂`;
    } else if (emissions < 1000) {
      emissionsFormatted = `${emissions.toFixed(1)} kg CO₂`;
    } else {
      emissionsFormatted = `${(emissions / 1000).toFixed(2)} tonnes CO₂`;
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📊 Activity: ${valueNum} ${factorData.unit}`);
    recommendations.push(`🏭 Emissions: ${emissionsFormatted}`);

    if (activityType === "car" || activityType === "carMiles") {
      recommendations.push("🚗 Consider carpooling or public transport");
      recommendations.push("⚡ Electric vehicles produce 0 direct emissions");
    } else if (activityType === "flight") {
      recommendations.push("✈️ Consider train for short distances");
      recommendations.push("🌱 Purchase carbon offsets for flights");
    } else if (activityType === "electricity") {
      recommendations.push("💡 Switch to LED bulbs to reduce consumption");
      recommendations.push("☀️ Consider solar panels for clean energy");
    } else if (activityType === "beef") {
      recommendations.push("🥗 Consider plant-based alternatives");
      recommendations.push("🐄 Beef has highest carbon footprint per kg");
    }

    recommendations.push(`🌳 Trees to offset: ${equivalentTrees.toFixed(1)} trees/year`);
    recommendations.push(`🚗 Equivalent to driving: ${equivalentMiles.toFixed(0)} miles`);

    setResult({
      activityType: factorData.name,
      activityValue: valueNum,
      emissions: parseFloat(emissions.toFixed(2)),
      emissionsFormatted,
      equivalentTrees: parseFloat(equivalentTrees.toFixed(1)),
      equivalentMiles: parseFloat(equivalentMiles.toFixed(0)),
      recommendations,
    });
  };

  const reset = () => {
    setActivityValue("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            CO₂ Emissions Calculator – Calculate Carbon Dioxide Emissions from Any Activity
          </h1>
          <p className="text-muted-foreground">
            Quantify your carbon impact with our CO₂ Emissions Calculator. Enter data for
            transportation, electricity use, or other activities to calculate total CO₂
            emissions — supporting sustainability reporting and carbon reduction planning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="activity-type">Activity Type</Label>
                <Select value={activityType} onValueChange={setActivityType}>
                  <SelectTrigger id="activity-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Car Travel (km)</SelectItem>
                    <SelectItem value="carMiles">Car Travel (miles)</SelectItem>
                    <SelectItem value="flight">Flight (km)</SelectItem>
                    <SelectItem value="electricity">Electricity (kWh)</SelectItem>
                    <SelectItem value="naturalGas">Natural Gas (m³)</SelectItem>
                    <SelectItem value="beef">Beef Consumption (kg)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity-value">Activity Value</Label>
                <Input
                  id="activity-value"
                  type="number"
                  value={activityValue}
                  onChange={(e) => setActivityValue(e.target.value)}
                  placeholder="e.g., 100"
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
              <h3 className="text-lg font-semibold mb-4">Emissions Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">CO₂ Emissions</p>
                    <p className="text-4xl font-bold text-primary">{result.emissionsFormatted}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Trees to Offset</p>
                      <p className="text-lg font-bold">{result.equivalentTrees}</p>
                      <p className="text-xs text-muted-foreground">per year</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Equivalent Driving</p>
                      <p className="text-lg font-bold">{result.equivalentMiles}</p>
                      <p className="text-xs text-muted-foreground">miles</p>
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
                  <p>Enter activity data and click Calculate to see emissions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Carbon Footprint Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Transportation:</strong> 29% of global emissions
                  </li>
                  <li>
                    <strong>Electricity:</strong> 25% of global emissions
                  </li>
                  <li>
                    <strong>Food:</strong> Beef has 10x footprint of chicken
                  </li>
                  <li>
                    <strong>Trees:</strong> One tree absorbs ~22 kg CO₂/year
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Emission factors are averages and vary by
                  region, vehicle efficiency, and energy source. Use local factors
                  for precise calculations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
