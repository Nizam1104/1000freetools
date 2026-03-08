"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ChargingCostEvCalculatorPage() {
  const [batteryCapacity, setBatteryCapacity] = useState<string>("");
  const [electricityRate, setElectricityRate] = useState<string>("");
  const [chargingEfficiency, setChargingEfficiency] = useState<string>("90");
  const [chargingType, setChargingType] = useState<"home" | "public" | "supercharger">("home");
  const [result, setResult] = useState<{
    totalCost: number;
    costPerKwh: number;
    costPerMile: number;
    energyDelivered: number;
  } | null>(null);
  const [currentCharge, setCurrentCharge] = useState<string>("0");
  const [vehicleRange, setVehicleRange] = useState<string>("");

  const calculate = () => {
    const capacity = parseFloat(batteryCapacity);
    const rate = parseFloat(electricityRate);
    const efficiency = parseFloat(chargingEfficiency) / 100;
    const current = parseFloat(currentCharge) || 0;
    const range = parseFloat(vehicleRange) || 250;

    if (isNaN(capacity) || isNaN(rate) || isNaN(efficiency) || capacity <= 0 || rate <= 0 || efficiency <= 0) return;

    // Energy needed to charge from current to full
    const energyNeeded = capacity - (capacity * current / 100);

    // Account for charging losses (efficiency)
    const energyDelivered = energyNeeded / efficiency;

    // Base cost
    let totalCost = energyDelivered * rate;

    // Add charging type premium
    const chargingPremiums = {
      home: 1.0,
      public: 1.5,
      supercharger: 2.5,
    };
    totalCost *= chargingPremiums[chargingType];

    // Cost per mile (based on range)
    const costPerMile = totalCost / range;

    setResult({
      totalCost: Math.round(totalCost * 100) / 100,
      costPerKwh: rate,
      costPerMile: Math.round(costPerMile * 1000) / 1000,
      energyDelivered: Math.round(energyDelivered * 100) / 100,
    });
  };

  const reset = () => {
    setBatteryCapacity("");
    setElectricityRate("");
    setChargingEfficiency("90");
    setCurrentCharge("0");
    setVehicleRange("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            EV Charging Cost Calculator – Calculate the Cost to Charge Your Electric Car
          </h1>
          <p className="text-muted-foreground">
            Wondering how much it costs to charge your electric vehicle? Our EV Charging Cost
            Calculator lets you enter your battery size (kWh) and local electricity rate to estimate
            charging costs at home or at a public station. Save more by knowing your real charging
            expenses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="batteryCapacity">Battery Capacity (kWh)</Label>
                <Input
                  id="batteryCapacity"
                  type="number"
                  placeholder="e.g., 75"
                  value={batteryCapacity}
                  onChange={(e) => setBatteryCapacity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentCharge">Current Charge Level (%)</Label>
                <Input
                  id="currentCharge"
                  type="number"
                  placeholder="0-100"
                  min="0"
                  max="100"
                  value={currentCharge}
                  onChange={(e) => setCurrentCharge(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="electricityRate">Electricity Rate ($/kWh)</Label>
                <Input
                  id="electricityRate"
                  type="number"
                  placeholder="e.g., 0.13"
                  step="0.01"
                  value={electricityRate}
                  onChange={(e) => setElectricityRate(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  US average: $0.13-$0.15/kWh
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chargingType">Charging Type</Label>
                <Select value={chargingType} onValueChange={(v) => setChargingType(v as "home" | "public" | "supercharger")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home Charging (Standard Rate)</SelectItem>
                    <SelectItem value="public">Public Charging (1.5x Rate)</SelectItem>
                    <SelectItem value="supercharger">Supercharger (2.5x Rate)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chargingEfficiency">Charging Efficiency (%)</Label>
                <Input
                  id="chargingEfficiency"
                  type="number"
                  placeholder="90"
                  value={chargingEfficiency}
                  onChange={(e) => setChargingEfficiency(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Typical: 85-95% (energy lost as heat)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleRange">Vehicle Range (miles)</Label>
                <Input
                  id="vehicleRange"
                  type="number"
                  placeholder="e.g., 250"
                  value={vehicleRange}
                  onChange={(e) => setVehicleRange(e.target.value)}
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
              <h3 className="text-lg font-semibold mb-4">Charging Cost Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Charging Cost</p>
                    <p className="text-3xl font-bold text-primary">${result.totalCost.toFixed(2)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Energy Delivered</p>
                      <p className="text-lg font-bold">{result.energyDelivered} kWh</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Cost per Mile</p>
                      <p className="text-lg font-bold">${result.costPerMile.toFixed(3)}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Electricity Rate</p>
                    <p className="text-xl font-bold">${result.costPerKwh.toFixed(2)}/kWh</p>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Comparison:</strong> At ${result.costPerMile.toFixed(3)}/mile, a 300-mile trip would cost ${(result.costPerMile * 300).toFixed(2)} in electricity.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">How EV Charging Costs Are Calculated</h3>
          <p className="text-muted-foreground text-sm mb-3">
            The formula accounts for battery capacity, charging efficiency losses, and electricity rates:
          </p>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Energy Needed = Battery Capacity × (100% - Current Charge%)</div>
            <div>Energy Delivered = Energy Needed ÷ Charging Efficiency</div>
            <div>Total Cost = Energy Delivered × Rate × Charging Type Multiplier</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Tip:</strong> Home charging is typically the cheapest option. Public chargers and
            Superchargers cost more but offer faster charging speeds.
          </p>
        </div>

        {/* SEO Content Section */}
        <div className="mt-12 space-y-12">
          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">How to Calculate EV Charging Costs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Enter Battery Details</h3>
                  <p className="text-muted-foreground text-sm">Input your EV's battery capacity in kWh and current charge level percentage.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Set Charging Parameters</h3>
                  <p className="text-muted-foreground text-sm">Enter electricity rate, charging type (home/public/Supercharger), and efficiency.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-2">Get Cost Breakdown</h3>
                  <p className="text-muted-foreground text-sm">See total charging cost, energy delivered, and cost per mile for trip planning.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Benefits */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Why Calculate EV Charging Costs?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">⚡ Budget Planning</h3>
                <p className="text-muted-foreground text-sm">Know exactly how much each charge costs to budget your monthly electricity or charging expenses accurately.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🔌 Charging Location Comparison</h3>
                <p className="text-muted-foreground text-sm">Compare home charging vs public stations vs Superchargers to find the most cost-effective option.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🚗 Trip Cost Estimation</h3>
                <p className="text-muted-foreground text-sm">Calculate cost per mile to plan road trip budgets and compare EV vs gasoline vehicle expenses.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📊 Efficiency Tracking</h3>
                <p className="text-muted-foreground text-sm">Monitor charging efficiency losses and understand real-world energy consumption vs rated capacity.</p>
              </div>
            </div>
          </section>

          {/* Reference Table */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">EV Charging Cost Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Charging Type</th>
                    <th className="text-left py-3 px-4">Avg Rate/kWh</th>
                    <th className="text-left py-3 px-4">Multiplier</th>
                    <th className="text-left py-3 px-4">Full Charge (75 kWh)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">🏠 Home Charging</td>
                    <td className="py-3 px-4">$0.13-0.15</td>
                    <td className="py-3 px-4">1.0× (base rate)</td>
                    <td className="py-3 px-4">$10-12</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">⚡ Public Level 2</td>
                    <td className="py-3 px-4">$0.20-0.30</td>
                    <td className="py-3 px-4">1.5× base rate</td>
                    <td className="py-3 px-4">$15-23</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">🔋 DC Fast Charging</td>
                    <td className="py-3 px-4">$0.35-0.50</td>
                    <td className="py-3 px-4">2.5× base rate</td>
                    <td className="py-3 px-4">$26-38</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">🚗 Gasoline Equivalent</td>
                    <td className="py-3 px-4">$3.50/gallon</td>
                    <td className="py-3 px-4">~3× EV cost</td>
                    <td className="py-3 px-4">$35-45 (300 mi)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">EV Charging Cost FAQs</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How much does it cost to fully charge an EV?</h3>
                <p className="text-muted-foreground text-sm">For a 75 kWh battery at $0.13/kWh (US average), a full home charge costs about $10-12. Public charging can cost 2-3× more.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What is charging efficiency loss?</h3>
                <p className="text-muted-foreground text-sm">About 10-15% of electricity is lost as heat during charging. A 75 kWh battery may need 85-90 kWh from the grid to fully charge.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Is home charging cheaper than Supercharging?</h3>
                <p className="text-muted-foreground text-sm">Yes, home charging is typically 2-3× cheaper than Supercharging. Use Superchargers for road trips, charge at home for daily use.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How do I calculate cost per mile for an EV?</h3>
                <p className="text-muted-foreground text-sm">Divide charging cost by vehicle range. Example: $12 charge ÷ 300 miles = $0.04/mile, compared to ~$0.12-0.15/mile for gasoline cars.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Does fast charging damage the battery?</h3>
                <p className="text-muted-foreground text-sm">Occasional fast charging is fine. Frequent DC fast charging can accelerate battery degradation. Use Level 2 charging when possible for daily needs.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
        </div>
      </div>
    </div>
  );
}
