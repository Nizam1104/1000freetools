"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    const BL = parseFloat(brickLength) / 1000; // Convert mm to m
    const BH = parseFloat(brickHeight) / 1000;
    const BW = parseFloat(brickWidth) / 1000;
    const MT = parseFloat(mortarThickness) / 1000;
    const wasteFactor = 1 + parseFloat(waste) / 100;

    if (WL > 0 && WH > 0 && BL > 0 && BH > 0 && MT > 0) {
      const wallArea = WL * WH;
      const brickAreaWithMortar = (BL + MT) * (BH + MT);
      const bricksPerM2 = 1 / brickAreaWithMortar;
      const totalBricks = Math.ceil(wallArea * bricksPerM2 * wasteFactor);
      
      // Mortar volume calculation
      const brickVolume = BL * BH * BW;
      const brickWithMortarVolume = (BL + MT) * (BH + MT) * (BW + MT);
      const mortarPerBrick = brickWithMortarVolume - brickVolume;
      const totalMortar = mortarPerBrick * totalBricks;

      setResults({
        bricks: totalBricks,
        mortarVolume: totalMortar,
        wallArea: wallArea,
      });
    }
  };

  const reset = () => {
    setWallLength(""); setWallHeight(""); setBrickLength(""); setBrickHeight("");
    setBrickWidth(""); setMortarThickness(""); setWaste("5"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Brick Calculator – How Many Bricks Do You Need for a Wall?</CardTitle>
          <CardDescription>
            Estimate bricks for your construction project with ease. Enter wall dimensions and brick size to calculate the exact quantity needed, plus mortar and waste allowances.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Wall Length (m)</Label><Input value={wallLength} onChange={e => setWallLength(e.target.value)} /></div>
              <div><Label>Wall Height (m)</Label><Input value={wallHeight} onChange={e => setWallHeight(e.target.value)} /></div>
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
                <p className="text-xs text-muted-foreground">Wall Area: {results.wallArea.toFixed(2)} m²</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
