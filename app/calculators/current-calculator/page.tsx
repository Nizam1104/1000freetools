"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CurrentCalculator() {
  const [mode, setMode] = useState<"VI" | "PV" | "VZ">("VI");
  const [voltage, setVoltage] = useState<string>("");
  const [resistance, setResistance] = useState<string>("");
  const [power, setPower] = useState<string>("");
  const [impedance, setImpedance] = useState<string>("");
  const [results, setResults] = useState<{ current: number; unit: string } | null>(null);

  const calculate = () => {
    let current = 0;
    const V = parseFloat(voltage);
    const R = parseFloat(resistance);
    const P = parseFloat(power);
    const Z = parseFloat(impedance);

    switch (mode) {
      case "VI":
        if (V > 0 && R > 0) current = V / R;
        break;
      case "PV":
        if (P > 0 && V > 0) current = P / V;
        break;
      case "VZ":
        if (V > 0 && Z > 0) current = V / Z;
        break;
    }

    if (current > 0) {
      const unit = current >= 1 ? "A" : current >= 0.001 ? "mA" : "µA";
      const displayValue = current >= 1 ? current : current >= 0.001 ? current * 1000 : current * 1000000;
      setResults({ current: Math.round(displayValue * 1000) / 1000, unit });
    }
  };

  const reset = () => {
    setVoltage("");
    setResistance("");
    setPower("");
    setImpedance("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Current Calculator – Calculate Electrical Current (Amps)</CardTitle>
          <CardDescription>
            Calculate the current flowing through any circuit. Enter voltage and resistance to apply Ohm's Law and find current in amperes with our electrical current calculator.
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
                  <SelectItem value="VI">I = V / R (Ohm's Law)</SelectItem>
                  <SelectItem value="PV">I = P / V (Power)</SelectItem>
                  <SelectItem value="VZ">I = V / Z (Impedance)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="voltage">Voltage (V)</Label>
                <Input id="voltage" type="number" placeholder="e.g., 12" value={voltage} onChange={(e) => setVoltage(e.target.value)} />
              </div>
              {mode === "VI" && (
                <div>
                  <Label htmlFor="resistance">Resistance (Ω)</Label>
                  <Input id="resistance" type="number" placeholder="e.g., 100" value={resistance} onChange={(e) => setResistance(e.target.value)} />
                </div>
              )}
              {mode === "PV" && (
                <div>
                  <Label htmlFor="power">Power (W)</Label>
                  <Input id="power" type="number" placeholder="e.g., 60" value={power} onChange={(e) => setPower(e.target.value)} />
                </div>
              )}
              {mode === "VZ" && (
                <div>
                  <Label htmlFor="impedance">Impedance (Ω)</Label>
                  <Input id="impedance" type="number" placeholder="e.g., 50" value={impedance} onChange={(e) => setImpedance(e.target.value)} />
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Current</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Current</p>
                <p className="text-4xl font-bold">{results.current} {results.unit}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Formula: {mode === "VI" ? "I = V / R" : mode === "PV" ? "I = P / V" : "I = V / Z"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
