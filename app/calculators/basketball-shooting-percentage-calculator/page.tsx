"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
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
                How to Use This Basketball Shooting Percentage Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
                  <div>
                    <p className="font-medium text-foreground">Select your shot type</p>
                    <p>Choose Field Goal (all shots), Three-Point, or Free Throw. Each has different league averages and expectations.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
                  <div>
                    <p className="font-medium text-foreground">Enter shots made and attempted</p>
                    <p>Input the total number of successful shots and total attempts. Use season totals, game stats, or practice numbers.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
                  <div>
                    <p className="font-medium text-foreground">Click Calculate to see your percentage</p>
                    <p>Get your shooting percentage in basketball notation (like .450), see how you compare to league averages, and receive performance analysis.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                NBA Shooting Averages by Position
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Position</th>
                      <th className="text-left py-3 px-2 font-semibold">FG%</th>
                      <th className="text-left py-3 px-2 font-semibold">3P%</th>
                      <th className="text-left py-3 px-2 font-semibold">FT%</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Point Guard</td>
                      <td className="py-3 px-2">.440-.460</td>
                      <td className="py-3 px-2">.350-.380</td>
                      <td className="py-3 px-2">.800-.850</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Shooting Guard</td>
                      <td className="py-3 px-2">.450-.470</td>
                      <td className="py-3 px-2">.360-.390</td>
                      <td className="py-3 px-2">.820-.870</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Small Forward</td>
                      <td className="py-3 px-2">.460-.480</td>
                      <td className="py-3 px-2">.350-.380</td>
                      <td className="py-3 px-2">.780-.830</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Power Forward</td>
                      <td className="py-3 px-2">.480-.510</td>
                      <td className="py-3 px-2">.340-.380</td>
                      <td className="py-3 px-2">.750-.800</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Center</td>
                      <td className="py-3 px-2">.550-.600</td>
                      <td className="py-3 px-2">.300-.350</td>
                      <td className="py-3 px-2">.700-.780</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Averages vary by season and playing style. Modern NBA emphasizes three-point shooting more than in the past.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Basketball Shooting Statistics
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Field Goal Percentage (FG%)</h4>
                  <p>
                    Field goal percentage counts all shots except free throws. It includes two-pointers and three-pointers combined. Centers typically have higher FG% because they shoot closer to the basket. Guards often have lower FG% but take more difficult shots.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Three-Point Percentage (3P%)</h4>
                  <p>
                    Three-point percentage measures accuracy from beyond the arc. The NBA average hovers around 36%. Elite shooters hit 40% or better. Volume matters too — hitting 40% on two attempts per game is different than hitting 40% on eight attempts.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Free Throw Percentage (FT%)</h4>
                  <p>
                    Free throws are uncontested shots from the line. Good shooters hit 80% or better. Elite free throw shooters reach 90%. Poor free throw shooting can keep players on the bench in close games. The pressure of late-game situations separates good from great.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Effective Field Goal Percentage (eFG%)</h4>
                  <p>
                    eFG% adjusts for the extra point from three-pointers. The formula is (FGM + 0.5 × 3PM) / FGA. A player who shoots 40% from three is as valuable as someone shooting 60% on twos. This stat better captures modern shooting value.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Improving Shooting Percentage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Focus on shot selection</p>
                  <p>Taking contested, low-percentage shots hurts your stats more than missing open looks. Good shots come from ball movement and finding your spots on the floor.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Practice game-speed shooting</p>
                  <p>Shooting alone at the gym feels different than game conditions. Practice coming off screens, catching and shooting quickly, and shooting when tired.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Track your stats honestly</p>
                  <p>Count every miss, even in practice. Tracking real numbers helps identify weaknesses. Many players think they shoot better than they actually do.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Work on free throws daily</p>
                  <p>Free throws are the most controllable shot in basketball. Shoot 50-100 free throws every practice. Develop a consistent routine you can use under pressure.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What is a good field goal percentage in basketball?</h4>
                <p>
                  It depends on position and level. In the NBA, 46% is average for all players. Guards typically shoot 42-46%, forwards 46-50%, and centers 55% or higher. College averages run about 2-4% lower than the NBA.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How is shooting percentage calculated?</h4>
                <p>
                  Divide made shots by attempted shots. If you made 25 of 50 shots, your percentage is 25/50 = 0.500 or 50%. Basketball traditionally shows this as .500 rather than 50%.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Do free throws count in field goal percentage?</h4>
                <p>
                  No. Field goal percentage excludes free throws. Free throws have their own statistic (FT%). This separation exists because free throws are fundamentally different from live-play shots.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why do centers have higher shooting percentages?</h4>
                <p>
                  Centers shoot closer to the basket where shots are easier. They get more dunks, layups, and short hook shots. Guards take more jump shots and contested attempts, which lowers their percentage.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How many attempts do I need for a meaningful percentage?</h4>
                <p>
                  Small samples can be misleading. Shooting 6 of 10 in one game does not make you a 60% shooter. For season stats, you need hundreds of attempts. NBA leaders typically have 400+ field goal attempts per season.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
