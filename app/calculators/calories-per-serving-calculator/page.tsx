"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        {/* SEO Content Section */}
        <div className="mt-12 space-y-12">
          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">How to Calculate Calories Per Serving</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Add Your Ingredients</h3>
                  <p className="text-muted-foreground text-sm">Enter each ingredient from your recipe along with its calorie content per 100g and the amount you're using.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Set Serving Count</h3>
                  <p className="text-muted-foreground text-sm">Specify how many servings your recipe makes to divide the total calories appropriately.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-2">Get Your Results</h3>
                  <p className="text-muted-foreground text-sm">Instantly see total recipe calories, calories per serving, and a breakdown of each ingredient's contribution.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Benefits */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Why Use This Calories Per Serving Calculator?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">🍽️ Accurate Portion Control</h3>
                <p className="text-muted-foreground text-sm">Know exactly how many calories are in each serving, making it easier to stick to your daily calorie goals and manage weight effectively.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📊 Ingredient Breakdown</h3>
                <p className="text-muted-foreground text-sm">See which ingredients contribute most to your recipe's calorie count, helping you make healthier substitutions when needed.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">👨‍🍳 Perfect for Meal Prep</h3>
                <p className="text-muted-foreground text-sm">Calculate nutrition for batch-cooked meals and plan your weekly menu with precise calorie information for each portion.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📱 No Registration Required</h3>
                <p className="text-muted-foreground text-sm">Use this free calculator anytime without creating an account. Your recipes and data stay private on your device.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How do I calculate calories per serving in a recipe?</h3>
                <p className="text-muted-foreground text-sm">Add up the calories from all ingredients in your recipe, then divide by the number of servings. For example, if your recipe has 2000 total calories and makes 4 servings, each serving contains 500 calories.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Where can I find calorie information for ingredients?</h3>
                <p className="text-muted-foreground text-sm">Check nutrition labels on packaged foods, use the USDA FoodData Central database, or refer to reliable nutrition apps. Most whole foods have well-documented calorie values per 100g.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Does cooking method affect calorie count?</h3>
                <p className="text-muted-foreground text-sm">Cooking methods can change calorie density. Frying adds calories from oil, while grilling or steaming may reduce them. Always account for added fats and oils in your calculations.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How accurate is this calorie calculator?</h3>
                <p className="text-muted-foreground text-sm">This calculator provides estimates based on the values you enter. Accuracy depends on using correct calorie data for ingredients and measuring portions precisely. For medical purposes, consult a registered dietitian.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Can I use this for weight loss meal planning?</h3>
                <p className="text-muted-foreground text-sm">Yes! This calculator is perfect for weight loss planning. By knowing exact calories per serving, you can create a calorie deficit while ensuring balanced nutrition across your meals.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Related Nutrition & Health Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/carb-intake-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Carb Intake Calculator</h3>
                <p className="text-muted-foreground text-sm">Calculate your daily carbohydrate needs based on your diet goals and activity level.</p>
              </a>
              <a href="/calculators/cat-calorie-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Cat Calorie Calculator</h3>
                <p className="text-muted-foreground text-sm">Find the right daily calorie intake for your feline friend based on weight and age.</p>
              </a>
              <a href="/calculators/carbon-footprint-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Carbon Footprint Calculator</h3>
                <p className="text-muted-foreground text-sm">Measure your environmental impact and discover ways to reduce your CO₂ emissions.</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
