"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Faqs from "@/components/utils/Faqs";


export default function FrequencyCalculator() {
  const [mode, setMode] = useState<"period" | "wavelength" | "angular">("period");
  const [period, setPeriod] = useState<string>("");
  const [wavelength, setWavelength] = useState<string>("");
  const [velocity, setVelocity] = useState<string>("3e8");
  const [frequency, setFrequency] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    switch (mode) {
      case "period":
        const T = parseFloat(period);
        if (T > 0) {
          const f = 1 / T;
          const unit = f >= 1e9 ? "GHz" : f >= 1e6 ? "MHz" : f >= 1e3 ? "kHz" : "Hz";
          const displayValue = f >= 1e9 ? f / 1e9 : f >= 1e6 ? f / 1e6 : f >= 1e3 ? f / 1e3 : f;
          setResults({ value: displayValue, unit, omega: 2 * Math.PI * f });
        }
        break;
      case "wavelength":
        const λ = parseFloat(wavelength);
        const v = parseFloat(velocity);
        if (λ > 0 && v > 0) {
          const f = v / λ;
          const unit = f >= 1e9 ? "GHz" : f >= 1e6 ? "MHz" : f >= 1e3 ? "kHz" : "Hz";
          const displayValue = f >= 1e9 ? f / 1e9 : f >= 1e6 ? f / 1e6 : f >= 1e3 ? f / 1e3 : f;
          setResults({ value: displayValue, unit, omega: 2 * Math.PI * f });
        }
        break;
      case "angular":
        const f2 = parseFloat(frequency);
        if (f2 > 0) {
          setResults({ value: 2 * Math.PI * f2, unit: "rad/s", f: f2 });
        }
        break;
    }
  };

  const reset = () => {
    setPeriod("");
    setWavelength("");
    setVelocity("3e8");
    setFrequency("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Calculation Mode</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="period">f = 1 / T (from Period)</SelectItem>
                  <SelectItem value="wavelength">f = v / λ (from Wavelength)</SelectItem>
                  <SelectItem value="angular">ω = 2πf (Angular Frequency)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "period" && (
              <div>
                <Label>Period (seconds)</Label>
                <Input type="number" value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="e.g., 0.001" />
              </div>
            )}

            {mode === "wavelength" && (
              <>
                <div>
                  <Label>Wavelength (meters)</Label>
                  <Input type="number" value={wavelength} onChange={(e) => setWavelength(e.target.value)} placeholder="e.g., 0.5" />
                </div>
                <div>
                  <Label>Wave Velocity (m/s)</Label>
                  <Input type="number" value={velocity} onChange={(e) => setVelocity(e.target.value)} />
                  <p className="text-sm text-muted-foreground mt-1">Default: speed of light (3×10⁸ m/s)</p>
                </div>
              </>
            )}

            {mode === "angular" && (
              <div>
                <Label>Frequency (Hz)</Label>
                <Input type="number" value={frequency} onChange={(e) => setFrequency(e.target.value)} placeholder="e.g., 1000" />
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">{mode === "angular" ? "Angular Frequency" : "Frequency"}</p>
                  <p className="text-4xl font-bold">{typeof results.value === 'number' ? Math.round(results.value * 1000) / 1000 : results.value} {results.unit}</p>
                </div>
                {results.omega && mode !== "angular" && (
                  <div>
                    <p className="text-sm text-muted-foreground">Angular Frequency (ω)</p>
                    <p className="text-2xl font-bold">{Math.round(results.omega * 100) / 100} rad/s</p>
                  </div>
                )}
                {results.f && (
                  <div>
                    <p className="text-sm text-muted-foreground">Period (T)</p>
                    <p className="text-2xl font-bold">{Math.round((1 / results.f) * 1000000) / 1000000} s</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Frequency Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Select your calculation mode</p>
                  <p>Choose from three modes: calculate frequency from period (f = 1/T), from wavelength (f = v/λ), or calculate angular frequency from regular frequency (ω = 2πf).</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your known values</p>
                  <p>Depending on the mode, enter period in seconds, wavelength in meters with wave velocity, or frequency in Hz. The default velocity is the speed of light (3×10⁸ m/s).</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">View your results</p>
                  <p>The calculator displays frequency in appropriate units (Hz, kHz, MHz, or GHz), plus angular frequency and period where applicable.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequency Reference Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Application</th>
                    <th className="text-left py-3 px-2 font-semibold">Frequency Range</th>
                    <th className="text-left py-3 px-2 font-semibold">Period</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Human hearing (low)</td>
                    <td className="py-3 px-2">20 Hz</td>
                    <td className="py-3 px-2">50 ms</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Human hearing (high)</td>
                    <td className="py-3 px-2">20,000 Hz (20 kHz)</td>
                    <td className="py-3 px-2">50 μs</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">AM radio</td>
                    <td className="py-3 px-2">540-1600 kHz</td>
                    <td className="py-3 px-2">0.6-1.9 μs</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">FM radio</td>
                    <td className="py-3 px-2">88-108 MHz</td>
                    <td className="py-3 px-2">9-11 ns</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">WiFi 2.4 GHz</td>
                    <td className="py-3 px-2">2.4 GHz</td>
                    <td className="py-3 px-2">0.42 ns</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">WiFi 5 GHz</td>
                    <td className="py-3 px-2">5 GHz</td>
                    <td className="py-3 px-2">0.2 ns</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Visible light</td>
                    <td className="py-3 px-2">430-770 THz</td>
                    <td className="py-3 px-2">1.3-2.3 fs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Hz = cycles per second, kHz = 1000 Hz, MHz = 1 million Hz, GHz = 1 billion Hz, THz = 1 trillion Hz
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Frequency, Period, and Wavelength
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Frequency and Period Are Inverses</h4>
                <p>
                  Frequency (f) measures how many cycles occur per second. Period (T) measures how long
                  one cycle takes. They are inverses: f = 1/T and T = 1/f. A 100 Hz signal completes
                  100 cycles per second, so each cycle takes 0.01 seconds (10 milliseconds).
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Frequency and Wavelength Relationship</h4>
                <p>
                  For waves, frequency relates to wavelength through velocity: f = v/λ. Higher frequency
                  means shorter wavelength. Radio waves travel at light speed (3×10⁸ m/s), so a 100 MHz
                  signal has a wavelength of 3 meters. Sound travels at about 343 m/s in air, so a 440 Hz
                  musical note has a wavelength of about 0.78 meters.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Angular Frequency Explained</h4>
                <p>
                  Angular frequency (ω, omega) measures rotation rate in radians per second instead of
                  cycles per second. One cycle equals 2π radians, so ω = 2πf. Angular frequency is used
                  in physics equations involving oscillation and rotation because it simplifies calculus.
                  A 60 Hz AC power signal has an angular frequency of about 377 rad/s.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Frequency Calculations
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use scientific notation for extreme values</p>
                  <p>Radio frequencies are often in MHz or GHz. Write 2.4 GHz as 2.4e9 or 2400000000. Period values can be tiny: 1 nanosecond is 1e-9 seconds.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Know your wave velocity</p>
                  <p>Electromagnetic waves travel at light speed in vacuum (3×10⁸ m/s). Sound travels at 343 m/s in air at 20°C, about 1480 m/s in water. Use the correct velocity for accurate wavelength calculations.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Check unit consistency</p>
                  <p>If wavelength is in meters, velocity must be in meters per second. If you have wavelength in centimeters, convert to meters first (divide by 100) before calculating.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Remember the frequency spectrum</p>
                  <p>Audio: 20 Hz to 20 kHz. Radio: kHz to GHz. Light: hundreds of THz. If your result falls far outside the expected range, double-check your inputs.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What is the formula for frequency?",
    answer: "The basic frequency formula is f = 1/T, where T is the period in seconds. For waves, frequency also equals velocity divided by wavelength: f = v/λ. Angular frequency is ω = 2πf, measured in radians per second instead of cycles per second.",
  },
{
    question: "How do I convert Hz to period?",
    answer: "Period is the inverse of frequency: T = 1/f. For 50 Hz, the period is 1/50 = 0.02 seconds (20 milliseconds). For 1 MHz (1,000,000 Hz), the period is 1/1,000,000 = 1 microsecond.",
  },
{
    question: "What is the difference between frequency and angular frequency?",
    answer: "Regular frequency (f) counts complete cycles per second in Hertz. Angular frequency (ω) measures radians per second. Since one cycle equals 2π radians, ω = 2πf. Angular frequency is preferred in physics because it eliminates factors of 2π from equations.",
  },
{
    question: "How do I find wavelength from frequency?",
    answer: "Use λ = v/f, where v is wave velocity. For electromagnetic waves in air or vacuum, v ≈ 3×10⁸ m/s. A 100 MHz radio signal has wavelength λ = 3×10⁸ / 100×10⁶ = 3 meters. For sound in air at 20°C, use v ≈ 343 m/s.",
  },
{
    question: "What units are used for frequency?",
    answer: "The SI unit is Hertz (Hz), meaning cycles per second. Common multiples include kHz (1000 Hz) for audio, MHz (million Hz) for radio and processors, GHz (billion Hz) for WiFi and CPUs, and THz (trillion Hz) for infrared and visible light.",
  }
  ]} />
</section>

      </div>
    </div>
  );
}
