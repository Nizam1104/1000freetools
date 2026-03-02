"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CropYieldEstimatorPage() {
  const [cropType, setCropType] = useState<string>("wheat");
  const [fieldArea, setFieldArea] = useState<string>("");
  const [areaUnit, setAreaUnit] = useState<"acre" | "hectare">("acre");
  const [plantPopulation, setPlantPopulation] = useState<string>("");
  const [avgWeightPerPlant, setAvgWeightPerPlant] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"grams" | "kg" | "lbs">("grams");
  const [survivalRate, setSurvivalRate] = useState<string>("90");
  const [result, setResult] = useState<{
    totalPlants: number;
    survivingPlants: number;
    estimatedYield: number;
    yieldPerArea: number;
    marketableYield: number;
  } | null>(null);

  // Average yields per hectare for different crops (kg/ha)
  const averageYields: Record<string, { min: number; max: number; unit: string }> = {
    wheat: { min: 3000, max: 8000, unit: "kg/ha" },
    rice: { min: 4000, max: 10000, unit: "kg/ha" },
    corn: { min: 5000, max: 12000, unit: "kg/ha" },
    soybean: { min: 2000, max: 4000, unit: "kg/ha" },
    cotton: { min: 800, max: 2000, unit: "kg/ha" },
    tomato: { min: 20000, max: 50000, unit: "kg/ha" },
    potato: { min: 15000, max: 40000, unit: "kg/ha" },
    sugarcane: { min: 50000, max: 100000, unit: "kg/ha" },
    banana: { min: 20000, max: 50000, unit: "kg/ha" },
    vegetables: { min: 5000, max: 20000, unit: "kg/ha" },
  };

  const calculate = () => {
    const area = parseFloat(fieldArea);
    const plants = parseFloat(plantPopulation);
    let weightPerPlant = parseFloat(avgWeightPerPlant);
    const survival = parseFloat(survivalRate) / 100;

    if (isNaN(area) || area <= 0 || isNaN(plants) || plants <= 0 || 
        isNaN(weightPerPlant) || weightPerPlant <= 0 || isNaN(survival) || survival <= 0) return;

    // Convert area to hectares
    let areaInHectares = area;
    if (areaUnit === "acre") {
      areaInHectares = area * 0.404686;
    }

    // Convert weight to kg
    let weightInKg = weightPerPlant;
    if (weightUnit === "grams") {
      weightInKg = weightPerPlant / 1000;
    } else if (weightUnit === "lbs") {
      weightInKg = weightPerPlant * 0.453592;
    }

    // Total plants in field
    const totalPlants = Math.round(plants * areaInHectares);

    // Surviving plants after accounting for mortality
    const survivingPlants = Math.round(totalPlants * survival);

    // Estimated yield
    const estimatedYield = survivingPlants * weightInKg;

    // Yield per unit area
    const yieldPerArea = estimatedYield / areaInHectares;

    // Marketable yield (assuming 90% is marketable)
    const marketableYield = estimatedYield * 0.9;

    setResult({
      totalPlants,
      survivingPlants,
      estimatedYield: Math.round(estimatedYield),
      yieldPerArea: Math.round(yieldPerArea),
      marketableYield: Math.round(marketableYield),
    });
  };

  const reset = () => {
    setFieldArea("");
    setPlantPopulation("");
    setAvgWeightPerPlant("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Crop Yield Estimator – Predict Your Farm's Harvest Before It Happens
          </h1>
          <p className="text-muted-foreground">
            Plan ahead with our Crop Yield Estimator. Input plant population, average weight per
            unit, and field area to project your total harvest in kg, tons, or bushels per acre.
            Useful for market planning, insurance, and farm management.
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
                    <SelectItem value="tomato">Tomato</SelectItem>
                    <SelectItem value="potato">Potato</SelectItem>
                    <SelectItem value="sugarcane">Sugarcane</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
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
                <Label htmlFor="plantPopulation">Plant Population (per {areaUnit})</Label>
                <Input
                  id="plantPopulation"
                  type="number"
                  placeholder={areaUnit === "acre" ? "e.g., 100000" : "e.g., 250000"}
                  value={plantPopulation}
                  onChange={(e) => setPlantPopulation(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avgWeightPerPlant">Average Weight per Plant</Label>
                <div className="flex gap-2">
                  <Input
                    id="avgWeightPerPlant"
                    type="number"
                    placeholder={weightUnit === "grams" ? "e.g., 50" : "e.g., 0.05"}
                    value={avgWeightPerPlant}
                    onChange={(e) => setAvgWeightPerPlant(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={weightUnit} onValueChange={(v) => setWeightUnit(v as "grams" | "kg" | "lbs")}>
                    <SelectTrigger className="w-[80px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grams">grams</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="survivalRate">Plant Survival Rate (%)</Label>
                <Input
                  id="survivalRate"
                  type="number"
                  placeholder="90"
                  value={survivalRate}
                  onChange={(e) => setSurvivalRate(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Typical: 85-95% depending on conditions
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
              <h3 className="text-lg font-semibold mb-4">Yield Estimate Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Estimated Total Yield</p>
                    <p className="text-3xl font-bold text-primary">{result.estimatedYield.toLocaleString()} kg</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      ({(result.estimatedYield / 1000).toFixed(2)} metric tons)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Yield per {areaUnit}</p>
                      <p className="text-lg font-bold">{result.yieldPerArea.toLocaleString()} kg/{areaUnit}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Marketable Yield</p>
                      <p className="text-lg font-bold">{result.marketableYield.toLocaleString()} kg</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Plants</p>
                      <p className="text-lg font-bold">{result.totalPlants.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Surviving Plants</p>
                      <p className="text-lg font-bold">{result.survivingPlants.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2 text-sm">Average Yield Range ({cropType})</h4>
                    <p className="text-sm text-muted-foreground">
                      {averageYields[cropType]?.min.toLocaleString()} - {averageYields[cropType]?.max.toLocaleString()} kg/ha
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your estimate: {result.yieldPerArea.toLocaleString()} kg/{areaUnit} 
                      ({areaUnit === "acre" ? (result.yieldPerArea * 2.471).toFixed(0) : result.yieldPerArea} kg/ha)
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
          <h3 className="text-lg font-semibold mb-3">Yield Calculation Formula</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Total Plants = Plant Population × Field Area</div>
            <div>Surviving Plants = Total Plants × (Survival Rate / 100)</div>
            <div>Estimated Yield = Surviving Plants × Weight per Plant</div>
            <div>Marketable Yield = Estimated Yield × 0.9 (90% marketable)</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Note:</strong> Actual yields may vary based on weather, soil fertility, pest
            pressure, and farming practices. Use this as a planning estimate.
          </p>
        </div>
      </div>
    </div>
  );
}
