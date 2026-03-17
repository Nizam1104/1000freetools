"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Magnet } from "lucide-react";

export default function MagneticForceOnWireCalculator() {
  const [current, setCurrent] = useState("5");
  const [length, setLength] = useState("0.5");
  const [magneticField, setMagneticField] = useState("0.1");
  const [angle, setAngle] = useState("90");
  const [result, setResult] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const I = parseFloat(current) || 0;
    const L = parseFloat(length) || 0;
    const B = parseFloat(magneticField) || 0;
    const theta = parseFloat(angle) || 90;

    // F = B × I × L × sin(θ)
    const thetaRad = (theta * Math.PI) / 180;
    const force = B * I * L * Math.sin(thetaRad);

    setResult(force);
  }, [current, length, magneticField, angle]);

  const copyToClipboard = useCallback(async () => {
    if (result === null) return;
    try {
      await navigator.clipboard.writeText(
        `Magnetic Force on Wire:\nCurrent: ${current} A, Length: ${length} m\nMagnetic Field: ${magneticField} T, Angle: ${angle}°\nForce = ${result.toFixed(6)} N`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, current, length, magneticField, angle]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Magnet className="w-5 h-5" />
            Magnetic Force on Wire Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              F = B × I × L × sin(θ)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Current (I) in Amperes</Label>
              <Input
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Wire Length (L) in meters</Label>
              <Input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Magnetic Field (B) in Tesla</Label>
              <Input
                type="number"
                step="0.01"
                value={magneticField}
                onChange={(e) => setMagneticField(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Earth's field: ~50 μT, MRI: 1.5-3 T
              </p>
            </div>
            <div>
              <Label>Angle (θ) in degrees</Label>
              <Input
                type="number"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                90° = maximum force, 0° = no force
              </p>
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Magnetic Force
          </Button>

          {result !== null && (
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <Label>Magnetic Force</Label>
                <p className="text-3xl font-bold mt-2">{result.toFixed(6)} N</p>
                <p className="text-sm text-muted-foreground">
                  {(result * 1000).toFixed(4)} mN
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <Label>Force vs Angle</Label>
                <div className="grid grid-cols-5 gap-2 mt-2 text-center text-sm">
                  {[0, 30, 60, 90, 120].map((a) => {
                    const force = parseFloat(magneticField) * parseFloat(current) * parseFloat(length) * Math.sin((a * Math.PI) / 180);
                    return (
                      <div key={a} className={`p-2 rounded ${a === parseInt(angle) ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        <div>{a}°</div>
                        <div className="font-semibold">{force.toFixed(4)} N</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <Label>Right-Hand Rule</Label>
                <p className="text-sm mt-2 text-muted-foreground">
                  Point your fingers in the direction of current (I), curl them toward the
                  magnetic field (B), and your thumb points in the direction of force (F).
                </p>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Results
              </Button>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
            <p className="font-semibold mb-2">About Magnetic Force:</p>
            <p className="text-muted-foreground">
              When a current-carrying wire is placed in a magnetic field, it experiences a
              force perpendicular to both the current direction and the magnetic field.
              This principle is used in electric motors and loudspeakers.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
