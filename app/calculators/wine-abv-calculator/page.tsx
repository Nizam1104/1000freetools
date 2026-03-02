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

interface WineABVResult {
  abv: number;
  abvMethod: string;
  fg: number;
  og: number;
  attenuation: number;
  wineType: string;
  sweetnessLevel: string;
  alcoholCategory: string;
}

export default function WineABVCalculatorPage() {
  const [initialGravity, setInitialGravity] = useState<string>("");
  const [finalGravity, setFinalGravity] = useState<string>("");
  const [initialBrix, setInitialBrix] = useState<string>("");
  const [finalBrix, setFinalBrix] = useState<string>("");
  const [measurementType, setMeasurementType] = useState<string>("gravity");
  const [result, setResult] = useState<WineABVResult | null>(null);

  const calculate = () => {
    let og = 0;
    let fg = 0;
    let abv = 0;

    if (measurementType === "gravity") {
      og = parseFloat(initialGravity) || 0;
      fg = parseFloat(finalGravity) || 0;
    } else {
      // Convert Brix to gravity
      // SG = 1 + (Brix / (258.6 - ((Brix / 258.2) * 227.1)))
      const brixToGravity = (brix: number) => {
        return 1 + (brix / (258.6 - ((brix / 258.2) * 227.1)));
      };
      og = brixToGravity(parseFloat(initialBrix) || 0);
      fg = brixToGravity(parseFloat(finalBrix) || 0);
    }

    if (og === 0 || fg === 0) return;

    // ABV calculation using standard formula
    // ABV = (OG - FG) * 131.25
    abv = (og - fg) * 131.25;

    // More accurate formula for higher ABV
    // ABV = (76.08 * (OG - FG) / (1.775 - OG)) * (FG / 0.794)
    const abvAdvanced = (76.08 * (og - fg) / (1.775 - og)) * (fg / 0.794);

    // Use average of both methods for better accuracy
    abv = (abv + abvAdvanced) / 2;

    // Calculate attenuation
    const apparentAttenuation = ((og - fg) / (og - 1)) * 100;

    // Determine wine type based on ABV
    let wineType = "";
    let alcoholCategory = "";
    let sweetnessLevel = "";

    if (abv < 5) {
      wineType = "Light Wine / Wine Cooler";
      alcoholCategory = "Low Alcohol";
    } else if (abv < 10) {
      wineType = "Light Table Wine";
      alcoholCategory = "Moderate Alcohol";
    } else if (abv < 13) {
      wineType = "Table Wine";
      alcoholCategory = "Standard Alcohol";
    } else if (abv < 15) {
      wineType = "Full-Bodied Wine";
      alcoholCategory = "High Alcohol";
    } else if (abv < 18) {
      wineType = "Fortified Wine Style";
      alcoholCategory = "Very High Alcohol";
    } else {
      wineType = "Fortified Wine / Dessert Wine";
      alcoholCategory = "Extremely High Alcohol";
    }

    // Sweetness based on final gravity
    if (fg < 1.000) {
      sweetnessLevel = "Bone Dry";
    } else if (fg < 1.004) {
      sweetnessLevel = "Dry";
    } else if (fg < 1.012) {
      sweetnessLevel = "Off-Dry";
    } else if (fg < 1.020) {
      sweetnessLevel = "Medium Sweet";
    } else if (fg < 1.030) {
      sweetnessLevel = "Sweet";
    } else {
      sweetnessLevel = "Very Sweet";
    }

    setResult({
      abv: parseFloat(abv.toFixed(2)),
      abvMethod: "Average of standard and advanced formulas",
      fg: parseFloat(fg.toFixed(4)),
      og: parseFloat(og.toFixed(4)),
      attenuation: parseFloat(apparentAttenuation.toFixed(1)),
      wineType,
      sweetnessLevel,
      alcoholCategory,
    });
  };

  const reset = () => {
    setInitialGravity("");
    setFinalGravity("");
    setInitialBrix("");
    setFinalBrix("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Wine ABV Calculator – Calculate Alcohol Content in Homemade Wine
          </h1>
          <p className="text-muted-foreground">
            Measure the strength of your homemade wine with our Wine ABV Calculator.
            Use initial and final hydrometer gravity readings or Brix sugar levels to
            calculate ABV percentage — perfect for home winemakers and fermentation enthusiasts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="measurement-type">Measurement Type</Label>
                <Select value={measurementType} onValueChange={setMeasurementType}>
                  <SelectTrigger id="measurement-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gravity">Specific Gravity (SG)</SelectItem>
                    <SelectItem value="brix">Brix (°Bx)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {measurementType === "gravity" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="initial-gravity">Original Gravity (OG)</Label>
                    <Input
                      id="initial-gravity"
                      type="number"
                      step="0.001"
                      value={initialGravity}
                      onChange={(e) => setInitialGravity(e.target.value)}
                      placeholder="e.g., 1.090"
                    />
                    <p className="text-xs text-muted-foreground">
                      Typical range: 1.070 - 1.120
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="final-gravity">Final Gravity (FG)</Label>
                    <Input
                      id="final-gravity"
                      type="number"
                      step="0.001"
                      value={finalGravity}
                      onChange={(e) => setFinalGravity(e.target.value)}
                      placeholder="e.g., 0.995"
                    />
                    <p className="text-xs text-muted-foreground">
                      Typical range: 0.990 - 1.010
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="initial-brix">Initial Brix</Label>
                    <Input
                      id="initial-brix"
                      type="number"
                      step="0.1"
                      value={initialBrix}
                      onChange={(e) => setInitialBrix(e.target.value)}
                      placeholder="e.g., 22"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="final-brix">Final Brix</Label>
                    <Input
                      id="final-brix"
                      type="number"
                      step="0.1"
                      value={finalBrix}
                      onChange={(e) => setFinalBrix(e.target.value)}
                      placeholder="e.g., 0"
                    />
                  </div>
                </>
              )}

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
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Alcohol by Volume</p>
                    <p className="text-5xl font-bold text-primary">{result.abv}%</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Original Gravity</p>
                      <p className="text-lg font-semibold">{result.og}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Final Gravity</p>
                      <p className="text-lg font-semibold">{result.fg}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Attenuation:</span>
                      <span className="font-semibold">{result.attenuation}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Wine Type:</span>
                      <span className="font-semibold">{result.wineType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Sweetness:</span>
                      <span className="font-semibold">{result.sweetnessLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Category:</span>
                      <span className="font-semibold">{result.alcoholCategory}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Formula:</strong> ABV = (OG - FG) × 131.25 (standard)
                      <br />
                      Advanced formula also applied for accuracy
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your gravity readings and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Wine ABV Calculation
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Alcohol by Volume (ABV) is calculated by measuring the sugar content
                  before and after fermentation. Yeast converts sugar to alcohol, causing
                  the specific gravity to drop.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Original Gravity (OG):</strong> Sugar content before fermentation
                  </li>
                  <li>
                    <strong>Final Gravity (FG):</strong> Remaining sugar after fermentation
                  </li>
                  <li>
                    <strong>Standard Formula:</strong> ABV = (OG - FG) × 131.25
                  </li>
                  <li>
                    <strong>Brix:</strong> Alternative sugar measurement (degrees Brix)
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Take readings at stable temperatures (60°F/15.5°C)
                  for accuracy. Hydrometers are typically calibrated at this temperature.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
