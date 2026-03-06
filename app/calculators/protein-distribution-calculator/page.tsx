"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProteinDistributionCalculator() {
  const [dailyProtein, setDailyProtein] = useState<string>("");
  const [meals, setMeals] = useState<number>(3);
  const [distribution, setDistribution] = useState<{meal: string, protein: number}[]>([]);

  const calculate = () => {
    const protein = parseFloat(dailyProtein);
    if (isNaN(protein) || protein <= 0) return;

    // Optimal distribution: spread evenly with slight emphasis on post-workout
    const perMeal = Math.round(protein / meals);
    const results = [];
    
    for (let i = 1; i <= meals; i++) {
      const mealNames = ["Breakfast", "Lunch", "Dinner", "Snack 1", "Snack 2", "Snack 3"];
      results.push({
        meal: mealNames[i - 1] || `Meal ${i}`,
        protein: perMeal
      });
    }

    setDistribution(results);
  };

  const reset = () => {
    setDailyProtein("");
    setMeals(3);
    setDistribution([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="protein">Daily Protein Target (grams)</Label>
              <Input
                id="protein"
                type="number"
                placeholder="e.g., 150"
                value={dailyProtein}
                onChange={(e) => setDailyProtein(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="meals">Number of Meals</Label>
              <Select
                value={meals.toString()}
                onValueChange={(v) => setMeals(parseInt(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 meals</SelectItem>
                  <SelectItem value="4">4 meals</SelectItem>
                  <SelectItem value="5">5 meals</SelectItem>
                  <SelectItem value="6">6 meals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Distribution</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {distribution.length > 0 && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-3">
                  Protein Distribution Across {meals} Meals
                </p>
                <div className="space-y-2">
                  {distribution.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="font-medium">{item.meal}</span>
                      <span className="text-lg font-semibold">{item.protein}g</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Optimal protein per meal: 20-40g for muscle protein synthesis
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Protein Distribution Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your daily protein target</p>
                  <p>Input your total daily protein goal in grams. Use our protein intake calculator if you need help determining your target.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Select number of meals</p>
                  <p>Choose how many meals or feeding windows you plan to eat per day — from 3 main meals to 6 smaller meals.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Get your distribution plan</p>
                  <p>See exactly how much protein to consume at each meal for optimal muscle protein synthesis throughout the day.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Key Benefits of Protein Distribution
            </h3>
            <div className="space-y-4 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Maximizes Muscle Protein Synthesis</p>
                <p className="text-muted-foreground">Spreading protein across meals keeps muscle building activated throughout the day rather than in one spike</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Prevents Protein Waste</p>
                <p className="text-muted-foreground">The body can only use about 30-40g per meal for muscle building — excess gets burned for energy or stored</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Better Satiety Management</p>
                <p className="text-muted-foreground">Regular protein intake helps control hunger and reduces cravings between meals</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Supports Recovery</p>
                <p className="text-muted-foreground">Consistent amino acid availability aids muscle repair after workouts throughout the day</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Optimal Protein Per Meal Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Goal</th>
                    <th className="text-left py-3 px-2 font-semibold">Protein Per Meal</th>
                    <th className="text-left py-3 px-2 font-semibold">Meals Per Day</th>
                    <th className="text-left py-3 px-2 font-semibold">Total Daily</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Sedentary Adult</td>
                    <td className="py-3 px-2">20-25g</td>
                    <td className="py-3 px-2">3</td>
                    <td className="py-3 px-2">60-75g</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Active Individual</td>
                    <td className="py-3 px-2">25-30g</td>
                    <td className="py-3 px-2">4</td>
                    <td className="py-3 px-2">100-120g</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Muscle Building</td>
                    <td className="py-3 px-2">30-40g</td>
                    <td className="py-3 px-2">4-5</td>
                    <td className="py-3 px-2">120-200g</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Weight Loss</td>
                    <td className="py-3 px-2">30-40g</td>
                    <td className="py-3 px-2">4-5</td>
                    <td className="py-3 px-2">120-180g</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Athlete</td>
                    <td className="py-3 px-2">35-45g</td>
                    <td className="py-3 px-2">5-6</td>
                    <td className="py-3 px-2">175-270g</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Individual needs vary based on body weight, activity level, and training intensity.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">How much protein can my body absorb per meal?</h4>
                <p>
                  Your body absorbs nearly all protein you eat, but only about 20-40g per meal is used for muscle protein synthesis. The rest gets used for energy or other bodily functions. Spreading intake across meals maximizes the muscle-building benefit.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is it better to eat protein before or after workout?</h4>
                <p>
                  Total daily protein matters more than timing. That said, having 20-40g within 2 hours after training supports recovery. Pre-workout protein (1-3 hours before) can also help if you train fasted or haven't eaten in several hours.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Should I have protein at breakfast?</h4>
                <p>
                  Yes. Most people eat too little protein at breakfast and too much at dinner. A 30g protein breakfast helps control appetite all day and prevents muscle breakdown after the overnight fast.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Does protein timing matter for muscle gain?</h4>
                <p>
                  Timing has a small effect compared to total daily intake. Hitting your daily protein target consistently matters most. Even distribution across 3-5 meals provides a slight edge over skewed intake patterns.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I eat all my protein in one meal?</h4>
                <p>
                  You can, but it's not optimal. One large protein meal triggers muscle synthesis once, then your body returns to baseline. Multiple smaller doses throughout the day keep synthesis elevated longer, leading to better overall muscle growth.
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
                href="/calculators/protein-intake-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Protein Intake Calculator</span>
                <p className="text-muted-foreground">Calculate your daily protein needs based on weight and activity</p>
              </a>
              <a
                href="/calculators/macro-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Macro Calculator</span>
                <p className="text-muted-foreground">Calculate complete macronutrient breakdown for your goals</p>
              </a>
              <a
                href="/calculators/calorie-deficit-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Calorie Deficit Calculator</span>
                <p className="text-muted-foreground">Determine calorie needs for weight loss while preserving muscle</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
