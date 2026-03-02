"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GearRatioCalculator() {
  const [gears, setGears] = useState<{ driver: string; driven: string }[]>([{ driver: "", driven: "" }]);
  const [inputRpm, setInputRpm] = useState<string>("");
  const [inputTorque, setInputTorque] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const addGear = () => setGears([...gears, { driver: "", driven: "" }]);
  const removeGear = (i: number) => setGears(gears.filter((_, idx) => idx !== i));
  const updateGear = (i: number, field: string, val: string) => {
    const newGears = [...gears];
    (newGears[i] as any)[field] = val;
    setGears(newGears);
  };

  const calculate = () => {
    let totalRatio = 1;
    gears.forEach(g => {
      const d = parseFloat(g.driver);
      const D = parseFloat(g.driven);
      if (d > 0 && D > 0) totalRatio *= D / d;
    });

    const inputR = parseFloat(inputRpm);
    const inputT = parseFloat(inputTorque);

    if (totalRatio > 0) {
      const outputRpm = inputR > 0 ? inputR / totalRatio : null;
      const outputTorque = inputT > 0 ? inputT * totalRatio : null;

      setResults({
        ratio: totalRatio,
        outputRpm: outputRpm ? Math.round(outputRpm * 10) / 10 : null,
        outputTorque: outputTorque ? Math.round(outputTorque * 100) / 100 : null,
      });
    }
  };

  const reset = () => {
    setGears([{ driver: "", driven: "" }]);
    setInputRpm(""); setInputTorque(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Gear Ratio Calculator – Calculate Gear Train Ratio</CardTitle>
          <CardDescription>
            Calculate gear ratios for single or multi-stage gear trains. Our calculator determines output speed and torque based on gear tooth counts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gears.map((gear, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-4">
                  <Label>Driver Teeth</Label>
                  <Input type="number" value={gear.driver} onChange={e => updateGear(i, "driver", e.target.value)} placeholder="T₁" />
                </div>
                <div className="col-span-1 text-center pb-2">→</div>
                <div className="col-span-4">
                  <Label>Driven Teeth</Label>
                  <Input type="number" value={gear.driven} onChange={e => updateGear(i, "driven", e.target.value)} placeholder="T₂" />
                </div>
                <div className="col-span-2">
                  <Button variant="outline" size="sm" onClick={() => removeGear(i)} disabled={gears.length === 1}>×</Button>
                </div>
                <div className="col-span-1 text-center pb-2 text-sm text-muted-foreground">
                  {gear.driver && gear.driven ? `:${(parseFloat(gear.driven) / parseFloat(gear.driver)).toFixed(2)}` : ""}
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addGear}>+ Add Stage</Button>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Input RPM (optional)</Label><Input value={inputRpm} onChange={e => setInputRpm(e.target.value)} /></div>
              <div><Label>Input Torque (optional)</Label><Input value={inputTorque} onChange={e => setInputTorque(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Total Gear Ratio</p>
                  <p className="text-4xl font-bold">1 : {results.ratio.toFixed(2)}</p>
                </div>
                {results.outputRpm && (
                  <div>
                    <p className="text-sm text-muted-foreground">Output RPM</p>
                    <p className="text-3xl font-bold">{results.outputRpm}</p>
                  </div>
                )}
                {results.outputTorque && (
                  <div>
                    <p className="text-sm text-muted-foreground">Output Torque</p>
                    <p className="text-3xl font-bold">{results.outputTorque} N·m</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
