"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FocalLengthCalculator() {
  const [lensType, setLensType] = useState<"biconvex" | "biconcave" | "plano" | "meniscus">("biconvex");
  const [n, setN] = useState<string>("1.5");
  const [r1, setR1] = useState<string>("");
  const [r2, setR2] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const nVal = parseFloat(n);
    const R1 = parseFloat(r1);
    const R2 = parseFloat(r2);

    if (nVal > 0 && R1 > 0 && R2 > 0) {
      // Lensmaker's equation: 1/f = (n-1)(1/R1 - 1/R2)
      const f = 1 / ((nVal - 1) * (1/R1 - 1/R2));
      const power = 1 / f; // in diopters if f is in meters

      setResults({
        focalLength: f,
        power: power,
      });
    }
  };

  const reset = () => {
    setR1(""); setR2(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Focal Length Calculator – Lensmaker's Equation</CardTitle>
          <CardDescription>
            Calculate the focal length of a lens using the lensmaker's equation. Enter refractive index and radii of curvature.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Lens Type</Label>
                <Select value={lensType} onValueChange={(v) => setLensType(v as typeof lensType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="biconvex">Biconvex (converging)</SelectItem>
                    <SelectItem value="biconcave">Biconcave (diverging)</SelectItem>
                    <SelectItem value="plano">Plano-convex/concave</SelectItem>
                    <SelectItem value="meniscus">Meniscus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Refractive Index (n)</Label>
                <Input value={n} onChange={e => setN(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Radius R₁ (m)</Label><Input value={r1} onChange={e => setR1(e.target.value)} /></div>
              <div><Label>Radius R₂ (m)</Label><Input value={r2} onChange={e => setR2(e.target.value)} /></div>
            </div>
            <p className="text-xs text-muted-foreground">Use positive for convex surface, negative for concave</p>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Focal Length</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Focal Length</p>
                    <p className="text-3xl font-bold">{Math.round(results.focalLength * 1000) / 1000} m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Optical Power</p>
                    <p className="text-3xl font-bold">{Math.round(results.power * 100) / 100} D</p>
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
