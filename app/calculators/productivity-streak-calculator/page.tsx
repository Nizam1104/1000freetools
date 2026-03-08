"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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
                  <div className={`p-4 rounded-lg text-center ${result.currentStreak >= 66 ? "bg-green-100 dark:bg-green-900/20" :
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
                          className={`flex justify-between items-center p-2 rounded ${milestone.achieved
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
                How to Use This Productivity Streak Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your current streak</p>
                    <p>Input the number of consecutive days you have completed your habit or task. This is your current momentum.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Add tracking data</p>
                    <p>Enter your longest streak ever, total days tracked, and days completed to get your consistency rate.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review your analysis</p>
                    <p>See your streak status, milestone progress, and personalized recommendations to keep building momentum.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Key Features of This Streak Tracker
              </h3>
              <div className="space-y-4 text-sm">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-foreground mb-1">Habit Formation Milestones</p>
                  <p className="text-muted-foreground">Track progress through science-backed milestones from 3 days to 365 days of consistency</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-foreground mb-1">Consistency Rate Calculation</p>
                  <p className="text-muted-foreground">See what percentage of days you actually completed your habit — the real measure of commitment</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-foreground mb-1">Personalized Recommendations</p>
                  <p className="text-muted-foreground">Get actionable tips based on your streak length and consistency patterns</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-foreground mb-1">Streak Status Indicators</p>
                  <p className="text-muted-foreground">Visual feedback showing where you are in the habit formation journey</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Habit Formation Science Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Duration</th>
                      <th className="text-left py-3 px-2 font-semibold">Stage</th>
                      <th className="text-left py-3 px-2 font-semibold">What to Expect</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">1-6 days</td>
                      <td className="py-3 px-2">Starting Phase</td>
                      <td className="py-3 px-2">Highest dropout rate — focus on just showing up</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">7-20 days</td>
                      <td className="py-3 px-2">Building Phase</td>
                      <td className="py-3 px-2">Getting easier but still requires conscious effort</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">21-65 days</td>
                      <td className="py-3 px-2">Formation Phase</td>
                      <td className="py-3 px-2">Habit becoming automatic — don't get complacent</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">66+ days</td>
                      <td className="py-3 px-2">Solidified Phase</td>
                      <td className="py-3 px-2">Behavior is now automatic (Lally et al., 2009)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Source: European Journal of Social Psychology — "How habits are formed" (2009)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">How long does it take to form a habit?</h4>
                  <p>
                    Research by Phillippa Lally found it takes an average of 66 days for a behavior to become automatic. The popular 21-day myth comes from Maxwell Maltz's observations, but actual habit formation ranges from 18 to 254 days depending on the person and behavior.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What happens if I miss a day?</h4>
                  <p>
                    Missing one day doesn't reset your progress significantly. The Lally study found that occasional misses didn't impact long-term habit formation. What matters is getting back on track quickly — don't let one miss become two.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I track multiple habits?</h4>
                  <p>
                    Start with one keystone habit first. Once that's solid (66+ days), add another. Trying to change everything at once usually leads to burnout. Stack new habits onto existing ones for better success rates.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Is consistency rate more important than streak length?</h4>
                  <p>
                    Yes. A 90% consistency rate over 100 days (90 completions) is better than a perfect 30-day streak that ended. Consistency rate shows your actual commitment level and predicts long-term success better than current streak.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What's the best time to do a habit?</h4>
                  <p>
                    The best time is whenever you'll actually do it consistently. Morning habits often work well because willpower is highest early. But night owls may prefer evening routines. Attach habits to existing triggers like brushing teeth or making coffee.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
