"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CeilingResult {
  roomArea: number;
  tileArea: number;
  tilesNeeded: number;
  wasteAllowance: number;
  totalTiles: number;
  boxesNeeded: number;
  cost: number;
  recommendations: string[];
}

export default function CeilingTileCalculatorPage() {
  const [roomLength, setRoomLength] = useState<string>("");
  const [roomWidth, setRoomWidth] = useState<string>("");
  const [tileSize, setTileSize] = useState<string>("60");
  const [wastePercent, setWastePercent] = useState<string>("10");
  const [tilesPerBox, setTilesPerBox] = useState<string>("8");
  const [pricePerBox, setPricePerBox] = useState<string>("");
  const [unit, setUnit] = useState<string>("cm");
  const [result, setResult] = useState<CeilingResult | null>(null);

  const calculate = () => {
    const lengthNum = parseFloat(roomLength) || 0;
    const widthNum = parseFloat(roomWidth) || 0;
    const tileSizeNum = parseFloat(tileSize) || 60;
    const wasteNum = parseFloat(wastePercent) || 10;
    const tilesPerBoxNum = parseInt(tilesPerBox) || 8;
    const pricePerBoxNum = parseFloat(pricePerBox) || 0;

    if (lengthNum === 0 || widthNum === 0) return;

    // Convert to cm if needed
    let lengthCm = lengthNum;
    let widthCm = widthNum;

    if (unit === "meters") {
      lengthCm = lengthNum * 100;
      widthCm = widthNum * 100;
    } else if (unit === "feet") {
      lengthCm = lengthNum * 30.48;
      widthCm = widthNum * 30.48;
    }

    // Room area in cm²
    const roomArea = lengthCm * widthCm;

    // Tile area in cm²
    const tileArea = tileSizeNum * tileSizeNum;

    // Tiles needed (without waste)
    const tilesNeeded = roomArea / tileArea;

    // Add waste allowance
    const wasteAllowance = tilesNeeded * (wasteNum / 100);
    const totalTiles = Math.ceil(tilesNeeded + wasteAllowance);

    // Boxes needed
    const boxesNeeded = Math.ceil(totalTiles / tilesPerBoxNum);

    // Total cost
    const cost = boxesNeeded * pricePerBoxNum;

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📐 Room area: ${(roomArea / 10000).toFixed(2)} m²`);
    recommendations.push(`🔲 Tile size: ${tileSizeNum}×${tileSizeNum} cm`);
    recommendations.push(`📊 Tiles needed: ${Math.ceil(tilesNeeded)} (without waste)`);
    recommendations.push(`♻️ Waste allowance (${wasteNum}%): ${Math.ceil(wasteAllowance)} tiles`);
    recommendations.push(`📦 Total tiles: ${totalTiles}`);
    recommendations.push(`📦 Boxes needed: ${boxesNeeded} (${tilesPerBoxNum} tiles/box)`);

    if (pricePerBoxNum > 0) {
      recommendations.push(`💰 Estimated cost: $${cost.toFixed(2)}`);
    }

    if (wasteNum < 5) {
      recommendations.push("⚠️ Low waste allowance - consider increasing for complex rooms");
    } else if (wasteNum > 15) {
      recommendations.push("✅ Generous waste allowance for complex cuts");
    }

    recommendations.push("📏 Always measure twice before ordering");
    recommendations.push("🔪 Order extra tiles for future repairs");

    setResult({
      roomArea: parseFloat((roomArea / 10000).toFixed(2)),
      tileArea: parseFloat((tileArea / 10000).toFixed(2)),
      tilesNeeded: Math.ceil(tilesNeeded),
      wasteAllowance: Math.ceil(wasteAllowance),
      totalTiles,
      boxesNeeded,
      cost: parseFloat(cost.toFixed(2)),
      recommendations,
    });
  };

  const reset = () => {
    setRoomLength("");
    setRoomWidth("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Ceiling Tile Calculator – How Many Ceiling Tiles Do You Need?
          </h1>
          <p className="text-muted-foreground">
            Order the right number of ceiling tiles every time with our Ceiling Tile Calculator.
            Input your ceiling dimensions and tile size to calculate the total number of tiles
            needed, complete with a percentage allowance for waste and cuts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="length">Room Length</Label>
                  <Input
                    id="length"
                    type="number"
                    value={roomLength}
                    onChange={(e) => setRoomLength(e.target.value)}
                    placeholder="5"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="width">Room Width</Label>
                  <Input
                    id="width"
                    type="number"
                    value={roomWidth}
                    onChange={(e) => setRoomWidth(e.target.value)}
                    placeholder="4"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meters">Meters</SelectItem>
                      <SelectItem value="cm">Centimeters</SelectItem>
                      <SelectItem value="feet">Feet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="tile-size">Tile Size (cm)</Label>
                  <Select value={tileSize} onValueChange={setTileSize}>
                    <SelectTrigger id="tile-size">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30×30 cm</SelectItem>
                      <SelectItem value="45">45×45 cm</SelectItem>
                      <SelectItem value="60">60×60 cm</SelectItem>
                      <SelectItem value="62.5">62.5×62.5 cm</SelectItem>
                      <SelectItem value="120">120×60 cm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="waste">Waste Allowance (%)</Label>
                  <Input
                    id="waste"
                    type="number"
                    value={wastePercent}
                    onChange={(e) => setWastePercent(e.target.value)}
                    placeholder="10"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="tiles-box">Tiles per Box</Label>
                  <Input
                    id="tiles-box"
                    type="number"
                    value={tilesPerBox}
                    onChange={(e) => setTilesPerBox(e.target.value)}
                    placeholder="8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price per Box ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={pricePerBox}
                  onChange={(e) => setPricePerBox(e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Tile Requirements</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Total Tiles Needed</p>
                    <p className="text-4xl font-bold text-primary">{result.totalTiles}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {result.boxesNeeded} boxes ({result.tilesNeeded} + {result.wasteAllowance} waste)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Room Area</p>
                      <p className="text-lg font-bold">{result.roomArea} m²</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Tile Size</p>
                      <p className="text-lg font-bold">{result.tileArea / 10000} m²</p>
                    </div>
                  </div>

                  {result.cost > 0 && (
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Estimated Cost</span>
                        <span className="text-2xl font-bold text-green-700 dark:text-green-300">
                          ${result.cost}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {result.boxesNeeded} boxes × ${result.cost / result.boxesNeeded} each
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Breakdown</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter room dimensions and click Calculate to see requirements</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Ceiling Tile Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Waste allowance:</strong> 10% for simple rooms, 15% for complex
                  </li>
                  <li>
                    <strong>Standard sizes:</strong> 60×60cm and 62.5×62.5cm are most common
                  </li>
                  <li>
                    <strong>Grid system:</strong> Account for border tiles and cuts
                  </li>
                  <li>
                    <strong>Order extra:</strong> Keep spare tiles for future repairs
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> This calculator provides estimates. Always verify
                  measurements on-site and check with your supplier for exact box quantities
                  and availability.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content Section */}
        <div className="mt-12 space-y-12">
          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">How to Calculate Ceiling Tiles Needed</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Measure Your Room</h3>
                  <p className="text-muted-foreground text-sm">Enter the length and width of your ceiling in meters, centimeters, or feet.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Choose Tile Size</h3>
                  <p className="text-muted-foreground text-sm">Select standard tile sizes (60×60cm, 62.5×62.5cm, etc.) and set waste allowance.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-2">Get Order Quantity</h3>
                  <p className="text-muted-foreground text-sm">See total tiles needed, boxes to order, and estimated cost for your project.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Benefits */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Why Use This Ceiling Tile Calculator?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">📏 Accurate Material Estimates</h3>
                <p className="text-muted-foreground text-sm">Avoid costly over-ordering or project delays from under-ordering with precise tile calculations.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">♻️ Waste Allowance Included</h3>
                <p className="text-muted-foreground text-sm">Automatically adds cut waste percentage (typically 10-15%) for realistic order quantities.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📦 Box Quantity Calculator</h3>
                <p className="text-muted-foreground text-sm">Converts total tiles to full boxes based on tiles per box, matching supplier packaging.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">💰 Cost Estimation</h3>
                <p className="text-muted-foreground text-sm">Enter price per box to get total project cost for budgeting and comparison shopping.</p>
              </div>
            </div>
          </section>

          {/* Reference Table */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Standard Ceiling Tile Sizes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Tile Size</th>
                    <th className="text-left py-3 px-4">Area per Tile</th>
                    <th className="text-left py-3 px-4">Tiles per m²</th>
                    <th className="text-left py-3 px-4">Common Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">30×30 cm</td>
                    <td className="py-3 px-4">0.09 m²</td>
                    <td className="py-3 px-4">11.1 tiles</td>
                    <td className="py-3 px-4">Small rooms, decorative</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">45×45 cm</td>
                    <td className="py-3 px-4">0.20 m²</td>
                    <td className="py-3 px-4">4.9 tiles</td>
                    <td className="py-3 px-4">Residential ceilings</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">60×60 cm</td>
                    <td className="py-3 px-4">0.36 m²</td>
                    <td className="py-3 px-4">2.8 tiles</td>
                    <td className="py-3 px-4">Standard commercial</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">62.5×62.5 cm</td>
                    <td className="py-3 px-4">0.39 m²</td>
                    <td className="py-3 px-4">2.56 tiles</td>
                    <td className="py-3 px-4">European grid systems</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">120×60 cm</td>
                    <td className="py-3 px-4">0.72 m²</td>
                    <td className="py-3 px-4">1.4 tiles</td>
                    <td className="py-3 px-4">Large commercial spaces</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Ceiling Tile Installation FAQs</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How much waste should I allow for ceiling tiles?</h3>
                <p className="text-muted-foreground text-sm">Allow 10% waste for simple rectangular rooms. Increase to 15% for rooms with corners, alcoves, or complex layouts requiring more cuts.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What's the difference between 60cm and 62.5cm tiles?</h3>
                <p className="text-muted-foreground text-sm">60×60cm is standard in North America. 62.5×62.5cm is common in European grid systems. They're not interchangeable—match your grid system.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How do I measure for a drop ceiling?</h3>
                <p className="text-muted-foreground text-sm">Measure the length and width of the room where tiles will install (inside the grid). Multiply to get area, then use this calculator for tile count.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Should I order extra ceiling tiles?</h3>
                <p className="text-muted-foreground text-sm">Yes, order 5-10 extra tiles beyond calculated needs for future repairs. Ceiling tiles can be damaged and matching styles may be discontinued.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Can I install ceiling tiles myself?</h3>
                <p className="text-muted-foreground text-sm">Yes, drop ceiling installation is a popular DIY project. You'll need a grid system, tiles, and basic tools. Allow 1-2 days for an average room.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
        </div>
      </div>
    </div>
  );
}
