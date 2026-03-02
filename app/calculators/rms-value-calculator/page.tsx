"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RmsValueCalculator() {
  const [waveform, setWaveform] = useState<"sine" | "square" | "triangle" | "sawtooth">("sine");
  const [peakValue, setPeakValue] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const Vp = parseFloat(peakValue);
    if (Vp <= 0) return;

    let rms = 0;
    switch (waveform) {
      case "sine":
        rms = Vp / Math.sqrt(2);
        break;
      case "square":
        rms = Vp;
        break;
      case "triangle":
      case "sawtooth":
        rms = Vp / Math.sqrt(3);
        break;
    }

    setResults({ rms: Math.round(rms * 100) / 100, peak: Vp, peakToPeak: 2 * Vp });
  };

  const reset = () => {
    setPeakValue(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>RMS Value Calculator – Calculate Root Mean Square Voltage</CardTitle>
          <CardDescription>
            Calculate RMS voltage for different waveforms. RMS is the effective DC-equivalent voltage for AC signals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Waveform Type</Label>
              <Select value={waveform} onValueChange={(v) => setWaveform(v as typeof waveform)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sine">Sine Wave</SelectItem>
                  <SelectItem value="square">Square Wave</SelectItem>
                  <SelectItem value="triangle">Triangle Wave</SelectItem>
                  <SelectItem value="sawtooth">Sawtooth Wave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Peak Voltage (V)</Label>
              <Input value={peakValue} onChange={e => setPeakValue(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate RMS</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">RMS Voltage</p>
                    <p className="text-2xl font-bold">{results.rms} V</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Peak Voltage</p>
                    <p className="text-2xl font-bold">{results.peak} V</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Peak-to-Peak</p>
                    <p className="text-2xl font-bold">{results.peakToPeak} V</p>
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
