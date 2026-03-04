"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TorqueToPowerConverterPage() {
  const [torque, setTorque] = useState<string>("");
  const [rpm, setRpm] = useState<string>("");
  const [torqueUnit, setTorqueUnit] = useState<"nm" | "lbft">("nm");
  const [outputUnit, setOutputUnit] = useState<"hp" | "kw">("hp");
  const [result, setResult] = useState<{
    power: number;
    torqueNm: number;
    rpm: number;
    formula: string;
  } | null>(null);

  const calculate = () => {
    const torqueVal = parseFloat(torque);
    const rpmVal = parseFloat(rpm);

    if (isNaN(torqueVal) || isNaN(rpmVal) || torqueVal <= 0 || rpmVal <= 0) return;

    // Convert torque to Nm if in lb-ft
    const torqueInNm = torqueUnit === "lbft" ? torqueVal * 1.35582 : torqueVal;

    // Power calculation formulas:
    // kW = (Torque (Nm) × RPM) / 9549.3
    // HP = (Torque (lb-ft) × RPM) / 5252
    // Or: HP = kW × 1.34102

    let power: number;
    let formula: string;

    if (outputUnit === "kw") {
      power = (torqueInNm * rpmVal) / 9549.3;
      formula = `Power (kW) = (Torque (Nm) × RPM) / 9549.3`;
    } else {
      // HP from Nm and RPM: HP = (Nm × RPM) / 7127
      power = (torqueInNm * rpmVal) / 7127;
      formula = `Power (HP) = (Torque (Nm) × RPM) / 7127`;
    }

    setResult({
      power: Math.round(power * 100) / 100,
      torqueNm: Math.round(torqueInNm * 100) / 100,
      rpm: rpmVal,
      formula,
    });
  };

  const reset = () => {
    setTorque("");
    setRpm("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Torque to Power Converter – Convert Engine Torque & RPM to HP or kW
          </h1>
          <p className="text-muted-foreground">
            Calculate your engine's power output from torque and RPM with our Torque-to-Power
            Converter. Enter torque in Nm or lb-ft along with RPM to get horsepower or kilowatts
            instantly — perfect for automotive enthusiasts and engineers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="torque">Torque</Label>
                <div className="flex gap-2">
                  <Input
                    id="torque"
                    type="number"
                    placeholder="e.g., 400"
                    value={torque}
                    onChange={(e) => setTorque(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={torqueUnit} onValueChange={(v) => setTorqueUnit(v as "nm" | "lbft")}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nm">Nm</SelectItem>
                      <SelectItem value="lbft">lb-ft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rpm">Engine Speed (RPM)</Label>
                <Input
                  id="rpm"
                  type="number"
                  placeholder="e.g., 5000"
                  value={rpm}
                  onChange={(e) => setRpm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="outputUnit">Output Unit</Label>
                <Select value={outputUnit} onValueChange={(v) => setOutputUnit(v as "hp" | "kw")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hp">Horsepower (HP)</SelectItem>
                    <SelectItem value="kw">Kilowatts (kW)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Power Calculation Result</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Power Output</p>
                    <p className="text-3xl font-bold text-primary">
                      {result.power} {outputUnit === "hp" ? "HP" : "kW"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Torque</p>
                      <p className="text-lg font-bold">{result.torqueNm} Nm</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Engine Speed</p>
                      <p className="text-lg font-bold">{result.rpm} RPM</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Formula Used</p>
                    <p className="font-mono text-sm">{result.formula}</p>
                  </div>

                  {outputUnit === "hp" && (
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <strong>Note:</strong> Peak power occurs at a specific RPM. This calculation
                        shows power at the entered torque and RPM point.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Understanding Torque and Power</h3>
          <p className="text-muted-foreground text-sm mb-3">
            Torque is the rotational force an engine produces, while power (HP or kW) is the rate at
            which work is done. They're related through engine speed (RPM):
          </p>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>kW = (Torque (Nm) × RPM) / 9549.3</div>
            <div>HP = (Torque (Nm) × RPM) / 7127</div>
            <div>HP = (Torque (lb-ft) × RPM) / 5252</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Key insight:</strong> At 5252 RPM, torque (lb-ft) and horsepower are always equal.
            This is why dyno charts always cross at this point.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">How to Convert Torque to Power</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Torque Value</h3>
                <p className="text-sm text-muted-foreground">Input your engine's torque measurement in Newton-meters (Nm) or pound-feet (lb-ft).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Add Engine RPM</h3>
                <p className="text-sm text-muted-foreground">Enter the engine speed at which you want to calculate power output.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get Power Output</h3>
                <p className="text-sm text-muted-foreground">Instantly receive horsepower (HP) or kilowatts (kW) with the formula used.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Torque to Power Converter</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Dual Unit Support</h3>
              <p className="text-sm text-muted-foreground">Convert between metric (Nm, kW) and imperial (lb-ft, HP) units seamlessly for international compatibility.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Accurate Formulas</h3>
              <p className="text-sm text-muted-foreground">Uses industry-standard equations: kW = (Nm × RPM) / 9549.3 and HP = (lb-ft × RPM) / 5252.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Dyno Chart Insight</h3>
              <p className="text-sm text-muted-foreground">Understand why torque and horsepower curves intersect at 5252 RPM on dynamometer graphs.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Engine Tuning Reference</h3>
              <p className="text-sm text-muted-foreground">Perfect for tuners, mechanics, and enthusiasts analyzing engine performance modifications.</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold mb-3">Power Conversion Formulas</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">From</th>
                  <th className="text-left py-2">To</th>
                  <th className="text-left py-2">Formula</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Nm + RPM</td>
                  <td className="py-2">kW</td>
                  <td className="py-2 font-mono">kW = (Nm × RPM) / 9549.3</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Nm + RPM</td>
                  <td className="py-2">HP</td>
                  <td className="py-2 font-mono">HP = (Nm × RPM) / 7127</td>
                </tr>
                <tr>
                  <td className="py-2">lb-ft + RPM</td>
                  <td className="py-2">HP</td>
                  <td className="py-2 font-mono">HP = (lb-ft × RPM) / 5252</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What is the formula to convert torque to horsepower?</h3>
              <p className="text-sm text-muted-foreground">Horsepower = (Torque × RPM) / 5252 when using lb-ft. For Nm, use HP = (Nm × RPM) / 7127. This formula comes from the definition of horsepower as 550 foot-pounds per second.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why do torque and horsepower cross at 5252 RPM?</h3>
              <p className="text-sm text-muted-foreground">The number 5252 comes from the conversion factor between lb-ft/min and horsepower. At exactly 5252 RPM, the numerical values of torque (lb-ft) and horsepower are always equal, which is why dyno charts intersect at this point.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do I convert Nm to lb-ft?</h3>
              <p className="text-sm text-muted-foreground">Multiply Nm by 0.7376 to get lb-ft. For example, 400 Nm × 0.7376 = 295 lb-ft. Conversely, divide lb-ft by 0.7376 (or multiply by 1.356) to get Nm.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What's more important: torque or horsepower?</h3>
              <p className="text-sm text-muted-foreground">Torque determines low-end pulling power and acceleration from a stop. Horsepower determines top speed and high-RPM performance. Both matter—torque gets you moving, horsepower keeps you accelerating.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How accurate is this torque to power calculation?</h3>
              <p className="text-sm text-muted-foreground">This calculation provides theoretical power at the crank. Actual wheel horsepower will be 10-20% lower due to drivetrain losses. For precise measurements, use a chassis dynamometer.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Related Automotive Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/horsepower-to-kw-converter" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Horsepower to kW Converter</h3>
              <p className="text-sm text-muted-foreground">Convert engine power between HP and kilowatts instantly.</p>
            </a>
            <a href="/calculators/engine-displacement-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Engine Displacement Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate engine CC from bore, stroke, and cylinder count.</p>
            </a>
            <a href="/calculators/0-100-acceleration-estimator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">0-100 km/h Acceleration Estimator</h3>
              <p className="text-sm text-muted-foreground">Estimate your car's acceleration time based on power and weight.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
