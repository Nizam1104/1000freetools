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
                How to Use This Mortar Volume Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter wall dimensions</p>
                    <p>Input the length and height of your wall. Select meters or feet depending on your measurement system.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select brick type and joint specifications</p>
                    <p>Choose your brick size from the dropdown. Enter joint width and depth (10mm is standard for most applications).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate and review results</p>
                    <p>Click Calculate to see mortar volume in cubic meters, weight in kg, and number of 25kg bags needed.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Mortar Joint Standards by Application
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Application</th>
                      <th className="text-left py-3 px-2 font-semibold">Joint Width</th>
                      <th className="text-left py-3 px-2 font-semibold">Mortar Type</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Interior brick walls</td>
                      <td className="py-3 px-2">10mm</td>
                      <td className="py-3 px-2">Type N (1:1:6)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Exterior load-bearing</td>
                      <td className="py-3 px-2">10-12mm</td>
                      <td className="py-3 px-2">Type S (1:0.5:4.5)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Below grade/foundations</td>
                      <td className="py-3 px-2">10mm</td>
                      <td className="py-3 px-2">Type M (1:0.25:3)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Historic restoration</td>
                      <td className="py-3 px-2">6-10mm</td>
                      <td className="py-3 px-2">Type O or lime mortar</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Block/CMU walls</td>
                      <td className="py-3 px-2">10-12mm</td>
                      <td className="py-3 px-2">Type N or S</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Stone masonry</td>
                      <td className="py-3 px-2">12-20mm</td>
                      <td className="py-3 px-2">Type N</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Mortar Volume Calculations
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Mortar Volume Is Calculated</h4>
                  <p>
                    Mortar fills the gaps between bricks — both horizontal bed joints and vertical head joints.
                    The calculator determines how many bricks fit in your wall area, then multiplies by the
                    mortar volume needed per brick. Joint width and depth directly affect the total volume.
                    A 10mm joint uses roughly 0.6-0.8 liters of mortar per brick depending on brick size.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Waste Factor Matters</h4>
                  <p>
                    Not all mortar makes it into the joints. Some falls on the ground, some dries out in the
                    hawk, and some gets over-applied. A 10% waste factor is standard for experienced masons.
                    First-time DIYers should plan for 15-20% waste. Mortar cannot be returned once mixed,
                    so it is better to have a little extra than to run short mid-wall.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Mortar Density and Bag Coverage</h4>
                  <p>
                    Wet mortar weighs approximately 2000 kg per cubic meter. Standard pre-mix bags contain
                    25kg of dry mortar. One 25kg bag yields about 0.012-0.015 cubic meters of wet mortar,
                    enough for roughly 20-25 standard bricks with 10mm joints. Always check the
                    manufacturer's coverage rating as formulations vary.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Accurate Mortar Estimation
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Measure twice, order once</p>
                    <p>Double-check wall dimensions before calculating. Add 5% extra for cutting waste on partial bricks.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Mix small batches</p>
                    <p>Mortar starts setting in 2-3 hours. Mix only what you can use in one session to avoid waste.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider weather conditions</p>
                    <p>Hot weather speeds up drying. Cold weather slows curing. Plan your work accordingly and protect fresh mortar.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use consistent joint tooling</p>
                    <p>Tool joints when thumbprint-hard. Consistent joint depth ensures uniform appearance and weather resistance.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">How much mortar do I need per brick?</h4>
                  <p>
                    For standard bricks with 10mm joints, plan on 0.6-0.8 liters of mortar per brick.
                    This equals roughly 1.2-1.6 kg of wet mortar. Larger bricks or wider joints increase
                    consumption. A 25kg bag of dry mortar typically lays 20-25 standard bricks.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What is the best mortar mix for bricklaying?</h4>
                  <p>
                    Type N mortar (1 part cement, 1 part lime, 6 parts sand) works for most above-grade
                    brick walls. It offers good bond strength and flexibility. For load-bearing or
                    below-grade work, use Type S (1:0.5:4.5) for higher compressive strength.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How wide should mortar joints be?</h4>
                  <p>
                    Standard brick joints are 10mm (3/8 inch). Acceptable range is 6-15mm depending on
                    brick type and application. Wider joints weaken the wall and use more mortar.
                    Historic brickwork often used narrower joints (6-8mm) for a tighter appearance.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can I use old mortar for repairs?</h4>
                  <p>
                    Match the original mortar type when repointing historic masonry. Modern Portland-based
                    mortars are harder and can trap moisture, damaging old bricks. For pre-1900 buildings,
                    consider lime-based mortar that allows the wall to breathe and move naturally.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How long does mortar take to cure?</h4>
                  <p>
                    Mortar sets enough to tool joints in 1-2 hours. It reaches initial cure in 24-48 hours.
                    Full cure takes 28 days. Keep mortar moist during the first week for proper curing.
                    Avoid heavy loads or stress on the wall for at least 7 days after laying.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
