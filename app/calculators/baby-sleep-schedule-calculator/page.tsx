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
        </div>
      </div>
    </div>
  );
}
