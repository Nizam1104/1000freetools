"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DeepSleepCyclePlanner() {
  const [wakeTime, setWakeTime] = useState<string>("07:00");
  const [bedtime, setBedtime] = useState<string>("");
  const [sleepCycles, setSleepCycles] = useState<number>(5);
  const [results, setResults] = useState<{
    bedtimes: string[];
    deepSleepWindows: string[];
  } | null>(null);

  const addMinutes = (timeStr: string, minutes: number): string => {
    const [hours, mins] = timeStr.split(":").map(Number);
    const totalMins = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMins / 60) % 24;
    const newMins = totalMins % 60;
    return `${String(newHours).padStart(2, "0")}:${String(newMins).padStart(2, "0")}`;
  };

  const subtractMinutes = (timeStr: string, minutes: number): string => {
    const [hours, mins] = timeStr.split(":").map(Number);
    const totalMins = hours * 60 + mins - minutes;
    let newHours = Math.floor(totalMins / 60);
    if (newHours < 0) newHours += 24;
    const newMins = ((totalMins % 60) + 60) % 60;
    return `${String(newHours).padStart(2, "0")}:${String(newMins).padStart(2, "0")}`;
  };

  const calculate = () => {
    if (!wakeTime) return;

    // Sleep cycle is ~90 minutes
    // Deep sleep occurs primarily in first half of night
    // Typically cycles 3-5, with more deep sleep in earlier cycles

    const bedtimes: string[] = [];
    const deepSleepWindows: string[] = [];

    for (let cycles = 3; cycles <= 6; cycles++) {
      const sleepDuration = cycles * 90;
      const bedtime = subtractMinutes(wakeTime, sleepDuration + 15); // +15 min to fall asleep
      bedtimes.push(bedtime);

      // Deep sleep windows (primarily in first 3-4 hours)
      const deepSleepStart = bedtime;
      const deepSleepEnd = addMinutes(bedtime, Math.min(cycles * 90, 240));
      deepSleepWindows.push(`${deepSleepStart} - ${deepSleepEnd}`);
    }

    setResults({
      bedtimes,
      deepSleepWindows,
    });
    setSleepCycles(5);
  };

  const calculateFromBedtime = () => {
    if (!bedtime || !wakeTime) return;

    const bedMins = parseInt(bedtime.split(":")[0]) * 60 + parseInt(bedtime.split(":")[1]);
    const wakeMins = parseInt(wakeTime.split(":")[0]) * 60 + parseInt(wakeTime.split(":")[1]);

    let sleepDuration = wakeMins - bedMins;
    if (sleepDuration < 0) sleepDuration += 24 * 60;

    const cycles = Math.round(sleepDuration / 90);
    setSleepCycles(cycles);

    const deepSleepHours = Math.min(cycles * 90, 240) / 60;
    setResults({
      bedtimes: [bedtime],
      deepSleepWindows: [`~${deepSleepHours.toFixed(1)} hours of deep sleep potential`],
    });
  };

  const reset = () => {
    setWakeTime("07:00");
    setBedtime("");
    setSleepCycles(5);
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Deep Sleep Planner – Optimize Your Sleep Schedule for Deep Rest</CardTitle>
          <CardDescription>
            Maximize deep sleep for better recovery and brain health. Our deep sleep cycle planner helps you schedule bedtimes that align with natural sleep architecture for optimal rest.
          </CardDescription>
        </CardHeader>
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
              <Label htmlFor="bedtime">Or Enter Your Bedtime (to analyze)</Label>
              <div className="flex gap-2">
                <Input
                  id="bedtime"
                  type="time"
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                />
                <Button onClick={calculateFromBedtime}>Analyze</Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Optimal Bedtimes</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div>
                  <p className="font-medium mb-2">Recommended Bedtimes:</p>
                  <div className="space-y-2">
                    {results.bedtimes.map((bt, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-background rounded">
                        <span>{sleepCycles === 5 ? `${6 - i} cycles` : `${3 + i} cycles`}</span>
                        <span className="font-bold">{bt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">Deep Sleep Windows:</p>
                  <div className="space-y-2">
                    {results.deepSleepWindows.map((window, i) => (
                      <div key={i} className="p-2 bg-background rounded">
                        <span className="text-sm">{window}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>💡 Tip: Deep sleep occurs primarily in the first 3-4 hours. Going to bed earlier maximizes deep sleep.</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
