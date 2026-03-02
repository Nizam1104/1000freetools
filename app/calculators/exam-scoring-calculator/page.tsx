"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Component {
  id: number;
  name: string;
  score: string;
  maxScore: string;
  weight: string;
}

export default function ExamScoringCalculatorPage() {
  const [components, setComponents] = useState<Component[]>([
    { id: 1, name: "Quiz", score: "", maxScore: "100", weight: "20" },
    { id: 2, name: "Midterm", score: "", maxScore: "100", weight: "30" },
    { id: 3, name: "Final Exam", score: "", maxScore: "100", weight: "50" },
  ]);
  const [result, setResult] = useState<{
    weightedScore: number;
    percentage: number;
    letterGrade: string;
    componentBreakdown: { name: string; percentage: number; weightedPoints: number }[];
  } | null>(null);

  const addComponent = () => {
    setComponents([...components, { id: Date.now(), name: "", score: "", maxScore: "100", weight: "" }]);
  };

  const removeComponent = (id: number) => {
    if (components.length > 1) {
      setComponents(components.filter((c) => c.id !== id));
    }
  };

  const updateComponent = (id: number, field: keyof Component, value: string) => {
    setComponents(components.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const calculate = () => {
    let totalWeightedScore = 0;
    let totalWeight = 0;
    const breakdown: { name: string; percentage: number; weightedPoints: number }[] = [];

    for (const comp of components) {
      const score = parseFloat(comp.score);
      const maxScore = parseFloat(comp.maxScore);
      const weight = parseFloat(comp.weight);

      if (!isNaN(score) && !isNaN(maxScore) && maxScore > 0 && !isNaN(weight)) {
        const percentage = (score / maxScore) * 100;
        const weightedPoints = percentage * (weight / 100);
        
        totalWeightedScore += weightedPoints;
        totalWeight += weight;
        
        breakdown.push({
          name: comp.name || "Component",
          percentage: Math.round(percentage * 100) / 100,
          weightedPoints: Math.round(weightedPoints * 100) / 100,
        });
      }
    }

    if (totalWeight === 0) return;

    // Normalize if weights don't add up to 100
    const finalScore = totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0;
    const normalizedScore = totalWeight !== 100 ? finalScore : totalWeightedScore;

    // Determine letter grade
    let letterGrade = "";
    if (normalizedScore >= 93) letterGrade = "A";
    else if (normalizedScore >= 90) letterGrade = "A-";
    else if (normalizedScore >= 87) letterGrade = "B+";
    else if (normalizedScore >= 83) letterGrade = "B";
    else if (normalizedScore >= 80) letterGrade = "B-";
    else if (normalizedScore >= 77) letterGrade = "C+";
    else if (normalizedScore >= 73) letterGrade = "C";
    else if (normalizedScore >= 70) letterGrade = "C-";
    else if (normalizedScore >= 67) letterGrade = "D+";
    else if (normalizedScore >= 63) letterGrade = "D";
    else if (normalizedScore >= 60) letterGrade = "D-";
    else letterGrade = "F";

    setResult({
      weightedScore: Math.round(normalizedScore * 100) / 100,
      percentage: Math.round(normalizedScore * 100) / 100,
      letterGrade,
      componentBreakdown: breakdown,
    });
  };

  const reset = () => {
    setComponents([
      { id: 1, name: "Quiz", score: "", maxScore: "100", weight: "20" },
      { id: 2, name: "Midterm", score: "", maxScore: "100", weight: "30" },
      { id: 3, name: "Final Exam", score: "", maxScore: "100", weight: "50" },
    ]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Exam Scoring Calculator – Calculate Weighted Exam Scores & Final Grades
          </h1>
          <p className="text-muted-foreground">
            Calculate your final exam grade from multiple components like quizzes, midterms, and
            finals with our Exam Scoring Calculator. Enter each component's score and weight to see
            your weighted average and projected final grade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <Label>Grade Components</Label>
                {components.map((comp) => (
                  <div key={comp.id} className="space-y-2 p-3 border rounded-md">
                    <div className="flex gap-2 items-center">
                      <Input
                        placeholder="Component name"
                        value={comp.name}
                        onChange={(e) => updateComponent(comp.id, "name", e.target.value)}
                        className="flex-1"
                      />
                      {components.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeComponent(comp.id)}
                          className="text-destructive"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">Score</Label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={comp.score}
                          onChange={(e) => updateComponent(comp.id, "score", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Max</Label>
                        <Input
                          type="number"
                          placeholder="100"
                          value={comp.maxScore}
                          onChange={(e) => updateComponent(comp.id, "maxScore", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Weight %</Label>
                        <Input
                          type="number"
                          placeholder="20"
                          value={comp.weight}
                          onChange={(e) => updateComponent(comp.id, "weight", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addComponent} className="w-full">
                  + Add Component
                </Button>
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
              <h3 className="text-lg font-semibold mb-4">Final Grade Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Final Grade</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold text-primary">{result.percentage}%</p>
                      <p className="text-2xl font-semibold">{result.letterGrade}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Component Breakdown</h4>
                    <div className="space-y-2">
                      {result.componentBreakdown.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="text-sm">{item.name}</span>
                          <div className="text-right">
                            <span className="font-medium">{item.percentage}%</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              ({item.weightedPoints} pts)
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Weighted Score</p>
                    <p className="text-2xl font-bold">{result.weightedScore}%</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter component scores and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">How Weighted Grades Are Calculated</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Component % = (Score ÷ Max Score) × 100</div>
            <div>Weighted Points = Component % × (Weight ÷ 100)</div>
            <div>Final Grade = Sum of all Weighted Points</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Example:</strong> Quiz: 85/100 (20% weight)<br />
            Quiz % = 85%, Weighted Points = 85 × 0.20 = 17 points
          </p>
        </div>
      </div>
    </div>
  );
}
