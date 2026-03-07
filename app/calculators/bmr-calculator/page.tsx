"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";

export default function BMRCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmr, setBmr] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(a) || isNaN(h) || isNaN(w) || a <= 0 || h <= 0 || w <= 0) return;

    let weightKg: number;
    let heightCm: number;

    if (unit === "metric") {
      weightKg = w;
      heightCm = h;
    } else {
      weightKg = w * 0.453592;
      heightCm = h * 2.54;
    }

    let bmrValue: number;
    if (gender === "male") {
      bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * a + 5;
    } else {
      bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * a - 161;
    }

    setBmr(Math.round(bmrValue));
  };

  const reset = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setBmr(null);
  };

  const activityLevels = [
    { level: "Sedentary", factor: 1.2, description: "Desk job, little to no exercise" },
    { level: "Lightly active", factor: 1.375, description: "Light exercise 1-3 days/week" },
    { level: "Moderately active", factor: 1.55, description: "Moderate exercise 3-5 days/week" },
    { level: "Very active", factor: 1.725, description: "Hard exercise 6-7 days/week" },
    { level: "Extra active", factor: 1.9, description: "Very hard exercise, physical job, or training twice per day" },
  ];

  const generateTDEEData = () => {
    if (bmr === null) return [];
    return activityLevels.map((activity) => ({
      name: activity.level.split(" ")[0],
      calories: Math.round(bmr * activity.factor),
      factor: activity.factor,
    }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={(v) => setGender(v as "male" | "female")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Unit System</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as "metric" | "imperial")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                  <SelectItem value="imperial">Imperial (inches, lbs)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="height">Height ({unit === "metric" ? "cm" : "inches"})</Label>
              <Input
                id="height"
                type="number"
                placeholder={unit === "metric" ? "e.g., 175" : "e.g., 69"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="weight">Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
              <Input
                id="weight"
                type="number"
                placeholder={unit === "metric" ? "e.g., 70" : "e.g., 154"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate BMR</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {bmr !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Your Basal Metabolic Rate (BMR)</p>
                <p className="text-4xl font-bold mt-1">{bmr} <span className="text-lg font-normal">calories/day</span></p>
                <p className="text-sm text-muted-foreground mt-2">
                  This is the number of calories your body burns at complete rest.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {bmr !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Your Daily Calorie Needs (TDEE)</CardTitle>
            <CardDescription>Calories needed based on different activity levels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-64">
              <ChartContainer
                config={{
                  calories: {
                    label: "Calories",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={generateTDEEData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="calories" fill="hsl(var(--chart-1))">
                      {generateTDEEData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 5) + 1}))`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activity Level</TableHead>
                  <TableHead>Daily Calories</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activityLevels.map((activity) => (
                  <TableRow key={activity.level}>
                    <TableCell className="font-medium">{activity.level}</TableCell>
                    <TableCell className="font-mono">{Math.round(bmr * activity.factor)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{activity.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>About BMR and the Mifflin-St Jeor Equation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your Basal Metabolic Rate (BMR) is the number of calories your body burns at complete rest. This covers basic functions like breathing, circulation, and cell production. It does not include calories burned through movement or exercise.
          </p>
          <p className="text-sm text-muted-foreground">
            The Mifflin-St Jeor equation, published in 1990, is considered the most accurate BMR formula for the general population. It replaced the older Harris-Benedict equation from 1919, which tended to overestimate calorie needs.
          </p>

          <div className="rounded-lg border p-4 bg-muted">
            <h4 className="font-semibold text-sm mb-2">The Formulas</h4>
            <div className="font-mono text-xs space-y-1">
              <p>Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5</p>
              <p>Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            To find your total daily calorie needs (TDEE), multiply your BMR by an activity factor. Sedentary folks use 1.2, while highly active people might use 1.725 or even 1.9.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>BMR Reference by Age and Gender</CardTitle>
          <CardDescription>Average BMR values for different demographics</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Age Range</TableHead>
                <TableHead>Men (avg BMR)</TableHead>
                <TableHead>Women (avg BMR)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">18-29 years</TableCell>
                <TableCell className="font-mono text-xs">1,800 - 2,000 cal/day</TableCell>
                <TableCell className="font-mono text-xs">1,400 - 1,600 cal/day</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">30-49 years</TableCell>
                <TableCell className="font-mono text-xs">1,700 - 1,900 cal/day</TableCell>
                <TableCell className="font-mono text-xs">1,350 - 1,550 cal/day</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">50+ years</TableCell>
                <TableCell className="font-mono text-xs">1,600 - 1,800 cal/day</TableCell>
                <TableCell className="font-mono text-xs">1,300 - 1,500 cal/day</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Values are approximate averages for individuals with normal body composition. Muscle mass, genetics, and health conditions affect individual BMR.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Factors That Affect Your BMR</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Muscle mass</h4>
              <p className="text-xs text-muted-foreground">
                Muscle burns more calories at rest than fat. A muscular person can have a BMR 100-300 calories higher than someone of the same weight with more body fat.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Age</h4>
              <p className="text-xs text-muted-foreground">
                BMR naturally declines with age, dropping about 1-2% per decade after age 20. This is partly due to muscle loss and hormonal changes.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Gender</h4>
              <p className="text-xs text-muted-foreground">
                Men typically have higher BMRs than women because they tend to have more muscle mass and less body fat at the same weight.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Body size</h4>
              <p className="text-xs text-muted-foreground">
                Larger bodies need more energy to maintain basic functions. Height and weight both increase BMR, which is why they are key inputs in the formula.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Hormones</h4>
              <p className="text-xs text-muted-foreground">
                Thyroid hormones directly regulate metabolism. Hyperthyroidism can raise BMR by 50% or more, while hypothyroidism can lower it significantly.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Diet and fasting</h4>
              <p className="text-xs text-muted-foreground">
                Severe calorie restriction can lower BMR as your body adapts to conserve energy. This is one reason crash diets often fail long-term.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Is BMR the same as resting metabolic rate (RMR)?</h4>
            <p className="text-xs text-muted-foreground">
              Not exactly. BMR is measured under strict conditions after waking from 8 hours of sleep and 12 hours of fasting. RMR is measured under less strict conditions and is usually slightly higher. For practical purposes, the difference is small - typically 100-200 calories.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How accurate is the Mifflin-St Jeor equation?</h4>
            <p className="text-xs text-muted-foreground">
              Studies show it predicts BMR within about 10% of measured values for most people. It is more accurate than the Harris-Benedict equation, especially for obese individuals. However, it can be off for very muscular athletes or elderly people with significant muscle loss.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I increase my BMR?</h4>
            <p className="text-xs text-muted-foreground">
              Yes, but not dramatically. Building muscle through resistance training can raise BMR by 50-100 calories per day for each kilogram of muscle gained. High-intensity interval training (HIIT) can also boost metabolism for hours after exercise.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I eat at my BMR to lose weight?</h4>
            <p className="text-xs text-muted-foreground">
              No. Eating at your BMR means you are consuming only what your body needs at rest. For weight loss, aim for a calorie deficit based on your TDEE (total daily energy expenditure), not your BMR. Eating below your BMR for extended periods can slow metabolism and cause muscle loss.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does BMR change during pregnancy?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. BMR increases during pregnancy to support fetal growth and maternal tissue expansion. The increase is about 5-10% in the first trimester, 15-25% in the second, and 20-35% in the third trimester. Calorie needs should be discussed with a healthcare provider.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
