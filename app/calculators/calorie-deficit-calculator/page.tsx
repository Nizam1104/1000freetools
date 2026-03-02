"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CalorieDeficitCalculator() {
  const [weightToLose, setWeightToLose] = useState<string>("");
  const [weeks, setWeeks] = useState<string>("");
  const [deficit, setDeficit] = useState<number | null>(null);
  const [weeklyLoss, setWeeklyLoss] = useState<number | null>(null);

  const calculate = () => {
    const lbs = parseFloat(weightToLose);
    const w = parseFloat(weeks);

    if (isNaN(lbs) || isNaN(w) || lbs <= 0 || w <= 0) return;

    // 1 lb fat = 3500 calories
    // deficit = (X * 3500) / (Y * 7) calories per day
    const totalCalorieDeficit = lbs * 3500;
    const dailyDeficit = totalCalorieDeficit / (w * 7);
    const weeklyWeightLoss = lbs / w;

    setDeficit(Math.round(dailyDeficit));
    setWeeklyLoss(Math.round(weeklyWeightLoss * 10) / 10);
  };

  const reset = () => {
    setWeightToLose("");
    setWeeks("");
    setDeficit(null);
    setWeeklyLoss(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Calorie Deficit Calculator – How Many Calories to Cut to Lose Weight?</CardTitle>
          <CardDescription>
            Find out exactly how large a calorie deficit you need to reach your weight loss goals. Our calorie deficit calculator helps you lose weight safely and sustainably.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="weightToLose">Weight to Lose (lbs)</Label>
              <Input
                id="weightToLose"
                type="number"
                placeholder="e.g., 10"
                value={weightToLose}
                onChange={(e) => setWeightToLose(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="weeks">Timeframe (weeks)</Label>
              <Input
                id="weeks"
                type="number"
                placeholder="e.g., 8"
                value={weeks}
                onChange={(e) => setWeeks(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Deficit</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {deficit !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Daily Calorie Deficit Needed</p>
                <p className="text-4xl font-bold mt-1">{deficit} <span className="text-lg font-normal">calories/day</span></p>
                <p className="text-sm text-muted-foreground mt-2">
                  To lose {weightToLose} lbs in {weeks} weeks, you need a daily deficit of {deficit} calories.
                </p>
                {weeklyLoss && (
                  <p className="text-sm text-muted-foreground mt-1">
                    This equals approximately {weeklyLoss} lbs per week.
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-3">
                  Note: A safe and sustainable weight loss rate is 1-2 lbs per week (500-1000 calorie daily deficit).
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
