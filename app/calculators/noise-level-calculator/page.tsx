"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NoiseLevelCalculator() {
  const [sources, setSources] = useState<{ name: string; db: string }[]>([{ name: "", db: "" }]);
  const [distance, setDistance] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const addSource = () => setSources([...sources, { name: "", db: "" }]);
  const removeSource = (i: number) => setSources(sources.filter((_, idx) => idx !== i));
  const updateSource = (i: number, field: string, val: string) => {
    const newSources = [...sources];
    (newSources[i] as any)[field] = val;
    setSources(newSources);
  };

  const calculate = () => {
    let totalIntensity = 0;
    sources.forEach(s => {
      const db = parseFloat(s.db);
      if (db > 0) totalIntensity += Math.pow(10, db / 10);
    });

    if (totalIntensity > 0) {
      let combinedDb = 10 * Math.log10(totalIntensity);
      
      // Distance attenuation
      if (distance && parseFloat(distance) > 0) {
        const d = parseFloat(distance);
        combinedDb -= 20 * Math.log10(d);
      }

      setResults({
        combined: Math.round(combinedDb * 10) / 10,
        intensity: totalIntensity,
      });
    }
  };

  const reset = () => {
    setSources([{ name: "", db: "" }]);
    setDistance("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Noise Level Calculator – Combine Multiple Sound Sources</CardTitle>
          <CardDescription>
            Calculate the combined noise level from multiple sound sources. Our calculator adds decibels correctly and accounts for distance attenuation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sources.map((source, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-6">
                  <Label>Source</Label>
                  <Input value={source.name} onChange={e => updateSource(i, "name", e.target.value)} placeholder="Name" />
                </div>
                <div className="col-span-5">
                  <Label>Level (dB)</Label>
                  <Input type="number" value={source.db} onChange={e => updateSource(i, "db", e.target.value)} placeholder="dB" />
                </div>
                <div className="col-span-1">
                  <Button variant="outline" size="sm" onClick={() => removeSource(i)} disabled={sources.length === 1}>×</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addSource}>+ Add Source</Button>

            <div>
              <Label>Distance from Source (m) - optional</Label>
              <Input value={distance} onChange={e => setDistance(e.target.value)} placeholder="For attenuation calculation" />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Total dB</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Combined Noise Level</p>
                <p className="text-4xl font-bold">{results.combined} dB</p>
                {distance && <p className="text-xs text-muted-foreground mt-2">at {distance}m distance</p>}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Noise Level Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Add your sound sources</p>
                  <p>Enter each noise source with its decibel level. Add multiple sources like machines, traffic, or equipment.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Set distance (optional)</p>
                  <p>Enter distance from sources to calculate attenuation. Sound decreases by 6 dB when distance doubles.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Calculate total noise</p>
                  <p>Click Calculate Total dB to see combined noise level. Decibels add logarithmically, not linearly.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Sound Levels Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Sound Source</th>
                    <th className="text-right py-3 px-2 font-semibold">Decibels (dB)</th>
                    <th className="text-left py-3 px-2 font-semibold">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Breathing, rustling leaves</td>
                    <td className="text-right py-3 px-2">10-20 dB</td>
                    <td className="py-3 px-2">Safe</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Quiet library, whisper</td>
                    <td className="text-right py-3 px-2">30-40 dB</td>
                    <td className="py-3 px-2">Safe</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Normal conversation</td>
                    <td className="text-right py-3 px-2">60-65 dB</td>
                    <td className="py-3 px-2">Safe</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">City traffic, vacuum cleaner</td>
                    <td className="text-right py-3 px-2">80-85 dB</td>
                    <td className="py-3 px-2">Moderate (8hr limit)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Motorcycle, power drill</td>
                    <td className="text-right py-3 px-2">90-100 dB</td>
                    <td className="py-3 px-2">High (15min limit)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Rock concert, siren</td>
                    <td className="text-right py-3 px-2">110-120 dB</td>
                    <td className="py-3 px-2">Dangerous (instant damage)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Decibel Addition
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Decibels Do Not Add Normally</h4>
                <p>
                  Decibels use a logarithmic scale, not linear. Two 80 dB sources do not make 160 dB — they
                  make about 83 dB. This is because decibels measure ratios of sound intensity. Each 10 dB
                  increase represents a 10x increase in intensity. To combine sounds, convert to intensity,
                  add, then convert back to decibels.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">The 3 dB Rule</h4>
                <p>
                  Adding two equal sound sources increases level by 3 dB. Two 80 dB machines = 83 dB total.
                  Adding a source 10 dB quieter than the dominant source barely changes the total. A 70 dB
                  source added to 80 dB only increases total to about 80.4 dB — essentially unchanged.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Distance Attenuation</h4>
                <p>
                  Sound intensity follows the inverse square law. Doubling distance from a point source
                  reduces level by 6 dB. Tripling distance reduces by about 10 dB. This is why standing
                  farther from speakers or machinery significantly reduces exposure.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Noise Reduction Tips
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Increase distance from sources</p>
                  <p>Moving from 1m to 4m reduces noise by 12 dB. Distance is the simplest noise control.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use hearing protection</p>
                  <p>Quality earplugs reduce 25-30 dB. Earmuffs add another 10-15 dB when worn together.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Add sound absorption</p>
                  <p>Acoustic panels, carpets, and curtains absorb sound energy, reducing reflections and overall levels.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Limit exposure time</p>
                  <p>Reduce time in loud environments. Halve exposure time for every 3 dB increase above 85 dB.</p>
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
                <h4 className="font-medium text-foreground mb-2">How do you add decibels from multiple sources?</h4>
                <p>
                  Convert each dB to intensity: I = 10^(dB/10). Add all intensities. Convert back:
                  dB = 10 × log10(total intensity). For two equal sources, simply add 3 dB to the single
                  source level. For unequal sources, the louder source dominates the total.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is a safe noise level for extended exposure?</h4>
                <p>
                  Below 70 dB is safe for unlimited exposure. 85 dB is the threshold where hearing protection
                  becomes necessary for 8-hour exposure. Every 3 dB increase halves safe exposure time:
                  88 dB = 4 hours, 91 dB = 2 hours, 94 dB = 1 hour, 100 dB = 15 minutes.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why does sound decrease with distance?</h4>
                <p>
                  Sound spreads out as it travels, distributing energy over a larger area. For a point source
                  in free space, intensity follows the inverse square law. Doubling distance quarters the
                  intensity, which equals a 6 dB reduction. Real environments have reflections that modify this.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I compare dB levels directly?</h4>
                <p>
                  Only if they use the same weighting. dBA (A-weighted) approximates human hearing and is
                  used for noise regulations. dBC measures low frequencies better. Unweighted dB is rare.
                  Always compare like with like — dBA to dBA, not dBA to dBC.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How loud is too loud for children?</h4>
                <p>
                  Children's ears are more sensitive. Keep toy noises below 80 dB at the child's ear.
                  Limit exposure to sounds above 85 dB. Use hearing protection at sporting events, fireworks,
                  and concerts. Monitor volume on headphones — many exceed safe levels.
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
                href="/calculators/noise-exposure-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Noise Exposure Calculator</span>
                <p className="text-muted-foreground">Calculate safe exposure time and noise dose percentage</p>
              </a>
              <a
                href="/calculators/sound-pressure-level-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Sound Pressure Level Calculator</span>
                <p className="text-muted-foreground">Convert between sound pressure and decibels</p>
              </a>
              <a
                href="/calculators/reverberation-time-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Reverberation Time Calculator</span>
                <p className="text-muted-foreground">Calculate room acoustics and decay time</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
