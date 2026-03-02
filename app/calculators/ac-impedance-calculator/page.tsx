"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AcImpedanceCalculator() {
  const [resistance, setResistance] = useState<string>("");
  const [inductance, setInductance] = useState<string>("");
  const [capacitance, setCapacitance] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const R = parseFloat(resistance);
    const L = parseFloat(inductance);
    const C = parseFloat(capacitance);
    const f = parseFloat(frequency);

    if (R >= 0 && f > 0) {
      const ω = 2 * Math.PI * f;
      const XL = L > 0 ? ω * L : 0;
      const XC = C > 0 ? 1 / (ω * C) : 0;
      
      // Z = √(R² + (XL - XC)²)
      const Z = Math.sqrt(R * R + Math.pow(XL - XC, 2));
      
      // Phase angle: φ = arctan((XL - XC) / R)
      const phase = R > 0 ? Math.atan2(XL - XC, R) * 180 / Math.PI : 90;

      setResults({
        XL: Math.round(XL * 100) / 100,
        XC: Math.round(XC * 100) / 100,
        Z: Math.round(Z * 100) / 100,
        phase: Math.round(phase * 100) / 100,
      });
    }
  };

  const reset = () => {
    setResistance(""); setInductance(""); setCapacitance(""); setFrequency(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>AC Impedance Calculator – Calculate Impedance in AC Circuits</CardTitle>
          <CardDescription>
            Calculate impedance, reactance, and phase angle for AC circuits with R, L, and C components.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Resistance R (Ω)</Label><Input value={resistance} onChange={e => setResistance(e.target.value)} /></div>
              <div><Label>Frequency f (Hz)</Label><Input value={frequency} onChange={e => setFrequency(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Inductance L (H)</Label><Input value={inductance} onChange={e => setInductance(e.target.value)} placeholder="0 if none" /></div>
              <div><Label>Capacitance C (F)</Label><Input value={capacitance} onChange={e => setCapacitance(e.target.value)} placeholder="0 if none" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Impedance</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Inductive Reactance</p>
                    <p className="text-2xl font-bold">{results.XL} Ω</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Capacitive Reactance</p>
                    <p className="text-2xl font-bold">{results.XC} Ω</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Impedance</p>
                    <p className="text-3xl font-bold">{results.Z} Ω</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phase Angle</p>
                    <p className="text-2xl font-bold">{results.phase > 0 ? "+" : ""}{results.phase}°</p>
                    <p className="text-xs text-muted-foreground">{results.phase > 0 ? "Inductive" : results.phase < 0 ? "Capacitive" : "Resistive"}</p>
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
