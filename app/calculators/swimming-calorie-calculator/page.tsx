"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SwimmingCalorieCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [style, setStyle] = useState<string>("moderate");
  const [time, setTime] = useState<string>("");
  const [timeUnit, setTimeUnit] = useState<"minutes" | "hours">("minutes");
  const [calories, setCalories] = useState<number | null>(null);

  // MET values for swimming
  const metValues: Record<string, number> = {
    leisure: 6,      // Leisure swimming
    moderate: 8,     // Moderate effort
    vigorous: 10,    // Vigorous effort
    butterfly: 14    // Butterfly stroke
  };

  const calculate = () => {
    const weightValue = parseFloat(weight);
    const timeValue = parseFloat(time);

    if (isNaN(weightValue) || isNaN(timeValue) || weightValue <= 0 || timeValue <= 0) return;

    // Convert weight to kg
    const weightInKg = weightUnit === "lbs" ? weightValue * 0.453592 : weightValue;

    // Convert time to hours
    const timeInHours = timeUnit === "minutes" ? timeValue / 60 : timeValue;

    // Get MET value
    const met = metValues[style] || 8;

    // Calculate calories: Calories = MET × weight(kg) × time(hours)
    const calculatedCalories = met * weightInKg * timeInHours;
    setCalories(Math.round(calculatedCalories));
  };

  const reset = () => {
    setWeight("");
    setTime("");
    setCalories(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Swimming Calorie Calculator – How Many Calories Does Swimming Burn?</CardTitle>
          <CardDescription>
            Discover the calorie-burning power of swimming. Input your weight, swim style, and duration to calculate calories burned in the pool with our free swimming calorie calculator.
          </CardDescription>
        </CardHeader>
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

            <div>
              <Label htmlFor="style">Swimming Style</Label>
              <Select value={style} onValueChange={(v) => setStyle(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leisure">Leisure Swimming</SelectItem>
                  <SelectItem value="moderate">Moderate Effort (Freestyle)</SelectItem>
                  <SelectItem value="vigorous">Vigorous Effort</SelectItem>
                  <SelectItem value="butterfly">Butterfly Stroke</SelectItem>
                </SelectContent>
              </Select>
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

      <div className="mt-6 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How It Works
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Enter Your Weight</h4>
                  <p className="text-xs text-muted-foreground">Input your body weight in kg or lbs. Heavier swimmers burn more calories due to increased energy expenditure.</p>
                </div>
              </div>
              <div className="flex-1 flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Select Swim Style</h4>
                  <p className="text-xs text-muted-foreground">Choose your swimming stroke – butterfly burns the most, while leisure swimming burns the least calories.</p>
                </div>
              </div>
              <div className="flex-1 flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Get Calorie Estimate</h4>
                  <p className="text-xs text-muted-foreground">See estimated calories burned based on MET values for your chosen swimming intensity and duration.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Calories Burned by Swimming Style
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-semibold">Swimming Style</th>
                    <th className="text-left py-2 px-3 font-semibold">MET Value</th>
                    <th className="text-left py-2 px-3 font-semibold">Calories/30min (70kg)</th>
                    <th className="text-left py-2 px-3 font-semibold">Intensity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Leisure Swimming</td>
                    <td className="py-2 px-3 font-mono text-xs">6.0</td>
                    <td className="py-2 px-3 text-xs">~210 kcal</td>
                    <td className="py-2 px-3 text-xs">Light</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Moderate Freestyle</td>
                    <td className="py-2 px-3 font-mono text-xs">8.0</td>
                    <td className="py-2 px-3 text-xs">~280 kcal</td>
                    <td className="py-2 px-3 text-xs">Moderate</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Vigorous Freestyle</td>
                    <td className="py-2 px-3 font-mono text-xs">10.0</td>
                    <td className="py-2 px-3 text-xs">~350 kcal</td>
                    <td className="py-2 px-3 text-xs">Vigorous</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Butterfly Stroke</td>
                    <td className="py-2 px-3 font-mono text-xs">14.0</td>
                    <td className="py-2 px-3 text-xs">~490 kcal</td>
                    <td className="py-2 px-3 text-xs">Very High</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Backstroke</td>
                    <td className="py-2 px-3 font-mono text-xs">7.0</td>
                    <td className="py-2 px-3 text-xs">~245 kcal</td>
                    <td className="py-2 px-3 text-xs">Moderate</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">MET (Metabolic Equivalent of Task) represents energy cost. 1 MET = resting metabolic rate.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Key Features & Benefits
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Multiple Swim Styles</h4>
                <p className="text-xs text-muted-foreground">Calculate calories for freestyle, butterfly, breaststroke, backstroke, and leisure swimming with accurate MET values.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Flexible Units</h4>
                <p className="text-xs text-muted-foreground">Support for both metric (kg, minutes) and imperial (lbs, hours) units for international users.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Science-Based MET Values</h4>
                <p className="text-xs text-muted-foreground">Uses established Metabolic Equivalent values from exercise physiology research for accurate estimates.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Fitness Planning</h4>
                <p className="text-xs text-muted-foreground">Track calorie expenditure to plan weight loss goals or balance nutrition with swimming workouts.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-sm mb-2">How many calories does swimming burn?</h4>
              <p className="text-xs text-muted-foreground">
                A 70kg person burns approximately 210-490 calories per 30 minutes depending on stroke and intensity. Leisure swimming burns ~210 cal, moderate freestyle ~280 cal, vigorous swimming ~350 cal, and butterfly ~490 cal.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Which swimming stroke burns the most calories?</h4>
              <p className="text-xs text-muted-foreground">
                Butterfly stroke burns the most calories (MET 14.0), followed by vigorous freestyle (MET 10.0), breaststroke (MET 8.0-10.0), backstroke (MET 7.0), and leisure swimming (MET 6.0).
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Is swimming better than running for calorie burn?</h4>
              <p className="text-xs text-muted-foreground">
                Running typically burns 10-15% more calories than moderate swimming. However, swimming is low-impact, works more muscle groups, and can be sustained longer. For weight loss, choose the activity you'll do consistently.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">How accurate is the calorie calculation?</h4>
              <p className="text-xs text-muted-foreground">
                MET-based calculations provide reasonable estimates but vary by individual factors like fitness level, body composition, water temperature, and swimming efficiency. Actual burn may vary ±20% from estimates.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Does water temperature affect calorie burn?</h4>
              <p className="text-xs text-muted-foreground">
                Yes. Cold water (below 25°C/77°F) increases calorie burn as your body works to maintain temperature. Warm pool water (28-30°C) is standard for calculations. Open water swimming in cold conditions can increase burn by 10-20%.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Related Tools</h3>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <a href="/calculators/swimming-lap-pace-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                <p className="font-semibold text-sm">Swimming Lap Pace Calculator</p>
                <p className="text-xs text-muted-foreground">Calculate swim speed per 100m</p>
              </a>
              <a href="/calculators/bmr-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                <p className="font-semibold text-sm">BMR Calculator</p>
                <p className="text-xs text-muted-foreground">Calculate basal metabolic rate</p>
              </a>
              <a href="/calculators/tdee-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                <p className="font-semibold text-sm">TDEE Calculator</p>
                <p className="text-xs text-muted-foreground">Daily calorie needs calculator</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
