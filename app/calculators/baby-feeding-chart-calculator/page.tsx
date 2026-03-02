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

interface FeedingResult {
  age: number;
  weight: number;
  feedingType: string;
  feedsPerDay: number;
  volumePerFeed: string;
  dailyTotal: string;
  milestones: string[];
  recommendations: string[];
}

export default function BabyFeedingChartCalculatorPage() {
  const [babyAge, setBabyAge] = useState<string>("");
  const [babyWeight, setBabyWeight] = useState<string>("");
  const [feedingType, setFeedingType] = useState<string>("breast");
  const [result, setResult] = useState<FeedingResult | null>(null);

  const calculate = () => {
    const ageMonths = parseFloat(babyAge) || 0;
    const weightNum = parseFloat(babyWeight) || 0;

    if (ageMonths === 0) return;

    let feedsPerDay = 0;
    let volumePerFeed = "";
    let dailyTotal = "";
    const milestones: string[] = [];
    const recommendations: string[] = [];

    // Age-based recommendations
    if (ageMonths < 0.5) { // 0-2 weeks
      feedsPerDay = 10;
      volumePerFeed = "30-60 ml (1-2 oz)";
      dailyTotal = "300-600 ml (10-20 oz)";
      milestones.push("Feed on demand, 8-12 times per 24 hours");
      milestones.push("Watch for hunger cues: rooting, hand-to-mouth");
      recommendations.push("🍼 Newborns need frequent, small feeds");
      recommendations.push("⚠️ Minimum 6 wet diapers per day");
    } else if (ageMonths < 1) { // 2 weeks - 1 month
      feedsPerDay = 8;
      volumePerFeed = "60-90 ml (2-3 oz)";
      dailyTotal = "480-720 ml (16-24 oz)";
      milestones.push("Establishing feeding routine");
      milestones.push("May start sleeping longer stretches at night");
      recommendations.push("📈 Weight gain: 20-35g per day expected");
      recommendations.push("💤 May go 3-4 hours between feeds");
    } else if (ageMonths < 3) { // 1-3 months
      feedsPerDay = 7;
      volumePerFeed = "90-120 ml (3-4 oz)";
      dailyTotal = "630-840 ml (21-28 oz)";
      milestones.push("More alert during feeds");
      milestones.push("May drop night feeds");
      recommendations.push("📊 Total daily: ~150-200ml per kg body weight");
      recommendations.push("😴 Some babies sleep through the night");
    } else if (ageMonths < 6) { // 3-6 months
      feedsPerDay = 6;
      volumePerFeed = "120-180 ml (4-6 oz)";
      dailyTotal = "720-1080 ml (24-36 oz)";
      milestones.push("Solid foods NOT recommended before 6 months");
      milestones.push("Exclusive breast milk or formula only");
      recommendations.push("🚫 No solids before 6 months (AAP guideline)");
      recommendations.push("💧 No water needed before 6 months");
    } else if (ageMonths < 9) { // 6-9 months
      feedsPerDay = 5;
      volumePerFeed = "180-240 ml (6-8 oz)";
      dailyTotal = "900-1200 ml (30-40 oz)";
      milestones.push("Start solids: iron-fortified cereals first");
      milestones.push("Introduce one new food every 3-5 days");
      recommendations.push("🥄 Start with single-grain cereals");
      recommendations.push("🥕 Introduce vegetables before fruits");
    } else if (ageMonths < 12) { // 9-12 months
      feedsPerDay = 4;
      volumePerFeed = "240 ml (8 oz)";
      dailyTotal = "720-960 ml (24-32 oz)";
      milestones.push("Three meals + 2 snacks daily");
      milestones.push("Self-feeding with fingers");
      recommendations.push("🍽️ Family foods (mashed, cut small)");
      recommendations.push("🥛 Whole milk can start at 12 months");
    } else { // 12+ months
      feedsPerDay = 3;
      volumePerFeed = "240 ml (8 oz) milk + meals";
      dailyTotal = "480-720 ml (16-24 oz) milk + solid food";
      milestones.push("Transition to whole cow's milk");
      milestones.push("Full family diet (modified for safety)");
      recommendations.push("🥛 Limit milk to 16-24 oz to ensure solid food intake");
      recommendations.push("🚫 No honey before 12 months (botulism risk)");
    }

    // Weight-based adjustment for formula
    if (weightNum > 0 && feedingType === "formula") {
      const dailyMl = weightNum * 150; // 150ml per kg
      recommendations.push(`⚖️ Based on weight: ~${dailyMl} ml/day`);
    }

    setResult({
      age: ageMonths,
      weight: weightNum,
      feedingType,
      feedsPerDay,
      volumePerFeed,
      dailyTotal,
      milestones,
      recommendations,
    });
  };

  const reset = () => {
    setBabyAge("");
    setBabyWeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Baby Feeding Chart Calculator – How Much & How Often to Feed Your Baby
          </h1>
          <p className="text-muted-foreground">
            Navigate the early months of feeding with our Baby Feeding Chart Calculator.
            Enter your baby&apos;s age and weight to get recommended feeding frequency,
            milk volume per feed, and solid food introduction milestones — backed by
            pediatric guidelines.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="baby-age">Baby&apos;s Age</Label>
                <div className="flex gap-2">
                  <Input
                    id="baby-age"
                    type="number"
                    step="0.5"
                    value={babyAge}
                    onChange={(e) => setBabyAge(e.target.value)}
                    placeholder="e.g., 3"
                    className="flex-1"
                  />
                  <span className="flex items-center text-muted-foreground">months</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="baby-weight">Baby&apos;s Weight (kg)</Label>
                <Input
                  id="baby-weight"
                  type="number"
                  step="0.1"
                  value={babyWeight}
                  onChange={(e) => setBabyWeight(e.target.value)}
                  placeholder="e.g., 5.5"
                />
                <p className="text-xs text-muted-foreground">Optional - for formula calculations</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feeding-type">Feeding Type</Label>
                <Select value={feedingType} onValueChange={setFeedingType}>
                  <SelectTrigger id="feeding-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breast">Breastfeeding</SelectItem>
                    <SelectItem value="formula">Formula</SelectItem>
                    <SelectItem value="mixed">Mixed/Combination</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Feeding Recommendations</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Feeds Per Day</p>
                    <p className="text-4xl font-bold text-primary">{result.feedsPerDay}</p>
                    <p className="text-sm mt-1">
                      {result.volumePerFeed} per feed
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Daily Total:</span>
                      <span className="font-semibold">{result.dailyTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Feeding Type:</span>
                      <span className="font-semibold capitalize">{result.feedingType}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Developmental Milestones</h4>
                    <ul className="space-y-1">
                      {result.milestones.map((m, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
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
                  <p>Enter baby&apos;s details and click Calculate to see recommendations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Feeding Guidelines by Age
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>0-6 months:</strong> Exclusive breast milk or formula
                  </li>
                  <li>
                    <strong>6 months:</strong> Introduce iron-fortified solids
                  </li>
                  <li>
                    <strong>6-12 months:</strong> Gradually increase solids, milk remains primary
                  </li>
                  <li>
                    <strong>12+ months:</strong> Transition to whole milk, family foods
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Every baby is different. These are general
                  guidelines. Always consult your pediatrician for personalized advice,
                  especially for premature babies or those with special needs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
