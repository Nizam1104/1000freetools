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
                  <div className={`p-4 rounded-lg text-center ${result.strikeRate >= (result.format === "T20" ? 150 : result.format === "ODI" ? 100 : 60)
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

        {/* SEO Content Section */}
        <div className="mt-8 space-y-8">
          {/* How It Works */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">How the Cricket Strike Rate Calculator Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold mb-2">Enter Batting Stats</h3>
                    <p className="text-sm text-muted-foreground">Input the total runs scored and balls faced by the batsman to calculate their strike rate accurately.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold mb-2">Choose Cricket Format</h3>
                    <p className="text-sm text-muted-foreground">Select T20, ODI, or Test match format to get appropriate strike rate benchmarks and performance ratings.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold mb-2">View Performance Analysis</h3>
                    <p className="text-sm text-muted-foreground">Get instant strike rate calculation with format-specific rating, comparisons, and batting recommendations.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features and Benefits */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Key Features of This Strike Rate Calculator</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Format-Specific Ratings</h3>
                      <p className="text-sm text-muted-foreground">Get strike rate assessments tailored to T20, ODI, and Test cricket with appropriate performance standards.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Instant Calculation</h3>
                      <p className="text-sm text-muted-foreground">Get strike rate results immediately without manual calculations. Simply enter runs and balls faced.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Performance Benchmarks</h3>
                      <p className="text-sm text-muted-foreground">Compare strike rates against format-specific standards to understand batting aggression levels.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Expert Batting Tips</h3>
                      <p className="text-sm text-muted-foreground">Receive actionable recommendations to improve strike rate based on format and performance level.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Sample Size Analysis</h3>
                      <p className="text-sm text-muted-foreground">Get insights on whether the strike rate is based on a significant sample for reliable assessment.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Free Cricket Tool</h3>
                      <p className="text-sm text-muted-foreground">Completely free strike rate calculator for players, coaches, analysts, and cricket fans worldwide.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reference Table */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-3">Strike Rate Benchmarks by Format</h3>
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
                        <td className="py-2 text-green-600">150+</td>
                        <td className="py-2">120 - 130</td>
                        <td className="py-2">110 - 120</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">ODI</td>
                        <td className="py-2 text-green-600">100+</td>
                        <td className="py-2">85 - 95</td>
                        <td className="py-2">70 - 85</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Test</td>
                        <td className="py-2 text-green-600">60+</td>
                        <td className="py-2">50 - 55</td>
                        <td className="py-2">40 - 50</td>
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
                  <h3 className="font-semibold mb-2">How is strike rate calculated in cricket?</h3>
                  <p className="text-sm text-muted-foreground">Strike rate is calculated by dividing runs scored by balls faced, then multiplying by 100. The formula is: Strike Rate = (Runs ÷ Balls Faced) × 100. For example, scoring 50 runs off 35 balls gives a strike rate of 142.86.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What is a good strike rate in T20 cricket?</h3>
                  <p className="text-sm text-muted-foreground">In T20 cricket, a strike rate above 130 is considered excellent, while 110-130 is good. Elite T20 batsmen like Andre Russell and Nicholas Pooran maintain strike rates above 150. Opening batsmen typically have lower strike rates than finishers.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Why is strike rate important in cricket?</h3>
                  <p className="text-sm text-muted-foreground">Strike rate measures batting aggression and scoring speed, which is crucial in limited-overs cricket. High strike rates help teams set competitive totals or chase targets efficiently. In T20 especially, strike rate is often more important than batting average.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What is the difference between strike rate and average?</h3>
                  <p className="text-sm text-muted-foreground">Batting average measures runs per dismissal (consistency), while strike rate measures runs per 100 balls (speed). A complete batsman balances both - high average for reliability and high strike rate for match-winning impact.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Who has the highest strike rate in T20 cricket?</h3>
                  <p className="text-sm text-muted-foreground">Among players with significant T20 careers, Andre Russell, Nicholas Pooran, and Glenn Maxwell have strike rates above 150. In IPL, players like Andre Russell and Sunil Narine have maintained exceptional strike rates throughout their careers.</p>
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
