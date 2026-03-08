"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RpmCalculator() {
  const [mode, setMode] = useState<"pulley" | "gear" | "motor">("pulley");
  const [driverDiameter, setDriverDiameter] = useState<string>("");
  const [drivenDiameter, setDrivenDiameter] = useState<string>("");
  const [driverRpm, setDriverRpm] = useState<string>("");
  const [driverTeeth, setDriverTeeth] = useState<string>("");
  const [drivenTeeth, setDrivenTeeth] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");
  const [poles, setPoles] = useState<string>("");
  const [slip, setSlip] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    switch (mode) {
      case "pulley":
        const D1 = parseFloat(driverDiameter);
        const D2 = parseFloat(drivenDiameter);
        const N1 = parseFloat(driverRpm);
        if (D1 > 0 && D2 > 0 && N1 > 0) {
          const N2 = (N1 * D1) / D2;
          setResults({ rpm: Math.round(N2 * 10) / 10, ratio: (N1 / N2).toFixed(2) });
        }
        break;
      case "gear":
        const T1 = parseFloat(driverTeeth);
        const T2 = parseFloat(drivenTeeth);
        const N1g = parseFloat(driverRpm);
        if (T1 > 0 && T2 > 0 && N1g > 0) {
          const N2g = (N1g * T1) / T2;
          setResults({ rpm: Math.round(N2g * 10) / 10, ratio: (T2 / T1).toFixed(2) });
        }
        break;
      case "motor":
        const f = parseFloat(frequency);
        const p = parseFloat(poles);
        const s = parseFloat(slip) / 100 || 0;
        if (f > 0 && p > 0) {
          const syncRpm = (120 * f) / p;
          const actualRpm = syncRpm * (1 - s);
          setResults({ syncRpm, actualRpm: Math.round(actualRpm * 10) / 10, slip: s * 100 });
        }
        break;
    }
  };

  const reset = () => {
    setDriverDiameter(""); setDrivenDiameter(""); setDriverRpm("");
    setDriverTeeth(""); setDrivenTeeth(""); setFrequency(""); setPoles(""); setSlip("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Button variant={mode === "pulley" ? "default" : "outline"} size="sm" onClick={() => setMode("pulley")}>Pulley</Button>
              <Button variant={mode === "gear" ? "default" : "outline"} size="sm" onClick={() => setMode("gear")}>Gear</Button>
              <Button variant={mode === "motor" ? "default" : "outline"} size="sm" onClick={() => setMode("motor")}>Motor</Button>
            </div>

            {mode === "pulley" && (
              <>
                <p className="text-sm text-muted-foreground">N₂ = N₁ × (D₁ / D₂)</p>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label>Driver Diameter</Label><Input value={driverDiameter} onChange={e => setDriverDiameter(e.target.value)} /></div>
                  <div><Label>Driven Diameter</Label><Input value={drivenDiameter} onChange={e => setDrivenDiameter(e.target.value)} /></div>
                  <div><Label>Driver RPM</Label><Input value={driverRpm} onChange={e => setDriverRpm(e.target.value)} /></div>
                </div>
              </>
            )}

            {mode === "gear" && (
              <>
                <p className="text-sm text-muted-foreground">N₂ = N₁ × (T₁ / T₂)</p>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label>Driver Teeth</Label><Input value={driverTeeth} onChange={e => setDriverTeeth(e.target.value)} /></div>
                  <div><Label>Driven Teeth</Label><Input value={drivenTeeth} onChange={e => setDrivenTeeth(e.target.value)} /></div>
                  <div><Label>Driver RPM</Label><Input value={driverRpm} onChange={e => setDriverRpm(e.target.value)} /></div>
                </div>
              </>
            )}

            {mode === "motor" && (
              <>
                <p className="text-sm text-muted-foreground">Sync RPM = 120f / p</p>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label>Frequency (Hz)</Label><Input value={frequency} onChange={e => setFrequency(e.target.value)} /></div>
                  <div><Label>Poles</Label><Input value={poles} onChange={e => setPoles(e.target.value)} /></div>
                  <div><Label>Slip (%)</Label><Input value={slip} onChange={e => setSlip(e.target.value)} /></div>
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate RPM</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                {mode === "motor" ? (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Synchronous Speed</p>
                      <p className="text-3xl font-bold">{results.syncRpm} RPM</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Actual Speed ({results.slip}% slip)</p>
                      <p className="text-3xl font-bold">{results.actualRpm} RPM</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Output RPM</p>
                      <p className="text-4xl font-bold">{results.rpm}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ratio</p>
                      <p className="text-2xl font-bold">1 : {results.ratio}</p>
                    </div>
                  </>
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
              How to Use This RPM Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Select your calculation mode</p>
                  <p>Choose Pulley for belt drives, Gear for gear trains, or Motor for AC motor speed calculations.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your parameters</p>
                  <p>Input driver/driven diameters for pulleys, tooth counts for gears, or frequency/poles for motors.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Calculate output speed</p>
                  <p>Click Calculate RPM to see the output speed and gear ratio. Results appear instantly below.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Motor Synchronous Speeds
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Poles</th>
                    <th className="text-left py-3 px-2 font-semibold">50 Hz Sync RPM</th>
                    <th className="text-left py-3 px-2 font-semibold">60 Hz Sync RPM</th>
                    <th className="text-left py-3 px-2 font-semibold">Typical Application</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">2</td>
                    <td className="py-3 px-2">3000</td>
                    <td className="py-3 px-2">3600</td>
                    <td className="py-3 px-2">High-speed pumps, compressors</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">4</td>
                    <td className="py-3 px-2">1500</td>
                    <td className="py-3 px-2">1800</td>
                    <td className="py-3 px-2">General purpose motors</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">6</td>
                    <td className="py-3 px-2">1000</td>
                    <td className="py-3 px-2">1200</td>
                    <td className="py-3 px-2">Fans, blowers, conveyors</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">8</td>
                    <td className="py-3 px-2">750</td>
                    <td className="py-3 px-2">900</td>
                    <td className="py-3 px-2">Low-speed applications</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">10</td>
                    <td className="py-3 px-2">600</td>
                    <td className="py-3 px-2">720</td>
                    <td className="py-3 px-2">High-torque drives</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">12</td>
                    <td className="py-3 px-2">500</td>
                    <td className="py-3 px-2">600</td>
                    <td className="py-3 px-2">Very low-speed equipment</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Actual motor speed is lower than synchronous speed due to slip. Typical slip is 2-5% for induction motors.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding RPM Calculations
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                RPM (revolutions per minute) measures rotational speed. In mechanical systems, you often need to change speed between input and output. Pulleys and gears accomplish this through ratios — a small driver turning a large driven wheel reduces speed but increases torque.
              </p>
              <p>
                For pulley systems, the formula is N₂ = N₁ × (D₁ / D₂). If a 4-inch driver at 1000 RPM drives an 8-inch pulley, output speed is 1000 × (4/8) = 500 RPM. The larger driven pulley turns half as fast but with twice the torque. Gear systems work identically, substituting tooth count for diameter.
              </p>
              <p>
                AC motor speed depends on electrical frequency and magnetic poles. The synchronous speed formula is 120f/p, where f is frequency in Hz and p is pole count. A 4-pole motor on 60 Hz power has a synchronous speed of 120 × 60 / 4 = 1800 RPM. Induction motors run slightly slower due to slip — typically 2-5% below synchronous speed.
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Key principle:</strong> Speed reduction always increases torque proportionally (minus efficiency losses). Halving the RPM roughly doubles the available torque. This trade-off is fundamental to mechanical power transmission.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for RPM System Design
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Match speeds to application requirements</h4>
                <p>
                  Different applications need different speeds. Pumps and fans often run at motor speed (1750-3450 RPM). Conveyors typically need 50-200 RPM. Gearboxes or belt reductions bridge the gap between motor output and load requirements.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Consider belt speed for pulley systems</h4>
                <p>
                  Belt speed = π × diameter × RPM. High belt speeds cause wear and heat. V-belts typically max out around 6500 feet per minute. For a 4-inch pulley at 3600 RPM, belt speed is about 3770 FPM — acceptable for most V-belts.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Account for slip in belt drives</h4>
                <p>
                  Belts slip 1-3% under load, reducing actual output speed slightly. Chain and gear drives have minimal slip. For precision speed requirements, use timing belts, chains, or gears instead of friction belts.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Check center distance constraints</h4>
                <p>
                  Pulley center distance affects belt wrap angle and life. Too close reduces wrap on the small pulley, causing slip. Too far creates belt whip. A good rule: center distance should be 1-1.5 times the large pulley diameter.
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
                <h4 className="font-medium text-foreground mb-2">What is the RPM formula for pulleys?</h4>
                <p>
                  Output RPM = Input RPM × (Driver Diameter / Driven Diameter). A smaller driver turning a larger driven pulley reduces speed. Double the driven diameter and you halve the output RPM while doubling torque.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I calculate gear ratio?</h4>
                <p>
                  Gear ratio = Driven Teeth / Driver Teeth. A 40-tooth gear driven by a 20-tooth gear has a 2:1 ratio. Output speed is half the input speed, and torque doubles (ignoring efficiency losses).
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why does my motor run slower than synchronous speed?</h4>
                <p>
                  Induction motors require slip to produce torque. The rotating magnetic field induces current in the rotor, which requires a speed difference. Typical full-load slip is 2-5%. A 4-pole 60 Hz motor syncs at 1800 RPM but runs around 1725-1750 RPM under load.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I use this for metric pulleys?</h4>
                <p>
                  Yes. The ratio calculation works with any consistent units. Whether you use inches, millimeters, or tooth count, the ratio D₁/D₂ or T₁/T₂ gives the same result. Just keep both measurements in the same units.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What happens if I swap driver and driven?</h4>
                <p>
                  Swapping reverses the ratio. If a 4-inch driver and 8-inch driven gives 2:1 reduction, swapping to 8-inch driver and 4-inch driven gives 1:2 increase — output speed doubles but torque halves. This is called &quot;overdrive.&quot;
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
