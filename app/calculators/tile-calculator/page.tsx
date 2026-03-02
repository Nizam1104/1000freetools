"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    const tileL = parseFloat(tileLength) / 100; // Convert cm to m
    const tileW = parseFloat(tileWidth) / 100;
    const wasteFactor = 1 + parseFloat(waste) / 100;

    if (roomL > 0 && roomW > 0 && tileL > 0 && tileW > 0) {
      const roomArea = roomL * roomW;
      const tileArea = tileL * tileW;
      const tilesNeeded = Math.ceil((roomArea / tileArea) * wasteFactor);
      const boxesNeeded = Math.ceil(tilesNeeded / 10); // Assume 10 tiles per box

      setResults({
        area: roomArea,
        tiles: tilesNeeded,
        boxes: boxesNeeded,
        tileArea: tileArea * tilesNeeded,
      });
    }
  };

  const reset = () => {
    setLength(""); setWidth(""); setTileLength(""); setTileWidth("");
    setWaste("10"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Tile Calculator – How Many Tiles Do You Need?</CardTitle>
          <CardDescription>
            Plan your tiling project accurately with our tile calculator. Enter room dimensions and tile size to calculate the number of tiles needed, including a recommended waste allowance.
          </CardDescription>
        </CardHeader>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Room Area</p>
                    <p className="text-2xl font-bold">{Math.round(results.area * 100) / 100} m²</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tiles Needed</p>
                    <p className="text-3xl font-bold">{results.tiles}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Boxes (10 tiles/box)</p>
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
        </CardContent>
      </Card>
    </div>
  );
}
