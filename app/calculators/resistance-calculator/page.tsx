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

      <div className="mt-8 space-y-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Resistance Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Select calculation mode</p>
                  <p>Choose from Ohm's Law (V/I), Power formulas (V²/P or P/I²), or Resistivity (ρL/A).</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your values</p>
                  <p>Input the required values based on your selected mode — voltage, current, power, or material properties.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Get resistance value</p>
                  <p>The calculator displays resistance in Ω, kΩ, or MΩ depending on the magnitude.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Electrical Resistance
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Resistance opposes the flow of electric current. It is measured in ohms (Ω) and
                depends on the material, length, and cross-sectional area of the conductor.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-center space-y-2">
                <div>R = V / I (Ohm's Law)</div>
                <div>R = V² / P (from Power)</div>
                <div>R = P / I² (from Power)</div>
                <div>R = ρL / A (Resistivity)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Resistivity of Common Materials
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Material</th>
                    <th className="text-left py-3 px-2 font-semibold">Resistivity (Ω·m)</th>
                    <th className="text-left py-3 px-2 font-semibold">Type</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Silver</td>
                    <td className="py-3 px-2">1.59 × 10⁻⁸</td>
                    <td className="py-3 px-2">Conductor</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Copper</td>
                    <td className="py-3 px-2">1.68 × 10⁻⁸</td>
                    <td className="py-3 px-2">Conductor</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Aluminum</td>
                    <td className="py-3 px-2">2.82 × 10⁻⁸</td>
                    <td className="py-3 px-2">Conductor</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Silicon</td>
                    <td className="py-3 px-2">6.4 × 10²</td>
                    <td className="py-3 px-2">Semiconductor</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Glass</td>
                    <td className="py-3 px-2">10¹⁰ - 10¹⁴</td>
                    <td className="py-3 px-2">Insulator</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Rubber</td>
                    <td className="py-3 px-2">10¹³ - 10¹⁶</td>
                    <td className="py-3 px-2">Insulator</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Lower resistivity means better conductivity. Copper is the standard for electrical wiring.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Factors Affecting Resistance
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">1</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Length</p>
                  <p>Longer wires have more resistance. Double the length, double the resistance.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">2</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Cross-sectional Area</p>
                  <p>Thicker wires have less resistance. Double the area, halve the resistance.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">3</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Temperature</p>
                  <p>Most conductors increase resistance with temperature. Semiconductors decrease.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What is Ohm's Law?</h4>
                <p>
                  Ohm's Law states that voltage equals current times resistance (V = IR). It is the
                  fundamental relationship in electrical circuits, discovered by Georg Ohm in 1827.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I calculate resistance from power?</h4>
                <p>
                  Use R = V²/P if you know voltage and power, or R = P/I² if you know current and power.
                  These come from combining Ohm's Law with the power formula P = VI.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is resistivity?</h4>
                <p>
                  Resistivity (ρ) is an intrinsic material property that describes how strongly a
                  material opposes current. It is independent of shape and size, unlike resistance.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why does temperature affect resistance?</h4>
                <p>
                  In conductors, heat causes atoms to vibrate more, increasing collisions with
                  electrons. This raises resistance. In semiconductors, heat frees more charge
                  carriers, lowering resistance.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the unit of resistance?</h4>
                <p>
                  The ohm (Ω) is the SI unit. One ohm equals one volt per ampere. Common prefixes
                  include kΩ (1000 Ω) and MΩ (1,000,000 Ω) for larger values.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
