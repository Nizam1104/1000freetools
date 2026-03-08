"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FootballResult {
  goals: number;
  shots: number;
  conversionRate: number;
  shotsPerGoal: number;
  rating: string;
  comparison: string;
  recommendations: string[];
}

export default function FootballGoalConversionCalculatorPage() {
  const [goals, setGoals] = useState<string>("");
  const [shots, setShots] = useState<string>("");
  const [shotsOnTarget, setShotsOnTarget] = useState<string>("");
  const [result, setResult] = useState<FootballResult | null>(null);

  const calculate = () => {
    const goalsNum = parseInt(goals) || 0;
    const shotsNum = parseInt(shots) || 0;
    const shotsOnTargetNum = parseInt(shotsOnTarget) || 0;

    if (goalsNum === 0 || shotsNum === 0) return;

    // Conversion rate = (Goals / Shots) × 100
    const conversionRate = (goalsNum / shotsNum) * 100;

    // Shots per goal
    const shotsPerGoal = shotsNum / goalsNum;

    // Rating based on conversion rate
    let rating = "";
    let comparison = "";
    const recommendations: string[] = [];

    if (conversionRate >= 25) {
      rating = "World Class";
      comparison = "Better than elite strikers like Haaland, Kane";
      recommendations.push("🌟 Exceptional finishing! Maintain your technique.");
    } else if (conversionRate >= 20) {
      rating = "Excellent";
      comparison = "Top-tier striker level (Mbappé, Lewandowski)";
      recommendations.push("✅ Elite conversion rate. Keep up the work!");
    } else if (conversionRate >= 15) {
      rating = "Very Good";
      comparison = "Professional league average for strikers";
      recommendations.push("👍 Solid finishing. Work on shot selection.");
    } else if (conversionRate >= 10) {
      rating = "Average";
      comparison = "Typical for midfielders and wingers";
      recommendations.push("📈 Focus on shot placement over power.");
      recommendations.push("🎯 Take more shots on target.");
    } else if (conversionRate >= 5) {
      rating = "Below Average";
      comparison = "Needs improvement for competitive play";
      recommendations.push("📚 Work on finishing drills in training.");
      recommendations.push("👀 Improve decision-making in the box.");
    } else {
      rating = "Poor";
      comparison = "Significant room for improvement";
      recommendations.push("🎯 Practice basic finishing techniques.");
      recommendations.push("⚽ Consider shot selection coaching.");
    }

    // Add shot accuracy if provided
    if (shotsOnTargetNum > 0) {
      const accuracy = (shotsOnTargetNum / shotsNum) * 100;
      recommendations.push(`📊 Shot accuracy: ${accuracy.toFixed(1)}% (${shotsOnTargetNum}/${shotsNum} on target)`);

      if (accuracy < 40) {
        recommendations.push("💡 Work on shooting accuracy before power.");
      }
    }

    setResult({
      goals: goalsNum,
      shots: shotsNum,
      conversionRate: parseFloat(conversionRate.toFixed(1)),
      shotsPerGoal: parseFloat(shotsPerGoal.toFixed(1)),
      rating,
      comparison,
      recommendations,
    });
  };

  const reset = () => {
    setGoals("");
    setShots("");
    setShotsOnTarget("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Football Goal Conversion Rate Calculator – Measure Shooting Efficiency
          </h1>
          <p className="text-muted-foreground">
            Assess a striker&apos;s clinical finishing with our Football Goal Conversion Calculator.
            Enter total goals scored and shots attempted to calculate goal conversion rate —
            a vital metric for evaluating attacking effectiveness in football/soccer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="goals">Goals Scored</Label>
                  <Input
                    id="goals"
                    type="number"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="e.g., 20"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="shots">Total Shots</Label>
                  <Input
                    id="shots"
                    type="number"
                    value={shots}
                    onChange={(e) => setShots(e.target.value)}
                    placeholder="e.g., 100"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="shots-on-target">Shots on Target (optional)</Label>
                <Input
                  id="shots-on-target"
                  type="number"
                  value={shotsOnTarget}
                  onChange={(e) => setShotsOnTarget(e.target.value)}
                  placeholder="e.g., 50"
                />
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Pro Reference (2023/24 Season):
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Haaland: ~25% conversion</li>
                  <li>• Kane: ~22% conversion</li>
                  <li>• Salah: ~18% conversion</li>
                  <li>• League avg: ~12% conversion</li>
                </ul>
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
              <h3 className="text-lg font-semibold mb-4">Conversion Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${result.conversionRate >= 20 ? "bg-green-100 dark:bg-green-900/20" :
                      result.conversionRate >= 15 ? "bg-blue-100 dark:bg-blue-900/20" :
                        result.conversionRate >= 10 ? "bg-amber-100 dark:bg-amber-900/20" :
                          "bg-red-100 dark:bg-red-900/20"
                    }`}>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-5xl font-bold">{result.conversionRate}%</p>
                    <p className="text-sm mt-1 font-medium">{result.rating}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Shots per Goal</p>
                      <p className="text-2xl font-bold">{result.shotsPerGoal}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Goals/Shots</p>
                      <p className="text-2xl font-bold">{result.goals}/{result.shots}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">Comparison</p>
                    <p className="text-sm text-muted-foreground">{result.comparison}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Analysis & Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Formula:</strong> Conversion Rate = (Goals ÷ Shots) × 100
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter goals and shots to calculate conversion rate</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Conversion Rates
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Goal conversion rate measures shooting efficiency:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>25%+:</strong> World-class elite striker
                  </li>
                  <li>
                    <strong>20-25%:</strong> Top professional level
                  </li>
                  <li>
                    <strong>15-20%:</strong> Good professional striker
                  </li>
                  <li>
                    <strong>10-15%:</strong> Average (typical for midfielders)
                  </li>
                  <li>
                    <strong>&lt;10%:</strong> Needs improvement
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Conversion rates vary by position. Strikers
                  typically have higher rates than midfielders who shoot from distance.
                  Context matters — penalty box shots vs. long-range efforts.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Football Goal Conversion Rate</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Goals Scored</h3>
              <p className="text-sm text-muted-foreground">Input the total number of goals scored by the player in the selected period.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Add Shot Statistics</h3>
              <p className="text-sm text-muted-foreground">Enter total shots taken and optionally shots on target for deeper analysis.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Conversion Analysis</h3>
              <p className="text-sm text-muted-foreground">Receive conversion rate percentage, player rating, and comparison to pro benchmarks.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Why Use This Conversion Rate Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Pro Player Comparisons</h3>
            <p className="text-sm text-muted-foreground">Compare your conversion rate to elite strikers like Haaland (25%), Kane (22%), and Salah (18%).</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Shot Accuracy Tracking</h3>
            <p className="text-sm text-muted-foreground">Optional shots on target input reveals accuracy percentage for complete shooting analysis.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Skill Level Assessment</h3>
            <p className="text-sm text-muted-foreground">Automatic rating from Poor to World Class based on your conversion percentage.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Personalized Tips</h3>
            <p className="text-sm text-muted-foreground">Get targeted improvement recommendations based on your specific conversion rate.</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
          <h3 className="font-semibold mb-3">Conversion Rate Benchmarks by Level</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Rating</th>
                <th className="text-left py-2">Conversion Rate</th>
                <th className="text-left py-2">Shots per Goal</th>
                <th className="text-left py-2">Example Players</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">World Class</td>
                <td className="py-2">25%+</td>
                <td className="py-2">&lt;4 shots</td>
                <td className="py-2">Haaland, Lewandowski</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Excellent</td>
                <td className="py-2">20-25%</td>
                <td className="py-2">4-5 shots</td>
                <td className="py-2">Kane, Mbappe</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Very Good</td>
                <td className="py-2">15-20%</td>
                <td className="py-2">5-7 shots</td>
                <td className="py-2">Pro league strikers</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Average</td>
                <td className="py-2">10-15%</td>
                <td className="py-2">7-10 shots</td>
                <td className="py-2">Midfielders, wingers</td>
              </tr>
              <tr>
                <td className="py-2">Below Average</td>
                <td className="py-2">&lt;10%</td>
                <td className="py-2">10+ shots</td>
                <td className="py-2">Developing players</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">What is a good conversion rate in football?</h3>
            <p className="text-sm text-muted-foreground">For strikers, 15-20% is considered good at professional level. Elite finishers like Haaland achieve 25%+. The Premier League average for forwards is around 12-14%.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How is goal conversion rate calculated?</h3>
            <p className="text-sm text-muted-foreground">Conversion Rate = (Goals Scored / Total Shots) x 100. For example, 20 goals from 100 shots equals a 20% conversion rate.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What&apos;s the difference between conversion rate and shot accuracy?</h3>
            <p className="text-sm text-muted-foreground">Conversion rate measures goals per shot. Shot accuracy measures shots on target per total shot. A player can have high accuracy but low conversion if the goalkeeper makes saves.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Who has the best conversion rate in football?</h3>
            <p className="text-sm text-muted-foreground">Elite strikers like Erling Haaland (25%+), Harry Kane (22%), and Robert Lewandowski (23%) consistently top conversion rate charts in major European leagues.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How can I improve my conversion rate?</h3>
            <p className="text-sm text-muted-foreground">Focus on shot placement over power, practice finishing in the box, improve decision-making on when to shoot vs. pass, and study goalkeeper positioning patterns.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
    </div>
  );
}
