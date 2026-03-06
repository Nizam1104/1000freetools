"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts";

export default function SleepDebtCalculator() {
  const [recommendedSleep, setRecommendedSleep] = useState<string>("8");
  const [sleepHours, setSleepHours] = useState<string>("");
  const [days, setDays] = useState<string>("7");
  const [results, setResults] = useState<{
    totalDebt: number;
    averageDebt: number;
    dailySleep: number[];
  } | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const calculate = () => {
    const recommended = parseFloat(recommendedSleep);
    const avgSleep = parseFloat(sleepHours);
    const numDays = parseInt(days);

    if (isNaN(recommended) || isNaN(avgSleep) || isNaN(numDays) || recommended <= 0 || numDays <= 0) return;

    const dailySleep = [];
    let totalDebt = 0;
    let cumulativeDebt = 0;
    const debtProgression = [];

    for (let i = 0; i < numDays; i++) {
      dailySleep.push(avgSleep);
      const dailyDebt = Math.max(0, recommended - avgSleep);
      totalDebt += dailyDebt;
      cumulativeDebt += dailyDebt;
      debtProgression.push({
        day: `Day ${i + 1}`,
        cumulativeDebt: Math.round(cumulativeDebt * 10) / 10,
        recommendedSleep: recommended,
        actualSleep: avgSleep,
      });
    }

    setChartData(debtProgression);
    setResults({
      totalDebt: Math.round(totalDebt * 10) / 10,
      averageDebt: Math.round((totalDebt / numDays) * 10) / 10,
      dailySleep,
    });
  };

  const reset = () => {
    setRecommendedSleep("8");
    setSleepHours("");
    setDays("7");
    setResults(null);
    setChartData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="recommended">Recommended Sleep (hours/night)</Label>
              <Input
                id="recommended"
                type="number"
                value={recommendedSleep}
                onChange={(e) => setRecommendedSleep(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-1">Adults typically need 7-9 hours</p>
            </div>

            <div>
              <Label htmlFor="sleepHours">Average Actual Sleep (hours/night)</Label>
              <Input
                id="sleepHours"
                type="number"
                placeholder="e.g., 6.5"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="days">Number of Days</Label>
              <Input
                id="days"
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Sleep Debt</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Total Sleep Debt</p>
                  <p className="text-4xl font-bold">{results.totalDebt} hours</p>
                  <p className="text-muted-foreground">
                    ≈ {Math.round(results.totalDebt / 24)} days of sleep
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Daily Debt</p>
                  <p className="text-2xl font-bold">{results.averageDebt} hours/night</p>
                </div>
                {results.totalDebt > 14 && (
                  <div className="p-3 bg-destructive/10 rounded-md">
                    <p className="font-medium text-destructive">
                      ⚠️ Severe sleep debt detected! Consider prioritizing sleep recovery.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Sleep Debt Accumulation Over Time</CardTitle>
            <CardDescription>
              See how your sleep debt compounds day by day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis label={{ value: "Cumulative Debt (hours)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <ReferenceLine y={24} label="1 Full Day" stroke="red" strokeDasharray="3 3" />
                <Bar dataKey="cumulativeDebt" fill="#3b82f6" name="Sleep Debt" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Understanding Sleep Debt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Sleep debt is the cumulative gap between how much sleep you need and how much you actually get. Miss one hour last night? That's one hour of debt. Do it for five nights straight and you're looking at five hours behind. Your body doesn't just forget about it.</p>
          
          <p>The math is straightforward: if you need 8 hours but average 6, you're building 2 hours of debt every single night. After a week, that's 14 hours. After two weeks, you're a full day behind. Most people don't realize they're operating at this deficit until they finally crash.</p>

          <h3 className="text-xl font-semibold mt-6">How to Calculate Sleep Debt</h3>
          <p>Take your recommended sleep hours (typically 7-9 for adults), subtract what you actually slept, and multiply by the number of days. So 8 hours needed minus 6 hours slept, times 7 days, equals 14 hours of sleep debt.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sleep Debt by Age Group</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Age Group</th>
                  <th className="p-3 text-left">Recommended Hours</th>
                  <th className="p-3 text-left">Health Risks of Chronic Deficit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">Newborns (0-3 months)</td>
                  <td className="p-3">14-17 hours</td>
                  <td className="p-3">Developmental delays, weakened immunity</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Infants (4-11 months)</td>
                  <td className="p-3">12-15 hours</td>
                  <td className="p-3">Growth issues, irritability</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Toddlers (1-2 years)</td>
                  <td className="p-3">11-14 hours</td>
                  <td className="p-3">Behavioral problems, learning difficulties</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Preschool (3-5 years)</td>
                  <td className="p-3">10-13 hours</td>
                  <td className="p-3">Attention issues, hyperactivity</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">School-age (6-13 years)</td>
                  <td className="p-3">9-11 hours</td>
                  <td className="p-3">Poor academic performance, mood swings</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Teenagers (14-17 years)</td>
                  <td className="p-3">8-10 hours</td>
                  <td className="p-3">Depression risk, impaired driving</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Young Adults (18-25 years)</td>
                  <td className="p-3">7-9 hours</td>
                  <td className="p-3">Mental health decline, accident risk</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Adults (26-64 years)</td>
                  <td className="p-3">7-9 hours</td>
                  <td className="p-3">Heart disease, obesity, diabetes</td>
                </tr>
                <tr>
                  <td className="p-3">Older Adults (65+)</td>
                  <td className="p-3">7-8 hours</td>
                  <td className="p-3">Cognitive decline, fall risk</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">Source: National Sleep Foundation recommendations</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Health Effects of Sleep Debt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>One bad night won't wreck you. But chronic sleep debt? That's where things get ugly. Your body uses sleep for repair, memory consolidation, and hormone regulation. Skip it consistently and the bills come due.</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Short-term Effects</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Impaired concentration and memory</li>
                <li>Mood swings and irritability</li>
                <li>Reduced reaction time</li>
                <li>Poor decision-making</li>
                <li>Weakened immune response</li>
                <li>Increased cortisol (stress hormone)</li>
              </ul>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Long-term Effects</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Higher risk of heart disease</li>
                <li>Type 2 diabetes</li>
                <li>Obesity and weight gain</li>
                <li>Depression and anxiety</li>
                <li>Cognitive decline</li>
                <li>Reduced life expectancy</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Pay Back Sleep Debt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>You can't erase months of bad sleep in one weekend. But you can dig yourself out with consistent changes. The key is gradual recovery, not binge-sleeping.</p>

          <div className="space-y-3">
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold">Go to bed 15-30 minutes earlier each night</h4>
              <p className="text-sm text-muted-foreground mt-1">Don't try to add 3 hours overnight. Your body won't handle it. Shift bedtime gradually until you hit your target.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold">Take short naps (20-30 minutes)</h4>
              <p className="text-sm text-muted-foreground mt-1">Power naps help, but keep them under 30 minutes. Anything longer and you'll wake up groggy. Avoid napping after 3 PM.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold">Prioritize sleep on weekends</h4>
              <p className="text-sm text-muted-foreground mt-1">Sleep in an extra hour or two, but don't swing wildly. Sleeping until noon Monday just wrecks your schedule for the week.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold">Fix your sleep environment</h4>
              <p className="text-sm text-muted-foreground mt-1">Dark, cool room (around 65°F/18°C). No screens an hour before bed. Consistent bedtime routine. These aren't optional if you're serious about recovery.</p>
            </div>
          </div>

          <p className="mt-4">Recovery takes time. If you've built up 20 hours of debt, expect 1-2 weeks of intentional recovery sleep to feel normal again.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">How accurate is the sleep debt calculator?</h4>
            <p className="text-sm text-muted-foreground mt-1">The calculator uses the standard formula: (recommended sleep - actual sleep) × days. It's accurate for tracking cumulative deficit, but individual sleep needs vary. Some people function fine on 7 hours; others need 9.</p>
          </div>
          <div>
            <h4 className="font-semibold">Can you recover from sleep debt in one day?</h4>
            <p className="text-sm text-muted-foreground mt-1">No. One good night might help you feel better temporarily, but it doesn't erase weeks of deficit. Research shows it takes several days to weeks of consistent adequate sleep to fully recover from chronic sleep debt.</p>
          </div>
          <div>
            <h4 className="font-semibold">What happens if you don't pay back sleep debt?</h4>
            <p className="text-sm text-muted-foreground mt-1">Chronic sleep debt accumulates and increases your risk of serious health problems: heart disease, diabetes, obesity, depression, and cognitive decline. Your immune system weakens, making you more susceptible to infections.</p>
          </div>
          <div>
            <h4 className="font-semibold">How much sleep debt is too much?</h4>
            <p className="text-sm text-muted-foreground mt-1">Anything over 10-14 hours (a full day's worth) indicates serious chronic deprivation. At this point, you should prioritize sleep recovery immediately. Consistently sleeping 2+ hours less than your need is a red flag.</p>
          </div>
          <div>
            <h4 className="font-semibold">Does caffeine help with sleep debt?</h4>
            <p className="text-sm text-muted-foreground mt-1">Caffeine masks symptoms temporarily but doesn't reduce actual sleep debt. It blocks adenosine receptors (the chemical that makes you tired) but doesn't replace the restorative functions of sleep. Use it strategically, not as a crutch.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <a href="/calculators/bmi-calculator" className="text-primary hover:underline">
                BMI Calculator
              </a>{" "}
              — Calculate your body mass index and understand health risks
            </li>
            <li>
              <a href="/calculators/daily-calorie-needs-calculator" className="text-primary hover:underline">
                Daily Calorie Needs Calculator
              </a>{" "}
              — Find out how many calories you need based on activity level
            </li>
            <li>
              <a href="/calculators/bmr-calculator" className="text-primary hover:underline">
                BMR Calculator
              </a>{" "}
              — Calculate your basal metabolic rate for personalized health planning
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
