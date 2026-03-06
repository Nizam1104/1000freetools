"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SafetyFactorCalculator() {
  const [material, setMaterial] = useState<"steel" | "aluminum" | "wood" | "concrete" | "custom">("steel");
  const [yieldStrength, setYieldStrength] = useState<string>("250");
  const [appliedStress, setAppliedStress] = useState<string>("");
  const [loadType, setLoadType] = useState<"static" | "dynamic" | "fatigue">("static");
  const [results, setResults] = useState<any>(null);

  const materialStrengths: Record<string, number> = {
    steel: 250,
    aluminum: 95,
    wood: 40,
    concrete: 20,
    custom: 0,
  };

  const recommendedFactors: Record<string, number> = {
    static: 1.5,
    dynamic: 2.5,
    fatigue: 3.0,
  };

  const calculate = () => {
    const σ_yield = parseFloat(yieldStrength);
    const σ_applied = parseFloat(appliedStress);

    if (σ_yield > 0 && σ_applied > 0) {
      const n = σ_yield / σ_applied;
      const recommended = recommendedFactors[loadType];
      const status = n >= recommended ? "Safe" : n >= recommended * 0.8 ? "Marginal" : "Unsafe";

      setResults({
        factor: Math.round(n * 100) / 100,
        recommended,
        status,
        allowableStress: Math.round((σ_yield / recommended) * 100) / 100,
      });
    }
  };

  const handleMaterialChange = (mat: string) => {
    setMaterial(mat as typeof material);
    if (mat !== "custom") {
      setYieldStrength(materialStrengths[mat].toString());
    }
  };

  const reset = () => {
    setMaterial("steel");
    setYieldStrength("250");
    setAppliedStress("");
    setLoadType("static");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Material</Label>
                <Select value={material} onValueChange={handleMaterialChange}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="steel">Steel (250 MPa)</SelectItem>
                    <SelectItem value="aluminum">Aluminum (95 MPa)</SelectItem>
                    <SelectItem value="wood">Wood (40 MPa)</SelectItem>
                    <SelectItem value="concrete">Concrete (20 MPa)</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Yield Strength (MPa)</Label>
                <Input value={yieldStrength} onChange={e => setYieldStrength(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Applied Stress (MPa)</Label>
                <Input value={appliedStress} onChange={e => setAppliedStress(e.target.value)} />
              </div>
              <div>
                <Label>Load Type</Label>
                <Select value={loadType} onValueChange={(v) => setLoadType(v as typeof loadType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="static">Static Load</SelectItem>
                    <SelectItem value="dynamic">Dynamic Load</SelectItem>
                    <SelectItem value="fatigue">Fatigue/Cyclic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Safety Factor</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className={`p-4 rounded-md space-y-3 ${results.status === "Safe" ? "bg-green-100 dark:bg-green-900/20" : results.status === "Marginal" ? "bg-yellow-100 dark:bg-yellow-900/20" : "bg-red-100 dark:bg-red-900/20"}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Factor of Safety</p>
                    <p className="text-4xl font-bold">{results.factor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className={`text-2xl font-bold ${results.status === "Safe" ? "text-green-600" : results.status === "Marginal" ? "text-yellow-600" : "text-red-600"}`}>{results.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recommended (for {loadType})</p>
                    <p className="text-xl font-bold">≥ {results.recommended}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Allowable Stress</p>
                    <p className="text-xl font-bold">{results.allowableStress} MPa</p>
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
