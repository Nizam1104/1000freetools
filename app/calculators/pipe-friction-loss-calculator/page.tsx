"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PipeFrictionLossCalculator() {
  const [flowRate, setFlowRate] = useState<string>("");
  const [pipeDiameter, setPipeDiameter] = useState<string>("");
  const [pipeLength, setPipeLength] = useState<string>("");
  const [roughness, setRoughness] = useState<string>("0.0015");
  const [kinematicViscosity, setKinematicViscosity] = useState<string>("1e-6");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const Q = parseFloat(flowRate); // m³/s
    const D = parseFloat(pipeDiameter); // m
    const L = parseFloat(pipeLength); // m
    const ε = parseFloat(roughness); // m
    const ν = parseFloat(kinematicViscosity); // m²/s

    if (Q > 0 && D > 0 && L > 0) {
      const A = Math.PI * Math.pow(D / 2, 2);
      const v = Q / A; // velocity
      const Re = (v * D) / ν; // Reynolds number
      
      // Swamee-Jain approximation for friction factor
      const f = 0.25 / Math.pow(Math.log10(ε / (3.7 * D) + 5.74 / Math.pow(Re, 0.9)), 2);
      
      // Darcy-Weisbach equation
      const g = 9.81;
      const hf = (f * L * v * v) / (2 * g * D);
      
      // Pressure drop
      const rho = 1000; // kg/m³ for water
      const dP = rho * g * hf;

      setResults({
        velocity: v,
        reynolds: Re,
        frictionFactor: f,
        headLoss: hf,
        pressureDrop: dP,
        flow: Re < 2000 ? "Laminar" : Re < 4000 ? "Transitional" : "Turbulent",
      });
    }
  };

  const reset = () => {
    setFlowRate(""); setPipeDiameter(""); setPipeLength("");
    setRoughness("0.0015"); setKinematicViscosity("1e-6"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Pipe Friction Loss Calculator – Head Loss in Pipe Flow</CardTitle>
          <CardDescription>
            Calculate pressure or head loss due to friction in pipes. Our pipe friction loss calculator uses the Darcy-Weisbach equation for accurate results in water and fluid systems.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Flow Rate (m³/s)</Label><Input value={flowRate} onChange={e => setFlowRate(e.target.value)} /></div>
              <div><Label>Pipe Diameter (m)</Label><Input value={pipeDiameter} onChange={e => setPipeDiameter(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Pipe Length (m)</Label><Input value={pipeLength} onChange={e => setPipeLength(e.target.value)} /></div>
              <div><Label>Roughness ε (mm)</Label><Input value={roughness} onChange={e => setRoughness(e.target.value)} /></div>
            </div>
            <div>
              <Label>Kinematic Viscosity (m²/s)</Label>
              <Input value={kinematicViscosity} onChange={e => setKinematicViscosity(e.target.value)} />
              <p className="text-sm text-muted-foreground mt-1">Water at 20°C: 1×10⁻⁶ m²/s</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Flow Velocity</p>
                    <p className="text-2xl font-bold">{Math.round(results.velocity * 100) / 100} m/s</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reynolds Number</p>
                    <p className="text-xl font-bold">{results.reynolds.toExponential(2)}</p>
                    <p className="text-xs text-muted-foreground">{results.flow}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Head Loss</p>
                    <p className="text-2xl font-bold">{Math.round(results.headLoss * 100) / 100} m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pressure Drop</p>
                    <p className="text-xl font-bold">{(results.pressureDrop / 1000).toFixed(2)} kPa</p>
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
