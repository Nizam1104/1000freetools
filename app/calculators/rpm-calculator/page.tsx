"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RpmCalculator() {
  const [mode, setMode] = useState<"pulley" | "gear" | "motor">("pulley");
  const [driverDiameter, setDriverDiameter] = useState<string>("");
  const [drivenDiameter, setDrivenDiameter] = useState<string>("");
  const [driverRpm, setDriverRpm] = useState<string>("");
  const [driverTeeth, setDriverTeeth] = useState<string>("");
  const [drivenTeeth, setDrivenTeeth] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");
  const [poles, setPoles] = useState<string>("");
  const [slip, setSlip] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    switch (mode) {
      case "pulley":
        const D1 = parseFloat(driverDiameter);
        const D2 = parseFloat(drivenDiameter);
        const N1 = parseFloat(driverRpm);
        if (D1 > 0 && D2 > 0 && N1 > 0) {
          const N2 = (N1 * D1) / D2;
          setResults({ rpm: Math.round(N2 * 10) / 10, ratio: (N1 / N2).toFixed(2) });
        }
        break;
      case "gear":
        const T1 = parseFloat(driverTeeth);
        const T2 = parseFloat(drivenTeeth);
        const N1g = parseFloat(driverRpm);
        if (T1 > 0 && T2 > 0 && N1g > 0) {
          const N2g = (N1g * T1) / T2;
          setResults({ rpm: Math.round(N2g * 10) / 10, ratio: (T2 / T1).toFixed(2) });
        }
        break;
      case "motor":
        const f = parseFloat(frequency);
        const p = parseFloat(poles);
        const s = parseFloat(slip) / 100 || 0;
        if (f > 0 && p > 0) {
          const syncRpm = (120 * f) / p;
          const actualRpm = syncRpm * (1 - s);
          setResults({ syncRpm, actualRpm: Math.round(actualRpm * 10) / 10, slip: s * 100 });
        }
        break;
    }
  };

  const reset = () => {
    setDriverDiameter(""); setDrivenDiameter(""); setDriverRpm("");
    setDriverTeeth(""); setDrivenTeeth(""); setFrequency(""); setPoles(""); setSlip("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>RPM Calculator – Calculate Rotational Speed</CardTitle>
          <CardDescription>
            Calculate RPM for pulley systems, gear trains, and AC motors. Our RPM calculator helps determine output speed and gear ratios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Button variant={mode === "pulley" ? "default" : "outline"} size="sm" onClick={() => setMode("pulley")}>Pulley</Button>
              <Button variant={mode === "gear" ? "default" : "outline"} size="sm" onClick={() => setMode("gear")}>Gear</Button>
              <Button variant={mode === "motor" ? "default" : "outline"} size="sm" onClick={() => setMode("motor")}>Motor</Button>
            </div>

            {mode === "pulley" && (
              <>
                <p className="text-sm text-muted-foreground">N₂ = N₁ × (D₁ / D₂)</p>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label>Driver Diameter</Label><Input value={driverDiameter} onChange={e => setDriverDiameter(e.target.value)} /></div>
                  <div><Label>Driven Diameter</Label><Input value={drivenDiameter} onChange={e => setDrivenDiameter(e.target.value)} /></div>
                  <div><Label>Driver RPM</Label><Input value={driverRpm} onChange={e => setDriverRpm(e.target.value)} /></div>
                </div>
              </>
            )}

            {mode === "gear" && (
              <>
                <p className="text-sm text-muted-foreground">N₂ = N₁ × (T₁ / T₂)</p>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label>Driver Teeth</Label><Input value={driverTeeth} onChange={e => setDriverTeeth(e.target.value)} /></div>
                  <div><Label>Driven Teeth</Label><Input value={drivenTeeth} onChange={e => setDrivenTeeth(e.target.value)} /></div>
                  <div><Label>Driver RPM</Label><Input value={driverRpm} onChange={e => setDriverRpm(e.target.value)} /></div>
                </div>
              </>
            )}

            {mode === "motor" && (
              <>
                <p className="text-sm text-muted-foreground">Sync RPM = 120f / p</p>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label>Frequency (Hz)</Label><Input value={frequency} onChange={e => setFrequency(e.target.value)} /></div>
                  <div><Label>Poles</Label><Input value={poles} onChange={e => setPoles(e.target.value)} /></div>
                  <div><Label>Slip (%)</Label><Input value={slip} onChange={e => setSlip(e.target.value)} /></div>
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate RPM</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                {mode === "motor" ? (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Synchronous Speed</p>
                      <p className="text-3xl font-bold">{results.syncRpm} RPM</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Actual Speed ({results.slip}% slip)</p>
                      <p className="text-3xl font-bold">{results.actualRpm} RPM</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Output RPM</p>
                      <p className="text-4xl font-bold">{results.rpm}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ratio</p>
                      <p className="text-2xl font-bold">1 : {results.ratio}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
