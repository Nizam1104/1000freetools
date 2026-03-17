"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Gauge } from "lucide-react";

export default function MachNumberCalculator() {
  const [objectSpeed, setObjectSpeed] = useState("340");
  const [soundSpeed, setSoundSpeed] = useState("343");
  const [altitude, setAltitude] = useState("0");
  const [result, setResult] = useState<{ mach: number; regime: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const v = parseFloat(objectSpeed) || 0;
    const c = parseFloat(soundSpeed) || 343;

    const mach = v / c;
    let regime = "Subsonic";
    if (mach >= 5) regime = "Hypersonic";
    else if (mach >= 1.2) regime = "Supersonic";
    else if (mach >= 0.8) regime = "Transonic";

    setResult({ mach, regime });
  }, [objectSpeed, soundSpeed]);

  const setAltitudePreset = useCallback((alt: number) => {
    setAltitude(alt.toString());
    // Speed of sound decreases with altitude
    const speeds: Record<number, number> = {
      0: 343,
      5000: 320,
      10000: 299,
      15000: 295,
      20000: 295,
    };
    setSoundSpeed((speeds[alt] || 343).toString());
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `Mach Number Calculation:\nObject Speed: ${objectSpeed} m/s\nSpeed of Sound: ${soundSpeed} m/s\nMach Number: ${result.mach.toFixed(4)}\nRegime: ${result.regime}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, objectSpeed, soundSpeed]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            Mach Number Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              M = v / c
            </p>
          </div>

          <div>
            <Label>Altitude Presets</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button size="sm" variant="outline" onClick={() => setAltitudePreset(0)}>
                Sea Level
              </Button>
              <Button size="sm" variant="outline" onClick={() => setAltitudePreset(5000)}>
                5,000 m
              </Button>
              <Button size="sm" variant="outline" onClick={() => setAltitudePreset(10000)}>
                10,000 m
              </Button>
              <Button size="sm" variant="outline" onClick={() => setAltitudePreset(15000)}>
                15,000 m
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Object Speed (v) in m/s</Label>
              <Input
                type="number"
                value={objectSpeed}
                onChange={(e) => setObjectSpeed(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Speed of Sound (c) in m/s</Label>
              <Input
                type="number"
                value={soundSpeed}
                onChange={(e) => setSoundSpeed(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                At sea level (20°C): 343 m/s
              </p>
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Mach Number
          </Button>

          {result && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg text-center ${
                result.mach >= 1 ? "bg-red-50 dark:bg-red-950" : "bg-green-50 dark:bg-green-950"
              }`}>
                <Label>Mach Number</Label>
                <p className={`text-4xl font-bold mt-2 ${
                  result.mach >= 1 ? "text-red-600" : "text-green-600"
                }`}>
                  M {result.mach.toFixed(4)}
                </p>
                <p className="text-lg mt-1">{result.regime}</p>
              </div>

              <div className="p-4 border rounded-lg">
                <Label>Flow Regimes</Label>
                <div className="mt-2 h-8 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded relative">
                  <div
                    className="absolute top-0 h-full w-1 bg-black transition-all"
                    style={{ left: `${Math.min(result.mach * 20, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>0</span>
                  <span>0.8</span>
                  <span>1.2</span>
                  <span>5</span>
                  <span>10+</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subsonic</span>
                  <span>Transonic</span>
                  <span>Supersonic</span>
                  <span>Hypersonic</span>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <Label>Speed Comparisons</Label>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div>km/h: {(parseFloat(objectSpeed) * 3.6).toFixed(2)}</div>
                  <div>mph: {(parseFloat(objectSpeed) * 2.237).toFixed(2)}</div>
                  <div>knots: {(parseFloat(objectSpeed) * 1.944).toFixed(2)}</div>
                  <div>ft/s: {(parseFloat(objectSpeed) * 3.281).toFixed(2)}</div>
                </div>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Results
              </Button>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
            <p className="font-semibold mb-2">Mach Number Regimes:</p>
            <ul className="text-muted-foreground list-disc list-inside space-y-1">
              <li>Subsonic: M &lt; 0.8</li>
              <li>Transonic: 0.8 ≤ M &lt; 1.2</li>
              <li>Supersonic: 1.2 ≤ M &lt; 5</li>
              <li>Hypersonic: M ≥ 5</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
