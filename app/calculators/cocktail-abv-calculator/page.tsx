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

interface CocktailResult {
  ingredients: Array<{ name: string; volume: number; abv: number }>;
  totalVolume: number;
  totalAlcohol: number;
  finalABV: number;
  proof: number;
  drinkStrength: string;
  recommendations: string[];
}

export default function CocktailABVCalculatorPage() {
  const [ingredients, setIngredients] = useState<Array<{ name: string; volume: string; abv: string }>>([
    { name: "Spirit", volume: "60", abv: "40" },
  ]);
  const [result, setResult] = useState<CocktailResult | null>(null);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: `Ingredient ${ingredients.length + 1}`, volume: "", abv: "" }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: string, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const calculate = () => {
    let totalVolume = 0;
    let totalAlcohol = 0;
    const processedIngredients = [];

    for (const ing of ingredients) {
      const volume = parseFloat(ing.volume) || 0;
      const abv = parseFloat(ing.abv) || 0;

      if (volume === 0) continue;

      const alcohol = volume * (abv / 100);
      totalVolume += volume;
      totalAlcohol += alcohol;

      processedIngredients.push({
        name: ing.name,
        volume,
        abv,
      });
    }

    if (totalVolume === 0) return;

    const finalABV = (totalAlcohol / totalVolume) * 100;
    const proof = finalABV * 2;

    // Drink strength assessment
    let drinkStrength = "";
    if (finalABV < 5) {
      drinkStrength = "🍹 Light - Session cocktail";
    } else if (finalABV < 15) {
      drinkStrength = "🍸 Moderate - Standard cocktail strength";
    } else if (finalABV < 25) {
      drinkStrength = "🥃 Strong - Spirit-forward cocktail";
    } else {
      drinkStrength = "🔥 Very Strong - Sip slowly!";
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📊 Total volume: ${totalVolume.toFixed(0)} ml`);
    recommendations.push(`🍸 Total alcohol: ${totalAlcohol.toFixed(1)} ml pure alcohol`);
    recommendations.push(`💪 Final ABV: ${finalABV.toFixed(1)}% (${proof.toFixed(0)} proof)`);

    if (finalABV > 30) {
      recommendations.push("⚠️ Very strong drink - consider adding mixer");
      recommendations.push("🧊 Serve over ice to dilute slightly");
    } else if (finalABV > 20) {
      recommendations.push("🥃 Spirit-forward - best served neat or on the rocks");
    } else if (finalABV < 8) {
      recommendations.push("🍹 Light and refreshing - great for extended sessions");
    }

    // Standard drink calculation (14g pure alcohol = 1 standard drink)
    const standardDrinks = totalAlcohol * 0.789 / 14; // 0.789 is density of ethanol
    recommendations.push(`🍺 Equivalent to ~${standardDrinks.toFixed(1)} standard drinks`);

    setResult({
      ingredients: processedIngredients,
      totalVolume,
      totalAlcohol,
      finalABV: parseFloat(finalABV.toFixed(1)),
      proof: parseFloat(proof.toFixed(0)),
      drinkStrength,
      recommendations,
    });
  };

  const reset = () => {
    setIngredients([{ name: "Spirit", volume: "60", abv: "40" }]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Cocktail ABV Calculator – Calculate the Alcohol Content of Any Mixed Drink
          </h1>
          <p className="text-muted-foreground">
            Know what&apos;s in your glass with our Cocktail ABV Calculator. Enter each
            ingredient&apos;s volume and ABV to calculate the total alcohol content of your
            cocktail — great for bartenders, party planners, and responsible drinkers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Ingredients</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addIngredient}>
                    + Add Ingredient
                  </Button>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {ingredients.map((ing, index) => (
                    <div key={index} className="p-3 border rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <Input
                          value={ing.name}
                          onChange={(e) => updateIngredient(index, "name", e.target.value)}
                          className="w-32"
                          placeholder="Ingredient name"
                        />
                        {ingredients.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeIngredient(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label className="text-xs">Volume (ml)</Label>
                          <Input
                            type="number"
                            value={ing.volume}
                            onChange={(e) => updateIngredient(index, "volume", e.target.value)}
                            placeholder="60"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">ABV (%)</Label>
                          <Input
                            type="number"
                            value={ing.abv}
                            onChange={(e) => updateIngredient(index, "abv", e.target.value)}
                            placeholder="40"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
              <h3 className="text-lg font-semibold mb-4">Cocktail Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.finalABV >= 25 ? "bg-red-100 dark:bg-red-900/20" :
                    result.finalABV >= 15 ? "bg-amber-100 dark:bg-amber-900/20" :
                    result.finalABV >= 8 ? "bg-blue-100 dark:bg-blue-900/20" :
                    "bg-green-100 dark:bg-green-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Final ABV</p>
                    <p className="text-5xl font-bold">{result.finalABV}%</p>
                    <p className="text-sm mt-1">{result.proof} proof</p>
                    <p className="text-sm mt-2">{result.drinkStrength}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Total Volume</p>
                      <p className="text-lg font-bold">{result.totalVolume} ml</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Pure Alcohol</p>
                      <p className="text-lg font-bold">{result.totalAlcohol.toFixed(1)} ml</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Ingredients</h4>
                    <div className="space-y-1">
                      {result.ingredients.map((ing, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>{ing.name}</span>
                          <span>{ing.volume}ml @ {ing.abv}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Information</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Add ingredients and click Calculate to see ABV</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Common Spirit ABV Values
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-muted/50 rounded">
                    <span className="font-medium">Vodka/Gin:</span> 40%
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <span className="font-medium">Whiskey:</span> 40-50%
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <span className="font-medium">Rum:</span> 40%
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <span className="font-medium">Tequila:</span> 40%
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <span className="font-medium">Wine:</span> 12-14%
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <span className="font-medium">Liqueur:</span> 15-30%
                  </div>
                </div>
                <p>
                  <strong>Note:</strong> Drink responsibly. One standard drink contains
                  approximately 14g of pure alcohol. Know your limits and never drink and drive.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
