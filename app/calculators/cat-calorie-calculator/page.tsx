"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CatProfile {
  weight: number;
  age: number;
  activityLevel: "sedentary" | "normal" | "active";
  neutered: boolean;
  proneToObesity: boolean;
}

interface CalorieResult {
  rer: number; // Resting Energy Requirements
  der: number; // Daily Energy Requirements
  adjustedCalories: number;
  lifeStage: string;
  feedingRecommendation: string;
  weightManagementNote: string;
}

export default function CatCalorieCalculatorPage() {
  const [weight, setWeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("normal");
  const [neutered, setNeutered] = useState<string>("yes");
  const [proneToObesity, setProneToObesity] = useState<string>("no");
  const [unit, setUnit] = useState<string>("lbs");
  const [result, setResult] = useState<CalorieResult | null>(null);

  const calculate = () => {
    const weightNum = parseFloat(weight);
    const ageNum = parseFloat(age);

    if (isNaN(weightNum) || isNaN(ageNum)) return;

    // Convert to kg if needed
    const weightKg = unit === "lbs" ? weightNum / 2.205 : weightNum;

    // Calculate RER (Resting Energy Requirements)
    // Formula: RER = 70 × (weight in kg)^0.75
    const rer = 70 * Math.pow(weightKg, 0.75);

    // Determine life stage
    let lifeStage = "";
    let derMultiplier = 1.0;

    if (ageNum < 0.33) { // 0-4 months
      lifeStage = "Kitten (0-4 months)";
      derMultiplier = 2.5;
    } else if (ageNum < 1) { // 4 months - 1 year
      lifeStage = "Kitten (4-12 months)";
      derMultiplier = 2.0;
    } else if (ageNum < 7) { // 1-7 years
      lifeStage = "Adult (1-7 years)";
      derMultiplier = 1.2;
    } else if (ageNum < 11) { // 7-11 years
      lifeStage = "Mature (7-11 years)";
      derMultiplier = 1.1;
    } else { // 11+ years
      lifeStage = "Senior (11+ years)";
      derMultiplier = 1.0;
    }

    // Adjust for activity level
    const activityMultipliers: Record<string, number> = {
      sedentary: 0.8,
      normal: 1.0,
      active: 1.2,
    };
    derMultiplier *= activityMultipliers[activityLevel] || 1.0;

    // Adjust for neutered status
    if (neutered === "yes") {
      derMultiplier *= 0.9; // Neutered cats need ~10% fewer calories
    }

    // Adjust for obesity prone
    if (proneToObesity === "yes") {
      derMultiplier *= 0.8; // Weight loss diet
    }

    // Calculate DER (Daily Energy Requirements)
    const der = rer * derMultiplier;

    // Generate feeding recommendation
    let feedingRecommendation = "";
    if (proneToObesity === "yes") {
      feedingRecommendation = "Weight management diet recommended. Consider portion control.";
    } else if (activityLevel === "active") {
      feedingRecommendation = "High-energy formula recommended for active lifestyle.";
    } else {
      feedingRecommendation = "Standard adult maintenance formula recommended.";
    }

    // Weight management note
    let weightManagementNote = "";
    const currentWeightStatus = weightKg > 5 ? "Monitor for overweight" : "Healthy weight range";
    weightManagementNote = `${currentWeightStatus}. Adjust calories by ±10% based on body condition score.`;

    setResult({
      rer: parseFloat(rer.toFixed(0)),
      der: parseFloat(der.toFixed(0)),
      adjustedCalories: parseFloat(der.toFixed(0)),
      lifeStage,
      feedingRecommendation,
      weightManagementNote,
    });
  };

  const reset = () => {
    setWeight("");
    setAge("");
    setActivityLevel("normal");
    setNeutered("yes");
    setProneToObesity("no");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Cat Calorie Calculator – Calculate Your Cat&apos;s Daily Calorie Requirements
          </h1>
          <p className="text-muted-foreground">
            Ensure proper nutrition for your feline companion with our Cat Calorie Calculator.
            Enter your cat&apos;s weight, age, and lifestyle to calculate exact daily caloric needs —
            ideal for preventing feline obesity and maintaining healthy weight.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lbs">lbs</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="age">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  step="0.1"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="activity">Activity Level</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger id="activity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (Indoor, low activity)</SelectItem>
                    <SelectItem value="normal">Normal (Moderate activity)</SelectItem>
                    <SelectItem value="active">Active (Outdoor, high activity)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="neutered">Neutered/Spayed</Label>
                <Select value={neutered} onValueChange={setNeutered}>
                  <SelectTrigger id="neutered">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="obesity">Prone to Obesity</Label>
                <Select value={proneToObesity} onValueChange={setProneToObesity}>
                  <SelectTrigger id="obesity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes (Weight management needed)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Daily Calories</p>
                    <p className="text-4xl font-bold text-primary">{result.adjustedCalories} kcal</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">RER (Resting)</p>
                      <p className="text-lg font-semibold">{result.rer} kcal</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">DER (Daily)</p>
                      <p className="text-lg font-semibold">{result.der} kcal</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Life Stage:</span>
                      <span className="font-medium">{result.lifeStage}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Feeding:</strong> {result.feedingRecommendation}
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Weight Note:</strong> {result.weightManagementNote}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your cat&apos;s details and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Cat Calorie Needs
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Cats have different calorie needs based on their life stage, activity level,
                  and health status. The National Research Council provides these guidelines:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>RER (Resting Energy Requirements):</strong> Calories needed at rest
                  </li>
                  <li>
                    <strong>DER (Daily Energy Requirements):</strong> RER adjusted for lifestyle
                  </li>
                  <li>
                    <strong>Kittens:</strong> Need 2-2.5× adult calories for growth
                  </li>
                  <li>
                    <strong>Neutered cats:</strong> Need ~10% fewer calories than intact cats
                  </li>
                  <li>
                    <strong>Senior cats:</strong> May need fewer calories due to reduced activity
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Monitor your cat&apos;s body condition score and adjust
                  calories by ±10% to maintain ideal weight. Consult your vet for personalized advice.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
