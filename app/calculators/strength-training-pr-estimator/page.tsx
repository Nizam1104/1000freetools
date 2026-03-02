"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StrengthResult {
  currentWeight: number;
  currentReps: number;
  targetReps: number;
  estimatedOneRM: number;
  targetWeight: number;
  formula: string;
  accuracyNote: string;
  recommendations: string[];
}

export default function StrengthTrainingPREstimatorPage() {
  const [currentWeight, setCurrentWeight] = useState<string>("");
  const [currentReps, setCurrentReps] = useState<string>("");
  const [targetReps, setTargetReps] = useState<string>("1");
  const [formula, setFormula] = useState<string>("epley");
  const [result, setResult] = useState<StrengthResult | null>(null);

  const calculate = () => {
    const weightNum = parseFloat(currentWeight) || 0;
    const repsNum = parseInt(currentReps) || 0;
    const targetRepsNum = parseInt(targetReps) || 1;

    if (weightNum === 0 || repsNum === 0) return;

    // Calculate 1RM using different formulas
    let oneRM = 0;
    let formulaName = "";

    switch (formula) {
      case "epley":
        // 1RM = weight × (1 + reps/30)
        oneRM = weightNum * (1 + repsNum / 30);
        formulaName = "Epley";
        break;
      case "brzycki":
        // 1RM = weight × (36 / (37 - reps))
        oneRM = weightNum * (36 / (37 - repsNum));
        formulaName = "Brzycki";
        break;
      case "lander":
        // 1RM = (100 × weight) / (101.3 - 2.67123 × reps)
        oneRM = (100 * weightNum) / (101.3 - 2.67123 * repsNum);
        formulaName = "Lander";
        break;
      case "lombardi":
        // 1RM = weight × reps^0.10
        oneRM = weightNum * Math.pow(repsNum, 0.10);
        formulaName = "Lombardi";
        break;
      case "mayhew":
        // 1RM = (100 × weight) / (52.2 + 41.9 × e^(-0.055 × reps))
        oneRM = (100 * weightNum) / (52.2 + 41.9 * Math.exp(-0.055 * repsNum));
        formulaName = "Mayhew";
        break;
      default:
        oneRM = weightNum * (1 + repsNum / 30);
        formulaName = "Epley";
    }

    // Calculate target weight for target reps
    // Reverse the formula to find weight for target reps
    let targetWeight = 0;
    switch (formula) {
      case "epley":
        targetWeight = oneRM / (1 + targetRepsNum / 30);
        break;
      case "brzycki":
        targetWeight = oneRM * ((37 - targetRepsNum) / 36);
        break;
      case "lander":
        targetWeight = oneRM * (101.3 - 2.67123 * targetRepsNum) / 100;
        break;
      case "lombardi":
        targetWeight = oneRM / Math.pow(targetRepsNum, 0.10);
        break;
      case "mayhew":
        targetWeight = oneRM * (52.2 + 41.9 * Math.exp(-0.055 * targetRepsNum)) / 100;
        break;
      default:
        targetWeight = oneRM / (1 + targetRepsNum / 30);
    }

    // Accuracy note based on rep range
    let accuracyNote = "";
    if (repsNum <= 5) {
      accuracyNote = "High accuracy - low rep range is ideal for 1RM estimation";
    } else if (repsNum <= 10) {
      accuracyNote = "Good accuracy - moderate rep range";
    } else if (repsNum <= 15) {
      accuracyNote = "Moderate accuracy - higher reps less reliable for 1RM";
    } else {
      accuracyNote = "Lower accuracy - consider testing with heavier weight and fewer reps";
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`💪 Estimated 1RM: ${oneRM.toFixed(1)} kg/${(oneRM * 2.205).toFixed(0)} lbs`);
    recommendations.push(`🎯 Weight for ${targetRepsNum} reps: ${targetWeight.toFixed(1)} kg`);

    if (repsNum > 10) {
      recommendations.push("📊 For more accurate 1RM, test with 3-5 rep max");
    }

    if (targetRepsNum === 1) {
      recommendations.push("⚠️ Always warm up properly before attempting 1RM");
      recommendations.push("🛡️ Have a spotter for heavy attempts");
    }

    recommendations.push("📈 Track progress over time for best results");
    recommendations.push("🔄 Retest every 4-6 weeks as strength improves");

    setResult({
      currentWeight: weightNum,
      currentReps: repsNum,
      targetReps: targetRepsNum,
      estimatedOneRM: parseFloat(oneRM.toFixed(1)),
      targetWeight: parseFloat(targetWeight.toFixed(1)),
      formula: formulaName,
      accuracyNote,
      recommendations,
    });
  };

  const reset = () => {
    setCurrentWeight("");
    setCurrentReps("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Strength Training PR Estimator – Calculate Your One-Rep Max & Training Weights
          </h1>
          <p className="text-muted-foreground">
            Estimate your one-rep max (1RM) safely with our Strength Training Calculator.
            Enter your current lift weight and reps to calculate your estimated 1RM and
            find the right weight for any target rep range — perfect for powerlifters
            and strength athletes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="weight">Weight Lifted</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    placeholder="e.g., 100"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reps">Reps Completed</Label>
                  <Input
                    id="reps"
                    type="number"
                    value={currentReps}
                    onChange={(e) => setCurrentReps(e.target.value)}
                    placeholder="e.g., 5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-reps">Target Reps</Label>
                <Input
                  id="target-reps"
                  type="number"
                  value={targetReps}
                  onChange={(e) => setTargetReps(e.target.value)}
                  placeholder="1"
                />
                <p className="text-xs text-muted-foreground">
                  Calculate weight for this rep target
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="formula">Estimation Formula</Label>
                <Select value={formula} onValueChange={setFormula}>
                  <SelectTrigger id="formula">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="epley">Epley (Most common)</SelectItem>
                    <SelectItem value="brzycki">Brzycki (Good for 2-10 reps)</SelectItem>
                    <SelectItem value="lander">Lander (Good for 3-8 reps)</SelectItem>
                    <SelectItem value="lombardi">Lombardi (Good for 1-10 reps)</SelectItem>
                    <SelectItem value="mayhew">Mayhew (Good for all ranges)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Strength Estimates</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Estimated 1RM</p>
                    <p className="text-4xl font-bold text-primary">{result.estimatedOneRM} kg</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {(result.estimatedOneRM * 2.205).toFixed(0)} lbs
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Weight for {result.targetReps} Reps</p>
                    <p className="text-3xl font-bold">{result.targetWeight} kg</p>
                    <p className="text-sm text-muted-foreground">
                      {(result.targetWeight * 2.205).toFixed(0)} lbs
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Formula Used:</span>
                      <span className="font-semibold">{result.formula}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Input:</span>
                      <span className="font-semibold">{result.currentWeight} kg × {result.currentReps} reps</span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Accuracy:</strong> {result.accuracyNote}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Training Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your lift details and click Calculate to see estimates</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                1RM Testing Safety Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Warm up thoroughly:</strong> 10-15 minutes of light cardio + dynamic stretching
                  </li>
                  <li>
                    <strong>Progressive loading:</strong> Build up to heavy weights gradually
                  </li>
                  <li>
                    <strong>Use a spotter:</strong> Essential for bench press and squats
                  </li>
                  <li>
                    <strong>Good form:</strong> Never sacrifice form for weight
                  </li>
                  <li>
                    <strong>Rest between attempts:</strong> 3-5 minutes between heavy attempts
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> These formulas are most accurate for 1-10 rep ranges.
                  For best results, test with weights you can lift for 3-5 reps. Different
                  formulas may give slightly different results - use the one that matches
                  your training style.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
