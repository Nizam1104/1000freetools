"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function TDEECalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("sedentary");
  const [results, setResults] = useState<{
    bmr: number;
    tdee: number;
    weightLoss: number;
    weightGain: number;
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

    const multiplier = activityMultipliers[activityLevel] || 1.2;
    const tdee = Math.round(bmr * multiplier);

    // Weight loss (15% deficit) and weight gain (15% surplus)
    const weightLoss = Math.round(tdee * 0.85);
    const weightGain = Math.round(tdee * 1.15);

    setResults({
      bmr: Math.round(bmr),
      tdee,
      weightLoss,
      weightGain,
    });
  };

  const reset = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setActivityLevel("sedentary");
    setResults(null);
  };

  const getActivityDescription = () => {
    switch (activityLevel) {
      case "sedentary":
        return "Desk job, little or no exercise";
      case "light":
        return "Light exercise 1-3 days per week";
      case "moderate":
        return "Moderate exercise 3-5 days per week";
      case "active":
        return "Hard exercise 6-7 days per week";
      case "veryActive":
        return "Very hard exercise daily or physical job";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>TDEE Calculator – Calculate Your Total Daily Energy Expenditure</CardTitle>
          <CardDescription>
            Our TDEE calculator gives you a complete picture of your daily calorie burn. Factor in your activity level for an accurate estimate to guide weight loss, gain, or maintenance.
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
              {activityLevel && (
                <p className="text-xs text-muted-foreground mt-1">{getActivityDescription()}</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate TDEE</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Your TDEE (Total Daily Energy Expenditure)</p>
                  <p className="text-4xl font-bold mt-1">
                    {results.tdee} <span className="text-lg font-normal">calories/day</span>
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="text-center p-3 bg-background rounded-md">
                    <p className="text-xs text-muted-foreground">BMR</p>
                    <p className="text-lg font-bold">{results.bmr}</p>
                    <p className="text-xs text-muted-foreground">calories</p>
                  </div>
                  <div className="text-center p-3 bg-background rounded-md">
                    <p className="text-xs text-muted-foreground">Weight Loss</p>
                    <p className="text-lg font-bold text-green-600">{results.weightLoss}</p>
                    <p className="text-xs text-muted-foreground">calories/day</p>
                  </div>
                  <div className="text-center p-3 bg-background rounded-md">
                    <p className="text-xs text-muted-foreground">Weight Gain</p>
                    <p className="text-lg font-bold text-orange-600">{results.weightGain}</p>
                    <p className="text-xs text-muted-foreground">calories/day</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    To maintain your weight, consume approximately {results.tdee} calories per day.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    For gradual weight loss (~0.5 kg/week), aim for {results.weightLoss} calories/day.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    For gradual weight gain (~0.5 kg/week), aim for {results.weightGain} calories/day.
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
