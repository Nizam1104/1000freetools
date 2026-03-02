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

interface BackpackResult {
  bodyWeight: number;
  tripType: string;
  maxPackWeight: number;
  baseWeight: number;
  consumables: number;
  comfortRating: string;
  weightDistribution: Array<{ item: string; percentage: number; weight: number }>;
  recommendations: string[];
}

export default function BackpackLoadCalculatorPage() {
  const [bodyWeight, setBodyWeight] = useState<string>("");
  const [tripType, setTripType] = useState<string>("day");
  const [experience, setExperience] = useState<string>("intermediate");
  const [weightUnit, setWeightUnit] = useState<string>("lbs");
  const [result, setResult] = useState<BackpackResult | null>(null);

  const calculate = () => {
    const weightNum = parseFloat(bodyWeight) || 0;
    if (weightNum === 0) return;

    // Convert to lbs if needed
    let weightLbs = weightNum;
    if (weightUnit === "kg") {
      weightLbs = weightNum * 2.205;
    }

    // Maximum pack weight by trip type (percentage of body weight)
    const maxPercentages: Record<string, number> = {
      day: 0.10,      // 10% for day hikes
      overnight: 0.15, // 15% for overnight
      weekend: 0.20,   // 20% for weekend trips
      week: 0.25,      // 25% for week-long trips
      extended: 0.30,  // 30% max for extended expeditions
    };

    // Experience modifier
    const experienceModifiers: Record<string, number> = {
      beginner: 0.8,
      intermediate: 1.0,
      advanced: 1.15,
    };

    const maxPercent = maxPercentages[tripType] || 0.20;
    const expMod = experienceModifiers[experience] || 1.0;

    const maxPackWeight = weightLbs * maxPercent * expMod;

    // Weight breakdown estimates
    const baseWeight = maxPackWeight * 0.6; // Gear weight
    const consumables = maxPackWeight * 0.4; // Food, water, fuel

    // Weight distribution
    const weightDistribution = [
      { item: "Shelter & Sleep System", percentage: 35, weight: maxPackWeight * 0.35 },
      { item: "Food & Water", percentage: 30, weight: maxPackWeight * 0.30 },
      { item: "Clothing", percentage: 15, weight: maxPackWeight * 0.15 },
      { item: "Cooking & Hydration", percentage: 10, weight: maxPackWeight * 0.10 },
      { item: "Safety & Misc", percentage: 10, weight: maxPackWeight * 0.10 },
    ];

    // Comfort rating
    let comfortRating = "";
    if (maxPercent <= 0.15) {
      comfortRating = "Very Comfortable - Light and fast";
    } else if (maxPercent <= 0.20) {
      comfortRating = "Comfortable - Standard backpacking load";
    } else if (maxPercent <= 0.25) {
      comfortRating = "Moderate - Experienced hikers";
    } else {
      comfortRating = "Challenging - Maximum recommended load";
    }

    // Recommendations
    const recommendations: string[] = [];

    if (experience === "beginner") {
      recommendations.push("🎒 Start with lighter loads to build strength and technique");
      recommendations.push("📦 Rent or borrow gear before buying");
    }

    if (tripType === "day") {
      recommendations.push("☀️ Day hikes: 10% body weight is plenty - water is your heaviest item");
    } else if (tripType === "overnight" || tripType === "weekend") {
      recommendations.push("⛏️ Weekend trips: Focus on lightweight shelter and sleep system");
    } else {
      recommendations.push("📅 Extended trips: Plan resupply points to reduce initial pack weight");
    }

    recommendations.push(`🎯 Target base weight: ${baseWeight.toFixed(1)} ${weightUnit}`);
    recommendations.push(`💧 Consumables (food/water): ${consumables.toFixed(1)} ${weightUnit}`);

    if (maxPackWeight > 40) {
      recommendations.push("⚠️ Pack weight exceeds 40 lbs - consider ultralight gear options");
    }

    setResult({
      bodyWeight: weightLbs,
      tripType,
      maxPackWeight: parseFloat(maxPackWeight.toFixed(1)),
      baseWeight: parseFloat(baseWeight.toFixed(1)),
      consumables: parseFloat(consumables.toFixed(1)),
      comfortRating,
      weightDistribution,
      recommendations,
    });
  };

  const reset = () => {
    setBodyWeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Backpack Load Calculator – Find Your Safe Maximum Pack Weight
          </h1>
          <p className="text-muted-foreground">
            Protect your body on the trail with our Backpack Load Calculator.
            Enter your body weight and trip type to see the maximum recommended
            pack weight based on guidelines from hiking experts — preventing
            injury from overloaded packs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="body-weight">Body Weight</Label>
                  <Input
                    id="body-weight"
                    type="number"
                    value={bodyWeight}
                    onChange={(e) => setBodyWeight(e.target.value)}
                    placeholder="e.g., 150"
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
                <Label htmlFor="trip-type">Trip Type</Label>
                <Select value={tripType} onValueChange={setTripType}>
                  <SelectTrigger id="trip-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day Hike (no overnight gear)</SelectItem>
                    <SelectItem value="overnight">Overnight (1 night)</SelectItem>
                    <SelectItem value="weekend">Weekend (2-3 nights)</SelectItem>
                    <SelectItem value="week">Week-long (4-7 nights)</SelectItem>
                    <SelectItem value="extended">Extended (7+ nights)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select value={experience} onValueChange={setExperience}>
                  <SelectTrigger id="experience">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (first few trips)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (regular hiker)</SelectItem>
                    <SelectItem value="advanced">Advanced (ultralight experienced)</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Pack Weight Recommendations</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.maxPackWeight < 20 ? "bg-green-100 dark:bg-green-900/20" :
                    result.maxPackWeight < 35 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Maximum Pack Weight</p>
                    <p className="text-4xl font-bold">{result.maxPackWeight} {weightUnit}</p>
                    <p className="text-sm mt-1">{result.comfortRating}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Base Weight</p>
                      <p className="text-xl font-bold">{result.baseWeight} {weightUnit}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Consumables</p>
                      <p className="text-xl font-bold">{result.consumables} {weightUnit}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Weight Distribution</h4>
                    <div className="space-y-2">
                      {result.weightDistribution.map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{item.item}</span>
                            <span>{item.weight.toFixed(1)} {weightUnit} ({item.percentage}%)</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
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
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your details and click Calculate to see recommendations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Pack Weight Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Day hikes:</strong> 10% of body weight maximum
                  </li>
                  <li>
                    <strong>Overnight:</strong> 15-20% of body weight
                  </li>
                  <li>
                    <strong>Extended trips:</strong> 20-25% maximum (experienced only)
                  </li>
                  <li>
                    <strong>Never exceed:</strong> 30% of body weight
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> The &quot;Big Three&quot; (shelter, sleep system, pack)
                  account for 60%+ of base weight. Invest in lightweight versions of these
                  items first for the biggest weight savings.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
