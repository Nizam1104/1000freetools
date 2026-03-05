"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function CarpetAreaCalculator() {
  const [builtUpArea, setBuiltUpArea] = useState<string>("");
  const [superBuiltUpArea, setSuperBuiltUpArea] = useState<string>("");
  const [propertyType, setPropertyType] = useState<"apartment" | "house" | "commercial">("apartment");
  const [mode, setMode] = useState<"from-built" | "from-super">("from-super");
  const [result, setResult] = useState<any>(null);
  const [barData, setBarData] = useState<any[]>([]);

  const deductionRatios = {
    apartment: { superBuilt: 0.25, builtUp: 0.10 },
    house: { superBuilt: 0.15, builtUp: 0.05 },
    commercial: { superBuilt: 0.30, builtUp: 0.15 }
  };

  const calculate = () => {
    if (mode === "from-super") {
      const superArea = parseFloat(superBuiltUpArea);
      if (superArea > 0) {
        const ratio = deductionRatios[propertyType].superBuilt;
        const carpetArea = superArea * (1 - ratio);
        const builtUp = superArea * (1 - ratio / 2);
        setResult({
          carpetArea: Math.round(carpetArea * 100) / 100,
          builtUpArea: Math.round(builtUp * 100) / 100,
          superBuiltUpArea: superArea,
          efficiency: Math.round((carpetArea / superArea) * 100)
        });
        setBarData([
          { name: "Carpet Area", value: Math.round(carpetArea * 100) / 100 },
          { name: "Built-Up", value: Math.round(builtUp * 100) / 100 },
          { name: "Super Built-Up", value: superArea }
        ]);
      }
    } else {
      const builtArea = parseFloat(builtUpArea);
      if (builtArea > 0) {
        const ratio = deductionRatios[propertyType].builtUp;
        const carpetArea = builtArea * (1 - ratio);
        const superBuilt = builtArea / (1 - deductionRatios[propertyType].superBuilt);
        setResult({
          carpetArea: Math.round(carpetArea * 100) / 100,
          builtUpArea: builtArea,
          superBuiltUpArea: Math.round(superBuilt * 100) / 100,
          efficiency: Math.round((carpetArea / builtArea) * 100)
        });
        setBarData([
          { name: "Carpet Area", value: Math.round(carpetArea * 100) / 100 },
          { name: "Built-Up", value: builtArea },
          { name: "Super Built-Up", value: Math.round(superBuilt * 100) / 100 }
        ]);
      }
    }
  };

  const reset = () => {
    setBuiltUpArea("");
    setSuperBuiltUpArea("");
    setResult(null);
    setBarData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Carpet Area Calculator – Calculate Carpet Area from Built-Up Area</CardTitle>
          <CardDescription>
            Calculate the carpet area of a flat or house from built-up or super built-up area using standard ratios with our free carpet area calculator. Understand exactly how much usable space you're getting. Essential for home buyers in India.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Calculate From</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="from-super">Super Built-Up Area</SelectItem>
                  <SelectItem value="from-built">Built-Up Area</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Property Type</Label>
              <Select value={propertyType} onValueChange={(v) => setPropertyType(v as typeof propertyType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment/Flat</SelectItem>
                  <SelectItem value="house">Independent House</SelectItem>
                  <SelectItem value="commercial">Commercial/Office</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "from-super" ? (
              <div>
                <Label>Super Built-Up Area (sqft)</Label>
                <Input type="number" placeholder="e.g., 1500" value={superBuiltUpArea} onChange={(e) => setSuperBuiltUpArea(e.target.value)} />
              </div>
            ) : (
              <div>
                <Label>Built-Up Area (sqft)</Label>
                <Input type="number" placeholder="e.g., 1200" value={builtUpArea} onChange={(e) => setBuiltUpArea(e.target.value)} />
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Carpet Area</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Carpet Area (Usable)</p>
                  <p className="text-4xl font-bold">{result.carpetArea} sqft</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Built-Up Area</p>
                    <p className="text-xl font-semibold">{result.builtUpArea} sqft</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Super Built-Up</p>
                    <p className="text-xl font-semibold">{result.superBuiltUpArea} sqft</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Efficiency Ratio</p>
                  <p className="text-xl font-semibold">{result.efficiency}% usable space</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Property Area Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Real estate listings use different area measurements. Understanding these terms helps you know exactly how much usable space you're paying for.</p>

          <h3 className="text-xl font-semibold">Area Definitions</h3>
          <div className="space-y-3">
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold">Carpet Area</p>
              <p className="text-sm">Actual usable floor area where you can lay carpet. Excludes walls, balconies, and common areas.</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold">Built-Up Area</p>
              <p className="text-sm">Carpet area + wall thickness + utility ducts. Typically 10-15% more than carpet area.</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold">Super Built-Up Area</p>
              <p className="text-sm">Built-up area + proportionate share of common areas (lobby, stairs, elevator, amenities). Also called "saleable area".</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold">Typical Deduction Ratios</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Property Type</th>
                  <th className="p-2 text-left">From Super Built-Up</th>
                  <th className="p-2 text-left">From Built-Up</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Apartment</td>
                  <td className="p-2">25% deduction</td>
                  <td className="p-2">10% deduction</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">House</td>
                  <td className="p-2">15% deduction</td>
                  <td className="p-2">5% deduction</td>
                </tr>
                <tr>
                  <td className="p-2">Commercial</td>
                  <td className="p-2">30% deduction</td>
                  <td className="p-2">15% deduction</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Example Calculation</h3>
          <p>Super Built-Up Area: 1,500 sqft (Apartment)</p>
          <p>Carpet Area = 1,500 × (1 - 0.25) = 1,125 sqft</p>
          <p>Efficiency = 1,125 / 1,500 = 75%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Area Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Area (sqft)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Enter values and calculate to see the chart</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Home Buyer Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Always ask for carpet area, not just super built-up area</li>
            <li>Compare properties using carpet area for accurate comparison</li>
            <li>Higher efficiency ratio means more usable space for your money</li>
            <li>Apartments typically have 70-75% efficiency</li>
            <li>Independent houses have 85-90% efficiency</li>
            <li>RERA mandates disclosure of carpet area in India</li>
          </ul>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <div className="mt-12 space-y-12">
        {/* How It Works */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Carpet Area from Built-Up Area</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Choose Calculation Mode</h3>
                <p className="text-muted-foreground text-sm">Select whether you want to calculate from super built-up area or built-up area.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Select Property Type</h3>
                <p className="text-muted-foreground text-sm">Choose apartment, independent house, or commercial property for accurate ratios.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get Carpet Area</h3>
                <p className="text-muted-foreground text-sm">See your usable carpet area along with efficiency ratio and area comparison chart.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Benefits */}
        <section className="bg-card rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-6">Why Calculate Carpet Area?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">🏠 Know Your Usable Space</h3>
              <p className="text-muted-foreground text-sm">Carpet area is the actual floor space you can use. Understanding this helps you compare properties fairly.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📊 RERA Compliance</h3>
              <p className="text-muted-foreground text-sm">In India, RERA mandates carpet area disclosure. This calculator helps verify builder claims.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">💰 Fair Price Comparison</h3>
              <p className="text-muted-foreground text-sm">Compare properties based on carpet area price per sqft, not misleading super built-up rates.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📈 Efficiency Analysis</h3>
              <p className="text-muted-foreground text-sm">See what percentage of the saleable area is actually usable space in your property.</p>
            </div>
          </div>
        </section>

        {/* Reference Table */}
        <section className="bg-card rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-6">Area Deduction Ratios by Property Type</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Property Type</th>
                  <th className="text-left py-3 px-4">From Super Built-Up</th>
                  <th className="text-left py-3 px-4">From Built-Up</th>
                  <th className="text-left py-3 px-4">Typical Efficiency</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">🏢 Apartment/Flat</td>
                  <td className="py-3 px-4">25% deduction</td>
                  <td className="py-3 px-4">10% deduction</td>
                  <td className="py-3 px-4">70-75%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">🏡 Independent House</td>
                  <td className="py-3 px-4">15% deduction</td>
                  <td className="py-3 px-4">5% deduction</td>
                  <td className="py-3 px-4">85-90%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">🏬 Commercial/Office</td>
                  <td className="py-3 px-4">30% deduction</td>
                  <td className="py-3 px-4">15% deduction</td>
                  <td className="py-3 px-4">65-70%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Carpet Area FAQs</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">What is the difference between carpet area and built-up area?</h3>
              <p className="text-muted-foreground text-sm">Carpet area is the usable floor space inside walls. Built-up area includes carpet area plus wall thickness and utility ducts, typically 10-15% more.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">What is super built-up area?</h3>
              <p className="text-muted-foreground text-sm">Super built-up area (saleable area) includes built-up area plus your share of common spaces like lobby, stairs, elevator, and amenities. It's 25-30% more than carpet area for apartments.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">How is carpet area calculated under RERA?</h3>
              <p className="text-muted-foreground text-sm">RERA defines carpet area as net usable floor area excluding external walls, balconies, and common areas. Builders must quote prices based on carpet area in India.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">What is a good efficiency ratio for apartments?</h3>
              <p className="text-muted-foreground text-sm">A good efficiency ratio is 75% or higher, meaning 75% of the super built-up area is usable carpet space. Lower ratios mean you're paying for more common area.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Should I buy based on carpet area or super built-up?</h3>
              <p className="text-muted-foreground text-sm">Always compare properties using carpet area. A 1000 sqft super built-up apartment may have only 750 sqft carpet area, affecting value comparison.</p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Related Real Estate & Home Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/ceiling-tile-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Ceiling Tile Calculator</h3>
              <p className="text-muted-foreground text-sm">Calculate materials needed for ceiling installation in your home or office.</p>
            </a>
            <a href="/calculators/canvas-aspect-ratio-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Canvas Aspect Ratio Calculator</h3>
              <p className="text-muted-foreground text-sm">Calculate dimensions for interior design layouts and wall art.</p>
            </a>
            <a href="/calculators/concrete-mix-ratio-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Concrete Mix Ratio Calculator</h3>
              <p className="text-muted-foreground text-sm">Calculate cement, sand, and aggregate for home construction projects.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
