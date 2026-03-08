"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RlTimeConstantCalculator() {
  const [resistance, setResistance] = useState<string>("");
  const [inductance, setInductance] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const R = parseFloat(resistance);
    const L = parseFloat(inductance);

    if (R > 0 && L > 0) {
      const τ = L / R;
      const fullDecay = τ * 5;

      setResults({ tau: τ, fullDecay });
    }
  };

  const reset = () => {
    setResistance(""); setInductance(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Resistance (Ω)</Label><Input value={resistance} onChange={e => setResistance(e.target.value)} /></div>
              <div><Label>Inductance (H)</Label><Input value={inductance} onChange={e => setInductance(e.target.value)} /></div>
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
                  <p className="text-sm text-muted-foreground">Full Decay Time (5τ)</p>
                  <p className="text-2xl font-bold">{results.fullDecay.toExponential(4)} s</p>
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
              How to Use This RL Time Constant Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter resistance value</p>
                  <p>Input the circuit resistance in ohms (Ω). This is the total resistance in series with the inductor.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter inductance value</p>
                  <p>Input the inductance in henries (H). Common values range from microhenries to several henries.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Calculate time constant</p>
                  <p>The calculator computes τ = L/R and shows the full decay time (5τ) when current reaches steady state.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              RL Circuit Time Constant Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Time (multiples of τ)</th>
                    <th className="text-left py-3 px-2 font-semibold">Current Rise (%)</th>
                    <th className="text-left py-3 px-2 font-semibold">Current Decay (%)</th>
                    <th className="text-left py-3 px-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">1τ</td>
                    <td className="py-3 px-2">63.2%</td>
                    <td className="py-3 px-2">36.8%</td>
                    <td className="py-3 px-2">Initial response</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">2τ</td>
                    <td className="py-3 px-2">86.5%</td>
                    <td className="py-3 px-2">13.5%</td>
                    <td className="py-3 px-2">Approaching steady</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">3τ</td>
                    <td className="py-3 px-2">95.0%</td>
                    <td className="py-3 px-2">5.0%</td>
                    <td className="py-3 px-2">Nearly steady</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">4τ</td>
                    <td className="py-3 px-2">98.2%</td>
                    <td className="py-3 px-2">1.8%</td>
                    <td className="py-3 px-2">Effectively steady</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">5τ</td>
                    <td className="py-3 px-2">99.3%</td>
                    <td className="py-3 px-2">0.7%</td>
                    <td className="py-3 px-2">Full steady state</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: After 5 time constants, the circuit is considered to have reached steady state (99.3% of final value).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding RL Time Constants
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                The time constant τ (tau) determines how quickly current builds up or decays in an RL circuit. When you apply voltage to an inductor, current doesn&apos;t jump instantly — it ramps up exponentially. The inductor resists changes in current by generating a back-EMF.
              </p>
              <p>
                The formula τ = L/R shows the relationship clearly. Larger inductance means more &quot;inertia&quot; against current change — slower response. Larger resistance means faster decay because energy dissipates quicker as heat.
              </p>
              <p>
                After one time constant, current reaches 63.2% of its final value during rise, or falls to 36.8% during decay. After five time constants, the circuit is effectively at steady state — 99.3% of final value. This 5τ rule is standard for determining settling time.
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Practical insight:</strong> In switching power supplies, RL time constants affect how quickly the circuit responds to load changes. Too slow and output sags; too fast and you risk overshoot and ringing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              RL Circuit Applications
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Filters</h4>
                <p>
                  RL circuits form low-pass or high-pass filters depending on configuration. A series RL with output across the resistor is a low-pass filter — it passes DC and low frequencies while attenuating high frequencies.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Relay Coils</h4>
                <p>
                  Relay coils are inductors. When de-energized, the collapsing magnetic field generates a high voltage spike (V = L di/dt). Flyback diodes protect switching transistors from this inductive kickback.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Motor Control</h4>
                <p>
                  Motor windings have inductance. PWM motor drivers must account for RL time constants to ensure current reaches the desired level during each PWM cycle. Too high a frequency and current never builds; too low and it becomes choppy.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Snubber Circuits</h4>
                <p>
                  RL snubbers protect switches from voltage spikes when interrupting inductive loads. The resistor dissipates stored energy while the inductor limits di/dt, reducing EMI and switch stress.
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
                <h4 className="font-medium text-foreground mb-2">Why does current rise exponentially in an RL circuit?</h4>
                <p>
                  The inductor generates a back-EMF proportional to the rate of current change (V = L di/dt). Initially, all voltage appears across the inductor. As current builds, voltage drops across the resistor, leaving less across the inductor — slowing the rate of change. This feedback creates exponential behavior.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What happens if R is very small?</h4>
                <p>
                  Small R means large τ — slow response. In the extreme case of a superconducting loop (R = 0), current would persist indefinitely with no decay. Real inductors always have some resistance, even if just the wire&apos;s DC resistance.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How does frequency affect an RL circuit?</h4>
                <p>
                  Inductive reactance XL = 2πfL increases with frequency. At high frequencies, the inductor acts like an open circuit. At DC (f = 0), it&apos;s just a wire (ignoring resistance). This frequency dependence makes RL circuits useful as filters.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can the time constant be negative?</h4>
                <p>
                  No. Both L and R are positive quantities in passive circuits. Negative time constants would imply growing oscillations — possible only with active components providing energy (like in oscillators), not in simple RL circuits.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What units should I use?</h4>
                <p>
                  Use henries (H) for inductance and ohms (Ω) for resistance. The time constant τ will be in seconds. For small values: 1 mH / 1 kΩ = 1 μs. For large values: 1 H / 1 Ω = 1 second.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
