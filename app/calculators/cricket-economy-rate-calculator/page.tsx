"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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
                  <div className={`p-4 rounded-lg text-center ${result.economyRate < (result.format === "T20" ? 6 : result.format === "ODI" ? 4 : 2.5)
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

        {/* SEO Content Section */}
        <div className="mt-8 space-y-8">
          {/* How It Works */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">How the Cricket Economy Rate Calculator Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold mb-2">Enter Bowling Figures</h3>
                    <p className="text-sm text-muted-foreground">Input the runs conceded, overs bowled, and any extra balls to calculate the bowler&apos;s economy rate accurately.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold mb-2">Select Match Format</h3>
                    <p className="text-sm text-muted-foreground">Choose T20, ODI, or Test cricket to get format-specific benchmarks and performance ratings for accurate assessment.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold mb-2">Get Instant Analysis</h3>
                    <p className="text-sm text-muted-foreground">Receive economy rate calculation with performance rating, format comparisons, and expert bowling recommendations.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features and Benefits */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Features of This Economy Rate Calculator</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Format-Specific Benchmarks</h3>
                      <p className="text-sm text-muted-foreground">Get economy rate ratings tailored to T20, ODI, and Test cricket with appropriate performance standards for each format.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Precise Overs Calculation</h3>
                      <p className="text-sm text-muted-foreground">Handles overs.balls notation correctly (e.g., 4.3 overs = 4 overs + 3 balls) for accurate economy rate computation.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Performance Rating System</h3>
                      <p className="text-sm text-muted-foreground">Automatic rating from Excellent to Expensive based on format-specific thresholds for quick performance assessment.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Expert Recommendations</h3>
                      <p className="text-sm text-muted-foreground">Receive actionable bowling tips based on your economy rate to improve performance in future matches.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Free Cricket Statistics Tool</h3>
                      <p className="text-sm text-muted-foreground">Completely free calculator for players, coaches, and fans to analyze bowling performance instantly.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Mobile-Friendly Interface</h3>
                      <p className="text-sm text-muted-foreground">Calculate economy rates on any device during matches, practice sessions, or while watching cricket.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reference Table */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-3">Economy Rate Benchmarks by Format</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Format</th>
                        <th className="text-left py-2">Excellent</th>
                        <th className="text-left py-2">Good</th>
                        <th className="text-left py-2">Average</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">T20</td>
                        <td className="py-2 text-green-600">&lt; 6.0</td>
                        <td className="py-2">7.0 - 7.5</td>
                        <td className="py-2">7.5 - 9.0</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">ODI</td>
                        <td className="py-2 text-green-600">&lt; 4.0</td>
                        <td className="py-2">4.5 - 5.0</td>
                        <td className="py-2">5.0 - 6.0</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Test</td>
                        <td className="py-2 text-green-600">&lt; 2.5</td>
                        <td className="py-2">3.0 - 3.5</td>
                        <td className="py-2">3.5 - 4.5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">How is economy rate calculated in cricket?</h3>
                  <p className="text-sm text-muted-foreground">Economy rate is calculated by dividing total runs conceded by the number of overs bowled. The formula is: Economy Rate = Runs Conceded ÷ Overs Bowled. For example, if a bowler concedes 35 runs in 4 overs, their economy rate is 8.75 runs per over.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What is a good economy rate in T20 cricket?</h3>
                  <p className="text-sm text-muted-foreground">In T20 cricket, an economy rate below 7.0 is considered good, while below 6.0 is excellent. Elite T20 bowlers like Rashid Khan and Jasprit Bumrah consistently maintain economy rates under 7.0. Death overs specialists may have higher economy rates (8-9) but are valued for wicket-taking ability.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Why is economy rate important for bowlers?</h3>
                  <p className="text-sm text-muted-foreground">Economy rate measures a bowler&apos;s ability to restrict scoring, which is crucial in limited-overs cricket. A low economy rate builds pressure on batsmen, creates wicket-taking opportunities, and is essential for team success. In T20 especially, containing runs is as valuable as taking wickets.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How do you calculate overs with balls in cricket?</h3>
                  <p className="text-sm text-muted-foreground">Cricket overs are written as overs.balls (e.g., 4.3 means 4 overs and 3 balls). To calculate economy rate, convert to decimal: 4.3 overs = 4 + (3/6) = 4.5 overs. Then divide runs by this decimal value. Our calculator handles this conversion automatically.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What is the difference between economy rate and strike rate?</h3>
                  <p className="text-sm text-muted-foreground">Economy rate measures runs conceded per over (lower is better), while strike rate measures balls per wicket taken (lower is better). Economy rate focuses on run containment, while strike rate focuses on wicket-taking frequency. Both metrics together provide a complete picture of bowling performance.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools */}
        </div>
      </div>
    </div>
  );
}
