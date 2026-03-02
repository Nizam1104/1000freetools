"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BrewsterAngleCalculator() {
  const [n1, setN1] = useState<string>("1.0003");
  const [n2, setN2] = useState<string>("1.52");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const n1Val = parseFloat(n1);
    const n2Val = parseFloat(n2);

    if (n1Val > 0 && n2Val > 0) {
      // Brewster's angle: tan(θB) = n2/n1
      const θB = Math.atan(n2Val / n1Val) * 180 / Math.PI;
      const θR = 90 - θB; // Reflected angle

      setResults({
        brewsterAngle: Math.round(θB * 100) / 100,
        reflectedAngle: Math.round(θR * 100) / 100,
        refractedAngle: Math.round((90 - θB) * 100) / 100,
      });
    }
  };

  const reset = () => {
    setN1("1.0003"); setN2("1.52"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Brewster Angle Calculator – Polarization Angle Calculator</CardTitle>
          <CardDescription>
            Calculate Brewster's angle (polarization angle) for light passing between two media. At this angle, reflected light is completely polarized.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Medium 1 (n₁)</Label>
                <Input value={n1} onChange={e => setN1(e.target.value)} />
              </div>
              <div>
                <Label>Medium 2 (n₂)</Label>
                <Input value={n2} onChange={e => setN2(e.target.value)} />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Brewster Angle</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Brewster Angle (θB)</p>
                  <p className="text-4xl font-bold">{results.brewsterAngle}°</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Reflected Angle</p>
                    <p className="text-2xl font-bold">{results.reflectedAngle}°</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Refracted Angle</p>
                    <p className="text-2xl font-bold">{results.refractedAngle}°</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  At Brewster's angle, reflected and refracted rays are perpendicular (90° apart)
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
