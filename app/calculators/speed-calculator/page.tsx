"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Gauge, Timer, Route } from "lucide-react";

interface SpeedResult {
  speed: number;
  unit: string;
  kmh: number;
  mph: number;
  ms: number;
  knot: number;
  description: string;
}

export default function SpeedCalculatorPage() {
  const [distance, setDistance] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [distanceUnit, setDistanceUnit] = useState<"km" | "m" | "miles" | "ft">("km");
  const [timeUnit, setTimeUnit] = useState<"hours" | "minutes" | "seconds">("hours");
  const [result, setResult] = useState<SpeedResult | null>(null);

  const calculateSpeed = () => {
    const d = parseFloat(distance);
    const t = parseFloat(time);

    if (isNaN(d) || isNaN(t) || d <= 0 || t <= 0) {
      setResult(null);
      return;
    }

    let distanceInKm = d;
    let timeInHours = t;

    const distConversions = { km: 1, m: 0.001, miles: 1.60934, ft: 0.0003048 };
    distanceInKm = d * distConversions[distanceUnit];

    const timeConversions = { hours: 1, minutes: 1/60, seconds: 1/3600 };
    timeInHours = t * timeConversions[timeUnit];

    const kmh = distanceInKm / timeInHours;
    const mph = kmh * 0.621371;
    const ms = kmh / 3.6;
    const knot = kmh * 0.539957;

    let description = "";
    if (kmh < 5) description = "Walking pace";
    else if (kmh < 15) description = "Cycling pace";
    else if (kmh < 40) description = "City driving";
    else if (kmh < 80) description = "Highway speed";
    else if (kmh < 150) description = "Fast car";
    else if (kmh < 500) description = "Race car";
    else description = "Aircraft speed";

    setResult({
      speed: Math.round(kmh * 100) / 100,
      unit: "km/h",
      kmh: Math.round(kmh * 100) / 100,
      mph: Math.round(mph * 100) / 100,
      ms: Math.round(ms * 100) / 100,
      knot: Math.round(knot * 100) / 100,
      description,
    });
  };

  const reset = () => {
    setDistance("");
    setTime("");
    setResult(null);
  };

  useEffect(() => {
    calculateSpeed();
  }, [distance, time, distanceUnit, timeUnit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Speed Calculator – Calculate Speed from Distance and Time</h1>
          <p className="text-muted-foreground">
            Calculate average speed from distance traveled and time taken. This free speed calculator converts between km/h, mph, m/s, and knots for running, cycling, driving, or any motion.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Distance and Time</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance</Label>
                    <div className="flex gap-2">
                      <Input
                        id="distance"
                        type="number"
                        placeholder="e.g., 10"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={distanceUnit}
                        onChange={(e) => setDistanceUnit(e.target.value as any)}
                        className="w-20 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="km">km</option>
                        <option value="m">m</option>
                        <option value="miles">mi</option>
                        <option value="ft">ft</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <div className="flex gap-2">
                      <Input
                        id="time"
                        type="number"
                        placeholder="e.g., 1"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={timeUnit}
                        onChange={(e) => setTimeUnit(e.target.value as any)}
                        className="w-28 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="hours">hours</option>
                        <option value="minutes">minutes</option>
                        <option value="seconds">seconds</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Speed = Distance ÷ Time. Enter any distance and time to calculate average speed.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateSpeed} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Speed Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Speed</p>
                    <p className="text-3xl font-bold text-primary">{result.kmh} km/h</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">mph</p>
                      <p className="text-lg font-semibold">{result.mph}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">m/s</p>
                      <p className="text-lg font-semibold">{result.ms}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Knots</p>
                    <p className="text-lg font-semibold">{result.knot}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Context</p>
                    <p className="font-semibold">{result.description}</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong> Speed = Distance / Time</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Gauge className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter distance and time to calculate speed</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Common Speed References</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Route className="h-4 w-4" />
                  Human Powered:
                </h4>
                <ul className="space-y-1">
                  <li>Walking: 4-6 km/h (2.5-4 mph)</li>
                  <li>Jogging: 8-10 km/h (5-6 mph)</li>
                  <li>Running: 12-15 km/h (7-9 mph)</li>
                  <li>Cycling: 20-30 km/h (12-18 mph)</li>
                  <li>Sprinting: 30-40 km/h (18-25 mph)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  Vehicles:
                </h4>
                <ul className="space-y-1">
                  <li>City speed limit: 30-50 km/h</li>
                  <li>Highway speed: 90-120 km/h</li>
                  <li>Train: 100-300 km/h</li>
                  <li>Airliner: 800-900 km/h</li>
                  <li>Sound: 1,235 km/h (Mach 1)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do I calculate average speed?</h3>
                <p className="text-sm text-muted-foreground">Divide total distance by total time. For example, 100 km in 2 hours = 50 km/h average speed. This calculator handles unit conversions automatically.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What's the difference between speed and velocity?</h3>
                <p className="text-sm text-muted-foreground">Speed is how fast you're going (scalar). Velocity includes direction (vector). A car going 60 mph has speed; 60 mph north has velocity.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do I convert km/h to mph?</h3>
                <p className="text-sm text-muted-foreground">Multiply km/h by 0.621 to get mph. Or divide mph by 0.621 to get km/h. 100 km/h equals about 62 mph.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is a knot?</h3>
                <p className="text-sm text-muted-foreground">A knot is one nautical mile per hour, used in aviation and maritime. One knot equals 1.852 km/h or 1.151 mph.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Why is my average speed lower than expected?</h3>
                <p className="text-sm text-muted-foreground">Average speed includes all stops and slow sections. Traffic, hills, and fatigue reduce average speed below your maximum or cruising speed.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Related Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/pace-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Pace Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate running pace per km or mile.</p>
              </a>
              <a href="/calculators/distance-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Distance Calculator</h3>
                <p className="text-sm text-muted-foreground">Find distance from speed and time.</p>
              </a>
              <a href="/calculators/time-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Time Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate time from distance and speed.</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
