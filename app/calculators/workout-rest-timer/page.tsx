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

      {/* How It Works Section */}
      <div className="p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">How to Use the Workout Rest Timer</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Select Your Training Goal</h3>
              <p className="text-sm text-muted-foreground">Choose strength, power, hypertrophy, or endurance based on your workout objective.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Get Recommended Rest Time</h3>
              <p className="text-sm text-muted-foreground">Receive evidence-based rest period recommendations for your training goal.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Start the Timer</h3>
              <p className="text-sm text-muted-foreground">Begin the countdown timer and get notified when it's time for your next set.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Why Rest Periods Matter for Your Goals</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Strength Training (3-5 min)</h3>
            <p className="text-sm text-muted-foreground">Long rest allows full ATP-PC system recovery, enabling maximum force production on each heavy set.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Power Training (4-5 min)</h3>
            <p className="text-sm text-muted-foreground">Explosive movements require complete neural recovery to maintain speed and power output.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Hypertrophy (60-90 sec)</h3>
            <p className="text-sm text-muted-foreground">Moderate rest creates metabolic stress and maintains tension for optimal muscle growth stimulus.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Endurance (30-60 sec)</h3>
            <p className="text-sm text-muted-foreground">Short rest challenges your aerobic system and improves lactate clearance for better endurance.</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
          <h3 className="font-semibold mb-3">Rest Period Recommendations by Goal</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Training Goal</th>
                <th className="text-left py-2">Rest Period</th>
                <th className="text-left py-2">Reps/Set</th>
                <th className="text-left py-2">Intensity</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Maximal Strength</td>
                <td className="py-2">3-5 minutes</td>
                <td className="py-2">1-5 reps</td>
                <td className="py-2">90-100% 1RM</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Power/Explosive</td>
                <td className="py-2">4-5 minutes</td>
                <td className="py-2">1-3 reps</td>
                <td className="py-2">85-95% 1RM</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Hypertrophy</td>
                <td className="py-2">60-90 seconds</td>
                <td className="py-2">6-12 reps</td>
                <td className="py-2">67-85% 1RM</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Muscular Endurance</td>
                <td className="py-2">30-60 seconds</td>
                <td className="py-2">12-20+ reps</td>
                <td className="py-2">&lt;67% 1RM</td>
              </tr>
              <tr>
                <td className="py-2">General Fitness</td>
                <td className="py-2">60-120 seconds</td>
                <td className="py-2">8-15 reps</td>
                <td className="py-2">60-80% 1RM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">How long should I rest between sets?</h3>
            <p className="text-sm text-muted-foreground">Rest depends on your goal: 3-5 minutes for strength, 60-90 seconds for muscle growth, and 30-60 seconds for endurance. Longer rest for heavy compound lifts, shorter for isolation exercises.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Is longer rest better for muscle growth?</h3>
            <p className="text-sm text-muted-foreground">Research shows 2-3 minute rest produces similar hypertrophy to short rest while allowing heavier loads. For pure muscle growth, 90-120 seconds balances volume and recovery effectively.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What happens if I rest too little?</h3>
            <p className="text-sm text-muted-foreground">Insufficient rest reduces force output, limits reps on subsequent sets, and compromises form. You'll fatigue faster and may not complete your target volume effectively.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Should I rest the same for all exercises?</h3>
            <p className="text-sm text-muted-foreground">No. Compound lifts (squats, deadlifts) need more rest (3-5 min). Isolation exercises (bicep curls, lateral raises) recover faster and need less rest (60-90 sec).</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Does rest affect fat loss?</h3>
            <p className="text-sm text-muted-foreground">Shorter rest increases heart rate and calorie burn during workout, but total weekly training volume matters more for fat loss. Choose rest based on primary goal, not fat loss alone.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Related Fitness Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/calculators/workout-volume-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
            <h3 className="font-semibold mb-1">Workout Volume Calculator</h3>
            <p className="text-sm text-muted-foreground">Track your total training volume for progressive overload.</p>
          </a>
          <a href="/calculators/1rm-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
            <h3 className="font-semibold mb-1">1RM Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate your one-rep max from submaximal lifts.</p>
          </a>
          <a href="/calculators/tdee-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
            <h3 className="font-semibold mb-1">TDEE Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate daily calorie needs for your fitness goals.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
