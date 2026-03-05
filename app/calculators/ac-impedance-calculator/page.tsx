"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AcImpedanceCalculator() {
  const [resistance, setResistance] = useState<string>("");
  const [inductance, setInductance] = useState<string>("");
  const [capacitance, setCapacitance] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const R = parseFloat(resistance);
    const L = parseFloat(inductance);
    const C = parseFloat(capacitance);
    const f = parseFloat(frequency);

    if (R >= 0 && f > 0) {
      const ω = 2 * Math.PI * f;
      const XL = L > 0 ? ω * L : 0;
      const XC = C > 0 ? 1 / (ω * C) : 0;
      
      // Z = √(R² + (XL - XC)²)
      const Z = Math.sqrt(R * R + Math.pow(XL - XC, 2));
      
      // Phase angle: φ = arctan((XL - XC) / R)
      const phase = R > 0 ? Math.atan2(XL - XC, R) * 180 / Math.PI : 90;

      setResults({
        XL: Math.round(XL * 100) / 100,
        XC: Math.round(XC * 100) / 100,
        Z: Math.round(Z * 100) / 100,
        phase: Math.round(phase * 100) / 100,
      });
    }
  };

  const reset = () => {
    setResistance(""); setInductance(""); setCapacitance(""); setFrequency(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>AC Impedance Calculator – Calculate Impedance in AC Circuits</CardTitle>
          <CardDescription>
            Calculate impedance, reactance, and phase angle for AC circuits with R, L, and C components.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Resistance R (Ω)</Label><Input value={resistance} onChange={e => setResistance(e.target.value)} /></div>
              <div><Label>Frequency f (Hz)</Label><Input value={frequency} onChange={e => setFrequency(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Inductance L (H)</Label><Input value={inductance} onChange={e => setInductance(e.target.value)} placeholder="0 if none" /></div>
              <div><Label>Capacitance C (F)</Label><Input value={capacitance} onChange={e => setCapacitance(e.target.value)} placeholder="0 if none" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Impedance</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Inductive Reactance</p>
                    <p className="text-2xl font-bold">{results.XL} Ω</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Capacitive Reactance</p>
                    <p className="text-2xl font-bold">{results.XC} Ω</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Impedance</p>
                    <p className="text-3xl font-bold">{results.Z} Ω</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phase Angle</p>
                    <p className="text-2xl font-bold">{results.phase > 0 ? "+" : ""}{results.phase}°</p>
                    <p className="text-xs text-muted-foreground">{results.phase > 0 ? "Inductive" : results.phase < 0 ? "Capacitive" : "Resistive"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Sections */}
      <div className="w-full max-w-4xl mx-auto mt-8 space-y-12">

        {/* How to Use Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This AC Impedance Calculator</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li className="leading-relaxed">
              <strong>Enter your circuit values:</strong> Input the resistance in ohms (Ω), inductance in henries (H), capacitance in farads (F), and the operating frequency in hertz (Hz). If your circuit doesn't have an inductor or capacitor, enter 0 for that value.
            </li>
            <li className="leading-relaxed">
              <strong>Click Calculate:</strong> The calculator computes the inductive reactance (XL), capacitive reactance (XC), total impedance (Z), and phase angle between voltage and current.
            </li>
            <li className="leading-relaxed">
              <strong>Read your results:</strong> You'll see the impedance magnitude in ohms and whether your circuit behaves more inductively (positive phase angle) or capacitively (negative phase angle) at the given frequency.
            </li>
          </ol>
        </section>

        {/* Understanding AC Impedance Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Understanding AC Impedance</h2>
          <div className="prose max-w-none space-y-4">
            <p className="leading-relaxed">
              Impedance is the total opposition a circuit presents to alternating current. Unlike simple resistance in DC circuits, impedance accounts for both the resistive losses and the energy storage effects of inductors and capacitors in AC systems.
            </p>
            <p className="leading-relaxed">
              <strong>Resistance vs. Impedance:</strong> Resistance is a real quantity that dissipates energy as heat. Impedance is a complex quantity with both a real part (resistance) and an imaginary part (reactance). Resistance stays constant regardless of frequency, while impedance changes with frequency due to the reactive components.
            </p>
            <p className="leading-relaxed">
              <strong>The Role of Frequency:</strong> Frequency is central to impedance calculations. Inductors oppose changes in current, so their reactance increases with frequency. Capacitors oppose changes in voltage, so their reactance decreases with frequency. This frequency dependence is why impedance matters in AC analysis but not in DC.
            </p>
            <p className="leading-relaxed">
              <strong>Real and Imaginary Components:</strong> Impedance is written as Z = R + jX, where R is the real (resistive) component and X is the imaginary (reactive) component. The j represents a 90-degree phase shift. The magnitude of impedance is |Z| = √(R² + X²), and the phase angle tells you how much the current leads or lags the voltage.
            </p>
          </div>
        </section>

        {/* Formula Reference Table */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Impedance Formula Reference Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left py-3 px-4">Component</th>
                  <th className="text-left py-3 px-4">Impedance Formula</th>
                  <th className="text-left py-3 px-4">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Resistor</td>
                  <td className="py-3 px-4 font-mono">Z = R</td>
                  <td className="py-3 px-4">Purely real, frequency independent</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Capacitor</td>
                  <td className="py-3 px-4 font-mono">Z = 1/(jωC) = -j/(2πfC)</td>
                  <td className="py-3 px-4">Purely imaginary, decreases with frequency</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Inductor</td>
                  <td className="py-3 px-4 font-mono">Z = jωL = j2πfL</td>
                  <td className="py-3 px-4">Purely imaginary, increases with frequency</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Series RLC</td>
                  <td className="py-3 px-4 font-mono">Z = √(R² + (ωL - 1/ωC)²)</td>
                  <td className="py-3 px-4">Magnitude of total impedance</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Where ω = 2πf (angular frequency), f = frequency in Hz, L = inductance in H, C = capacitance in F
          </p>
        </section>

        {/* Impedance vs Frequency Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Impedance vs Frequency</h2>
          <div className="prose max-w-none space-y-4">
            <p className="leading-relaxed">
              The relationship between impedance and frequency is fundamental to AC circuit behavior. Here's how each component responds:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li className="leading-relaxed">
                <strong>Capacitive Reactance (XC):</strong> Decreases as frequency increases. At low frequencies, a capacitor acts like an open circuit (high impedance). At high frequencies, it approaches a short circuit (low impedance). This is why capacitors block DC but pass AC.
              </li>
              <li className="leading-relaxed">
                <strong>Inductive Reactance (XL):</strong> Increases as frequency increases. At low frequencies, an inductor acts like a short circuit (low impedance). At high frequencies, it approaches an open circuit (high impedance). This is why inductors pass DC but block high-frequency AC.
              </li>
              <li className="leading-relaxed">
                <strong>Resonance:</strong> In a series RLC circuit, resonance occurs when XL = XC. At this resonant frequency, the reactive components cancel out and the impedance is purely resistive (minimum impedance). The resonant frequency is f₀ = 1/(2π√LC). This principle is used in radio tuners and filters.
              </li>
            </ul>
          </div>
        </section>

        {/* Common Impedance Values Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Common Impedance Values</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left py-3 px-4">Application</th>
                  <th className="text-left py-3 px-4">Typical Impedance Values</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Audio Speakers</td>
                  <td className="py-3 px-4">4Ω, 8Ω, 16Ω</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Professional Audio Equipment</td>
                  <td className="py-3 px-4">600Ω (line level)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">RF Systems (Radio Frequency)</td>
                  <td className="py-3 px-4">50Ω (most common), 75Ω (video/cable)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Coaxial Transmission Lines</td>
                  <td className="py-3 px-4">50Ω, 75Ω</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Twin-lead Transmission Lines</td>
                  <td className="py-3 px-4">300Ω (old TV antennas)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Headphones</td>
                  <td className="py-3 px-4">16Ω (portable) to 600Ω (studio)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Matching impedances between components minimizes signal reflection and maximizes power transfer.
          </p>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">What is the difference between resistance and impedance?</h3>
              <p className="leading-relaxed">
                Resistance is the opposition to current flow in DC circuits and dissipates energy as heat. Impedance extends this concept to AC circuits and includes both resistance (real part) and reactance (imaginary part). Resistance is constant regardless of frequency, while impedance varies with frequency due to inductive and capacitive effects.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Why does impedance matter in audio systems?</h3>
              <p className="leading-relaxed">
                Impedance matching in audio ensures proper power transfer and frequency response. Mismatched speaker and amplifier impedances can cause poor sound quality, reduced power output, or even damage to equipment. Headphone impedance affects how much power is needed and how the headphones interact with different sources.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">What happens if impedance doesn't match?</h3>
              <p className="leading-relaxed">
                Impedance mismatch causes signal reflection, where part of the signal bounces back toward the source instead of being absorbed by the load. In RF systems, this creates standing waves and power loss. In audio, it can cause frequency response issues and reduced efficiency. Maximum power transfer occurs when source and load impedances are matched.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">How does frequency affect impedance?</h3>
              <p className="leading-relaxed">
                Frequency directly affects the reactive portion of impedance. Inductive reactance increases linearly with frequency (XL = 2πfL), while capacitive reactance decreases inversely with frequency (XC = 1/(2πfC)). This is why filters work – they exploit the frequency-dependent nature of impedance to pass or block certain frequencies.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">What is complex impedance?</h3>
              <p className="leading-relaxed">
                Complex impedance is the mathematical representation of impedance using complex numbers: Z = R + jX. The real part (R) represents resistance, and the imaginary part (X) represents reactance. The j operator indicates a 90-degree phase shift. This representation allows engineers to use complex arithmetic to analyze AC circuits just like DC circuits.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <a
              href="/calculators/ohms-law-calculator"
              className="p-4 border rounded-lg hover:bg-muted transition-colors block"
            >
              <h3 className="font-semibold">Ohm's Law Calculator</h3>
              <p className="text-sm text-muted-foreground mt-1">Calculate voltage, current, resistance, and power</p>
            </a>
            <a
              href="/calculators/resistor-color-code-calculator"
              className="p-4 border rounded-lg hover:bg-muted transition-colors block"
            >
              <h3 className="font-semibold">Resistor Color Code Calculator</h3>
              <p className="text-sm text-muted-foreground mt-1">Decode resistor color bands to resistance values</p>
            </a>
            <a
              href="/calculators/frequency-calculator"
              className="p-4 border rounded-lg hover:bg-muted transition-colors block"
            >
              <h3 className="font-semibold">Frequency Calculator</h3>
              <p className="text-sm text-muted-foreground mt-1">Convert between frequency, period, and wavelength</p>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
