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

interface DiaperResult {
  age: number;
  diapersPerDay: number;
  diapersPerMonth: number;
  diapersPerYear: number;
  costPerMonth: number;
  costPerYear: number;
  totalCostToPottyTrain: number;
  breakdown: Array<{ age: string; perDay: number; description: string }>;
  recommendations: string[];
}

export default function DiaperUsageEstimatorPage() {
  const [babyAge, setBabyAge] = useState<string>("");
  const [diapersPerDay, setDiapersPerDay] = useState<string>("");
  const [costPerDiaper, setCostPerDiaper] = useState<string>("0.25");
  const [result, setResult] = useState<DiaperResult | null>(null);

  const calculate = () => {
    const ageMonths = parseFloat(babyAge) || 0;
    let diapersPerDayNum = parseFloat(diapersPerDay) || 0;
    const costNum = parseFloat(costPerDiaper) || 0.25;

    if (ageMonths === 0 && diapersPerDayNum === 0) return;

    // If diapers per day not entered, estimate from age
    if (diapersPerDayNum === 0) {
      if (ageMonths < 1) {
        diapersPerDayNum = 12;
      } else if (ageMonths < 6) {
        diapersPerDayNum = 10;
      } else if (ageMonths < 12) {
        diapersPerDayNum = 8;
      } else if (ageMonths < 24) {
        diapersPerDayNum = 6;
      } else if (ageMonths < 36) {
        diapersPerDayNum = 5;
      } else {
        diapersPerDayNum = 4;
      }
    }

    const diapersPerMonth = diapersPerDayNum * 30;
    const diapersPerYear = diapersPerDayNum * 365;
    const costPerMonth = diapersPerMonth * costNum;
    const costPerYear = diapersPerYear * costNum;

    // Estimate total cost to potty training (assume 30 months average)
    const remainingMonths = Math.max(0, 30 - ageMonths);
    let totalDiapers = 0;
    
    for (let month = ageMonths; month < 30; month++) {
      let dailyRate = 12;
      if (month >= 1 && month < 6) dailyRate = 10;
      else if (month >= 6 && month < 12) dailyRate = 8;
      else if (month >= 12 && month < 24) dailyRate = 6;
      else if (month >= 24 && month < 30) dailyRate = 5;
      totalDiapers += dailyRate * 30;
    }
    
    const totalCostToPottyTrain = totalDiapers * costNum;

    // Age-based breakdown
    const breakdown = [
      { age: "0-1 month", perDay: 12, description: "Newborn - frequent changes" },
      { age: "1-6 months", perDay: 10, description: "Infant - still very frequent" },
      { age: "6-12 months", perDay: 8, description: "Solid foods begin" },
      { age: "1-2 years", perDay: 6, description: "Toddler - fewer changes" },
      { age: "2-3 years", perDay: 5, description: "Potty training begins" },
    ];

    // Recommendations
    const recommendations: string[] = [];

    if (ageMonths < 6) {
      recommendations.push("👶 Newborn stage - expect 10-12 diapers daily");
      recommendations.push("💡 Consider subscription delivery for convenience");
    } else if (ageMonths < 12) {
      recommendations.push("🍼 Starting solids may change diaper patterns");
      recommendations.push("💰 Bulk buying can save 20-30%");
    } else if (ageMonths < 24) {
      recommendations.push("🚶 Toddler mobility may make changes challenging");
      recommendations.push("📦 Consider cloth diapers for cost savings");
    } else {
      recommendations.push("🎯 Potty training may begin soon");
      recommendations.push("💡 Pull-ups can help transition to underwear");
    }

    recommendations.push(`💵 At ${costNum.toFixed(2)}/diaper, you're spending $${costPerMonth.toFixed(0)}/month`);
    
    if (costNum > 0.35) {
      recommendations.push("⚠️ Your cost per diaper is above average. Consider bulk buying or store brands.");
    }

    setResult({
      age: ageMonths,
      diapersPerDay: diapersPerDayNum,
      diapersPerMonth: Math.round(diapersPerMonth),
      diapersPerYear: Math.round(diapersPerYear),
      costPerMonth: parseFloat(costPerMonth.toFixed(2)),
      costPerYear: parseFloat(costPerYear.toFixed(2)),
      totalCostToPottyTrain: parseFloat(totalCostToPottyTrain.toFixed(2)),
      breakdown,
      recommendations,
    });
  };

  const reset = () => {
    setBabyAge("");
    setDiapersPerDay("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Diaper Usage Estimator – Calculate Monthly Diaper Costs for Your Baby
          </h1>
          <p className="text-muted-foreground">
            Budget for baby with our Diaper Usage Estimator. Enter your baby&apos;s age
            and diaper usage to calculate monthly usage and total diaper expenses —
            helping new parents plan their budgets confidently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="baby-age">Baby&apos;s Age (months)</Label>
                <Input
                  id="baby-age"
                  type="number"
                  step="0.5"
                  value={babyAge}
                  onChange={(e) => setBabyAge(e.target.value)}
                  placeholder="e.g., 6"
                />
                <p className="text-xs text-muted-foreground">
                  Leave blank if you want to estimate from age
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diapers-per-day">Diapers Per Day</Label>
                <Input
                  id="diapers-per-day"
                  type="number"
                  value={diapersPerDay}
                  onChange={(e) => setDiapersPerDay(e.target.value)}
                  placeholder="Auto-calculated from age"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost-per-diaper">Cost Per Diaper ($)</Label>
                <Input
                  id="cost-per-diaper"
                  type="number"
                  step="0.01"
                  value={costPerDiaper}
                  onChange={(e) => setCostPerDiaper(e.target.value)}
                  placeholder="0.25"
                />
                <p className="text-xs text-muted-foreground">
                  Average: $0.20-0.35 for disposables
                </p>
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
              <h3 className="text-lg font-semibold mb-4">Diaper Cost Estimate</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Per Month</p>
                      <p className="text-2xl font-bold text-primary">{result.diapersPerMonth}</p>
                      <p className="text-sm text-muted-foreground">${result.costPerMonth}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Per Year</p>
                      <p className="text-2xl font-bold text-primary">{result.diapersPerYear}</p>
                      <p className="text-sm text-muted-foreground">${result.costPerYear}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg text-center">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Estimated Total to Potty Training
                    </p>
                    <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                      ${result.totalCostToPottyTrain}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      (~{Math.round(result.totalCostToPottyTrain / result.costPerMonth)} months at current rate)
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Usage by Age</h4>
                    <div className="space-y-1">
                      {result.breakdown.map((item, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <div>
                            <span className="font-medium">{item.age}</span>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                          <span className="font-mono">{item.perDay}/day</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Money-Saving Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter baby&apos;s details and click Calculate to see estimates</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Diaper Cost Comparison
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Disposable diapers:</strong> $0.20-0.40 per diaper
                  </li>
                  <li>
                    <strong>Cloth diapers:</strong> $200-500 initial + laundry costs
                  </li>
                  <li>
                    <strong>Hybrid approach:</strong> Cloth at home, disposables out
                  </li>
                  <li>
                    <strong>Average total cost:</strong> $2,000-3,000 to potty training
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Sign up for diaper subscription services for
                  15-20% savings. Buy in bulk during sales and stock up.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
