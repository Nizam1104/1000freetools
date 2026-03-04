"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BeltTensionCalculator() {
  const [power, setPower] = useState<string>("");
  const [pulleyDiameter, setPulleyDiameter] = useState<string>("");
  const [rpm, setRpm] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(power);
    const D = parseFloat(pulleyDiameter);
    const N = parseFloat(rpm);

    if (P > 0 && D > 0 && N > 0) {
      // Torque: T = P / ω = P × 60 / (2π × N)
      const torque = (P * 60) / (2 * Math.PI * N);
      // Belt tension: F = T / r = 2T / D
      const tension = (2 * torque) / D;
      // Recommended initial tension (2-3% of working tension)
      const initialTension = tension * 0.025;

      setResults({
        torque: Math.round(torque * 100) / 100,
        tension: Math.round(tension * 100) / 100,
        initialTension: Math.round(initialTension * 100) / 100,
      });
    }
  };

  const reset = () => {
    setPower(""); setPulleyDiameter(""); setRpm(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Belt Tension Calculator – Calculate Belt Drive Tension</CardTitle>
          <CardDescription>
            Calculate belt tension and torque for belt drive systems. Determine proper initial tension for installation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Power (kW)</Label><Input value={power} onChange={e => setPower(e.target.value)} /></div>
              <div><Label>Pulley Diameter (m)</Label><Input value={pulleyDiameter} onChange={e => setPulleyDiameter(e.target.value)} /></div>
              <div><Label>Speed (RPM)</Label><Input value={rpm} onChange={e => setRpm(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Tension</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Torque</p>
                    <p className="text-2xl font-bold">{results.torque} N·m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Working Tension</p>
                    <p className="text-2xl font-bold">{results.tension} N</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Initial Tension</p>
                    <p className="text-xl font-bold">{results.initialTension} N</p>
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
              How to Use This Belt Tension Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the power being transmitted</p>
                  <p>Input the power in kilowatts (kW) that your belt drive system needs to transmit. This is typically determined by your motor or engine specifications.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Input pulley diameter and speed</p>
                  <p>Enter the pulley diameter in meters and the rotational speed in RPM. These values determine the belt velocity and torque requirements.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Calculate and review results</p>
                  <p>Click Calculate to see the torque, working tension, and recommended initial tension for proper belt installation.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Belt Tension Reference Values
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Belt Type</th>
                    <th className="text-left py-3 px-2 font-semibold">Initial Tension %</th>
                    <th className="text-left py-3 px-2 font-semibold">Max Operating Temp</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">V-Belt (Classical)</td>
                    <td className="py-3 px-2">2-3%</td>
                    <td className="py-3 px-2">60°C (140°F)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">V-Belt (Narrow)</td>
                    <td className="py-3 px-2">2-3%</td>
                    <td className="py-3 px-2">60°C (140°F)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Timing Belt</td>
                    <td className="py-3 px-2">1-2%</td>
                    <td className="py-3 px-2">80°C (176°F)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Flat Belt</td>
                    <td className="py-3 px-2">1.5-2.5%</td>
                    <td className="py-3 px-2">50°C (122°F)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Poly-V Belt</td>
                    <td className="py-3 px-2">2-3%</td>
                    <td className="py-3 px-2">70°C (158°F)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Belt Tension
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Belt Tension Matters</h4>
                <p>
                  Proper belt tension is critical for efficient power transmission. Too little tension causes slippage,
                  heat buildup, and premature wear. Too much tension increases bearing loads, reduces belt life, and
                  wastes energy. The goal is finding the minimum tension that prevents slippage under maximum load.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How the Calculation Works</h4>
                <p>
                  This calculator uses the fundamental belt drive equations. First, it calculates torque from power
                  and speed using T = P × 60 / (2π × N). Then it determines working tension from torque and pulley
                  radius using F = 2T / D. The recommended initial tension is set at 2.5% of working tension, which
                  provides a safety margin for proper operation.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Tight Side vs Slack Side Tension</h4>
                <p>
                  In a belt drive, the tight side carries more tension than the slack side. The difference between
                  these tensions equals the effective tension that transmits power. Initial tension is set so that
                  even under load, the slack side maintains enough tension to keep the belt engaged with the pulley.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Proper Belt Installation
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Check tension after run-in</p>
                  <p>New belts stretch during the first few hours of operation. Re-tension after 24 hours of use.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use a tension gauge</p>
                  <p>For critical applications, use a sonic tension meter or force-deflection gauge for accurate measurement.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Align pulleys properly</p>
                  <p>Misalignment causes uneven wear and premature failure. Check alignment with a straightedge or laser tool.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Replace worn belts in matched sets</p>
                  <p>On multi-belt drives, replace all belts together. Mixing old and new belts causes uneven load distribution.</p>
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
                <h4 className="font-medium text-foreground mb-2">How do I know if my belt tension is correct?</h4>
                <p>
                  A properly tensioned belt should deflect about 1/64 inch per inch of span length when pressed
                  with moderate thumb pressure. There should be no squealing during startup or under load. The belt
                  should run smoothly without excessive vibration or wandering on the pulleys.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What happens if belt tension is too high?</h4>
                <p>
                  Excessive tension increases bearing loads, which can lead to premature bearing failure. It also
                  stretches the belt, reduces efficiency, and increases energy consumption. High tension can cause
                  the belt to crack on the back side and fail prematurely.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What causes belt slippage?</h4>
                <p>
                  Slippage occurs when tension is too low, the pulleys are worn or contaminated with oil, or the
                  load exceeds the drive design. Slippage generates heat, which damages the belt and reduces power
                  transmission efficiency. Check tension first, then inspect pulley condition.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How often should I check belt tension?</h4>
                <p>
                  Check tension during installation, after the 24-hour run-in period, and then as part of regular
                  maintenance. For critical applications, monthly checks are recommended. For general industrial
                  use, quarterly inspections are usually sufficient.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I use this calculator for timing belts?</h4>
                <p>
                  This calculator provides a general estimate. Timing belts require lower initial tension (1-2%)
                  because they transmit power through tooth engagement rather than friction. For precise timing
                  belt calculations, consult the manufacturer specifications for your specific belt type.
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
                href="/calculators/bolt-torque-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Bolt Torque Calculator</span>
                <p className="text-muted-foreground">Calculate recommended tightening torque for bolts based on size and grade</p>
              </a>
              <a
                href="/calculators/pulley-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Pulley Calculator</span>
                <p className="text-muted-foreground">Calculate pulley speeds, ratios, and belt length for belt drive systems</p>
              </a>
              <a
                href="/calculators/torque-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Torque Calculator</span>
                <p className="text-muted-foreground">Calculate torque from force and distance for mechanical applications</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
