"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function KetogenicMacroCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [activity, setActivity] = useState<string>("sedentary");
  const [goal, setGoal] = useState<string>("maintain");
  const [carbsLimit, setCarbsLimit] = useState<string>("20");
  const [proteinRatio, setProteinRatio] = useState<string>("25");
  const [results, setResults] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  const calculate = () => {
    const ageVal = parseFloat(age);
    const weightVal = parseFloat(weight);
    const heightVal = parseFloat(height);
    const carbsLimitVal = parseFloat(carbsLimit);
    const proteinRatioVal = parseFloat(proteinRatio);

    if (isNaN(ageVal) || isNaN(weightVal) || isNaN(heightVal) || isNaN(carbsLimitVal) || isNaN(proteinRatioVal)) return;

    // Mifflin-St Jeor BMR
    let bmr = 10 * weightVal + 6.25 * heightVal - 5 * ageVal;
    bmr += gender === "male" ? 5 : -161;

    // Activity multiplier
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };
    const tdee = bmr * (activityMultipliers[activity] || 1.2);

    // Goal adjustment
    const goalAdjustments: Record<string, number> = {
      lose: -500,
      maintain: 0,
      gain: 500,
    };
    const calories = Math.round(tdee + (goalAdjustments[goal] || 0));

    // Keto macros
    const carbs = carbsLimitVal; // grams
    const proteinGrams = Math.round((weightVal * proteinRatioVal) / 100); // g per kg bodyweight
    const proteinCalories = proteinGrams * 4;
    const carbCalories = carbs * 4;
    const fatCalories = calories - proteinCalories - carbCalories;
    const fat = Math.round(fatCalories / 9);

    setResults({
      calories,
      protein: proteinGrams,
      carbs: Math.round(carbs),
      fat,
    });
  };

  const reset = () => {
    setAge("");
    setWeight("");
    setHeight("");
    setActivity("sedentary");
    setGoal("maintain");
    setCarbsLimit("20");
    setProteinRatio("25");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Keto Macro Calculator – Perfect Macros for a Ketogenic Diet</CardTitle>
          <CardDescription>
            Start your keto journey the right way. Our ketogenic macro calculator gives you personalized fat, protein, and carb targets to keep your body in ketosis and burning fat.
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

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Years"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="cm"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Activity Level</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                  <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                  <SelectItem value="veryActive">Very Active (physical job)</SelectItem>
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
                  <SelectItem value="maintain">Maintain</SelectItem>
                  <SelectItem value="gain">Weight Gain</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="carbs">Daily Carbs Limit (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  value={carbsLimit}
                  onChange={(e) => setCarbsLimit(e.target.value)}
                />
                <p className="text-sm text-muted-foreground mt-1">Standard keto: 20-50g</p>
              </div>
              <div>
                <Label htmlFor="protein">Protein (g per kg bodyweight)</Label>
                <Input
                  id="protein"
                  type="number"
                  value={proteinRatio}
                  onChange={(e) => setProteinRatio(e.target.value)}
                />
                <p className="text-sm text-muted-foreground mt-1">Typical: 20-30g/kg</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Keto Macros</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Calories</p>
                  <p className="text-3xl font-bold">{results.calories}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Protein</p>
                    <p className="text-2xl font-bold">{results.protein}g</p>
                    <p className="text-xs text-muted-foreground">{Math.round((results.protein * 4 / results.calories) * 100)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Carbs</p>
                    <p className="text-2xl font-bold">{results.carbs}g</p>
                    <p className="text-xs text-muted-foreground">{Math.round((results.carbs * 4 / results.calories) * 100)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fat</p>
                    <p className="text-2xl font-bold">{results.fat}g</p>
                    <p className="text-xs text-muted-foreground">{Math.round((results.fat * 9 / results.calories) * 100)}%</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
