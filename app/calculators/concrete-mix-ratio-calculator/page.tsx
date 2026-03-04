"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ConcreteMixRatioCalculator() {
  const [volume, setVolume] = useState<string>("");
  const [ratio, setRatio] = useState<string>("1:2:4");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const V = parseFloat(volume);
    const parts = ratio.split(":").map(Number);

    if (V > 0 && parts.length === 3 && parts.every(p => p > 0)) {
      const [cement, sand, aggregate] = parts;
      const totalParts = cement + sand + aggregate;
      
      // Dry volume is ~1.54× wet volume
      const dryVolume = V * 1.54;
      
      const cementVol = (cement / totalParts) * dryVolume;
      const sandVol = (sand / totalParts) * dryVolume;
      const aggVol = (aggregate / totalParts) * dryVolume;
      
      // Cement: 1440 kg/m³, 50kg per bag
      const cementKg = cementVol * 1440;
      const cementBags = Math.ceil(cementKg / 50);

      setResults({
        cement: Math.round(cementKg),
        cementBags,
        sand: Math.round(sandVol * 100) / 100,
        aggregate: Math.round(aggVol * 100) / 100,
      });
    }
  };

  const reset = () => {
    setVolume(""); setRatio("1:2:4"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Concrete Mix Ratio Calculator – Calculate Material Quantities</CardTitle>
          <CardDescription>
            Calculate cement, sand, and aggregate quantities for concrete mixes. Enter volume and mix ratio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Concrete Volume (m³)</Label><Input value={volume} onChange={e => setVolume(e.target.value)} /></div>
              <div>
                <Label>Mix Ratio</Label>
                <Select value={ratio} onValueChange={(v) => setRatio(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1:1.5:3">M20 (1:1.5:3)</SelectItem>
                    <SelectItem value="1:2:4">M15 (1:2:4)</SelectItem>
                    <SelectItem value="1:3:6">M10 (1:3:6)</SelectItem>
                    <SelectItem value="1:4:8">M7.5 (1:4:8)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Materials</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Cement</p>
                    <p className="text-2xl font-bold">{results.cement} kg</p>
                    <p className="text-xs text-muted-foreground">{results.cementBags} bags</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sand</p>
                    <p className="text-2xl font-bold">{results.sand} m³</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Aggregate</p>
                    <p className="text-2xl font-bold">{results.aggregate} m³</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <div className="mt-12 space-y-12">
        {/* How It Works */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Concrete Mix Materials</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Concrete Volume</h3>
                <p className="text-muted-foreground text-sm">Input the total volume of concrete needed in cubic meters for your project.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Select Mix Ratio</h3>
                <p className="text-muted-foreground text-sm">Choose standard mix ratios (M20, M15, M10, M7.5) based on your strength requirements.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get Material Quantities</h3>
                <p className="text-muted-foreground text-sm">See cement (kg and bags), sand (m³), and aggregate (m³) needed for your concrete mix.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Benefits */}
        <section className="bg-card rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Concrete Mix Calculator?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">🏗️ Accurate Material Estimation</h3>
              <p className="text-muted-foreground text-sm">Avoid costly over-ordering or project delays from under-ordering with precise material calculations.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📐 Standard Mix Ratios</h3>
              <p className="text-muted-foreground text-sm">Pre-loaded with common Indian standard mixes (M20, M15, M10, M7.5) for various construction needs.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📦 Cement Bag Calculator</h3>
              <p className="text-muted-foreground text-sm">Automatically converts cement weight to 50kg bags for easy ordering from suppliers.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🔢 Dry Volume Factor</h3>
              <p className="text-muted-foreground text-sm">Accounts for 1.54× dry volume factor to compensate for voids and shrinkage during mixing.</p>
            </div>
          </div>
        </section>

        {/* Reference Table */}
        <section className="bg-card rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-6">Concrete Mix Ratio Reference Guide</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Grade</th>
                  <th className="text-left py-3 px-4">Mix Ratio</th>
                  <th className="text-left py-3 px-4">Compressive Strength</th>
                  <th className="text-left py-3 px-4">Common Applications</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">M20</td>
                  <td className="py-3 px-4">1:1.5:3</td>
                  <td className="py-3 px-4">20 MPa (2900 psi)</td>
                  <td className="py-3 px-4">RCC slabs, beams, columns, foundations</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">M15</td>
                  <td className="py-3 px-4">1:2:4</td>
                  <td className="py-3 px-4">15 MPa (2175 psi)</td>
                  <td className="py-3 px-4">Flooring, pathways, mass concrete</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">M10</td>
                  <td className="py-3 px-4">1:3:6</td>
                  <td className="py-3 px-4">10 MPa (1450 psi)</td>
                  <td className="py-3 px-4">Non-structural work, leveling courses</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">M7.5</td>
                  <td className="py-3 px-4">1:4:8</td>
                  <td className="py-3 px-4">7.5 MPa (1090 psi)</td>
                  <td className="py-3 px-4">Temporary structures, foundations for light loads</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Concrete Mix FAQs</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">What does M20 concrete mean?</h3>
              <p className="text-muted-foreground text-sm">M20 means the concrete has a characteristic compressive strength of 20 MPa (megapascals) after 28 days of curing. The 'M' stands for 'Mix'.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Why is dry volume 1.54 times wet volume?</h3>
              <p className="text-muted-foreground text-sm">Dry materials have voids between particles. The 1.54 factor accounts for approximately 52% extra volume for voids in sand and aggregate, plus wastage.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">How many bags of cement for 1 cubic meter of M20?</h3>
              <p className="text-muted-foreground text-sm">For M20 (1:1.5:3), you need approximately 8 bags (400 kg) of cement per cubic meter of concrete.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">What is the water-cement ratio for concrete?</h3>
              <p className="text-muted-foreground text-sm">Typical water-cement ratio is 0.4-0.6. Lower ratios (0.4) give stronger concrete but are harder to work with. Higher ratios (0.6) are more workable but weaker.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Can I use this calculator for small DIY projects?</h3>
              <p className="text-muted-foreground text-sm">Yes! This calculator works for any volume. For small projects, you can scale down quantities proportionally or use pre-mix concrete bags.</p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Related Construction Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/ceiling-tile-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Ceiling Tile Calculator</h3>
              <p className="text-muted-foreground text-sm">Calculate materials needed for ceiling installation in buildings.</p>
            </a>
            <a href="/calculators/carpet-area-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Carpet Area Calculator</h3>
              <p className="text-muted-foreground text-sm">Calculate usable floor area for flooring and real estate purposes.</p>
            </a>
            <a href="/calculators/container-load-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Container Load Calculator</h3>
              <p className="text-muted-foreground text-sm">Calculate shipping container capacity for material delivery.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
