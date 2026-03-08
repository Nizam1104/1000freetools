"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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
                  <div className={`p-4 rounded-lg text-center ${result.dB >= 120 ? "bg-red-100 dark:bg-red-900/20" :
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
                How to Use This Decibel to Power Converter
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter the decibel level</p>
                    <p>Input any dB value — positive, negative, or zero. Common sound levels range from 0 dB (threshold of hearing) to 140 dB (pain threshold).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select the reference type</p>
                    <p>Choose Sound (20 μPa) for acoustic measurements, Power (1 mW) for RF/audio power, or Voltage (0.775 V) for line level signals.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click Calculate to see results</p>
                    <p>The converter shows power ratio, sound intensity in W/m², sound pressure in mPa, and a comparison to common sounds.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Common Sound Levels Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Sound Source</th>
                      <th className="text-left py-3 px-2 font-semibold">dB Level</th>
                      <th className="text-left py-3 px-2 font-semibold">Intensity (W/m²)</th>
                      <th className="text-left py-3 px-2 font-semibold">Safety</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Threshold of hearing</td>
                      <td className="py-3 px-2">0 dB</td>
                      <td className="py-3 px-2">10⁻¹²</td>
                      <td className="py-3 px-2">Safe</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Whisper</td>
                      <td className="py-3 px-2">20-30 dB</td>
                      <td className="py-3 px-2">10⁻¹⁰ to 10⁻⁹</td>
                      <td className="py-3 px-2">Safe</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Normal conversation</td>
                      <td className="py-3 px-2">60 dB</td>
                      <td className="py-3 px-2">10⁻⁶</td>
                      <td className="py-3 px-2">Safe</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Busy traffic</td>
                      <td className="py-3 px-2">70-80 dB</td>
                      <td className="py-3 px-2">10⁻⁵ to 10⁻⁴</td>
                      <td className="py-3 px-2">Safe (prolonged exposure caution)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Power tools</td>
                      <td className="py-3 px-2">90-100 dB</td>
                      <td className="py-3 px-2">10⁻³ to 10⁻²</td>
                      <td className="py-3 px-2">Hearing protection required</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Rock concert</td>
                      <td className="py-3 px-2">110-120 dB</td>
                      <td className="py-3 px-2">10⁻¹ to 1</td>
                      <td className="py-3 px-2">Dangerous without protection</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Jet engine (100 ft)</td>
                      <td className="py-3 px-2">140 dB</td>
                      <td className="py-3 px-2">100</td>
                      <td className="py-3 px-2">Pain threshold</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                OSHA recommends hearing protection for exposures above 85 dB for 8 hours or more. Every 3 dB increase halves safe exposure time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Decibel Conversions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Decibel Scale</h4>
                  <p>
                    Decibels use a logarithmic scale because human hearing spans an enormous range. The quietest sound we hear is 0.00002 Pa pressure. The loudest tolerable is about 200 Pa — a 10 million to 1 ratio. Logarithms compress this to 0-140 dB.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Power Ratio Formula</h4>
                  <p>
                    Power ratio = 10^(dB/10). A 10 dB increase means 10× the power. A 20 dB increase means 100× the power. This is why small dB changes represent large power differences.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Sound Intensity</h4>
                  <p>
                    Intensity measures power per unit area (W/m²). The reference is 10⁻¹² W/m² — the quietest sound humans can detect. Each 10 dB increase multiplies intensity by 10.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Sound Pressure</h4>
                  <p>
                    Sound pressure is measured in Pascals (Pa). Human hearing threshold is 20 micropascals (μPa). Pressure uses 20^(dB/20) because intensity is proportional to pressure squared.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Hearing Safety Guidelines
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Know Safe Exposure Limits</p>
                    <p>85 dB: 8 hours max. 88 dB: 4 hours. 91 dB: 2 hours. Every 3 dB doubles intensity and halves safe time. At 100 dB, limit is 15 minutes.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use Hearing Protection</p>
                    <p>Earplugs reduce sound by 15-30 dB. Earmuffs provide similar protection. For very loud environments (100+ dB), use both together for maximum protection.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Watch for Warning Signs</p>
                    <p>Ringing in ears (tinnitus), muffled hearing after noise exposure, or needing to shout to be heard at arm&apos;s length all indicate dangerous sound levels.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Give Your Ears Recovery Time</p>
                    <p>After loud noise exposure, allow 16+ hours of quiet for your ears to recover. Repeated exposure without recovery causes cumulative, permanent damage.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What does 0 dB mean?</h4>
                  <p>
                    0 dB doesn&apos;t mean no sound — it means the sound is at the reference level (threshold of human hearing). Negative dB values are sounds quieter than we can typically hear.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why is the decibel scale logarithmic?</h4>
                  <p>
                    Human hearing perceives loudness logarithmically, not linearly. A sound must be 10× more powerful to seem twice as loud. The dB scale matches how we actually hear.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How loud is too loud?</h4>
                  <p>
                    Sounds above 85 dB can cause hearing damage with prolonged exposure. Above 120 dB causes immediate discomfort. Above 140 dB can cause instant, permanent damage.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What is sound intensity?</h4>
                  <p>
                    Sound intensity is power per unit area, measured in watts per square meter (W/m²). It represents how much acoustic energy passes through a given area each second.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I convert dB to watts?</h4>
                  <p>
                    For power: Watts = Reference × 10^(dB/10). For dBm (reference = 1 mW): Watts = 0.001 × 10^(dBm/10). Example: 30 dBm = 0.001 × 10^3 = 1 watt.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
