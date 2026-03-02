"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ScrewThreadPitchCalculator() {
  const [majorDiameter, setMajorDiameter] = useState<string>("");
  const [pitch, setPitch] = useState<string>("");
  const [threadsPerInch, setThreadsPerInch] = useState<string>("");
  const [mode, setMode] = useState<"metric" | "imperial">("metric");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const D = parseFloat(majorDiameter);

    if (mode === "metric" && D > 0 && pitch) {
      const P = parseFloat(pitch);
      const d2 = D - 0.6495 * P; // Pitch diameter
      const d1 = D - 1.0825 * P; // Minor diameter
      const tpi = 25.4 / P;

      setResults({
        pitchDiameter: d2,
        minorDiameter: d1,
        tpi: Math.round(tpi * 100) / 100,
      });
    } else if (mode === "imperial" && D > 0 && threadsPerInch) {
      const TPI = parseFloat(threadsPerInch);
      const P = 25.4 / TPI;
      const d2 = D - 0.6495 * P;
      const d1 = D - 1.0825 * P;

      setResults({
        pitch: P,
        pitchDiameter: d2,
        minorDiameter: d1,
      });
    }
  };

  const reset = () => {
    setMajorDiameter(""); setPitch(""); setThreadsPerInch(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Screw Thread Pitch Calculator – Thread Dimensions Calculator</CardTitle>
          <CardDescription>
            Calculate thread dimensions including pitch diameter and minor diameter for metric and imperial threads.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant={mode === "metric" ? "default" : "outline"} size="sm" onClick={() => setMode("metric")}>Metric</Button>
              <Button variant={mode === "imperial" ? "default" : "outline"} size="sm" onClick={() => setMode("imperial")}>Imperial</Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Major Diameter {mode === "metric" ? "(mm)" : "(inches)"}</Label><Input value={majorDiameter} onChange={e => setMajorDiameter(e.target.value)} /></div>
              {mode === "metric" ? (
                <div><Label>Pitch (mm)</Label><Input value={pitch} onChange={e => setPitch(e.target.value)} placeholder="e.g., 1.5" /></div>
              ) : (
                <div><Label>Threads Per Inch (TPI)</Label><Input value={threadsPerInch} onChange={e => setThreadsPerInch(e.target.value)} /></div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Pitch Diameter</p>
                    <p className="text-xl font-bold">{Math.round(results.pitchDiameter * 1000) / 1000} {mode === "metric" ? "mm" : "in"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Minor Diameter</p>
                    <p className="text-xl font-bold">{Math.round(results.minorDiameter * 1000) / 1000} {mode === "metric" ? "mm" : "in"}</p>
                  </div>
                  {results.tpi && (
                    <div>
                      <p className="text-sm text-muted-foreground">TPI</p>
                      <p className="text-xl font-bold">{results.tpi}</p>
                    </div>
                  )}
                  {results.pitch && (
                    <div>
                      <p className="text-sm text-muted-foreground">Pitch</p>
                      <p className="text-xl font-bold">{Math.round(results.pitch * 1000) / 1000} mm</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
