"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Scale } from "lucide-react";

interface MassPoint {
  id: string;
  mass: string;
  x: string;
  y: string;
  z: string;
}

export default function CenterOfMassCalculator() {
  const [massPoints, setMassPoints] = useState<MassPoint[]>([
    { id: "1", mass: "10", x: "0", y: "0", z: "0" },
    { id: "2", mass: "20", x: "5", y: "0", z: "0" },
    { id: "3", mass: "15", x: "0", y: "3", z: "0" },
  ]);
  const [result, setResult] = useState<{ x: number; y: number; z: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const addMassPoint = useCallback(() => {
    const newPoint: MassPoint = {
      id: Date.now().toString(),
      mass: "1",
      x: "0",
      y: "0",
      z: "0",
    };
    setMassPoints([...massPoints, newPoint]);
  }, [massPoints]);

  const removeMassPoint = useCallback((id: string) => {
    if (massPoints.length <= 1) return;
    setMassPoints(massPoints.filter((p) => p.id !== id));
  }, [massPoints]);

  const updateMassPoint = useCallback((id: string, field: keyof MassPoint, value: string) => {
    setMassPoints(massPoints.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  }, [massPoints]);

  const calculate = useCallback(() => {
    let totalMass = 0;
    let sumMX = 0;
    let sumMY = 0;
    let sumMZ = 0;

    massPoints.forEach((point) => {
      const m = parseFloat(point.mass) || 0;
      const x = parseFloat(point.x) || 0;
      const y = parseFloat(point.y) || 0;
      const z = parseFloat(point.z) || 0;

      totalMass += m;
      sumMX += m * x;
      sumMY += m * y;
      sumMZ += m * z;
    });

    if (totalMass > 0) {
      setResult({
        x: sumMX / totalMass,
        y: sumMY / totalMass,
        z: sumMZ / totalMass,
      });
    }
  }, [massPoints]);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `Center of Mass:\nx = ${result.x.toFixed(4)}\ny = ${result.y.toFixed(4)}\nz = ${result.z.toFixed(4)}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5" />
            Center of Mass Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              COM = (Σmᵢrᵢ) / Σmᵢ
            </p>
          </div>

          <div className="space-y-3">
            {massPoints.map((point, index) => (
              <div key={point.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Label>Mass Point {index + 1}</Label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeMassPoint(point.id)}
                    disabled={massPoints.length <= 1}
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <Label className="text-xs">Mass (kg)</Label>
                    <Input
                      type="number"
                      value={point.mass}
                      onChange={(e) => updateMassPoint(point.id, "mass", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">X (m)</Label>
                    <Input
                      type="number"
                      value={point.x}
                      onChange={(e) => updateMassPoint(point.id, "x", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Y (m)</Label>
                    <Input
                      type="number"
                      value={point.y}
                      onChange={(e) => updateMassPoint(point.id, "y", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Z (m)</Label>
                    <Input
                      type="number"
                      value={point.z}
                      onChange={(e) => updateMassPoint(point.id, "z", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={addMassPoint} variant="outline" className="w-full">
            Add Mass Point
          </Button>

          <Button onClick={calculate} className="w-full">
            Calculate Center of Mass
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <Label>X Coordinate</Label>
                  <p className="text-2xl font-bold mt-2">{result.x.toFixed(4)} m</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <Label>Y Coordinate</Label>
                  <p className="text-2xl font-bold mt-2">{result.y.toFixed(4)} m</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <Label>Z Coordinate</Label>
                  <p className="text-2xl font-bold mt-2">{result.z.toFixed(4)} m</p>
                </div>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Results
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
