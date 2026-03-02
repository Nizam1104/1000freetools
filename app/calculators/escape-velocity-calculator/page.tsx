"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EscapeVelocityCalculator() {
  const [mass, setMass] = useState<string>("");
  const [radius, setRadius] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const M = parseFloat(mass);
    const R = parseFloat(radius);
    const G = 6.67430e-11;

    if (M > 0 && R > 0) {
      const ve = Math.sqrt(2 * G * M / R);
      setResults({
        escapeVelocity: Math.round(ve * 100) / 100,
        kmPerSec: Math.round(ve / 1000 * 100) / 100,
      });
    }
  };

  const reset = () => {
    setMass(""); setRadius(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Escape Velocity Calculator – Calculate Escape Velocity</CardTitle>
          <CardDescription>
            Calculate the escape velocity needed to break free from a celestial body's gravitational pull. Our calculator uses the formula ve = √(2GM/R).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Mass (kg)</Label><Input value={mass} onChange={e => setMass(e.target.value)} placeholder="e.g., 5.97e24" /></div>
              <div><Label>Radius (m)</Label><Input value={radius} onChange={e => setRadius(e.target.value)} placeholder="e.g., 6371000" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Escape Velocity</p>
                  <p className="text-4xl font-bold">{results.escapeVelocity} m/s</p>
                  <p className="text-xl text-muted-foreground">{results.kmPerSec} km/s</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
