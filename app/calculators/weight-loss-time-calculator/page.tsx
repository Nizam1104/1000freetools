"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function WeightLossTimeCalculator() {
  const [currentWeight, setCurrentWeight] = useState<string>("");
  const [goalWeight, setGoalWeight] = useState<string>("");
  const [dailyDeficit, setDailyDeficit] = useState<string>("");
  const [days, setDays] = useState<number | null>(null);
  const [weeks, setWeeks] = useState<number | null>(null);

  const calculate = () => {
    const current = parseFloat(currentWeight);
    const goal = parseFloat(goalWeight);
    const deficit = parseFloat(dailyDeficit);

    if (isNaN(current) || isNaN(goal) || isNaN(deficit) || current <= 0 || goal <= 0 || deficit <= 0) return;
    if (goal >= current) return;

    const weightToLose = current - goal;
    const totalDays = (weightToLose * 3500) / deficit;
    const totalWeeks = totalDays / 7;

    setDays(Math.round(totalDays));
    setWeeks(Math.round(totalWeeks * 10) / 10);
  };

  const reset = () => {
    setCurrentWeight("");
    setGoalWeight("");
    setDailyDeficit("");
    setDays(null);
    setWeeks(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentWeight">Current Weight (lbs)</Label>
              <Input
                id="currentWeight"
                type="number"
                placeholder="e.g., 180"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="goalWeight">Goal Weight (lbs)</Label>
              <Input
                id="goalWeight"
                type="number"
                placeholder="e.g., 150"
                value={goalWeight}
                onChange={(e) => setGoalWeight(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="dailyDeficit">Daily Calorie Deficit</Label>
              <Input
                id="dailyDeficit"
                type="number"
                placeholder="e.g., 500"
                value={dailyDeficit}
                onChange={(e) => setDailyDeficit(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                A deficit of 500 calories/day typically results in 1 lb weight loss per week.
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Timeline</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {days !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Estimated Time to Reach Goal</p>
                <p className="text-4xl font-bold mt-1">{days} <span className="text-lg font-normal">days</span></p>
                <p className="text-xl font-medium mt-2">{weeks} weeks</p>
                <p className="text-sm text-muted-foreground mt-2">
                  With a daily deficit of {dailyDeficit} calories, you'll reach your goal of {goalWeight} lbs in approximately {days} days.
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Note: This is an estimate. Actual results vary based on metabolism, activity level, and other factors.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Weight Loss Works</CardTitle>
          <CardDescription>The math behind losing weight</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Weight loss comes down to one thing: calorie deficit. Burn more than you eat, and your body taps into stored fat for energy. The rule of thumb is that 1 pound of body fat equals about 3,500 calories.
          </p>
          <p className="text-sm text-muted-foreground">
            Create a 500-calorie daily deficit and you'll lose roughly 1 pound per week. Double that to 1,000 calories and you're looking at 2 pounds weekly. Sounds simple. And it is – until hunger, cravings, and life get in the way.
          </p>
          <p className="text-sm text-muted-foreground">
            Here's what most people don't realize: as you lose weight, your body burns fewer calories. A smaller body needs less energy. That's why weight loss slows down over time, even if you're eating the same amount. You'll need to recalculate your needs every 10-15 pounds lost.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time to Lose Weight</CardTitle>
          <CardDescription>How long it takes at different deficits</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Weight to Lose</TableHead>
                <TableHead>250 cal/day</TableHead>
                <TableHead>500 cal/day</TableHead>
                <TableHead>750 cal/day</TableHead>
                <TableHead>1000 cal/day</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">5 lbs</TableCell>
                <TableCell className="font-mono text-xs">10 weeks</TableCell>
                <TableCell className="font-mono text-xs">5 weeks</TableCell>
                <TableCell className="font-mono text-xs">3.5 weeks</TableCell>
                <TableCell className="font-mono text-xs">2.5 weeks</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">10 lbs</TableCell>
                <TableCell className="font-mono text-xs">20 weeks</TableCell>
                <TableCell className="font-mono text-xs">10 weeks</TableCell>
                <TableCell className="font-mono text-xs">7 weeks</TableCell>
                <TableCell className="font-mono text-xs">5 weeks</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">20 lbs</TableCell>
                <TableCell className="font-mono text-xs">40 weeks</TableCell>
                <TableCell className="font-mono text-xs">20 weeks</TableCell>
                <TableCell className="font-mono text-xs">13 weeks</TableCell>
                <TableCell className="font-mono text-xs">10 weeks</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">30 lbs</TableCell>
                <TableCell className="font-mono text-xs">60 weeks</TableCell>
                <TableCell className="font-mono text-xs">30 weeks</TableCell>
                <TableCell className="font-mono text-xs">20 weeks</TableCell>
                <TableCell className="font-mono text-xs">15 weeks</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">50 lbs</TableCell>
                <TableCell className="font-mono text-xs">100 weeks</TableCell>
                <TableCell className="font-mono text-xs">50 weeks</TableCell>
                <TableCell className="font-mono text-xs">33 weeks</TableCell>
                <TableCell className="font-mono text-xs">25 weeks</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Based on the 3,500 calories per pound rule. Individual results vary based on starting weight, metabolism, and adherence.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Weight Loss Rates</CardTitle>
          <CardDescription>What's safe and sustainable</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-lg border p-4 bg-green-500/5">
              <h4 className="font-semibold text-sm mb-2 text-green-600">Slow (0.5 lb/week)</h4>
              <p className="text-xs text-muted-foreground mb-2">250 calorie daily deficit</p>
              <p className="text-xs text-muted-foreground">
                Best for: People with less weight to lose, those who've struggled with yo-yo dieting, or anyone who wants a sustainable approach. Slow loss means less muscle loss and better long-term maintenance.
              </p>
            </div>
            <div className="rounded-lg border p-4 bg-blue-500/5">
              <h4 className="font-semibold text-sm mb-2 text-blue-600">Moderate (1 lb/week)</h4>
              <p className="text-xs text-muted-foreground mb-2">500 calorie daily deficit</p>
              <p className="text-xs text-muted-foreground">
                Best for: Most people. This is the sweet spot between results and sustainability. You'll see the scale move without feeling deprived. Easy to maintain for months.
              </p>
            </div>
            <div className="rounded-lg border p-4 bg-yellow-500/5">
              <h4 className="font-semibold text-sm mb-2 text-yellow-600">Fast (2 lbs/week)</h4>
              <p className="text-xs text-muted-foreground mb-2">1000 calorie daily deficit</p>
              <p className="text-xs text-muted-foreground">
                Best for: People with significant weight to lose (30+ lbs) under medical supervision. Not sustainable long-term. Higher risk of muscle loss, nutrient deficiencies, and rebound weight gain.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why Weight Loss Slows Down</CardTitle>
          <CardDescription>Understanding plateaus</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <p className="font-medium text-sm">Metabolic adaptation</p>
                <p className="text-xs text-muted-foreground">Your body burns fewer calories as you get lighter. A 200-lb person needs about 2,400 calories daily. At 180 lbs, that drops to 2,200. Same diet, slower loss.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <p className="font-medium text-sm">NEAT reduction</p>
                <p className="text-xs text-muted-foreground">Non-exercise activity thermogenesis – the calories you burn fidgeting, walking around, standing – drops unconsciously when you're in a deficit. You move less without realizing it.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <p className="font-medium text-sm">Water retention</p>
                <p className="text-xs text-muted-foreground">Diet changes, stress, and exercise can cause temporary water retention that masks fat loss on the scale. This isn't real weight gain – it's just water weight fluctuations.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">4</div>
              <div>
                <p className="font-medium text-sm">Calorie creep</p>
                <p className="text-xs text-muted-foreground">Portions slowly increase. Snacks add up. "Just a bite" becomes a habit. Most people underestimate intake by 20-50%. Track honestly for a week – you might find your culprit.</p>
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
    question: "How long does it take to lose 10 pounds?",
    answer: "With a 500-calorie daily deficit, expect 10-12 weeks. Faster deficits (750-1000 calories) can get you there in 5-7 weeks, but that's harder to sustain. The first 2-3 pounds often come off faster due to water loss.",
  },
{
    question: "Is losing 2 pounds per week safe?",
    answer: "For most people, yes – especially if you have significant weight to lose. The CDC recommends 1-2 pounds per week as safe. Faster than that increases risks of gallstones, muscle loss, and nutrient deficiencies.",
  },
{
    question: "Why am I not losing weight on a 500 calorie deficit?",
    answer: "Either your actual deficit is smaller than you think (common – people underestimate food by 30-50%), or your metabolism has adapted. Try tracking intake precisely for two weeks. If still no loss, recalculate your TDEE – it may have dropped.",
  },
{
    question: "Should I adjust my deficit as I lose weight?",
    answer: "Yes. Recalculate every 10-15 pounds lost. Your TDEE drops as you get lighter. Someone who needed 2,000 calories at 200 lbs might need only 1,700 at 170 lbs. Keep the same deficit, just adjust your maintenance level.",
  },
{
    question: "How accurate is the 3,500 calories per pound rule?",
    answer: "It's a useful approximation but not perfect. Research shows actual weight loss is often 20-30% slower than the 3,500 rule predicts, especially over longer periods. Use it as a starting point, then adjust based on real-world results.",
  }
  ]} />
</section>
    </div>
  );
}
