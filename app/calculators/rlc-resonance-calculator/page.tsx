"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RlcResonanceCalculator() {
  const [inductance, setInductance] = useState<string>("");
  const [capacitance, setCapacitance] = useState<string>("");
  const [resistance, setResistance] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(inductance);
    const C = parseFloat(capacitance);
    const R = parseFloat(resistance);

    if (L > 0 && C > 0) {
      // Resonant frequency: f₀ = 1 / (2π√(LC))
      const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));
      const ω0 = 2 * Math.PI * f0;
      
      // Quality factor: Q = (1/R) × √(L/C) for series RLC
      const Q = R > 0 ? (1 / R) * Math.sqrt(L / C) : Infinity;
      
      // Bandwidth: BW = f₀ / Q
      const BW = Q > 0 && Q !== Infinity ? f0 / Q : 0;

      setResults({
        f0: Math.round(f0 * 100) / 100,
        omega0: Math.round(ω0 * 100) / 100,
        Q: Q === Infinity ? "∞" : Math.round(Q * 100) / 100,
        BW: Math.round(BW * 100) / 100,
      });
    }
  };

  const reset = () => {
    setInductance(""); setCapacitance(""); setResistance(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Inductance L (H)</Label><Input value={inductance} onChange={e => setInductance(e.target.value)} /></div>
              <div><Label>Capacitance C (F)</Label><Input value={capacitance} onChange={e => setCapacitance(e.target.value)} /></div>
              <div><Label>Resistance R (Ω)</Label><Input value={resistance} onChange={e => setResistance(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Resonance</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Resonant Frequency</p>
                    <p className="text-2xl font-bold">{results.f0 >= 1e6 ? (results.f0 / 1e6).toFixed(2) + " MHz" : results.f0 >= 1000 ? (results.f0 / 1000).toFixed(2) + " kHz" : results.f0.toFixed(2) + " Hz"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Angular Frequency</p>
                    <p className="text-xl font-bold">{results.omega0.toExponential(4)} rad/s</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quality Factor (Q)</p>
                    <p className="text-2xl font-bold">{results.Q}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bandwidth</p>
                    <p className="text-xl font-bold">{results.BW >= 1000 ? (results.BW / 1000).toFixed(2) + " kHz" : results.BW.toFixed(2) + " Hz"}</p>
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
              How to Use This RLC Resonance Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter inductance value</p>
                  <p>Input the inductance in henries (H). This is the L component in your RLC circuit.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter capacitance value</p>
                  <p>Input the capacitance in farads (F). Common values are in microfarads or picofarads.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter resistance and calculate</p>
                  <p>Input resistance in ohms for Q factor and bandwidth calculations. Click Calculate to see resonant frequency and circuit characteristics.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              RLC Circuit Formulas Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Parameter</th>
                    <th className="text-left py-3 px-2 font-semibold">Formula</th>
                    <th className="text-left py-3 px-2 font-semibold">Units</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Resonant Frequency</td>
                    <td className="py-3 px-2 font-mono text-xs">f₀ = 1/(2π√LC)</td>
                    <td className="py-3 px-2">Hz</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Angular Frequency</td>
                    <td className="py-3 px-2 font-mono text-xs">ω₀ = 2πf₀</td>
                    <td className="py-3 px-2">rad/s</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Quality Factor (Series)</td>
                    <td className="py-3 px-2 font-mono text-xs">Q = (1/R)√(L/C)</td>
                    <td className="py-3 px-2">Dimensionless</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Bandwidth</td>
                    <td className="py-3 px-2 font-mono text-xs">BW = f₀/Q</td>
                    <td className="py-3 px-2">Hz</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Characteristic Impedance</td>
                    <td className="py-3 px-2 font-mono text-xs">Z₀ = √(L/C)</td>
                    <td className="py-3 px-2">Ω</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding RLC Resonance
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                An RLC circuit contains resistance (R), inductance (L), and capacitance (C). At resonance, the inductive and capacitive reactances cancel each other out. The circuit behaves purely resistive, and current reaches its maximum value for a given voltage.
              </p>
              <p>
                The resonant frequency depends only on L and C — resistance doesn&apos;t affect where resonance occurs, only how sharp the resonance peak is. This is why radio tuners use variable capacitors: changing C shifts the resonant frequency to select different stations.
              </p>
              <p>
                Quality factor Q measures how &quot;selective&quot; the circuit is. High Q means a narrow bandwidth — the circuit responds strongly only near resonance. Low Q means broader response. Q is essentially the ratio of stored energy to energy lost per cycle.
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Key insight:</strong> At resonance, voltage across L or C can be Q times the source voltage. In a high-Q circuit (Q=100), a 1V input can produce 100V across the capacitor — useful for voltage multiplication but potentially destructive.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              RLC Circuit Applications
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Radio Tuners</h4>
                <p>
                  AM/FM radios use RLC circuits to select specific frequencies from the antenna signal. Variable capacitors or inductors tune the resonant frequency to match the desired station.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Bandpass Filters</h4>
                <p>
                  RLC circuits pass frequencies near resonance while attenuating others. Used in audio crossovers, communication systems, and signal processing to isolate specific frequency bands.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Impedance Matching</h4>
                <p>
                  At resonance, the circuit presents purely resistive impedance. This property matches antennas to transmitters, speakers to amplifiers, and maximizes power transfer.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Oscillators</h4>
                <p>
                  RLC tanks form the frequency-determining element in many oscillator circuits. The natural resonant frequency sets the oscillation frequency for RF generators and clock circuits.
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
                <h4 className="font-medium text-foreground mb-2">What&apos;s the difference between series and parallel resonance?</h4>
                <p>
                  Series RLC has minimum impedance at resonance (current maximum). Parallel RLC has maximum impedance at resonance (current minimum). Series is used for signal selection; parallel for tank circuits and oscillators.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How does resistance affect resonance?</h4>
                <p>
                  Resistance doesn&apos;t change the resonant frequency but affects Q factor and bandwidth. Higher R in series RLC means lower Q (broader response). Higher R in parallel RLC means higher Q (sharper response).
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is bandwidth in an RLC circuit?</h4>
                <p>
                  Bandwidth is the frequency range where response is within 3dB (70.7%) of maximum. BW = f₀/Q. A 1 MHz circuit with Q=50 has 20 kHz bandwidth — it responds to frequencies from 990 kHz to 1010 kHz.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can Q be less than 1?</h4>
                <p>
                  Yes, but it indicates heavy damping. Q &lt; 0.5 means the circuit is overdamped — no oscillation occurs. The response is sluggish with no resonance peak. Most practical resonant circuits have Q &gt; 5.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What happens if I use real components?</h4>
                <p>
                  Real inductors have series resistance; capacitors have equivalent series resistance (ESR). These reduce Q from ideal calculations. At high frequencies, parasitic capacitance and inductance also affect behavior.
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
                href="/calculators/rc-time-constant-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">RC Time Constant Calculator</span>
                <p className="text-muted-foreground">Calculate time constant for RC circuits</p>
              </a>
              <a
                href="/calculators/inductive-reactance-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Inductive Reactance Calculator</span>
                <p className="text-muted-foreground">Calculate inductor impedance at frequency</p>
              </a>
              <a
                href="/calculators/capacitive-reactance-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Capacitive Reactance Calculator</span>
                <p className="text-muted-foreground">Calculate capacitor impedance at frequency</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
