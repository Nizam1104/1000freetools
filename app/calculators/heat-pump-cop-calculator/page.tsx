"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HeatPumpCopCalculator() {
  const [heatOutput, setHeatOutput] = useState<string>("");
  const [powerInput, setPowerInput] = useState<string>("");
  const [sourceTemp, setSourceTemp] = useState<string>("");
  const [sinkTemp, setSinkTemp] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const Q = parseFloat(heatOutput);
    const W = parseFloat(powerInput);
    const Tc = parseFloat(sourceTemp) + 273.15;
    const Th = parseFloat(sinkTemp) + 273.15;

    if (Q > 0 && W > 0) {
      const cop = Q / W;
      const copCarnot = Th / (Th - Tc);
      const efficiency = (cop / copCarnot) * 100;

      setResults({ cop, copCarnot: Math.round(copCarnot * 100) / 100, efficiency: Math.round(efficiency) });
    }
  };

  const reset = () => {
    setHeatOutput(""); setPowerInput(""); setSourceTemp(""); setSinkTemp(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Heat Pump COP Calculator – Coefficient of Performance</CardTitle>
          <CardDescription>
            Calculate the Coefficient of Performance (COP) for heat pumps and compare to Carnot efficiency.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Heat Output (kW)</Label><Input value={heatOutput} onChange={e => setHeatOutput(e.target.value)} /></div>
              <div><Label>Power Input (kW)</Label><Input value={powerInput} onChange={e => setPowerInput(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Source Temp (°C)</Label><Input value={sourceTemp} onChange={e => setSourceTemp(e.target.value)} /></div>
              <div><Label>Sink Temp (°C)</Label><Input value={sinkTemp} onChange={e => setSinkTemp(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate COP</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Actual COP</p>
                    <p className="text-3xl font-bold">{Math.round(results.cop * 100) / 100}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Carnot COP</p>
                    <p className="text-2xl font-bold">{results.copCarnot}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Efficiency</p>
                    <p className="text-2xl font-bold">{results.efficiency}%</p>
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
