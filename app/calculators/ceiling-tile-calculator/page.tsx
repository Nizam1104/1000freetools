"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      </div>
    </div>
  );
}
