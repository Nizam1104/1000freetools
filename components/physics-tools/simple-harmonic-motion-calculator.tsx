"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Waves } from "lucide-react";

export default function SimpleHarmonicMotionCalculator() {
  const [mass, setMass] = useState("1");
  const [springConstant, setSpringConstant] = useState("10");
  const [amplitude, setAmplitude] = useState("0.1");
  const [time, setTime] = useState("0");
  const [result, setResult] = useState<{
    angularFreq: number;
    period: number;
    frequency: number;
    position: number;
    velocity: number;
    acceleration: number;
    maxVelocity: number;
    maxAcceleration: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const m = parseFloat(mass) || 0;
    const k = parseFloat(springConstant) || 0;
    const A = parseFloat(amplitude) || 0;
    const t = parseFloat(time) || 0;

    // Angular frequency: ω = √(k/m)
    const omega = Math.sqrt(k / m);

    // Period: T = 2π/ω
    const period = (2 * Math.PI) / omega;

    // Frequency: f = 1/T
    const frequency = 1 / period;

    // Position: x(t) = A × cos(ωt)
    const position = A * Math.cos(omega * t);

    // Velocity: v(t) = -Aω × sin(ωt)
    const velocity = -A * omega * Math.sin(omega * t);

    // Acceleration: a(t) = -Aω² × cos(ωt)
    const acceleration = -A * omega * omega * Math.cos(omega * t);

    // Maximum values
    const maxVelocity = A * omega;
    const maxAcceleration = A * omega * omega;

    setResult({
      angularFreq: omega,
      period,
      frequency,
      position,
      velocity,
      acceleration,
      maxVelocity,
      maxAcceleration,
    });
  }, [mass, springConstant, amplitude, time]);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `Simple Harmonic Motion Results:\nm = ${mass} kg, k = ${springConstant} N/m, A = ${amplitude} m\nω = ${result.angularFreq.toFixed(4)} rad/s\nT = ${result.period.toFixed(4)} s, f = ${result.frequency.toFixed(4)} Hz\nAt t = ${time} s: x = ${result.position.toFixed(4)} m, v = ${result.velocity.toFixed(4)} m/s, a = ${result.acceleration.toFixed(4)} m/s²`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, mass, springConstant, amplitude, time]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Waves className="w-5 h-5" />
            Simple Harmonic Motion Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              ω = √(k/m) | x(t) = A × cos(ωt) | T = 2π√(m/k)
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
              <Label>Spring Constant (k) in N/m</Label>
              <Input
                type="number"
                value={springConstant}
                onChange={(e) => setSpringConstant(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Amplitude (A) in meters</Label>
              <Input
                type="number"
                value={amplitude}
                onChange={(e) => setAmplitude(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Time (t) in seconds</Label>
              <Input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate SHM Parameters
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-center">
                  <Label className="text-xs">Angular Frequency</Label>
                  <p className="text-lg font-bold mt-1">{result.angularFreq.toFixed(4)}</p>
                  <p className="text-xs text-muted-foreground">rad/s</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg text-center">
                  <Label className="text-xs">Period</Label>
                  <p className="text-lg font-bold mt-1">{result.period.toFixed(4)}</p>
                  <p className="text-xs text-muted-foreground">seconds</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg text-center">
                  <Label className="text-xs">Frequency</Label>
                  <p className="text-lg font-bold mt-1">{result.frequency.toFixed(4)}</p>
                  <p className="text-xs text-muted-foreground">Hz</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg text-center">
                  <Label className="text-xs">Max Velocity</Label>
                  <p className="text-lg font-bold mt-1">{result.maxVelocity.toFixed(4)}</p>
                  <p className="text-xs text-muted-foreground">m/s</p>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <Label>At Time t = {time} s</Label>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Position</p>
                    <p className="text-2xl font-bold">{result.position.toFixed(4)} m</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Velocity</p>
                    <p className="text-2xl font-bold">{result.velocity.toFixed(4)} m/s</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Acceleration</p>
                    <p className="text-2xl font-bold">{result.acceleration.toFixed(4)} m/s²</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <Label>Energy Analysis</Label>
                <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                  <div>
                    Max Potential Energy: {(0.5 * parseFloat(springConstant) * parseFloat(amplitude) ** 2).toFixed(4)} J
                  </div>
                  <div>
                    Max Kinetic Energy: {(0.5 * parseFloat(mass) * result.maxVelocity ** 2).toFixed(4)} J
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
            <p className="font-semibold mb-2">About Simple Harmonic Motion:</p>
            <p className="text-muted-foreground">
              SHM occurs when a restoring force is proportional to displacement. Common
              examples include mass-spring systems and pendulums (for small angles). The
              motion is sinusoidal with constant period independent of amplitude.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
