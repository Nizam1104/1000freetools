"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductivityResult {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  completedDays: number;
  consistencyRate: number;
  streakStatus: string;
  milestones: Array<{ days: number; achieved: boolean; label: string }>;
  recommendations: string[];
}

export default function ProductivityStreakCalculatorPage() {
  const [currentStreak, setCurrentStreak] = useState<string>("");
  const [longestStreak, setLongestStreak] = useState<string>("");
  const [totalDays, setTotalDays] = useState<string>("");
  const [completedDays, setCompletedDays] = useState<string>("");
  const [result, setResult] = useState<ProductivityResult | null>(null);

  const calculate = () => {
    const currentNum = parseInt(currentStreak) || 0;
    const longestNum = parseInt(longestStreak) || currentNum;
    const totalNum = parseInt(totalDays) || 0;
    const completedNum = parseInt(completedDays) || 0;

    // Consistency rate
    const consistencyRate = totalNum > 0 ? (completedNum / totalNum) * 100 : 0;

    // Streak status
    let streakStatus = "";
    if (currentNum >= 66) {
      streakStatus = "🎉 Habit formed! This behavior is now automatic";
    } else if (currentNum >= 30) {
      streakStatus = "🔥 Strong momentum! You're building a lasting habit";
    } else if (currentNum >= 21) {
      streakStatus = "💪 Great progress! Traditional habit formation milestone";
    } else if (currentNum >= 14) {
      streakStatus = "📈 Good progress! Keep building momentum";
    } else if (currentNum >= 7) {
      streakStatus = "🌱 First week complete! The hardest part is starting";
    } else if (currentNum >= 3) {
      streakStatus = "✨ You've started! Consistency is key";
    } else if (currentNum >= 1) {
      streakStatus = "🚀 First day done! Build on this momentum";
    } else {
      streakStatus = "📅 Ready to start? Today is day 1!";
    }

    // Milestones
    const milestones = [
      { days: 3, achieved: currentNum >= 3, label: "3 Days - First milestone" },
      { days: 7, achieved: currentNum >= 7, label: "1 Week - Weekly champion" },
      { days: 14, achieved: currentNum >= 14, label: "2 Weeks - Half month" },
      { days: 21, achieved: currentNum >= 21, label: "21 Days - Habit formation" },
      { days: 30, achieved: currentNum >= 30, label: "30 Days - Monthly master" },
      { days: 66, achieved: currentNum >= 66, label: "66 Days - Habit solidified" },
      { days: 100, achieved: currentNum >= 100, label: "100 Days - Century club" },
      { days: 365, achieved: currentNum >= 365, label: "365 Days - Year of consistency" },
    ];

    // Recommendations
    const recommendations: string[] = [];

    if (currentNum === 0) {
      recommendations.push("🎯 Start small - commit to just 2 minutes daily");
      recommendations.push("📅 Attach your habit to an existing routine");
      recommendations.push("📝 Track your progress visibly");
    } else if (currentNum < 7) {
      recommendations.push("💪 Focus on consistency over perfection");
      recommendations.push("⏰ Do your habit at the same time each day");
      recommendations.push("🎉 Celebrate small wins");
    } else if (currentNum < 30) {
      recommendations.push("🔗 Stack habits together for efficiency");
      recommendations.push("👥 Share your progress with an accountability partner");
      recommendations.push("📊 Review your progress weekly");
    } else {
      recommendations.push("🏆 You're an expert! Consider mentoring others");
      recommendations.push("🎯 Set a new challenge or increase difficulty");
      recommendations.push("📈 Track additional metrics for optimization");
    }

    if (consistencyRate < 50 && totalNum > 14) {
      recommendations.push("⚠️ Your consistency rate is low. Consider making the habit easier.");
      recommendations.push("📉 Reduce the habit to its smallest form and rebuild.");
    } else if (consistencyRate >= 80) {
      recommendations.push("✅ Excellent consistency! You're building lasting change.");
    }

    recommendations.push(`📊 Consistency rate: ${consistencyRate.toFixed(1)}%`);

    setResult({
      currentStreak: currentNum,
      longestStreak: Math.max(currentNum, longestNum),
      totalDays: totalNum,
      completedDays: completedNum,
      consistencyRate: parseFloat(consistencyRate.toFixed(1)),
      streakStatus,
      milestones,
      recommendations,
    });
  };

  const reset = () => {
    setCurrentStreak("");
    setLongestStreak("");
    setTotalDays("");
    setCompletedDays("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Productivity Streak Calculator – Track Your Daily Productivity Streaks & Consistency
          </h1>
          <p className="text-muted-foreground">
            Stay motivated and consistent with our Productivity Streak Calculator.
            Track your daily task completion, calculate your current streak length,
            and monitor your consistency rate to build powerful productive habits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="current-streak">Current Streak (days)</Label>
                  <Input
                    id="current-streak"
                    type="number"
                    value={currentStreak}
                    onChange={(e) => setCurrentStreak(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="longest-streak">Longest Streak (days)</Label>
                  <Input
                    id="longest-streak"
                    type="number"
                    value={longestStreak}
                    onChange={(e) => setLongestStreak(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="total-days">Total Days Tracked</Label>
                  <Input
                    id="total-days"
                    type="number"
                    value={totalDays}
                    onChange={(e) => setTotalDays(e.target.value)}
                    placeholder="30"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="completed-days">Days Completed</Label>
                  <Input
                    id="completed-days"
                    type="number"
                    value={completedDays}
                    onChange={(e) => setCompletedDays(e.target.value)}
                    placeholder="25"
                  />
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
              <h3 className="text-lg font-semibold mb-4">Streak Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.currentStreak >= 66 ? "bg-green-100 dark:bg-green-900/20" :
                    result.currentStreak >= 30 ? "bg-blue-100 dark:bg-blue-900/20" :
                    result.currentStreak >= 14 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-muted"
                  }`}>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                    <p className="text-5xl font-bold">{result.currentStreak}</p>
                    <p className="text-sm mt-1">days</p>
                    <p className="text-sm mt-2">{result.streakStatus}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Longest</p>
                      <p className="text-lg font-bold">{result.longestStreak}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Completed</p>
                      <p className="text-lg font-bold">{result.completedDays}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Consistency</p>
                      <p className="text-lg font-bold">{result.consistencyRate}%</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Milestones</h4>
                    <div className="space-y-2">
                      {result.milestones.map((milestone, i) => (
                        <div
                          key={i}
                          className={`flex justify-between items-center p-2 rounded ${
                            milestone.achieved
                              ? "bg-green-100 dark:bg-green-900/20"
                              : "bg-muted/50"
                          }`}
                        >
                          <span className={`text-sm ${milestone.achieved ? "text-green-700 dark:text-green-300" : "text-muted-foreground"}`}>
                            {milestone.achieved ? "✓" : "○"} {milestone.label}
                          </span>
                          <span className={`text-sm font-medium ${milestone.achieved ? "text-green-700 dark:text-green-300" : "text-muted-foreground"}`}>
                            {milestone.days} days
                          </span>
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
                  <p>Enter your streak data and click Calculate to see analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Habit Formation Science
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>21 days:</strong> Traditional habit formation myth
                  </li>
                  <li>
                    <strong>66 days:</strong> Average time for automatic behavior
                    (Lally et al., 2009)
                  </li>
                  <li>
                    <strong>Consistency:</strong> More important than intensity
                  </li>
                  <li>
                    <strong>Missing one day:</strong> Doesn&apos;t significantly impact
                    habit formation
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Start with &quot;tiny habits&quot; - make your new
                  habit so small you can&apos;t say no. Consistency beats intensity!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
