"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DbCalculator() {
  const [mode, setMode] = useState<"dB_to_power" | "dB_to_voltage" | "power_to_dB" | "voltage_to_dB" | "dBm">("dB_to_power");
  const [dB, setDB] = useState<string>("");
  const [powerRatio, setPowerRatio] = useState<string>("");
  const [voltageRatio, setVoltageRatio] = useState<string>("");
  const [powerMw, setPowerMw] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    switch (mode) {
      case "dB_to_power":
        const dB1 = parseFloat(dB);
        if (!isNaN(dB1)) {
          const ratio = Math.pow(10, dB1 / 10);
          setResults({ value: ratio, label: "Power Ratio", unit: "" });
        }
        break;
      case "dB_to_voltage":
        const dB2 = parseFloat(dB);
        if (!isNaN(dB2)) {
          const ratio = Math.pow(10, dB2 / 20);
          setResults({ value: ratio, label: "Voltage Ratio", unit: "" });
        }
        break;
      case "power_to_dB":
        const ratio1 = parseFloat(powerRatio);
        if (!isNaN(ratio1) && ratio1 > 0) {
          const dBVal = 10 * Math.log10(ratio1);
          setResults({ value: dBVal, label: "Decibels", unit: "dB" });
        }
        break;
      case "voltage_to_dB":
        const ratio2 = parseFloat(voltageRatio);
        if (!isNaN(ratio2) && ratio2 > 0) {
          const dBVal = 20 * Math.log10(ratio2);
          setResults({ value: dBVal, label: "Decibels", unit: "dB" });
        }
        break;
      case "dBm":
        const mW = parseFloat(powerMw);
        if (!isNaN(mW) && mW > 0) {
          const dBm = 10 * Math.log10(mW);
          setResults({ value: dBm, label: "Power in dBm", unit: "dBm" });
        }
        break;
    }
  };

  const reset = () => {
    setDB("");
    setPowerRatio("");
    setVoltageRatio("");
    setPowerMw("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <Tabs defaultValue="dB_to_power">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="dB_to_power" onClick={() => setMode("dB_to_power")}>dB → Ratio</TabsTrigger>
                <TabsTrigger value="ratio_to_dB" onClick={() => setMode("power_to_dB")}>Ratio → dB</TabsTrigger>
                <TabsTrigger value="dBm" onClick={() => setMode("dBm")}>dBm</TabsTrigger>
              </TabsList>

              <TabsContent value="dB_to_power" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Decibels (dB)</Label>
                    <Input type="number" value={dB} onChange={(e) => setDB(e.target.value)} placeholder="e.g., 10" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => { setMode("dB_to_power"); calculate(); }}>Power Ratio</Button>
                  <Button onClick={() => { setMode("dB_to_voltage"); calculate(); }}>Voltage Ratio</Button>
                </div>
              </TabsContent>

              <TabsContent value="ratio_to_dB" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Power Ratio</Label>
                    <Input type="number" value={powerRatio} onChange={(e) => setPowerRatio(e.target.value)} placeholder="e.g., 10" />
                  </div>
                  <div>
                    <Label>Voltage Ratio</Label>
                    <Input type="number" value={voltageRatio} onChange={(e) => setVoltageRatio(e.target.value)} placeholder="e.g., 3.16" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => { setMode("power_to_dB"); calculate(); }}>to dB (Power)</Button>
                  <Button onClick={() => { setMode("voltage_to_dB"); calculate(); }}>to dB (Voltage)</Button>
                </div>
              </TabsContent>

              <TabsContent value="dBm" className="space-y-4 pt-4">
                <div>
                  <Label>Power (milliwatts)</Label>
                  <Input type="number" value={powerMw} onChange={(e) => setPowerMw(e.target.value)} placeholder="e.g., 100" />
                </div>
                <Button onClick={calculate}>Calculate dBm</Button>
              </TabsContent>
            </Tabs>

            <Button variant="outline" onClick={reset} className="w-full">Reset</Button>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">{results.label}</p>
                <p className="text-4xl font-bold">{typeof results.value === 'number' ? Math.round(results.value * 1000) / 1000 : results.value} {results.unit}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This dB Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Select your conversion type</p>
                  <p>Choose between dB to Ratio, Ratio to dB, or dBm calculations using the tabs at the top.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your value</p>
                  <p>Input the decibel value, ratio, or power in milliwatts depending on your selected conversion type.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Click the appropriate calculate button</p>
                  <p>Select Power Ratio or Voltage Ratio for dB conversions. The result appears instantly below.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common dB Values Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">dB</th>
                    <th className="text-left py-3 px-2 font-semibold">Power Ratio</th>
                    <th className="text-left py-3 px-2 font-semibold">Voltage Ratio</th>
                    <th className="text-left py-3 px-2 font-semibold">Application</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">-3 dB</td>
                    <td className="py-3 px-2">0.5</td>
                    <td className="py-3 px-2">0.707</td>
                    <td className="py-3 px-2">Half power point (cutoff)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">0 dB</td>
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2">Reference level (no change)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">3 dB</td>
                    <td className="py-3 px-2">2</td>
                    <td className="py-3 px-2">1.414</td>
                    <td className="py-3 px-2">Double power</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">6 dB</td>
                    <td className="py-3 px-2">4</td>
                    <td className="py-3 px-2">2</td>
                    <td className="py-3 px-2">Double voltage</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">10 dB</td>
                    <td className="py-3 px-2">10</td>
                    <td className="py-3 px-2">3.162</td>
                    <td className="py-3 px-2">10x power</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">20 dB</td>
                    <td className="py-3 px-2">100</td>
                    <td className="py-3 px-2">10</td>
                    <td className="py-3 px-2">10x voltage</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">30 dB</td>
                    <td className="py-3 px-2">1,000</td>
                    <td className="py-3 px-2">31.62</td>
                    <td className="py-3 px-2">1000x power</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Power uses 10^(dB/10). Voltage uses 10^(dB/20) because power is proportional to voltage squared.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Decibels
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is a Decibel?</h4>
                <p>
                  A decibel (dB) is a logarithmic unit expressing the ratio between two values. It&apos;s not an absolute measurement like volts or watts — it&apos;s a comparison. 0 dB means no change. Positive dB means gain. Negative dB means loss.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Power vs Voltage Decibels</h4>
                <p>
                  Power ratios use 10 × log10(ratio). Voltage ratios use 20 × log10(ratio) because power equals voltage squared divided by resistance. Doubling voltage quadruples power, hence the factor of 20 instead of 10.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is dBm?</h4>
                <p>
                  dBm is decibels relative to 1 milliwatt. It&apos;s an absolute power level, not a ratio. 0 dBm = 1 mW. 10 dBm = 10 mW. 30 dBm = 1 watt. RF engineers use dBm to specify signal levels and transmitter power.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Use Logarithms?</h4>
                <p>
                  Audio and RF signals span enormous ranges — from microwatts to kilowatts. Logarithms compress this range into manageable numbers. Adding dB values is easier than multiplying ratios. A 10 dB amp followed by a 3 dB loss equals 7 dB total gain.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Working with Decibels
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Memorize Key Values</p>
                  <p>3 dB = 2x power. 10 dB = 10x power. 20 dB = 100x power. These benchmarks let you estimate quickly without a calculator.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Add dB, Multiply Ratios</p>
                  <p>When cascading stages, add dB values: 20 dB amp + (-3 dB cable loss) = 17 dB total. To find the combined ratio, convert back from dB.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Watch Your Reference</p>
                  <p>dBV uses 1 volt reference. dBu uses 0.775 volts. dBm uses 1 milliwatt. dB SPL uses 20 micropascals. Always check which reference applies to your calculation.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Negative dB Means Loss</p>
                  <p>-10 dB isn&apos;t an error — it means the output is 10 times smaller than the input. Attenuators, cable losses, and filter rejection are all expressed as negative dB.</p>
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
                <h4 className="font-medium text-foreground mb-2">Why is there a difference between power and voltage dB?</h4>
                <p>
                  Power is proportional to voltage squared (P = V²/R). When you double voltage, power quadruples. So 6 dB represents 2x voltage but 4x power. The formulas account for this: 10×log for power, 20×log for voltage.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What does 0 dB mean?</h4>
                <p>
                  0 dB means the ratio equals 1 — no change. Output equals input. It doesn&apos;t mean &quot;no signal&quot; — it means the signal level is unchanged from the reference point.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I convert dBm to watts?</h4>
                <p>
                  Watts = 10^((dBm - 30) / 10). Or remember: 30 dBm = 1 W, 0 dBm = 1 mW, -30 dBm = 1 μW. Each 10 dB change multiplies power by 10.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can decibels be negative?</h4>
                <p>
                  Yes. Negative dB indicates a ratio less than 1 — attenuation or loss. -3 dB means half the power. -20 dB means 1/100th the power. Negative values are common for losses and filter rejection.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What&apos;s the difference between dB and dBA?</h4>
                <p>
                  dB is a raw ratio. dBA applies a frequency weighting that mimics human hearing sensitivity. dBA is used for noise measurements. A-weighting reduces low and very high frequencies where human ears are less sensitive.
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
                href="/calculators/decibel-to-power-converter"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Decibel to Power Converter</span>
                <p className="text-muted-foreground">Convert dB levels to acoustic power and sound pressure</p>
              </a>
              <a
                href="/calculators/frequency-wavelength-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Frequency Wavelength Calculator</span>
                <p className="text-muted-foreground">Calculate wavelength from frequency for RF and audio applications</p>
              </a>
              <a
                href="/calculators/ohms-law-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Ohm&apos;s Law Calculator</span>
                <p className="text-muted-foreground">Calculate voltage, current, resistance, and power relationships</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
