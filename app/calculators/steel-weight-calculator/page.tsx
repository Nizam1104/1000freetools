"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SteelWeightCalculator() {
  const [shape, setShape] = useState<"bar" | "sheet" | "pipe" | "beam">("bar");
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [thickness, setThickness] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [outerDiameter, setOuterDiameter] = useState<string>("");
  const [innerDiameter, setInnerDiameter] = useState<string>("");
  const [material, setMaterial] = useState<string>("steel");
  const [results, setResults] = useState<any>(null);

  const densities: Record<string, number> = {
    steel: 7850,
    stainless: 8000,
    aluminum: 2700,
    copper: 8960,
    brass: 8500,
  };

  const calculate = () => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const T = parseFloat(thickness);
    const D = parseFloat(diameter);
    const OD = parseFloat(outerDiameter);
    const ID = parseFloat(innerDiameter);
    const density = densities[material];

    let volume = 0;
    switch (shape) {
      case "bar":
        if (D > 0 && L > 0) volume = Math.PI * Math.pow(D / 2, 2) * L;
        break;
      case "sheet":
        if (L > 0 && W > 0 && T > 0) volume = L * W * T;
        break;
      case "pipe":
        if (OD > 0 && ID > 0 && L > 0) volume = Math.PI * (Math.pow(OD / 2, 2) - Math.pow(ID / 2, 2)) * L;
        break;
      case "beam":
        if (W > 0 && T > 0 && L > 0) volume = W * T * L;
        break;
    }

    if (volume > 0) {
      const weight = volume * density;
      setResults({
        weight: weight,
        weightLbs: weight * 2.20462,
        volume: volume,
      });
    }
  };

  const reset = () => {
    setLength(""); setWidth(""); setThickness(""); setDiameter("");
    setOuterDiameter(""); setInnerDiameter(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Steel Weight Calculator – Calculate Weight of Steel Sections and Bars</CardTitle>
          <CardDescription>
            Find the weight of any steel component quickly. Our steel weight calculator covers bars, plates, pipes, and structural sections in kg or lbs from standard dimensions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Shape</Label>
                <Select value={shape} onValueChange={(v) => setShape(v as typeof shape)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Round Bar</SelectItem>
                    <SelectItem value="sheet">Sheet/Plate</SelectItem>
                    <SelectItem value="pipe">Pipe/Tube</SelectItem>
                    <SelectItem value="beam">Beam/Flat Bar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Material</Label>
                <Select value={material} onValueChange={(v) => setMaterial(v as typeof material)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="steel">Steel (7850 kg/m³)</SelectItem>
                    <SelectItem value="stainless">Stainless Steel (8000 kg/m³)</SelectItem>
                    <SelectItem value="aluminum">Aluminum (2700 kg/m³)</SelectItem>
                    <SelectItem value="copper">Copper (8960 kg/m³)</SelectItem>
                    <SelectItem value="brass">Brass (8500 kg/m³)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {shape === "bar" && (
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Diameter (m)</Label><Input value={diameter} onChange={e => setDiameter(e.target.value)} /></div>
                <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              </div>
            )}

            {shape === "sheet" && (
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
                <div><Label>Width (m)</Label><Input value={width} onChange={e => setWidth(e.target.value)} /></div>
                <div><Label>Thickness (m)</Label><Input value={thickness} onChange={e => setThickness(e.target.value)} /></div>
              </div>
            )}

            {shape === "pipe" && (
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Outer Diameter (m)</Label><Input value={outerDiameter} onChange={e => setOuterDiameter(e.target.value)} /></div>
                <div><Label>Inner Diameter (m)</Label><Input value={innerDiameter} onChange={e => setInnerDiameter(e.target.value)} /></div>
                <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              </div>
            )}

            {shape === "beam" && (
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Width (m)</Label><Input value={width} onChange={e => setWidth(e.target.value)} /></div>
                <div><Label>Thickness (m)</Label><Input value={thickness} onChange={e => setThickness(e.target.value)} /></div>
                <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Weight</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="text-3xl font-bold">{Math.round(results.weight * 100) / 100} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Weight (lbs)</p>
                    <p className="text-3xl font-bold">{Math.round(results.weightLbs * 100) / 100}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Volume: {Math.round(results.volume * 1000) / 1000} m³</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
