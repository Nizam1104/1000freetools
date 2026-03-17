"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Sun } from "lucide-react";

export default function PhotoelectricEffectCalculator() {
  const [wavelength, setWavelength] = useState("400");
  const [workFunction, setWorkFunction] = useState("2.3");
  const [result, setResult] = useState<{
    frequency: number;
    photonEnergy: number;
    maxKE: number;
    stoppingPotential: number;
    thresholdWavelength: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const lambda = parseFloat(wavelength) || 0; // in nm
    const phi = parseFloat(workFunction) || 0; // in eV

    const h = 6.626e-34; // Planck's constant (J⋅s)
    const c = 3e8; // Speed of light (m/s)
    const e = 1.602e-19; // Elementary charge (C)

    // Frequency: f = c / λ
    const frequency = c / (lambda * 1e-9);

    // Photon energy: E = hf = hc/λ (in eV)
    const photonEnergy = (h * c) / (lambda * 1e-9 * e);

    // Maximum kinetic energy: KE_max = E - φ
    const maxKE = photonEnergy - phi;

    // Stopping potential: V_s = KE_max / e (in volts, but KE is already in eV)
    const stoppingPotential = maxKE;

    // Threshold wavelength: λ_th = hc / (φ × e)
    const thresholdWavelength = (h * c) / (phi * e * 1e-9);

    setResult({
      frequency,
      photonEnergy,
      maxKE,
      stoppingPotential,
      thresholdWavelength,
    });
  }, [wavelength, workFunction]);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `Photoelectric Effect Result:\nWavelength: ${wavelength} nm, Work Function: ${workFunction} eV\nFrequency: ${result.frequency.toExponential(4)} Hz\nPhoton Energy: ${result.photonEnergy.toFixed(4)} eV\nMax KE: ${result.maxKE.toFixed(4)} eV\nStopping Potential: ${result.stoppingPotential.toFixed(4)} V`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, wavelength, workFunction]);

  const loadMaterial = useCallback((material: string) => {
    const workFunctions: Record<string, string> = {
      cesium: "2.14",
      potassium: "2.29",
      sodium: "2.36",
      lithium: "2.9",
      calcium: "2.87",
      copper: "4.7",
      silver: "4.73",
      platinum: "5.65",
    };
    setWorkFunction(workFunctions[material] || "2.3");
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="w-5 h-5" />
            Photoelectric Effect Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              KE_max = hf - φ = hc/λ - φ
            </p>
          </div>

          <div>
            <Label>Material Presets</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["cesium", "potassium", "sodium", "copper", "silver"].map((material) => (
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
              <Label>Wavelength (λ) in nm</Label>
              <Input
                type="number"
                value={wavelength}
                onChange={(e) => setWavelength(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Visible light: 400-700 nm
              </p>
            </div>
            <div>
              <Label>Work Function (φ) in eV</Label>
              <Input
                type="number"
                step="0.01"
                value={workFunction}
                onChange={(e) => setWorkFunction(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Photoelectric Effect
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <Label>Frequency</Label>
                  <p className="text-xl font-bold mt-2">{result.frequency.toExponential(4)} Hz</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <Label>Photon Energy</Label>
                  <p className="text-xl font-bold mt-2">{result.photonEnergy.toFixed(4)} eV</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg text-center ${
                result.maxKE > 0 ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"
              }`}>
                <Label>Maximum Kinetic Energy</Label>
                <p className={`text-3xl font-bold mt-2 ${
                  result.maxKE > 0 ? "text-green-600" : "text-red-600"
                }`}>
                  {result.maxKE.toFixed(4)} eV
                </p>
                <p className="text-sm mt-1">
                  {result.maxKE > 0 ? "Photoelectric emission occurs" : "No emission (energy below threshold)"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <Label>Stopping Potential</Label>
                  <p className="text-xl font-bold mt-2">{result.stoppingPotential.toFixed(4)} V</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Label>Threshold Wavelength</Label>
                  <p className="text-xl font-bold mt-2">{result.thresholdWavelength.toFixed(2)} nm</p>
                </div>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Results
              </Button>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
            <p className="font-semibold mb-2">About the Photoelectric Effect:</p>
            <p className="text-muted-foreground">
              When light shines on a metal surface, electrons can be ejected if the photon
              energy exceeds the material's work function. This phenomenon helped establish
              the quantum nature of light.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
