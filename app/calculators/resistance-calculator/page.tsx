"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ResistanceCalculator() {
  const [mode, setMode] = useState<"VI" | "VP" | "PI" | "resistivity">("VI");
  const [voltage, setVoltage] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [power, setPower] = useState<string>("");
  const [resistivity, setResistivity] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [results, setResults] = useState<{ resistance: number; unit: string } | null>(null);

  const calculate = () => {
    let resistance = 0;
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const P = parseFloat(power);
    const ρ = parseFloat(resistivity);
    const L = parseFloat(length);
    const A = parseFloat(area);

    switch (mode) {
      case "VI":
        if (V > 0 && I > 0) resistance = V / I;
        break;
      case "VP":
        if (V > 0 && P > 0) resistance = (V * V) / P;
        break;
      case "PI":
        if (P > 0 && I > 0) resistance = P / (I * I);
        break;
      case "resistivity":
        if (ρ > 0 && L > 0 && A > 0) resistance = (ρ * L) / A;
        break;
    }

    if (resistance > 0) {
      const unit = resistance >= 1000000 ? "MΩ" : resistance >= 1000 ? "kΩ" : "Ω";
      const displayValue = resistance >= 1000000 ? resistance / 1000000 : resistance >= 1000 ? resistance / 1000 : resistance;
      setResults({ resistance: Math.round(displayValue * 1000) / 1000, unit });
    }
  };

  const reset = () => {
    setVoltage("");
    setCurrent("");
    setPower("");
    setResistivity("");
    setLength("");
    setArea("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Resistance Calculator – Calculate Resistance with Ohm's Law</CardTitle>
          <CardDescription>
            Find electrical resistance using voltage and current with our resistance calculator. Based on Ohm's Law R = V/I, suitable for circuit analysis and electronics design.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Calculation Mode</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VI">R = V / I (Ohm's Law)</SelectItem>
                  <SelectItem value="VP">R = V² / P (Power)</SelectItem>
                  <SelectItem value="PI">R = P / I² (Power)</SelectItem>
                  <SelectItem value="resistivity">R = ρL / A (Resistivity)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "resistivity" ? (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="resistivity">Resistivity ρ (Ω·m)</Label>
                  <Input id="resistivity" type="number" placeholder="e.g., 1.68e-8" value={resistivity} onChange={(e) => setResistivity(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="length">Length (m)</Label>
                  <Input id="length" type="number" placeholder="e.g., 10" value={length} onChange={(e) => setLength(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="area">Area (m²)</Label>
                  <Input id="area" type="number" placeholder="e.g., 1e-6" value={area} onChange={(e) => setArea(e.target.value)} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="voltage">Voltage (V)</Label>
                  <Input id="voltage" type="number" placeholder="e.g., 12" value={voltage} onChange={(e) => setVoltage(e.target.value)} />
                </div>
                {mode === "VI" && (
                  <div>
                    <Label htmlFor="current">Current (A)</Label>
                    <Input id="current" type="number" placeholder="e.g., 0.5" value={current} onChange={(e) => setCurrent(e.target.value)} />
                  </div>
                )}
                {(mode === "VP" || mode === "PI") && (
                  <div>
                    <Label htmlFor="power">Power (W)</Label>
                    <Input id="power" type="number" placeholder="e.g., 60" value={power} onChange={(e) => setPower(e.target.value)} />
                  </div>
                )}
                {mode === "PI" && (
                  <div>
                    <Label htmlFor="current2">Current (A)</Label>
                    <Input id="current2" type="number" placeholder="e.g., 2" value={current} onChange={(e) => setCurrent(e.target.value)} />
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Resistance</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Resistance</p>
                <p className="text-4xl font-bold">{results.resistance} {results.unit}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
