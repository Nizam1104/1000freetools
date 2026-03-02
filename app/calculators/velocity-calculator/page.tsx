"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function VelocityCalculator() {
  const [displacement, setDisplacement] = useState<string>("");
  const [displacementUnit, setDisplacementUnit] = useState<"m" | "km" | "miles">("m");
  const [time, setTime] = useState<string>("");
  const [timeUnit, setTimeUnit] = useState<"s" | "min" | "hours">("s");
  const [velocity, setVelocity] = useState<number | null>(null);
  const [outputUnit, setOutputUnit] = useState<"m/s" | "km/h" | "mph">("m/s");
  const [direction, setDirection] = useState<"positive" | "negative">("positive");

  const convertToMeters = (value: number, unit: string): number => {
    switch (unit) {
      case "km":
        return value * 1000;
      case "miles":
        return value * 1609.34;
      default:
        return value;
    }
  };

  const convertToSeconds = (value: number, unit: string): number => {
    switch (unit) {
      case "min":
        return value * 60;
      case "hours":
        return value * 3600;
      default:
        return value;
    }
  };

  const convertFromMps = (value: number, unit: string): number => {
    switch (unit) {
      case "km/h":
        return value * 3.6;
      case "mph":
        return value * 2.23694;
      default:
        return value;
    }
  };

  const calculate = () => {
    const d = parseFloat(displacement);
    const t = parseFloat(time);

    if (isNaN(d) || isNaN(t) || d === 0 || t <= 0) return;

    const displacementInMeters = convertToMeters(Math.abs(d), displacementUnit);
    const timeInSeconds = convertToSeconds(t, timeUnit);
    
    const velocityInMps = displacementInMeters / timeInSeconds;
    const convertedVelocity = convertFromMps(velocityInMps, outputUnit);
    
    setVelocity(Math.round(convertedVelocity * 100) / 100);
    setDirection(d < 0 ? "negative" : "positive");
  };

  const reset = () => {
    setDisplacement("");
    setTime("");
    setVelocity(null);
    setDirection("positive");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Velocity Calculator</CardTitle>
          <CardDescription>
            Calculate velocity from displacement and time. Enter the displacement and time to find the velocity with direction indicator.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="displacement">Displacement</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="displacement"
                    type="number"
                    placeholder="e.g., 100"
                    value={displacement}
                    onChange={(e) => setDisplacement(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={displacementUnit} onValueChange={(v) => setDisplacementUnit(v as "m" | "km" | "miles")}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m">m</SelectItem>
                      <SelectItem value="km">km</SelectItem>
                      <SelectItem value="miles">miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="time">Time</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="time"
                    type="number"
                    placeholder="e.g., 10"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={timeUnit} onValueChange={(v) => setTimeUnit(v as "s" | "min" | "hours")}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s">s</SelectItem>
                      <SelectItem value="min">min</SelectItem>
                      <SelectItem value="hours">hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <Label>Output Unit</Label>
              <Select value={outputUnit} onValueChange={(v) => setOutputUnit(v as "m/s" | "km/h" | "mph")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m/s">m/s</SelectItem>
                  <SelectItem value="km/h">km/h</SelectItem>
                  <SelectItem value="mph">mph</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Velocity</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {velocity !== null && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Velocity</p>
                  <p className="text-4xl font-bold mt-1">
                    {velocity} {outputUnit}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Direction:</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-medium ${
                    direction === "positive" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {direction === "positive" ? "→" : "←"} {direction === "positive" ? "Positive" : "Negative"}
                  </span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">Formula: v = displacement / time</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
