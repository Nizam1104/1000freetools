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

interface KitchenResult {
  inputValue: number;
  fromUnit: string;
  toUnit: string;
  convertedValue: number;
  convertedFormatted: string;
  conversions: Array<{ unit: string; value: string }>;
  recommendations: string[];
}

export default function KitchenMeasurementConverterPage() {
  const [value, setValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("cup");
  const [toUnit, setToUnit] = useState<string>("tbsp");
  const [result, setResult] = useState<KitchenResult | null>(null);

  // Conversion factors (to ml as base)
  const toMl: Record<string, number> = {
    tsp: 4.929,
    tbsp: 14.787,
    cup: 236.588,
    ml: 1,
    liter: 1000,
    floz: 29.574,
    pint: 473.176,
    quart: 946.353,
    gallon: 3785.41,
    gram: 1, // Approximate for water
    kg: 1000,
    oz: 28.35,
    lb: 453.592,
  };

  const calculate = () => {
    const valueNum = parseFloat(value) || 0;
    if (valueNum === 0) return;

    // Convert to ml (base unit)
    const valueInMl = valueNum * toMl[fromUnit];

    // Convert to target unit
    const convertedValue = valueInMl / toMl[toUnit];

    // Format converted value
    let convertedFormatted = "";
    if (convertedValue < 0.1) {
      convertedFormatted = convertedValue.toFixed(3);
    } else if (convertedValue < 1) {
      convertedFormatted = convertedValue.toFixed(2);
    } else if (convertedValue < 10) {
      convertedFormatted = convertedValue.toFixed(1);
    } else {
      convertedFormatted = Math.round(convertedValue).toString();
    }

    // Generate all conversions
    const conversions = [
      { unit: "tsp", value: (valueInMl / toMl.tsp).toFixed(2) },
      { unit: "tbsp", value: (valueInMl / toMl.tbsp).toFixed(2) },
      { unit: "cup", value: (valueInMl / toMl.cup).toFixed(2) },
      { unit: "ml", value: valueInMl.toFixed(0) },
      { unit: "fl oz", value: (valueInMl / toMl.floz).toFixed(2) },
    ];

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📏 ${valueNum} ${fromUnit} = ${convertedFormatted} ${toUnit}`);

    if (fromUnit === "cup" && toUnit === "tbsp") {
      recommendations.push("💡 1 cup = 16 tablespoons");
    } else if (fromUnit === "tbsp" && toUnit === "tsp") {
      recommendations.push("💡 1 tablespoon = 3 teaspoons");
    }

    if (convertedValue < 1 && toUnit !== "tsp" && toUnit !== "ml") {
      recommendations.push(`💡 Consider using ${toUnit === "cup" ? "tablespoons" : "smaller units"} for accuracy`);
    }

    recommendations.push("🥄 Use proper measuring cups/spoons for baking");
    recommendations.push("⚖️ Weight (grams) is more accurate than volume");

    setResult({
      inputValue: valueNum,
      fromUnit,
      toUnit,
      convertedValue,
      convertedFormatted,
      conversions,
      recommendations,
    });
  };

  const reset = () => {
    setValue("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Kitchen Measurement Converter – Convert Cooking Units Instantly
          </h1>
          <p className="text-muted-foreground">
            Never mess up a recipe conversion again with our Kitchen Measurement Converter.
            Convert between cups, tablespoons, teaspoons, milliliters, and more — supporting
            both US and metric cooking systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="value">Amount</Label>
                <Input
                  id="value"
                  type="number"
                  step="0.1"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="e.g., 1"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="from-unit">From</Label>
                  <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger id="from-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tsp">Teaspoon</SelectItem>
                      <SelectItem value="tbsp">Tablespoon</SelectItem>
                      <SelectItem value="cup">Cup</SelectItem>
                      <SelectItem value="floz">Fluid Ounce</SelectItem>
                      <SelectItem value="pint">Pint</SelectItem>
                      <SelectItem value="quart">Quart</SelectItem>
                      <SelectItem value="ml">Milliliter</SelectItem>
                      <SelectItem value="liter">Liter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="to-unit">To</Label>
                  <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger id="to-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tsp">Teaspoon</SelectItem>
                      <SelectItem value="tbsp">Tablespoon</SelectItem>
                      <SelectItem value="cup">Cup</SelectItem>
                      <SelectItem value="floz">Fluid Ounce</SelectItem>
                      <SelectItem value="ml">Milliliter</SelectItem>
                      <SelectItem value="liter">Liter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Quick Reference:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 1 cup = 16 tbsp = 48 tsp</li>
                  <li>• 1 tbsp = 3 tsp = 15 ml</li>
                  <li>• 1 cup = 237 ml = 8 fl oz</li>
                </ul>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Convert
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Conversion Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Result</p>
                    <p className="text-4xl font-bold text-primary">
                      {result.convertedFormatted} {result.toUnit}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      from {result.inputValue} {result.fromUnit}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">All Conversions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {result.conversions.map((conv, i) => (
                        <div key={i} className="p-2 bg-muted/50 rounded text-sm flex justify-between">
                          <span>{conv.unit}</span>
                          <span className="font-mono">{conv.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter amount and units to convert</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Measurement Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Dry ingredients:</strong> Spoon and level, don&apos;t pack
                  </li>
                  <li>
                    <strong>Liquid ingredients:</strong> Use liquid measuring cups
                  </li>
                  <li>
                    <strong>Weight vs volume:</strong> Weight (grams) is more accurate
                  </li>
                  <li>
                    <strong>International:</strong> US cup = 237ml, UK cup = 284ml
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Volume-to-weight conversions vary by ingredient
                  density. For baking, use a kitchen scale for best results.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
