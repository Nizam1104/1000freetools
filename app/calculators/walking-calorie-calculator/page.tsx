"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WalkingCalorieCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [speed, setSpeed] = useState<string>("");
  const [speedUnit, setSpeedUnit] = useState<"kmh" | "mph">("kmh");
  const [time, setTime] = useState<string>("");
  const [timeUnit, setTimeUnit] = useState<"minutes" | "hours">("minutes");
  const [calories, setCalories] = useState<number | null>(null);

  // MET values for walking speeds
  const getMET = (speedValue: number, unit: "kmh" | "mph"): number => {
    const speedInKmh = unit === "mph" ? speedValue * 1.60934 : speedValue;
    
    if (speedInKmh < 4) return 2.5; // Slow walking (< 2.5 mph)
    if (speedInKmh < 5.5) return 3.5; // Moderate walking (2.5-3.4 mph)
    if (speedInKmh < 7) return 4.5; // Brisk walking (3.5-4.3 mph)
    return 5.5; // Very fast walking (4.5+ mph)
  };

  const calculate = () => {
    const weightValue = parseFloat(weight);
    const speedValue = parseFloat(speed);
    const timeValue = parseFloat(time);

    if (isNaN(weightValue) || isNaN(speedValue) || isNaN(timeValue) || weightValue <= 0 || speedValue <= 0 || timeValue <= 0) return;

    // Convert weight to kg
    const weightInKg = weightUnit === "lbs" ? weightValue * 0.453592 : weightValue;

    // Convert time to hours
    const timeInHours = timeUnit === "minutes" ? timeValue / 60 : timeValue;

    // Get MET value
    const met = getMET(speedValue, speedUnit);

    // Calculate calories: Calories = MET × weight(kg) × time(hours)
    const calculatedCalories = met * weightInKg * timeInHours;
    setCalories(Math.round(calculatedCalories));
  };

  const reset = () => {
    setWeight("");
    setSpeed("");
    setTime("");
    setCalories(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Walking Calorie Calculator – How Many Calories Do You Burn Walking?</CardTitle>
          <CardDescription>
            Find out how many calories you burn walking with our free calculator. Input your weight, speed, and distance to get an accurate calorie expenditure estimate for any walk.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={weightUnit} onValueChange={(v) => setWeightUnit(v as "kg" | "lbs")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="speed">Speed</Label>
                <Input
                  id="speed"
                  type="number"
                  step="0.1"
                  placeholder="5"
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={speedUnit} onValueChange={(v) => setSpeedUnit(v as "kmh" | "mph")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kmh">km/h</SelectItem>
                    <SelectItem value="mph">mph</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="time">Duration</Label>
                <Input
                  id="time"
                  type="number"
                  placeholder="30"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={timeUnit} onValueChange={(v) => setTimeUnit(v as "minutes" | "hours")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Calories</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {calories !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Calories Burned</p>
                <p className="text-4xl font-bold mt-1">{calories} <span className="text-lg font-normal">kcal</span></p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
