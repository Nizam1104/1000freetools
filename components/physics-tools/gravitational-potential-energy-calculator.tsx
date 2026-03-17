"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Mountain } from "lucide-react";

export default function GravitationalPotentialEnergyCalculator() {
  const [mass, setMass] = useState("10");
  const [height, setHeight] = useState("5");
  const [gravity, setGravity] = useState("9.81");
  const [result, setResult] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const m = parseFloat(mass) || 0;
    const h = parseFloat(height) || 0;
    const g = parseFloat(gravity) || 9.81;

    // PE = mgh
    const pe = m * g * h;
    setResult(pe);
  }, [mass, height, gravity]);

  const copyToClipboard = useCallback(async () => {
    if (result === null) return;
    try {
      await navigator.clipboard.writeText(
        `Gravitational Potential Energy:\nMass: ${mass} kg, Height: ${height} m, g: ${gravity} m/s²\nPE = ${result.toFixed(2)} J`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, mass, height, gravity]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mountain className="w-5 h-5" />
            Gravitational Potential Energy Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              PE = m × g × h
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Label>Height (h) in meters</Label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Gravity (g) in m/s²</Label>
              <Input
                type="number"
                value={gravity}
                onChange={(e) => setGravity(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Earth: 9.81, Moon: 1.62, Mars: 3.71
              </p>
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Potential Energy
          </Button>

          {result !== null && (
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <Label>Gravitational Potential Energy</Label>
                <p className="text-3xl font-bold mt-2">{result.toFixed(2)} J</p>
                <p className="text-sm text-muted-foreground">
                  {(result / 1000).toFixed(4)} kJ
                </p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <Label>Energy Equivalents</Label>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div>Kilocalories: {(result / 4184).toFixed(4)} kcal</div>
                  <div>Watt-hours: {(result / 3600).toFixed(4)} Wh</div>
                </div>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Results
              </Button>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
            <p className="font-semibold mb-2">About Gravitational Potential Energy:</p>
            <p className="text-muted-foreground">
              Gravitational potential energy is the energy an object possesses due to its
              position in a gravitational field. The higher an object is lifted, the more
              potential energy it stores.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
