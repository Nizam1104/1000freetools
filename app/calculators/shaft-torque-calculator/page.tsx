"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ShaftTorqueCalculator() {
  const [power, setPower] = useState<string>("");
  const [rpm, setRpm] = useState<string>("");
  const [force, setForce] = useState<string>("");
  const [radius, setRadius] = useState<string>("");
  const [mode, setMode] = useState<"power" | "force">("power");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    if (mode === "power") {
      const P = parseFloat(power);
      const N = parseFloat(rpm);
      if (P > 0 && N > 0) {
        const T = (P * 60) / (2 * Math.PI * N);
        setResults({ torque: Math.round(T * 100) / 100 });
      }
    } else {
      const F = parseFloat(force);
      const R = parseFloat(radius);
      if (F > 0 && R > 0) {
        const T = F * R;
        setResults({ torque: Math.round(T * 100) / 100 });
      }
    }
  };

  const reset = () => {
    setPower(""); setRpm(""); setForce(""); setRadius(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Shaft Torque Calculator – Calculate Shaft Torque</CardTitle>
          <CardDescription>
            Calculate shaft torque from power and RPM, or from force and radius. Our calculator helps size shafts and couplings for mechanical systems.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant={mode === "power" ? "default" : "outline"} size="sm" onClick={() => setMode("power")}>From Power</Button>
              <Button variant={mode === "force" ? "default" : "outline"} size="sm" onClick={() => setMode("force")}>From Force</Button>
            </div>

            {mode === "power" ? (
              <>
                <p className="text-sm text-muted-foreground">T = (60 × P) / (2π × N)</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Power (W)</Label><Input value={power} onChange={e => setPower(e.target.value)} /></div>
                  <div><Label>Speed (RPM)</Label><Input value={rpm} onChange={e => setRpm(e.target.value)} /></div>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">T = F × r</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Force (N)</Label><Input value={force} onChange={e => setForce(e.target.value)} /></div>
                  <div><Label>Radius (m)</Label><Input value={radius} onChange={e => setRadius(e.target.value)} /></div>
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Torque</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Torque</p>
                <p className="text-4xl font-bold">{results.torque} N·m</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
