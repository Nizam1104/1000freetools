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

      {/* How It Works Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Your Daily Fat Intake</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Your Details</h3>
              <p className="text-sm text-muted-foreground">Input your age, gender, height, weight, and activity level. We use the Mifflin-St Jeor equation to calculate your basal metabolic rate (BMR).</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Set Your Goal</h3>
              <p className="text-sm text-muted-foreground">Choose whether you want to lose weight, maintain, or gain. This adjusts your total daily calorie needs accordingly.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Your Fat Targets</h3>
              <p className="text-sm text-muted-foreground">Receive personalized daily fat intake recommendations, including saturated and unsaturated fat breakdowns.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Why Use This Fat Intake Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Science-Based Calculations</h3>
            <p className="text-sm text-muted-foreground">Uses the Mifflin-St Jeor equation, considered the most accurate BMR formula by the Academy of Nutrition and Dietetics.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Goal-Specific Recommendations</h3>
            <p className="text-sm text-muted-foreground">Fat percentages adjust based on your goal - 25% for weight loss, 30% for maintenance, and 25% for muscle gain.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Saturated Fat Guidelines</h3>
            <p className="text-sm text-muted-foreground">Calculates maximum saturated fat based on AHA recommendations (less than 10% of total calories).</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Flexible Units</h3>
            <p className="text-sm text-muted-foreground">Supports both metric (kg, cm) and imperial (lbs, inches) measurements for global accessibility.</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
          <h3 className="font-semibold mb-3">Recommended Fat Intake by Goal</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Goal</th>
                <th className="text-left py-2">Fat % of Calories</th>
                <th className="text-left py-2">Saturated Fat Max</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Weight Loss</td>
                <td className="py-2">20-30%</td>
                <td className="py-2">&lt;10% of calories</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Maintenance</td>
                <td className="py-2">25-35%</td>
                <td className="py-2">&lt;10% of calories</td>
              </tr>
              <tr>
                <td className="py-2">Muscle Gain</td>
                <td className="py-2">20-30%</td>
                <td className="py-2">&lt;10% of calories</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">How much fat should I eat per day to lose weight?</h3>
            <p className="text-sm text-muted-foreground">For weight loss, aim for 20-30% of your daily calories from fat. On a 1,500 calorie diet, that&apos;s about 33-50 grams of fat per day. The key is creating a calorie deficit while getting enough essential fatty acids.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Is 70 grams of fat a day too much?</h3>
            <p className="text-sm text-muted-foreground">It depends on your total calorie needs. For someone eating 2,000 calories, 70g represents 31.5% of calories - within the acceptable range. For a 1,200 calorie diet, 70g would be 52.5% - likely too high. Use this calculator to find your personalized target.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What&apos;s the difference between saturated and unsaturated fat?</h3>
            <p className="text-sm text-muted-foreground">Saturated fats (found in animal products, coconut oil) should be limited to less than 10% of calories. Unsaturated fats (olive oil, nuts, fish) are heart-healthy and should make up most of your fat intake. This calculator breaks down both types for you.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I eat too little fat?</h3>
            <p className="text-sm text-muted-foreground">Yes. Going below 15-20% of calories from fat can lead to vitamin deficiencies (A, D, E, K are fat-soluble), hormone imbalances, and dry skin. Most adults need at least 0.5g of fat per pound of body weight daily.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How accurate is the Mifflin-St Jeor equation?</h3>
            <p className="text-sm text-muted-foreground">Studies show the Mifflin-St Jeor equation predicts resting metabolic rate within 10% of measured values for most people. It&apos;s more accurate than the older Harris-Benedict formula, especially for obese individuals.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Related Nutrition Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/calculators/bmr-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
            <h3 className="font-semibold mb-1">BMR Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate your basal metabolic rate to understand your baseline calorie needs.</p>
          </a>
          <a href="/calculators/tdee-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
            <h3 className="font-semibold mb-1">TDEE Calculator</h3>
            <p className="text-sm text-muted-foreground">Find your total daily energy expenditure based on activity level.</p>
          </a>
          <a href="/calculators/macro-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
            <h3 className="font-semibold mb-1">Macro Calculator</h3>
            <p className="text-sm text-muted-foreground">Get complete macronutrient breakdowns including protein and carbs.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
