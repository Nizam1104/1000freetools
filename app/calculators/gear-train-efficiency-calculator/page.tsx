"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GearTrainEfficiencyCalculator() {
  const [gears, setGears] = useState<{ teeth: string; efficiency: string }[]>([{ teeth: "", efficiency: "98" }]);
  const [inputPower, setInputPower] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const addGear = () => setGears([...gears, { teeth: "", efficiency: "98" }]);
  const removeGear = (i: number) => setGears(gears.filter((_, idx) => idx !== i));
  const updateGear = (i: number, field: string, val: string) => {
    const newGears = [...gears];
    (newGears[i] as any)[field] = val;
    setGears(newGears);
  };

  const calculate = () => {
    let totalRatio = 1;
    let totalEfficiency = 1;
    let gearCount = 0;

    gears.forEach((g, i) => {
      const t = parseFloat(g.teeth);
      const η = parseFloat(g.efficiency) / 100;
      if (t > 0 && i < gears.length - 1) {
        const nextT = parseFloat(gears[i + 1]?.teeth || "0");
        if (nextT > 0) {
          totalRatio *= nextT / t;
          totalEfficiency *= η;
          gearCount++;
        }
      }
    });

    const Pin = parseFloat(inputPower);
    if (Pin > 0) {
      const Pout = Pin * totalEfficiency;
      const loss = Pin - Pout;

      setResults({
        ratio: totalRatio,
        efficiency: totalEfficiency * 100,
        outputPower: Pout,
        loss: loss,
      });
    }
  };

  const reset = () => {
    setGears([{ teeth: "", efficiency: "98" }]);
    setInputPower(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            {gears.map((gear, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-4">
                  <Label>Teeth</Label>
                  <Input value={gear.teeth} onChange={e => updateGear(i, "teeth", e.target.value)} placeholder="T" />
                </div>
                <div className="col-span-5">
                  <Label>Efficiency (%)</Label>
                  <Input value={gear.efficiency} onChange={e => updateGear(i, "efficiency", e.target.value)} />
                </div>
                <div className="col-span-2">
                  <Button variant="outline" size="sm" onClick={() => removeGear(i)} disabled={gears.length === 1}>×</Button>
                </div>
                <div className="col-span-1 text-center pb-2 text-sm">{i < gears.length - 1 ? "→" : ""}</div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addGear}>+ Add Gear</Button>

            <div>
              <Label>Input Power (kW)</Label>
              <Input value={inputPower} onChange={e => setInputPower(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Ratio</p>
                    <p className="text-2xl font-bold">1 : {results.ratio.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Efficiency</p>
                    <p className="text-3xl font-bold">{Math.round(results.efficiency * 10) / 10}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Output Power</p>
                    <p className="text-2xl font-bold">{Math.round(results.outputPower * 100) / 100} kW</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Power Loss</p>
                    <p className="text-xl font-bold">{Math.round(results.loss * 100) / 100} kW</p>
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
