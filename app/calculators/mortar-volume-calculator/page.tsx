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

interface MortarResult {
  area: number;
  brickSize: string;
  jointWidth: number;
  jointDepth: number;
  mortarVolume: number;
  mortarWeight: number;
  bagsNeeded: number;
  recommendations: string[];
}

export default function MortarVolumeCalculatorPage() {
  const [length, setLength] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [brickSize, setBrickSize] = useState<string>("standard");
  const [jointWidth, setJointWidth] = useState<string>("10");
  const [jointDepth, setJointDepth] = useState<string>("10");
  const [waste, setWaste] = useState<string>("10");
  const [unit, setUnit] = useState<string>("meters");
  const [result, setResult] = useState<MortarResult | null>(null);

  const calculate = () => {
    const lengthNum = parseFloat(length) || 0;
    const heightNum = parseFloat(height) || 0;
    const jointWidthNum = parseFloat(jointWidth) || 10;
    const jointDepthNum = parseFloat(jointDepth) || 10;
    const wasteNum = parseFloat(waste) || 10;

    if (lengthNum === 0 || heightNum === 0) return;

    // Calculate wall area
    let area = lengthNum * heightNum;
    
    // Convert to square meters if needed
    if (unit === "feet") {
      area = area * 0.0929;
    }

    // Brick dimensions (mm)
    const brickSizes: Record<string, { length: number; height: number; name: string }> = {
      standard: { length: 215, height: 65, name: "Standard (215×65mm)" },
      modular: { length: 190, height: 90, name: "Modular (190×90mm)" },
      king: { length: 230, height: 70, name: "King (230×70mm)" },
      queen: { length: 215, height: 70, name: "Queen (215×70mm)" },
      jumbo: { length: 290, height: 90, name: "Jumbo (290×90mm)" },
    };

    const brick = brickSizes[brickSize] || brickSizes.standard;

    // Calculate number of bricks
    // Bricks per m² = 1 / ((brickLength + joint) × (brickHeight + joint))
    const brickLengthM = (brick.length + jointWidthNum) / 1000;
    const brickHeightM = (brick.height + jointWidthNum) / 1000;
    const bricksPerM2 = 1 / (brickLengthM * brickHeightM);
    const totalBricks = area * bricksPerM2;

    // Mortar volume calculation
    // Horizontal joints: brick length × joint width × joint depth × number of bricks
    // Vertical joints: brick height × joint width × joint depth × number of bricks
    const jointWidthM = jointWidthNum / 1000;
    const jointDepthM = jointDepthNum / 1000;
    const brickLengthBrickM = brick.length / 1000;
    const brickHeightBrickM = brick.height / 1000;

    // Volume per brick (horizontal + vertical joints)
    const horizontalVol = brickLengthBrickM * jointWidthM * jointDepthM;
    const verticalVol = brickHeightBrickM * jointWidthM * jointDepthM;
    const mortarPerBrick = horizontalVol + verticalVol;

    // Total mortar volume
    let mortarVolume = totalBricks * mortarPerBrick;
    
    // Add waste factor
    mortarVolume = mortarVolume * (1 + wasteNum / 100);

    // Mortar weight (density ~2000 kg/m³ for wet mortar)
    const mortarWeight = mortarVolume * 2000;

    // Bags needed (assuming 25kg bags)
    const bagsNeeded = Math.ceil(mortarWeight / 25);

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`🧱 Estimated bricks: ${Math.round(totalBricks)}`);
    recommendations.push(`📦 Mortar bags (25kg): ${bagsNeeded}`);
    recommendations.push(`⚠️ Includes ${wasteNum}% waste factor`);
    
    if (jointWidthNum > 15) {
      recommendations.push("⚠️ Wide joints may require more mortar");
    }
    
    recommendations.push("💡 Mix mortar in small batches to prevent drying");
    recommendations.push("🧪 Standard mix: 1 cement : 4 sand : water");

    setResult({
      area: parseFloat(area.toFixed(2)),
      brickSize: brick.name,
      jointWidth: jointWidthNum,
      jointDepth: jointDepthNum,
      mortarVolume: parseFloat(mortarVolume.toFixed(3)),
      mortarWeight: parseFloat(mortarWeight.toFixed(0)),
      bagsNeeded,
      recommendations,
    });
  };

  const reset = () => {
    setLength("");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Mortar Volume Calculator – Calculate Mortar Needed for Bricklaying & Tiling
          </h1>
          <p className="text-muted-foreground">
            Get precise mortar quantities for your construction project with our Mortar Volume Calculator.
            Enter wall area, joint width and depth, and brick type to calculate the exact volume needed —
            saving material and reducing waste.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="length">Wall Length</Label>
                  <Input
                    id="length"
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="e.g., 5"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="height">Wall Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g., 3"
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
                      <SelectItem value="feet">Feet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="brick-size">Brick Size</Label>
                  <Select value={brickSize} onValueChange={setBrickSize}>
                    <SelectTrigger id="brick-size">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (215×65mm)</SelectItem>
                      <SelectItem value="modular">Modular (190×90mm)</SelectItem>
                      <SelectItem value="king">King (230×70mm)</SelectItem>
                      <SelectItem value="queen">Queen (215×70mm)</SelectItem>
                      <SelectItem value="jumbo">Jumbo (290×90mm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="joint-width">Joint Width (mm)</Label>
                  <Input
                    id="joint-width"
                    type="number"
                    value={jointWidth}
                    onChange={(e) => setJointWidth(e.target.value)}
                    placeholder="10"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="joint-depth">Joint Depth (mm)</Label>
                  <Input
                    id="joint-depth"
                    type="number"
                    value={jointDepth}
                    onChange={(e) => setJointDepth(e.target.value)}
                    placeholder="10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="waste">Waste Factor (%)</Label>
                <Input
                  id="waste"
                  type="number"
                  value={waste}
                  onChange={(e) => setWaste(e.target.value)}
                  placeholder="10"
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
              <h3 className="text-lg font-semibold mb-4">Mortar Estimate</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Mortar Volume</p>
                    <p className="text-3xl font-bold text-primary">{result.mortarVolume} m³</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {result.mortarWeight} kg
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Wall Area</p>
                      <p className="text-lg font-bold">{result.area} m²</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Bags (25kg)</p>
                      <p className="text-lg font-bold">{result.bagsNeeded}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Brick Type:</span>
                      <span className="font-semibold">{result.brickSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Joint Width:</span>
                      <span className="font-semibold">{result.jointWidth} mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Joint Depth:</span>
                      <span className="font-semibold">{result.jointDepth} mm</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter wall dimensions and click Calculate to see mortar estimate</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Mortar Mixing Guide
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Standard mix:</strong> 1 cement : 4 sand : water to consistency
                  </li>
                  <li>
                    <strong>Strong mix:</strong> 1 cement : 3 sand (for load-bearing)
                  </li>
                  <li>
                    <strong>Joint thickness:</strong> 10mm standard, 6-15mm acceptable
                  </li>
                  <li>
                    <strong>Working time:</strong> Mix in small batches, use within 2 hours
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Always order 10-15% extra mortar for waste,
                  spillage, and adjustments. Mortar cannot be returned once mixed.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
