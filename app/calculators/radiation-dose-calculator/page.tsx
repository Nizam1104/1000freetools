"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Faqs from "@/components/utils/Faqs";


export default function RadiationDoseCalculator() {
  const [activity, setActivity] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [energy, setEnergy] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const A = parseFloat(activity); // Bq
    const d = parseFloat(distance); // m
    const t = parseFloat(time); // hours
    const E = parseFloat(energy); // MeV

    if (A > 0 && d > 0 && t > 0 && E > 0) {
      // Simplified dose calculation (gamma constant approximation)
      // Dose rate ≈ Γ × A / d² where Γ ≈ 0.5 µSv·m²/(MBq·h) for typical gamma emitters
      const gammaConst = 0.5e-6; // µSv·m²/(MBq·h)
      const A_MBq = A / 1e6;
      const doseRate = gammaConst * A_MBq / (d * d);
      const totalDose = doseRate * t;

      setResults({
        doseRate: doseRate * 1000, // mSv/h
        totalDose: totalDose * 1000, // mSv
      });
    }
  };

  const reset = () => {
    setActivity(""); setDistance(""); setTime(""); setEnergy(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Activity (Bq)</Label><Input value={activity} onChange={e => setActivity(e.target.value)} /></div>
              <div><Label>Distance (m)</Label><Input value={distance} onChange={e => setDistance(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Exposure Time (hours)</Label><Input value={time} onChange={e => setTime(e.target.value)} /></div>
              <div><Label>Photon Energy (MeV)</Label><Input value={energy} onChange={e => setEnergy(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Dose</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Dose Rate</p>
                    <p className="text-2xl font-bold">{results.doseRate.toExponential(4)} mSv/h</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Dose</p>
                    <p className="text-2xl font-bold">{results.totalDose.toExponential(4)} mSv</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Note: This is an approximation. Actual dose depends on shielding, geometry, and radiation type.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Radiation Dose Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the source activity</p>
                  <p>Input the radioactivity in Becquerels (Bq). This measures how many decays occur per second.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Set distance and exposure time</p>
                  <p>Enter your distance from the source in meters and how long you will be exposed in hours.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Review dose estimates</p>
                  <p>The calculator shows dose rate (mSv/h) and total accumulated dose (mSv) for your scenario.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Radiation Dose
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Radiation dose measures the energy deposited in tissue by ionizing radiation.
                The equivalent dose (measured in Sieverts) accounts for the biological effect
                of different radiation types.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-sm">
                Dose Rate ≈ Γ × A / d²
              </div>
              <p>
                Where Γ is the gamma constant (~0.5 µSv·m²/(MBq·h) for typical gamma emitters),
                A is activity in MBq, and d is distance in meters. This follows the inverse square law.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Radiation Dose Reference Values
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Source/Activity</th>
                    <th className="text-left py-3 px-2 font-semibold">Typical Dose</th>
                    <th className="text-left py-3 px-2 font-semibold">Context</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Annual background radiation</td>
                    <td className="py-3 px-2">2.4-3.0 mSv/year</td>
                    <td className="py-3 px-2">Natural sources worldwide</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Chest X-ray</td>
                    <td className="py-3 px-2">0.1 mSv</td>
                    <td className="py-3 px-2">Single examination</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">CT scan (abdomen)</td>
                    <td className="py-3 px-2">8-10 mSv</td>
                    <td className="py-3 px-2">Full scan procedure</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Annual occupational limit</td>
                    <td className="py-3 px-2">20 mSv/year</td>
                    <td className="py-3 px-2">Radiation workers (averaged)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Acute radiation sickness</td>
                    <td className="py-3 px-2">&gt;1000 mSv</td>
                    <td className="py-3 px-2">Single acute exposure</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Source: ICRP, UNSCEAR, and medical radiation guidelines.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              The Inverse Square Law
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Radiation intensity decreases with the square of distance from the source.
                Double your distance and the dose rate drops to one-fourth. Triple the distance
                and it drops to one-ninth.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-sm space-y-1">
                <div>I₁ / I₂ = (d₂)² / (d₁)²</div>
              </div>
              <p>
                This is why distance is your best protection against radiation exposure.
                Even small increases in distance can significantly reduce your dose.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Radiation Protection Principles
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">1</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Time</p>
                  <p>Minimize exposure time. Dose is directly proportional to how long you stay near the source.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">2</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Distance</p>
                  <p>Maximize distance from the source. Use tongs, remote handling, or stay behind barriers.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">3</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Shielding</p>
                  <p>Use appropriate barriers. Lead, concrete, or water can absorb radiation depending on the type.</p>
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
    question: "What is a Becquerel (Bq)?",
    answer: "One Becquerel equals one radioactive decay per second. It measures activity, not dose. A typical smoke detector contains about 37,000 Bq (1 µCi) of Americium-241.",
  },
{
    question: "What is the difference between dose and dose rate?",
    answer: "Dose rate is how much radiation you receive per unit time (mSv/h). Total dose is the accumulated amount over your exposure period. A high dose rate for a short time can equal a low dose rate for a long time.",
  },
{
    question: "Is this calculator accurate for all radiation types?",
    answer: "This calculator uses a simplified gamma constant approximation. It works best for gamma emitters at distances where the source can be treated as a point. Alpha and beta radiation require different calculations due to their limited range in air.",
  },
{
    question: "What is a safe radiation dose?",
    answer: "For the general public, the annual limit above background is 1 mSv/year. Radiation workers can receive up to 20 mSv/year averaged over 5 years. Below 100 mSv, health effects are difficult to detect statistically.",
  },
{
    question: "How does shielding affect dose calculations?",
    answer: "Shielding reduces dose exponentially based on material thickness and the radiation's half-value layer. This calculator does not account for shielding. Add appropriate safety margins if shielding is present between you and the source.",
  }
  ]} />
</section>

      </div>
    </div>
  );
}
