"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SleepCycleCalculator() {
  const [mode, setMode] = useState<"wake" | "sleep">("wake");
  const [time, setTime] = useState<string>("07:00");
  const [bedtimes, setBedtimes] = useState<string[]>([]);
  const [wakeTimes, setWakeTimes] = useState<string[]>([]);

  const calculate = () => {
    const [hours, minutes] = time.split(":").map(Number);
    const timeMinutes = hours * 60 + minutes;
    
    // 90-minute sleep cycles, average 15 min to fall asleep
    const cycleMinutes = 90;
    const fallAsleepTime = 15;
    
    if (mode === "wake") {
      // Calculate bedtimes for desired wake time
      const results: string[] = [];
      for (let cycles = 6; cycles >= 3; cycles--) {
        let bedMinutes = timeMinutes - (cycles * cycleMinutes) - fallAsleepTime;
        if (bedMinutes < 0) bedMinutes += 24 * 60;
        const bedHours = Math.floor(bedMinutes / 60) % 24;
        const bedMins = bedMinutes % 60;
        results.push(`${bedHours.toString().padStart(2, "0")}:${bedMins.toString().padStart(2, "0")}`);
      }
      setBedtimes(results);
    } else {
      // Calculate wake times if falling asleep now
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      
      const results: string[] = [];
      for (let cycles = 3; cycles <= 6; cycles++) {
        let wakeMinutes = nowMinutes + fallAsleepTime + (cycles * cycleMinutes);
        if (wakeMinutes >= 24 * 60) wakeMinutes -= 24 * 60;
        const wakeHours = Math.floor(wakeMinutes / 60) % 24;
        const wakeMins = wakeMinutes % 60;
        results.push(`${wakeHours.toString().padStart(2, "0")}:${wakeMins.toString().padStart(2, "0")}`);
      }
      setWakeTimes(results);
    }
  };

  const reset = () => {
    setBedtimes([]);
    setWakeTimes([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Calculate</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as "wake" | "sleep")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wake">Bedtimes for desired wake time</SelectItem>
                  <SelectItem value="sleep">Wake times if sleeping now</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="time">{mode === "wake" ? "Desired Wake Time" : "Current Time"}</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {bedtimes.length > 0 && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-2">
                  To wake up at {time}, go to bed at:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {bedtimes.map((bt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{bt}</span>
                      <span className="text-sm text-muted-foreground">
                        ({6 - i} cycles)
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Based on 90-minute sleep cycles with 15 minutes to fall asleep
                </p>
              </div>
            )}

            {wakeTimes.length > 0 && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-2">
                  If you fall asleep now, wake up at:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {wakeTimes.map((wt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{wt}</span>
                      <span className="text-sm text-muted-foreground">
                        ({i + 3} cycles)
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
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
