"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function ConcentrationCalculator() {
  const [mode, setMode] = useState<"molarity" | "percent" | "ppm" | "ppb">("molarity");
  const [mass, setMass] = useState<string>("");
  const [volume, setVolume] = useState<string>("");
  const [molarMass, setMolarMass] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const calculate = () => {
    const m = parseFloat(mass);
    const v = parseFloat(volume) / 1000;
    const mm = parseFloat(molarMass) || 0;

    if (m > 0 && v > 0) {
      let concentration: number;
      let unit = "";
      let label = "";

      if (mode === "molarity" && mm > 0) {
        concentration = (m / mm) / v;
        unit = "mol/L (M)";
        label = "Molarity";
        generateGraph(m, mm, v, "molarity");
      } else if (mode === "percent") {
        concentration = (m / (v * 1000)) * 100;
        unit = "% (w/v)";
        label = "Mass Percent";
        generateGraph(m, 1, v, "percent");
      } else if (mode === "ppm") {
        concentration = (m / (v * 1000)) * 1000000;
        unit = "ppm";
        label = "Parts Per Million";
        generateGraph(m, 1, v, "ppm");
      } else if (mode === "ppb") {
        concentration = (m / (v * 1000)) * 1000000000;
        unit = "ppb";
        label = "Parts Per Billion";
        generateGraph(m, 1, v, "ppb");
      } else {
        return;
      }

      setResult({ value: Math.round(concentration * 1000) / 1000, unit, label });
    }
  };

  const generateGraph = (m: number, mm: number, v: number, mode: string) => {
    const data = [];
    for (let vol = v * 0.5; vol <= v * 2; vol += v / 10) {
      let conc: number;
      if (mode === "molarity") {
        conc = (m / mm) / vol;
      } else if (mode === "percent") {
        conc = (m / (vol * 1000)) * 100;
      } else if (mode === "ppm") {
        conc = (m / (vol * 1000)) * 1000000;
      } else {
        conc = (m / (vol * 1000)) * 1000000000;
      }
      data.push({ volume: Math.round(vol * 1000 * 10) / 10, concentration: Math.round(conc * 100) / 100 });
    }
    setGraphData(data);
  };

  const reset = () => {
    setMass("");
    setVolume("");
    setMolarMass("");
    setResult(null);
    setGraphData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Concentration Unit</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="molarity">Molarity (mol/L)</SelectItem>
                  <SelectItem value="percent">Mass Percent (%)</SelectItem>
                  <SelectItem value="ppm">Parts Per Million (ppm)</SelectItem>
                  <SelectItem value="ppb">Parts Per Billion (ppb)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Mass of Solute (g)</Label>
              <Input type="number" placeholder="e.g., 5.0" value={mass} onChange={(e) => setMass(e.target.value)} />
            </div>

            <div>
              <Label>Volume of Solution (mL)</Label>
              <Input type="number" placeholder="e.g., 250" value={volume} onChange={(e) => setVolume(e.target.value)} />
            </div>

            {mode === "molarity" && (
              <div>
                <Label>Molar Mass (g/mol)</Label>
                <Input type="number" placeholder="e.g., 58.44 for NaCl" value={molarMass} onChange={(e) => setMolarMass(e.target.value)} />
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
          <CardTitle>Understanding Concentration Units</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Concentration expresses how much solute is dissolved in a solvent. Different fields use different units depending on the application and concentration level.</p>

          <h3 className="text-xl font-semibold">Concentration Formulas</h3>
          <div className="p-4 bg-muted rounded-md font-mono space-y-2">
            <div>Molarity (M) = moles of solute / liters of solution</div>
            <div>Mass % = (mass of solute / mass of solution) × 100%</div>
            <div>ppm = (mass of solute / mass of solution) × 10⁶</div>
            <div>ppb = (mass of solute / mass of solution) × 10⁹</div>
          </div>

          <h3 className="text-xl font-semibold">When to Use Each Unit</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Unit</th>
                  <th className="p-2 text-left">Typical Use</th>
                  <th className="p-2 text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Molarity (M)</td>
                  <td className="p-2">Chemical reactions, stoichiometry</td>
                  <td className="p-2">1 M NaOH solution</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Mass %</td>
                  <td className="p-2">Commercial products, concentrated solutions</td>
                  <td className="p-2">3% hydrogen peroxide</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">ppm</td>
                  <td className="p-2">Trace analysis, water quality</td>
                  <td className="p-2">5 ppm dissolved oxygen</td>
                </tr>
                <tr>
                  <td className="p-2">ppb</td>
                  <td className="p-2">Ultra-trace analysis, contaminants</td>
                  <td className="p-2">10 ppb lead in water</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Unit Conversions</h3>
          <div className="p-4 bg-muted rounded-md">
            <p>1% = 10,000 ppm = 10,000,000 ppb</p>
            <p>1 ppm = 1,000 ppb = 0.0001%</p>
            <p>1 ppb = 0.001 ppm = 0.0000001%</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Concentration vs Volume Graph</CardTitle>
          <CardDescription>How concentration changes with volume for fixed mass</CardDescription>
        </CardHeader>
        <CardContent>
          {graphData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{ value: "Volume (mL)", position: "insideBottom", offset: -5 }} dataKey="volume" />
                <YAxis label={{ value: "Concentration", angle: -90, position: "insideLeft" }} dataKey="concentration" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="concentration" stroke="#8884d8" strokeWidth={2} />
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
          <CardTitle>Example Calculations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md">
              <p className="font-semibold">Molarity Example:</p>
              <p>Dissolve 5.844 g NaCl (MM = 58.44 g/mol) in 500 mL water.</p>
              <p>Moles = 5.844 / 58.44 = 0.1 mol</p>
              <p>Molarity = 0.1 mol / 0.5 L = 0.2 M</p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="font-semibold">ppm Example:</p>
              <p>Dissolve 0.001 g of pollutant in 1 L water (1000 g).</p>
              <p>ppm = (0.001 / 1000) × 10⁶ = 1 ppm</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <div className="mt-12 space-y-12">
        {/* How It Works */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Solution Concentration</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Select Concentration Unit</h3>
                <p className="text-muted-foreground text-sm">Choose molarity, mass percent, ppm, or ppb based on your application needs.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Solution Data</h3>
                <p className="text-muted-foreground text-sm">Input mass of solute, volume of solution, and molar mass (for molarity calculations).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get Concentration Result</h3>
                <p className="text-muted-foreground text-sm">See your calculated concentration with a graph showing concentration vs volume relationship.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Benefits */}
        <section className="bg-card rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-6">Why Calculate Solution Concentration?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">🧪 Multiple Concentration Units</h3>
              <p className="text-muted-foreground text-sm">Support for molarity (M), mass percent (%), parts per million (ppm), and parts per billion (ppb) for various applications.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📊 Visual Concentration Graph</h3>
              <p className="text-muted-foreground text-sm">See how concentration changes with volume for a fixed mass, helping understand dilution principles.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🔬 Lab-Ready Calculations</h3>
              <p className="text-muted-foreground text-sm">Perfect for chemistry students, lab technicians, and researchers preparing solutions accurately.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📚 Educational Reference</h3>
              <p className="text-muted-foreground text-sm">Includes formulas, unit conversion tables, and example calculations for learning and reference.</p>
            </div>
          </div>
        </section>

        {/* Reference Table */}
        <section className="bg-card rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-6">Concentration Unit Conversion Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Unit</th>
                  <th className="text-left py-3 px-4">Equals</th>
                  <th className="text-left py-3 px-4">Typical Range</th>
                  <th className="text-left py-3 px-4">Application</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">1 M (Molar)</td>
                  <td className="py-3 px-4">1 mol/L</td>
                  <td className="py-3 px-4">0.001 - 10 M</td>
                  <td className="py-3 px-4">Chemical reactions, titrations</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">1% (w/v)</td>
                  <td className="py-3 px-4">10,000 ppm</td>
                  <td className="py-3 px-4">0.01% - 50%</td>
                  <td className="py-3 px-4">Commercial products, medical solutions</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">1 ppm</td>
                  <td className="py-3 px-4">1 mg/L (water)</td>
                  <td className="py-3 px-4">0.001 - 1000 ppm</td>
                  <td className="py-3 px-4">Water quality, environmental testing</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">1 ppb</td>
                  <td className="py-3 px-4">1 μg/L (water)</td>
                  <td className="py-3 px-4">0.1 - 1000 ppb</td>
                  <td className="py-3 px-4">Contaminant detection, ultra-trace analysis</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">1 ppt</td>
                  <td className="py-3 px-4">1 ng/L (water)</td>
                  <td className="py-3 px-4">0.01 - 100 ppt</td>
                  <td className="py-3 px-4">Pharmaceuticals, hormone detection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Solution Concentration FAQs</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">How do I calculate molarity?</h3>
              <p className="text-muted-foreground text-sm">Molarity (M) = moles of solute / liters of solution. First convert mass to moles using molar mass, then divide by volume in liters.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">What's the difference between ppm and ppb?</h3>
              <p className="text-muted-foreground text-sm">ppm (parts per million) is 1000× larger than ppb (parts per billion). 1 ppm = 1000 ppb. Use ppb for ultra-trace concentrations.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">How do I convert between concentration units?</h3>
              <p className="text-muted-foreground text-sm">1% = 10,000 ppm = 10,000,000 ppb. For molarity, you need the solute's molar mass: M = (g/L) / (g/mol).</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">What is mass percent concentration?</h3>
              <p className="text-muted-foreground text-sm">Mass percent = (mass of solute / mass of solution) × 100%. Common for commercial products like hydrogen peroxide (3%) and vinegar (5%).</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">How do I dilute a solution to a specific concentration?</h3>
              <p className="text-muted-foreground text-sm">Use C₁V₁ = C₂V₂. For example, to make 100 mL of 0.1 M from 1 M stock: (1 M)(V₁) = (0.1 M)(100 mL), so V₁ = 10 mL stock + 90 mL water.</p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Related Science & Math Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/concrete-mix-ratio-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Concrete Mix Ratio Calculator</h3>
              <p className="text-muted-foreground text-sm">Calculate material ratios for construction mixtures and proportions.</p>
            </a>
            <a href="/calculators/combination-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Combination Calculator</h3>
              <p className="text-muted-foreground text-sm">Calculate permutations and combinations for statistical analysis.</p>
            </a>
            <a href="/calculators/compounding-frequency-comparison" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Compounding Frequency Calculator</h3>
              <p className="text-muted-foreground text-sm">Compare exponential growth calculations with different frequencies.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
