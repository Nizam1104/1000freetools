"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SwimmingCalorieCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [style, setStyle] = useState<string>("moderate");
  const [time, setTime] = useState<string>("");
  const [timeUnit, setTimeUnit] = useState<"minutes" | "hours">("minutes");
  const [calories, setCalories] = useState<number | null>(null);

  // MET values for swimming
  const metValues: Record<string, number> = {
    leisure: 6,      // Leisure swimming
    moderate: 8,     // Moderate effort
    vigorous: 10,    // Vigorous effort
    butterfly: 14    // Butterfly stroke
  };

  const calculate = () => {
    const weightValue = parseFloat(weight);
    const timeValue = parseFloat(time);

    if (isNaN(weightValue) || isNaN(timeValue) || weightValue <= 0 || timeValue <= 0) return;

    // Convert weight to kg
    const weightInKg = weightUnit === "lbs" ? weightValue * 0.453592 : weightValue;

    // Convert time to hours
    const timeInHours = timeUnit === "minutes" ? timeValue / 60 : timeValue;

    // Get MET value
    const met = metValues[style] || 8;

    // Calculate calories: Calories = MET × weight(kg) × time(hours)
    const calculatedCalories = met * weightInKg * timeInHours;
    setCalories(Math.round(calculatedCalories));
  };

  const reset = () => {
    setWeight("");
    setTime("");
    setCalories(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Swimming Calorie Calculator – How Many Calories Does Swimming Burn?</CardTitle>
          <CardDescription>
            Discover the calorie-burning power of swimming. Input your weight, swim style, and duration to calculate calories burned in the pool with our free swimming calorie calculator.
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

            <div>
              <Label htmlFor="style">Swimming Style</Label>
              <Select value={style} onValueChange={(v) => setStyle(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leisure">Leisure Swimming</SelectItem>
                  <SelectItem value="moderate">Moderate Effort (Freestyle)</SelectItem>
                  <SelectItem value="vigorous">Vigorous Effort</SelectItem>
                  <SelectItem value="butterfly">Butterfly Stroke</SelectItem>
                </SelectContent>
              </Select>
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
