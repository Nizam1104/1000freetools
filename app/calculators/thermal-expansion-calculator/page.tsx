"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MATERIALS: Record<string, number> = {
  "Aluminum": 23e-6,
  "Steel": 12e-6,
  "Copper": 17e-6,
  "Brass": 19e-6,
  "Concrete": 12e-6,
  "Glass": 9e-6,
  "Wood (parallel to grain)": 5e-6,
  "PVC": 52e-6,
  "Custom": 0,
};

export default function ThermalExpansionCalculator() {
  const [material, setMaterial] = useState<string>("Steel");
  const [alpha, setAlpha] = useState<string>("12e-6");
  const [length, setLength] = useState<string>("");
  const [tempChange, setTempChange] = useState<string>("");
  const [mode, setMode] = useState<"linear" | "volumetric">("linear");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const α = parseFloat(alpha);
    const L = parseFloat(length);
    const ΔT = parseFloat(tempChange);

    if (α > 0 && L > 0 && ΔT > 0) {
      if (mode === "linear") {
        const ΔL = α * L * ΔT;
        setResults({ change: ΔL, unit: "m", final: L + ΔL });
      } else {
        const β = 3 * α;
        const ΔV = β * L * ΔT;
        setResults({ change: ΔV, unit: "m³", final: L + ΔV });
      }
    }
  };

  const handleMaterialChange = (mat: string) => {
    setMaterial(mat);
    if (mat !== "Custom") {
      setAlpha(MATERIALS[mat].toString());
    }
  };

  const reset = () => {
    setMaterial("Steel");
    setAlpha("12e-6");
    setLength("");
    setTempChange("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Thermal Expansion Calculator – Linear and Volumetric Expansion</CardTitle>
          <CardDescription>
            Calculate how much a material expands or contracts with temperature change. Our thermal expansion calculator covers linear and volumetric expansion for engineering design.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Expansion Type</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear (ΔL = αLΔT)</SelectItem>
                  <SelectItem value="volumetric">Volumetric (ΔV = βVΔT)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Material</Label>
              <Select value={material} onValueChange={handleMaterialChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(MATERIALS).map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Coefficient α (1/°C)</Label>
                <Input type="number" value={alpha} onChange={(e) => setAlpha(e.target.value)} />
              </div>
              <div>
                <Label>Original Length (m)</Label>
                <Input type="number" value={length} onChange={(e) => setLength(e.target.value)} />
              </div>
              <div>
                <Label>Temp Change ΔT (°C)</Label>
                <Input type="number" value={tempChange} onChange={(e) => setTempChange(e.target.value)} />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Change in {mode === "linear" ? "Length" : "Volume"}</p>
                  <p className="text-4xl font-bold">{results.change.toExponential(4)} {results.unit}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Final {mode === "linear" ? "Length" : "Volume"}</p>
                  <p className="text-2xl font-bold">{results.final.toFixed(6)} {results.unit}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
