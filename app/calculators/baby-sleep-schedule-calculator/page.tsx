"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SleepSchedule {
  ageRange: string;
  totalSleepHours: string;
  nighttimeSleep: string;
  naps: number;
  napDuration: string;
  wakeWindow: string;
  bedtimeRange: string;
  sampleSchedule: string[];
}

const sleepSchedules: SleepSchedule[] = [
  {
    ageRange: "0-3 months",
    totalSleepHours: "14-17",
    nighttimeSleep: "8-9",
    naps: 4,
    napDuration: "30 min - 3 hrs",
    wakeWindow: "45-90 min",
    bedtimeRange: "Varies",
    sampleSchedule: ["Wake: 7:00 AM", "Nap: 8:30 AM", "Nap: 11:00 AM", "Nap: 2:00 PM", "Nap: 5:00 PM", "Bedtime: 8:00 PM"],
  },
  {
    ageRange: "4-6 months",
    totalSleepHours: "12-15",
    nighttimeSleep: "10-11",
    naps: 3,
    napDuration: "1-2 hrs",
    wakeWindow: "1.5-2.5 hrs",
    bedtimeRange: "7-8 PM",
    sampleSchedule: ["Wake: 7:00 AM", "Nap: 9:30 AM", "Nap: 1:00 PM", "Nap: 4:30 PM", "Bedtime: 7:30 PM"],
  },
  {
    ageRange: "7-9 months",
    totalSleepHours: "12-15",
    nighttimeSleep: "11-12",
    naps: 2,
    napDuration: "1-2 hrs",
    wakeWindow: "2.5-3 hrs",
    bedtimeRange: "7-8 PM",
    sampleSchedule: ["Wake: 7:00 AM", "Nap: 10:00 AM", "Nap: 2:30 PM", "Bedtime: 7:30 PM"],
  },
  {
    ageRange: "10-12 months",
    totalSleepHours: "12-14",
    nighttimeSleep: "11-12",
    naps: 2,
    napDuration: "1-2 hrs",
    wakeWindow: "3-4 hrs",
    bedtimeRange: "7-8 PM",
    sampleSchedule: ["Wake: 7:00 AM", "Nap: 10:00 AM", "Nap: 3:00 PM", "Bedtime: 7:30 PM"],
  },
  {
    ageRange: "13-18 months",
    totalSleepHours: "11-14",
    nighttimeSleep: "11-12",
    naps: 1,
    napDuration: "1.5-3 hrs",
    wakeWindow: "5-6 hrs",
    bedtimeRange: "7-8 PM",
    sampleSchedule: ["Wake: 7:00 AM", "Nap: 1:00 PM", "Bedtime: 7:30 PM"],
  },
  {
    ageRange: "18-24 months",
    totalSleepHours: "11-14",
    nighttimeSleep: "11-12",
    naps: 1,
    napDuration: "1.5-2.5 hrs",
    wakeWindow: "6-7 hrs",
    bedtimeRange: "7-8 PM",
    sampleSchedule: ["Wake: 7:00 AM", "Nap: 1:00 PM", "Bedtime: 7:30 PM"],
  },
];

export default function BabySleepScheduleCalculatorPage() {
  const [babyAge, setBabyAge] = useState<string>("");
  const [wakeTime, setWakeTime] = useState<string>("07:00");
  const [result, setResult] = useState<SleepSchedule | null>(null);

  const calculate = () => {
    const ageMonths = parseFloat(babyAge);
    if (isNaN(ageMonths) || ageMonths <= 0) return;

    // Find appropriate schedule based on age
    let schedule: SleepSchedule | undefined;

    if (ageMonths <= 3) {
      schedule = sleepSchedules[0];
    } else if (ageMonths <= 6) {
      schedule = sleepSchedules[1];
    } else if (ageMonths <= 9) {
      schedule = sleepSchedules[2];
    } else if (ageMonths <= 12) {
      schedule = sleepSchedules[3];
    } else if (ageMonths <= 18) {
      schedule = sleepSchedules[4];
    } else {
      schedule = sleepSchedules[5];
    }

    setResult(schedule || null);
  };

  const reset = () => {
    setBabyAge("");
    setWakeTime("07:00");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Baby Sleep Schedule Calculator – Create the Perfect Sleep Routine for Your Baby
          </h1>
          <p className="text-muted-foreground">
            Help your baby sleep better with our Baby Sleep Schedule Calculator.
            Enter your child&apos;s age to get a recommended daily sleep schedule including
            nap times, wake windows, and total sleep hours — aligned with pediatric sleep guidelines.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="baby-age">Baby&apos;s Age (months)</Label>
                <Input
                  id="baby-age"
                  type="number"
                  step="0.5"
                  value={babyAge}
                  onChange={(e) => setBabyAge(e.target.value)}
                  placeholder="e.g., 6"
                />
                <p className="text-xs text-muted-foreground">
                  Works for ages 0-24 months
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wake-time">Typical Wake Time</Label>
                <Input
                  id="wake-time"
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                />
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Age Group Quick Reference:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Newborn: 0-3 months</li>
                  <li>• Infant: 4-6 months</li>
                  <li>• Older Infant: 7-12 months</li>
                  <li>• Toddler: 13-24 months</li>
                </ul>
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
              <h3 className="text-lg font-semibold mb-4">Sleep Schedule</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Age Range</p>
                    <p className="text-2xl font-bold text-primary">{result.ageRange}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Total Sleep</p>
                      <p className="text-lg font-semibold">{result.totalSleepHours} hrs</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Nighttime</p>
                      <p className="text-lg font-semibold">{result.nighttimeSleep} hrs</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Number of Naps:</span>
                      <span className="font-semibold">{result.naps}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Nap Duration:</span>
                      <span className="font-semibold">{result.napDuration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Wake Window:</span>
                      <span className="font-semibold">{result.wakeWindow}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Bedtime:</span>
                      <span className="font-semibold">{result.bedtimeRange}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Sample Schedule</h4>
                    <div className="space-y-1">
                      {result.sampleSchedule.map((item, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>{item.split(": ")[0]}</span>
                          <span className="font-medium">{item.split(": ")[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Note:</strong> Every baby is unique. Use this as a guideline
                      and adjust based on your baby&apos;s individual needs and cues.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your baby&apos;s age and click Calculate to see schedule</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Baby Sleep Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  The National Sleep Foundation and AAP recommend these sleep durations:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Newborns (0-3 months):</strong> 14-17 hours total
                  </li>
                  <li>
                    <strong>Infants (4-11 months):</strong> 12-15 hours total
                  </li>
                  <li>
                    <strong>Toddlers (1-2 years):</strong> 11-14 hours total
                  </li>
                  <li>
                    <strong>Wake Windows:</strong> Increase with age; overtired babies
                    have more trouble sleeping
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Establish a consistent bedtime routine starting
                  around 6-8 weeks. Watch for sleepy cues like eye rubbing and yawning.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Baby Sleep Schedule Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your baby&apos;s age in months</p>
                    <p>Be as precise as possible. For a 5-month-old, enter &quot;5&quot;. For a 4.5-month-old, enter &quot;4.5&quot;.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set your baby&apos;s typical wake time</p>
                    <p>This helps generate a realistic daily schedule. Most babies wake between 6-8 AM.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click Calculate and review the results</p>
                    <p>You&apos;ll see total sleep hours, nap count, wake windows, bedtime range, and a sample daily schedule tailored to your baby&apos;s age.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Baby Sleep Patterns
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Newborn Sleep Cycles Are Shorter</h4>
                  <p>
                    Adults cycle through sleep stages every 90 minutes. Newborns cycle every 50-60 minutes.
                    This means they wake more frequently — not because something&apos;s wrong, but because their
                    brains are developing rapidly and their stomachs are small.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Day/Night Confusion in Newborns</h4>
                  <p>
                    Babies are born without a circadian rhythm. Many sleep longer during the day and stay
                    awake at night. This typically resolves by 6-8 weeks as melatonin production kicks in
                    and exposure to natural light helps set their internal clock.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Sleep Consolidates With Age</h4>
                  <p>
                    Newborns sleep in 2-4 hour chunks around the clock. By 4 months, many babies can sleep
                    6-8 hours straight at night. By 6-9 months, 10-12 hour nights become common. Nap patterns
                    also consolidate — from 4-5 naps down to 2, then eventually 1.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Active Sleep vs Quiet Sleep</h4>
                  <p>
                    Newborns spend about 50% of sleep in &quot;active sleep&quot; (similar to REM). You&apos;ll see
                    twitching, grimacing, and irregular breathing. This is normal and important for brain
                    development. &quot;Quiet sleep&quot; is deeper and more restful. As babies mature, the balance
                    shifts toward more quiet sleep.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Baby Sleep Needs by Age
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Age Range</th>
                      <th className="text-left py-3 px-2 font-semibold">Total Sleep</th>
                      <th className="text-left py-3 px-2 font-semibold">Nap Pattern</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">0-3 months</td>
                      <td className="py-3 px-2">14-17 hours</td>
                      <td className="py-3 px-2">No set pattern (4-5 naps)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">4-6 months</td>
                      <td className="py-3 px-2">12-15 hours</td>
                      <td className="py-3 px-2">3-4 naps</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">6-9 months</td>
                      <td className="py-3 px-2">12-15 hours</td>
                      <td className="py-3 px-2">2-3 naps</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">9-12 months</td>
                      <td className="py-3 px-2">12-14 hours</td>
                      <td className="py-3 px-2">2 naps</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">1-2 years</td>
                      <td className="py-3 px-2">11-14 hours</td>
                      <td className="py-3 px-2">1-2 naps</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: These are averages. Some babies need slightly more or less sleep and still be perfectly healthy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Common Sleep Challenges
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Day/Night Reversal (Newborns)</h4>
                  <p>
                    Your baby sleeps all day and parties all night. This is normal for the first few weeks.
                    Help reset their clock by exposing them to natural light during the day, keeping nights
                    dark and boring, and gradually shifting bedtime earlier by 15 minutes every few days.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Sleep Regression (4 Months, 8-10 Months)</h4>
                  <p>
                    Just when sleep was improving, everything falls apart. The 4-month regression happens
                    because sleep cycles mature permanently. The 8-10 month regression often coincides with
                    crawling, pulling up, and separation anxiety. It typically lasts 2-6 weeks.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Teething Disruptions</h4>
                  <p>
                    Teeth don&apos;t cause chronic sleep problems, but active teething can disrupt sleep for a
                    few nights. Offer a cold teether before bed. Pain relief medication may help during
                    particularly rough stretches — check with your pediatrician.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Separation Anxiety</h4>
                  <p>
                    Peaks around 8-10 months and again around 18 months. Your baby now understands you
                    exist when you leave the room — and wants you back. Consistent bedtime routines and
                    brief check-ins help. This phase passes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Healthy Sleep Habits
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consistent Bedtime Routine</p>
                    <p>Start around 6-8 weeks. Keep it simple: bath, book, bed. Same order, same time, every night. Predictability signals that sleep is coming.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Dark, Quiet Sleep Environment</p>
                    <p>Use blackout curtains. White noise can mask household sounds. Keep the room cool (68-72°F / 20-22°C is ideal).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Put Down Drowsy But Awake</p>
                    <p>This helps babies learn to fall asleep independently. If they always fall asleep while feeding or rocking, they&apos;ll expect that when they wake at night.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Safe Sleep Practices</p>
                    <p>Always place baby on their back to sleep. Use a firm mattress with a fitted sheet. No loose bedding, pillows, or stuffed animals in the crib.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "How much should my baby sleep?",
    answer: "It depends on age. Newborns (0-3 months) need 14-17 hours total. Infants (4-11 months) need 12-15 hours. Toddlers (1-2 years) need 11-14 hours. These include both nighttime sleep and naps. Some babies naturally need slightly more or less — watch for overtired cues like fussiness and rubbing eyes.",
  },
{
    question: "When do babies sleep through the night?",
    answer: "&quot;Sleeping through the night&quot; usually means a 6-8 hour stretch. Some babies manage this by 3-4 months, but many don&apos;t until 6-9 months. Even then, occasional night wakings are normal, especially during teething, illness, or developmental leaps.",
  },
{
    question: "What is sleep regression?",
    answer: "Sleep regression is when a baby who was sleeping well suddenly starts waking frequently or fighting naps. The most common happen around 4 months (permanent sleep cycle changes), 8-10 months (crawling, standing, separation anxiety), and 18 months (toddler independence). Regressions typically last 2-6 weeks.",
  },
{
    question: "Should my baby nap during the day?",
    answer: "Yes. Naps are essential for babies and toddlers. Overtired babies actually sleep worse at night. Newborns nap 4-5 times per day. By 6-9 months, most babies take 2-3 naps. By 15-18 months, most transition to one afternoon nap. Don&apos;t skip naps hoping for better nighttime sleep — it usually backfires.",
  },
{
    question: "How do I establish a bedtime routine?",
    answer: "Start simple and consistent. Pick 3-4 calming activities and do them in the same order every night. Example: bath, pajamas, book, feed, bed. Keep it under 30 minutes. Start around 6-8 weeks. The goal is to create associations that signal &quot;sleep time is coming.&quot; Consistency matters more than the specific activities.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
