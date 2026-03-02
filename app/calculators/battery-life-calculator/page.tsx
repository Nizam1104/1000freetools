"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BatteryLifeCalculator() {
  const [capacity, setCapacity] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("");
  const [loadCurrent, setLoadCurrent] = useState<string>("");
  const [loadPower, setLoadPower] = useState<string>("");
  const [depthOfDischarge, setDepthOfDischarge] = useState<string>("80");
  const [batteryType, setBatteryType] = useState<"liion" | "leadacid" | "nimh">("liion");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const C = parseFloat(capacity); // Ah
    const V = parseFloat(voltage);
    const I = parseFloat(loadCurrent);
    const P = parseFloat(loadPower);
    const DoD = parseFloat(depthOfDischarge) / 100;

    let current = I;
    if (P > 0 && V > 0) {
      current = P / V;
    }

    if (C > 0 && current > 0) {
      const usableCapacity = C * DoD;
      const hours = usableCapacity / current;
      const wattHours = usableCapacity * V;
      const actualHours = hours > 100 ? "100+" : hours.toFixed(1);

      setResults({
        hours: actualHours,
        minutes: Math.round(hours * 60),
        wattHours: Math.round(wattHours),
        usableCapacity: Math.round(usableCapacity * 100) / 100,
      });
    }
  };

  const reset = () => {
    setCapacity(""); setVoltage(""); setLoadCurrent(""); setLoadPower("");
    setDepthOfDischarge("80"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Battery Life Calculator – Calculate Battery Runtime</CardTitle>
          <CardDescription>
            Estimate how long your battery will last with our battery life calculator. Enter battery capacity and load to calculate runtime in hours and minutes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Battery Capacity (Ah)</Label><Input value={capacity} onChange={e => setCapacity(e.target.value)} /></div>
              <div><Label>Battery Voltage (V)</Label><Input value={voltage} onChange={e => setVoltage(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Load Current (A)</Label><Input value={loadCurrent} onChange={e => setLoadCurrent(e.target.value)} /></div>
              <div><Label>Or Load Power (W)</Label><Input value={loadPower} onChange={e => setLoadPower(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Battery Type</Label>
                <Select value={batteryType} onValueChange={(v) => setBatteryType(v as typeof batteryType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="liion">Li-Ion (80% DoD)</SelectItem>
                    <SelectItem value="leadacid">Lead Acid (50% DoD)</SelectItem>
                    <SelectItem value="nimh">NiMH (90% DoD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Depth of Discharge (%)</Label>
                <Input value={depthOfDischarge} onChange={e => setDepthOfDischarge(e.target.value)} />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Runtime</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Runtime</p>
                    <p className="text-4xl font-bold">{results.hours} hours</p>
                    <p className="text-sm text-muted-foreground">≈ {results.minutes} minutes</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Usable Capacity</p>
                    <p className="text-2xl font-bold">{results.usableCapacity} Ah</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Energy Available</p>
                    <p className="text-2xl font-bold">{results.wattHours} Wh</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
