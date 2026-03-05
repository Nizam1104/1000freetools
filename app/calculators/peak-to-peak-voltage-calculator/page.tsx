"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PeakToPeakVoltageCalculator() {
  const [mode, setMode] = useState<"peak" | "rms" | "avg">("peak");
  const [value, setValue] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const V = parseFloat(value);
    if (V <= 0) return;

    let peak = V;
    if (mode === "rms") {
      peak = V * Math.sqrt(2);
    } else if (mode === "avg") {
      peak = V * Math.PI / 2;
    }

    setResults({
      peakToPeak: Math.round(2 * peak * 100) / 100,
      peak: Math.round(peak * 100) / 100,
      rms: Math.round((peak / Math.sqrt(2)) * 100) / 100,
      avg: Math.round((2 * peak / Math.PI) * 100) / 100,
    });
  };

  const reset = () => {
    setValue(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Peak-to-Peak Voltage Calculator – Convert AC Voltage Measurements</CardTitle>
          <CardDescription>
            Convert between peak, RMS, average, and peak-to-peak voltage for sine waves.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Input Type</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="peak">Peak Voltage (Vp)</SelectItem>
                  <SelectItem value="rms">RMS Voltage (Vrms)</SelectItem>
                  <SelectItem value="avg">Average Voltage (Vavg)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Voltage (V)</Label>
              <Input value={value} onChange={e => setValue(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Peak-to-Peak</p>
                    <p className="text-3xl font-bold">{results.peakToPeak} V</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Peak</p>
                    <p className="text-2xl font-bold">{results.peak} V</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">RMS</p>
                    <p className="text-2xl font-bold">{results.rms} V</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average</p>
                    <p className="text-2xl font-bold">{results.avg} V</p>
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
            <CardTitle>How to Use This Peak-to-Peak Voltage Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
              <div>
                <p className="font-medium text-foreground">Select your input type</p>
                <p>Choose whether you have peak voltage, RMS voltage, or average voltage.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
              <div>
                <p className="font-medium text-foreground">Enter the voltage value</p>
                <p>Input your known voltage value. The calculator will convert to all other measurements.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
              <div>
                <p className="font-medium text-foreground">Click Convert</p>
                <p>Get peak-to-peak, peak, RMS, and average voltage values for a sine wave.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AC Voltage Conversion Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">From</th>
                    <th className="text-left py-3 px-2 font-semibold">To Peak-to-Peak</th>
                    <th className="text-left py-3 px-2 font-semibold">To Peak</th>
                    <th className="text-left py-3 px-2 font-semibold">To RMS</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Peak (Vp)</td>
                    <td className="py-3 px-2 font-mono">Vpp = 2 × Vp</td>
                    <td className="py-3 px-2 font-mono">Vp = Vp</td>
                    <td className="py-3 px-2 font-mono">Vrms = Vp / √2</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Peak-to-Peak (Vpp)</td>
                    <td className="py-3 px-2 font-mono">Vpp = Vpp</td>
                    <td className="py-3 px-2 font-mono">Vp = Vpp / 2</td>
                    <td className="py-3 px-2 font-mono">Vrms = Vpp / (2√2)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">RMS (Vrms)</td>
                    <td className="py-3 px-2 font-mono">Vpp = 2√2 × Vrms</td>
                    <td className="py-3 px-2 font-mono">Vp = √2 × Vrms</td>
                    <td className="py-3 px-2 font-mono">Vrms = Vrms</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Average (Vavg)</td>
                    <td className="py-3 px-2 font-mono">Vpp = π × Vavg</td>
                    <td className="py-3 px-2 font-mono">Vp = π/2 × Vavg</td>
                    <td className="py-3 px-2 font-mono">Vrms = π/(2√2) × Vavg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding AC Voltage Measurements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Peak Voltage (Vp)</h4>
              <p>Peak voltage is the maximum voltage measured from zero to the highest point of the sine wave. It represents the amplitude of the AC signal. For a 120V RMS household outlet, the peak voltage is about 170V.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Peak-to-Peak Voltage (Vpp)</h4>
              <p>Peak-to-peak voltage measures from the negative peak to the positive peak — the full vertical span of the waveform. It equals twice the peak voltage. Oscilloscopes typically display peak-to-peak values.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">RMS Voltage (Vrms)</h4>
              <p>RMS (Root Mean Square) voltage is the DC equivalent that would deliver the same power to a resistive load. When we say "120V AC," we mean 120V RMS. For sine waves, Vrms = Vp / √2 ≈ 0.707 × Vp.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Average Voltage (Vavg)</h4>
              <p>Average voltage is the mean value over one half-cycle of a rectified sine wave. For a full sine wave, the average is zero (equal positive and negative halves). Vavg = 2/π × Vp ≈ 0.637 × Vp.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common AC Voltage Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">US Household Power (120V RMS)</p>
                <p>Vp = 170V, Vpp = 340V, Vavg = 108V. The actual voltage swings from -170V to +170V, 60 times per second.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">European Household Power (230V RMS)</p>
                <p>Vp = 325V, Vpp = 650V, Vavg = 207V. Higher voltage means more power delivery with less current.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Audio Line Level (1V RMS typical)</p>
                <p>Vp = 1.41V, Vpp = 2.83V. Professional audio uses +4dBu (1.23V RMS), consumer uses -10dBV (0.316V RMS).</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Transformer Secondary (12V RMS)</p>
                <p>Vp = 17V, Vpp = 34V. After rectification and filtering, you get about 17V DC minus diode drops.</p>
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
              <h4 className="font-medium text-foreground mb-2">Why is RMS voltage used for AC power ratings?</h4>
              <p>RMS voltage gives the same heating effect as an equivalent DC voltage. A 120V RMS AC source delivers the same power to a resistor as 120V DC. This makes RMS the practical choice for power calculations and equipment ratings.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">What's the difference between Vpp and Vp?</h4>
              <p>Peak voltage (Vp) measures from zero to the maximum. Peak-to-peak (Vpp) measures from the negative peak to the positive peak. For symmetric waveforms, Vpp = 2 × Vp.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Do these conversions work for all waveforms?</h4>
              <p>No. These formulas apply only to pure sine waves. Square waves, triangle waves, and complex waveforms have different relationships between peak, RMS, and average values.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Why is average voltage calculated from half-cycle?</h4>
              <p>A full sine wave averages to zero because positive and negative halves cancel. For practical purposes (like rectified power supplies), we use the average of the absolute value over a half-cycle.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">What does √2 equal in the RMS formula?</h4>
              <p>√2 ≈ 1.414. So Vrms = Vp / 1.414 ≈ 0.707 × Vp. Conversely, Vp = 1.414 × Vrms. For 120V RMS: Vp = 1.414 × 120 = 170V.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <a href="/calculators/pcb-trace-width-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">PCB Trace Width Calculator</span>
                <p className="text-muted-foreground">Calculate trace width for current capacity</p>
              </a>
              <a href="/calculators/ohms-law-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Ohm's Law Calculator</span>
                <p className="text-muted-foreground">Calculate voltage, current, resistance, and power</p>
              </a>
              <a href="/calculators/power-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Power Calculator</span>
                <p className="text-muted-foreground">Calculate electrical power in DC and AC circuits</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
