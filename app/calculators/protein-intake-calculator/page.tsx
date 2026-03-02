"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ProteinIntakeCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("sedentary");
  const [protein, setProtein] = useState<number | null>(null);
  const [proteinRange, setProteinRange] = useState<{ min: number; max: number } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return;

    let weightKg: number;
    if (unit === "metric") {
      weightKg = w;
    } else {
      weightKg = w * 0.453592;
    }

    // Protein multipliers based on activity level and goals (g per kg)
    const proteinMultipliers: Record<string, { min: number; max: number }> = {
      sedentary: { min: 0.8, max: 0.8 },
      moderate: { min: 1.0, max: 1.4 },
      active: { min: 1.4, max: 1.8 },
      muscleBuilding: { min: 1.8, max: 2.2 },
      weightLoss: { min: 1.6, max: 2.4 },
    };

    const multiplier = proteinMultipliers[activityLevel] || { min: 0.8, max: 0.8 };
    const proteinMin = weightKg * multiplier.min;
    const proteinMax = weightKg * multiplier.max;

    setProtein(Math.round((proteinMin + proteinMax) / 2));
    setProteinRange({
      min: Math.round(proteinMin),
      max: Math.round(proteinMax),
    });
  };

  const reset = () => {
    setWeight("");
    setActivityLevel("sedentary");
    setProtein(null);
    setProteinRange(null);
  };

  const getProteinDescription = () => {
    switch (activityLevel) {
      case "sedentary":
        return "For general health and basic bodily functions";
      case "moderate":
        return "For light exercise and active lifestyle";
      case "active":
        return "For regular intense exercise and athletic performance";
      case "muscleBuilding":
        return "For muscle growth and strength training";
      case "weightLoss":
        return "For preserving muscle mass during weight loss";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Protein Intake Calculator – How Much Protein Do You Need Per Day?</CardTitle>
          <CardDescription>
            Use our protein intake calculator to determine your optimal daily protein consumption. Whether you're building muscle, losing weight, or maintaining fitness, get personalized recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Unit System</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as "metric" | "imperial")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (kg)</SelectItem>
                  <SelectItem value="imperial">Imperial (lbs)</SelectItem>
                </SelectContent>
              </Select>
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
              <Label>Activity Level & Goal</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="moderate">Moderately Active (light exercise 1-3 days/week)</SelectItem>
                  <SelectItem value="active">Active (moderate exercise 3-5 days/week)</SelectItem>
                  <SelectItem value="muscleBuilding">Muscle Building (intense strength training)</SelectItem>
                  <SelectItem value="weightLoss">Weight Loss (calorie deficit)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Protein Needs</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {protein !== null && proteinRange && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <p className="text-sm text-muted-foreground">Your Daily Protein Intake</p>
                <p className="text-4xl font-bold">
                  {protein} <span className="text-lg font-normal">grams/day</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Recommended range: {proteinRange.min}g - {proteinRange.max}g per day
                </p>
                <p className="text-sm">
                  <span className="font-medium">Note:</span> {getProteinDescription()}
                </p>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Protein provides 4 calories per gram. This equals approximately {Math.round(protein * 4)} calories from protein daily.
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
