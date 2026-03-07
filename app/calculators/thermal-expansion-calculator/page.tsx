"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MATERIALS: Record<string, number> = {
  "Aluminum": 23e-6,
  "Steel": 12e-6,
  "Copper": 17e-6,
  "Brass": 19e-6,
  "Concrete": 12e-6,
  "Glass": 9e-6,
  "Wood (parallel to grain)": 5e-6,
  "PVC": 52e-6,
  "Custom": 0,
};

export default function ThermalExpansionCalculator() {
  const [material, setMaterial] = useState<string>("Steel");
  const [alpha, setAlpha] = useState<string>("12e-6");
  const [length, setLength] = useState<string>("");
  const [tempChange, setTempChange] = useState<string>("");
  const [mode, setMode] = useState<"linear" | "volumetric">("linear");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const α = parseFloat(alpha);
    const L = parseFloat(length);
    const ΔT = parseFloat(tempChange);

    if (α > 0 && L > 0 && ΔT > 0) {
      if (mode === "linear") {
        const ΔL = α * L * ΔT;
        setResults({ change: ΔL, unit: "m", final: L + ΔL });
      } else {
        const β = 3 * α;
        const ΔV = β * L * ΔT;
        setResults({ change: ΔV, unit: "m³", final: L + ΔV });
      }
    }
  };

  const handleMaterialChange = (mat: string) => {
    setMaterial(mat);
    if (mat !== "Custom") {
      setAlpha(MATERIALS[mat].toString());
    }
  };

  const reset = () => {
    setMaterial("Steel");
    setAlpha("12e-6");
    setLength("");
    setTempChange("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Expansion Type</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear (ΔL = αLΔT)</SelectItem>
                  <SelectItem value="volumetric">Volumetric (ΔV = βVΔT)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Material</Label>
              <Select value={material} onValueChange={handleMaterialChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(MATERIALS).map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Coefficient α (1/°C)</Label>
                <Input type="number" value={alpha} onChange={(e) => setAlpha(e.target.value)} />
              </div>
              <div>
                <Label>Original Length (m)</Label>
                <Input type="number" value={length} onChange={(e) => setLength(e.target.value)} />
              </div>
              <div>
                <Label>Temp Change ΔT (°C)</Label>
                <Input type="number" value={tempChange} onChange={(e) => setTempChange(e.target.value)} />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Change in {mode === "linear" ? "Length" : "Volume"}</p>
                  <p className="text-4xl font-bold">{results.change.toExponential(4)} {results.unit}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Final {mode === "linear" ? "Length" : "Volume"}</p>
                  <p className="text-2xl font-bold">{results.final.toFixed(6)} {results.unit}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How It Works
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Select Expansion Type</h4>
                  <p className="text-xs text-muted-foreground">Choose between linear expansion (length change) or volumetric expansion (volume change) for your application.</p>
                </div>
              </div>
              <div className="flex-1 flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Enter Material & Dimensions</h4>
                  <p className="text-xs text-muted-foreground">Select from common materials or enter custom coefficient, original length, and temperature change.</p>
                </div>
              </div>
              <div className="flex-1 flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Get Expansion Results</h4>
                  <p className="text-xs text-muted-foreground">See the change in dimension and final dimension after thermal expansion or contraction.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Thermal Expansion Coefficients Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-semibold">Material</th>
                    <th className="text-left py-2 px-3 font-semibold">Coefficient α (1/°C)</th>
                    <th className="text-left py-2 px-3 font-semibold">Expansion per 100°C (per meter)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Aluminum</td>
                    <td className="py-2 px-3 font-mono text-xs">23 × 10⁻⁶</td>
                    <td className="py-2 px-3 text-xs">2.3 mm</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Steel</td>
                    <td className="py-2 px-3 font-mono text-xs">12 × 10⁻⁶</td>
                    <td className="py-2 px-3 text-xs">1.2 mm</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Copper</td>
                    <td className="py-2 px-3 font-mono text-xs">17 × 10⁻⁶</td>
                    <td className="py-2 px-3 text-xs">1.7 mm</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Brass</td>
                    <td className="py-2 px-3 font-mono text-xs">19 × 10⁻⁶</td>
                    <td className="py-2 px-3 text-xs">1.9 mm</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Concrete</td>
                    <td className="py-2 px-3 font-mono text-xs">12 × 10⁻⁶</td>
                    <td className="py-2 px-3 text-xs">1.2 mm</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">PVC</td>
                    <td className="py-2 px-3 font-mono text-xs">52 × 10⁻⁶</td>
                    <td className="py-2 px-3 text-xs">5.2 mm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Key Features & Benefits
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Linear & Volumetric Modes</h4>
                <p className="text-xs text-muted-foreground">Calculate both linear expansion (ΔL = αLΔT) and volumetric expansion (ΔV = βVΔT where β = 3α).</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Pre-loaded Materials</h4>
                <p className="text-xs text-muted-foreground">Quick selection of common engineering materials with accurate thermal expansion coefficients.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Custom Coefficient Support</h4>
                <p className="text-xs text-muted-foreground">Enter custom thermal expansion coefficients for specialized materials not in the database.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Engineering Applications</h4>
                <p className="text-xs text-muted-foreground">Essential for bridge design, pipeline engineering, rail gaps, and precision instrument calibration.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-sm mb-2">What is thermal expansion?</h4>
              <p className="text-xs text-muted-foreground">
                Thermal expansion is the tendency of matter to change in size when temperature changes. Most materials expand when heated and contract when cooled. This is critical in engineering to prevent structural damage from temperature variations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What is the formula for linear thermal expansion?</h4>
              <p className="text-xs text-muted-foreground">
                ΔL = α × L₀ × ΔT, where ΔL is change in length, α is the coefficient of linear expansion, L₀ is original length, and ΔT is temperature change. For volumetric expansion: ΔV = β × V₀ × ΔT where β ≈ 3α.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Why do bridges have expansion joints?</h4>
              <p className="text-xs text-muted-foreground">
                Bridges expand in summer heat and contract in winter cold. A 100m steel bridge can change length by 12cm between -20°C and +40°C. Expansion joints accommodate this movement without causing structural damage.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Which material expands the most?</h4>
              <p className="text-xs text-muted-foreground">
                Among common engineering materials, plastics like PVC (52 × 10⁻⁶/°C) expand the most, followed by aluminum (23 × 10⁻⁶/°C). Metals generally expand more than ceramics and glass. Invar alloy has near-zero expansion.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Does water expand when heated?</h4>
              <p className="text-xs text-muted-foreground">
                Water behaves unusually – it contracts when heated from 0°C to 4°C, then expands above 4°C. This is why ice floats and lakes freeze from the top down. Water's expansion coefficient varies significantly with temperature.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
