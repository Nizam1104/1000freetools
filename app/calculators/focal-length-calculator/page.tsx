"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FocalLengthCalculator() {
  const [lensType, setLensType] = useState<"biconvex" | "biconcave" | "plano" | "meniscus">("biconvex");
  const [n, setN] = useState<string>("1.5");
  const [r1, setR1] = useState<string>("");
  const [r2, setR2] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const nVal = parseFloat(n);
    const R1 = parseFloat(r1);
    const R2 = parseFloat(r2);

    if (nVal > 0 && R1 > 0 && R2 > 0) {
      // Lensmaker's equation: 1/f = (n-1)(1/R1 - 1/R2)
      const f = 1 / ((nVal - 1) * (1/R1 - 1/R2));
      const power = 1 / f; // in diopters if f is in meters

      setResults({
        focalLength: f,
        power: power,
      });
    }
  };

  const reset = () => {
    setR1(""); setR2(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Lens Type</Label>
                <Select value={lensType} onValueChange={(v) => setLensType(v as typeof lensType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="biconvex">Biconvex (converging)</SelectItem>
                    <SelectItem value="biconcave">Biconcave (diverging)</SelectItem>
                    <SelectItem value="plano">Plano-convex/concave</SelectItem>
                    <SelectItem value="meniscus">Meniscus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Refractive Index (n)</Label>
                <Input value={n} onChange={e => setN(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Radius R₁ (m)</Label><Input value={r1} onChange={e => setR1(e.target.value)} /></div>
              <div><Label>Radius R₂ (m)</Label><Input value={r2} onChange={e => setR2(e.target.value)} /></div>
            </div>
            <p className="text-xs text-muted-foreground">Use positive for convex surface, negative for concave</p>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Focal Length</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Focal Length</p>
                    <p className="text-3xl font-bold">{Math.round(results.focalLength * 1000) / 1000} m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Optical Power</p>
                    <p className="text-3xl font-bold">{Math.round(results.power * 100) / 100} D</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Lens Focal Length</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Select Lens Type</h3>
              <p className="text-sm text-muted-foreground">Choose from biconvex, biconcave, plano-convex/concave, or meniscus lens configurations.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Lens Parameters</h3>
              <p className="text-sm text-muted-foreground">Input the refractive index and radii of curvature for both lens surfaces.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Focal Length Results</h3>
              <p className="text-sm text-muted-foreground">Receive the focal length in meters and optical power in diopters instantly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Key Features of This Lens Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Lensmaker&apos;s Equation</h3>
            <p className="text-sm text-muted-foreground">Uses the complete lensmaker&apos;s formula: 1/f = (n-1)(1/R₁ - 1/R₂) for accurate calculations.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Multiple Lens Types</h3>
            <p className="text-sm text-muted-foreground">Supports converging (biconvex) and diverging (biconcave) lenses with proper sign conventions.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Optical Power Calculation</h3>
            <p className="text-sm text-muted-foreground">Automatically converts focal length to diopters (D = 1/f) for optometry applications.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Sign Convention Guide</h3>
            <p className="text-sm text-muted-foreground">Clear instructions on positive/negative radius values for convex and concave surfaces.</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
          <h3 className="font-semibold mb-3">Common Lens Materials and Refractive Indices</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Material</th>
                <th className="text-left py-2">Refractive Index (n)</th>
                <th className="text-left py-2">Common Uses</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Crown Glass</td>
                <td className="py-2">1.52</td>
                <td className="py-2">Standard eyeglasses, camera lenses</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Flint Glass</td>
                <td className="py-2">1.62-1.75</td>
                <td className="py-2">High-index eyeglasses</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Polycarbonate</td>
                <td className="py-2">1.59</td>
                <td className="py-2">Safety glasses, sports eyewear</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">CR-39 Plastic</td>
                <td className="py-2">1.50</td>
                <td className="py-2">Standard plastic lenses</td>
              </tr>
              <tr>
                <td className="py-2">Sapphire</td>
                <td className="py-2">1.77</td>
                <td className="py-2">Specialty optics, watches</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">What is the lensmaker&apos;s equation?</h3>
            <p className="text-sm text-muted-foreground">The lensmaker&apos;s equation relates focal length to the lens material and shape: 1/f = (n-1)(1/R₁ - 1/R₂), where n is refractive index and R₁, R₂ are the radii of curvature of both surfaces.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What does a negative focal length mean?</h3>
            <p className="text-sm text-muted-foreground">A negative focal length indicates a diverging (concave) lens that spreads light rays apart. Positive focal length means a converging (convex) lens that focuses light to a point.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How do I know if R₁ and R₂ are positive or negative?</h3>
            <p className="text-sm text-muted-foreground">By convention: if the center of curvature is on the opposite side from incoming light, the radius is positive. For a biconvex lens, R₁ is positive and R₂ is negative.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What is optical power in diopters?</h3>
            <p className="text-sm text-muted-foreground">Optical power (P) in diopters equals 1/f where f is in meters. A 0.5m focal length lens has 2 diopters of power. Optometrists use diopters to prescribe corrective lenses.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can this calculator handle thick lenses?</h3>
            <p className="text-sm text-muted-foreground">This calculator uses the thin lens approximation, which is accurate when lens thickness is much smaller than the radii of curvature. For thick lenses, additional corrections are needed.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
    </div>
  );
}
