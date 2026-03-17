"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Battery } from "lucide-react";

export default function CapacitanceCalculator() {
  const [capacitorType, setCapacitorType] = useState<"parallel" | "series" | "cylindrical" | "spherical">("parallel");
  const [value1, setValue1] = useState("0.01");
  const [value2, setValue2] = useState("0.01");
  const [distance, setDistance] = useState("0.001");
  const [dielectric, setDielectric] = useState("1");
  const [result, setResult] = useState<{
    capacitance: number;
    charge: number;
    energy: number;
  } | null>(null);
  const [voltage, setVoltage] = useState("10");
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const epsilon0 = 8.854e-12; // Vacuum permittivity
    const A = parseFloat(value1) || 0; // Area or length
    const d = parseFloat(distance) || 0.001;
    const k = parseFloat(dielectric) || 1;
    const V = parseFloat(voltage) || 0;

    let capacitance = 0;

    if (capacitorType === "parallel") {
      // C = k × ε₀ × A / d
      capacitance = (k * epsilon0 * A) / d;
    } else if (capacitorType === "series") {
      // For two capacitors in series: 1/C = 1/C1 + 1/C2
      const C1 = parseFloat(value1) || 0;
      const C2 = parseFloat(value2) || 0;
      if (C1 > 0 && C2 > 0) {
        capacitance = (C1 * C2) / (C1 + C2);
      }
    } else if (capacitorType === "cylindrical") {
      // C = 2π × k × ε₀ × L / ln(b/a)
      const L = A;
      const b = parseFloat(value2) || 0.02;
      const a = d;
      if (b > a && a > 0) {
        capacitance = (2 * Math.PI * k * epsilon0 * L) / Math.log(b / a);
      }
    } else if (capacitorType === "spherical") {
      // C = 4π × k × ε₀ × (a × b) / (b - a)
      const a = d;
      const b = parseFloat(value2) || 0.02;
      if (b > a && a > 0) {
        capacitance = (4 * Math.PI * k * epsilon0 * a * b) / (b - a);
      }
    }

    const charge = capacitance * V;
    const energy = 0.5 * capacitance * V * V;

    setResult({ capacitance, charge, energy });
  }, [capacitorType, value1, value2, distance, dielectric, voltage]);

  const loadDielectric = useCallback((material: string) => {
    const constants: Record<string, string> = {
      vacuum: "1",
      air: "1.0006",
      paper: "3.7",
      glass: "5",
      mica: "6",
      ceramic: "100",
      water: "80",
    };
    setDielectric(constants[material] || "1");
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `Capacitance Calculation:\nC = ${result.capacitance.toExponential(4)} F\nQ = ${result.charge.toExponential(4)} C (at ${voltage}V)\nEnergy = ${result.energy.toExponential(4)} J`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, voltage]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Battery className="w-5 h-5" />
            Capacitance Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Capacitor Type</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["parallel", "series", "cylindrical", "spherical"].map((type) => (
                <Button
                  key={type}
                  size="sm"
                  variant={capacitorType === type ? "default" : "outline"}
                  onClick={() => setCapacitorType(type as typeof capacitorType)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {capacitorType === "parallel" && (
            <>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-mono text-sm text-center">C = k × ε₀ × A / d</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Plate Area (A) in m²</Label>
                  <Input type="number" value={value1} onChange={(e) => setValue1(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label>Plate Separation (d) in m</Label>
                  <Input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="mt-1" />
                </div>
              </div>
            </>
          )}

          {capacitorType === "series" && (
            <>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-mono text-sm text-center">1/C = 1/C₁ + 1/C₂</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Capacitance C₁ in F</Label>
                  <Input type="number" value={value1} onChange={(e) => setValue1(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label>Capacitance C₂ in F</Label>
                  <Input type="number" value={value2} onChange={(e) => setValue2(e.target.value)} className="mt-1" />
                </div>
              </div>
            </>
          )}

          {(capacitorType === "cylindrical" || capacitorType === "spherical") && (
            <>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-mono text-sm text-center">
                  {capacitorType === "cylindrical" ? "C = 2πkε₀L / ln(b/a)" : "C = 4πkε₀(ab)/(b-a)"}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>{capacitorType === "cylindrical" ? "Length (L)" : "Inner Radius (a)"} in m</Label>
                  <Input type="number" value={value1} onChange={(e) => setValue1(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label>Outer Radius (b) in m</Label>
                  <Input type="number" value={value2} onChange={(e) => setValue2(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label>Dielectric Constant (k)</Label>
                  <Input type="number" value={dielectric} onChange={(e) => setDielectric(e.target.value)} className="mt-1" />
                </div>
              </div>
            </>
          )}

          {capacitorType === "parallel" && (
            <>
              <div>
                <Label>Dielectric Material</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["vacuum", "air", "paper", "glass", "mica", "ceramic"].map((material) => (
                    <Button key={material} size="sm" variant="outline" onClick={() => loadDielectric(material)}>
                      {material.charAt(0).toUpperCase() + material.slice(1)}
                    </Button>
                  ))}
                </div>
                <Input
                  type="number"
                  step="0.01"
                  value={dielectric}
                  onChange={(e) => setDielectric(e.target.value)}
                  className="mt-2"
                  placeholder="Dielectric constant"
                />
              </div>
            </>
          )}

          <div>
            <Label>Applied Voltage (V) in volts</Label>
            <Input type="number" value={voltage} onChange={(e) => setVoltage(e.target.value)} className="mt-1" />
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Capacitance
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <Label>Capacitance</Label>
                  <p className="text-lg font-bold mt-2">{result.capacitance.toExponential(4)}</p>
                  <p className="text-xs text-muted-foreground">Farads</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <Label>Charge</Label>
                  <p className="text-lg font-bold mt-2">{result.charge.toExponential(4)}</p>
                  <p className="text-xs text-muted-foreground">Coulombs</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <Label>Energy</Label>
                  <p className="text-lg font-bold mt-2">{result.energy.toExponential(4)}</p>
                  <p className="text-xs text-muted-foreground">Joules</p>
                </div>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Results
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
