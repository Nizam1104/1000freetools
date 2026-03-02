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

interface CO2Result {
  tankVolume: number;
  targetCO2: number;
  currentPH: number;
  kh: number;
  calculatedCO2: number;
  injectionRate: number;
  bubblesPerMinute: number;
  status: string;
  recommendations: string[];
}

export default function AquariumCOCalculatorPage() {
  const [tankVolume, setTankVolume] = useState<string>("");
  const [targetCO2, setTargetCO2] = useState<string>("30");
  const [currentPH, setCurrentPH] = useState<string>("");
  const [kh, setKh] = useState<string>("");
  const [volumeUnit, setVolumeUnit] = useState<string>("liters");
  const [result, setResult] = useState<CO2Result | null>(null);

  const calculate = () => {
    const volumeNum = parseFloat(tankVolume) || 0;
    const targetNum = parseFloat(targetCO2) || 30;
    const phNum = parseFloat(currentPH) || 0;
    const khNum = parseFloat(kh) || 0;

    if (volumeNum === 0) return;

    // Convert to liters if needed
    let volumeLiters = volumeNum;
    if (volumeUnit === "gallons") {
      volumeLiters = volumeNum * 3.785;
    }

    // Calculate current CO2 using pH/KH relationship
    // CO2 (ppm) = 3 × KH × 10^(7 - pH)
    let currentCO2 = 0;
    if (phNum > 0 && khNum > 0) {
      currentCO2 = 3 * khNum * Math.pow(10, (7 - phNum));
    }

    // Calculate required injection rate
    // Rule of thumb: 1-2 watts per liter for pressurized CO2
    // Or: 1 bubble per second per 4 gallons for DIY
    const injectionRateWatts = volumeLiters * 1.5; // 1.5W per liter
    
    // Bubbles per minute estimation (for standard diffuser)
    // Approximately 1 BPM per 10 liters for 30 ppm target
    const bubblesPerMinute = Math.round((volumeLiters / 10) * (targetNum / 30));

    // Determine status
    let status = "";
    const recommendations: string[] = [];

    if (currentCO2 > 0) {
      if (currentCO2 < 20) {
        status = "Low CO2 - Increase injection";
        recommendations.push("📈 Current CO2 is below optimal. Increase injection rate.");
        recommendations.push("🌱 Plants may show slow growth at this level.");
      } else if (currentCO2 >= 20 && currentCO2 <= 35) {
        status = "Optimal CO2 Range";
        recommendations.push("✅ CO2 levels are in the ideal range for plant growth.");
        recommendations.push("🌿 Maintain current injection rate.");
      } else if (currentCO2 > 35 && currentCO2 <= 50) {
        status = "High CO2 - Monitor livestock";
        recommendations.push("⚠️ CO2 is elevated. Watch fish for signs of stress.");
        recommendations.push("💨 Ensure good surface agitation at night.");
      } else {
        status = "Dangerous CO2 - Reduce immediately";
        recommendations.push("🚨 CO2 levels are dangerous for fish! Reduce injection.");
        recommendations.push("💨 Increase surface agitation and do a water change.");
      }
    } else {
      status = "Enter pH and KH for current CO2 calculation";
    }

    // General recommendations
    recommendations.push(`💡 Target injection: ${bubblesPerMinute} BPM for ${volumeLiters.toFixed(0)}L tank`);
    recommendations.push("⏰ Turn off CO2 1 hour before lights out");
    recommendations.push("🌅 Start CO2 1-2 hours before lights on");

    setResult({
      tankVolume: volumeLiters,
      targetCO2: targetNum,
      currentPH: phNum,
      kh: khNum,
      calculatedCO2: parseFloat(currentCO2.toFixed(1)),
      injectionRate: parseFloat(injectionRateWatts.toFixed(1)),
      bubblesPerMinute,
      status,
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
            Aquarium CO₂ Calculator – Calculate CO₂ Injection Rate for Planted Tanks
          </h1>
          <p className="text-muted-foreground">
            Optimize plant growth in your aquarium with our CO₂ Calculator.
            Enter tank volume, target CO₂ concentration, and current pH and KH levels
            to calculate the required CO₂ injection rate — essential for serious
            planted tank enthusiasts.
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
                <Label htmlFor="target-co2">Target CO₂ (ppm)</Label>
                <Input
                  id="target-co2"
                  type="number"
                  value={targetCO2}
                  onChange={(e) => setTargetCO2(e.target.value)}
                  placeholder="30"
                />
                <p className="text-xs text-muted-foreground">
                  Optimal: 20-35 ppm for planted tanks
                </p>
              </div>

              <div className="border-t pt-4">
                <Label className="text-sm font-medium">Optional: Current Water Parameters</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="space-y-1">
                    <Label htmlFor="ph">Current pH</Label>
                    <Input
                      id="ph"
                      type="number"
                      step="0.1"
                      value={currentPH}
                      onChange={(e) => setCurrentPH(e.target.value)}
                      placeholder="e.g., 6.8"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="kh">KH (dKH)</Label>
                    <Input
                      id="kh"
                      type="number"
                      step="0.5"
                      value={kh}
                      onChange={(e) => setKh(e.target.value)}
                      placeholder="e.g., 4"
                    />
                  </div>
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
              <h3 className="text-lg font-semibold mb-4">CO₂ Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.status.includes("Optimal") ? "bg-green-100 dark:bg-green-900/20" :
                    result.status.includes("Low") ? "bg-amber-100 dark:bg-amber-900/20" :
                    result.status.includes("Dangerous") ? "bg-red-100 dark:bg-red-900/20" :
                    "bg-muted"
                  }`}>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-xl font-bold">{result.status}</p>
                  </div>

                  {result.calculatedCO2 > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Current CO₂</p>
                        <p className="text-2xl font-bold">{result.calculatedCO2} ppm</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Target CO₂</p>
                        <p className="text-2xl font-bold">{result.targetCO2} ppm</p>
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Recommended Injection</p>
                      <p className="text-3xl font-bold text-primary">{result.bubblesPerMinute} BPM</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        ({result.injectionRate}W diffuser power)
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tank Volume:</span>
                      <span className="font-semibold">{result.tankVolume.toFixed(0)} L</span>
                    </div>
                    {result.kh > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">pH:</span>
                          <span className="font-semibold">{result.currentPH}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">KH:</span>
                          <span className="font-semibold">{result.kh} dKH</span>
                        </div>
                      </>
                    )}
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
                  <p>Enter tank details and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                CO₂ Injection Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  CO₂ is essential for photosynthesis in planted aquariums:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Optimal range:</strong> 20-35 ppm for most plants
                  </li>
                  <li>
                    <strong>Formula:</strong> CO₂ = 3 × KH × 10^(7-pH)
                  </li>
                  <li>
                    <strong>Injection timing:</strong> Start 1-2h before lights on
                  </li>
                  <li>
                    <strong>Safe maximum:</strong> 50 ppm (dangerous for fish above this)
                  </li>
                  <li>
                    <strong>Drop checker:</strong> Blue = low, Green = optimal, Yellow = high
                  </li>
                </ul>
                <p>
                  <strong>Warning:</strong> Always use a solenoid valve to turn off CO₂ at
                  night. Fish can suffocate if CO₂ remains on without photosynthesis.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
