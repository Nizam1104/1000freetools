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

interface BasketballResult {
  made: number;
  attempted: number;
  percentage: number;
  formatted: string;
  rating: string;
  category: string;
  comparisons: Array<{ level: string; good: string; excellent: string }>;
  recommendations: string[];
}

export default function BasketballShootingPercentageCalculatorPage() {
  const [made, setMade] = useState<string>("");
  const [attempted, setAttempted] = useState<string>("");
  const [category, setCategory] = useState<string>("fg");
  const [result, setResult] = useState<BasketballResult | null>(null);

  const calculate = () => {
    const madeNum = parseInt(made) || 0;
    const attemptedNum = parseInt(attempted) || 0;

    if (madeNum === 0 || attemptedNum === 0) return;

    // Calculate percentage
    const percentage = (madeNum / attemptedNum) * 100;

    // Format as basketball convention (e.g., .450)
    const formatted = (percentage / 1000).toFixed(3).substring(1);

    // Category name
    let categoryName = "";
    switch (category) {
      case "fg":
        categoryName = "Field Goal";
        break;
      case "3p":
        categoryName = "Three-Point";
        break;
      case "ft":
        categoryName = "Free Throw";
        break;
      default:
        categoryName = "Shooting";
    }

    // Rating based on category
    let rating = "";
    if (category === "fg") {
      if (percentage >= 55) {
        rating = "🏆 Elite - NBA All-Star level";
      } else if (percentage >= 48) {
        rating = "✅ Excellent - Above average";
      } else if (percentage >= 42) {
        rating = "⚖️ Good - League average";
      } else {
        rating = "⚠️ Below Average - Needs improvement";
      }
    } else if (category === "3p") {
      if (percentage >= 42) {
        rating = "🏆 Elite - Sharpshooter";
      } else if (percentage >= 38) {
        rating = "✅ Excellent - Above average";
      } else if (percentage >= 35) {
        rating = "⚖️ Good - League average";
      } else {
        rating = "⚠️ Below Average - Needs work";
      }
    } else {
      if (percentage >= 90) {
        rating = "🏆 Elite - Elite free throw shooter";
      } else if (percentage >= 80) {
        rating = "✅ Excellent - Above average";
      } else if (percentage >= 70) {
        rating = "⚖️ Good - Acceptable";
      } else {
        rating = "⚠️ Below Average - Practice needed";
      }
    }

    // Comparisons
    const comparisons = [
      { level: "NBA Average", good: category === "fg" ? ".460" : category === "3p" ? ".360" : ".780", excellent: category === "fg" ? ".500" : category === "3p" ? ".400" : ".850" },
      { level: "College", good: category === "fg" ? ".440" : category === "3p" ? ".340" : ".720", excellent: category === "fg" ? ".480" : category === "3p" ? ".380" : ".800" },
    ];

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`🏀 ${categoryName} Percentage: ${formatted} (${percentage.toFixed(1)}%)`);
    recommendations.push(`📊 Made: ${madeNum} / Attempted: ${attemptedNum}`);

    if (attemptedNum < 50) {
      recommendations.push("📈 Small sample size - percentage may vary");
    } else {
      recommendations.push("✅ Significant sample - reliable statistic");
    }

    if (percentage < 40 && category === "fg") {
      recommendations.push("🎯 Focus on shot selection and form");
      recommendations.push("📹 Film study can help identify issues");
    } else if (percentage >= 50 && category === "fg") {
      recommendations.push("✅ Excellent efficiency - maintain approach");
    }

    recommendations.push("🎯 Quality over quantity - take good shots");

    setResult({
      made: madeNum,
      attempted: attemptedNum,
      percentage: parseFloat(percentage.toFixed(1)),
      formatted,
      rating,
      category: categoryName,
      comparisons,
      recommendations,
    });
  };

  const reset = () => {
    setMade("");
    setAttempted("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Basketball Shooting Percentage Calculator – Calculate FG%, 3P% & FT%
          </h1>
          <p className="text-muted-foreground">
            Analyze basketball shooting performance with our Shooting Percentage Calculator.
            Calculate field goal percentage, three-point percentage, and free throw
            percentage from shots made and attempted — essential stats for player
            evaluation and game analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Shot Type</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fg">Field Goal (FG%)</SelectItem>
                    <SelectItem value="3p">Three-Point (3P%)</SelectItem>
                    <SelectItem value="ft">Free Throw (FT%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="made">Shots Made</Label>
                  <Input
                    id="made"
                    type="number"
                    value={made}
                    onChange={(e) => setMade(e.target.value)}
                    placeholder="25"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="attempted">Shots Attempted</Label>
                  <Input
                    id="attempted"
                    type="number"
                    value={attempted}
                    onChange={(e) => setAttempted(e.target.value)}
                    placeholder="50"
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
              <h3 className="text-lg font-semibold mb-4">Shooting Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.percentage >= (result.category === "Field Goal" ? 50 : result.category === "Three-Point" ? 40 : 80)
                      ? "bg-green-100 dark:bg-green-900/20"
                      : result.percentage >= (result.category === "Field Goal" ? 42 : result.category === "Three-Point" ? 35 : 70)
                      ? "bg-blue-100 dark:bg-blue-900/20"
                      : "bg-amber-100 dark:bg-amber-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">{result.category} %</p>
                    <p className="text-5xl font-bold">{result.formatted}</p>
                    <p className="text-sm mt-1">{result.rating}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Made:</span>
                      <span className="font-semibold">{result.made}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Attempted:</span>
                      <span className="font-semibold">{result.attempted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Percentage:</span>
                      <span className="font-semibold">{result.percentage}%</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">League Comparisons</h4>
                    <div className="space-y-1">
                      {result.comparisons.map((comp, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>{comp.level}</span>
                          <span>Good: {comp.good} | Excellent: {comp.excellent}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Analysis</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter shooting stats and click Calculate to see analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Shooting Percentage Guide
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>FG%:</strong> Field Goal Percentage = Made ÷ Attempted
                  </li>
                  <li>
                    <strong>3P%:</strong> Three-Point Percentage (same formula)
                  </li>
                  <li>
                    <strong>FT%:</strong> Free Throw Percentage (same formula)
                  </li>
                  <li>
                    <strong>NBA Average FG%:</strong> ~46%
                  </li>
                  <li>
                    <strong>NBA Average 3P%:</strong> ~36%
                  </li>
                  <li>
                    <strong>NBA Average FT%:</strong> ~78%
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Shooting percentages vary by position and role.
                  Centers typically have higher FG% (closer shots), while guards may
                  have lower FG% but higher volume.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
