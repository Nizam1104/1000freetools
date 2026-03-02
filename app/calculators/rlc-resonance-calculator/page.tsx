"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RlcResonanceCalculator() {
  const [inductance, setInductance] = useState<string>("");
  const [capacitance, setCapacitance] = useState<string>("");
  const [resistance, setResistance] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(inductance);
    const C = parseFloat(capacitance);
    const R = parseFloat(resistance);

    if (L > 0 && C > 0) {
      // Resonant frequency: f₀ = 1 / (2π√(LC))
      const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));
      const ω0 = 2 * Math.PI * f0;
      
      // Quality factor: Q = (1/R) × √(L/C) for series RLC
      const Q = R > 0 ? (1 / R) * Math.sqrt(L / C) : Infinity;
      
      // Bandwidth: BW = f₀ / Q
      const BW = Q > 0 && Q !== Infinity ? f0 / Q : 0;

      setResults({
        f0: Math.round(f0 * 100) / 100,
        omega0: Math.round(ω0 * 100) / 100,
        Q: Q === Infinity ? "∞" : Math.round(Q * 100) / 100,
        BW: Math.round(BW * 100) / 100,
      });
    }
  };

  const reset = () => {
    setInductance(""); setCapacitance(""); setResistance(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>RLC Resonance Calculator – Calculate Resonant Frequency</CardTitle>
          <CardDescription>
            Calculate resonant frequency, quality factor, and bandwidth for RLC circuits. Essential for filter and oscillator design.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Inductance L (H)</Label><Input value={inductance} onChange={e => setInductance(e.target.value)} /></div>
              <div><Label>Capacitance C (F)</Label><Input value={capacitance} onChange={e => setCapacitance(e.target.value)} /></div>
              <div><Label>Resistance R (Ω)</Label><Input value={resistance} onChange={e => setResistance(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Resonance</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Resonant Frequency</p>
                    <p className="text-2xl font-bold">{results.f0 >= 1e6 ? (results.f0 / 1e6).toFixed(2) + " MHz" : results.f0 >= 1000 ? (results.f0 / 1000).toFixed(2) + " kHz" : results.f0.toFixed(2) + " Hz"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Angular Frequency</p>
                    <p className="text-xl font-bold">{results.omega0.toExponential(4)} rad/s</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quality Factor (Q)</p>
                    <p className="text-2xl font-bold">{results.Q}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bandwidth</p>
                    <p className="text-xl font-bold">{results.BW >= 1000 ? (results.BW / 1000).toFixed(2) + " kHz" : results.BW.toFixed(2) + " Hz"}</p>
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
