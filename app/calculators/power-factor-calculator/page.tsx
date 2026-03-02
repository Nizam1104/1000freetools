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
    </div>
  );
}
