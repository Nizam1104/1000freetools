"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function MolarityCalculator() {
  const [mode, setMode] = useState<"find-molarity" | "find-moles" | "find-volume">("find-molarity");
  const [moles, setMoles] = useState<string>("");
  const [volume, setVolume] = useState<string>("");
  const [molarity, setMolarity] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const calculate = () => {
    const n = parseFloat(moles);
    const V = parseFloat(volume) / 1000;
    const M = parseFloat(molarity);

    if (mode === "find-molarity" && n > 0 && V > 0) {
      const molarityValue = n / V;
      setResult({ value: Math.round(molarityValue * 1000) / 1000, unit: "mol/L (M)" });
      generateMolarityGraph(n, V);
    } else if (mode === "find-moles" && M > 0 && V > 0) {
      const molesValue = M * V;
      setResult({ value: Math.round(molesValue * 1000) / 1000, unit: "mol" });
      generateMolesGraph(M, V);
    } else if (mode === "find-volume" && n > 0 && M > 0) {
      const volumeValue = (n / M) * 1000;
      setResult({ value: Math.round(volumeValue * 100) / 100, unit: "mL" });
      generateVolumeGraph(n, M);
    }
  };

  const generateMolarityGraph = (n: number, V: number) => {
    const data = [];
    for (let v = 0.1; v <= V * 2; v += V / 10) {
      data.push({ volume: Math.round(v * 1000), molarity: Math.round((n / v) * 100) / 100 });
    }
    setGraphData(data);
  };

  const generateMolesGraph = (M: number, V: number) => {
    const data = [];
    for (let v = 0.1; v <= V * 2; v += V / 10) {
      data.push({ volume: Math.round(v * 1000), moles: Math.round((M * v) * 100) / 100 });
    }
    setGraphData(data);
  };

  const generateVolumeGraph = (n: number, M: number) => {
    const data = [];
    for (let m = 0.1; m <= M * 2; m += M / 10) {
      data.push({ molarity: Math.round(m * 100) / 100, volume: Math.round(((n / m) * 1000) * 10) / 10 });
    }
    setGraphData(data);
  };

  const reset = () => {
    setMoles("");
    setVolume("");
    setMolarity("");
    setResult(null);
    setGraphData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Molarity Calculator – Calculate Molar Concentration Instantly</CardTitle>
          <CardDescription>
            Use our free molarity calculator to find the molar concentration of a solution. Enter moles of solute and volume of solution to get accurate results in seconds. Perfect for chemistry students, lab technicians, and researchers.
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
                  <SelectItem value="find-molarity">Find Molarity (M)</SelectItem>
                  <SelectItem value="find-moles">Find Moles (n)</SelectItem>
                  <SelectItem value="find-volume">Find Volume (V)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "find-molarity" && (
              <>
                <div>
                  <Label>Moles of Solute (mol)</Label>
                  <Input type="number" placeholder="e.g., 0.5" value={moles} onChange={(e) => setMoles(e.target.value)} />
                </div>
                <div>
                  <Label>Volume of Solution (mL)</Label>
                  <Input type="number" placeholder="e.g., 500" value={volume} onChange={(e) => setVolume(e.target.value)} />
                </div>
              </>
            )}

            {mode === "find-moles" && (
              <>
                <div>
                  <Label>Molarity (mol/L)</Label>
                  <Input type="number" placeholder="e.g., 2.0" value={molarity} onChange={(e) => setMolarity(e.target.value)} />
                </div>
                <div>
                  <Label>Volume of Solution (mL)</Label>
                  <Input type="number" placeholder="e.g., 250" value={volume} onChange={(e) => setVolume(e.target.value)} />
                </div>
              </>
            )}

            {mode === "find-volume" && (
              <>
                <div>
                  <Label>Moles of Solute (mol)</Label>
                  <Input type="number" placeholder="e.g., 0.25" value={moles} onChange={(e) => setMoles(e.target.value)} />
                </div>
                <div>
                  <Label>Molarity (mol/L)</Label>
                  <Input type="number" placeholder="e.g., 1.5" value={molarity} onChange={(e) => setMolarity(e.target.value)} />
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-4xl font-bold mt-1">{result.value} {result.unit}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What is Molarity?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Molarity measures the concentration of a solution. You express it as moles of solute per liter of solution. The symbol for molarity is M. Chemists use molarity to prepare solutions with precise concentrations for experiments and reactions.</p>
          
          <h3 className="text-xl font-semibold">Molarity Formula</h3>
          <div className="p-4 bg-muted rounded-md font-mono text-center">
            M = n / V
          </div>
          <p>Where:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>M = Molarity (mol/L or M)</li>
            <li>n = Number of moles of solute (mol)</li>
            <li>V = Volume of solution (L)</li>
          </ul>

          <h3 className="text-xl font-semibold">How to Calculate Molarity</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Determine the number of moles of solute dissolved</li>
            <li>Measure the total volume of the solution in liters</li>
            <li>Divide moles by volume to get molarity</li>
          </ol>

          <h3 className="text-xl font-semibold">Example Calculation</h3>
          <p>You dissolve 0.5 moles of NaCl in 500 mL of water. First convert 500 mL to 0.5 L. Then divide: M = 0.5 mol / 0.5 L = 1.0 M. Your solution has a molarity of 1.0 M.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Molarity and Volume Relationship</CardTitle>
          <CardDescription>Graph showing how molarity changes with volume for a fixed amount of solute</CardDescription>
        </CardHeader>
        <CardContent>
          {graphData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{ value: mode === "find-volume" ? "Molarity (M)" : "Volume (mL)", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: mode === "find-volume" ? "Volume (mL)" : "Molarity (M)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={mode === "find-volume" ? "volume" : mode === "find-moles" ? "moles" : "molarity"} stroke="#8884d8" strokeWidth={2} />
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
          <CardTitle>Molarity Reference Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Moles (mol)</th>
                  <th className="p-2 text-left">Volume (mL)</th>
                  <th className="p-2 text-left">Molarity (M)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">0.1</td>
                  <td className="p-2">100</td>
                  <td className="p-2">1.0</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">0.5</td>
                  <td className="p-2">500</td>
                  <td className="p-2">1.0</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">1.0</td>
                  <td className="p-2">1000</td>
                  <td className="p-2">1.0</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">0.25</td>
                  <td className="p-2">250</td>
                  <td className="p-2">1.0</td>
                </tr>
                <tr>
                  <td className="p-2">2.0</td>
                  <td className="p-2">500</td>
                  <td className="p-2">4.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Molarity Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Preparing standard solutions for titrations</li>
            <li>Calculating reactant amounts in stoichiometry</li>
            <li>Determining concentration in analytical chemistry</li>
            <li>Dilution calculations in laboratory work</li>
            <li>Buffer preparation in biochemistry</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
