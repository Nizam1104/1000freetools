"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PulleySystemCalculator() {
  const [load, setLoad] = useState<string>("");
  const [pulleys, setPulleys] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const W = parseFloat(load);
    const n = parseInt(pulleys);

    if (W > 0 && n > 0) {
      // Ideal mechanical advantage = number of supporting rope segments
      const ma = n;
      const effort = W / ma;
      const ropeLength = W > 0 ? n : 0; // For 1m lift

      setResults({ ma, effort: Math.round(effort * 100) / 100, ropeLength });
    }
  };

  const reset = () => {
    setLoad(""); setPulleys(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Pulley System Calculator – Block and Tackle Calculator</CardTitle>
          <CardDescription>
            Calculate mechanical advantage and required effort for pulley systems. Determine rope length needed for lifting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Load Weight (kg)</Label><Input value={load} onChange={e => setLoad(e.target.value)} /></div>
              <div><Label>Number of Pulleys</Label><Input type="number" value={pulleys} onChange={e => setPulleys(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Mechanical Advantage</p>
                    <p className="text-3xl font-bold">{results.ma}:1</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Required Effort</p>
                    <p className="text-2xl font-bold">{results.effort} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rope per 1m Lift</p>
                    <p className="text-2xl font-bold">{results.ropeLength} m</p>
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
