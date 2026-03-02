"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BeltTensionCalculator() {
  const [power, setPower] = useState<string>("");
  const [pulleyDiameter, setPulleyDiameter] = useState<string>("");
  const [rpm, setRpm] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(power);
    const D = parseFloat(pulleyDiameter);
    const N = parseFloat(rpm);

    if (P > 0 && D > 0 && N > 0) {
      // Torque: T = P / ω = P × 60 / (2π × N)
      const torque = (P * 60) / (2 * Math.PI * N);
      // Belt tension: F = T / r = 2T / D
      const tension = (2 * torque) / D;
      // Recommended initial tension (2-3% of working tension)
      const initialTension = tension * 0.025;

      setResults({
        torque: Math.round(torque * 100) / 100,
        tension: Math.round(tension * 100) / 100,
        initialTension: Math.round(initialTension * 100) / 100,
      });
    }
  };

  const reset = () => {
    setPower(""); setPulleyDiameter(""); setRpm(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Belt Tension Calculator – Calculate Belt Drive Tension</CardTitle>
          <CardDescription>
            Calculate belt tension and torque for belt drive systems. Determine proper initial tension for installation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Power (kW)</Label><Input value={power} onChange={e => setPower(e.target.value)} /></div>
              <div><Label>Pulley Diameter (m)</Label><Input value={pulleyDiameter} onChange={e => setPulleyDiameter(e.target.value)} /></div>
              <div><Label>Speed (RPM)</Label><Input value={rpm} onChange={e => setRpm(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Tension</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Torque</p>
                    <p className="text-2xl font-bold">{results.torque} N·m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Working Tension</p>
                    <p className="text-2xl font-bold">{results.tension} N</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Initial Tension</p>
                    <p className="text-xl font-bold">{results.initialTension} N</p>
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
