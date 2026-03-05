"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RmsValueCalculator() {
  const [waveform, setWaveform] = useState<"sine" | "square" | "triangle" | "sawtooth">("sine");
  const [peakValue, setPeakValue] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const Vp = parseFloat(peakValue);
    if (Vp <= 0) return;

    let rms = 0;
    switch (waveform) {
      case "sine":
        rms = Vp / Math.sqrt(2);
        break;
      case "square":
        rms = Vp;
        break;
      case "triangle":
      case "sawtooth":
        rms = Vp / Math.sqrt(3);
        break;
    }

    setResults({ rms: Math.round(rms * 100) / 100, peak: Vp, peakToPeak: 2 * Vp });
  };

  const reset = () => {
    setPeakValue(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>RMS Value Calculator – Calculate Root Mean Square Voltage</CardTitle>
          <CardDescription>
            Calculate RMS voltage for different waveforms. RMS is the effective DC-equivalent voltage for AC signals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Waveform Type</Label>
              <Select value={waveform} onValueChange={(v) => setWaveform(v as typeof waveform)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sine">Sine Wave</SelectItem>
                  <SelectItem value="square">Square Wave</SelectItem>
                  <SelectItem value="triangle">Triangle Wave</SelectItem>
                  <SelectItem value="sawtooth">Sawtooth Wave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Peak Voltage (V)</Label>
              <Input value={peakValue} onChange={e => setPeakValue(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate RMS</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">RMS Voltage</p>
                    <p className="text-2xl font-bold">{results.rms} V</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Peak Voltage</p>
                    <p className="text-2xl font-bold">{results.peak} V</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Peak-to-Peak</p>
                    <p className="text-2xl font-bold">{results.peakToPeak} V</p>
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
              How to Use This RMS Value Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Select waveform type</p>
                  <p>Choose the waveform shape: sine, square, triangle, or sawtooth. Each has a different RMS relationship to peak voltage.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter peak voltage</p>
                  <p>Input the peak (maximum) voltage value. This is the amplitude from zero to the waveform&apos;s highest point.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Calculate RMS</p>
                  <p>Click Calculate to see the RMS voltage, peak voltage, and peak-to-peak voltage for your waveform.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              RMS Conversion Factors by Waveform
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Waveform</th>
                    <th className="text-left py-3 px-2 font-semibold">RMS Formula</th>
                    <th className="text-left py-3 px-2 font-semibold">RMS Factor</th>
                    <th className="text-left py-3 px-2 font-semibold">Example (Vp=10V)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Sine Wave</td>
                    <td className="py-3 px-2 font-mono text-xs">Vp/√2</td>
                    <td className="py-3 px-2">0.707</td>
                    <td className="py-3 px-2">7.07V</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Square Wave</td>
                    <td className="py-3 px-2 font-mono text-xs">Vp</td>
                    <td className="py-3 px-2">1.000</td>
                    <td className="py-3 px-2">10.00V</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Triangle Wave</td>
                    <td className="py-3 px-2 font-mono text-xs">Vp/√3</td>
                    <td className="py-3 px-2">0.577</td>
                    <td className="py-3 px-2">5.77V</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Sawtooth Wave</td>
                    <td className="py-3 px-2 font-mono text-xs">Vp/√3</td>
                    <td className="py-3 px-2">0.577</td>
                    <td className="py-3 px-2">5.77V</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Pulse (50% duty)</td>
                    <td className="py-3 px-2 font-mono text-xs">Vp/√2</td>
                    <td className="py-3 px-2">0.707</td>
                    <td className="py-3 px-2">7.07V</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: RMS factors assume symmetrical waveforms centered around zero. DC offset changes the calculation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding RMS Voltage
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                RMS (Root Mean Square) voltage is the DC-equivalent voltage that delivers the same power to a resistive load. If 10V RMS heats a resistor the same as 10V DC, that&apos;s the definition — equal heating effect.
              </p>
              <p>
                For sine waves, RMS equals peak divided by √2 (about 0.707). This is why US household &quot;120V AC&quot; actually peaks at 170V — the RMS value is what matters for power calculations. European 230V RMS peaks at about 325V.
              </p>
              <p>
                Different waveforms have different RMS relationships because power depends on voltage squared. A square wave spends all its time at peak voltage, so RMS equals peak. A triangle wave spends most time at lower voltages, so RMS is only 57.7% of peak.
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Practical note:</strong> Most multimeters measure RMS assuming a sine wave. For non-sinusoidal waveforms (PWM, switching supplies), you need a &quot;true RMS&quot; meter or calculate it from the waveform shape.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Peak vs RMS vs Peak-to-Peak
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Peak Voltage (Vp)</h4>
                <p>
                  The maximum voltage from zero to the waveform&apos;s highest point. For a sine wave centered at zero, this is the amplitude. Peak voltage determines insulation requirements — components must withstand the peak, not just RMS.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Peak-to-Peak Voltage (Vpp)</h4>
                <p>
                  The total voltage swing from most negative to most positive. For symmetrical waveforms, Vpp = 2 × Vp. Oscilloscopes typically display peak-to-peak values since they show the complete waveform.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">RMS Voltage (Vrms)</h4>
                <p>
                  The effective voltage for power calculations. Power = Vrms² / R. AC voltage ratings (wall outlets, transformers, motors) are almost always RMS values unless specified otherwise.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Average Voltage</h4>
                <p>
                  For symmetrical AC waveforms, the average over a complete cycle is zero. Rectified average (absolute value) is different from RMS. For sine waves, average rectified = 0.637 × Vp, while RMS = 0.707 × Vp.
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
                <h4 className="font-medium text-foreground mb-2">Why is RMS used instead of average?</h4>
                <p>
                  Average voltage of symmetrical AC is zero — not useful for power calculations. RMS accounts for the fact that power depends on voltage squared. Both positive and negative halves deliver power, so RMS gives the meaningful equivalent DC value.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is 120V AC the peak or RMS?</h4>
                <p>
                  120V is RMS. The peak is 120 × √2 = 170V. Peak-to-peak is 340V. This matters for component selection — a capacitor rated for 150V would fail on 120V AC because the peaks reach 170V.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What&apos;s the RMS of a DC signal?</h4>
                <p>
                  For pure DC, RMS equals the DC value itself. There&apos;s no variation, so the &quot;root mean square&quot; is just the constant value. A 5V DC supply has 5V RMS.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I measure RMS without a true RMS meter?</h4>
                <p>
                  For sine waves, measure peak with an oscilloscope and divide by √2. For other waveforms, you need to know the shape and apply the correct factor. True RMS meters sample and calculate Vrms = √(average of v²) directly.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Does frequency affect RMS?</h4>
                <p>
                  No. RMS depends only on waveform shape and amplitude, not frequency. A 10V peak sine wave has 7.07V RMS whether it&apos;s 50Hz, 1kHz, or 1MHz. Frequency affects reactance in circuits, but not the RMS value itself.
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
                href="/calculators/peak-to-peak-voltage-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Peak-to-Peak Voltage Calculator</span>
                <p className="text-muted-foreground">Convert between RMS, peak, and peak-to-peak voltages</p>
              </a>
              <a
                href="/calculators/ac-power-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">AC Power Calculator</span>
                <p className="text-muted-foreground">Calculate real, reactive, and apparent power</p>
              </a>
              <a
                href="/calculators/signal-generator-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Signal Generator Calculator</span>
                <p className="text-muted-foreground">Generate waveforms with specified frequency and amplitude</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
