"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

export default function MolarityCalculator() {
  const [mode, setMode] = useState<"find-molarity" | "find-moles" | "find-volume">("find-molarity");
  const [moles, setMoles] = useState<string>("");
  const [volume, setVolume] = useState<string>("");
  const [molarity, setMolarity] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const calculate = () => {
    const n = parseFloat(moles);
    const V = parseFloat(volume) / 1000;
    const M = parseFloat(molarity);

    if (mode === "find-molarity" && n > 0 && V > 0) {
      const molarityValue = n / V;
      setResult({ value: Math.round(molarityValue * 1000) / 1000, unit: "mol/L (M)" });
      generateMolarityGraph(n, V);
    } else if (mode === "find-moles" && M > 0 && V > 0) {
      const molesValue = M * V;
      setResult({ value: Math.round(molesValue * 1000) / 1000, unit: "mol" });
      generateMolesGraph(M, V);
    } else if (mode === "find-volume" && n > 0 && M > 0) {
      const volumeValue = (n / M) * 1000;
      setResult({ value: Math.round(volumeValue * 100) / 100, unit: "mL" });
      generateVolumeGraph(n, M);
    }
  };

  const generateMolarityGraph = (n: number, V: number) => {
    const data = [];
    for (let v = 0.1; v <= V * 2; v += V / 10) {
      data.push({ volume: Math.round(v * 1000), molarity: Math.round((n / v) * 100) / 100 });
    }
    setGraphData(data);
  };

  const generateMolesGraph = (M: number, V: number) => {
    const data = [];
    for (let v = 0.1; v <= V * 2; v += V / 10) {
      data.push({ volume: Math.round(v * 1000), moles: Math.round((M * v) * 100) / 100 });
    }
    setGraphData(data);
  };

  const generateVolumeGraph = (n: number, M: number) => {
    const data = [];
    for (let m = 0.1; m <= M * 2; m += M / 10) {
      data.push({ molarity: Math.round(m * 100) / 100, volume: Math.round(((n / m) * 1000) * 10) / 10 });
    }
    setGraphData(data);
  };

  const reset = () => {
    setMoles("");
    setVolume("");
    setMolarity("");
    setResult(null);
    setGraphData([]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Calculate</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="find-molarity">Find Molarity (M)</SelectItem>
                  <SelectItem value="find-moles">Find Moles (n)</SelectItem>
                  <SelectItem value="find-volume">Find Volume (V)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "find-molarity" && (
              <>
                <div>
                  <Label>Moles of Solute (mol)</Label>
                  <Input type="number" placeholder="e.g., 0.5" value={moles} onChange={(e) => setMoles(e.target.value)} />
                </div>
                <div>
                  <Label>Volume of Solution (mL)</Label>
                  <Input type="number" placeholder="e.g., 500" value={volume} onChange={(e) => setVolume(e.target.value)} />
                </div>
              </>
            )}

            {mode === "find-moles" && (
              <>
                <div>
                  <Label>Molarity (mol/L)</Label>
                  <Input type="number" placeholder="e.g., 2.0" value={molarity} onChange={(e) => setMolarity(e.target.value)} />
                </div>
                <div>
                  <Label>Volume of Solution (mL)</Label>
                  <Input type="number" placeholder="e.g., 250" value={volume} onChange={(e) => setVolume(e.target.value)} />
                </div>
              </>
            )}

            {mode === "find-volume" && (
              <>
                <div>
                  <Label>Moles of Solute (mol)</Label>
                  <Input type="number" placeholder="e.g., 0.25" value={moles} onChange={(e) => setMoles(e.target.value)} />
                </div>
                <div>
                  <Label>Molarity (mol/L)</Label>
                  <Input type="number" placeholder="e.g., 1.5" value={molarity} onChange={(e) => setMolarity(e.target.value)} />
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-4xl font-bold mt-1">{result.value} {result.unit}</p>
              </div>
            )}
          </div>

          {graphData.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Relationship Graph</h3>
              <div className="h-[250px]">
                <ChartContainer
                  config={{
                    molarity: { label: "Molarity (M)", color: "hsl(var(--chart-1))" },
                    moles: { label: "Moles (mol)", color: "hsl(var(--chart-2))" },
                    volume: { label: "Volume (mL)", color: "hsl(var(--chart-3))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={graphData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={mode === "find-volume" ? "molarity" : "volume"} tick={{ fontSize: 10 }} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey={mode === "find-volume" ? "volume" : mode === "find-moles" ? "moles" : "molarity"} stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What Is Molarity?</CardTitle>
          <CardDescription>Understanding molar concentration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Molarity tells you how concentrated a solution is. Specifically, it's the number of moles of solute dissolved in one liter of solution. The symbol is M (capital M), and you'll see it written as "2 M NaCl" or "0.1 M HCl" on lab bottles.
          </p>
          <p className="text-sm text-muted-foreground">
            One mole equals 6.022 × 10²³ particles (Avogadro's number). So a 1 M solution contains 6.022 × 10²³ molecules of solute per liter. This seems abstract, but it's practical: equal volumes of solutions with the same molarity contain the same number of molecules, regardless of what those molecules are.
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-semibold mb-2">The Molarity Formula</p>
            <p className="font-mono text-center text-lg">M = n / V</p>
            <p className="text-xs text-muted-foreground mt-2 text-center">M = molarity (mol/L), n = moles of solute, V = volume in liters</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Important distinction: molarity uses the volume of the final solution, not the volume of solvent you started with. If you dissolve salt in 1 L of water, the final volume exceeds 1 L. Always measure the final solution volume for accurate molarity.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Molarity Calculation Examples</CardTitle>
          <CardDescription>Step-by-step worked problems</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Example 1: Finding Molarity</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Problem: You dissolve 0.5 moles of NaCl in enough water to make 500 mL of solution. What's the molarity?
              </p>
              <div className="text-xs font-mono bg-muted p-2 space-y-1">
                <p>Given: n = 0.5 mol, V = 500 mL = 0.5 L</p>
                <p>M = n / V = 0.5 mol / 0.5 L = 1.0 M</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Answer: The solution is 1.0 M NaCl
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Example 2: Finding Moles</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Problem: How many moles of HCl are in 250 mL of 2.0 M HCl solution?
              </p>
              <div className="text-xs font-mono bg-muted p-2 space-y-1">
                <p>Given: M = 2.0 mol/L, V = 250 mL = 0.25 L</p>
                <p>n = M × V = 2.0 mol/L × 0.25 L = 0.5 mol</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Answer: The solution contains 0.5 moles of HCl
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Example 3: Finding Volume</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Problem: What volume of 1.5 M NaOH contains 0.3 moles of NaOH?
              </p>
              <div className="text-xs font-mono bg-muted p-2 space-y-1">
                <p>Given: n = 0.3 mol, M = 1.5 mol/L</p>
                <p>V = n / M = 0.3 mol / 1.5 mol/L = 0.2 L = 200 mL</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Answer: You need 200 mL of the solution
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Molarity Reference Table</CardTitle>
          <CardDescription>Common molarity conversions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Moles (mol)</TableHead>
                <TableHead>Volume (mL)</TableHead>
                <TableHead>Molarity (M)</TableHead>
                <TableHead>Common Use</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono">0.1</TableCell>
                <TableCell className="font-mono">100</TableCell>
                <TableCell className="font-mono">1.0</TableCell>
                <TableCell className="text-xs">Standard titration</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">0.5</TableCell>
                <TableCell className="font-mono">500</TableCell>
                <TableCell className="font-mono">1.0</TableCell>
                <TableCell className="text-xs">General lab work</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">1.0</TableCell>
                <TableCell className="font-mono">1000</TableCell>
                <TableCell className="font-mono">1.0</TableCell>
                <TableCell className="text-xs">Stock solution</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">0.25</TableCell>
                <TableCell className="font-mono">250</TableCell>
                <TableCell className="font-mono">1.0</TableCell>
                <TableCell className="text-xs">Standard solution</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">2.0</TableCell>
                <TableCell className="font-mono">500</TableCell>
                <TableCell className="font-mono">4.0</TableCell>
                <TableCell className="text-xs">Concentrated reagent</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">0.01</TableCell>
                <TableCell className="font-mono">100</TableCell>
                <TableCell className="font-mono">0.1</TableCell>
                <TableCell className="text-xs">Dilute standard</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Molarity vs Molality vs Normality</CardTitle>
          <CardDescription>Understanding concentration units</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead>Formula</TableHead>
                <TableHead>Temperature Dependent</TableHead>
                <TableHead>Best For</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Molarity (M)</TableCell>
                <TableCell className="font-mono text-xs">mol solute / L solution</TableCell>
                <TableCell>Yes</TableCell>
                <TableCell className="text-xs">General lab work, titrations</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Molality (m)</TableCell>
                <TableCell className="font-mono text-xs">mol solute / kg solvent</TableCell>
                <TableCell>No</TableCell>
                <TableCell className="text-xs">Colligative properties, precise work</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Normality (N)</TableCell>
                <TableCell className="font-mono text-xs">equivalents / L solution</TableCell>
                <TableCell>Yes</TableCell>
                <TableCell className="text-xs">Acid-base, redox reactions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mass %</TableCell>
                <TableCell className="font-mono text-xs">(g solute / g solution) × 100</TableCell>
                <TableCell>No</TableCell>
                <TableCell className="text-xs">Industrial applications</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ppm</TableCell>
                <TableCell className="font-mono text-xs">mg solute / L solution</TableCell>
                <TableCell>Yes</TableCell>
                <TableCell className="text-xs">Trace analysis, environmental</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Molarity changes with temperature because volume expands/contracts. Molality stays constant because mass doesn't change with temperature. For precise thermodynamic work, use molality.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I convert grams to moles for molarity?</h4>
            <p className="text-xs text-muted-foreground">
              Divide grams by molar mass. For NaCl: molar mass = 58.44 g/mol. So 29.22 g NaCl = 29.22 / 58.44 = 0.5 mol. Then use M = n/V. If dissolved in 500 mL: M = 0.5 mol / 0.5 L = 1.0 M.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between 1 M and 1 m?</h4>
            <p className="text-xs text-muted-foreground">
              1 M (molar) = 1 mole per liter of solution. 1 m (molal) = 1 mole per kilogram of solvent. For dilute aqueous solutions, they're nearly equal. For concentrated solutions or non-aqueous solvents, they differ significantly.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I prepare a molar solution?</h4>
            <p className="text-xs text-muted-foreground">
              Weigh the required moles of solute. Add to a volumetric flask. Add solvent to about 3/4 full and swirl to dissolve. Then add solvent to the calibration mark. Never add solute directly to a full-volume flask – it won't dissolve properly.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can molarity be greater than 10 M?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. Concentrated HCl is about 12 M. Concentrated H₂SO₄ is about 18 M. Concentrated NaOH can reach 19 M. These are limited by solubility – eventually, no more solute will dissolve regardless of how much you add.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I dilute a solution to a specific molarity?</h4>
            <p className="text-xs text-muted-foreground">
              Use M₁V₁ = M₂V₂. Want 500 mL of 0.1 M from 1.0 M stock? (1.0)(V₁) = (0.1)(500), so V₁ = 50 mL. Take 50 mL of stock, add water to 500 mL total. Always add acid to water, never water to acid.
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
              <p className="text-xs text-muted-foreground">Calculate pH from [H⁺]</p>
            </a>
            <a href="/calculators/stoichiometry-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Stoichiometry Calculator</p>
              <p className="text-xs text-muted-foreground">Balance chemical equations</p>
            </a>
            <a href="/calculators/dilution-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Dilution Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate dilution ratios</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
