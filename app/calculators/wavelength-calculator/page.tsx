"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WavelengthCalculator() {
  const [frequency, setFrequency] = useState<string>("");
  const [freqUnit, setFreqUnit] = useState<"Hz" | "kHz" | "MHz" | "GHz">("MHz");
  const [waveType, setWaveType] = useState<"EM" | "sound" | "custom">("EM");
  const [customVelocity, setCustomVelocity] = useState<string>("343");
  const [results, setResults] = useState<any>(null);

  const getVelocity = (): number => {
    if (waveType === "EM") return 299792458;
    if (waveType === "sound") return 343;
    return parseFloat(customVelocity) || 343;
  };

  const toHz = (value: number, unit: string): number => {
    if (unit === "kHz") return value * 1000;
    if (unit === "MHz") return value * 1e6;
    if (unit === "GHz") return value * 1e9;
    return value;
  };

  const getBand = (f: number): string => {
    if (f < 3000) return "Radio (VLF/LF)";
    if (f < 3e6) return "Radio (MF/HF)";
    if (f < 3e9) return "Radio (VHF/UHF)";
    if (f < 3e11) return "Microwave";
    if (f < 4e14) return "Infrared";
    if (f < 7.5e14) return "Visible Light";
    if (f < 3e16) return "Ultraviolet";
    if (f < 3e19) return "X-ray";
    return "Gamma Ray";
  };

  const calculate = () => {
    const f = toHz(parseFloat(frequency), freqUnit);
    const v = getVelocity();

    if (f > 0 && v > 0) {
      const λ = v / f;
      const unit = λ >= 1 ? "m" : λ >= 0.01 ? "cm" : λ >= 1e-6 ? "µm" : "nm";
      const displayValue = λ >= 1 ? λ : λ >= 0.01 ? λ * 100 : λ >= 1e-6 ? λ * 1e6 : λ * 1e9;
      setResults({
        value: Math.round(displayValue * 1000) / 1000,
        unit,
        band: getBand(f),
        frequency: f,
      });
    }
  };

  const reset = () => {
    setFrequency("");
    setFreqUnit("MHz");
    setWaveType("EM");
    setCustomVelocity("343");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Wavelength Calculator – Calculate Wavelength from Frequency</CardTitle>
          <CardDescription>
            Find the wavelength of any wave using our wavelength calculator. Enter frequency and wave speed to calculate λ = v/f for electromagnetic, sound, or water waves.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Frequency</Label>
                <div className="flex gap-2">
                  <Input type="number" value={frequency} onChange={(e) => setFrequency(e.target.value)} placeholder="e.g., 100" />
                  <Select value={freqUnit} onValueChange={(v) => setFreqUnit(v as typeof freqUnit)}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hz">Hz</SelectItem>
                      <SelectItem value="kHz">kHz</SelectItem>
                      <SelectItem value="MHz">MHz</SelectItem>
                      <SelectItem value="GHz">GHz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Wave Type</Label>
                <Select value={waveType} onValueChange={(v) => setWaveType(v as typeof waveType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EM">EM Wave (light, radio)</SelectItem>
                    <SelectItem value="sound">Sound Wave</SelectItem>
                    <SelectItem value="custom">Custom Velocity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {waveType === "custom" && (
              <div>
                <Label>Wave Velocity (m/s)</Label>
                <Input type="number" value={customVelocity} onChange={(e) => setCustomVelocity(e.target.value)} />
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Wavelength</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Wavelength</p>
                  <p className="text-4xl font-bold">{results.value} {results.unit}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Frequency Band</p>
                  <p className="text-lg font-medium">{results.band}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Formula: λ = v / f = {getVelocity().toExponential(2)} / {(results.frequency).toExponential(2)}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
