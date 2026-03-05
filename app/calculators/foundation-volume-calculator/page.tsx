"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FoundationVolumeCalculator() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [depth, setDepth] = useState<string>("");
  const [numFootings, setNumFootings] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const D = parseFloat(depth);
    const n = parseInt(numFootings) || 1;

    if (L > 0 && W > 0 && D > 0) {
      const volume = L * W * D * n;
      // Add 10% waste
      const withWaste = volume * 1.1;

      setResults({
        volume: Math.round(volume * 100) / 100,
        withWaste: Math.round(withWaste * 100) / 100,
        cubicYards: Math.round(withWaste * 1.30795 * 10) / 10,
      });
    }
  };

  const reset = () => {
    setLength(""); setWidth(""); setDepth(""); setNumFootings("1"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Foundation Volume Calculator – Calculate Concrete for Footings</CardTitle>
          <CardDescription>
            Calculate the volume of concrete needed for foundation footings. Enter dimensions and number of footings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              <div><Label>Width (m)</Label><Input value={width} onChange={e => setWidth(e.target.value)} /></div>
              <div><Label>Depth (m)</Label><Input value={depth} onChange={e => setDepth(e.target.value)} /></div>
            </div>
            <div>
              <Label>Number of Footings</Label>
              <Input type="number" value={numFootings} onChange={e => setNumFootings(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Volume</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Net Volume</p>
                    <p className="text-2xl font-bold">{results.volume} m³</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">With 10% Waste</p>
                    <p className="text-2xl font-bold">{results.withWaste} m³</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cubic Yards</p>
                    <p className="text-2xl font-bold">{results.cubicYards} yd³</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Foundation Volume Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter footing dimensions</p>
                  <p>Input the length, width, and depth of a single footing in meters. For example, a typical residential footing might be 0.5m wide, 0.3m deep, and run the length of your foundation.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Specify the number of footings</p>
                  <p>Enter how many identical footings you need. If you have footings of different sizes, calculate each group separately and add the results.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Review your concrete order</p>
                  <p>The calculator shows net volume, volume with 10% waste allowance, and cubic yards for ordering. Use the &quot;with waste&quot; figure when ordering ready-mix concrete.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Standard Footing Sizes and Concrete Requirements
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Footing Type</th>
                    <th className="text-left py-3 px-2 font-semibold">Typical Dimensions</th>
                    <th className="text-left py-3 px-2 font-semibold">Volume per Meter</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Residential strip footing</td>
                    <td className="py-3 px-2">600mm × 300mm</td>
                    <td className="py-3 px-2">0.18 m³/m</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Heavy residential footing</td>
                    <td className="py-3 px-2">800mm × 400mm</td>
                    <td className="py-3 px-2">0.32 m³/m</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Commercial footing</td>
                    <td className="py-3 px-2">1000mm × 500mm</td>
                    <td className="py-3 px-2">0.50 m³/m</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Pad footing (small)</td>
                    <td className="py-3 px-2">600mm × 600mm × 300mm</td>
                    <td className="py-3 px-2">0.108 m³ each</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Pad footing (large)</td>
                    <td className="py-3 px-2">1200mm × 1200mm × 400mm</td>
                    <td className="py-3 px-2">0.576 m³ each</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Actual footing sizes depend on soil conditions, building loads, and local building codes. Always consult a structural engineer.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Foundation Volume Calculations
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">The Basic Formula</h4>
                <p>
                  Foundation volume is straightforward: multiply length × width × depth for each footing,
                  then multiply by the number of identical footings. For a rectangular footing that is
                  10m long, 0.6m wide, and 0.3m deep, the volume is 10 × 0.6 × 0.3 = 1.8 cubic meters.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Add 10% for Waste</h4>
                <p>
                  Concrete orders always include a waste allowance. Some concrete stays in the truck,
                  some spills during pouring, and ground conditions can cause the trench to be slightly
                  larger than planned. The industry standard is 10% for simple footings, 15% for complex
                  foundations with many corners or rebar congestion.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Cubic Meters vs Cubic Yards</h4>
                <p>
                  Most countries order concrete in cubic meters. The United States uses cubic yards.
                  One cubic meter equals 1.308 cubic yards. If you are in the US and need 10 cubic
                  yards, that is approximately 7.6 cubic meters.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Ordering Concrete
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Order by the &quot;with waste&quot; figure</p>
                  <p>Never order the exact calculated volume. The 10% waste allowance prevents running short mid-pour, which can create weak points in your foundation.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Check minimum order quantities</p>
                  <p>Many ready-mix suppliers have minimum orders, often 4-6 cubic meters. For smaller jobs, consider bagged concrete mix or a &quot;short load&quot; service.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Know your concrete strength</p>
                  <p>Residential footings typically use 25-30 MPa (3500-4000 psi) concrete. Commercial projects may require 35+ MPa. Ask your engineer or building inspector.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Schedule delivery carefully</p>
                  <p>Concrete trucks have limited time before the concrete sets. Have your forms ready, rebar tied, and crew on site before the truck arrives.</p>
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
                <h4 className="font-medium text-foreground mb-2">How do I calculate concrete for footings?</h4>
                <p>
                  Multiply length × width × depth for one footing, then multiply by the number of footings.
                  Add 10% for waste. For example, a footing 10m × 0.6m × 0.3m has a volume of 1.8 m³.
                  Ten identical footings need 18 m³, or about 20 m³ with waste included.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the standard waste allowance for concrete?</h4>
                <p>
                  The industry standard is 10% for simple rectangular footings and slab work. Increase
                  to 15% for complex foundations with many corners, thick rebar, or difficult access.
                  It is better to have a small amount left over than to run short.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How many cubic meters are in a concrete truck?</h4>
                <p>
                  Standard ready-mix trucks carry 8-10 cubic meters. Mini trucks for tight access sites
                  carry 4-6 cubic meters. If you need more than one truckload, suppliers often require
                  a minimum gap between deliveries to allow for proper pouring and finishing.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What concrete strength do I need for footings?</h4>
                <p>
                  Most residential footings use 25-30 MPa (3500-4000 psi) concrete. Heavy commercial
                  foundations may require 35-40 MPa. Your structural engineer or local building code
                  will specify the minimum strength. Do not substitute lower strength concrete.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I use this calculator for slab foundations?</h4>
                <p>
                  Yes. A slab is simply a wide, shallow footing. Enter the slab length, width, and
                  thickness. For a 10m × 8m slab at 100mm thick, enter length 10, width 8, depth 0.1.
                  The result is 8 m³, or about 9 m³ with waste allowance.
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
                <p className="text-muted-foreground">Calculate the number of concrete blocks needed for your wall project</p>
              </a>
              <a
                href="/calculators/cement-sand-aggregate-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Cement Sand Aggregate Calculator</span>
                <p className="text-muted-foreground">Mix ratios for concrete and mortar with material quantities</p>
              </a>
              <a
                href="/calculators/steel-weight-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Steel Weight Calculator</span>
                <p className="text-muted-foreground">Calculate rebar and steel plate weights for structural projects</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
