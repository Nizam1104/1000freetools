"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Heat Transfer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Step 1:</strong> Select the heat transfer mode - conduction (through solids), convection (through fluids), or radiation (electromagnetic).
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 2:</strong> Enter the required parameters for your selected mode (thermal conductivity, area, temperatures, etc.).
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 3:</strong> Click Calculate to see the heat transfer rate in watts.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Heat Transfer Modes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Conduction - Heat Through Solids</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Conduction is heat flowing through a material from hot to cold:
            </p>
            <div className="p-4 bg-muted rounded-md">
              <p className="font-mono text-sm mb-2">Q = kAΔT / L</p>
              <p className="text-xs text-muted-foreground">
                k is thermal conductivity (how well the material conducts heat), A is area, ΔT is temperature difference, L is thickness. Metals have high k (copper = 400 W/m·K). Insulators have low k (wood = 0.1 W/m·K).
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Convection - Heat Through Fluids</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Convection is heat carried by moving fluids (air, water, oil):
            </p>
            <div className="p-4 bg-muted rounded-md">
              <p className="font-mono text-sm mb-2">Q = hA(T_s - T_∞)</p>
              <p className="text-xs text-muted-foreground">
                h is the heat transfer coefficient (depends on fluid and flow), A is surface area, T_s is surface temperature, T_∞ is fluid temperature. Forced convection (fans, pumps) has much higher h than natural convection.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Radiation - Heat Through Empty Space</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Radiation is heat transfer via electromagnetic waves - no medium needed:
            </p>
            <div className="p-4 bg-muted rounded-md">
              <p className="font-mono text-sm mb-2">Q = εσA(T₁⁴ - T₂⁴)</p>
              <p className="text-xs text-muted-foreground">
                ε is emissivity (0-1, blackbody = 1), σ is Stefan-Boltzmann constant, A is area, T is absolute temperature (Kelvin). Radiation dominates at high temperatures - it scales with T⁴.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thermal Conductivity Reference Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Thermal Conductivity (W/m·K)</TableHead>
                <TableHead>Use Case</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Copper</TableCell>
                <TableCell className="font-mono">400</TableCell>
                <TableCell>Heat sinks, cookware</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Aluminum</TableCell>
                <TableCell className="font-mono">237</TableCell>
                <TableCell>Heat exchangers, fins</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Steel (carbon)</TableCell>
                <TableCell className="font-mono">50</TableCell>
                <TableCell>Structural, pipes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Glass</TableCell>
                <TableCell className="font-mono">1.0</TableCell>
                <TableCell>Windows, insulation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Water</TableCell>
                <TableCell className="font-mono">0.6</TableCell>
                <TableCell>Coolant, heating</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Wood (oak)</TableCell>
                <TableCell className="font-mono">0.17</TableCell>
                <TableCell>Building, handles</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Air (still)</TableCell>
                <TableCell className="font-mono">0.026</TableCell>
                <TableCell>Insulation (double glazing)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Styrofoam</TableCell>
                <TableCell className="font-mono">0.033</TableCell>
                <TableCell>Insulation, packaging</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Higher thermal conductivity means better heat transfer. Insulators have low k values. Metals are excellent conductors.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Real-World Heat Transfer Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Conduction Example: House Wall</h4>
            <p className="text-xs text-muted-foreground">
              A brick wall (k = 0.7 W/m·K) that's 10 m² area and 0.2 m thick, with 20°C inside and 0°C outside: Q = 0.7 × 10 × 20 / 0.2 = 700 W. That's 700 joules per second leaking through the wall. Add insulation and you can cut this by 80%.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Convection Example: CPU Cooler</h4>
            <p className="text-xs text-muted-foreground">
              A CPU heatsink with 0.01 m² surface area, h = 50 W/m²·K (forced air), CPU at 70°C, air at 25°C: Q = 50 × 0.01 × 45 = 22.5 W. That's why high-performance CPUs need bigger heatsinks and faster fans - more area and higher h.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Radiation Example: Sun to Earth</h4>
            <p className="text-xs text-muted-foreground">
              The Sun (5,800 K) radiates energy across space. Earth receives about 1,360 W/m² at the top of atmosphere. This is pure radiation - no air in space. The T⁴ term means doubling temperature increases radiation by 16x.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Which heat transfer mode is fastest?</h4>
            <p className="text-sm text-muted-foreground">
              Depends on the situation. In solids, conduction dominates. In fluids with flow, convection is usually faster. At high temperatures (above 500°C), radiation becomes dominant. Most real situations involve all three modes simultaneously.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Why does metal feel colder than wood at the same temperature?</h4>
            <p className="text-sm text-muted-foreground">
              Metal conducts heat away from your hand much faster than wood. Your skin senses heat flow rate, not absolute temperature. A 20°C metal block feels cold because it's pulling heat from your hand. A 20°C wood block feels neutral because heat flows slowly.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">How do I reduce heat loss in my home?</h4>
            <p className="text-sm text-muted-foreground">
              Add insulation (low k materials like fiberglass, foam). Seal air leaks (reduces convection). Use double/triple glazing (traps air between panes). Reflective barriers work for radiation - that's why radiant barriers go in attics.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">What is the R-value of insulation?</h4>
            <p className="text-sm text-muted-foreground">
              R-value is thermal resistance - the inverse of conductivity, adjusted for thickness. R = L/k. Higher R means better insulation. Typical walls need R-13 to R-21. Attics need R-38 to R-60. Double-pane windows are about R-2 to R-3.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Does paint color affect heat transfer?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, for radiation. Dark colors have high emissivity and absorptivity - they radiate and absorb heat well. Light colors reflect radiation. That's why white roofs stay cooler in summer. But for conduction and convection, color doesn't matter.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/calculators/energy-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Energy Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate kinetic and potential energy</p>
            </a>
            <a href="/calculators/temperature-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Temperature Converter</p>
              <p className="text-xs text-muted-foreground">Convert between temperature units</p>
            </a>
            <a href="/calculators/force-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Force Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate force and pressure</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
