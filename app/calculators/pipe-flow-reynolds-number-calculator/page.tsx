"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ReynoldsNumberCalculator() {
  const [velocity, setVelocity] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [density, setDensity] = useState<string>("");
  const [viscosity, setViscosity] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const v = parseFloat(velocity);
    const D = parseFloat(diameter);
    const ρ = parseFloat(density);
    const μ = parseFloat(viscosity);

    if (v > 0 && D > 0 && ρ > 0 && μ > 0) {
      const Re = (ρ * v * D) / μ;
      let flowType = "";
      if (Re < 2000) flowType = "Laminar";
      else if (Re < 4000) flowType = "Transitional";
      else flowType = "Turbulent";

      setResults({ reynolds: Re, flowType });
    }
  };

  const reset = () => {
    setVelocity(""); setDiameter(""); setDensity(""); setViscosity(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Reynolds Number Calculator – Pipe Flow Reynolds Number</CardTitle>
          <CardDescription>
            Calculate the Reynolds number for pipe flow to determine if flow is laminar, transitional, or turbulent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Velocity (m/s)</Label><Input value={velocity} onChange={e => setVelocity(e.target.value)} /></div>
              <div><Label>Pipe Diameter (m)</Label><Input value={diameter} onChange={e => setDiameter(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Density (kg/m³)</Label><Input value={density} onChange={e => setDensity(e.target.value)} /></div>
              <div><Label>Dynamic Viscosity (Pa·s)</Label><Input value={viscosity} onChange={e => setViscosity(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Re</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className={`p-4 rounded-md space-y-3 ${results.flowType === "Laminar" ? "bg-green-100 dark:bg-green-900/20" : results.flowType === "Transitional" ? "bg-yellow-100 dark:bg-yellow-900/20" : "bg-red-100 dark:bg-red-900/20"}`}>
                <div>
                  <p className="text-sm text-muted-foreground">Reynolds Number</p>
                  <p className="text-4xl font-bold">{Math.round(results.reynolds)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Flow Regime</p>
                  <p className="text-2xl font-bold">{results.flowType}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Laminar: Re &lt; 2000 | Transitional: 2000-4000 | Turbulent: Re &gt; 4000
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
