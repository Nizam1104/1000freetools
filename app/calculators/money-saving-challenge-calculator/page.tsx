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

interface SavingChallengeResult {
  challengeType: string;
  duration: number;
  totalSaved: number;
  weeklyAverage: number;
  finalWeek: number;
  milestones: Array<{ week: number; saved: number; total: number }>;
  recommendations: string[];
}

export default function MoneySavingChallengeCalculatorPage() {
  const [challengeType, setChallengeType] = useState<string>("52week");
  const [startAmount, setStartAmount] = useState<string>("1");
  const [increment, setIncrement] = useState<string>("1");
  const [duration, setDuration] = useState<string>("52");
  const [result, setResult] = useState<SavingChallengeResult | null>(null);

  const calculate = () => {
    const startNum = parseFloat(startAmount) || 1;
    const incrementNum = parseFloat(increment) || 1;
    const durationNum = parseInt(duration) || 52;

    // Calculate total using arithmetic sequence sum formula
    // Sum = n/2 × (2a + (n-1)d) where a=start, d=increment, n=weeks
    const totalSaved = (durationNum / 2) * (2 * startNum + (durationNum - 1) * incrementNum);
    
    // Weekly average
    const weeklyAverage = totalSaved / durationNum;

    // Final week amount
    const finalWeek = startNum + (durationNum - 1) * incrementNum;

    // Generate milestones
    const milestones = [];
    const milestoneWeeks = [Math.floor(durationNum * 0.25), Math.floor(durationNum * 0.5), Math.floor(durationNum * 0.75), durationNum];
    
    for (const week of milestoneWeeks) {
      const weekAmount = startNum + (week - 1) * incrementNum;
      const weekTotal = (week / 2) * (2 * startNum + (week - 1) * incrementNum);
      milestones.push({
        week,
        saved: parseFloat(weekAmount.toFixed(2)),
        total: parseFloat(weekTotal.toFixed(2)),
      });
    }

    // Recommendations
    const recommendations: string[] = [];

    if (challengeType === "52week") {
      recommendations.push("📅 Week 1-13: Build the habit with smaller amounts");
      recommendations.push("💰 Week 14-26: Increase savings, consider auto-transfer");
      recommendations.push("🎯 Week 27-39: You're halfway! Stay motivated");
      recommendations.push("🏆 Week 40-52: Final stretch - you've got this!");
    }

    if (totalSaved < 1000) {
      recommendations.push("💡 Consider increasing increment for bigger impact");
    } else if (totalSaved >= 1000 && totalSaved < 5000) {
      recommendations.push("✅ Great savings! Consider high-yield savings account");
    } else {
      recommendations.push("🌟 Excellent! Consider splitting between savings and investments");
    }

    recommendations.push(`💵 Average weekly: $${weeklyAverage.toFixed(2)}`);
    recommendations.push(`📈 Final week deposit: $${finalWeek.toFixed(2)}`);

    setResult({
      challengeType,
      duration: durationNum,
      totalSaved: parseFloat(totalSaved.toFixed(2)),
      weeklyAverage: parseFloat(weeklyAverage.toFixed(2)),
      finalWeek: parseFloat(finalWeek.toFixed(2)),
      milestones,
      recommendations,
    });
  };

  const reset = () => {
    setStartAmount("1");
    setIncrement("1");
    setDuration("52");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Money-Saving Challenge Calculator – Track Your 52-Week or Custom Savings Challenge
          </h1>
          <p className="text-muted-foreground">
            Make saving money fun with our Money-Saving Challenge Calculator.
            Track weekly deposits for the 52-week challenge or create a custom
            savings plan, and see your projected total savings grow week by week.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="challenge-type">Challenge Type</Label>
                <Select value={challengeType} onValueChange={setChallengeType}>
                  <SelectTrigger id="challenge-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="52week">52-Week Challenge ($1-52)</SelectItem>
                    <SelectItem value="reverse">Reverse 52-Week ($52-1)</SelectItem>
                    <SelectItem value="penny">Penny-a-Day Challenge</SelectItem>
                    <SelectItem value="custom">Custom Challenge</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {challengeType === "custom" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="start">Starting Amount ($)</Label>
                    <Input
                      id="start"
                      type="number"
                      step="0.01"
                      value={startAmount}
                      onChange={(e) => setStartAmount(e.target.value)}
                      placeholder="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="increment">Weekly Increment ($)</Label>
                    <Input
                      id="increment"
                      type="number"
                      step="0.01"
                      value={increment}
                      onChange={(e) => setIncrement(e.target.value)}
                      placeholder="1"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (weeks)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="52"
                />
              </div>

              {challengeType === "52week" && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    Classic challenge: Save $1 week 1, $2 week 2, up to $52 week 52
                  </p>
                </div>
              )}

              {challengeType === "reverse" && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    Reverse challenge: Start with $52, end with $1 (easier finish!)
                  </p>
                </div>
              )}

              {challengeType === "penny" && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    Penny challenge: Day 1 = 1¢, Day 365 = $3.65
                  </p>
                </div>
              )}

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
              <h3 className="text-lg font-semibold mb-4">Savings Projection</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Total Saved</p>
                    <p className="text-5xl font-bold text-green-700 dark:text-green-300">
                      ${result.totalSaved}
                    </p>
                    <p className="text-sm mt-1">over {result.duration} weeks</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Weekly Average</p>
                      <p className="text-xl font-bold">${result.weeklyAverage}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Final Week</p>
                      <p className="text-xl font-bold">${result.finalWeek}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Milestones</h4>
                    <div className="space-y-2">
                      {result.milestones.map((m, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded">
                          <span>Week {m.week}</span>
                          <span className="font-semibold">${m.total}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Select a challenge and click Calculate to see projection</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Saving Challenge Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Auto-transfer:</strong> Set up automatic transfers to savings
                  </li>
                  <li>
                    <strong>High-yield account:</strong> Earn interest while you save
                  </li>
                  <li>
                    <strong>Track progress:</strong> Use a chart or app to stay motivated
                  </li>
                  <li>
                    <strong>Windfalls:</strong> Add bonuses, tax refunds to accelerate
                  </li>
                </ul>
                <p>
                  <strong>Formula:</strong> Sum = n/2 × (2a + (n-1)d)
                  <br />where a = start amount, d = increment, n = weeks
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
