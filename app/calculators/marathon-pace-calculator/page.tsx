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

interface PaceResult {
  pacePerKm: string;
  pacePerMile: string;
  finishTime: string;
  speedKmh: number;
  speedMph: number;
  splits: string[];
}

const raceDistances = [
  { name: "5K", km: 5, miles: 3.107 },
  { name: "10K", km: 10, miles: 6.214 },
  { name: "Half Marathon", km: 21.0975, miles: 13.109 },
  { name: "Marathon", km: 42.195, miles: 26.219 },
  { name: "50K Ultra", km: 50, miles: 31.069 },
  { name: "50 Mile Ultra", km: 80.467, miles: 50 },
  { name: "100K Ultra", km: 100, miles: 62.137 },
  { name: "100 Mile Ultra", km: 160.934, miles: 100 },
];

export default function MarathonPaceCalculatorPage() {
  const [raceDistance, setRaceDistance] = useState<string>("42.195");
  const [targetTime, setTargetTime] = useState<string>("");
  const [timeUnit, setTimeUnit] = useState<string>("hours");
  const [paceUnit, setPaceUnit] = useState<string>("km");
  const [result, setResult] = useState<PaceResult | null>(null);

  const calculate = () => {
    const distanceKm = parseFloat(raceDistance);
    const timeValue = parseFloat(targetTime);

    if (isNaN(distanceKm) || isNaN(timeValue) || timeValue <= 0) return;

    // Convert target time to minutes
    let totalMinutes: number;
    if (timeUnit === "hours") {
      totalMinutes = timeValue * 60;
    } else if (timeUnit === "minutes") {
      totalMinutes = timeValue;
    } else {
      // Already in hours:minutes format
      const parts = targetTime.split(":");
      totalMinutes = parseFloat(parts[0]) * 60 + parseFloat(parts[1] || "0");
    }

    const distanceMiles = distanceKm * 0.621371;

    // Pace per km and per mile
    const pacePerKmMin = totalMinutes / distanceKm;
    const pacePerMileMin = totalMinutes / distanceMiles;

    // Format pace as MM:SS
    const formatPace = (minutes: number) => {
      const mins = Math.floor(minutes);
      const secs = Math.round((minutes - mins) * 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    // Format finish time
    const formatTime = (totalMin: number) => {
      const hours = Math.floor(totalMin / 60);
      const mins = Math.round(totalMin % 60);
      if (hours > 0) {
        return `${hours}h ${mins}m`;
      }
      return `${mins}m`;
    };

    // Speed
    const speedKmh = distanceKm / (totalMinutes / 60);
    const speedMph = distanceMiles / (totalMinutes / 60);

    // Generate splits
    const splits: string[] = [];
    const splitDistances = paceUnit === "km" ? [1, 5, 10, 15, 20, 25, 30, 35, 40] : [1, 5, 10, 15, 20, 25];
    for (const split of splitDistances) {
      if (split < distanceKm) {
        const splitTime = paceUnit === "km" ? split * pacePerKmMin : split * pacePerMileMin;
        splits.push(`${split}${paceUnit}: ${formatTime(splitTime)}`);
      }
    }
    splits.push(`Finish: ${formatTime(totalMinutes)}`);

    setResult({
      pacePerKm: formatPace(pacePerKmMin),
      pacePerMile: formatPace(pacePerMileMin),
      finishTime: formatTime(totalMinutes),
      speedKmh: Math.round(speedKmh * 100) / 100,
      speedMph: Math.round(speedMph * 100) / 100,
      splits,
    });
  };

  const reset = () => {
    setTargetTime("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Marathon Pace Calculator – Calculate Your Target Running Pace
          </h1>
          <p className="text-muted-foreground">
            Plan your race strategy with our Marathon Pace Calculator. Enter your target finish time for any distance — 5K to 100-mile ultra — to get your required pace per kilometer and mile, plus splits for race day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="raceDistance">Race Distance</Label>
                <Select value={raceDistance} onValueChange={setRaceDistance}>
                  <SelectTrigger id="raceDistance">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {raceDistances.map((d) => (
                      <SelectItem key={d.km} value={d.km.toString()}>
                        {d.name} ({d.km} km / {d.miles} mi)
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom Distance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {raceDistance === "custom" && (
                <div className="space-y-2">
                  <Label htmlFor="customDistance">Custom Distance (km)</Label>
                  <Input
                    id="customDistance"
                    type="number"
                    placeholder="e.g., 30"
                    onChange={(e) => setRaceDistance(e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="targetTime">Target Finish Time</Label>
                <Input
                  id="targetTime"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 4.5"
                  value={targetTime}
                  onChange={(e) => setTargetTime(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="timeUnit">Time Unit</Label>
                  <Select value={timeUnit} onValueChange={setTimeUnit}>
                    <SelectTrigger id="timeUnit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hours">Hours (e.g., 4.5)</SelectItem>
                      <SelectItem value="minutes">Minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paceUnit">Pace Unit</Label>
                  <Select value={paceUnit} onValueChange={setPaceUnit}>
                    <SelectTrigger id="paceUnit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="km">Kilometers</SelectItem>
                      <SelectItem value="mile">Miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Common Marathon Finish Times:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Elite: 2:10 - 2:30</li>
                  <li>• Advanced: 2:30 - 3:00</li>
                  <li>• Intermediate: 3:00 - 3:45</li>
                  <li>• Recreational: 3:45 - 4:30</li>
                  <li>• Beginner: 4:30 - 5:30+</li>
                </ul>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate Pace
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Race Pace Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Pace per km</p>
                      <p className="text-3xl font-bold text-primary">{result.pacePerKm}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Pace per mile</p>
                      <p className="text-3xl font-bold text-primary">{result.pacePerMile}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Speed</p>
                      <p className="text-lg font-semibold">{result.speedKmh} km/h</p>
                      <p className="text-xs text-muted-foreground">{result.speedMph} mph</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Finish Time</p>
                      <p className="text-lg font-semibold">{result.finishTime}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Race Splits</h4>
                    <div className="space-y-1">
                      {result.splits.map((split, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>{split.split(": ")[0]}</span>
                          <span className="font-medium">{split.split(": ")[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Tip:</strong> Start slightly slower than target pace for the first 5K, then settle into goal pace. Negative splits (faster second half) often produce the best results.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your target time and click Calculate to see pace</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Marathon Pace Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select your race distance</p>
                    <p>Choose from common distances like 5K, 10K, half marathon, marathon, or ultra distances. You can also enter a custom distance if your race is non-standard.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your target finish time</p>
                    <p>Input your goal time in hours (e.g., 4.5 for 4 hours 30 minutes) or total minutes. Be realistic based on your training and fitness level.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review your target pace</p>
                    <p>See the pace you need to hold per kilometer and per mile, plus splits at key race distances to help you monitor progress during your race.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Marathon Pace Chart by Finish Time
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Finish Time</th>
                      <th className="text-left py-3 px-2 font-semibold">Pace/km</th>
                      <th className="text-left py-3 px-2 font-semibold">Pace/mi</th>
                      <th className="text-left py-3 px-2 font-semibold">Speed (km/h)</th>
                      <th className="text-left py-3 px-2 font-semibold">Level</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">2:30:00</td>
                      <td className="py-3 px-2">3:33</td>
                      <td className="py-3 px-2">5:43</td>
                      <td className="py-3 px-2">16.9</td>
                      <td className="py-3 px-2">Elite</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">3:00:00</td>
                      <td className="py-3 px-2">4:16</td>
                      <td className="py-3 px-2">6:52</td>
                      <td className="py-3 px-2">14.1</td>
                      <td className="py-3 px-2">Advanced</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">3:30:00</td>
                      <td className="py-3 px-2">4:58</td>
                      <td className="py-3 px-2">8:00</td>
                      <td className="py-3 px-2">12.1</td>
                      <td className="py-3 px-2">Intermediate</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">4:00:00</td>
                      <td className="py-3 px-2">5:41</td>
                      <td className="py-3 px-2">9:09</td>
                      <td className="py-3 px-2">10.5</td>
                      <td className="py-3 px-2">Recreational</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">4:30:00</td>
                      <td className="py-3 px-2">6:26</td>
                      <td className="py-3 px-2">10:18</td>
                      <td className="py-3 px-2">9.4</td>
                      <td className="py-3 px-2">Beginner</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">5:00:00</td>
                      <td className="py-3 px-2">7:07</td>
                      <td className="py-3 px-2">11:27</td>
                      <td className="py-3 px-2">8.4</td>
                      <td className="py-3 px-2">Beginner</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Pace times are per kilometer and per mile for a full marathon (42.195 km / 26.219 mi). Your actual pace may vary based on course elevation and conditions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Race Pace
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Race pace is the speed you need to maintain to finish in your target time. For a 4-hour marathon, that's 5:41 per kilometer or 9:09 per mile. Knowing your target pace helps you avoid starting too fast — a common mistake that leads to hitting the wall around 30K.
                </p>
                <p>
                  Most runners benefit from even splits or negative splits (running the second half slightly faster). Positive splits (slowing down) often result from overly ambitious early pacing. The difference between a 3:30 and 4:00 marathon often comes down to pacing discipline, not fitness.
                </p>
                <p>
                  Training should include runs at various paces: easy runs 1-2 minutes slower than goal pace for building aerobic base, tempo runs at or slightly faster than goal pace for lactate threshold development, and intervals much faster than goal pace for VO2 max improvement. Race pace itself should feel comfortably hard — sustainable but requiring focus.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Race Day Pacing Tips
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Start Conservative</p>
                    <p>The first 5K should feel easy — 5-10 seconds per km slower than goal pace. Adrenaline makes effort feel easier than it is. Resist the urge to go out faster because you feel fresh.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use a GPS Watch or Pace Bands</p>
                    <p>GPS watches show real-time pace but can drift. Print pace bands with split times for each mile or 5K checkpoint. Check your watch at official distance markers to verify accuracy.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Adjust for Course and Conditions</p>
                    <p>Hills slow you down — focus on effort, not pace, on inclines. Hot weather above 15°C (60°F) can add 1-3% to your time. Wind resistance matters more at faster paces. Adjust goals based on actual race day conditions.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Practice Pace in Training</p>
                    <p>Run portions of your long runs at goal marathon pace. Your body needs to learn what race pace feels like when fatigued. Try 8-16K at goal pace in the middle of a long run during peak training.</p>
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
                  <h4 className="font-medium text-foreground mb-2">What's a good marathon time for a beginner?</h4>
                  <p>
                    First-time marathoners typically finish between 4:30 and 5:30. Men average around 4:30, women around 5:00. Your personal "good" time depends on your age, fitness background, and training. Focus on finishing healthy rather than hitting a specific time for your first marathon.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How accurate do I need to be with my pace?</h4>
                  <p>
                    Aim to stay within 5-10 seconds per km of target pace. Small variations average out over the distance. The bigger risk is going out 20-30 seconds too fast early, which can cost several minutes by the finish. Err on the side of starting slightly slow.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I run by feel or by watch?</h4>
                  <p>
                    Use both. Your watch provides objective data, but perceived effort matters more when conditions change. If you're working much harder than expected to hit target pace on a hot day, it's okay to adjust. Experience teaches you to correlate pace with effort.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I convert my 10K or half marathon time to a marathon prediction?</h4>
                  <p>
                    Common formulas include multiplying your half marathon time by 2.1-2.2, or using the Riegel formula: T2 = T1 × (D2/D1)^1.06. For example, a 1:45 half marathon predicts roughly 3:40-3:45 for the marathon. These are estimates — actual performance depends on your endurance training.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What if I miss my target pace during the race?</h4>
                  <p>
                    If you're behind pace at the halfway point but feeling strong, gradually increase effort to close the gap. If you're struggling, adjust your goal rather than pushing into dangerous territory. Finishing strong at a revised time feels better than blowing up and walking the last 10K.
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
