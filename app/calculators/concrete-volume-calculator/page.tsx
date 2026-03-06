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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function ConcreteVolumeCalculator() {
  const [shape, setShape] = useState<"slab" | "column" | "footing" | "wall">("slab");
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [depth, setDepth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [waste, setWaste] = useState<string>("10");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    let volume = 0;
    const wasteFactor = 1 + parseFloat(waste) / 100;

    switch (shape) {
      case "slab":
      case "footing":
        const L = parseFloat(length);
        const W = parseFloat(width);
        const D = parseFloat(depth);
        if (L > 0 && W > 0 && D > 0) volume = L * W * D;
        break;
      case "column":
        const dia = parseFloat(diameter);
        const H = parseFloat(height);
        if (dia > 0 && H > 0) volume = Math.PI * Math.pow(dia / 2, 2) * H;
        break;
      case "wall":
        const WL = parseFloat(length);
        const WH = parseFloat(height);
        const WT = parseFloat(depth);
        if (WL > 0 && WH > 0 && WT > 0) volume = WL * WH * WT;
        break;
    }

    if (volume > 0) {
      const withWaste = volume * wasteFactor;
      setResults({
        volume: volume,
        withWaste: withWaste,
        cubicYards: withWaste * 1.30795,
        bags80lb: Math.ceil((withWaste * 1.30795 * 27) / 0.6),
        bags60lb: Math.ceil((withWaste * 1.30795 * 27) / 0.45),
        bags40lb: Math.ceil((withWaste * 1.30795 * 27) / 0.3),
      });
    }
  };

  const reset = () => {
    setLength(""); setWidth(""); setDepth(""); setHeight(""); setDiameter("");
    setWaste("10"); setResults(null);
  };

  // Generate cost comparison data
  const costData = results ? [
    { name: "40lb Bags", count: results.bags40lb, fill: "var(--color-40lb)" },
    { name: "60lb Bags", count: results.bags60lb, fill: "var(--color-60lb)" },
    { name: "80lb Bags", count: results.bags80lb, fill: "var(--color-80lb)" },
  ] : [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Shape</Label>
              <Select value={shape} onValueChange={(v) => setShape(v as typeof shape)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="slab">Slab</SelectItem>
                  <SelectItem value="column">Column</SelectItem>
                  <SelectItem value="footing">Footing</SelectItem>
                  <SelectItem value="wall">Wall</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {shape === "column" ? (
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Diameter (m)</Label><Input value={diameter} onChange={e => setDiameter(e.target.value)} /></div>
                <div><Label>Height (m)</Label><Input value={height} onChange={e => setHeight(e.target.value)} /></div>
              </div>
            ) : shape === "wall" ? (
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
                <div><Label>Height (m)</Label><Input value={height} onChange={e => setHeight(e.target.value)} /></div>
                <div><Label>Thickness (m)</Label><Input value={depth} onChange={e => setDepth(e.target.value)} /></div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
                <div><Label>Width (m)</Label><Input value={width} onChange={e => setWidth(e.target.value)} /></div>
                <div><Label>Depth (m)</Label><Input value={depth} onChange={e => setDepth(e.target.value)} /></div>
              </div>
            )}

            <div>
              <Label>Waste Factor (%)</Label>
              <Input type="number" value={waste} onChange={e => setWaste(e.target.value)} />
              <p className="text-sm text-muted-foreground mt-1">Recommended: 5-10% for slabs, 10-15% for complex shapes</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Volume</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Volume (m³)</p>
                    <p className="text-2xl font-bold">{Math.round(results.volume * 100) / 100}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">With Waste (m³)</p>
                    <p className="text-2xl font-bold">{Math.round(results.withWaste * 100) / 100}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cubic Yards</p>
                    <p className="text-2xl font-bold">{Math.round(results.cubicYards * 10) / 10}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">80lb Bags</p>
                    <p className="text-2xl font-bold">{results.bags80lb}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">40lb Bags</p>
                    <p className="text-lg font-semibold">{results.bags40lb}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">60lb Bags</p>
                    <p className="text-lg font-semibold">{results.bags60lb}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">80lb Bags</p>
                    <p className="text-lg font-semibold">{results.bags80lb}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {results && costData.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Bag Options Comparison</h3>
              <div className="h-[200px]">
                <ChartContainer
                  config={{
                    "40lb": { label: "40lb Bags", color: "hsl(var(--chart-1))" },
                    "60lb": { label: "60lb Bags", color: "hsl(var(--chart-2))" },
                    "80lb": { label: "80lb Bags", color: "hsl(var(--chart-3))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="#8884d8" />
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
          <CardTitle>How to Calculate Concrete Volume</CardTitle>
          <CardDescription>Formulas for different shapes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Concrete volume is just length × width × depth for rectangular shapes. For a 10×12 foot slab that's 4 inches thick: 10 × 12 × 0.33 = 40 cubic feet, or about 1.5 cubic yards. Add 10% for waste and you order 1.65 yards.
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-semibold mb-2">Volume Formulas</p>
            <div className="space-y-2 text-xs font-mono">
              <p><strong>Slab/Footing:</strong> Length × Width × Depth</p>
              <p><strong>Wall:</strong> Length × Height × Thickness</p>
              <p><strong>Column:</strong> π × (diameter/2)² × Height</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            The waste factor matters more than people think. Spillage, over-excavation, and form bowing all eat concrete. A 10% waste factor means ordering 1.1 cubic yards for every 1 yard calculated. For complex forms or pump trucks, bump it to 15%.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Waste Factors</CardTitle>
          <CardDescription>How much extra to order</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Type</TableHead>
                <TableHead>Waste Factor</TableHead>
                <TableHead>Why</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Simple slab on grade</TableCell>
                <TableCell className="font-mono text-xs">5-7%</TableCell>
                <TableCell className="text-xs">Minimal formwork, easy pour</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Standard footings</TableCell>
                <TableCell className="font-mono text-xs">7-10%</TableCell>
                <TableCell className="text-xs">Some trench over-excavation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Columns and walls</TableCell>
                <TableCell className="font-mono text-xs">10-12%</TableCell>
                <TableCell className="text-xs">Form work complexity, spillage</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Complex shapes/stamped</TableCell>
                <TableCell className="font-mono text-xs">12-15%</TableCell>
                <TableCell className="text-xs">Cutting waste, pattern matching</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Pump truck delivery</TableCell>
                <TableCell className="font-mono text-xs">+3-5%</TableCell>
                <TableCell className="text-xs">Concrete left in pump lines</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Concrete Bag Yields</CardTitle>
          <CardDescription>How much concrete per bag</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bag Size</TableHead>
                <TableHead>Yield (cubic feet)</TableHead>
                <TableHead>Yield (cubic yards)</TableHead>
                <TableHead>Bags per Cubic Yard</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">40 lb bag</TableCell>
                <TableCell className="font-mono text-xs">0.30 cu ft</TableCell>
                <TableCell className="font-mono text-xs">0.011 cu yd</TableCell>
                <TableCell className="font-mono text-xs">90 bags</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">60 lb bag</TableCell>
                <TableCell className="font-mono text-xs">0.45 cu ft</TableCell>
                <TableCell className="font-mono text-xs">0.017 cu yd</TableCell>
                <TableCell className="font-mono text-xs">60 bags</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">80 lb bag</TableCell>
                <TableCell className="font-mono text-xs">0.60 cu ft</TableCell>
                <TableCell className="font-mono text-xs">0.022 cu yd</TableCell>
                <TableCell className="font-mono text-xs">45 bags</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Yields are approximate and vary by brand and water content. Quikrete and Sakrete have slightly different formulations.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Concrete Volume Examples</CardTitle>
          <CardDescription>Common project calculations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Dimensions</TableHead>
                <TableHead>Volume (no waste)</TableHead>
                <TableHead>With 10% Waste</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">10×12 patio, 4" thick</TableCell>
                <TableCell className="text-xs">10′ × 12′ × 0.33′</TableCell>
                <TableCell className="font-mono text-xs">1.48 cu yd</TableCell>
                <TableCell className="font-mono text-xs">1.63 cu yd</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">24×24 garage slab, 5" thick</TableCell>
                <TableCell className="text-xs">24′ × 24′ × 0.42′</TableCell>
                <TableCell className="font-mono text-xs">8.89 cu yd</TableCell>
                <TableCell className="font-mono text-xs">9.78 cu yd</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Deck footing, 4 columns</TableCell>
                <TableCell className="text-xs">12" dia × 36" deep</TableCell>
                <TableCell className="font-mono text-xs">2.62 cu yd</TableCell>
                <TableCell className="font-mono text-xs">2.88 cu yd</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Retaining wall</TableCell>
                <TableCell className="text-xs">20′ × 4′ × 1′</TableCell>
                <TableCell className="font-mono text-xs">2.96 cu yd</TableCell>
                <TableCell className="font-mono text-xs">3.26 cu yd</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I convert cubic feet to cubic yards?</h4>
            <p className="text-xs text-muted-foreground">
              Divide cubic feet by 27. There are 27 cubic feet in a cubic yard (3×3×3). A 10×10 slab at 4 inches is 33 cubic feet, which equals 1.22 cubic yards. Ready-mix companies sell by the yard, not by the foot.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I buy bags or ready-mix?</h4>
            <p className="text-xs text-muted-foreground">
              Bags make sense for projects under 1 cubic yard – a small patio, post holes, or repairs. Anything over 2 yards and ready-mix delivery is cheaper and less labor. Between 1-2 yards, it depends on your access and back strength.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What happens if I order too little concrete?</h4>
            <p className="text-xs text-muted-foreground">
              Ready-mix companies charge "short load" fees for orders under their minimum (usually 4-5 yards). If you're short mid-pour, you're in trouble – concrete sets in 90 minutes. Always round up. Leftover concrete can be used for stepping stones or garden edging.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How thick should a concrete slab be?</h4>
            <p className="text-xs text-muted-foreground">
              Residential patios and sidewalks: 4 inches. Driveways: 5-6 inches (more if you park heavy trucks). Shop floors: 6 inches minimum. Garage floors with lifts: 6-8 inches with rebar. Thicker isn't always better – proper subgrade preparation matters more.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Do I need rebar in my concrete?</h4>
            <p className="text-xs text-muted-foreground">
              For slabs on grade (patios, sidewalks), welded wire mesh is usually enough. Driveways and structural slabs need rebar – typically #3 (3/8") or #4 (1/2") bars on 18-inch centers. Columns and footings always need vertical rebar. Check local codes.
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
            <a href="/calculators/concrete-mix-ratio-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Concrete Mix Ratio</p>
              <p className="text-xs text-muted-foreground">Calculate cement, sand, aggregate</p>
            </a>
            <a href="/calculators/steel-weight-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Steel Weight Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate rebar weight</p>
            </a>
            <a href="/calculators/tile-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Tile Calculator</p>
              <p className="text-xs text-muted-foreground">Plan your tiling project</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
