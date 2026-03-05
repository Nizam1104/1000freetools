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

      <div className="mt-8 space-y-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Protein Intake Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Select your unit system</p>
                  <p>Choose metric (kilograms) or imperial (pounds) for your weight measurement. The calculator handles the conversion automatically.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your weight and activity level</p>
                  <p>Input your current body weight and select the activity level that best matches your lifestyle and fitness goals.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Get your personalized recommendation</p>
                  <p>See your optimal daily protein intake range based on scientific research for your specific goals and activity level.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Protein Intake Recommendations by Goal
            </h3>
            <div className="space-y-4 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Sedentary Adults: 0.8g/kg</p>
                <p className="text-muted-foreground">Minimum for basic bodily functions and preventing deficiency — not optimal for health or body composition</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Active Individuals: 1.0-1.4g/kg</p>
                <p className="text-muted-foreground">Supports regular exercise, maintains muscle mass, and aids recovery from moderate training</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Muscle Building: 1.8-2.2g/kg</p>
                <p className="text-muted-foreground">Maximizes muscle protein synthesis for strength training and hypertrophy goals</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Weight Loss: 1.6-2.4g/kg</p>
                <p className="text-muted-foreground">Higher intake preserves muscle during calorie deficit and increases satiety for better adherence</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              High-Protein Food Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Food Source</th>
                    <th className="text-left py-3 px-2 font-semibold">Serving Size</th>
                    <th className="text-left py-3 px-2 font-semibold">Protein</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Chicken Breast</td>
                    <td className="py-3 px-2">100g cooked</td>
                    <td className="py-3 px-2">31g</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Salmon</td>
                    <td className="py-3 px-2">100g cooked</td>
                    <td className="py-3 px-2">25g</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Eggs</td>
                    <td className="py-3 px-2">2 large</td>
                    <td className="py-3 px-2">12g</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Greek Yogurt</td>
                    <td className="py-3 px-2">170g container</td>
                    <td className="py-3 px-2">17g</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Cottage Cheese</td>
                    <td className="py-3 px-2">100g</td>
                    <td className="py-3 px-2">11g</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Lentils</td>
                    <td className="py-3 px-2">100g cooked</td>
                    <td className="py-3 px-2">9g</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Tofu</td>
                    <td className="py-3 px-2">100g</td>
                    <td className="py-3 px-2">8g</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Whey Protein</td>
                    <td className="py-3 px-2">1 scoop (30g)</td>
                    <td className="py-3 px-2">24g</td>
                  </tr>
                </tbody>
              </table>
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
                <h4 className="font-medium text-foreground mb-2">How much protein do I need per day?</h4>
                <p>
                  It depends on your goals. Sedentary adults need 0.8g per kg of body weight. Active individuals benefit from 1.2-1.6g/kg. Those building muscle or losing weight may need 1.6-2.2g/kg for optimal results.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I eat too much protein?</h4>
                <p>
                  For healthy people, high protein intake (up to 3g/kg) appears safe long-term. Those with kidney disease should consult a doctor. Most people naturally stop eating more protein as it's very satiating.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is plant protein as good as animal protein?</h4>
                <p>
                  Plant proteins are often incomplete (missing some amino acids), but eating varied plant sources throughout the day provides all essential amino acids. You may need slightly more total protein on a plant-based diet.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">When should I eat protein?</h4>
                <p>
                  Spread protein across 3-5 meals for best results. Aim for 20-40g per meal to maximize muscle protein synthesis. Post-workout protein within 2 hours supports recovery, but total daily intake matters most.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Do I need protein powder?</h4>
                <p>
                  No — protein powder is just convenient food, not a requirement. You can hit your targets with whole foods. Powder works well for post-workout shakes or when you need a quick protein boost between meals.
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
                href="/calculators/protein-distribution-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Protein Distribution Calculator</span>
                <p className="text-muted-foreground">Split your daily protein across meals for optimal absorption</p>
              </a>
              <a
                href="/calculators/macro-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Macro Calculator</span>
                <p className="text-muted-foreground">Calculate complete macronutrient ratios for your goals</p>
              </a>
              <a
                href="/calculators/tdee-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">TDEE Calculator</span>
                <p className="text-muted-foreground">Find your total daily energy expenditure for calorie planning</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
