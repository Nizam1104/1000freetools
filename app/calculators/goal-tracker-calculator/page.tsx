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

interface GoalResult {
  currentValue: number;
  targetValue: number;
  startingValue: number;
  progress: number;
  progressPercentage: number;
  remaining: number;
  dailyRateNeeded: number;
  projectedFinishDate: string;
  onTrack: boolean;
  motivationMessage: string;
  milestones: Array<{ percent: number; value: number; label: string }>;
}

export default function GoalTrackerCalculatorPage() {
  const [startingValue, setStartingValue] = useState<string>("");
  const [currentValue, setCurrentValue] = useState<string>("");
  const [targetValue, setTargetValue] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [targetDate, setTargetDate] = useState<string>("");
  const [goalType, setGoalType] = useState<string>("increase");
  const [result, setResult] = useState<GoalResult | null>(null);

  const calculate = () => {
    const startNum = parseFloat(startingValue) || 0;
    const currentNum = parseFloat(currentValue) || 0;
    const targetNum = parseFloat(targetValue) || 0;

    if (targetNum === 0) return;

    // Calculate progress
    const totalChange = targetNum - startNum;
    const currentChange = currentNum - startNum;
    
    let progressPercentage = 0;
    if (goalType === "increase") {
      progressPercentage = totalChange > 0 ? (currentChange / totalChange) * 100 : 0;
    } else {
      // For decrease goals (like weight loss)
      progressPercentage = totalChange < 0 ? (currentChange / totalChange) * 100 : 0;
    }

    // Clamp percentage
    progressPercentage = Math.max(0, Math.min(100, progressPercentage));

    const remaining = targetNum - currentNum;

    // Calculate daily rate needed
    const today = new Date();
    const target = new Date(targetDate);
    const daysRemaining = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    let dailyRateNeeded = 0;
    if (daysRemaining > 0) {
      dailyRateNeeded = remaining / daysRemaining;
    }

    // Projected finish date based on current rate
    const start = new Date(startDate);
    const daysElapsed = Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const currentRate = daysElapsed > 0 ? currentChange / daysElapsed : 0;
    
    let projectedFinishDate = "N/A";
    let onTrack = true;

    if (currentRate !== 0 && Math.abs(remaining) > 0) {
      const daysToFinish = remaining / currentRate;
      if (daysToFinish > 0) {
        const projected = new Date(today);
        projected.setDate(projected.getDate() + Math.ceil(daysToFinish));
        projectedFinishDate = projected.toLocaleDateString();
        
        // Check if on track
        onTrack = daysToFinish <= daysRemaining;
      }
    }

    // Generate motivation message
    let motivationMessage = "";
    if (progressPercentage >= 100) {
      motivationMessage = "🎉 Congratulations! You've reached your goal!";
    } else if (progressPercentage >= 75) {
      motivationMessage = "🔥 You're almost there! Keep pushing!";
    } else if (progressPercentage >= 50) {
      motivationMessage = "💪 Great progress! You're halfway there!";
    } else if (progressPercentage >= 25) {
      motivationMessage = "📈 Good start! Stay consistent!";
    } else if (progressPercentage > 0) {
      motivationMessage = "🌱 Every journey starts with a single step!";
    } else {
      motivationMessage = "🚀 Ready to begin? Start today!";
    }

    // Generate milestones
    const milestones = [
      { percent: 25, value: startNum + (totalChange * 0.25), label: "First Quarter" },
      { percent: 50, value: startNum + (totalChange * 0.5), label: "Halfway Point" },
      { percent: 75, value: startNum + (totalChange * 0.75), label: "Three Quarters" },
      { percent: 100, value: targetNum, label: "Goal!" },
    ];

    setResult({
      currentValue: currentNum,
      targetValue: targetNum,
      startingValue: startNum,
      progress: currentChange,
      progressPercentage: parseFloat(progressPercentage.toFixed(1)),
      remaining: parseFloat(remaining.toFixed(2)),
      dailyRateNeeded: parseFloat(Math.abs(dailyRateNeeded).toFixed(2)),
      projectedFinishDate,
      onTrack,
      motivationMessage,
      milestones,
    });
  };

  const reset = () => {
    setStartingValue("");
    setCurrentValue("");
    setTargetValue("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Goal Tracker Calculator – Track Your Progress Toward Any Goal
          </h1>
          <p className="text-muted-foreground">
            Stay on track to achieve your goals with our Goal Tracker Calculator.
            Enter your starting point, current progress, and target to see your completion
            percentage and projected finish date — perfect for fitness, financial, and
            personal development goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal-type">Goal Type</Label>
                <Select value={goalType} onValueChange={setGoalType}>
                  <SelectTrigger id="goal-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="increase">Increase (save more, gain muscle)</SelectItem>
                    <SelectItem value="decrease">Decrease (lose weight, reduce debt)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="starting">Starting Value</Label>
                <Input
                  id="starting"
                  type="number"
                  value={startingValue}
                  onChange={(e) => setStartingValue(e.target.value)}
                  placeholder="e.g., 100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current">Current Value</Label>
                <Input
                  id="current"
                  type="number"
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                  placeholder="e.g., 150"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target">Target Value</Label>
                <Input
                  id="target"
                  type="number"
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  placeholder="e.g., 200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="target-date">Target Date</Label>
                  <Input
                    id="target-date"
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                  />
                </div>
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
              <h3 className="text-lg font-semibold mb-4">Progress</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.progressPercentage >= 100 ? "bg-green-100 dark:bg-green-900/20" :
                    result.progressPercentage >= 50 ? "bg-blue-100 dark:bg-blue-900/20" :
                    "bg-amber-100 dark:bg-amber-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="text-5xl font-bold">{result.progressPercentage}%</p>
                  </div>

                  <div className="w-full bg-muted rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all ${
                        result.progressPercentage >= 100 ? "bg-green-500" :
                        result.progressPercentage >= 50 ? "bg-blue-500" :
                        "bg-amber-500"
                      }`}
                      style={{ width: `${result.progressPercentage}%` }}
                    />
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Starting:</span>
                      <span className="font-semibold">{result.startingValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current:</span>
                      <span className="font-semibold">{result.currentValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Target:</span>
                      <span className="font-semibold">{result.targetValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Remaining:</span>
                      <span className="font-semibold">{result.remaining}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Daily Rate Needed:</span>
                      <span className={`font-semibold ${result.dailyRateNeeded > 0 ? "" : ""}`}>
                        {result.dailyRateNeeded}/day
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Projected Finish:</span>
                      <span className={`font-semibold ${
                        result.onTrack ? "text-green-600" : "text-amber-600"
                      }`}>
                        {result.projectedFinishDate}
                      </span>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg text-center ${
                    result.progressPercentage >= 100 ? "bg-green-50 dark:bg-green-950/20" :
                    "bg-blue-50 dark:bg-blue-950/20"
                  }`}>
                    <p className="text-lg font-medium">{result.motivationMessage}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Milestones</h4>
                    <div className="space-y-1">
                      {result.milestones.map((milestone, i) => (
                        <div
                          key={i}
                          className={`flex justify-between p-2 rounded text-sm ${
                            result.progressPercentage >= milestone.percent
                              ? "bg-green-100 dark:bg-green-900/20"
                              : "bg-muted/50"
                          }`}
                        >
                          <span>{milestone.label} ({milestone.percent}%)</span>
                          <span className={result.progressPercentage >= milestone.percent ? "text-green-700 dark:text-green-300" : ""}>
                            {milestone.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your goal details and click Calculate to track progress</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Goal Setting Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>SMART Goals:</strong> Specific, Measurable, Achievable, Relevant,
                    Time-bound
                  </li>
                  <li>
                    <strong>Track regularly:</strong> Update your progress weekly for best results
                  </li>
                  <li>
                    <strong>Celebrate milestones:</strong> Reward yourself at 25%, 50%, 75%
                  </li>
                  <li>
                    <strong>Adjust as needed:</strong> It&apos;s okay to modify your target date
                  </li>
                  <li>
                    <strong>Stay consistent:</strong> Small daily actions lead to big results
                  </li>
                </ul>
                <p>
                  <strong>Popular Goals:</strong> Weight loss, savings targets, fitness goals,
                  debt payoff, learning hours, reading books, and more!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
