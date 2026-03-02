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
                                className={`h-2 rounded-full ${
                                  s.brightness === result.brightnessPercent
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Battery Saving Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Screen brightness:</strong> The #1 battery drain on most devices
                  </li>
                  <li>
                    <strong>Auto-brightness:</strong> Lets device adjust based on ambient light
                  </li>
                  <li>
                    <strong>Dark mode:</strong> Saves significant power on OLED screens
                  </li>
                  <li>
                    <strong>Refresh rate:</strong> Lower Hz = better battery (60Hz vs 120Hz)
                  </li>
                  <li>
                    <strong>Screen timeout:</strong> Shorter timeout saves power
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Reducing brightness from 100% to 50% can extend
                  battery life by 20-30% on most devices.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
