"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export default function BrickCalculator() {
  const [wallLength, setWallLength] = useState<string>("");
  const [wallHeight, setWallHeight] = useState<string>("");
  const [brickLength, setBrickLength] = useState<string>("");
  const [brickHeight, setBrickHeight] = useState<string>("");
  const [brickWidth, setBrickWidth] = useState<string>("");
  const [mortarThickness, setMortarThickness] = useState<string>("");
  const [waste, setWaste] = useState<string>("5");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const WL = parseFloat(wallLength);
    const WH = parseFloat(wallHeight);
    const BL = parseFloat(brickLength) / 1000;
    const BH = parseFloat(brickHeight) / 1000;
    const BW = parseFloat(brickWidth) / 1000;
    const MT = parseFloat(mortarThickness) / 1000;
    const wasteFactor = 1 + parseFloat(waste) / 100;

    if (WL > 0 && WH > 0 && BL > 0 && BH > 0 && MT > 0) {
      const wallArea = WL * WH;
      const brickAreaWithMortar = (BL + MT) * (BH + MT);
      const bricksPerM2 = 1 / brickAreaWithMortar;
      const totalBricks = Math.ceil(wallArea * bricksPerM2 * wasteFactor);

      const brickVolume = BL * BH * BW;
      const brickWithMortarVolume = (BL + MT) * (BH + MT) * (BW + MT);
      const mortarPerBrick = brickWithMortarVolume - brickVolume;
      const totalMortar = mortarPerBrick * totalBricks;

      setResults({
        bricks: totalBricks,
        mortarVolume: totalMortar,
        wallArea: wallArea,
        bricksPerM2: bricksPerM2,
      });
    }
  };

  const reset = () => {
    setWallLength(""); setWallHeight(""); setBrickLength(""); setBrickHeight("");
    setBrickWidth(""); setMortarThickness(""); setWaste("5"); setResults(null);
  };

  const brickPieData = results
    ? [
        { name: "Net Bricks", value: Math.round(results.wallArea * results.bricksPerM2), color: "hsl(var(--chart-1))" },
        { name: "Waste Allowance", value: results.bricks - Math.round(results.wallArea * results.bricksPerM2), color: "hsl(var(--chart-2))" },
      ]
    : [];

  const standardBrickSizes = [
    { name: "Modular (US)", size: "194 × 92 × 57 mm", bricksPerM2: 54 },
    { name: "Standard (UK)", size: "215 × 102.5 × 65 mm", bricksPerM2: 44 },
    { name: "Indian Standard", size: "190 × 90 × 90 mm", bricksPerM2: 50 },
    { name: "Australian", size: "230 × 110 × 76 mm", bricksPerM2: 40 },
    { name: "Jumbo", size: "203 × 92 × 70 mm", bricksPerM2: 47 },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Brick Calculator</CardTitle>
          <CardDescription>
            Calculate how many bricks you need for your wall. Enter wall dimensions, brick size, and mortar thickness to get accurate quantities with waste allowance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Wall Length (m)</Label><Input value={wallLength} onChange={e => setWallLength(e.target.value)} placeholder="e.g., 5" /></div>
              <div><Label>Wall Height (m)</Label><Input value={wallHeight} onChange={e => setWallHeight(e.target.value)} placeholder="e.g., 3" /></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div><Label>Brick Length (mm)</Label><Input value={brickLength} onChange={e => setBrickLength(e.target.value)} placeholder="230" /></div>
              <div><Label>Brick Height (mm)</Label><Input value={brickHeight} onChange={e => setBrickHeight(e.target.value)} placeholder="75" /></div>
              <div><Label>Brick Width (mm)</Label><Input value={brickWidth} onChange={e => setBrickWidth(e.target.value)} placeholder="110" /></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Mortar Thickness (mm)</Label><Input value={mortarThickness} onChange={e => setMortarThickness(e.target.value)} placeholder="10" /></div>
              <div><Label>Waste Factor (%)</Label><Input value={waste} onChange={e => setWaste(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Bricks</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Bricks Needed</p>
                    <p className="text-4xl font-bold">{results.bricks}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mortar Volume</p>
                    <p className="text-2xl font-bold">{Math.round(results.mortarVolume * 1000) / 1000} m³</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Wall Area: {results.wallArea.toFixed(2)} m² | Bricks per m²: {results.bricksPerM2.toFixed(1)}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Brick Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-64">
              <ChartContainer
                config={{
                  netBricks: {
                    label: "Net Bricks",
                    color: "hsl(var(--chart-1))",
                  },
                  waste: {
                    label: "Waste Allowance",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={brickPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {brickPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Bricks for a Wall</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Brick calculation is straightforward once you know the formula. First, find the wall area by multiplying length and height. Then calculate the area of one brick including mortar. Divide wall area by brick area to get bricks per square meter, then multiply by total wall area.
          </p>

          <div className="rounded-lg border p-4 bg-muted">
            <h4 className="font-semibold text-sm mb-2">The Formula</h4>
            <div className="font-mono text-xs space-y-2">
              <p>Wall Area = Length × Height</p>
              <p>Brick Area (with mortar) = (Length + Mortar) × (Height + Mortar)</p>
              <p>Bricks per m² = 1 ÷ Brick Area</p>
              <p>Total Bricks = Wall Area × Bricks per m² × (1 + Waste %)</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Always add a waste allowance. For simple walls, 5% is enough. For complex shapes with cuts around windows and doors, use 10%. If you are new to bricklaying, 15% waste is safer - broken bricks and bad cuts add up quickly.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Standard Brick Sizes Around the World</CardTitle>
          <CardDescription>Common brick dimensions and coverage rates</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brick Type</TableHead>
                <TableHead>Dimensions (L × W × H)</TableHead>
                <TableHead>Bricks per m²</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standardBrickSizes.map((brick) => (
                <TableRow key={brick.name}>
                  <TableCell className="font-medium">{brick.name}</TableCell>
                  <TableCell className="font-mono text-xs">{brick.size}</TableCell>
                  <TableCell className="font-mono text-xs">{brick.bricksPerM2}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Bricks per m² assumes 10mm mortar joints. Actual coverage varies slightly based on workmanship and mortar thickness.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mortar Requirements for Brickwork</CardTitle>
          <CardDescription>Typical mortar mix ratios and quantities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mortar Mix</TableHead>
                <TableHead>Cement : Sand</TableHead>
                <TableHead>Use Case</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Type N</TableCell>
                <TableCell className="font-mono text-xs">1 : 6</TableCell>
                <TableCell className="text-xs">General purpose, above ground</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Type S</TableCell>
                <TableCell className="font-mono text-xs">1 : 4.5</TableCell>
                <TableCell className="text-xs">Below grade, foundations, retaining walls</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Type M</TableCell>
                <TableCell className="font-mono text-xs">1 : 3</TableCell>
                <TableCell className="text-xs">High strength, heavy loads</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Type O</TableCell>
                <TableCell className="font-mono text-xs">1 : 8</TableCell>
                <TableCell className="text-xs">Interior, non-load bearing</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="rounded-lg border p-4 bg-muted">
            <h4 className="font-semibold text-sm mb-2">Mortar Quantity Guide</h4>
            <p className="text-xs text-muted-foreground">
              For standard brickwork with 10mm joints, expect to use about 0.02-0.025 m³ of mortar per square meter of wall. This translates to roughly 1 bag of cement (50kg) per 10-12 m² of single-brick wall, or about 6-8 wheelbarrows of sand.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brick Wall Cost Estimator</CardTitle>
          <CardDescription>Rough cost guidelines for brick walls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Average Cost (USD)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Common bricks</TableCell>
                <TableCell className="text-xs">per brick</TableCell>
                <TableCell className="font-mono text-xs">$0.50 - $0.80</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Face bricks</TableCell>
                <TableCell className="text-xs">per brick</TableCell>
                <TableCell className="font-mono text-xs">$1.00 - $2.50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Engineering bricks</TableCell>
                <TableCell className="text-xs">per brick</TableCell>
                <TableCell className="font-mono text-xs">$1.50 - $3.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mortar materials</TableCell>
                <TableCell className="text-xs">per m²</TableCell>
                <TableCell className="font-mono text-xs">$3 - $5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Labor (professional)</TableCell>
                <TableCell className="text-xs">per m²</TableCell>
                <TableCell className="font-mono text-xs">$40 - $80</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Costs vary significantly by region, brick type, and wall complexity. DIY saves labor costs but factor in tool rental and your time.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I measure my wall for bricks?</h4>
            <p className="text-xs text-muted-foreground">
              Measure the total length and height of the wall in meters. For walls with windows or doors, calculate the total wall area first, then subtract the area of openings. For example, a 5m × 3m wall with a 2m × 1.5m window: (5 × 3) - (2 × 1.5) = 12 m².
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the standard mortar joint thickness?</h4>
            <p className="text-xs text-muted-foreground">
              Standard mortar joints are 10mm thick. This applies to both horizontal bed joints and vertical perpend joints. Thicker joints weaken the wall and use more mortar. Thinner joints are harder to lay accurately and may not bond properly.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How much waste should I allow for?</h4>
            <p className="text-xs text-muted-foreground">
              For simple rectangular walls with few cuts, 5% waste is adequate. For walls with many openings (windows, doors) requiring brick cuts, use 10%. If you are a beginner or working on complex shapes like curves or arches, allow 15% waste.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How many bricks do I need for a 10×10 foot wall?</h4>
            <p className="text-xs text-muted-foreground">
              A 10×10 foot wall is about 9.3 m². Using standard modular bricks (54 per m²), you need roughly 500 bricks. Adding 10% waste brings this to 550 bricks. For a double-brick thick wall, double these quantities.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use this calculator for pavers?</h4>
            <p className="text-xs text-muted-foreground">
              Yes, the same principle applies. Enter the area to be paved and the paver dimensions. However, paver calculations typically use lower waste factors (3-5%) since cutting is less common. Also, pavers are laid on sand bedding, not mortar.
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
              <p className="text-xs text-muted-foreground">Calculate concrete for foundations</p>
            </a>
            <a href="/calculators/mortar-volume-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Mortar Volume Calculator</p>
              <p className="text-xs text-muted-foreground">Estimate mortar quantities</p>
            </a>
            <a href="/calculators/tile-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Tile Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate tiles for floors and walls</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
