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

interface AsphaltResult {
  area: number;
  depth: number;
  volume: number;
  weight: number;
  tons: number;
  truckLoads: number;
  cost: number;
  recommendations: string[];
}

export default function AsphaltQuantityCalculatorPage() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [depth, setDepth] = useState<string>("");
  const [shape, setShape] = useState<string>("rectangle");
  const [diameter, setDiameter] = useState<string>("");
  const [unit, setUnit] = useState<string>("feet");
  const [pricePerTon, setPricePerTon] = useState<string>("100");
  const [result, setResult] = useState<AsphaltResult | null>(null);

  const calculate = () => {
    const lengthNum = parseFloat(length) || 0;
    const widthNum = parseFloat(width) || 0;
    const depthNum = parseFloat(depth) || 0;
    const diameterNum = parseFloat(diameter) || 0;
    const priceNum = parseFloat(pricePerTon) || 100;

    if (lengthNum === 0 || widthNum === 0 || depthNum === 0) return;

    // Calculate area based on shape
    let areaSqFt = 0;

    if (shape === "rectangle") {
      areaSqFt = lengthNum * widthNum;
    } else if (shape === "circle") {
      const radius = diameterNum / 2;
      areaSqFt = Math.PI * Math.pow(radius, 2);
    }

    // Convert depth to feet if needed
    let depthFeet = depthNum;
    if (unit === "inches") {
      depthFeet = depthNum / 12;
    } else if (unit === "cm") {
      depthFeet = depthNum / 30.48;
    }

    // Calculate volume in cubic feet
    const volumeCuFt = areaSqFt * depthFeet;

    // Convert to cubic yards (1 cubic yard = 27 cubic feet)
    const volumeCuYards = volumeCuFt / 27;

    // Asphalt density: ~145-150 lbs per cubic foot (compacted)
    const density = 148;
    const weightLbs = volumeCuFt * density;
    const weightTons = weightLbs / 2000;

    // Truck loads (standard dump truck: 10-14 tons)
    const truckLoads = Math.ceil(weightTons / 12);

    // Cost estimate
    const cost = weightTons * priceNum;

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📐 Area: ${areaSqFt.toFixed(0)} sq ft`);
    recommendations.push(`📊 Volume: ${volumeCuYards.toFixed(2)} cubic yards`);
    recommendations.push(`⚖️ Weight: ${weightTons.toFixed(2)} tons`);
    recommendations.push(`🚛 Truck loads (12 ton): ${truckLoads}`);

    if (depthFeet < 0.17) { // Less than 2 inches
      recommendations.push("⚠️ Depth less than 2\" - may not be sufficient for driveways");
    } else if (depthFeet >= 0.17 && depthFeet < 0.33) {
      recommendations.push("✅ 2-4\" depth suitable for residential driveways");
    } else {
      recommendations.push("✅ 4\"+ depth suitable for commercial/heavy traffic");
    }

    recommendations.push("💡 Order 5-10% extra for waste and compaction");
    recommendations.push("🌡️ Asphalt should be laid at 275-300°F");

    setResult({
      area: parseFloat(areaSqFt.toFixed(0)),
      depth: parseFloat(depthFeet.toFixed(2)),
      volume: parseFloat(volumeCuYards.toFixed(2)),
      weight: parseFloat(weightLbs.toFixed(0)),
      tons: parseFloat(weightTons.toFixed(2)),
      truckLoads,
      cost: parseFloat(cost.toFixed(2)),
      recommendations,
    });
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setDepth("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Asphalt Quantity Calculator – Calculate Asphalt Needed for Roads & Driveways
          </h1>
          <p className="text-muted-foreground">
            Accurately estimate asphalt requirements for any paving project with our
            Asphalt Quantity Calculator. Enter the area and compacted depth to calculate
            volume in cubic yards and weight in tons — enabling accurate material
            ordering and cost estimation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shape">Area Shape</Label>
                <Select value={shape} onValueChange={setShape}>
                  <SelectTrigger id="shape">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rectangle">Rectangle/Square</SelectItem>
                    <SelectItem value="circle">Circle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {shape === "rectangle" ? (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="length">Length</Label>
                    <Input
                      id="length"
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <Label htmlFor="diameter">Diameter</Label>
                  <Input
                    id="diameter"
                    type="number"
                    value={diameter}
                    onChange={(e) => setDiameter(e.target.value)}
                    placeholder="0"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="depth">Depth/Thickness</Label>
                  <Input
                    id="depth"
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    placeholder="4"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inches">Inches</SelectItem>
                      <SelectItem value="feet">Feet</SelectItem>
                      <SelectItem value="cm">Centimeters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price per Ton ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={pricePerTon}
                  onChange={(e) => setPricePerTon(e.target.value)}
                  placeholder="100"
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
              <h3 className="text-lg font-semibold mb-4">Asphalt Estimate</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Tons Needed</p>
                      <p className="text-2xl font-bold text-primary">{result.tons}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Estimated Cost</p>
                      <p className="text-2xl font-bold text-primary">${result.cost}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Area:</span>
                      <span className="font-semibold">{result.area} sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Volume:</span>
                      <span className="font-semibold">{result.volume} cu yd</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Weight:</span>
                      <span className="font-semibold">{result.weight} lbs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Truck Loads:</span>
                      <span className="font-semibold">{result.truckLoads}</span>
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
                  <p>Enter dimensions and click Calculate to see estimate</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Asphalt Paving Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Driveways:</strong> 2-4 inches compacted thickness
                  </li>
                  <li>
                    <strong>Parking lots:</strong> 3-5 inches compacted thickness
                  </li>
                  <li>
                    <strong>Roads:</strong> 4-8 inches compacted thickness
                  </li>
                  <li>
                    <strong>Base layer:</strong> 4-6 inches of crushed stone
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Always prepare a proper base before laying asphalt.
                  Poor base preparation is the #1 cause of pavement failure. Order 5-10%
                  extra for waste, spillage, and compaction adjustments.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How to Use Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                How to Use This Asphalt Quantity Calculator
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Enter Your Dimensions</h4>
                    <p className="text-sm text-muted-foreground">
                      Input the length and width of your paving area. Choose between rectangle/square
                      or circle shape. For circular areas, enter the diameter.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Set the Depth/Thickness</h4>
                    <p className="text-sm text-muted-foreground">
                      Enter the desired asphalt thickness and select your unit (inches, feet, or
                      centimeters). Most residential driveways need 2-4 inches of compacted asphalt.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Calculate and Review</h4>
                    <p className="text-sm text-muted-foreground">
                      Click Calculate to see your results: total tons needed, estimated cost, volume
                      in cubic yards, and truck load requirements. Use the recommendations to guide
                      your project planning.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding Asphalt Calculations */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Understanding Asphalt Quantity Calculations
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Why Accurate Calculations Matter</h4>
                  <p className="mb-2">
                    Getting your asphalt quantities right affects three critical parts of your project:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Cost control:</strong> Asphalt is expensive. Over-ordering wastes money; under-ordering means paying for additional delivery fees.</li>
                    <li><strong>Ordering accuracy:</strong> Most suppliers have minimum delivery quantities (typically 3-5 tons). Knowing your exact needs helps you plan efficiently.</li>
                    <li><strong>Waste reduction:</strong> Leftover asphalt cools and hardens quickly. It can't be stored for later use, making accurate calculations essential.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Asphalt Density</h4>
                  <p>
                    Compacted asphalt typically weighs <strong>145-150 pounds per cubic foot</strong>. This calculator uses 148 lbs/cu ft as the standard density. Hot mix asphalt density varies slightly based on the aggregate mix and binder content, but 148 lbs/cu ft works for most planning purposes.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Compaction Factor</h4>
                  <p>
                    Asphalt arrives at your site hot and loose. During installation, rollers compress it to achieve the final thickness. The compaction factor is roughly <strong>20-25%</strong> — meaning loose asphalt is about 25% thicker than compacted asphalt. This calculator accounts for compacted thickness, which is what you actually need for your project.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Coverage Rates</h4>
                  <p>
                    Coverage depends entirely on thickness. Doubling the thickness cuts coverage in half. A single ton of asphalt covers roughly 160 square feet at 1 inch thick, but only 80 square feet at 2 inches thick. See the coverage table below for specific rates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coverage Table */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Asphalt Coverage Table
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                How much area one ton of asphalt covers at different thicknesses:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">Thickness</th>
                      <th className="text-left py-2 px-3 font-semibold">Coverage per Ton</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-3">1 inch</td>
                      <td className="py-2 px-3">160 sq ft</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">2 inches</td>
                      <td className="py-2 px-3">80 sq ft</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">3 inches</td>
                      <td className="py-2 px-3">53 sq ft</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">4 inches</td>
                      <td className="py-2 px-3">40 sq ft</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">6 inches</td>
                      <td className="py-2 px-3">27 sq ft</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Coverage calculated using 148 lbs/cu ft density. Actual coverage may vary slightly based on mix design and compaction.
              </p>
            </CardContent>
          </Card>

          {/* Layer Recommendations */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Asphalt Layer Recommendations by Use
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Different applications require different layer structures. Here's what professionals typically use:
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-1">Driveways (Residential)</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>2-3 inches</strong> surface course over prepared base. For heavier vehicles or poor soil conditions, add 4-6 inches of crushed stone base.
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-1">Parking Lots</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>3-4 inches</strong> surface course + <strong>4-6 inches</strong> base course. Commercial lots with heavy traffic may need additional thickness.
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-1">Roads</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>2-3 inches</strong> surface course + <strong>4-8 inches</strong> base course + <strong>6-12 inches</strong> subbase. Road construction requires engineered specifications based on expected traffic loads.
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-1">Pathways & Walkways</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>2 inches</strong> surface course + <strong>4 inches</strong> base. Pedestrian traffic requires less thickness but proper base preparation remains critical.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ordering Tips */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Asphalt Ordering Tips
              </h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold">✓</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Order 5-10% extra</strong>
                    <p>Account for waste, spillage, minor depth variations, and compaction adjustments. It's better to have a little left over than to run short mid-pour.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold">✓</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Know minimum delivery quantities</strong>
                    <p>Most asphalt plants require 3-5 ton minimums. For small projects, you may need to order more than you actually need or coordinate with neighbors.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold">✓</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Plan truck access</strong>
                    <p>Delivery trucks are large and heavy. Ensure your site can accommodate them. Tight turns, overhead wires, or weak driveways can cause problems.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold">✓</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Prepare the base first</strong>
                    <p>Don't order asphalt until your base is complete, compacted, and ready. Asphalt cools quickly — you typically have 30-45 minutes to spread and compact after delivery.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-5">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    How much asphalt do I need for my driveway?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    For a typical 2-car driveway (about 600-800 sq ft) with 3 inches of asphalt, you'll need roughly 11-15 tons. Use this calculator to get an exact number based on your specific dimensions. Always order 5-10% extra to account for waste and compaction.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    What is the typical thickness for asphalt?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Residential driveways typically use 2-4 inches of compacted asphalt. Parking lots need 3-5 inches. Roads require 4-8 inches or more. The thickness depends on expected traffic loads and the quality of your base preparation. Thicker isn't always better — proper base preparation matters more than extra asphalt thickness.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    How much does asphalt weigh?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Compacted asphalt weighs approximately 145-150 pounds per cubic foot, or about 3,900-4,050 pounds per cubic yard. One ton of asphalt equals 2,000 pounds. This calculator uses 148 lbs/cu ft as the standard density for accurate estimates.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Should I order extra asphalt?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Yes — order 5-10% extra. Asphalt can't be returned once delivered, but running short means paying for another delivery (which often costs more than the extra material). Leftover asphalt can sometimes be used for edge repairs or future patching if handled properly.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    What affects asphalt quantity calculations?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Several factors impact your calculations: area dimensions, desired thickness, asphalt density (varies by mix), compaction rate, ground irregularities, and waste from spreading and trimming. This calculator accounts for standard density and compaction, but you should still add a buffer for site-specific conditions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools */}
        </div>
      </div>
    </div>
  );
}
