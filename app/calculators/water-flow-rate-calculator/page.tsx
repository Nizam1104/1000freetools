"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WaterFlowRateCalculator() {
  const [diameter, setDiameter] = useState<string>("");
  const [velocity, setVelocity] = useState<string>("");
  const [pressure, setPressure] = useState<string>("");
  const [pipeLength, setPipeLength] = useState<string>("");
  const [method, setMethod] = useState<"velocity" | "pressure">("velocity");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const D = parseFloat(diameter);
    
    if (method === "velocity") {
      const v = parseFloat(velocity);
      if (D > 0 && v > 0) {
        const A = Math.PI * Math.pow(D / 2, 2);
        const Q = A * v;
        setResults({
          flowRate: Q,
          flowRateL: Q * 1000,
          flowRateGPM: Q * 15850.3,
          area: A,
        });
      }
    } else {
      // Simplified pressure flow (Torricelli's law approximation)
      const P = parseFloat(pressure);
      const L = parseFloat(pipeLength);
      if (D > 0 && P > 0) {
        const rho = 1000;
        const v = Math.sqrt(2 * P / rho);
        const A = Math.PI * Math.pow(D / 2, 2);
        const Q = A * v;
        setResults({
          flowRate: Q,
          flowRateL: Q * 1000,
          flowRateGPM: Q * 15850.3,
          velocity: v,
        });
      }
    }
  };

  const reset = () => {
    setDiameter(""); setVelocity(""); setPressure(""); setPipeLength("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Water Flow Rate Calculator – Calculate Flow Rate in Pipes</CardTitle>
          <CardDescription>
            Determine water or fluid flow rates quickly with our flow rate calculator. Enter pipe diameter and velocity to calculate volumetric flow in liters per second or gallons per minute.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Calculation Method</Label>
              <Select value={method} onValueChange={(v) => setMethod(v as typeof method)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="velocity">From Velocity (Q = Av)</SelectItem>
                  <SelectItem value="pressure">From Pressure Drop</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Pipe Diameter (m)</Label><Input value={diameter} onChange={e => setDiameter(e.target.value)} /></div>
              {method === "velocity" ? (
                <div><Label>Flow Velocity (m/s)</Label><Input value={velocity} onChange={e => setVelocity(e.target.value)} /></div>
              ) : (
                <>
                  <div><Label>Pressure Drop (Pa)</Label><Input value={pressure} onChange={e => setPressure(e.target.value)} /></div>
                  <div><Label>Pipe Length (m)</Label><Input value={pipeLength} onChange={e => setPipeLength(e.target.value)} /></div>
                </>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Flow Rate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Flow Rate</p>
                    <p className="text-2xl font-bold">{Math.round(results.flowRate * 1000) / 1000} m³/s</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Liters/sec</p>
                    <p className="text-2xl font-bold">{Math.round(results.flowRateL * 100) / 100}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GPM</p>
                    <p className="text-xl font-bold">{Math.round(results.flowRateGPM * 10) / 10}</p>
                  </div>
                </div>
                {results.velocity && (
                  <p className="text-sm">Estimated velocity: {Math.round(results.velocity * 100) / 100} m/s</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
