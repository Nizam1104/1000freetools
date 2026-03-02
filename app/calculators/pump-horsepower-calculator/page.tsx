"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PumpHorsepowerCalculator() {
  const [flowRate, setFlowRate] = useState<string>("");
  const [head, setHead] = useState<string>("");
  const [efficiency, setEfficiency] = useState<string>("");
  const [fluidDensity, setFluidDensity] = useState<string>("1000");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const Q = parseFloat(flowRate); // m³/s
    const H = parseFloat(head); // m
    const η = parseFloat(efficiency) / 100;
    const ρ = parseFloat(fluidDensity); // kg/m³

    if (Q > 0 && H > 0 && η > 0) {
      const g = 9.81;
      // Hydraulic power: P = ρgQH
      const hydraulicPower = ρ * g * Q * H;
      // Shaft power: P_shaft = P_hydraulic / η
      const shaftPower = hydraulicPower / η;
      const hp = shaftPower / 745.7;
      const kW = shaftPower / 1000;

      setResults({
        hydraulicPower: hydraulicPower,
        shaftPower: shaftPower,
        hp: hp,
        kW: kW,
      });
    }
  };

  const reset = () => {
    setFlowRate(""); setHead(""); setEfficiency(""); setFluidDensity("1000"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Pump Horsepower Calculator – Calculate Required Pump Power</CardTitle>
          <CardDescription>
            Size your pump correctly with our pump horsepower calculator. Enter flow rate, total head, and efficiency to find the required pump power in HP or kW.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Flow Rate (m³/s)</Label><Input value={flowRate} onChange={e => setFlowRate(e.target.value)} /></div>
              <div><Label>Total Head (m)</Label><Input value={head} onChange={e => setHead(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Pump Efficiency (%)</Label><Input value={efficiency} onChange={e => setEfficiency(e.target.value)} placeholder="e.g., 75" /></div>
              <div><Label>Fluid Density (kg/m³)</Label><Input value={fluidDensity} onChange={e => setFluidDensity(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Power</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Hydraulic Power</p>
                    <p className="text-2xl font-bold">{Math.round(results.hydraulicPower * 100) / 100} W</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Shaft Power Required</p>
                    <p className="text-2xl font-bold">{Math.round(results.shaftPower * 100) / 100} W</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Horsepower</p>
                    <p className="text-3xl font-bold">{Math.round(results.hp * 100) / 100} HP</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kilowatts</p>
                    <p className="text-2xl font-bold">{Math.round(results.kW * 100) / 100} kW</p>
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
