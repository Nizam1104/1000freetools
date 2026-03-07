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

export default function TDEECalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("sedentary");
  const [results, setResults] = useState<{
    bmr: number;
    tdee: number;
    weightLoss: number;
    weightGain: number;
  } | null>(null);

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
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * a + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * a - 161;
    }

    // Activity multipliers
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    const multiplier = activityMultipliers[activityLevel] || 1.2;
    const tdee = Math.round(bmr * multiplier);

    // Weight loss (15% deficit) and weight gain (15% surplus)
    const weightLoss = Math.round(tdee * 0.85);
    const weightGain = Math.round(tdee * 1.15);

    setResults({
      bmr: Math.round(bmr),
      tdee,
      weightLoss,
      weightGain,
    });
  };

  const reset = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setActivityLevel("sedentary");
    setResults(null);
  };

  const getActivityDescription = () => {
    switch (activityLevel) {
      case "sedentary":
        return "Desk job, little or no exercise";
      case "light":
        return "Light exercise 1-3 days per week";
      case "moderate":
        return "Moderate exercise 3-5 days per week";
      case "active":
        return "Hard exercise 6-7 days per week";
      case "veryActive":
        return "Very hard exercise daily or physical job";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
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
              {activityLevel && (
                <p className="text-xs text-muted-foreground mt-1">{getActivityDescription()}</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate TDEE</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Your TDEE (Total Daily Energy Expenditure)</p>
                  <p className="text-4xl font-bold mt-1">
                    {results.tdee} <span className="text-lg font-normal">calories/day</span>
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="text-center p-3 bg-background rounded-md">
                    <p className="text-xs text-muted-foreground">BMR</p>
                    <p className="text-lg font-bold">{results.bmr}</p>
                    <p className="text-xs text-muted-foreground">calories</p>
                  </div>
                  <div className="text-center p-3 bg-background rounded-md">
                    <p className="text-xs text-muted-foreground">Weight Loss</p>
                    <p className="text-lg font-bold text-green-600">{results.weightLoss}</p>
                    <p className="text-xs text-muted-foreground">calories/day</p>
                  </div>
                  <div className="text-center p-3 bg-background rounded-md">
                    <p className="text-xs text-muted-foreground">Weight Gain</p>
                    <p className="text-lg font-bold text-orange-600">{results.weightGain}</p>
                    <p className="text-xs text-muted-foreground">calories/day</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    To maintain your weight, consume approximately {results.tdee} calories per day.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    For gradual weight loss (~0.5 kg/week), aim for {results.weightLoss} calories/day.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    For gradual weight gain (~0.5 kg/week), aim for {results.weightGain} calories/day.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What Is TDEE?</CardTitle>
          <CardDescription>Understanding your Total Daily Energy Expenditure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            TDEE stands for Total Daily Energy Expenditure. It's the total number of calories your body burns in a day, including everything from breathing and digesting food to walking around and exercising. Think of it as your body's daily calorie budget.
          </p>
          <p className="text-sm text-muted-foreground">
            Your TDEE is made up of four parts: your Basal Metabolic Rate (BMR) – the calories you'd burn just lying in bed all day – plus the calories you burn through digestion, daily movement, and intentional exercise. Most people's BMR accounts for about 60-75% of their total daily burn.
          </p>
          <p className="text-sm text-muted-foreground">
            Knowing your TDEE helps you make informed decisions about eating. Want to lose weight? Eat below your TDEE. Want to gain muscle? Eat above it. Want to stay the same? Match it. No guesswork, just numbers.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Your TDEE</CardTitle>
          <CardDescription>Step-by-step guide</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <p className="font-medium text-sm">Calculate your BMR</p>
                <p className="text-xs text-muted-foreground">We use the Mifflin-St Jeor equation, which factors in your weight, height, age, and gender. It's considered one of the most accurate BMR formulas available.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <p className="font-medium text-sm">Pick your activity level</p>
                <p className="text-xs text-muted-foreground">Be honest here. "Moderately active" doesn't mean you walked to the fridge three times. It means you actually exercise 3-5 days a week.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <p className="font-medium text-sm">Multiply BMR by activity factor</p>
                <p className="text-xs text-muted-foreground">Your BMR gets multiplied by a number between 1.2 (couch potato) and 1.9 (professional athlete) to get your TDEE.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Level Multipliers</CardTitle>
          <CardDescription>How much your lifestyle affects calorie burn</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity Level</TableHead>
                <TableHead>Multiplier</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Sedentary</TableCell>
                <TableCell className="font-mono text-xs">1.2</TableCell>
                <TableCell>Desk job, little or no exercise</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Lightly Active</TableCell>
                <TableCell className="font-mono text-xs">1.375</TableCell>
                <TableCell>Light exercise 1-3 days per week</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Moderately Active</TableCell>
                <TableCell className="font-mono text-xs">1.55</TableCell>
                <TableCell>Moderate exercise 3-5 days per week</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Active</TableCell>
                <TableCell className="font-mono text-xs">1.725</TableCell>
                <TableCell>Hard exercise 6-7 days per week</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Very Active</TableCell>
                <TableCell className="font-mono text-xs">1.9</TableCell>
                <TableCell>Very hard exercise daily or physical job</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>TDEE for Weight Goals</CardTitle>
          <CardDescription>How to adjust your calories</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <h4 className="font-semibold text-sm mb-2">Maintenance</h4>
            <p className="text-xs text-muted-foreground">
              Eat at your TDEE. This keeps your weight stable. Good for people who want to focus on performance or body recomposition.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h4 className="font-semibold text-sm mb-2">Weight Loss</h4>
            <p className="text-xs text-muted-foreground">
              Eat 15-20% below your TDEE. A 500-calorie daily deficit typically produces about 1 pound of weight loss per week. Don't go too aggressive – you'll just feel miserable and quit.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h4 className="font-semibold text-sm mb-2">Weight Gain</h4>
            <p className="text-xs text-muted-foreground">
              Eat 10-15% above your TDEE. If you're lifting weights, most of this will go to muscle. If you're sedentary... well, you know where it'll go.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Is TDEE the same as BMR?</h4>
            <p className="text-xs text-muted-foreground">
              No. BMR (Basal Metabolic Rate) is what you'd burn lying in a coma all day. TDEE includes everything else – walking, talking, fidgeting, working out. TDEE is always higher than BMR, usually by 20-90% depending on how much you move.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How accurate is the TDEE calculator?</h4>
            <p className="text-xs text-muted-foreground">
              It's an estimate, not a crystal ball. The Mifflin-St Jeor equation is accurate for most people within about 10-15%. Your actual TDEE depends on genetics, muscle mass, and how honest you are about your activity level. Use it as a starting point and adjust based on real results.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I eat back exercise calories?</h4>
            <p className="text-xs text-muted-foreground">
              If you calculated your TDEE correctly, no. Your activity multiplier already accounts for your exercise routine. Eating back calories burned during workouts is a common mistake that stalls weight loss.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why isn't my weight changing even though I'm eating at my TDEE?</h4>
            <p className="text-xs text-muted-foreground">
              Give it two weeks. Daily weight fluctuates from water retention, salt intake, and digestion. Track your weekly average, not daily numbers. If there's no trend after 2-3 weeks, recalculate your TDEE or check if you're underestimating food intake.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use TDEE for weight loss?</h4>
            <p className="text-xs text-muted-foreground">
              Absolutely. That's what it's for. Subtract 500 calories from your TDEE for steady, sustainable weight loss. Most people should aim to lose 0.5-2 pounds per week. Anything faster usually means muscle loss and rebound weight gain.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
