"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdcResolutionCalculator() {
  const [bits, setBits] = useState<string>("");
  const [vref, setVref] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const n = parseInt(bits);
    const Vref = parseFloat(vref);

    if (n > 0 && n <= 24 && Vref > 0) {
      const levels = Math.pow(2, n);
      const resolution = Vref / levels;
      const lsb = resolution * 1000; // mV

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
              <div><Label>Resolution (bits)</Label><Input type="number" value={bits} onChange={e => setBits(e.target.value)} placeholder="e.g., 12, 16, 24" /></div>
              <div><Label>Reference Voltage (V)</Label><Input value={vref} onChange={e => setVref(e.target.value)} placeholder="e.g., 3.3, 5" /></div>
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
                    <p className="text-sm text-muted-foreground">Resolution</p>
                    <p className="text-xl font-bold">{results.resolution} V</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LSB Size</p>
                    <p className="text-xl font-bold">{results.lsb} mV</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <div className="w-full max-w-4xl mx-auto mt-8 space-y-8">
        
        {/* How to Use Section */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use This ADC Resolution Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal list-inside space-y-3">
              <li className="text-muted-foreground">
                <strong>Enter the ADC bit depth</strong> – Input the resolution of your ADC in bits (common values: 8, 10, 12, 16, or 24 bits).
              </li>
              <li className="text-muted-foreground">
                <strong>Enter the reference voltage</strong> – Provide the reference voltage (Vref) for your ADC system, such as 3.3V or 5V.
              </li>
              <li className="text-muted-foreground">
                <strong>Click Calculate</strong> – Get instant results showing the number of quantization levels, voltage resolution, and LSB size in millivolts.
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Understanding ADC Resolution Section */}
        <Card>
          <CardHeader>
            <CardTitle>Understanding ADC Resolution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What is an ADC?</h3>
              <p>
                An ADC (Analog-to-Digital Converter) is an electronic component that converts continuous analog signals 
                (like voltage from a sensor) into discrete digital values that a microcontroller or computer can process. 
                Every ADC has a resolution that determines how finely it can divide the input voltage range.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What Does Resolution Mean?</h3>
              <p>
                ADC resolution refers to the smallest change in analog input voltage that the converter can detect and 
                represent as a different digital output value. Higher resolution means the ADC can distinguish smaller 
                voltage differences, giving you more precise measurements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">How Bit Depth Affects Precision</h3>
              <p>
                The bit depth (n) determines how many discrete levels the ADC can produce. An n-bit ADC creates 2^n 
                quantization levels. For example, an 8-bit ADC produces 256 levels, while a 16-bit ADC produces 65,536 
                levels. More bits mean finer resolution and better ability to detect small signal changes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Understanding LSB (Least Significant Bit)</h3>
              <p>
                The LSB represents the voltage change corresponding to a one-bit change in the ADC output. It is the 
                smallest voltage increment the ADC can resolve. LSB size is calculated by dividing the reference voltage 
                by the number of levels. A smaller LSB means higher resolution and better measurement precision.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Formula Reference Section */}
        <Card>
          <CardHeader>
            <CardTitle>ADC Resolution Formula Reference</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-md">
                <p className="font-mono text-sm mb-2">Resolution = Vref / 2^n</p>
                <p className="text-sm text-muted-foreground">
                  Where n = number of bits, Vref = reference voltage. This gives the voltage per step (LSB size).
                </p>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <p className="font-mono text-sm mb-2">LSB Size = Full Scale Range / 2^n</p>
                <p className="text-sm text-muted-foreground">
                  The full scale range is typically equal to Vref. LSB size tells you the smallest detectable voltage change.
                </p>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <p className="font-mono text-sm mb-2">Percentage Resolution = (1 / 2^n) × 100%</p>
                <p className="text-sm text-muted-foreground">
                  Expresses resolution as a percentage of the full scale range. Lower percentage means better resolution.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Example Calculations (Vref = 5V)</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>8-bit ADC:</span>
                  <span>5V / 256 = 19.53 mV per step</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>10-bit ADC:</span>
                  <span>5V / 1024 = 4.88 mV per step</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>12-bit ADC:</span>
                  <span>5V / 4096 = 1.22 mV per step</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>16-bit ADC:</span>
                  <span>5V / 65536 = 76.3 μV per step</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>24-bit ADC:</span>
                  <span>5V / 16,777,216 = 0.298 μV per step</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Table Section */}
        <Card>
          <CardHeader>
            <CardTitle>ADC Resolution Comparison Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Bit Depth</th>
                    <th className="text-left p-3 font-semibold">Quantization Levels</th>
                    <th className="text-left p-3 font-semibold">% Resolution</th>
                    <th className="text-left p-3 font-semibold">Common Applications</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="p-3">8-bit</td>
                    <td className="p-3">256</td>
                    <td className="p-3">0.39%</td>
                    <td className="p-3">Basic digital circuits</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">10-bit</td>
                    <td className="p-3">1,024</td>
                    <td className="p-3">0.098%</td>
                    <td className="p-3">Arduino, hobby electronics</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">12-bit</td>
                    <td className="p-3">4,096</td>
                    <td className="p-3">0.024%</td>
                    <td className="p-3">STM32, ESP32, general embedded</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">16-bit</td>
                    <td className="p-3">65,536</td>
                    <td className="p-3">0.0015%</td>
                    <td className="p-3">Precision measurements, DAQ</td>
                  </tr>
                  <tr>
                    <td className="p-3">24-bit</td>
                    <td className="p-3">16.7M</td>
                    <td className="p-3">0.000006%</td>
                    <td className="p-3">Audio, scientific instruments</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Choosing the Right ADC Section */}
        <Card>
          <CardHeader>
            <CardTitle>Choosing the Right ADC Resolution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-semibold text-foreground mb-2">8-10 Bit ADCs</h4>
              <p>
                Suitable for simple sensors and basic measurements where high precision is not critical. 
                Common in Arduino boards and entry-level microcontrollers. Good for reading potentiometers, 
                light sensors, or basic temperature monitoring.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-semibold text-foreground mb-2">12-14 Bit ADCs</h4>
              <p>
                Used in industrial sensors and motor control applications. Provides a good balance between 
                resolution, speed, and cost. Found in many modern microcontrollers like STM32 and ESP32. 
                Suitable for most embedded system applications.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-semibold text-foreground mb-2">16-18 Bit ADCs</h4>
              <p>
                Designed for precision measurements and data acquisition systems. Used in multimeters, 
                industrial process control, and scientific equipment. Necessary when measuring small 
                signal changes or when high accuracy is required.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-semibold text-foreground mb-2">20-24 Bit ADCs</h4>
              <p>
                Reserved for high-fidelity audio applications and precision scientific instruments. 
                Sigma-delta ADCs in this range are common in audio interfaces, professional recording 
                equipment, and laboratory measurement devices. Overkill for most general-purpose applications.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">What does ADC resolution mean?</h4>
              <p className="text-muted-foreground">
                ADC resolution is the number of bits the converter uses to represent an analog signal digitally. 
                It determines how many discrete levels the ADC can output. Higher resolution means more levels 
                and the ability to detect smaller voltage changes in the input signal.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">How do I calculate ADC resolution?</h4>
              <p className="text-muted-foreground">
                Use the formula: Resolution = Vref / 2^n, where Vref is the reference voltage and n is the 
                number of bits. For a 12-bit ADC with 3.3V reference: 3.3V / 4096 = 0.805 mV per step. This 
                tells you the smallest voltage change the ADC can detect.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">What is a good ADC resolution?</h4>
              <p className="text-muted-foreground">
                It depends on your application. For basic hobby projects, 10-bit (Arduino) is often sufficient. 
                For most embedded systems, 12-bit provides good precision. Precision measurements and audio 
                applications typically need 16-bit or higher. Match the resolution to your accuracy requirements.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Why use higher resolution ADCs?</h4>
              <p className="text-muted-foreground">
                Higher resolution ADCs can detect smaller signal changes, reduce quantization error, and 
                provide more accurate measurements. This matters when measuring small sensor outputs, in 
                audio applications where detail matters, or in scientific instruments requiring high precision.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">What is the difference between resolution and accuracy?</h4>
              <p className="text-muted-foreground">
                Resolution is the smallest change an ADC can detect (determined by bit depth). Accuracy is how 
                close the measured value is to the true value. An ADC can have high resolution but poor accuracy 
                due to noise, nonlinearity, or calibration errors. Both matter for quality measurements.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools Section */}
        <Card>
          <CardHeader>
            <CardTitle>Related Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/calculators/voltage-calculator" className="hover:text-foreground underline">
                  Voltage Calculator
                </a>
                <span className="ml-2">– Calculate voltage drops, dividers, and power supply requirements</span>
              </li>
              <li>
                <a href="/calculators/dac-resolution-calculator" className="hover:text-foreground underline">
                  DAC Resolution Calculator
                </a>
                <span className="ml-2">– Calculate resolution for Digital-to-Analog Converters</span>
              </li>
              <li>
                <a href="/calculators/signal-to-noise-ratio-calculator" className="hover:text-foreground underline">
                  Signal-to-Noise Ratio Calculator
                </a>
                <span className="ml-2">– Analyze signal quality and noise performance</span>
              </li>
            </ul>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
