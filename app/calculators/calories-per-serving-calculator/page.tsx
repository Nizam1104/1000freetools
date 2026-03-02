"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Ingredient {
  id: number;
  name: string;
  calories: number;
  servingSize: number;
  unit: string;
}

export default function CaloriesPerServingCalculatorPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: 1, name: "Ingredient 1", calories: 0, servingSize: 100, unit: "g" }
  ]);
  const [servings, setServings] = useState<string>("4");
  const [result, setResult] = useState<{
    totalCalories: number;
    caloriesPerServing: number;
    ingredientBreakdown: { name: string; calories: number; percentage: number }[];
  } | null>(null);

  const addIngredient = () => {
    setIngredients([...ingredients, { id: Date.now(), name: `Ingredient ${ingredients.length + 1}`, calories: 0, servingSize: 100, unit: "g" }]);
  };

  const removeIngredient = (id: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(i => i.id !== id));
    }
  };

  const updateIngredient = (id: number, field: keyof Ingredient, value: string | number) => {
    setIngredients(ingredients.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const calculate = () => {
    const numServings = parseFloat(servings) || 1;
    
    let totalCalories = 0;
    const ingredientBreakdown: { name: string; calories: number; percentage: number }[] = [];

    ingredients.forEach(ingredient => {
      const ingredientCalories = (ingredient.calories / 100) * ingredient.servingSize;
      totalCalories += ingredientCalories;
      ingredientBreakdown.push({
        name: ingredient.name,
        calories: Math.round(ingredientCalories),
        percentage: 0
      });
    });

    // Calculate percentages
    ingredientBreakdown.forEach(item => {
      item.percentage = totalCalories > 0 ? (item.calories / totalCalories) * 100 : 0;
    });

    const caloriesPerServing = totalCalories / numServings;

    setResult({
      totalCalories: Math.round(totalCalories),
      caloriesPerServing: Math.round(caloriesPerServing),
      ingredientBreakdown
    });
  };

  const reset = () => {
    setIngredients([{ id: 1, name: "Ingredient 1", calories: 0, servingSize: 100, unit: "g" }]);
    setServings("4");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Calories Per Serving Calculator – Calculate Nutrition Calories in Any Recipe</h1>
          <p className="text-muted-foreground">
            Track your nutrition accurately with our Calories Per Serving Calculator. Enter ingredients and their calorie values along with serving count to calculate total recipe calories and calories per serving — great for meal planning and diet tracking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              {ingredients.map((ingredient, index) => (
                <div key={ingredient.id} className="p-3 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Ingredient {index + 1}</Label>
                    {ingredients.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeIngredient(ingredient.id)}>×</Button>
                    )}
                  </div>
                  <Input 
                    placeholder="Ingredient name" 
                    value={ingredient.name} 
                    onChange={(e) => updateIngredient(ingredient.id, "name", e.target.value)} 
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Calories/100g</Label>
                      <Input 
                        type="number" 
                        placeholder="e.g., 250" 
                        value={ingredient.calories} 
                        onChange={(e) => updateIngredient(ingredient.id, "calories", parseFloat(e.target.value) || 0)} 
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Amount Used (g)</Label>
                      <Input 
                        type="number" 
                        value={ingredient.servingSize} 
                        onChange={(e) => updateIngredient(ingredient.id, "servingSize", parseFloat(e.target.value) || 0)} 
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="space-y-2">
                <Label htmlFor="servings">Number of Servings</Label>
                <Input 
                  id="servings" 
                  type="number" 
                  value={servings} 
                  onChange={(e) => setServings(e.target.value)} 
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={addIngredient} variant="outline" className="flex-1">
                  + Add Ingredient
                </Button>
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
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Calories Per Serving</p>
                      <p className="text-4xl font-bold text-primary">{result.caloriesPerServing}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Recipe Calories</p>
                      <p className="text-4xl font-bold">{result.totalCalories}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Ingredient Breakdown:</p>
                    {result.ingredientBreakdown.map((item, i) => (
                      <div key={i} className="p-2 bg-muted rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-sm text-muted-foreground">{item.percentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-primary" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{item.calories} calories</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-1">Nutrition Tip:</p>
                    <p className="text-sm">To find calories per 100g of a food, check nutrition labels or use a food database. For homemade items, calculate from individual ingredients.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Add ingredients and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
