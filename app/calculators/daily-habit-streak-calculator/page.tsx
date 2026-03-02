"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HabitStreakResult {
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  totalDays: number;
  successRate: number;
  streakStatus: string;
  milestones: Array<{ days: number; achieved: boolean; label: string }>;
  recommendations: string[];
}

export default function DailyHabitStreakCalculatorPage() {
  const [currentStreak, setCurrentStreak] = useState<string>("");
  const [longestStreak, setLongestStreak] = useState<string>("");
  const [totalCompletions, setTotalCompletions] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [result, setResult] = useState<HabitStreakResult | null>(null);

  const calculate = () => {
    const currentNum = parseInt(currentStreak) || 0;
    const longestNum = parseInt(longestStreak) || currentNum;
    const completionsNum = parseInt(totalCompletions) || 0;

    // Calculate total days since start
    const start = new Date(startDate);
    const today = new Date();
    const totalDays = startDate ? Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1 : completionsNum;

    // Success rate
    const successRate = totalDays > 0 ? (completionsNum / totalDays) * 100 : 0;

    // Streak status
    let streakStatus = "";
    if (currentNum >= 66) {
      streakStatus = "🎉 Habit formed! This behavior is now automatic";
    } else if (currentNum >= 30) {
      streakStatus = "🔥 Strong momentum! You're building a lasting habit";
    } else if (currentNum >= 14) {
      streakStatus = "💪 Great progress! Keep going";
    } else if (currentNum >= 7) {
      streakStatus = "📈 Good start! The first week is hardest";
    } else if (currentNum >= 3) {
      streakStatus = "🌱 Building momentum! Don't break the chain";
    } else if (currentNum >= 1) {
      streakStatus = "✨ You've started! Consistency is key";
    } else {
      streakStatus = "🚀 Ready to start? Today is day 1!";
    }

    // Milestones
    const milestones = [
      { days: 3, achieved: currentNum >= 3, label: "3 Days - First milestone" },
      { days: 7, achieved: currentNum >= 7, label: "1 Week - Weekly champion" },
      { days: 14, achieved: currentNum >= 14, label: "2 Weeks - Half month" },
      { days: 21, achieved: currentNum >= 21, label: "21 Days - Habit formation begins" },
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

    if (successRate < 50 && completionsNum > 10) {
      recommendations.push("⚠️ Your success rate is low. Consider making the habit easier.");
    }

    setResult({
      currentStreak: currentNum,
      longestStreak: Math.max(currentNum, longestNum),
      totalCompletions: completionsNum,
      totalDays,
      successRate: parseFloat(successRate.toFixed(1)),
      streakStatus,
      milestones,
      recommendations,
    });
  };

  const reset = () => {
    setCurrentStreak("");
    setLongestStreak("");
    setTotalCompletions("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Daily Habit Streak Calculator – Track & Build Your Daily Habit Streaks
          </h1>
          <p className="text-muted-foreground">
            Build lasting habits with our Daily Habit Streak Calculator.
            Log your habit completions to track your current streak, longest streak,
            and overall success rate — using positive reinforcement to keep you
            consistent and motivated.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-streak">Current Streak (days)</Label>
                <Input
                  id="current-streak"
                  type="number"
                  value={currentStreak}
                  onChange={(e) => setCurrentStreak(e.target.value)}
                  placeholder="e.g., 15"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longest-streak">Longest Streak (days)</Label>
                <Input
                  id="longest-streak"
                  type="number"
                  value={longestStreak}
                  onChange={(e) => setLongestStreak(e.target.value)}
                  placeholder="e.g., 30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="completions">Total Completions</Label>
                <Input
                  id="completions"
                  type="number"
                  value={totalCompletions}
                  onChange={(e) => setTotalCompletions(e.target.value)}
                  placeholder="e.g., 50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="start-date">Habit Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
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
              <h3 className="text-lg font-semibold mb-4">Habit Progress</h3>
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
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Longest</p>
                      <p className="text-xl font-bold">{result.longestStreak}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Total</p>
                      <p className="text-xl font-bold">{result.totalCompletions}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Success</p>
                      <p className="text-xl font-bold">{result.successRate}%</p>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-center font-medium">{result.streakStatus}</p>
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
                  <p>Enter your habit data and click Calculate to see progress</p>
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
                    <strong>18-254 days:</strong> Actual range depending on person
                    and habit complexity
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
