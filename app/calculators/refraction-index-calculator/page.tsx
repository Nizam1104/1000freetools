"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RefractionIndexCalculator() {
  const [speed, setSpeed] = useState<string>("");
  const [wavelength1, setWavelength1] = useState<string>("");
  const [wavelength2, setWavelength2] = useState<string>("");
  const [mode, setMode] = useState<"speed" | "wavelength">("speed");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const c = 299792458;
    
    if (mode === "speed") {
      const v = parseFloat(speed);
      if (v > 0 && v <= c) {
        const n = c / v;
        setResults({ index: Math.round(n * 1000) / 1000 });
      }
    } else {
      const λ1 = parseFloat(wavelength1);
      const λ2 = parseFloat(wavelength2);
      if (λ1 > 0 && λ2 > 0) {
        const n = λ1 / λ2;
        setResults({ index: Math.round(n * 1000) / 1000 });
      }
    }
  };

  const reset = () => {
    setSpeed(""); setWavelength1(""); setWavelength2(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant={mode === "speed" ? "default" : "outline"} size="sm" onClick={() => setMode("speed")}>From Speed</Button>
              <Button variant={mode === "wavelength" ? "default" : "outline"} size="sm" onClick={() => setMode("wavelength")}>From Wavelength</Button>
            </div>

            {mode === "speed" ? (
              <div>
                <Label>Speed of Light in Material (m/s)</Label>
                <Input value={speed} onChange={e => setSpeed(e.target.value)} placeholder="e.g., 2e8" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Wavelength in Vacuum</Label><Input value={wavelength1} onChange={e => setWavelength1(e.target.value)} /></div>
                <div><Label>Wavelength in Material</Label><Input value={wavelength2} onChange={e => setWavelength2(e.target.value)} /></div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Refractive Index (n)</p>
                <p className="text-4xl font-bold">{results.index}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Refraction Index Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Choose calculation method</p>
                  <p>Select whether to calculate from speed of light or wavelength ratio.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your values</p>
                  <p>Input the speed of light in the material or the wavelengths in vacuum and material.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Get the refractive index</p>
                  <p>The calculator computes the refractive index (n) instantly.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Refractive Index
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                The refractive index (n) measures how much light slows down when passing through
                a material. It is the ratio of the speed of light in vacuum to the speed in the material.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-center space-y-2">
                <div>n = c / v</div>
                <div>n = λ₁ / λ₂</div>
              </div>
              <p>
                Higher refractive index means light travels slower and bends more. Vacuum has n = 1.
                All other materials have n &gt; 1.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Refractive Index of Common Materials
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Material</th>
                    <th className="text-left py-3 px-2 font-semibold">Refractive Index (n)</th>
                    <th className="text-left py-3 px-2 font-semibold">Light Speed</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Vacuum</td>
                    <td className="py-3 px-2">1.000</td>
                    <td className="py-3 px-2">299,792 km/s</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Air (STP)</td>
                    <td className="py-3 px-2">1.0003</td>
                    <td className="py-3 px-2">299,702 km/s</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Water (20°C)</td>
                    <td className="py-3 px-2">1.333</td>
                    <td className="py-3 px-2">225,000 km/s</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Crown Glass</td>
                    <td className="py-3 px-2">1.52</td>
                    <td className="py-3 px-2">197,000 km/s</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Diamond</td>
                    <td className="py-3 px-2">2.42</td>
                    <td className="py-3 px-2">124,000 km/s</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Silicon</td>
                    <td className="py-3 px-2">3.96</td>
                    <td className="py-3 px-2">75,700 km/s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Snell's Law and Refraction
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                When light passes from one material to another, it bends. Snell's Law describes
                this bending:
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-center">
                n₁ × sin(θ₁) = n₂ × sin(θ₂)
              </div>
              <p>
                Where θ₁ is the incident angle and θ₂ is the refracted angle. Light bends toward
                the normal when entering a denser material (higher n).
              </p>
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
                <h4 className="font-medium text-foreground mb-2">What does refractive index tell us?</h4>
                <p>
                  Refractive index shows how much light slows down in a material. It also determines
                  how much light bends at the interface. Higher n means slower speed and more bending.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can refractive index be less than 1?</h4>
                <p>
                  Not for normal materials. Vacuum has n = 1, and all materials have n &gt; 1.
                  Metamaterials can have negative refractive index, but this is a special case.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why does diamond sparkle?</h4>
                <p>
                  Diamond has a high refractive index (2.42), causing significant light bending.
                  Combined with its dispersion (splitting white light into colors), this creates
                  the characteristic sparkle and fire.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Does refractive index change with color?</h4>
                <p>
                  Yes. This is called dispersion. Blue light typically has a slightly higher
                  refractive index than red light, which is why prisms split white light into
                  a rainbow.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is critical angle?</h4>
                <p>
                  When light goes from high-n to low-n material, there is an angle where all light
                  reflects back. This is total internal reflection, used in fiber optics.
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
                href="/calculators/snell-law-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Snell's Law Calculator</span>
                <p className="text-muted-foreground">Calculate refraction angles at material interfaces</p>
              </a>
              <a
                href="/calculators/critical-angle-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Critical Angle Calculator</span>
                <p className="text-muted-foreground">Find the angle for total internal reflection</p>
              </a>
              <a
                href="/calculators/lens-maker-equation-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Lens Maker Equation Calculator</span>
                <p className="text-muted-foreground">Design lenses with specific focal lengths</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
