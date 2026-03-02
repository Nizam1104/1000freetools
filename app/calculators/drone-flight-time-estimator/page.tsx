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

interface DroneResult {
  batteryCapacity: number;
  droneWeight: number;
  powerDraw: number;
  flightTime: number;
  flightTimeFormatted: string;
  hoverTime: number;
  forwardFlightTime: number;
  batteryLife: string;
  recommendations: string[];
}

export default function DroneFlightTimeEstimatorPage() {
  const [batteryCapacity, setBatteryCapacity] = useState<string>("");
  const [droneWeight, setDroneWeight] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("11.1");
  const [flightStyle, setFlightStyle] = useState<string>("mixed");
  const [result, setResult] = useState<DroneResult | null>(null);

  const calculate = () => {
    const capacityNum = parseFloat(batteryCapacity) || 0;
    const weightNum = parseFloat(droneWeight) || 0;
    const voltageNum = parseFloat(voltage) || 11.1;

    if (capacityNum === 0) return;

    // Calculate battery energy in Wh
    const batteryEnergy = (capacityNum * voltageNum) / 1000;

    // Estimate power draw based on weight (rough estimate)
    // Typical multirotor: 150-250 W/kg for hover
    const basePowerPerKg = 200;
    const estimatedPowerDraw = weightNum * basePowerPerKg;

    // Flight style multipliers
    const styleMultipliers: Record<string, number> = {
      hover: 1.0,
      mixed: 1.2,
      forward: 1.4,
      aggressive: 2.0,
    };
    const styleMult = styleMultipliers[flightStyle] || 1.2;

    // Calculate flight time in minutes
    // Time = (Battery Energy × 60) / Power Draw
    const hoverTime = (batteryEnergy * 60) / estimatedPowerDraw;
    const flightTime = hoverTime / styleMult;

    // Format flight time
    const minutes = Math.floor(flightTime);
    const seconds = Math.round((flightTime - minutes) * 60);
    const flightTimeFormatted = `${minutes}m ${seconds}s`;

    // Battery life assessment
    let batteryLife = "";
    if (flightTime >= 30) {
      batteryLife = "🏆 Excellent - Long flight time";
    } else if (flightTime >= 20) {
      batteryLife = "✅ Good - Standard flight time";
    } else if (flightTime >= 15) {
      batteryLife = "⚖️ Average - Acceptable flight time";
    } else {
      batteryLife = "⚠️ Short - Consider larger battery";
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`🔋 Battery: ${capacityNum}mAh ${voltageNum}V (${batteryEnergy.toFixed(1)} Wh)`);
    recommendations.push(`⚖️ Drone weight: ${weightNum}g`);
    recommendations.push(`⚡ Estimated power draw: ~${estimatedPowerDraw.toFixed(0)}W`);
    recommendations.push(`⏱️ Hover time: ${hoverTime.toFixed(0)} minutes`);
    recommendations.push(`🚁 ${flightStyle.charAt(0).toUpperCase() + flightStyle.slice(1)} flight: ${flightTimeFormatted}`);

    if (flightTime < 15) {
      recommendations.push("⚠️ Short flight time - consider lighter battery or larger capacity");
      recommendations.push("🔋 Upgrade to higher capacity battery if possible");
    } else if (flightTime >= 25) {
      recommendations.push("✅ Excellent flight time for this class");
    }

    recommendations.push("🔋 Always land with 20% battery reserve");
    recommendations.push("🌡️ Cold weather reduces flight time by 20-30%");
    recommendations.push("💨 Wind increases power consumption significantly");

    setResult({
      batteryCapacity: capacityNum,
      droneWeight: weightNum,
      powerDraw: estimatedPowerDraw,
      flightTime: parseFloat(flightTime.toFixed(1)),
      flightTimeFormatted,
      hoverTime: parseFloat(hoverTime.toFixed(1)),
      forwardFlightTime: parseFloat((hoverTime / 1.4).toFixed(1)),
      batteryLife,
      recommendations,
    });
  };

  const reset = () => {
    setBatteryCapacity("");
    setDroneWeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Drone Flight Time Estimator – Calculate How Long Your Drone Can Fly
          </h1>
          <p className="text-muted-foreground">
            Plan your aerial shoots with our Drone Flight Time Estimator. Enter battery
            capacity, drone weight, and flight style to estimate maximum flight time —
            helping drone pilots manage battery usage for longer and safer flights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Battery Capacity (mAh)</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={batteryCapacity}
                  onChange={(e) => setBatteryCapacity(e.target.value)}
                  placeholder="e.g., 3000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="voltage">Battery Voltage (S count)</Label>
                <Select value={voltage} onValueChange={setVoltage}>
                  <SelectTrigger id="voltage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7.4">2S (7.4V)</SelectItem>
                    <SelectItem value="11.1">3S (11.1V)</SelectItem>
                    <SelectItem value="14.8">4S (14.8V)</SelectItem>
                    <SelectItem value="22.2">6S (22.2V)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Drone Weight (grams)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={droneWeight}
                  onChange={(e) => setDroneWeight(e.target.value)}
                  placeholder="e.g., 500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Flight Style</Label>
                <Select value={flightStyle} onValueChange={setFlightStyle}>
                  <SelectTrigger id="style">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hover">Hover/Gentle</SelectItem>
                    <SelectItem value="mixed">Mixed Flight</SelectItem>
                    <SelectItem value="forward">Fast Forward</SelectItem>
                    <SelectItem value="aggressive">Aggressive/3D</SelectItem>
                  </SelectContent>
                </Select>
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
              <h3 className="text-lg font-semibold mb-4">Flight Time Estimate</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.flightTime >= 25 ? "bg-green-100 dark:bg-green-900/20" :
                    result.flightTime >= 15 ? "bg-blue-100 dark:bg-blue-900/20" :
                    "bg-amber-100 dark:bg-amber-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Estimated Flight Time</p>
                    <p className="text-5xl font-bold">{result.flightTimeFormatted}</p>
                    <p className="text-sm mt-1">{result.batteryLife}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Hover Time</p>
                      <p className="text-lg font-bold">{result.hoverTime} min</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Forward Flight</p>
                      <p className="text-lg font-bold">{result.forwardFlightTime} min</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Battery Energy:</span>
                      <span className="font-semibold">{((result.batteryCapacity * parseFloat(voltage)) / 1000).toFixed(1)} Wh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Power Draw:</span>
                      <span className="font-semibold">~{result.powerDraw.toFixed(0)}W</span>
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
                  <p>Enter battery and drone specs to estimate flight time</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Flight Time Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Hover:</strong> Most efficient flight mode
                  </li>
                  <li>
                    <strong>Forward flight:</strong> Uses 30-50% more power
                  </li>
                  <li>
                    <strong>Wind:</strong> Can reduce flight time by 30%+
                  </li>
                  <li>
                    <strong>Cold weather:</strong> Reduces battery capacity by 20-30%
                  </li>
                  <li>
                    <strong>Reserve:</strong> Always land with 20% battery remaining
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> This is an estimate. Actual flight time varies
                  based on motor efficiency, propeller size, wind conditions, temperature,
                  and flying style. Always monitor battery voltage during flight.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
