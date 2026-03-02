"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WeldingStrengthCalculator() {
  const [weldType, setWeldType] = useState<"fillet" | "butt" | "plug">("fillet");
  const [legSize, setLegSize] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [electrodeStrength, setElectrodeStrength] = useState<string>("70");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const leg = parseFloat(legSize);
    const L = parseFloat(length);
    const σ = parseFloat(electrodeStrength) * 6.895; // Convert ksi to MPa

    if (leg > 0 && L > 0 && σ > 0) {
      let strength = 0;
      if (weldType === "fillet") {
        // Throat = 0.707 × leg
        const throat = 0.707 * leg;
        const area = throat * L;
        strength = area * σ * 0.3; // 30% of tensile for shear
      } else if (weldType === "butt") {
        const area = leg * L;
        strength = area * σ * 0.6;
      }

      setResults({ strength: Math.round(strength * 100) / 100, strengthLbs: Math.round(strength * 0.2248 * 100) / 100 });
    }
  };

  const reset = () => {
    setLegSize(""); setLength(""); setElectrodeStrength("70"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Welding Strength Calculator – Calculate Weld Strength</CardTitle>
          <CardDescription>
            Calculate the strength of welds based on weld type, size, and electrode strength. Essential for structural design.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Weld Type</Label>
              <Select value={weldType} onValueChange={(v) => setWeldType(v as typeof weldType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="fillet">Fillet Weld</SelectItem>
                  <SelectItem value="butt">Butt Weld</SelectItem>
                  <SelectItem value="plug">Plug Weld</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div><Label>Leg Size / Thickness (mm)</Label><Input value={legSize} onChange={e => setLegSize(e.target.value)} /></div>
              <div><Label>Weld Length (mm)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              <div><Label>Electrode Strength (ksi)</Label><Input value={electrodeStrength} onChange={e => setElectrodeStrength(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Strength</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Allowable Load</p>
                    <p className="text-3xl font-bold">{results.strength} kN</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Pounds</p>
                    <p className="text-2xl font-bold">{results.strengthLbs.toLocaleString()} lbs</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
