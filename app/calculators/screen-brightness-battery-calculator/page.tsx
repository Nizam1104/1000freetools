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

interface BrightnessResult {
  brightnessPercent: number;
  batteryCapacity: number;
  baseDrain: number;
  screenDrain: number;
  totalDrain: number;
  estimatedRuntime: number;
  runtimeFormatted: string;
  savings: Array<{ brightness: number; runtime: number }>;
  recommendations: string[];
}

export default function ScreenBrightnessBatteryCalculatorPage() {
  const [brightnessPercent, setBrightnessPercent] = useState<string>("50");
  const [batteryCapacity, setBatteryCapacity] = useState<string>("4000");
  const [deviceType, setDeviceType] = useState<string>("smartphone");
  const [result, setResult] = useState<BrightnessResult | null>(null);

  const calculate = () => {
    const brightnessNum = parseFloat(brightnessPercent) || 50;
    const batteryNum = parseFloat(batteryCapacity) || 4000;

    // Base power consumption (mA) by device type
    const baseDrains: Record<string, number> = {
      smartphone: 150,
      tablet: 300,
      laptop: 2000,
    };
    const baseDrain = baseDrains[deviceType] || 150;

    // Screen power consumption varies with brightness
    // Typical max screen drain at 100% brightness
    const maxScreenDrains: Record<string, number> = {
      smartphone: 400,
      tablet: 800,
      laptop: 4000,
    };
    const maxScreenDrain = maxScreenDrains[deviceType] || 400;

    // Screen drain at current brightness (roughly linear)
    const screenDrain = maxScreenDrain * (brightnessNum / 100);

    // Total drain
    const totalDrain = baseDrain + screenDrain;

    // Runtime in hours (battery mAh / drain mA)
    const runtimeHours = batteryNum / totalDrain;
    const runtimeMinutes = runtimeHours * 60;

    // Format runtime
    const runtimeFormatted = formatRuntime(runtimeMinutes);

    // Calculate savings at different brightness levels
    const savings = [20, 40, 60, 80, 100].map((b) => {
      const sDrain = maxScreenDrain * (b / 100);
      const tDrain = baseDrain + sDrain;
      const rHours = batteryNum / tDrain;
      return { brightness: b, runtime: parseFloat((rHours * 60).toFixed(0)) };
    });

    // Recommendations
    const recommendations: string[] = [];

    if (brightnessNum > 80) {
      recommendations.push("⚠️ High brightness significantly reduces battery life.");
      recommendations.push("💡 Consider reducing to 50-60% for better battery life.");
    } else if (brightnessNum > 60) {
      recommendations.push("📊 Moderate-high brightness. Some battery impact.");
    } else if (brightnessNum > 30) {
      recommendations.push("✅ Good balance between visibility and battery life.");
    } else {
      recommendations.push("🔋 Excellent for battery saving!");
      recommendations.push("💡 Ensure brightness is still comfortable for your eyes.");
    }

    recommendations.push(`📱 Auto-brightness can optimize based on ambient light.`);
    recommendations.push(`🌙 Use dark mode to reduce OLED screen power consumption.`);

    setResult({
      brightnessPercent: brightnessNum,
      batteryCapacity: batteryNum,
      baseDrain: parseFloat(baseDrain.toFixed(1)),
      screenDrain: parseFloat(screenDrain.toFixed(1)),
      totalDrain: parseFloat(totalDrain.toFixed(1)),
      estimatedRuntime: parseFloat(runtimeMinutes.toFixed(0)),
      runtimeFormatted,
      savings,
      recommendations,
    });
  };

  const formatRuntime = (minutes: number): string => {
    if (minutes < 60) {
      return `${Math.round(minutes)} minutes`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      const mins = Math.round(minutes % 60);
      return `${hours}h ${mins}m`;
    } else {
      const days = Math.floor(minutes / 1440);
      const hours = Math.floor((minutes % 1440) / 60);
      return `${days}d ${hours}h`;
    }
  };

  const reset = () => {
    setBrightnessPercent("50");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Screen Brightness Battery Calculator – How Brightness Affects Your Battery Life
          </h1>
          <p className="text-muted-foreground">
            Extend your device&apos;s battery life by understanding the cost of screen brightness.
            Enter your screen brightness level and device battery capacity to estimate runtime
            changes — helping you make smarter power management decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="device-type">Device Type</Label>
                <Select value={deviceType} onValueChange={setDeviceType}>
                  <SelectTrigger id="device-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smartphone">Smartphone</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="laptop">Laptop</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brightness">Screen Brightness (%)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="brightness"
                    type="number"
                    min="0"
                    max="100"
                    value={brightnessPercent}
                    onChange={(e) => setBrightnessPercent(e.target.value)}
                    className="w-24"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={brightnessPercent}
                    onChange={(e) => setBrightnessPercent(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="battery">Battery Capacity (mAh)</Label>
                <Input
                  id="battery"
                  type="number"
                  value={batteryCapacity}
                  onChange={(e) => setBatteryCapacity(e.target.value)}
                  placeholder="e.g., 4000"
                />
                <p className="text-xs text-muted-foreground">
                  Typical: Phone 3000-5000, Tablet 6000-10000, Laptop 40000-80000
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
              <h3 className="text-lg font-semibold mb-4">Battery Impact Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Estimated Runtime</p>
                    <p className="text-3xl font-bold text-primary">{result.runtimeFormatted}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      at {result.brightnessPercent}% brightness
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Base Drain:</span>
                      <span className="font-semibold">{result.baseDrain} mA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Screen Drain:</span>
                      <span className="font-semibold">{result.screenDrain} mA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Drain:</span>
                      <span className="font-semibold">{result.totalDrain} mA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Battery:</span>
                      <span className="font-semibold">{result.batteryCapacity} mAh</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Runtime at Different Brightness Levels</h4>
                    <div className="space-y-2">
                      {result.savings.map((s, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-24 text-sm">{s.brightness}%</div>
                            <div className="w-32 bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${s.brightness === result.brightnessPercent
                                    ? "bg-primary"
                                    : "bg-muted-foreground/30"
                                  }`}
                                style={{ width: `${(s.runtime / Math.max(...result.savings.map(x => x.runtime))) * 100}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-sm font-medium w-20 text-right">
                            {formatRuntime(s.runtime)}
                          </span>
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
                  <p>Adjust settings and click Calculate to see battery impact</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6">How the Calculator Works</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">1</div>
                  <h4 className="font-semibold mb-2">Enter Device Details</h4>
                  <p className="text-sm text-muted-foreground">Select your device type and input the battery capacity in mAh from your specs.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">2</div>
                  <h4 className="font-semibold mb-2">Set Brightness Level</h4>
                  <p className="text-sm text-muted-foreground">Adjust the brightness slider or enter a percentage to see power consumption.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">3</div>
                  <h4 className="font-semibold mb-2">View Battery Impact</h4>
                  <p className="text-sm text-muted-foreground">Get estimated runtime and compare different brightness levels instantly.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Multi-Device Support</h4>
                    <p className="text-sm text-muted-foreground">Calculate for smartphones, tablets, and laptops with device-specific power profiles.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Runtime Comparison</h4>
                    <p className="text-sm text-muted-foreground">See how battery life changes at 20%, 40%, 60%, 80%, and 100% brightness.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Power Breakdown</h4>
                    <p className="text-sm text-muted-foreground">View base system drain vs. screen drain to understand total consumption.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Smart Recommendations</h4>
                    <p className="text-sm text-muted-foreground">Get personalized tips based on your brightness level and device type.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1">How much does screen brightness affect battery life?</h4>
                  <p className="text-sm text-muted-foreground">Screen brightness is typically the largest battery drain, consuming 30-50% of total power. Reducing from 100% to 50% can extend battery life by 20-30% on most devices.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Does dark mode save battery?</h4>
                  <p className="text-sm text-muted-foreground">Yes, on OLED and AMOLED screens, dark mode can save significant battery because black pixels are turned off completely. LCD screens see minimal benefit.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">What brightness level is best for battery?</h4>
                  <p className="text-sm text-muted-foreground">40-60% brightness offers the best balance between visibility and battery life. Use auto-brightness to let your device optimize based on ambient light.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">How do I find my battery capacity?</h4>
                  <p className="text-sm text-muted-foreground">Check Settings &gt; Battery on phones, System Information on Macs, or search your device model + &quot;battery capacity mAh&quot; online.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">What else drains battery besides screen?</h4>
                  <p className="text-sm text-muted-foreground">Cellular signal, GPS, background apps, push notifications, and high refresh rate displays are major battery drains. Close unused apps and enable battery saver mode.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Tools Section */}
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Related Tools</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/calculators/battery-life-calculator" className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <h4 className="font-semibold text-sm mb-1">Battery Life Calculator</h4>
                  <p className="text-sm text-muted-foreground">Estimate total battery runtime based on usage patterns and apps.</p>
                </a>
                <a href="/calculators/mobile-charging-time-calculator" className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <h4 className="font-semibold text-sm mb-1">Mobile Charging Time Calculator</h4>
                  <p className="text-sm text-muted-foreground">Calculate how long it takes to fully charge your device.</p>
                </a>
                <a href="/calculators/power-calculator" className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <h4 className="font-semibold text-sm mb-1">Power Calculator</h4>
                  <p className="text-sm text-muted-foreground">Calculate electrical power consumption for any device.</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
