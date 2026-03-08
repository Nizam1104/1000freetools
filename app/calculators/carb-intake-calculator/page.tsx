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

      {/* SEO Content Section */}
      <div className="mt-12 space-y-12">
        {/* How It Works */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Your Daily Carb Intake</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Your Details</h3>
                <p className="text-muted-foreground text-sm">Input your age, gender, height, weight, and activity level for personalized calculations.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Choose Your Diet Type</h3>
                <p className="text-muted-foreground text-sm">Select low carb, moderate carb, or high carb based on your health goals and preferences.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get Your Carb Target</h3>
                <p className="text-muted-foreground text-sm">See your recommended daily carb intake in grams along with your total calorie needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Benefits */}
        <section className="bg-card rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-6">Benefits of Tracking Carbohydrate Intake</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">⚖️ Balanced Nutrition</h3>
              <p className="text-muted-foreground text-sm">Ensure you're getting the right amount of carbs for your activity level and health goals, whether losing weight or building muscle.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🏃 Performance Optimization</h3>
              <p className="text-muted-foreground text-sm">Athletes and active individuals can optimize carb intake for better energy and recovery during training.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🩸 Blood Sugar Management</h3>
              <p className="text-muted-foreground text-sm">People with diabetes or insulin resistance can use carb tracking to better manage blood glucose levels.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🎯 Flexible Diet Approaches</h3>
              <p className="text-muted-foreground text-sm">Supports various diet styles from keto (low carb) to endurance athlete (high carb) eating patterns.</p>
            </div>
          </div>
        </section>

        {/* Reference Table */}
        <section className="bg-card rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-6">Carbohydrate Intake Guidelines by Diet Type</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Diet Type</th>
                  <th className="text-left py-3 px-4">% of Calories</th>
                  <th className="text-left py-3 px-4">Grams/Day (2000 cal)</th>
                  <th className="text-left py-3 px-4">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Ketogenic</td>
                  <td className="py-3 px-4">5-10%</td>
                  <td className="py-3 px-4">25-50g</td>
                  <td className="py-3 px-4">Weight loss, metabolic health</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Low Carb</td>
                  <td className="py-3 px-4">10-26%</td>
                  <td className="py-3 px-4">50-130g</td>
                  <td className="py-3 px-4">Moderate weight loss</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Moderate Carb</td>
                  <td className="py-3 px-4">45-65%</td>
                  <td className="py-3 px-4">225-325g</td>
                  <td className="py-3 px-4">General health, maintenance</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">High Carb</td>
                  <td className="py-3 px-4">60-70%</td>
                  <td className="py-3 px-4">300-350g+</td>
                  <td className="py-3 px-4">Endurance athletes, bulking</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Carbohydrate Intake FAQs</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">How many carbs should I eat per day?</h3>
              <p className="text-muted-foreground text-sm">The Dietary Guidelines recommend 45-65% of calories from carbs. For a 2000-calorie diet, that's 225-325 grams. Low-carb diets range from 20-130 grams daily.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">What are good sources of carbohydrates?</h3>
              <p className="text-muted-foreground text-sm">Choose complex carbs: whole grains, fruits, vegetables, legumes, and dairy. Limit refined carbs like white bread, sugary drinks, and processed snacks.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Is low-carb better for weight loss?</h3>
              <p className="text-muted-foreground text-sm">Low-carb diets can help with initial weight loss and appetite control. However, total calorie deficit matters most for long-term weight management.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">How do carbs affect blood sugar?</h3>
              <p className="text-muted-foreground text-sm">Carbohydrates break down into glucose, raising blood sugar. Complex carbs with fiber cause slower, smaller increases compared to refined sugars.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Can I build muscle on a low-carb diet?</h3>
              <p className="text-muted-foreground text-sm">Yes, but it may be more challenging. Carbs fuel intense training and aid recovery. Consider timing carbs around workouts for best results.</p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
      </div>
    </div>
  );
}
