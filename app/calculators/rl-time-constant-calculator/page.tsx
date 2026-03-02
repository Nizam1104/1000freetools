"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RlTimeConstantCalculator() {
  const [resistance, setResistance] = useState<string>("");
  const [inductance, setInductance] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const R = parseFloat(resistance);
    const L = parseFloat(inductance);

    if (R > 0 && L > 0) {
      const τ = L / R;
      const fullDecay = τ * 5;

      setResults({ tau: τ, fullDecay });
    }
  };

  const reset = () => {
    setResistance(""); setInductance(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>RL Time Constant Calculator – Calculate RL Circuit Time Constant</CardTitle>
          <CardDescription>
            Calculate the time constant for RL circuits. τ = L / R determines current rise and decay rates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Resistance (Ω)</Label><Input value={resistance} onChange={e => setResistance(e.target.value)} /></div>
              <div><Label>Inductance (H)</Label><Input value={inductance} onChange={e => setInductance(e.target.value)} /></div>
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
                  <p className="text-sm text-muted-foreground">Full Decay Time (5τ)</p>
                  <p className="text-2xl font-bold">{results.fullDecay.toExponential(4)} s</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
