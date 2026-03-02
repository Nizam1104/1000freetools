"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RelativisticEnergyCalculator() {
  const [mass, setMass] = useState<string>("");
  const [velocity, setVelocity] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const m = parseFloat(mass);
    const v = parseFloat(velocity);
    const c = 299792458;

    if (m > 0 && v >= 0 && v < c) {
      const beta = v / c;
      const gamma = 1 / Math.sqrt(1 - beta * beta);
      
      // Rest energy: E₀ = mc²
      const E0 = m * c * c;
      
      // Total energy: E = γmc²
      const E = gamma * m * c * c;
      
      // Kinetic energy: KE = (γ - 1)mc²
      const KE = (gamma - 1) * m * c * c;
      
      // Relativistic mass
      const mRel = gamma * m;

      setResults({
        gamma: Math.round(gamma * 1000) / 1000,
        restEnergy: E0,
        totalEnergy: E,
        kineticEnergy: KE,
        relativisticMass: mRel,
      });
    }
  };

  const reset = () => {
    setMass(""); setVelocity(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Relativistic Energy Calculator – Special Relativity Calculator</CardTitle>
          <CardDescription>
            Calculate relativistic energy, momentum, and mass using Einstein's special relativity. Our calculator handles high-velocity scenarios where classical physics breaks down.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Rest Mass (kg)</Label><Input value={mass} onChange={e => setMass(e.target.value)} /></div>
              <div><Label>Velocity (m/s)</Label><Input value={velocity} onChange={e => setVelocity(e.target.value)} /></div>
            </div>
            <p className="text-xs text-muted-foreground">Speed of light: 299,792,458 m/s</p>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Lorentz Factor (γ)</p>
                    <p className="text-2xl font-bold">{results.gamma}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Relativistic Mass</p>
                    <p className="text-xl font-bold">{results.relativisticMass.toExponential(4)} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rest Energy (E₀)</p>
                    <p className="text-lg font-bold">{results.restEnergy.toExponential(4)} J</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Energy (E)</p>
                    <p className="text-lg font-bold">{results.totalEnergy.toExponential(4)} J</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Kinetic Energy (KE)</p>
                    <p className="text-lg font-bold">{results.kineticEnergy.toExponential(4)} J</p>
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
