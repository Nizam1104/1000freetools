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
        <CardHeader>
          <CardTitle>Protein Distribution Calculator – Optimize Protein Timing Per Meal</CardTitle>
          <CardDescription>
            Maximize muscle growth and recovery by spacing your protein intake correctly. Our protein distribution calculator helps you divide your daily protein across meals for best results.
          </CardDescription>
        </CardHeader>
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
    </div>
  );
}
