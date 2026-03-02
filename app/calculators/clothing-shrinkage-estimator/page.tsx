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

interface ShrinkageResult {
  fabricType: string;
  originalDimensions: { length: number; width: number };
  shrinkageRate: { length: number; width: number };
  newDimensions: { length: number; width: number };
  changeInches: { length: number; width: number };
  careRecommendations: string[];
  washTempImpact: string;
}

const fabricShrinkageRates: Record<string, { length: number; width: number; description: string }> = {
  cotton: { length: 5, width: 3, description: "Natural fiber, prone to shrinkage" },
  cottonPreshrunk: { length: 2, width: 1, description: "Pre-shrunk cotton, minimal shrinkage" },
  wool: { length: 8, width: 5, description: "High shrinkage, especially in hot water" },
  linen: { length: 4, width: 3, description: "Natural fiber, moderate shrinkage" },
  polyester: { length: 1, width: 1, description: "Synthetic, minimal shrinkage" },
  nylon: { length: 1, width: 1, description: "Synthetic, very stable" },
  rayon: { length: 6, width: 4, description: "Semi-synthetic, significant shrinkage" },
  silk: { length: 3, width: 2, description: "Delicate, moderate shrinkage" },
  blend5050: { length: 3, width: 2, description: "Cotton/poly blend, reduced shrinkage" },
  denim: { length: 7, width: 4, description: "Heavy cotton, significant shrinkage" },
};

const washTempMultipliers: Record<string, number> = {
  cold: 0.5,
  warm: 1.0,
  hot: 1.5,
  boiling: 2.0,
};

export default function ClothingShrinkageEstimatorPage() {
  const [fabricType, setFabricType] = useState<string>("cotton");
  const [originalLength, setOriginalLength] = useState<string>("");
  const [originalWidth, setOriginalWidth] = useState<string>("");
  const [washTemp, setWashTemp] = useState<string>("warm");
  const [dryMethod, setDryMethod] = useState<string>("machine");
  const [result, setResult] = useState<ShrinkageResult | null>(null);

  const calculate = () => {
    const lengthNum = parseFloat(originalLength) || 0;
    const widthNum = parseFloat(originalWidth) || 0;

    if (lengthNum === 0 || widthNum === 0) return;

    const baseRate = fabricShrinkageRates[fabricType];
    const tempMultiplier = washTempMultipliers[washTemp] || 1.0;

    // Adjust for drying method
    let dryMultiplier = 1.0;
    if (dryMethod === "machine-high") dryMultiplier = 1.3;
    else if (dryMethod === "machine-low") dryMultiplier = 1.1;
    else if (dryMethod === "air") dryMultiplier = 0.7;

    // Calculate shrinkage
    const lengthShrinkRate = baseRate.length * tempMultiplier * dryMultiplier;
    const widthShrinkRate = baseRate.width * tempMultiplier * dryMultiplier;

    // Calculate new dimensions
    const newLength = lengthNum * (1 - lengthShrinkRate / 100);
    const newWidth = widthNum * (1 - widthShrinkRate / 100);

    // Calculate change
    const lengthChange = lengthNum - newLength;
    const widthChange = widthNum - newWidth;

    // Wash temp impact
    let washTempImpact = "";
    if (washTemp === "cold") {
      washTempImpact = "Cold water minimizes shrinkage - best for delicate fabrics";
    } else if (washTemp === "warm") {
      washTempImpact = "Warm water is standard - expect normal shrinkage";
    } else if (washTemp === "hot") {
      washTempImpact = "Hot water increases shrinkage significantly - use with caution";
    } else {
      washTempImpact = "Boiling water causes maximum shrinkage - not recommended";
    }

    // Care recommendations
    const careRecommendations: string[] = [];
    
    if (fabricType === "cotton" || fabricType === "denim") {
      careRecommendations.push("Wash in cold water to minimize shrinkage");
      careRecommendations.push("Air dry or tumble dry low");
      careRecommendations.push("Remove from dryer while slightly damp");
    } else if (fabricType === "wool") {
      careRecommendations.push("Hand wash or dry clean only");
      careRecommendations.push("Never use hot water or high heat");
      careRecommendations.push("Lay flat to dry to maintain shape");
    } else if (fabricType === "silk") {
      careRecommendations.push("Dry clean recommended");
      careRecommendations.push("If washing, use cold water and gentle cycle");
      careRecommendations.push("Never wring or twist");
    } else if (fabricType === "polyester" || fabricType === "nylon") {
      careRecommendations.push("Low heat drying recommended");
      careRecommendations.push("Remove promptly to prevent wrinkles");
    }

    if (dryMethod === "machine-high") {
      careRecommendations.push("⚠️ High heat drying significantly increases shrinkage");
    }

    setResult({
      fabricType: fabricShrinkageRates[fabricType].description,
      originalDimensions: { length: lengthNum, width: widthNum },
      shrinkageRate: { length: parseFloat(lengthShrinkRate.toFixed(1)), width: parseFloat(widthShrinkRate.toFixed(1)) },
      newDimensions: { length: parseFloat(newLength.toFixed(2)), width: parseFloat(newWidth.toFixed(2)) },
      changeInches: { length: parseFloat(lengthChange.toFixed(2)), width: parseFloat(widthChange.toFixed(2)) },
      careRecommendations,
      washTempImpact,
    });
  };

  const reset = () => {
    setOriginalLength("");
    setOriginalWidth("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Clothing Shrinkage Estimator – Predict How Much Your Clothes Will Shrink
          </h1>
          <p className="text-muted-foreground">
            Avoid ruining your clothes with our Clothing Shrinkage Estimator.
            Enter fabric type, washing temperature, and garment dimensions to predict
            post-wash shrinkage — helping you buy the right size and care for your wardrobe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fabric-type">Fabric Type</Label>
                <Select value={fabricType} onValueChange={setFabricType}>
                  <SelectTrigger id="fabric-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cotton">Cotton (5% length, 3% width)</SelectItem>
                    <SelectItem value="cottonPreshrunk">Cotton (Pre-shrunk)</SelectItem>
                    <SelectItem value="denim">Denim (7% length, 4% width)</SelectItem>
                    <SelectItem value="wool">Wool (8% length, 5% width)</SelectItem>
                    <SelectItem value="linen">Linen (4% length, 3% width)</SelectItem>
                    <SelectItem value="rayon">Rayon (6% length, 4% width)</SelectItem>
                    <SelectItem value="silk">Silk (3% length, 2% width)</SelectItem>
                    <SelectItem value="blend5050">50/50 Cotton/Poly Blend</SelectItem>
                    <SelectItem value="polyester">Polyester (1% length, 1% width)</SelectItem>
                    <SelectItem value="nylon">Nylon (1% length, 1% width)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="length">Length (inches)</Label>
                  <Input
                    id="length"
                    type="number"
                    value={originalLength}
                    onChange={(e) => setOriginalLength(e.target.value)}
                    placeholder="e.g., 28"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="width">Width (inches)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={originalWidth}
                    onChange={(e) => setOriginalWidth(e.target.value)}
                    placeholder="e.g., 20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="wash-temp">Wash Temperature</Label>
                  <Select value={washTemp} onValueChange={setWashTemp}>
                    <SelectTrigger id="wash-temp">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cold">Cold (60-80°F)</SelectItem>
                      <SelectItem value="warm">Warm (90-110°F)</SelectItem>
                      <SelectItem value="hot">Hot (130-150°F)</SelectItem>
                      <SelectItem value="boiling">Boiling (212°F)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="dry-method">Drying Method</Label>
                  <Select value={dryMethod} onValueChange={setDryMethod}>
                    <SelectTrigger id="dry-method">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="air">Air Dry</SelectItem>
                      <SelectItem value="machine-low">Machine Low Heat</SelectItem>
                      <SelectItem value="machine">Machine Medium Heat</SelectItem>
                      <SelectItem value="machine-high">Machine High Heat</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Shrinkage Estimate</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-2">Length</p>
                      <p className="text-sm line-through text-muted-foreground">{result.originalDimensions.length}&quot;</p>
                      <p className="text-2xl font-bold text-red-600">{result.newDimensions.length}&quot;</p>
                      <p className="text-xs text-red-600">-{result.changeInches.length}&quot; ({result.shrinkageRate.length}%)</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-2">Width</p>
                      <p className="text-sm line-through text-muted-foreground">{result.originalDimensions.width}&quot;</p>
                      <p className="text-2xl font-bold text-red-600">{result.newDimensions.width}&quot;</p>
                      <p className="text-xs text-red-600">-{result.changeInches.width}&quot; ({result.shrinkageRate.width}%)</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">Fabric:</p>
                    <p className="text-sm text-muted-foreground">{result.fabricType}</p>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {result.washTempImpact}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Care Recommendations</h4>
                    <ul className="space-y-1">
                      {result.careRecommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter garment details and click Calculate to see shrinkage estimate</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Fabric Shrinkage Guide
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Cotton:</strong> Natural fiber that shrinks 3-5% typically,
                    up to 10% in hot water
                  </li>
                  <li>
                    <strong>Wool:</strong> Highest shrinkage risk - can felt in hot water
                  </li>
                  <li>
                    <strong>Synthetics:</strong> Polyester and nylon are very stable
                  </li>
                  <li>
                    <strong>Blends:</strong> Cotton/poly blends shrink less than 100% cotton
                  </li>
                  <li>
                    <strong>Pre-shrunk:</strong> Look for &quot;pre-shrunk&quot; label for minimal shrinkage
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Always wash new clothes in cold water first to
                  minimize initial shrinkage. When in doubt, air dry!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
