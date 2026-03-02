"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DecibelResult {
  dB: number;
  powerRatio: number;
  intensity: number;
  soundPressure: number;
  comparison: string;
  recommendations: string[];
}

export default function DecibelToPowerConverterPage() {
  const [dB, setdB] = useState<string>("");
  const [referenceType, setReferenceType] = useState<string>("sound");
  const [result, setResult] = useState<DecibelResult | null>(null);

  const calculate = () => {
    const dBNum = parseFloat(dB) || 0;

    // Power ratio: 10^(dB/10)
    const powerRatio = Math.pow(10, dBNum / 10);

    // Sound intensity (W/m²) relative to threshold of hearing (10^-12 W/m²)
    const referenceIntensity = 1e-12;
    const intensity = referenceIntensity * Math.pow(10, dBNum / 10);

    // Sound pressure (Pa) relative to threshold (20 μPa)
    const referencePressure = 20e-6;
    const soundPressure = referencePressure * Math.pow(10, dBNum / 20);

    // Comparison to common sounds
    let comparison = "";
    if (dBNum < 0) {
      comparison = "Below threshold of hearing";
    } else if (dBNum < 10) {
      comparison = "Normal breathing";
    } else if (dBNum < 20) {
      comparison = "Whisper at 5 feet";
    } else if (dBNum < 30) {
      comparison = "Quiet library";
    } else if (dBNum < 40) {
      comparison = "Quiet room";
    } else if (dBNum < 50) {
      comparison = "Moderate rainfall";
    } else if (dBNum < 60) {
      comparison = "Normal conversation";
    } else if (dBNum < 70) {
      comparison = "Busy street traffic";
    } else if (dBNum < 80) {
      comparison = "Vacuum cleaner";
    } else if (dBNum < 90) {
      comparison = "Heavy truck traffic";
    } else if (dBNum < 100) {
      comparison = "Motorcycle, power tools";
    } else if (dBNum < 110) {
      comparison = "Rock concert, chainsaw";
    } else if (dBNum < 120) {
      comparison = "Thunder, ambulance siren";
    } else if (dBNum < 130) {
      comparison = "Pain threshold begins";
    } else if (dBNum < 140) {
      comparison = "Jet engine at 100ft";
    } else {
      comparison = "Dangerous - immediate hearing damage";
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📊 Power ratio: ${powerRatio.toExponential(2)}`);
    recommendations.push(`🔊 Intensity: ${intensity.toExponential(2)} W/m²`);
    recommendations.push(`📈 Sound pressure: ${(soundPressure * 1000).toFixed(4)} mPa`);

    if (dBNum >= 85) {
      recommendations.push("⚠️ Prolonged exposure can cause hearing damage");
      recommendations.push("🎧 Use hearing protection");
    }

    if (dBNum >= 120) {
      recommendations.push("🚨 Pain threshold - immediate damage possible");
      recommendations.push("🛑 Avoid exposure without protection");
    }

    if (dBNum < 0) {
      recommendations.push("ℹ️ Negative dB means below reference level");
    }

    setResult({
      dB: dBNum,
      powerRatio,
      intensity,
      soundPressure,
      comparison,
      recommendations,
    });
  };

  const reset = () => {
    setdB("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Decibel to Power Converter – Convert dB to Watts & Sound Pressure Level
          </h1>
          <p className="text-muted-foreground">
            Convert decibel levels to acoustic power and pressure measurements with our
            dB to Power Converter. Enter dB value to calculate power ratio, sound intensity,
            and SPL — essential for audio engineers, acousticians, and electronics designers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="db">Sound Level (dB)</Label>
                <Input
                  id="db"
                  type="number"
                  value={dB}
                  onChange={(e) => setdB(e.target.value)}
                  placeholder="e.g., 60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reference">Reference Type</Label>
                <Select value={referenceType} onValueChange={setReferenceType}>
                  <SelectTrigger id="reference">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sound">Sound (20 μPa)</SelectItem>
                    <SelectItem value="power">Power (1 mW)</SelectItem>
                    <SelectItem value="voltage">Voltage (0.775 V)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Common Sound Levels:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 0 dB: Threshold of hearing</li>
                  <li>• 60 dB: Normal conversation</li>
                  <li>• 85 dB: Prolonged exposure limit</li>
                  <li>• 120 dB: Pain threshold</li>
                </ul>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Conversion Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.dB >= 120 ? "bg-red-100 dark:bg-red-900/20" :
                    result.dB >= 85 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-green-100 dark:bg-green-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Comparison</p>
                    <p className="text-xl font-bold">{result.comparison}</p>
                    <p className="text-3xl font-bold mt-2">{result.dB} dB</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Power Ratio:</span>
                      <span className="font-mono text-sm">{result.powerRatio.toExponential(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Intensity:</span>
                      <span className="font-mono text-sm">{result.intensity.toExponential(2)} W/m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Sound Pressure:</span>
                      <span className="font-mono text-sm">{(result.soundPressure * 1000).toFixed(4)} mPa</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Safety Information</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter dB value and click Calculate to see conversions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Decibels
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Power ratio:</strong> 10^(dB/10)
                  </li>
                  <li>
                    <strong>Pressure ratio:</strong> 10^(dB/20)
                  </li>
                  <li>
                    <strong>+3 dB:</strong> Double the power
                  </li>
                  <li>
                    <strong>+10 dB:</strong> 10× the power, ~2× perceived loudness
                  </li>
                  <li>
                    <strong>0 dB SPL:</strong> Threshold of human hearing (20 μPa)
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Decibels are logarithmic. A 10 dB increase
                  represents 10× the power but is perceived as roughly 2× louder by
                  the human ear.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
