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
        <CardHeader>
          <CardTitle>Concentration Calculator – Convert Solution Concentration Units</CardTitle>
          <CardDescription>
            Calculate solution concentration in molarity, percent composition, ppm, or ppb with our versatile concentration calculator. Ideal for chemists, lab technicians, and students working with solution preparation and analysis.
          </CardDescription>
        </CardHeader>
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
    </div>
  );
}
