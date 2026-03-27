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

interface Activity {
  name: string;
  met: number;
}

const activities: Activity[] = [
  { name: "Sitting quietly", met: 1.0 },
  { name: "Walking slowly (2 mph)", met: 2.5 },
  { name: "Walking moderate (3 mph)", met: 3.5 },
  { name: "Walking briskly (4 mph)", met: 4.5 },
  { name: "Running (5 mph / 12 min/mile)", met: 8.0 },
  { name: "Running (6 mph / 10 min/mile)", met: 10.0 },
  { name: "Running (7.5 mph / 8 min/mile)", met: 12.5 },
  { name: "Cycling leisurely", met: 4.0 },
  { name: "Cycling moderate (12-14 mph)", met: 8.0 },
  { name: "Cycling vigorous (16-19 mph)", met: 12.0 },
  { name: "Swimming leisurely", met: 6.0 },
  { name: "Swimming moderate", met: 8.0 },
  { name: "Swimming vigorous", met: 10.0 },
  { name: "Weight training", met: 6.0 },
  { name: "Yoga", met: 3.0 },
  { name: "Basketball", met: 8.0 },
  { name: "Soccer", met: 7.0 },
  { name: "Tennis", met: 7.5 },
  { name: "Dancing", met: 5.0 },
  { name: "Gardening", met: 4.0 },
  { name: "House cleaning", met: 3.5 },
  { name: "Custom (enter MET)", met: 0 },
];

export default function ActivityCalorieCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [duration, setDuration] = useState<string>("");
  const [durationUnit, setDurationUnit] = useState<"min" | "hours">("min");
  const [selectedActivity, setSelectedActivity] = useState<string>("Walking moderate (3 mph)");
  const [customMet, setCustomMet] = useState<string>("");
  const [calories, setCalories] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const d = parseFloat(duration);

    if (isNaN(w) || isNaN(d) || w <= 0 || d <= 0) return;

    const weightKg = weightUnit === "lbs" ? w * 0.453592 : w;
    const durationHours = durationUnit === "min" ? d / 60 : d;

    let met = activities.find(a => a.name === selectedActivity)?.met || 3.5;
    if (selectedActivity === "Custom (enter MET)") {
      met = parseFloat(customMet) || 3.5;
    }

    // Calories = MET × weight(kg) × time(hours)
    const caloriesBurned = met * weightKg * durationHours;
    setCalories(Math.round(caloriesBurned));
  };

  const reset = () => {
    setWeight("");
    setDuration("");
    setCustomMet("");
    setCalories(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="weightUnit">Unit</Label>
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

            <div>
              <Label htmlFor="activity">Activity</Label>
              <Select value={selectedActivity} onValueChange={setSelectedActivity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {activities.map((activity) => (
                    <SelectItem key={activity.name} value={activity.name}>
                      {activity.name} {activity.met > 0 && `(MET: ${activity.met})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedActivity === "Custom (enter MET)" && (
              <div>
                <Label htmlFor="customMet">MET Value</Label>
                <Input
                  id="customMet"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 5.0"
                  value={customMet}
                  onChange={(e) => setCustomMet(e.target.value)}
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="e.g., 30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="durationUnit">Unit</Label>
                <Select value={durationUnit} onValueChange={(v) => setDurationUnit(v as "min" | "hours")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="min">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {calories !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Calories Burned</p>
                <p className="text-4xl font-bold mt-1">{calories}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Based on MET value for {selectedActivity}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Activity Calorie Calculator</CardTitle>
          <CardDescription>Three simple steps to calculate calories burned</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <p className="font-medium text-sm">Enter your weight</p>
                <p className="text-xs text-muted-foreground">Input your current body weight in kilograms or pounds. Heavier people burn more calories doing the same activity, so this is a key factor in the calculation.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <p className="font-medium text-sm">Choose your activity</p>
                <p className="text-xs text-muted-foreground">Select from the dropdown list or enter a custom MET value if you know it. Each activity has a specific MET value that represents its energy cost.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <p className="font-medium text-sm">Set duration and calculate</p>
                <p className="text-xs text-muted-foreground">Enter how long you performed the activity in minutes or hours. Hit calculate and see exactly how many calories you burned.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding MET Values</CardTitle>
          <CardDescription>What MET means and how it affects calorie burn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            MET stands for Metabolic Equivalent of Task. It's a standardized way to measure how much energy different activities require. One MET equals the amount of energy your body uses while sitting quietly – basically your baseline calorie burn at complete rest.
          </p>
          <p className="text-sm text-muted-foreground">
            Here's the practical breakdown: 1 MET = 1 calorie per kilogram of body weight per hour. So if you weigh 70 kg and sit quietly (1 MET) for one hour, you burn about 70 calories. Walk at a moderate pace (3.5 METs) for that same hour, and you burn 70 × 3.5 = 245 calories.
          </p>
          <p className="text-sm text-muted-foreground">
            MET values are determined through laboratory testing where researchers measure oxygen consumption during different activities. The numbers are then averaged across populations to create standardized values. Running, for example, consistently measures around 8-12 METs because it requires that much more energy than resting.
          </p>
          <p className="text-sm text-muted-foreground">
            Why does MET vary by intensity? Simple – harder work requires more energy. Walking slowly might be 2 METs, but power walking jumps to 5 METs. Your body needs more fuel to move faster, lift heavier weights, or sustain higher effort levels. That's why intensity matters more than duration for total calorie burn in many cases.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calories Burned by Common Activities</CardTitle>
          <CardDescription>MET values for everyday exercises and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>MET Value</TableHead>
                <TableHead>Calories (70kg, 30 min)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Sitting quietly</TableCell>
                <TableCell className="font-mono text-xs">1.0</TableCell>
                <TableCell className="font-mono text-xs">~35 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Walking slowly (2 mph)</TableCell>
                <TableCell className="font-mono text-xs">2.0</TableCell>
                <TableCell className="font-mono text-xs">~70 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Walking briskly (3.5 mph)</TableCell>
                <TableCell className="font-mono text-xs">3.5</TableCell>
                <TableCell className="font-mono text-xs">~122 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Cycling moderate (12-14 mph)</TableCell>
                <TableCell className="font-mono text-xs">6.0</TableCell>
                <TableCell className="font-mono text-xs">~210 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Running (6-10 mph)</TableCell>
                <TableCell className="font-mono text-xs">8.0 - 12.0</TableCell>
                <TableCell className="font-mono text-xs">~280 - 420 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Swimming (moderate to vigorous)</TableCell>
                <TableCell className="font-mono text-xs">6.0 - 10.0</TableCell>
                <TableCell className="font-mono text-xs">~210 - 350 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Weight lifting</TableCell>
                <TableCell className="font-mono text-xs">3.0 - 6.0</TableCell>
                <TableCell className="font-mono text-xs">~105 - 210 kcal</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Note: Calories shown are for a 70 kg (154 lb) person performing each activity for 30 minutes. Actual burn varies by individual weight, fitness level, and effort.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Factors That Affect Calorie Burn</CardTitle>
          <CardDescription>Why two people burn different calories doing the same activity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Body weight</h4>
              <p className="text-xs text-muted-foreground">
                Heavier people burn more calories. A 90 kg person burns about 29% more calories than a 70 kg person doing the same activity for the same duration. More mass requires more energy to move.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Fitness level</h4>
              <p className="text-xs text-muted-foreground">
                Trained athletes are more efficient. Their bodies have adapted to perform activities with less energy waste. A beginner might burn 10-15% more calories than an experienced athlete doing the same workout.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Age</h4>
              <p className="text-xs text-muted-foreground">
                Metabolism naturally slows with age. After age 30, BMR drops about 1-2% per decade. Older adults may burn slightly fewer calories than younger people doing identical activities.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Muscle mass</h4>
              <p className="text-xs text-muted-foreground">
                More muscle means higher calorie burn. Muscle tissue is metabolically active and burns more calories than fat, even at rest. Two people at the same weight but different body compositions will burn different amounts.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Exercise intensity</h4>
              <p className="text-xs text-muted-foreground">
                How hard you push matters. Running at 8 mph burns significantly more than jogging at 5 mph. Higher intensity = higher MET value = more calories burned per minute.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exercise Intensity Zones</CardTitle>
          <CardDescription>Understanding light, moderate, and vigorous intensity</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Intensity Level</TableHead>
                <TableHead>MET Range</TableHead>
                <TableHead>Example Activities</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Light intensity</TableCell>
                <TableCell className="font-mono text-xs">2-3 MET</TableCell>
                <TableCell>Casual walking, light housework, slow dancing, fishing</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Moderate intensity</TableCell>
                <TableCell className="font-mono text-xs">3-6 MET</TableCell>
                <TableCell>Brisk walking, doubles tennis, gardening, cycling leisurely</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Vigorous intensity</TableCell>
                <TableCell className="font-mono text-xs">6+ MET</TableCell>
                <TableCell>Running, swimming laps, cycling fast, singles tennis, basketball</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Health guidelines recommend at least 150 minutes of moderate-intensity or 75 minutes of vigorous-intensity activity per week for adults.
          </p>
        </CardContent>
      </Card>

      <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "How accurate are calorie burn estimates?",
    answer: "MET-based calculations are estimates, not exact measurements. They're typically accurate within 10-20% for most people. The actual number depends on your individual metabolism, body composition, and how efficiently your body performs the activity. For most practical purposes – tracking fitness, planning weight loss – this level of accuracy is perfectly adequate.",
  },
{
    question: "Why do different activities burn different calories?",
    answer: "Different activities recruit different muscle groups and require varying levels of effort. Running uses large leg muscles continuously and requires significant cardiovascular output – that's why it burns so many calories. Sitting uses minimal muscle activity, so calorie burn stays near baseline. Activities that engage more muscle mass at higher intensity always burn more.",
  },
{
    question: "Does fitness level affect calorie burn?",
    answer: "Yes, but not in the way most people think. Fitter people are more efficient – their bodies have adapted to perform activities with less wasted energy. This means a trained runner might burn slightly fewer calories than a beginner running the same distance. However, fit people can also sustain higher intensities longer, which can offset this efficiency advantage.",
  },
{
    question: "What is the best exercise for burning calories?",
    answer: "The best exercise is the one you'll actually do consistently. That said, running, swimming, and cycling at vigorous intensities top the calorie-burn charts. High-intensity interval training (HIIT) also delivers excellent calorie burn in less time. But don't overlook walking – it's sustainable, low-impact, and the calories add up over time.",
  },
{
    question: "Do I burn calories after exercise?",
    answer: "Yes, this is called EPOC (Excess Post-exercise Oxygen Consumption) or the \"afterburn effect.\" After intense exercise, your body continues burning extra calories as it returns to baseline – repairing muscle, restoring oxygen levels, and clearing metabolic waste. The effect is modest for moderate exercise but can add 6-15% to total calorie burn after vigorous workouts.",
  }
  ]} />
</section>
    </div>
  );
}
