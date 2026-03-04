"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Flame, Activity, Timer } from "lucide-react";

interface METResult {
  calories: number;
  caloriesPerMinute: number;
  metValue: number;
  intensity: string;
}

export default function MetCalorieCalculatorPage() {
  const [weight, setWeight] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [metValue, setMetValue] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [durationUnit, setDurationUnit] = useState<"minutes" | "hours">("minutes");
  const [activity, setActivity] = useState<string>("");
  const [result, setResult] = useState<METResult | null>(null);

  const commonActivities = [
    { name: "Sitting quietly", met: 1.0 },
    { name: "Walking slowly (2 mph)", met: 2.5 },
    { name: "Walking briskly (3.5 mph)", met: 4.3 },
    { name: "Running (6 mph)", met: 9.8 },
    { name: "Cycling moderate (12-14 mph)", met: 8.0 },
    { name: "Swimming laps", met: 8.3 },
    { name: "Weight training", met: 6.0 },
    { name: "Yoga", met: 3.0 },
    { name: "Dancing", met: 5.0 },
    { name: "Basketball game", met: 8.0 },
  ];

  const calculateCalories = () => {
    const w = parseFloat(weight);
    const d = parseFloat(duration);
    const met = parseFloat(metValue);

    if (isNaN(w) || isNaN(d) || isNaN(met) || w <= 0 || d <= 0 || met <= 0) {
      setResult(null);
      return;
    }

    let weightInKg = w;
    let durationInHours = d;

    if (weightUnit === "lb") {
      weightInKg = w * 0.453592;
    }

    if (durationUnit === "minutes") {
      durationInHours = d / 60;
    }

    const calories = met * weightInKg * durationInHours;
    const caloriesPerMinute = calories / (durationUnit === "minutes" ? d : d * 60);

    let intensity = "";
    if (met < 3) intensity = "Light intensity";
    else if (met < 6) intensity = "Moderate intensity";
    else if (met < 9) intensity = "Vigorous intensity";
    else intensity = "Very vigorous intensity";

    setResult({
      calories: Math.round(calories * 10) / 10,
      caloriesPerMinute: Math.round(caloriesPerMinute * 100) / 100,
      metValue: met,
      intensity,
    });
  };

  const reset = () => {
    setWeight("");
    setDuration("");
    setMetValue("");
    setActivity("");
    setResult(null);
  };

  const selectActivity = (met: number, name: string) => {
    setMetValue(met.toString());
    setActivity(name);
  };

  useEffect(() => {
    calculateCalories();
  }, [weight, duration, metValue, weightUnit, durationUnit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">MET Calorie Calculator – Calculate Calories Burned by Activity</h1>
          <p className="text-muted-foreground">
            Estimate calories burned during exercise and daily activities using MET (Metabolic Equivalent of Task) values. This free calculator helps track energy expenditure for weight management and fitness goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Your Details</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Body Weight</Label>
                    <div className="flex gap-2">
                      <Input
                        id="weight"
                        type="number"
                        placeholder="e.g., 70"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={weightUnit}
                        onChange={(e) => setWeightUnit(e.target.value as any)}
                        className="w-20 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="kg">kg</option>
                        <option value="lb">lb</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <div className="flex gap-2">
                      <Input
                        id="duration"
                        type="number"
                        placeholder="e.g., 30"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={durationUnit}
                        onChange={(e) => setDurationUnit(e.target.value as any)}
                        className="w-24 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="minutes">min</option>
                        <option value="hours">hr</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metValue">MET Value</Label>
                    <Input
                      id="metValue"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 8.0"
                      value={metValue}
                      onChange={(e) => setMetValue(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Common Activities</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {commonActivities.map((act) => (
                    <button
                      key={act.name}
                      onClick={() => selectActivity(act.met, act.name)}
                      className={`p-3 text-left text-sm rounded-lg border transition-colors ${
                        activity === act.name ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50"
                      }`}
                    >
                      <span className="font-medium">{act.name}</span>
                      <span className="text-muted-foreground ml-2">({act.met} MET)</span>
                    </button>
                  ))}
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  1 MET = resting metabolic rate (about 1 calorie per kg per hour). Higher MET = more calories burned.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateCalories} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Calories Burned</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Calories</p>
                    <p className="text-3xl font-bold text-primary">{result.calories} kcal</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Per Minute</p>
                      <p className="text-lg font-semibold">{result.caloriesPerMinute} kcal</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">MET Value</p>
                      <p className="text-lg font-semibold">{result.metValue}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Intensity Level</p>
                    <p className="font-semibold">{result.intensity}</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong> Calories = MET × weight(kg) × time(hr)</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Flame className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter your details to calculate calories burned</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How MET Values Work</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Understand MET</h3>
                <p className="text-sm text-muted-foreground">MET measures activity intensity relative to resting. 1 MET = sitting quietly.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Enter Your Stats</h3>
                <p className="text-sm text-muted-foreground">Input weight, duration, and select or enter the MET value for your activity.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Get Calories</h3>
                <p className="text-sm text-muted-foreground">Calculator shows total energy expenditure for your activity session.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  MET-Based Calculation
                </h3>
                <p className="text-sm text-muted-foreground">Uses scientifically validated MET values for accurate calorie estimates.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Activity Library
                </h3>
                <p className="text-sm text-muted-foreground">Quick-select common exercises with pre-loaded MET values.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Multiple Units
                </h3>
                <p className="text-sm text-muted-foreground">Support for kg/lbs weight and minutes/hours duration.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Intensity Classification
                </h3>
                <p className="text-sm text-muted-foreground">Shows whether activity is light, moderate, or vigorous intensity.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is a MET value?</h3>
                <p className="text-sm text-muted-foreground">MET (Metabolic Equivalent of Task) measures activity intensity. 1 MET is resting metabolism. Walking might be 3-4 METs, running 8-12 METs.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How accurate are MET calorie estimates?</h3>
                <p className="text-sm text-muted-foreground">MET calculations provide reasonable estimates within 10-20% for most people. Individual variation exists based on fitness, body composition, and efficiency.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Does weight affect calories burned?</h3>
                <p className="text-sm text-muted-foreground">Yes, heavier people burn more calories doing the same activity. The formula multiplies MET by body weight, so a 200 lb person burns about 25% more than a 160 lb person.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What burns more calories, cardio or weights?</h3>
                <p className="text-sm text-muted-foreground">Cardio typically has higher MET values (8-12) than weight training (6-8). However, weights build muscle which increases resting metabolism over time.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do I use this for weight loss?</h3>
                <p className="text-sm text-muted-foreground">Track daily calorie expenditure from exercise. Combine with a moderate calorie deficit from diet. Aim for 300-500 calories burned per session for sustainable weight loss.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Related Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/calorie-deficit-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Calorie Deficit Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate daily calorie needs for weight loss.</p>
              </a>
              <a href="/calculators/bmr-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">BMR Calculator</h3>
                <p className="text-sm text-muted-foreground">Find your basal metabolic rate at rest.</p>
              </a>
              <a href="/calculators/tdee-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">TDEE Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate total daily energy expenditure.</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
