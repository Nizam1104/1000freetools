"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GolfHandicapResult {
  scores: number[];
  courseRating: number;
  courseSlope: number;
  handicapDifferential: number[];
  handicapIndex: number;
  courseHandicap: number;
  playingHandicap: number;
  assessment: string;
  recommendations: string[];
}

export default function GolfHandicapCalculatorPage() {
  const [scores, setScores] = useState<string>("");
  const [courseRating, setCourseRating] = useState<string>("72.0");
  const [courseSlope, setCourseSlope] = useState<string>("113");
  const [result, setResult] = useState<GolfHandicapResult | null>(null);

  const calculate = () => {
    // Parse scores (comma-separated)
    const scoresArray = scores.split(",").map(s => parseFloat(s.trim())).filter(s => !isNaN(s));
    const ratingNum = parseFloat(courseRating) || 72.0;
    const slopeNum = parseFloat(courseSlope) || 113;

    if (scoresArray.length === 0) return;

    // Calculate handicap differentials for each round
    // Differential = (Score - Rating) × 113 / Slope
    const differentials = scoresArray.map(score => {
      return (score - ratingNum) * 113 / slopeNum;
    });

    // Use best differentials based on number of rounds (WHS system)
    let numToUse = 0;
    if (scoresArray.length >= 20) numToUse = 8;
    else if (scoresArray.length >= 18) numToUse = 7;
    else if (scoresArray.length >= 16) numToUse = 6;
    else if (scoresArray.length >= 14) numToUse = 5;
    else if (scoresArray.length >= 12) numToUse = 4;
    else if (scoresArray.length >= 10) numToUse = 3;
    else if (scoresArray.length >= 8) numToUse = 2;
    else if (scoresArray.length >= 6) numToUse = 2;
    else if (scoresArray.length >= 3) numToUse = 1;

    // Sort differentials and take best ones
    const sortedDifferentials = [...differentials].sort((a, b) => a - b);
    const bestDifferentials = sortedDifferentials.slice(0, numToUse);

    // Calculate average of best differentials
    const avgDifferential = bestDifferentials.reduce((a, b) => a + b, 0) / bestDifferentials.length;

    // Apply 0.96 multiplier (WHS system)
    const handicapIndex = avgDifferential * 0.96;

    // Course handicap = Handicap Index × (Slope Rating / 113)
    const courseHandicap = handicapIndex * (slopeNum / 113);

    // Playing handicap (with handicap allowance, typically 95% for individual)
    const playingHandicap = courseHandicap * 0.95;

    // Assessment
    let assessment = "";
    if (handicapIndex <= 5) {
      assessment = "🏆 Scratch/Plus Handicap - Elite amateur level";
    } else if (handicapIndex <= 10) {
      assessment = "🥇 Single Digit - Advanced player";
    } else if (handicapIndex <= 18) {
      assessment = "🥈 Bogey Golfer - Intermediate player";
    } else if (handicapIndex <= 28) {
      assessment = "🥉 Double Digit - Recreational player";
    } else {
      assessment = "⛳ High Handicap - Beginner/Developing player";
    }

    // Recommendations
    const recommendations: string[] = [];

    if (handicapIndex > 20) {
      recommendations.push("📚 Focus on short game - 60% of shots are within 100 yards");
      recommendations.push("🎯 Take lessons to improve fundamentals");
    } else if (handicapIndex > 12) {
      recommendations.push("⛳ Work on consistency - reduce double bogeys");
      recommendations.push("🏌️ Practice course management");
    } else if (handicapIndex > 5) {
      recommendations.push("🎯 Fine-tune weak areas in your game");
      recommendations.push("📊 Consider statistical tracking (strokes gained)");
    } else {
      recommendations.push("🏆 Consider competitive play");
      recommendations.push("📈 Focus on mental game and course strategy");
    }

    recommendations.push(`📊 Based on ${scoresArray.length} round(s)`);

    setResult({
      scores: scoresArray,
      courseRating: ratingNum,
      courseSlope: slopeNum,
      handicapDifferential: differentials.map(d => parseFloat(d.toFixed(1))),
      handicapIndex: parseFloat(handicapIndex.toFixed(1)),
      courseHandicap: Math.round(courseHandicap),
      playingHandicap: Math.round(playingHandicap),
      assessment,
      recommendations,
    });
  };

  const reset = () => {
    setScores("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Golf Handicap Calculator – Calculate Your Official Golf Handicap Index
          </h1>
          <p className="text-muted-foreground">
            Find your official golf handicap with our Golf Handicap Calculator.
            Enter your recent round scores and course ratings to calculate your
            handicap index using the World Handicap System (WHS) formula —
            enabling fair competition with players of all abilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scores">Recent Scores (comma-separated)</Label>
                <Input
                  id="scores"
                  type="text"
                  value={scores}
                  onChange={(e) => setScores(e.target.value)}
                  placeholder="e.g., 85, 82, 88, 79, 84"
                />
                <p className="text-xs text-muted-foreground">
                  Enter at least 3 scores for initial handicap
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="rating">Course Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    value={courseRating}
                    onChange={(e) => setCourseRating(e.target.value)}
                    placeholder="72.0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="slope">Slope Rating</Label>
                  <Input
                    id="slope"
                    type="number"
                    value={courseSlope}
                    onChange={(e) => setCourseSlope(e.target.value)}
                    placeholder="113"
                  />
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Score Requirements:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Minimum 3 scores for initial handicap</li>
                  <li>• Maximum 20 scores in calculation</li>
                  <li>• Best 8 of last 20 for full handicap</li>
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
              <h3 className="text-lg font-semibold mb-4">Handicap Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Handicap Index</p>
                    <p className="text-5xl font-bold text-primary">{result.handicapIndex}</p>
                    <p className="text-sm mt-2">{result.assessment}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Course HC</p>
                      <p className="text-xl font-bold">{result.courseHandicap}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Playing HC</p>
                      <p className="text-xl font-bold">{result.playingHandicap}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Rounds</p>
                      <p className="text-xl font-bold">{result.scores.length}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Score Differentials</h4>
                    <div className="space-y-1">
                      {result.handicapDifferential.map((diff, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>Round {i + 1}: {result.scores[i]}</span>
                          <span className="font-mono">{diff}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Improvement Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your scores and click Calculate to see handicap</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Golf Handicaps
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Handicap Index:</strong> Your potential ability, portable across courses
                  </li>
                  <li>
                    <strong>Course Handicap:</strong> Adjusted for specific course difficulty
                  </li>
                  <li>
                    <strong>Slope Rating:</strong> Relative difficulty for bogey golfers (55-155)
                  </li>
                  <li>
                    <strong>Course Rating:</strong> Expected score for scratch golfer
                  </li>
                </ul>
                <p>
                  <strong>Formula:</strong> Differential = (Score - Rating) × 113 / Slope
                  <br />
                  Handicap Index = Average of best differentials × 0.96
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Calculate Your Golf Handicap</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Enter Your Recent Scores</h3>
                <p className="text-sm text-muted-foreground">Input at least 3 round scores (up to 20) as comma-separated values.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Add Course Ratings</h3>
                <p className="text-sm text-muted-foreground">Enter the Course Rating and Slope Rating from the scorecard of each round.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Get Your Handicap Index</h3>
                <p className="text-sm text-muted-foreground">View your official handicap index, course handicap, and personalized improvement tips.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Features of This Golf Handicap Calculator</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  World Handicap System Compliant
                </h3>
                <p className="text-sm text-muted-foreground">Uses the official WHS formula with 0.96 multiplier and best 8 of 20 differentials.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Multiple Handicap Values
                </h3>
                <p className="text-sm text-muted-foreground">Calculates Handicap Index, Course Handicap, and Playing Handicap for complete understanding.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Score Differential Breakdown
                </h3>
                <p className="text-sm text-muted-foreground">Shows individual differentials for each round so you can track improvement over time.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Skill Level Assessment
                </h3>
                <p className="text-sm text-muted-foreground">Automatic classification from scratch golfer to high handicap with appropriate benchmarks.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Personalized Improvement Tips
                </h3>
                <p className="text-sm text-muted-foreground">Get targeted recommendations based on your current handicap level for faster improvement.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions About Golf Handicaps</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How many rounds do I need to establish a handicap?</h3>
                <p className="text-sm text-muted-foreground">You need a minimum of 3 rounds to establish an initial handicap index. For a full handicap under the World Handicap System, up to 20 rounds are used, with the best 8 differentials counting toward your index.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is a good golf handicap for a beginner?</h3>
                <p className="text-sm text-muted-foreground">Beginners typically start with handicaps of 28-36. A handicap of 18 (bogey golfer) is a common goal for recreational players. Single-digit handicaps (below 10) indicate advanced skill, and scratch golfers have handicaps near 0.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is the difference between Course Rating and Slope Rating?</h3>
                <p className="text-sm text-muted-foreground">Course Rating is the expected score for a scratch golfer. Slope Rating (55-155) measures how much harder the course plays for bogey golfers compared to scratch golfers. A slope of 113 is average difficulty.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How often should I update my handicap?</h3>
                <p className="text-sm text-muted-foreground">Under the World Handicap System, handicaps update daily as new scores are posted. You should post every acceptable round as soon as possible to maintain an accurate, current handicap index.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Why is my course handicap different from my handicap index?</h3>
                <p className="text-sm text-muted-foreground">Course Handicap adjusts your Handicap Index for the specific course you are playing. It accounts for that course Slope Rating. Formula: Course Handicap = Handicap Index × (Slope Rating / 113). This ensures fair play across different courses.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools Section */}
      </div>
    </div>
  );
}
