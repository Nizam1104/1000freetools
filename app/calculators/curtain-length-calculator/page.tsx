"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CurtainLengthCalculatorPage() {
  const [windowHeight, setWindowHeight] = useState<string>("");
  const [windowWidth, setWindowWidth] = useState<string>("");
  const [rodHeight, setRodHeight] = useState<string>("");
  const [rodWidth, setRodWidth] = useState<string>("");
  const [curtainStyle, setCurtainStyle] = useState<"floor" | "sill" | "apron" | "puddle">("floor");
  const [fullnessRatio, setFullnessRatio] = useState<string>("2");
  const [headerStyle, setHeaderStyle] = useState<"grommet" | "rod-pocket" | "pleated" | "tab">("grommet");
  const [unit, setUnit] = useState<"inches" | "cm">("inches");
  const [result, setResult] = useState<{
    curtainLength: number;
    curtainWidth: number;
    totalFabricLength: number;
    totalFabricWidth: number;
    panelsNeeded: number;
  } | null>(null);

  const calculate = () => {
    let winHeight = parseFloat(windowHeight);
    let winWidth = parseFloat(windowWidth);
    let rodH = parseFloat(rodHeight) || 0;
    let rodW = parseFloat(rodWidth) || 0;
    let fullness = parseFloat(fullnessRatio) || 2;

    if (isNaN(winHeight) || isNaN(winWidth) || winHeight <= 0 || winWidth <= 0) return;

    // Calculate curtain length based on style
    let lengthFromRod: number;

    if (unit === "cm") {
      // Convert to inches for calculation
      winHeight *= 0.393701;
      winWidth *= 0.393701;
      rodH *= 0.393701;
      rodW *= 0.393701;
    }

    // Distance from rod to desired endpoint
    if (curtainStyle === "floor") {
      // Floor length: rod to floor (typically 1/2 inch above floor)
      lengthFromRod = rodH > 0 ? rodH : winHeight + 4; // Default 4 inches above window
    } else if (curtainStyle === "sill") {
      // Sill length: rod to windowsill
      lengthFromRod = winHeight;
    } else if (curtainStyle === "apron") {
      // Apron length: 4 inches below sill
      lengthFromRod = winHeight + 4;
    } else {
      // Puddle: extra 6-12 inches on floor
      lengthFromRod = (rodH > 0 ? rodH : winHeight + 4) + 8;
    }

    // Add header/hem allowances based on header style
    const headerAllowances = {
      grommet: 3,      // Top hem for grommets
      "rod-pocket": 4, // Rod pocket header
      pleated: 5,      // Pleated header
      tab: 4,          // Tab top
    };

    const bottomHem = 4; // Standard bottom hem
    const totalLength = lengthFromRod + headerAllowances[headerStyle] + bottomHem;

    // Calculate width with fullness
    const trackWidth = rodW > 0 ? rodW : winWidth * 1.5; // Rod typically extends beyond window
    const totalWidthNeeded = trackWidth * fullness;

    // Standard panel widths
    const standardPanelWidth = 50; // inches (typical ready-made panel)
    const panelsNeeded = Math.ceil(totalWidthNeeded / standardPanelWidth);

    // Convert back to original unit if needed
    let finalLength = totalLength;
    let finalWidth = totalWidthNeeded;

    if (unit === "cm") {
      finalLength *= 2.54;
      finalWidth *= 2.54;
    }

    setResult({
      curtainLength: Math.round(finalLength),
      curtainWidth: Math.round(finalWidth),
      totalFabricLength: Math.round(finalLength * panelsNeeded),
      totalFabricWidth: Math.round(finalWidth),
      panelsNeeded,
    });
  };

  const reset = () => {
    setWindowHeight("");
    setWindowWidth("");
    setRodHeight("");
    setRodWidth("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Curtain Length Calculator – Find the Perfect Curtain Size for Your Windows
          </h1>
          <p className="text-muted-foreground">
            Get perfectly sized curtains every time with our Curtain Length Calculator. Enter your
            window height and width along with your preferred drop and fullness ratio to calculate
            the exact fabric dimensions needed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Unit System</Label>
                <Select value={unit} onValueChange={(v) => setUnit(v as "inches" | "cm")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inches">Inches</SelectItem>
                    <SelectItem value="cm">Centimeters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="winHeight">Window Height</Label>
                  <Input
                    id="winHeight"
                    type="number"
                    placeholder={unit === "inches" ? "48" : "120"}
                    value={windowHeight}
                    onChange={(e) => setWindowHeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="winWidth">Window Width</Label>
                  <Input
                    id="winWidth"
                    type="number"
                    placeholder={unit === "inches" ? "36" : "90"}
                    value={windowWidth}
                    onChange={(e) => setWindowWidth(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="rodHeight">Rod Height (from floor)</Label>
                  <Input
                    id="rodHeight"
                    type="number"
                    placeholder="Optional"
                    value={rodHeight}
                    onChange={(e) => setRodHeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rodWidth">Rod Width (total)</Label>
                  <Input
                    id="rodWidth"
                    type="number"
                    placeholder="Optional"
                    value={rodWidth}
                    onChange={(e) => setRodWidth(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="curtainStyle">Curtain Length Style</Label>
                <Select value={curtainStyle} onValueChange={(v) => setCurtainStyle(v as "floor" | "sill" | "apron" | "puddle")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="floor">Floor Length (1/2" above floor)</SelectItem>
                    <SelectItem value="sill">Windowsill Length</SelectItem>
                    <SelectItem value="apron">Apron (4" below sill)</SelectItem>
                    <SelectItem value="puddle">Puddle (extra length on floor)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="headerStyle">Header Style</Label>
                <Select value={headerStyle} onValueChange={(v) => setHeaderStyle(v as "grommet" | "rod-pocket" | "pleated" | "tab")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grommet">Grommet Top</SelectItem>
                    <SelectItem value="rod-pocket">Rod Pocket</SelectItem>
                    <SelectItem value="pleated">Pleated</SelectItem>
                    <SelectItem value="tab">Tab Top</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullness">Fullness Ratio</Label>
                <Select value={fullnessRatio} onValueChange={setFullnessRatio}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.5">1.5× (Economy)</SelectItem>
                    <SelectItem value="2">2× (Standard)</SelectItem>
                    <SelectItem value="2.5">2.5× (Luxury)</SelectItem>
                    <SelectItem value="3">3× (Extra Full)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Higher fullness = more luxurious gathers
                </p>
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
              <h3 className="text-lg font-semibold mb-4">Curtain Size Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Recommended Curtain Size</p>
                    <p className="text-2xl font-bold text-primary">
                      {result.curtainLength} {unit === "inches" ? '" L' : ' cm L'} × {result.curtainWidth} {unit === "inches" ? '" W' : ' cm W'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Panels Needed</p>
                      <p className="text-2xl font-bold">{result.panelsNeeded}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Fabric</p>
                      <p className="text-lg font-bold">{result.totalFabricLength} {unit === "inches" ? '"' : ' cm'}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Width Needed</p>
                    <p className="text-xl font-bold">{result.totalFabricWidth} {unit === "inches" ? '"' : ' cm'}</p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>Installation tip:</strong> Mount rod 4-6" above window frame and
                      extend 3-6" on each side for best light coverage.
                    </p>
                    <p>
                      <strong>Measuring tip:</strong> Always measure from the bottom of the curtain
                      ring or top of the rod, not the top of the finial.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Curtain Measuring Guide</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Curtain Length = Rod Height + Header Allowance + Bottom Hem</div>
            <div>Curtain Width = Rod Width × Fullness Ratio</div>
            <div>Panels Needed = Total Width ÷ Standard Panel Width (50")</div>
          </div>
          <table className="w-full text-sm mt-3">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Style</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Floor</td>
                <td className="py-2">1/2" above floor - most popular</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Sill</td>
                <td className="py-2">Ends at windowsill - kitchens/baths</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Apron</td>
                <td className="py-2">4" below sill - traditional look</td>
              </tr>
              <tr>
                <td className="py-2">Puddle</td>
                <td className="py-2">6-12" extra on floor - formal/dramatic</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SEO Content Section */}
        <div className="mt-8 space-y-8">
          {/* How It Works */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">How the Curtain Length Calculator Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold mb-2">Measure Your Window</h3>
                    <p className="text-sm text-muted-foreground">Enter window height and width, plus rod height from floor for accurate curtain length calculation.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold mb-2">Choose Style Options</h3>
                    <p className="text-sm text-muted-foreground">Select curtain length style (floor, sill, apron, puddle), header type, and fullness ratio.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold mb-2">Get Perfect Curtain Size</h3>
                    <p className="text-sm text-muted-foreground">Receive recommended curtain dimensions, number of panels needed, and total fabric requirements.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features and Benefits */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Features of This Curtain Calculator</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Multiple Length Styles</h3>
                      <p className="text-sm text-muted-foreground">Calculate floor-length, windowsill, apron, or puddle style curtains with appropriate hem allowances.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Header Style Options</h3>
                      <p className="text-sm text-muted-foreground">Account for grommet, rod pocket, pleated, or tab top header allowances in calculations.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Fullness Ratio Control</h3>
                      <p className="text-sm text-muted-foreground">Choose from economy (1.5x) to extra full (3x) for desired curtain gather appearance.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Panel Count Calculator</h3>
                      <p className="text-sm text-muted-foreground">Automatically calculates number of standard panels needed based on total width required.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Inch and CM Support</h3>
                      <p className="text-sm text-muted-foreground">Work in inches or centimeters with automatic conversions for international users.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Free Home Decor Tool</h3>
                      <p className="text-sm text-muted-foreground">Completely free curtain calculator for DIY decorators and professional designers.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reference Table */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-3">Curtain Length Style Guide</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Style</th>
                        <th className="text-left py-2">Description</th>
                        <th className="text-left py-2">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Floor</td>
                        <td className="py-2">1/2&quot; above floor</td>
                        <td className="py-2">Living rooms, bedrooms (most popular)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Sill</td>
                        <td className="py-2">Ends at windowsill</td>
                        <td className="py-2">Kitchens, bathrooms, casual spaces</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Apron</td>
                        <td className="py-2">4&quot; below sill</td>
                        <td className="py-2">Traditional look, radiators below</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Puddle</td>
                        <td className="py-2">6-12&quot; extra on floor</td>
                        <td className="py-2">Formal rooms, dramatic effect</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">How do I measure for curtain length?</h3>
                  <p className="text-sm text-muted-foreground">Measure from the bottom of the curtain ring (or top of rod) to your desired endpoint. For floor-length, measure to 1/2&quot; above floor. For sill-length, measure to the windowsill. Always measure from where curtains will hang, not the top of the finial.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What is the standard curtain fullness ratio?</h3>
                  <p className="text-sm text-muted-foreground">Standard fullness is 2x the window width, creating attractive gathers. Economy (1.5x) looks flatter, while luxury (2.5x) and extra full (3x) create richer, more dramatic folds. Higher fullness requires more fabric and panels.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How high should I hang curtain rods?</h3>
                  <p className="text-sm text-muted-foreground">Mount rods 4-6 inches above the window frame to make windows appear taller. Extend rods 3-6 inches beyond each side so curtains don&apos;t block light when open. For high ceilings, mount rods halfway between window top and ceiling.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How many curtain panels do I need?</h3>
                  <p className="text-sm text-muted-foreground">Divide your total width needed (rod width x fullness ratio) by standard panel width (typically 50&quot;). For a 60&quot; rod with 2x fullness: 120&quot; / 50&quot; = 2.4, so you need 3 panels per side or 6 total for a pair.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What is the difference between grommet and rod pocket curtains?</h3>
                  <p className="text-sm text-muted-foreground">Grommet curtains have metal rings for easy sliding and modern look, requiring ~3&quot; header. Rod pocket curtains have a sewn channel for the rod, creating a gathered look with ~4&quot; header. Grommets work better for frequent opening/closing.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Related Home Improvement Tools</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/calculators/paint-coverage-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-semibold mb-2">Paint Coverage Calculator</h3>
                  <p className="text-sm text-muted-foreground">Calculate paint needed for walls based on room dimensions and number of coats.</p>
                </a>
                <a href="/calculators/flooring-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-semibold mb-2">Flooring Calculator</h3>
                  <p className="text-sm text-muted-foreground">Estimate flooring material needed for rooms with waste factor calculations.</p>
                </a>
                <a href="/calculators/wallpaper-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-semibold mb-2">Wallpaper Calculator</h3>
                  <p className="text-sm text-muted-foreground">Determine wallpaper rolls needed based on wall dimensions and pattern repeat.</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
