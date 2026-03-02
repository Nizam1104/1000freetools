"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function IdealGasLawCalculator() {
  const [solveFor, setSolveFor] = useState<"P" | "V" | "n" | "T">("P");
  const [pressure, setPressure] = useState<string>("");
  const [volume, setVolume] = useState<string>("");
  const [moles, setMoles] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const R = 8.314; // Ideal gas constant J/(mol·K)

  const calculate = () => {
    const P = parseFloat(pressure);
    const V = parseFloat(volume);
    const n = parseFloat(moles);
    const T = parseFloat(temperature) + 273.15; // Convert to Kelvin

    switch (solveFor) {
      case "P":
        if (n > 0 && T > 0 && V > 0) {
          const result = (n * R * T) / V;
          setResults({ value: result, unit: "Pa", label: "Pressure" });
        }
        break;
      case "V":
        if (n > 0 && T > 0 && P > 0) {
          const result = (n * R * T) / P;
          setResults({ value: result, unit: "m³", label: "Volume" });
        }
        break;
      case "n":
        if (P > 0 && V > 0 && T > 0) {
          const result = (P * V) / (R * T);
          setResults({ value: result, unit: "mol", label: "Amount of Substance" });
        }
        break;
      case "T":
        if (P > 0 && V > 0 && n > 0) {
          const result = (P * V) / (n * R);
          setResults({ value: result - 273.15, unit: "°C", label: "Temperature" });
        }
        break;
    }
  };

  const reset = () => {
    setPressure(""); setVolume(""); setMoles(""); setTemperature("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Ideal Gas Law Calculator – Solve PV = nRT for Any Variable</CardTitle>
          <CardDescription>
            Apply the ideal gas law PV = nRT to find any unknown gas property. Our calculator solves for pressure, volume, temperature, or amount of gas in chemistry and physics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Solve For</Label>
              <Select value={solveFor} onValueChange={(v) => setSolveFor(v as typeof solveFor)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="P">Pressure (P)</SelectItem>
                  <SelectItem value="V">Volume (V)</SelectItem>
                  <SelectItem value="n">Amount (n)</SelectItem>
                  <SelectItem value="T">Temperature (T)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {solveFor !== "P" && (
                <div><Label>Pressure (Pa)</Label><Input value={pressure} onChange={e => setPressure(e.target.value)} /></div>
              )}
              {solveFor !== "V" && (
                <div><Label>Volume (m³)</Label><Input value={volume} onChange={e => setVolume(e.target.value)} /></div>
              )}
              {solveFor !== "n" && (
                <div><Label>Moles (mol)</Label><Input value={moles} onChange={e => setMoles(e.target.value)} /></div>
              )}
              {solveFor !== "T" && (
                <div><Label>Temperature (°C)</Label><Input value={temperature} onChange={e => setTemperature(e.target.value)} /></div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">{results.label}</p>
                <p className="text-4xl font-bold">{typeof results.value === 'number' ? Math.round(results.value * 100) / 100 : results.value} {results.unit}</p>
                <p className="text-xs text-muted-foreground mt-2">PV = nRT, R = 8.314 J/(mol·K)</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
