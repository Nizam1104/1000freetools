"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ElectricalLoadCalculator() {
  const [voltage, setVoltage] = useState<string>("");
  const [loads, setLoads] = useState<{ name: string; watts: string }[]>([{ name: "", watts: "" }]);
  const [results, setResults] = useState<any>(null);

  const addLoad = () => setLoads([...loads, { name: "", watts: "" }]);
  const removeLoad = (i: number) => setLoads(loads.filter((_, idx) => idx !== i));
  const updateLoad = (i: number, field: string, val: string) => {
    const newLoads = [...loads];
    (newLoads[i] as any)[field] = val;
    setLoads(newLoads);
  };

  const calculate = () => {
    const V = parseFloat(voltage);
    let totalWatts = 0;

    loads.forEach(l => {
      const w = parseFloat(l.watts);
      if (w > 0) totalWatts += w;
    });

    if (V > 0 && totalWatts > 0) {
      const current = totalWatts / V;
      const breaker = current * 1.25;
      const wireAmpacity = current * 1.25;

      setResults({
        totalWatts,
        current: Math.round(current * 100) / 100,
        breaker: Math.ceil(breaker * 10) / 10,
        wireAmpacity: Math.round(wireAmpacity),
      });
    }
  };

  const reset = () => {
    setVoltage("");
    setLoads([{ name: "", watts: "" }]);
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Electrical Load Calculator – Calculate Circuit Load</CardTitle>
          <CardDescription>
            Calculate the total electrical load on a circuit. Enter voltage and connected loads to determine current, breaker size, and wire requirements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>System Voltage (V)</Label>
              <Input value={voltage} onChange={e => setVoltage(e.target.value)} placeholder="e.g., 120, 230, 400" />
            </div>

            {loads.map((load, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-7">
                  <Label>Load</Label>
                  <Input value={load.name} onChange={e => updateLoad(i, "name", e.target.value)} placeholder="Device name" />
                </div>
                <div className="col-span-4">
                  <Label>Watts</Label>
                  <Input type="number" value={load.watts} onChange={e => updateLoad(i, "watts", e.target.value)} placeholder="W" />
                </div>
                <div className="col-span-1">
                  <Button variant="outline" size="sm" onClick={() => removeLoad(i)} disabled={loads.length === 1}>×</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addLoad}>+ Add Load</Button>

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
                    <p className="text-sm text-muted-foreground">Current Draw</p>
                    <p className="text-2xl font-bold">{results.current} A</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Breaker Size</p>
                    <p className="text-3xl font-bold">{results.breaker} A</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Min Wire Ampacity</p>
                    <p className="text-2xl font-bold">{results.wireAmpacity} A</p>
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
