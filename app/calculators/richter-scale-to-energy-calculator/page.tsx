"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RichterResult {
  magnitude: number;
  energyJoules: number;
  energyTNT: number;
  energyKilotons: number;
  equivalentEvents: Array<{ name: string; magnitude: number; description: string }>;
  intensityLevel: string;
  damageDescription: string;
  frequencyDescription: string;
}

export default function RichterScaleToEnergyCalculatorPage() {
  const [magnitude, setMagnitude] = useState<string>("");
  const [result, setResult] = useState<RichterResult | null>(null);

  const calculate = () => {
    const magNum = parseFloat(magnitude);
    if (isNaN(magNum) || magNum < 0) return;

    // Energy calculation using Gutenberg-Richter formula
    // log10(E) = 4.8 + 1.5M where E is in joules
    const logE = 4.8 + 1.5 * magNum;
    const energyJoules = Math.pow(10, logE);

    // Convert to TNT equivalent (1 ton TNT = 4.184 × 10^9 joules)
    const energyTNT = energyJoules / (4.184 * Math.pow(10, 9));
    const energyKilotons = energyTNT / 1000;

    // Determine intensity level
    let intensityLevel = "";
    let damageDescription = "";
    let frequencyDescription = "";

    if (magNum < 2) {
      intensityLevel = "Micro";
      damageDescription = "Not felt. Detected only by seismographs.";
      frequencyDescription = "Millions per year worldwide";
    } else if (magNum < 3) {
      intensityLevel = "Minor";
      damageDescription = "Felt by some people. No damage.";
      frequencyDescription = "About 100,000 per year";
    } else if (magNum < 4) {
      intensityLevel = "Light";
      damageDescription = "Felt by many. Slight movement of objects.";
      frequencyDescription = "About 10,000 per year";
    } else if (magNum < 5) {
      intensityLevel = "Moderate";
      damageDescription = "Felt by all. Minor damage to buildings.";
      frequencyDescription = "About 1,000 per year";
    } else if (magNum < 6) {
      intensityLevel = "Strong";
      damageDescription = "Damage to poorly built structures. Slight to moderate damage to well-built buildings.";
      frequencyDescription = "About 100 per year";
    } else if (magNum < 7) {
      intensityLevel = "Major";
      damageDescription = "Serious damage over large areas. Buildings may collapse.";
      frequencyDescription = "About 10-15 per year";
    } else if (magNum < 8) {
      intensityLevel = "Great";
      damageDescription = "Severe damage over large areas. Many buildings destroyed.";
      frequencyDescription = "About 1-2 per year";
    } else {
      intensityLevel = "Mega";
      damageDescription = "Total destruction. Ground waves visible. Landscape changes.";
      frequencyDescription = "Once every 5-10 years";
    }

    // Equivalent events for comparison
    const equivalentEvents = [
      { name: "Atomic bomb (Hiroshima)", magnitude: 5.0, description: "~15 kilotons TNT" },
      { name: "Largest H-bomb", magnitude: 7.0, description: "~50 megatons TNT" },
      { name: "2011 Japan Earthquake", magnitude: 9.0, description: "Tōhoku earthquake" },
      { name: "1960 Chile Earthquake", magnitude: 9.5, description: "Largest recorded" },
    ];

    setResult({
      magnitude: magNum,
      energyJoules: parseFloat(energyJoules.toExponential(2)),
      energyTNT: parseFloat(energyTNT.toExponential(2)),
      energyKilotons: parseFloat(energyKilotons.toFixed(2)),
      equivalentEvents,
      intensityLevel,
      damageDescription,
      frequencyDescription,
    });
  };

  const reset = () => {
    setMagnitude("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Richter Scale to Energy Calculator – Convert Earthquake Magnitude to Energy
          </h1>
          <p className="text-muted-foreground">
            Understand the true power of earthquakes with our Richter Scale to Energy Calculator.
            Enter a magnitude value to see the equivalent energy release in joules and TNT
            equivalent — putting seismic events into a real-world perspective.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="magnitude">Earthquake Magnitude</Label>
                <Input
                  id="magnitude"
                  type="number"
                  step="0.1"
                  value={magnitude}
                  onChange={(e) => setMagnitude(e.target.value)}
                  placeholder="e.g., 6.5"
                />
                <p className="text-xs text-muted-foreground">
                  Range: 0-10+ (largest recorded: 9.5)
                </p>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Quick Reference:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 3.0 = Minor (felt locally)</li>
                  <li>• 5.0 = Moderate (some damage)</li>
                  <li>• 7.0 = Major (serious damage)</li>
                  <li>• 9.0 = Great (catastrophic)</li>
                </ul>
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
              <h3 className="text-lg font-semibold mb-4">Energy Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Magnitude</p>
                    <p className="text-4xl font-bold text-primary">{result.magnitude}</p>
                    <p className="text-sm mt-1">{result.intensityLevel}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Energy (Joules):</span>
                      <span className="font-mono text-sm">{result.energyJoules} J</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">TNT Equivalent:</span>
                      <span className="font-mono text-sm">{result.energyTNT} tons</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">In Kilotons:</span>
                      <span className="font-mono text-sm">{result.energyKilotons} kt</span>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-2">Expected Effects</p>
                    <p className="text-sm text-muted-foreground">{result.damageDescription}</p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-2">Frequency</p>
                    <p className="text-sm text-muted-foreground">{result.frequencyDescription}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Comparison to Known Events</h4>
                    <div className="space-y-2">
                      {result.equivalentEvents.map((event, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>{event.name}</span>
                          <span className="font-mono">M{event.magnitude}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Note:</strong> Each whole number increase represents approximately
                      31.6× more energy release (10^1.5).
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter magnitude and click Calculate to see energy equivalent</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Earthquake Energy
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  The Richter scale is logarithmic — each whole number increase
                  represents a tenfold increase in amplitude and ~31.6× more energy:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Formula:</strong> log₁₀(E) = 4.8 + 1.5M (E in joules)
                  </li>
                  <li>
                    <strong>Magnitude 5:</strong> Equivalent to Hiroshima atomic bomb
                  </li>
                  <li>
                    <strong>Magnitude 7:</strong> Equivalent to largest H-bombs
                  </li>
                  <li>
                    <strong>Magnitude 9:</strong> Can cause tsunamis and global effects
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> The Richter scale has been largely replaced by
                  the Moment Magnitude Scale (Mw) for scientific purposes, but the
                  energy calculations remain similar.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Richter Scale to Energy Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter the earthquake magnitude</p>
                    <p>Input the Richter scale magnitude value. For example, enter &quot;6.5&quot; for a magnitude 6.5 earthquake.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click Calculate</p>
                    <p>The calculator uses the Gutenberg-Richter formula to convert magnitude to energy in joules and TNT equivalent.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review the results</p>
                    <p>See the energy release in joules, tons of TNT, intensity level, expected damage, and comparison to known seismic events.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Earthquake Magnitude Scale Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Magnitude</th>
                      <th className="text-left py-3 px-2 font-semibold">Classification</th>
                      <th className="text-left py-3 px-2 font-semibold">Energy (Joules)</th>
                      <th className="text-left py-3 px-2 font-semibold">TNT Equivalent</th>
                      <th className="text-left py-3 px-2 font-semibold">Annual Frequency</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">&lt; 2.0</td>
                      <td className="py-3 px-2">Micro</td>
                      <td className="py-3 px-2 font-mono text-xs">~10^7</td>
                      <td className="py-3 px-2">~2 kg</td>
                      <td className="py-3 px-2">Millions</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">2.0-2.9</td>
                      <td className="py-3 px-2">Minor</td>
                      <td className="py-3 px-2 font-mono text-xs">~10^8</td>
                      <td className="py-3 px-2">~25 kg</td>
                      <td className="py-3 px-2">~100,000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">3.0-3.9</td>
                      <td className="py-3 px-2">Light</td>
                      <td className="py-3 px-2 font-mono text-xs">~10^9</td>
                      <td className="py-3 px-2">~0.25 tons</td>
                      <td className="py-3 px-2">~10,000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">4.0-4.9</td>
                      <td className="py-3 px-2">Moderate</td>
                      <td className="py-3 px-2 font-mono text-xs">~10^10</td>
                      <td className="py-3 px-2">~2.5 tons</td>
                      <td className="py-3 px-2">~1,000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">5.0-5.9</td>
                      <td className="py-3 px-2">Strong</td>
                      <td className="py-3 px-2 font-mono text-xs">~10^12</td>
                      <td className="py-3 px-2">~250 tons</td>
                      <td className="py-3 px-2">~100</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">6.0-6.9</td>
                      <td className="py-3 px-2">Major</td>
                      <td className="py-3 px-2 font-mono text-xs">~10^14</td>
                      <td className="py-3 px-2">~25 kilotons</td>
                      <td className="py-3 px-2">~15</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">7.0-7.9</td>
                      <td className="py-3 px-2">Great</td>
                      <td className="py-3 px-2 font-mono text-xs">~10^15</td>
                      <td className="py-3 px-2">~2.5 megatons</td>
                      <td className="py-3 px-2">~1-2</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">8.0+</td>
                      <td className="py-3 px-2">Mega</td>
                      <td className="py-3 px-2 font-mono text-xs">~10^17</td>
                      <td className="py-3 px-2">~250 megatons</td>
                      <td className="py-3 px-2">~1 per year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Energy values are approximate. Each whole magnitude increase represents ~31.6x more energy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Notable Earthquakes in History
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">1960 Chile (Magnitude 9.5)</h4>
                  <p>
                    The largest earthquake ever recorded. It released about 2.5 x 10^19 joules — equivalent to 6 billion tons of TNT. The quake triggered a tsunami that crossed the Pacific, causing damage in Hawaii, Japan, and the Philippines.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">2004 Indian Ocean (Magnitude 9.1-9.3)</h4>
                  <p>
                    One of the deadliest natural disasters in history. The undersea earthquake displaced massive amounts of water, generating a tsunami that killed over 230,000 people across 14 countries.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">2011 Tohoku, Japan (Magnitude 9.0)</h4>
                  <p>
                    The most powerful earthquake in Japan&apos;s recorded history. It moved Honshu island 2.4 meters east and shifted Earth&apos;s axis by 10-25 cm. The resulting tsunami caused the Fukushima nuclear disaster.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">1906 San Francisco (Magnitude 7.9)</h4>
                  <p>
                    Devastated San Francisco with shaking lasting 45-60 seconds. Fires ignited by ruptured gas lines burned for days, causing more damage than the earthquake itself. Estimated 3,000 deaths.
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
                  <h4 className="font-medium text-foreground mb-2">What does each magnitude increase mean?</h4>
                  <p>
                    Each whole number increase means 10 times greater wave amplitude and about 31.6 times more energy. A magnitude 6 earthquake has 10x the amplitude and ~32x the energy of a magnitude 5. This is why a magnitude 8 is vastly more destructive than a magnitude 6.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Is there a maximum earthquake magnitude?</h4>
                  <p>
                    Theoretically, magnitude 10 would require a fault encircling Earth — impossible with our planet&apos;s tectonic structure. Realistically, magnitude 9.5-9.7 appears to be the practical limit based on the largest faults we&apos;ve observed.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How is earthquake energy measured?</h4>
                  <p>
                    Seismographs record ground motion. Scientists analyze the seismic waves to determine magnitude. Energy is then calculated using the Gutenberg-Richter formula. Modern methods use seismic moment (Mw), which accounts for fault area, slip distance, and rock rigidity.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why use TNT equivalent?</h4>
                  <p>
                    Joules are abstract for most people. TNT equivalent provides an intuitive comparison — everyone understands that a &quot;kiloton&quot; is a nuclear bomb scale. It helps visualize the enormous energy involved in earthquakes.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can small earthquakes prevent big ones?</h4>
                  <p>
                    No. A magnitude 4 releases about 1/1000th the energy of a magnitude 6. You&apos;d need 1,000 magnitude 4 quakes to release the energy of one magnitude 6. Small quakes don&apos;meaningfully reduce stress on major faults.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
