"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AcousticImpedanceCalculator() {
  const [density, setDensity] = useState<string>("");
  const [speed, setSpeed] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const ρ = parseFloat(density);
    const c = parseFloat(speed);

    if (ρ > 0 && c > 0) {
      const Z = ρ * c;
      setResults({ impedance: Z, formatted: Z.toExponential(4) });
    }
  };

  const reset = () => {
    setDensity(""); setSpeed(""); setResults(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Density ρ (kg/m³)</Label><Input value={density} onChange={e => setDensity(e.target.value)} /></div>
              <div><Label>Speed of Sound c (m/s)</Label><Input value={speed} onChange={e => setSpeed(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Acoustic Impedance (Z)</p>
                <p className="text-4xl font-bold">{results.formatted} Pa·s/m</p>
                <p className="text-sm text-muted-foreground mt-2">= {results.formatted} Rayl</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How to Use Section */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use This Acoustic Impedance Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <p className="font-semibold">Enter the density</p>
              <p className="text-muted-foreground">Input the density of the material in kilograms per cubic meter (kg/m³). For reference, water has a density of about 1000 kg/m³.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
            <div>
              <p className="font-semibold">Enter the speed of sound</p>
              <p className="text-muted-foreground">Input the speed at which sound travels through the material in meters per second (m/s). In water, sound travels at approximately 1480 m/s.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
            <div>
              <p className="font-semibold">Get your result</p>
              <p className="text-muted-foreground">Click Calculate to see the acoustic impedance in Rayl (Pa·s/m). The result appears in both standard and scientific notation.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Understanding Section */}
      <Card>
        <CardHeader>
          <CardTitle>Understanding Acoustic Impedance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Acoustic impedance is a measure of how much a material resists the propagation of sound waves through it. Think of it as the acoustic equivalent of electrical impedance – it tells you how hard it is for sound to move through a substance.</p>
          
          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold mb-2">The Formula</p>
            <p className="text-lg font-mono">Z = ρv</p>
            <p className="text-sm text-muted-foreground mt-2">Where Z is acoustic impedance, ρ (rho) is the density of the material, and v is the speed of sound in that material.</p>
          </div>

          <p>Why does this matter? In ultrasound imaging and acoustics, acoustic impedance determines how sound waves behave when they encounter boundaries between different materials. When sound hits an interface between two materials with different impedances, some of the energy reflects back while the rest continues through. The greater the impedance mismatch, the more sound gets reflected.</p>

          <p>There are two related concepts worth knowing. <strong>Specific acoustic impedance</strong> is what we calculate here – the product of density and sound speed for a particular material. <strong>Characteristic impedance</strong> refers to the intrinsic impedance of a medium, often used when discussing wave propagation in idealized conditions. For most practical purposes in ultrasound and non-destructive testing, you will work with specific acoustic impedance.</p>
        </CardContent>
      </Card>

      {/* Materials Table */}
      <Card>
        <CardHeader>
          <CardTitle>Acoustic Impedance of Common Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Material</th>
                  <th className="text-left p-3 font-semibold">Acoustic Impedance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">Air</td>
                  <td className="p-3">~415 Rayl (0.000415 MRayl)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Water</td>
                  <td className="p-3">~1.48 MRayl</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Human tissue (soft)</td>
                  <td className="p-3">~1.6 MRayl</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Bone</td>
                  <td className="p-3">~7.8 MRayl</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Aluminum</td>
                  <td className="p-3">~17 MRayl</td>
                </tr>
                <tr>
                  <td className="p-3">Steel</td>
                  <td className="p-3">~45 MRayl</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">Note: Values are approximate and can vary based on temperature, composition, and other factors. 1 MRayl = 1,000,000 Rayl.</p>
        </CardContent>
      </Card>

      {/* Impedance Matching Section */}
      <Card>
        <CardHeader>
          <CardTitle>Impedance Matching and Reflection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>When a sound wave traveling through one material encounters a boundary with another material, part of the wave reflects back and part transmits through. The amount of reflection depends on the difference in acoustic impedance between the two materials.</p>

          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold mb-2">Reflection Coefficient Formula</p>
            <p className="text-lg font-mono">R = (Z₂ - Z₁) / (Z₂ + Z₁)</p>
            <p className="text-sm text-muted-foreground mt-2">Where R is the reflection coefficient, Z₁ is the impedance of the first material, and Z₂ is the impedance of the second material. The result ranges from -1 to 1, with larger absolute values indicating more reflection.</p>
          </div>

          <p>Why does impedance matching matter? When there is a large impedance mismatch, most of the sound energy reflects at the boundary rather than passing through. This is a fundamental principle in ultrasound imaging. The transducer sends sound pulses into the body, and the reflections from tissue boundaries create the image.</p>

          <p>This is also why ultrasound gel is used during medical scans. Air has an extremely low acoustic impedance (~415 Rayl) compared to human tissue (~1.6 MRayl). Without gel, almost all the ultrasound energy would reflect off the skin surface due to the massive impedance mismatch between air and tissue. The gel has an impedance similar to tissue, allowing the sound waves to pass efficiently from the transducer into the body.</p>
        </CardContent>
      </Card>

      {/* Applications Section */}
      <Card>
        <CardHeader>
          <CardTitle>Applications of Acoustic Impedance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Medical Ultrasound Imaging</h3>
              <p className="text-muted-foreground">Ultrasound machines rely on differences in acoustic impedance between tissues to create images. Boundaries between organs, fluid collections, and abnormalities all reflect sound differently, allowing clinicians to visualize internal structures without invasive procedures.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Non-Destructive Testing</h3>
              <p className="text-muted-foreground">Engineers use ultrasonic testing to inspect materials for cracks, voids, and defects without damaging the part. Changes in impedance at flaw locations cause reflections that reveal internal problems in metals, composites, and welds.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Architectural Acoustics</h3>
              <p className="text-muted-foreground">Understanding how sound interacts with building materials helps designers control reverberation, reduce noise transmission, and create spaces with optimal acoustic properties for concerts, recordings, or speech.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Underwater Sonar</h3>
              <p className="text-muted-foreground">Sonar systems use acoustic impedance principles to detect objects underwater. The impedance difference between water and submerged objects (submarines, fish, the seafloor) creates reflections that reveal their location and characteristics.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">What is acoustic impedance?</h3>
            <p className="text-muted-foreground">Acoustic impedance is a property that describes how much a material resists the passage of sound waves. It is calculated as the product of the material density and the speed of sound in that material. The unit is the Rayl (Pa·s/m).</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Why is acoustic impedance important in ultrasound?</h3>
            <p className="text-muted-foreground">Ultrasound imaging depends on reflections at tissue boundaries. Different tissues have different acoustic impedances, so sound waves reflect at interfaces between them. These reflections are detected and converted into the images you see on an ultrasound monitor.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What happens when sound hits a boundary between materials?</h3>
            <p className="text-muted-foreground">Part of the sound energy reflects back toward the source, and part continues through the second material. The proportion that reflects depends on the impedance difference. Large differences cause strong reflections; similar impedances allow most sound to pass through.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What unit is used for acoustic impedance?</h3>
            <p className="text-muted-foreground">The SI unit is the Rayl, which equals one Pascal-second per meter (Pa·s/m). For biological tissues and many engineering materials, values are often expressed in mega-Rayls (MRayl), where 1 MRayl = 1,000,000 Rayl.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How does temperature affect acoustic impedance?</h3>
            <p className="text-muted-foreground">Temperature changes both density and sound speed in a material. In gases, increasing temperature typically decreases density but increases sound speed. In liquids and solids, the effects are smaller but still measurable. For precise work, impedance values should be corrected for the actual temperature.</p>
          </div>
        </CardContent>
      </Card>

      {/* Related Tools Section */}    </div>
  );
}
