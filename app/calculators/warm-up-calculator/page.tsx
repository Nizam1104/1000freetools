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
        <CardHeader>
          <CardTitle>Warm-Up Calculator – Build the Perfect Warm-Up Set Progression</CardTitle>
          <CardDescription>
            Prepare your body and CNS for heavy lifting. Our warm-up calculator generates a complete set-by-set warm-up progression leading up to your working weight.
          </CardDescription>
        </CardHeader>
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
    </div>
  );
}
