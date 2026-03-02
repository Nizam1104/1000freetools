"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DopplerEffectCalculator() {
  const [sourceFreq, setSourceFreq] = useState<string>("");
  const [sourceVelocity, setSourceVelocity] = useState<string>("");
  const [observerVelocity, setObserverVelocity] = useState<string>("");
  const [waveType, setWaveType] = useState<"sound" | "light">("sound");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const fs = parseFloat(sourceFreq);
    const vs = parseFloat(sourceVelocity);
    const vo = parseFloat(observerVelocity);
    const c = waveType === "sound" ? 343 : 299792458;

    if (fs > 0 && c > 0) {
      // Observer moving towards source: +vo, Source moving towards observer: -vs
      const fo = fs * (c + vo) / (c - vs);
      const shift = fo - fs;
      const redshift = waveType === "light" ? (fo - fs) / fs : null;

      setResults({
        observedFreq: Math.round(fo * 100) / 100,
        shift: Math.round(shift * 100) / 100,
        redshift: redshift ? redshift.toExponential(4) : null,
      });
    }
  };

  const reset = () => {
    setSourceFreq(""); setSourceVelocity(""); setObserverVelocity(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Doppler Effect Calculator – Calculate Frequency Shift</CardTitle>
          <CardDescription>
            Calculate the observed frequency shift due to relative motion between source and observer. Works for both sound and light waves.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Wave Type</Label>
              <Select value={waveType} onValueChange={(v) => setWaveType(v as typeof waveType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sound">Sound (c = 343 m/s)</SelectItem>
                  <SelectItem value="light">Light (c = 3×10⁸ m/s)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div><Label>Source Freq (Hz)</Label><Input value={sourceFreq} onChange={e => setSourceFreq(e.target.value)} /></div>
              <div><Label>Source Velocity (m/s)</Label><Input value={sourceVelocity} onChange={e => setSourceVelocity(e.target.value)} /></div>
              <div><Label>Observer Velocity (m/s)</Label><Input value={observerVelocity} onChange={e => setObserverVelocity(e.target.value)} /></div>
            </div>
            <p className="text-xs text-muted-foreground">Positive = moving towards each other</p>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Observed Frequency</p>
                    <p className="text-3xl font-bold">{results.observedFreq} Hz</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Frequency Shift</p>
                    <p className="text-2xl font-bold">{results.shift > 0 ? "+" : ""}{results.shift} Hz</p>
                  </div>
                </div>
                {results.redshift && (
                  <div>
                    <p className="text-sm text-muted-foreground">Redshift (z)</p>
                    <p className="text-xl font-bold">{results.redshift}</p>
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
