"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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
                  <div className={`p-4 rounded-lg text-center ${result.finalABV >= 25 ? "bg-red-100 dark:bg-red-900/20" :
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Cocktail ABV Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Add your cocktail ingredients</p>
                    <p>Click Add Ingredient for each component. Enter the name, volume in milliliters, and ABV percentage. Common spirits are 40 percent ABV, wine is 12-14 percent, and liqueurs range from 15-30 percent.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click Calculate</p>
                    <p>The calculator sums the total volume and pure alcohol content, then divides to find the final ABV percentage of your mixed drink.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review the results</p>
                    <p>See the final ABV, proof, drink strength assessment, total pure alcohol content, and equivalent standard drinks for responsible consumption.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Common Alcohol ABV Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Beverage Type</th>
                      <th className="text-left py-3 px-2 font-semibold">Typical ABV</th>
                      <th className="text-left py-3 px-2 font-semibold">Proof</th>
                      <th className="text-left py-3 px-2 font-semibold">Standard Serve</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Vodka</td>
                      <td className="py-3 px-2">40 percent</td>
                      <td className="py-3 px-2">80 proof</td>
                      <td className="py-3 px-2">45-60 ml</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Gin</td>
                      <td className="py-3 px-2">40 percent</td>
                      <td className="py-3 px-2">80 proof</td>
                      <td className="py-3 px-2">45-60 ml</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Whiskey</td>
                      <td className="py-3 px-2">40-50 percent</td>
                      <td className="py-3 px-2">80-100 proof</td>
                      <td className="py-3 px-2">45-60 ml</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Rum</td>
                      <td className="py-3 px-2">40 percent</td>
                      <td className="py-3 px-2">80 proof</td>
                      <td className="py-3 px-2">45-60 ml</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Tequila</td>
                      <td className="py-3 px-2">40 percent</td>
                      <td className="py-3 px-2">80 proof</td>
                      <td className="py-3 px-2">45-60 ml</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Wine</td>
                      <td className="py-3 px-2">12-14 percent</td>
                      <td className="py-3 px-2">24-28 proof</td>
                      <td className="py-3 px-2">150 ml</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Beer</td>
                      <td className="py-3 px-2">4-6 percent</td>
                      <td className="py-3 px-2">8-12 proof</td>
                      <td className="py-3 px-2">355 ml</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Liqueurs</td>
                      <td className="py-3 px-2">15-30 percent</td>
                      <td className="py-3 px-2">30-60 proof</td>
                      <td className="py-3 px-2">30-45 ml</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: ABV varies by brand and style. Cask strength whiskeys can reach 60 percent ABV. Some liqueurs like Everclear reach 95 percent ABV.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How Cocktail ABV Is Calculated
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Dilution Formula</h4>
                  <p>
                    Final ABV equals total pure alcohol divided by total volume, multiplied by 100. For example, a cocktail with 60 ml of 40 percent vodka and 120 ml of mixer contains 24 ml pure alcohol in 180 ml total, giving 13.3 percent ABV.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Understanding Proof</h4>
                  <p>
                    Proof is simply ABV multiplied by 2 in the US system. A 40 percent ABV spirit is 80 proof. The term comes from an old test where gunpowder soaked in alcohol would ignite if the alcohol was &quot;proof&quot; of sufficient strength.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Standard Drink Equivalents</h4>
                  <p>
                    One standard drink contains about 14 grams of pure alcohol. Since alcohol has a density of 0.789 g/ml, this equals roughly 17.7 ml of pure alcohol. A cocktail with 35 ml of pure alcohol equals about 2 standard drinks.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Balanced Cocktails
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Know your target strength</p>
                    <p>Session cocktails stay under 8 percent ABV. Standard cocktails range 10-18 percent. Spirit-forward drinks like Martinis and Manhattans reach 25-30 percent. Match strength to occasion and drinking duration.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Account for dilution from ice</p>
                    <p>Shaking or stirring with ice adds 20-30 percent water volume. A stirred Martini might gain 30 ml of water. This lowers the final ABV slightly but is essential for proper taste and temperature.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Balance sweet and strong</p>
                    <p>High-ABV cocktails benefit from adequate dilution and balance. A Negroni works at 24 percent ABV because Campari and vermouth provide bitterness and sweetness. Straight spirits over ice lack this balance.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Track total alcohol intake</p>
                    <p>Use the standard drink equivalent to monitor consumption. One drink per hour allows your liver to process alcohol efficiently. Know your limits and never drink and drive.</p>
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
                  <h4 className="font-medium text-foreground mb-2">What ABV is considered a strong cocktail?</h4>
                  <p>
                    Cocktails above 20 percent ABV are considered strong. Martinis, Manhattans, and Negronis typically range 24-30 percent. Most mixed drinks with significant juice or soda stay under 15 percent. Beer and wine are 4-14 percent for comparison.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I make a lower-ABV cocktail?</h4>
                  <p>
                    Increase the proportion of non-alcoholic mixers. Use lower-ABV ingredients like vermouth, sherry, or amaro instead of straight spirits. Session cocktails use 30 ml of spirit with 90-120 ml of mixer for 6-10 percent ABV.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Does shaking change the ABV?</h4>
                  <p>
                    Shaking adds dilution from melted ice, which slightly lowers ABV. A shaken cocktail might be 2-4 percent lower ABV than the pre-dilution calculation. However, shaking also chills the drink and creates a pleasant texture that enhances the drinking experience.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What is a standard drink?</h4>
                  <p>
                    In the US, one standard drink contains 14 grams of pure alcohol. This equals 355 ml of 5 percent beer, 148 ml of 12 percent wine, or 44 ml of 40 percent spirits. Different countries define standard drinks differently.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How long does it take to metabolize alcohol?</h4>
                  <p>
                    The liver processes about one standard drink per hour on average. This rate varies by body weight, sex, food intake, and individual metabolism. Time is the only way to sober up. Coffee, cold showers, and exercise don&apos;t speed alcohol metabolism.
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
                  href="/calculators/beer-abv-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Beer ABV Calculator</span>
                  <p className="text-muted-foreground">Calculate alcohol content of homemade beer from gravity readings</p>
                </a>
                <a
                  href="/calculators/wine-abv-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Wine ABV Calculator</span>
                  <p className="text-muted-foreground">Determine wine alcohol content from specific gravity measurements</p>
                </a>
                <a
                  href="/calculators/blood-alcohol-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Blood Alcohol Calculator</span>
                  <p className="text-muted-foreground">Estimate blood alcohol content based on drinks consumed</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
