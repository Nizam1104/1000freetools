"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Zap, Move } from "lucide-react";

export default function KineticEnergyCalculator() {
  const [mass, setMass] = useState("10");
  const [velocity, setVelocity] = useState("5");
  const [result, setResult] = useState<number | null>(null);
  const [momentum, setMomentum] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const m = parseFloat(mass) || 0;
    const v = parseFloat(velocity) || 0;

    // KE = 0.5 × m × v²
    const ke = 0.5 * m * v * v;
    // p = m × v
    const p = m * v;

    setResult(ke);
    setMomentum(p);
  }, [mass, velocity]);

  const copyToClipboard = useCallback(async () => {
    if (result === null) return;
    try {
      await navigator.clipboard.writeText(
        `Kinetic Energy Calculation:\nMass: ${mass} kg, Velocity: ${velocity} m/s\nKE = ${result.toFixed(2)} J\nMomentum = ${momentum?.toFixed(2)} kg⋅m/s`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, momentum, mass, velocity]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Kinetic Energy Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              KE = ½ × m × v²
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Mass (m) in kg</Label>
              <Input
                type="number"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Velocity (v) in m/s</Label>
              <Input
                type="number"
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            <Move className="w-4 h-4 mr-2" />
            Calculate Kinetic Energy
          </Button>

          {result !== null && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <Label>Kinetic Energy</Label>
                  <p className="text-3xl font-bold mt-2">{result.toFixed(2)} J</p>
                  <p className="text-sm text-muted-foreground">
                    {(result / 1000).toFixed(4)} kJ
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <Label>Momentum</Label>
                  <p className="text-3xl font-bold mt-2">{momentum?.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">kg⋅m/s</p>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <Label>Energy Equivalents</Label>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div>Kilocalories: {(result / 4184).toFixed(4)} kcal</div>
                  <div>Watt-hours: {(result / 3600).toFixed(4)} Wh</div>
                  <div>BTU: {(result / 1055).toFixed(4)} BTU</div>
                  <div>Electron volts: {(result / 1.602e-19).toExponential(4)} eV</div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <Label>Velocity Comparison</Label>
                <div className="grid grid-cols-4 gap-2 mt-2 text-center text-sm">
                  <div className="p-2 bg-muted rounded">
                    <div>2v</div>
                    <div className="font-semibold">{(0.5 * parseFloat(mass) * (2 * parseFloat(velocity)) ** 2).toFixed(0)} J</div>
                  </div>
                  <div className="p-2 bg-primary/10 rounded">
                    <div>v</div>
                    <div className="font-semibold">{result.toFixed(0)} J</div>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <div>v/2</div>
                    <div className="font-semibold">{(0.5 * parseFloat(mass) * (parseFloat(velocity) / 2) ** 2).toFixed(0)} J</div>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <div>v/4</div>
                    <div className="font-semibold">{(0.5 * parseFloat(mass) * (parseFloat(velocity) / 4) ** 2).toFixed(0)} J</div>
                  </div>
                </div>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Results
              </Button>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
            <p className="font-semibold mb-2">About Kinetic Energy:</p>
            <p className="text-muted-foreground">
              Kinetic energy is the energy of motion. An object's kinetic energy depends on
              both its mass and the square of its velocity. Doubling velocity quadruples
              the kinetic energy.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
