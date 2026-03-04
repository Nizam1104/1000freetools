"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function ElectrochemicalCellPotentialCalculator() {
  const [cathodePotential, setCathodePotential] = useState<string>("");
  const [anodePotential, setAnodePotential] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [barData, setBarData] = useState<any[]>([]);

  const calculate = () => {
    const Ecathode = parseFloat(cathodePotential);
    const Eanode = parseFloat(anodePotential);

    if (!isNaN(Ecathode) && !isNaN(Eanode)) {
      const Ecell = Ecathode - Eanode;
      const spontaneous = Ecell > 0;
      setResult({
        Ecell: Math.round(Ecell * 1000) / 1000,
        spontaneous,
        type: spontaneous ? "Galvanic (Voltaic)" : "Electrolytic"
      });
      setBarData([
        { name: "Cathode", potential: Ecathode },
        { name: "Anode", potential: Eanode },
        { name: "E°cell", potential: Ecell }
      ]);
    }
  };

  const reset = () => {
    setCathodePotential("");
    setAnodePotential("");
    setResult(null);
    setBarData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Electrochemical Cell Potential Calculator – Calculate EMF of Galvanic Cells</CardTitle>
          <CardDescription>
            Find the standard cell potential (EMF) of galvanic or electrolytic cells using our electrochemical calculator. Enter reduction potentials for cathode and anode to get the cell voltage. Perfect for electrochemistry and physical chemistry students.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Cathode Reduction Potential E° (V)</Label>
              <Input type="number" step="0.01" placeholder="e.g., 0.34" value={cathodePotential} onChange={(e) => setCathodePotential(e.target.value)} />
            </div>
            <div>
              <Label>Anode Reduction Potential E° (V)</Label>
              <Input type="number" step="0.01" placeholder="e.g., -0.76" value={anodePotential} onChange={(e) => setAnodePotential(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Cell Potential</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Cell Potential E°cell</p>
                  <p className="text-4xl font-bold">{result.Ecell} V</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Cell Type</p>
                    <p className="text-lg font-semibold">{result.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Spontaneous</p>
                    <p className="text-lg font-semibold">{result.spontaneous ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Cell Potential</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Cell potential (EMF) measures the voltage difference between two half-cells in an electrochemical cell. It tells you whether a redox reaction will occur spontaneously.</p>

          <h3 className="text-xl font-semibold">Cell Potential Formula</h3>
          <div className="p-4 bg-muted rounded-md font-mono text-center">
            E°cell = E°cathode - E°anode
          </div>
          <p>Where:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>E°cell = Standard cell potential (volts)</li>
            <li>E°cathode = Standard reduction potential at cathode</li>
            <li>E°anode = Standard reduction potential at anode</li>
          </ul>

          <h3 className="text-xl font-semibold">Cell Types</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">E°cell</th>
                  <th className="p-2 text-left">Cell Type</th>
                  <th className="p-2 text-left">Reaction</th>
                  <th className="p-2 text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Positive (+)</td>
                  <td className="p-2">Galvanic/Voltaic</td>
                  <td className="p-2">Spontaneous</td>
                  <td className="p-2">Batteries</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Negative (-)</td>
                  <td className="p-2">Electrolytic</td>
                  <td className="p-2">Non-spontaneous</td>
                  <td className="p-2">Electroplating</td>
                </tr>
                <tr>
                  <td className="p-2">Zero (0)</td>
                  <td className="p-2">Equilibrium</td>
                  <td className="p-2">No net reaction</td>
                  <td className="p-2">Dead battery</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Example: Daniell Cell</h3>
          <p>Cathode: Cu²⁺ + 2e⁻ → Cu (E° = +0.34 V)</p>
          <p>Anode: Zn → Zn²⁺ + 2e⁻ (E° = -0.76 V)</p>
          <p>E°cell = 0.34 V - (-0.76 V) = 1.10 V (spontaneous)</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Standard Reduction Potentials Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Half-Reaction</th>
                  <th className="p-2 text-left">E° (V)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Li⁺ + e⁻ → Li</td>
                  <td className="p-2">-3.04</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Zn²⁺ + 2e⁻ → Zn</td>
                  <td className="p-2">-0.76</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Fe²⁺ + 2e⁻ → Fe</td>
                  <td className="p-2">-0.44</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">2H⁺ + 2e⁻ → H₂</td>
                  <td className="p-2">0.00</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Cu²⁺ + 2e⁻ → Cu</td>
                  <td className="p-2">+0.34</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Ag⁺ + e⁻ → Ag</td>
                  <td className="p-2">+0.80</td>
                </tr>
                <tr>
                  <td className="p-2">F₂ + 2e⁻ → 2F⁻</td>
                  <td className="p-2">+2.87</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cell Potential Diagram</CardTitle>
        </CardHeader>
        <CardContent>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Potential (V)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="potential" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Enter values and calculate to see the chart</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Cell Potential</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Step 1:</strong> Find the standard reduction potential for the cathode (where reduction occurs).
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 2:</strong> Find the standard reduction potential for the anode (where oxidation occurs).
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 3:</strong> Subtract anode potential from cathode potential to get the cell voltage.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Electrochemical Cells</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What Is Cell Potential</h4>
            <p className="text-sm text-muted-foreground">
              Cell potential, also called electromotive force (EMF), measures the voltage difference between two electrodes. It tells you whether electrons will flow spontaneously from anode to cathode. Positive voltage means the reaction happens on its own - like in a battery. Negative voltage means you need to supply energy - like in electroplating.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Galvanic vs Electrolytic Cells</h4>
            <p className="text-sm text-muted-foreground mb-3">
              The sign of E°cell determines the cell type:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-md">
                <p className="font-semibold text-sm mb-2">Galvanic (Voltaic) Cells</p>
                <p className="text-xs text-muted-foreground">
                  E°cell &gt; 0. Chemical energy becomes electrical energy. Examples: AA batteries, car batteries, fuel cells. These discharge spontaneously.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p className="font-semibold text-sm mb-2">Electrolytic Cells</p>
                <p className="text-xs text-muted-foreground">
                  E°cell &lt; 0. Electrical energy drives chemical changes. Examples: electroplating, water splitting, aluminum production. These need external power.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Real-World Applications</h4>
            <p className="text-sm text-muted-foreground">
              Battery designers use cell potential calculations to predict voltage output. Corrosion engineers calculate potentials to understand rust formation. Electroplaters use these values to determine if a coating process will work without external power.
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
            <h4 className="font-semibold text-sm mb-2">How do you calculate electrochemical cell potential?</h4>
            <p className="text-sm text-muted-foreground">
              Use E°cell = E°cathode - E°anode. Look up standard reduction potentials in a table, then subtract the anode value from the cathode value. For a Daniell cell with Cu²⁺/Cu (0.34V) and Zn²⁺/Zn (-0.76V), you get 0.34 - (-0.76) = 1.10V.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">What does a positive cell potential mean?</h4>
            <p className="text-sm text-muted-foreground">
              Positive E°cell means the reaction is spontaneous - electrons flow from anode to cathode without external power. This is how batteries work. Negative E°cell means you need to apply voltage to make the reaction happen, like in electroplating.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Is the anode positive or negative?</h4>
            <p className="text-sm text-muted-foreground">
              In a galvanic cell, the anode is negative (electrons flow out). In an electrolytic cell, the anode is positive (connected to power supply positive). Remember: oxidation always happens at the anode, regardless of cell type.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">What affects cell potential?</h4>
            <p className="text-sm text-muted-foreground">
              Temperature, ion concentration, and pressure (for gases) all affect cell potential. The Nernst equation calculates potential under non-standard conditions. Standard potentials assume 25°C, 1M concentrations, and 1 atm pressure.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Why is standard hydrogen electrode potential zero?</h4>
            <p className="text-sm text-muted-foreground">
              The standard hydrogen electrode (SHE) is defined as 0.00V by convention. It serves as the reference point for all other reduction potentials. Think of it like sea level for altitude measurements - arbitrary but useful for comparison.
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
            <a href="/calculators/ph-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">pH Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate acidity and alkalinity</p>
            </a>
            <a href="/calculators/molarity-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Molarity Calculator</p>
              <p className="text-xs text-muted-foreground">Find solution concentrations</p>
            </a>
            <a href="/calculators/concentration-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Concentration Calculator</p>
              <p className="text-xs text-muted-foreground">Convert between concentration units</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
