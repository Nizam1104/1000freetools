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

interface VolumetricResult {
  dimensions: { length: number; width: number; height: number };
  actualWeight: number;
  volumetricWeight: number;
  billableWeight: number;
  divisor: number;
  carrier: string;
  recommendations: string[];
}

export default function VolumetricWeightCalculatorPage() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [actualWeight, setActualWeight] = useState<string>("");
  const [carrier, setCarrier] = useState<string>("standard");
  const [unit, setUnit] = useState<string>("cm");
  const [result, setResult] = useState<VolumetricResult | null>(null);

  const calculate = () => {
    const lengthNum = parseFloat(length) || 0;
    const widthNum = parseFloat(width) || 0;
    const heightNum = parseFloat(height) || 0;
    const actualWeightNum = parseFloat(actualWeight) || 0;

    if (lengthNum === 0 || widthNum === 0 || heightNum === 0) return;

    // Divisors by carrier
    const divisors: Record<string, { value: number; name: string }> = {
      standard: { value: 5000, name: "Standard (5000)" },
      express: { value: 5000, name: "Express (5000)" },
      economy: { value: 6000, name: "Economy (6000)" },
      fedex: { value: 5000, name: "FedEx (5000)" },
      ups: { value: 5000, name: "UPS (5000)" },
      dhl: { value: 5000, name: "DHL (5000)" },
    };

    const divisorData = divisors[carrier] || divisors.standard;
    const divisor = divisorData.value;

    // Calculate volumetric weight
    let volumetricWeight = 0;

    if (unit === "cm") {
      volumetricWeight = (lengthNum * widthNum * heightNum) / divisor;
    } else if (unit === "inches") {
      // For inches, divisor is typically 139
      volumetricWeight = (lengthNum * widthNum * heightNum) / 139;
    }

    // Billable weight is the greater of actual or volumetric
    const billableWeight = Math.max(actualWeightNum, volumetricWeight);

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📦 Dimensions: ${lengthNum} × ${widthNum} × ${heightNum} ${unit}`);
    recommendations.push(`⚖️ Actual weight: ${actualWeightNum} kg`);
    recommendations.push(`📊 Volumetric weight: ${volumetricWeight.toFixed(2)} kg`);

    if (billableWeight === volumetricWeight) {
      recommendations.push("⚠️ Charged by volumetric weight - package is lightweight but bulky");
      recommendations.push("💡 Consider smaller packaging to reduce shipping costs");
    } else {
      recommendations.push("✅ Charged by actual weight - dense package");
    }

    recommendations.push(`🚚 Carrier divisor: ${divisor}`);
    recommendations.push("📏 Measure at the longest points of each dimension");

    setResult({
      dimensions: { length: lengthNum, width: widthNum, height: heightNum },
      actualWeight: actualWeightNum,
      volumetricWeight: parseFloat(volumetricWeight.toFixed(2)),
      billableWeight: parseFloat(billableWeight.toFixed(2)),
      divisor,
      carrier: divisorData.name,
      recommendations,
    });
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setHeight("");
    setActualWeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Volumetric Weight Calculator – Calculate Dimensional Weight for Shipping
          </h1>
          <p className="text-muted-foreground">
            Avoid shipping cost surprises with our Volumetric Weight Calculator.
            Enter your parcel&apos;s dimensions to calculate dimensional weight using
            standard carrier divisors — and see which weight (actual vs. volumetric)
            will be charged.
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
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="30"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="20"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="15"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="unit">Dimension Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">Centimeters</SelectItem>
                      <SelectItem value="inches">Inches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="carrier">Carrier/Service</Label>
                  <Select value={carrier} onValueChange={setCarrier}>
                    <SelectTrigger id="carrier">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (5000)</SelectItem>
                      <SelectItem value="express">Express (5000)</SelectItem>
                      <SelectItem value="economy">Economy (6000)</SelectItem>
                      <SelectItem value="fedex">FedEx (5000)</SelectItem>
                      <SelectItem value="ups">UPS (5000)</SelectItem>
                      <SelectItem value="dhl">DHL (5000)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="actual-weight">Actual Weight (kg)</Label>
                <Input
                  id="actual-weight"
                  type="number"
                  step="0.1"
                  value={actualWeight}
                  onChange={(e) => setActualWeight(e.target.value)}
                  placeholder="2.5"
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
              <h3 className="text-lg font-semibold mb-4">Weight Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.billableWeight === result.volumetricWeight
                      ? "bg-amber-100 dark:bg-amber-900/20"
                      : "bg-green-100 dark:bg-green-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Billable Weight</p>
                    <p className="text-4xl font-bold">{result.billableWeight} kg</p>
                    <p className="text-sm mt-1">
                      {result.billableWeight === result.volumetricWeight
                        ? "Charged by volume"
                        : "Charged by actual weight"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Actual Weight</p>
                      <p className="text-xl font-bold">{result.actualWeight} kg</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Volumetric Weight</p>
                      <p className="text-xl font-bold">{result.volumetricWeight} kg</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Carrier:</span>
                      <span className="font-semibold">{result.carrier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Divisor:</span>
                      <span className="font-semibold">{result.divisor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Volume:</span>
                      <span className="font-semibold">
                        {(result.dimensions.length * result.dimensions.width * result.dimensions.height).toFixed(0)} {unit}³
                      </span>
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
                  <p>Enter package details and click Calculate to see weights</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Volumetric Weight
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Formula (cm):</strong> (L × W × H) / 5000
                  </li>
                  <li>
                    <strong>Formula (inches):</strong> (L × W × H) / 139
                  </li>
                  <li>
                    <strong>Billable weight:</strong> Greater of actual or volumetric
                  </li>
                  <li>
                    <strong>Lower divisor:</strong> Higher volumetric weight (more expensive)
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Use the smallest box possible and remove excess
                  air from bags to minimize volumetric weight charges. Carriers use this
                  to charge for lightweight but bulky packages.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
