"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdcResolutionCalculator() {
  const [bits, setBits] = useState<string>("");
  const [vref, setVref] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const n = parseInt(bits);
    const Vref = parseFloat(vref);

    if (n > 0 && n <= 24 && Vref > 0) {
      const levels = Math.pow(2, n);
      const resolution = Vref / levels;
      const lsb = resolution * 1000; // mV

      setResults({
        levels,
        resolution: resolution.toExponential(4),
        lsb: Math.round(lsb * 1000) / 1000,
      });
    }
  };

  const reset = () => {
    setBits(""); setVref(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>ADC Resolution Calculator – Calculate ADC LSB Size</CardTitle>
          <CardDescription>
            Calculate the resolution and number of levels for an ADC based on bit depth and reference voltage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Resolution (bits)</Label><Input type="number" value={bits} onChange={e => setBits(e.target.value)} placeholder="e.g., 12, 16, 24" /></div>
              <div><Label>Reference Voltage (V)</Label><Input value={vref} onChange={e => setVref(e.target.value)} placeholder="e.g., 3.3, 5" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Number of Levels</p>
                    <p className="text-2xl font-bold">{results.levels.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Resolution</p>
                    <p className="text-xl font-bold">{results.resolution} V</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LSB Size</p>
                    <p className="text-xl font-bold">{results.lsb} mV</p>
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
