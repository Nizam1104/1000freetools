"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Move3D } from "lucide-react";

export default function ProjectileMotionSimulator() {
  const [initialVelocity, setInitialVelocity] = useState("50");
  const [angle, setAngle] = useState("45");
  const [initialHeight, setInitialHeight] = useState("0");
  const [gravity, setGravity] = useState("9.81");
  const [result, setResult] = useState<{
    timeOfFlight: number;
    max_height: number;
    range: number;
    finalVelocity: number;
  } | null>(null);
  const [trajectory, setTrajectory] = useState<Array<{ x: number; y: number }>>([]);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const v0 = parseFloat(initialVelocity) || 0;
    const theta = parseFloat(angle) || 0;
    const h0 = parseFloat(initialHeight) || 0;
    const g = parseFloat(gravity) || 9.81;

    const thetaRad = (theta * Math.PI) / 180;
    const v0x = v0 * Math.cos(thetaRad);
    const v0y = v0 * Math.sin(thetaRad);

    // Time to reach max height
    const tUp = v0y / g;
    
    // Max height
    const maxHeight = h0 + (v0y * v0y) / (2 * g);

    // Total time of flight (solving quadratic equation for y = 0)
    const discriminant = v0y * v0y + 2 * g * h0;
    const totalTime = (v0y + Math.sqrt(discriminant)) / g;

    // Range
    const range = v0x * totalTime;

    // Final velocity
    const finalVy = -Math.sqrt(v0y * v0y + 2 * g * h0);
    const finalVelocity = Math.sqrt(v0x * v0x + finalVy * finalVy);

    // Generate trajectory points
    const points: Array<{ x: number; y: number }> = [];
    const steps = 50;
    for (let i = 0; i <= steps; i++) {
      const t = (totalTime * i) / steps;
      const x = v0x * t;
      const y = h0 + v0y * t - 0.5 * g * t * t;
      if (y >= 0) {
        points.push({ x, y });
      }
    }

    setResult({
      timeOfFlight: totalTime,
      max_height: maxHeight,
      range,
      finalVelocity,
    });
    setTrajectory(points);
  }, [initialVelocity, angle, initialHeight, gravity]);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `Projectile Motion Results:\nInitial Velocity: ${initialVelocity} m/s, Angle: ${angle}°\nTime of Flight: ${result.timeOfFlight.toFixed(2)} s\nMax Height: ${result.max_height.toFixed(2)} m\nRange: ${result.range.toFixed(2)} m\nFinal Velocity: ${result.finalVelocity.toFixed(2)} m/s`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, initialVelocity, angle]);

  const loadPreset = useCallback((preset: string) => {
    const presets: Record<string, { v: string; a: string; h: string }> = {
      maxRange: { v: "50", a: "45", h: "0" },
      max_height: { v: "50", a: "90", h: "0" },
      cliff: { v: "50", a: "0", h: "50" },
      cannon: { v: "100", a: "30", h: "0" },
    };
    const p = presets[preset];
    if (p) {
      setInitialVelocity(p.v);
      setAngle(p.a);
      setInitialHeight(p.h);
    }
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Move3D className="w-5 h-5" />
            Projectile Motion Simulator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              Range = (v₀² × sin(2θ)) / g | Max Height = (v₀² × sin²(θ)) / (2g)
            </p>
          </div>

          <div>
            <Label>Presets</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button size="sm" variant="outline" onClick={() => loadPreset("maxRange")}>
                Max Range (45°)
              </Button>
              <Button size="sm" variant="outline" onClick={() => loadPreset("max_height")}>
                Max Height (90°)
              </Button>
              <Button size="sm" variant="outline" onClick={() => loadPreset("cliff")}>
                Cliff Launch
              </Button>
              <Button size="sm" variant="outline" onClick={() => loadPreset("cannon")}>
                Cannon
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Initial Velocity (m/s)</Label>
              <Input
                type="number"
                value={initialVelocity}
                onChange={(e) => setInitialVelocity(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Launch Angle (°)</Label>
              <Input
                type="number"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Initial Height (m)</Label>
              <Input
                type="number"
                value={initialHeight}
                onChange={(e) => setInitialHeight(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Gravity (m/s²)</Label>
              <Input
                type="number"
                step="0.01"
                value={gravity}
                onChange={(e) => setGravity(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Simulate Projectile
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <Label>Time of Flight</Label>
                  <p className="text-xl font-bold mt-2">{result.timeOfFlight.toFixed(2)} s</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <Label>Max Height</Label>
                  <p className="text-xl font-bold mt-2">{result.max_height.toFixed(2)} m</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <Label>Range</Label>
                  <p className="text-xl font-bold mt-2">{result.range.toFixed(2)} m</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <Label>Final Velocity</Label>
                  <p className="text-xl font-bold mt-2">{result.finalVelocity.toFixed(2)} m/s</p>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <Label>Trajectory Visualization</Label>
                <div className="mt-4 h-48 border-b border-l relative">
                  <svg className="w-full h-full" viewBox={`0 0 ${result.range * 1.1} ${result.max_height * 1.5}`} preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      points={trajectory.map((p) => `${p.x},${result.max_height * 1.5 - p.y}`).join(" ")}
                    />
                  </svg>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>0 m</span>
                  <span>Range: {result.range.toFixed(1)} m</span>
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
