"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SoilPhAdjustmentCalculatorPage() {
  const [currentPh, setCurrentPh] = useState<string>("");
  const [targetPh, setTargetPh] = useState<string>("");
  const [soilType, setSoilType] = useState<"sandy" | "loam" | "clay" | "organic">("loam");
  const [fieldArea, setFieldArea] = useState<string>("");
  const [areaUnit, setAreaUnit] = useState<"sqm" | "acre" | "hectare">("sqm");
  const [adjustmentType, setAdjustmentType] = useState<"raise" | "lower">("raise");
  const [result, setResult] = useState<{
    phDifference: number;
    limeRequired: number;
    sulfurRequired: number;
    recommendation: string;
  } | null>(null);

  // Lime requirement (kg per 100 sqm per pH unit change)
  const limeRequirements: Record<string, number> = {
    sandy: 1.5,
    loam: 2.5,
    clay: 3.5,
    organic: 2.0,
  };

  // Sulfur requirement (kg per 100 sqm per pH unit change)
  const sulfurRequirements: Record<string, number> = {
    sandy: 0.5,
    loam: 0.8,
    clay: 1.2,
    organic: 0.6,
  };

  const calculate = () => {
    const current = parseFloat(currentPh);
    const target = parseFloat(targetPh);
    const area = parseFloat(fieldArea);

    if (isNaN(current) || isNaN(target) || isNaN(area) ||
      current <= 0 || current > 14 || target <= 0 || target > 14 || area <= 0) return;

    const phDiff = target - current;
    const absPhDiff = Math.abs(phDiff);

    // Convert area to square meters
    let areaInSqm = area;
    if (areaUnit === "acre") {
      areaInSqm = area * 4046.86;
    } else if (areaUnit === "hectare") {
      areaInSqm = area * 10000;
    }

    // Calculate amendments needed
    const limeRate = limeRequirements[soilType];
    const sulfurRate = sulfurRequirements[soilType];

    // Amount needed per 100 sqm
    const limePer100Sqm = limeRate * absPhDiff;
    const sulfurPer100Sqm = sulfurRate * absPhDiff;

    // Total amount for the field
    const limeRequired = (limePer100Sqm * areaInSqm) / 100;
    const sulfurRequired = (sulfurPer100Sqm * areaInSqm) / 100;

    // Determine recommendation
    let recommendation = "";
    if (phDiff > 0.2) {
      recommendation = `Apply ${limeRequired.toFixed(1)} kg of agricultural lime to raise pH from ${current} to ${target}`;
    } else if (phDiff < -0.2) {
      recommendation = `Apply ${sulfurRequired.toFixed(1)} kg of elemental sulfur to lower pH from ${current} to ${target}`;
    } else {
      recommendation = "pH is within acceptable range. No adjustment needed.";
    }

    setResult({
      phDifference: Math.round(phDiff * 100) / 100,
      limeRequired: Math.round(limeRequired * 100) / 100,
      sulfurRequired: Math.round(sulfurRequired * 100) / 100,
      recommendation,
    });
  };

  const reset = () => {
    setCurrentPh("");
    setTargetPh("");
    setFieldArea("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Soil pH Adjustment Calculator – How Much Lime or Sulfur to Add to Your Soil
          </h1>
          <p className="text-muted-foreground">
            Correct your soil pH for optimal crop growth with our Soil pH Adjustment Calculator.
            Enter your current soil pH, target pH, soil type, and field area to calculate the
            exact amount of agricultural lime or sulfur to apply.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPh">Current Soil pH</Label>
                <Input
                  id="currentPh"
                  type="number"
                  placeholder="e.g., 5.5"
                  step="0.1"
                  min="0"
                  max="14"
                  value={currentPh}
                  onChange={(e) => setCurrentPh(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Test your soil with a pH meter or test kit
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetPh">Target pH</Label>
                <Input
                  id="targetPh"
                  type="number"
                  placeholder="e.g., 6.5"
                  step="0.1"
                  min="0"
                  max="14"
                  value={targetPh}
                  onChange={(e) => setTargetPh(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Most crops prefer pH 6.0-7.0
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type</Label>
                <Select value={soilType} onValueChange={(v) => setSoilType(v as "sandy" | "loam" | "clay" | "organic")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sandy">Sandy (Light)</SelectItem>
                    <SelectItem value="loam">Loam (Medium)</SelectItem>
                    <SelectItem value="clay">Clay (Heavy)</SelectItem>
                    <SelectItem value="organic">Organic/Peaty</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fieldArea">Field/Garden Area</Label>
                <div className="flex gap-2">
                  <Input
                    id="fieldArea"
                    type="number"
                    placeholder="e.g., 100"
                    value={fieldArea}
                    onChange={(e) => setFieldArea(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={areaUnit} onValueChange={(v) => setAreaUnit(v as "sqm" | "acre" | "hectare")}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sqm">m²</SelectItem>
                      <SelectItem value="acre">Acres</SelectItem>
                      <SelectItem value="hectare">Hectares</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-semibold mb-1">Adjustment Needed:</p>
                {currentPh && targetPh && (
                  <p className="text-lg">
                    {parseFloat(targetPh) > parseFloat(currentPh) + 0.2 ? (
                      <span className="text-green-600">↑ Raise pH (Add Lime)</span>
                    ) : parseFloat(targetPh) < parseFloat(currentPh) - 0.2 ? (
                      <span className="text-amber-600">↓ Lower pH (Add Sulfur)</span>
                    ) : (
                      <span className="text-muted-foreground">✓ pH is acceptable</span>
                    )}
                  </p>
                )}
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
              <h3 className="text-lg font-semibold mb-4">pH Adjustment Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Recommendation</p>
                    <p className="text-lg font-medium mt-1">{result.recommendation}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Agricultural Lime</p>
                      <p className="text-2xl font-bold">{result.limeRequired} kg</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        To raise pH by {Math.abs(result.phDifference)}
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Elemental Sulfur</p>
                      <p className="text-2xl font-bold">{result.sulfurRequired} kg</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        To lower pH by {Math.abs(result.phDifference)}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">pH Change Required</p>
                    <p className="text-xl font-bold">
                      {result.phDifference > 0 ? "+" : ""}{result.phDifference} pH units
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2 text-sm">Application Tips</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Apply lime or sulfur evenly across the soil surface</li>
                      <li>Incorporate into top 15-20 cm of soil for best results</li>
                      <li>Lime takes 2-3 months to fully react; sulfur takes 3-6 months</li>
                      <li>Re-test soil pH after 3 months before reapplying</li>
                      <li>Don't apply more than 2.5 kg lime or 0.5 kg sulfur per 10 m² at once</li>
                    </ul>
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
          <h3 className="text-lg font-semibold mb-3">Understanding Soil pH</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>pH Difference = Target pH - Current pH</div>
            <div>Lime Required = pH Diff × Soil Factor × Area / 100</div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="font-medium mb-2">pH Scale Reference</h4>
              <div className="text-sm space-y-1">
                <div>3.5-4.5: Very Acidic</div>
                <div>4.5-5.5: Acidic</div>
                <div>5.5-6.5: Slightly Acidic (Ideal for most crops)</div>
                <div>6.5-7.5: Neutral</div>
                <div>7.5-8.5: Alkaline</div>
                <div>8.5+: Very Alkaline</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Optimal pH for Common Crops</h4>
              <div className="text-sm space-y-1">
                <div>Potatoes: 5.0-6.0</div>
                <div>Tomatoes: 6.0-6.8</div>
                <div>Corn/Wheat: 6.0-7.0</div>
                <div>Vegetables: 6.0-7.0</div>
                <div>Alfalfa: 6.5-7.5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
