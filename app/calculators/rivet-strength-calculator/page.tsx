"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RivetStrengthCalculator() {
  const [diameter, setDiameter] = useState<string>("");
  const [shearStrength, setShearStrength] = useState<string>("");
  const [numRivets, setNumRivets] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const d = parseFloat(diameter);
    const τ = parseFloat(shearStrength);
    const n = parseInt(numRivets);

    if (d > 0 && τ > 0 && n > 0) {
      const area = Math.PI * Math.pow(d / 2, 2);
      const singleShear = area * τ / 1000; // kN per rivet
      const totalLoad = singleShear * n;

      // Bearing strength (approx 2× shear for steel)
      const bearingStrength = totalLoad * 2;

      setResults({
        singleShear: Math.round(singleShear * 100) / 100,
        totalShear: Math.round(totalLoad * 100) / 100,
        bearing: Math.round(bearingStrength * 100) / 100,
      });
    }
  };

  const reset = () => {
    setDiameter(""); setShearStrength(""); setNumRivets(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Rivet Diameter (mm)</Label><Input value={diameter} onChange={e => setDiameter(e.target.value)} /></div>
              <div><Label>Shear Strength (MPa)</Label><Input value={shearStrength} onChange={e => setShearStrength(e.target.value)} /></div>
              <div><Label>Number of Rivets</Label><Input type="number" value={numRivets} onChange={e => setNumRivets(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Strength</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Per Rivet (Shear)</p>
                    <p className="text-2xl font-bold">{results.singleShear} kN</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Shear</p>
                    <p className="text-3xl font-bold">{results.totalShear} kN</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bearing Capacity</p>
                    <p className="text-2xl font-bold">{results.bearing} kN</p>
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
              How to Use This Rivet Strength Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter rivet diameter</p>
                  <p>Input the diameter of the rivet in millimeters. Common sizes range from 3mm to 20mm depending on application.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter shear strength</p>
                  <p>Input the material&apos;s shear strength in MPa. Steel rivets typically range from 300-800 MPa.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter number of rivets</p>
                  <p>Specify how many rivets share the load. The calculator shows per-rivet capacity and total joint strength.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Rivet Material Properties
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Material</th>
                    <th className="text-left py-3 px-2 font-semibold">Shear Strength (MPa)</th>
                    <th className="text-left py-3 px-2 font-semibold">Tensile Strength (MPa)</th>
                    <th className="text-left py-3 px-2 font-semibold">Common Uses</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Aluminum (2117)</td>
                    <td className="py-3 px-2">200-250</td>
                    <td className="py-3 px-2">270</td>
                    <td className="py-3 px-2">Aircraft, light structures</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Steel (Mild)</td>
                    <td className="py-3 px-2">300-400</td>
                    <td className="py-3 px-2">400-500</td>
                    <td className="py-3 px-2">General construction</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Steel (High Strength)</td>
                    <td className="py-3 px-2">500-700</td>
                    <td className="py-3 px-2">700-900</td>
                    <td className="py-3 px-2">Bridges, heavy structures</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Stainless Steel</td>
                    <td className="py-3 px-2">400-600</td>
                    <td className="py-3 px-2">550-750</td>
                    <td className="py-3 px-2">Marine, food processing</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Monel</td>
                    <td className="py-3 px-2">350-450</td>
                    <td className="py-3 px-2">500-650</td>
                    <td className="py-3 px-2">Corrosive environments</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Rivet Strength
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Rivets transfer load through shear — the force trying to slide connected plates past each other. The rivet resists this by its cross-sectional area and material strength. Single shear means one shear plane; double shear (rivet through three plates) doubles capacity.
              </p>
              <p>
                The shear capacity formula is straightforward: Area x Shear Strength. Area equals π x (diameter/2)². A 10mm steel rivet with 400 MPa shear strength has a cross-section of 78.5 mm², giving about 31.4 kN single shear capacity.
              </p>
              <p>
                Bearing strength — the plate material crushing around the rivet — often governs before the rivet itself fails. Bearing capacity depends on plate thickness, material strength, and edge distance. As a rule of thumb, bearing strength is roughly 2x shear strength for steel.
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Design tip:</strong> Always apply a safety factor. For structural applications, use 2.0-3.0. For critical aerospace applications, factors of 1.5-2.0 are common with rigorous quality control.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Rivet Design Best Practices
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Edge Distance</h4>
                <p>
                  Keep rivets at least 2x diameter from plate edges. Closer edges risk tear-out failure. For highly loaded joints, use 2.5-3x diameter.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Pitch (Spacing)</h4>
                <p>
                  Space rivets 3-4x diameter apart along the load direction. Closer spacing weakens the plate; wider spacing allows plates to separate between rivets.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Row Spacing</h4>
                <p>
                  For multiple rows, space them 2.5-3x diameter apart. Staggered (zigzag) patterns distribute load better than straight rows.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Hole Tolerance</h4>
                <p>
                  Rivet holes should be 0.1-0.2mm larger than the rivet diameter for proper installation. Oversized holes reduce shear capacity and allow movement.
                </p>
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
                <h4 className="font-medium text-foreground mb-2">What&apos;s the difference between single and double shear?</h4>
                <p>
                  Single shear has one failure plane (two plates). Double shear has two failure planes (three plates), doubling capacity. A rivet through a lap joint is single shear; through a butt joint with cover plates is double shear.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I choose rivet diameter?</h4>
                <p>
                  Match diameter to plate thickness — typically 3x the thinner plate thickness. A 6mm plate needs roughly an 18mm rivet. Also consider available space and edge distance requirements.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Are bolts stronger than rivets?</h4>
                <p>
                  High-strength bolts generally have higher capacity than rivets of the same diameter. But rivets excel in fatigue resistance and don&apos;t loosen under vibration. Choice depends on application requirements.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What safety factor should I use?</h4>
                <p>
                  Structural steel: 2.0-2.5. Bridges: 2.5-3.0. Aircraft: 1.5-2.0 (with strict quality control). Pressure vessels: 3.0-4.0. Higher factors for dynamic loads, corrosion, or uncertain conditions.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I calculate rivet group capacity?</h4>
                <p>
                  For concentric loading, multiply single rivet capacity by the number of rivets. For eccentric loading, the outermost rivets carry more load — use vector analysis or finite element methods for accurate results.
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
                href="/calculators/bolt-shear-strength-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Bolt Shear Strength Calculator</span>
                <p className="text-muted-foreground">Calculate bolt capacity in shear and tension</p>
              </a>
              <a
                href="/calculators/weld-strength-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Weld Strength Calculator</span>
                <p className="text-muted-foreground">Determine weld capacity for various joint types</p>
              </a>
              <a
                href="/calculators/steel-weight-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Steel Weight Calculator</span>
                <p className="text-muted-foreground">Calculate weight of steel plates and sections</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
