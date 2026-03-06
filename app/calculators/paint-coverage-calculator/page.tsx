"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PaintCoverageCalculator() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [doors, setDoors] = useState<string>("");
  const [windows, setWindows] = useState<string>("");
  const [coats, setCoats] = useState<string>("2");
  const [coverage, setCoverage] = useState<string>("10");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const H = parseFloat(height);
    const doorArea = parseFloat(doors) || 0;
    const windowArea = parseFloat(windows) || 0;
    const numCoats = parseInt(coats);
    const coverageRate = parseFloat(coverage); // m² per liter

    if (L > 0 && W > 0 && H > 0 && coverageRate > 0) {
      const wallArea = 2 * (L + W) * H;
      const paintableArea = wallArea - doorArea - windowArea;
      const totalArea = paintableArea * numCoats;
      const paintNeeded = totalArea / coverageRate;
      const gallons = paintNeeded * 0.264172;

      setResults({
        wallArea: wallArea,
        paintableArea: paintableArea,
        totalArea: totalArea,
        liters: paintNeeded,
        gallons: gallons,
      });
    }
  };

  const reset = () => {
    setLength(""); setWidth(""); setHeight(""); setDoors(""); setWindows("");
    setCoats("2"); setCoverage("10"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              <div><Label>Width (m)</Label><Input value={width} onChange={e => setWidth(e.target.value)} /></div>
              <div><Label>Height (m)</Label><Input value={height} onChange={e => setHeight(e.target.value)} /></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Doors Area (m²)</Label><Input value={doors} onChange={e => setDoors(e.target.value)} placeholder="e.g., 4" /></div>
              <div><Label>Windows Area (m²)</Label><Input value={windows} onChange={e => setWindows(e.target.value)} placeholder="e.g., 3" /></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Number of Coats</Label><Input type="number" value={coats} onChange={e => setCoats(e.target.value)} /></div>
              <div><Label>Coverage Rate (m²/L)</Label><Input value={coverage} onChange={e => setCoverage(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Paint</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Paintable Area</p>
                    <p className="text-2xl font-bold">{Math.round(results.paintableArea * 100) / 100} m²</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Area ({coats} coats)</p>
                    <p className="text-2xl font-bold">{Math.round(results.totalArea * 100) / 100} m²</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Paint Needed</p>
                    <p className="text-3xl font-bold">{Math.round(results.liters * 10) / 10} L</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Gallons</p>
                    <p className="text-2xl font-bold">{Math.round(results.gallons * 10) / 10} gal</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>How to Use This Paint Coverage Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
              <div>
                <p className="font-medium text-foreground">Enter room dimensions</p>
                <p>Input the length, width, and height of your room in meters. These measurements determine the total wall surface area.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
              <div>
                <p className="font-medium text-foreground">Subtract doors and windows</p>
                <p>Enter the total area of doors and windows in square meters. This excludes non-paintable surfaces from the calculation.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
              <div>
                <p className="font-medium text-foreground">Set coats and coverage rate</p>
                <p>Specify the number of coats (usually 2) and the paint coverage rate in square meters per liter. Click Calculate to see results.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paint Coverage Reference Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Paint Type</th>
                    <th className="text-left py-3 px-2 font-semibold">Coverage (m²/L)</th>
                    <th className="text-left py-3 px-2 font-semibold">Coverage (sq ft/gal)</th>
                    <th className="text-left py-3 px-2 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Flat/Matte</td>
                    <td className="py-3 px-2">10-12</td>
                    <td className="py-3 px-2">350-400</td>
                    <td className="py-3 px-2">Ceilings, low-traffic areas</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Eggshell</td>
                    <td className="py-3 px-2">10-12</td>
                    <td className="py-3 px-2">350-400</td>
                    <td className="py-3 px-2">Living rooms, bedrooms</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Satin</td>
                    <td className="py-3 px-2">8-10</td>
                    <td className="py-3 px-2">300-350</td>
                    <td className="py-3 px-2">Hallways, family rooms</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Semi-Gloss</td>
                    <td className="py-3 px-2">8-10</td>
                    <td className="py-3 px-2">300-350</td>
                    <td className="py-3 px-2">Kitchens, bathrooms, trim</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">High-Gloss</td>
                    <td className="py-3 px-2">7-8</td>
                    <td className="py-3 px-2">250-300</td>
                    <td className="py-3 px-2">Doors, cabinets, furniture</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Paint Coverage Calculations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">The Basic Formula</h4>
              <p>Paint coverage starts with wall area: multiply the perimeter by the height. For a rectangular room, perimeter equals 2 times (length + width). Then subtract areas that won't be painted — doors, windows, and large openings. Multiply by the number of coats to get total area to cover.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Coverage Rate Explained</h4>
              <p>Coverage rate tells you how much area one liter of paint covers. Standard interior paints cover about 10 square meters per liter (or 350-400 square feet per gallon). Premium paints often cover more area, while budget paints may cover less. Always check the manufacturer's label for the specific coverage rate.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Why Surface Type Matters</h4>
              <p>Unpainted drywall soaks up more paint than previously painted walls. Textured surfaces like orange peel or knockdown need 10-20% more paint than smooth walls. Dark colors covering light walls need fewer coats than light colors covering dark walls.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips for Better Paint Estimates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Add 10% Buffer</p>
                <p>Always buy slightly more than calculated. You'll need touch-ups eventually, and paint batches can vary in color.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Measure Large Openings</p>
                <p>Standard doors are about 2 m² and windows about 1 m². Large picture windows or French doors remove significant area — measure them individually.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Consider Primer</p>
                <p>New drywall, stains, or dramatic color changes need primer first. Primer covers 8-10 m²/L and costs less than finish paint.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Don't Forget the Ceiling</p>
                <p>Ceilings need separate calculation. Multiply length times width. Ceiling paint is typically flat and covers about 10-12 m²/L.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">How much paint do I need for a 4x5 meter room?</h4>
              <p>A 4x5 meter room with 2.7 meter ceilings has about 48.6 m² of wall area. Subtract one door (2 m²) and one window (1.5 m²) for 45.1 m² paintable area. For two coats at 10 m²/L coverage, you need about 9 liters or 2.4 gallons of paint.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Is one coat of paint ever enough?</h4>
              <p>One coat works when repainting the same color or very similar shades. For color changes, especially dark to light or vice versa, plan on two coats minimum. The first coat seals and provides base coverage; the second gives uniform color and sheen.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Does expensive paint cover better?</h4>
              <p>Generally yes. Premium paints have higher pigment concentrations and better binders, giving better coverage and durability. A $60/gallon paint covering 400 sq ft/gal often costs less overall than a $30/gallon paint covering 250 sq ft/gal.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">How do I calculate paint for multiple rooms?</h4>
              <p>Calculate each room separately, then add the totals. If using the same color throughout, you can buy in larger quantities for discounts. Keep different colors separate in your calculations.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">What's the difference between liters and gallons for paint?</h4>
              <p>One gallon equals about 3.785 liters. In countries using the metric system, paint comes in 1L, 2.5L, 5L, and 10L containers. In the US, common sizes are quarts (0.95L), gallons (3.78L), and 5-gallon buckets (19L).</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <a href="/calculators/paint-cost-estimate-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Paint Cost Estimate Calculator</span>
                <p className="text-muted-foreground">Calculate total paint cost including price per gallon</p>
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
  );
}
