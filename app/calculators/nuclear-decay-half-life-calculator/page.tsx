"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function NuclearDecayHalfLifeCalculator() {
  const [halfLife, setHalfLife] = useState<string>("");
  const [initialAmount, setInitialAmount] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [solveFor, setSolveFor] = useState<"remaining" | "time" | "halflife">("remaining");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const T = parseFloat(halfLife);
    const N0 = parseFloat(initialAmount);
    const t = parseFloat(time);

    if (solveFor === "remaining" && T > 0 && N0 > 0 && t >= 0) {
      const N = N0 * Math.pow(0.5, t / T);
      setResults({ value: Math.round(N * 1000) / 1000, percent: (N / N0 * 100).toFixed(2) });
    } else if (solveFor === "time" && T > 0 && N0 > 0) {
      const N = N0 * 0.5; // Time to half
      const t = T * Math.log(N0 / N) / Math.log(2);
      setResults({ value: t, label: "Time to decay to half" });
    } else if (solveFor === "halflife" && N0 > 0 && t > 0) {
      const N = N0 * 0.5;
      const T = t * Math.log(2) / Math.log(N0 / N);
      setResults({ value: T, label: "Half-life" });
    }
  };

  const reset = () => {
    setHalfLife(""); setInitialAmount(""); setTime(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Half-life</Label><Input value={halfLife} onChange={e => setHalfLife(e.target.value)} /></div>
              <div><Label>Initial Amount</Label><Input value={initialAmount} onChange={e => setInitialAmount(e.target.value)} /></div>
              <div><Label>Time Elapsed</Label><Input value={time} onChange={e => setTime(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => { setSolveFor("remaining"); calculate(); }}>Remaining</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Remaining Amount</p>
                  <p className="text-4xl font-bold">{results.value}</p>
                  <p className="text-sm text-muted-foreground">{results.percent}% of original</p>
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
              How to Use This Half-Life Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the half-life</p>
                  <p>Input the half-life of the radioactive substance in your chosen time unit.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Input initial amount and elapsed time</p>
                  <p>Enter the starting quantity and how much time has passed since then.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Calculate remaining amount</p>
                  <p>Click Remaining to see how much of the substance is left after the elapsed time.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Half-Lives of Common Isotopes
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Isotope</th>
                    <th className="text-left py-3 px-2 font-semibold">Half-Life</th>
                    <th className="text-left py-3 px-2 font-semibold">Common Use</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Carbon-14</td>
                    <td className="py-3 px-2">5,730 years</td>
                    <td className="py-3 px-2">Radiocarbon dating</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Uranium-238</td>
                    <td className="py-3 px-2">4.5 billion years</td>
                    <td className="py-3 px-2">Geological dating</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Iodine-131</td>
                    <td className="py-3 px-2">8 days</td>
                    <td className="py-3 px-2">Medical treatment</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Cesium-137</td>
                    <td className="py-3 px-2">30 years</td>
                    <td className="py-3 px-2">Industrial gauges</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Tritium (H-3)</td>
                    <td className="py-3 px-2">12.3 years</td>
                    <td className="py-3 px-2">Glow-in-dark signs</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Polonium-210</td>
                    <td className="py-3 px-2">138 days</td>
                    <td className="py-3 px-2">Static eliminators</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Radioactive Decay
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is Half-Life?</h4>
                <p>
                  Half-life is the time required for half of a radioactive substance to decay. After
                  one half-life, 50% remains. After two half-lives, 25% remains. After three, 12.5%
                  remains. This exponential decay pattern is predictable and constant for each isotope.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">The Decay Formula</h4>
                <p>
                  The amount remaining follows: N(t) = N₀ × (1/2)^(t/T), where N₀ is initial amount,
                  t is elapsed time, and T is half-life. This formula works for any time unit as long
                  as t and T use the same unit. The decay is exponential, not linear.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Half-Life Matters</h4>
                <p>
                  Half-life determines how long radioactive materials remain hazardous. Medical isotopes
                  need short half-lives to minimize patient exposure. Nuclear waste has long half-lives,
                  requiring secure storage for thousands of years. Carbon dating relies on C-14's
                  predictable 5,730-year half-life.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Radioactive Decay Tips
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use consistent time units</p>
                  <p>Ensure half-life and elapsed time use the same unit (both seconds, both years, etc.).</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Remember the 10 half-life rule</p>
                  <p>After 10 half-lives, less than 0.1% of the original material remains — effectively gone.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Decay is random but predictable</p>
                  <p>Individual atom decay is random, but large samples follow the half-life pattern precisely.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Half-life cannot be changed</p>
                  <p>Temperature, pressure, and chemical state do not affect radioactive decay rates.</p>
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
    question: "How do you calculate half-life decay?",
    answer: "Use the formula: remaining = initial × (1/2)^(time/half-life). For example, if you start with 100g of a substance with 5-day half-life, after 15 days (3 half-lives), you have 100 × (1/2)³ = 100 × 0.125 = 12.5g remaining.",
  },
{
    question: "Can half-life be affected by external factors?",
    answer: "No. Radioactive decay is a nuclear process unaffected by temperature, pressure, chemical bonds, or magnetic fields. This constancy makes half-life reliable for dating and medical applications. Only the nucleus itself determines decay rate.",
  },
{
    question: "What happens after many half-lives?",
    answer: "The amount approaches zero but never quite reaches it mathematically. Practically, after 10 half-lives, only 0.1% remains. After 20 half-lives, less than one millionth remains. For most purposes, the material is considered effectively gone.",
  },
{
    question: "How is half-life used in carbon dating?",
    answer: "Living organisms maintain constant C-14 levels. After death, C-14 decays with a 5,730-year half-life. Measuring remaining C-14 reveals how long ago the organism died. This works for samples up to about 50,000 years old (roughly 9 half-lives).",
  },
{
    question: "Why do some isotopes have short half-lives?",
    answer: "Unstable nuclei decay faster. Isotopes far from the stable neutron-proton ratio decay quickly. Very unstable isotopes may have half-lives of milliseconds. More stable isotopes can have half-lives of billions of years. Stability determines half-life.",
  }
  ]} />
</section>

      </div>
    </div>
  );
}
