"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InverterCapacityCalculator() {
  const [devices, setDevices] = useState<{ name: string; watts: string; hours: string }[]>([{ name: "", watts: "", hours: "" }]);
  const [surge, setSurge] = useState<string>("20");
  const [results, setResults] = useState<any>(null);

  const addDevice = () => setDevices([...devices, { name: "", watts: "", hours: "" }]);
  const removeDevice = (i: number) => setDevices(devices.filter((_, idx) => idx !== i));
  const updateDevice = (i: number, field: string, val: string) => {
    const newDevices = [...devices];
    (newDevices[i] as any)[field] = val;
    setDevices(newDevices);
  };

  const calculate = () => {
    let totalWatts = 0;
    let totalWh = 0;

    devices.forEach(d => {
      const w = parseFloat(d.watts);
      const h = parseFloat(d.hours);
      if (w > 0) {
        totalWatts += w;
        totalWh += w * (h || 0);
      }
    });

    if (totalWatts > 0) {
      const surgeFactor = 1 + parseFloat(surge) / 100;
      const inverterSize = totalWatts * surgeFactor;
      const batteryAh12V = (totalWh / 12) * 1.5;
      const batteryAh24V = (totalWh / 24) * 1.5;

      setResults({
        totalWatts,
        totalWh,
        inverterSize: Math.round(inverterSize),
        battery12V: Math.round(batteryAh12V),
        battery24V: Math.round(batteryAh24V),
      });
    }
  };

  const reset = () => {
    setDevices([{ name: "", watts: "", hours: "" }]);
    setSurge("20");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Inverter Capacity Calculator – Size Your Inverter</CardTitle>
          <CardDescription>
            Calculate the required inverter capacity for your electrical loads. Enter your devices and their power consumption to determine the right inverter size.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {devices.map((device, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-4">
                  <Label>Device</Label>
                  <Input value={device.name} onChange={e => updateDevice(i, "name", e.target.value)} placeholder="Name" />
                </div>
                <div className="col-span-3">
                  <Label>Watts</Label>
                  <Input type="number" value={device.watts} onChange={e => updateDevice(i, "watts", e.target.value)} placeholder="W" />
                </div>
                <div className="col-span-4">
                  <Label>Hours/Day</Label>
                  <Input type="number" value={device.hours} onChange={e => updateDevice(i, "hours", e.target.value)} placeholder="hrs" />
                </div>
                <div className="col-span-1">
                  <Button variant="outline" size="sm" onClick={() => removeDevice(i)} disabled={devices.length === 1}>×</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addDevice}>+ Add Device</Button>

            <div>
              <Label>Surge Margin (%)</Label>
              <Input value={surge} onChange={e => setSurge(e.target.value)} />
              <p className="text-sm text-muted-foreground mt-1">Recommended: 20-25% for motor startup</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Load</p>
                    <p className="text-2xl font-bold">{results.totalWatts} W</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Energy</p>
                    <p className="text-2xl font-bold">{results.totalWh} Wh</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Inverter Size</p>
                    <p className="text-3xl font-bold">{results.inverterSize} W</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Battery (12V/24V)</p>
                    <p className="text-xl font-bold">{results.battery12V}Ah / {results.battery24V}Ah</p>
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
