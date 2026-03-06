"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function HendersonHasselbalchCalculator() {
  const [pka, setPka] = useState<string>("");
  const [acidConc, setAcidConc] = useState<string>("");
  const [baseConc, setBaseConc] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const calculate = () => {
    const pKaValue = parseFloat(pka);
    const acid = parseFloat(acidConc);
    const base = parseFloat(baseConc);

    if (pKaValue > 0 && acid > 0 && base > 0) {
      const ratio = base / acid;
      const pH = pKaValue + Math.log10(ratio);
      setResult({ 
        ph: Math.round(pH * 100) / 100, 
        ratio: Math.round(ratio * 1000) / 1000,
        logRatio: Math.round(Math.log10(ratio) * 100) / 100 
      });
      generateGraph(pKaValue, acid, base);
    }
  };

  const generateGraph = (pKaValue: number, acid: number, base: number) => {
    const data = [];
    const ratio = base / acid;
    for (let r = 0.1; r <= 10; r += 0.5) {
      const pH = pKaValue + Math.log10(r);
      data.push({ ratio: Math.round(r * 100) / 100, ph: Math.round(pH * 100) / 100 });
    }
    setGraphData(data);
  };

  const reset = () => {
    setPka("");
    setAcidConc("");
    setBaseConc("");
    setResult(null);
    setGraphData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>pKa of Weak Acid</Label>
              <Input type="number" placeholder="e.g., 4.76" value={pka} onChange={(e) => setPka(e.target.value)} step="0.01" />
            </div>
            <div>
              <Label>Acid Concentration [HA] (mol/L)</Label>
              <Input type="number" placeholder="e.g., 0.1" value={acidConc} onChange={(e) => setAcidConc(e.target.value)} />
            </div>
            <div>
              <Label>Conjugate Base Concentration [A⁻] (mol/L)</Label>
              <Input type="number" placeholder="e.g., 0.1" value={baseConc} onChange={(e) => setBaseConc(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Buffer pH</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Buffer pH</p>
                  <p className="text-4xl font-bold">{result.ph}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">[Base]/[Acid] Ratio</p>
                    <p className="text-xl font-semibold">{result.ratio}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">log([Base]/[Acid])</p>
                    <p className="text-xl font-semibold">{result.logRatio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What is the Henderson-Hasselbalch Equation?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>The Henderson-Hasselbalch equation calculates the pH of a buffer solution. A buffer resists pH changes when you add small amounts of acid or base. The equation relates pH to the pKa of the weak acid and the ratio of conjugate base to acid concentrations.</p>

          <h3 className="text-xl font-semibold">Henderson-Hasselbalch Equation</h3>
          <div className="p-4 bg-muted rounded-md font-mono text-center">
            pH = pKa + log₁₀([A⁻]/[HA])
          </div>
          <p>Where:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>pH = Acidity of the buffer solution</li>
            <li>pKa = Acid dissociation constant (negative log of Ka)</li>
            <li>[A⁻] = Concentration of conjugate base (mol/L)</li>
            <li>[HA] = Concentration of weak acid (mol/L)</li>
          </ul>

          <h3 className="text-xl font-semibold">Buffer Capacity</h3>
          <p>A buffer works best when pH equals pKa. At this point, [A⁻] = [HA] and the ratio equals 1. The log of 1 is 0, so pH = pKa. Buffers maintain effective pH control within ±1 pH unit of the pKa value.</p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Ratio [A⁻]/[HA]</th>
                  <th className="p-2 text-left">log(Ratio)</th>
                  <th className="p-2 text-left">pH relative to pKa</th>
                  <th className="p-2 text-left">Buffer Effectiveness</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">0.1</td>
                  <td className="p-2">-1</td>
                  <td className="p-2">pKa - 1</td>
                  <td className="p-2">Minimum effective</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">0.5</td>
                  <td className="p-2">-0.3</td>
                  <td className="p-2">pKa - 0.3</td>
                  <td className="p-2">Good</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">1</td>
                  <td className="p-2">0</td>
                  <td className="p-2">pKa</td>
                  <td className="p-2">Optimal</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">2</td>
                  <td className="p-2">0.3</td>
                  <td className="p-2">pKa + 0.3</td>
                  <td className="p-2">Good</td>
                </tr>
                <tr>
                  <td className="p-2">10</td>
                  <td className="p-2">1</td>
                  <td className="p-2">pKa + 1</td>
                  <td className="p-2">Minimum effective</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Example Calculation</h3>
          <p>You prepare an acetate buffer with 0.1 M acetic acid (pKa = 4.76) and 0.1 M sodium acetate. The ratio [A⁻]/[HA] = 0.1/0.1 = 1. Since log(1) = 0, pH = 4.76 + 0 = 4.76.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>pH vs Base/Acid Ratio Graph</CardTitle>
          <CardDescription>How buffer pH changes with the ratio of conjugate base to acid</CardDescription>
        </CardHeader>
        <CardContent>
          {graphData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{ value: "[Base]/[Acid] Ratio", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "pH", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ph" stroke="#8884d8" strokeWidth={2} />
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
          <CardTitle>Common Buffer Systems</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Buffer System</th>
                  <th className="p-2 text-left">pKa</th>
                  <th className="p-2 text-left">Effective pH Range</th>
                  <th className="p-2 text-left">Applications</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Acetate (CH₃COOH/CH₃COO⁻)</td>
                  <td className="p-2">4.76</td>
                  <td className="p-2">3.76 - 5.76</td>
                  <td className="p-2">Biochemistry, food preservation</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Phosphate (H₂PO₄⁻/HPO₄²⁻)</td>
                  <td className="p-2">7.21</td>
                  <td className="p-2">6.21 - 8.21</td>
                  <td className="p-2">Cell culture, biological systems</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Carbonate (HCO₃⁻/CO₃²⁻)</td>
                  <td className="p-2">10.33</td>
                  <td className="p-2">9.33 - 11.33</td>
                  <td className="p-2">Blood buffering, water treatment</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Tris (Tris-HCl)</td>
                  <td className="p-2">8.07</td>
                  <td className="p-2">7.07 - 9.07</td>
                  <td className="p-2">Molecular biology, protein work</td>
                </tr>
                <tr>
                  <td className="p-2">Citrate</td>
                  <td className="p-2">3.13, 4.76, 6.40</td>
                  <td className="p-2">2.13 - 7.40</td>
                  <td className="p-2">Food industry, pharmaceuticals</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Buffer Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Maintaining blood pH at 7.4 in living organisms</li>
            <li>Controlling pH in fermentation processes</li>
            <li>Stabilizing enzyme activity in biochemical assays</li>
            <li>Calibrating pH meters with standard buffers</li>
            <li>Formulating pharmaceutical products</li>
            <li>Water quality management in aquariums</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
