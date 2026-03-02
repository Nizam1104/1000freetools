"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Activity {
  name: string;
  met: number;
}

const activities: Activity[] = [
  { name: "Sitting quietly", met: 1.0 },
  { name: "Walking slowly (2 mph)", met: 2.5 },
  { name: "Walking moderate (3 mph)", met: 3.5 },
  { name: "Walking briskly (4 mph)", met: 4.5 },
  { name: "Running (5 mph / 12 min/mile)", met: 8.0 },
  { name: "Running (6 mph / 10 min/mile)", met: 10.0 },
  { name: "Running (7.5 mph / 8 min/mile)", met: 12.5 },
  { name: "Cycling leisurely", met: 4.0 },
  { name: "Cycling moderate (12-14 mph)", met: 8.0 },
  { name: "Cycling vigorous (16-19 mph)", met: 12.0 },
  { name: "Swimming leisurely", met: 6.0 },
  { name: "Swimming moderate", met: 8.0 },
  { name: "Swimming vigorous", met: 10.0 },
  { name: "Weight training", met: 6.0 },
  { name: "Yoga", met: 3.0 },
  { name: "Basketball", met: 8.0 },
  { name: "Soccer", met: 7.0 },
  { name: "Tennis", met: 7.5 },
  { name: "Dancing", met: 5.0 },
  { name: "Gardening", met: 4.0 },
  { name: "House cleaning", met: 3.5 },
  { name: "Custom (enter MET)", met: 0 },
];

export default function ActivityCalorieCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [duration, setDuration] = useState<string>("");
  const [durationUnit, setDurationUnit] = useState<"min" | "hours">("min");
  const [selectedActivity, setSelectedActivity] = useState<string>("Walking moderate (3 mph)");
  const [customMet, setCustomMet] = useState<string>("");
  const [calories, setCalories] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const d = parseFloat(duration);

    if (isNaN(w) || isNaN(d) || w <= 0 || d <= 0) return;

    const weightKg = weightUnit === "lbs" ? w * 0.453592 : w;
    const durationHours = durationUnit === "min" ? d / 60 : d;

    let met = activities.find(a => a.name === selectedActivity)?.met || 3.5;
    if (selectedActivity === "Custom (enter MET)") {
      met = parseFloat(customMet) || 3.5;
    }

    // Calories = MET × weight(kg) × time(hours)
    const caloriesBurned = met * weightKg * durationHours;
    setCalories(Math.round(caloriesBurned));
  };

  const reset = () => {
    setWeight("");
    setDuration("");
    setCustomMet("");
    setCalories(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Activity Calorie Burn Calculator – Calories Burned by Activity & Duration</CardTitle>
          <CardDescription>
            Find out how many calories any activity burns based on your weight and how long you do it. Our calculator covers hundreds of activities using MET-based calculations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="weightUnit">Unit</Label>
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
              <Label htmlFor="activity">Activity</Label>
              <Select value={selectedActivity} onValueChange={setSelectedActivity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {activities.map((activity) => (
                    <SelectItem key={activity.name} value={activity.name}>
                      {activity.name} {activity.met > 0 && `(MET: ${activity.met})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedActivity === "Custom (enter MET)" && (
              <div>
                <Label htmlFor="customMet">MET Value</Label>
                <Input
                  id="customMet"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 5.0"
                  value={customMet}
                  onChange={(e) => setCustomMet(e.target.value)}
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="e.g., 30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="durationUnit">Unit</Label>
                <Select value={durationUnit} onValueChange={(v) => setDurationUnit(v as "min" | "hours")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="min">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {calories !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Calories Burned</p>
                <p className="text-4xl font-bold mt-1">{calories}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Based on MET value for {selectedActivity}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
