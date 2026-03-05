"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PaintCostEstimateCalculatorPage() {
  const [roomLength, setRoomLength] = useState<string>("");
  const [roomWidth, setRoomWidth] = useState<string>("");
  const [ceilingHeight, setCeilingHeight] = useState<string>("");
  const [doorHeight, setDoorHeight] = useState<string>("7");
  const [doorWidth, setDoorWidth] = useState<string>("3");
  const [numDoors, setNumDoors] = useState<string>("1");
  const [windowHeight, setWindowHeight] = useState<string>("4");
  const [windowWidth, setWindowWidth] = useState<string>("3");
  const [numWindows, setNumWindows] = useState<string>("1");
  const [coats, setCoats] = useState<string>("2");
  const [paintPrice, setPaintPrice] = useState<string>("");
  const [coveragePerGallon, setCoveragePerGallon] = useState<string>("350");
  const [unit, setUnit] = useState<"feet" | "meters">("feet");
  const [result, setResult] = useState<{
    wallArea: number;
    paintableArea: number;
    gallonsNeeded: number;
    totalCost: number;
    costPerSquareFoot: number;
  } | null>(null);

  const calculate = () => {
    let length = parseFloat(roomLength);
    let width = parseFloat(roomWidth);
    let height = parseFloat(ceilingHeight);
    let dHeight = parseFloat(doorHeight) || 7;
    let dWidth = parseFloat(doorWidth) || 3;
    let doors = parseInt(numDoors) || 0;
    let wHeight = parseFloat(windowHeight) || 4;
    let wWidth = parseFloat(windowWidth) || 3;
    let windows = parseInt(numWindows) || 0;
    let numCoats = parseInt(coats) || 2;
    let price = parseFloat(paintPrice) || 0;
    let coverage = parseFloat(coveragePerGallon) || 350;

    if (isNaN(length) || isNaN(width) || isNaN(height) || length <= 0 || width <= 0 || height <= 0) return;

    // Convert to feet if in meters
    if (unit === "meters") {
      length *= 3.28084;
      width *= 3.28084;
      height *= 3.28084;
      dHeight *= 3.28084;
      dWidth *= 3.28084;
      wHeight *= 3.28084;
      wWidth *= 3.28084;
    }

    // Calculate wall area (perimeter × height)
    const perimeter = 2 * (length + width);
    const grossWallArea = perimeter * height;

    // Calculate door area
    const doorArea = dHeight * dWidth * doors;

    // Calculate window area
    const windowArea = wHeight * wWidth * windows;

    // Net paintable area
    const paintableArea = grossWallArea - doorArea - windowArea;

    // Total area to cover (including multiple coats)
    const totalArea = paintableArea * numCoats;

    // Gallons needed
    const gallonsNeeded = totalArea / coverage;

    // Round up to nearest whole gallon
    const gallonsToBuy = Math.ceil(gallonsNeeded);

    // Total cost
    const totalCost = gallonsToBuy * price;

    // Cost per square foot
    const costPerSqFt = paintableArea > 0 ? totalCost / paintableArea : 0;

    setResult({
      wallArea: Math.round(grossWallArea * 100) / 100,
      paintableArea: Math.round(paintableArea * 100) / 100,
      gallonsNeeded: Math.round(gallonsToBuy * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      costPerSquareFoot: Math.round(costPerSqFt * 100) / 100,
    });
  };

  const reset = () => {
    setRoomLength("");
    setRoomWidth("");
    setCeilingHeight("");
    setPaintPrice("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Paint Cost Estimate Calculator – How Much Paint Do You Need for a Room?
          </h1>
          <p className="text-muted-foreground">
            Calculate the exact amount of paint and budget needed for your next painting project
            with our Paint Cost Estimate Calculator. Enter room dimensions, number of coats, and
            paint price per liter to get an accurate estimate instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Unit System</Label>
                <Select value={unit} onValueChange={(v) => setUnit(v as "feet" | "meters")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feet">Feet</SelectItem>
                    <SelectItem value="meters">Meters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="length">Room Length</Label>
                  <Input
                    id="length"
                    type="number"
                    placeholder={unit === "feet" ? "12" : "4"}
                    value={roomLength}
                    onChange={(e) => setRoomLength(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Room Width</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder={unit === "feet" ? "10" : "3"}
                    value={roomWidth}
                    onChange={(e) => setRoomWidth(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Ceiling Height</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder={unit === "feet" ? "8" : "2.4"}
                  value={ceilingHeight}
                  onChange={(e) => setCeilingHeight(e.target.value)}
                />
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-semibold mb-3">Doors & Windows (to exclude)</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="doors">Doors</Label>
                    <Input
                      id="doors"
                      type="number"
                      placeholder="1"
                      value={numDoors}
                      onChange={(e) => setNumDoors(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="windows">Windows</Label>
                    <Input
                      id="windows"
                      type="number"
                      placeholder="1"
                      value={numWindows}
                      onChange={(e) => setNumWindows(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coats">Coats</Label>
                    <Input
                      id="coats"
                      type="number"
                      placeholder="2"
                      value={coats}
                      onChange={(e) => setCoats(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paintPrice">Paint Price per Gallon ($)</Label>
                <Input
                  id="paintPrice"
                  type="number"
                  placeholder="e.g., 45"
                  value={paintPrice}
                  onChange={(e) => setPaintPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverage">Coverage per Gallon (sq ft)</Label>
                <Input
                  id="coverage"
                  type="number"
                  placeholder="350"
                  value={coveragePerGallon}
                  onChange={(e) => setCoveragePerGallon(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Standard: 350-400 sq ft/gallon
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
              <h3 className="text-lg font-semibold mb-4">Paint Estimate Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Paint Cost</p>
                    <p className="text-3xl font-bold text-primary">${result.totalCost.toFixed(2)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Paint Needed</p>
                      <p className="text-lg font-bold">{result.gallonsNeeded} gallons</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Paintable Area</p>
                      <p className="text-lg font-bold">{result.paintableArea} sq ft</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Wall Area</p>
                    <p className="text-xl font-bold">{result.wallArea} sq ft</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Cost per Square Foot</p>
                    <p className="text-xl font-bold">${result.costPerSquareFoot.toFixed(2)}</p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground">
                    <p>
                      <strong>Tip:</strong> Buy 10-15% extra paint for touch-ups and color matching.
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
          <h3 className="text-lg font-semibold mb-3">How to Calculate Paint Needed</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Wall Area = Perimeter × Height</div>
            <div>Paintable Area = Wall Area - (Doors + Windows)</div>
            <div>Gallons Needed = (Paintable Area × Coats) ÷ Coverage per Gallon</div>
            <div>Total Cost = Gallons × Price per Gallon</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Average door size:</strong> 7ft × 3ft = 21 sq ft<br />
            <strong>Average window size:</strong> 4ft × 3ft = 12 sq ft
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">How to Use This Paint Cost Calculator</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
                  <div>
                    <p className="font-medium text-foreground">Enter your room dimensions</p>
                    <p>Input the length, width, and ceiling height of your room. Select feet or meters based on your preference.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
                  <div>
                    <p className="font-medium text-foreground">Specify doors and windows</p>
                    <p>Enter the number of doors and windows to exclude from the paintable area. Standard sizes are used by default.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
                  <div>
                    <p className="font-medium text-foreground">Add paint details and calculate</p>
                    <p>Enter the price per gallon and coverage rate, then click Calculate to see your total cost estimate.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Paint Coverage Reference Table</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Paint Type</th>
                      <th className="text-left py-3 px-2 font-semibold">Coverage (sq ft/gal)</th>
                      <th className="text-left py-3 px-2 font-semibold">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Flat/Matte</td>
                      <td className="py-3 px-2">350-400</td>
                      <td className="py-3 px-2">Ceilings, low-traffic areas</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Eggshell</td>
                      <td className="py-3 px-2">350-400</td>
                      <td className="py-3 px-2">Living rooms, bedrooms</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Satin</td>
                      <td className="py-3 px-2">300-350</td>
                      <td className="py-3 px-2">Hallways, family rooms</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Semi-Gloss</td>
                      <td className="py-3 px-2">300-350</td>
                      <td className="py-3 px-2">Kitchens, bathrooms, trim</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">High-Gloss</td>
                      <td className="py-3 px-2">250-300</td>
                      <td className="py-3 px-2">Doors, cabinets, furniture</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Understanding Paint Coverage</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Affects Paint Coverage</h4>
                  <p>Paint coverage varies based on several factors. Porous surfaces like bare drywall or plaster absorb more paint than previously painted walls. Dark colors covering light walls need fewer coats than light colors covering dark walls. The application method matters too — rollers typically use more paint than brushes, and sprayers can be efficient but require skill to avoid waste.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Two Coats Are Standard</h4>
                  <p>One coat rarely gives complete coverage. The first coat soaks into the surface and provides a base. The second coat builds uniform color and sheen. Skipping the second coat often results in patchy areas that show through, especially with lighter colors or when making dramatic color changes.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Primer Considerations</h4>
                  <p>Primer seals porous surfaces and provides a uniform base for topcoats. Use primer on new drywall, when covering stains, or when making drastic color changes. Primer typically covers 200-300 sq ft per gallon and costs less than finish paint, making it economical for difficult surfaces.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Tips for Accurate Paint Estimates</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Buy 10-15% Extra</p>
                    <p>Purchase slightly more than calculated for touch-ups and future repairs. Paint batches can vary slightly in color.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Measure Actual Openings</p>
                    <p>Large picture windows or French doors remove significant paintable area. Measure them individually for better accuracy.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Check Paint Label Coverage</p>
                    <p>Manufacturers list coverage on the can. Premium paints often cover more area than budget options, offsetting their higher cost.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Account for Texture</p>
                    <p>Textured walls like orange peel or knockdown require 10-20% more paint than smooth surfaces.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">How much paint do I need for a 12x12 room?</h4>
                  <p>A 12x12 room with 8-foot ceilings has about 384 sq ft of wall area. After subtracting one door (21 sq ft) and one window (12 sq ft), you get roughly 351 sq ft. For two coats, that's 702 sq ft. At 350 sq ft per gallon, you need 2 gallons. Budget $60-100 for mid-range paint.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Does paint coverage really vary that much?</h4>
                  <p>Yes. Cheap paint might cover 250 sq ft per gallon while premium paint covers 400+ sq ft. The price difference often evens out — two gallons of cheap paint costs similar to one gallon of premium, but the premium paint looks better and lasts longer.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I include the ceiling in my estimate?</h4>
                  <p>Ceilings need separate calculation. Multiply length times width for ceiling area. Ceiling paint is usually flat and covers well — about 400 sq ft per gallon. Many people paint ceilings white regardless of wall color.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I estimate paint for multiple rooms?</h4>
                  <p>Calculate each room separately, then add the totals. If using the same color throughout, you can often buy larger quantities at a discount. Keep rooms with different colors separate in your calculations.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What's the average cost of interior paint per gallon?</h4>
                  <p>Budget paint runs $20-35 per gallon. Mid-range quality costs $40-60 per gallon. Premium paints range from $60-100+ per gallon. Higher-priced paints typically have better coverage, durability, and washability.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Related Tools</h3>
              <div className="space-y-2 text-sm">
                <a href="/calculators/paint-coverage-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <span className="font-medium text-foreground">Paint Coverage Calculator</span>
                  <p className="text-muted-foreground">Calculate paint needed based on room dimensions and coverage rate</p>
                </a>
                <a href="/calculators/floor-area-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <span className="font-medium text-foreground">Floor Area Calculator</span>
                  <p className="text-muted-foreground">Calculate square footage for flooring projects</p>
                </a>
                <a href="/calculators/wallpaper-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <span className="font-medium text-foreground">Wallpaper Calculator</span>
                  <p className="text-muted-foreground">Estimate wallpaper rolls needed for your room</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
