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

      {/* How It Works Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">How to Estimate Max Reps</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Training Weight</h3>
              <p className="text-sm text-muted-foreground">Input the weight you plan to use for your set.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Your 1RM</h3>
              <p className="text-sm text-muted-foreground">Input your one-rep max for that exercise.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Rep Estimate</h3>
              <p className="text-sm text-muted-foreground">See estimated reps and percentage of 1RM.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Key Features of This Max Reps Estimator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">**Brzycki Formula**</h3>
            <p className="text-sm text-muted-foreground">Uses proven rep estimation formula for accurate predictions.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Percentage Display**</h3>
            <p className="text-sm text-muted-foreground">Shows what percentage of 1RM your training weight represents.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Program Planning</h3>
            <p className="text-sm text-muted-foreground">Helps select appropriate weights for rep targets.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Free Training Tool**</h3>
            <p className="text-sm text-muted-foreground">Plan workouts intelligently without trial and error.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How accurate are rep estimations?</h3>
            <p className="text-sm text-muted-foreground">Formulas are reasonably accurate for 1-10 reps. Accuracy decreases for higher reps due to fatigue and muscle endurance factors.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What percentage of 1RM should I use?</h3>
            <p className="text-sm text-muted-foreground">Strength (1-5 reps): 85-100%. Hypertrophy (6-12 reps): 67-85%. Endurance (12+ reps): Below 67%.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Why can&apos;t I hit the estimated reps?</h3>
            <p className="text-sm text-muted-foreground">Formulas assume fresh muscles. Fatigue, poor form, inadequate rest, or nutrition can reduce actual performance.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Should I train to failure?</h3>
            <p className="text-sm text-muted-foreground">Occasionally for testing, but regular training 1-3 reps from failure is safer and more sustainable for progress.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How often should I test my 1RM?</h3>
            <p className="text-sm text-muted-foreground">Every 8-12 weeks for experienced lifters. Beginners can test more frequently as they progress rapidly.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Related Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/calculators/1rm-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">1RM Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate one-rep max from submaximal lifts.</p>
          </a>
          <a href="/calculators/workout-volume-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Workout Volume Calculator</h3>
            <p className="text-sm text-muted-foreground">Track total training volume for progressive overload.</p>
          </a>
          <a href="/calculators/warm-up-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Warm-Up Calculator</h3>
            <p className="text-sm text-muted-foreground">Generate warm-up sets based on working weight.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
