"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AcousticImpedanceCalculator() {
  const [density, setDensity] = useState<string>("");
  const [speed, setSpeed] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const ρ = parseFloat(density);
    const c = parseFloat(speed);

    if (ρ > 0 && c > 0) {
      const Z = ρ * c;
      setResults({ impedance: Z, formatted: Z.toExponential(4) });
    }
  };

  const reset = () => {
    setDensity(""); setSpeed(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Acoustic Impedance Calculator – Calculate Z</CardTitle>
          <CardDescription>
            Calculate the acoustic impedance of a material. Z = ρc where ρ is density and c is the speed of sound.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Density ρ (kg/m³)</Label><Input value={density} onChange={e => setDensity(e.target.value)} /></div>
              <div><Label>Speed of Sound c (m/s)</Label><Input value={speed} onChange={e => setSpeed(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Acoustic Impedance (Z)</p>
                <p className="text-4xl font-bold">{results.formatted} Pa·s/m</p>
                <p className="text-sm text-muted-foreground mt-2">= {results.formatted} Rayl</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
