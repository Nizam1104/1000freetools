"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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
                  <div className={`p-4 rounded-lg text-center ${result.status.includes("Optimal") ? "bg-green-100 dark:bg-green-900/20" :
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

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                How to Use This Aquarium CO2 Calculator
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Enter Your Tank Volume</h4>
                    <p className="text-sm text-muted-foreground">
                      Input your aquarium size in liters or gallons. This determines the baseline CO2 requirement for your setup.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Set Your Target CO2 Level</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose a target concentration (typically 30 ppm for heavily planted tanks). Adjust based on your plant density and livestock sensitivity.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Add Water Parameters (Optional)</h4>
                    <p className="text-sm text-muted-foreground">
                      Enter current pH and KH values to calculate your existing CO2 concentration. This helps you determine how much additional injection is needed.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Understanding CO2 in Planted Aquariums
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Carbon dioxide is the foundation of healthy plant growth in aquariums. Here is what you need to know:
                </p>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Plants Need CO2</h4>
                  <p>
                    During photosynthesis, aquatic plants absorb CO2 and convert it into energy using light. Without adequate CO2, plants cannot grow properly—they become stunted, develop weak stems, and may eventually die. In a closed aquarium environment, natural CO2 production from fish respiration and decomposition is rarely enough for demanding plant species.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Natural vs Supplemented CO2</h4>
                  <p>
                    Natural CO2 comes from fish breathing, bacterial activity, and organic decay. Low-tech tanks with slow-growing plants like Java Fern or Anubias can survive on this alone. Supplemented CO2—via pressurized cylinders or DIY yeast systems—becomes necessary when you want lush, fast-growing carpets or have high-light setups. The difference is night and day.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Optimal CO2 Levels</h4>
                  <p>
                    Most planted tanks thrive at 20-30 ppm CO2. Below 20 ppm, plant growth slows noticeably. Above 30 ppm, you enter a danger zone for fish and invertebrates. The goal is to stay in that sweet spot where plants flourish without stressing your livestock.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The pH-KH-CO2 Relationship</h4>
                  <p>
                    These three parameters are interconnected. CO2 dissolves in water to form carbonic acid, which lowers pH. KH (carbonate hardness) acts as a buffer, resisting pH changes. By measuring pH and KH, you can estimate dissolved CO2 using the formula built into this calculator. This relationship is why stable KH is critical for consistent CO2 levels.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                CO2 Concentration Guidelines
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-medium">CO2 Level (ppm)</th>
                      <th className="text-left py-2 px-3 font-medium">Status</th>
                      <th className="text-left py-2 px-3 font-medium">Effect</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-3">0-10 ppm</td>
                      <td className="py-2 px-3 text-amber-600 font-medium">Low</td>
                      <td className="py-2 px-3">Limited plant growth, possible algae issues</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">10-20 ppm</td>
                      <td className="py-2 px-3 text-blue-600 font-medium">Moderate</td>
                      <td className="py-2 px-3">Some plant growth, suitable for low-demand species</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">20-30 ppm</td>
                      <td className="py-2 px-3 text-green-600 font-medium">Optimal</td>
                      <td className="py-2 px-3">Healthy plant growth, ideal for most planted tanks</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">30+ ppm</td>
                      <td className="py-2 px-3 text-red-600 font-medium">High</td>
                      <td className="py-2 px-3">Potentially harmful to fish, requires careful monitoring</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                The pH-KH-CO2 Relationship
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Understanding how pH, KH, and CO2 interact is essential for managing a planted aquarium. Here is the science behind it:
                </p>
                <div>
                  <h4 className="font-medium text-foreground mb-2">CO2 Forms Carbonic Acid</h4>
                  <p>
                    When CO2 dissolves in water, it reacts to form carbonic acid (H2CO3). This weak acid releases hydrogen ions, which directly lower the pH of your aquarium water.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">KH Buffers pH Changes</h4>
                  <p>
                    KH measures carbonate and bicarbonate ions in your water. These act as a buffer, absorbing excess hydrogen ions and preventing drastic pH swings. Higher KH means more stability but also means you need more CO2 to achieve the same pH drop.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Using pH Drop to Estimate CO2</h4>
                  <p>
                    A pH drop of approximately 1.0 unit from your degassed pH (pH after CO2 has escaped) indicates roughly 30 ppm CO2. This is the principle behind drop checkers and the calculation used in this tool. Keep in mind that other acids or buffers in your water can affect accuracy.
                  </p>
                </div>
                <p className="text-xs italic mt-3">
                  Note: This calculator uses the standard formula CO2 = 3 × KH × 10^(7-pH), which provides a reliable estimate for most freshwater setups.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                CO2 Injection Tips
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Start Low and Increase Gradually</h4>
                    <p className="text-sm text-muted-foreground">
                      Begin with 1 bubble per second (BPS) for every 10 gallons, then increase slowly over 1-2 weeks. Watch your plants and fish for responses. Rushing this process can shock or kill livestock.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Use a Drop Checker for Visual Monitoring</h4>
                    <p className="text-sm text-muted-foreground">
                      A drop checker with pH-sensitive solution gives you a constant visual readout. Blue means too low, green is optimal, and yellow signals dangerous levels. It is the most reliable way to track CO2 in real time.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Turn Off CO2 at Night</h4>
                    <p className="text-sm text-muted-foreground">
                      Plants only consume CO2 during photosynthesis, which requires light. At night, they respire like animals, releasing CO2. Continuing injection wastes gas and unnecessarily lowers oxygen levels. Use a solenoid valve on a timer.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Watch Fish for Signs of CO2 Stress</h4>
                    <p className="text-sm text-muted-foreground">
                      Gasping at the surface, lethargy, or loss of appetite can indicate CO2 overdose. If you see these signs, immediately reduce injection and increase surface agitation. Better to err on the side of caution.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-5">
                <div>
                  <h4 className="font-medium text-foreground mb-2">How much CO2 do aquarium plants need?</h4>
                  <p className="text-sm text-muted-foreground">
                    Most planted tanks perform best at 20-30 ppm CO2. Low-light tanks with hardy species can manage with less (10-15 ppm), while high-light setups with demanding carpeting plants may push toward 30 ppm. Always prioritize fish safety over maximum plant growth.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I measure CO2 in my aquarium?</h4>
                  <p className="text-sm text-muted-foreground">
                    Direct CO2 test kits exist but are expensive and time-consuming. Most hobbyists use a drop checker, which changes color based on CO2 concentration. Alternatively, you can estimate CO2 using pH and KH measurements with the formula in this calculator.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Is CO2 injection necessary for planted tanks?</h4>
                  <p className="text-sm text-muted-foreground">
                    No, it is not strictly necessary. Many beautiful aquariums run without supplemental CO2 using slow-growing plants like Java Fern, Anubias, and Cryptocoryne. However, if you want fast growth, dense carpets, or red plants that demand high light, CO2 injection becomes almost essential.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can too much CO2 harm fish?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes. CO2 displaces oxygen in water, and levels above 30-35 ppm can cause respiratory distress in fish. Above 50 ppm becomes life-threatening. Shrimp and invertebrates are even more sensitive. Always monitor your livestock and have a backup plan to increase surface agitation if needed.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">When should I turn CO2 on and off?</h4>
                  <p className="text-sm text-muted-foreground">
                    Turn CO2 on 1-2 hours before your lights come on, allowing time for saturation. Turn it off 1 hour before lights out. This schedule ensures plants have CO2 available during peak photosynthesis while preventing waste during dark periods. A dual-stage regulator with solenoid valve automates this process.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
