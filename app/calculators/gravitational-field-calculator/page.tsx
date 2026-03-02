"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GravitationalFieldCalculator() {
  const [mass, setMass] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const M = parseFloat(mass);
    const r = parseFloat(distance);
    const G = 6.67430e-11;

    if (M > 0 && r > 0) {
      const g = (G * M) / (r * r);
      setResults({
        fieldStrength: g,
        formatted: g.toExponential(4),
      });
    }
  };

  const reset = () => {
    setMass(""); setDistance(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Gravitational Field Calculator – Calculate Gravitational Field Strength</CardTitle>
          <CardDescription>
            Calculate the gravitational field strength at a distance from a mass. Our calculator uses g = GM/r² for point masses and spherical bodies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Mass (kg)</Label><Input value={mass} onChange={e => setMass(e.target.value)} /></div>
              <div><Label>Distance from Center (m)</Label><Input value={distance} onChange={e => setDistance(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Gravitational Field Strength</p>
                <p className="text-4xl font-bold">{results.formatted} N/kg</p>
                <p className="text-sm text-muted-foreground mt-2">= {results.formatted} m/s²</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
