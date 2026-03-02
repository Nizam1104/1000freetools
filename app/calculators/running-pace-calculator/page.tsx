"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RunningPaceCalculator() {
  const [unit, setUnit] = useState<"km" | "miles">("km");
  const [calculateType, setCalculateType] = useState<"pace" | "time" | "speed">("pace");
  const [distance, setDistance] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const calculate = () => {
    const distanceValue = parseFloat(distance);
    const hoursValue = parseFloat(hours) || 0;
    const minutesValue = parseFloat(minutes) || 0;
    const secondsValue = parseFloat(seconds) || 0;

    const totalTimeInSeconds = hoursValue * 3600 + minutesValue * 60 + secondsValue;

    if (isNaN(distanceValue) || distanceValue <= 0 || totalTimeInSeconds <= 0) return;

    let output = "";

    if (calculateType === "pace") {
      // Calculate pace (time per unit distance)
      const paceInSeconds = totalTimeInSeconds / distanceValue;
      const paceMinutes = Math.floor(paceInSeconds / 60);
      const paceSeconds = Math.round(paceInSeconds % 60);
      output = `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')} / ${unit}`;
    } else if (calculateType === "time") {
      // Calculate total time
      const totalHours = Math.floor(totalTimeInSeconds / 3600);
      const totalMinutes = Math.floor((totalTimeInSeconds % 3600) / 60);
      const totalSeconds = Math.round(totalTimeInSeconds % 60);
      
      if (totalHours > 0) {
        output = `${totalHours}h ${totalMinutes}m ${totalSeconds}s`;
      } else if (totalMinutes > 0) {
        output = `${totalMinutes}m ${totalSeconds}s`;
      } else {
        output = `${totalSeconds}s`;
      }
    } else if (calculateType === "speed") {
      // Calculate speed
      const timeInHours = totalTimeInSeconds / 3600;
      const speed = distanceValue / timeInHours;
      output = `${speed.toFixed(2)} ${unit}/h`;
    }

    setResult(output);
  };

  const reset = () => {
    setDistance("");
    setHours("");
    setMinutes("");
    setSeconds("");
    setResult("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Running Pace Calculator – Calculate Pace, Speed & Finish Time</CardTitle>
          <CardDescription>
            Plan your next race or training run with our running pace calculator. Enter any two of distance, time, or pace to instantly calculate the third. Perfect for all distances.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Distance Unit</Label>
                <Select value={unit} onValueChange={(v) => setUnit(v as "km" | "miles")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="km">Kilometers</SelectItem>
                    <SelectItem value="miles">Miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Calculate</Label>
                <Select value={calculateType} onValueChange={(v) => setCalculateType(v as "pace" | "time" | "speed")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pace">Pace</SelectItem>
                    <SelectItem value="time">Time</SelectItem>
                    <SelectItem value="speed">Speed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="distance">Distance ({unit})</Label>
              <Input
                id="distance"
                type="number"
                step="0.01"
                placeholder={unit === "km" ? "e.g., 10" : "e.g., 6.2"}
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>

            <div>
              <Label>Time</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div>
                  <Label htmlFor="hours" className="text-xs">Hours</Label>
                  <Input
                    id="hours"
                    type="number"
                    placeholder="0"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="minutes" className="text-xs">Minutes</Label>
                  <Input
                    id="minutes"
                    type="number"
                    placeholder="30"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="seconds" className="text-xs">Seconds</Label>
                  <Input
                    id="seconds"
                    type="number"
                    placeholder="0"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">
                  {calculateType === "pace" ? "Your Pace" : calculateType === "time" ? "Total Time" : "Your Speed"}
                </p>
                <p className="text-3xl font-bold mt-1">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
