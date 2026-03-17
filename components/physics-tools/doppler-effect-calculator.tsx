"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Waves } from "lucide-react";

export default function DopplerEffectCalculator() {
  const [sourceFrequency, setSourceFrequency] = useState("1000");
  const [sourceVelocity, setSourceVelocity] = useState("30");
  const [observerVelocity, setObserverVelocity] = useState("0");
  const [soundSpeed, setSoundSpeed] = useState("343");
  const [scenario, setScenario] = useState<"approaching" | "receding">("approaching");
  const [result, setResult] = useState<{ observedFreq: number; shift: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const f0 = parseFloat(sourceFrequency) || 0;
    const vs = parseFloat(sourceVelocity) || 0;
    const vo = parseFloat(observerVelocity) || 0;
    const v = parseFloat(soundSpeed) || 343;

    let observedFreq: number;

    if (scenario === "approaching") {
      // Observer and source approaching each other
      observedFreq = f0 * ((v + vo) / (v - vs));
    } else {
      // Observer and source receding from each other
      observedFreq = f0 * ((v - vo) / (v + vs));
    }

    const shift = observedFreq - f0;
    setResult({ observedFreq, shift });
  }, [sourceFrequency, sourceVelocity, observerVelocity, soundSpeed, scenario]);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `Doppler Effect Result:\nSource Frequency: ${sourceFrequency} Hz\nObserved Frequency: ${result.observedFreq.toFixed(2)} Hz\nFrequency Shift: ${result.shift.toFixed(2)} Hz`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, sourceFrequency]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Waves className="w-5 h-5" />
            Doppler Effect Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              f = f₀ × (v ± v₀) / (v ∓ vₛ)
            </p>
          </div>

          <div>
            <Label>Scenario</Label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={scenario === "approaching"}
                  onChange={() => setScenario("approaching")}
                />
                Approaching (moving toward each other)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={scenario === "receding"}
                  onChange={() => setScenario("receding")}
                />
                Receding (moving away from each other)
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Source Frequency (f₀) in Hz</Label>
              <Input
                type="number"
                value={sourceFrequency}
                onChange={(e) => setSourceFrequency(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Speed of Sound (v) in m/s</Label>
              <Input
                type="number"
                value={soundSpeed}
                onChange={(e) => setSoundSpeed(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Air at 20°C: 343 m/s
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Source Velocity (vₛ) in m/s</Label>
              <Input
                type="number"
                value={sourceVelocity}
                onChange={(e) => setSourceVelocity(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Observer Velocity (v₀) in m/s</Label>
              <Input
                type="number"
                value={observerVelocity}
                onChange={(e) => setObserverVelocity(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Observed Frequency
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <Label>Observed Frequency</Label>
                  <p className="text-2xl font-bold mt-2">
                    {result.observedFreq.toFixed(2)} Hz
                  </p>
                </div>
                <div className={`p-4 rounded-lg text-center ${
                  result.shift > 0 ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"
                }`}>
                  <Label>Frequency Shift</Label>
                  <p className={`text-2xl font-bold mt-2 ${
                    result.shift > 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {result.shift > 0 ? "+" : ""}{result.shift.toFixed(2)} Hz
                  </p>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <Label>Wavelength Change</Label>
                <p className="text-sm mt-2">
                  Original wavelength: {(parseFloat(soundSpeed) / parseFloat(sourceFrequency)).toFixed(4)} m
                  <br />
                  Observed wavelength: {(parseFloat(soundSpeed) / result.observedFreq).toFixed(4)} m
                </p>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Results
              </Button>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
            <p className="font-semibold mb-2">About the Doppler Effect:</p>
            <p className="text-muted-foreground">
              The Doppler Effect is the change in frequency of a wave in relation to an observer
              who is moving relative to the wave source. Common examples include the changing pitch
              of a siren as it passes by.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
