"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Lightbulb } from "lucide-react";

export default function SnellsLawCalculator() {
  const [n1, setN1] = useState("1.00");
  const [n2, setN2] = useState("1.50");
  const [theta1, setTheta1] = useState("30");
  const [knownAngle, setKnownAngle] = useState<"incident" | "refracted">("incident");
  const [result, setResult] = useState<{
    theta2: number;
    criticalAngle: number | null;
    hasTotalInternalReflection: boolean;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const n1Val = parseFloat(n1) || 1;
    const n2Val = parseFloat(n2) || 1.5;
    const theta1Val = parseFloat(theta1) || 0;

    const theta1Rad = (theta1Val * Math.PI) / 180;

    // Snell's Law: n1 × sin(θ1) = n2 × sin(θ2)
    let theta2Rad: number;
    
    if (knownAngle === "incident") {
      const sinTheta2 = (n1Val * Math.sin(theta1Rad)) / n2Val;
      
      // Check for total internal reflection
      if (Math.abs(sinTheta2) > 1) {
        setResult({
          theta2: 0,
          criticalAngle: null,
          hasTotalInternalReflection: true,
        });
        return;
      }
      
      theta2Rad = Math.asin(sinTheta2);
    } else {
      const sinTheta1 = (n2Val * Math.sin((theta1Val * Math.PI) / 180)) / n1Val;
      theta2Rad = Math.asin(sinTheta1);
    }

    const theta2 = (theta2Rad * 180) / Math.PI;

    // Critical angle (only when going from higher to lower index)
    let criticalAngle: number | null = null;
    if (n1Val > n2Val) {
      criticalAngle = (Math.asin(n2Val / n1Val) * 180) / Math.PI;
    }

    setResult({
      theta2,
      criticalAngle,
      hasTotalInternalReflection: false,
    });
  }, [n1, n2, theta1, knownAngle]);

  const loadMaterial = useCallback((material: string, isMedium1: boolean) => {
    const indices: Record<string, string> = {
      vacuum: "1.0",
      air: "1.0003",
      water: "1.33",
      glass: "1.50",
      diamond: "2.42",
      acrylic: "1.49",
      ethanol: "1.36",
    };
    if (isMedium1) {
      setN1(indices[material] || "1.00");
    } else {
      setN2(indices[material] || "1.50");
    }
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `Snell's Law Result:\nn₁ = ${n1}, n₂ = ${n2}, θ₁ = ${theta1}°\nθ₂ = ${result.theta2.toFixed(2)}°${
          result.criticalAngle ? `\nCritical Angle: ${result.criticalAngle.toFixed(2)}°` : ""
        }`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, n1, n2, theta1]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Snell's Law Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              n₁ × sin(θ₁) = n₂ × sin(θ₂)
            </p>
          </div>

          <div>
            <Label>Medium 1 (Incident)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["vacuum", "air", "water", "glass", "diamond"].map((material) => (
                <Button
                  key={material}
                  size="sm"
                  variant="outline"
                  onClick={() => loadMaterial(material, true)}
                >
                  {material.charAt(0).toUpperCase() + material.slice(1)}
                </Button>
              ))}
            </div>
            <Input
              type="number"
              step="0.01"
              value={n1}
              onChange={(e) => setN1(e.target.value)}
              className="mt-2"
              placeholder="Refractive index"
            />
          </div>

          <div>
            <Label>Medium 2 (Refracted)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["air", "water", "glass", "diamond", "acrylic"].map((material) => (
                <Button
                  key={material}
                  size="sm"
                  variant="outline"
                  onClick={() => loadMaterial(material, false)}
                >
                  {material.charAt(0).toUpperCase() + material.slice(1)}
                </Button>
              ))}
            </div>
            <Input
              type="number"
              step="0.01"
              value={n2}
              onChange={(e) => setN2(e.target.value)}
              className="mt-2"
              placeholder="Refractive index"
            />
          </div>

          <div>
            <Label>Known Angle</Label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={knownAngle === "incident"}
                  onChange={() => setKnownAngle("incident")}
                />
                Incident Angle (θ₁)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={knownAngle === "refracted"}
                  onChange={() => setKnownAngle("refracted")}
                />
                Refracted Angle (θ₂)
              </label>
            </div>
            <Input
              type="number"
              value={theta1}
              onChange={(e) => setTheta1(e.target.value)}
              className="mt-2"
              placeholder="Angle in degrees"
            />
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Refraction
          </Button>

          {result && (
            <div className="space-y-4">
              {result.hasTotalInternalReflection ? (
                <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg text-center">
                  <Label>Total Internal Reflection</Label>
                  <p className="text-lg mt-2">
                    Light cannot pass into medium 2 at this angle.
                    All light is reflected back into medium 1.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <Label>Refracted Angle (θ₂)</Label>
                    <p className="text-3xl font-bold mt-2">{result.theta2.toFixed(2)}°</p>
                  </div>

                  {result.criticalAngle !== null && (
                    <div className="p-4 border rounded-lg">
                      <Label>Critical Angle</Label>
                      <p className="text-2xl font-bold mt-2">{result.criticalAngle.toFixed(2)}°</p>
                      <p className="text-sm text-muted-foreground">
                        Angles greater than this cause total internal reflection
                      </p>
                    </div>
                  )}

                  <div className="p-4 border rounded-lg">
                    <Label>Visualization</Label>
                    <div className="mt-4 h-32 border-b relative">
                      <svg className="w-full h-full" viewBox="0 0 200 100">
                        {/* Normal line */}
                        <line x1="100" y1="0" x2="100" y2="100" stroke="gray" strokeDasharray="4" />
                        {/* Interface */}
                        <line x1="0" y1="50" x2="200" y2="50" stroke="black" strokeWidth="2" />
                        {/* Incident ray */}
                        <line
                          x1="20"
                          y1="20"
                          x2="100"
                          y2="50"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                        />
                        {/* Refracted ray */}
                        <line
                          x1="100"
                          y1="50"
                          x2="180"
                          y2={50 + 80 * Math.tan((result.theta2 * Math.PI) / 180)}
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                </>
              )}

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Results
              </Button>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
            <p className="font-semibold mb-2">About Snell's Law:</p>
            <p className="text-muted-foreground">
              Snell's Law describes how light bends when passing between media with different
              refractive indices. When light enters a denser medium, it bends toward the normal.
              Total internal reflection occurs when light tries to exit a denser medium at a
              steep angle.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
