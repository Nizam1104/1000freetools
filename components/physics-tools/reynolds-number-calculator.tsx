"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Droplets } from "lucide-react";

export default function ReynoldsNumberCalculator() {
  const [density, setDensity] = useState("1000");
  const [velocity, setVelocity] = useState("1");
  const [characteristicLength, setCharacteristicLength] = useState("0.1");
  const [viscosity, setViscosity] = useState("0.001");
  const [result, setResult] = useState<{ reynolds: number; regime: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const rho = parseFloat(density) || 0;
    const v = parseFloat(velocity) || 0;
    const L = parseFloat(characteristicLength) || 0;
    const mu = parseFloat(viscosity) || 0;

    // Re = (ρ × v × L) / μ
    const reynolds = (rho * v * L) / mu;

    let regime = "Laminar";
    if (reynolds > 4000) regime = "Turbulent";
    else if (reynolds > 2300) regime = "Transitional";

    setResult({ reynolds, regime });
  }, [density, velocity, characteristicLength, viscosity]);

  const loadFluid = useCallback((fluid: string) => {
    const fluids: Record<string, { density: string; viscosity: string }> = {
      water: { density: "1000", viscosity: "0.001" },
      air: { density: "1.225", viscosity: "1.81e-5" },
      oil: { density: "850", viscosity: "0.1" },
      honey: { density: "1420", viscosity: "10" },
      blood: { density: "1060", viscosity: "0.004" },
    };
    const f = fluids[fluid];
    if (f) {
      setDensity(f.density);
      setViscosity(f.viscosity);
    }
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `Reynolds Number Calculation:\nρ = ${density} kg/m³, v = ${velocity} m/s, L = ${characteristicLength} m, μ = ${viscosity} Pa⋅s\nRe = ${result.reynolds.toExponential(4)} (${result.regime})`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, density, velocity, characteristicLength, viscosity]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5" />
            Reynolds Number Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              Re = (ρ × v × L) / μ
            </p>
          </div>

          <div>
            <Label>Fluid Presets</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["water", "air", "oil", "honey", "blood"].map((fluid) => (
                <Button
                  key={fluid}
                  size="sm"
                  variant="outline"
                  onClick={() => loadFluid(fluid)}
                >
                  {fluid.charAt(0).toUpperCase() + fluid.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Density (ρ) in kg/m³</Label>
              <Input
                type="number"
                value={density}
                onChange={(e) => setDensity(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Dynamic Viscosity (μ) in Pa⋅s</Label>
              <Input
                type="text"
                value={viscosity}
                onChange={(e) => setViscosity(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Velocity (v) in m/s</Label>
              <Input
                type="number"
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Characteristic Length (L) in m</Label>
              <Input
                type="number"
                value={characteristicLength}
                onChange={(e) => setCharacteristicLength(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Pipe diameter, wing chord, etc.
              </p>
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Reynolds Number
          </Button>

          {result && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg text-center ${
                result.regime === "Laminar" ? "bg-green-50 dark:bg-green-950" :
                result.regime === "Transitional" ? "bg-yellow-50 dark:bg-yellow-950" :
                "bg-red-50 dark:bg-red-950"
              }`}>
                <Label>Reynolds Number</Label>
                <p className="text-3xl font-bold mt-2">{result.reynolds.toExponential(4)}</p>
                <p className={`text-lg mt-1 ${
                  result.regime === "Laminar" ? "text-green-600" :
                  result.regime === "Transitional" ? "text-yellow-600" : "text-red-600"
                }`}>
                  {result.regime} Flow
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <Label>Flow Regime Scale</Label>
                <div className="mt-2 h-8 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded relative">
                  <div
                    className="absolute top-0 h-full w-1 bg-black transition-all"
                    style={{
                      left: `${Math.min(Math.log10(result.reynolds) / 5 * 100, 100)}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>10²</span>
                  <span>2300</span>
                  <span>4000</span>
                  <span>10⁶</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Laminar</span>
                  <span>Transitional</span>
                  <span>Turbulent</span>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <Label>Flow Characteristics</Label>
                <ul className="text-sm mt-2 text-muted-foreground list-disc list-inside space-y-1">
                  {result.regime === "Laminar" && (
                    <>
                      <li>Smooth, orderly flow</li>
                      <li>Low energy loss</li>
                      <li>Predictable behavior</li>
                    </>
                  )}
                  {result.regime === "Transitional" && (
                    <>
                      <li>Mixed laminar and turbulent regions</li>
                      <li>Unstable flow patterns</li>
                      <li>Sensitive to disturbances</li>
                    </>
                  )}
                  {result.regime === "Turbulent" && (
                    <>
                      <li>Chaotic, irregular flow</li>
                      <li>High energy loss</li>
                      <li>Enhanced mixing</li>
                    </>
                  )}
                </ul>
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
