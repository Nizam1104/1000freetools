"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ManningEquationCalculator() {
  const [n, setN] = useState<string>("");
  const [r, setR] = useState<string>("");
  const [s, setS] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const nVal = parseFloat(n);
    const R = parseFloat(r);
    const S = parseFloat(s);
    const A = parseFloat(area);

    if (nVal > 0 && R > 0 && S > 0 && A > 0) {
      // Manning equation: V = (1/n) × R^(2/3) × S^(1/2)
      const V = (1 / nVal) * Math.pow(R, 2/3) * Math.sqrt(S);
      const Q = V * A;

      setResults({ velocity: V, flowRate: Q });
    }
  };

  const reset = () => {
    setN(""); setR(""); setS(""); setArea(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Manning Equation Calculator – Open Channel Flow</CardTitle>
          <CardDescription>
            Calculate flow velocity and discharge in open channels using the Manning equation. Used for rivers, canals, and stormwater systems.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Manning's n</Label><Input value={n} onChange={e => setN(e.target.value)} placeholder="0.013 for concrete" /></div>
              <div><Label>Hydraulic Radius R (m)</Label><Input value={r} onChange={e => setR(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Slope S (m/m)</Label><Input value={s} onChange={e => setS(e.target.value)} step="0.001" /></div>
              <div><Label>Cross-sectional Area (m²)</Label><Input value={area} onChange={e => setArea(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Flow</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Velocity</p>
                    <p className="text-3xl font-bold">{Math.round(results.velocity * 100) / 100} m/s</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Flow Rate (Q)</p>
                    <p className="text-3xl font-bold">{Math.round(results.flowRate * 100) / 100} m³/s</p>
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
