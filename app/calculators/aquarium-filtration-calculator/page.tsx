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

interface FiltrationResult {
  tankVolume: number;
  fishLoad: string;
  turnoverRate: number;
  minFlowRate: number;
  recommendedFlowRate: number;
  filterTypes: Array<{ type: string; description: string; recommended: boolean }>;
  recommendations: string[];
}

export default function AquariumFiltrationCalculatorPage() {
  const [tankVolume, setTankVolume] = useState<string>("");
  const [volumeUnit, setVolumeUnit] = useState<string>("liters");
  const [fishLoad, setFishLoad] = useState<string>("light");
  const [fishCount, setFishCount] = useState<string>("");
  const [result, setResult] = useState<FiltrationResult | null>(null);

  const calculate = () => {
    let volumeNum = parseFloat(tankVolume) || 0;
    const fishCountNum = parseInt(fishCount) || 0;

    if (volumeNum === 0) return;

    // Convert to liters if needed
    let volumeLiters = volumeNum;
    if (volumeUnit === "gallons") {
      volumeLiters = volumeNum * 3.785;
    }

    // Turnover rate based on fish load
    const turnoverRates: Record<string, number> = {
      light: 4,
      moderate: 6,
      heavy: 8,
      cichlid: 10,
    };
    const turnoverRate = turnoverRates[fishLoad] || 4;

    // Minimum flow rate (GPH or LPH)
    const minFlowRate = volumeLiters * turnoverRate;

    // Recommended flow rate (add 20% headroom)
    const recommendedFlowRate = minFlowRate * 1.2;

    // Filter type recommendations
    const filterTypes = [
      { type: "Hang-On-Back (HOB)", description: "Good for tanks up to 150L", recommended: volumeLiters <= 150 },
      { type: "Canister Filter", description: "Best for tanks 100-500L", recommended: volumeLiters > 100 && volumeLiters <= 500 },
      { type: "Sump Filter", description: "Best for large tanks 300L+", recommended: volumeLiters > 300 },
      { type: "Sponge Filter", description: "Good for breeding tanks, low flow", recommended: fishLoad === "light" },
      { type: "Internal Filter", description: "Compact, good for small tanks", recommended: volumeLiters < 100 },
    ];

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`💧 Minimum flow rate: ${minFlowRate.toFixed(0)} LPH (${(minFlowRate / 3.785).toFixed(0)} GPH)`);
    recommendations.push(`🎯 Recommended flow rate: ${recommendedFlowRate.toFixed(0)} LPH (${(recommendedFlowRate / 3.785).toFixed(0)} GPH)`);
    recommendations.push(`🔄 Turnover rate: ${turnoverRate}x per hour`);

    if (fishLoad === "heavy" || fishLoad === "cichlid") {
      recommendations.push("⚠️ Heavy bioload - consider oversizing filter by 50%");
      recommendations.push("💨 Add additional aeration for high bioload");
    }

    if (volumeLiters < 50) {
      recommendations.push("🐠 Small tanks require more frequent maintenance");
      recommendations.push("💧 Consider weekly 25-30% water changes");
    }

    recommendations.push("🧽 Clean/replace filter media monthly");
    recommendations.push("🦠 Never replace all filter media at once");

    setResult({
      tankVolume: volumeLiters,
      fishLoad,
      turnoverRate,
      minFlowRate: parseFloat(minFlowRate.toFixed(0)),
      recommendedFlowRate: parseFloat(recommendedFlowRate.toFixed(0)),
      filterTypes,
      recommendations,
    });
  };

  const reset = () => {
    setTankVolume("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Aquarium Filtration Calculator – Find the Right Filter Size for Your Fish Tank
          </h1>
          <p className="text-muted-foreground">
            Keep your aquarium water crystal clear with our Filtration Calculator.
            Enter tank volume and fish stocking level to calculate the minimum required
            filter flow rate — ensuring healthy water quality for all tank inhabitants.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="tank-volume">Tank Volume</Label>
                  <Input
                    id="tank-volume"
                    type="number"
                    value={tankVolume}
                    onChange={(e) => setTankVolume(e.target.value)}
                    placeholder="e.g., 100"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="volume-unit">Unit</Label>
                  <Select value={volumeUnit} onValueChange={setVolumeUnit}>
                    <SelectTrigger id="volume-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="liters">Liters</SelectItem>
                      <SelectItem value="gallons">Gallons</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fish-load">Fish Load / Stocking Level</Label>
                <Select value={fishLoad} onValueChange={setFishLoad}>
                  <SelectTrigger id="fish-load">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light (Few small fish)</SelectItem>
                    <SelectItem value="moderate">Moderate (Community tank)</SelectItem>
                    <SelectItem value="heavy">Heavy (Cichlids, goldfish)</SelectItem>
                    <SelectItem value="cichlid">Very Heavy (African cichlids)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fish-count">Number of Fish (optional)</Label>
                <Input
                  id="fish-count"
                  type="number"
                  value={fishCount}
                  onChange={(e) => setFishCount(e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Turnover Rate Guide:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Light: 4x/hour</li>
                  <li>• Moderate: 6x/hour</li>
                  <li>• Heavy: 8x/hour</li>
                  <li>• Cichlids: 10x/hour</li>
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
              <h3 className="text-lg font-semibold mb-4">Filtration Requirements</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Recommended Flow Rate</p>
                    <p className="text-3xl font-bold text-primary">{result.recommendedFlowRate} LPH</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {(result.recommendedFlowRate / 3.785).toFixed(0)} GPH
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Minimum Flow</p>
                      <p className="text-lg font-bold">{result.minFlowRate} LPH</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Turnover Rate</p>
                      <p className="text-lg font-bold">{result.turnoverRate}x/hr</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommended Filter Types</h4>
                    <div className="space-y-2">
                      {result.filterTypes.filter(f => f.recommended).map((filter, i) => (
                        <div key={i} className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="font-medium text-green-800 dark:text-green-200">{filter.type}</p>
                          <p className="text-sm text-green-700 dark:text-green-300">{filter.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Maintenance Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter tank details and click Calculate to see requirements</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Filtration Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Turnover rate:</strong> How many times water passes through filter per hour
                  </li>
                  <li>
                    <strong>Three stages:</strong> Mechanical, chemical, and biological filtration
                  </li>
                  <li>
                    <strong>Never clean all media:</strong> Preserve beneficial bacteria
                  </li>
                  <li>
                    <strong>Oversize filters:</strong> Better to have too much filtration than too little
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> These are general guidelines. Specific fish species
                  may have unique requirements. Cichlids and goldfish produce more waste and
                  need higher turnover rates.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
