"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LaminarTurbulentFlowCalculator() {
  const [velocity, setVelocity] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [kinematicViscosity, setKinematicViscosity] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const v = parseFloat(velocity);
    const D = parseFloat(diameter);
    const ν = parseFloat(kinematicViscosity);

    if (v > 0 && D > 0 && ν > 0) {
      const Re = (v * D) / ν;
      const criticalVel = (2000 * ν) / D; // Velocity at Re=2000
      
      let flowType = "";
      if (Re < 2000) flowType = "Laminar";
      else if (Re < 4000) flowType = "Transitional";
      else flowType = "Turbulent";

      setResults({ reynolds: Re, flowType, criticalVel });
    }
  };

  const reset = () => {
    setVelocity(""); setDiameter(""); setKinematicViscosity(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Laminar/Turbulent Flow Calculator – Flow Regime Calculator</CardTitle>
          <CardDescription>
            Determine if fluid flow is laminar or turbulent based on Reynolds number. Enter flow parameters to analyze flow regime.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Velocity (m/s)</Label><Input value={velocity} onChange={e => setVelocity(e.target.value)} /></div>
              <div><Label>Pipe Diameter (m)</Label><Input value={diameter} onChange={e => setDiameter(e.target.value)} /></div>
              <div><Label>Kinematic Viscosity (m²/s)</Label><Input value={kinematicViscosity} onChange={e => setKinematicViscosity(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Analyze Flow</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className={`p-4 rounded-md space-y-3 ${results.flowType === "Laminar" ? "bg-green-100 dark:bg-green-900/20" : results.flowType === "Transitional" ? "bg-yellow-100 dark:bg-yellow-900/20" : "bg-red-100 dark:bg-red-900/20"}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Reynolds Number</p>
                    <p className="text-3xl font-bold">{Math.round(results.reynolds)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Flow Regime</p>
                    <p className="text-2xl font-bold">{results.flowType}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Critical Velocity (Re=2000)</p>
                  <p className="text-xl font-bold">{Math.round(results.criticalVel * 1000) / 1000} m/s</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
