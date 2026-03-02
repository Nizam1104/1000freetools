"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GravitationalForceCalculator() {
  const [mass1, setMass1] = useState<string>("");
  const [mass2, setMass2] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const G = 6.67430e-11; // Gravitational constant

  const calculate = () => {
    const m1 = parseFloat(mass1);
    const m2 = parseFloat(mass2);
    const r = parseFloat(distance);

    if (m1 > 0 && m2 > 0 && r > 0) {
      const F = (G * m1 * m2) / (r * r);
      const g1 = (G * m2) / (r * r); // Field strength at m1
      const g2 = (G * m1) / (r * r); // Field strength at m2
      setResults({ force: F, g1, g2 });
    }
  };

  const reset = () => {
    setMass1("");
    setMass2("");
    setDistance("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Gravitational Force Calculator – Newton's Law of Gravitation</CardTitle>
          <CardDescription>
            Calculate the gravitational force between two objects using Newton's universal law of gravitation. Enter mass and distance values to compute gravitational attraction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Mass 1 (kg)</Label>
                <Input type="number" value={mass1} onChange={(e) => setMass1(e.target.value)} placeholder="e.g., 5.97e24" />
              </div>
              <div>
                <Label>Mass 2 (kg)</Label>
                <Input type="number" value={mass2} onChange={(e) => setMass2(e.target.value)} placeholder="e.g., 1000" />
              </div>
              <div>
                <Label>Distance (m)</Label>
                <Input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="e.g., 6371000" />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Force</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Gravitational Force</p>
                  <p className="text-4xl font-bold">{results.force.toExponential(4)} N</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Field at Mass 1</p>
                    <p className="text-xl font-bold">{results.g1.toExponential(4)} m/s²</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Field at Mass 2</p>
                    <p className="text-xl font-bold">{results.g2.toExponential(4)} m/s²</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Formula: F = G × m₁ × m₂ / r² where G = 6.674×10⁻¹¹ N·m²/kg²
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
