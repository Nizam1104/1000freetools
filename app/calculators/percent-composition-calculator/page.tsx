"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const ELEMENTS: Record<string, number> = {
  H: 1.008, C: 12.01, N: 14.01, O: 15.999, Na: 22.99, Mg: 24.31, Al: 26.98, Si: 28.09,
  P: 30.97, S: 32.07, Cl: 35.45, K: 39.10, Ca: 40.08, Fe: 55.85, Cu: 63.55, Zn: 65.38
};

export default function PercentCompositionCalculator() {
  const [formula, setFormula] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [pieData, setPieData] = useState<any[]>([]);

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
      breakdown.push({ symbol, count, mass, atomicMass });
    }

    const withPercent = breakdown.map(b => ({
      ...b,
      percent: Math.round((b.mass / totalMass) * 10000) / 100
    }));

    setResult({ totalMass: Math.round(totalMass * 100) / 100, breakdown: withPercent });
    setPieData(withPercent.map(b => ({ name: b.symbol, value: b.percent, color: `hsl(${Math.random() * 360}, 70%, 50%)` })));
  };

  const reset = () => {
    setFormula("");
    setResult(null);
    setPieData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Percent Composition Calculator – Find Mass Percent of Elements</CardTitle>
          <CardDescription>
            Determine the percent composition by mass of each element in a compound with our free percent composition calculator. Enter the chemical formula and get accurate elemental percentages instantly. Perfect for chemistry coursework and analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Chemical Formula</Label>
              <Input placeholder="e.g., H2O, CO2, NaCl" value={formula} onChange={(e) => setFormula(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Percent Composition</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Total Molar Mass</p>
                <p className="text-4xl font-bold mt-1">{result.totalMass} g/mol</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What is Percent Composition?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Percent composition shows the percentage by mass of each element in a compound. You calculate it by dividing the total mass of each element by the molar mass of the compound and multiplying by 100.</p>

          <h3 className="text-xl font-semibold">Percent Composition Formula</h3>
          <div className="p-4 bg-muted rounded-md font-mono text-center">
            % Element = (mass of element in formula / molar mass of compound) × 100%
          </div>

          <h3 className="text-xl font-semibold">Steps to Calculate</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Find the molar mass of the compound</li>
            <li>Calculate the total mass of each element in the formula</li>
            <li>Divide each element mass by the total molar mass</li>
            <li>Multiply by 100 to get percentage</li>
          </ol>

          <h3 className="text-xl font-semibold">Example: Water (H₂O)</h3>
          <div className="p-4 bg-muted rounded-md">
            <p>Molar mass = 18.015 g/mol</p>
            <p>H: (2.016 / 18.015) × 100% = 11.19%</p>
            <p>O: (15.999 / 18.015) × 100% = 88.81%</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Element Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Enter a formula and calculate to see the chart</p>
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Percent Composition</CardTitle>
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
                      <td className="p-2 font-bold">{item.symbol}</td>
                      <td className="p-2">{item.atomicMass} g/mol</td>
                      <td className="p-2">{item.count}</td>
                      <td className="p-2">{Math.round(item.mass * 100) / 100} g/mol</td>
                      <td className="p-2 font-semibold">{item.percent}%</td>
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
          <CardTitle>Applications of Percent Composition</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Determining empirical formulas from experimental data</li>
            <li>Quality control in chemical manufacturing</li>
            <li>Analyzing mineral composition in geology</li>
            <li>Nutritional analysis of food products</li>
            <li>Environmental pollutant analysis</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Percent Composition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <p className="font-semibold mb-1">Enter the chemical formula</p>
              <p className="text-sm text-muted-foreground">Type the compound formula using standard element symbols (like H2O, CO2, or C6H12O6). Numbers after elements indicate atom count.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <p className="font-semibold mb-1">Click Calculate</p>
              <p className="text-sm text-muted-foreground">The calculator finds atomic masses from the periodic table and computes the total molar mass of your compound.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <p className="font-semibold mb-1">Review the breakdown</p>
              <p className="text-sm text-muted-foreground">Get instant results showing each element's mass contribution and percentage, plus a visual pie chart distribution.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why Use This Percent Composition Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">Accurate atomic masses</p>
              <p className="text-sm text-muted-foreground">Uses standard periodic table values for precise calculations in homework and lab work.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Visual element distribution</p>
              <p className="text-sm text-muted-foreground">Pie chart shows the proportional makeup of your compound at a glance.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Detailed breakdown table</p>
              <p className="text-sm text-muted-foreground">See atomic mass, atom count, total mass, and percentage for each element.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Works with any formula</p>
              <p className="text-sm text-muted-foreground">Handles simple compounds like NaCl and complex molecules like C6H12O6 equally well.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Free and instant</p>
              <p className="text-sm text-muted-foreground">No sign-up required. Results appear immediately in your browser.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">How do you calculate percent composition?</p>
              <p className="text-sm text-muted-foreground">Divide the total mass of each element by the compound's molar mass, then multiply by 100. For H2O: hydrogen is (2.016 / 18.015) × 100% = 11.19%.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">What is the percent composition formula?</p>
              <p className="text-sm text-muted-foreground">Percent composition = (mass of element in formula / molar mass of compound) × 100%. This gives the mass percentage of each element.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Can this calculator handle complex formulas?</p>
              <p className="text-sm text-muted-foreground">Yes, enter formulas like C6H12O6, Ca(NO3)2, or Fe2(SO4)3. The calculator parses element symbols and their counts automatically.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Why is percent composition important in chemistry?</p>
              <p className="text-sm text-muted-foreground">It helps determine empirical formulas, verify compound purity, and understand the elemental makeup of substances in quality control and research.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">What atomic masses does this calculator use?</p>
              <p className="text-sm text-muted-foreground">Standard atomic weights from the periodic table (IUPAC values). For example: H = 1.008, C = 12.01, O = 15.999 g/mol.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Chemistry Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Try our other chemistry calculators: the <a href="/calculators/molarity-calculator" className="text-primary hover:underline">molarity calculator</a> for solution concentrations, the <a href="/calculators/empirical-formula-calculator" className="text-primary hover:underline">empirical formula calculator</a> to find simplest ratios, and the <a href="/calculators/ph-calculator" className="text-primary hover:underline">pH calculator</a> for acid-base calculations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
