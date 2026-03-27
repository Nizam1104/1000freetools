"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";

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
                How to Use This Savings Challenge Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Choose a challenge type</p>
                    <p>Select the classic 52-week challenge, reverse challenge, penny-a-day, or create a custom plan.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set your parameters</p>
                    <p>For custom challenges, enter starting amount, weekly increment, and duration in weeks.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate and track</p>
                    <p>See your total savings, milestones, and weekly targets. Use this as motivation to stay on track.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Popular Savings Challenges Compared
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Challenge</th>
                      <th className="text-left py-3 px-2 font-semibold">Duration</th>
                      <th className="text-left py-3 px-2 font-semibold">Start</th>
                      <th className="text-left py-3 px-2 font-semibold">End</th>
                      <th className="text-left py-3 px-2 font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">52-Week</td>
                      <td className="py-3 px-2">52 weeks</td>
                      <td className="py-3 px-2">$1</td>
                      <td className="py-3 px-2">$52</td>
                      <td className="py-3 px-2">$1,378</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Reverse 52-Week</td>
                      <td className="py-3 px-2">52 weeks</td>
                      <td className="py-3 px-2">$52</td>
                      <td className="py-3 px-2">$1</td>
                      <td className="py-3 px-2">$1,378</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Penny-a-Day</td>
                      <td className="py-3 px-2">365 days</td>
                      <td className="py-3 px-2">$0.01</td>
                      <td className="py-3 px-2">$3.65</td>
                      <td className="py-3 px-2">$667.95</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Quarter-a-Week</td>
                      <td className="py-3 px-2">52 weeks</td>
                      <td className="py-3 px-2">$0.25</td>
                      <td className="py-3 px-2">$13</td>
                      <td className="py-3 px-2">$344.50</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">$5-Week Challenge</td>
                      <td className="py-3 px-2">52 weeks</td>
                      <td className="py-3 px-2">$5</td>
                      <td className="py-3 px-2">$260</td>
                      <td className="py-3 px-2">$6,890</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Totals calculated using arithmetic sequence sum: Sum = n/2 × (first + last)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                The Math Behind Savings Challenges
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Savings challenges use arithmetic sequences. Each week you save a fixed amount more than the previous week. The total is calculated using the arithmetic series formula.
                </p>
                <div className="p-3 bg-muted/50 rounded font-mono text-xs space-y-2">
                  <div><strong>Formula:</strong> Sum = n/2 × (2a + (n-1)d)</div>
                  <div>Where: n = number of weeks, a = starting amount, d = weekly increment</div>
                  <div className="pt-2 border-t"><strong>Example (52-week):</strong></div>
                  <div>Sum = 52/2 × (2×1 + (52-1)×1)</div>
                  <div>Sum = 26 × (2 + 51) = 26 × 53 = $1,378</div>
                </div>
                <p>
                  The reverse challenge saves the same total but front-loads the difficult weeks. Many people prefer this because finishing with small amounts feels easier than ramping up.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Sticking to Your Challenge
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Automate transfers</p>
                    <p>Set up automatic weekly transfers to a separate savings account. Out of sight, out of mind—and harder to spend.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Track your progress visually</p>
                    <p>Print a tracker sheet and color in each week. Visual progress is surprisingly motivating.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Start small if needed</p>
                    <p>The 52-week challenge can be intimidating. Try the quarter challenge first, or start with $0.50 increments instead of $1.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Have a goal for the money</p>
                    <p>Save for something specific: emergency fund, vacation, holiday gifts. A purpose makes it easier to resist dipping in.</p>
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
    question: "What if I miss a week?",
    answer: "Don't quit—just catch up. Add the missed amount to next week's deposit, or spread it over the remaining weeks. The goal is building a savings habit, not perfection.",
  },
{
    question: "Should I do the regular or reverse challenge?",
    answer: "Reverse is often easier psychologically. Starting with $52 feels manageable, and ending with $1 feels like a victory lap. Regular challenge builds momentum but ends with the hardest payments.",
  },
{
    question: "Can I combine challenges?",
    answer: "Absolutely. Do the penny challenge daily and a weekly challenge too. Just make sure your total weekly savings fits your budget.",
  },
{
    question: "Where should I keep the money?",
    answer: "Use a high-yield savings account separate from your checking. The slightly higher interest adds up, and separation reduces temptation to spend.",
  },
{
    question: "What if I can't afford the later weeks?",
    answer: "Scale down. Instead of $52 in week 52, do $25. Or restart at a lower increment. The best challenge is one you can actually complete.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
