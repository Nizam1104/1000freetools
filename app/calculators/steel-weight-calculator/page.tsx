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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

export default function SteelWeightCalculator() {
  const [shape, setShape] = useState<"bar" | "sheet" | "pipe" | "beam">("bar");
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [thickness, setThickness] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [outerDiameter, setOuterDiameter] = useState<string>("");
  const [innerDiameter, setInnerDiameter] = useState<string>("");
  const [material, setMaterial] = useState<string>("steel");
  const [results, setResults] = useState<any>(null);

  const densities: Record<string, number> = {
    steel: 7850,
    stainless: 8000,
    aluminum: 2700,
    copper: 8960,
    brass: 8500,
    titanium: 4500,
    cast_iron: 7200,
  };

  const densityLabels: Record<string, string> = {
    steel: "Mild Steel",
    stainless: "Stainless Steel",
    aluminum: "Aluminum",
    copper: "Copper",
    brass: "Brass",
    titanium: "Titanium",
    cast_iron: "Cast Iron",
  };

  const calculate = () => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const T = parseFloat(thickness);
    const D = parseFloat(diameter);
    const OD = parseFloat(outerDiameter);
    const ID = parseFloat(innerDiameter);
    const density = densities[material];

    let volume = 0;
    switch (shape) {
      case "bar":
        if (D > 0 && L > 0) volume = Math.PI * Math.pow(D / 2, 2) * L;
        break;
      case "sheet":
        if (L > 0 && W > 0 && T > 0) volume = L * W * T;
        break;
      case "pipe":
        if (OD > 0 && ID > 0 && L > 0) volume = Math.PI * (Math.pow(OD / 2, 2) - Math.pow(ID / 2, 2)) * L;
        break;
      case "beam":
        if (W > 0 && T > 0 && L > 0) volume = W * T * L;
        break;
    }

    if (volume > 0) {
      const weight = volume * density;
      setResults({
        weight: weight,
        weightLbs: weight * 2.20462,
        volume: volume,
      });
    }
  };

  const reset = () => {
    setLength(""); setWidth(""); setThickness(""); setDiameter("");
    setOuterDiameter(""); setInnerDiameter(""); setResults(null);
  };

  // Generate material comparison data
  const materialComparison = results ? Object.entries(densities).map(([key, density]) => ({
    name: densityLabels[key] || key,
    weight: Math.round((results.volume * density * 2.20462) * 100) / 100,
    fill: key === material ? "var(--color-selected)" : "hsl(var(--muted))",
  })) : [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Shape</Label>
                <Select value={shape} onValueChange={(v) => setShape(v as typeof shape)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Round Bar</SelectItem>
                    <SelectItem value="sheet">Sheet/Plate</SelectItem>
                    <SelectItem value="pipe">Pipe/Tube</SelectItem>
                    <SelectItem value="beam">Beam/Flat Bar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Material</Label>
                <Select value={material} onValueChange={(v) => setMaterial(v as typeof material)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="steel">Mild Steel (7850 kg/m³)</SelectItem>
                    <SelectItem value="stainless">Stainless Steel (8000 kg/m³)</SelectItem>
                    <SelectItem value="aluminum">Aluminum (2700 kg/m³)</SelectItem>
                    <SelectItem value="copper">Copper (8960 kg/m³)</SelectItem>
                    <SelectItem value="brass">Brass (8500 kg/m³)</SelectItem>
                    <SelectItem value="titanium">Titanium (4500 kg/m³)</SelectItem>
                    <SelectItem value="cast_iron">Cast Iron (7200 kg/m³)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {shape === "bar" && (
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Diameter (m)</Label><Input value={diameter} onChange={e => setDiameter(e.target.value)} /></div>
                <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              </div>
            )}

            {shape === "sheet" && (
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
                <div><Label>Width (m)</Label><Input value={width} onChange={e => setWidth(e.target.value)} /></div>
                <div><Label>Thickness (m)</Label><Input value={thickness} onChange={e => setThickness(e.target.value)} /></div>
              </div>
            )}

            {shape === "pipe" && (
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Outer Diameter (m)</Label><Input value={outerDiameter} onChange={e => setOuterDiameter(e.target.value)} /></div>
                <div><Label>Inner Diameter (m)</Label><Input value={innerDiameter} onChange={e => setInnerDiameter(e.target.value)} /></div>
                <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              </div>
            )}

            {shape === "beam" && (
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Width (m)</Label><Input value={width} onChange={e => setWidth(e.target.value)} /></div>
                <div><Label>Thickness (m)</Label><Input value={thickness} onChange={e => setThickness(e.target.value)} /></div>
                <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Weight</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="text-3xl font-bold">{Math.round(results.weight * 100) / 100} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Weight (lbs)</p>
                    <p className="text-3xl font-bold">{Math.round(results.weightLbs * 100) / 100}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Volume: {Math.round(results.volume * 1000) / 1000} m³ | Density: {densities[material]} kg/m³</p>
              </div>
            )}
          </div>

          {results && materialComparison.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Weight by Material (same dimensions)</h3>
              <div className="h-[250px]">
                <ChartContainer
                  config={{
                    selected: { label: "Selected", color: "hsl(var(--chart-1))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={materialComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="weight" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Material Densities Reference</CardTitle>
          <CardDescription>Common metal densities for weight calculations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Density (kg/m³)</TableHead>
                <TableHead>Density (lb/in³)</TableHead>
                <TableHead>Relative Weight</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Aluminum</TableCell>
                <TableCell className="font-mono text-xs">2,700</TableCell>
                <TableCell className="font-mono text-xs">0.097</TableCell>
                <TableCell className="text-xs">34% of steel</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Titanium</TableCell>
                <TableCell className="font-mono text-xs">4,500</TableCell>
                <TableCell className="font-mono text-xs">0.163</TableCell>
                <TableCell className="text-xs">57% of steel</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Cast Iron</TableCell>
                <TableCell className="font-mono text-xs">7,200</TableCell>
                <TableCell className="font-mono text-xs">0.260</TableCell>
                <TableCell className="text-xs">92% of steel</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mild Steel</TableCell>
                <TableCell className="font-mono text-xs">7,850</TableCell>
                <TableCell className="font-mono text-xs">0.284</TableCell>
                <TableCell className="text-xs">Baseline</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Stainless Steel</TableCell>
                <TableCell className="font-mono text-xs">8,000</TableCell>
                <TableCell className="font-mono text-xs">0.289</TableCell>
                <TableCell className="text-xs">102% of steel</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Brass</TableCell>
                <TableCell className="font-mono text-xs">8,500</TableCell>
                <TableCell className="font-mono text-xs">0.307</TableCell>
                <TableCell className="text-xs">108% of steel</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Copper</TableCell>
                <TableCell className="font-mono text-xs">8,960</TableCell>
                <TableCell className="font-mono text-xs">0.324</TableCell>
                <TableCell className="text-xs">114% of steel</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Densities vary slightly by alloy composition. Values shown are typical averages for common grades.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Steel Weight Formulas</CardTitle>
          <CardDescription>How to calculate weight manually</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Weight = Volume × Density. The volume calculation changes based on shape, but the principle stays the same. For steel, use 7850 kg/m³ or 0.284 lb/in³ as your density.
          </p>
          <div className="rounded-lg bg-muted p-4 space-y-3">
            <p className="text-sm font-semibold">Volume Formulas (all dimensions in meters):</p>
            <div className="space-y-2 text-xs font-mono">
              <p><strong>Round Bar:</strong> π × (diameter/2)² × length</p>
              <p><strong>Sheet/Plate:</strong> length × width × thickness</p>
              <p><strong>Pipe/Tube:</strong> π × ((OD/2)² - (ID/2)²) × length</p>
              <p><strong>Flat Bar:</strong> width × thickness × length</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            For pipes, you can also use wall thickness instead of inner diameter: Volume = π × (OD - wall) × wall × length. This is often easier when you have standard pipe schedules.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Steel Section Weights</CardTitle>
          <CardDescription>Reference weights for standard sizes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Section Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Weight per Meter</TableHead>
                <TableHead>Weight per Foot</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Round Bar</TableCell>
                <TableCell className="text-xs">20mm diameter</TableCell>
                <TableCell className="font-mono text-xs">2.47 kg/m</TableCell>
                <TableCell className="font-mono text-xs">1.66 lb/ft</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Round Bar</TableCell>
                <TableCell className="text-xs">25mm diameter</TableCell>
                <TableCell className="font-mono text-xs">3.85 kg/m</TableCell>
                <TableCell className="font-mono text-xs">2.59 lb/ft</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Steel Plate</TableCell>
                <TableCell className="text-xs">10mm thick</TableCell>
                <TableCell className="font-mono text-xs">78.5 kg/m²</TableCell>
                <TableCell className="font-mono text-xs">16.1 lb/ft²</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Steel Plate</TableCell>
                <TableCell className="text-xs">20mm thick</TableCell>
                <TableCell className="font-mono text-xs">157 kg/m²</TableCell>
                <TableCell className="font-mono text-xs">32.2 lb/ft²</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Steel Pipe</TableCell>
                <TableCell className="text-xs">2" SCH 40</TableCell>
                <TableCell className="font-mono text-xs">5.44 kg/m</TableCell>
                <TableCell className="font-mono text-xs">3.66 lb/ft</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Steel Pipe</TableCell>
                <TableCell className="text-xs">4" SCH 40</TableCell>
                <TableCell className="font-mono text-xs">16.07 kg/m</TableCell>
                <TableCell className="font-mono text-xs">10.8 lb/ft</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Weights are theoretical and may vary slightly from actual due to manufacturing tolerances.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the density of mild steel?</h4>
            <p className="text-xs text-muted-foreground">
              Mild steel (low carbon steel) has a density of approximately 7850 kg/m³ or 7.85 g/cm³. In imperial units, that's 0.284 lb/in³ or 490 lb/ft³. This is the standard value used for most structural steel calculations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate the weight of a steel pipe?</h4>
            <p className="text-xs text-muted-foreground">
              For a pipe, calculate the cross-sectional area of the steel ring: π × ((OD/2)² - (ID/2)²), then multiply by length for volume, then by density for weight. Or use the shortcut: Weight/m = (OD - wall) × wall × 0.02466 for mm dimensions in kg/m.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is stainless steel heavier than regular steel?</h4>
            <p className="text-xs text-muted-foreground">
              Slightly. Stainless steel (typically 8000 kg/m³) is about 2% denser than mild steel (7850 kg/m³). The difference comes from alloying elements like chromium and nickel. For most practical purposes, you can treat them as having the same density.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How much does a 4x8 sheet of steel weigh?</h4>
            <p className="text-xs text-muted-foreground">
              Depends on thickness. A 4×8 foot sheet of 1/4" steel weighs about 327 lbs. At 1/2" thick, it's 654 lbs. At 1" thick, roughly 1300 lbs. The formula: length(ft) × width(ft) × thickness(in) × 40.8 = weight in pounds.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is aluminum so much lighter than steel?</h4>
            <p className="text-xs text-muted-foreground">
              Aluminum's density (2700 kg/m³) is only 34% of steel's. This is due to aluminum's atomic structure – lighter atoms packed less densely. That's why aluminum is popular in aerospace and automotive applications where weight matters.
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
            <a href="/calculators/concrete-volume-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Concrete Volume Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate concrete quantities</p>
            </a>
            <a href="/calculators/wood-board-feet-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Board Feet Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate lumber volume</p>
            </a>
            <a href="/calculators/weight-distribution-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Weight Distribution</p>
              <p className="text-xs text-muted-foreground">Calculate load distribution</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
