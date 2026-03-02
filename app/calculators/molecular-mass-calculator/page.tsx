"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const ELEMENTS: Record<string, number> = {
  H: 1.008, He: 4.003, Li: 6.941, Be: 9.012, B: 10.81, C: 12.01, N: 14.01, O: 15.999,
  F: 18.998, Ne: 20.18, Na: 22.99, Mg: 24.31, Al: 26.98, Si: 28.09, P: 30.97, S: 32.07,
  Cl: 35.45, K: 39.10, Ca: 40.08, Fe: 55.85, Cu: 63.55, Zn: 65.38, Br: 79.90, Ag: 107.87,
  I: 126.90, Au: 196.97, Hg: 200.59, Pb: 207.2
};

export default function MolecularMassCalculator() {
  const [formula, setFormula] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [barData, setBarData] = useState<any[]>([]);

  const parseFormula = (formula: string) => {
    const regex = /([A-Z][a-z]?)(\d*)/g;
    const elements: Record<string, number> = {};
    let match;
    
    while ((match = regex.exec(formula)) !== null) {
      const element = match[1];
      const count = match[2] ? parseInt(match[2]) : 1;
      elements[element] = (elements[element] || 0) + count;
    }
    
    return elements;
  };

  const calculate = () => {
    const elements = parseFormula(formula);
    if (Object.keys(elements).length === 0) return;

    let totalMass = 0;
    const breakdown = [];
    
    for (const [symbol, count] of Object.entries(elements)) {
      const atomicMass = ELEMENTS[symbol] || 0;
      const mass = atomicMass * count;
      totalMass += mass;
      breakdown.push({ element: symbol, count, mass: Math.round(mass * 100) / 100, atomicMass });
    }

    setResult({ totalMass: Math.round(totalMass * 100) / 100, breakdown });
    setBarData(breakdown.map(b => ({ element: b.element, mass: b.mass })));
  };

  const reset = () => {
    setFormula("");
    setResult(null);
    setBarData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Molecular Mass Calculator – Calculate Molar Mass of Any Compound</CardTitle>
          <CardDescription>
            Calculate the molecular mass of any chemical compound by entering its formula. Our molecular mass calculator uses atomic weights to deliver accurate molar mass in g/mol instantly. Useful for chemistry students and lab professionals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Chemical Formula</Label>
              <Input 
                placeholder="e.g., H2O, C6H12O6, H2SO4" 
                value={formula} 
                onChange={(e) => setFormula(e.target.value)} 
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Molar Mass</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Molar Mass</p>
                <p className="text-5xl font-bold mt-2">{result.totalMass} g/mol</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What is Molecular Mass?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Molecular mass (or molar mass) is the sum of atomic masses of all atoms in a molecule. You express it in grams per mole (g/mol). The molar mass lets you convert between mass and moles of a substance.</p>

          <h3 className="text-xl font-semibold">How to Calculate Molar Mass</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Identify each element in the chemical formula</li>
            <li>Count the number of atoms of each element</li>
            <li>Find the atomic mass of each element from the periodic table</li>
            <li>Multiply atomic mass by the number of atoms</li>
            <li>Add all the masses together</li>
          </ol>

          <h3 className="text-xl font-semibold">Example: Water (H₂O)</h3>
          <div className="p-4 bg-muted rounded-md">
            <p>2 H atoms × 1.008 g/mol = 2.016 g/mol</p>
            <p>1 O atom × 15.999 g/mol = 15.999 g/mol</p>
            <p className="font-bold mt-2">Total = 18.015 g/mol</p>
          </div>

          <h3 className="text-xl font-semibold">Example: Glucose (C₆H₁₂O₆)</h3>
          <div className="p-4 bg-muted rounded-md">
            <p>6 C atoms × 12.01 g/mol = 72.06 g/mol</p>
            <p>12 H atoms × 1.008 g/mol = 12.096 g/mol</p>
            <p>6 O atoms × 15.999 g/mol = 95.994 g/mol</p>
            <p className="font-bold mt-2">Total = 180.15 g/mol</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mass Breakdown by Element</CardTitle>
        </CardHeader>
        <CardContent>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="element" />
                <YAxis label={{ value: "Mass (g/mol)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="mass" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Enter a formula and calculate to see the breakdown</p>
            </div>
          )}
        </CardContent>
      </Card>

      {result && result.breakdown && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Mass Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">Element</th>
                    <th className="p-2 text-left">Atomic Mass</th>
                    <th className="p-2 text-left">Count</th>
                    <th className="p-2 text-left">Total Mass</th>
                    <th className="p-2 text-left">Percent</th>
                  </tr>
                </thead>
                <tbody>
                  {result.breakdown.map((item: any, i: number) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">{item.element}</td>
                      <td className="p-2">{item.atomicMass} g/mol</td>
                      <td className="p-2">{item.count}</td>
                      <td className="p-2">{item.mass} g/mol</td>
                      <td className="p-2">{Math.round((item.mass / result.totalMass) * 100)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Common Atomic Masses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(ELEMENTS).slice(0, 20).map(([symbol, mass]) => (
              <div key={symbol} className="p-2 bg-muted rounded text-sm text-center">
                <span className="font-bold">{symbol}</span>: {mass}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
