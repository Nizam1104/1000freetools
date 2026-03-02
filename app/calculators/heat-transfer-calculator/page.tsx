"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HeatTransferCalculator() {
  const [mode, setMode] = useState<"conduction" | "convection" | "radiation">("conduction");
  
  // Conduction
  const [k, setK] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [thickness, setThickness] = useState<string>("");
  const [T1, setT1] = useState<string>("");
  const [T2, setT2] = useState<string>("");

  // Convection
  const [h, setH] = useState<string>("");
  const [convArea, setConvArea] = useState<string>("");
  const [Ts, setTs] = useState<string>("");
  const [Tinf, setTinf] = useState<string>("");

  // Radiation
  const [emissivity, setEmissivity] = useState<string>("");
  const [radArea, setRadArea] = useState<string>("");
  const [Tsurf, setTsurf] = useState<string>("");
  const [Tsurr, setTsurr] = useState<string>("");

  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const sigma = 5.67e-8; // Stefan-Boltzmann constant

    switch (mode) {
      case "conduction":
        const kVal = parseFloat(k);
        const A = parseFloat(area);
        const L = parseFloat(thickness);
        const ΔT = parseFloat(T1) - parseFloat(T2);
        if (kVal > 0 && A > 0 && L > 0 && ΔT !== 0) {
          const Q = (kVal * A * ΔT) / L;
          setResults({ value: Q, unit: "W", label: "Heat Transfer Rate" });
        }
        break;
      case "convection":
        const hVal = parseFloat(h);
        const A2 = parseFloat(convArea);
        const ΔT2 = parseFloat(Ts) - parseFloat(Tinf);
        if (hVal > 0 && A2 > 0 && ΔT2 !== 0) {
          const Q = hVal * A2 * ΔT2;
          setResults({ value: Q, unit: "W", label: "Heat Transfer Rate" });
        }
        break;
      case "radiation":
        const ε = parseFloat(emissivity);
        const A3 = parseFloat(radArea);
        const T1_K = parseFloat(Tsurf) + 273.15;
        const T2_K = parseFloat(Tsurr) + 273.15;
        if (ε > 0 && A3 > 0) {
          const Q = ε * sigma * A3 * (Math.pow(T1_K, 4) - Math.pow(T2_K, 4));
          setResults({ value: Q, unit: "W", label: "Radiative Heat Transfer" });
        }
        break;
    }
  };

  const reset = () => {
    setK(""); setArea(""); setThickness(""); setT1(""); setT2("");
    setH(""); setConvArea(""); setTs(""); setTinf("");
    setEmissivity(""); setRadArea(""); setTsurf(""); setTsurr("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Heat Transfer Calculator – Conduction, Convection & Radiation</CardTitle>
          <CardDescription>
            Analyze thermal performance with our heat transfer calculator. Compute heat flow rates for conduction, convection, and radiation in HVAC, manufacturing, and engineering design.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Tabs defaultValue="conduction">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="conduction" onClick={() => setMode("conduction")}>Conduction</TabsTrigger>
                <TabsTrigger value="convection" onClick={() => setMode("convection")}>Convection</TabsTrigger>
                <TabsTrigger value="radiation" onClick={() => setMode("radiation")}>Radiation</TabsTrigger>
              </TabsList>

              <TabsContent value="conduction" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">Q = kAΔT / L</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Thermal Conductivity k (W/m·K)</Label><Input value={k} onChange={e => setK(e.target.value)} /></div>
                  <div><Label>Area (m²)</Label><Input value={area} onChange={e => setArea(e.target.value)} /></div>
                  <div><Label>Thickness (m)</Label><Input value={thickness} onChange={e => setThickness(e.target.value)} /></div>
                  <div><Label>Temp Difference ΔT (°C)</Label><Input value={T1} onChange={e => setT1(e.target.value)} placeholder="T1" /><Input value={T2} onChange={e => setT2(e.target.value)} placeholder="T2" className="mt-2" /></div>
                </div>
                <Button onClick={calculate}>Calculate</Button>
              </TabsContent>

              <TabsContent value="convection" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">Q = hA(T_s - T_∞)</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Heat Transfer Coeff. h (W/m²·K)</Label><Input value={h} onChange={e => setH(e.target.value)} /></div>
                  <div><Label>Area (m²)</Label><Input value={convArea} onChange={e => setConvArea(e.target.value)} /></div>
                  <div><Label>Surface Temp T_s (°C)</Label><Input value={Ts} onChange={e => setTs(e.target.value)} /></div>
                  <div><Label>Fluid Temp T_∞ (°C)</Label><Input value={Tinf} onChange={e => setTinf(e.target.value)} /></div>
                </div>
                <Button onClick={calculate}>Calculate</Button>
              </TabsContent>

              <TabsContent value="radiation" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">Q = εσA(T₁⁴ - T₂⁴)</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Emissivity ε</Label><Input type="number" max="1" value={emissivity} onChange={e => setEmissivity(e.target.value)} /></div>
                  <div><Label>Area (m²)</Label><Input value={radArea} onChange={e => setRadArea(e.target.value)} /></div>
                  <div><Label>Surface Temp (°C)</Label><Input value={Tsurf} onChange={e => setTsurf(e.target.value)} /></div>
                  <div><Label>Surroundings Temp (°C)</Label><Input value={Tsurr} onChange={e => setTsurr(e.target.value)} /></div>
                </div>
                <Button onClick={calculate}>Calculate</Button>
              </TabsContent>
            </Tabs>

            <Button variant="outline" onClick={reset} className="w-full">Reset</Button>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">{results.label}</p>
                <p className="text-4xl font-bold">{Math.round(results.value * 100) / 100} {results.unit}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
