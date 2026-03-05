"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PowerFactorCalculator() {
  const [realPower, setRealPower] = useState<string>("");
  const [apparentPower, setApparentPower] = useState<string>("");
  const [reactivePower, setReactivePower] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(realPower);
    const S = parseFloat(apparentPower);
    const Q = parseFloat(reactivePower);

    if (P > 0 && S > 0) {
      const pf = P / S;
      const phi = Math.acos(pf) * 180 / Math.PI;
      const calcQ = Math.sqrt(S * S - P * P);

      setResults({
        pf: Math.round(pf * 1000) / 1000,
        phi: Math.round(phi * 100) / 100,
        Q: Math.round(calcQ * 100) / 100,
      });
    } else if (P > 0 && Q > 0) {
      const S = Math.sqrt(P * P + Q * Q);
      const pf = P / S;
      const phi = Math.acos(pf) * 180 / Math.PI;

      setResults({
        pf: Math.round(pf * 1000) / 1000,
        phi: Math.round(phi * 100) / 100,
        S: Math.round(S * 100) / 100,
      });
    }
  };

  const reset = () => {
    setRealPower(""); setApparentPower(""); setReactivePower(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Power Factor Calculator – Calculate PF and Phase Angle</CardTitle>
          <CardDescription>
            Calculate power factor, phase angle, and reactive power for AC circuits. Essential for power system analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Real Power P (W)</Label><Input value={realPower} onChange={e => setRealPower(e.target.value)} /></div>
              <div><Label>Apparent Power S (VA)</Label><Input value={apparentPower} onChange={e => setApparentPower(e.target.value)} /></div>
              <div><Label>Reactive Power Q (VAR)</Label><Input value={reactivePower} onChange={e => setReactivePower(e.target.value)} /></div>
            </div>
            <p className="text-xs text-muted-foreground">Enter any two values</p>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Power Factor</p>
                    <p className="text-3xl font-bold">{results.pf}</p>
                    <p className="text-xs text-muted-foreground">{(results.pf * 100).toFixed(0)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phase Angle</p>
                    <p className="text-2xl font-bold">{results.phi}°</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{results.Q ? "Reactive Power" : "Apparent Power"}</p>
                    <p className="text-2xl font-bold">{results.Q || results.S} {results.Q ? "VAR" : "VA"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Calculate Power Factor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <p className="font-semibold mb-1">Enter two power values</p>
              <p className="text-sm text-muted-foreground">Input any two of: real power (W), apparent power (VA), or reactive power (VAR).</p>
            </div>
          </div>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <p className="font-semibold mb-1">Click Calculate</p>
              <p className="text-sm text-muted-foreground">The calculator uses the power triangle relationships to find all values.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <p className="font-semibold mb-1">View complete results</p>
              <p className="text-sm text-muted-foreground">Get power factor, phase angle, and the third power value instantly.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Why Power Factor Matters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">Energy efficiency</p>
              <p className="text-sm text-muted-foreground">Low power factor means wasted energy and higher electricity bills.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">System capacity</p>
              <p className="text-sm text-muted-foreground">Poor power factor reduces available power in electrical systems.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Utility penalties</p>
              <p className="text-sm text-muted-foreground">Many utilities charge extra for power factor below 0.95.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Equipment sizing</p>
              <p className="text-sm text-muted-foreground">Correct PF calculations ensure proper transformer and generator sizing.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Power triangle analysis</p>
              <p className="text-sm text-muted-foreground">Understand the relationship between real, reactive, and apparent power.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">What is power factor?</p>
              <p className="text-sm text-muted-foreground">Power factor is the ratio of real power to apparent power (P/S). It ranges from 0 to 1, with 1 being perfect efficiency.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">How do you calculate power factor?</p>
              <p className="text-sm text-muted-foreground">PF = Real Power / Apparent Power = P/S. You can also use PF = cos(phi) where phi is the phase angle.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">What causes low power factor?</p>
              <p className="text-sm text-muted-foreground">Inductive loads like motors, transformers, and fluorescent lights create reactive power, lowering the power factor.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">What is a good power factor value?</p>
              <p className="text-sm text-muted-foreground">A power factor of 0.95 or higher is excellent. Below 0.85 indicates poor efficiency needing correction.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">How do you improve power factor?</p>
              <p className="text-sm text-muted-foreground">Add capacitors to counteract inductive loads. This reduces reactive power and brings PF closer to 1.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Related Electrical Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Try our other electrical tools: the <a href="/calculators/ohms-law-calculator" className="text-primary hover:underline">Ohm's law calculator</a> for voltage and current, the <a href="/calculators/electric-power-calculator" className="text-primary hover:underline">electric power calculator</a> for wattage calculations, and the <a href="/calculators/ac-impedance-calculator" className="text-primary hover:underline">AC impedance calculator</a> for circuit analysis.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
