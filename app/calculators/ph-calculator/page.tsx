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
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";

export default function PHCalculator() {
  const [mode, setMode] = useState<"h-to-ph" | "ph-to-h">("h-to-ph");
  const [hConcentration, setHConcentration] = useState<string>("");
  const [ph, setPh] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const calculate = () => {
    if (mode === "h-to-ph") {
      const h = parseFloat(hConcentration);
      if (h > 0) {
        const phValue = -Math.log10(h);
        setResult({ value: Math.round(phValue * 100) / 100, unit: "", label: "pH" });
        generatePHGraph();
      }
    } else {
      const phValue = parseFloat(ph);
      if (phValue >= 0 && phValue <= 14) {
        const hConc = Math.pow(10, -phValue);
        setResult({ value: hConc.toExponential(4), unit: "mol/L", label: "[H⁺]" });
        generateHGraph();
      }
    }
  };

  const generatePHGraph = () => {
    const data = [];
    for (let exp = -14; exp <= 0; exp++) {
      const h = Math.pow(10, exp);
      data.push({ hConc: h.toExponential(0), ph: Math.round(-Math.log10(h) * 100) / 100 });
    }
    setGraphData(data);
  };

  const generateHGraph = () => {
    const data = [];
    for (let p = 0; p <= 14; p += 1) {
      data.push({ ph: p, hConc: Math.pow(10, -p).toExponential(0) });
    }
    setGraphData(data);
  };

  const reset = () => {
    setHConcentration("");
    setPh("");
    setResult(null);
    setGraphData([]);
  };

  const getPHCategory = (phValue: number) => {
    if (phValue < 7) return "Acidic";
    if (phValue === 7) return "Neutral";
    return "Basic (Alkaline)";
  };

  const phScaleData = [
    { ph: 0, substance: "Battery Acid", category: "Strong Acid" },
    { ph: 1, substance: "Stomach Acid", category: "Strong Acid" },
    { ph: 2, substance: "Lemon Juice", category: "Acid" },
    { ph: 3, substance: "Vinegar", category: "Acid" },
    { ph: 4, substance: "Tomato Juice", category: "Acid" },
    { ph: 5, substance: "Black Coffee", category: "Weak Acid" },
    { ph: 6, substance: "Urine/Milk", category: "Slightly Acidic" },
    { ph: 7, substance: "Pure Water", category: "Neutral" },
    { ph: 8, substance: "Sea Water", category: "Slightly Basic" },
    { ph: 9, substance: "Baking Soda", category: "Weak Base" },
    { ph: 10, substance: "Milk of Magnesia", category: "Base" },
    { ph: 11, substance: "Ammonia", category: "Base" },
    { ph: 12, substance: "Soapy Water", category: "Strong Base" },
    { ph: 13, substance: "Bleach", category: "Strong Base" },
    { ph: 14, substance: "Drain Cleaner", category: "Strong Base" },
  ];

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
                  <SelectItem value="h-to-ph">[H⁺] to pH</SelectItem>
                  <SelectItem value="ph-to-h">pH to [H⁺]</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "h-to-ph" ? (
              <div>
                <Label>Hydrogen Ion Concentration [H⁺] (mol/L)</Label>
                <Input type="number" placeholder="e.g., 1e-7" value={hConcentration} onChange={(e) => setHConcentration(e.target.value)} />
              </div>
            ) : (
              <div>
                <Label>pH Value</Label>
                <Input type="number" placeholder="e.g., 7" step="0.1" value={ph} onChange={(e) => setPh(e.target.value)} />
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
                {mode === "h-to-ph" && parseFloat(hConcentration) > 0 && (
                  <p className="text-lg mt-2">{getPHCategory(-Math.log10(parseFloat(hConcentration)))}</p>
                )}
              </div>
            )}
          </div>

          {graphData.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">pH Scale Visualization</h3>
              <div className="h-[250px]">
                <ChartContainer
                  config={{
                    ph: { label: "pH", color: "hsl(var(--chart-1))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={graphData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={mode === "ph-to-h" ? "ph" : "hConc"} tick={{ fontSize: 10 }} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey={mode === "ph-to-h" ? "hConc" : "ph"} stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Note: pH scale is logarithmic – each unit change represents a 10× change in [H⁺]
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What Is pH?</CardTitle>
          <CardDescription>Understanding the pH scale</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            pH measures how acidic or basic a solution is. The scale runs from 0 to 14. Seven is neutral – pure water sits right in the middle. Below 7 is acidic. Above 7 is basic (alkaline). The "p" stands for power or potential, and "H" is hydrogen. So pH literally means "power of hydrogen."
          </p>
          <p className="text-sm text-muted-foreground">
            Here's what makes pH tricky: it's logarithmic, not linear. A pH of 5 isn't twice as acidic as pH 6 – it's ten times more acidic. pH 4 is 100× more acidic than pH 6. This is why small pH changes in your blood (normally 7.35-7.45) can be life-threatening.
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-semibold mb-2">The pH Formula</p>
            <p className="font-mono text-center text-lg">pH = -log₁₀[H⁺]</p>
            <p className="text-xs text-muted-foreground mt-2">Where [H⁺] is the hydrogen ion concentration in moles per liter</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Complete pH Scale Reference</CardTitle>
          <CardDescription>Common substances and their pH values</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>pH</TableHead>
                <TableHead>Substance</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>[H⁺] (mol/L)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {phScaleData.map((item) => (
                <TableRow key={item.ph}>
                  <TableCell className="font-mono font-bold">{item.ph}</TableCell>
                  <TableCell className="font-medium">{item.substance}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="font-mono text-xs">{Math.pow(10, -item.ph).toExponential(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>pH in the Human Body</CardTitle>
          <CardDescription>Critical pH ranges for health</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Body Fluid</TableHead>
                <TableHead>Normal pH Range</TableHead>
                <TableHead>Function</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Blood</TableCell>
                <TableCell className="font-mono text-xs">7.35-7.45</TableCell>
                <TableCell className="text-xs">Oxygen transport, enzyme function</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Stomach Acid</TableCell>
                <TableCell className="font-mono text-xs">1.5-3.5</TableCell>
                <TableCell className="text-xs">Protein digestion, pathogen destruction</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Saliva</TableCell>
                <TableCell className="font-mono text-xs">6.2-7.6</TableCell>
                <TableCell className="text-xs">Initial digestion, tooth protection</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Urine</TableCell>
                <TableCell className="font-mono text-xs">4.5-8.0</TableCell>
                <TableCell className="text-xs">Waste excretion, pH balance</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Pancreatic Juice</TableCell>
                <TableCell className="font-mono text-xs">7.5-8.8</TableCell>
                <TableCell className="text-xs">Neutralizes stomach acid in intestines</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Cerebrospinal Fluid</TableCell>
                <TableCell className="font-mono text-xs">7.3-7.4</TableCell>
                <TableCell className="text-xs">Brain/spinal cord protection</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Blood pH outside 7.35-7.45 causes acidosis or alkalosis – both potentially fatal. Your body tightly regulates this through breathing and kidney function.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate pH</CardTitle>
          <CardDescription>Step-by-step examples</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Example 1: Strong Acid</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Problem: What is the pH of a solution with [H⁺] = 1 × 10⁻³ mol/L?
              </p>
              <p className="text-xs font-mono bg-muted p-2">
                pH = -log₁₀(1 × 10⁻³) = -(-3) = 3
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Answer: pH = 3 (acidic – similar to vinegar or orange juice)
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Example 2: Finding [H⁺] from pH</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Problem: What is [H⁺] when pH = 8.5?
              </p>
              <p className="text-xs font-mono bg-muted p-2">
                [H⁺] = 10^(-pH) = 10^(-8.5) = 3.16 × 10⁻⁹ mol/L
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Answer: [H⁺] = 3.16 × 10⁻⁹ mol/L (basic – similar to sea water)
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Example 3: Neutral Water</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Problem: Pure water has [H⁺] = 1 × 10⁻⁷ mol/L. What's the pH?
              </p>
              <p className="text-xs font-mono bg-muted p-2">
                pH = -log₁₀(1 × 10⁻⁷) = -(-7) = 7
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Answer: pH = 7 (neutral)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Can pH be negative or above 14?</h4>
            <p className="text-xs text-muted-foreground">
              Yes, but it's rare. Concentrated acids like 10M HCl have pH = -1. Concentrated bases like 10M NaOH have pH = 15. The 0-14 scale applies to dilute aqueous solutions. Industrial chemicals can exceed these bounds.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is pH logarithmic?</h4>
            <p className="text-xs text-muted-foreground">
              Hydrogen ion concentrations vary enormously – from 1 mol/L in strong acids to 10⁻¹⁴ mol/L in strong bases. A logarithmic scale compresses this 14-order-of-magnitude range into manageable 0-14 numbers. It's the same reason we use logarithmic scales for earthquakes (Richter) and sound (decibels).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between pH and acidity?</h4>
            <p className="text-xs text-muted-foreground">
              pH measures hydrogen ion concentration. Acidity refers to the total amount of acid present, including both dissociated and undissociated forms. A weak acid solution can have high acidity (lots of acid molecules) but relatively high pH (few H⁺ ions) because the acid doesn't fully dissociate.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I measure pH?</h4>
            <p className="text-xs text-muted-foreground">
              Three main methods: pH paper (litmus strips) – cheap but imprecise (±0.5 pH); liquid indicators like phenolphthalein – good for titrations; pH meters – most accurate (±0.01 pH) but require calibration. For precise work, always use a calibrated pH meter.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What happens when pH changes by 1 unit?</h4>
            <p className="text-xs text-muted-foreground">
              A 1-unit pH change means a 10× change in hydrogen ion concentration. Going from pH 7 to pH 6 means 10× more H⁺ ions. From pH 7 to pH 5 means 100× more. This is why ocean acidification – a drop from 8.2 to 8.1 – represents a 26% increase in acidity and threatens marine ecosystems.
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
            <a href="/calculators/molarity-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Molarity Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate solution concentration</p>
            </a>
            <a href="/calculators/soil-ph-adjustment-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Soil pH Adjustment</p>
              <p className="text-xs text-muted-foreground">Calculate lime/sulfur needs</p>
            </a>
            <a href="/calculators/photon-energy-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Photon Energy Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate energy from wavelength</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
