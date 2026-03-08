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
                How to Use This Meditation Timer
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set your session duration</p>
                    <p>Choose how long you want to meditate. Beginners might start with 5-10 minutes. Experienced practitioners often do 20-45 minutes.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Choose meditation type and interval bells</p>
                    <p>Select your practice style (mindfulness, vipassana, etc.). Add interval bells if you want reminders during longer sessions.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Create your session</p>
                    <p>Click Create Session to see your bell schedule and personalized recommendations for your practice.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Meditation Duration Guide
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Duration</th>
                      <th className="text-left py-3 px-2 font-semibold">Best For</th>
                      <th className="text-left py-3 px-2 font-semibold">Benefits</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">5-10 min</td>
                      <td className="py-3 px-2">Beginners, busy days</td>
                      <td className="py-3 px-2">Builds habit, reduces stress</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">15-20 min</td>
                      <td className="py-3 px-2">Daily practice</td>
                      <td className="py-3 px-2">Improved focus, emotional balance</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">30-45 min</td>
                      <td className="py-3 px-2">Experienced meditators</td>
                      <td className="py-3 px-2">Deep relaxation, insight</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">60+ min</td>
                      <td className="py-3 px-2">Retreat practice</td>
                      <td className="py-3 px-2">Profound states, deep work</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Consistency matters more than duration. 10 minutes daily beats 60 minutes once a week.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Meditation Types
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Mindfulness Meditation</h4>
                  <p>
                    Focus on the present moment—breath, bodily sensations, or sounds. When your mind wanders (it will), gently return attention to your anchor. This builds awareness and reduces reactivity.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Vipassana (Insight Meditation)</h4>
                  <p>
                    Systematically scan your body from head to toe, observing sensations without judgment. Develops deep awareness of the mind-body connection and the nature of suffering.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Loving-Kindness (Metta)</h4>
                  <p>
                    Cultivate compassion by silently repeating phrases like "May I be happy, may I be well." Extend these wishes to loved ones, neutral people, and even difficult people.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Breath Counting</h4>
                  <p>
                    Count each exhale from 1 to 10, then start over. When you lose count (you will), begin again at 1. Simple but effective for training concentration.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Better Meditation
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Same time, same place</p>
                    <p>Meditate at the same time daily if possible. Your mind will start to associate that time and place with practice.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Comfortable posture</p>
                    <p>Sit with your spine straight but not rigid. Use a cushion if needed. You can sit on a chair—feet flat on the floor.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Expect wandering thoughts</p>
                    <p>Your mind will wander. That's normal. The practice is noticing it wandered and gently returning. Each return is a rep.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Start small</p>
                    <p>Five minutes daily is better than 30 minutes once a week. Build duration gradually as the habit solidifies.</p>
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
                  <h4 className="font-medium text-foreground mb-2">How long should I meditate as a beginner?</h4>
                  <p>
                    Start with 5-10 minutes daily. This is long enough to settle in but short enough to maintain consistently. After 2-3 weeks of daily practice, gradually increase to 15-20 minutes if you want deeper sessions.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What if I can't stop thinking?</h4>
                  <p>
                    You're not supposed to stop thinking. Meditation isn't about emptying your mind—it's about noticing thoughts without getting caught in them. When you notice you're thinking, gently return to your breath. That's the practice.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I use interval bells?</h4>
                  <p>
                    Interval bells help during longer sessions (20+ minutes) to check your posture and refocus. For shorter sessions, just start and end bells work fine. Some traditions use bells every 5-10 minutes; others prefer silence.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Is it better to meditate morning or night?</h4>
                  <p>
                    Morning meditation sets a calm tone for the day. Evening practice helps unwind. The best time is whenever you'll actually do it consistently. Some people benefit from both—short morning session, longer evening one.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What position should I sit in?</h4>
                  <p>
                    Sit comfortably with your spine reasonably straight. Options include: cross-legged on a cushion, kneeling on a meditation bench, or in a chair with feet flat. Lying down often leads to sleep—save that for body scan practices.
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
