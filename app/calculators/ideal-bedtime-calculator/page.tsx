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
        <CardHeader>
          <CardTitle>Ideal Bedtime Calculator – What Time Should You Go to Sleep?</CardTitle>
          <CardDescription>
            Struggling with morning grogginess? Our bedtime calculator tells you exactly when to go to sleep so you wake up feeling rested and refreshed every day.
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
    </div>
  );
}
