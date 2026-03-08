"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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
                  <div className={`p-4 rounded-lg text-center ${result.sleepEfficiency >= 90 ? "bg-green-100 dark:bg-green-900/20" :
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
                      className={`h-4 rounded-full ${result.sleepEfficiency >= 85 ? "bg-green-500" :
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

        {/* How It Works Section */}
        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6">How the Sleep Efficiency Calculator Works</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">1</div>
                  <h4 className="font-semibold mb-2">Enter Sleep Schedule</h4>
                  <p className="text-sm text-muted-foreground">Input your bedtime and wake time to calculate total time in bed.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">2</div>
                  <h4 className="font-semibold mb-2">Add Sleep Details</h4>
                  <p className="text-sm text-muted-foreground">Include time to fall asleep and any nighttime wakings for accuracy.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">3</div>
                  <h4 className="font-semibold mb-2">Get Efficiency Score</h4>
                  <p className="text-sm text-muted-foreground">Receive your sleep efficiency percentage with personalized recommendations.</p>
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
                    <h4 className="font-semibold text-sm">Clinical-Grade Metric</h4>
                    <p className="text-sm text-muted-foreground">Sleep efficiency is the gold standard metric used by sleep specialists and in CBT-I therapy.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Visual Progress Bar</h4>
                    <p className="text-sm text-muted-foreground">Color-coded indicator shows at a glance if your sleep efficiency is good, fair, or poor.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Smart Recommendations</h4>
                    <p className="text-sm text-muted-foreground">Get personalized tips based on your specific sleep latency and waking patterns.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Quality Assessment</h4>
                    <p className="text-sm text-muted-foreground">Automatic sleep quality rating from Excellent to Poor based on your efficiency score.</p>
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
                  <h4 className="font-semibold text-sm mb-1">What is a good sleep efficiency score?</h4>
                  <p className="text-sm text-muted-foreground">85% or higher is considered good sleep efficiency. 90%+ is excellent. Below 80% may indicate a sleep problem worth discussing with a healthcare provider.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">How is sleep efficiency calculated?</h4>
                  <p className="text-sm text-muted-foreground">Sleep efficiency = (Time Asleep ÷ Time in Bed) × 100. Time asleep excludes the time it takes to fall asleep and any wake periods during the night.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">What causes low sleep efficiency?</h4>
                  <p className="text-sm text-muted-foreground">Common causes include stress, irregular sleep schedules, sleep apnea, restless leg syndrome, caffeine/alcohol before bed, and poor sleep environment (noise, light, temperature).</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">How can I improve my sleep efficiency?</h4>
                  <p className="text-sm text-muted-foreground">Keep consistent sleep/wake times, create a dark and cool bedroom, avoid screens before bed, limit caffeine after noon, and only use your bed for sleep and intimacy.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Is sleep tracking accurate?</h4>
                  <p className="text-sm text-muted-foreground">Consumer sleep trackers provide estimates. For clinical accuracy, a sleep study (polysomnography) is the gold standard. Use this calculator with your best estimates for useful insights.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Tools Section */}
        <div className="mt-6">
        </div>
      </div>
    </div>
  );
}
