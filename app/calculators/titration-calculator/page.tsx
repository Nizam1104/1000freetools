"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function TitrationCalculator() {
  const [mode, setMode] = useState<"find-acid" | "find-base">("find-acid");
  const [acidVolume, setAcidVolume] = useState<string>("");
  const [acidConcentration, setAcidConcentration] = useState<string>("");
  const [baseVolume, setBaseVolume] = useState<string>("");
  const [baseConcentration, setBaseConcentration] = useState<string>("");
  const [acidStoich, setAcidStoich] = useState<string>("1");
  const [baseStoich, setBaseStoich] = useState<string>("1");
  const [result, setResult] = useState<any>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const calculate = () => {
    const Va = parseFloat(acidVolume) / 1000;
    const Ca = parseFloat(acidConcentration) || 0;
    const Vb = parseFloat(baseVolume) / 1000;
    const Cb = parseFloat(baseConcentration) || 0;
    const na = parseFloat(acidStoich);
    const nb = parseFloat(baseStoich);

    if (mode === "find-acid" && Vb > 0 && Cb > 0 && Va > 0) {
      const Ca_calc = (Cb * Vb * nb) / (Va * na);
      setResult({ value: Math.round(Ca_calc * 1000) / 1000, unit: "mol/L", label: "Acid Concentration" });
      generateGraph(Vb, Cb, Va, "acid");
    } else if (mode === "find-base" && Va > 0 && Ca > 0 && Vb > 0) {
      const Cb_calc = (Ca * Va * na) / (Vb * nb);
      setResult({ value: Math.round(Cb_calc * 1000) / 1000, unit: "mol/L", label: "Base Concentration" });
      generateGraph(Va, Ca, Vb, "base");
    }
  };

  const generateGraph = (V1: number, C1: number, V2: number, mode: string) => {
    const data = [];
    for (let v = V1 * 0.5; v <= V2 * 1.5; v += V2 / 20) {
      const C2 = mode === "acid" ? (C1 * v) / V2 : (C1 * V1) / v;
      data.push({ volume: Math.round(v * 1000 * 10) / 10, concentration: Math.round(C2 * 1000) / 1000 });
    }
    setGraphData(data);
  };

  const reset = () => {
    setAcidVolume("");
    setAcidConcentration("");
    setBaseVolume("");
    setBaseConcentration("");
    setResult(null);
    setGraphData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Find</Label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as typeof mode)}
                className="w-full p-2 border rounded"
              >
                <option value="find-acid">Acid Concentration</option>
                <option value="find-base">Base Concentration</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Acid Volume (mL)</Label>
                <Input type="number" placeholder="e.g., 25" value={acidVolume} onChange={(e) => setAcidVolume(e.target.value)} />
              </div>
              <div>
                <Label>Base Volume (mL)</Label>
                <Input type="number" placeholder="e.g., 30" value={baseVolume} onChange={(e) => setBaseVolume(e.target.value)} />
              </div>
            </div>

            {mode === "find-acid" ? (
              <div>
                <Label>Base Concentration (mol/L)</Label>
                <Input type="number" placeholder="e.g., 0.1" value={baseConcentration} onChange={(e) => setBaseConcentration(e.target.value)} />
              </div>
            ) : (
              <div>
                <Label>Acid Concentration (mol/L)</Label>
                <Input type="number" placeholder="e.g., 0.1" value={acidConcentration} onChange={(e) => setAcidConcentration(e.target.value)} />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Acid Stoichiometric Coefficient</Label>
                <Input type="number" value={acidStoich} onChange={(e) => setAcidStoich(e.target.value)} />
              </div>
              <div>
                <Label>Base Stoichiometric Coefficient</Label>
                <Input type="number" value={baseStoich} onChange={(e) => setBaseStoich(e.target.value)} />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">{result.label}</p>
                <p className="text-4xl font-bold mt-1">{result.value} {result.unit}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What is Titration?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Titration is an analytical technique to determine the concentration of an unknown solution. You add a solution of known concentration (titrant) to the unknown solution until the reaction reaches its endpoint.</p>

          <h3 className="text-xl font-semibold">Titration Formula</h3>
          <div className="p-4 bg-muted rounded-md font-mono text-center">
            (Ca × Va) / na = (Cb × Vb) / nb
          </div>
          <p>Where:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Ca = Concentration of acid</li>
            <li>Va = Volume of acid</li>
            <li>na = Stoichiometric coefficient of acid</li>
            <li>Cb = Concentration of base</li>
            <li>Vb = Volume of base</li>
            <li>nb = Stoichiometric coefficient of base</li>
          </ul>

          <h3 className="text-xl font-semibold">Common Titration Reactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Reaction</th>
                  <th className="p-2 text-left">Ratio</th>
                  <th className="p-2 text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">HCl + NaOH → NaCl + H₂O</td>
                  <td className="p-2">1:1</td>
                  <td className="p-2">Strong acid-strong base</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O</td>
                  <td className="p-2">1:2</td>
                  <td className="p-2">Diprotic acid</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">H₃PO₄ + 3NaOH → Na₃PO₄ + 3H₂O</td>
                  <td className="p-2">1:3</td>
                  <td className="p-2">Triprotic acid</td>
                </tr>
                <tr>
                  <td className="p-2">CH₃COOH + NaOH → CH₃COONa + H₂O</td>
                  <td className="p-2">1:1</td>
                  <td className="p-2">Weak acid-strong base</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Example Calculation</h3>
          <p>25.0 mL of HCl requires 30.0 mL of 0.1 M NaOH to reach the endpoint. For a 1:1 reaction:</p>
          <p>Ca = (Cb × Vb) / Va = (0.1 M × 30.0 mL) / 25.0 mL = 0.12 M</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Titration Curve</CardTitle>
          <CardDescription>Concentration relationship during titration</CardDescription>
        </CardHeader>
        <CardContent>
          {graphData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{ value: "Volume (mL)", position: "insideBottom", offset: -5 }} dataKey="volume" />
                <YAxis label={{ value: "Concentration (mol/L)", angle: -90, position: "insideLeft" }} dataKey="concentration" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="concentration" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Enter values and calculate to see the graph</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Titration Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Determining acidity of vinegar and fruit juices</li>
            <li>Measuring water hardness (calcium and magnesium)</li>
            <li>Quality control in pharmaceutical manufacturing</li>
            <li>Environmental water quality testing</li>
            <li>Food industry pH and acidity analysis</li>
          </ul>
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
                  <h4 className="font-semibold text-sm mb-1">Select Unknown</h4>
                  <p className="text-xs text-muted-foreground">Choose whether you need to find the acid concentration or base concentration from your titration data.</p>
                </div>
              </div>
              <div className="flex-1 flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Enter Titration Data</h4>
                  <p className="text-xs text-muted-foreground">Input volumes (mL) and known concentration (mol/L) for both acid and base solutions.</p>
                </div>
              </div>
              <div className="flex-1 flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Get Concentration Result</h4>
                  <p className="text-xs text-muted-foreground">Calculate unknown concentration using stoichiometry and view the titration curve visualization.</p>
                </div>
              </div>
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
                <h4 className="font-semibold text-sm mb-2">Acid or Base Calculation</h4>
                <p className="text-xs text-muted-foreground">Find either unknown acid concentration or unknown base concentration from titration endpoint data.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Stoichiometry Support</h4>
                <p className="text-xs text-muted-foreground">Handle reactions with any stoichiometric ratio (1:1, 1:2, 1:3) for polyprotic acids and bases.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Titration Curve Graph</h4>
                <p className="text-xs text-muted-foreground">Visualize concentration changes during titration with interactive curve plotting.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Educational Reference</h4>
                <p className="text-xs text-muted-foreground">Includes formula explanation, common reaction examples, and step-by-step calculation guide.</p>
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
              <h4 className="font-semibold text-sm mb-2">What is the titration formula?</h4>
              <p className="text-xs text-muted-foreground">
                The titration formula is: (Ca × Va) / na = (Cb × Vb) / nb, where C is concentration, V is volume, and n is the stoichiometric coefficient. At the equivalence point, moles of acid equal moles of base (adjusted for stoichiometry).
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">How do I calculate unknown concentration from titration?</h4>
              <p className="text-xs text-muted-foreground">
                Rearrange the formula: Cunknown = (Cknown × Vknown × nunknown) / (Vunknown × nknown). For 1:1 reactions, this simplifies to Cunknown = (Cknown × Vknown) / Vunknown.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What is the equivalence point in titration?</h4>
              <p className="text-xs text-muted-foreground">
                The equivalence point is when the amount of titrant added exactly neutralizes the analyte. Moles of H+ equal moles of OH-. This is detected by an indicator color change or pH meter reading.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Why do I need stoichiometric coefficients?</h4>
              <p className="text-xs text-muted-foreground">
                Polyprotic acids (H₂SO₄, H₃PO₄) release multiple H+ ions. Sulfuric acid needs 2 NaOH per molecule (1:2 ratio). Without accounting for stoichiometry, concentration calculations will be wrong.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What units are used in titration calculations?</h4>
              <p className="text-xs text-muted-foreground">
                Concentration is typically in mol/L (Molarity, M). Volume can be mL or L (be consistent). The formula works with any volume unit as long as both volumes use the same unit.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
