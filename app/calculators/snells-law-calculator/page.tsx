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

            {/* How It Works Section */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-4">How Snell&apos;s Law Works</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-2">1</div>
                  <h5 className="font-medium text-sm mb-1">Enter Refractive Indices</h5>
                  <p className="text-xs text-muted-foreground">Input n₁ and n₂ for the two media or select from presets.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-2">2</div>
                  <h5 className="font-medium text-sm mb-1">Set Incident Angle</h5>
                  <p className="text-xs text-muted-foreground">Enter the angle at which light hits the boundary.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-2">3</div>
                  <h5 className="font-medium text-sm mb-1">Calculate Refraction</h5>
                  <p className="text-xs text-muted-foreground">Get the refraction angle or critical angle instantly.</p>
                </div>
              </div>
            </div>

            {/* Formula Section */}
            <div className="mt-4 p-4 bg-primary/5 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Snell&apos;s Law Formula</h4>
              <p className="font-mono text-sm">n₁ × sin(θ₁) = n₂ × sin(θ₂)</p>
              <p className="text-xs text-muted-foreground mt-2">Where n = refractive index, θ = angle from normal</p>
            </div>

            {/* Common Materials Table */}
            <div className="mt-4">
              <h4 className="font-semibold text-sm mb-2">Refractive Indices of Common Materials</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-muted rounded">Air: 1.0003</div>
                <div className="p-2 bg-muted rounded">Water: 1.333</div>
                <div className="p-2 bg-muted rounded">Crown Glass: 1.52</div>
                <div className="p-2 bg-muted rounded">Flint Glass: 1.62</div>
                <div className="p-2 bg-muted rounded">Diamond: 2.42</div>
                <div className="p-2 bg-muted rounded">Sapphire: 1.77</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
