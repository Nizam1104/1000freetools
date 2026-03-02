"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FrequencyCalculator() {
  const [mode, setMode] = useState<"period" | "wavelength" | "angular">("period");
  const [period, setPeriod] = useState<string>("");
  const [wavelength, setWavelength] = useState<string>("");
  const [velocity, setVelocity] = useState<string>("3e8");
  const [frequency, setFrequency] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    switch (mode) {
      case "period":
        const T = parseFloat(period);
        if (T > 0) {
          const f = 1 / T;
          const unit = f >= 1e9 ? "GHz" : f >= 1e6 ? "MHz" : f >= 1e3 ? "kHz" : "Hz";
          const displayValue = f >= 1e9 ? f / 1e9 : f >= 1e6 ? f / 1e6 : f >= 1e3 ? f / 1e3 : f;
          setResults({ value: displayValue, unit, omega: 2 * Math.PI * f });
        }
        break;
      case "wavelength":
        const λ = parseFloat(wavelength);
        const v = parseFloat(velocity);
        if (λ > 0 && v > 0) {
          const f = v / λ;
          const unit = f >= 1e9 ? "GHz" : f >= 1e6 ? "MHz" : f >= 1e3 ? "kHz" : "Hz";
          const displayValue = f >= 1e9 ? f / 1e9 : f >= 1e6 ? f / 1e6 : f >= 1e3 ? f / 1e3 : f;
          setResults({ value: displayValue, unit, omega: 2 * Math.PI * f });
        }
        break;
      case "angular":
        const f2 = parseFloat(frequency);
        if (f2 > 0) {
          setResults({ value: 2 * Math.PI * f2, unit: "rad/s", f: f2 });
        }
        break;
    }
  };

  const reset = () => {
    setPeriod("");
    setWavelength("");
    setVelocity("3e8");
    setFrequency("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Frequency Calculator – Calculate Frequency from Period and More</CardTitle>
          <CardDescription>
            Calculate signal frequency, period, and angular frequency with our frequency calculator. Covers Hz to period conversions and is useful for electronics, physics, and audio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Calculation Mode</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="period">f = 1 / T (from Period)</SelectItem>
                  <SelectItem value="wavelength">f = v / λ (from Wavelength)</SelectItem>
                  <SelectItem value="angular">ω = 2πf (Angular Frequency)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "period" && (
              <div>
                <Label>Period (seconds)</Label>
                <Input type="number" value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="e.g., 0.001" />
              </div>
            )}

            {mode === "wavelength" && (
              <>
                <div>
                  <Label>Wavelength (meters)</Label>
                  <Input type="number" value={wavelength} onChange={(e) => setWavelength(e.target.value)} placeholder="e.g., 0.5" />
                </div>
                <div>
                  <Label>Wave Velocity (m/s)</Label>
                  <Input type="number" value={velocity} onChange={(e) => setVelocity(e.target.value)} />
                  <p className="text-sm text-muted-foreground mt-1">Default: speed of light (3×10⁸ m/s)</p>
                </div>
              </>
            )}

            {mode === "angular" && (
              <div>
                <Label>Frequency (Hz)</Label>
                <Input type="number" value={frequency} onChange={(e) => setFrequency(e.target.value)} placeholder="e.g., 1000" />
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">{mode === "angular" ? "Angular Frequency" : "Frequency"}</p>
                  <p className="text-4xl font-bold">{typeof results.value === 'number' ? Math.round(results.value * 1000) / 1000 : results.value} {results.unit}</p>
                </div>
                {results.omega && mode !== "angular" && (
                  <div>
                    <p className="text-sm text-muted-foreground">Angular Frequency (ω)</p>
                    <p className="text-2xl font-bold">{Math.round(results.omega * 100) / 100} rad/s</p>
                  </div>
                )}
                {results.f && (
                  <div>
                    <p className="text-sm text-muted-foreground">Period (T)</p>
                    <p className="text-2xl font-bold">{Math.round((1 / results.f) * 1000000) / 1000000} s</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
