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

interface UPSResult {
  batteryCapacity: number;
  batteryVoltage: number;
  loadWatts: number;
  efficiency: number;
  runtimeMinutes: number;
  runtimeFormatted: string;
  dischargeRate: string;
  recommendations: string[];
}

export default function UPSGeneratorRuntimeCalculatorPage() {
  const [batteryCapacity, setBatteryCapacity] = useState<string>("");
  const [batteryVoltage, setBatteryVoltage] = useState<string>("12");
  const [loadWatts, setLoadWatts] = useState<string>("");
  const [efficiency, setEfficiency] = useState<string>("85");
  const [powerSourceType, setPowerSourceType] = useState<string>("ups");
  const [fuelCapacity, setFuelCapacity] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("gasoline");
  const [result, setResult] = useState<UPSResult | null>(null);

  const calculate = () => {
    if (powerSourceType === "ups") {
      const capacityNum = parseFloat(batteryCapacity) || 0;
      const voltageNum = parseFloat(batteryVoltage) || 12;
      const loadNum = parseFloat(loadWatts) || 0;
      const effNum = parseFloat(efficiency) || 85;

      if (capacityNum === 0 || loadNum === 0) return;

      // Battery energy in watt-hours
      const batteryWh = capacityNum * voltageNum;

      // Usable energy (accounting for efficiency and depth of discharge)
      const usableWh = batteryWh * (effNum / 100) * 0.5; // 50% DoD for lead-acid

      // Runtime in hours
      const runtimeHours = usableWh / loadNum;
      const runtimeMinutes = runtimeHours * 60;

      // Format runtime
      const runtimeFormatted = formatRuntime(runtimeMinutes);

      // Discharge rate (C-rate)
      const dischargeRate = loadNum / batteryWh;

      // Recommendations
      const recommendations: string[] = [];

      if (runtimeMinutes < 5) {
        recommendations.push("⚠️ Very short runtime! Consider reducing load or adding batteries.");
      } else if (runtimeMinutes < 15) {
        recommendations.push("⚠️ Short runtime. Enough for safe shutdown only.");
      } else if (runtimeMinutes < 60) {
        recommendations.push("✅ Adequate for short outages and safe shutdown.");
      } else {
        recommendations.push("✅ Good runtime for extended outages.");
      }

      if (dischargeRate > 1) {
        recommendations.push("⚠️ High discharge rate may reduce battery life.");
      }

      recommendations.push(`💡 For longer runtime, add batteries in parallel.`);
      recommendations.push(`🔋 Replace batteries every 3-5 years for optimal performance.`);

      setResult({
        batteryCapacity: capacityNum,
        batteryVoltage: voltageNum,
        loadWatts: loadNum,
        efficiency: effNum,
        runtimeMinutes: parseFloat(runtimeMinutes.toFixed(1)),
        runtimeFormatted,
        dischargeRate: parseFloat(dischargeRate.toFixed(2)).toString(),
        recommendations,
      });
    } else {
      // Generator calculation
      const fuelNum = parseFloat(fuelCapacity) || 0;
      const loadNum = parseFloat(loadWatts) || 0;

      if (fuelNum === 0 || loadNum === 0) return;

      // Fuel consumption rates (gallons per hour at full load)
      const consumptionRates: Record<string, number> = {
        gasoline: 0.5,  // gallons/hour per kW
        diesel: 0.4,
        propane: 0.6,
        naturalGas: 0.7,
      };

      const ratePerKW = consumptionRates[fuelType] || 0.5;
      const loadKW = loadNum / 1000;
      const consumptionPerHour = ratePerKW * loadKW;

      const runtimeHours = fuelNum / consumptionPerHour;
      const runtimeMinutes = runtimeHours * 60;

      const runtimeFormatted = formatRuntime(runtimeMinutes);

      const recommendations: string[] = [
        `⛽ Fuel consumption: ${consumptionPerHour.toFixed(2)} gallons/hour at this load`,
        `💡 Generators are most efficient at 50-80% load`,
        `🔧 Schedule maintenance every 100-200 operating hours`,
      ];

      setResult({
        batteryCapacity: fuelNum,
        batteryVoltage: 0,
        loadWatts: loadNum,
        efficiency: 0,
        runtimeMinutes: parseFloat(runtimeMinutes.toFixed(1)),
        runtimeFormatted,
        dischargeRate: parseFloat(consumptionPerHour.toFixed(2)).toString(),
        recommendations,
      });
    }
  };

  const formatRuntime = (minutes: number): string => {
    if (minutes < 60) {
      return `${Math.round(minutes)} minutes`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      const mins = Math.round(minutes % 60);
      return `${hours}h ${mins}m`;
    } else {
      const days = Math.floor(minutes / 1440);
      const hours = Math.floor((minutes % 1440) / 60);
      return `${days}d ${hours}h`;
    }
  };

  const reset = () => {
    setBatteryCapacity("");
    setLoadWatts("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            UPS & Generator Runtime Calculator – How Long Will Your Backup Power Last?
          </h1>
          <p className="text-muted-foreground">
            Know exactly how long your UPS or generator will run during a power outage.
            Enter battery or fuel capacity and total connected load to calculate expected
            runtime — critical for emergency preparedness and business continuity planning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="power-source">Power Source Type</Label>
                <Select value={powerSourceType} onValueChange={setPowerSourceType}>
                  <SelectTrigger id="power-source">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ups">UPS (Battery Backup)</SelectItem>
                    <SelectItem value="generator">Generator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {powerSourceType === "ups" ? (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="battery-cap">Battery Capacity (Ah)</Label>
                      <Input
                        id="battery-cap"
                        type="number"
                        value={batteryCapacity}
                        onChange={(e) => setBatteryCapacity(e.target.value)}
                        placeholder="e.g., 100"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="battery-volt">Battery Voltage (V)</Label>
                      <Select value={batteryVoltage} onValueChange={setBatteryVoltage}>
                        <SelectTrigger id="battery-volt">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12V</SelectItem>
                          <SelectItem value="24">24V</SelectItem>
                          <SelectItem value="48">48V</SelectItem>
                          <SelectItem value="96">96V</SelectItem>
                          <SelectItem value="192">192V</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="efficiency">UPS Efficiency (%)</Label>
                    <Input
                      id="efficiency"
                      type="number"
                      value={efficiency}
                      onChange={(e) => setEfficiency(e.target.value)}
                      placeholder="85"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="fuel-cap">Fuel Capacity</Label>
                      <Input
                        id="fuel-cap"
                        type="number"
                        value={fuelCapacity}
                        onChange={(e) => setFuelCapacity(e.target.value)}
                        placeholder="e.g., 10"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="fuel-type">Fuel Type</Label>
                      <Select value={fuelType} onValueChange={setFuelType}>
                        <SelectTrigger id="fuel-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gasoline">Gasoline</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="propane">Propane</SelectItem>
                          <SelectItem value="naturalGas">Natural Gas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Fuel capacity in gallons</p>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="load">Connected Load (Watts)</Label>
                <Input
                  id="load"
                  type="number"
                  value={loadWatts}
                  onChange={(e) => setLoadWatts(e.target.value)}
                  placeholder="e.g., 500"
                />
                <p className="text-xs text-muted-foreground">
                  Total wattage of all connected devices
                </p>
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
              <h3 className="text-lg font-semibold mb-4">Runtime Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Estimated Runtime</p>
                    <p className="text-4xl font-bold text-primary">{result.runtimeFormatted}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    {powerSourceType === "ups" ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Battery Energy:</span>
                          <span className="font-semibold">
                            {(result.batteryCapacity * result.batteryVoltage).toFixed(0)} Wh
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Load:</span>
                          <span className="font-semibold">{result.loadWatts} W</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Discharge Rate:</span>
                          <span className="font-semibold">{result.dischargeRate}C</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Fuel Capacity:</span>
                          <span className="font-semibold">{result.batteryCapacity} gallons</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Consumption:</span>
                          <span className="font-semibold">{result.dischargeRate} gal/hour</span>
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
                  <p>Enter your system details and click Calculate to see runtime</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Backup Power Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>UPS batteries:</strong> Lead-acid batteries should not be
                    discharged below 50% for longevity
                  </li>
                  <li>
                    <strong>Generator sizing:</strong> Size generator at 1.25× your max load
                  </li>
                  <li>
                    <strong>Fuel storage:</strong> Store fuel safely with stabilizers for
                    long-term storage
                  </li>
                  <li>
                    <strong>Transfer time:</strong> UPS provides instant backup; generators
                    need 10-30 seconds
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> For critical systems, use both UPS (instant) and
                  generator (extended) for complete protection.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Backup Power Runtime</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Choose Power Source Type</h3>
                <p className="text-sm text-muted-foreground">Select UPS battery backup or generator based on your emergency power system.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Capacity & Load Details</h3>
                <p className="text-sm text-muted-foreground">Input battery Ah/voltage or fuel capacity, plus total connected wattage of your devices.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get Runtime Estimate</h3>
                <p className="text-sm text-muted-foreground">Receive estimated backup duration with recommendations for your specific setup.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Runtime Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Dual Power Source Support</h3>
              <p className="text-sm text-muted-foreground">Calculate runtime for both UPS battery systems and fuel-powered generators with appropriate formulas.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Battery Depth of Discharge</h3>
              <p className="text-sm text-muted-foreground">Accounts for 50% DoD limit on lead-acid batteries to preserve battery health and longevity.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Fuel Consumption Rates</h3>
              <p className="text-sm text-muted-foreground">Uses realistic fuel consumption rates for gasoline, diesel, propane, and natural gas generators.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-sm text-muted-foreground">Get actionable advice based on your runtime results, including battery replacement and sizing tips.</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold mb-3">Runtime Calculation Formulas</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">System Type</th>
                  <th className="text-left py-2">Formula</th>
                  <th className="text-left py-2">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">UPS Battery</td>
                  <td className="py-2 font-mono">(V × Ah × Efficiency × 0.5) ÷ Watts</td>
                  <td className="py-2">(12V × 100Ah × 0.85 × 0.5) ÷ 500W = 1.02 hrs</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Generator</td>
                  <td className="py-2 font-mono">Fuel ÷ (kW × Rate/kW)</td>
                  <td className="py-2">10 gal ÷ (0.5kW × 0.5 gal/kW) = 40 hrs</td>
                </tr>
                <tr>
                  <td className="py-2">Battery Energy</td>
                  <td className="py-2 font-mono">Voltage × Amp-hours = Watt-hours</td>
                  <td className="py-2">12V × 100Ah = 1,200 Wh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">How long will a 1000VA UPS last?</h3>
              <p className="text-sm text-muted-foreground">A 1000VA UPS with 100Ah battery at 12V can run a 300W load for approximately 2-3 hours. Runtime decreases significantly with higher loads - at 600W, expect only 45-60 minutes.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do I calculate generator fuel consumption?</h3>
              <p className="text-sm text-muted-foreground">Gasoline generators consume about 0.5 gallons per hour per kW of load. A 5kW generator at half load (2.5kW) uses roughly 1.25 gallons per hour, giving 8 hours runtime from a 10-gallon tank.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why is UPS runtime shorter than expected?</h3>
              <p className="text-sm text-muted-foreground">Battery capacity decreases with age (replace every 3-5 years), high discharge rates reduce effective capacity, and manufacturers often rate batteries at lower loads than real-world usage.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Should I use a UPS or generator?</h3>
              <p className="text-sm text-muted-foreground">Use UPS for instant backup (computers, servers) and short outages. Use generators for extended outages (hours to days). For critical systems, use both: UPS bridges the gap until generator starts.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How can I extend UPS battery runtime?</h3>
              <p className="text-sm text-muted-foreground">Reduce connected load, add external battery packs in parallel, keep batteries at room temperature, and ensure batteries are fully charged. Consider upgrading to lithium batteries for 2-3× runtime.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
      </div>
    </div>
  );
}
