"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Timer, Footprints } from "lucide-react";

interface SplitResult {
  pacePerKm: string;
  pacePerMile: string;
  totalMinutes: number;
  split5k: string;
  split10k: string;
  splitHalf: string;
  splitFull: string;
}

export default function RunningSplitCalculatorPage() {
  const [distance, setDistance] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [distanceUnit, setDistanceUnit] = useState<"km" | "miles">("km");
  const [timeUnit, setTimeUnit] = useState<"hours" | "minutes">("minutes");
  const [targetDistance, setTargetDistance] = useState<string>("");
  const [targetUnit, setTargetUnit] = useState<"km" | "miles">("km");
  const [result, setResult] = useState<SplitResult | null>(null);

  const calculateSplit = () => {
    const dist = parseFloat(distance);
    const t = parseFloat(time);
    const target = parseFloat(targetDistance);

    if (isNaN(dist) || isNaN(t) || dist <= 0 || t <= 0) {
      setResult(null);
      return;
    }

    let distanceInKm = dist;
    if (distanceUnit === "miles") {
      distanceInKm = dist * 1.60934;
    }

    let timeInMinutes = t;
    if (timeUnit === "hours") {
      timeInMinutes = t * 60;
    }

    const pacePerKm = timeInMinutes / distanceInKm;
    const pacePerMile = pacePerKm * 1.60934;

    const formatPace = (minutes: number) => {
      const mins = Math.floor(minutes);
      const secs = Math.round((minutes - mins) * 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    let targetDistanceInKm = target;
    if (targetUnit === "miles") {
      targetDistanceInKm = target * 1.60934;
    }

    const projectedTime = pacePerKm * targetDistanceInKm;

    setResult({
      pacePerKm: formatPace(pacePerKm),
      pacePerMile: formatPace(pacePerMile),
      totalMinutes: timeInMinutes,
      split5k: formatPace(pacePerKm * 5),
      split10k: formatPace(pacePerKm * 10),
      splitHalf: formatPace(pacePerKm * 21.0975),
      splitFull: formatPace(pacePerKm * 42.195),
    });
  };

  const reset = () => {
    setDistance("");
    setTime("");
    setTargetDistance("");
    setResult(null);
  };

  useEffect(() => {
    calculateSplit();
  }, [distance, time, distanceUnit, timeUnit, targetDistance, targetUnit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Running Split Calculator – Calculate Pace and Race Projections</h1>
          <p className="text-muted-foreground">
            Calculate your running pace per kilometer or mile and project finish times for standard race distances. Essential for runners training for 5K, 10K, half marathon, or marathon events.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Run</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance</Label>
                    <div className="flex gap-2">
                      <Input
                        id="distance"
                        type="number"
                        placeholder="e.g., 5"
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
                        <option value="miles">mi</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <div className="flex gap-2">
                      <Input
                        id="time"
                        type="number"
                        placeholder="e.g., 25"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={timeUnit}
                        onChange={(e) => setTimeUnit(e.target.value as any)}
                        className="w-24 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="minutes">min</option>
                        <option value="hours">hr</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetDistance">Target Race (optional)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="targetDistance"
                        type="number"
                        placeholder="e.g., 10"
                        value={targetDistance}
                        onChange={(e) => setTargetDistance(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={targetUnit}
                        onChange={(e) => setTargetUnit(e.target.value as any)}
                        className="w-20 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="km">km</option>
                        <option value="miles">mi</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Enter a recent run to calculate your average pace and project times for longer races.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateSplit} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Pace Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Pace per km</p>
                      <p className="text-2xl font-bold text-primary">{result.pacePerKm}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Pace per mile</p>
                      <p className="text-2xl font-bold text-primary">{result.pacePerMile}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-semibold mb-3">Race Projections</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>5K:</span>
                        <span className="font-medium">{result.split5k}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>10K:</span>
                        <span className="font-medium">{result.split10k}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Half Marathon:</span>
                        <span className="font-medium">{result.splitHalf}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Marathon:</span>
                        <span className="font-medium">{result.splitFull}</span>
                      </div>
                    </div>
                  </div>

                  {targetDistance && parseFloat(targetDistance) > 0 && (
                    <div className="text-xs text-muted-foreground pt-4 border-t">
                      <p>Projected time for {targetDistance} {targetUnit}: calculate based on current pace</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Timer className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter your run data to calculate pace</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Pace Guidelines</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Footprints className="h-4 w-4" />
                  Running Pace Levels:
                </h4>
                <ul className="space-y-1">
                  <li><strong>Elite:</strong> &lt;3:00 min/km (&lt;4:50 min/mi)</li>
                  <li><strong>Advanced:</strong> 3:00-4:00 min/km (4:50-6:25 min/mi)</li>
                  <li><strong>Intermediate:</strong> 4:00-5:30 min/km (6:25-8:50 min/mi)</li>
                  <li><strong>Recreational:</strong> 5:30-7:00 min/km (8:50-11:15 min/mi)</li>
                  <li><strong>Beginner:</strong> &gt;7:00 min/km (&gt;11:15 min/mi)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  Race Distance Tips:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>5K: Run at 95-100% of max effort</li>
                  <li>10K: Start conservative, negative split</li>
                  <li>Half marathon: Aim for steady threshold pace</li>
                  <li>Marathon: Start 15-20 sec/km slower than goal pace</li>
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
                <h3 className="font-semibold mb-2">What is a good running pace?</h3>
                <p className="text-sm text-muted-foreground">A good pace depends on your fitness level and distance. For recreational runners, 5:30-7:00 min/km (9-11 min/mi) is common for easy runs. Race pace is typically faster.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do I calculate my pace?</h3>
                <p className="text-sm text-muted-foreground">Divide your run time by distance. For example, 30 minutes for 5km = 6 min/km pace. This calculator does it automatically with unit conversions.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What pace should I train at?</h3>
                <p className="text-sm text-muted-foreground">Most training should be at easy pace (1-2 min/km slower than race pace). Add some tempo runs at threshold pace and intervals faster than race pace.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How accurate are race projections?</h3>
                <p className="text-sm text-muted-foreground">Projections assume similar conditions and proper training. Longer races may be slower due to endurance limits. Use as a guide, not a guarantee.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Should I negative split my race?</h3>
                <p className="text-sm text-muted-foreground">Yes, starting slightly slower and finishing faster is the optimal strategy for most distances. It prevents early fatigue and strong finishes feel better.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Related Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/cooper-test-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Cooper Test Calculator</h3>
                <p className="text-sm text-muted-foreground">Estimate VO2 max from 12-minute run.</p>
              </a>
              <a href="/calculators/heart-rate-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Heart Rate Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate target heart rate zones for training.</p>
              </a>
              <a href="/calculators/met-calorie-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">MET Calorie Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate calories burned while running.</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
