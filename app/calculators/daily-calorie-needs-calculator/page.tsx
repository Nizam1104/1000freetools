"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";

export default function DailyCalorieNeedsCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("sedentary");
  const [tdee, setTdee] = useState<number | null>(null);
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

    // Calculate BMR using Mifflin-St Jeor equation
    let bmrValue: number;
    if (gender === "male") {
      bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * a + 5;
    } else {
      bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * a - 161;
    }

    setBmr(Math.round(bmrValue));

    // Activity multipliers
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    const multiplier = activityMultipliers[activityLevel] || 1.2;
    const tdeeValue = bmrValue * multiplier;

    setTdee(Math.round(tdeeValue));
  };

  const reset = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setActivityLevel("sedentary");
    setTdee(null);
    setBmr(null);
  };

  // Generate calorie goals chart
  const calorieGoals = tdee ? [
    { goal: "Maintain", calories: tdee, fill: "hsl(var(--chart-1))" },
    { goal: "Mild Loss", calories: Math.round(tdee * 0.9), fill: "hsl(var(--chart-2))" },
    { goal: "Weight Loss", calories: Math.round(tdee * 0.85), fill: "hsl(var(--chart-3))" },
    { goal: "Extreme Loss", calories: Math.round(tdee * 0.75), fill: "hsl(var(--chart-4))" },
    { goal: "Mild Gain", calories: Math.round(tdee * 1.05), fill: "hsl(var(--chart-5))" },
    { goal: "Weight Gain", calories: Math.round(tdee * 1.1), fill: "hsl(var(--chart-6))" },
  ] : [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
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
            </div>

            <div className="grid md:grid-cols-3 gap-4">
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
            </div>

            <div>
              <Label>Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="light">Lightly Active (1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderately Active (3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                  <SelectItem value="veryActive">Very Active (hard exercise daily)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Daily Calories</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {tdee !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Your Daily Calorie Needs (TDEE)</p>
                <p className="text-4xl font-bold mt-1">{tdee} <span className="text-lg font-normal">calories/day</span></p>
                <p className="text-sm text-muted-foreground mt-2">
                  BMR (basal metabolic rate): {bmr} calories/day
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  This is the estimated number of calories you need to maintain your current weight.
                </p>
              </div>
            )}
          </div>

          {calorieGoals.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Calorie Goals for Different Targets</h3>
              <div className="h-[250px]">
                <ChartContainer
                  config={{
                    calories: { label: "Daily Calories", color: "hsl(var(--chart-1))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={calorieGoals}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="goal" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="calories" fill="#8884d8">
                        {calorieGoals.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Safe weight loss: 500-750 calorie deficit (0.5-1 lb/week). Avoid going below 1200 (women) or 1500 (men) without medical supervision.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Your Calorie Needs</CardTitle>
          <CardDescription>BMR vs TDEE explained</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            BMR (Basal Metabolic Rate) is what you'd burn lying in bed all day – breathing, circulating blood, cell repair. It's your body's idle power consumption. For most people, BMR is 1200-1800 calories.
          </p>
          <p className="text-sm text-muted-foreground">
            TDEE (Total Daily Energy Expenditure) includes everything: BMR plus walking, exercising, digesting food, even fidgeting. TDEE is typically 1.2-1.9× your BMR depending on activity. This is your maintenance calories – eat this much and weight stays stable.
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-semibold mb-2">Calorie Deficits and Surpluses</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Goal</TableHead>
                  <TableHead>Calorie Adjustment</TableHead>
                  <TableHead>Expected Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Extreme loss</TableCell>
                  <TableCell className="font-mono text-xs">-25% TDEE</TableCell>
                  <TableCell className="text-xs">~1.5 lb/week (not recommended long-term)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Weight loss</TableCell>
                  <TableCell className="font-mono text-xs">-15% TDEE</TableCell>
                  <TableCell className="text-xs">~1 lb/week (sustainable)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mild loss</TableCell>
                  <TableCell className="font-mono text-xs">-10% TDEE</TableCell>
                  <TableCell className="text-xs">~0.5 lb/week (easy to maintain)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Maintain</TableCell>
                  <TableCell className="font-mono text-xs">0% (eat at TDEE)</TableCell>
                  <TableCell className="text-xs">Weight stable</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mild gain</TableCell>
                  <TableCell className="font-mono text-xs">+5% TDEE</TableCell>
                  <TableCell className="text-xs">~0.25 lb/week (lean bulk)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Weight gain</TableCell>
                  <TableCell className="font-mono text-xs">+10% TDEE</TableCell>
                  <TableCell className="text-xs">~0.5 lb/week (muscle gain)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Level Guide</CardTitle>
          <CardDescription>Choosing the right multiplier</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Level</TableHead>
                <TableHead>Multiplier</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Sedentary</TableCell>
                <TableCell className="font-mono text-xs">1.2</TableCell>
                <TableCell className="text-xs">Desk job, little or no exercise, mostly sitting</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Lightly Active</TableCell>
                <TableCell className="font-mono text-xs">1.375</TableCell>
                <TableCell className="text-xs">Light exercise 1-3 days/week, or standing job</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Moderately Active</TableCell>
                <TableCell className="font-mono text-xs">1.55</TableCell>
                <TableCell className="text-xs">Moderate exercise 3-5 days/week, or active job</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Active</TableCell>
                <TableCell className="font-mono text-xs">1.725</TableCell>
                <TableCell className="text-xs">Hard exercise 6-7 days/week, or physical job</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Very Active</TableCell>
                <TableCell className="font-mono text-xs">1.9</TableCell>
                <TableCell className="text-xs">Very hard exercise daily, or labor-intensive job</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Be honest about your activity level. Most people overestimate. "Lightly Active" means you actually work out 1-3 times per week, not that you walked to the car.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calorie Needs by Age and Gender</CardTitle>
          <CardDescription>General guidelines (moderately active)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Age</TableHead>
                <TableHead>Women (calories/day)</TableHead>
                <TableHead>Men (calories/day)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">18-25</TableCell>
                <TableCell className="font-mono text-xs">2,000-2,200</TableCell>
                <TableCell className="font-mono text-xs">2,400-2,800</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">26-35</TableCell>
                <TableCell className="font-mono text-xs">1,900-2,100</TableCell>
                <TableCell className="font-mono text-xs">2,300-2,700</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">36-45</TableCell>
                <TableCell className="font-mono text-xs">1,800-2,000</TableCell>
                <TableCell className="font-mono text-xs">2,200-2,600</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">46-55</TableCell>
                <TableCell className="font-mono text-xs">1,700-1,900</TableCell>
                <TableCell className="font-mono text-xs">2,100-2,500</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">56-65</TableCell>
                <TableCell className="font-mono text-xs">1,600-1,800</TableCell>
                <TableCell className="font-mono text-xs">2,000-2,400</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">65+</TableCell>
                <TableCell className="font-mono text-xs">1,500-1,700</TableCell>
                <TableCell className="font-mono text-xs">1,900-2,300</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            These are averages for moderately active adults. Individual needs vary based on weight, height, muscle mass, and actual activity level. Use the calculator above for personalized results.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How accurate is this calorie calculator?</h4>
            <p className="text-xs text-muted-foreground">
              The Mifflin-St Jeor equation used here is accurate within about 10% for most people. That's ±200-300 calories for average adults. Use the result as a starting point, then adjust based on actual results over 2-4 weeks.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why am I not losing weight at my calculated deficit?</h4>
            <p className="text-xs text-muted-foreground">
              Common reasons: underestimating food intake (people typically undercount by 30-50%), overestimating activity, water retention masking fat loss, or your actual TDEE is lower than calculated. Track everything precisely for 2 weeks, then adjust.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I eat back exercise calories?</h4>
            <p className="text-xs text-muted-foreground">
              If you calculated TDEE correctly with your actual activity level, no – it's already included. Fitness trackers notoriously overestimate calories burned. If you use sedentary TDEE and exercise separately, add back 50-75% of tracked calories (they overestimate).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How low can I go on calories?</h4>
            <p className="text-xs text-muted-foreground">
              Minimum safe intake: 1,200 calories/day for women, 1,500 for men. Below this, it's hard to get adequate nutrients. Very low calorie diets (under 800) should only be done under medical supervision. Slow loss is more sustainable anyway.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Do calorie needs change with weight loss?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. As you lose weight, your BMR drops – smaller bodies need fewer calories. Recalculate every 10-15 lbs lost. Also, metabolic adaptation can reduce TDEE by an extra 5-15% beyond what weight loss alone predicts.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
