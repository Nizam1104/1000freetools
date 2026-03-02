"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function PKaPKbCalculator() {
  const [mode, setMode] = useState<"ka-to-pka" | "pka-to-ka" | "kb-to-pkb" | "pkb-to-kb" | "pka-to-pkb" | "pkb-to-pka">("ka-to-pka");
  const [ka, setKa] = useState<string>("");
  const [kb, setKb] = useState<string>("");
  const [pka, setPka] = useState<string>("");
  const [pkb, setPkb] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const calculate = () => {
    if (mode === "ka-to-pka") {
      const kaValue = parseFloat(ka);
      if (kaValue > 0) {
        const pkaValue = -Math.log10(kaValue);
        setResult({ value: Math.round(pkaValue * 100) / 100, label: "pKa", unit: "" });
        generateKaGraph(kaValue);
      }
    } else if (mode === "pka-to-ka") {
      const pkaValue = parseFloat(pka);
      if (pkaValue > 0) {
        const kaValue = Math.pow(10, -pkaValue);
        setResult({ value: kaValue.toExponential(4), label: "Ka", unit: "" });
        generatePkaGraph(pkaValue);
      }
    } else if (mode === "kb-to-pkb") {
      const kbValue = parseFloat(kb);
      if (kbValue > 0) {
        const pkbValue = -Math.log10(kbValue);
        setResult({ value: Math.round(pkbValue * 100) / 100, label: "pKb", unit: "" });
      }
    } else if (mode === "pkb-to-kb") {
      const pkbValue = parseFloat(pkb);
      if (pkbValue > 0) {
        const kbValue = Math.pow(10, -pkbValue);
        setResult({ value: kbValue.toExponential(4), label: "Kb", unit: "" });
      }
    } else if (mode === "pka-to-pkb") {
      const pkaValue = parseFloat(pka);
      if (pkaValue >= 0 && pkaValue <= 14) {
        const pkbValue = 14 - pkaValue;
        setResult({ value: Math.round(pkbValue * 100) / 100, label: "pKb", unit: "" });
        generateConversionGraph(pkaValue, "pka");
      }
    } else if (mode === "pkb-to-pka") {
      const pkbValue = parseFloat(pkb);
      if (pkbValue >= 0 && pkbValue <= 14) {
        const pkaValue = 14 - pkbValue;
        setResult({ value: Math.round(pkaValue * 100) / 100, label: "pKa", unit: "" });
        generateConversionGraph(pkbValue, "pkb");
      }
    }
  };

  const generateKaGraph = (kaValue: number) => {
    const data = [];
    for (let k = kaValue * 0.1; k <= kaValue * 10; k *= 2) {
      data.push({ ka: k.toExponential(2), pka: Math.round(-Math.log10(k) * 100) / 100 });
    }
    setGraphData(data);
  };

  const generatePkaGraph = (pkaValue: number) => {
    const data = [];
    for (let p = pkaValue - 3; p <= pkaValue + 3; p += 0.5) {
      if (p > 0) {
        data.push({ pka: Math.round(p * 10) / 10, ka: Math.pow(10, -p).toExponential(2) });
      }
    }
    setGraphData(data);
  };

  const generateConversionGraph = (value: number, type: string) => {
    const data = [];
    for (let v = 0; v <= 14; v += 1) {
      data.push({ [type]: v, [type === "pka" ? "pkb" : "pka"]: 14 - v });
    }
    setGraphData(data);
  };

  const reset = () => {
    setKa("");
    setKb("");
    setPka("");
    setPkb("");
    setResult(null);
    setGraphData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>pKa and pKb Calculator – Convert Ka, Kb, pKa, and pKb</CardTitle>
          <CardDescription>
            Convert between Ka, Kb, pKa, and pKb values effortlessly with our pKa/pKb calculator. Use the relationship pKa + pKb = 14 to find acid and base dissociation constants. Essential for acid-base chemistry and biochemistry.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Convert</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ka-to-pka">Ka to pKa</SelectItem>
                  <SelectItem value="pka-to-ka">pKa to Ka</SelectItem>
                  <SelectItem value="kb-to-pkb">Kb to pKb</SelectItem>
                  <SelectItem value="pkb-to-kb">pKb to Kb</SelectItem>
                  <SelectItem value="pka-to-pkb">pKa to pKb</SelectItem>
                  <SelectItem value="pkb-to-pka">pKb to pKa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "ka-to-pka" && (
              <div>
                <Label>Ka (Acid Dissociation Constant)</Label>
                <Input type="number" placeholder="e.g., 1.8e-5" value={ka} onChange={(e) => setKa(e.target.value)} />
              </div>
            )}

            {mode === "pka-to-ka" && (
              <div>
                <Label>pKa</Label>
                <Input type="number" step="0.1" placeholder="e.g., 4.76" value={pka} onChange={(e) => setPka(e.target.value)} />
              </div>
            )}

            {mode === "kb-to-pkb" && (
              <div>
                <Label>Kb (Base Dissociation Constant)</Label>
                <Input type="number" placeholder="e.g., 1.8e-5" value={kb} onChange={(e) => setKb(e.target.value)} />
              </div>
            )}

            {mode === "pkb-to-kb" && (
              <div>
                <Label>pKb</Label>
                <Input type="number" step="0.1" placeholder="e.g., 4.76" value={pkb} onChange={(e) => setPkb(e.target.value)} />
              </div>
            )}

            {mode === "pka-to-pkb" && (
              <div>
                <Label>pKa</Label>
                <Input type="number" step="0.1" placeholder="e.g., 9.25" value={pka} onChange={(e) => setPka(e.target.value)} />
              </div>
            )}

            {mode === "pkb-to-pka" && (
              <div>
                <Label>pKb</Label>
                <Input type="number" step="0.1" placeholder="e.g., 4.75" value={pkb} onChange={(e) => setPkb(e.target.value)} />
              </div>
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
          <CardTitle>Understanding pKa and pKb</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>pKa and pKb are logarithmic measures of acid and base strength. Lower pKa values indicate stronger acids. Lower pKb values indicate stronger bases.</p>

          <h3 className="text-xl font-semibold">Formulas</h3>
          <div className="p-4 bg-muted rounded-md font-mono space-y-2">
            <div>pKa = -log₁₀(Ka)</div>
            <div>pKb = -log₁₀(Kb)</div>
            <div>Ka = 10⁻ᵖᴷᵃ</div>
            <div>Kb = 10⁻ᵖᴷᵇ</div>
            <div>pKa + pKb = 14 (at 25°C)</div>
          </div>

          <h3 className="text-xl font-semibold">Acid Strength Guide</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">pKa Range</th>
                  <th className="p-2 text-left">Acid Strength</th>
                  <th className="p-2 text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">&lt; 0</td>
                  <td className="p-2">Very Strong</td>
                  <td className="p-2">HCl (-7)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">0-3</td>
                  <td className="p-2">Strong</td>
                  <td className="p-2">H₃PO₄ (2.1)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">3-7</td>
                  <td className="p-2">Moderate</td>
                  <td className="p-2">Acetic acid (4.76)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">7-14</td>
                  <td className="p-2">Weak</td>
                  <td className="p-2">NH₄⁺ (9.25)</td>
                </tr>
                <tr>
                  <td className="p-2">&gt; 14</td>
                  <td className="p-2">Very Weak</td>
                  <td className="p-2">H₂O (15.7)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Example: Acetic Acid</h3>
          <p>Ka = 1.8 × 10⁻⁵</p>
          <p>pKa = -log₁₀(1.8 × 10⁻⁵) = 4.74</p>
          <p>pKb = 14 - 4.74 = 9.26</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>pKa and Ka Relationship</CardTitle>
        </CardHeader>
        <CardContent>
          {graphData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={graphData[0]?.ka ? "ka" : "pka"} label={{ value: graphData[0]?.ka ? "Ka" : "pKa", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: graphData[0]?.ka ? "pKa" : "Ka", angle: -90, position: "insideLeft" }} dataKey={graphData[0]?.ka ? "pka" : "ka"} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={graphData[0]?.ka ? "pka" : "ka"} stroke="#8884d8" strokeWidth={2} />
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
          <CardTitle>Common pKa Values</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Acid</th>
                  <th className="p-2 text-left">Formula</th>
                  <th className="p-2 text-left">pKa</th>
                  <th className="p-2 text-left">Ka</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Hydrochloric</td>
                  <td className="p-2">HCl</td>
                  <td className="p-2">-7</td>
                  <td className="p-2">10⁷</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Acetic</td>
                  <td className="p-2">CH₃COOH</td>
                  <td className="p-2">4.76</td>
                  <td className="p-2">1.8 × 10⁻⁵</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Carbonic</td>
                  <td className="p-2">H₂CO₃</td>
                  <td className="p-2">6.35</td>
                  <td className="p-2">4.5 × 10⁻⁷</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Ammonium</td>
                  <td className="p-2">NH₄⁺</td>
                  <td className="p-2">9.25</td>
                  <td className="p-2">5.6 × 10⁻¹⁰</td>
                </tr>
                <tr>
                  <td className="p-2">Water</td>
                  <td className="p-2">H₂O</td>
                  <td className="p-2">15.7</td>
                  <td className="p-2">2 × 10⁻¹⁶</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
