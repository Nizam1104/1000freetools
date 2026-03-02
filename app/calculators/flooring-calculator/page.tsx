"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FlooringCalculator() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [material, setMaterial] = useState<"planks" | "tiles" | "rolls">("planks");
  const [plankLength, setPlankLength] = useState<string>("");
  const [plankWidth, setPlankWidth] = useState<string>("");
  const [tileSize, setTileSize] = useState<string>("");
  const [rollWidth, setRollWidth] = useState<string>("");
  const [waste, setWaste] = useState<string>("10");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const wasteFactor = 1 + parseFloat(waste) / 100;
    const roomArea = L * W;

    if (L > 0 && W > 0) {
      let result: any = { roomArea };

      if (material === "planks") {
        const pL = parseFloat(plankLength) / 100;
        const pW = parseFloat(plankWidth) / 100;
        if (pL > 0 && pW > 0) {
          const plankArea = pL * pW;
          result.planks = Math.ceil((roomArea / plankArea) * wasteFactor);
          result.boxes = Math.ceil(result.planks / 8);
        }
      } else if (material === "tiles") {
        const tS = parseFloat(tileSize) / 100;
        if (tS > 0) {
          const tileArea = tS * tS;
          result.tiles = Math.ceil((roomArea / tileArea) * wasteFactor);
          result.boxes = Math.ceil(result.tiles / 10);
        }
      } else {
        const rW = parseFloat(rollWidth);
        if (rW > 0) {
          result.rollLength = Math.ceil((roomArea * wasteFactor) / rW * 10) / 10;
          result.rolls = Math.ceil(result.rollLength / 10);
        }
      }

      setResults(result);
    }
  };

  const reset = () => {
    setLength(""); setWidth(""); setPlankLength(""); setPlankWidth("");
    setTileSize(""); setRollWidth(""); setWaste("10"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Flooring Calculator – How Much Flooring Do You Need?</CardTitle>
          <CardDescription>
            Get accurate flooring estimates for any room with our flooring calculator. Enter room dimensions and material size to calculate the total area and number of units needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Room Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              <div><Label>Room Width (m)</Label><Input value={width} onChange={e => setWidth(e.target.value)} /></div>
            </div>

            <div>
              <Label>Material Type</Label>
              <Select value={material} onValueChange={(v) => setMaterial(v as typeof material)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="planks">Planks/Laminate</SelectItem>
                  <SelectItem value="tiles">Tiles</SelectItem>
                  <SelectItem value="rolls">Rolls/Vinyl</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {material === "planks" && (
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Plank Length (cm)</Label><Input value={plankLength} onChange={e => setPlankLength(e.target.value)} /></div>
                <div><Label>Plank Width (cm)</Label><Input value={plankWidth} onChange={e => setPlankWidth(e.target.value)} /></div>
              </div>
            )}

            {material === "tiles" && (
              <div>
                <Label>Tile Size (cm)</Label>
                <Input value={tileSize} onChange={e => setTileSize(e.target.value)} placeholder="e.g., 60" />
              </div>
            )}

            {material === "rolls" && (
              <div>
                <Label>Roll Width (m)</Label>
                <Input value={rollWidth} onChange={e => setRollWidth(e.target.value)} placeholder="e.g., 2" />
              </div>
            )}

            <div>
              <Label>Waste Factor (%)</Label>
              <Input value={waste} onChange={e => setWaste(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Room Area</p>
                  <p className="text-2xl font-bold">{Math.round(results.roomArea * 100) / 100} m²</p>
                </div>
                {material === "planks" && (
                  <>
                    <p className="text-lg font-bold">{results.planks} planks</p>
                    <p className="text-sm text-muted-foreground">≈ {results.boxes} boxes (8 planks/box)</p>
                  </>
                )}
                {material === "tiles" && (
                  <>
                    <p className="text-lg font-bold">{results.tiles} tiles</p>
                    <p className="text-sm text-muted-foreground">≈ {results.boxes} boxes (10 tiles/box)</p>
                  </>
                )}
                {material === "rolls" && (
                  <>
                    <p className="text-lg font-bold">{results.rollLength} linear meters</p>
                    <p className="text-sm text-muted-foreground">≈ {results.rolls} rolls (10m each)</p>
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
