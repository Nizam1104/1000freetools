"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DynamicRangeResult {
  peakLevel: number;
  noiseFloor: number;
  dynamicRange: number;
  bitDepth: number;
  qualityRating: string;
  comparisons: Array<{ format: string; dynamicRange: string }>;
  recommendations: string[];
}

export default function AudioDynamicRangeCalculatorPage() {
  const [peakLevel, setPeakLevel] = useState<string>("0");
  const [noiseFloor, setNoiseFloor] = useState<string>("-60");
  const [result, setResult] = useState<DynamicRangeResult | null>(null);

  const calculate = () => {
    const peakNum = parseFloat(peakLevel) || 0;
    const noiseNum = parseFloat(noiseFloor) || -60;

    // Dynamic range = Peak - Noise Floor
    const dynamicRange = peakNum - noiseNum;

    // Equivalent bit depth (6 dB per bit approximately)
    const bitDepth = dynamicRange / 6;

    // Quality rating
    let qualityRating = "";
    if (dynamicRange >= 120) {
      qualityRating = "🏆 Exceptional - Professional studio quality";
    } else if (dynamicRange >= 90) {
      qualityRating = "✅ Excellent - High-quality recording";
    } else if (dynamicRange >= 60) {
      qualityRating = "⚖️ Good - Acceptable for most purposes";
    } else if (dynamicRange >= 40) {
      qualityRating = "⚠️ Fair - Limited dynamic range";
    } else {
      qualityRating = "❌ Poor - Significant noise issues";
    }

    // Comparisons
    const comparisons = [
      { format: "CD (16-bit)", dynamicRange: "96 dB" },
      { format: "DVD-A (24-bit)", dynamicRange: "144 dB" },
      { format: "Vinyl LP", dynamicRange: "60-70 dB" },
      { format: "Cassette", dynamicRange: "50-60 dB" },
    ];

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📊 Peak level: ${peakNum} dBFS`);
    recommendations.push(`🔇 Noise floor: ${noiseNum} dBFS`);
    recommendations.push(`🎚️ Dynamic range: ${dynamicRange.toFixed(1)} dB`);
    recommendations.push(`💾 Equivalent bit depth: ~${bitDepth.toFixed(1)} bits`);

    if (dynamicRange < 60) {
      recommendations.push("⚠️ Low dynamic range - check for noise issues");
      recommendations.push("🎤 Consider better microphone or preamp");
      recommendations.push("🔌 Check cables and connections for noise");
    } else if (dynamicRange < 90) {
      recommendations.push("✅ Acceptable for most applications");
      recommendations.push("📈 Consider noise reduction for improvement");
    } else {
      recommendations.push("🏆 Excellent dynamic range - professional quality");
    }

    if (peakNum > -1) {
      recommendations.push("⚠️ Peak near 0 dBFS - risk of clipping");
      recommendations.push("📉 Leave 3-6 dB headroom for mastering");
    }

    setResult({
      peakLevel: peakNum,
      noiseFloor: noiseNum,
      dynamicRange,
      bitDepth: parseFloat(bitDepth.toFixed(1)),
      qualityRating,
      comparisons,
      recommendations,
    });
  };

  const reset = () => {
    setPeakLevel("0");
    setNoiseFloor("-60");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Audio Dynamic Range Calculator – Calculate dB Dynamic Range of Audio Signals
          </h1>
          <p className="text-muted-foreground">
            Measure the dynamic range of your audio recordings with our Dynamic Range Calculator.
            Enter peak level and noise floor in dB to calculate dynamic range — a key metric for
            mastering engineers, sound designers, and audiophiles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="peak">Peak Level (dBFS)</Label>
                <Input
                  id="peak"
                  type="number"
                  step="0.1"
                  value={peakLevel}
                  onChange={(e) => setPeakLevel(e.target.value)}
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  Maximum signal level (0 dBFS = maximum)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="noise">Noise Floor (dBFS)</Label>
                <Input
                  id="noise"
                  type="number"
                  step="0.1"
                  value={noiseFloor}
                  onChange={(e) => setNoiseFloor(e.target.value)}
                  placeholder="-60"
                />
                <p className="text-xs text-muted-foreground">
                  Background noise level (negative value)
                </p>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Reference Values:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 0 dBFS: Maximum digital level</li>
                  <li>• -60 dB: Very quiet noise floor</li>
                  <li>• -90 dB: Excellent noise floor</li>
                  <li>• -120 dB: Theoretical 20-bit limit</li>
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
              <h3 className="text-lg font-semibold mb-4">Dynamic Range Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.dynamicRange >= 90 ? "bg-green-100 dark:bg-green-900/20" :
                    result.dynamicRange >= 60 ? "bg-blue-100 dark:bg-blue-900/20" :
                    result.dynamicRange >= 40 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Dynamic Range</p>
                    <p className="text-5xl font-bold">{result.dynamicRange.toFixed(1)} dB</p>
                    <p className="text-sm mt-1">{result.qualityRating}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Peak Level:</span>
                      <span className="font-semibold">{result.peakLevel} dBFS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Noise Floor:</span>
                      <span className="font-semibold">{result.noiseFloor} dBFS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Bit Depth Equivalent:</span>
                      <span className="font-semibold">~{result.bitDepth} bits</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Format Comparisons</h4>
                    <div className="space-y-1">
                      {result.comparisons.map((comp, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>{comp.format}</span>
                          <span className="font-mono">{comp.dynamicRange}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter audio levels and click Calculate to see analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Dynamic Range
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Formula:</strong> Dynamic Range = Peak Level - Noise Floor
                  </li>
                  <li>
                    <strong>Bit depth:</strong> ~6 dB per bit (16-bit = 96 dB)
                  </li>
                  <li>
                    <strong>0 dBFS:</strong> Maximum digital level (clipping point)
                  </li>
                  <li>
                    <strong>Headroom:</strong> Leave 3-6 dB below 0 dBFS for mastering
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Dynamic range is crucial for audio quality.
                  Higher dynamic range means more detail between the quietest and
                  loudest sounds. Modern music often has reduced dynamic range due
                  to compression (the &quot;loudness war&quot;).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
