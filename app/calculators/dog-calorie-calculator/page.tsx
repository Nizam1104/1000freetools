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

interface DogCalorieResult {
  weight: number;
  age: number;
  activityLevel: string;
  rER: number;
  dER: number;
  lifeStage: string;
  feedingGuide: string;
  recommendations: string[];
}

export default function DogCalorieCalculatorPage() {
  const [weight, setWeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("normal");
  const [neutered, setNeutered] = useState<string>("yes");
  const [weightUnit, setWeightUnit] = useState<string>("lbs");
  const [result, setResult] = useState<DogCalorieResult | null>(null);

  const calculate = () => {
    let weightNum = parseFloat(weight) || 0;
    const ageNum = parseFloat(age) || 0;

    if (weightNum === 0) return;

    // Convert to kg if needed
    let weightKg = weightNum;
    if (weightUnit === "lbs") {
      weightKg = weightNum / 2.205;
    }

    // Calculate RER (Resting Energy Requirements)
    // Formula: RER = 70 × (weight in kg)^0.75
    const rER = 70 * Math.pow(weightKg, 0.75);

    // Determine life stage and DER multiplier
    let lifeStage = "";
    let derMultiplier = 1.0;
    let feedingGuide = "";

    if (ageNum < 0.33) { // 0-4 months
      lifeStage = "Puppy (0-4 months)";
      derMultiplier = 3.0;
      feedingGuide = "Feed 4 meals per day";
    } else if (ageNum < 1) { // 4 months - 1 year
      lifeStage = "Puppy (4-12 months)";
      derMultiplier = 2.0;
      feedingGuide = "Feed 3 meals per day";
    } else if (ageNum < 2) { // 1-2 years
      lifeStage = "Young Adult (1-2 years)";
      derMultiplier = 1.6;
      feedingGuide = "Feed 2 meals per day";
    } else if (ageNum < 7) { // 2-7 years
      lifeStage = "Adult (2-7 years)";
      derMultiplier = 1.6;
      feedingGuide = "Feed 2 meals per day";
    } else if (ageNum < 11) { // 7-11 years
      lifeStage = "Mature/Senior (7-11 years)";
      derMultiplier = 1.4;
      feedingGuide = "Feed 2 meals per day, monitor weight";
    } else { // 11+ years
      lifeStage = "Senior (11+ years)";
      derMultiplier = 1.2;
      feedingGuide = "Feed 2-3 smaller meals, senior formula recommended";
    }

    // Adjust for neutered status
    if (neutered === "yes") {
      derMultiplier *= 0.9; // Neutered dogs need ~10% fewer calories
    }

    // Adjust for activity level
    const activityMultipliers: Record<string, number> = {
      sedentary: 0.8,
      normal: 1.0,
      active: 1.2,
      working: 1.6,
    };
    derMultiplier *= activityMultipliers[activityLevel] || 1.0;

    // Calculate DER (Daily Energy Requirements)
    const dER = rER * derMultiplier;

    // Recommendations
    const recommendations: string[] = [];

    if (activityLevel === "sedentary") {
      recommendations.push("🏃 Consider increasing exercise to maintain healthy weight");
    } else if (activityLevel === "working") {
      recommendations.push("⚡ Working dogs need high-quality protein and fat");
      recommendations.push("💧 Ensure adequate hydration during work");
    }

    if (neutered === "yes") {
      recommendations.push("⚠️ Neutered dogs are prone to weight gain - monitor body condition");
    }

    if (weightKg > 25) {
      recommendations.push("🦴 Large breeds: Consider joint support supplements");
    }

    recommendations.push(`🍖 Daily calories: ${Math.round(dER)} kcal`);
    recommendations.push(`📏 Adjust based on body condition score monthly`);

    setResult({
      weight: weightKg,
      age: ageNum,
      activityLevel,
      rER: parseFloat(rER.toFixed(0)),
      dER: parseFloat(dER.toFixed(0)),
      lifeStage,
      feedingGuide,
      recommendations,
    });
  };

  const reset = () => {
    setWeight("");
    setAge("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Dog Calorie Calculator – Find Out How Many Calories Your Dog Needs Per Day
          </h1>
          <p className="text-muted-foreground">
            Keep your dog healthy with our Dog Calorie Calculator. Enter your dog&apos;s
            weight, age, and activity level to get the recommended daily calorie intake —
            helping prevent obesity and underfeeding in dogs of all breeds.
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
                    placeholder="e.g., 50"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="weight-unit">Unit</Label>
                  <Select value={weightUnit} onValueChange={setWeightUnit}>
                    <SelectTrigger id="weight-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lbs">lbs</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  step="0.5"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g., 3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity">Activity Level</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger id="activity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (mostly indoors)</SelectItem>
                    <SelectItem value="normal">Normal (daily walks)</SelectItem>
                    <SelectItem value="active">Active (regular exercise)</SelectItem>
                    <SelectItem value="working">Working/Hunting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
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
              <h3 className="text-lg font-semibold mb-4">Calorie Requirements</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Daily Calories</p>
                    <p className="text-4xl font-bold text-primary">{result.dER} kcal</p>
                    <p className="text-sm mt-1">{result.lifeStage}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">RER (Resting)</p>
                      <p className="text-lg font-semibold">{result.rER} kcal</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">DER (Daily)</p>
                      <p className="text-lg font-semibold">{result.dER} kcal</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Life Stage:</span>
                      <span className="font-semibold">{result.lifeStage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Feeding:</span>
                      <span className="font-semibold">{result.feedingGuide}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Formula:</strong> RER = 70 × (weight in kg)^0.75
                      <br />
                      DER = RER × life stage factor × activity factor
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your dog&apos;s details and click Calculate to see requirements</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Dog Calorie Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your dog&apos;s weight and select the unit</p>
                    <p>Input your dog current weight in pounds or kilograms. Be as accurate as possible for best results.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Provide age, activity level, and neuter status</p>
                    <p>These factors significantly affect calorie needs. Puppies and working dogs need more calories, while senior and neutered dogs need less.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click Calculate to see daily calorie requirements</p>
                    <p>You will see the RER (resting energy) and DER (daily energy requirements), along with feeding recommendations for your dog life stage.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Dog Calorie Requirements by Life Stage
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Life Stage</th>
                      <th className="text-left py-3 px-2 font-semibold">Age Range</th>
                      <th className="text-left py-3 px-2 font-semibold">DER Multiplier</th>
                      <th className="text-left py-3 px-2 font-semibold">Meals Per Day</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Puppy</td>
                      <td className="py-3 px-2">0-4 months</td>
                      <td className="py-3 px-2">3.0 × RER</td>
                      <td className="py-3 px-2">4 meals</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Puppy</td>
                      <td className="py-3 px-2">4-12 months</td>
                      <td className="py-3 px-2">2.0 × RER</td>
                      <td className="py-3 px-2">3 meals</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Young Adult</td>
                      <td className="py-3 px-2">1-2 years</td>
                      <td className="py-3 px-2">1.6 × RER</td>
                      <td className="py-3 px-2">2 meals</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Adult</td>
                      <td className="py-3 px-2">2-7 years</td>
                      <td className="py-3 px-2">1.6 × RER</td>
                      <td className="py-3 px-2">2 meals</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Mature/Senior</td>
                      <td className="py-3 px-2">7-11 years</td>
                      <td className="py-3 px-2">1.4 × RER</td>
                      <td className="py-3 px-2">2 meals</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Senior</td>
                      <td className="py-3 px-2">11+ years</td>
                      <td className="py-3 px-2">1.2 × RER</td>
                      <td className="py-3 px-2">2-3 small meals</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: DER multipliers are adjusted based on activity level and neuter status. Neutered dogs need about 10% fewer calories.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Dog Calorie Needs
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is RER?</h4>
                  <p>
                    RER stands for Resting Energy Requirements. This is the number of calories your dog needs at complete rest to maintain basic bodily functions like breathing, circulation, and cell production. The formula is RER = 70 × (weight in kg)^0.75. This formula works for all dog sizes because it accounts for the fact that metabolism does not scale linearly with body weight.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is DER?</h4>
                  <p>
                    DER stands for Daily Energy Requirements. This is RER multiplied by factors that account for your dog activity level, life stage, and physiological status. A working sled dog might need 4 to 8 times their RER, while an overweight senior might need only 1.0 to 1.2 times their RER.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Puppies Need More Calories</h4>
                  <p>
                    Puppies are growing rapidly and need extra energy for bone development, muscle growth, and organ maturation. A four-month-old puppy may need three times the calories of an adult dog of the same weight. This is why puppy food is more calorie-dense than adult formulas.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Neutering Affects Calorie Needs</h4>
                  <p>
                    Neutered dogs have lower metabolic rates and tend to be less active. They typically need about 10 to 20 percent fewer calories than intact dogs. This is why weight gain is common after spaying or neutering unless food intake is adjusted accordingly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Feeding Your Dog the Right Amount
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Check the Body Condition Score</p>
                    <p>You should be able to feel your dog ribs with light pressure but not see them. From above, there should be a visible waist. Adjust food up or down by 10% based on what you see.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Account for Treats</p>
                    <p>Treats should not exceed 10% of daily calories. If you give a lot of treats during training, reduce meal portions accordingly. Many dogs are overweight because owners forget to count treats.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Weigh Your Dog Monthly</p>
                    <p>Small weight changes are hard to notice day to day. Monthly weigh-ins help you catch weight gain or loss early. Keep a log to track trends over time.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Adjust for Season and Activity Changes</p>
                    <p>Dogs may need more calories in winter if they spend time outdoors. Active summer months may also increase needs. Adjust portions based on actual activity, not just the label.</p>
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
                  <h4 className="font-medium text-foreground mb-2">How many calories should my dog eat per day?</h4>
                  <p>
                    It depends on weight, age, and activity level. A typical adult dog needs about 30 calories per pound of body weight per day. So a 50-pound dog would need roughly 1,500 calories daily. Puppies need more, senior dogs need less. Use this calculator for a personalized number.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I calculate my dog calorie needs?</h4>
                  <p>
                    Start with RER = 70 × (weight in kg)^0.75. Then multiply by a factor based on life stage: 3.0 for young puppies, 2.0 for older puppies, 1.6 for adults, 1.4 for mature dogs, and 1.2 for seniors. Adjust up for activity and down for neutering.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I feed my dog based on the bag recommendations?</h4>
                  <p>
                    Bag recommendations are starting points, not rules. They are often higher than necessary because well-fed dogs look healthier to owners. Use the calculator result as your baseline, then adjust based on your dog body condition and weight trends.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How much should I feed my puppy?</h4>
                  <p>
                    Puppies under 4 months need about 3 times their RER, divided into 4 meals per day. From 4 to 12 months, they need about 2 times RER in 3 meals. Large breed puppies should be fed a large-breed puppy formula to prevent rapid growth that can cause joint problems.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why did my dog gain weight after being neutered?</h4>
                  <p>
                    Neutering reduces metabolic rate by about 10 to 20 percent. Many dogs also become less active after the procedure. If you keep feeding the same amount, weight gain is likely. Reduce calories by about 10% after neutering and monitor weight closely for the first few months.
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
                  href="/calculators/pet-age-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Pet Age Calculator</span>
                  <p className="text-muted-foreground">Convert your dog or cat age to human years based on size and species</p>
                </a>
                <a
                  href="/calculators/cat-calorie-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Cat Calorie Calculator</span>
                  <p className="text-muted-foreground">Calculate daily calorie requirements for cats of all ages</p>
                </a>
                <a
                  href="/calculators/bmi-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">BMI Calculator</span>
                  <p className="text-muted-foreground">Check your own body mass index and understand your health status</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
