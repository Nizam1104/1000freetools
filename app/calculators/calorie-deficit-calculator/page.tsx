"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import Faqs from "@/components/utils/Faqs";


export default function CalorieDeficitCalculator() {
  const [weightToLose, setWeightToLose] = useState<string>("");
  const [weeks, setWeeks] = useState<string>("");
  const [deficit, setDeficit] = useState<number | null>(null);
  const [weeklyLoss, setWeeklyLoss] = useState<number | null>(null);
  const [timelineData, setTimelineData] = useState<any[]>([]);

  const calculate = () => {
    const lbs = parseFloat(weightToLose);
    const w = parseFloat(weeks);

    if (isNaN(lbs) || isNaN(w) || lbs <= 0 || w <= 0) return;

    // 1 lb fat = 3500 calories
    const totalCalorieDeficit = lbs * 3500;
    const dailyDeficit = totalCalorieDeficit / (w * 7);
    const weeklyWeightLoss = lbs / w;

    setDeficit(Math.round(dailyDeficit));
    setWeeklyLoss(Math.round(weeklyWeightLoss * 10) / 10);

    // Generate timeline data
    const data = [];
    for (let i = 0; i <= w; i++) {
      const remainingLbs = lbs - (weeklyWeightLoss * i);
      data.push({
        week: i,
        remaining: Math.max(0, Math.round(remainingLbs * 10) / 10),
        lost: Math.round((weeklyWeightLoss * i) * 10) / 10,
      });
    }
    setTimelineData(data);
  };

  const reset = () => {
    setWeightToLose("");
    setWeeks("");
    setDeficit(null);
    setWeeklyLoss(null);
    setTimelineData([]);
  };

  // Generate comparison data for different timelines
  const timelineComparison = weightToLose ? [
    { weeks: 4, deficit: Math.round((parseFloat(weightToLose) * 3500) / (4 * 7)), weekly: parseFloat(weightToLose) / 4 },
    { weeks: 8, deficit: Math.round((parseFloat(weightToLose) * 3500) / (8 * 7)), weekly: parseFloat(weightToLose) / 8 },
    { weeks: 12, deficit: Math.round((parseFloat(weightToLose) * 3500) / (12 * 7)), weekly: parseFloat(weightToLose) / 12 },
    { weeks: 16, deficit: Math.round((parseFloat(weightToLose) * 3500) / (16 * 7)), weekly: parseFloat(weightToLose) / 16 },
    { weeks: 20, deficit: Math.round((parseFloat(weightToLose) * 3500) / (20 * 7)), weekly: parseFloat(weightToLose) / 20 },
  ] : [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weightToLose">Weight to Lose (lbs)</Label>
                <Input
                  id="weightToLose"
                  type="number"
                  placeholder="e.g., 10"
                  value={weightToLose}
                  onChange={(e) => setWeightToLose(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="weeks">Timeframe (weeks)</Label>
                <Input
                  id="weeks"
                  type="number"
                  placeholder="e.g., 8"
                  value={weeks}
                  onChange={(e) => setWeeks(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Deficit</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {deficit !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Daily Calorie Deficit Needed</p>
                <p className="text-4xl font-bold mt-1">{deficit} <span className="text-lg font-normal">calories/day</span></p>
                <p className="text-sm text-muted-foreground mt-2">
                  To lose {weightToLose} lbs in {weeks} weeks, you need a daily deficit of {deficit} calories.
                </p>
                {weeklyLoss && (
                  <p className="text-sm text-muted-foreground mt-1">
                    This equals approximately {weeklyLoss} lbs per week.
                  </p>
                )}
                {deficit > 1000 && (
                  <p className="text-xs text-red-600 mt-3 font-medium">
                    Warning: This deficit is aggressive. Consider extending your timeline for more sustainable loss.
                  </p>
                )}
                {deficit < 250 && (
                  <p className="text-xs text-yellow-600 mt-3 font-medium">
                    Note: This is a very modest deficit. Weight loss will be slow but sustainable.
                  </p>
                )}
              </div>
            )}
          </div>

          {timelineData.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Weight Loss Timeline</h3>
              <div className="h-[200px]">
                <ChartContainer
                  config={{
                    remaining: { label: "Remaining", color: "hsl(var(--chart-1))" },
                    lost: { label: "Lost", color: "hsl(var(--chart-2))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" label={{ value: "Week", position: "insideBottom", offset: -5 }} />
                      <YAxis label={{ value: "Pounds", angle: -90, position: "insideLeft" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="remaining" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="lost" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          )}

          {timelineComparison.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Deficit by Timeline</h3>
              <div className="h-[200px]">
                <ChartContainer
                  config={{
                    deficit: { label: "Daily Deficit", color: "hsl(var(--chart-1))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timelineComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="weeks" label={{ value: "Weeks", position: "insideBottom", offset: -5 }} />
                      <YAxis label={{ value: "Calories/day", angle: -90, position: "insideLeft" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="deficit" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Longer timelines = smaller daily deficit = more sustainable weight loss
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Calorie Deficits</CardTitle>
          <CardDescription>The math behind weight loss</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Weight loss comes down to one thing: calorie deficit. Burn more than you eat, and your body taps into stored fat for energy. The rule of thumb is that 1 pound of body fat equals about 3,500 calories.
          </p>
          <p className="text-sm text-muted-foreground">
            Create a 500-calorie daily deficit and you'll lose roughly 1 pound per week. Double that to 1,000 calories and you're looking at 2 pounds weekly. Sounds simple. And it is – until hunger, cravings, and life get in the way.
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-semibold mb-2">Calorie Deficit Formula</p>
            <p className="font-mono text-center text-sm">Daily Deficit = (Weight to Lose × 3,500) ÷ (Weeks × 7)</p>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Example: 20 lbs in 10 weeks = (20 × 3,500) ÷ 70 = 1,000 calories/day deficit
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Safe Deficit Guidelines</CardTitle>
          <CardDescription>How aggressive should you go?</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deficit Size</TableHead>
                <TableHead>Weekly Loss</TableHead>
                <TableHead>Sustainability</TableHead>
                <TableHead>Best For</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">250 cal/day</TableCell>
                <TableCell className="font-mono text-xs">0.5 lb</TableCell>
                <TableCell className="text-green-600 text-xs">Very Easy</TableCell>
                <TableCell className="text-xs">Long-term maintenance, minimal hunger</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">500 cal/day</TableCell>
                <TableCell className="font-mono text-xs">1 lb</TableCell>
                <TableCell className="text-green-600 text-xs">Easy</TableCell>
                <TableCell className="text-xs">Most people, sustainable long-term</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">750 cal/day</TableCell>
                <TableCell className="font-mono text-xs">1.5 lb</TableCell>
                <TableCell className="text-yellow-600 text-xs">Moderate</TableCell>
                <TableCell className="text-xs">Faster results, some hunger expected</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">1,000 cal/day</TableCell>
                <TableCell className="font-mono text-xs">2 lb</TableCell>
                <TableCell className="text-yellow-600 text-xs">Challenging</TableCell>
                <TableCell className="text-xs">Short-term goals, requires discipline</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">1,250+ cal/day</TableCell>
                <TableCell className="font-mono text-xs">2.5+ lb</TableCell>
                <TableCell className="text-red-600 text-xs">Difficult</TableCell>
                <TableCell className="text-xs">Not recommended without medical supervision</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            General recommendation: 500-750 calorie deficit for most people. This produces steady loss without excessive hunger or metabolic slowdown.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Create a Calorie Deficit</CardTitle>
          <CardDescription>Practical strategies that work</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <p className="font-medium text-sm">Reduce calorie intake</p>
                <p className="text-xs text-muted-foreground">Cut 250-500 calories through diet. Swap soda for water (-150 cal), skip the afternoon snack (-200 cal), reduce portion sizes (-150 cal). Small changes add up without feeling deprived.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <p className="font-medium text-sm">Increase physical activity</p>
                <p className="text-xs text-muted-foreground">Burn 250-500 calories through exercise. A 30-minute brisk walk burns ~150 cal. Add strength training to preserve muscle. NEAT (non-exercise movement) matters too – take the stairs, park farther away.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <p className="font-medium text-sm">Combine both approaches</p>
                <p className="text-xs text-muted-foreground">The most sustainable approach: eat 250-300 calories less AND burn 250-300 calories more. This creates a 500-600 calorie deficit without extreme dieting or excessive exercise.</p>
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
    question: "Is the 3,500 calories per pound rule accurate?",
    answer: "It's a useful approximation but not perfect. Research shows actual weight loss is often 20-30% slower than predicted, especially over longer periods. Your body adapts – metabolism slows as you lose weight. Use 3,500 as a starting point, then adjust based on real results.",
  },
{
    question: "Can I lose weight with just diet, no exercise?",
    answer: "Yes. Weight loss is primarily about calories in vs calories out. Diet has a bigger impact than exercise for most people. That said, exercise preserves muscle during weight loss, improves health markers, and helps maintain loss long-term.",
  },
{
    question: "Why isn't the scale moving despite my deficit?",
    answer: "Common reasons: water retention (especially when starting exercise or changing diet), underestimating intake (people typically undercount by 30-50%), or your actual TDEE is lower than calculated. Give it 2-3 weeks before adjusting.",
  },
{
    question: "How do I track calories accurately?",
    answer: "Use a food scale, not measuring cups. Log everything – condiments, cooking oil, bites and sips add up. Read labels carefully. Restaurant portions are often 2-3× standard servings. Track for at least 2 weeks to establish baseline accuracy.",
  },
{
    question: "Should I adjust my deficit as I lose weight?",
    answer: "Yes. As you lose weight, your TDEE drops – smaller bodies need fewer calories. Recalculate your deficit every 10-15 lbs lost. Also, metabolic adaptation can reduce TDEE by an extra 5-15% beyond what weight loss alone predicts.",
  }
  ]} />
</section>
    </div>
  );
}
