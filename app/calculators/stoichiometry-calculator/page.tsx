"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function StoichiometryCalculator() {
  const [mode, setMode] = useState<"mol-to-mol" | "g-to-g" | "mol-to-g" | "g-to-mol">("mol-to-mol");
  const [givenMoles, setGivenMoles] = useState<string>("");
  const [givenGrams, setGivenGrams] = useState<string>("");
  const [givenCoeff, setGivenCoeff] = useState<string>("1");
  const [unknownCoeff, setUnknownCoeff] = useState<string>("1");
  const [givenMolarMass, setGivenMolarMass] = useState<string>("");
  const [unknownMolarMass, setUnknownMolarMass] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const calculate = () => {
    const gCoeff = parseFloat(givenCoeff);
    const uCoeff = parseFloat(unknownCoeff);
    const gMolarMass = parseFloat(givenMolarMass) || 0;
    const uMolarMass = parseFloat(unknownMolarMass) || 0;

    if (mode === "mol-to-mol") {
      const gMoles = parseFloat(givenMoles);
      if (gMoles > 0 && gCoeff > 0 && uCoeff > 0) {
        const uMoles = (gMoles * uCoeff) / gCoeff;
        setResult({ value: Math.round(uMoles * 1000) / 1000, unit: "mol", label: "Moles of Product/Reactant" });
        generateMolGraph(gMoles, gCoeff, uCoeff);
      }
    } else if (mode === "g-to-g") {
      const gGrams = parseFloat(givenGrams);
      if (gGrams > 0 && gCoeff > 0 && uCoeff > 0 && gMolarMass > 0 && uMolarMass > 0) {
        const gMoles = gGrams / gMolarMass;
        const uMoles = (gMoles * uCoeff) / gCoeff;
        const uGrams = uMoles * uMolarMass;
        setResult({ value: Math.round(uGrams * 100) / 100, unit: "g", label: "Mass of Product/Reactant" });
        generateMassGraph(gGrams, gMolarMass, uMolarMass, gCoeff, uCoeff);
      }
    } else if (mode === "mol-to-g") {
      const gMoles = parseFloat(givenMoles);
      if (gMoles > 0 && gCoeff > 0 && uCoeff > 0 && uMolarMass > 0) {
        const uMoles = (gMoles * uCoeff) / gCoeff;
        const uGrams = uMoles * uMolarMass;
        setResult({ value: Math.round(uGrams * 100) / 100, unit: "g", label: "Mass from Moles" });
      }
    } else if (mode === "g-to-mol") {
      const gGrams = parseFloat(givenGrams);
      if (gGrams > 0 && gCoeff > 0 && uCoeff > 0 && gMolarMass > 0) {
        const gMoles = gGrams / gMolarMass;
        const uMoles = (gMoles * uCoeff) / gCoeff;
        setResult({ value: Math.round(uMoles * 1000) / 1000, unit: "mol", label: "Moles from Mass" });
      }
    }
  };

  const generateMolGraph = (gMoles: number, gCoeff: number, uCoeff: number) => {
    const data = [];
    for (let m = gMoles * 0.5; m <= gMoles * 2; m += gMoles / 10) {
      const uMoles = (m * uCoeff) / gCoeff;
      data.push({ givenMoles: Math.round(m * 100) / 100, unknownMoles: Math.round(uMoles * 100) / 100 });
    }
    setGraphData(data);
  };

  const generateMassGraph = (gGrams: number, gMM: number, uMM: number, gC: number, uC: number) => {
    const data = [];
    for (let g = gGrams * 0.5; g <= gGrams * 2; g += gGrams / 10) {
      const gMoles = g / gMM;
      const uMoles = (gMoles * uC) / gC;
      const uGrams = uMoles * uMM;
      data.push({ givenMass: Math.round(g * 10) / 10, unknownMass: Math.round(uGrams * 10) / 10 });
    }
    setGraphData(data);
  };

  const reset = () => {
    setGivenMoles("");
    setGivenGrams("");
    setGivenCoeff("1");
    setUnknownCoeff("1");
    setGivenMolarMass("");
    setUnknownMolarMass("");
    setResult(null);
    setGraphData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Calculation Type</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mol-to-mol">Moles to Moles</SelectItem>
                  <SelectItem value="g-to-g">Grams to Grams</SelectItem>
                  <SelectItem value="mol-to-g">Moles to Grams</SelectItem>
                  <SelectItem value="g-to-mol">Grams to Moles</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Coefficient of Given Substance</Label>
                <Input type="number" value={givenCoeff} onChange={(e) => setGivenCoeff(e.target.value)} />
              </div>
              <div>
                <Label>Coefficient of Unknown Substance</Label>
                <Input type="number" value={unknownCoeff} onChange={(e) => setUnknownCoeff(e.target.value)} />
              </div>
            </div>

            {(mode === "mol-to-mol" || mode === "mol-to-g") && (
              <div>
                <Label>Moles of Given Substance (mol)</Label>
                <Input type="number" placeholder="e.g., 2.5" value={givenMoles} onChange={(e) => setGivenMoles(e.target.value)} />
              </div>
            )}

            {(mode === "g-to-g" || mode === "g-to-mol") && (
              <>
                <div>
                  <Label>Mass of Given Substance (g)</Label>
                  <Input type="number" placeholder="e.g., 10" value={givenGrams} onChange={(e) => setGivenGrams(e.target.value)} />
                </div>
                <div>
                  <Label>Molar Mass of Given Substance (g/mol)</Label>
                  <Input type="number" placeholder="e.g., 180.16" value={givenMolarMass} onChange={(e) => setGivenMolarMass(e.target.value)} />
                </div>
              </>
            )}

            {(mode === "g-to-g" || mode === "mol-to-g") && (
              <div>
                <Label>Molar Mass of Unknown Substance (g/mol)</Label>
                <Input type="number" placeholder="e.g., 44.01" value={unknownMolarMass} onChange={(e) => setUnknownMolarMass(e.target.value)} />
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
          <CardTitle>What is Stoichiometry?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Stoichiometry calculates the quantities of reactants and products in chemical reactions. You use balanced chemical equations to determine mole ratios between substances. These ratios let you convert between amounts of different reactants and products.</p>

          <h3 className="text-xl font-semibold">Stoichiometry Steps</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Write and balance the chemical equation</li>
            <li>Convert given quantities to moles</li>
            <li>Use mole ratios from coefficients to find moles of unknown</li>
            <li>Convert moles of unknown to desired units</li>
          </ol>

          <h3 className="text-xl font-semibold">Example: Combustion of Methane</h3>
          <div className="p-4 bg-muted rounded-md font-mono">
            CH₄ + 2O₂ → CO₂ + 2H₂O
          </div>
          <p>From this equation:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>1 mole CH₄ reacts with 2 moles O₂</li>
            <li>1 mole CH₄ produces 1 mole CO₂ and 2 moles H₂O</li>
            <li>Mole ratio CH₄:O₂:CO₂:H₂O = 1:2:1:2</li>
          </ul>

          <h3 className="text-xl font-semibold">Stoichiometry Example Problem</h3>
          <p>How many grams of CO₂ form from 16 g of CH₄?</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Convert 16 g CH₄ to moles: 16 g / 16.04 g/mol = 1.0 mol CH₄</li>
            <li>Use mole ratio: 1 mol CH₄ produces 1 mol CO₂</li>
            <li>Convert to grams: 1.0 mol × 44.01 g/mol = 44.01 g CO₂</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reactant to Product Relationship</CardTitle>
          <CardDescription>Graph showing the stoichiometric relationship</CardDescription>
        </CardHeader>
        <CardContent>
          {graphData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={graphData[0]?.givenMoles !== undefined ? "givenMoles" : "givenMass"} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={graphData[0]?.unknownMoles !== undefined ? "unknownMoles" : "unknownMass"} fill="#8884d8" />
              </BarChart>
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
          <CardTitle>Common Mole Ratios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Reaction</th>
                  <th className="p-2 text-left">Reactant Ratio</th>
                  <th className="p-2 text-left">Product Ratio</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">2H₂ + O₂ → 2H₂O</td>
                  <td className="p-2">2:1 (H₂:O₂)</td>
                  <td className="p-2">2 (H₂O)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">N₂ + 3H₂ → 2NH₃</td>
                  <td className="p-2">1:3 (N₂:H₂)</td>
                  <td className="p-2">2 (NH₃)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">2KClO₃ → 2KCl + 3O₂</td>
                  <td className="p-2">2 (KClO₃)</td>
                  <td className="p-2">2:3 (KCl:O₂)</td>
                </tr>
                <tr>
                  <td className="p-2">C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O</td>
                  <td className="p-2">1:6</td>
                  <td className="p-2">6:6 (CO₂:H₂O)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stoichiometry Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Determining reactant amounts in industrial synthesis</li>
            <li>Calculating theoretical and percent yield</li>
            <li>Identifying limiting reactants in reactions</li>
            <li>Scaling up laboratory reactions to production</li>
            <li>Environmental pollution calculations</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">What is stoichiometry used for?</h4>
            <p className="text-sm text-muted-foreground mt-1">Stoichiometry calculates the exact amounts of reactants needed and products formed in chemical reactions. Chemists use it to determine how much of each chemical to mix, predict reaction yields, and scale up from lab experiments to industrial production.</p>
          </div>
          <div>
            <h4 className="font-semibold">Why must chemical equations be balanced?</h4>
            <p className="text-sm text-muted-foreground mt-1">Balanced equations obey the law of conservation of mass—atoms aren't created or destroyed. The coefficients give you the mole ratios needed for stoichiometric calculations. An unbalanced equation gives wrong ratios and incorrect results.</p>
          </div>
          <div>
            <h4 className="font-semibold">What is a mole ratio?</h4>
            <p className="text-sm text-muted-foreground mt-1">A mole ratio is the ratio of coefficients between any two substances in a balanced equation. In 2H₂ + O₂ → 2H₂O, the H₂:O₂ ratio is 2:1, meaning 2 moles of hydrogen react with 1 mole of oxygen. Use these ratios to convert between substances.</p>
          </div>
          <div>
            <h4 className="font-semibold">How do you find the limiting reactant?</h4>
            <p className="text-sm text-muted-foreground mt-1">Calculate how much product each reactant could produce if fully consumed. The reactant that produces the least product is limiting—it runs out first and determines the maximum yield. Any excess reactant remains after the reaction stops.</p>
          </div>
          <div>
            <h4 className="font-semibold">What is the difference between theoretical and actual yield?</h4>
            <p className="text-sm text-muted-foreground mt-1">Theoretical yield is the maximum amount calculated from stoichiometry assuming perfect conditions. Actual yield is what you really get in the lab—always less due to incomplete reactions, side reactions, and losses during purification. Percent yield = (actual/theoretical) × 100%.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <a href="/calculators/ph-calculator" className="text-primary hover:underline">
                pH Calculator
              </a>{" "}
              — Calculate pH, pOH, and hydrogen ion concentration for acid-base solutions
            </li>
            <li>
              <a href="/calculators/molarity-calculator" className="text-primary hover:underline">
                Molarity Calculator
              </a>{" "}
              — Calculate solution concentration, moles, and volume for chemistry problems
            </li>
            <li>
              <a href="/calculators/kinetic-energy-calculator" className="text-primary hover:underline">
                Kinetic Energy Calculator
              </a>{" "}
              — Calculate kinetic energy, mass, or velocity for moving objects
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
