"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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
                  <div className={`p-4 rounded-lg text-center ${result.dynamicRange >= 90 ? "bg-green-100 dark:bg-green-900/20" :
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

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                How to Use This Audio Dynamic Range Calculator
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Enter Your Peak Level</p>
                    <p>Input the maximum signal level of your audio in dBFS. Most recordings peak between -6 dBFS and 0 dBFS. Remember that 0 dBFS is the maximum digital level—going above this causes clipping and distortion.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Enter Your Noise Floor</p>
                    <p>Input the background noise level in dBFS. This is the quietest part of your recording when no intentional sound is present. Typical values range from -60 dBFS (acceptable) to -90 dBFS or lower (excellent).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Review Your Results</p>
                    <p>Click Calculate to see your dynamic range, quality rating, and how your recording compares to standard audio formats. Use the recommendations to identify potential improvements.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Understanding Dynamic Range
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  <strong>What is dynamic range?</strong> Dynamic range is the difference between the loudest and quietest parts of an audio signal. It measures how much variation exists between the peak level and the noise floor. A recording with wide dynamic range has both very quiet and very loud passages, while a compressed recording has less variation.
                </p>
                <p>
                  <strong>Measured in decibels (dB).</strong> Dynamic range is expressed in decibels (dB), a logarithmic unit that describes the ratio between two values. In audio, we typically measure in dBFS (decibels relative to full scale), where 0 dBFS represents the maximum possible digital level.
                </p>
                <p>
                  <strong>Why it matters in audio quality.</strong> Dynamic range directly affects how natural and engaging music sounds. Higher dynamic range preserves the emotional impact of quiet passages and the power of loud moments. It gives music breathing room and allows listeners to hear subtle details that get lost in heavily compressed audio.
                </p>
                <p>
                  <strong>Dynamic range vs signal-to-noise ratio.</strong> While related, these are different measurements. Dynamic range measures the span between the loudest peak and the noise floor. Signal-to-noise ratio (SNR) compares the level of your desired signal to the background noise. A recording can have good SNR but limited dynamic range if it's heavily compressed.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Dynamic Range by Audio Format
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">Format</th>
                      <th className="text-left py-2 px-3 font-semibold">Theoretical Dynamic Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-3">16-bit CD</td>
                      <td className="py-2 px-3">96 dB</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">24-bit audio</td>
                      <td className="py-2 px-3">144 dB</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">MP3 128kbps</td>
                      <td className="py-2 px-3">~60-70 dB</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">MP3 320kbps</td>
                      <td className="py-2 px-3">~80-90 dB</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Vinyl LP</td>
                      <td className="py-2 px-3">55-70 dB</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Cassette tape</td>
                      <td className="py-2 px-3">50-60 dB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: These are theoretical maximums. Actual dynamic range depends on recording quality, mastering decisions, and playback equipment.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Typical Dynamic Range by Genre
              </h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium text-foreground">Classical music</span>
                  <span className="font-mono">50+ dB (wide dynamics)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium text-foreground">Jazz</span>
                  <span className="font-mono">30-40 dB</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium text-foreground">Rock/Pop</span>
                  <span className="font-mono">15-25 dB</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium text-foreground">Modern pop (loudness war)</span>
                  <span className="font-mono">8-15 dB</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                These ranges reflect typical mastering practices. Classical recordings preserve wide dynamics for emotional expression, while modern pop often sacrifices dynamic range for perceived loudness.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                The Loudness War
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  <strong>What it is.</strong> The loudness war refers to the trend in music production where recordings are made progressively louder through dynamic range compression and limiting. The goal is to make tracks sound louder than competing songs when played on radio, streaming services, or playlists.
                </p>
                <p>
                  <strong>Effects on sound quality.</strong> Heavy compression reduces the difference between quiet and loud passages. This creates a consistently loud signal but sacrifices musical dynamics. The result is listener fatigue, loss of emotional impact, and audible distortion when pushed too far.
                </p>
                <p>
                  <strong>Dynamic range compression.</strong> Compression reduces dynamic range by making quiet sounds louder and loud sounds quieter. When overused, it creates a flat, lifeless sound where everything sits at the same volume level. Instruments lose their natural attack and decay characteristics.
                </p>
                <p>
                  <strong>Recent trends toward better dynamics.</strong> Since around 2010, there's been a pushback against extreme compression. Streaming services now use loudness normalization (LUFS), which levels the playing field by adjusting playback volume. This reduces the incentive to master as loud as possible, allowing engineers to preserve more dynamic range.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6 text-sm text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">What is dynamic range in audio?</h3>
                  <p>Dynamic range is the difference between the loudest and quietest parts of an audio signal, measured in decibels (dB). It represents how much variation exists in volume throughout a recording. Higher dynamic range means more contrast between soft and loud passages.</p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Is higher dynamic range better?</h3>
                  <p>Generally, yes. Higher dynamic range preserves more musical detail and emotional expression. However, the ideal range depends on the genre and listening context. Classical music benefits from wide dynamics, while some electronic genres intentionally use compression as a creative tool.</p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">What is a good dynamic range for music?</h3>
                  <p>For most genres, 10-20 dB is common in modern releases. Classical and jazz recordings often exceed 30-50 dB. Anything below 8 dB is considered heavily compressed. Professional recordings typically aim for at least 12-15 dB to maintain musicality while remaining competitive in loudness.</p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Why is modern music so compressed?</h3>
                  <p>Modern music is compressed to sound louder than other tracks when played in sequence. This started with radio and CDs, where louder tracks grabbed more attention. Streaming normalization is changing this, but the habit persists in many productions.</p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Does dynamic range matter for streaming?</h3>
                  <p>Yes, but less than before. Streaming services like Spotify, Apple Music, and YouTube use loudness normalization, which adjusts all tracks to similar playback levels. This means heavily compressed tracks no longer have a loudness advantage, making dynamic range more viable for streaming releases.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Related Tools
              </h2>
              <div className="space-y-2 text-sm">
                <a
                  href="/calculators/db-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-primary hover:underline"
                >
                  <span className="font-medium">dB Calculator</span>
                  <p className="text-xs text-muted-foreground mt-1">Calculate decibel values for audio and electronics</p>
                </a>
                <a
                  href="/calculators/signal-to-noise-ratio-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-primary hover:underline"
                >
                  <span className="font-medium">Signal-to-Noise Ratio Calculator</span>
                  <p className="text-xs text-muted-foreground mt-1">Measure SNR for audio systems and recordings</p>
                </a>
                <a
                  href="/calculators/decibel-to-power-converter"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-primary hover:underline"
                >
                  <span className="font-medium">Decibel to Power Converter</span>
                  <p className="text-xs text-muted-foreground mt-1">Convert between dB and power ratios</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
