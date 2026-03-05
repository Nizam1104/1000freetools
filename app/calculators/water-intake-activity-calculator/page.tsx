"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Droplets, Activity } from "lucide-react";

interface WaterResult {
  baseIntake: number;
  activityAddition: number;
  totalIntake: number;
  unit: string;
  bottles: number;
}

export default function WaterIntakeActivityCalculatorPage() {
  const [weight, setWeight] = useState<string>("");
  const [activityDuration, setActivityDuration] = useState<string>("");
  const [activityIntensity, setActivityIntensity] = useState<"light" | "moderate" | "intense">("moderate");
  const [climate, setClimate] = useState<"normal" | "hot" | "humid">("normal");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [result, setResult] = useState<WaterResult | null>(null);

  const calculateWaterIntake = () => {
    const w = parseFloat(weight);
    const duration = parseFloat(activityDuration) || 0;

    if (isNaN(w) || w <= 0) {
      setResult(null);
      return;
    }

    let weightInKg = w;
    if (weightUnit === "lb") {
      weightInKg = w * 0.453592;
    }

    let baseIntake = weightInKg * 0.033;

    const intensityRates = {
      light: 0.3,
      moderate: 0.5,
      intense: 0.8,
    };

    const activityAddition = (duration / 30) * intensityRates[activityIntensity];

    let climateMultiplier = 1.0;
    if (climate === "hot") climateMultiplier = 1.15;
    if (climate === "humid") climateMultiplier = 1.10;

    const totalIntake = (baseIntake + activityAddition) * climateMultiplier;
    const bottles = totalIntake / 0.5;

    setResult({
      baseIntake: Math.round(baseIntake * 10) / 10,
      activityAddition: Math.round(activityAddition * 10) / 10,
      totalIntake: Math.round(totalIntake * 10) / 10,
      unit: "liters",
      bottles: Math.round(bottles * 10) / 10,
    });
  };

  const reset = () => {
    setWeight("");
    setActivityDuration("");
    setResult(null);
  };

  useEffect(() => {
    calculateWaterIntake();
  }, [weight, activityDuration, activityIntensity, climate, weightUnit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Water Intake Calculator – Calculate Daily Water Needs Based on Activity</h1>
          <p className="text-muted-foreground">
            Calculate your daily water intake needs based on body weight, exercise duration, and climate. This hydration calculator helps you stay properly hydrated for optimal health and performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Your Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
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
                    <Label htmlFor="activityDuration">Exercise Duration (minutes)</Label>
                    <Input
                      id="activityDuration"
                      type="number"
                      placeholder="e.g., 60"
                      value={activityDuration}
                      onChange={(e) => setActivityDuration(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activityIntensity">Activity Intensity</Label>
                    <select
                      id="activityIntensity"
                      value={activityIntensity}
                      onChange={(e) => setActivityIntensity(e.target.value as any)}
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      <option value="light">Light (walking, yoga)</option>
                      <option value="moderate">Moderate (jogging, cycling)</option>
                      <option value="intense">Intense (HIIT, running, sports)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="climate">Climate</Label>
                    <select
                      id="climate"
                      value={climate}
                      onChange={(e) => setClimate(e.target.value as any)}
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      <option value="normal">Normal/Temperate</option>
                      <option value="hot">Hot/Dry</option>
                      <option value="humid">Hot/Humid</option>
                    </select>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Base recommendation: 33ml per kg of body weight. Add 300-800ml per 30 minutes of exercise depending on intensity.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateWaterIntake} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Daily Water Intake</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Daily Intake</p>
                    <p className="text-3xl font-bold text-primary">{result.totalIntake} L</p>
                    <p className="text-sm text-muted-foreground">{(result.totalIntake * 1000).toFixed(0)} ml</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Base Intake</p>
                      <p className="text-lg font-semibold">{result.baseIntake} L</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Exercise Add</p>
                      <p className="text-lg font-semibold">{result.activityAddition} L</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">In 500ml Bottles</p>
                    <p className="text-2xl font-semibold">{result.bottles} bottles</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p>Drink throughout the day, not all at once. Increase intake in hot weather or during illness.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Droplets className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter your details to calculate water needs</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Hydration Guidelines</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Daily Recommendations:
                </h4>
                <ul className="space-y-1">
                  <li><strong>Base intake:</strong> 33ml per kg body weight</li>
                  <li><strong>Light exercise:</strong> +300ml per 30 min</li>
                  <li><strong>Moderate exercise:</strong> +500ml per 30 min</li>
                  <li><strong>Intense exercise:</strong> +800ml per 30 min</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Hydration Tips:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Drink before you feel thirsty</li>
                  <li>Check urine color (pale = hydrated)</li>
                  <li>Drink 500ml upon waking</li>
                  <li>Sip during exercise, don't chug</li>
                  <li>Electrolytes needed for long sessions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How much water should I drink daily?</h3>
                <p className="text-sm text-muted-foreground">A general guideline is 33ml per kg of body weight. For a 70kg person, that's about 2.3 liters. Add more for exercise, hot weather, or illness.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Can I drink too much water?</h3>
                <p className="text-sm text-muted-foreground">Yes, excessive water intake can cause hyponatremia (low blood sodium). This is rare but can occur in endurance athletes who drink only water without electrolytes.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Does coffee count toward water intake?</h3>
                <p className="text-sm text-muted-foreground">Yes, despite caffeine's mild diuretic effect, coffee and tea still contribute to hydration. About 80-90% of the fluid is retained by your body.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do I know if I'm dehydrated?</h3>
                <p className="text-sm text-muted-foreground">Signs include dark urine, dry mouth, headache, fatigue, and dizziness. Check urine color - pale yellow means you're well hydrated.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Should I drink more in hot weather?</h3>
                <p className="text-sm text-muted-foreground">Yes, hot and humid conditions increase sweat loss. Add 15-20% more water in hot weather and drink before you feel thirsty.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Related Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/bmi-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">BMI Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate body mass index.</p>
              </a>
              <a href="/calculators/calorie-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Calorie Calculator</h3>
                <p className="text-sm text-muted-foreground">Find your daily calorie needs.</p>
              </a>
              <a href="/calculators/sweat-rate-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Sweat Rate Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate fluid loss during exercise.</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
