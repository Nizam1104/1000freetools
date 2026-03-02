"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <CardHeader>
          <CardTitle>Nuclear Decay Half-Life Calculator – Radioactive Decay</CardTitle>
          <CardDescription>
            Calculate radioactive decay using half-life. Find remaining amount after time, or calculate time needed for specific decay.
          </CardDescription>
        </CardHeader>
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
    </div>
  );
}
