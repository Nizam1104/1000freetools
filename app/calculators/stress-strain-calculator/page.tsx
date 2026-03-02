"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StressStrainCalculator() {
  const [mode, setMode] = useState<"stress" | "strain" | "young">("stress");
  const [force, setForce] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [originalLength, setOriginalLength] = useState<string>("");
  const [changeInLength, setChangeInLength] = useState<string>("");
  const [youngsModulus, setYoungsModulus] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const F = parseFloat(force);
    const A = parseFloat(area);
    const L0 = parseFloat(originalLength);
    const ΔL = parseFloat(changeInLength);
    const E = parseFloat(youngsModulus);

    switch (mode) {
      case "stress":
        if (F > 0 && A > 0) {
          const stress = F / A;
          setResults({ value: stress, unit: "Pa", label: "Stress (σ)" });
        }
        break;
      case "strain":
        if (L0 > 0 && ΔL > 0) {
          const strain = ΔL / L0;
          setResults({ value: strain, unit: "", label: "Strain (ε)" });
        }
        break;
      case "young":
        if (F > 0 && A > 0 && L0 > 0 && ΔL > 0) {
          const stress = F / A;
          const strain = ΔL / L0;
          const E = stress / strain;
          setResults({ value: E, unit: "Pa", label: "Young's Modulus (E)" });
        }
        break;
    }
  };

  const reset = () => {
    setForce(""); setArea(""); setOriginalLength(""); setChangeInLength(""); setYoungsModulus("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Stress/Strain Calculator – Mechanical Properties Calculator</CardTitle>
          <CardDescription>
            Calculate stress, strain, and Young's modulus for materials. Our calculator helps analyze mechanical properties for engineering and physics applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Tabs defaultValue="stress">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="stress" onClick={() => setMode("stress")}>Stress</TabsTrigger>
                <TabsTrigger value="strain" onClick={() => setMode("strain")}>Strain</TabsTrigger>
                <TabsTrigger value="young" onClick={() => setMode("young")}>Young's E</TabsTrigger>
              </TabsList>

              <TabsContent value="stress" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">σ = F / A</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Force (N)</Label><Input value={force} onChange={e => setForce(e.target.value)} /></div>
                  <div><Label>Cross-sectional Area (m²)</Label><Input value={area} onChange={e => setArea(e.target.value)} /></div>
                </div>
                <Button onClick={calculate}>Calculate Stress</Button>
              </TabsContent>

              <TabsContent value="strain" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">ε = ΔL / L₀</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Original Length (m)</Label><Input value={originalLength} onChange={e => setOriginalLength(e.target.value)} /></div>
                  <div><Label>Change in Length (m)</Label><Input value={changeInLength} onChange={e => setChangeInLength(e.target.value)} /></div>
                </div>
                <Button onClick={calculate}>Calculate Strain</Button>
              </TabsContent>

              <TabsContent value="young" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">E = σ / ε = (F × L₀) / (A × ΔL)</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Force (N)</Label><Input value={force} onChange={e => setForce(e.target.value)} /></div>
                  <div><Label>Area (m²)</Label><Input value={area} onChange={e => setArea(e.target.value)} /></div>
                  <div><Label>Original Length (m)</Label><Input value={originalLength} onChange={e => setOriginalLength(e.target.value)} /></div>
                  <div><Label>Change in Length (m)</Label><Input value={changeInLength} onChange={e => setChangeInLength(e.target.value)} /></div>
                </div>
                <Button onClick={calculate}>Calculate Young's Modulus</Button>
              </TabsContent>
            </Tabs>

            <Button variant="outline" onClick={reset} className="w-full">Reset</Button>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">{results.label}</p>
                <p className="text-4xl font-bold">
                  {typeof results.value === 'number' ? (results.value >= 1e9 ? (results.value / 1e9).toFixed(2) + ' G' : results.value >= 1e6 ? (results.value / 1e6).toFixed(2) + ' M' : Math.round(results.value * 100) / 100) : results.value} {results.unit}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
