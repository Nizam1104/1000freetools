"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WorkoutRestTimer() {
  const [goal, setGoal] = useState<string>("strength");
  const [exercise, setExercise] = useState<string>("");
  const [customRest, setCustomRest] = useState<string>("");
  const [isTiming, setIsTiming] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [results, setResults] = useState<{
    rest: number;
    explanation: string;
  } | null>(null);

  const getRecommendedRest = (): { rest: number; explanation: string } => {
    switch (goal) {
      case "strength":
        return { rest: 180, explanation: "3-5 minutes for maximal strength and power development" };
      case "hypertrophy":
        return { rest: 75, explanation: "60-90 seconds for optimal muscle growth" };
      case "endurance":
        return { rest: 45, explanation: "30-60 seconds for muscular endurance and metabolic conditioning" };
      case "power":
        return { rest: 240, explanation: "4-5 minutes for maximum power output between sets" };
      default:
        return { rest: 90, explanation: "90 seconds is a good general rest period" };
    }
  };

  const calculate = () => {
    const { rest, explanation } = getRecommendedRest();
    setResults({ rest, explanation });
    setTimeLeft(rest);
  };

  const startTimer = (seconds: number) => {
    setTimeLeft(seconds);
    setIsTiming(true);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTiming(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  const reset = () => {
    setIsTiming(false);
    setTimeLeft(0);
    setResults(null);
    setCustomRest("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Workout Rest Timer – Optimal Rest Time Between Sets Calculator</CardTitle>
          <CardDescription>
            Rest the right amount between sets to hit your goals. Our workout rest timer recommends evidence-based rest periods for strength, muscle building, or endurance training.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Training Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Maximal Strength</SelectItem>
                  <SelectItem value="power">Power/Explosive</SelectItem>
                  <SelectItem value="hypertrophy">Muscle Growth (Hypertrophy)</SelectItem>
                  <SelectItem value="endurance">Muscular Endurance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="exercise">Exercise (optional)</Label>
              <Input
                id="exercise"
                type="text"
                placeholder="e.g., Squat, Bench Press"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Get Recommended Rest</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Recommended Rest</p>
                  <p className="text-4xl font-bold">{formatTime(results.rest)}</p>
                  <p className="text-sm text-muted-foreground mt-2">{results.explanation}</p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => startTimer(results.rest)}>
                    Start Timer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => startTimer(results.rest)}
                    disabled={isTiming}
                  >
                    Restart
                  </Button>
                </div>

                {isTiming || timeLeft > 0 ? (
                  <div className="text-center p-4 bg-background rounded-md">
                    <p className="text-5xl font-mono font-bold">{formatTime(timeLeft)}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {timeLeft === 0 ? "Rest complete! Ready for next set." : "Resting..."}
                    </p>
                  </div>
                ) : null}
              </div>
            )}

            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-2">Quick Reference:</p>
              <ul className="space-y-1">
                <li>• Strength: 3-5 min</li>
                <li>• Power: 4-5 min</li>
                <li>• Hypertrophy: 60-90 sec</li>
                <li>• Endurance: 30-60 sec</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
