"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WarmUpCalculator() {
  const [workingWeight, setWorkingWeight] = useState<string>("");
  const [experience, setExperience] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [results, setResults] = useState<{
    warmupSets: { weight: number; reps: number }[];
  } | null>(null);

  const calculate = () => {
    const working = parseFloat(workingWeight);
    if (isNaN(working) || working <= 0) return;

    let warmupSets: { weight: number; reps: number }[] = [];

    if (experience === "beginner") {
      // Simpler warmup for beginners
      warmupSets = [
        { weight: Math.round(working * 0.3 * 10) / 10, reps: 10 },
        { weight: Math.round(working * 0.5 * 10) / 10, reps: 5 },
        { weight: Math.round(working * 0.7 * 10) / 10, reps: 3 },
      ];
    } else if (experience === "intermediate") {
      // Standard warmup
      warmupSets = [
        { weight: Math.round(working * 0.2 * 10) / 10, reps: 10 },
        { weight: Math.round(working * 0.4 * 10) / 10, reps: 6 },
        { weight: Math.round(working * 0.6 * 10) / 10, reps: 4 },
        { weight: Math.round(working * 0.8 * 10) / 10, reps: 2 },
      ];
    } else {
      // Advanced - more gradual
      warmupSets = [
        { weight: Math.round(working * 0.15 * 10) / 10, reps: 10 },
        { weight: Math.round(working * 0.3 * 10) / 10, reps: 8 },
        { weight: Math.round(working * 0.45 * 10) / 10, reps: 5 },
        { weight: Math.round(working * 0.6 * 10) / 10, reps: 3 },
        { weight: Math.round(working * 0.75 * 10) / 10, reps: 2 },
        { weight: Math.round(working * 0.85 * 10) / 10, reps: 1 },
      ];
    }

    setResults({ warmupSets });
  };

  const reset = () => {
    setWorkingWeight("");
    setExperience("intermediate");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="workingWeight">Working Weight (kg/lbs)</Label>
              <Input
                id="workingWeight"
                type="number"
                placeholder="e.g., 100"
                value={workingWeight}
                onChange={(e) => setWorkingWeight(e.target.value)}
              />
            </div>

            <div>
              <Label>Training Experience</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={experience === "beginner" ? "default" : "outline"}
                  onClick={() => setExperience("beginner")}
                >
                  Beginner
                </Button>
                <Button
                  variant={experience === "intermediate" ? "default" : "outline"}
                  onClick={() => setExperience("intermediate")}
                >
                  Intermediate
                </Button>
                <Button
                  variant={experience === "advanced" ? "default" : "outline"}
                  onClick={() => setExperience("advanced")}
                >
                  Advanced
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Generate Warm-Up</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="font-medium mb-3">Warm-Up Progression:</p>
                <div className="space-y-2">
                  {results.warmupSets.map((set, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-3 bg-background rounded"
                    >
                      <span className="text-sm text-muted-foreground">Set {i + 1}</span>
                      <div className="flex gap-4">
                        <span className="font-bold">{set.weight}</span>
                        <span className="text-muted-foreground">× {set.reps} reps</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-primary/10 rounded">
                  <p className="font-medium">Working Sets</p>
                  <p className="text-2xl font-bold">{workingWeight} × target reps</p>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  💡 Rest 60-90 seconds between warm-up sets. Focus on form and building up gradually.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Warm-Up Sets</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Working Weight</h3>
              <p className="text-sm text-muted-foreground">Input the weight you plan to use for your main working sets.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Select Experience Level</h3>
              <p className="text-sm text-muted-foreground">Choose beginner, intermediate, or advanced for appropriate warm-up progression.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Warm-Up Plan</h3>
              <p className="text-sm text-muted-foreground">Receive a complete warm-up set sequence with weights and rep counts.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Key Features of This Warm-Up Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">**Experience-Based Plans**</h3>
            <p className="text-sm text-muted-foreground">Different warm-up protocols for beginners (3 sets), intermediate (4 sets), and advanced lifters (6 sets).</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Percentage-Based Weights**</h3>
            <p className="text-sm text-muted-foreground">Each warm-up set uses scientifically-backed percentages of your working weight.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Rep Progression**</h3>
            <p className="text-sm text-muted-foreground">Higher reps early, lower reps as you approach working weight to prime without fatigue.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Injury Prevention**</h3>
            <p className="text-sm text-muted-foreground">Proper warm-ups prepare muscles and nervous system for heavy lifting.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Why do I need warm-up sets?</h3>
            <p className="text-sm text-muted-foreground">Warm-up sets increase blood flow, raise muscle temperature, activate the nervous system, and practice movement patterns. This improves performance and reduces injury risk.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How many warm-up sets should I do?</h3>
            <p className="text-sm text-muted-foreground">Beginners: 3 sets. Intermediate: 4 sets. Advanced/heavy days: 5-6 sets. More warm-up is needed for heavier weights and compound movements.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Should warm-up sets be to failure?</h3>
            <p className="text-sm text-muted-foreground">No! Warm-up sets should feel easy. Stop with 3-5 reps in reserve. The goal is preparation, not fatigue or stimulation.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How long should I rest between warm-up sets?</h3>
            <p className="text-sm text-muted-foreground">60-90 seconds is typical. Take enough time to recover but not so long that you cool down. Adjust based on how you feel.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Do I need warm-ups for every exercise?</h3>
            <p className="text-sm text-muted-foreground">Prioritize warm-ups for compound lifts (squat, bench, deadlift). For isolation exercises after compounds, 1-2 lighter sets are usually sufficient.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
    </div>
  );
}
