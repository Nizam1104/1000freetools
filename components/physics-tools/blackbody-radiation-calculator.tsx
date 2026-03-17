"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Sun } from "lucide-react";

export default function BlackbodyRadiationCalculator() {
  const [temperature, setTemperature] = useState("5800");
  const [wavelength, setWavelength] = useState("500");
  const [result, setResult] = useState<{
    peakWavelength: number;
    totalPower: number;
    spectralRadiance: number;
    frequency: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const T = parseFloat(temperature) || 0;
    const lambda = parseFloat(wavelength) || 0;

    const h = 6.626e-34; // Planck's constant
    const c = 3e8; // Speed of light
    const kB = 1.381e-23; // Boltzmann constant
    const sigma = 5.67e-8; // Stefan-Boltzmann constant
    const b = 2.898e-3; // Wien's displacement constant

    // Wien's displacement law: λ_max = b / T
    const peakWavelength = b / T;

    // Stefan-Boltzmann law: P = σ × T⁴ (power per unit area)
    const totalPower = sigma * Math.pow(T, 4);

    // Planck's law for spectral radiance at given wavelength
    // B(λ,T) = (2hc²/λ⁵) × 1/(e^(hc/λkT) - 1)
    const lambdaM = lambda * 1e-9; // Convert nm to m
    const exponent = (h * c) / (lambdaM * kB * T);
    const spectralRadiance = (2 * h * c * c) / Math.pow(lambdaM, 5) / (Math.exp(exponent) - 1);

    // Frequency corresponding to wavelength
    const frequency = c / lambdaM;

    setResult({
      peakWavelength,
      totalPower,
      spectralRadiance,
      frequency,
    });
  }, [temperature, wavelength]);

  const loadPreset = useCallback((preset: string) => {
    const presets: Record<string, string> = {
      sun: "5800",
      lightBulb: "2800",
      human: "310",
      roomTemp: "300",
      redHot: "1000",
      whiteHot: "1500",
    };
    setTemperature(presets[preset] || "5800");
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `Blackbody Radiation Results:\nTemperature: ${temperature} K\nPeak Wavelength: ${(result.peakWavelength * 1e9).toFixed(2)} nm\nTotal Power: ${result.totalPower.toExponential(4)} W/m²\nSpectral Radiance at ${wavelength}nm: ${result.spectralRadiance.toExponential(4)} W/(sr·m³)`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, temperature, wavelength]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="w-5 h-5" />
            Blackbody Radiation Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              λ_max = b/T | P = σT⁴ | B(λ,T) = 2hc²/λ⁵ × 1/(e^(hc/λkT) - 1)
            </p>
          </div>

          <div>
            <Label>Temperature Presets</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["sun", "lightBulb", "human", "roomTemp", "redHot", "whiteHot"].map((preset) => (
                <Button
                  key={preset}
                  size="sm"
                  variant="outline"
                  onClick={() => loadPreset(preset)}
                >
                  {preset === "sun" ? "Sun Surface" :
                   preset === "lightBulb" ? "Light Bulb" :
                   preset === "human" ? "Human Body" :
                   preset === "roomTemp" ? "Room Temp" :
                   preset.charAt(0).toUpperCase() + preset.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Temperature (T) in Kelvin</Label>
              <Input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Wavelength (λ) in nm</Label>
              <Input
                type="number"
                value={wavelength}
                onChange={(e) => setWavelength(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Visible: 400-700 nm
              </p>
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Blackbody Radiation
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <Label>Peak Wavelength (Wien's Law)</Label>
                  <p className="text-2xl font-bold mt-2">
                    {(result.peakWavelength * 1e9).toFixed(2)} nm
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {result.peakWavelength * 1e6 < 400 ? "Ultraviolet" :
                     result.peakWavelength * 1e6 < 700 ? "Visible" : "Infrared"}
                  </p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <Label>Total Power (Stefan-Boltzmann)</Label>
                  <p className="text-2xl font-bold mt-2">
                    {result.totalPower.toExponential(4)}
                  </p>
                  <p className="text-sm text-muted-foreground">W/m²</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <Label>Spectral Radiance at {wavelength} nm</Label>
                  <p className="text-xl font-bold mt-2">
                    {result.spectralRadiance.toExponential(4)}
                  </p>
                  <p className="text-xs text-muted-foreground">W/(sr·m³)</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Label>Frequency</Label>
                  <p className="text-xl font-bold mt-2">
                    {result.frequency.toExponential(4)}
                  </p>
                  <p className="text-xs text-muted-foreground">Hz</p>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <Label>Spectrum Visualization</Label>
                <div className="mt-4 h-16 rounded overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-blue-500 via-green-400 via-yellow-400 to-red-600" />
                  <div
                    className="absolute top-0 h-full w-1 bg-white"
                    style={{
                      left: `${Math.min(Math.max((500 - 380) / (750 - 380) * 100, 0), 100)}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>380nm</span>
                  <span>500nm</span>
                  <span>750nm</span>
                </div>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Results
              </Button>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
            <p className="font-semibold mb-2">About Blackbody Radiation:</p>
            <p className="text-muted-foreground">
              A blackbody is an idealized object that absorbs all incident radiation and emits
              radiation based solely on its temperature. The Sun, stars, and incandescent objects
              approximate blackbody radiators. Hotter objects emit more energy and at shorter
              wavelengths.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
