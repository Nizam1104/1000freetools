"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PeakToPeakVoltageCalculator() {
  const [mode, setMode] = useState<"peak" | "rms" | "avg">("peak");
  const [value, setValue] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const V = parseFloat(value);
    if (V <= 0) return;

    let peak = V;
    if (mode === "rms") {
      peak = V * Math.sqrt(2);
    } else if (mode === "avg") {
      peak = V * Math.PI / 2;
    }

    setResults({
      peakToPeak: Math.round(2 * peak * 100) / 100,
      peak: Math.round(peak * 100) / 100,
      rms: Math.round((peak / Math.sqrt(2)) * 100) / 100,
      avg: Math.round((2 * peak / Math.PI) * 100) / 100,
    });
  };

  const reset = () => {
    setValue(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Peak-to-Peak Voltage Calculator – Convert AC Voltage Measurements</CardTitle>
          <CardDescription>
            Convert between peak, RMS, average, and peak-to-peak voltage for sine waves.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Input Type</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="peak">Peak Voltage (Vp)</SelectItem>
                  <SelectItem value="rms">RMS Voltage (Vrms)</SelectItem>
                  <SelectItem value="avg">Average Voltage (Vavg)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Voltage (V)</Label>
              <Input value={value} onChange={e => setValue(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Peak-to-Peak</p>
                    <p className="text-3xl font-bold">{results.peakToPeak} V</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Peak</p>
                    <p className="text-2xl font-bold">{results.peak} V</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">RMS</p>
                    <p className="text-2xl font-bold">{results.rms} V</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average</p>
                    <p className="text-2xl font-bold">{results.avg} V</p>
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
