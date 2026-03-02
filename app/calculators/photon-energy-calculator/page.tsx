"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PhotonEnergyCalculator() {
  const [mode, setMode] = useState<"wavelength" | "frequency">("wavelength");
  const [wavelength, setWavelength] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const h = 6.62607015e-34;
    const c = 299792458;

    if (mode === "wavelength") {
      const λ = parseFloat(wavelength);
      if (λ > 0) {
        const E = (h * c) / λ;
        const eV = E / 1.602176634e-19;
        setResults({ energy: E, ev: eV });
      }
    } else {
      const f = parseFloat(frequency);
      if (f > 0) {
        const E = h * f;
        const eV = E / 1.602176634e-19;
        setResults({ energy: E, ev: eV });
      }
    }
  };

  const reset = () => {
    setWavelength(""); setFrequency(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Photon Energy Calculator – Calculate Energy of a Photon</CardTitle>
          <CardDescription>
            Calculate the energy of a photon from its wavelength or frequency. Our calculator provides results in Joules and electron-volts (eV).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Input Mode</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="wavelength">Wavelength (λ)</SelectItem>
                  <SelectItem value="frequency">Frequency (f)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "wavelength" ? (
              <div>
                <Label>Wavelength (m)</Label>
                <Input value={wavelength} onChange={e => setWavelength(e.target.value)} placeholder="e.g., 500e-9 for 500nm" />
              </div>
            ) : (
              <div>
                <Label>Frequency (Hz)</Label>
                <Input value={frequency} onChange={e => setFrequency(e.target.value)} />
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Energy</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Energy</p>
                    <p className="text-xl font-bold">{results.energy.toExponential(4)} J</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In eV</p>
                    <p className="text-2xl font-bold">{Math.round(results.ev * 1000) / 1000} eV</p>
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
