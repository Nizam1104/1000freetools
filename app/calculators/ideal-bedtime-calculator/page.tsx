"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function IdealBedtimeCalculator() {
  const [wakeTime, setWakeTime] = useState<string>("07:00");
  const [cycles, setCycles] = useState<number>(5);
  const [bedtime, setBedtime] = useState<string>("");

  const calculate = () => {
    const [hours, minutes] = wakeTime.split(":").map(Number);
    const wakeMinutes = hours * 60 + minutes;
    
    // 90-minute sleep cycles, 15 min to fall asleep
    const cycleMinutes = 90;
    const fallAsleepTime = 15;
    
    let bedMinutes = wakeMinutes - (cycles * cycleMinutes) - fallAsleepTime;
    if (bedMinutes < 0) bedMinutes += 24 * 60;
    
    const bedHours = Math.floor(bedMinutes / 60) % 24;
    const bedMins = bedMinutes % 60;
    
    setBedtime(`${bedHours.toString().padStart(2, "0")}:${bedMins.toString().padStart(2, "0")}`);
  };

  const reset = () => {
    setWakeTime("07:00");
    setCycles(5);
    setBedtime("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="wakeTime">Desired Wake Time</Label>
              <Input
                id="wakeTime"
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="cycles">Sleep Cycles</Label>
              <Select
                value={cycles.toString()}
                onValueChange={(v) => setCycles(parseInt(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4 cycles (6 hours)</SelectItem>
                  <SelectItem value="5">5 cycles (7.5 hours) - Recommended</SelectItem>
                  <SelectItem value="6">6 cycles (9 hours)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Bedtime</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {bedtime && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Your Ideal Bedtime</p>
                <p className="text-4xl font-bold mt-1">{bedtime}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  For a {wakeTime} wake time with {cycles} sleep cycles
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on 90-minute sleep cycles with 15 minutes to fall asleep
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Ideal Bedtime Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Set your desired wake time</p>
                  <p>Enter the time you need to wake up tomorrow. Be realistic — this should be your actual alarm time.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Choose your sleep cycles</p>
                  <p>Select 4, 5, or 6 cycles. Five cycles (7.5 hours) works for most adults. Six cycles is better if you are sleep-deprived.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Get your ideal bedtime</p>
                  <p>The calculator shows when to fall asleep. Add 15 minutes for the time it takes to actually drift off.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Sleep Duration Recommendations by Age
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Age Group</th>
                    <th className="text-left py-3 px-2 font-semibold">Recommended Hours</th>
                    <th className="text-left py-3 px-2 font-semibold">Sleep Cycles</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Newborns (0-3 months)</td>
                    <td className="py-3 px-2">14-17 hours</td>
                    <td className="py-3 px-2">Multiple naps + night sleep</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Infants (4-11 months)</td>
                    <td className="py-3 px-2">12-15 hours</td>
                    <td className="py-3 px-2">2-3 naps + night sleep</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Toddlers (1-2 years)</td>
                    <td className="py-3 px-2">11-14 hours</td>
                    <td className="py-3 px-2">1-2 naps + night sleep</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Preschoolers (3-5 years)</td>
                    <td className="py-3 px-2">10-13 hours</td>
                    <td className="py-3 px-2">0-1 naps + night sleep</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">School-age (6-13 years)</td>
                    <td className="py-3 px-2">9-11 hours</td>
                    <td className="py-3 px-2">6-7 cycles</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Teenagers (14-17 years)</td>
                    <td className="py-3 px-2">8-10 hours</td>
                    <td className="py-3 px-2">5-6 cycles</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Young Adults (18-25 years)</td>
                    <td className="py-3 px-2">7-9 hours</td>
                    <td className="py-3 px-2">5-6 cycles</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Adults (26-64 years)</td>
                    <td className="py-3 px-2">7-9 hours</td>
                    <td className="py-3 px-2">5-6 cycles</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Older Adults (65+ years)</td>
                    <td className="py-3 px-2">7-8 hours</td>
                    <td className="py-3 px-2">4-5 cycles</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Source: National Sleep Foundation sleep duration recommendations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Sleep Cycles
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Are Sleep Cycles?</h4>
                <p>
                  Sleep happens in 90-minute cycles. Each cycle moves through light sleep, deep sleep, and REM (dream) sleep. Waking at the end of a cycle feels natural. Waking in the middle of deep sleep leaves you groggy — that is sleep inertia.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">The Four Sleep Stages</h4>
                <p>
                  Stage 1 is light dozing, lasting a few minutes. Stage 2 is light sleep where heart rate slows. Stage 3 is deep sleep — your body repairs itself here. REM sleep is when you dream and your brain processes memories. A full cycle includes all four stages.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why 90 Minutes?</h4>
                <p>
                  The average sleep cycle lasts about 90 minutes, though it ranges from 80 to 110 minutes. Early cycles have more deep sleep. Later cycles have more REM. Five cycles equal 7.5 hours, which matches the recommended adult sleep duration.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">The 15-Minute Rule</h4>
                <p>
                  Most people take 10-20 minutes to fall asleep. This calculator assumes 15 minutes. If your bedtime is 10:30 PM, you should be in bed by 10:15 PM. Lying awake for 30+ minutes regularly may signal a sleep issue worth discussing with a doctor.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Better Sleep
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Keep a consistent schedule</p>
                  <p>Go to bed and wake up at the same time every day, even weekends. Your body clock thrives on routine.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Limit blue light before bed</p>
                  <p>Phones, tablets, and computers suppress melatonin. Stop using screens 1-2 hours before bedtime or use blue-light filters.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Watch caffeine and alcohol</p>
                  <p>Caffeine stays in your system for 6-8 hours. Avoid it after 2 PM. Alcohol may help you fall asleep but fragments sleep later in the night.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Create a wind-down routine</p>
                  <p>Spend 30-60 minutes relaxing before bed. Read, take a warm bath, or do gentle stretches. Signal to your brain that sleep is coming.</p>
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
                <h4 className="font-medium text-foreground mb-2">How many sleep cycles do I need?</h4>
                <p>
                  Most adults need 5-6 sleep cycles per night, which equals 7.5-9 hours. Four cycles (6 hours) may work for some people but leaves many sleep-deprived over time. Teenagers and young adults often need 6 cycles or more.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why do I feel groggy even after 8 hours of sleep?</h4>
                <p>
                  You probably woke during deep sleep instead of at the end of a cycle. Try adjusting your bedtime by 15-30 minutes to align with cycle boundaries. Sleep quality also matters — apnea, alcohol, or an uncomfortable room can fragment sleep.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Should I nap during the day?</h4>
                <p>
                  Short naps (20 minutes) can boost alertness without affecting nighttime sleep. Longer naps enter deep sleep and cause grogginess. Avoid napping after 3 PM if you have trouble falling asleep at night.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is it bad to wake up before my alarm?</h4>
                <p>
                  Waking naturally before your alarm usually means you completed a sleep cycle — that is a good sign. If you consistently wake hours early and cannot fall back asleep, you may need to adjust your bedtime or address stress.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How long does it take to fall asleep?</h4>
                <p>
                  Most people fall asleep in 10-20 minutes. Falling asleep in under 5 minutes often signals sleep deprivation. Taking over 30 minutes regularly may indicate insomnia or poor sleep hygiene.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
