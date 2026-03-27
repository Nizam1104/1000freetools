"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";
import Faqs from "@/components/utils/Faqs";


export default function DilutionCalculator() {
  const [mode, setMode] = useState<"find-c2" | "find-v1" | "find-c1" | "find-v2">("find-c2");
  const [c1, setC1] = useState<string>("");
  const [v1, setV1] = useState<string>("");
  const [c2, setC2] = useState<string>("");
  const [v2, setV2] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const calculate = () => {
    const C1 = parseFloat(c1);
    const V1 = parseFloat(v1);
    const C2 = parseFloat(c2);
    const V2 = parseFloat(v2);

    if (mode === "find-c2" && C1 > 0 && V1 > 0 && V2 > 0) {
      const c2Value = (C1 * V1) / V2;
      setResult({ value: Math.round(c2Value * 1000) / 1000, unit: "Same as C1", label: "Final Concentration (C₂)" });
      generateC2Graph(C1, V1, V2);
    } else if (mode === "find-v1" && C1 > 0 && C2 > 0 && V2 > 0) {
      const v1Value = (C2 * V2) / C1;
      setResult({ value: Math.round(v1Value * 100) / 100, unit: "Same as V2", label: "Initial Volume (V₁)" });
      generateV1Graph(C1, C2, V2);
    } else if (mode === "find-c1" && V1 > 0 && C2 > 0 && V2 > 0) {
      const c1Value = (C2 * V2) / V1;
      setResult({ value: Math.round(c1Value * 1000) / 1000, unit: "Same as C2", label: "Initial Concentration (C₁)" });
      generateC1Graph(V1, C2, V2);
    } else if (mode === "find-v2" && C1 > 0 && V1 > 0 && C2 > 0) {
      const v2Value = (C1 * V1) / C2;
      setResult({ value: Math.round(v2Value * 100) / 100, unit: "Same as V1", label: "Final Volume (V₂)" });
      generateV2Graph(C1, V1, C2);
    }
  };

  const generateC2Graph = (C1: number, V1: number, V2: number) => {
    const data = [];
    for (let v = V1; v <= V2 * 1.5; v += V2 / 10) {
      const c2 = (C1 * V1) / v;
      data.push({ volume: Math.round(v * 10) / 10, concentration: Math.round(c2 * 1000) / 1000 });
    }
    setGraphData(data);
  };

  const generateV1Graph = (C1: number, C2: number, V2: number) => {
    const data = [];
    for (let c = C1 * 0.5; c <= C1; c += C1 / 10) {
      const v1 = (C2 * V2) / c;
      data.push({ concentration: Math.round(c * 100) / 100, volume: Math.round(v1 * 100) / 100 });
    }
    setGraphData(data);
  };

  const generateC1Graph = (V1: number, C2: number, V2: number) => {
    const data = [];
    for (let v = V1 * 0.5; v <= V1 * 2; v += V1 / 10) {
      const c1 = (C2 * V2) / v;
      data.push({ volume: Math.round(v * 10) / 10, concentration: Math.round(c1 * 1000) / 1000 });
    }
    setGraphData(data);
  };

  const generateV2Graph = (C1: number, V1: number, C2: number) => {
    const data = [];
    for (let c = C2 * 0.5; c <= C2 * 2; c += C2 / 10) {
      const v2 = (C1 * V1) / c;
      data.push({ concentration: Math.round(c * 100) / 100, volume: Math.round(v2 * 100) / 100 });
    }
    setGraphData(data);
  };

  const reset = () => {
    setC1("");
    setV1("");
    setC2("");
    setV2("");
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
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="find-c2">Final Concentration (C₂)</SelectItem>
                  <SelectItem value="find-v1">Initial Volume (V₁)</SelectItem>
                  <SelectItem value="find-c1">Initial Concentration (C₁)</SelectItem>
                  <SelectItem value="find-v2">Final Volume (V₂)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "find-c2" && (
              <>
                <div><Label>Initial Concentration (C₁)</Label><Input type="number" placeholder="e.g., 1.0" value={c1} onChange={(e) => setC1(e.target.value)} /></div>
                <div><Label>Initial Volume (V₁) mL</Label><Input type="number" placeholder="e.g., 10" value={v1} onChange={(e) => setV1(e.target.value)} /></div>
                <div><Label>Final Volume (V₂) mL</Label><Input type="number" placeholder="e.g., 100" value={v2} onChange={(e) => setV2(e.target.value)} /></div>
              </>
            )}

            {mode === "find-v1" && (
              <>
                <div><Label>Initial Concentration (C₁)</Label><Input type="number" placeholder="e.g., 1.0" value={c1} onChange={(e) => setC1(e.target.value)} /></div>
                <div><Label>Final Concentration (C₂)</Label><Input type="number" placeholder="e.g., 0.1" value={c2} onChange={(e) => setC2(e.target.value)} /></div>
                <div><Label>Final Volume (V₂) mL</Label><Input type="number" placeholder="e.g., 100" value={v2} onChange={(e) => setV2(e.target.value)} /></div>
              </>
            )}

            {mode === "find-c1" && (
              <>
                <div><Label>Initial Volume (V₁) mL</Label><Input type="number" placeholder="e.g., 10" value={v1} onChange={(e) => setV1(e.target.value)} /></div>
                <div><Label>Final Concentration (C₂)</Label><Input type="number" placeholder="e.g., 0.1" value={c2} onChange={(e) => setC2(e.target.value)} /></div>
                <div><Label>Final Volume (V₂) mL</Label><Input type="number" placeholder="e.g., 100" value={v2} onChange={(e) => setV2(e.target.value)} /></div>
              </>
            )}

            {mode === "find-v2" && (
              <>
                <div><Label>Initial Concentration (C₁)</Label><Input type="number" placeholder="e.g., 1.0" value={c1} onChange={(e) => setC1(e.target.value)} /></div>
                <div><Label>Initial Volume (V₁) mL</Label><Input type="number" placeholder="e.g., 10" value={v1} onChange={(e) => setV1(e.target.value)} /></div>
                <div><Label>Final Concentration (C₂)</Label><Input type="number" placeholder="e.g., 0.1" value={c2} onChange={(e) => setC2(e.target.value)} /></div>
              </>
            )}

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
          <CardTitle>What is the Dilution Formula?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>The dilution formula C1V1 = C2V2 calculates how to prepare a diluted solution from a concentrated stock. This equation states that the amount of solute remains constant before and after dilution.</p>

          <h3 className="text-xl font-semibold">Dilution Formula</h3>
          <div className="p-4 bg-muted rounded-md font-mono text-center">
            C₁V₁ = C₂V₂
          </div>
          <p>Where:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>C₁ = Initial concentration (stock solution)</li>
            <li>V₁ = Initial volume (volume of stock to use)</li>
            <li>C₂ = Final concentration (desired concentration)</li>
            <li>V₂ = Final volume (total volume after dilution)</li>
          </ul>

          <h3 className="text-xl font-semibold">Dilution Factor</h3>
          <p>The dilution factor equals V2/V1 or C1/C2. A 1:10 dilution means you dilute the stock 10 times. For example, mixing 1 mL of stock with 9 mL of solvent gives a total volume of 10 mL, which is a 1:10 dilution.</p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Dilution</th>
                  <th className="p-2 text-left">Stock Volume</th>
                  <th className="p-2 text-left">Diluent Volume</th>
                  <th className="p-2 text-left">Total Volume</th>
                  <th className="p-2 text-left">Dilution Factor</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">1:2</td>
                  <td className="p-2">1 mL</td>
                  <td className="p-2">1 mL</td>
                  <td className="p-2">2 mL</td>
                  <td className="p-2">2</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">1:5</td>
                  <td className="p-2">1 mL</td>
                  <td className="p-2">4 mL</td>
                  <td className="p-2">5 mL</td>
                  <td className="p-2">5</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">1:10</td>
                  <td className="p-2">1 mL</td>
                  <td className="p-2">9 mL</td>
                  <td className="p-2">10 mL</td>
                  <td className="p-2">10</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">1:100</td>
                  <td className="p-2">0.1 mL</td>
                  <td className="p-2">9.9 mL</td>
                  <td className="p-2">10 mL</td>
                  <td className="p-2">100</td>
                </tr>
                <tr>
                  <td className="p-2">1:1000</td>
                  <td className="p-2">0.01 mL</td>
                  <td className="p-2">9.99 mL</td>
                  <td className="p-2">10 mL</td>
                  <td className="p-2">1000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Example Calculation</h3>
          <p>You need 100 mL of 0.1 M NaCl from a 1.0 M stock. Use C1V1 = C2V2: (1.0 M)(V1) = (0.1 M)(100 mL). Solve for V1: V1 = 10 mL. Take 10 mL of 1.0 M stock and add water to reach 100 mL total.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Concentration vs Volume Graph</CardTitle>
          <CardDescription>How concentration changes as you add more diluent</CardDescription>
        </CardHeader>
        <CardContent>
          {graphData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{ value: "Volume (mL)", position: "insideBottom", offset: -5 }} dataKey="volume" />
                <YAxis label={{ value: "Concentration", angle: -90, position: "insideLeft" }} dataKey="concentration" />
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
          <CardTitle>Serial Dilution Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Tube</th>
                  <th className="p-2 text-left">Dilution</th>
                  <th className="p-2 text-left">Cumulative Dilution</th>
                  <th className="p-2 text-left">Concentration (from 1M)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">1</td>
                  <td className="p-2">1:10</td>
                  <td className="p-2">10⁻¹</td>
                  <td className="p-2">0.1 M</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">2</td>
                  <td className="p-2">1:10</td>
                  <td className="p-2">10⁻²</td>
                  <td className="p-2">0.01 M</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">3</td>
                  <td className="p-2">1:10</td>
                  <td className="p-2">10⁻³</td>
                  <td className="p-2">0.001 M</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">4</td>
                  <td className="p-2">1:10</td>
                  <td className="p-2">10⁻⁴</td>
                  <td className="p-2">0.0001 M</td>
                </tr>
                <tr>
                  <td className="p-2">5</td>
                  <td className="p-2">1:10</td>
                  <td className="p-2">10⁻⁵</td>
                  <td className="p-2">0.00001 M</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dilution Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Preparing standard solutions for calibration curves</li>
            <li>Serial dilutions for microbiology plate counts</li>
            <li>ELISA and immunoassay sample preparation</li>
            <li>PCR reaction setup with diluted primers</li>
            <li>Drug concentration preparation in pharmacology</li>
            <li>Environmental sample analysis</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Dilution Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                1
              </div>
              <div>
                <p className="font-medium text-foreground">Select what you want to find</p>
                <p>Choose from the dropdown: Final Concentration (C2), Initial Volume (V1), Initial Concentration (C1), or Final Volume (V2).</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                2
              </div>
              <div>
                <p className="font-medium text-foreground">Enter the known values</p>
                <p>Fill in the three known values. For example, to find C2, enter C1 (stock concentration), V1 (volume of stock), and V2 (final total volume).</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                3
              </div>
              <div>
                <p className="font-medium text-foreground">Calculate and review results</p>
                <p>Click Calculate to get your answer. The graph shows how concentration changes with volume. Use the reference tables for common dilution ratios.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What is the dilution formula?",
    answer: "The dilution formula is C1V1 = C2V2. This means the initial concentration times initial volume equals final concentration times final volume. The amount of solute stays constant — you're just adding more solvent.",
  },
{
    question: "How do I calculate dilution factor?",
    answer: "Dilution factor equals V2/V1 or C1/C2. A 1:10 dilution has a dilution factor of 10. If you mix 1 mL stock with 9 mL water, total volume is 10 mL, so dilution factor is 10/1 = 10.",
  },
{
    question: "What is a serial dilution?",
    answer: "Serial dilution means performing multiple dilutions in sequence. Take 1 mL from tube 1, add to 9 mL in tube 2 (1:10). Take 1 mL from tube 2, add to 9 mL in tube 3 (1:100 cumulative). This creates a concentration series for standard curves.",
  },
{
    question: "Do units matter for dilution calculations?",
    answer: "Yes, but only for consistency. C1 and C2 must use the same units (both M, both mM, etc.). V1 and V2 must use the same units (both mL, both L, etc.). The formula works with any concentration and volume units as long as they match.",
  },
{
    question: "How do I make a 1:100 dilution?",
    answer: "For a 1:100 dilution, mix 1 part stock with 99 parts diluent. For 10 mL total: add 0.1 mL (100 uL) stock to 9.9 mL diluent. For 100 mL total: add 1 mL stock to 99 mL diluent.",
  }
  ]} />
</section>
    </div>
  );
}
