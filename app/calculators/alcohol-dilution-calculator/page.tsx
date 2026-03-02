"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DilutionResult {
  initialABV: number;
  initialVolume: number;
  targetABV: number;
  waterToAdd: number;
  finalVolume: number;
  alcoholContent: number;
  proofBefore: number;
  proofAfter: number;
  recommendations: string[];
}

export default function AlcoholDilutionCalculatorPage() {
  const [initialABV, setInitialABV] = useState<string>("");
  const [initialVolume, setInitialVolume] = useState<string>("");
  const [targetABV, setTargetABV] = useState<string>("");
  const [volumeUnit, setVolumeUnit] = useState<string>("ml");
  const [result, setResult] = useState<DilutionResult | null>(null);

  const calculate = () => {
    const initialABVNum = parseFloat(initialABV) || 0;
    const initialVolumeNum = parseFloat(initialVolume) || 0;
    const targetABVNum = parseFloat(targetABV) || 0;

    if (initialABVNum === 0 || initialVolumeNum === 0 || targetABVNum === 0) return;
    if (targetABVNum >= initialABVNum) return; // Can't dilute to higher ABV

    // Pearson's Square / Alligation method
    // C1 × V1 = C2 × V2
    // Where C = concentration, V = volume

    // Alcohol content stays constant
    const alcoholContent = initialVolumeNum * (initialABVNum / 100);

    // Final volume needed for target ABV
    const finalVolume = alcoholContent / (targetABVNum / 100);

    // Water to add
    const waterToAdd = finalVolume - initialVolumeNum;

    // Proof (US)
    const proofBefore = initialABVNum * 2;
    const proofAfter = targetABVNum * 2;

    // Recommendations
    const recommendations: string[] = [];

    if (targetABVNum < 40) {
      recommendations.push("🥃 Diluting below 40% ABV may affect flavor preservation.");
    }
    if (targetABVNum >= 40 && targetABVNum <= 45) {
      recommendations.push("✅ 40-45% ABV is ideal for most spirits.");
    }
    if (targetABVNum > 50) {
      recommendations.push("🔥 High ABV - consider further dilution for tasting.");
    }

    recommendations.push(`💧 Add water gradually and taste as you go.`);
    recommendations.push(`🕐 Let the spirit rest for 24-48 hours after dilution.`);
    recommendations.push(`🧊 Use distilled water for best results.`);

    if (waterToAdd > initialVolumeNum * 0.5) {
      recommendations.push(`⚠️ Large dilution (>50%). Consider step-wise dilution.`);
    }

    setResult({
      initialABV: initialABVNum,
      initialVolume: initialVolumeNum,
      targetABV: targetABVNum,
      waterToAdd: parseFloat(waterToAdd.toFixed(1)),
      finalVolume: parseFloat(finalVolume.toFixed(1)),
      alcoholContent: parseFloat(alcoholContent.toFixed(1)),
      proofBefore,
      proofAfter,
      recommendations,
    });
  };

  const reset = () => {
    setInitialABV("");
    setInitialVolume("");
    setTargetABV("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Alcohol Dilution Calculator – Calculate Water to Add for Target ABV
          </h1>
          <p className="text-muted-foreground">
            Dilute spirits to your desired strength with our Alcohol Dilution Calculator.
            Enter starting ABV and volume along with your target ABV to calculate exactly
            how much water to add — perfect for home distillers and bartenders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="initial-abv">Initial ABV (%)</Label>
                  <Input
                    id="initial-abv"
                    type="number"
                    step="0.1"
                    value={initialABV}
                    onChange={(e) => setInitialABV(e.target.value)}
                    placeholder="e.g., 60"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="target-abv">Target ABV (%)</Label>
                  <Input
                    id="target-abv"
                    type="number"
                    step="0.1"
                    value={targetABV}
                    onChange={(e) => setTargetABV(e.target.value)}
                    placeholder="e.g., 40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="initial-volume">Initial Volume</Label>
                  <Input
                    id="initial-volume"
                    type="number"
                    value={initialVolume}
                    onChange={(e) => setInitialVolume(e.target.value)}
                    placeholder="e.g., 750"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="volume-unit">Unit</Label>
                  <select
                    id="volume-unit"
                    value={volumeUnit}
                    onChange={(e) => setVolumeUnit(e.target.value)}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="ml">ml</option>
                    <option value="liters">Liters</option>
                    <option value="oz">fl oz</option>
                    <option value="gallons">Gallons</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Common Bottling Strengths:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 40% ABV (80 proof) - Standard</li>
                  <li>• 43% ABV (86 proof) - Premium</li>
                  <li>• 46% ABV (92 proof) - Cask strength entry</li>
                  <li>• 50% ABV (100 proof) - Bottled in bond</li>
                </ul>
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
              <h3 className="text-lg font-semibold mb-4">Dilution Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Water to Add</p>
                    <p className="text-4xl font-bold text-primary">{result.waterToAdd} {volumeUnit}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      to reach {result.targetABV}% ABV
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Initial</p>
                      <p className="text-lg font-semibold">{result.initialABV}% ABV</p>
                      <p className="text-xs text-muted-foreground">{result.proofBefore} proof</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Final</p>
                      <p className="text-lg font-semibold">{result.targetABV}% ABV</p>
                      <p className="text-xs text-muted-foreground">{result.proofAfter} proof</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Initial Volume:</span>
                      <span className="font-semibold">{result.initialVolume} {volumeUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Water Added:</span>
                      <span className="font-semibold">{result.waterToAdd} {volumeUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Final Volume:</span>
                      <span className="font-semibold">{result.finalVolume} {volumeUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Pure Alcohol:</span>
                      <span className="font-semibold">{result.alcoholContent} {volumeUnit}</span>
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

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Formula:</strong> V₁ × C₁ = V₂ × C₂
                      <br />
                      (Initial Volume × Initial ABV = Final Volume × Target ABV)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter dilution details and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Dilution Tips for Spirits
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Water quality:</strong> Use distilled or spring water.
                    Tap water can add off-flavors.
                  </li>
                  <li>
                    <strong>Temperature:</strong> Dilute at room temperature for
                    accurate measurements.
                  </li>
                  <li>
                    <strong>Resting:</strong> Let diluted spirits rest 24-48 hours
                    for flavors to integrate.
                  </li>
                  <li>
                    <strong>Step dilution:</strong> For large dilutions, add water
                    in stages for better mixing.
                  </li>
                  <li>
                    <strong>Taste testing:</strong> Dilute slightly less than calculated,
                    taste, then add more if needed.
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Dilution can &quot;open up&quot; spirits, releasing
                  aromas and flavors that are masked at higher ABV. Many whiskies benefit
                  from a few drops of water even after bottling.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
