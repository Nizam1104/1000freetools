"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function MolalityCalculator() {
  const [moles, setMoles] = useState<string>("");
  const [solventMass, setSolventMass] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const calculate = () => {
    const n = parseFloat(moles);
    const mass = parseFloat(solventMass) / 1000;

    if (n > 0 && mass > 0) {
      const molality = n / mass;
      setResult({ value: Math.round(molality * 1000) / 1000, unit: "mol/kg (m)" });
      generateGraph(n, mass);
    }
  };

  const generateGraph = (n: number, mass: number) => {
    const data = [];
    for (let m = 0.1; m <= mass * 2; m += mass / 10) {
      data.push({ mass: Math.round(m * 1000), molality: Math.round((n / m) * 100) / 100 });
    }
    setGraphData(data);
  };

  const reset = () => {
    setMoles("");
    setSolventMass("");
    setResult(null);
    setGraphData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Molality Calculator – Find Molality of Any Solution</CardTitle>
          <CardDescription>
            Calculate the molality of a solution quickly with our free molality calculator. Enter moles of solute and mass of solvent in kilograms to get accurate molality values. Ideal for chemistry coursework and laboratory applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Moles of Solute (mol)</Label>
              <Input type="number" placeholder="e.g., 0.5" value={moles} onChange={(e) => setMoles(e.target.value)} />
            </div>
            <div>
              <Label>Mass of Solvent (g)</Label>
              <Input type="number" placeholder="e.g., 250" value={solventMass} onChange={(e) => setSolventMass(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Molality</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Molality</p>
                <p className="text-4xl font-bold mt-1">{result.value} {result.unit}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What is Molality?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Molality expresses the concentration of a solution as moles of solute per kilogram of solvent. The symbol for molality is m. Unlike molarity, molality does not change with temperature because it uses mass instead of volume.</p>

          <h3 className="text-xl font-semibold">Molality Formula</h3>
          <div className="p-4 bg-muted rounded-md font-mono text-center">
            m = n / mass_solvent
          </div>
          <p>Where:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>m = Molality (mol/kg or m)</li>
            <li>n = Number of moles of solute (mol)</li>
            <li>mass_solvent = Mass of solvent (kg)</li>
          </ul>

          <h3 className="text-xl font-semibold">Molality vs Molarity</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Property</th>
                  <th className="p-2 text-left">Molality</th>
                  <th className="p-2 text-left">Molarity</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Unit</td>
                  <td className="p-2">mol/kg</td>
                  <td className="p-2">mol/L</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Temperature dependent</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Yes</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Based on</td>
                  <td className="p-2">Mass of solvent</td>
                  <td className="p-2">Volume of solution</td>
                </tr>
                <tr>
                  <td className="p-2">Symbol</td>
                  <td className="p-2">m</td>
                  <td className="p-2">M</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Example Calculation</h3>
          <p>You dissolve 0.5 moles of glucose in 250 g of water. Convert 250 g to 0.25 kg. Then divide: m = 0.5 mol / 0.25 kg = 2.0 m. Your solution has a molality of 2.0 m.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Molality vs Solvent Mass Graph</CardTitle>
          <CardDescription>Relationship between molality and solvent mass for fixed moles of solute</CardDescription>
        </CardHeader>
        <CardContent>
          {graphData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{ value: "Solvent Mass (g)", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Molality (m)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="molality" stroke="#82ca9d" strokeWidth={2} />
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
          <CardTitle>Molality Reference Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Moles (mol)</th>
                  <th className="p-2 text-left">Solvent Mass (g)</th>
                  <th className="p-2 text-left">Molality (m)</th>
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
                  <td className="p-2">0.5</td>
                  <td className="p-2">250</td>
                  <td className="p-2">2.0</td>
                </tr>
                <tr>
                  <td className="p-2">1.0</td>
                  <td className="p-2">250</td>
                  <td className="p-2">4.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>When to Use Molality</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Colligative property calculations (boiling point elevation, freezing point depression)</li>
            <li>Temperature-dependent studies where volume changes</li>
            <li>Concentrated solutions where volume is not additive</li>
            <li>Physical chemistry and thermodynamics</li>
            <li>Cryoscopic and ebullioscopic measurements</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
