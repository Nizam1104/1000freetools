"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HeadLossDarcyWeisbachCalculator() {
  const [length, setLength] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [velocity, setVelocity] = useState<string>("");
  const [frictionFactor, setFrictionFactor] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(length);
    const D = parseFloat(diameter);
    const v = parseFloat(velocity);
    const f = parseFloat(frictionFactor);
    const g = 9.81;

    if (L > 0 && D > 0 && v > 0 && f > 0) {
      const hf = (f * L * v * v) / (2 * g * D);
      const dP = 1000 * g * hf; // Pressure drop in Pa

      setResults({ headLoss: hf, pressureDrop: dP });
    }
  };

  const reset = () => {
    setLength(""); setDiameter(""); setVelocity(""); setFrictionFactor(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Head Loss (Darcy-Weisbach) Calculator – Pipe Friction Loss</CardTitle>
          <CardDescription>
            Calculate head loss due to friction in pipes using the Darcy-Weisbach equation. Essential for pipe system design and pump sizing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Pipe Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              <div><Label>Pipe Diameter (m)</Label><Input value={diameter} onChange={e => setDiameter(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Flow Velocity (m/s)</Label><Input value={velocity} onChange={e => setVelocity(e.target.value)} /></div>
              <div><Label>Friction Factor f</Label><Input value={frictionFactor} onChange={e => setFrictionFactor(e.target.value)} step="0.001" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Head Loss</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Head Loss</p>
                    <p className="text-3xl font-bold">{Math.round(results.headLoss * 100) / 100} m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pressure Drop</p>
                    <p className="text-2xl font-bold">{(results.pressureDrop / 1000).toFixed(2)} kPa</p>
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
