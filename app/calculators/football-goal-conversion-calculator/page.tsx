"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FootballResult {
  goals: number;
  shots: number;
  conversionRate: number;
  shotsPerGoal: number;
  rating: string;
  comparison: string;
  recommendations: string[];
}

export default function FootballGoalConversionCalculatorPage() {
  const [goals, setGoals] = useState<string>("");
  const [shots, setShots] = useState<string>("");
  const [shotsOnTarget, setShotsOnTarget] = useState<string>("");
  const [result, setResult] = useState<FootballResult | null>(null);

  const calculate = () => {
    const goalsNum = parseInt(goals) || 0;
    const shotsNum = parseInt(shots) || 0;
    const shotsOnTargetNum = parseInt(shotsOnTarget) || 0;

    if (goalsNum === 0 || shotsNum === 0) return;

    // Conversion rate = (Goals / Shots) × 100
    const conversionRate = (goalsNum / shotsNum) * 100;

    // Shots per goal
    const shotsPerGoal = shotsNum / goalsNum;

    // Rating based on conversion rate
    let rating = "";
    let comparison = "";
    const recommendations: string[] = [];

    if (conversionRate >= 25) {
      rating = "World Class";
      comparison = "Better than elite strikers like Haaland, Kane";
      recommendations.push("🌟 Exceptional finishing! Maintain your technique.");
    } else if (conversionRate >= 20) {
      rating = "Excellent";
      comparison = "Top-tier striker level (Mbappé, Lewandowski)";
      recommendations.push("✅ Elite conversion rate. Keep up the work!");
    } else if (conversionRate >= 15) {
      rating = "Very Good";
      comparison = "Professional league average for strikers";
      recommendations.push("👍 Solid finishing. Work on shot selection.");
    } else if (conversionRate >= 10) {
      rating = "Average";
      comparison = "Typical for midfielders and wingers";
      recommendations.push("📈 Focus on shot placement over power.");
      recommendations.push("🎯 Take more shots on target.");
    } else if (conversionRate >= 5) {
      rating = "Below Average";
      comparison = "Needs improvement for competitive play";
      recommendations.push("📚 Work on finishing drills in training.");
      recommendations.push("👀 Improve decision-making in the box.");
    } else {
      rating = "Poor";
      comparison = "Significant room for improvement";
      recommendations.push("🎯 Practice basic finishing techniques.");
      recommendations.push("⚽ Consider shot selection coaching.");
    }

    // Add shot accuracy if provided
    if (shotsOnTargetNum > 0) {
      const accuracy = (shotsOnTargetNum / shotsNum) * 100;
      recommendations.push(`📊 Shot accuracy: ${accuracy.toFixed(1)}% (${shotsOnTargetNum}/${shotsNum} on target)`);
      
      if (accuracy < 40) {
        recommendations.push("💡 Work on shooting accuracy before power.");
      }
    }

    setResult({
      goals: goalsNum,
      shots: shotsNum,
      conversionRate: parseFloat(conversionRate.toFixed(1)),
      shotsPerGoal: parseFloat(shotsPerGoal.toFixed(1)),
      rating,
      comparison,
      recommendations,
    });
  };

  const reset = () => {
    setGoals("");
    setShots("");
    setShotsOnTarget("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Football Goal Conversion Rate Calculator – Measure Shooting Efficiency
          </h1>
          <p className="text-muted-foreground">
            Assess a striker&apos;s clinical finishing with our Football Goal Conversion Calculator.
            Enter total goals scored and shots attempted to calculate goal conversion rate —
            a vital metric for evaluating attacking effectiveness in football/soccer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="goals">Goals Scored</Label>
                  <Input
                    id="goals"
                    type="number"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="e.g., 20"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="shots">Total Shots</Label>
                  <Input
                    id="shots"
                    type="number"
                    value={shots}
                    onChange={(e) => setShots(e.target.value)}
                    placeholder="e.g., 100"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="shots-on-target">Shots on Target (optional)</Label>
                <Input
                  id="shots-on-target"
                  type="number"
                  value={shotsOnTarget}
                  onChange={(e) => setShotsOnTarget(e.target.value)}
                  placeholder="e.g., 50"
                />
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Pro Reference (2023/24 Season):
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Haaland: ~25% conversion</li>
                  <li>• Kane: ~22% conversion</li>
                  <li>• Salah: ~18% conversion</li>
                  <li>• League avg: ~12% conversion</li>
                </ul>
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
              <h3 className="text-lg font-semibold mb-4">Conversion Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.conversionRate >= 20 ? "bg-green-100 dark:bg-green-900/20" :
                    result.conversionRate >= 15 ? "bg-blue-100 dark:bg-blue-900/20" :
                    result.conversionRate >= 10 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-5xl font-bold">{result.conversionRate}%</p>
                    <p className="text-sm mt-1 font-medium">{result.rating}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Shots per Goal</p>
                      <p className="text-2xl font-bold">{result.shotsPerGoal}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Goals/Shots</p>
                      <p className="text-2xl font-bold">{result.goals}/{result.shots}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">Comparison</p>
                    <p className="text-sm text-muted-foreground">{result.comparison}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Analysis & Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Formula:</strong> Conversion Rate = (Goals ÷ Shots) × 100
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter goals and shots to calculate conversion rate</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Conversion Rates
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Goal conversion rate measures shooting efficiency:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>25%+:</strong> World-class elite striker
                  </li>
                  <li>
                    <strong>20-25%:</strong> Top professional level
                  </li>
                  <li>
                    <strong>15-20%:</strong> Good professional striker
                  </li>
                  <li>
                    <strong>10-15%:</strong> Average (typical for midfielders)
                  </li>
                  <li>
                    <strong>&lt;10%:</strong> Needs improvement
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Conversion rates vary by position. Strikers
                  typically have higher rates than midfielders who shoot from distance.
                  Context matters — penalty box shots vs. long-range efforts.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
