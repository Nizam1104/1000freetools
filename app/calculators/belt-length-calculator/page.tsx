"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BeltLengthCalculator() {
  const [d1, setD1] = useState<string>("");
  const [d2, setD2] = useState<string>("");
  const [centerDistance, setCenterDistance] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const D1 = parseFloat(d1);
    const D2 = parseFloat(d2);
    const C = parseFloat(centerDistance);

    if (D1 > 0 && D2 > 0 && C > 0) {
      // Approximate belt length formula
      const L = 2 * C + 1.57 * (D1 + D2) + Math.pow(D2 - D1, 2) / (4 * C);
      
      // Contact angle on smaller pulley
      const contactAngle = 180 - ((D2 - D1) / C) * 57.3;

      setResults({
        length: Math.round(L * 100) / 100,
        contactAngle: Math.round(contactAngle * 10) / 10,
      });
    }
  };

  const reset = () => {
    setD1(""); setD2(""); setCenterDistance(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Belt Length Calculator – Calculate V-Belt Length</CardTitle>
          <CardDescription>
            Calculate the required belt length for a two-pulley system. Enter pulley diameters and center distance to find the correct belt size.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Small Pulley Diameter</Label><Input value={d1} onChange={e => setD1(e.target.value)} /></div>
              <div><Label>Large Pulley Diameter</Label><Input value={d2} onChange={e => setD2(e.target.value)} /></div>
              <div><Label>Center Distance</Label><Input value={centerDistance} onChange={e => setCenterDistance(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Belt Length</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Belt Length</p>
                  <p className="text-4xl font-bold">{results.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact Angle (small pulley)</p>
                  <p className="text-2xl font-bold">{results.contactAngle}°</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
