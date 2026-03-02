"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WeightLossTimeCalculator() {
  const [currentWeight, setCurrentWeight] = useState<string>("");
  const [goalWeight, setGoalWeight] = useState<string>("");
  const [dailyDeficit, setDailyDeficit] = useState<string>("");
  const [days, setDays] = useState<number | null>(null);
  const [weeks, setWeeks] = useState<number | null>(null);

  const calculate = () => {
    const current = parseFloat(currentWeight);
    const goal = parseFloat(goalWeight);
    const deficit = parseFloat(dailyDeficit);

    if (isNaN(current) || isNaN(goal) || isNaN(deficit) || current <= 0 || goal <= 0 || deficit <= 0) return;
    if (goal >= current) return;

    const weightToLose = current - goal;
    // Days = (weightToLose * 3500) / dailyDeficit
    const totalDays = (weightToLose * 3500) / deficit;
    const totalWeeks = totalDays / 7;

    setDays(Math.round(totalDays));
    setWeeks(Math.round(totalWeeks * 10) / 10);
  };

  const reset = () => {
    setCurrentWeight("");
    setGoalWeight("");
    setDailyDeficit("");
    setDays(null);
    setWeeks(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Weight Loss Time Calculator – How Long Will It Take to Lose Weight?</CardTitle>
          <CardDescription>
            Plan your weight loss journey with confidence. Enter your current weight, goal weight, and daily deficit to see a realistic timeline for reaching your target.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentWeight">Current Weight (lbs)</Label>
              <Input
                id="currentWeight"
                type="number"
                placeholder="e.g., 180"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="goalWeight">Goal Weight (lbs)</Label>
              <Input
                id="goalWeight"
                type="number"
                placeholder="e.g., 150"
                value={goalWeight}
                onChange={(e) => setGoalWeight(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="dailyDeficit">Daily Calorie Deficit</Label>
              <Input
                id="dailyDeficit"
                type="number"
                placeholder="e.g., 500"
                value={dailyDeficit}
                onChange={(e) => setDailyDeficit(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                A deficit of 500 calories/day typically results in 1 lb weight loss per week.
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Timeline</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {days !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Estimated Time to Reach Goal</p>
                <p className="text-4xl font-bold mt-1">{days} <span className="text-lg font-normal">days</span></p>
                <p className="text-xl font-medium mt-2">{weeks} weeks</p>
                <p className="text-sm text-muted-foreground mt-2">
                  With a daily deficit of {dailyDeficit} calories, you'll reach your goal of {goalWeight} lbs in approximately {days} days.
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Note: This is an estimate. Actual results may vary based on metabolism, activity level, and other factors.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
