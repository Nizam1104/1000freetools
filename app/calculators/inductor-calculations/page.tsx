"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function InductorCalculations() {
  // Tab 1: Inductance from physical params
  const [turns, setTurns] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [relPermeability, setRelPermeability] = useState<string>("1");

  // Tab 2: Inductive Reactance
  const [inductance, setInductance] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");

  // Tab 3: Impedance
  const [resistance, setResistance] = useState<string>("");
  const [inductance2, setInductance2] = useState<string>("");
  const [frequency2, setFrequency2] = useState<string>("");

  const [results, setResults] = useState<Record<string, any> | null>(null);

  const calculateInductance = () => {
    const N = parseFloat(turns);
    const A = parseFloat(area);
    const l = parseFloat(length);
    const μr = parseFloat(relPermeability);
    const μ0 = 4 * Math.PI * 1e-7;

    if (N > 0 && A > 0 && l > 0 && μr > 0) {
      const L = (μ0 * μr * N * N * A) / l;
      const unit = L >= 1 ? "H" : L >= 0.001 ? "mH" : L >= 1e-6 ? "µH" : "nH";
      const displayValue = L >= 1 ? L : L >= 0.001 ? L * 1000 : L >= 1e-6 ? L * 1e6 : L * 1e9;
      setResults({ tab: "inductance", value: Math.round(displayValue * 1000) / 1000, unit });
    }
  };

  const calculateReactance = () => {
    const L = parseFloat(inductance);
    const f = parseFloat(frequency);

    if (L > 0 && f > 0) {
      const XL = 2 * Math.PI * f * L;
      const unit = XL >= 1000000 ? "MΩ" : XL >= 1000 ? "kΩ" : "Ω";
      const displayValue = XL >= 1000000 ? XL / 1000000 : XL >= 1000 ? XL / 1000 : XL;
      setResults({ tab: "reactance", value: Math.round(displayValue * 1000) / 1000, unit });
    }
  };

  const calculateImpedance = () => {
    const R = parseFloat(resistance);
    const L = parseFloat(inductance2);
    const f = parseFloat(frequency2);

    if (R > 0 && L > 0 && f > 0) {
      const XL = 2 * Math.PI * f * L;
      const Z = Math.sqrt(R * R + XL * XL);
      const unit = Z >= 1000000 ? "MΩ" : Z >= 1000 ? "kΩ" : "Ω";
      const displayValue = Z >= 1000000 ? Z / 1000000 : Z >= 1000 ? Z / 1000 : Z;
      setResults({ tab: "impedance", value: Math.round(displayValue * 1000) / 1000, unit, XL: Math.round(XL * 1000) / 1000 });
    }
  };

  const reset = () => {
    setTurns("");
    setArea("");
    setLength("");
    setRelPermeability("1");
    setInductance("");
    setFrequency("");
    setResistance("");
    setInductance2("");
    setFrequency2("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <Tabs defaultValue="inductance">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="inductance">Inductance</TabsTrigger>
                <TabsTrigger value="reactance">Reactance</TabsTrigger>
                <TabsTrigger value="impedance">Impedance</TabsTrigger>
              </TabsList>

              <TabsContent value="inductance" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">L = (μ₀ × μᵣ × N² × A) / l</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Number of Turns (N)</Label>
                    <Input type="number" value={turns} onChange={(e) => setTurns(e.target.value)} />
                  </div>
                  <div>
                    <Label>Cross-sectional Area (m²)</Label>
                    <Input type="number" value={area} onChange={(e) => setArea(e.target.value)} />
                  </div>
                  <div>
                    <Label>Core Length (m)</Label>
                    <Input type="number" value={length} onChange={(e) => setLength(e.target.value)} />
                  </div>
                  <div>
                    <Label>Relative Permeability (μᵣ)</Label>
                    <Input type="number" value={relPermeability} onChange={(e) => setRelPermeability(e.target.value)} />
                  </div>
                </div>
                <Button onClick={calculateInductance}>Calculate Inductance</Button>
              </TabsContent>

              <TabsContent value="reactance" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">X_L = 2πfL</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Inductance (H)</Label>
                    <Input type="number" value={inductance} onChange={(e) => setInductance(e.target.value)} />
                  </div>
                  <div>
                    <Label>Frequency (Hz)</Label>
                    <Input type="number" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
                  </div>
                </div>
                <Button onClick={calculateReactance}>Calculate Reactance</Button>
              </TabsContent>

              <TabsContent value="impedance" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">Z = √(R² + X_L²)</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Resistance (Ω)</Label>
                    <Input type="number" value={resistance} onChange={(e) => setResistance(e.target.value)} />
                  </div>
                  <div>
                    <Label>Inductance (H)</Label>
                    <Input type="number" value={inductance2} onChange={(e) => setInductance2(e.target.value)} />
                  </div>
                  <div>
                    <Label>Frequency (Hz)</Label>
                    <Input type="number" value={frequency2} onChange={(e) => setFrequency2(e.target.value)} />
                  </div>
                </div>
                <Button onClick={calculateImpedance}>Calculate Impedance</Button>
              </TabsContent>
            </Tabs>

            <Button variant="outline" onClick={reset} className="w-full">Reset</Button>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">
                  {results.tab === "inductance" ? "Inductance" : results.tab === "reactance" ? "Inductive Reactance" : "Impedance"}
                </p>
                <p className="text-4xl font-bold">{results.value} {results.unit}</p>
                {results.XL && <p className="text-sm text-muted-foreground mt-2">X_L = {results.XL} Ω</p>}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Inductor Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Select your calculation type</p>
                  <p>Choose between inductance from physical parameters, inductive reactance, or total impedance.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the required values</p>
                  <p>Input the parameters for your selected calculation. For inductance, enter turns, area, length, and permeability.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">View your results</p>
                  <p>The calculator displays results with appropriate units (H, mH, µH, nH for inductance; Ω, kΩ, MΩ for reactance).</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Core Materials and Permeability
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Core Material</th>
                    <th className="text-left py-3 px-2 font-semibold">Relative Permeability (µr)</th>
                    <th className="text-left py-3 px-2 font-semibold">Typical Applications</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Air (vacuum)</td>
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2">RF circuits, high-frequency applications</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Ferrite (Mn-Zn)</td>
                    <td className="py-3 px-2">1,000 - 15,000</td>
                    <td className="py-3 px-2">Power supplies, EMI suppression</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Ferrite (Ni-Zn)</td>
                    <td className="py-3 px-2">100 - 1,000</td>
                    <td className="py-3 px-2">High-frequency transformers, RF</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Iron powder</td>
                    <td className="py-3 px-2">2 - 100</td>
                    <td className="py-3 px-2">RF inductors, tuned circuits</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Silicon steel</td>
                    <td className="py-3 px-2">4,000 - 9,000</td>
                    <td className="py-3 px-2">Power transformers, low-frequency</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Permalloy</td>
                    <td className="py-3 px-2">8,000 - 100,000</td>
                    <td className="py-3 px-2">Sensitive instruments, magnetic shields</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Amorphous metal</td>
                    <td className="py-3 px-2">10,000 - 50,000</td>
                    <td className="py-3 px-2">High-efficiency transformers</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Permeability values are approximate and vary by specific alloy composition and manufacturing process.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Inductor Calculations
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is Inductance?</h4>
                <p>
                  Inductance measures a coil's ability to store energy in a magnetic field. When current flows through a coil, it creates a magnetic field. Changing current induces a voltage that opposes the change. This property is measured in henries (H). Most inductors range from nanohenries to millihenries.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">The Inductance Formula</h4>
                <p>
                  L = (µ₀ × µᵣ × N² × A) / l. N is the number of turns — more turns mean more inductance. A is the core cross-sectional area. l is the magnetic path length. µ₀ is the permeability of free space (4π × 10⁻⁷ H/m). µᵣ is the relative permeability of the core material.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Inductive Reactance Explained</h4>
                <p>
                  Inductive reactance (X_L) is the opposition an inductor presents to AC current. X_L = 2πfL, where f is frequency and L is inductance. Unlike resistance, reactance changes with frequency. At DC (0 Hz), an ideal inductor has zero reactance. At high frequencies, reactance can be very large.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Impedance in RL Circuits</h4>
                <p>
                  Real inductors have both inductance and wire resistance. Total impedance Z = √(R² + X_L²). This combines resistance and reactance as a vector sum. Impedance determines how much current flows for a given AC voltage. Phase angle between voltage and current depends on the R/X_L ratio.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Inductor Design and Selection
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Choose core material for your frequency</p>
                  <p>Ferrite works well for high frequencies. Iron powder suits RF applications. Silicon steel is best for 50/60 Hz power applications.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Watch for core saturation</p>
                  <p>Every core has a maximum flux density. Exceeding it causes saturation, where inductance drops sharply. Check the core's Bsat rating and ensure your peak current stays within limits.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Consider wire gauge for current handling</p>
                  <p>Thicker wire handles more current with less resistance. Use a wire gauge chart to match your expected current. For high-frequency applications, consider Litz wire to reduce skin effect losses.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Account for parasitic effects</p>
                  <p>Real inductors have inter-winding capacitance and series resistance. At high frequencies, self-resonance can make an inductor behave like a capacitor. Check the self-resonant frequency in datasheets.</p>
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
                <h4 className="font-medium text-foreground mb-2">How do I increase inductance?</h4>
                <p>
                  Add more turns — inductance increases with the square of turns. Use a core with higher permeability. Increase the cross-sectional area of the core. Decrease the magnetic path length. Adding a ferromagnetic core can increase inductance by orders of magnitude compared to air.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the difference between inductance and reactance?</h4>
                <p>
                  Inductance (L) is a physical property of the coil, measured in henries. It does not change with frequency. Reactance (X_L) is the opposition to AC current, measured in ohms. Reactance depends on both inductance and frequency: X_L = 2πfL.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why does an inductor block high frequencies?</h4>
                <p>
                  Inductive reactance increases with frequency. At high frequencies, X_L becomes very large, limiting current flow. This makes inductors useful as low-pass filters — they pass DC and low frequencies while blocking high frequencies.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the Q factor of an inductor?</h4>
                <p>
                  Q factor (quality factor) is the ratio of reactance to resistance: Q = X_L / R. Higher Q means lower losses and better performance in tuned circuits. Air-core inductors typically have higher Q than ferrite-core inductors at RF frequencies.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I calculate inductance for a toroidal core?</h4>
                <p>
                  Use the same formula: L = (µ₀ × µᵣ × N² × A) / l. For a toroid, A is the cross-sectional area of the core ring. l is the mean magnetic path length (approximately π × mean diameter). Many toroid datasheets provide an AL value for easier calculation.
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
                href="/calculators/resistor-color-code-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Resistor Color Code Calculator</span>
                <p className="text-muted-foreground">Decode resistor values from color bands</p>
              </a>
              <a
                href="/calculators/capacitor-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Capacitor Calculator</span>
                <p className="text-muted-foreground">Calculate capacitance and reactance values</p>
              </a>
              <a
                href="/calculators/ohms-law-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Ohm's Law Calculator</span>
                <p className="text-muted-foreground">Calculate voltage, current, resistance, and power</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
