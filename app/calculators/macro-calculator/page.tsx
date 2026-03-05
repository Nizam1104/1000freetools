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

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Macro Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your personal details</p>
                  <p>Input your gender, age, height, and weight. These factors determine your basal metabolic rate (BMR) — the calories your body burns at rest.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Select activity level and goal</p>
                  <p>Choose your typical activity level from sedentary to very active. Then select your goal: cut (lose fat), maintain, or bulk (build muscle).</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Get your macro targets</p>
                  <p>The calculator shows your daily calorie target and the grams of protein, carbs, and fat to hit each day based on your goal.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Macro Split Recommendations by Goal
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Goal</th>
                    <th className="text-left py-3 px-2 font-semibold">Protein</th>
                    <th className="text-left py-3 px-2 font-semibold">Carbs</th>
                    <th className="text-left py-3 px-2 font-semibold">Fat</th>
                    <th className="text-left py-3 px-2 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Cut (Fat Loss)</td>
                    <td className="py-3 px-2">30%</td>
                    <td className="py-3 px-2">40%</td>
                    <td className="py-3 px-2">30%</td>
                    <td className="py-3 px-2">Preserving muscle while in a calorie deficit</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Maintain</td>
                    <td className="py-3 px-2">25%</td>
                    <td className="py-3 px-2">50%</td>
                    <td className="py-3 px-2">25%</td>
                    <td className="py-3 px-2">Body recomposition and stable weight</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Bulk (Muscle Gain)</td>
                    <td className="py-3 px-2">30%</td>
                    <td className="py-3 px-2">45%</td>
                    <td className="py-3 px-2">25%</td>
                    <td className="py-3 px-2">Supporting muscle growth with surplus calories</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Keto</td>
                    <td className="py-3 px-2">25%</td>
                    <td className="py-3 px-2">5%</td>
                    <td className="py-3 px-2">70%</td>
                    <td className="py-3 px-2">Ketogenic diet for fat adaptation</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: These are general guidelines. Individual needs vary based on training style, body type, and personal preference. Adjust based on your progress and how you feel.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Macros
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Macronutrients are the three main types of nutrients your body needs in large amounts: protein, carbohydrates, and fat. Each provides energy (calories) and serves specific functions. Protein builds and repairs tissue at 4 calories per gram. Carbs fuel your brain and muscles at 4 calories per gram. Fat supports hormone production and nutrient absorption at 9 calories per gram.
              </p>
              <p>
                The Mifflin-St Jeor equation used by this calculator estimates your BMR based on research showing it predicts calorie needs within 10% of measured values for most people. Your activity level multiplies this baseline to estimate total daily energy expenditure (TDEE). From there, we adjust calories up or down based on your goal.
              </p>
              <p>
                Tracking macros gives more flexibility than just counting calories. Two 2,000-calorie diets can have very different effects depending on their macro composition. A high-protein diet preserves muscle during weight loss. Adequate carbs fuel intense training. Healthy fats support hormone production. Hitting macro targets often produces better body composition changes than calorie counting alone.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Hitting Your Macros
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Prioritize Protein at Each Meal</p>
                  <p>Aim for 25-40g protein per meal. Good sources include chicken breast (31g per 100g), Greek yogurt (10g per 100g), eggs (6g each), and whey protein (20-25g per scoop). Protein keeps you full and preserves muscle during cuts.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Time Carbs Around Training</p>
                  <p>Eat more carbs before and after workouts when your body uses them most efficiently. Save lower-carb meals for rest days or evenings. Rice, oats, potatoes, and fruit are versatile carb sources that fit most macros.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Don't Fear Dietary Fat</p>
                  <p>Fat doesn't make you fat — excess calories do. Include healthy fats from nuts, olive oil, avocado, and fatty fish. Fat slows digestion and keeps you satisfied. Just measure carefully since fat is calorie-dense at 9 cal/g.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use a Tracking App</p>
                  <p>Apps like MyFitnessPal, Cronometer, or MacroFactor make tracking easy. Log everything you eat for at least 2 weeks to learn portion sizes and macro content. Most people underestimate intake by 30-50% without tracking.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">How much protein do I really need?</h4>
                <p>
                  For muscle building or fat loss, aim for 1.6-2.2g per kg of body weight (0.7-1g per lb). A 180 lb person would target 126-180g daily. Sedentary individuals need less (0.8g/kg), but higher protein helps preserve muscle during weight loss and keeps you fuller longer.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Are carbs necessary for fat loss?</h4>
                <p>
                  No macronutrient is strictly necessary except protein (for essential amino acids). You can lose fat on low-carb or high-carb diets as long as you're in a calorie deficit. Choose based on preference and training needs. Athletes typically perform better with moderate to high carbs.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How accurate are macro calculators?</h4>
                <p>
                  Calculators give estimates within 10-20% of actual needs for most people. Use the result as a starting point, then adjust based on progress over 2-4 weeks. If weight isn't moving as expected, adjust calories by 100-200 per day and reassess.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Should I track net carbs or total carbs?</h4>
                <p>
                  For most goals, track total carbs. Net carbs (total minus fiber) matter primarily for ketogenic diets where fiber doesn't impact blood sugar or ketosis. If you're not keto, total carbs give a simpler, more consistent target.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What if I go over my macros some days?</h4>
                <p>
                  One day won't ruin progress. Look at your weekly average, not daily perfection. If you consistently exceed macros, reassess your targets — they might be too restrictive. Sustainable nutrition allows flexibility. Aim for 80% adherence and don't stress over occasional deviations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Related Tools
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="/calculators/tdee-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">TDEE Calculator</span>
                <p className="text-muted-foreground">Calculate your total daily energy expenditure to determine calorie needs</p>
              </a>
              <a
                href="/calculators/bmi-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">BMI Calculator</span>
                <p className="text-muted-foreground">Calculate your body mass index and assess weight category</p>
              </a>
              <a
                href="/calculators/body-fat-percentage-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Body Fat Percentage Calculator</span>
                <p className="text-muted-foreground">Estimate your body fat percentage using US Navy method</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
