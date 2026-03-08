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

interface NoiseResult {
  noiseLevel: number;
  exposureTime: number;
  noiseDose: number;
  permissibleTime: number;
  standard: string;
  riskLevel: string;
  hearingProtection: string;
  recommendations: string[];
}

export default function NoiseExposureCalculatorPage() {
  const [noiseLevel, setNoiseLevel] = useState<string>("");
  const [exposureTime, setExposureTime] = useState<string>("");
  const [standard, setStandard] = useState<string>("osha");
  const [result, setResult] = useState<NoiseResult | null>(null);

  const calculate = () => {
    const noiseNum = parseFloat(noiseLevel) || 0;
    const timeNum = parseFloat(exposureTime) || 0;

    if (noiseNum === 0 || timeNum === 0) return;

    // OSHA uses 5 dB exchange rate, NIOSH uses 3 dB
    const exchangeRate = standard === "osha" ? 5 : 3;
    const criterionLevel = 90; // OSHA uses 90 dB, NIOSH uses 85 dB
    const criterionTime = 8; // 8 hours

    // Calculate permissible exposure time
    // T = 8 / 2^((L-90)/5) for OSHA
    // T = 8 / 2^((L-85)/3) for NIOSH
    const permissibleTime = criterionTime / Math.pow(2, (noiseNum - criterionLevel) / exchangeRate);

    // Calculate noise dose percentage
    // Dose = (C/T) × 100 where C = actual time, T = permissible time
    const noiseDose = (timeNum / permissibleTime) * 100;

    // Risk level
    let riskLevel = "";
    let hearingProtection = "";

    if (noiseNum < 70) {
      riskLevel = "Low - No significant risk";
      hearingProtection = "Not required";
    } else if (noiseNum < 85) {
      riskLevel = "Moderate - Prolonged exposure may cause damage";
      hearingProtection = "Recommended for extended exposure";
    } else if (noiseNum < 95) {
      riskLevel = "High - Hearing damage likely with prolonged exposure";
      hearingProtection = "Required - Use earplugs or earmuffs";
    } else if (noiseNum < 105) {
      riskLevel = "Very High - Damage can occur in minutes";
      hearingProtection = "Required - Double protection recommended";
    } else {
      riskLevel = "Extreme - Immediate damage possible";
      hearingProtection = "Required - Double protection (plugs + muffs)";
    }

    // Recommendations
    const recommendations: string[] = [];

    if (noiseDose > 100) {
      recommendations.push("🚨 OVER EXPOSURE! Reduce time or increase protection");
    } else if (noiseDose > 50) {
      recommendations.push("⚠️ High dose - monitor exposure carefully");
    }

    if (noiseNum >= 85) {
      recommendations.push("🎧 Hearing protection required by law in most workplaces");
      recommendations.push("📊 Implement hearing conservation program");
    }

    if (noiseNum >= 100) {
      recommendations.push("⏱️ Limit exposure time significantly");
      recommendations.push("🔇 Use engineering controls to reduce noise at source");
    }

    recommendations.push(`📊 Permissible exposure at ${noiseNum} dB: ${permissibleTime.toFixed(2)} hours`);
    recommendations.push(`⚠️ Every ${exchangeRate} dB increase halves safe exposure time`);

    setResult({
      noiseLevel: noiseNum,
      exposureTime: timeNum,
      noiseDose: parseFloat(noiseDose.toFixed(1)),
      permissibleTime: parseFloat(permissibleTime.toFixed(2)),
      standard: standard === "osha" ? "OSHA" : "NIOSH",
      riskLevel,
      hearingProtection,
      recommendations,
    });
  };

  const reset = () => {
    setNoiseLevel("");
    setExposureTime("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Noise Exposure Calculator – Calculate Safe Noise Levels & Exposure Time Limits
          </h1>
          <p className="text-muted-foreground">
            Protect your hearing with our Noise Exposure Calculator. Enter noise level in dB
            and daily exposure duration to calculate your noise dose and permissible exposure
            time per OSHA and NIOSH standards — critical for workplace safety and hearing conservation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="noise-level">Noise Level (dB)</Label>
                <Input
                  id="noise-level"
                  type="number"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(e.target.value)}
                  placeholder="e.g., 85"
                />
                <p className="text-xs text-muted-foreground">
                  Typical: Office 50dB, Traffic 85dB, Concert 110dB
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="exposure-time">Daily Exposure (hours)</Label>
                <Input
                  id="exposure-time"
                  type="number"
                  step="0.5"
                  value={exposureTime}
                  onChange={(e) => setExposureTime(e.target.value)}
                  placeholder="e.g., 8"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="standard">Safety Standard</Label>
                <Select value={standard} onValueChange={setStandard}>
                  <SelectTrigger id="standard">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="osha">OSHA (5 dB exchange, 90 dB criterion)</SelectItem>
                    <SelectItem value="niosh">NIOSH (3 dB exchange, 85 dB criterion)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Common Noise Levels:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Normal conversation: 60 dB</li>
                  <li>• City traffic: 85 dB</li>
                  <li>• Power tools: 95-105 dB</li>
                  <li>• Concert/club: 100-115 dB</li>
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
              <h3 className="text-lg font-semibold mb-4">Exposure Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${result.noiseDose <= 50 ? "bg-green-100 dark:bg-green-900/20" :
                      result.noiseDose <= 100 ? "bg-amber-100 dark:bg-amber-900/20" :
                        "bg-red-100 dark:bg-red-900/20"
                    }`}>
                    <p className="text-sm text-muted-foreground">Noise Dose</p>
                    <p className="text-4xl font-bold">{result.noiseDose}%</p>
                    <p className="text-sm mt-1">{result.riskLevel}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Permissible Time</p>
                      <p className="text-lg font-bold">{result.permissibleTime} hrs</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Protection</p>
                      <p className="text-sm font-bold">{result.hearingProtection.split(" ")[0]}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Noise Level:</span>
                      <span className="font-semibold">{result.noiseLevel} dB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Exposure Time:</span>
                      <span className="font-semibold">{result.exposureTime} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Standard:</span>
                      <span className="font-semibold">{result.standard}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Safety Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter noise details and click Calculate to see analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Noise Exposure Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>OSHA PEL:</strong> 90 dB for 8 hours (5 dB exchange rate)
                  </li>
                  <li>
                    <strong>NIOSH REL:</strong> 85 dB for 8 hours (3 dB exchange rate)
                  </li>
                  <li>
                    <strong>100% dose:</strong> Maximum permissible daily exposure
                  </li>
                  <li>
                    <strong>3 dB rule:</strong> Every 3 dB doubles sound energy
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> NIOSH recommendations are more protective than
                  OSHA requirements. Many experts recommend following NIOSH guidelines
                  for better hearing conservation.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How It Works Section */}
          <div className="mt-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">How to Calculate Noise Exposure</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Enter Noise Level</h3>
                <p className="text-sm text-muted-foreground">Input the sound level in decibels (dB) from your environment or equipment.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Set Exposure Duration</h3>
                <p className="text-sm text-muted-foreground">Enter how many hours you're exposed to this noise level daily.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Get Safety Analysis</h3>
                <p className="text-sm text-muted-foreground">See your noise dose percentage, permissible time, and hearing protection recommendations.</p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Key Features of Noise Exposure Calculator</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  OSHA and NIOSH Standards
                </h3>
                <p className="text-sm text-muted-foreground">Calculate exposure using both OSHA (5 dB exchange) and NIOSH (3 dB exchange) safety standards.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Noise Dose Percentage
                </h3>
                <p className="text-sm text-muted-foreground">See your daily noise dose as a percentage — over 100% means you're overexposed.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Risk Level Assessment
                </h3>
                <p className="text-sm text-muted-foreground">Get instant risk classification from low to extreme based on your noise exposure.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Protection Recommendations
                </h3>
                <p className="text-sm text-muted-foreground">Receive specific hearing protection advice based on your calculated exposure level.</p>
              </div>
            </div>

            <div className="mt-6 p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Noise Exposure Reference Guide</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-2">Common Noise Levels:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Normal conversation: 60 dB</li>
                    <li>• City traffic: 85 dB (8 hr limit)</li>
                    <li>• Power tools: 95-105 dB (15 min-1 hr)</li>
                    <li>• Concert/club: 100-115 dB (damage in minutes)</li>
                    <li>• Siren at 1 meter: 120 dB (pain threshold)</li>
                    <li>• Gunshot: 140-170 dB (instant damage)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Safe Exposure Times (NIOSH):</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 85 dB: 8 hours</li>
                    <li>• 88 dB: 4 hours</li>
                    <li>• 91 dB: 2 hours</li>
                    <li>• 94 dB: 1 hour</li>
                    <li>• 97 dB: 30 minutes</li>
                    <li>• 100 dB: 15 minutes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions About Noise Exposure</h2>
            <div className="space-y-4">
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">What is a safe noise exposure level?</h3>
                <p className="text-sm text-muted-foreground">NIOSH recommends limiting exposure to 85 dB for 8 hours. For every 3 dB increase, safe exposure time is cut in half. At 100 dB, limit exposure to just 15 minutes per day.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">What is the 3 dB exchange rate?</h3>
                <p className="text-sm text-muted-foreground">The 3 dB exchange rate means that for every 3 dB increase in noise level, the safe exposure time is halved. This is based on how sound energy doubles every 3 dB.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">What's the difference between OSHA and NIOSH standards?</h3>
                <p className="text-sm text-muted-foreground">OSHA uses a 90 dB criterion with 5 dB exchange rate (legal requirement). NIOSH uses 85 dB with 3 dB exchange rate (health-based recommendation). NIOSH is more protective.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">When should I wear hearing protection?</h3>
                <p className="text-sm text-muted-foreground">Wear hearing protection at 85 dB or higher for extended periods. At 100 dB or above, always use protection. If you need to raise your voice to talk to someone 3 feet away, it's too loud.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Can noise exposure damage be reversed?</h3>
                <p className="text-sm text-muted-foreground">No. Noise-induced hearing loss is permanent and cumulative. Once the hair cells in your inner ear are damaged, they don't grow back. Prevention is the only protection.</p>
              </div>
            </div>
          </div>

          {/* Related Tools Section */}
        </div>
      </div>
    </div>
  );
}
