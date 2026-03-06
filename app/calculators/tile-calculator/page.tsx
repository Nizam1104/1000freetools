"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

export default function TileCalculator() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [tileLength, setTileLength] = useState<string>("");
  const [tileWidth, setTileWidth] = useState<string>("");
  const [waste, setWaste] = useState<string>("10");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const roomL = parseFloat(length);
    const roomW = parseFloat(width);
    const tileL = parseFloat(tileLength) / 100;
    const tileW = parseFloat(tileWidth) / 100;
    const wasteFactor = 1 + parseFloat(waste) / 100;

    if (roomL > 0 && roomW > 0 && tileL > 0 && tileW > 0) {
      const roomArea = roomL * roomW;
      const tileArea = tileL * tileW;
      const tilesNeeded = Math.ceil((roomArea / tileArea) * wasteFactor);
      const boxesNeeded = Math.ceil(tilesNeeded / 10);

      setResults({
        area: roomArea,
        tiles: tilesNeeded,
        boxes: boxesNeeded,
        tileArea: tileArea * tilesNeeded,
        perimeter: 2 * (roomL + roomW),
      });
    }
  };

  const reset = () => {
    setLength(""); setWidth(""); setTileLength(""); setTileWidth("");
    setWaste("10"); setResults(null);
  };

  const pieData = results ? [
    { name: "Net Tiles", value: Math.ceil((results.area / (parseFloat(tileLength)/100 * parseFloat(tileWidth)/100))), color: "hsl(var(--chart-1))" },
    { name: "Waste", value: results.tiles - Math.ceil((results.area / (parseFloat(tileLength)/100 * parseFloat(tileWidth)/100))), color: "hsl(var(--chart-2))" },
  ] : [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Room Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              <div><Label>Room Width (m)</Label><Input value={width} onChange={e => setWidth(e.target.value)} /></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Tile Length (cm)</Label><Input value={tileLength} onChange={e => setTileLength(e.target.value)} /></div>
              <div><Label>Tile Width (cm)</Label><Input value={tileWidth} onChange={e => setTileWidth(e.target.value)} /></div>
            </div>

            <div>
              <Label>Waste Factor (%)</Label>
              <Input type="number" value={waste} onChange={e => setWaste(e.target.value)} />
              <p className="text-sm text-muted-foreground mt-1">Recommended: 10% for straight lay, 15-20% for diagonal patterns</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Tiles</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Room Area</p>
                    <p className="text-2xl font-bold">{Math.round(results.area * 100) / 100} m²</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tiles Needed</p>
                    <p className="text-3xl font-bold">{results.tiles}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Boxes (10/box)</p>
                    <p className="text-2xl font-bold">{results.boxes}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tile Area</p>
                    <p className="text-2xl font-bold">{Math.round(results.tileArea * 100) / 100} m²</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {results && pieData.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Tile Breakdown</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-[200px]">
                  <ChartContainer
                    config={{
                      net: { label: "Net Tiles", color: "hsl(var(--chart-1))" },
                      waste: { label: "Waste", color: "hsl(var(--chart-2))" },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="flex items-center justify-center">
                  <div className="space-y-4 text-center">
                    <div>
                      <p className="text-4xl font-bold">{results.tiles}</p>
                      <p className="text-sm text-muted-foreground">Total tiles needed</p>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">At 10 tiles per box</p>
                      <p className="text-2xl font-semibold">{results.boxes} boxes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Waste Factors for Tiling</CardTitle>
          <CardDescription>How much extra to buy</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Layout Pattern</TableHead>
                <TableHead>Waste Factor</TableHead>
                <TableHead>When to Use</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Straight lay (grid)</TableCell>
                <TableCell className="font-mono text-xs">10%</TableCell>
                <TableCell className="text-xs">Standard installation, rectangular rooms</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Diagonal (45°)</TableCell>
                <TableCell className="font-mono text-xs">15%</TableCell>
                <TableCell className="text-xs">Diamond pattern, more cuts at edges</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Herringbone</TableCell>
                <TableCell className="font-mono text-xs">15-20%</TableCell>
                <TableCell className="text-xs">Complex pattern, many angled cuts</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Hexagon/Mosaic</TableCell>
                <TableCell className="font-mono text-xs">15-20%</TableCell>
                <TableCell className="text-xs">Irregular shapes, more waste at borders</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Large format tiles</TableCell>
                <TableCell className="font-mono text-xs">10-15%</TableCell>
                <TableCell className="text-xs">More prone to breakage during cutting</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Always buy extra tiles for future repairs. Dye lots vary, and discontinued tiles can't be matched later.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Tile Sizes</CardTitle>
          <CardDescription>Standard dimensions for reference</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tile Type</TableHead>
                <TableHead>Common Sizes (cm)</TableHead>
                <TableHead>Common Sizes (inches)</TableHead>
                <TableHead>Tiles per m²</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Mosaic</TableCell>
                <TableCell className="font-mono text-xs">2.5×2.5, 5×5</TableCell>
                <TableCell className="font-mono text-xs">1×1, 2×2</TableCell>
                <TableCell className="font-mono text-xs">400, 100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Subway</TableCell>
                <TableCell className="font-mono text-xs">7.5×15, 10×20</TableCell>
                <TableCell className="font-mono text-xs">3×6, 4×8</TableCell>
                <TableCell className="font-mono text-xs">89, 50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Wall tile</TableCell>
                <TableCell className="font-mono text-xs">20×20, 20×25</TableCell>
                <TableCell className="font-mono text-xs">8×8, 8×10</TableCell>
                <TableCell className="font-mono text-xs">25, 20</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Floor tile</TableCell>
                <TableCell className="font-mono text-xs">30×30, 40×40</TableCell>
                <TableCell className="font-mono text-xs">12×12, 16×16</TableCell>
                <TableCell className="font-mono text-xs">11, 6.25</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Large format</TableCell>
                <TableCell className="font-mono text-xs">60×60, 80×80</TableCell>
                <TableCell className="font-mono text-xs">24×24, 32×32</TableCell>
                <TableCell className="font-mono text-xs">2.78, 1.56</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Plank tile</TableCell>
                <TableCell className="font-mono text-xs">15×90, 20×120</TableCell>
                <TableCell className="font-mono text-xs">6×36, 8×48</TableCell>
                <TableCell className="font-mono text-xs">7.4, 4.2</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tile Installation Cost Estimates</CardTitle>
          <CardDescription>Average costs by tile type</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tile Type</TableHead>
                <TableHead>Material Cost (/m²)</TableHead>
                <TableHead>Installation Cost (/m²)</TableHead>
                <TableHead>Total Project Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Ceramic (basic)</TableCell>
                <TableCell className="font-mono text-xs">$15-30</TableCell>
                <TableCell className="font-mono text-xs">$30-50</TableCell>
                <TableCell className="font-mono text-xs">$45-80/m²</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Porcelain</TableCell>
                <TableCell className="font-mono text-xs">$25-60</TableCell>
                <TableCell className="font-mono text-xs">$40-70</TableCell>
                <TableCell className="font-mono text-xs">$65-130/m²</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Natural stone</TableCell>
                <TableCell className="font-mono text-xs">$50-150</TableCell>
                <TableCell className="font-mono text-xs">$60-100</TableCell>
                <TableCell className="font-mono text-xs">$110-250/m²</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Glass mosaic</TableCell>
                <TableCell className="font-mono text-xs">$40-100</TableCell>
                <TableCell className="font-mono text-xs">$70-120</TableCell>
                <TableCell className="font-mono text-xs">$110-220/m²</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Luxury vinyl tile</TableCell>
                <TableCell className="font-mono text-xs">$20-50</TableCell>
                <TableCell className="font-mono text-xs">$25-45</TableCell>
                <TableCell className="font-mono text-xs">$45-95/m²</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Costs vary by region, room complexity, and substrate preparation needs. Remove old tile adds $5-15/m².
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I measure my room for tiling?</h4>
            <p className="text-xs text-muted-foreground">
              Measure the longest length and widest width, even if the room isn't perfectly rectangular. For L-shaped rooms, split into rectangles and add the areas. Don't subtract for cabinets or islands – you need tile under them for proper height matching.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I buy all tiles at once?</h4>
            <p className="text-xs text-muted-foreground">
              Yes, always. Tiles from different production batches can have slight color variations (dye lot differences). Buy everything you need plus 10-15% extra in one purchase. Keep spare tiles for future repairs – finding an exact match years later is nearly impossible.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How much grout do I need?</h4>
            <p className="text-xs text-muted-foreground">
              Rough estimate: 1 kg of grout per m² for standard 3mm joints. Larger tiles with wider joints need more. A 25kg bag typically covers 20-30 m² of floor tile. Your tile supplier can calculate exact amounts based on tile size and joint width.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between ceramic and porcelain tile?</h4>
            <p className="text-xs text-muted-foreground">
              Porcelain is denser, fired at higher temperatures, and absorbs less than 0.5% water. Ceramic is more porous and softer. Porcelain works outdoors and in wet areas; ceramic is fine for interior walls. Porcelain costs more but lasts longer.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I tile over existing tile?</h4>
            <p className="text-xs text-muted-foreground">
              Sometimes. The existing tile must be firmly attached, level, and clean. You'll need a specialty primer and thin-set mortar designed for tile-over-tile. Height buildup is the main issue – doors may need trimming, and transitions to other floors become awkward.
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
            <a href="/calculators/ceiling-tile-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Ceiling Tile Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate ceiling tiles needed</p>
            </a>
            <a href="/calculators/concrete-volume-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Concrete Volume</p>
              <p className="text-xs text-muted-foreground">For subfloor preparation</p>
            </a>
            <a href="/calculators/floor-area-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Floor Area Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate room area</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
