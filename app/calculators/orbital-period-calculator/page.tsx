"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OrbitalPeriodCalculator() {
  const [semiMajorAxis, setSemimajorAxis] = useState<string>("");
  const [centralMass, setCentralMass] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const a = parseFloat(semiMajorAxis);
    const M = parseFloat(centralMass);
    const G = 6.67430e-11;

    if (a > 0 && M > 0) {
      const T = 2 * Math.PI * Math.sqrt(Math.pow(a, 3) / (G * M));
      const days = T / 86400;
      const years = days / 365.25;

      setResults({
        seconds: Math.round(T),
        days: Math.round(days * 100) / 100,
        years: years < 1 ? years.toFixed(4) : Math.round(years * 100) / 100,
      });
    }
  };

  const reset = () => {
    setSemimajorAxis(""); setCentralMass(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Orbital Period Calculator – Calculate Orbital Period</CardTitle>
          <CardDescription>
            Calculate the orbital period of a satellite or planet using Kepler's third law. Enter the semi-major axis and central body mass.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Semi-major Axis (m)</Label><Input value={semiMajorAxis} onChange={e => setSemimajorAxis(e.target.value)} /></div>
              <div><Label>Central Body Mass (kg)</Label><Input value={centralMass} onChange={e => setCentralMass(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Period</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Period</p>
                    <p className="text-2xl font-bold">{results.seconds.toLocaleString()} s</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Days</p>
                    <p className="text-2xl font-bold">{results.days}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Years</p>
                    <p className="text-2xl font-bold">{results.years}</p>
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
