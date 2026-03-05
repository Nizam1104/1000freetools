"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function IrrigationWaterCalculatorPage() {
  const [fieldArea, setFieldArea] = useState<string>("");
  const [areaUnit, setAreaUnit] = useState<"acre" | "hectare" | "sqm">("hectare");
  const [cropType, setCropType] = useState<string>("wheat");
  const [soilType, setSoilType] = useState<"sandy" | "loam" | "clay" | "silt">("loam");
  const [evapotranspiration, setEvapotranspiration] = useState<string>("5");
  const [irrigationInterval, setIrrigationInterval] = useState<string>("7");
  const [irrigationMethod, setIrrigationMethod] = useState<"flood" | "sprinkler" | "drip">("flood");
  const [result, setResult] = useState<{
    dailyWaterNeed: number;
    totalWaterPerIrrigation: number;
    waterInLiters: number;
    waterInGallons: number;
    irrigationDepth: number;
  } | null>(null);

  // Crop coefficients (Kc) for different crops
  const cropCoefficients: Record<string, number> = {
    wheat: 1.05,
    rice: 1.15,
    corn: 1.1,
    soybean: 0.9,
    cotton: 0.95,
    tomato: 1.05,
    potato: 1.0,
    sugarcane: 1.25,
    banana: 1.1,
    vegetables: 0.95,
    orchard: 0.85,
  };

  // Soil water holding capacity (mm/m depth)
  const soilWaterCapacity: Record<string, number> = {
    sandy: 80,
    loam: 150,
    clay: 200,
    silt: 120,
  };

  // Irrigation efficiency
  const irrigationEfficiency: Record<string, number> = {
    flood: 0.6,
    sprinkler: 0.75,
    drip: 0.9,
  };

  const calculate = () => {
    const area = parseFloat(fieldArea);
    const et = parseFloat(evapotranspiration);
    const interval = parseInt(irrigationInterval);
    const kc = cropCoefficients[cropType];
    const soilCapacity = soilWaterCapacity[soilType];
    const efficiency = irrigationEfficiency[irrigationMethod];

    if (isNaN(area) || area <= 0 || isNaN(et) || et <= 0 || isNaN(interval) || interval <= 0) return;

    // Convert area to square meters
    let areaInSqm = area;
    if (areaUnit === "hectare") {
      areaInSqm = area * 10000;
    } else if (areaUnit === "acre") {
      areaInSqm = area * 4046.86;
    }

    // Calculate crop evapotranspiration (ETc = ETo × Kc)
    const etc = et * kc; // mm/day

    // Daily water need in cubic meters (mm × area in hectares)
    const dailyWaterM3 = (etc / 1000) * (areaInSqm / 10000) * 10000; // m³/day

    // Total water per irrigation cycle
    const totalWaterM3 = dailyWaterM3 * interval;

    // Adjust for irrigation efficiency
    const actualWaterNeeded = totalWaterM3 / efficiency;

    // Convert to liters and gallons
    const waterInLiters = actualWaterNeeded * 1000;
    const waterInGallons = actualWaterNeeded * 264.172;

    // Irrigation depth (mm)
    const irrigationDepth = etc * interval;

    setResult({
      dailyWaterNeed: Math.round(dailyWaterM3 * 100) / 100,
      totalWaterPerIrrigation: Math.round(actualWaterNeeded * 100) / 100,
      waterInLiters: Math.round(waterInLiters),
      waterInGallons: Math.round(waterInGallons),
      irrigationDepth: Math.round(irrigationDepth * 100) / 100,
    });
  };

  const reset = () => {
    setFieldArea("");
    setEvapotranspiration("5");
    setIrrigationInterval("7");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Irrigation Water Calculator – Calculate Water Needed for Crop Irrigation
          </h1>
          <p className="text-muted-foreground">
            Optimize water usage on your farm with our Irrigation Water Calculator. Enter crop
            type, field size, soil type, and evapotranspiration rate to calculate the precise water
            volume needed for efficient irrigation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fieldArea">Field Area</Label>
                <div className="flex gap-2">
                  <Input
                    id="fieldArea"
                    type="number"
                    placeholder="e.g., 10"
                    value={fieldArea}
                    onChange={(e) => setFieldArea(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={areaUnit} onValueChange={(v) => setAreaUnit(v as "acre" | "hectare" | "sqm")}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hectare">Hectares</SelectItem>
                      <SelectItem value="acre">Acres</SelectItem>
                      <SelectItem value="sqm">m²</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cropType">Crop Type</Label>
                <Select value={cropType} onValueChange={setCropType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="rice">Rice/Paddy</SelectItem>
                    <SelectItem value="corn">Corn/Maize</SelectItem>
                    <SelectItem value="soybean">Soybean</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="tomato">Tomato</SelectItem>
                    <SelectItem value="potato">Potato</SelectItem>
                    <SelectItem value="sugarcane">Sugarcane</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="orchard">Orchard/Fruit Trees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type</Label>
                <Select value={soilType} onValueChange={(v) => setSoilType(v as "sandy" | "loam" | "clay" | "silt")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sandy">Sandy (Low water retention)</SelectItem>
                    <SelectItem value="loam">Loam (Medium retention)</SelectItem>
                    <SelectItem value="clay">Clay (High retention)</SelectItem>
                    <SelectItem value="silt">Silt (Medium-high retention)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="evapotranspiration">Evapotranspiration Rate (mm/day)</Label>
                <Input
                  id="evapotranspiration"
                  type="number"
                  placeholder="5"
                  step="0.1"
                  value={evapotranspiration}
                  onChange={(e) => setEvapotranspiration(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Typical: 3-8 mm/day depending on climate
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="irrigationInterval">Irrigation Interval (Days)</Label>
                <Input
                  id="irrigationInterval"
                  type="number"
                  placeholder="7"
                  value={irrigationInterval}
                  onChange={(e) => setIrrigationInterval(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="irrigationMethod">Irrigation Method</Label>
                <Select value={irrigationMethod} onValueChange={(v) => setIrrigationMethod(v as "flood" | "sprinkler" | "drip")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flood">Flood Irrigation (60% efficient)</SelectItem>
                    <SelectItem value="sprinkler">Sprinkler (75% efficient)</SelectItem>
                    <SelectItem value="drip">Drip Irrigation (90% efficient)</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Irrigation Water Requirements</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Water Per Irrigation</p>
                    <p className="text-3xl font-bold text-primary">{result.totalWaterPerIrrigation} m³</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Daily Water Need</p>
                      <p className="text-lg font-bold">{result.dailyWaterNeed} m³/day</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Irrigation Depth</p>
                      <p className="text-lg font-bold">{result.irrigationDepth} mm</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">In Liters</p>
                      <p className="text-lg font-bold">{(result.waterInLiters / 1000).toFixed(0)}K L</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">In Gallons</p>
                      <p className="text-lg font-bold">{(result.waterInGallons / 1000).toFixed(0)}K gal</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>Tip:</strong> Drip irrigation can save 30-50% water compared to flood
                      irrigation while improving crop yields.
                    </p>
                    <p>
                      <strong>Soil moisture:</strong> {soilType === "sandy" ? "Water frequently in small amounts" :
                        soilType === "clay" ? "Water less frequently but deeply" :
                          "Moderate watering schedule"}
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
          <h3 className="text-lg font-semibold mb-3">Irrigation Calculation Formula</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>ETc (Crop ET) = ETo × Kc (Crop Coefficient)</div>
            <div>Daily Water (m³) = ETc (mm) × Area (hectares)</div>
            <div>Total Water = Daily Water × Irrigation Interval</div>
            <div>Actual Water Needed = Total Water ÷ Irrigation Efficiency</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Example:</strong> 10 hectare wheat field, ET = 5mm/day, 7-day interval, flood irrigation
            <br />
            ETc = 5 × 1.05 = 5.25 mm/day
            <br />
            Daily water = 5.25 × 10 = 52.5 m³/day
            <br />
            Total water = 52.5 × 7 / 0.6 = 612.5 m³ per irrigation
          </p>
        </div>
      </div>
    </div>
  );
}
