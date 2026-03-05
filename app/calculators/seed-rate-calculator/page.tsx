"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SeedRateCalculatorPage() {
  const [cropType, setCropType] = useState<string>("wheat");
  const [fieldArea, setFieldArea] = useState<string>("");
  const [areaUnit, setAreaUnit] = useState<"acre" | "hectare">("acre");
  const [germinationRate, setGerminationRate] = useState<string>("90");
  const [rowSpacing, setRowSpacing] = useState<string>("");
  const [spacingUnit, setSpacingUnit] = useState<"cm" | "inches">("cm");
  const [seedSize, setSeedSize] = useState<string>("");
  const [result, setResult] = useState<{
    seedRate: number;
    totalSeeds: number;
    totalWeight: number;
    plantsPerArea: number;
  } | null>(null);

  // Standard seed rates per hectare for different crops (in kg)
  const cropSeedRates: Record<string, { rate: number; unit: string; seedsPerKg: number }> = {
    wheat: { rate: 100, unit: "kg/ha", seedsPerKg: 25000 },
    rice: { rate: 80, unit: "kg/ha", seedsPerKg: 20000 },
    corn: { rate: 20, unit: "kg/ha", seedsPerKg: 3000 },
    soybean: { rate: 60, unit: "kg/ha", seedsPerKg: 6000 },
    cotton: { rate: 15, unit: "kg/ha", seedsPerKg: 10000 },
    sunflower: { rate: 6, unit: "kg/ha", seedsPerKg: 50000 },
    barley: { rate: 90, unit: "kg/ha", seedsPerKg: 22000 },
    oats: { rate: 80, unit: "kg/ha", seedsPerKg: 28000 },
    canola: { rate: 5, unit: "kg/ha", seedsPerKg: 200000 },
    sorghum: { rate: 8, unit: "kg/ha", seedsPerKg: 35000 },
  };

  const calculate = () => {
    const area = parseFloat(fieldArea);
    const germRate = parseFloat(germinationRate) / 100;
    let spacing = parseFloat(rowSpacing);
    let seedSizeNum = parseFloat(seedSize) || 0;

    if (isNaN(area) || area <= 0 || isNaN(germRate) || germRate <= 0) return;

    // Convert area to hectares
    let areaInHectares = area;
    if (areaUnit === "acre") {
      areaInHectares = area * 0.404686;
    }

    // Get base seed rate for crop
    const cropData = cropSeedRates[cropType];
    let baseSeedRate = cropData.rate; // kg per hectare

    // Adjust for germination rate
    const adjustedSeedRate = baseSeedRate / germRate;

    // Calculate total seeds needed
    const seedsPerHectare = cropData.seedsPerKg * adjustedSeedRate;
    const totalSeeds = Math.round(seedsPerHectare * areaInHectares);

    // Calculate total weight
    const totalWeight = adjustedSeedRate * areaInHectares;

    // Calculate plants per unit area based on row spacing
    let plantsPerSqm = 0;
    if (spacing > 0) {
      // Convert spacing to meters
      if (spacingUnit === "cm") {
        spacing = spacing / 100;
      } else {
        spacing = spacing * 0.0254;
      }
      // Plants per square meter = 1 / (row spacing × plant spacing)
      // Assuming plant spacing equals row spacing for simplicity
      plantsPerSqm = 1 / (spacing * spacing);
    }

    setResult({
      seedRate: Math.round(adjustedSeedRate * 100) / 100,
      totalSeeds,
      totalWeight: Math.round(totalWeight * 100) / 100,
      plantsPerArea: Math.round(plantsPerSqm),
    });
  };

  const reset = () => {
    setFieldArea("");
    setRowSpacing("");
    setSeedSize("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Seed Rate Calculator – Calculate Seeds Per Acre for Optimal Crop Yield
          </h1>
          <p className="text-muted-foreground">
            Ensure optimal plant density with our Seed Rate Calculator. Enter crop type, field
            area, germination rate, and spacing to calculate the exact amount of seed required per
            acre or hectare — helping farmers minimize waste and maximize yield.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
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
                    <SelectItem value="sunflower">Sunflower</SelectItem>
                    <SelectItem value="barley">Barley</SelectItem>
                    <SelectItem value="oats">Oats</SelectItem>
                    <SelectItem value="canola">Canola/Rapeseed</SelectItem>
                    <SelectItem value="sorghum">Sorghum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                  <Select value={areaUnit} onValueChange={(v) => setAreaUnit(v as "acre" | "hectare")}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acre">Acres</SelectItem>
                      <SelectItem value="hectare">Hectares</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="germinationRate">Germination Rate (%)</Label>
                <Input
                  id="germinationRate"
                  type="number"
                  placeholder="90"
                  value={germinationRate}
                  onChange={(e) => setGerminationRate(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Check seed packet for germination rate
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rowSpacing">Row Spacing</Label>
                <div className="flex gap-2">
                  <Input
                    id="rowSpacing"
                    type="number"
                    placeholder="e.g., 20"
                    value={rowSpacing}
                    onChange={(e) => setRowSpacing(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={spacingUnit} onValueChange={(v) => setSpacingUnit(v as "cm" | "inches")}>
                    <SelectTrigger className="w-[80px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="inches">inches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              <h3 className="text-lg font-semibold mb-4">Seed Rate Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Seed Required</p>
                    <p className="text-3xl font-bold text-primary">{result.totalWeight} kg</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Seed Rate</p>
                      <p className="text-lg font-bold">{result.seedRate} kg/{areaUnit === "acre" ? "acre" : "ha"}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Seeds</p>
                      <p className="text-lg font-bold">{result.totalSeeds.toLocaleString()}</p>
                    </div>
                  </div>

                  {result.plantsPerArea > 0 && (
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Plant Density</p>
                      <p className="text-xl font-bold">{result.plantsPerArea} plants/m²</p>
                    </div>
                  )}

                  <div className="border-t pt-4 text-sm text-muted-foreground">
                    <p>
                      <strong>Tip:</strong> Always add 10-15% extra seed for field conditions,
                      bird damage, and poor germination areas.
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
          <h3 className="text-lg font-semibold mb-3">Seed Rate Calculation Formula</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Adjusted Seed Rate = Base Rate ÷ (Germination Rate / 100)</div>
            <div>Total Seed = Adjusted Rate × Field Area</div>
            <div>Plant Density = 1 ÷ (Row Spacing × Plant Spacing)</div>
          </div>
          <table className="w-full text-sm mt-3">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Crop</th>
                <th className="text-left py-2">Rate (kg/ha)</th>
                <th className="text-left py-2">Seeds/kg</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Wheat</td>
                <td className="py-2">100</td>
                <td className="py-2">25,000</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Rice</td>
                <td className="py-2">80</td>
                <td className="py-2">20,000</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Corn</td>
                <td className="py-2">20</td>
                <td className="py-2">3,000</td>
              </tr>
              <tr>
                <td className="py-2">Soybean</td>
                <td className="py-2">60</td>
                <td className="py-2">6,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
