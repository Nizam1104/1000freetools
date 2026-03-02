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

interface MeditationResult {
  duration: number;
  intervalTime: number;
  intervals: number;
  sessionType: string;
  bellSchedule: Array<{ time: string; type: string }>;
  recommendations: string[];
}

export default function MeditationTimerSchedulerPage() {
  const [duration, setDuration] = useState<string>("10");
  const [intervalTime, setIntervalTime] = useState<string>("");
  const [sessionType, setSessionType] = useState<string>("mindfulness");
  const [bellSound, setBellSound] = useState<string>("soft");
  const [result, setResult] = useState<MeditationResult | null>(null);

  const calculate = () => {
    const durationNum = parseInt(duration) || 10;
    const intervalNum = parseInt(intervalTime) || 0;

    // Calculate number of intervals
    const intervals = intervalNum > 0 ? Math.floor(durationNum / intervalNum) : 0;

    // Session type description
    let sessionTypeDesc = "";
    switch (sessionType) {
      case "mindfulness":
        sessionTypeDesc = "Mindfulness - Focus on breath and present moment";
        break;
      case "vipassana":
        sessionTypeDesc = "Vipassana - Body scan and sensation awareness";
        break;
      case "loving-kindness":
        sessionTypeDesc = "Loving-Kindness (Metta) - Cultivate compassion";
        break;
      case "transcendental":
        sessionTypeDesc = "Transcendental - Mantra-based meditation";
        break;
      case "walking":
        sessionTypeDesc = "Walking Meditation - Mindful movement";
        break;
      case "breath":
        sessionTypeDesc = "Breath Counting - Count breath cycles";
        break;
    }

    // Generate bell schedule
    const bellSchedule: Array<{ time: string; type: string }> = [];
    bellSchedule.push({ time: "0:00", type: "🔔 Start bell" });

    if (intervalNum > 0) {
      for (let i = 1; i <= intervals; i++) {
        const time = i * intervalNum;
        if (time < durationNum) {
          bellSchedule.push({ time: `${time}:00`, type: "🔔 Interval bell" });
        }
      }
    }

    bellSchedule.push({ time: `${durationNum}:00`, type: "🔔 End bell" });

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`⏱️ Session duration: ${durationNum} minutes`);
    recommendations.push(`🧘 Session type: ${sessionTypeDesc}`);

    if (intervalNum > 0) {
      recommendations.push(`🔔 Interval bells: Every ${intervalNum} minutes (${intervals} intervals)`);
    } else {
      recommendations.push("🔔 Silent session - start and end bells only");
    }

    if (durationNum < 5) {
      recommendations.push("⏱️ Short session - good for beginners or busy days");
      recommendations.push("📈 Consider building up to 10-15 minutes");
    } else if (durationNum < 20) {
      recommendations.push("✅ Good duration for daily practice");
    } else {
      recommendations.push("🏆 Extended session - deep practice");
      recommendations.push("💧 Stay hydrated before and after");
    }

    if (sessionType === "vipassana" && durationNum >= 30) {
      recommendations.push("🧘 For Vipassana, consider body position changes");
    }

    recommendations.push("📱 Put phone on Do Not Disturb");
    recommendations.push("🪑 Sit comfortably with straight spine");

    setResult({
      duration: durationNum,
      intervalTime: intervalNum,
      intervals,
      sessionType: sessionTypeDesc,
      bellSchedule,
      recommendations,
    });
  };

  const reset = () => {
    setDuration("10");
    setIntervalTime("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Meditation Timer Scheduler – Set Up & Time Your Daily Meditation Sessions
          </h1>
          <p className="text-muted-foreground">
            Create the perfect meditation session with our Meditation Timer Scheduler.
            Set session duration, interval bells, and session type to stay focused
            without watching the clock — ideal for beginners and experienced meditators alike.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Session Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-type">Meditation Type</Label>
                <Select value={sessionType} onValueChange={setSessionType}>
                  <SelectTrigger id="session-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mindfulness">Mindfulness</SelectItem>
                    <SelectItem value="vipassana">Vipassana</SelectItem>
                    <SelectItem value="loving-kindness">Loving-Kindness (Metta)</SelectItem>
                    <SelectItem value="transcendental">Transcendental</SelectItem>
                    <SelectItem value="walking">Walking Meditation</SelectItem>
                    <SelectItem value="breath">Breath Counting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interval">Interval Bell (minutes, optional)</Label>
                <Input
                  id="interval"
                  type="number"
                  value={intervalTime}
                  onChange={(e) => setIntervalTime(e.target.value)}
                  placeholder="Leave empty for no intervals"
                />
                <p className="text-xs text-muted-foreground">
                  Bells at regular intervals during session
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bell-sound">Bell Sound</Label>
                <Select value={bellSound} onValueChange={setBellSound}>
                  <SelectTrigger id="bell-sound">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soft">Soft Bell</SelectItem>
                    <SelectItem value="loud">Loud Bell</SelectItem>
                    <SelectItem value="singing">Singing Bowl</SelectItem>
                    <SelectItem value="chime">Chime</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Create Session
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Session Plan</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Session Duration</p>
                    <p className="text-4xl font-bold text-primary">{result.duration} min</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {result.sessionType.split(" - ")[0]}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Bell Schedule</h4>
                    <div className="space-y-1">
                      {result.bellSchedule.map((bell, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>{bell.time}</span>
                          <span>{bell.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {result.intervalTime > 0 && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">
                        <strong>Intervals:</strong> {result.intervals} bells during session
                      </p>
                    </div>
                  )}

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
                  <p>Set your preferences and click Create Session</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Meditation Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Posture:</strong> Sit comfortably with straight spine
                  </li>
                  <li>
                    <strong>Focus:</strong> Gently return attention when mind wanders
                  </li>
                  <li>
                    <strong>Duration:</strong> Start with 5-10 min, build gradually
                  </li>
                  <li>
                    <strong>Consistency:</strong> Daily practice is more important than duration
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> There&apos;s no &quot;perfect&quot; meditation.
                  The goal is awareness, not emptying the mind. Thoughts will arise -
                  acknowledge them and gently return to your focus point.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
