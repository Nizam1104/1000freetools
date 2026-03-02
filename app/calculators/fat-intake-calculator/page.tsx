"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function FatIntakeCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [goal, setGoal] = useState<string>("maintain");
  const [results, setResults] = useState<{
    calories: number;
    fatGrams: number;
    fatCalories: number;
    fatPercentage: number;
    saturatedFat: number;
    unsaturatedFat: number;
    range: { min: number; max: number };
  } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (isNaN(w) || isNaN(h) || isNaN(a) || w <= 0 || h <= 0 || a <= 0) return;

    let weightKg: number;
    let heightCm: number;

    if (unit === "metric") {
      weightKg = w;
      heightCm = h;
    } else {
      weightKg = w * 0.453592;
      heightCm = h * 2.54;
    }

    // Calculate BMR using Mifflin-St Jeor
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * a + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * a - 161;
    }

    // Activity multipliers
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    let calories = bmr * (activityMultipliers[activityLevel] || 1.55);

    // Adjust for goal
    if (goal === "lose") {
      calories *= 0.85; // 15% deficit
    } else if (goal === "gain") {
      calories *= 1.15; // 15% surplus
    }

    calories = Math.round(calories);

    // Fat percentages based on goal (typically 20-35% of calories)
    const fatPercentages: Record<string, { default: number; min: number; max: number }> = {
      lose: { default: 25, min: 20, max: 30 },
      maintain: { default: 30, min: 25, max: 35 },
      gain: { default: 25, min: 20, max: 30 },
    };

    const fatConfig = fatPercentages[goal] || fatPercentages.maintain;
    const fatPercentage = fatConfig.default;
    const fatCalories = Math.round(calories * (fatPercentage / 100));
    const fatGrams = Math.round(fatCalories / 9); // 1g fat = 9 calories

    // Saturated fat should be less than 10% of total calories
    const saturatedFat = Math.round((calories * 0.1) / 9);
    // Remaining is unsaturated
    const unsaturatedFat = fatGrams - saturatedFat;

    setResults({
      calories,
      fatGrams,
      fatCalories,
      fatPercentage,
      saturatedFat,
      unsaturatedFat,
      range: {
        min: Math.round((calories * (fatConfig.min / 100)) / 9),
        max: Math.round((calories * (fatConfig.max / 100)) / 9),
      },
    });
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("male");
    setActivityLevel("moderate");
    setGoal("maintain");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Fat Intake Calculator – How Much Fat Should You Eat Daily?</CardTitle>
          <CardDescription>
            Calculate your daily fat requirements with our fat intake calculator. Get a breakdown of saturated and unsaturated fat targets based on your calorie needs and health goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={(v) => setGender(v as "male" | "female")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Unit System</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as "metric" | "imperial")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                  <SelectItem value="imperial">Imperial (inches, lbs)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="height">Height ({unit === "metric" ? "cm" : "inches"})</Label>
              <Input
                id="height"
                type="number"
                placeholder={unit === "metric" ? "e.g., 175" : "e.g., 69"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="weight">Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
              <Input
                id="weight"
                type="number"
                placeholder={unit === "metric" ? "e.g., 70" : "e.g., 154"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div>
              <Label>Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="light">Lightly Active (1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderately Active (3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                  <SelectItem value="veryActive">Very Active (hard exercise daily)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Weight Loss</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="gain">Weight Gain</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Fat Intake</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <p className="text-sm text-muted-foreground">Your Daily Fat Intake</p>
                <p className="text-4xl font-bold">
                  {results.fatGrams} <span className="text-lg font-normal">grams/day</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {results.fatCalories} calories from fat ({results.fatPercentage}% of total)
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Saturated Fat</p>
                    <p className="text-lg font-semibold">{results.saturatedFat}g</p>
                    <p className="text-xs text-muted-foreground">Max recommended</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Unsaturated Fat</p>
                    <p className="text-lg font-semibold">{results.unsaturatedFat}g</p>
                    <p className="text-xs text-muted-foreground">Healthy fats</p>
                  </div>
                </div>

                <p className="text-sm">
                  Recommended range: {results.range.min}g - {results.range.max}g per day
                </p>
                
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Your estimated daily calorie needs: {results.calories} calories
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Fat provides 9 calories per gram. Saturated fat should be limited to less than 10% of total calories.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
