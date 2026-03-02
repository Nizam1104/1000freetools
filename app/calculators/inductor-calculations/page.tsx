"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function InductorCalculations() {
  // Tab 1: Inductance from physical params
  const [turns, setTurns] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [relPermeability, setRelPermeability] = useState<string>("1");

  // Tab 2: Inductive Reactance
  const [inductance, setInductance] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");

  // Tab 3: Impedance
  const [resistance, setResistance] = useState<string>("");
  const [inductance2, setInductance2] = useState<string>("");
  const [frequency2, setFrequency2] = useState<string>("");

  const [results, setResults] = useState<Record<string, any> | null>(null);

  const calculateInductance = () => {
    const N = parseFloat(turns);
    const A = parseFloat(area);
    const l = parseFloat(length);
    const μr = parseFloat(relPermeability);
    const μ0 = 4 * Math.PI * 1e-7;

    if (N > 0 && A > 0 && l > 0 && μr > 0) {
      const L = (μ0 * μr * N * N * A) / l;
      const unit = L >= 1 ? "H" : L >= 0.001 ? "mH" : L >= 1e-6 ? "µH" : "nH";
      const displayValue = L >= 1 ? L : L >= 0.001 ? L * 1000 : L >= 1e-6 ? L * 1e6 : L * 1e9;
      setResults({ tab: "inductance", value: Math.round(displayValue * 1000) / 1000, unit });
    }
  };

  const calculateReactance = () => {
    const L = parseFloat(inductance);
    const f = parseFloat(frequency);

    if (L > 0 && f > 0) {
      const XL = 2 * Math.PI * f * L;
      const unit = XL >= 1000000 ? "MΩ" : XL >= 1000 ? "kΩ" : "Ω";
      const displayValue = XL >= 1000000 ? XL / 1000000 : XL >= 1000 ? XL / 1000 : XL;
      setResults({ tab: "reactance", value: Math.round(displayValue * 1000) / 1000, unit });
    }
  };

  const calculateImpedance = () => {
    const R = parseFloat(resistance);
    const L = parseFloat(inductance2);
    const f = parseFloat(frequency2);

    if (R > 0 && L > 0 && f > 0) {
      const XL = 2 * Math.PI * f * L;
      const Z = Math.sqrt(R * R + XL * XL);
      const unit = Z >= 1000000 ? "MΩ" : Z >= 1000 ? "kΩ" : "Ω";
      const displayValue = Z >= 1000000 ? Z / 1000000 : Z >= 1000 ? Z / 1000 : Z;
      setResults({ tab: "impedance", value: Math.round(displayValue * 1000) / 1000, unit, XL: Math.round(XL * 1000) / 1000 });
    }
  };

  const reset = () => {
    setTurns("");
    setArea("");
    setLength("");
    setRelPermeability("1");
    setInductance("");
    setFrequency("");
    setResistance("");
    setInductance2("");
    setFrequency2("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Inductor Calculator – Inductance and Inductive Reactance Calculator</CardTitle>
          <CardDescription>
            Analyze inductor behavior in circuits with our inductor calculator. Compute inductance, inductive reactance (XL), and impedance for AC circuit design and electronics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Tabs defaultValue="inductance">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="inductance">Inductance</TabsTrigger>
                <TabsTrigger value="reactance">Reactance</TabsTrigger>
                <TabsTrigger value="impedance">Impedance</TabsTrigger>
              </TabsList>

              <TabsContent value="inductance" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">L = (μ₀ × μᵣ × N² × A) / l</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Number of Turns (N)</Label>
                    <Input type="number" value={turns} onChange={(e) => setTurns(e.target.value)} />
                  </div>
                  <div>
                    <Label>Cross-sectional Area (m²)</Label>
                    <Input type="number" value={area} onChange={(e) => setArea(e.target.value)} />
                  </div>
                  <div>
                    <Label>Core Length (m)</Label>
                    <Input type="number" value={length} onChange={(e) => setLength(e.target.value)} />
                  </div>
                  <div>
                    <Label>Relative Permeability (μᵣ)</Label>
                    <Input type="number" value={relPermeability} onChange={(e) => setRelPermeability(e.target.value)} />
                  </div>
                </div>
                <Button onClick={calculateInductance}>Calculate Inductance</Button>
              </TabsContent>

              <TabsContent value="reactance" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">X_L = 2πfL</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Inductance (H)</Label>
                    <Input type="number" value={inductance} onChange={(e) => setInductance(e.target.value)} />
                  </div>
                  <div>
                    <Label>Frequency (Hz)</Label>
                    <Input type="number" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
                  </div>
                </div>
                <Button onClick={calculateReactance}>Calculate Reactance</Button>
              </TabsContent>

              <TabsContent value="impedance" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">Z = √(R² + X_L²)</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Resistance (Ω)</Label>
                    <Input type="number" value={resistance} onChange={(e) => setResistance(e.target.value)} />
                  </div>
                  <div>
                    <Label>Inductance (H)</Label>
                    <Input type="number" value={inductance2} onChange={(e) => setInductance2(e.target.value)} />
                  </div>
                  <div>
                    <Label>Frequency (Hz)</Label>
                    <Input type="number" value={frequency2} onChange={(e) => setFrequency2(e.target.value)} />
                  </div>
                </div>
                <Button onClick={calculateImpedance}>Calculate Impedance</Button>
              </TabsContent>
            </Tabs>

            <Button variant="outline" onClick={reset} className="w-full">Reset</Button>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">
                  {results.tab === "inductance" ? "Inductance" : results.tab === "reactance" ? "Inductive Reactance" : "Impedance"}
                </p>
                <p className="text-4xl font-bold">{results.value} {results.unit}</p>
                {results.XL && <p className="text-sm text-muted-foreground mt-2">X_L = {results.XL} Ω</p>}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
