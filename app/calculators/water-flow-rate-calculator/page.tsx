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

      {/* How It Works Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Water Flow Rate</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Choose Calculation Method</h3>
              <p className="text-sm text-muted-foreground">Select velocity method (pipe diameter + flow speed) or pressure method.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Pipe Parameters</h3>
              <p className="text-sm text-muted-foreground">Input pipe diameter and either flow velocity or pressure difference.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Flow Rate Results</h3>
              <p className="text-sm text-muted-foreground">See flow rate in cubic meters/second, liters/second, and gallons per minute.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Key Features of This Flow Rate Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">**Dual Calculation Methods**</h3>
            <p className="text-sm text-muted-foreground">Calculate from velocity (Q = A × v) or estimate from pressure using Torricelli&apos;s law.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Multiple Unit Outputs**</h3>
            <p className="text-sm text-muted-foreground">Results shown in m³/s, L/s, and GPM for various engineering applications.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Cross-Sectional Area**</h3>
            <p className="text-sm text-muted-foreground">Automatically calculates pipe area from diameter for flow computations.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Free Engineering Tool**</h3>
            <p className="text-sm text-muted-foreground">Useful for plumbing, hydraulics, irrigation, and fluid mechanics calculations.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is flow rate?</h3>
            <p className="text-sm text-muted-foreground">Flow rate (Q) is the volume of fluid passing through a pipe per unit time. It&apos;s calculated as Q = A × v, where A is cross-sectional area and v is flow velocity.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How do I measure pipe flow rate?</h3>
            <p className="text-sm text-muted-foreground">Measure the pipe diameter to calculate area, then measure or estimate flow velocity. Multiply area by velocity to get volumetric flow rate.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What affects water flow rate in pipes?</h3>
            <p className="text-sm text-muted-foreground">Pipe diameter, pressure difference, pipe length, roughness, and fluid viscosity all affect flow rate. Larger diameter and higher pressure increase flow.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How do I convert GPM to liters per second?</h3>
            <p className="text-sm text-muted-foreground">1 GPM (gallon per minute) = 0.0631 liters per second. Multiply GPM by 0.0631 to convert, or divide L/s by 0.0631 to get GPM.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is a good flow rate for household plumbing?</h3>
            <p className="text-sm text-muted-foreground">Typical household fixtures: faucets 1.5-2.2 GPM, showerheads 1.5-2.5 GPM, toilets 1.28-1.6 GPF. Main supply lines should deliver 8-12 GPM total.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
    </div>
  );
}
