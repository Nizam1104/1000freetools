"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RcTimeConstantCalculator() {
  const [resistance, setResistance] = useState<string>("");
  const [capacitance, setCapacitance] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const R = parseFloat(resistance);
    const C = parseFloat(capacitance);

    if (R > 0 && C > 0) {
      const τ = R * C;
      const fullCharge = τ * 5; // 5τ for ~99% charge

      setResults({ tau: τ, fullCharge });
    }
  };

  const reset = () => {
    setResistance(""); setCapacitance(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>RC Time Constant Calculator – Calculate RC Circuit Time Constant</CardTitle>
          <CardDescription>
            Calculate the time constant for RC circuits. τ = R × C determines charging and discharging rates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Resistance (Ω)</Label><Input value={resistance} onChange={e => setResistance(e.target.value)} /></div>
              <div><Label>Capacitance (F)</Label><Input value={capacitance} onChange={e => setCapacitance(e.target.value)} placeholder="e.g., 0.000001" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate τ</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Time Constant (τ)</p>
                  <p className="text-4xl font-bold">{results.tau.toExponential(4)} s</p>
                  <p className="text-sm text-muted-foreground">= {results.tau * 1000 >= 1 ? Math.round(results.tau * 1000) + " ms" : (results.tau * 1e6).toFixed(2) + " µs"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Full Charge Time (5τ)</p>
                  <p className="text-2xl font-bold">{results.fullCharge.toExponential(4)} s</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>Charge at 1τ: 63.2% | 2τ: 86.5% | 3τ: 95.0% | 4τ: 98.2% | 5τ: 99.3%</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This RC Time Constant Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter resistance value</p>
                  <p>Input the resistance in ohms (Ω). This is the resistor in your RC circuit.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter capacitance value</p>
                  <p>Input the capacitance in farads (F). For typical circuits, this will be in µF or pF.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">View time constant results</p>
                  <p>The calculator shows τ (tau) and the full charge time (5τ) for your circuit.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding RC Time Constant
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                The RC time constant (τ, tau) determines how quickly a capacitor charges or discharges
                through a resistor. It is the product of resistance and capacitance.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-center">
                τ = R × C
              </div>
              <p>
                After one time constant, the capacitor reaches 63.2% of its final voltage. After 5τ,
                it is 99.3% charged — considered fully charged for most purposes.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Capacitor Charging Progress
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Time</th>
                    <th className="text-left py-3 px-2 font-semibold">Charge Level</th>
                    <th className="text-left py-3 px-2 font-semibold">Voltage (% of max)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">1τ</td>
                    <td className="py-3 px-2">63.2%</td>
                    <td className="py-3 px-2">0.632 × Vmax</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">2τ</td>
                    <td className="py-3 px-2">86.5%</td>
                    <td className="py-3 px-2">0.865 × Vmax</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">3τ</td>
                    <td className="py-3 px-2">95.0%</td>
                    <td className="py-3 px-2">0.950 × Vmax</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">4τ</td>
                    <td className="py-3 px-2">98.2%</td>
                    <td className="py-3 px-2">0.982 × Vmax</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">5τ</td>
                    <td className="py-3 px-2">99.3%</td>
                    <td className="py-3 px-2">~Fully charged</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              The same timing applies to discharging, but the percentages show remaining charge.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common RC Circuit Applications
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Timing Circuits</p>
                <p className="text-muted-foreground">Generate precise delays or time intervals in electronic circuits</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Filter Design</p>
                <p className="text-muted-foreground">Create low-pass or high-pass filters for audio and signal processing</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Debouncing</p>
                <p className="text-muted-foreground">Smooth out mechanical switch bounce in digital circuits</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Power Supply Smoothing</p>
                <p className="text-muted-foreground">Reduce ripple in rectified AC power supplies</p>
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
                <h4 className="font-medium text-foreground mb-2">What is the RC time constant?</h4>
                <p>
                  The RC time constant (τ) is the time it takes for a capacitor to charge to 63.2% of
                  its final voltage through a resistor. It equals R × C, measured in seconds.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why is 5τ considered full charge?</h4>
                <p>
                  At 5τ, the capacitor reaches 99.3% of full charge. The remaining 0.7% takes
                  disproportionately long to add. For practical purposes, 5τ is considered fully charged.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I convert µF to farads?</h4>
                <p>
                  1 µF (microfarad) = 0.000001 F = 1×10⁻⁶ F. For example, 100 µF = 0.0001 F.
                  Enter 0.0001 or 1e-4 in the calculator.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Does the time constant change with voltage?</h4>
                <p>
                  No. The time constant depends only on R and C values, not the applied voltage.
                  Higher voltage means higher final charge, but the timing stays the same.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What happens if I increase resistance?</h4>
                <p>
                  Higher resistance means slower charging. Doubling R doubles the time constant.
                  The capacitor takes twice as long to reach the same charge percentage.
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
                href="/calculators/capacitor-charge-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Capacitor Charge Calculator</span>
                <p className="text-muted-foreground">Calculate charge and energy stored in capacitors</p>
              </a>
              <a
                href="/calculators/low-pass-filter-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Low Pass Filter Calculator</span>
                <p className="text-muted-foreground">Design RC filters with specific cutoff frequencies</p>
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
