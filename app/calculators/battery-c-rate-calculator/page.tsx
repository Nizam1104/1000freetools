"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BatteryCRateCalculator() {
  const [capacity, setCapacity] = useState<string>("");
  const [cRate, setCRate] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [mode, setMode] = useState<"c_to_current" | "current_to_c">("c_to_current");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const Cap = parseFloat(capacity);
    const C = parseFloat(cRate);
    const I = parseFloat(current);

    if (mode === "c_to_current" && Cap > 0 && C > 0) {
      const current = Cap * C;
      const time = 60 / C; // minutes
      setResults({ current, time: Math.round(time * 10) / 10 });
    } else if (mode === "current_to_c" && Cap > 0 && I > 0) {
      const cRate = I / Cap;
      const time = 60 / cRate;
      setResults({ cRate: Math.round(cRate * 100) / 100, time: Math.round(time * 10) / 10 });
    }
  };

  const reset = () => {
    setCapacity(""); setCRate(""); setCurrent(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Battery C-Rate Calculator – Calculate Charge/Discharge Rate</CardTitle>
          <CardDescription>
            Calculate battery C-rate and corresponding current. C-rate indicates how fast a battery charges or discharges.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant={mode === "c_to_current" ? "default" : "outline"} size="sm" onClick={() => setMode("c_to_current")}>C-Rate → Current</Button>
              <Button variant={mode === "current_to_c" ? "default" : "outline"} size="sm" onClick={() => setMode("current_to_c")}>Current → C-Rate</Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Battery Capacity (Ah)</Label><Input value={capacity} onChange={e => setCapacity(e.target.value)} /></div>
              {mode === "c_to_current" ? (
                <div><Label>C-Rate</Label><Input value={cRate} onChange={e => setCRate(e.target.value)} placeholder="e.g., 1, 2, 0.5" /></div>
              ) : (
                <div><Label>Current (A)</Label><Input value={current} onChange={e => setCurrent(e.target.value)} /></div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  {results.current !== undefined && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Current</p>
                        <p className="text-3xl font-bold">{results.current} A</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Charge/Discharge Time</p>
                        <p className="text-2xl font-bold">{results.time} min</p>
                      </div>
                    </>
                  )}
                  {results.cRate !== undefined && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">C-Rate</p>
                        <p className="text-3xl font-bold">{results.cRate}C</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Time to Full</p>
                        <p className="text-2xl font-bold">{results.time} min</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
