"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ElectricityApplianceWattageCalculatorPage() {
  const [wattage, setWattage] = useState<string>("");
  const [hoursPerDay, setHoursPerDay] = useState<string>("");
  const [electricityRate, setElectricityRate] = useState<string>("0.13");
  const [daysPerMonth, setDaysPerMonth] = useState<string>("30");
  const [result, setResult] = useState<{
    dailyKwh: number;
    monthlyKwh: number;
    yearlyKwh: number;
    dailyCost: number;
    monthlyCost: number;
    yearlyCost: number;
  } | null>(null);

  const presetAppliances = [
    { name: "LED Light Bulb", watts: "10" },
    { name: "Incandescent Bulb", watts: "60" },
    { name: "Ceiling Fan", watts: "75" },
    { name: "Table Fan", watts: "50" },
    { name: "Refrigerator", watts: "150" },
    { name: "Air Conditioner (1 ton)", watts: "1000" },
    { name: "Air Conditioner (2 ton)", watts: "2000" },
    { name: "Heater", watts: "1500" },
    { name: "TV (LED 55\")", watts: "100" },
    { name: "Computer Desktop", watts: "200" },
    { name: "Laptop", watts: "50" },
    { name: "Microwave", watts: "1000" },
    { name: "Oven", watts: "2000" },
    { name: "Dishwasher", watts: "1200" },
    { name: "Washing Machine", watts: "500" },
    { name: "Dryer", watts: "3000" },
    { name: "Water Heater", watts: "4000" },
    { name: "Coffee Maker", watts: "900" },
    { name: "Toaster", watts: "800" },
    { name: "Hair Dryer", watts: "1500" },
    { name: "Iron", watts: "1000" },
    { name: "Vacuum Cleaner", watts: "1000" },
    { name: "Phone Charger", watts: "5" },
    { name: "Router", watts: "10" },
  ];

  const applyPreset = (watts: string) => {
    setWattage(watts);
  };

  const calculate = () => {
    const watts = parseFloat(wattage);
    const hours = parseFloat(hoursPerDay);
    const rate = parseFloat(electricityRate);
    const days = parseFloat(daysPerMonth) || 30;

    if (isNaN(watts) || isNaN(hours) || isNaN(rate) || watts <= 0 || hours <= 0) return;

    // Daily kWh = (Watts × Hours) / 1000
    const dailyKwh = (watts * hours) / 1000;

    // Monthly kWh
    const monthlyKwh = dailyKwh * days;

    // Yearly kWh
    const yearlyKwh = dailyKwh * 365;

    // Costs
    const dailyCost = dailyKwh * rate;
    const monthlyCost = monthlyKwh * rate;
    const yearlyCost = yearlyKwh * rate;

    setResult({
      dailyKwh: Math.round(dailyKwh * 1000) / 1000,
      monthlyKwh: Math.round(monthlyKwh * 100) / 100,
      yearlyKwh: Math.round(yearlyKwh * 100) / 100,
      dailyCost: Math.round(dailyCost * 100) / 100,
      monthlyCost: Math.round(monthlyCost * 100) / 100,
      yearlyCost: Math.round(yearlyCost * 100) / 100,
    });
  };

  const reset = () => {
    setWattage("");
    setHoursPerDay("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Appliance Wattage & Electricity Cost Calculator – See What's Draining Your Power Bill
          </h1>
          <p className="text-muted-foreground">
            Find out exactly how much each appliance costs to run with our Electricity Appliance
            Wattage Calculator. Enter wattage and daily usage hours to see kWh consumption and
            monthly electricity cost — perfect for reducing your power bill.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Quick Select Appliance</Label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded">
                  {presetAppliances.map((appliance) => (
                    <Button
                      key={appliance.name}
                      variant="outline"
                      size="sm"
                      onClick={() => applyPreset(appliance.watts)}
                      className="justify-start text-xs"
                    >
                      {appliance.name} ({appliance.watts}W)
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wattage">Appliance Wattage (Watts)</Label>
                <Input
                  id="wattage"
                  type="number"
                  placeholder="e.g., 100"
                  value={wattage}
                  onChange={(e) => setWattage(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Check the appliance label or manual for wattage
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours">Hours Used Per Day</Label>
                <Input
                  id="hours"
                  type="number"
                  placeholder="e.g., 4"
                  step="0.5"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Electricity Rate ($/kWh)</Label>
                <Input
                  id="rate"
                  type="number"
                  placeholder="0.13"
                  step="0.01"
                  value={electricityRate}
                  onChange={(e) => setElectricityRate(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  US average: $0.10-$0.20/kWh
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="days">Days Per Month</Label>
                <Input
                  id="days"
                  type="number"
                  placeholder="30"
                  value={daysPerMonth}
                  onChange={(e) => setDaysPerMonth(e.target.value)}
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
              <h3 className="text-lg font-semibold mb-4">Energy Consumption Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Monthly Cost</p>
                    <p className="text-3xl font-bold text-primary">${result.monthlyCost.toFixed(2)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Daily Usage</p>
                      <p className="text-lg font-bold">{result.dailyKwh} kWh</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Monthly Usage</p>
                      <p className="text-lg font-bold">{result.monthlyKwh} kWh</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Yearly Cost</p>
                    <p className="text-2xl font-bold">${result.yearlyCost.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      ({result.yearlyKwh} kWh/year)
                    </p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground">
                    <p>
                      <strong>Cost breakdown:</strong> ${result.dailyCost.toFixed(3)}/day at {wattage}W
                      for {hoursPerDay} hours/day
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
          <h3 className="text-lg font-semibold mb-3">How to Calculate Electricity Cost</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Daily kWh = (Watts × Hours) ÷ 1000</div>
            <div>Monthly kWh = Daily kWh × Days</div>
            <div>Monthly Cost = Monthly kWh × Rate ($/kWh)</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Example:</strong> A 100W TV running 5 hours/day at $0.13/kWh:
            <br />
            Daily: (100 × 5) / 1000 = 0.5 kWh
            <br />
            Monthly: 0.5 × 30 = 15 kWh → $1.95/month
          </p>
        </div>
      </div>
    </div>
  );
}
