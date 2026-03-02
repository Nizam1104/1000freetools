"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChillerTonnageCalculator() {
  const [flowRate, setFlowRate] = useState<string>("");
  const [deltaT, setDeltaT] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const GPM = parseFloat(flowRate);
    const ΔT = parseFloat(deltaT);

    if (GPM > 0 && ΔT > 0) {
      // Tonnage = (GPM × ΔT × 500) / 12000
      const tons = (GPM * ΔT * 500) / 12000;
      const kW = tons * 3.517;
      const btuh = tons * 12000;

      setResults({ tons: Math.round(tons * 10) / 10, kW: Math.round(kW * 10) / 10, btuh });
    }
  };

  const reset = () => {
    setFlowRate(""); setDeltaT(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Chiller Tonnage Calculator – Calculate Cooling Capacity</CardTitle>
          <CardDescription>
            Calculate chiller tonnage from water flow rate and temperature difference. Essential for HVAC system sizing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Flow Rate (GPM)</Label><Input value={flowRate} onChange={e => setFlowRate(e.target.value)} /></div>
              <div><Label>ΔT (°F)</Label><Input value={deltaT} onChange={e => setDeltaT(e.target.value)} placeholder="Typical: 10°F" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Tonnage</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Cooling Capacity</p>
                    <p className="text-3xl font-bold">{results.tons} tons</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In kW</p>
                    <p className="text-2xl font-bold">{results.kW}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">BTU/h</p>
                    <p className="text-xl font-bold">{results.btuh.toLocaleString()}</p>
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
