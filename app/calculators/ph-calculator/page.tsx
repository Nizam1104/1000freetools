"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function PHCalculator() {
  const [mode, setMode] = useState<"h-to-ph" | "ph-to-h">("h-to-ph");
  const [hConcentration, setHConcentration] = useState<string>("");
  const [ph, setPh] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const calculate = () => {
    if (mode === "h-to-ph") {
      const h = parseFloat(hConcentration);
      if (h > 0) {
        const phValue = -Math.log10(h);
        setResult({ value: Math.round(phValue * 100) / 100, unit: "", label: "pH" });
        generatePHGraph();
      }
    } else {
      const phValue = parseFloat(ph);
      if (phValue >= 0 && phValue <= 14) {
        const hConc = Math.pow(10, -phValue);
        setResult({ value: hConc.toExponential(4), unit: "mol/L", label: "[H⁺]" });
        generateHGraph();
      }
    }
  };

  const generatePHGraph = () => {
    const data = [];
    for (let h = 1e-14; h <= 1; h *= 10) {
      data.push({ hConc: h.toExponential(2), ph: Math.round(-Math.log10(h) * 100) / 100 });
    }
    setGraphData(data);
  };

  const generateHGraph = () => {
    const data = [];
    for (let p = 0; p <= 14; p += 1) {
      data.push({ ph: p, hConc: Math.pow(10, -p).toExponential(2) });
    }
    setGraphData(data);
  };

  const reset = () => {
    setHConcentration("");
    setPh("");
    setResult(null);
    setGraphData([]);
  };

  const getPHCategory = (phValue: number) => {
    if (phValue < 7) return "Acidic";
    if (phValue === 7) return "Neutral";
    return "Basic (Alkaline)";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>pH Calculator – Calculate pH from H⁺ Concentration</CardTitle>
          <CardDescription>
            Determine the pH of any solution instantly with our pH calculator. Input the hydrogen ion concentration [H⁺] or pH value to convert between them. Great for chemistry students, teachers, and lab professionals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Calculate</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h-to-ph">[H⁺] to pH</SelectItem>
                  <SelectItem value="ph-to-h">pH to [H⁺]</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "h-to-ph" ? (
              <div>
                <Label>Hydrogen Ion Concentration [H⁺] (mol/L)</Label>
                <Input type="number" placeholder="e.g., 1e-7" value={hConcentration} onChange={(e) => setHConcentration(e.target.value)} />
              </div>
            ) : (
              <div>
                <Label>pH Value</Label>
                <Input type="number" placeholder="e.g., 7" value={ph} onChange={(e) => setPh(e.target.value)} />
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
                {mode === "h-to-ph" && parseFloat(hConcentration) > 0 && (
                  <p className="text-lg mt-2">{getPHCategory(-Math.log10(parseFloat(hConcentration)))}</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What is pH?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>pH measures how acidic or basic a solution is. The pH scale ranges from 0 to 14. A pH of 7 is neutral. Values below 7 indicate acidity. Values above 7 indicate alkalinity. The term pH stands for "potential of hydrogen" or "power of hydrogen".</p>

          <h3 className="text-xl font-semibold">pH Formula</h3>
          <div className="p-4 bg-muted rounded-md font-mono text-center">
            pH = -log₁₀[H⁺]
          </div>
          <p>Where:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>pH = Acidity or alkalinity of solution</li>
            <li>[H⁺] = Hydrogen ion concentration (mol/L)</li>
          </ul>

          <h3 className="text-xl font-semibold">pH Scale</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">pH Range</th>
                  <th className="p-2 text-left">Classification</th>
                  <th className="p-2 text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">0-2</td>
                  <td className="p-2">Strongly Acidic</td>
                  <td className="p-2">Battery acid, stomach acid</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">3-5</td>
                  <td className="p-2">Weakly Acidic</td>
                  <td className="p-2">Vinegar, coffee, bananas</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">6</td>
                  <td className="p-2">Slightly Acidic</td>
                  <td className="p-2">Milk, urine</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">7</td>
                  <td className="p-2">Neutral</td>
                  <td className="p-2">Pure water</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">8-9</td>
                  <td className="p-2">Slightly Basic</td>
                  <td className="p-2">Sea water, baking soda</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">10-12</td>
                  <td className="p-2">Weakly Basic</td>
                  <td className="p-2">Soap, ammonia</td>
                </tr>
                <tr>
                  <td className="p-2">13-14</td>
                  <td className="p-2">Strongly Basic</td>
                  <td className="p-2">Bleach, drain cleaner</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Example Calculation</h3>
          <p>A solution has [H⁺] = 1 × 10⁻⁵ mol/L. Calculate pH: pH = -log₁₀(1 × 10⁻⁵) = 5. The solution is acidic with a pH of 5.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>pH and H⁺ Concentration Relationship</CardTitle>
          <CardDescription>Graph showing the logarithmic relationship between pH and hydrogen ion concentration</CardDescription>
        </CardHeader>
        <CardContent>
          {graphData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{ value: mode === "ph-to-h" ? "pH" : "H⁺ Concentration (mol/L)", position: "insideBottom", offset: -5 }} dataKey={mode === "ph-to-h" ? "ph" : "hConc"} />
                <YAxis label={{ value: mode === "ph-to-h" ? "[H⁺] (mol/L)" : "pH", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={mode === "ph-to-h" ? "hConc" : "ph"} stroke="#8884d8" strokeWidth={2} />
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
          <CardTitle>Common pH Values</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Substance</th>
                  <th className="p-2 text-left">pH Value</th>
                  <th className="p-2 text-left">[H⁺] (mol/L)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Gastric acid</td>
                  <td className="p-2">1.5-3.5</td>
                  <td className="p-2">3.2 × 10⁻² to 3.2 × 10⁻⁴</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Lemon juice</td>
                  <td className="p-2">2.0-2.5</td>
                  <td className="p-2">3.2 × 10⁻³ to 1.0 × 10⁻³</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Pure water</td>
                  <td className="p-2">7.0</td>
                  <td className="p-2">1.0 × 10⁻⁷</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Blood</td>
                  <td className="p-2">7.35-7.45</td>
                  <td className="p-2">4.5 × 10⁻⁸ to 3.5 × 10⁻⁸</td>
                </tr>
                <tr>
                  <td className="p-2">Household ammonia</td>
                  <td className="p-2">11-12</td>
                  <td className="p-2">1.0 × 10⁻¹¹ to 1.0 × 10⁻¹²</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>pH Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Monitoring water quality in environmental science</li>
            <li>Controlling soil pH for agriculture</li>
            <li>Maintaining blood pH in medical diagnostics</li>
            <li>Food preservation and safety testing</li>
            <li>Swimming pool maintenance</li>
            <li>Chemical manufacturing processes</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
