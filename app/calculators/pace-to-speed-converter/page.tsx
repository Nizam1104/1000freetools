"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PaceToSpeedConverter() {
  const [paceMin, setPaceMin] = useState<string>("");
  const [paceSec, setPaceSec] = useState<string>("");
  const [unit, setUnit] = useState<"km" | "mile">("km");
  const [speed, setSpeed] = useState<number | null>(null);

  const calculate = () => {
    const min = parseFloat(paceMin);
    const sec = parseFloat(paceSec);

    if (isNaN(min) || isNaN(sec) || min <= 0) return;

    const totalMinutes = min + sec / 60;
    
    // Speed = 60 / pace (in min per unit)
    const speedValue = 60 / totalMinutes;
    setSpeed(Math.round(speedValue * 100) / 100);
  };

  const reset = () => {
    setPaceMin("");
    setPaceSec("");
    setSpeed(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Pace to Speed Converter – Convert Running Pace to Speed Instantly</CardTitle>
          <CardDescription>
            Easily convert your running or cycling pace to speed. Our pace-to-speed converter handles both metric and imperial units so you can track performance your way.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Distance Unit</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as "km" | "mile")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km">min/km → km/h</SelectItem>
                  <SelectItem value="mile">min/mile → mph</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paceMin">Minutes</Label>
                <Input
                  id="paceMin"
                  type="number"
                  placeholder="e.g., 5"
                  value={paceMin}
                  onChange={(e) => setPaceMin(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="paceSec">Seconds</Label>
                <Input
                  id="paceSec"
                  type="number"
                  placeholder="e.g., 30"
                  value={paceSec}
                  onChange={(e) => setPaceSec(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {speed !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Speed</p>
                <p className="text-4xl font-bold mt-1">{speed}</p>
                <p className="text-lg font-medium mt-1">
                  {unit === "km" ? "km/h" : "mph"}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {paceMin}:{paceSec.padStart(2, "0")} {unit === "km" ? "min/km" : "min/mile"} = {speed} {unit === "km" ? "km/h" : "mph"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
