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
                Dog Calorie Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Puppies:</strong> Need 2-3× adult calories for growth
                  </li>
                  <li>
                    <strong>Neutered dogs:</strong> Need ~10% fewer calories than intact
                  </li>
                  <li>
                    <strong>Senior dogs:</strong> May need fewer calories due to reduced activity
                  </li>
                  <li>
                    <strong>Working dogs:</strong> Can need 2-4× resting calories
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Monitor your dog&apos;s body condition score monthly.
                  You should be able to feel (but not see) ribs. Adjust calories by ±10%
                  to maintain ideal weight. Always consult your vet for breed-specific advice.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
