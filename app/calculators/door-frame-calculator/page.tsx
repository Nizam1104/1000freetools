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

interface DoorFrameResult {
  doorWidth: number;
  doorHeight: number;
  wallThickness: number;
  frameWidth: number;
  frameHeight: number;
  roughOpeningWidth: number;
  roughOpeningHeight: number;
  jambLength: number;
  headerLength: number;
  materialNeeded: string;
  recommendations: string[];
}

export default function DoorFrameCalculatorPage() {
  const [doorWidth, setDoorWidth] = useState<string>("");
  const [doorHeight, setDoorHeight] = useState<string>("");
  const [wallThickness, setWallThickness] = useState<string>("");
  const [doorType, setDoorType] = useState<string>("interior");
  const [unit, setUnit] = useState<string>("inches");
  const [result, setResult] = useState<DoorFrameResult | null>(null);

  const calculate = () => {
    let widthNum = parseFloat(doorWidth) || 0;
    let heightNum = parseFloat(doorHeight) || 0;
    let thicknessNum = parseFloat(wallThickness) || 0;

    if (widthNum === 0 || heightNum === 0) return;

    // Convert to inches if needed
    if (unit === "cm") {
      widthNum = widthNum / 2.54;
      heightNum = heightNum / 2.54;
      thicknessNum = thicknessNum / 2.54;
    } else if (unit === "mm") {
      widthNum = widthNum / 25.4;
      heightNum = heightNum / 25.4;
      thicknessNum = thicknessNum / 25.4;
    }

    // Standard clearances
    const sideClearance = 0.125; // 1/8 inch each side
    const topClearance = 0.125; // 1/8 inch top
    const bottomClearance = 0.5; // 1/2 inch bottom (carpet clearance)

    // Frame dimensions (inside measurements)
    const frameWidth = widthNum + (sideClearance * 2);
    const frameHeight = heightNum + topClearance;

    // Rough opening (typically 2 inches wider and 1 inch taller than door)
    const roughOpeningWidth = widthNum + 2;
    const roughOpeningHeight = heightNum + 1;

    // Material calculations
    // Jamb length = frame height × 2 (both sides)
    const jambLength = frameHeight * 2;
    
    // Header length = frame width + jamb width on each side
    const headerLength = frameWidth + (thicknessNum * 2);

    // Total material needed
    const totalLinearFeet = (jambLength + headerLength) / 12;

    // Material needed description
    let materialNeeded = "";
    if (doorType === "interior") {
      materialNeeded = `${totalLinearFeet.toFixed(1)} linear feet of 1×4 lumber`;
    } else {
      materialNeeded = `${totalLinearFeet.toFixed(1)} linear feet of 2×6 lumber`;
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`🚪 Door size: ${widthNum}" × ${heightNum}"`);
    recommendations.push(`📐 Frame opening: ${frameWidth.toFixed(2)}" × ${frameHeight.toFixed(2)}"`);
    recommendations.push(`🔨 Rough opening: ${roughOpeningWidth}" × ${roughOpeningHeight}"`);
    recommendations.push(`🪵 Wall thickness: ${thicknessNum}"`);

    if (doorType === "exterior") {
      recommendations.push("🏠 Exterior door - use weather-resistant materials");
      recommendations.push("🌧️ Include weatherstripping and threshold");
    }

    recommendations.push("📏 Always measure twice before cutting");
    recommendations.push("🔩 Use 3 hinges for doors over 60 inches");
    recommendations.push("📐 Allow 1/8 inch clearance on sides and top");

    setResult({
      doorWidth: widthNum,
      doorHeight: heightNum,
      wallThickness: thicknessNum,
      frameWidth: parseFloat(frameWidth.toFixed(2)),
      frameHeight: parseFloat(frameHeight.toFixed(2)),
      roughOpeningWidth,
      roughOpeningHeight,
      jambLength: parseFloat(jambLength.toFixed(2)),
      headerLength: parseFloat(headerLength.toFixed(2)),
      materialNeeded,
      recommendations,
    });
  };

  const reset = () => {
    setDoorWidth("");
    setDoorHeight("");
    setWallThickness("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Door Frame Calculator – Calculate Door Frame Dimensions & Material Quantities
          </h1>
          <p className="text-muted-foreground">
            Ensure a perfect door fit with our Door Frame Calculator. Enter your door size
            and wall thickness to calculate the exact frame dimensions and material
            quantities needed for a professional installation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="door-width">Door Width</Label>
                  <Input
                    id="door-width"
                    type="number"
                    value={doorWidth}
                    onChange={(e) => setDoorWidth(e.target.value)}
                    placeholder="30"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="door-height">Door Height</Label>
                  <Input
                    id="door-height"
                    type="number"
                    value={doorHeight}
                    onChange={(e) => setDoorHeight(e.target.value)}
                    placeholder="80"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wall-thickness">Wall Thickness</Label>
                <Input
                  id="wall-thickness"
                  type="number"
                  value={wallThickness}
                  onChange={(e) => setWallThickness(e.target.value)}
                  placeholder="4.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="door-type">Door Type</Label>
                  <Select value={doorType} onValueChange={setDoorType}>
                    <SelectTrigger id="door-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interior">Interior</SelectItem>
                      <SelectItem value="exterior">Exterior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inches">Inches</SelectItem>
                      <SelectItem value="cm">Centimeters</SelectItem>
                      <SelectItem value="mm">Millimeters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Standard Door Sizes:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Interior: 30&quot;×80&quot;, 32&quot;×80&quot;</li>
                  <li>• Exterior: 36&quot;×80&quot;</li>
                  <li>• Closet: 24&quot;×80&quot;, 28&quot;×80&quot;</li>
                </ul>
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
              <h3 className="text-lg font-semibold mb-4">Frame Dimensions</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Frame Width</p>
                      <p className="text-xl font-bold text-primary">{result.frameWidth}&quot;</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Frame Height</p>
                      <p className="text-xl font-bold text-primary">{result.frameHeight}&quot;</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Rough Opening:</span>
                      <span className="font-semibold">{result.roughOpeningWidth}&quot; × {result.roughOpeningHeight}&quot;</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Jamb Length:</span>
                      <span className="font-semibold">{result.jambLength}&quot;</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Header Length:</span>
                      <span className="font-semibold">{result.headerLength}&quot;</span>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Material Needed:</strong> {result.materialNeeded}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Installation Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter door dimensions and click Calculate to see frame specs</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Door Frame Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Rough opening:</strong> 2&quot; wider, 1&quot; taller than door
                  </li>
                  <li>
                    <strong>Side clearance:</strong> 1/8&quot; each side for proper fit
                  </li>
                  <li>
                    <strong>Bottom clearance:</strong> 1/2&quot; for carpet clearance
                  </li>
                  <li>
                    <strong>Hinges:</strong> 2 for doors under 60&quot;, 3 for taller
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> These are standard residential dimensions.
                  Commercial doors and custom installations may have different
                  requirements. Always check local building codes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
