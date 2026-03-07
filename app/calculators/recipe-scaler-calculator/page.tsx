"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChefHat, Info, Plus, Minus } from "lucide-react";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface RecipeResult {
  scaleFactor: number;
  scaledIngredients: Ingredient[];
}

export default function RecipeScalerCalculatorPage() {
  const [originalServings, setOriginalServings] = useState<string>("4");
  const [desiredServings, setDesiredServings] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", amount: 0, unit: "" }
  ]);
  const [result, setResult] = useState<RecipeResult | null>(null);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: 0, unit: "" }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const calculateScale = () => {
    const orig = parseFloat(originalServings);
    const desired = parseFloat(desiredServings);

    if (isNaN(orig) || isNaN(desired) || orig === 0) return;

    const scaleFactor = desired / orig;

    const scaledIngredients = ingredients
      .filter(ing => ing.name.trim() !== "")
      .map(ing => ({
        ...ing,
        amount: ing.amount * scaleFactor
      }));

    setResult({
      scaleFactor: Math.round(scaleFactor * 100) / 100,
      scaledIngredients,
    });
  };

  const reset = () => {
    setOriginalServings("4");
    setDesiredServings("");
    setIngredients([{ name: "", amount: 0, unit: "" }]);
    setResult(null);
  };

  useEffect(() => {
    calculateScale();
  }, [originalServings, desiredServings, ingredients]);

  const formatAmount = (amount: number): string => {
    if (amount >= 1) {
      return (Math.round(amount * 100) / 100).toString();
    } else {
      const fractions: [number, string][] = [
        [0.25, "¼"], [0.33, "⅓"], [0.5, "½"], [0.67, "⅔"], [0.75, "¾"]
      ];
      for (const [value, symbol] of fractions) {
        if (Math.abs(amount - value) < 0.05) return symbol;
      }
      return amount.toFixed(2);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Recipe Scaler Calculator – Adjust Recipe Servings Instantly</h1>
          <p className="text-muted-foreground">
            Scale your recipes up or down with our free Recipe Scaler Calculator. Enter the original and desired servings to automatically adjust all ingredient quantities — perfect for cooking, baking, and meal prep.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Servings</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="original">Original Servings</Label>
                    <Input
                      id="original"
                      type="number"
                      placeholder="e.g., 4"
                      value={originalServings}
                      onChange={(e) => setOriginalServings(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desired">Desired Servings</Label>
                    <Input
                      id="desired"
                      type="number"
                      placeholder="e.g., 6"
                      value={desiredServings}
                      onChange={(e) => setDesiredServings(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Ingredients</h3>
                  <Button variant="outline" size="sm" onClick={addIngredient}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Ingredient
                  </Button>
                </div>

                <div className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1 grid grid-cols-3 gap-2">
                        <Input
                          type="number"
                          placeholder="Amount"
                          value={ingredient.amount || ""}
                          onChange={(e) => updateIngredient(index, "amount", parseFloat(e.target.value) || 0)}
                          className="col-span-1"
                        />
                        <Input
                          type="text"
                          placeholder="Unit (cups, tbsp)"
                          value={ingredient.unit}
                          onChange={(e) => updateIngredient(index, "unit", e.target.value)}
                          className="col-span-1"
                        />
                        <Input
                          type="text"
                          placeholder="Ingredient name"
                          value={ingredient.name}
                          onChange={(e) => updateIngredient(index, "name", e.target.value)}
                          className="col-span-1"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIngredient(index)}
                        disabled={ingredients.length === 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Note: Some ingredients (like spices, leavening agents) may not scale linearly. Use judgment for best results.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateScale} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Scaled Recipe</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Scale Factor</p>
                    <p className="text-3xl font-bold text-primary">×{result.scaleFactor}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Ingredients for {desiredServings} servings:</p>
                    <div className="space-y-2">
                      {result.scaledIngredients.map((ing, i) => (
                        <div key={i} className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="font-medium">{ing.name}</span>
                          <span className="text-sm">
                            {formatAmount(ing.amount)} {ing.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong></p>
                    <p className="font-mono text-xs mt-1">New Amount = Original × (Desired Servings / Original Servings)</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ChefHat className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter servings and ingredients to scale recipe</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Common Cooking Conversions</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold">Volume:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>1 cup = 16 tbsp</li>
                  <li>1 tbsp = 3 tsp</li>
                  <li>1 cup = 8 fl oz</li>
                  <li>1 pint = 2 cups</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Weight:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>1 lb = 16 oz</li>
                  <li>1 kg = 2.2 lbs</li>
                  <li>1 oz = 28.35 g</li>
                  <li>1 cup flour ≈ 120g</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Temperature:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>°F = (°C × 9/5) + 32</li>
                  <li>°C = (°F - 32) × 5/9</li>
                  <li>350°F = 175°C</li>
                  <li>400°F = 200°C</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Scale a Recipe</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Enter Original Servings</h3>
                <p className="text-sm text-muted-foreground">Input how many servings the recipe currently makes (e.g., 4 servings).</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Add Ingredients and Amounts</h3>
                <p className="text-sm text-muted-foreground">List each ingredient with its original quantity and unit of measurement.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Get Scaled Ingredients</h3>
                <p className="text-sm text-muted-foreground">See all ingredient amounts automatically adjusted for your desired serving size.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Features of This Recipe Scaler</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Instant Proportional Scaling
                </h3>
                <p className="text-sm text-muted-foreground">All ingredients scale automatically using precise mathematical ratios for accurate results.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Fraction Display Support
                </h3>
                <p className="text-sm text-muted-foreground">Common cooking fractions like ¼, ⅓, ½, ⅔, and ¾ display naturally for easy measuring.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Flexible Ingredient List
                </h3>
                <p className="text-sm text-muted-foreground">Add or remove ingredients dynamically to match any recipe from simple to complex.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Cooking Conversion Reference
                </h3>
                <p className="text-sm text-muted-foreground">Built-in tables for volume, weight, and temperature conversions help when scaling requires unit changes.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Scale Factor Display
                </h3>
                <p className="text-sm text-muted-foreground">See the exact multiplier applied to your recipe for understanding and manual adjustments.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions About Recipe Scaling</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do you scale down a recipe?</h3>
                <p className="text-sm text-muted-foreground">Divide each ingredient amount by the scaling factor. For example, to halve a recipe, divide all amounts by 2. This calculator does the math automatically when you enter your desired servings.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Can I scale baking recipes the same way?</h3>
                <p className="text-sm text-muted-foreground">Most ingredients scale linearly, but leavening agents (baking powder, yeast), spices, and salt may need adjustment. Baking is chemistry, so extreme scaling can affect texture and rise.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What happens to cooking time when scaling?</h3>
                <p className="text-sm text-muted-foreground">Cooking time does not scale proportionally. Larger batches may need slightly longer cooking, while smaller batches cook faster. Check for doneness using visual cues and thermometers.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do you convert fractions when scaling?</h3>
                <p className="text-sm text-muted-foreground">Multiply the fraction by your scale factor. For example, ½ cup × 1.5 = ¾ cup. This calculator displays common fractions automatically for easy measuring.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Is there a limit to how much I can scale a recipe?</h3>
                <p className="text-sm text-muted-foreground">Scaling beyond 4x or below ¼x often produces unreliable results. Equipment limitations, heat distribution, and ingredient behavior change at extreme scales. For large batches, consider making multiple smaller batches.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools Section */}
      </div>
    </div>
  );
}
