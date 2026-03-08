"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CurrentCalculator() {
  const [mode, setMode] = useState<"VI" | "PV" | "VZ">("VI");
  const [voltage, setVoltage] = useState<string>("");
  const [resistance, setResistance] = useState<string>("");
  const [power, setPower] = useState<string>("");
  const [impedance, setImpedance] = useState<string>("");
  const [results, setResults] = useState<{ current: number; unit: string } | null>(null);

  const calculate = () => {
    let current = 0;
    const V = parseFloat(voltage);
    const R = parseFloat(resistance);
    const P = parseFloat(power);
    const Z = parseFloat(impedance);

    switch (mode) {
      case "VI":
        if (V > 0 && R > 0) current = V / R;
        break;
      case "PV":
        if (P > 0 && V > 0) current = P / V;
        break;
      case "VZ":
        if (V > 0 && Z > 0) current = V / Z;
        break;
    }

    if (current > 0) {
      const unit = current >= 1 ? "A" : current >= 0.001 ? "mA" : "µA";
      const displayValue = current >= 1 ? current : current >= 0.001 ? current * 1000 : current * 1000000;
      setResults({ current: Math.round(displayValue * 1000) / 1000, unit });
    }
  };

  const reset = () => {
    setVoltage("");
    setResistance("");
    setPower("");
    setImpedance("");
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
                  <SelectItem value="VI">I = V / R (Ohm's Law)</SelectItem>
                  <SelectItem value="PV">I = P / V (Power)</SelectItem>
                  <SelectItem value="VZ">I = V / Z (Impedance)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="voltage">Voltage (V)</Label>
                <Input id="voltage" type="number" placeholder="e.g., 12" value={voltage} onChange={(e) => setVoltage(e.target.value)} />
              </div>
              {mode === "VI" && (
                <div>
                  <Label htmlFor="resistance">Resistance (Ω)</Label>
                  <Input id="resistance" type="number" placeholder="e.g., 100" value={resistance} onChange={(e) => setResistance(e.target.value)} />
                </div>
              )}
              {mode === "PV" && (
                <div>
                  <Label htmlFor="power">Power (W)</Label>
                  <Input id="power" type="number" placeholder="e.g., 60" value={power} onChange={(e) => setPower(e.target.value)} />
                </div>
              )}
              {mode === "VZ" && (
                <div>
                  <Label htmlFor="impedance">Impedance (Ω)</Label>
                  <Input id="impedance" type="number" placeholder="e.g., 50" value={impedance} onChange={(e) => setImpedance(e.target.value)} />
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Current</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Current</p>
                <p className="text-4xl font-bold">{results.current} {results.unit}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Formula: {mode === "VI" ? "I = V / R" : mode === "PV" ? "I = P / V" : "I = V / Z"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <div className="mt-8 space-y-8">
        {/* How It Works */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">How the Current Calculator Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Select Calculation Mode</h3>
                  <p className="text-sm text-muted-foreground">Choose between Ohm&apos;s Law (I = V/R), Power formula (I = P/V), or Impedance method (I = V/Z).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Enter Circuit Values</h3>
                  <p className="text-sm text-muted-foreground">Input voltage and resistance, power, or impedance values based on your selected calculation mode.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-2">Get Current Result</h3>
                  <p className="text-sm text-muted-foreground">Receive instant current calculation in amperes with automatic unit conversion for mA or µA.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features and Benefits */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Features of This Electrical Current Calculator</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Multiple Calculation Methods</h3>
                    <p className="text-sm text-muted-foreground">Calculate current using Ohm&apos;s Law, power formula, or impedance for AC circuits.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Auto Unit Conversion</h3>
                    <p className="text-sm text-muted-foreground">Results automatically display in A, mA, or µA based on magnitude for easy reading.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Formula Display</h3>
                    <p className="text-sm text-muted-foreground">See the exact formula used for each calculation to understand and verify results.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">AC and DC Support</h3>
                    <p className="text-sm text-muted-foreground">Calculate current for both DC circuits (resistance) and AC circuits (impedance).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Free Electrical Tool</h3>
                    <p className="text-sm text-muted-foreground">Completely free current calculator for students, electricians, and engineers.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Mobile-Friendly Design</h3>
                    <p className="text-sm text-muted-foreground">Calculate current on any device, anywhere - perfect for field work and labs.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reference Table */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Current Calculation Formulas</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Method</th>
                      <th className="text-left py-2">Formula</th>
                      <th className="text-left py-2">When to Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Ohm&apos;s Law</td>
                      <td className="py-2 font-mono">I = V / R</td>
                      <td className="py-2">DC circuits with known resistance</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Power Formula</td>
                      <td className="py-2 font-mono">I = P / V</td>
                      <td className="py-2">When power consumption is known</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Impedance Method</td>
                      <td className="py-2 font-mono">I = V / Z</td>
                      <td className="py-2">AC circuits with impedance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">How do I calculate current in a circuit?</h3>
                <p className="text-sm text-muted-foreground">Current is calculated using Ohm&apos;s Law: I = V / R, where I is current in amperes, V is voltage in volts, and R is resistance in ohms. For example, 12V across 100Ω gives 0.12A or 120mA of current.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What is the difference between AC and DC current?</h3>
                <p className="text-sm text-muted-foreground">DC (Direct Current) flows in one direction constantly, while AC (Alternating Current) reverses direction periodically. DC is used in batteries and electronics, while AC powers homes and businesses through the electrical grid.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How do I calculate current from power and voltage?</h3>
                <p className="text-sm text-muted-foreground">Use the formula I = P / V, where P is power in watts and V is voltage. For example, a 60W bulb at 120V draws 0.5A of current (60 ÷ 120 = 0.5).</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What is impedance in AC circuits?</h3>
                <p className="text-sm text-muted-foreground">Impedance (Z) is the total opposition to AC current flow, combining resistance and reactance. It&apos;s measured in ohms like resistance but accounts for frequency-dependent effects in capacitors and inductors.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How do I convert between A, mA, and µA?</h3>
                <p className="text-sm text-muted-foreground">1 Ampere (A) = 1,000 milliamperes (mA) = 1,000,000 microamperes (µA). To convert A to mA, multiply by 1,000. To convert mA to µA, multiply by 1,000.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
      </div>
    </div>
  );
}
