"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RivetStrengthCalculator() {
  const [diameter, setDiameter] = useState<string>("");
  const [shearStrength, setShearStrength] = useState<string>("");
  const [numRivets, setNumRivets] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const d = parseFloat(diameter);
    const τ = parseFloat(shearStrength);
    const n = parseInt(numRivets);

    if (d > 0 && τ > 0 && n > 0) {
      const area = Math.PI * Math.pow(d / 2, 2);
      const singleShear = area * τ / 1000; // kN per rivet
      const totalLoad = singleShear * n;

      // Bearing strength (approx 2× shear for steel)
      const bearingStrength = totalLoad * 2;

      setResults({
        singleShear: Math.round(singleShear * 100) / 100,
        totalShear: Math.round(totalLoad * 100) / 100,
        bearing: Math.round(bearingStrength * 100) / 100,
      });
    }
  };

  const reset = () => {
    setDiameter(""); setShearStrength(""); setNumRivets(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Rivet Strength Calculator – Calculate Rivet Shear Capacity</CardTitle>
          <CardDescription>
            Calculate the shear and bearing capacity of riveted joints. Essential for structural steel design.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Rivet Diameter (mm)</Label><Input value={diameter} onChange={e => setDiameter(e.target.value)} /></div>
              <div><Label>Shear Strength (MPa)</Label><Input value={shearStrength} onChange={e => setShearStrength(e.target.value)} /></div>
              <div><Label>Number of Rivets</Label><Input type="number" value={numRivets} onChange={e => setNumRivets(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Strength</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Per Rivet (Shear)</p>
                    <p className="text-2xl font-bold">{results.singleShear} kN</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Shear</p>
                    <p className="text-3xl font-bold">{results.totalShear} kN</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bearing Capacity</p>
                    <p className="text-2xl font-bold">{results.bearing} kN</p>
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
