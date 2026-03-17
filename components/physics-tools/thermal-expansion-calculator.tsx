"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Thermometer } from "lucide-react";

export default function ThermalExpansionCalculator() {
  const [initialLength, setInitialLength] = useState("1");
  const [initialTemp, setInitialTemp] = useState("20");
  const [finalTemp, setFinalTemp] = useState("100");
  const [coefficient, setCoefficient] = useState("12e-6");
  const [expansionType, setExpansionType] = useState<"linear" | "area" | "volume">("linear");
  const [result, setResult] = useState<{
    deltaT: number;
    change: number;
    finalValue: number;
    percentChange: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const L0 = parseFloat(initialLength) || 0;
    const T0 = parseFloat(initialTemp) || 0;
    const Tf = parseFloat(finalTemp) || 0;
    const alpha = parseFloat(coefficient) || 0;

    const deltaT = Tf - T0;
    let change: number;
    let finalValue: number;

    if (expansionType === "linear") {
      // ΔL = α × L₀ × ΔT
      change = alpha * L0 * deltaT;
      finalValue = L0 + change;
    } else if (expansionType === "area") {
      // ΔA = 2α × A₀ × ΔT
      change = 2 * alpha * L0 * deltaT;
      finalValue = L0 + change;
    } else {
      // ΔV = 3α × V₀ × ΔT
      change = 3 * alpha * L0 * deltaT;
      finalValue = L0 + change;
    }

    const percentChange = (change / L0) * 100;

    setResult({
      deltaT,
      change,
      finalValue,
      percentChange,
    });
  }, [initialLength, initialTemp, finalTemp, coefficient, expansionType]);

  const loadMaterial = useCallback((material: string) => {
    const coefficients: Record<string, string> = {
      aluminum: "23e-6",
      steel: "12e-6",
      copper: "17e-6",
      glass: "9e-6",
      concrete: "12e-6",
      wood: "5e-6",
      brass: "19e-6",
      lead: "29e-6",
    };
    setCoefficient(coefficients[material] || "12e-6");
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `Thermal Expansion Result:\nInitial ${expansionType === "linear" ? "Length" : expansionType === "area" ? "Area" : "Volume"}: ${initialLength}\nΔT = ${result.deltaT}°C, α = ${coefficient}\nChange: ${result.change.toExponential(4)}\nFinal: ${result.finalValue.toFixed(6)}\nPercent Change: ${result.percentChange.toFixed(4)}%`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, initialLength, coefficient, expansionType]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="w-5 h-5" />
            Thermal Expansion Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              ΔL = α × L₀ × ΔT | ΔA = 2α × A₀ × ΔT | ΔV = 3α × V₀ × ΔT
            </p>
          </div>

          <div>
            <Label>Expansion Type</Label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={expansionType === "linear"}
                  onChange={() => setExpansionType("linear")}
                />
                Linear (Length)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={expansionType === "area"}
                  onChange={() => setExpansionType("area")}
                />
                Area
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={expansionType === "volume"}
                  onChange={() => setExpansionType("volume")}
                />
                Volume
              </label>
            </div>
          </div>

          <div>
            <Label>Material Presets</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["aluminum", "steel", "copper", "glass", "concrete", "brass"].map((material) => (
                <Button
                  key={material}
                  size="sm"
                  variant="outline"
                  onClick={() => loadMaterial(material)}
                >
                  {material.charAt(0).toUpperCase() + material.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Initial {expansionType === "linear" ? "Length" : expansionType === "area" ? "Area" : "Volume"} (m{expansionType === "area" ? "²" : expansionType === "volume" ? "³" : ""})</Label>
              <Input
                type="number"
                value={initialLength}
                onChange={(e) => setInitialLength(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Coefficient of Expansion (α) per °C</Label>
              <Input
                type="text"
                value={coefficient}
                onChange={(e) => setCoefficient(e.target.value)}
                className="mt-1 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use scientific notation (e.g., 12e-6)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Initial Temperature (°C)</Label>
              <Input
                type="number"
                value={initialTemp}
                onChange={(e) => setInitialTemp(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Final Temperature (°C)</Label>
              <Input
                type="number"
                value={finalTemp}
                onChange={(e) => setFinalTemp(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Thermal Expansion
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <Label>Temperature Change</Label>
                  <p className="text-2xl font-bold mt-2">{result.deltaT}°C</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <Label>Percent Change</Label>
                  <p className="text-2xl font-bold mt-2">{result.percentChange.toFixed(4)}%</p>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <Label>Expansion Results</Label>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Change</p>
                    <p className="text-xl font-bold">
                      {result.change > 0 ? "+" : ""}{result.change.toExponential(4)}
                      {expansionType === "linear" ? " m" : expansionType === "area" ? " m²" : " m³"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Final Value</p>
                    <p className="text-xl font-bold">
                      {result.finalValue.toFixed(6)}
                      {expansionType === "linear" ? " m" : expansionType === "area" ? " m²" : " m³"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <Label>Practical Example</Label>
                <p className="text-sm mt-2 text-muted-foreground">
                  A {initialLength}m {expansionType === "linear" ? "rod" : "object"} at {initialTemp}°C 
                  will {result.change > 0 ? "expand" : "contract"} by 
                  {(Math.abs(result.change) * 1000).toFixed(4)}mm when heated/cooled to {finalTemp}°C
                </p>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Results
              </Button>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
            <p className="font-semibold mb-2">About Thermal Expansion:</p>
            <p className="text-muted-foreground">
              Most materials expand when heated and contract when cooled. This effect must be
              considered in engineering applications like bridges, railways, and pipelines.
              Different materials have different expansion coefficients.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
