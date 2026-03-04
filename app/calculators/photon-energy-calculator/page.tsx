"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PhotonEnergyCalculator() {
  const [mode, setMode] = useState<"wavelength" | "frequency">("wavelength");
  const [wavelength, setWavelength] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const h = 6.62607015e-34;
    const c = 299792458;

    if (mode === "wavelength") {
      const λ = parseFloat(wavelength);
      if (λ > 0) {
        const E = (h * c) / λ;
        const eV = E / 1.602176634e-19;
        setResults({ energy: E, ev: eV });
      }
    } else {
      const f = parseFloat(frequency);
      if (f > 0) {
        const E = h * f;
        const eV = E / 1.602176634e-19;
        setResults({ energy: E, ev: eV });
      }
    }
  };

  const reset = () => {
    setWavelength(""); setFrequency(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Photon Energy Calculator – Calculate Energy of a Photon</CardTitle>
          <CardDescription>
            Calculate the energy of a photon from its wavelength or frequency. Our calculator provides results in Joules and electron-volts (eV).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Input Mode</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="wavelength">Wavelength (λ)</SelectItem>
                  <SelectItem value="frequency">Frequency (f)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "wavelength" ? (
              <div>
                <Label>Wavelength (m)</Label>
                <Input value={wavelength} onChange={e => setWavelength(e.target.value)} placeholder="e.g., 500e-9 for 500nm" />
              </div>
            ) : (
              <div>
                <Label>Frequency (Hz)</Label>
                <Input value={frequency} onChange={e => setFrequency(e.target.value)} />
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Energy</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Energy</p>
                    <p className="text-xl font-bold">{results.energy.toExponential(4)} J</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In eV</p>
                    <p className="text-2xl font-bold">{Math.round(results.ev * 1000) / 1000} eV</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>How to Use This Photon Energy Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
              <div>
                <p className="font-medium text-foreground">Choose input mode</p>
                <p>Select whether you want to calculate from wavelength or frequency.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
              <div>
                <p className="font-medium text-foreground">Enter your value</p>
                <p>For wavelength, enter in meters (use scientific notation like 500e-9 for 500nm). For frequency, enter in Hz.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
              <div>
                <p className="font-medium text-foreground">Click Calculate Energy</p>
                <p>The calculator uses Planck's equation to compute photon energy in Joules and electron-volts.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Electromagnetic Spectrum Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Type</th>
                    <th className="text-left py-3 px-2 font-semibold">Wavelength Range</th>
                    <th className="text-left py-3 px-2 font-semibold">Frequency Range</th>
                    <th className="text-left py-3 px-2 font-semibold">Energy Range (eV)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Radio waves</td>
                    <td className="py-3 px-2">&gt; 1 mm</td>
                    <td className="py-3 px-2">&lt; 300 GHz</td>
                    <td className="py-3 px-2">&lt; 0.0012</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Microwaves</td>
                    <td className="py-3 px-2">1 mm - 25 μm</td>
                    <td className="py-3 px-2">300 GHz - 12 THz</td>
                    <td className="py-3 px-2">0.0012 - 0.05</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Infrared</td>
                    <td className="py-3 px-2">25 μm - 740 nm</td>
                    <td className="py-3 px-2">12 THz - 405 THz</td>
                    <td className="py-3 px-2">0.05 - 1.7</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Visible light</td>
                    <td className="py-3 px-2">740 - 380 nm</td>
                    <td className="py-3 px-2">405 - 790 THz</td>
                    <td className="py-3 px-2">1.7 - 3.3</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Ultraviolet</td>
                    <td className="py-3 px-2">380 - 10 nm</td>
                    <td className="py-3 px-2">790 THz - 30 PHz</td>
                    <td className="py-3 px-2">3.3 - 124</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">X-rays</td>
                    <td className="py-3 px-2">10 nm - 0.01 nm</td>
                    <td className="py-3 px-2">30 PHz - 30 EHz</td>
                    <td className="py-3 px-2">124 - 124,000</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Gamma rays</td>
                    <td className="py-3 px-2">&lt; 0.01 nm</td>
                    <td className="py-3 px-2">&gt; 30 EHz</td>
                    <td className="py-3 px-2">&gt; 124,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Photon Energy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">What Is a Photon?</h4>
              <p>A photon is a particle of light — the smallest possible packet of electromagnetic energy. Photons have no mass but carry energy proportional to their frequency. Higher frequency means higher energy. This is why ultraviolet light can damage skin while radio waves pass through harmlessly.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Planck's Equation</h4>
              <p>Photon energy is calculated using E = hf, where h is Planck's constant (6.626 × 10⁻³⁴ J·s) and f is frequency. When using wavelength instead: E = hc/λ, where c is the speed of light (3 × 10⁸ m/s). These equations link the wave and particle nature of light.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Why Use Electron-Volts?</h4>
              <p>Photon energies are tiny in Joules — typically 10⁻¹⁹ or smaller. Electron-volts (eV) give more manageable numbers. One eV equals 1.602 × 10⁻¹⁹ Joules. Visible light photons have energies of 1.7 to 3.3 eV, much easier to work with than 10⁻¹⁹ J.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applications of Photon Energy Calculations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Photoelectric Effect</p>
                <p>Calculate whether photons have enough energy to eject electrons from a material. This principle powers solar cells and photodetectors.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Spectroscopy</p>
                <p>Identify elements by the photon energies they emit or absorb. Each element has a unique spectral fingerprint.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">LED Design</p>
                <p>The bandgap energy of semiconductor materials determines the photon energy and thus the color of emitted light.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Medical Imaging</p>
                <p>X-ray and gamma ray photon energies determine tissue penetration and image quality in medical diagnostics.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">What is the energy of a visible light photon?</h4>
              <p>Visible light photons range from about 1.7 eV (red, 740nm) to 3.3 eV (violet, 380nm). Green light at 550nm has approximately 2.25 eV of energy.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">How do I convert wavelength to frequency?</h4>
              <p>Use f = c/λ, where c is the speed of light (3 × 10⁸ m/s) and λ is wavelength in meters. A 500nm photon has frequency f = (3 × 10⁸) / (500 × 10⁻⁹) = 6 × 10¹⁴ Hz.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Why does blue light have more energy than red light?</h4>
              <p>Blue light has shorter wavelength and higher frequency than red light. Since energy is proportional to frequency (E = hf), higher frequency means higher energy per photon.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">What is Planck's constant?</h4>
              <p>Planck's constant (h) is a fundamental physical constant: 6.62607015 × 10⁻³⁴ J·s. It relates photon energy to frequency and appears throughout quantum mechanics.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">How many Joules is 1 eV?</h4>
              <p>One electron-volt equals 1.602176634 × 10⁻¹⁹ Joules. This is the energy gained by an electron accelerated through a potential difference of 1 volt.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <a href="/calculators/wavelength-frequency-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Wavelength Frequency Calculator</span>
                <p className="text-muted-foreground">Convert between wavelength and frequency</p>
              </a>
              <a href="/calculators/ph-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">pH Calculator</span>
                <p className="text-muted-foreground">Calculate pH from hydrogen ion concentration</p>
              </a>
              <a href="/calculators/energy-converter" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Energy Converter</span>
                <p className="text-muted-foreground">Convert between different energy units</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
