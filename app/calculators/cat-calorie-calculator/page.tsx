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

interface CatProfile {
  weight: number;
  age: number;
  activityLevel: "sedentary" | "normal" | "active";
  neutered: boolean;
  proneToObesity: boolean;
}

interface CalorieResult {
  rer: number; // Resting Energy Requirements
  der: number; // Daily Energy Requirements
  adjustedCalories: number;
  lifeStage: string;
  feedingRecommendation: string;
  weightManagementNote: string;
}

export default function CatCalorieCalculatorPage() {
  const [weight, setWeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("normal");
  const [neutered, setNeutered] = useState<string>("yes");
  const [proneToObesity, setProneToObesity] = useState<string>("no");
  const [unit, setUnit] = useState<string>("lbs");
  const [result, setResult] = useState<CalorieResult | null>(null);

  const calculate = () => {
    const weightNum = parseFloat(weight);
    const ageNum = parseFloat(age);

    if (isNaN(weightNum) || isNaN(ageNum)) return;

    // Convert to kg if needed
    const weightKg = unit === "lbs" ? weightNum / 2.205 : weightNum;

    // Calculate RER (Resting Energy Requirements)
    // Formula: RER = 70 × (weight in kg)^0.75
    const rer = 70 * Math.pow(weightKg, 0.75);

    // Determine life stage
    let lifeStage = "";
    let derMultiplier = 1.0;

    if (ageNum < 0.33) { // 0-4 months
      lifeStage = "Kitten (0-4 months)";
      derMultiplier = 2.5;
    } else if (ageNum < 1) { // 4 months - 1 year
      lifeStage = "Kitten (4-12 months)";
      derMultiplier = 2.0;
    } else if (ageNum < 7) { // 1-7 years
      lifeStage = "Adult (1-7 years)";
      derMultiplier = 1.2;
    } else if (ageNum < 11) { // 7-11 years
      lifeStage = "Mature (7-11 years)";
      derMultiplier = 1.1;
    } else { // 11+ years
      lifeStage = "Senior (11+ years)";
      derMultiplier = 1.0;
    }

    // Adjust for activity level
    const activityMultipliers: Record<string, number> = {
      sedentary: 0.8,
      normal: 1.0,
      active: 1.2,
    };
    derMultiplier *= activityMultipliers[activityLevel] || 1.0;

    // Adjust for neutered status
    if (neutered === "yes") {
      derMultiplier *= 0.9; // Neutered cats need ~10% fewer calories
    }

    // Adjust for obesity prone
    if (proneToObesity === "yes") {
      derMultiplier *= 0.8; // Weight loss diet
    }

    // Calculate DER (Daily Energy Requirements)
    const der = rer * derMultiplier;

    // Generate feeding recommendation
    let feedingRecommendation = "";
    if (proneToObesity === "yes") {
      feedingRecommendation = "Weight management diet recommended. Consider portion control.";
    } else if (activityLevel === "active") {
      feedingRecommendation = "High-energy formula recommended for active lifestyle.";
    } else {
      feedingRecommendation = "Standard adult maintenance formula recommended.";
    }

    // Weight management note
    let weightManagementNote = "";
    const currentWeightStatus = weightKg > 5 ? "Monitor for overweight" : "Healthy weight range";
    weightManagementNote = `${currentWeightStatus}. Adjust calories by ±10% based on body condition score.`;

    setResult({
      rer: parseFloat(rer.toFixed(0)),
      der: parseFloat(der.toFixed(0)),
      adjustedCalories: parseFloat(der.toFixed(0)),
      lifeStage,
      feedingRecommendation,
      weightManagementNote,
    });
  };

  const reset = () => {
    setWeight("");
    setAge("");
    setActivityLevel("normal");
    setNeutered("yes");
    setProneToObesity("no");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Cat Calorie Calculator – Calculate Your Cat&apos;s Daily Calorie Requirements
          </h1>
          <p className="text-muted-foreground">
            Ensure proper nutrition for your feline companion with our Cat Calorie Calculator.
            Enter your cat&apos;s weight, age, and lifestyle to calculate exact daily caloric needs —
            ideal for preventing feline obesity and maintaining healthy weight.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lbs">lbs</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="age">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  step="0.1"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="activity">Activity Level</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger id="activity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (Indoor, low activity)</SelectItem>
                    <SelectItem value="normal">Normal (Moderate activity)</SelectItem>
                    <SelectItem value="active">Active (Outdoor, high activity)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="neutered">Neutered/Spayed</Label>
                <Select value={neutered} onValueChange={setNeutered}>
                  <SelectTrigger id="neutered">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="obesity">Prone to Obesity</Label>
                <Select value={proneToObesity} onValueChange={setProneToObesity}>
                  <SelectTrigger id="obesity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes (Weight management needed)</SelectItem>
                  </SelectContent>
                </Select>
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
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Daily Calories</p>
                    <p className="text-4xl font-bold text-primary">{result.adjustedCalories} kcal</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">RER (Resting)</p>
                      <p className="text-lg font-semibold">{result.rer} kcal</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">DER (Daily)</p>
                      <p className="text-lg font-semibold">{result.der} kcal</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Life Stage:</span>
                      <span className="font-medium">{result.lifeStage}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Feeding:</strong> {result.feedingRecommendation}
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Weight Note:</strong> {result.weightManagementNote}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your cat&apos;s details and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Cat Calorie Needs
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Cats have different calorie needs based on their life stage, activity level,
                  and health status. The National Research Council provides these guidelines:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>RER (Resting Energy Requirements):</strong> Calories needed at rest
                  </li>
                  <li>
                    <strong>DER (Daily Energy Requirements):</strong> RER adjusted for lifestyle
                  </li>
                  <li>
                    <strong>Kittens:</strong> Need 2-2.5× adult calories for growth
                  </li>
                  <li>
                    <strong>Neutered cats:</strong> Need ~10% fewer calories than intact cats
                  </li>
                  <li>
                    <strong>Senior cats:</strong> May need fewer calories due to reduced activity
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Monitor your cat&apos;s body condition score and adjust
                  calories by ±10% to maintain ideal weight. Consult your vet for personalized advice.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content Section */}
        <div className="mt-12 space-y-12">
          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">How to Calculate Your Cat's Calorie Needs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Enter Cat's Details</h3>
                  <p className="text-muted-foreground text-sm">Input your cat's weight, age, and select the appropriate unit (lbs or kg).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Describe Lifestyle</h3>
                  <p className="text-muted-foreground text-sm">Select activity level, neutered status, and whether your cat is prone to obesity.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-2">Get Feeding Guide</h3>
                  <p className="text-muted-foreground text-sm">See daily calorie requirements with life stage info and personalized feeding recommendations.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Benefits */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Why Track Your Cat's Calories?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">🐱 Prevent Feline Obesity</h3>
                <p className="text-muted-foreground text-sm">Over 60% of cats are overweight. Accurate calorie tracking helps maintain healthy weight and prevents diabetes.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📊 Life Stage Nutrition</h3>
                <p className="text-muted-foreground text-sm">Kittens need 2-2.5× adult calories for growth. Seniors may need fewer. This calculator adjusts for life stage.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🏥 Post-Surgery Care</h3>
                <p className="text-muted-foreground text-sm">Neutered cats need ~10% fewer calories. This calculator accounts for hormonal changes affecting metabolism.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🎯 Weight Management</h3>
                <p className="text-muted-foreground text-sm">Get specific calorie targets for weight loss or gain, with recommendations for portion control.</p>
              </div>
            </div>
          </section>

          {/* Reference Table */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Cat Calorie Needs by Life Stage</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Life Stage</th>
                    <th className="text-left py-3 px-4">Age Range</th>
                    <th className="text-left py-3 px-4">Multiplier</th>
                    <th className="text-left py-3 px-4">Daily Calories (4kg cat)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">🐾 Kitten</td>
                    <td className="py-3 px-4">0-4 months</td>
                    <td className="py-3 px-4">2.5× RER</td>
                    <td className="py-3 px-4">~500 kcal</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">🐾 Kitten</td>
                    <td className="py-3 px-4">4-12 months</td>
                    <td className="py-3 px-4">2.0× RER</td>
                    <td className="py-3 px-4">~400 kcal</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">🐱 Adult</td>
                    <td className="py-3 px-4">1-7 years</td>
                    <td className="py-3 px-4">1.2× RER</td>
                    <td className="py-3 px-4">~240 kcal</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">🐈 Mature</td>
                    <td className="py-3 px-4">7-11 years</td>
                    <td className="py-3 px-4">1.1× RER</td>
                    <td className="py-3 px-4">~220 kcal</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">🐈‍⬛ Senior</td>
                    <td className="py-3 px-4">11+ years</td>
                    <td className="py-3 px-4">1.0× RER</td>
                    <td className="py-3 px-4">~200 kcal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Cat Calorie & Feeding FAQs</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How many calories does a cat need per day?</h3>
                <p className="text-muted-foreground text-sm">An average 4kg (9lb) adult cat needs about 200-250 calories per day. Needs vary by age, activity, and whether the cat is neutered.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How do I calculate my cat's RER?</h3>
                <p className="text-muted-foreground text-sm">RER (Resting Energy Requirement) = 70 × (weight in kg)^0.75. For a 4kg cat: 70 × 4^0.75 ≈ 200 calories at rest.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Do neutered cats need fewer calories?</h3>
                <p className="text-muted-foreground text-sm">Yes, neutered cats typically need 10-15% fewer calories due to hormonal changes that reduce metabolic rate and may increase appetite.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How much should I feed my kitten?</h3>
                <p className="text-muted-foreground text-sm">Kittens need 2-2.5× adult calories for growth. A 4-month-old may need 400-500 calories daily, divided into 3-4 meals.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What's the best way to help my cat lose weight?</h3>
                <p className="text-muted-foreground text-sm">Reduce calories by 10-20% below maintenance, increase play time, use puzzle feeders, and consult your vet for a safe weight loss plan.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Related Pet & Health Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/calories-per-serving-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Calories Per Serving Calculator</h3>
                <p className="text-muted-foreground text-sm">Calculate nutrition for homemade pet food recipes and treats.</p>
              </a>
              <a href="/calculators/carb-intake-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Carb Intake Calculator</h3>
                <p className="text-muted-foreground text-sm">Understand carbohydrate needs for diabetic cats on special diets.</p>
              </a>
              <a href="/calculators/carbon-footprint-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Carbon Footprint Calculator</h3>
                <p className="text-muted-foreground text-sm">Measure the environmental impact of your pet's diet and care.</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
