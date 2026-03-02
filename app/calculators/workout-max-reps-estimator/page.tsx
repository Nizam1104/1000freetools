"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WorkoutMaxRepsEstimator() {
  const [weight, setWeight] = useState<string>("");
  const [oneRepMax, setOneRepMax] = useState<string>("");
  const [results, setResults] = useState<{
    estimatedReps: number;
    percentage: number;
  } | null>(null);

  // Epley formula: 1RM = weight × (1 + reps/30)
  // Rearranged: reps = 30 × (1RM/weight - 1)
  const calculate = () => {
    const weightVal = parseFloat(weight);
    const oneRepMaxVal = parseFloat(oneRepMax);

    if (isNaN(weightVal) || isNaN(oneRepMaxVal) || weightVal <= 0 || oneRepMaxVal <= 0) return;

    if (weightVal >= oneRepMaxVal) {
      setResults({ estimatedReps: 1, percentage: 100 });
      return;
    }

    const percentage = (weightVal / oneRepMaxVal) * 100;

    // Using Brzycki formula for rep estimation
    // reps = 36 / (37 - percentage)
    const estimatedReps = Math.round(36 / (37 - percentage / 100 * 100));

    setResults({
      estimatedReps: Math.max(1, Math.min(estimatedReps, 30)),
      percentage: Math.round(percentage),
    });
  };

  const reset = () => {
    setWeight("");
    setOneRepMax("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Max Reps Estimator – How Many Reps Can You Do at a Given Weight?</CardTitle>
          <CardDescription>
            Predict how many reps you can complete with any weight using your 1RM. Our max reps estimator helps you program training weights intelligently.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="oneRepMax">Your One Rep Max (1RM)</Label>
              <Input
                id="oneRepMax"
                type="number"
                placeholder="e.g., 100"
                value={oneRepMax}
                onChange={(e) => setOneRepMax(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="weight">Weight to Use</Label>
              <Input
                id="weight"
                type="number"
                placeholder="e.g., 80"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Estimate Max Reps</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Max Reps</p>
                  <p className="text-4xl font-bold">{results.estimatedReps} reps</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    at {results.percentage}% of your 1RM
                  </p>
                </div>

                <div className="pt-3 border-t">
                  <p className="text-sm font-medium mb-2">Rep Ranges by Intensity:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-background rounded">
                      <span className="text-muted-foreground">90-95%:</span> 1-3 reps
                    </div>
                    <div className="p-2 bg-background rounded">
                      <span className="text-muted-foreground">85-90%:</span> 3-5 reps
                    </div>
                    <div className="p-2 bg-background rounded">
                      <span className="text-muted-foreground">80-85%:</span> 5-8 reps
                    </div>
                    <div className="p-2 bg-background rounded">
                      <span className="text-muted-foreground">75-80%:</span> 8-12 reps
                    </div>
                    <div className="p-2 bg-background rounded">
                      <span className="text-muted-foreground">70-75%:</span> 12-15 reps
                    </div>
                    <div className="p-2 bg-background rounded">
                      <span className="text-muted-foreground">60-70%:</span> 15-20+ reps
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
