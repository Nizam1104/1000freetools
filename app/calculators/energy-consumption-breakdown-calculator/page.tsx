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

interface EnergyBreakdownResult {
  appliances: Array<{ name: string; watts: number; hours: number; kwh: number; cost: number; percentage: number }>;
  totalKwh: number;
  totalCost: number;
  electricityRate: number;
  recommendations: string[];
  biggestUsers: Array<{ name: string; percentage: number }>;
}

export default function EnergyConsumptionBreakdownCalculatorPage() {
  const [electricityRate, setElectricityRate] = useState<string>("0.15");
  const [hvacHours, setHvacHours] = useState<string>("8");
  const [hvacWatts, setHvacWatts] = useState<string>("3500");
  const [waterHeaterHours, setWaterHeaterHours] = useState<string>("3");
  const [waterHeaterWatts, setWaterHeaterWatts] = useState<string>("4500");
  const [lightingHours, setLightingHours] = useState<string>("6");
  const [lightingWatts, setLightingWatts] = useState<string>("500");
  const [appliancesHours, setAppliancesHours] = useState<string>("4");
  const [appliancesWatts, setAppliancesWatts] = useState<string>("1000");
  const [electronicsHours, setElectronicsHours] = useState<string>("8");
  const [electronicsWatts, setElectronicsWatts] = useState<string>("300");
  const [result, setResult] = useState<EnergyBreakdownResult | null>(null);

  const calculate = () => {
    const rateNum = parseFloat(electricityRate) || 0.15;
    
    const categories = [
      { name: "HVAC", watts: parseFloat(hvacWatts) || 0, hours: parseFloat(hvacHours) || 0 },
      { name: "Water Heater", watts: parseFloat(waterHeaterWatts) || 0, hours: parseFloat(waterHeaterHours) || 0 },
      { name: "Lighting", watts: parseFloat(lightingWatts) || 0, hours: parseFloat(lightingHours) || 0 },
      { name: "Appliances", watts: parseFloat(appliancesWatts) || 0, hours: parseFloat(appliancesHours) || 0 },
      { name: "Electronics", watts: parseFloat(electronicsWatts) || 0, hours: parseFloat(electronicsHours) || 0 },
    ];

    // Calculate kWh for each category (Watts × Hours / 1000)
    const appliances = categories.map(cat => {
      const kwh = (cat.watts * cat.hours) / 1000;
      const cost = kwh * rateNum;
      return { ...cat, kwh: parseFloat(kwh.toFixed(2)), cost: parseFloat(cost.toFixed(2)), percentage: 0 };
    });

    // Calculate total
    const totalKwh = appliances.reduce((sum, a) => sum + a.kwh, 0);
    const totalCost = appliances.reduce((sum, a) => sum + a.cost, 0);

    // Calculate percentages
    appliances.forEach(a => {
      a.percentage = totalKwh > 0 ? parseFloat(((a.kwh / totalKwh) * 100).toFixed(1)) : 0;
    });

    // Sort by usage for biggest users
    const biggestUsers = [...appliances]
      .sort((a, b) => b.kwh - a.kwh)
      .slice(0, 3)
      .map(a => ({ name: a.name, percentage: a.percentage }));

    // Recommendations
    const recommendations: string[] = [];

    const hvac = appliances.find(a => a.name === "HVAC");
    if (hvac && hvac.percentage > 40) {
      recommendations.push("🌡️ HVAC is your biggest user - consider programmable thermostat");
      recommendations.push("💨 Seal air leaks and improve insulation");
    }

    const waterHeater = appliances.find(a => a.name === "Water Heater");
    if (waterHeater && waterHeater.percentage > 20) {
      recommendations.push("🚿 Lower water heater temperature to 120°F");
      recommendations.push("🛁 Install low-flow showerheads");
    }

    const lighting = appliances.find(a => a.name === "Lighting");
    if (lighting && lighting.watts > 300) {
      recommendations.push("💡 Switch to LED bulbs (75% energy savings)");
    }

    recommendations.push(`💰 Total monthly cost: $${(totalCost * 30).toFixed(0)}`);
    recommendations.push(`📊 Daily average: ${totalKwh.toFixed(1)} kWh`);

    setResult({
      appliances,
      totalKwh: parseFloat(totalKwh.toFixed(1)),
      totalCost: parseFloat(totalCost.toFixed(2)),
      electricityRate: rateNum,
      recommendations,
      biggestUsers,
    });
  };

  const reset = () => {
    setHvacHours("8");
    setHvacWatts("3500");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Energy Consumption Breakdown Calculator – See Where Your Energy Is Being Used
          </h1>
          <p className="text-muted-foreground">
            Identify your biggest energy users with our Energy Consumption Breakdown Calculator.
            Enter usage data for appliances, heating, cooling, and lighting to see a detailed
            percentage breakdown of total energy consumption — helping you prioritize efficiency improvements.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rate">Electricity Rate ($/kWh)</Label>
                <Input
                  id="rate"
                  type="number"
                  step="0.01"
                  value={electricityRate}
                  onChange={(e) => setElectricityRate(e.target.value)}
                  placeholder="0.15"
                />
                <p className="text-xs text-muted-foreground">US average: $0.15/kWh</p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-sm mb-3">Major Systems</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">HVAC (Watts)</Label>
                      <Input type="number" value={hvacWatts} onChange={(e) => setHvacWatts(e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-xs">Hours/Day</Label>
                      <Input type="number" value={hvacHours} onChange={(e) => setHvacHours(e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Water Heater (Watts)</Label>
                      <Input type="number" value={waterHeaterWatts} onChange={(e) => setWaterHeaterWatts(e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-xs">Hours/Day</Label>
                      <Input type="number" value={waterHeaterHours} onChange={(e) => setWaterHeaterHours(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-sm mb-3">Other Usage</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Lighting (Watts)</Label>
                      <Input type="number" value={lightingWatts} onChange={(e) => setLightingWatts(e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-xs">Hours/Day</Label>
                      <Input type="number" value={lightingHours} onChange={(e) => setLightingHours(e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Appliances (Watts)</Label>
                      <Input type="number" value={appliancesWatts} onChange={(e) => setAppliancesWatts(e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-xs">Hours/Day</Label>
                      <Input type="number" value={appliancesHours} onChange={(e) => setAppliancesHours(e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Electronics (Watts)</Label>
                      <Input type="number" value={electronicsWatts} onChange={(e) => setElectronicsWatts(e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-xs">Hours/Day</Label>
                      <Input type="number" value={electronicsHours} onChange={(e) => setElectronicsHours(e.target.value)} />
                    </div>
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
              <h3 className="text-lg font-semibold mb-4">Energy Breakdown</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Daily Usage</p>
                      <p className="text-2xl font-bold text-primary">{result.totalKwh} kWh</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Daily Cost</p>
                      <p className="text-2xl font-bold text-primary">${result.totalCost}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Usage by Category</h4>
                    <div className="space-y-2">
                      {result.appliances.map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{item.name}</span>
                            <span>{item.kwh} kWh ({item.percentage}%)</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${
                                item.percentage > 30 ? "bg-red-500" :
                                item.percentage > 20 ? "bg-amber-500" :
                                "bg-green-500"
                              }`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Top 3 Energy Users</h4>
                    {result.biggestUsers.map((user, i) => (
                      <div key={i} className="flex justify-between py-1">
                        <span>{i + 1}. {user.name}</span>
                        <span className="font-semibold">{user.percentage}%</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Energy Saving Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your usage data and click Calculate to see breakdown</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Typical Home Energy Breakdown
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>HVAC:</strong> 40-50% of total energy use
                  </li>
                  <li>
                    <strong>Water Heating:</strong> 15-20%
                  </li>
                  <li>
                    <strong>Lighting:</strong> 10-15% (less with LEDs)
                  </li>
                  <li>
                    <strong>Appliances:</strong> 15-20%
                  </li>
                  <li>
                    <strong>Electronics:</strong> 5-10%
                  </li>
                </ul>
                <p>
                  <strong>Formula:</strong> kWh = (Watts × Hours) / 1000
                  <br />
                  Cost = kWh × Rate ($/kWh)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
