"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FastenerLoadCalculator() {
  const [diameter, setDiameter] = useState<string>("");
  const [tensileStrength, setTensileStrength] = useState<string>("");
  const [safetyFactor, setSafetyFactor] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const d = parseFloat(diameter);
    const σ = parseFloat(tensileStrength);
    const SF = parseFloat(safetyFactor) || 2;

    if (d > 0 && σ > 0) {
      const area = Math.PI * Math.pow(d / 2, 2);
      const ultimateLoad = area * σ / 1000; // kN
      const allowableLoad = ultimateLoad / SF;

      // Shear strength (approx 60% of tensile)
      const shearLoad = allowableLoad * 0.6;

      setResults({
        ultimate: Math.round(ultimateLoad * 100) / 100,
        allowable: Math.round(allowableLoad * 100) / 100,
        shear: Math.round(shearLoad * 100) / 100,
      });
    }
  };

  const reset = () => {
    setDiameter(""); setTensileStrength(""); setSafetyFactor(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Fastener Load Calculator – Calculate Fastener Capacity</CardTitle>
          <CardDescription>
            Calculate the load capacity of fasteners including tensile and shear strength with safety factors.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Diameter (mm)</Label><Input value={diameter} onChange={e => setDiameter(e.target.value)} /></div>
              <div><Label>Tensile Strength (MPa)</Label><Input value={tensileStrength} onChange={e => setTensileStrength(e.target.value)} /></div>
              <div><Label>Safety Factor</Label><Input value={safetyFactor} onChange={e => setSafetyFactor(e.target.value)} placeholder="2" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Load</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Ultimate Load</p>
                    <p className="text-2xl font-bold">{results.ultimate} kN</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Allowable (Tensile)</p>
                    <p className="text-2xl font-bold">{results.allowable} kN</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Allowable (Shear)</p>
                    <p className="text-2xl font-bold">{results.shear} kN</p>
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
