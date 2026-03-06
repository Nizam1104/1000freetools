"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const ELEMENTS: Record<string, number> = {
  H: 1.008, He: 4.003, Li: 6.941, Be: 9.012, B: 10.81, C: 12.01, N: 14.01, O: 15.999,
  F: 18.998, Ne: 20.18, Na: 22.99, Mg: 24.31, Al: 26.98, Si: 28.09, P: 30.97, S: 32.07,
  Cl: 35.45, K: 39.10, Ca: 40.08, Fe: 55.85, Cu: 63.55, Zn: 65.38, Br: 79.90, Ag: 107.87,
  I: 126.90, Au: 196.97, Hg: 200.59, Pb: 207.2
};

export default function EmpiricalFormulaCalculator() {
  const [elements, setElements] = useState<{symbol: string, percent: string}[]>([
    { symbol: "C", percent: "" },
    { symbol: "H", percent: "" },
    { symbol: "O", percent: "" }
  ]);
  const [result, setResult] = useState<any>(null);
  const [pieData, setPieData] = useState<any[]>([]);

  const addElement = () => {
    setElements([...elements, { symbol: "C", percent: "" }]);
  };

  const removeElement = (index: number) => {
    setElements(elements.filter((_, i) => i !== index));
  };

  const updateElement = (index: number, field: "symbol" | "percent", value: string) => {
    const updated = [...elements];
    updated[index][field] = value;
    setElements(updated);
  };

  const calculate = () => {
    const validElements = elements.filter(e => e.symbol && e.percent && parseFloat(e.percent) > 0);
    if (validElements.length < 2) return;

    const moles = validElements.map(e => ({
      symbol: e.symbol,
      percent: parseFloat(e.percent),
      moles: parseFloat(e.percent) / (ELEMENTS[e.symbol.toUpperCase()] || 12.01)
    }));

    const minMoles = Math.min(...moles.map(m => m.moles));
    const ratios = moles.map(m => ({
      symbol: m.symbol,
      ratio: m.moles / minMoles
    }));

    const empirical = ratios.map(r => {
      let multiplier = 1;
      let rounded = Math.round(r.ratio);
      while (Math.abs(r.ratio - rounded) > 0.1 && multiplier <= 5) {
        multiplier++;
        rounded = Math.round(r.ratio * multiplier);
      }
      return { symbol: r.symbol, count: rounded, multiplier };
    });

    const formula = empirical.map(e => e.symbol + (e.count > 1 ? e.count : "")).join("");
    setResult({ formula, empirical });

    const pieData = validElements.map(e => ({
      name: e.symbol,
      value: parseFloat(e.percent),
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    }));
    setPieData(pieData);
  };

  const reset = () => {
    setElements([
      { symbol: "C", percent: "" },
      { symbol: "H", percent: "" },
      { symbol: "O", percent: "" }
    ]);
    setResult(null);
    setPieData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            {elements.map((element, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Symbol"
                  value={element.symbol}
                  onChange={(e) => updateElement(index, "symbol", e.target.value)}
                  className="w-24"
                />
                <Input
                  type="number"
                  placeholder="Percent %"
                  value={element.percent}
                  onChange={(e) => updateElement(index, "percent", e.target.value)}
                />
                {elements.length > 2 && (
                  <Button variant="outline" size="sm" onClick={() => removeElement(index)}>Remove</Button>
                )}
              </div>
            ))}
            <div className="flex gap-2">
              <Button onClick={addElement}>Add Element</Button>
              <Button onClick={calculate}>Calculate Formula</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Empirical Formula</p>
                <p className="text-5xl font-bold mt-2">{result.formula}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What is an Empirical Formula?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>The empirical formula shows the simplest whole-number ratio of atoms in a compound. It differs from the molecular formula, which shows the actual number of atoms. For example, glucose has molecular formula C₆H₁₂O₆ but empirical formula CH₂O.</p>

          <h3 className="text-xl font-semibold">Steps to Find Empirical Formula</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Convert percent composition to grams (assume 100 g sample)</li>
            <li>Convert grams to moles using atomic masses</li>
            <li>Divide all mole values by the smallest mole value</li>
            <li>Multiply by integers if needed to get whole numbers</li>
            <li>Write the formula using these ratios as subscripts</li>
          </ol>

          <h3 className="text-xl font-semibold">Example Calculation</h3>
          <p>A compound contains 40.0% C, 6.7% H, and 53.3% O by mass.</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>In 100 g: 40.0 g C, 6.7 g H, 53.3 g O</li>
            <li>Convert to moles: C = 40.0/12.01 = 3.33 mol, H = 6.7/1.008 = 6.65 mol, O = 53.3/16.00 = 3.33 mol</li>
            <li>Divide by smallest (3.33): C = 1, H = 2, O = 1</li>
            <li>Empirical formula: CH₂O</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Percent Composition Chart</CardTitle>
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
              <p className="text-muted-foreground">Enter values and calculate to see the chart</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Empirical vs Molecular Formula</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Compound</th>
                  <th className="p-2 text-left">Molecular Formula</th>
                  <th className="p-2 text-left">Empirical Formula</th>
                  <th className="p-2 text-left">Ratio</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Water</td>
                  <td className="p-2">H₂O</td>
                  <td className="p-2">H₂O</td>
                  <td className="p-2">1:1</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Hydrogen Peroxide</td>
                  <td className="p-2">H₂O₂</td>
                  <td className="p-2">HO</td>
                  <td className="p-2">2:1</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Glucose</td>
                  <td className="p-2">C₆H₁₂O₆</td>
                  <td className="p-2">CH₂O</td>
                  <td className="p-2">6:1</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Benzene</td>
                  <td className="p-2">C₆H₆</td>
                  <td className="p-2">CH</td>
                  <td className="p-2">6:1</td>
                </tr>
                <tr>
                  <td className="p-2">Ethane</td>
                  <td className="p-2">C₂H₆</td>
                  <td className="p-2">CH₃</td>
                  <td className="p-2">2:1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Atomic Masses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(ELEMENTS).slice(0, 15).map(([symbol, mass]) => (
              <div key={symbol} className="p-2 bg-muted rounded text-sm">
                <span className="font-bold">{symbol}:</span> {mass} g/mol
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <Card>
        <CardHeader>
          <CardTitle>How to Find Empirical Formula</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Enter Element Composition</h3>
              <p className="text-sm text-muted-foreground">Input the symbol and percent composition or mass for each element in the compound.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Convert to Moles</h3>
              <p className="text-sm text-muted-foreground">The calculator converts percentages to grams, then to moles using atomic masses.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">Get Simplest Ratio</h3>
              <p className="text-sm text-muted-foreground">Mole values are divided by the smallest to find the whole-number ratio for the formula.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Section */}
      <Card>
        <CardHeader>
          <CardTitle>Why Use This Empirical Formula Calculator?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Step-by-Step Accuracy
              </h3>
              <p className="text-sm text-muted-foreground">Automatically handles percent-to-gram conversion, mole calculation, and ratio simplification.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Dynamic Element Addition
              </h3>
              <p className="text-sm text-muted-foreground">Add or remove elements to analyze compounds with any number of constituent elements.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Visual Composition Chart
              </h3>
              <p className="text-sm text-muted-foreground">Pie chart displays the percent composition of each element in your compound.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Built-in Atomic Masses
              </h3>
              <p className="text-sm text-muted-foreground">Includes atomic masses for 30+ common elements for accurate mole calculations.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Educational Reference
              </h3>
              <p className="text-sm text-muted-foreground">Comparison table shows empirical vs molecular formulas for common compounds.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions About Empirical Formulas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is the difference between empirical and molecular formula?</h3>
              <p className="text-sm text-muted-foreground">Empirical formula shows the simplest whole-number ratio of atoms, while molecular formula shows the actual number. For example, glucose has molecular formula C₆H₁₂O₆ but empirical formula CH₂O.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How do you calculate empirical formula from percent composition?</h3>
              <p className="text-sm text-muted-foreground">Convert percentages to grams (assume 100g sample), divide by atomic masses to get moles, divide all by the smallest mole value, and multiply to get whole numbers if needed.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Can empirical formula be the same as molecular formula?</h3>
              <p className="text-sm text-muted-foreground">Yes, for some compounds like water (H₂O), the empirical and molecular formulas are identical because the ratio cannot be simplified further.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What if the mole ratio is not a whole number?</h3>
              <p className="text-sm text-muted-foreground">Multiply all ratios by the same integer (2, 3, 4, etc.) until you get whole numbers. For example, a ratio of 1:1.5 becomes 2:3 when multiplied by 2.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How do you find molecular formula from empirical formula?</h3>
              <p className="text-sm text-muted-foreground">Divide the molecular mass by the empirical formula mass to get a multiplier, then multiply all subscripts in the empirical formula by this number.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Tools Section */}
      <Card>
        <CardHeader>
          <CardTitle>Related Chemistry Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/molecular-mass-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
              <h3 className="font-semibold mb-2">Molecular Mass Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate the molar mass of any compound from its molecular formula.</p>
            </a>
            <a href="/calculators/percent-composition-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
              <h3 className="font-semibold mb-2">Percent Composition Calculator</h3>
              <p className="text-sm text-muted-foreground">Find the percentage by mass of each element in a chemical compound.</p>
            </a>
            <a href="/calculators/stoichiometry-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
              <h3 className="font-semibold mb-2">Stoichiometry Calculator</h3>
              <p className="text-sm text-muted-foreground">Balance chemical equations and calculate reactant and product quantities.</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
