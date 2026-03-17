"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Droplets, Wind } from "lucide-react";

export default function BernoulliEquationCalculator() {
  const [pressure1, setPressure1] = useState("101325");
  const [velocity1, setVelocity1] = useState("10");
  const [height1, setHeight1] = useState("0");
  const [pressure2, setPressure2] = useState("");
  const [velocity2, setVelocity2] = useState("20");
  const [height2, setHeight2] = useState("0");
  const [density, setDensity] = useState("1.225");
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const P1 = parseFloat(pressure1) || 0;
    const v1 = parseFloat(velocity1) || 0;
    const h1 = parseFloat(height1) || 0;
    const v2 = parseFloat(velocity2) || 0;
    const h2 = parseFloat(height2) || 0;
    const rho = parseFloat(density) || 1.225;
    const g = 9.81;

    // Bernoulli equation: P1 + 0.5*rho*v1^2 + rho*g*h1 = P2 + 0.5*rho*v2^2 + rho*g*h2
    // Solving for P2
    const P2 = P1 + 0.5 * rho * (v1 * v1 - v2 * v2) + rho * g * (h1 - h2);

    setResult(P2.toFixed(2));
  }, [pressure1, velocity1, height1, velocity2, height2, density]);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `Bernoulli Equation Result:\nP1 = ${pressure1} Pa, v1 = ${velocity1} m/s, h1 = ${height1} m\nP2 = ${result} Pa, v2 = ${velocity2} m/s, h2 = ${height2} m\nDensity = ${density} kg/m³`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, pressure1, velocity1, height1, velocity2, height2, density]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5" />
            Bernoulli Equation Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Point 1 - Pressure (Pa)</Label>
              <Input
                type="number"
                value={pressure1}
                onChange={(e) => setPressure1(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Point 1 - Velocity (m/s)</Label>
              <Input
                type="number"
                value={velocity1}
                onChange={(e) => setVelocity1(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Point 1 - Height (m)</Label>
              <Input
                type="number"
                value={height1}
                onChange={(e) => setHeight1(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Point 2 - Pressure (Pa)</Label>
              <Input
                type="number"
                value={pressure2}
                onChange={(e) => setPressure2(e.target.value)}
                placeholder="Calculate"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Point 2 - Velocity (m/s)</Label>
              <Input
                type="number"
                value={velocity2}
                onChange={(e) => setVelocity2(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Point 2 - Height (m)</Label>
              <Input
                type="number"
                value={height2}
                onChange={(e) => setHeight2(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label>Fluid Density (kg/m³)</Label>
            <Input
              type="number"
              value={density}
              onChange={(e) => setDensity(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Air: 1.225, Water: 1000
            </p>
          </div>

          <Button onClick={calculate} className="w-full">
            <Wind className="w-4 h-4 mr-2" />
            Calculate Pressure at Point 2
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <Label>Pressure at Point 2</Label>
                <p className="text-3xl font-bold mt-2">{result} Pa</p>
                <p className="text-sm text-muted-foreground">
                  {(parseFloat(result) / 101325).toFixed(3)} atm
                </p>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Results
              </Button>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
            <p className="font-semibold mb-2">About Bernoulli's Equation:</p>
            <p className="text-muted-foreground">
              Bernoulli's principle states that an increase in the speed of a fluid occurs
              simultaneously with a decrease in static pressure. This principle applies to
              incompressible, non-viscous fluid flow.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
