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

interface SwimPaceResult {
  distance: number;
  time: number;
  poolLength: number;
  laps: number;
  pacePer100: string;
  pacePer100Seconds: number;
  speed: number;
  speedUnit: string;
  swimLevel: string;
  projections: Array<{ distance: string; time: string }>;
  recommendations: string[];
}

export default function SwimmingLapPaceCalculatorPage() {
  const [distance, setDistance] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("");
  const [poolLength, setPoolLength] = useState<string>("25");
  const [distanceUnit, setDistanceUnit] = useState<string>("meters");
  const [result, setResult] = useState<SwimPaceResult | null>(null);

  const calculate = () => {
    const distanceNum = parseFloat(distance) || 0;
    const minutesNum = parseFloat(minutes) || 0;
    const secondsNum = parseFloat(seconds) || 0;
    const poolNum = parseFloat(poolLength) || 25;

    if (distanceNum === 0 || (minutesNum === 0 && secondsNum === 0)) return;

    // Convert distance to meters if needed
    let distanceMeters = distanceNum;
    if (distanceUnit === "yards") {
      distanceMeters = distanceNum * 0.9144;
    }

    // Total time in seconds
    const totalTimeSeconds = minutesNum * 60 + secondsNum;

    // Calculate laps
    const laps = distanceNum / poolNum;

    // Pace per 100 (in seconds)
    const pacePer100Seconds = (totalTimeSeconds / distanceMeters) * 100;

    // Format pace as MM:SS
    const formatPace = (totalSeconds: number): string => {
      const mins = Math.floor(totalSeconds / 60);
      const secs = Math.round(totalSeconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const pacePer100 = formatPace(pacePer100Seconds);

    // Speed calculation
    const speedMPS = distanceMeters / totalTimeSeconds;
    const speedKPH = speedMPS * 3.6;
    const speedMPH = speedMPS * 2.237;

    // Swim level assessment
    let swimLevel = "";
    if (pacePer100Seconds < 60) {
      swimLevel = "🏆 Elite - Competitive/Olympic level";
    } else if (pacePer100Seconds < 75) {
      swimLevel = "🥇 Advanced - Experienced swimmer";
    } else if (pacePer100Seconds < 90) {
      swimLevel = "🥈 Intermediate - Regular swimmer";
    } else if (pacePer100Seconds < 120) {
      swimLevel = "🥉 Beginner - Building fitness";
    } else {
      swimLevel = "🏊 Novice - Focus on technique";
    }

    // Projected times for common distances
    const projections = [
      { distance: "100m", time: formatPace(pacePer100Seconds * 1) },
      { distance: "200m", time: formatPace(pacePer100Seconds * 2) },
      { distance: "400m", time: formatPace(pacePer100Seconds * 4) },
      { distance: "800m", time: formatPace(pacePer100Seconds * 8) },
      { distance: "1500m", time: formatPace(pacePer100Seconds * 15) },
    ];

    // Recommendations
    const recommendations: string[] = [];

    if (pacePer100Seconds > 120) {
      recommendations.push("🎯 Focus on technique before speed - consider lessons");
      recommendations.push("💪 Build aerobic base with longer, slower swims");
    } else if (pacePer100Seconds > 90) {
      recommendations.push("🏊 Add interval training to build speed");
      recommendations.push("📊 Track your pace to monitor improvement");
    } else if (pacePer100Seconds > 75) {
      recommendations.push("⚡ Add sprint sets to improve top-end speed");
      recommendations.push("🔄 Work on turns and underwater phases");
    } else {
      recommendations.push("🏆 Consider competitive swimming or triathlon");
      recommendations.push("📈 Fine-tune technique for marginal gains");
    }

    recommendations.push(`🏊‍♂️ Your pace: ${pacePer100}/100m`);

    setResult({
      distance: distanceNum,
      time: totalTimeSeconds,
      poolLength: poolNum,
      laps: parseFloat(laps.toFixed(1)),
      pacePer100,
      pacePer100Seconds: parseFloat(pacePer100Seconds.toFixed(1)),
      speed: parseFloat(speedKPH.toFixed(2)),
      speedUnit: "km/h",
      swimLevel,
      projections,
      recommendations,
    });
  };

  const reset = () => {
    setDistance("");
    setMinutes("");
    setSeconds("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Swimming Lap Pace Calculator – Calculate Your Swim Speed Per 100m
          </h1>
          <p className="text-muted-foreground">
            Optimize your swim training with our Swimming Lap Pace Calculator.
            Enter your total distance and time to calculate your pace per 100 meters —
            perfect for competitive swimmers and triathletes tracking their speed and progress.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="distance">Distance</Label>
                  <Input
                    id="distance"
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="e.g., 500"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="distance-unit">Unit</Label>
                  <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                    <SelectTrigger id="distance-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meters">Meters</SelectItem>
                      <SelectItem value="yards">Yards</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pool-length">Pool Length</Label>
                <Select value={poolLength} onValueChange={setPoolLength}>
                  <SelectTrigger id="pool-length">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25m/LCM</SelectItem>
                    <SelectItem value="50">50m/Olympic</SelectItem>
                    <SelectItem value="25y">25y/SCY</SelectItem>
                    <SelectItem value="15">15m/Small</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Time</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    placeholder="Minutes"
                  />
                  <Input
                    type="number"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    placeholder="Seconds"
                  />
                </div>
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
              <h3 className="text-lg font-semibold mb-4">Swim Pace Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${result.pacePer100Seconds < 75 ? "bg-green-100 dark:bg-green-900/20" :
                      result.pacePer100Seconds < 90 ? "bg-blue-100 dark:bg-blue-900/20" :
                        result.pacePer100Seconds < 120 ? "bg-amber-100 dark:bg-amber-900/20" :
                          "bg-red-100 dark:bg-red-900/20"
                    }`}>
                    <p className="text-sm text-muted-foreground">Pace per 100m</p>
                    <p className="text-5xl font-bold">{result.pacePer100}</p>
                    <p className="text-sm mt-1">{result.swimLevel}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Laps</p>
                      <p className="text-lg font-bold">{result.laps}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Speed</p>
                      <p className="text-lg font-bold">{result.speed}</p>
                      <p className="text-xs">{result.speedUnit}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Total Time</p>
                      <p className="text-lg font-bold">{Math.floor(result.time / 60)}:{(result.time % 60).toString().padStart(2, "0")}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Projected Times</h4>
                    <div className="space-y-1">
                      {result.projections.map((proj, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>{proj.distance}</span>
                          <span className="font-mono">{proj.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Training Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your swim data and click Calculate to see pace</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Swim Pace Reference
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>&lt;1:00/100m:</strong> Elite/Olympic level
                  </li>
                  <li>
                    <strong>1:00-1:15:</strong> Advanced competitive
                  </li>
                  <li>
                    <strong>1:15-1:30:</strong> Intermediate/fitness
                  </li>
                  <li>
                    <strong>1:30-2:00:</strong> Beginner/recreational
                  </li>
                  <li>
                    <strong>&gt;2:00:</strong> Novice/learning
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Pool times are typically faster than open water
                  by 5-15 seconds per 100m due to currents, waves, and navigation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How It Works
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Enter Swim Distance & Time</h4>
                    <p className="text-xs text-muted-foreground">Input the total distance you swam and the time it took. Select meters or yards based on your pool.</p>
                  </div>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Select Pool Length</h4>
                    <p className="text-xs text-muted-foreground">Choose your pool size (25m, 50m Olympic, or 25y short course) to calculate total laps completed.</p>
                  </div>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Get Pace Analysis</h4>
                    <p className="text-xs text-muted-foreground">See your pace per 100m, swim level assessment, projected times, and personalized training tips.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Swim Pace Classification
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">Level</th>
                      <th className="text-left py-2 px-3 font-semibold">Pace per 100m</th>
                      <th className="text-left py-2 px-3 font-semibold">Description</th>
                      <th className="text-left py-2 px-3 font-semibold">Typical Swimmer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">🏆 Elite</td>
                      <td className="py-2 px-3 font-mono text-xs">&lt; 1:00</td>
                      <td className="py-2 px-3 text-xs">Olympic/competitive level</td>
                      <td className="py-2 px-3 text-xs">Pro athletes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">🥇 Advanced</td>
                      <td className="py-2 px-3 font-mono text-xs">1:00-1:15</td>
                      <td className="py-2 px-3 text-xs">Experienced competitive</td>
                      <td className="py-2 px-3 text-xs">Club swimmers</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">🥈 Intermediate</td>
                      <td className="py-2 px-3 font-mono text-xs">1:15-1:30</td>
                      <td className="py-2 px-3 text-xs">Regular fitness swimmer</td>
                      <td className="py-2 px-3 text-xs">Triathletes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">🥉 Beginner</td>
                      <td className="py-2 px-3 font-mono text-xs">1:30-2:00</td>
                      <td className="py-2 px-3 text-xs">Building fitness</td>
                      <td className="py-2 px-3 text-xs">Recreational</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">🏊 Novice</td>
                      <td className="py-2 px-3 font-mono text-xs">&gt; 2:00</td>
                      <td className="py-2 px-3 text-xs">Learning technique</td>
                      <td className="py-2 px-3 text-xs">Beginners</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Key Features & Benefits
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Pace Per 100m Calculation</h4>
                  <p className="text-xs text-muted-foreground">Get your standardized pace per 100 meters – the universal metric for comparing swim performance.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Swim Level Assessment</h4>
                  <p className="text-xs text-muted-foreground">Instant feedback on your swimming level from novice to elite, helping you set realistic goals.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Projected Times</h4>
                  <p className="text-xs text-muted-foreground">See estimated times for common race distances (100m, 400m, 800m, 1500m) based on your current pace.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Training Recommendations</h4>
                  <p className="text-xs text-muted-foreground">Personalized tips based on your pace, including technique focus areas and workout suggestions.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-2">What is a good swimming pace per 100m?</h4>
                <p className="text-xs text-muted-foreground">
                  For fitness swimmers, 1:30-2:00 per 100m is common. Competitive amateur swimmers aim for 1:15-1:30. Elite swimmers maintain under 1:00 per 100m. Your "good" pace depends on your experience level and goals.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">How do I calculate my swimming pace?</h4>
                <p className="text-xs text-muted-foreground">
                  Divide your total time in seconds by distance in meters, then multiply by 100. For example: 600m in 12 minutes = 720 seconds. Pace = (720/600) × 100 = 120 seconds = 2:00 per 100m.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Why is pool pace faster than open water?</h4>
                <p className="text-xs text-muted-foreground">
                  Open water swimming is typically 5-15 seconds per 100m slower due to currents, waves, navigation (sighting), no wall push-offs, and wetsuit drag. Factor this in when training for triathlons.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">How can I improve my swim pace?</h4>
                <p className="text-xs text-muted-foreground">
                  Focus on technique first (body position, catch, rotation), then add interval training (e.g., 10×100m with rest), incorporate drills, and build aerobic base with longer steady swims. Consistency matters most.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">What's the difference between LCM and SCY pools?</h4>
                <p className="text-xs text-muted-foreground">
                  LCM (Long Course Meters) is 50m – Olympic standard. SCY (Short Course Yards) is 25 yards – common in US colleges. SCM (Short Course Meters) is 25m – international standard. Times vary between courses due to turn frequency.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Related Tools</h3>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <a href="/calculators/swimming-calorie-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Swimming Calorie Calculator</p>
                  <p className="text-xs text-muted-foreground">Calculate calories burned swimming</p>
                </a>
                <a href="/calculators/running-pace-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Running Pace Calculator</p>
                  <p className="text-xs text-muted-foreground">Calculate running pace & speed</p>
                </a>
                <a href="/calculators/marathon-pace-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Marathon Pace Calculator</p>
                  <p className="text-xs text-muted-foreground">Race pace predictor</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
