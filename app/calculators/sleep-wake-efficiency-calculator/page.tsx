"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SleepEfficiencyResult {
  timeInBed: number;
  timeAsleep: number;
  wakeTime: number;
  sleepEfficiency: number;
  sleepQuality: string;
  sleepLatency: number;
  recommendations: string[];
}

export default function SleepWakeEfficiencyCalculatorPage() {
  const [bedtime, setBedtime] = useState<string>("22:00");
  const [wakeTime, setWakeTime] = useState<string>("06:00");
  const [sleepLatency, setSleepLatency] = useState<string>("15");
  const [nightWakings, setNightWakings] = useState<string>("1");
  const [wakingDuration, setWakingDuration] = useState<string>("20");
  const [result, setResult] = useState<SleepEfficiencyResult | null>(null);

  const calculate = () => {
    // Parse times
    const [bedHour, bedMin] = bedtime.split(":").map(Number);
    const [wakeHour, wakeMin] = wakeTime.split(":").map(Number);
    const latencyNum = parseFloat(sleepLatency) || 0;
    const wakingsNum = parseInt(nightWakings) || 0;
    const wakingDurNum = parseFloat(wakingDuration) || 0;

    // Calculate time in bed (minutes)
    let bedMinutes = bedHour * 60 + bedMin;
    let wakeMinutes = wakeHour * 60 + wakeMin;
    
    // Handle overnight
    if (wakeMinutes < bedMinutes) {
      wakeMinutes += 24 * 60;
    }

    const timeInBed = wakeMinutes - bedMinutes;

    // Calculate time asleep
    const totalWakeTime = latencyNum + (wakingsNum * wakingDurNum);
    const timeAsleep = timeInBed - totalWakeTime;

    // Sleep efficiency
    const sleepEfficiency = timeInBed > 0 ? (timeAsleep / timeInBed) * 100 : 0;

    // Sleep quality assessment
    let sleepQuality = "";
    if (sleepEfficiency >= 90) {
      sleepQuality = "Excellent - Optimal sleep efficiency";
    } else if (sleepEfficiency >= 85) {
      sleepQuality = "Good - Healthy sleep pattern";
    } else if (sleepEfficiency >= 80) {
      sleepQuality = "Fair - Room for improvement";
    } else if (sleepEfficiency >= 75) {
      sleepQuality = "Below Average - Consider sleep hygiene changes";
    } else {
      sleepQuality = "Poor - Consult sleep specialist if persistent";
    }

    // Recommendations
    const recommendations: string[] = [];

    if (sleepEfficiency < 85) {
      recommendations.push("⏰ Keep consistent bedtime and wake time daily");
      recommendations.push("📱 Avoid screens 1 hour before bed");
    }

    if (latencyNum > 30) {
      recommendations.push("😴 Taking long to fall asleep? Try relaxation techniques");
      recommendations.push("🌡️ Ensure bedroom is cool (65-68°F / 18-20°C)");
    }

    if (wakingsNum > 2) {
      recommendations.push("🌙 Multiple wakings - limit fluids before bed");
      recommendations.push("🔇 Consider white noise machine");
    }

    if (timeInBed > 540) {
      recommendations.push("⏱️ Spending too long in bed can reduce efficiency");
    }

    if (timeInBed < 420) {
      recommendations.push("😴 Not enough time in bed - aim for 7-9 hours");
    }

    recommendations.push(`💡 Your efficiency: ${sleepEfficiency.toFixed(1)}% (target: 85%+)`);

    setResult({
      timeInBed,
      timeAsleep: Math.round(timeAsleep),
      wakeTime: totalWakeTime,
      sleepEfficiency: parseFloat(sleepEfficiency.toFixed(1)),
      sleepQuality,
      sleepLatency: latencyNum,
      recommendations,
    });
  };

  const reset = () => {
    setBedtime("22:00");
    setWakeTime("06:00");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Sleep Efficiency Calculator – Measure the Quality of Your Night&apos;s Sleep
          </h1>
          <p className="text-muted-foreground">
            Find out how efficiently you&apos;re sleeping with our Sleep/Wake Efficiency Calculator.
            Enter your time in bed and total time asleep to calculate your sleep efficiency score —
            a key indicator of sleep quality recommended by sleep specialists.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="bedtime">Bedtime</Label>
                  <Input
                    id="bedtime"
                    type="time"
                    value={bedtime}
                    onChange={(e) => setBedtime(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="wake-time">Wake Time</Label>
                  <Input
                    id="wake-time"
                    type="time"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="latency">Time to Fall Asleep (minutes)</Label>
                <Input
                  id="latency"
                  type="number"
                  value={sleepLatency}
                  onChange={(e) => setSleepLatency(e.target.value)}
                  placeholder="15"
                />
                <p className="text-xs text-muted-foreground">
                  Normal: 10-20 minutes
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="wakings">Night Wakings</Label>
                  <Input
                    id="wakings"
                    type="number"
                    value={nightWakings}
                    onChange={(e) => setNightWakings(e.target.value)}
                    placeholder="1"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="waking-duration">Avg Duration (min)</Label>
                  <Input
                    id="waking-duration"
                    type="number"
                    value={wakingDuration}
                    onChange={(e) => setWakingDuration(e.target.value)}
                    placeholder="20"
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
              <h3 className="text-lg font-semibold mb-4">Sleep Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.sleepEfficiency >= 90 ? "bg-green-100 dark:bg-green-900/20" :
                    result.sleepEfficiency >= 85 ? "bg-blue-100 dark:bg-blue-900/20" :
                    result.sleepEfficiency >= 80 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Sleep Efficiency</p>
                    <p className="text-5xl font-bold">{result.sleepEfficiency}%</p>
                    <p className="text-sm mt-1">{result.sleepQuality}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Time in Bed:</span>
                      <span className="font-semibold">{Math.floor(result.timeInBed / 60)}h {result.timeInBed % 60}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Time Asleep:</span>
                      <span className="font-semibold">{Math.floor(result.timeAsleep / 60)}h {result.timeAsleep % 60}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Time Awake:</span>
                      <span className="font-semibold">{Math.floor(result.wakeTime / 60)}h {result.wakeTime % 60}m</span>
                    </div>
                  </div>

                  <div className="w-full bg-muted rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        result.sleepEfficiency >= 85 ? "bg-green-500" :
                        result.sleepEfficiency >= 80 ? "bg-amber-500" :
                        "bg-red-500"
                      }`}
                      style={{ width: `${Math.min(result.sleepEfficiency, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    Green = 85%+ (Good) | Amber = 80-84% | Red = &lt;80% (Poor)
                  </p>

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
                  <p>Enter your sleep data and click Calculate to see analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Sleep Efficiency
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Sleep efficiency is the percentage of time in bed actually spent sleeping:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Formula:</strong> (Time Asleep ÷ Time in Bed) × 100
                  </li>
                  <li>
                    <strong>90%+:</strong> Excellent sleep efficiency
                  </li>
                  <li>
                    <strong>85-89%:</strong> Good/Normal
                  </li>
                  <li>
                    <strong>80-84%:</strong> Fair, room for improvement
                  </li>
                  <li>
                    <strong>&lt;80%:</strong> Poor efficiency, may indicate sleep disorder
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Sleep efficiency is a key metric used in CBT-I
                  (Cognitive Behavioral Therapy for Insomnia). Improving efficiency
                  often improves overall sleep quality.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
