"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MATERIALS: Record<string, number> = {
  "Air": 1.0003,
  "Water": 1.333,
  "Glass (crown)": 1.52,
  "Glass (flint)": 1.62,
  "Diamond": 2.42,
  "Custom": 0,
};

export default function SnellsLawCalculator() {
  const [n1, setN1] = useState<string>("1.0003");
  const [n2, setN2] = useState<string>("1.52");
  const [theta1, setTheta1] = useState<string>("");
  const [solveFor, setSolveFor] = useState<"theta2" | "critical">("theta2");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const n1Val = parseFloat(n1);
    const n2Val = parseFloat(n2);
    const θ1 = parseFloat(theta1);

    if (n1Val > 0 && n2Val > 0) {
      if (solveFor === "theta2" && θ1 > 0) {
        const θ1Rad = (θ1 * Math.PI) / 180;
        const sinθ2 = (n1Val / n2Val) * Math.sin(θ1Rad);
        
        if (Math.abs(sinθ2) <= 1) {
          const θ2 = (Math.asin(sinθ2) * 180) / Math.PI;
          setResults({ theta2: Math.round(θ2 * 100) / 100, totalInternal: false });
        } else {
          setResults({ totalInternal: true });
        }
      } else if (solveFor === "critical") {
        if (n1Val > n2Val) {
          const θc = (Math.asin(n2Val / n1Val) * 180) / Math.PI;
          setResults({ criticalAngle: Math.round(θc * 100) / 100 });
        } else {
          setResults({ noCritical: true });
        }
      }
    }
  };

  const reset = () => {
    setN1("1.0003"); setN2("1.52"); setTheta1(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Snell's Law Calculator – Refraction Calculator</CardTitle>
          <CardDescription>
            Calculate the angle of refraction using Snell's law. Our calculator also determines the critical angle for total internal reflection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Medium 1 (n₁)</Label>
                <Select value={n1} onValueChange={(v) => { if (v !== "custom") setN1(v); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(MATERIALS).map(([name, val]) => (
                      <SelectItem key={name} value={val.toString()}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input type="number" value={n1} onChange={e => setN1(e.target.value)} className="mt-2" />
              </div>
              <div>
                <Label>Medium 2 (n₂)</Label>
                <Select value={n2} onValueChange={(v) => { if (v !== "custom") setN2(v); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(MATERIALS).map(([name, val]) => (
                      <SelectItem key={name} value={val.toString()}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input type="number" value={n2} onChange={e => setN2(e.target.value)} className="mt-2" />
              </div>
              <div>
                <Label>Angle θ₁ (degrees)</Label>
                <Input value={theta1} onChange={e => setTheta1(e.target.value)} />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => { setSolveFor("theta2"); calculate(); }}>Calculate θ₂</Button>
              <Button onClick={() => { setSolveFor("critical"); calculate(); }}>Critical Angle</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                {results.theta2 !== undefined && (
                  <div>
                    <p className="text-sm text-muted-foreground">Angle of Refraction (θ₂)</p>
                    <p className="text-4xl font-bold">{results.theta2}°</p>
                  </div>
                )}
                {results.criticalAngle !== undefined && (
                  <div>
                    <p className="text-sm text-muted-foreground">Critical Angle</p>
                    <p className="text-4xl font-bold">{results.criticalAngle}°</p>
                  </div>
                )}
                {results.totalInternal && (
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded">
                    <p className="font-medium">⚠️ Total Internal Reflection</p>
                    <p className="text-sm text-muted-foreground">Light cannot pass into medium 2</p>
                  </div>
                )}
                {results.noCritical && (
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded">
                    <p className="text-sm">No critical angle (n₁ ≤ n₂)</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
