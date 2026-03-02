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

interface StudyEfficiencyResult {
  hoursStudied: number;
  gradeAchieved: number;
  efficiency: number;
  efficiencyRating: string;
  projectedGrade: number;
  recommendations: string[];
}

export default function StudyHourEfficiencyCalculatorPage() {
  const [hoursStudied, setHoursStudied] = useState<string>("");
  const [gradeAchieved, setGradeAchieved] = useState<string>("");
  const [targetGrade, setTargetGrade] = useState<string>("");
  const [result, setResult] = useState<StudyEfficiencyResult | null>(null);

  const calculate = () => {
    const hoursNum = parseFloat(hoursStudied) || 0;
    const gradeNum = parseFloat(gradeAchieved) || 0;
    const targetNum = parseFloat(targetGrade) || 0;

    if (hoursNum === 0 || gradeNum === 0) return;

    // Calculate efficiency (grade points per hour)
    const efficiency = gradeNum / hoursNum;

    // Efficiency rating
    let efficiencyRating = "";
    if (efficiency >= 15) {
      efficiencyRating = "🏆 Exceptional - Highly efficient studying";
    } else if (efficiency >= 10) {
      efficiencyRating = "✅ Excellent - Above average efficiency";
    } else if (efficiency >= 5) {
      efficiencyRating = "⚖️ Good - Average efficiency";
    } else if (efficiency >= 3) {
      efficiencyRating = "⚠️ Fair - Room for improvement";
    } else {
      efficiencyRating = "❌ Poor - Study methods need revision";
    }

    // Project grade for target hours
    const projectedGrade = efficiency * hoursNum * 1.2; // Assuming 20% improvement with more hours

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📚 Efficiency: ${efficiency.toFixed(2)} grade points per hour`);
    recommendations.push(`⏱️ Hours studied: ${hoursNum}`);
    recommendations.push(`📊 Grade achieved: ${gradeNum}%`);

    if (targetNum > 0) {
      const hoursNeeded = targetNum / efficiency;
      recommendations.push(`🎯 To achieve ${targetNum}%, you need approximately ${hoursNeeded.toFixed(1)} hours`);
      
      if (hoursNeeded > hoursNum * 2) {
        recommendations.push("⚠️ Significant increase in study time needed");
        recommendations.push("💡 Consider improving study efficiency, not just hours");
      }
    }

    if (efficiency < 5) {
      recommendations.push("📖 Try active recall instead of passive reading");
      recommendations.push("📝 Practice with past papers and questions");
      recommendations.push("👥 Consider study groups for difficult topics");
    } else if (efficiency >= 10) {
      recommendations.push("✅ Your study methods are working well");
      recommendations.push("📈 Focus on maintaining consistency");
    }

    recommendations.push("🧠 Take regular breaks (Pomodoro: 25 min work, 5 min break)");
    recommendations.push("😴 Ensure adequate sleep for memory consolidation");

    setResult({
      hoursStudied: hoursNum,
      gradeAchieved: gradeNum,
      efficiency: parseFloat(efficiency.toFixed(2)),
      efficiencyRating,
      projectedGrade: parseFloat(projectedGrade.toFixed(1)),
      recommendations,
    });
  };

  const reset = () => {
    setHoursStudied("");
    setGradeAchieved("");
    setTargetGrade("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Study Hour Efficiency Calculator – Measure and Improve Your Study Productivity
          </h1>
          <p className="text-muted-foreground">
            Are your study hours paying off? Our Study Hour Efficiency Calculator helps
            you measure how effectively you&apos;re converting study time into academic
            results. Track study sessions and grades to identify where to focus your efforts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hours">Hours Studied</Label>
                <Input
                  id="hours"
                  type="number"
                  step="0.5"
                  value={hoursStudied}
                  onChange={(e) => setHoursStudied(e.target.value)}
                  placeholder="e.g., 10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Grade Achieved (%)</Label>
                <Input
                  id="grade"
                  type="number"
                  value={gradeAchieved}
                  onChange={(e) => setGradeAchieved(e.target.value)}
                  placeholder="e.g., 75"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target">Target Grade (%) - Optional</Label>
                <Input
                  id="target"
                  type="number"
                  value={targetGrade}
                  onChange={(e) => setTargetGrade(e.target.value)}
                  placeholder="e.g., 85"
                />
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
              <h3 className="text-lg font-semibold mb-4">Efficiency Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.efficiency >= 10 ? "bg-green-100 dark:bg-green-900/20" :
                    result.efficiency >= 5 ? "bg-blue-100 dark:bg-blue-900/20" :
                    result.efficiency >= 3 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Study Efficiency</p>
                    <p className="text-4xl font-bold">{result.efficiency}</p>
                    <p className="text-sm mt-1">points per hour</p>
                    <p className="text-sm mt-2">{result.efficiencyRating}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Hours Studied:</span>
                      <span className="font-semibold">{result.hoursStudied}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Grade Achieved:</span>
                      <span className="font-semibold">{result.gradeAchieved}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Projected Grade:</span>
                      <span className="font-semibold">{result.projectedGrade}%</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your study data and click Calculate to see efficiency</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Study Efficiency Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Active recall:</strong> Test yourself instead of re-reading
                  </li>
                  <li>
                    <strong>Spaced repetition:</strong> Review at increasing intervals
                  </li>
                  <li>
                    <strong>Pomodoro technique:</strong> 25 min focus + 5 min break
                  </li>
                  <li>
                    <strong>Practice tests:</strong> Simulate exam conditions
                  </li>
                  <li>
                    <strong>Quality over quantity:</strong> Focused hours beat long sessions
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Efficiency varies by subject difficulty and
                  individual learning style. Track your efficiency over time to identify
                  what study methods work best for you.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
