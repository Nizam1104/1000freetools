"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RefractionIndexCalculator() {
  const [speed, setSpeed] = useState<string>("");
  const [wavelength1, setWavelength1] = useState<string>("");
  const [wavelength2, setWavelength2] = useState<string>("");
  const [mode, setMode] = useState<"speed" | "wavelength">("speed");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const c = 299792458;
    
    if (mode === "speed") {
      const v = parseFloat(speed);
      if (v > 0 && v <= c) {
        const n = c / v;
        setResults({ index: Math.round(n * 1000) / 1000 });
      }
    } else {
      const λ1 = parseFloat(wavelength1);
      const λ2 = parseFloat(wavelength2);
      if (λ1 > 0 && λ2 > 0) {
        const n = λ1 / λ2;
        setResults({ index: Math.round(n * 1000) / 1000 });
      }
    }
  };

  const reset = () => {
    setSpeed(""); setWavelength1(""); setWavelength2(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Refraction Index Calculator – Calculate Refractive Index</CardTitle>
          <CardDescription>
            Calculate the refractive index of a material from the speed of light or wavelength ratio. Our calculator helps determine optical properties.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant={mode === "speed" ? "default" : "outline"} size="sm" onClick={() => setMode("speed")}>From Speed</Button>
              <Button variant={mode === "wavelength" ? "default" : "outline"} size="sm" onClick={() => setMode("wavelength")}>From Wavelength</Button>
            </div>

            {mode === "speed" ? (
              <div>
                <Label>Speed of Light in Material (m/s)</Label>
                <Input value={speed} onChange={e => setSpeed(e.target.value)} placeholder="e.g., 2e8" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Wavelength in Vacuum</Label><Input value={wavelength1} onChange={e => setWavelength1(e.target.value)} /></div>
                <div><Label>Wavelength in Material</Label><Input value={wavelength2} onChange={e => setWavelength2(e.target.value)} /></div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Refractive Index (n)</p>
                <p className="text-4xl font-bold">{results.index}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
