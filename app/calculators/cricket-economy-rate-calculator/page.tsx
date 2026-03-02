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

interface CricketResult {
  runsConceded: number;
  oversBowled: number;
  economyRate: number;
  rating: string;
  format: string;
  comparisons: Array<{ format: string; good: string; excellent: string }>;
  recommendations: string[];
}

export default function CricketEconomyRateCalculatorPage() {
  const [runsConceded, setRunsConceded] = useState<string>("");
  const [oversBowled, setOversBowled] = useState<string>("");
  const [balls, setBalls] = useState<string>("0");
  const [format, setFormat] = useState<string>("t20");
  const [result, setResult] = useState<CricketResult | null>(null);

  const calculate = () => {
    const runsNum = parseFloat(runsConceded) || 0;
    const oversNum = parseFloat(oversBowled) || 0;
    const ballsNum = parseInt(balls) || 0;

    if (runsNum === 0 || oversNum === 0) return;

    // Convert overs.balls to decimal overs
    const totalOvers = oversNum + (ballsNum / 6);

    // Economy rate = runs / overs
    const economyRate = runsNum / totalOvers;

    // Rating based on format
    let rating = "";
    const formatName = format === "t20" ? "T20" : format === "odi" ? "ODI" : "Test";

    if (format === "t20") {
      if (economyRate < 6) {
        rating = "🏆 Excellent - Elite T20 bowler";
      } else if (economyRate < 7.5) {
        rating = "✅ Good - Above average";
      } else if (economyRate < 9) {
        rating = "⚖️ Average - Acceptable for T20";
      } else {
        rating = "⚠️ Expensive - Needs improvement";
      }
    } else if (format === "odi") {
      if (economyRate < 4) {
        rating = "🏆 Excellent - Elite ODI bowler";
      } else if (economyRate < 5) {
        rating = "✅ Good - Above average";
      } else if (economyRate < 6) {
        rating = "⚖️ Average - Acceptable for ODI";
      } else {
        rating = "⚠️ Expensive - Needs improvement";
      }
    } else {
      if (economyRate < 2.5) {
        rating = "🏆 Excellent - Elite Test bowler";
      } else if (economyRate < 3.5) {
        rating = "✅ Good - Above average";
      } else if (economyRate < 4.5) {
        rating = "⚖️ Average - Acceptable for Tests";
      } else {
        rating = "⚠️ Expensive - Needs improvement";
      }
    }

    // Comparisons
    const comparisons = [
      { format: "T20", good: "7.0-7.5", excellent: "<6.0" },
      { format: "ODI", good: "4.5-5.0", excellent: "<4.0" },
      { format: "Test", good: "3.0-3.5", excellent: "<2.5" },
    ];

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📊 Economy Rate: ${economyRate.toFixed(2)} runs per over`);
    recommendations.push(`🏏 Format: ${formatName}`);

    if (economyRate > 8 && format === "t20") {
      recommendations.push("⚠️ Consider varying pace and line more");
      recommendations.push("🎯 Focus on bowling at stumps in death overs");
    } else if (economyRate < 7 && format === "t20") {
      recommendations.push("✅ Excellent control - consider bowling death overs");
    }

    recommendations.push("💡 Economy rate varies by role (opening vs death)");
    recommendations.push("📈 Track over time to measure improvement");

    setResult({
      runsConceded: runsNum,
      oversBowled: parseFloat(totalOvers.toFixed(1)),
      economyRate: parseFloat(economyRate.toFixed(2)),
      rating,
      format: formatName,
      comparisons,
      recommendations,
    });
  };

  const reset = () => {
    setRunsConceded("");
    setOversBowled("");
    setBalls("0");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Cricket Economy Rate Calculator – Calculate Bowling Economy Rate
          </h1>
          <p className="text-muted-foreground">
            Evaluate bowling performance with our Cricket Economy Rate Calculator.
            Enter runs conceded and overs bowled to calculate economy rate — the
            fundamental metric for assessing a bowler&apos;s ability to restrict run scoring.
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
                <Label htmlFor="runs">Runs Conceded</Label>
                <Input
                  id="runs"
                  type="number"
                  value={runsConceded}
                  onChange={(e) => setRunsConceded(e.target.value)}
                  placeholder="e.g., 35"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="overs">Overs Bowled</Label>
                  <Input
                    id="overs"
                    type="number"
                    value={oversBowled}
                    onChange={(e) => setOversBowled(e.target.value)}
                    placeholder="4"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="balls">Extra Balls</Label>
                  <Input
                    id="balls"
                    type="number"
                    min="0"
                    max="5"
                    value={balls}
                    onChange={(e) => setBalls(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Example: 4.3 overs = 4 overs, 3 balls
                </p>
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
              <h3 className="text-lg font-semibold mb-4">Economy Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.economyRate < (result.format === "T20" ? 6 : result.format === "ODI" ? 4 : 2.5)
                      ? "bg-green-100 dark:bg-green-900/20"
                      : result.economyRate < (result.format === "T20" ? 7.5 : result.format === "ODI" ? 5 : 3.5)
                      ? "bg-blue-100 dark:bg-blue-900/20"
                      : "bg-amber-100 dark:bg-amber-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Economy Rate</p>
                    <p className="text-5xl font-bold">{result.economyRate}</p>
                    <p className="text-sm mt-1">{result.rating}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Runs:</span>
                      <span className="font-semibold">{result.runsConceded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Overs:</span>
                      <span className="font-semibold">{result.oversBowled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Format:</span>
                      <span className="font-semibold">{result.format}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Economy Benchmarks</h4>
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
                  <p>Enter bowling figures and click Calculate to see analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Economy Rate
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Formula:</strong> Economy = Runs Conceded ÷ Overs Bowled
                  </li>
                  <li>
                    <strong>T20:</strong> Higher economy expected due to aggressive batting
                  </li>
                  <li>
                    <strong>ODI:</strong> Balance between containment and wicket-taking
                  </li>
                  <li>
                    <strong>Test:</strong> Lowest economy, focus on pressure building
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Economy rate should be considered alongside
                  strike rate and average for complete bowler assessment. Death over
                  specialists typically have higher economy rates.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
