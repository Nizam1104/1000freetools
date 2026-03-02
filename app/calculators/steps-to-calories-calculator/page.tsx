"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function StepsToCaloriesCalculator() {
  const [steps, setSteps] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("lbs");
  const [strideLength, setStrideLength] = useState<string>("");
  const [strideUnit, setStrideUnit] = useState<"cm" | "inches">("cm");
  const [calories, setCalories] = useState<number | null>(null);
  const [distance, setDistance] = useState<string>("");

  const calculate = () => {
    const stepsValue = parseFloat(steps);
    const weightValue = parseFloat(weight);
    const strideValue = parseFloat(strideLength);

    if (isNaN(stepsValue) || stepsValue <= 0) return;

    let caloriesBurned = 0;
    let distanceValue = 0;

    if (!isNaN(weightValue) && weightValue > 0) {
      // More accurate formula: Calories ≈ 0.04 × weight(lbs) × steps
      const weightInLbs = weightUnit === "kg" ? weightValue * 2.20462 : weightValue;
      caloriesBurned = 0.04 * weightInLbs * stepsValue;
    }

    if (!isNaN(strideValue) && strideValue > 0) {
      // Calculate distance
      const strideInMeters = strideUnit === "inches" ? strideValue * 0.0254 : strideValue / 100;
      distanceValue = (stepsValue * strideInMeters) / 1000; // Convert to km
      setDistance(distanceValue.toFixed(2));
    }

    setCalories(Math.round(caloriesBurned));
  };

  const reset = () => {
    setSteps("");
    setWeight("");
    setStrideLength("");
    setCalories(null);
    setDistance("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Steps to Calories Calculator – Convert Your Steps to Calories Burned</CardTitle>
          <CardDescription>
            Easily convert your daily step count into calories burned. Our step-to-calorie calculator gives you accurate results based on your weight and stride length.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="steps">Number of Steps</Label>
              <Input
                id="steps"
                type="number"
                placeholder="e.g., 10000"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="150"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <Label>Unit</Label>
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

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="strideLength">Stride Length</Label>
                <Input
                  id="strideLength"
                  type="number"
                  step="0.1"
                  placeholder="76"
                  value={strideLength}
                  onChange={(e) => setStrideLength(e.target.value)}
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={strideUnit} onValueChange={(v) => setStrideUnit(v as "cm" | "inches")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="inches">inches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {(calories !== null || distance) && (
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">Calories Burned</p>
                  <p className="text-4xl font-bold mt-1">{calories} <span className="text-lg font-normal">kcal</span></p>
                </div>
                {distance && (
                  <div className="p-4 border rounded-md">
                    <p className="text-sm text-muted-foreground">Distance Walked</p>
                    <p className="text-2xl font-bold mt-1">{distance} <span className="text-lg font-normal">km</span></p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
