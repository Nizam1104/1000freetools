"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function MacroCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [goal, setGoal] = useState<string>("maintain");
  const [results, setResults] = useState<{
    calories: number;
    protein: { grams: number; calories: number; percentage: number };
    carbs: { grams: number; calories: number; percentage: number };
    fat: { grams: number; calories: number; percentage: number };
  } | null>(null);

  const calculate = () => {
    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(a) || isNaN(h) || isNaN(w) || a <= 0 || h <= 0 || w <= 0) return;

    let weightKg: number;
    let heightCm: number;

    if (unit === "metric") {
      weightKg = w;
      heightCm = h;
    } else {
      weightKg = w * 0.453592;
      heightCm = h * 2.54;
    }

    // Calculate BMR using Mifflin-St Jeor equation
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
    if (goal === "cut") {
      calories *= 0.85; // 15% deficit
    } else if (goal === "bulk") {
      calories *= 1.15; // 15% surplus
    }

    calories = Math.round(calories);

    // Macro splits based on goal
    // Cut: 40% carbs, 30% protein, 30% fat
    // Maintain: 50% carbs, 25% protein, 25% fat
    // Bulk: 45% carbs, 30% protein, 25% fat
    const macroSplits: Record<string, { carbs: number; protein: number; fat: number }> = {
      cut: { carbs: 40, protein: 30, fat: 30 },
      maintain: { carbs: 50, protein: 25, fat: 25 },
      bulk: { carbs: 45, protein: 30, fat: 25 },
    };

    const split = macroSplits[goal] || macroSplits.maintain;

    // Calculate macros (protein: 4 cal/g, carbs: 4 cal/g, fat: 9 cal/g)
    const proteinCalories = Math.round(calories * (split.protein / 100));
    const carbsCalories = Math.round(calories * (split.carbs / 100));
    const fatCalories = Math.round(calories * (split.fat / 100));

    setResults({
      calories,
      protein: {
        grams: Math.round(proteinCalories / 4),
        calories: proteinCalories,
        percentage: split.protein,
      },
      carbs: {
        grams: Math.round(carbsCalories / 4),
        calories: carbsCalories,
        percentage: split.carbs,
      },
      fat: {
        grams: Math.round(fatCalories / 9),
        calories: fatCalories,
        percentage: split.fat,
      },
    });
  };

  const reset = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setActivityLevel("moderate");
    setGoal("maintain");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Macro Calculator – Calculate Your Daily Macros for Any Goal</CardTitle>
          <CardDescription>
            Dial in your nutrition with our macro calculator. Get personalized daily protein, carb, and fat targets tailored to your body, calories, and whether you want to cut, bulk, or maintain.
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
                  <SelectItem value="cut">Cut (Lose Fat)</SelectItem>
                  <SelectItem value="maintain">Maintain (Body Recomposition)</SelectItem>
                  <SelectItem value="bulk">Bulk (Build Muscle)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Macros</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Your Daily Calorie Target</p>
                  <p className="text-4xl font-bold mt-1">
                    {results.calories} <span className="text-lg font-normal">calories/day</span>
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="text-center p-3 bg-background rounded-md">
                    <p className="text-xs text-muted-foreground">Protein</p>
                    <p className="text-2xl font-bold text-blue-600">{results.protein.grams}g</p>
                    <p className="text-xs text-muted-foreground">{results.protein.calories} cal ({results.protein.percentage}%)</p>
                  </div>
                  <div className="text-center p-3 bg-background rounded-md">
                    <p className="text-xs text-muted-foreground">Carbs</p>
                    <p className="text-2xl font-bold text-green-600">{results.carbs.grams}g</p>
                    <p className="text-xs text-muted-foreground">{results.carbs.calories} cal ({results.carbs.percentage}%)</p>
                  </div>
                  <div className="text-center p-3 bg-background rounded-md">
                    <p className="text-xs text-muted-foreground">Fat</p>
                    <p className="text-2xl font-bold text-orange-600">{results.fat.grams}g</p>
                    <p className="text-xs text-muted-foreground">{results.fat.calories} cal ({results.fat.percentage}%)</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Protein (4 cal/g):</span>
                      <span className="font-medium">{results.protein.grams}g = {results.protein.calories} calories</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Carbohydrates (4 cal/g):</span>
                      <span className="font-medium">{results.carbs.grams}g = {results.carbs.calories} calories</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fat (9 cal/g):</span>
                      <span className="font-medium">{results.fat.grams}g = {results.fat.calories} calories</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground">
                    Tip: Track your macros consistently and adjust based on your progress. 
                    Drink plenty of water and prioritize whole foods for optimal results.
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
