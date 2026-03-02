"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RcTimeConstantCalculator() {
  const [resistance, setResistance] = useState<string>("");
  const [capacitance, setCapacitance] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const R = parseFloat(resistance);
    const C = parseFloat(capacitance);

    if (R > 0 && C > 0) {
      const τ = R * C;
      const fullCharge = τ * 5; // 5τ for ~99% charge

      setResults({ tau: τ, fullCharge });
    }
  };

  const reset = () => {
    setResistance(""); setCapacitance(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>RC Time Constant Calculator – Calculate RC Circuit Time Constant</CardTitle>
          <CardDescription>
            Calculate the time constant for RC circuits. τ = R × C determines charging and discharging rates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Resistance (Ω)</Label><Input value={resistance} onChange={e => setResistance(e.target.value)} /></div>
              <div><Label>Capacitance (F)</Label><Input value={capacitance} onChange={e => setCapacitance(e.target.value)} placeholder="e.g., 0.000001" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate τ</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Time Constant (τ)</p>
                  <p className="text-4xl font-bold">{results.tau.toExponential(4)} s</p>
                  <p className="text-sm text-muted-foreground">= {results.tau * 1000 >= 1 ? Math.round(results.tau * 1000) + " ms" : (results.tau * 1e6).toFixed(2) + " µs"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Full Charge Time (5τ)</p>
                  <p className="text-2xl font-bold">{results.fullCharge.toExponential(4)} s</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>Charge at 1τ: 63.2% | 2τ: 86.5% | 3τ: 95.0% | 4τ: 98.2% | 5τ: 99.3%</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
