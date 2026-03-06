"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BrewsterAngleCalculator() {
  const [n1, setN1] = useState<string>("1.0003");
  const [n2, setN2] = useState<string>("1.52");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const n1Val = parseFloat(n1);
    const n2Val = parseFloat(n2);

    if (n1Val > 0 && n2Val > 0) {
      // Brewster's angle: tan(θB) = n2/n1
      const θB = Math.atan(n2Val / n1Val) * 180 / Math.PI;
      const θR = 90 - θB; // Reflected angle

      setResults({
        brewsterAngle: Math.round(θB * 100) / 100,
        reflectedAngle: Math.round(θR * 100) / 100,
        refractedAngle: Math.round((90 - θB) * 100) / 100,
      });
    }
  };

  const reset = () => {
    setN1("1.0003"); setN2("1.52"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Medium 1 (n₁)</Label>
                <Input value={n1} onChange={e => setN1(e.target.value)} />
              </div>
              <div>
                <Label>Medium 2 (n₂)</Label>
                <Input value={n2} onChange={e => setN2(e.target.value)} />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Brewster Angle</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Brewster Angle (θB)</p>
                  <p className="text-4xl font-bold">{results.brewsterAngle}°</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Reflected Angle</p>
                    <p className="text-2xl font-bold">{results.reflectedAngle}°</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Refracted Angle</p>
                    <p className="text-2xl font-bold">{results.refractedAngle}°</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  At Brewster's angle, reflected and refracted rays are perpendicular (90° apart)
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Brewster Angle Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the refractive indices</p>
                  <p>Input n1 (first medium, usually air = 1.0003) and n2 (second medium like glass = 1.52, water = 1.33). Use the values for your specific materials.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Calculate the polarization angle</p>
                  <p>Click Calculate to find Brewster's angle — the angle where reflected light becomes completely polarized with the electric field parallel to the surface.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Review the angle results</p>
                  <p>The calculator shows Brewster's angle plus the reflected and refracted angles. At this angle, the reflected and refracted rays are exactly 90 degrees apart.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Refractive Indices Reference Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Material</th>
                    <th className="text-left py-3 px-2 font-semibold">Refractive Index (n)</th>
                    <th className="text-left py-3 px-2 font-semibold">Brewster Angle (from air)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Air</td>
                    <td className="py-3 px-2">1.0003</td>
                    <td className="py-3 px-2">N/A</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Water</td>
                    <td className="py-3 px-2">1.33</td>
                    <td className="py-3 px-2">53.1 degrees</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Window Glass</td>
                    <td className="py-3 px-2">1.52</td>
                    <td className="py-3 px-2">56.7 degrees</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Crown Glass</td>
                    <td className="py-3 px-2">1.50-1.52</td>
                    <td className="py-3 px-2">56.3-56.7 degrees</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Flint Glass</td>
                    <td className="py-3 px-2">1.62-1.75</td>
                    <td className="py-3 px-2">58.3-60.3 degrees</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Diamond</td>
                    <td className="py-3 px-2">2.42</td>
                    <td className="py-3 px-2">67.6 degrees</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Silicon</td>
                    <td className="py-3 px-2">3.42</td>
                    <td className="py-3 px-2">73.7 degrees</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Brewster's angle increases with higher refractive index. Values shown are for light traveling from air into the material. Actual values vary slightly with wavelength.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Brewster's Angle
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is Brewster's Angle?</h4>
                <p>
                  Brewster's angle (also called the polarization angle) is the angle of incidence where light reflecting off a surface becomes completely polarized. At this specific angle, the reflected ray and refracted ray are perpendicular to each other. Sir David Brewster discovered this phenomenon in 1815.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">The Physics Behind Polarization</h4>
                <p>
                  Light is an electromagnetic wave with electric fields oscillating in all directions perpendicular to propagation. When light hits a surface at Brewster's angle, the reflected light contains only waves oscillating parallel to the surface — it becomes linearly polarized. The perpendicular component is entirely transmitted.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Brewster's Law Formula</h4>
                <p>
                  Brewster's law states: tan(theta_B) = n2/n1, where theta_B is Brewster's angle, n1 is the refractive index of the first medium, and n2 is the refractive index of the second medium. For air to glass (n = 1.52), this gives theta_B = arctan(1.52) = 56.7 degrees.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why the 90 Degree Relationship Matters</h4>
                <p>
                  At Brewster's angle, the reflected and refracted rays form exactly 90 degrees. This happens because the reflected ray contains only the component of light that cannot couple into the transmitted wave's oscillation direction. This geometric relationship is what makes the polarization complete.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Applications of Brewster's Angle
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Polarizing Filters and Sunglasses</p>
                  <p>Polarized sunglasses block horizontally polarized light — the kind reflected from roads and water at Brewster's angle. This eliminates glare while allowing other light through.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Laser Physics</p>
                  <p>Laser tubes often have windows tilted at Brewster's angle. This allows one polarization to pass with zero reflection loss while the other polarization experiences loss, producing polarized laser output.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Photography and Imaging</p>
                  <p>Photographers use polarizing filters oriented to block reflections at Brewster's angle. This removes unwanted glare from water, glass, and shiny surfaces while enhancing sky contrast.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Material Science</p>
                  <p>Measuring Brewster's angle provides a precise way to determine a material's refractive index. This is useful for characterizing thin films, coatings, and unknown transparent materials.</p>
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
                <h4 className="font-medium text-foreground mb-2">What happens if light travels from glass to air instead?</h4>
                <p>
                  The formula still applies but n1 and n2 swap. For glass (n = 1.52) to air (n = 1.0003), Brewster's angle is arctan(1.0003/1.52) = 33.3 degrees. This is the complement of the air-to-glass angle (90 - 56.7 = 33.3 degrees).
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Does Brewster's angle work for all wavelengths of light?</h4>
                <p>
                  The principle applies to all wavelengths, but the exact angle varies slightly because refractive index depends on wavelength (dispersion). Blue light has a slightly different Brewster angle than red light for the same material.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why is reflected light polarized at Brewster's angle?</h4>
                <p>
                  At Brewster's angle, the reflected ray direction aligns with where the electric field of one polarization component would need to oscillate to radiate in that direction. Since electromagnetic waves cannot oscillate along their propagation direction, that component cannot be reflected.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can Brewster's angle be greater than 45 degrees?</h4>
                <p>
                  Yes, whenever n2 is greater than n1. For most materials viewed from air, Brewster's angle ranges from about 53 degrees (water) to 74 degrees (silicon). It only drops below 45 degrees when light travels from a higher-index to lower-index medium.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is Brewster's angle the same as the critical angle?</h4>
                <p>
                  No. The critical angle is for total internal reflection when light travels from high to low index. Brewster's angle is for polarization and exists for light traveling in either direction. They are different phenomena with different formulas.
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
                href="/calculators/snells-law-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Snell's Law Calculator</span>
                <p className="text-muted-foreground">Calculate refraction angles when light passes between different media</p>
              </a>
              <a
                href="/calculators/critical-angle-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Critical Angle Calculator</span>
                <p className="text-muted-foreground">Find the angle for total internal reflection in optical fibers</p>
              </a>
              <a
                href="/calculators/refractive-index-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Refractive Index Calculator</span>
                <p className="text-muted-foreground">Determine refractive index from speed of light in a material</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
