"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BrickBondCalculatorPage() {
  const [wallLength, setWallLength] = useState<string>("");
  const [wallHeight, setWallHeight] = useState<string>("");
  const [brickLength, setBrickLength] = useState<string>("230");
  const [brickHeight, setBrickHeight] = useState<string>("75");
  const [mortarThickness, setMortarThickness] = useState<string>("10");
  const [bondType, setBondType] = useState<string>("running");
  const [wastePercentage, setWastePercentage] = useState<string>("5");
  const [result, setResult] = useState<{
    totalBricks: number;
    bricksPerRow: number;
    numberOfRows: number;
    wasteBricks: number;
    totalWithWaste: number;
  } | null>(null);

  const calculate = () => {
    const length = parseFloat(wallLength);
    const height = parseFloat(wallHeight);
    const bLength = parseFloat(brickLength);
    const bHeight = parseFloat(brickHeight);
    const mortar = parseFloat(mortarThickness);
    const waste = parseFloat(wastePercentage);
    
    if (isNaN(length) || isNaN(height) || isNaN(bLength) || isNaN(bHeight) || isNaN(mortar) || isNaN(waste)) return;

    // Convert wall dimensions to mm if entered in meters
    let wallLengthMm = length;
    let wallHeightMm = height;
    
    if (length <= 10) wallLengthMm = length * 1000; // Assume meters if small number
    if (height <= 10) wallHeightMm = height * 1000;

    // Calculate effective brick dimensions with mortar
    const effectiveBrickLength = bLength + mortar;
    const effectiveBrickHeight = bHeight + mortar;

    // Calculate bricks per row and number of rows
    const bricksPerRow = Math.ceil(wallLengthMm / effectiveBrickLength);
    const numberOfRows = Math.ceil(wallHeightMm / effectiveBrickHeight);

    // Calculate total bricks based on bond type
    let totalBricks: number;
    switch (bondType) {
      case "flemish":
        // Flemish bond: alternating headers and stretchers
        totalBricks = Math.ceil(bricksPerRow * numberOfRows * 0.9);
        break;
      case "english":
        // English bond: alternating courses of headers and stretchers
        totalBricks = Math.ceil(bricksPerRow * numberOfRows * 0.95);
        break;
      default:
        // Running bond (stretcher bond) - most common
        totalBricks = bricksPerRow * numberOfRows;
    }

    // Add waste percentage
    const wasteBricks = Math.ceil(totalBricks * (waste / 100));
    const totalWithWaste = totalBricks + wasteBricks;

    setResult({
      totalBricks,
      bricksPerRow,
      numberOfRows,
      wasteBricks,
      totalWithWaste
    });
  };

  const reset = () => {
    setWallLength("");
    setWallHeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Brick Bond Calculator – Calculate Bricks Needed for Any Wall Pattern</h1>
          <p className="text-muted-foreground">
            Plan your brickwork accurately with our Brick Bond Calculator. Enter your wall dimensions and choose a bond pattern (running, Flemish, English) to calculate the total number of bricks required, including mortar joints and waste allowance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="wallLength">Wall Length (m)</Label>
                  <Input 
                    id="wallLength" 
                    type="number" 
                    placeholder="e.g., 5" 
                    value={wallLength} 
                    onChange={(e) => setWallLength(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wallHeight">Wall Height (m)</Label>
                  <Input 
                    id="wallHeight" 
                    type="number" 
                    placeholder="e.g., 3" 
                    value={wallHeight} 
                    onChange={(e) => setWallHeight(e.target.value)} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bondType">Bond Pattern</Label>
                <Select value={bondType} onValueChange={setBondType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="running">Running Bond (Stretcher)</SelectItem>
                    <SelectItem value="flemish">Flemish Bond</SelectItem>
                    <SelectItem value="english">English Bond</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="brickLength">Brick Length (mm)</Label>
                  <Input 
                    id="brickLength" 
                    type="number" 
                    value={brickLength} 
                    onChange={(e) => setBrickLength(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brickHeight">Brick Height (mm)</Label>
                  <Input 
                    id="brickHeight" 
                    type="number" 
                    value={brickHeight} 
                    onChange={(e) => setBrickHeight(e.target.value)} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="mortar">Mortar Thickness (mm)</Label>
                  <Input 
                    id="mortar" 
                    type="number" 
                    value={mortarThickness} 
                    onChange={(e) => setMortarThickness(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waste">Waste (%)</Label>
                  <Input 
                    id="waste" 
                    type="number" 
                    value={wastePercentage} 
                    onChange={(e) => setWastePercentage(e.target.value)} 
                  />
                </div>
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
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Bricks Needed</p>
                    <p className="text-4xl font-bold text-primary">{result.totalWithWaste}</p>
                    <p className="text-xs text-muted-foreground mt-1">Including {result.wasteBricks} waste bricks</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Bricks/Row</p>
                      <p className="text-lg font-semibold">{result.bricksPerRow}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Rows</p>
                      <p className="text-lg font-semibold">{result.numberOfRows}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Base Total</p>
                      <p className="text-lg font-semibold">{result.totalBricks}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-1">Construction Tip:</p>
                    <p className="text-sm">Standard brick size is 230×75×110mm. Always order 5-10% extra for cuts and breakage.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter wall dimensions and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
