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

interface DetergentType {
  name: string;
  concentration: "regular" | "concentrated" | "ultra";
  form: "liquid" | "powder" | "pods";
  ozPerLoad: number;
}

const detergentTypes: DetergentType[] = [
  { name: "Liquid (Regular)", concentration: "regular", form: "liquid", ozPerLoad: 2 },
  { name: "Liquid (Concentrated)", concentration: "concentrated", form: "liquid", ozPerLoad: 1 },
  { name: "Liquid (Ultra)", concentration: "ultra", form: "liquid", ozPerLoad: 0.5 },
  { name: "Powder (Regular)", concentration: "regular", form: "powder", ozPerLoad: 2.5 },
  { name: "Powder (Concentrated)", concentration: "concentrated", form: "powder", ozPerLoad: 1.5 },
  { name: "Pods", concentration: "concentrated", form: "pods", ozPerLoad: 1 },
];

interface LaundryResult {
  recommendedAmount: number;
  unit: string;
  podsCount?: number;
  costPerLoad: number;
  totalLoads: number;
  recommendation: string;
  waterHardnessAdjustment: number;
}

export default function LaundryDetergentCalculatorPage() {
  const [loadSize, setLoadSize] = useState<string>("medium");
  const [machineType, setMachineType] = useState<string>("he");
  const [waterHardness, setWaterHardness] = useState<string>("medium");
  const [detergentType, setDetergentType] = useState<string>("Liquid (Concentrated)");
  const [containerSize, setContainerSize] = useState<string>("100");
  const [containerPrice, setContainerPrice] = useState<string>("15");
  const [soilLevel, setSoilLevel] = useState<string>("normal");
  const [result, setResult] = useState<LaundryResult | null>(null);

  const calculate = () => {
    const detergent = detergentTypes.find((d) => d.name === detergentType);
    if (!detergent) return;

    let baseAmount = detergent.ozPerLoad;

    // Adjust for load size
    const loadSizeMultiplier: Record<string, number> = {
      small: 0.75,
      medium: 1,
      large: 1.5,
      xl: 2,
    };
    baseAmount *= loadSizeMultiplier[loadSize] || 1;

    // Adjust for machine type
    if (machineType === "he") {
      baseAmount *= 0.5; // HE machines use less detergent
    }

    // Adjust for water hardness
    const hardnessMultiplier: Record<string, number> = {
      soft: 0.75,
      medium: 1,
      hard: 1.25,
      veryHard: 1.5,
    };
    const waterAdjustment = hardnessMultiplier[waterHardness] || 1;
    baseAmount *= waterAdjustment;

    // Adjust for soil level
    const soilMultiplier: Record<string, number> = {
      light: 0.75,
      normal: 1,
      heavy: 1.5,
      extraHeavy: 2,
    };
    baseAmount *= soilMultiplier[soilLevel] || 1;

    // Calculate cost per load
    const containerSizeNum = parseFloat(containerSize) || 100;
    const containerPriceNum = parseFloat(containerPrice) || 15;
    const costPerLoad = (containerPriceNum / containerSizeNum) * baseAmount;

    // Calculate total loads
    const totalLoads = Math.floor(containerSizeNum / baseAmount);

    let recommendation = "";
    let podsCount: number | undefined;

    if (detergent.form === "pods") {
      podsCount = baseAmount >= 1.5 ? 2 : 1;
      recommendation = `Use ${podsCount} pod(s) for this load.`;
    } else if (detergent.form === "liquid") {
      const tbsp = baseAmount / 0.5; // 1 tbsp = 0.5 oz
      const cup = baseAmount / 8; // 1 cup = 8 oz
      if (baseAmount < 1) {
        recommendation = `Use ${baseAmount.toFixed(1)} oz (${(baseAmount * 2).toFixed(1)} tbsp) of detergent.`;
      } else if (baseAmount < 8) {
        recommendation = `Use ${baseAmount.toFixed(1)} oz (${tbsp.toFixed(1)} tbsp) of detergent.`;
      } else {
        recommendation = `Use ${cup.toFixed(2)} cups (${baseAmount.toFixed(1)} oz) of detergent.`;
      }
    } else {
      // Powder
      const tbsp = baseAmount / 0.25; // 1 tbsp powder ≈ 0.25 oz
      recommendation = `Use ${baseAmount.toFixed(1)} oz (${tbsp.toFixed(1)} tbsp) of powder detergent.`;
    }

    // Add machine type note
    if (machineType === "he") {
      recommendation += " HE machine detected - using reduced amount.";
    }

    setResult({
      recommendedAmount: parseFloat(baseAmount.toFixed(2)),
      unit: "oz",
      podsCount,
      costPerLoad: parseFloat(costPerLoad.toFixed(3)),
      totalLoads,
      recommendation,
      waterHardnessAdjustment: waterAdjustment,
    });
  };

  const reset = () => {
    setLoadSize("medium");
    setMachineType("he");
    setWaterHardness("medium");
    setDetergentType("Liquid (Concentrated)");
    setContainerSize("100");
    setContainerPrice("15");
    setSoilLevel("normal");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Laundry Detergent Calculator – How Much Detergent Should You Use Per Wash?
          </h1>
          <p className="text-muted-foreground">
            Stop guessing and start using the right amount of laundry detergent with our
            Laundry Detergent Calculator. Based on your load size, machine type, and water
            hardness, get the perfect detergent dose every time to save money and protect your clothes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="load-size">Load Size</Label>
                <Select value={loadSize} onValueChange={setLoadSize}>
                  <SelectTrigger id="load-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (1/4 full)</SelectItem>
                    <SelectItem value="medium">Medium (1/2 full)</SelectItem>
                    <SelectItem value="large">Large (3/4 full)</SelectItem>
                    <SelectItem value="xl">Extra Large (Full)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="machine-type">Washing Machine Type</Label>
                <Select value={machineType} onValueChange={setMachineType}>
                  <SelectTrigger id="machine-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="he">High Efficiency (HE)</SelectItem>
                    <SelectItem value="standard">Standard/Traditional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="water-hardness">Water Hardness</Label>
                <Select value={waterHardness} onValueChange={setWaterHardness}>
                  <SelectTrigger id="water-hardness">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soft">Soft (0-60 ppm)</SelectItem>
                    <SelectItem value="medium">Medium (60-120 ppm)</SelectItem>
                    <SelectItem value="hard">Hard (120-180 ppm)</SelectItem>
                    <SelectItem value="veryHard">Very Hard (180+ ppm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="detergent-type">Detergent Type</Label>
                <Select value={detergentType} onValueChange={setDetergentType}>
                  <SelectTrigger id="detergent-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {detergentTypes.map((d) => (
                      <SelectItem key={d.name} value={d.name}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="soil-level">Soil Level</Label>
                <Select value={soilLevel} onValueChange={setSoilLevel}>
                  <SelectTrigger id="soil-level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light (Gently worn)</SelectItem>
                    <SelectItem value="normal">Normal (Everyday)</SelectItem>
                    <SelectItem value="heavy">Heavy (Stained)</SelectItem>
                    <SelectItem value="extraHeavy">Extra Heavy (Very soiled)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="container-size">Container Size (oz)</Label>
                  <Input
                    id="container-size"
                    type="number"
                    value={containerSize}
                    onChange={(e) => setContainerSize(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="container-price">Price ($)</Label>
                  <Input
                    id="container-price"
                    type="number"
                    value={containerPrice}
                    onChange={(e) => setContainerPrice(e.target.value)}
                  />
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
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Recommended Amount</p>
                    <p className="text-3xl font-bold text-primary">
                      {result.podsCount ? `${result.podsCount} pod(s)` : `${result.recommendedAmount} ${result.unit}`}
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">{result.recommendation}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Cost per Load</p>
                      <p className="text-lg font-semibold">${result.costPerLoad}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Loads per Container</p>
                      <p className="text-lg font-semibold">{result.totalLoads}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Water Hardness Factor:</strong> {result.waterHardnessAdjustment}x
                      {waterHardness === "soft" && " (reduced detergent needed)"}
                      {waterHardness === "hard" && " (extra detergent needed)"}
                      {waterHardness === "veryHard" && " (significantly more detergent needed)"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Select your settings and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Why Using the Right Amount Matters
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Using too much detergent is a common mistake that can actually make your
                  clothes less clean and damage your washing machine over time.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Too much detergent:</strong> Causes residue buildup, odors,
                    and can damage HE machines
                  </li>
                  <li>
                    <strong>Too little detergent:</strong> Clothes don&apos;t get clean,
                    bacteria can build up
                  </li>
                  <li>
                    <strong>HE machines:</strong> Use 50% less detergent due to low water usage
                  </li>
                  <li>
                    <strong>Hard water:</strong> Requires more detergent to overcome minerals
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Most people use 2-3x more detergent than needed.
                  Start with the recommended amount and adjust based on results.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
