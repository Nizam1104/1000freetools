"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function WaterRequirementCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState<string>("");
  const [exerciseMinutes, setExerciseMinutes] = useState<string>("0");
  const [climate, setClimate] = useState<string>("normal");
  const [isPregnant, setIsPregnant] = useState<boolean>(false);
  const [isBreastfeeding, setIsBreastfeeding] = useState<boolean>(false);
  const [results, setResults] = useState<{
    baseWater: number;
    exerciseWater: number;
    climateAdjustment: number;
    specialAdjustment: number;
    totalWater: number;
    bottles: number;
  } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const exercise = parseFloat(exerciseMinutes) || 0;

    if (isNaN(w) || w <= 0) return;

    let weightKg: number;
    if (unit === "metric") {
      weightKg = w;
    } else {
      weightKg = w * 0.453592;
    }

    // Base water requirement: 35ml per kg body weight
    const baseWater = weightKg * 35;

    // Exercise adjustment: +500ml for every 30 minutes of exercise
    const exerciseWater = (exercise / 30) * 500;

    // Climate adjustment
    let climateAdjustment = 0;
    switch (climate) {
      case "hot":
        climateAdjustment = 500; // +500ml for hot weather
        break;
      case "cold":
        climateAdjustment = 250; // +250ml for cold weather (dry air)
        break;
      case "highAltitude":
        climateAdjustment = 500; // +500ml for high altitude
        break;
      default:
        climateAdjustment = 0;
    }

    // Special conditions
    let specialAdjustment = 0;
    if (isPregnant) {
      specialAdjustment += 300; // +300ml during pregnancy
    }
    if (isBreastfeeding) {
      specialAdjustment += 700; // +700ml during breastfeeding
    }

    const totalWater = baseWater + exerciseWater + climateAdjustment + specialAdjustment;

    // Number of 8oz (240ml) bottles
    const bottles = totalWater / 240;

    setResults({
      baseWater: Math.round(baseWater),
      exerciseWater: Math.round(exerciseWater),
      climateAdjustment: Math.round(climateAdjustment),
      specialAdjustment: Math.round(specialAdjustment),
      totalWater: Math.round(totalWater),
      bottles: Math.round(bottles * 10) / 10,
    });
  };

  const reset = () => {
    setWeight("");
    setExerciseMinutes("0");
    setClimate("normal");
    setIsPregnant(false);
    setIsBreastfeeding(false);
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Water Intake Calculator – How Much Water Should You Drink Per Day?</CardTitle>
          <CardDescription>
            Staying hydrated is vital. Use our water requirement calculator to find your personalized daily water intake goal based on your body weight, exercise habits, and environment.
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
              <Label htmlFor="exercise">Exercise Duration (minutes per day)</Label>
              <Input
                id="exercise"
                type="number"
                placeholder="e.g., 30"
                value={exerciseMinutes}
                onChange={(e) => setExerciseMinutes(e.target.value)}
              />
            </div>

            <div>
              <Label>Climate/Environment</Label>
              <Select value={climate} onValueChange={setClimate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal/Temperate</SelectItem>
                  <SelectItem value="hot">Hot/Humid Climate</SelectItem>
                  <SelectItem value="cold">Cold/Dry Climate</SelectItem>
                  <SelectItem value="highAltitude">High Altitude</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Special Conditions</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pregnant"
                  checked={isPregnant}
                  onCheckedChange={(checked) => setIsPregnant(checked as boolean)}
                />
                <Label htmlFor="pregnant" className="font-normal cursor-pointer">
                  Pregnant (+300ml/day)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="breastfeeding"
                  checked={isBreastfeeding}
                  onCheckedChange={(checked) => setIsBreastfeeding(checked as boolean)}
                />
                <Label htmlFor="breastfeeding" className="font-normal cursor-pointer">
                  Breastfeeding (+700ml/day)
                </Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Water Needs</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <p className="text-sm text-muted-foreground">Your Daily Water Intake Goal</p>
                <p className="text-4xl font-bold">
                  {results.totalWater} <span className="text-lg font-normal">ml/day</span>
                </p>
                <p className="text-sm">
                  Approximately {results.bottles} glasses (8oz each)
                </p>
                
                <div className="pt-3 border-t border-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base requirement (35ml/kg):</span>
                    <span className="font-medium">{results.baseWater} ml</span>
                  </div>
                  {results.exerciseWater > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Exercise adjustment:</span>
                      <span className="font-medium">+{results.exerciseWater} ml</span>
                    </div>
                  )}
                  {results.climateAdjustment > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Climate adjustment:</span>
                      <span className="font-medium">+{results.climateAdjustment} ml</span>
                    </div>
                  )}
                  {results.specialAdjustment > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Special conditions:</span>
                      <span className="font-medium">+{results.specialAdjustment} ml</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground">
                    Tip: Drink water consistently throughout the day. Increase intake during exercise, hot weather, or illness.
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
