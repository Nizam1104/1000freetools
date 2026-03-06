"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DacResolutionCalculator() {
  const [bits, setBits] = useState<string>("");
  const [vref, setVref] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const n = parseInt(bits);
    const Vref = parseFloat(vref);

    if (n > 0 && n <= 24 && Vref > 0) {
      const levels = Math.pow(2, n);
      const resolution = Vref / (levels - 1);
      const lsb = resolution * 1000;

      setResults({
        levels,
        resolution: resolution.toExponential(4),
        lsb: Math.round(lsb * 1000) / 1000,
      });
    }
  };

  const reset = () => {
    setBits(""); setVref(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Resolution (bits)</Label><Input type="number" value={bits} onChange={e => setBits(e.target.value)} placeholder="e.g., 12, 16, 20" /></div>
              <div><Label>Reference Voltage (V)</Label><Input value={vref} onChange={e => setVref(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Number of Levels</p>
                    <p className="text-2xl font-bold">{results.levels.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Step Size</p>
                    <p className="text-xl font-bold">{results.resolution} V</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LSB</p>
                    <p className="text-xl font-bold">{results.lsb} mV</p>
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
              How to Use This DAC Resolution Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the DAC resolution in bits</p>
                  <p>Common values are 8, 10, 12, 14, 16, 20, or 24 bits. Higher bit depth means finer resolution and more output levels.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the reference voltage</p>
                  <p>This is the maximum output voltage of your DAC. Common values are 3.3V, 5V, or 10V depending on your system.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Calculate to see results</p>
                  <p>The calculator shows the number of discrete output levels, the voltage step size (resolution), and the LSB value in millivolts.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              DAC Resolution Reference Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Bit Depth</th>
                    <th className="text-left py-3 px-2 font-semibold">Output Levels</th>
                    <th className="text-left py-3 px-2 font-semibold">Resolution @ 3.3V</th>
                    <th className="text-left py-3 px-2 font-semibold">Resolution @ 5V</th>
                    <th className="text-left py-3 px-2 font-semibold">Typical Use</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">8-bit</td>
                    <td className="py-3 px-2">256</td>
                    <td className="py-3 px-2">12.9 mV</td>
                    <td className="py-3 px-2">19.6 mV</td>
                    <td className="py-3 px-2">Basic PWM, simple control</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">10-bit</td>
                    <td className="py-3 px-2">1,024</td>
                    <td className="py-3 px-2">3.2 mV</td>
                    <td className="py-3 px-2">4.9 mV</td>
                    <td className="py-3 px-2">Arduino ADC, hobby projects</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">12-bit</td>
                    <td className="py-3 px-2">4,096</td>
                    <td className="py-3 px-2">0.8 mV</td>
                    <td className="py-3 px-2">1.2 mV</td>
                    <td className="py-3 px-2">Standard precision DACs</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">14-bit</td>
                    <td className="py-3 px-2">16,384</td>
                    <td className="py-3 px-2">0.2 mV</td>
                    <td className="py-3 px-2">0.3 mV</td>
                    <td className="py-3 px-2">Audio applications</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">16-bit</td>
                    <td className="py-3 px-2">65,536</td>
                    <td className="py-3 px-2">50 μV</td>
                    <td className="py-3 px-2">76 μV</td>
                    <td className="py-3 px-2">High-fidelity audio</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">20-bit</td>
                    <td className="py-3 px-2">1,048,576</td>
                    <td className="py-3 px-2">3.1 μV</td>
                    <td className="py-3 px-2">4.8 μV</td>
                    <td className="py-3 px-2">Precision instrumentation</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">24-bit</td>
                    <td className="py-3 px-2">16,777,216</td>
                    <td className="py-3 px-2">0.2 μV</td>
                    <td className="py-3 px-2">0.3 μV</td>
                    <td className="py-3 px-2">Professional audio ADCs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Resolution = Vref / (2^n - 1), where n is the bit depth. Actual performance may be limited by noise and non-linearity.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding DAC Resolution
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is a DAC?</h4>
                <p>
                  A Digital-to-Analog Converter (DAC) transforms digital binary numbers into continuous analog voltages. Every digital audio player, microcontroller with analog output, and signal generator uses a DAC to create real-world signals from digital data.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Bit Depth Explained</h4>
                <p>
                  Bit depth determines how many discrete voltage levels the DAC can output. An n-bit DAC produces 2^n levels. An 8-bit DAC creates 256 steps; a 16-bit DAC creates 65,536 steps. More bits mean smaller steps and smoother output.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">LSB (Least Significant Bit)</h4>
                <p>
                  The LSB represents the smallest voltage change the DAC can produce — one step. It equals Vref / (2^n - 1). This is your DAC&apos;s fundamental resolution limit. Signals smaller than one LSB cannot be accurately represented.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Reference Voltage Impact</h4>
                <p>
                  The reference voltage sets the DAC&apos;s output range. A 5V reference with 12-bit resolution gives 1.2 mV steps. The same DAC with a 3.3V reference gives 0.8 mV steps. Lower Vref means finer resolution but smaller output range.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for DAC Design
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Match Resolution to Application</p>
                  <p>Audio needs 16+ bits for low quantization noise. Motor control often works fine with 10-12 bits. Don&apos;t over-specify — higher resolution DACs cost more and may be slower.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use a Clean Reference Voltage</p>
                  <p>Noise on Vref appears directly at the output. Use a low-noise voltage reference IC, not the microcontroller&apos;s power rail. Add bypass capacitors close to the DAC.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Consider Effective Number of Bits (ENOB)</p>
                  <p>Real DACs have noise and distortion. A &quot;16-bit&quot; DAC might only achieve 14 effective bits. Check the datasheet for SINAD and ENOB specifications.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Mind the Update Rate</p>
                  <p>Higher resolution often means slower settling time. If you need fast updates (motor control, waveform generation), verify the DAC can settle within your timing budget.</p>
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
                <h4 className="font-medium text-foreground mb-2">What does DAC resolution mean?</h4>
                <p>
                  DAC resolution is the smallest voltage change the converter can produce, determined by bit depth. A 12-bit DAC divides its reference voltage into 4,096 steps. Higher resolution means finer control and lower quantization noise.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I calculate DAC resolution?</h4>
                <p>
                  Resolution = Vref / (2^n - 1), where Vref is the reference voltage and n is the bit depth. For a 12-bit DAC with 5V reference: 5 / 4095 = 1.22 mV per step.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is higher bit depth always better?</h4>
                <p>
                  Not necessarily. Higher resolution increases cost, reduces update speed, and may exceed your system&apos;s noise floor. Match bit depth to your actual requirements. Audio benefits from 16+ bits; LED dimming works fine with 8-10 bits.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is LSB in a DAC?</h4>
                <p>
                  LSB stands for Least Significant Bit. It represents one step of the DAC output — the smallest possible voltage change. LSB voltage equals the resolution. A change of 1 in the digital code changes the output by exactly 1 LSB.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why is my DAC output noisy?</h4>
                <p>
                  Common causes include noisy reference voltage, inadequate power supply decoupling, digital switching noise coupling into analog traces, or ground loops. Use separate analog and digital grounds, add bypass capacitors, and keep analog traces short.
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
                href="/calculators/adc-resolution-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">ADC Resolution Calculator</span>
                <p className="text-muted-foreground">Calculate analog-to-digital converter resolution and step size</p>
              </a>
              <a
                href="/calculators/decibel-to-power-converter"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Decibel to Power Converter</span>
                <p className="text-muted-foreground">Convert between dB, power ratios, and voltage levels</p>
              </a>
              <a
                href="/calculators/ohms-law-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Ohm&apos;s Law Calculator</span>
                <p className="text-muted-foreground">Calculate voltage, current, resistance, and power in electrical circuits</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
