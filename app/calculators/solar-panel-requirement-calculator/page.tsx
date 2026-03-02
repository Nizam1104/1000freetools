"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SolarPanelRequirementCalculator() {
  const [dailyConsumption, setDailyConsumption] = useState<string>("");
  const [sunHours, setSunHours] = useState<string>("");
  const [panelWattage, setPanelWattage] = useState<string>("");
  const [systemLoss, setSystemLoss] = useState<string>("20");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const consumption = parseFloat(dailyConsumption); // Wh
    const sunHoursVal = parseFloat(sunHours);
    const panelW = parseFloat(panelWattage);
    const loss = parseFloat(systemLoss) / 100;

    if (consumption > 0 && sunHoursVal > 0) {
      // Required system size
      const adjustedConsumption = consumption / (1 - loss);
      const requiredWatts = adjustedConsumption / sunHoursVal;
      const numPanels = panelW > 0 ? Math.ceil(requiredWatts / panelW) : 0;
      const batteryCapacity = (consumption / 12) * 1.5; // 12V system, 50% DoD

      setResults({
        requiredWatts: Math.round(requiredWatts),
        numPanels: numPanels,
        batteryAh: Math.round(batteryCapacity),
        dailyProduction: panelW > 0 ? Math.round(numPanels * panelW * sunHoursVal * (1 - loss)) : 0,
      });
    }
  };

  const reset = () => {
    setDailyConsumption(""); setSunHours(""); setPanelWattage(""); setSystemLoss("20"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Solar Panel Requirement Calculator – Size Your Solar System</CardTitle>
          <CardDescription>
            Calculate how many solar panels you need for your energy requirements. Our calculator considers daily consumption, sun hours, and system losses to size your solar installation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Daily Energy Consumption (Wh)</Label><Input value={dailyConsumption} onChange={e => setDailyConsumption(e.target.value)} /></div>
              <div><Label>Peak Sun Hours/day</Label><Input value={sunHours} onChange={e => setSunHours(e.target.value)} placeholder="e.g., 5" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Panel Wattage (W)</Label><Input value={panelWattage} onChange={e => setPanelWattage(e.target.value)} placeholder="e.g., 400" /></div>
              <div><Label>System Losses (%)</Label><Input value={systemLoss} onChange={e => setSystemLoss(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Requirements</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Required System Size</p>
                    <p className="text-3xl font-bold">{results.requiredWatts} W</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Number of Panels</p>
                    <p className="text-4xl font-bold">{results.numPanels}</p>
                    <p className="text-xs text-muted-foreground">@ {panelWattage}W each</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Battery Capacity (12V)</p>
                    <p className="text-2xl font-bold">{results.batteryAh} Ah</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Production</p>
                    <p className="text-2xl font-bold">{results.dailyProduction} Wh</p>
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
