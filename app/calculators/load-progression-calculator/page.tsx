"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, TrendingUp, Dumbbell, Target } from "lucide-react";

interface ProgressionResult {
  nextWeight: number;
  weeklyIncrease: number;
  fourWeekProjection: number;
  eightWeekProjection: number;
  unit: string;
}

export default function LoadProgressionCalculatorPage() {
  const [currentWeight, setCurrentWeight] = useState<string>("");
  const [currentReps, setCurrentReps] = useState<string>("");
  const [targetReps, setTargetReps] = useState<string>("");
  const [experience, setExperience] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [result, setResult] = useState<ProgressionResult | null>(null);

  const calculateProgression = () => {
    const weight = parseFloat(currentWeight);
    const reps = parseFloat(currentReps);
    const target = parseFloat(targetReps);

    if (isNaN(weight) || isNaN(reps) || isNaN(target) || weight <= 0 || reps <= 0 || target <= 0) {
      setResult(null);
      return;
    }

    const repIncrease = target - reps;
    let weeklyIncrease = 0;

    if (experience === "beginner") {
      weeklyIncrease = weight * 0.05;
    } else if (experience === "intermediate") {
      weeklyIncrease = weight * 0.025;
    } else {
      weeklyIncrease = weight * 0.01;
    }

    weeklyIncrease = Math.max(2.5, Math.round(weeklyIncrease / 2.5) * 2.5);

    const nextWeight = weight + weeklyIncrease;
    const fourWeekProjection = weight + (weeklyIncrease * 4);
    const eightWeekProjection = weight + (weeklyIncrease * 8);

    setResult({
      nextWeight: Math.round(nextWeight * 10) / 10,
      weeklyIncrease,
      fourWeekProjection: Math.round(fourWeekProjection),
      eightWeekProjection: Math.round(eightWeekProjection),
      unit: "lbs",
    });
  };

  const reset = () => {
    setCurrentWeight("");
    setCurrentReps("");
    setTargetReps("");
    setResult(null);
  };

  useEffect(() => {
    calculateProgression();
  }, [currentWeight, currentReps, targetReps, experience]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Load Progression Calculator – Plan Your Strength Training Increases</h1>
          <p className="text-muted-foreground">
            Calculate optimal weight increases for your strength training program. This progressive overload calculator helps you plan weekly load increases based on your experience level and rep targets.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Current Lift Data</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentWeight">Current Weight (lbs)</Label>
                    <Input
                      id="currentWeight"
                      type="number"
                      placeholder="e.g., 225"
                      value={currentWeight}
                      onChange={(e) => setCurrentWeight(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentReps">Current Reps</Label>
                    <Input
                      id="currentReps"
                      type="number"
                      placeholder="e.g., 5"
                      value={currentReps}
                      onChange={(e) => setCurrentReps(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetReps">Target Reps</Label>
                    <Input
                      id="targetReps"
                      type="number"
                      placeholder="e.g., 8"
                      value={targetReps}
                      onChange={(e) => setTargetReps(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="experience">Experience Level</Label>
                  <select
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value as any)}
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background mt-2"
                  >
                    <option value="beginner">Beginner (&lt;1 year) - 5% weekly</option>
                    <option value="intermediate">Intermediate (1-3 years) - 2.5% weekly</option>
                    <option value="advanced">Advanced (3+ years) - 1% weekly</option>
                  </select>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Progressive overload is key to strength gains. Increase weight when you hit the top of your rep range consistently.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateProgression} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Progression Plan</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Next Session Weight</p>
                    <p className="text-3xl font-bold text-primary">{result.nextWeight} lbs</p>
                    <p className="text-sm text-muted-foreground">+{result.weeklyIncrease} lbs increase</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">4-Week Goal</p>
                      <p className="text-lg font-semibold">{result.fourWeekProjection} lbs</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">8-Week Goal</p>
                      <p className="text-lg font-semibold">{result.eightWeekProjection} lbs</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Rep Progression</p>
                    <p className="font-semibold">{currentReps} → {targetReps} reps</p>
                    <p className="text-xs text-muted-foreground mt-1">Then increase weight and repeat</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Tip:</strong> Add weight only after hitting target reps with good form for all sets.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Dumbbell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter your current lift to plan progression</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Progressive Overload Principles</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Weekly Increases:
                </h4>
                <ul className="space-y-1">
                  <li><strong>Beginner:</strong> 5% or 5-10 lbs per week</li>
                  <li><strong>Intermediate:</strong> 2.5% or 2.5-5 lbs per week</li>
                  <li><strong>Advanced:</strong> 1% or 1-2.5 lbs per week</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Progression Methods:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Increase weight (most common)</li>
                  <li>Add more reps with same weight</li>
                  <li>Add more sets</li>
                  <li>Improve tempo and control</li>
                  <li>Reduce rest between sets</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Use Progressive Overload</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Start Conservative</h3>
                <p className="text-sm text-muted-foreground">Begin with a weight you can lift for your target reps with good form.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Track Every Workout</h3>
                <p className="text-sm text-muted-foreground">Log weights, reps, and sets to monitor progress over time.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Add Weight Gradually</h3>
                <p className="text-sm text-muted-foreground">Increase load when you hit the top of your rep range consistently.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
                <h3 className="font-semibold mb-2">Deload When Needed</h3>
                <p className="text-sm text-muted-foreground">Reduce weight every 4-6 weeks for recovery and long-term progress.</p>
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
                  Experience-Based Rates
                </h3>
                <p className="text-sm text-muted-foreground">Adjusts progression speed based on training experience level.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Rep Range Planning
                </h3>
                <p className="text-sm text-muted-foreground">Plan progression through rep ranges before increasing weight.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Long-Term Projections
                </h3>
                <p className="text-sm text-muted-foreground">See where your lifts could be in 4 and 8 weeks.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Practical Increments
                </h3>
                <p className="text-sm text-muted-foreground">Rounds to standard plate increments (2.5, 5, 10 lbs).</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How often should I increase weight?</h3>
                <p className="text-sm text-muted-foreground">Increase when you can complete all sets at the top of your rep range with good form. Beginners may add weight weekly, advanced lifters monthly.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What if I can't hit my rep target?</h3>
                <p className="text-sm text-muted-foreground">Stay at the current weight until you can complete all target reps. Don't rush increases—consistency beats aggressive jumps.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Should I increase every workout?</h3>
                <p className="text-sm text-muted-foreground">Beginners can often add weight each session. Intermediate and advanced lifters need more time to adapt—weekly or biweekly increases are normal.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What are good rep ranges for strength?</h3>
                <p className="text-sm text-muted-foreground">Pure strength: 1-5 reps. Hypertrophy: 6-12 reps. Endurance: 12+ reps. Most programs use 3-5 reps for main lifts and 8-12 for accessories.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">When should I deload?</h3>
                <p className="text-sm text-muted-foreground">Deload every 4-8 weeks by reducing weight 40-60% for a week. This allows recovery and prevents plateaus from accumulated fatigue.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Related Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/one-rep-max-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">One Rep Max Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate your 1RM from submaximal lifts.</p>
              </a>
              <a href="/calculators/bench-press-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Bench Press Calculator</h3>
                <p className="text-sm text-muted-foreground">Estimate bench press potential and track progress.</p>
              </a>
              <a href="/calculators/squat-deadlift-ratio" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Squat/Deadlift Ratio</h3>
                <p className="text-sm text-muted-foreground">Compare your squat and deadlift strengths.</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
