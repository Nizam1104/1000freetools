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

interface ShutterSpeedResult {
  subjectSpeed: number;
  subjectDistance: number;
  focalLength: number;
  direction: string;
  recommendedShutter: string;
  shutterSpeed: number;
  alternativeSpeeds: Array<{ effect: string; speed: string }>;
  tips: string[];
}

export default function ShutterSpeedCalculatorPage() {
  const [subjectSpeed, setSubjectSpeed] = useState<string>("");
  const [subjectDistance, setSubjectDistance] = useState<string>("");
  const [focalLength, setFocalLength] = useState<string>("");
  const [movementDirection, setMovementDirection] = useState<string>("across");
  const [subjectType, setSubjectType] = useState<string>("person");
  const [result, setResult] = useState<ShutterSpeedResult | null>(null);

  const calculate = () => {
    const speedNum = parseFloat(subjectSpeed) || 0;
    const distanceNum = parseFloat(subjectDistance) || 10;
    const focalNum = parseFloat(focalLength) || 50;

    if (speedNum === 0) return;

    // Base shutter speed calculation
    // Formula considers: subject speed, distance, direction, focal length
    let baseShutter = 1 / 500; // Default for moderate action

    // Adjust for subject type/speed
    const subjectSpeeds: Record<string, number> = {
      person: 15, // km/h walking/jogging
      runner: 25,
      car: 60,
      bird: 40,
      water: 5,
      clouds: 20,
    };
    const actualSpeed = speedNum || subjectSpeeds[subjectType] || 15;

    // Direction multiplier (across frame needs faster speed)
    const directionMultipliers: Record<string, number> = {
      across: 1.0,
      diagonal: 0.7,
      towards: 0.4,
      away: 0.4,
    };
    const directionMult = directionMultipliers[movementDirection] || 1.0;

    // Distance factor (closer = faster shutter needed)
    const distanceFactor = 10 / Math.max(1, distanceNum);

    // Focal length factor (longer lens = faster shutter)
    const focalFactor = focalNum / 50;

    // Calculate recommended shutter speed
    const shutterValue = 500 * (actualSpeed / 15) * directionMult * distanceFactor * focalFactor;

    // Convert to fraction
    let shutterSpeed = 1 / Math.round(shutterValue);
    if (shutterValue < 1) {
      shutterSpeed = Math.round(shutterValue);
    }

    // Format shutter speed
    const formatShutter = (speed: number): string => {
      if (speed >= 1) return `${speed}s`;
      return `1/${Math.round(1 / speed)}`;
    };

    const recommendedShutter = formatShutter(shutterSpeed);

    // Alternative speeds for different effects
    const alternativeSpeeds = [
      { effect: "Freeze completely", speed: formatShutter(shutterSpeed * 0.5) },
      { effect: "Slight motion blur", speed: formatShutter(shutterSpeed * 2) },
      { effect: "Creative blur", speed: formatShutter(shutterSpeed * 4) },
      { effect: "Long exposure", speed: formatShutter(shutterSpeed * 10) },
    ];

    // Tips
    const tips: string[] = [];

    if (movementDirection === "across") {
      tips.push("📸 Subject moving across frame requires fastest shutter speed");
    } else if (movementDirection === "towards" || movementDirection === "away") {
      tips.push("📸 Subject moving toward/away allows slower shutter speed");
    }

    if (focalNum > 200) {
      tips.push("📷 Long lens magnifies motion - use faster shutter or stabilization");
    }

    if (distanceNum < 5) {
      tips.push("📷 Close subjects appear to move faster - increase shutter speed");
    }

    tips.push("💡 Use burst mode for action sequences");
    tips.push("🎯 Pre-focus on where subject will be");

    setResult({
      subjectSpeed: actualSpeed,
      subjectDistance: distanceNum,
      focalLength: focalNum,
      direction: movementDirection,
      recommendedShutter,
      shutterSpeed,
      alternativeSpeeds,
      tips,
    });
  };

  const reset = () => {
    setSubjectSpeed("");
    setSubjectDistance("");
    setFocalLength("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Shutter Speed Calculator – Find the Right Shutter Speed for Sharp or Blurred Shots
          </h1>
          <p className="text-muted-foreground">
            Capture exactly the look you want with our Shutter Speed Calculator.
            Enter your subject&apos;s movement speed and desired effect to calculate
            the optimal shutter speed — perfect for sports, wildlife, and creative
            long-exposure photography.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject-type">Subject Type</Label>
                <Select value={subjectType} onValueChange={setSubjectType}>
                  <SelectTrigger id="subject-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="person">Person Walking</SelectItem>
                    <SelectItem value="runner">Runner/Cyclist</SelectItem>
                    <SelectItem value="car">Car/Vehicle</SelectItem>
                    <SelectItem value="bird">Bird in Flight</SelectItem>
                    <SelectItem value="water">Flowing Water</SelectItem>
                    <SelectItem value="clouds">Clouds</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject-speed">Subject Speed (km/h)</Label>
                <Input
                  id="subject-speed"
                  type="number"
                  value={subjectSpeed}
                  onChange={(e) => setSubjectSpeed(e.target.value)}
                  placeholder="Auto from subject type"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="distance">Distance to Subject (meters)</Label>
                <Input
                  id="distance"
                  type="number"
                  value={subjectDistance}
                  onChange={(e) => setSubjectDistance(e.target.value)}
                  placeholder="10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="focal-length">Focal Length (mm)</Label>
                <Input
                  id="focal-length"
                  type="number"
                  value={focalLength}
                  onChange={(e) => setFocalLength(e.target.value)}
                  placeholder="50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="direction">Movement Direction</Label>
                <Select value={movementDirection} onValueChange={setMovementDirection}>
                  <SelectTrigger id="direction">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="across">Across Frame (90°)</SelectItem>
                    <SelectItem value="diagonal">Diagonal (45°)</SelectItem>
                    <SelectItem value="towards">Towards Camera</SelectItem>
                    <SelectItem value="away">Away from Camera</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Shutter Speed Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Recommended Shutter Speed</p>
                    <p className="text-5xl font-bold text-primary">{result.recommendedShutter}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Alternative Speeds</h4>
                    <div className="space-y-2">
                      {result.alternativeSpeeds.map((alt, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded">
                          <span>{alt.effect}</span>
                          <span className="font-mono">{alt.speed}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Subject Speed:</span>
                      <span className="font-semibold">{result.subjectSpeed} km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Distance:</span>
                      <span className="font-semibold">{result.subjectDistance}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Focal Length:</span>
                      <span className="font-semibold">{result.focalLength}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Direction:</span>
                      <span className="font-semibold capitalize">{result.direction}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Photography Tips</h4>
                    <ul className="space-y-1">
                      {result.tips.map((tip, i) => (
                        <li key={i} className="text-sm">{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter subject details and click Calculate to see recommendations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Shutter Speed Reference Guide
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>1/1000+:</strong> Fast action (sports, birds)
                  </li>
                  <li>
                    <strong>1/500:</strong> Moderate action (walking, kids)
                  </li>
                  <li>
                    <strong>1/250:</strong> Slow movement, portraits
                  </li>
                  <li>
                    <strong>1/60-1/125:</strong> Everyday photography
                  </li>
                  <li>
                    <strong>1/30 or slower:</strong> Creative motion blur
                  </li>
                  <li>
                    <strong>1s+:</strong> Long exposure (waterfalls, light trails)
                  </li>
                </ul>
                <p>
                  <strong>Rule of Thumb:</strong> Minimum shutter = 1/focal length
                  (e.g., 1/50s for 50mm lens) to avoid camera shake.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
