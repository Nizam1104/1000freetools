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

interface ExposureResult {
  aperture: number;
  shutterSpeed: string;
  iso: number;
  ev: number;
  equivalentSettings: Array<{ aperture: string; shutter: string; iso: number }>;
  lightingCondition: string;
  recommendations: string[];
}

const shutterSpeeds = [
  "1/8000", "1/4000", "1/2000", "1/1000", "1/500", "1/250", "1/125", "1/60",
  "1/30", "1/15", "1/8", "1/4", "1/2", "1", "2", "4", "8", "15", "30"
];

const apertures = [
  "f/1.4", "f/1.8", "f/2", "f/2.8", "f/4", "f/5.6", "f/8", "f/11", "f/16", "f/22"
];

const isoValues = [100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600];

export default function CameraExposureCalculatorPage() {
  const [aperture, setAperture] = useState<string>("f/5.6");
  const [shutterSpeed, setShutterSpeed] = useState<string>("1/125");
  const [iso, setIso] = useState<string>("400");
  const [targetEv, setTargetEv] = useState<string>("0");
  const [result, setResult] = useState<ExposureResult | null>(null);

  const calculate = () => {
    const apertureNum = parseFloat(aperture.replace("f/", "")) || 5.6;
    const shutterNum = parseFloat(shutterSpeed.split("/")[1]) || 125;
    const isoNum = parseInt(iso) || 400;
    const targetEvNum = parseFloat(targetEv) || 0;

    // Calculate EV (Exposure Value)
    // EV = log2(aperture² / shutterTime) - log2(ISO/100)
    const shutterTime = 1 / shutterNum;
    const ev = Math.log2(apertureNum * apertureNum / shutterTime) - Math.log2(isoNum / 100);

    // Lighting condition based on EV
    let lightingCondition = "";
    if (ev >= 15) {
      lightingCondition = "☀️ Bright sunlight";
    } else if (ev >= 13) {
      lightingCondition = "🌤️ Slightly overcast";
    } else if (ev >= 11) {
      lightingCondition = "☁️ Overcast";
    } else if (ev >= 9) {
      lightingCondition = "🌆 Open shade";
    } else if (ev >= 7) {
      lightingCondition = "🌇 Sunset/Sunrise";
    } else if (ev >= 5) {
      lightingCondition = "🌃 Twilight";
    } else if (ev >= 3) {
      lightingCondition = "🌙 Moonlight";
    } else {
      lightingCondition = "🌑 Very dark";
    }

    // Generate equivalent settings (same exposure, different combinations)
    const equivalentSettings: Array<{ aperture: string; shutter: string; iso: number }> = [];

    // Deeper depth of field equivalent
    if (apertureNum < 16) {
      const newAperture = apertureNum * 2;
      const newShutter = shutterNum / 4;
      equivalentSettings.push({
        aperture: `f/${newAperture}`,
        shutter: `1/${Math.round(newShutter)}`,
        iso: isoNum,
      });
    }

    // Shallower depth of field equivalent
    if (apertureNum > 2) {
      const newAperture = apertureNum / 2;
      const newShutter = shutterNum * 4;
      equivalentSettings.push({
        aperture: `f/${newAperture.toFixed(1)}`,
        shutter: `1/${Math.round(newShutter)}`,
        iso: isoNum,
      });
    }

    // Faster shutter equivalent
    if (shutterNum < 4000) {
      const newShutter = shutterNum * 4;
      const newIso = isoNum / 4;
      if (newIso >= 100) {
        equivalentSettings.push({
          aperture: aperture,
          shutter: `1/${Math.round(newShutter)}`,
          iso: Math.round(newIso),
        });
      }
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📷 Current: ${aperture} @ ${shutterSpeed}, ISO ${iso}`);
    recommendations.push(`💡 EV: ${ev.toFixed(1)} (${targetEvNum >= 0 ? "+" : ""}${targetEvNum} target)`);
    recommendations.push(`🌡️ Lighting: ${lightingCondition}`);

    if (ev < targetEvNum - 1) {
      recommendations.push("⚠️ Underexposed - increase exposure");
      recommendations.push("💡 Open aperture, slow shutter, or increase ISO");
    } else if (ev > targetEvNum + 1) {
      recommendations.push("⚠️ Overexposed - decrease exposure");
      recommendations.push("💡 Close aperture, faster shutter, or decrease ISO");
    } else {
      recommendations.push("✅ Exposure is within acceptable range");
    }

    if (shutterNum < 60) {
      recommendations.push("⚠️ Fast shutter - may need more light or higher ISO");
    }

    if (apertureNum >= 11) {
      recommendations.push("📷 Small aperture - watch for diffraction");
    }

    if (isoNum >= 3200) {
      recommendations.push("⚠️ High ISO - expect some noise");
    }

    setResult({
      aperture: apertureNum,
      shutterSpeed,
      iso: isoNum,
      ev: parseFloat(ev.toFixed(1)),
      equivalentSettings,
      lightingCondition,
      recommendations,
    });
  };

  const reset = () => {
    setAperture("f/5.6");
    setShutterSpeed("1/125");
    setIso("400");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Camera Exposure Calculator – Find the Perfect Aperture, Shutter Speed & ISO
          </h1>
          <p className="text-muted-foreground">
            Get perfectly exposed photos every time with our Camera Exposure Calculator.
            Input your current exposure settings to calculate EV and find equivalent
            exposures — ideal for photographers learning manual mode.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aperture">Aperture</Label>
                <Select value={aperture} onValueChange={setAperture}>
                  <SelectTrigger id="aperture">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {apertures.map((ap) => (
                      <SelectItem key={ap} value={ap}>{ap}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shutter">Shutter Speed</Label>
                <Select value={shutterSpeed} onValueChange={setShutterSpeed}>
                  <SelectTrigger id="shutter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {shutterSpeeds.map((ss) => (
                      <SelectItem key={ss} value={ss}>{ss}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="iso">ISO</Label>
                <Select value={iso} onValueChange={setIso}>
                  <SelectTrigger id="iso">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {isoValues.map((i) => (
                      <SelectItem key={i} value={i.toString()}>ISO {i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-ev">Target EV (optional)</Label>
                <Input
                  id="target-ev"
                  type="number"
                  step="0.5"
                  value={targetEv}
                  onChange={(e) => setTargetEv(e.target.value)}
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  Sunny 16 rule: EV 15 in bright sun
                </p>
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
                  <div className={`p-4 rounded-lg text-center ${Math.abs(result.ev - parseFloat(targetEv)) <= 1
                      ? "bg-green-100 dark:bg-green-900/20"
                      : result.ev < parseFloat(targetEv)
                        ? "bg-blue-100 dark:bg-blue-900/20"
                        : "bg-amber-100 dark:bg-amber-900/20"
                    }`}>
                    <p className="text-sm text-muted-foreground">Exposure Value (EV)</p>
                    <p className="text-4xl font-bold">{result.ev > 0 ? "+" : ""}{result.ev}</p>
                    <p className="text-sm mt-1">{result.lightingCondition}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Aperture:</span>
                      <span className="font-semibold">f/{result.aperture}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Shutter:</span>
                      <span className="font-semibold">{result.shutterSpeed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">ISO:</span>
                      <span className="font-semibold">{result.iso}</span>
                    </div>
                  </div>

                  {result.equivalentSettings.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Equivalent Exposures</h4>
                      <div className="space-y-1">
                        {result.equivalentSettings.map((eq, i) => (
                          <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                            <span>{eq.aperture}</span>
                            <span>{eq.shutter}</span>
                            <span>ISO {eq.iso}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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
                  <p>Select settings and click Calculate to see exposure analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Exposure Triangle
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Aperture:</strong> Controls depth of field and light
                  </li>
                  <li>
                    <strong>Shutter Speed:</strong> Controls motion blur and light
                  </li>
                  <li>
                    <strong>ISO:</strong> Controls sensor sensitivity and noise
                  </li>
                  <li>
                    <strong>EV:</strong> Combined exposure value
                  </li>
                </ul>
                <p>
                  <strong>Sunny 16 Rule:</strong> On a sunny day, use f/16 and shutter
                  speed = 1/ISO for correct exposure.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content Section */}
        <div className="mt-12 space-y-12">
          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">How to Use the Camera Exposure Calculator</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Enter Your Settings</h3>
                  <p className="text-muted-foreground text-sm">Input your current aperture (f-stop), shutter speed, and ISO values from your camera.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Calculate Exposure Value</h3>
                  <p className="text-muted-foreground text-sm">Click Calculate to determine your EV (Exposure Value) and see how it compares to ideal exposure.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-2">Review Recommendations</h3>
                  <p className="text-muted-foreground text-sm">Get equivalent exposure settings and expert recommendations for perfect photos every time.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Benefits */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Key Features of This Exposure Calculator</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">📷 Exposure Value (EV) Calculation</h3>
                <p className="text-muted-foreground text-sm">Instantly calculate the Exposure Value for any combination of aperture, shutter speed, and ISO to understand your exposure at a glance.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🔄 Equivalent Settings Finder</h3>
                <p className="text-muted-foreground text-sm">Discover alternative settings that produce the same exposure, giving you creative flexibility with depth of field and motion blur.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">💡 Lighting Condition Analysis</h3>
                <p className="text-muted-foreground text-sm">Automatically identifies the lighting scenario (bright sun, overcast, twilight) based on your calculated EV.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📚 Learn the Exposure Triangle</h3>
                <p className="text-muted-foreground text-sm">Understand how aperture, shutter speed, and ISO work together with built-in explanations and the Sunny 16 rule reference.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Photography Exposure FAQs</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What is exposure value (EV) in photography?</h3>
                <p className="text-muted-foreground text-sm">Exposure Value (EV) is a number that represents all combinations of aperture and shutter speed that give the same exposure. EV 0 equals 1 second at f/1.0. Each increase of 1 EV doubles the light reaching the sensor.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What is the Sunny 16 rule?</h3>
                <p className="text-muted-foreground text-sm">The Sunny 16 rule states that on a sunny day, set your aperture to f/16 and your shutter speed to 1/ISO for correct exposure. For example, at ISO 100, use f/16 at 1/100 second.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How do I find equivalent exposures?</h3>
                <p className="text-muted-foreground text-sm">To maintain the same exposure while changing settings: opening aperture by 1 stop requires doubling shutter speed or halving ISO. This calculator shows equivalent settings automatically.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What EV value should I aim for?</h3>
                <p className="text-muted-foreground text-sm">EV depends on lighting: bright sun is around EV 15, overcast is EV 11-13, open shade is EV 9-11, and twilight can be EV 3-7. Match your target EV to your lighting conditions.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Why are my photos too dark or too bright?</h3>
                <p className="text-muted-foreground text-sm">Underexposure (dark) means not enough light reached the sensor. Overexposure (bright) means too much light. Use this calculator to find the right balance of aperture, shutter speed, and ISO.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Related Photography & Design Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/canvas-aspect-ratio-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Canvas Aspect Ratio Calculator</h3>
                <p className="text-muted-foreground text-sm">Calculate and maintain aspect ratios when resizing images for print or digital media.</p>
              </a>
              <a href="/calculators/ceiling-tile-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Ceiling Tile Calculator</h3>
                <p className="text-muted-foreground text-sm">Calculate how many ceiling tiles you need for your room with waste allowance included.</p>
              </a>
              <a href="/calculators/carpet-area-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Carpet Area Calculator</h3>
                <p className="text-muted-foreground text-sm">Convert between carpet area, built-up area, and super built-up area for real estate.</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
