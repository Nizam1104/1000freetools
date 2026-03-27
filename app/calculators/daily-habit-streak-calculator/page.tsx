"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


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
                  <div className={`p-4 rounded-lg text-center ${result.currentStreak >= 66 ? "bg-green-100 dark:bg-green-900/20" :
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
                How to Use This Habit Streak Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your current streak</p>
                    <p>Input how many consecutive days you&apos;ve completed your habit. This is your &quot;don&apos;t break the chain&quot; count.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Add your longest streak and total completions</p>
                    <p>These help track your progress over time. Total completions shows how many days you&apos;ve succeeded, even if not consecutive.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set your start date and calculate</p>
                    <p>The calculator computes your success rate, shows milestone progress, and gives personalized recommendations based on your streak length.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Habit Formation Milestones
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Days</th>
                      <th className="text-left py-3 px-2 font-semibold">Milestone</th>
                      <th className="text-left py-3 px-2 font-semibold">What&apos;s Happening</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">3 days</td>
                      <td className="py-3 px-2">First milestone</td>
                      <td className="py-3 px-2">Initial resistance fades</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">7 days</td>
                      <td className="py-3 px-2">One week</td>
                      <td className="py-3 px-2">Pattern starts forming</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">14 days</td>
                      <td className="py-3 px-2">Two weeks</td>
                      <td className="py-3 px-2">Becoming routine</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">21 days</td>
                      <td className="py-3 px-2">Traditional goal</td>
                      <td className="py-3 px-2">Habit formation begins (Maxwell Maltz)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">30 days</td>
                      <td className="py-3 px-2">One month</td>
                      <td className="py-3 px-2">Solid routine established</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">66 days</td>
                      <td className="py-3 px-2">Automatic behavior</td>
                      <td className="py-3 px-2">Average time to automaticity (Lally et al.)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">365 days</td>
                      <td className="py-3 px-2">One year</td>
                      <td className="py-3 px-2">Identity-level change</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Research from University College London found habit formation takes 18-254 days depending on the person and behavior complexity.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                The Science of Habit Formation
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Habit Loop</h4>
                  <p>
                    Habits form through a three-part loop: cue, routine, reward. The cue triggers the behavior. The routine is the action itself. The reward reinforces the pattern. Over time, this loop becomes automatic — your brain stops actively deciding.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why 66 Days?</h4>
                  <p>
                    Phillippa Lally&apos;s 2009 study tracked 96 people forming new habits. On average, behaviors became automatic after 66 days. But the range was huge: 18 to 254 days. Simple habits like drinking water formed faster; complex ones like exercising took longer.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The 21-Day Myth</h4>
                  <p>
                    The &quot;21 days to form a habit&quot; idea comes from Dr. Maxwell Maltz&apos;s 1960s observations of plastic surgery patients. It was never a scientific finding. The real answer: it depends. Don&apos;t get discouraged if your habit takes longer.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Missing a Day Doesn&apos;t Ruin Progress</h4>
                  <p>
                    Lally&apos;s research found that missing one day had no measurable impact on habit formation. Perfection isn&apos;t required. What matters is consistency over time, not an unbroken streak. Get back on track immediately instead of giving up.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Building Lasting Habits
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Start Ridiculously Small</p>
                    <p>Want to exercise? Start with one pushup. Want to read more? Start with one page. Tiny habits succeed, then naturally expand. Big ambitions fail because they&apos;re too hard on bad days.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use Habit Stacking</p>
                    <p>Attach your new habit to an existing one. &quot;After I brush my teeth, I will meditate for one minute.&quot; The existing habit becomes the cue. This works better than relying on willpower or remembering.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Make It Obvious and Easy</p>
                    <p>Put your running shoes by the bed. Leave your journal on your pillow. Reduce friction between intention and action. Every extra step is a chance to skip the habit.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Track Visibly</p>
                    <p>Use a calendar, app, or habit tracker. Mark an X for each successful day. The chain of X&apos;s becomes motivation itself — you won&apos;t want to break it. Jerry Seinfeld used this method for writing jokes.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "How long does it take to form a habit?",
    answer: "On average, 66 days according to research from University College London. But the real range is 18 to 254 days depending on the person and the habit&apos;s complexity. Simple habits form faster; difficult ones take longer.",
  },
{
    question: "What happens if I miss a day?",
    answer: "Nothing catastrophic. Research shows missing one day doesn&apos;t significantly impact habit formation. The key is getting back on track immediately. Don&apos;t let one miss become two, then three, then quitting.",
  },
{
    question: "Should I track multiple habits at once?",
    answer: "Start with one. Habit formation requires mental energy and attention. Once the first habit feels automatic (around 2-3 months), add another. Trying to change everything at once usually leads to changing nothing.",
  },
{
    question: "What&apos;s a good success rate?",
    answer: "80% or higher is excellent. That means you&apos;re consistent but not perfectionist. A 50% success rate suggests the habit is too ambitious — make it smaller. Even 30% consistency is better than zero.",
  },
{
    question: "How do I recover from a broken streak?",
    answer: "Reset to zero and start again. Don&apos;t dwell on the broken chain — that&apos;s sunk cost thinking. Focus on building a new streak. Many people find their second attempt succeeds because they&apos;ve learned what went wrong the first time.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
