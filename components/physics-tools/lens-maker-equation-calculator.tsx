"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Eye } from "lucide-react";

export default function LensMakerEquationCalculator() {
  const [refractiveIndex, setRefractiveIndex] = useState("1.5");
  const [radius1, setRadius1] = useState("10");
  const [radius2, setRadius2] = useState("-10");
  const [thickness, setThickness] = useState("0");
  const [result, setResult] = useState<{ focalLength: number; power: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const n = parseFloat(refractiveIndex) || 1.5;
    const R1 = parseFloat(radius1) || 0;
    const R2 = parseFloat(radius2) || 0;
    const d = parseFloat(thickness) || 0;

    // Lens maker's equation (thin lens approximation when d is small)
    // 1/f = (n-1) × (1/R1 - 1/R2 + (n-1)×d/(n×R1×R2))
    const term1 = (n - 1) * (1 / R1 - 1 / R2);
    const term2 = d === 0 ? 0 : ((n - 1) * d) / (n * R1 * R2);
    const inverseF = term1 + term2;
    
    const f = inverseF !== 0 ? 1 / inverseF : Infinity;
    const power = f !== Infinity && f !== 0 ? 1 / (f / 100) : 0; // Power in Diopters (f in cm)

    setResult({ focalLength: f, power });
  }, [refractiveIndex, radius1, radius2, thickness]);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `Lens Maker's Equation Result:\nn = ${refractiveIndex}, R₁ = ${radius1} cm, R₂ = ${radius2} cm\nFocal Length: ${result.focalLength.toFixed(4)} cm\nPower: ${result.power.toFixed(4)} D`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, refractiveIndex, radius1, radius2]);

  const loadPreset = useCallback((type: string) => {
    const presets: Record<string, { n: string; R1: string; R2: string; d: string }> = {
      biconvex: { n: "1.5", R1: "10", R2: "-10", d: "0" },
      biconcave: { n: "1.5", R1: "-10", R2: "10", d: "0" },
      planoConvex: { n: "1.5", R1: "10", R2: "Infinity", d: "0" },
      planoConcave: { n: "1.5", R1: "-10", R2: "Infinity", d: "0" },
    };
    const preset = presets[type];
    if (preset) {
      setRefractiveIndex(preset.n);
      setRadius1(preset.R1);
      setRadius2(preset.R2);
      setThickness(preset.d);
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Lens Maker's Equation Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              1/f = (n-1) × (1/R₁ - 1/R₂ + (n-1)d/(n×R₁×R₂))
            </p>
          </div>

          <div>
            <Label>Lens Type Presets</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button size="sm" variant="outline" onClick={() => loadPreset("biconvex")}>
                Biconvex
              </Button>
              <Button size="sm" variant="outline" onClick={() => loadPreset("biconcave")}>
                Biconcave
              </Button>
              <Button size="sm" variant="outline" onClick={() => loadPreset("planoConvex")}>
                Plano-Convex
              </Button>
              <Button size="sm" variant="outline" onClick={() => loadPreset("planoConcave")}>
                Plano-Concave
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Refractive Index (n)</Label>
              <Input
                type="number"
                step="0.01"
                value={refractiveIndex}
                onChange={(e) => setRefractiveIndex(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Glass: 1.5, Water: 1.33, Diamond: 2.42
              </p>
            </div>
            <div>
              <Label>Lens Thickness (d) in cm</Label>
              <Input
                type="number"
                value={thickness}
                onChange={(e) => setThickness(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use 0 for thin lens approximation
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Radius of Curvature R₁ (cm)</Label>
              <Input
                type="text"
                value={radius1}
                onChange={(e) => setRadius1(e.target.value)}
                placeholder="Positive for convex"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Positive if center is on outgoing side
              </p>
            </div>
            <div>
              <Label>Radius of Curvature R₂ (cm)</Label>
              <Input
                type="text"
                value={radius2}
                onChange={(e) => setRadius2(e.target.value)}
                placeholder="Negative for convex"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Negative if center is on incoming side
              </p>
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Focal Length
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg text-center ${
                  result.focalLength > 0 ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"
                }`}>
                  <Label>Focal Length</Label>
                  <p className={`text-2xl font-bold mt-2 ${
                    result.focalLength > 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {result.focalLength === Infinity ? "∞" : `${result.focalLength.toFixed(4)} cm`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {result.focalLength > 0 ? "Converging Lens" : "Diverging Lens"}
                  </p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <Label>Optical Power</Label>
                  <p className="text-2xl font-bold mt-2">{result.power.toFixed(4)} D</p>
                  <p className="text-sm text-muted-foreground">Diopters</p>
                </div>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Results
              </Button>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
            <p className="font-semibold mb-2">Sign Convention:</p>
            <ul className="text-muted-foreground list-disc list-inside space-y-1">
              <li>R is positive if the center of curvature is on the outgoing side</li>
              <li>R is negative if the center of curvature is on the incoming side</li>
              <li>Positive focal length = converging lens</li>
              <li>Negative focal length = diverging lens</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
