"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BoilerEfficiencyCalculator() {
  const [fuelInput, setFuelInput] = useState<string>("");
  const [heatOutput, setHeatOutput] = useState<string>("");
  const [exhaustTemp, setExhaustTemp] = useState<string>("");
  const [ambientTemp, setAmbientTemp] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const Qin = parseFloat(fuelInput);
    const Qout = parseFloat(heatOutput);
    const Tex = parseFloat(exhaustTemp);
    const Tamb = parseFloat(ambientTemp);

    if (Qin > 0 && Qout > 0) {
      const efficiency = (Qout / Qin) * 100;
      
      // Stack loss approximation
      const stackLoss = 0.5 * (Tex - Tamb);
      const estimatedEff = 100 - stackLoss;

      setResults({
        efficiency: Math.round(efficiency * 10) / 10,
        estimatedEff: Math.round(estimatedEff * 10) / 10,
        stackLoss: Math.round(stackLoss * 10) / 10,
      });
    }
  };

  const reset = () => {
    setFuelInput(""); setHeatOutput(""); setExhaustTemp(""); setAmbientTemp(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Boiler Efficiency Calculator – Calculate Boiler Efficiency</CardTitle>
          <CardDescription>
            Calculate boiler efficiency from fuel input and heat output. Estimate stack losses from exhaust temperature.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Fuel Input (kW)</Label><Input value={fuelInput} onChange={e => setFuelInput(e.target.value)} /></div>
              <div><Label>Heat Output (kW)</Label><Input value={heatOutput} onChange={e => setHeatOutput(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Exhaust Temp (°C)</Label><Input value={exhaustTemp} onChange={e => setExhaustTemp(e.target.value)} /></div>
              <div><Label>Ambient Temp (°C)</Label><Input value={ambientTemp} onChange={e => setAmbientTemp(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Efficiency</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Direct Efficiency</p>
                    <p className="text-4xl font-bold">{results.efficiency}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Est. from Stack</p>
                    <p className="text-3xl font-bold">{results.estimatedEff}%</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Stack loss: ~{results.stackLoss}%</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
