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

interface StrikeRateResult {
  runs: number;
  ballsFaced: number;
  strikeRate: number;
  rating: string;
  format: string;
  comparisons: Array<{ format: string; good: string; excellent: string }>;
  recommendations: string[];
}

export default function CricketStrikeRateCalculatorPage() {
  const [runs, setRuns] = useState<string>("");
  const [ballsFaced, setBallsFaced] = useState<string>("");
  const [format, setFormat] = useState<string>("t20");
  const [result, setResult] = useState<StrikeRateResult | null>(null);

  const calculate = () => {
    const runsNum = parseInt(runs) || 0;
    const ballsNum = parseInt(ballsFaced) || 0;

    if (runsNum === 0 || ballsNum === 0) return;

    // Strike rate = (runs / balls) × 100
    const strikeRate = (runsNum / ballsNum) * 100;

    // Rating based on format
    let rating = "";
    const formatName = format === "t20" ? "T20" : format === "odi" ? "ODI" : "Test";

    if (format === "t20") {
      if (strikeRate >= 150) {
        rating = "🏆 Explosive - Elite T20 striker";
      } else if (strikeRate >= 130) {
        rating = "✅ Excellent - Above average";
      } else if (strikeRate >= 110) {
        rating = "⚖️ Good - Acceptable for T20";
      } else {
        rating = "⚠️ Slow - Needs more aggression";
      }
    } else if (format === "odi") {
      if (strikeRate >= 100) {
        rating = "🏆 Excellent - Elite ODI striker";
      } else if (strikeRate >= 85) {
        rating = "✅ Good - Above average";
      } else if (strikeRate >= 70) {
        rating = "⚖️ Average - Acceptable for ODI";
      } else {
        rating = "⚠️ Slow - Needs more aggression";
      }
    } else {
      if (strikeRate >= 60) {
        rating = "🏆 Excellent - Aggressive Test batting";
      } else if (strikeRate >= 50) {
        rating = "✅ Good - Above average";
      } else if (strikeRate >= 40) {
        rating = "⚖️ Average - Acceptable for Tests";
      } else {
        rating = "⚠️ Defensive - Typical tailender";
      }
    }

    // Comparisons
    const comparisons = [
      { format: "T20", good: "120-130", excellent: "150+" },
      { format: "ODI", good: "85-95", excellent: "100+" },
      { format: "Test", good: "50-55", excellent: "60+" },
    ];

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`🏏 Runs: ${runsNum} off ${ballsNum} balls`);
    recommendations.push(`📊 Strike Rate: ${strikeRate.toFixed(2)}`);
    recommendations.push(`🎯 Format: ${formatName}`);

    if (strikeRate < 100 && format === "t20") {
      recommendations.push("⚠️ Low strike rate for T20 - look to score faster");
      recommendations.push("💪 Focus on finding gaps and rotating strike");
    } else if (strikeRate >= 130 && format === "t20") {
      recommendations.push("✅ Excellent T20 strike rate - maintain aggression");
    }

    if (ballsNum >= 50) {
      recommendations.push("📈 Significant sample size - reliable statistic");
    } else {
      recommendations.push("📊 Small sample - strike rate may vary");
    }

    recommendations.push("🎯 Balance strike rate with wicket preservation");

    setResult({
      runs: runsNum,
      ballsFaced: ballsNum,
      strikeRate: parseFloat(strikeRate.toFixed(2)),
      rating,
      format: formatName,
      comparisons,
      recommendations,
    });
  };

  const reset = () => {
    setRuns("");
    setBallsFaced("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Cricket Strike Rate Calculator – Calculate Batting Strike Rate Instantly
          </h1>
          <p className="text-muted-foreground">
            Measure batting aggression with our Cricket Strike Rate Calculator.
            Enter runs scored and balls faced to calculate strike rate — the key
            metric for evaluating batting speed and scoring efficiency in T20,
            ODI, and Test cricket.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="format">Match Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger id="format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="t20">T20</SelectItem>
                    <SelectItem value="odi">ODI (50 overs)</SelectItem>
                    <SelectItem value="test">Test Match</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="runs">Runs Scored</Label>
                <Input
                  id="runs"
                  type="number"
                  value={runs}
                  onChange={(e) => setRuns(e.target.value)}
                  placeholder="e.g., 50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="balls">Balls Faced</Label>
                <Input
                  id="balls"
                  type="number"
                  value={ballsFaced}
                  onChange={(e) => setBallsFaced(e.target.value)}
                  placeholder="e.g., 35"
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
              <h3 className="text-lg font-semibold mb-4">Strike Rate Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.strikeRate >= (result.format === "T20" ? 150 : result.format === "ODI" ? 100 : 60)
                      ? "bg-green-100 dark:bg-green-900/20"
                      : result.strikeRate >= (result.format === "T20" ? 120 : result.format === "ODI" ? 80 : 45)
                      ? "bg-blue-100 dark:bg-blue-900/20"
                      : "bg-amber-100 dark:bg-amber-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Strike Rate</p>
                    <p className="text-5xl font-bold">{result.strikeRate}</p>
                    <p className="text-sm mt-1">{result.rating}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Runs:</span>
                      <span className="font-semibold">{result.runs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Balls:</span>
                      <span className="font-semibold">{result.ballsFaced}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Format:</span>
                      <span className="font-semibold">{result.format}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Strike Rate Benchmarks</h4>
                    <div className="space-y-1">
                      {result.comparisons.map((comp, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>{comp.format}</span>
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
                  <p>Enter batting stats and click Calculate to see analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Strike Rate
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Formula:</strong> Strike Rate = (Runs ÷ Balls) × 100
                  </li>
                  <li>
                    <strong>T20:</strong> 130+ is excellent, 150+ is elite
                  </li>
                  <li>
                    <strong>ODI:</strong> 90+ is excellent, 100+ is elite
                  </li>
                  <li>
                    <strong>Test:</strong> 55+ is good, 60+ is excellent
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Strike rate should be considered alongside
                  average for complete batsman assessment. A high strike rate with
                  low average may indicate reckless batting.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
