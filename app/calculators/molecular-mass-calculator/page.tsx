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

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use This Molecular Mass Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">1</div>
              <div>
                <p className="font-medium text-foreground">Enter the chemical formula</p>
                <p>Use standard notation: H2O for water, C6H12O6 for glucose, H2SO4 for sulfuric acid.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">2</div>
              <div>
                <p className="font-medium text-foreground">Click Calculate Molar Mass</p>
                <p>The calculator parses the formula and looks up atomic masses from the periodic table.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">3</div>
              <div>
                <p className="font-medium text-foreground">View the breakdown</p>
                <p>See the total molar mass and how much each element contributes.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Common Atomic Masses Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 font-semibold">Element</th>
                  <th className="text-left py-2 px-2 font-semibold">Symbol</th>
                  <th className="text-left py-2 px-2 font-semibold">Atomic Mass (g/mol)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2 px-2">Hydrogen</td>
                  <td className="py-2 px-2">H</td>
                  <td className="py-2 px-2">1.008</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Carbon</td>
                  <td className="py-2 px-2">C</td>
                  <td className="py-2 px-2">12.01</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Nitrogen</td>
                  <td className="py-2 px-2">N</td>
                  <td className="py-2 px-2">14.01</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Oxygen</td>
                  <td className="py-2 px-2">O</td>
                  <td className="py-2 px-2">15.999</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Sodium</td>
                  <td className="py-2 px-2">Na</td>
                  <td className="py-2 px-2">22.99</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Chlorine</td>
                  <td className="py-2 px-2">Cl</td>
                  <td className="py-2 px-2">35.45</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Iron</td>
                  <td className="py-2 px-2">Fe</td>
                  <td className="py-2 px-2">55.85</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Why Molar Mass Matters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Molar mass connects the microscopic world of atoms to the macroscopic world of grams. It tells you how much one mole (6.022 × 10²³ particles) of a substance weighs.
          </p>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Converting grams to moles</p>
                <p>moles = mass (g) / molar mass (g/mol). Essential for stoichiometry calculations.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Preparing solutions</p>
                <p>To make 1 L of 1 M NaCl, you need 58.44 g (the molar mass of NaCl).</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Determining empirical formulas</p>
                <p>Compare mass percentages to find the simplest whole-number ratio of atoms.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">How do I calculate molar mass manually?</h4>
            <p className="text-xs text-muted-foreground">
              List each element in the formula. Find its atomic mass on the periodic table. Multiply by the number of atoms (subscript). Add all the masses. For H₂O: (2 × 1.008) + (1 × 15.999) = 18.015 g/mol.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">What's the difference between molecular mass and molar mass?</h4>
            <p className="text-xs text-muted-foreground">
              Molecular mass is the mass of one molecule (in atomic mass units, amu). Molar mass is the mass of one mole of molecules (in g/mol). Numerically they're the same, but units differ.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">How do I handle parentheses in formulas?</h4>
            <p className="text-xs text-muted-foreground">
              Multiply everything inside parentheses by the subscript outside. For Ca(OH)₂: Ca = 40.08, O = 2 × 16.00 = 32.00, H = 2 × 1.008 = 2.016. Total = 74.10 g/mol.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Why aren't atomic masses whole numbers?</h4>
            <p className="text-xs text-muted-foreground">
              Atomic masses are weighted averages of all naturally occurring isotopes. Carbon is 12.01 because it's mostly C-12 with about 1% C-13. The average reflects natural abundance.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Can this calculator handle complex formulas?</h4>
            <p className="text-xs text-muted-foreground">
              It handles standard formulas like H2SO4, C6H12O6, and Ca(OH)2. For very complex formulas with nested parentheses or hydrates (like CuSO4·5H2O), calculate each part separately.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-3">
            <a href="/calculators/molarity-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Molarity Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate solution concentration</p>
            </a>
            <a href="/calculators/stoichiometry-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Stoichiometry Calculator</p>
              <p className="text-xs text-muted-foreground">Balance chemical equations</p>
            </a>
            <a href="/calculators/empirical-formula-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Empirical Formula</p>
              <p className="text-xs text-muted-foreground">Find simplest formula from composition</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
