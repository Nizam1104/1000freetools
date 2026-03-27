"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Faqs from "@/components/utils/Faqs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function WalkingCalorieCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [speed, setSpeed] = useState<string>("");
  const [speedUnit, setSpeedUnit] = useState<"kmh" | "mph">("kmh");
  const [time, setTime] = useState<string>("");
  const [timeUnit, setTimeUnit] = useState<"minutes" | "hours">("minutes");
  const [calories, setCalories] = useState<number | null>(null);

  // MET values for walking speeds
  const getMET = (speedValue: number, unit: "kmh" | "mph"): number => {
    const speedInKmh = unit === "mph" ? speedValue * 1.60934 : speedValue;

    if (speedInKmh < 4) return 2.5;
    if (speedInKmh < 5.5) return 3.5;
    if (speedInKmh < 7) return 4.5;
    return 5.5;
  };

  const calculate = () => {
    const weightValue = parseFloat(weight);
    const speedValue = parseFloat(speed);
    const timeValue = parseFloat(time);

    if (isNaN(weightValue) || isNaN(speedValue) || isNaN(timeValue) || weightValue <= 0 || speedValue <= 0 || timeValue <= 0) return;

    const weightInKg = weightUnit === "lbs" ? weightValue * 0.453592 : weightValue;
    const timeInHours = timeUnit === "minutes" ? timeValue / 60 : timeValue;
    const met = getMET(speedValue, speedUnit);
    const calculatedCalories = met * weightInKg * timeInHours;
    setCalories(Math.round(calculatedCalories));
  };

  const reset = () => {
    setWeight("");
    setSpeed("");
    setTime("");
    setCalories(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={weightUnit} onValueChange={(v) => setWeightUnit(v as "kg" | "lbs")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="speed">Speed</Label>
                <Input
                  id="speed"
                  type="number"
                  step="0.1"
                  placeholder="5"
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={speedUnit} onValueChange={(v) => setSpeedUnit(v as "kmh" | "mph")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kmh">km/h</SelectItem>
                    <SelectItem value="mph">mph</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="time">Duration</Label>
                <Input
                  id="time"
                  type="number"
                  placeholder="30"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={timeUnit} onValueChange={(v) => setTimeUnit(v as "minutes" | "hours")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Calories</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {calories !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Calories Burned</p>
                <p className="text-4xl font-bold mt-1">{calories} <span className="text-lg font-normal">kcal</span></p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Walking Burns Calories</CardTitle>
          <CardDescription>The science behind walking for weight loss</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Walking burns calories through the MET (Metabolic Equivalent of Task) system. One MET equals the energy you burn at rest. Walking at a moderate pace clocks in at 3-5 METs, meaning you burn 3-5 times more calories than sitting on the couch.
          </p>
          <p className="text-sm text-muted-foreground">
            The formula is straightforward: Calories burned = METs × weight in kg × time in hours. A 70 kg person walking at 5 km/h (3.5 METs) for 30 minutes burns roughly 70 × 3.5 × 0.5 = 122 calories. Heavier people burn more – a 90 kg person burns about 175 calories doing the same walk.
          </p>
          <p className="text-sm text-muted-foreground">
            Walking might seem modest compared to running, but it adds up. A daily 30-minute walk burns an extra 500-800 calories per week – enough to lose half a pound of fat every week without changing your diet.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calories Burned by Walking Speed</CardTitle>
          <CardDescription>MET values for different paces</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Walking Speed</TableHead>
                <TableHead>Pace</TableHead>
                <TableHead>MET Value</TableHead>
                <TableHead>Calories (70kg, 30 min)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Slow stroll</TableCell>
                <TableCell className="text-xs text-muted-foreground">&lt; 4 km/h (&lt; 2.5 mph)</TableCell>
                <TableCell className="font-mono text-xs">2.5</TableCell>
                <TableCell className="font-mono text-xs">~88 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Moderate pace</TableCell>
                <TableCell className="text-xs text-muted-foreground">4-5.5 km/h (2.5-3.4 mph)</TableCell>
                <TableCell className="font-mono text-xs">3.5</TableCell>
                <TableCell className="font-mono text-xs">~122 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Brisk walking</TableCell>
                <TableCell className="text-xs text-muted-foreground">5.5-7 km/h (3.5-4.3 mph)</TableCell>
                <TableCell className="font-mono text-xs">4.5</TableCell>
                <TableCell className="font-mono text-xs">~157 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Very fast</TableCell>
                <TableCell className="text-xs text-muted-foreground">&gt; 7 km/h (&gt; 4.5 mph)</TableCell>
                <TableCell className="font-mono text-xs">5.5</TableCell>
                <TableCell className="font-mono text-xs">~192 kcal</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Note: Calories shown are for a 70 kg (154 lb) person walking for 30 minutes. Actual burn varies by individual.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calories Burned Walking 30 Minutes</CardTitle>
          <CardDescription>By body weight</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Body Weight</TableHead>
                <TableHead>Slow Walk</TableHead>
                <TableHead>Moderate Walk</TableHead>
                <TableHead>Brisk Walk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">55 kg (121 lbs)</TableCell>
                <TableCell className="font-mono text-xs">69 kcal</TableCell>
                <TableCell className="font-mono text-xs">96 kcal</TableCell>
                <TableCell className="font-mono text-xs">124 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">70 kg (154 lbs)</TableCell>
                <TableCell className="font-mono text-xs">88 kcal</TableCell>
                <TableCell className="font-mono text-xs">122 kcal</TableCell>
                <TableCell className="font-mono text-xs">157 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">85 kg (187 lbs)</TableCell>
                <TableCell className="font-mono text-xs">106 kcal</TableCell>
                <TableCell className="font-mono text-xs">149 kcal</TableCell>
                <TableCell className="font-mono text-xs">191 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">100 kg (220 lbs)</TableCell>
                <TableCell className="font-mono text-xs">125 kcal</TableCell>
                <TableCell className="font-mono text-xs">175 kcal</TableCell>
                <TableCell className="font-mono text-xs">225 kcal</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Based on 30 minutes of walking at different speeds. Slow = 2.5 METs, Moderate = 3.5 METs, Brisk = 4.5 METs.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Walking for Weight Loss</CardTitle>
          <CardDescription>How to maximize fat burn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <p className="font-medium text-sm">Walk faster, not just longer</p>
                <p className="text-xs text-muted-foreground">Brisk walking burns nearly twice as many calories as a leisurely stroll. Push yourself to a pace where you can talk but not sing – that's your fat-burning zone.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <p className="font-medium text-sm">Add hills or incline</p>
                <p className="text-xs text-muted-foreground">Walking uphill can increase calorie burn by 50-60%. Find a hilly route or set your treadmill to 5-10% incline. Your glutes will thank you later.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <p className="font-medium text-sm">Use interval walking</p>
                <p className="text-xs text-muted-foreground">Alternate 2 minutes of brisk walking with 1 minute of recovery pace. This interval approach burns more calories and boosts metabolism for hours after your walk.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">4</div>
              <div>
                <p className="font-medium text-sm">Walk in the morning</p>
                <p className="text-xs text-muted-foreground">Morning walks may enhance fat oxidation, especially if done before breakfast. Plus, you're less likely to skip it when life gets busy.</p>
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
    question: "How many calories does a 30-minute walk burn?",
    answer: "A 70 kg person burns about 120-160 calories walking at a moderate pace for 30 minutes. Heavier people burn more – around 200 calories for a 90 kg person. Speed matters: brisk walking can push this to 180+ calories.",
  },
{
    question: "Is walking enough for weight loss?",
    answer: "Walking alone can produce modest weight loss – studies show about 1-2 kg over 6 months with daily walking. Combine it with dietary changes for better results. A 500-calorie daily deficit (250 from walking, 250 from diet) produces about 0.5 kg weekly loss.",
  },
{
    question: "How many steps equal 10,000 steps for calorie burn?",
    answer: "10,000 steps burns roughly 300-500 calories depending on your weight and pace. That's about 8 km or 1.5-2 hours of walking. Don't obsess over the number – consistent daily movement matters more than hitting an arbitrary target.",
  },
{
    question: "Does walking speed affect calorie burn?",
    answer: "Yes, significantly. Walking at 6 km/h burns about 30% more calories than walking at 4 km/h. But here's the thing: a slow 60-minute walk burns more than a fast 20-minute walk. Duration and consistency beat intensity for total calorie burn.",
  },
{
    question: "Should I walk before or after eating?",
    answer: "Walking after meals helps blunt blood sugar spikes and aids digestion. A 10-15 minute post-meal walk is particularly effective for people with insulin resistance. For pure fat burn, fasted morning walks may have a slight edge.",
  }
  ]} />
</section>
    </div>
  );
}
