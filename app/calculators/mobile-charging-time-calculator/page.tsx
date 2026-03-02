"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MobileChargingTimeCalculatorPage() {
  const [batteryCapacity, setBatteryCapacity] = useState<string>("");
  const [electricityRate, setElectricityRate] = useState<string>("");
  const [result, setResult] = useState<{ chargingCost: number } | null>(null);

  const calculate = () => {
    const capacity = parseFloat(batteryCapacity);
    const rate = parseFloat(electricityRate);
    if (isNaN(capacity) || isNaN(rate) || capacity <= 0 || rate <= 0) return;
    const chargingCost = capacity * rate;
    setResult({ chargingCost });
  };
  const reset = () => { setBatteryCapacity(""); setElectricityRate(""); setResult(null); };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Phone Charging Time Calculator – How Long Will It Take to Charge Your Phone?</h1>
          <p className="text-muted-foreground">
            Find out exactly when your phone will be fully charged with our Mobile Charging Time Calculator. Enter battery capacity (mAh), charger wattage, and current charge level to get an accurate estimated charging time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="batteryCapacity">Battery Capacity (kWh)</Label>
                <Input id="batteryCapacity" type="number" placeholder="Enter battery capacity" value={batteryCapacity} onChange={(e) => setBatteryCapacity(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="electricityRate">Electricity Rate ($/kWh)</Label>
                <Input id="electricityRate" type="number" placeholder="Enter electricity rate" value={electricityRate} onChange={(e) => setElectricityRate(e.target.value)} />
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
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Charging Cost</p>
                    <p className="text-3xl font-bold text-primary">${result?.chargingCost.toFixed(2)}</p>
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
      </div>
    </div>
  );
}
