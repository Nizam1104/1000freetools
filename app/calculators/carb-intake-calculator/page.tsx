"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function CarbIntakeCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [dietType, setDietType] = useState<string>("moderate");
  const [results, setResults] = useState<{
    calories: number;
    carbsGrams: number;
    carbsCalories: number;
    carbsPercentage: number;
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

    const calories = Math.round(bmr * (activityMultipliers[activityLevel] || 1.55));

    // Carb percentages based on diet type
    const carbPercentages: Record<string, { min: number; max: number; default: number }> = {
      lowCarb: { min: 10, max: 26, default: 20 },
      moderate: { min: 45, max: 65, default: 50 },
      high: { min: 60, max: 70, default: 65 },
    };

    const carbConfig = carbPercentages[dietType] || carbPercentages.moderate;
    const carbsPercentage = carbConfig.default;
    const carbsCalories = Math.round(calories * (carbsPercentage / 100));
    const carbsGrams = Math.round(carbsCalories / 4); // 1g carbs = 4 calories

    setResults({
      calories,
      carbsGrams,
      carbsCalories,
      carbsPercentage,
      range: {
        min: Math.round((calories * (carbConfig.min / 100)) / 4),
        max: Math.round((calories * (carbConfig.max / 100)) / 4),
      },
    });
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("male");
    setActivityLevel("moderate");
    setDietType("moderate");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Carb Intake Calculator – Daily Carbohydrate Needs Calculator</CardTitle>
          <CardDescription>
            Find out how many grams of carbohydrates you need each day. Our carb intake calculator tailors your carb target to your calorie goals, lifestyle, and dietary preferences.
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
              <Label>Diet Type</Label>
              <Select value={dietType} onValueChange={setDietType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lowCarb">Low Carb (10-26% of calories)</SelectItem>
                  <SelectItem value="moderate">Moderate Carb (45-65% of calories)</SelectItem>
                  <SelectItem value="high">High Carb (60-70% of calories)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Carb Intake</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <p className="text-sm text-muted-foreground">Your Daily Carbohydrate Needs</p>
                <p className="text-4xl font-bold">
                  {results.carbsGrams} <span className="text-lg font-normal">grams/day</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {results.carbsCalories} calories from carbohydrates ({results.carbsPercentage}% of total)
                </p>
                <p className="text-sm">
                  Recommended range: {results.range.min}g - {results.range.max}g per day
                </p>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Your estimated daily calorie needs: {results.calories} calories
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Carbohydrates provide 4 calories per gram.
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
