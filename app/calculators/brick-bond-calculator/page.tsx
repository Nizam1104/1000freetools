"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Brick Bond Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter wall dimensions</p>
                    <p>Input the length and height of your wall in meters. The calculator converts these to millimeters for brick-level precision.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select bond pattern and brick size</p>
                    <p>Choose running bond (most common), Flemish bond (decorative), or English bond (strongest). Adjust brick dimensions if using non-standard sizes.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate and review brick quantity</p>
                    <p>The result shows total bricks needed including waste allowance. Order this amount to ensure you have enough for cuts and breakage.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Brick Bond Types Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Bond Type</th>
                      <th className="text-left py-3 px-2 font-semibold">Pattern</th>
                      <th className="text-left py-3 px-2 font-semibold">Brick Factor</th>
                      <th className="text-left py-3 px-2 font-semibold">Best Use</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Running Bond</td>
                      <td className="py-3 px-2">Stretchers only, staggered</td>
                      <td className="py-3 px-2">1.0x</td>
                      <td className="py-3 px-2">Cavity walls, veneers</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Flemish Bond</td>
                      <td className="py-3 px-2">Alternating header/stretcher</td>
                      <td className="py-3 px-2">0.9x</td>
                      <td className="py-3 px-2">Decorative facades</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">English Bond</td>
                      <td className="py-3 px-2">Alternating courses</td>
                      <td className="py-3 px-2">0.95x</td>
                      <td className="py-3 px-2">Load-bearing walls</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Stack Bond</td>
                      <td className="py-3 px-2">Aligned vertically</td>
                      <td className="py-3 px-2">1.0x</td>
                      <td className="py-3 px-2">Non-structural panels</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Herringbone</td>
                      <td className="py-3 px-2">45-degree zigzag</td>
                      <td className="py-3 px-2">1.15x</td>
                      <td className="py-3 px-2">Paving, decorative</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Brick factor accounts for the different number of bricks needed per square meter. Flemish bond uses fewer bricks because headers expose the short end. Running bond is the baseline.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Brick Bonds
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is a Brick Bond?</h4>
                  <p>
                    A brick bond is the pattern in which bricks are laid. The arrangement affects both structural strength and appearance. Bonds interlock bricks so vertical joints don't line up, distributing loads and preventing weak lines through the wall.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Running Bond (Stretcher Bond)</h4>
                  <p>
                    The most common modern bond. Each course contains only stretchers (long face visible), with vertical joints offset by half a brick. It's ideal for cavity walls and brick veneers where the brick isn't structural. Simple to lay and uses standard brick quantities.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Flemish Bond</h4>
                  <p>
                    Each course alternates headers (short end visible) and stretchers. This creates an attractive checkerboard pattern. Flemish bond uses slightly fewer bricks because headers take less space per course. Common in historic buildings and decorative work.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">English Bond</h4>
                  <p>
                    Alternating courses of all headers and all stretchers. This is one of the strongest bonds, ideal for load-bearing walls. The header courses tie the wall together through its thickness. Uses more bricks than Flemish but provides superior structural integrity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Brick Ordering
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Always Order Extra for Waste</p>
                    <p>Include 5-10% waste allowance. Bricks break during cutting for corners, windows, and doors. Some arrive damaged. Running out mid-project means delays and potential color mismatches from different batches.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Account for Openings</p>
                    <p>Subtract bricks for doors and windows after calculating total wall area. A standard door opening saves about 80-100 bricks. Window openings vary by size. Calculate openings separately for accuracy.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Check Brick Dimensions</p>
                    <p>Standard bricks are 230 x 110 x 75mm in many countries, but sizes vary. UK bricks are 215 x 102.5 x 65mm. US modular bricks are 194 x 92. Always measure your actual bricks for accurate calculations.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Order from Same Batch</p>
                    <p>Brick color varies between production batches. Order all bricks at once from the same batch. If you need more later, the new bricks may not match. Buy 10% extra and return unopened pallets if allowed.</p>
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
                  <h4 className="font-medium text-foreground mb-2">How do I calculate bricks per square meter?</h4>
                  <p>
                    For standard bricks (230 x 75mm) with 10mm mortar: divide 1 square meter by the area of one brick plus mortar. That's 1000000 / (240 x 85) = about 49 bricks per square meter for running bond. Adjust for your brick size and bond pattern.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I deduct mortar thickness from wall dimensions?</h4>
                  <p>
                    No need to deduct manually. The calculator accounts for mortar by using effective brick dimensions (brick size + mortar thickness). This gives accurate brick counts including the space mortar occupies.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How much waste should I allow?</h4>
                  <p>
                    For simple rectangular walls, 5% waste is usually enough. For walls with many corners, openings, or complex patterns, use 10%. Herringbone and other decorative bonds may need 15% waste due to extra cutting.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Does this calculator work for pavers?</h4>
                  <p>
                    The basic calculation works for pavers, but adjust the bond pattern. Pavers often use herringbone, basketweave, or running bond. Enter paver dimensions as brick size and set appropriate waste allowance for cutting.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What's the difference between single and double brick walls?</h4>
                  <p>
                    Single brick walls are one brick thick (about 230mm). Double brick walls are two bricks thick (about 460mm) with headers tying them together. Double walls need roughly twice as many bricks and are used for load-bearing construction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Related Tools
              </h3>
              <div className="space-y-2 text-sm">
                <a
                  href="/calculators/concrete-block-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Concrete Block Calculator</span>
                  <p className="text-muted-foreground">Calculate concrete blocks needed for foundation and wall construction</p>
                </a>
                <a
                  href="/calculators/mortar-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Mortar Calculator</span>
                  <p className="text-muted-foreground">Estimate mortar quantity for bricklaying and blockwork projects</p>
                </a>
                <a
                  href="/calculators/concrete-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Concrete Calculator</span>
                  <p className="text-muted-foreground">Calculate concrete volume for slabs, footings, and foundations</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
