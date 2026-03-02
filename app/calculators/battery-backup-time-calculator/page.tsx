"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BatteryBackupTimeCalculatorPage() {
  const [batteryCapacity, setBatteryCapacity] = useState<string>("");
  const [batteryVoltage, setBatteryVoltage] = useState<string>("12");
  const [deviceWattage, setDeviceWattage] = useState<string>("");
  const [deviceVoltage, setDeviceVoltage] = useState<string>("12");
  const [batteryType, setBatteryType] = useState<"lead-acid" | "lithium" | "agm" | "gel">("lead-acid");
  const [efficiency, setEfficiency] = useState<string>("85");
  const [result, setResult] = useState<{
    batteryWh: number;
    usableWh: number;
    runtimeHours: number;
    runtimeMinutes: number;
    deviceAmps: number;
  } | null>(null);

  const calculate = () => {
    const capacity = parseFloat(batteryCapacity);
    const battVolt = parseFloat(batteryVoltage);
    const deviceWatt = parseFloat(deviceWattage);
    const deviceVolt = parseFloat(deviceVoltage);
    const eff = parseFloat(efficiency) / 100;

    if (isNaN(capacity) || isNaN(battVolt) || isNaN(deviceWatt) || capacity <= 0 || battVolt <= 0 || deviceWatt <= 0) return;

    // Battery capacity in Watt-hours
    const batteryWh = capacity * battVolt;

    // Depth of discharge based on battery type
    const dodFactors = {
      "lead-acid": 0.5,  // 50% DoD recommended
      "lithium": 0.9,    // 90% DoD for LiFePO4
      "agm": 0.6,        // 60% DoD for AGM
      "gel": 0.6,        // 60% DoD for Gel
    };

    const dod = dodFactors[batteryType];
    const usableWh = batteryWh * dod * eff;

    // Runtime in hours
    const runtimeHours = usableWh / deviceWatt;
    const runtimeMinutes = runtimeHours * 60;

    // Device current draw
    const deviceAmps = deviceWatt / deviceVolt;

    setResult({
      batteryWh: Math.round(batteryWh),
      usableWh: Math.round(usableWh),
      runtimeHours: Math.round(runtimeHours * 100) / 100,
      runtimeMinutes: Math.round(runtimeMinutes),
      deviceAmps: Math.round(deviceAmps * 100) / 100,
    });
  };

  const reset = () => {
    setBatteryCapacity("");
    setDeviceWattage("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Battery Backup Time Calculator – How Long Will Your Battery Last?
          </h1>
          <p className="text-muted-foreground">
            Find out how long your battery will power your devices with our Battery Backup Time
            Calculator. Enter battery capacity in Ah or Wh and your device's power draw in watts to
            get an accurate runtime estimate — ideal for solar systems, UPS, and portable power banks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Battery Specifications</h3>
              
              <div className="space-y-2">
                <Label htmlFor="capacity">Battery Capacity (Ah)</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="e.g., 100"
                  value={batteryCapacity}
                  onChange={(e) => setBatteryCapacity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="voltage">Battery Voltage (V)</Label>
                <Select value={batteryVoltage} onValueChange={setBatteryVoltage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6V</SelectItem>
                    <SelectItem value="12">12V</SelectItem>
                    <SelectItem value="24">24V</SelectItem>
                    <SelectItem value="48">48V</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="batteryType">Battery Type</Label>
                <Select value={batteryType} onValueChange={(v) => setBatteryType(v as "lead-acid" | "lithium" | "agm" | "gel")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead-acid">Lead-Acid (Flooded)</SelectItem>
                    <SelectItem value="agm">AGM (Absorbent Glass Mat)</SelectItem>
                    <SelectItem value="gel">Gel Cell</SelectItem>
                    <SelectItem value="lithium">Lithium (LiFePO4)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Affects depth of discharge limits
                </p>
              </div>

              <h3 className="font-semibold pt-2">Device Specifications</h3>

              <div className="space-y-2">
                <Label htmlFor="wattage">Device Power (Watts)</Label>
                <Input
                  id="wattage"
                  type="number"
                  placeholder="e.g., 100"
                  value={deviceWattage}
                  onChange={(e) => setDeviceWattage(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deviceVoltage">Device Voltage (V)</Label>
                <Select value={deviceVoltage} onValueChange={setDeviceVoltage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5V (USB)</SelectItem>
                    <SelectItem value="12">12V (DC)</SelectItem>
                    <SelectItem value="24">24V (DC)</SelectItem>
                    <SelectItem value="120">120V (AC)</SelectItem>
                    <SelectItem value="230">230V (AC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="efficiency">System Efficiency (%)</Label>
                <Input
                  id="efficiency"
                  type="number"
                  placeholder="85"
                  value={efficiency}
                  onChange={(e) => setEfficiency(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Inverter/convertor losses (typically 80-95%)
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
              <h3 className="text-lg font-semibold mb-4">Backup Time Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Estimated Runtime</p>
                    <p className="text-3xl font-bold text-primary">
                      {result.runtimeHours >= 1 
                        ? `${result.runtimeHours} hours` 
                        : `${result.runtimeMinutes} minutes`}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Battery Capacity</p>
                      <p className="text-lg font-bold">{result.batteryWh} Wh</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Usable Energy</p>
                      <p className="text-lg font-bold">{result.usableWh} Wh</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Device Current Draw</p>
                    <p className="text-xl font-bold">{result.deviceAmps} A</p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>Note:</strong> Runtime is estimated. Actual performance varies with
                      battery age, temperature, and load conditions.
                    </p>
                    <p>
                      <strong>Tip:</strong> For lead-acid batteries, never discharge below 50% to
                      maximize battery life.
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
          <h3 className="text-lg font-semibold mb-3">Battery Backup Calculation Formula</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Battery Energy (Wh) = Capacity (Ah) × Voltage (V)</div>
            <div>Usable Energy = Battery Energy × DoD × Efficiency</div>
            <div>Runtime (hours) = Usable Energy (Wh) ÷ Device Power (W)</div>
          </div>
          <table className="w-full text-sm mt-3">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Battery Type</th>
                <th className="text-left py-2">Recommended DoD</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Lead-Acid (Flooded)</td>
                <td className="py-2">50%</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">AGM</td>
                <td className="py-2">60%</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Gel</td>
                <td className="py-2">60%</td>
              </tr>
              <tr>
                <td className="py-2">Lithium (LiFePO4)</td>
                <td className="py-2">90%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
