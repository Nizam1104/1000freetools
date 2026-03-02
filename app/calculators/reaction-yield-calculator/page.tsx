"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function ReactionYieldCalculator() {
  const [theoreticalYield, setTheoreticalYield] = useState<string>("");
  const [actualYield, setActualYield] = useState<string>("");
  const [limitingReagent, setLimitingReagent] = useState<string>("");
  const [productMolarMass, setProductMolarMass] = useState<string>("");
  const [mode, setMode] = useState<"percent" | "theoretical" | "actual">("percent");
  const [result, setResult] = useState<any>(null);
  const [barData, setBarData] = useState<any[]>([]);

  const calculate = () => {
    if (mode === "percent") {
      const theoretical = parseFloat(theoreticalYield);
      const actual = parseFloat(actualYield);
      if (theoretical > 0 && actual > 0) {
        const percentYield = (actual / theoretical) * 100;
        setResult({
          percentYield: Math.round(percentYield * 100) / 100,
          theoretical: theoretical,
          actual: actual
        });
        setBarData([
          { name: "Theoretical", yield: theoretical },
          { name: "Actual", yield: actual }
        ]);
      }
    } else if (mode === "theoretical") {
      const moles = parseFloat(limitingReagent);
      const mm = parseFloat(productMolarMass);
      const actual = parseFloat(actualYield);
      if (moles > 0 && mm > 0) {
        const theoretical = moles * mm;
        const percentYield = actual > 0 ? (actual / theoretical) * 100 : 0;
        setResult({
          theoretical: Math.round(theoretical * 100) / 100,
          percentYield: Math.round(percentYield * 100) / 100,
          actual: actual
        });
        setBarData([
          { name: "Theoretical", yield: Math.round(theoretical * 100) / 100 },
          { name: "Actual", yield: actual }
        ]);
      }
    } else if (mode === "actual") {
      const theoretical = parseFloat(theoreticalYield);
      const percent = parseFloat(limitingReagent);
      if (theoretical > 0 && percent > 0) {
        const actual = (percent / 100) * theoretical;
        setResult({
          actual: Math.round(actual * 100) / 100,
          theoretical: theoretical,
          percentYield: percent
        });
        setBarData([
          { name: "Theoretical", yield: theoretical },
          { name: "Actual", yield: Math.round(actual * 100) / 100 }
        ]);
      }
    }
  };

  const reset = () => {
    setTheoreticalYield("");
    setActualYield("");
    setLimitingReagent("");
    setProductMolarMass("");
    setResult(null);
    setBarData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Reaction Yield Calculator – Calculate Theoretical and Percent Yield</CardTitle>
          <CardDescription>
            Calculate the theoretical yield, actual yield, and percent yield of any chemical reaction with our free yield calculator. Understand your reaction efficiency and optimize lab results. Ideal for chemistry students and researchers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Calculate</Label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as typeof mode)}
                className="w-full p-2 border rounded"
              >
                <option value="percent">Percent Yield</option>
                <option value="theoretical">Theoretical Yield</option>
                <option value="actual">Actual Yield</option>
              </select>
            </div>

            {mode === "percent" && (
              <>
                <div>
                  <Label>Theoretical Yield (g)</Label>
                  <Input type="number" placeholder="e.g., 10" value={theoreticalYield} onChange={(e) => setTheoreticalYield(e.target.value)} />
                </div>
                <div>
                  <Label>Actual Yield (g)</Label>
                  <Input type="number" placeholder="e.g., 8.5" value={actualYield} onChange={(e) => setActualYield(e.target.value)} />
                </div>
              </>
            )}

            {mode === "theoretical" && (
              <>
                <div>
                  <Label>Moles of Limiting Reagent (mol)</Label>
                  <Input type="number" placeholder="e.g., 0.5" value={limitingReagent} onChange={(e) => setLimitingReagent(e.target.value)} />
                </div>
                <div>
                  <Label>Product Molar Mass (g/mol)</Label>
                  <Input type="number" placeholder="e.g., 180" value={productMolarMass} onChange={(e) => setProductMolarMass(e.target.value)} />
                </div>
                <div>
                  <Label>Actual Yield (g) - optional</Label>
                  <Input type="number" placeholder="e.g., 75" value={actualYield} onChange={(e) => setActualYield(e.target.value)} />
                </div>
              </>
            )}

            {mode === "actual" && (
              <>
                <div>
                  <Label>Theoretical Yield (g)</Label>
                  <Input type="number" placeholder="e.g., 100" value={theoreticalYield} onChange={(e) => setTheoreticalYield(e.target.value)} />
                </div>
                <div>
                  <Label>Percent Yield (%)</Label>
                  <Input type="number" placeholder="e.g., 85" value={limitingReagent} onChange={(e) => setLimitingReagent(e.target.value)} />
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                {result.percentYield !== undefined && (
                  <div>
                    <p className="text-sm text-muted-foreground">Percent Yield</p>
                    <p className="text-4xl font-bold">{result.percentYield}%</p>
                  </div>
                )}
                {result.theoretical !== undefined && (
                  <div>
                    <p className="text-sm text-muted-foreground">Theoretical Yield</p>
                    <p className="text-2xl font-semibold">{result.theoretical} g</p>
                  </div>
                )}
                {result.actual !== undefined && (
                  <div>
                    <p className="text-sm text-muted-foreground">Actual Yield</p>
                    <p className="text-2xl font-semibold">{result.actual} g</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Reaction Yield</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Reaction yield measures how much product you actually obtain compared to the maximum possible amount. The theoretical yield is the maximum product possible based on stoichiometry. The actual yield is what you collect in the lab.</p>

          <h3 className="text-xl font-semibold">Percent Yield Formula</h3>
          <div className="p-4 bg-muted rounded-md font-mono text-center">
            Percent Yield = (Actual Yield / Theoretical Yield) × 100%
          </div>

          <h3 className="text-xl font-semibold">Why Percent Yield is Less Than 100%</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Incomplete reactions - not all reactants convert to products</li>
            <li>Side reactions - reactants form unwanted byproducts</li>
            <li>Product loss during purification or transfer</li>
            <li>Impure reactants</li>
            <li>Reversible reactions reaching equilibrium</li>
          </ul>

          <h3 className="text-xl font-semibold">Finding Theoretical Yield</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Balance the chemical equation</li>
            <li>Identify the limiting reagent</li>
            <li>Calculate moles of limiting reagent</li>
            <li>Use stoichiometry to find moles of product</li>
            <li>Convert moles to grams using molar mass</li>
          </ol>

          <h3 className="text-xl font-semibold">Example Calculation</h3>
          <p>The theoretical yield of aspirin is 10.0 g. You actually obtain 8.5 g.</p>
          <p>Percent Yield = (8.5 g / 10.0 g) × 100% = 85%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Yield Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Yield (g)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="yield" fill="#8884d8" />
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
          <CardTitle>Yield Quality Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Percent Yield</th>
                  <th className="p-2 text-left">Quality</th>
                  <th className="p-2 text-left">Assessment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">90-100%</td>
                  <td className="p-2">Excellent</td>
                  <td className="p-2">Very efficient reaction</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">70-89%</td>
                  <td className="p-2">Good</td>
                  <td className="p-2">Acceptable for most purposes</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">50-69%</td>
                  <td className="p-2">Fair</td>
                  <td className="p-2">Room for optimization</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">&lt;50%</td>
                  <td className="p-2">Poor</td>
                  <td className="p-2">Needs improvement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
