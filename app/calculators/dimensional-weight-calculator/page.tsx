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

interface DimWeightResult {
  dimensions: { length: number; width: number; height: number };
  actualWeight: number;
  dimWeight: number;
  billableWeight: number;
  carrier: string;
  dimFactor: number;
  savings: string;
  recommendations: string[];
}

export default function DimensionalWeightCalculatorPage() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [actualWeight, setActualWeight] = useState<string>("");
  const [carrier, setCarrier] = useState<string>("fedex");
  const [unit, setUnit] = useState<string>("inches");
  const [result, setResult] = useState<DimWeightResult | null>(null);

  const calculate = () => {
    const lengthNum = parseFloat(length) || 0;
    const widthNum = parseFloat(width) || 0;
    const heightNum = parseFloat(height) || 0;
    const actualWeightNum = parseFloat(actualWeight) || 0;

    if (lengthNum === 0 || widthNum === 0 || heightNum === 0) return;

    // DIM factors by carrier
    const dimFactors: Record<string, number> = {
      fedex: 139,
      ups: 139,
      dhl: 139,
      usps: 166,
      freight: 139,
    };
    const dimFactor = dimFactors[carrier] || 139;

    // Calculate dimensional weight
    let dimWeight = 0;
    
    if (unit === "inches") {
      // (L × W × H) / DIM Factor
      dimWeight = (lengthNum * widthNum * heightNum) / dimFactor;
    } else if (unit === "cm") {
      // (L × W × H) / 5000 (international standard)
      dimWeight = (lengthNum * widthNum * heightNum) / 5000;
      // Convert to lbs
      dimWeight = dimWeight * 2.205;
    }

    // Billable weight is the greater of actual or dimensional
    const billableWeight = Math.max(actualWeightNum, dimWeight);

    // Determine which weight applies
    let savings = "";
    if (dimWeight > actualWeightNum) {
      savings = `⚠️ DIM weight applies (+${(dimWeight - actualWeightNum).toFixed(1)} lbs)`;
    } else {
      savings = `✅ Actual weight applies (DIM would be +${(dimWeight - actualWeightNum).toFixed(1)} lbs)`;
    }

    // Recommendations
    const recommendations: string[] = [];

    if (dimWeight > actualWeightNum) {
      recommendations.push("📦 Your package is lightweight but bulky - DIM pricing applies");
      recommendations.push("💡 Consider smaller packaging to reduce DIM weight");
      recommendations.push("🗑️ Remove excess air/void fill if possible");
    } else {
      recommendations.push("✅ Dense package - you're paying for actual weight");
    }

    if (carrier === "usps") {
      recommendations.push("📬 USPS has higher DIM factor (166) - may be cheaper for light packages");
    }

    recommendations.push(`📏 Current volume: ${(lengthNum * widthNum * heightNum).toFixed(0)} cubic ${unit}`);

    setResult({
      dimensions: { length: lengthNum, width: widthNum, height: heightNum },
      actualWeight: actualWeightNum,
      dimWeight: parseFloat(dimWeight.toFixed(1)),
      billableWeight: parseFloat(billableWeight.toFixed(1)),
      carrier,
      dimFactor,
      savings,
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
            Dimensional Weight Calculator – Calculate DIM Weight for FedEx, UPS & DHL
          </h1>
          <p className="text-muted-foreground">
            Calculate the correct billed weight for your shipments with our Dimensional Weight Calculator.
            Enter package dimensions and select your carrier to apply the correct DIM factor and determine
            whether actual or dimensional weight applies.
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
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="0"
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
                      <SelectItem value="inches">Inches</SelectItem>
                      <SelectItem value="cm">Centimeters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="carrier">Carrier</Label>
                  <Select value={carrier} onValueChange={setCarrier}>
                    <SelectTrigger id="carrier">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fedex">FedEx (DIM: 139)</SelectItem>
                      <SelectItem value="ups">UPS (DIM: 139)</SelectItem>
                      <SelectItem value="dhl">DHL (DIM: 139)</SelectItem>
                      <SelectItem value="usps">USPS (DIM: 166)</SelectItem>
                      <SelectItem value="freight">Freight (DIM: 139)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="actual-weight">Actual Weight (lbs)</Label>
                <Input
                  id="actual-weight"
                  type="number"
                  step="0.1"
                  value={actualWeight}
                  onChange={(e) => setActualWeight(e.target.value)}
                  placeholder="0"
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
              <h3 className="text-lg font-semibold mb-4">DIM Weight Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Actual Weight</p>
                      <p className="text-2xl font-bold">{result.actualWeight} lbs</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">DIM Weight</p>
                      <p className="text-2xl font-bold">{result.dimWeight} lbs</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg text-center ${
                    result.billableWeight === result.dimWeight 
                      ? "bg-amber-100 dark:bg-amber-900/20" 
                      : "bg-green-100 dark:bg-green-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Billable Weight</p>
                    <p className="text-4xl font-bold">{result.billableWeight} lbs</p>
                    <p className="text-sm mt-1">{result.savings}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Carrier:</span>
                      <span className="font-semibold uppercase">{result.carrier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">DIM Factor:</span>
                      <span className="font-semibold">{result.dimFactor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Dimensions:</span>
                      <span className="font-semibold">
                        {result.dimensions.length}×{result.dimensions.width}×{result.dimensions.height} {unit}
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
                  <p>Enter package details and click Calculate to see DIM weight</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Dimensional Weight
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Carriers use dimensional weight to charge for the space a package
                  occupies, not just its actual weight:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Formula (inches):</strong> (L × W × H) / DIM Factor
                  </li>
                  <li>
                    <strong>Formula (cm):</strong> (L × W × H) / 5000
                  </li>
                  <li>
                    <strong>FedEx/UPS/DHL:</strong> DIM factor = 139
                  </li>
                  <li>
                    <strong>USPS:</strong> DIM factor = 166 (better for light packages)
                  </li>
                  <li>
                    <strong>Billable:</strong> Greater of actual or dimensional weight
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Use the smallest box possible and remove excess
                  air from poly bags to minimize DIM weight charges.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
