"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RankingPercentileCalculatorPage() {
  const [rank, setRank] = useState<string>("");
  const [totalStudents, setTotalStudents] = useState<string>("");
  const [result, setResult] = useState<{
    percentile: number;
    percentage: number;
    status: string;
    topPercent: number;
  } | null>(null);

  const calculate = () => {
    const rankNum = parseInt(rank);
    const totalNum = parseInt(totalStudents);

    if (isNaN(rankNum) || isNaN(totalNum) || rankNum <= 0 || totalNum <= 0 || rankNum > totalNum) return;

    // Percentile formula: ((Total - Rank) / Total) × 100
    // This gives the percentage of students you scored better than
    const percentile = ((totalNum - rankNum) / totalNum) * 100;
    const roundedPercentile = Math.round(percentile * 100) / 100;

    // Percentage (your position as a percentage)
    const percentage = (rankNum / totalNum) * 100;
    const roundedPercentage = Math.round(percentage * 100) / 100;

    // Top X%
    const topPercent = roundedPercentage;

    // Status based on percentile
    let status = "";
    if (roundedPercentile >= 99) status = "Exceptional - Top 1%";
    else if (roundedPercentile >= 95) status = "Outstanding - Top 5%";
    else if (roundedPercentile >= 90) status = "Excellent - Top 10%";
    else if (roundedPercentile >= 80) status = "Very Good - Top 20%";
    else if (roundedPercentile >= 70) status = "Good - Top 30%";
    else if (roundedPercentile >= 50) status = "Above Average";
    else if (roundedPercentile >= 30) status = "Average";
    else status = "Below Average";

    setResult({
      percentile: roundedPercentile,
      percentage: roundedPercentage,
      status,
      topPercent: roundedPercentage,
    });
  };

  const reset = () => {
    setRank("");
    setTotalStudents("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Ranking Percentile Calculator – Find Your Percentile Rank in Class or Exam
          </h1>
          <p className="text-muted-foreground">
            Find out where you stand among your peers with our Ranking Percentile Calculator.
            Enter your rank and total number of students to instantly calculate your percentile —
            useful for competitive exams, university admissions, and class rankings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rank">Your Rank</Label>
                <Input
                  id="rank"
                  type="number"
                  placeholder="e.g., 15"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  1 = highest rank (top of class)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="total">Total Students</Label>
                <Input
                  id="total"
                  type="number"
                  placeholder="e.g., 200"
                  value={totalStudents}
                  onChange={(e) => setTotalStudents(e.target.value)}
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
              <h3 className="text-lg font-semibold mb-4">Ranking Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Percentile Rank</p>
                    <p className="text-4xl font-bold text-primary">{result.percentile}th Percentile</p>
                    <p className="text-sm text-muted-foreground mt-1">{result.status}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Position</p>
                      <p className="text-2xl font-bold">Top {result.topPercent}%</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Rank</p>
                      <p className="text-2xl font-bold">#{rank}</p>
                      <p className="text-xs text-muted-foreground">of {totalStudents}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Interpretation</p>
                    <p className="text-lg mt-1">
                      You scored better than <span className="font-bold text-primary">{result.percentile}%</span> of students
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2 text-sm">Percentile Reference</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>99th percentile</span>
                        <span>Top 1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>95th percentile</span>
                        <span>Top 5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>90th percentile</span>
                        <span>Top 10%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>75th percentile</span>
                        <span>Top 25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>50th percentile</span>
                        <span>Median (Top 50%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your rank and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Understanding Percentiles</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Percentile = ((Total Students - Your Rank) ÷ Total Students) × 100</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Example:</strong> Rank 15 out of 200 students<br />
            Percentile = ((200 - 15) / 200) × 100 = 92.5th percentile<br />
            This means you scored better than 92.5% of students.
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            <strong>Note:</strong> A higher percentile is better. 99th percentile means you're in
            the top 1% of all students.
          </p>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Percentile Reference Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Percentile</th>
                    <th className="text-left py-3 px-2 font-semibold">Top %</th>
                    <th className="text-left py-3 px-2 font-semibold">Interpretation</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">99th</td>
                    <td className="py-3 px-2">Top 1%</td>
                    <td className="py-3 px-2">Exceptional performance</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">95th</td>
                    <td className="py-3 px-2">Top 5%</td>
                    <td className="py-3 px-2">Outstanding performance</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">90th</td>
                    <td className="py-3 px-2">Top 10%</td>
                    <td className="py-3 px-2">Excellent performance</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">75th</td>
                    <td className="py-3 px-2">Top 25%</td>
                    <td className="py-3 px-2">Above average</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">50th</td>
                    <td className="py-3 px-2">Top 50%</td>
                    <td className="py-3 px-2">Median (middle)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">25th</td>
                    <td className="py-3 px-2">Top 75%</td>
                    <td className="py-3 px-2">Below average</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the difference between rank and percentile?</h4>
                <p>
                  Rank is your position (1st, 15th, 100th). Percentile shows what percentage you scored
                  better than. Rank 15 out of 200 is the 92.5th percentile — you did better than 92.5% of students.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is a higher percentile better?</h4>
                <p>
                  Yes. The 99th percentile means you scored better than 99% of test-takers. The 50th
                  percentile is the median — half scored higher, half scored lower.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How is percentile used in college admissions?</h4>
                <p>
                  Colleges use percentiles to compare applicants from different schools. A 95th percentile
                  SAT score means you outperformed 95% of all test-takers, regardless of your school's
                  grading scale.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can percentile be above 99?</h4>
                <p>
                  Technically no — 99.99th percentile is the maximum. Some tests report "99+" for scores
                  at the very top. This means you are in the top 1% but the test cannot distinguish finer
                  differences at that level.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is a good percentile rank?</h4>
                <p>
                  It depends on your goal. For competitive programs, aim for 90th percentile or higher.
                  For general purposes, 75th percentile or above is considered strong. The 50th percentile
                  is average — half of test-takers score above this.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Related Tools
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="/calculators/gpa-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">GPA Calculator</span>
                <p className="text-muted-foreground">Calculate your grade point average for high school or college</p>
              </a>
              <a
                href="/calculators/final-grade-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Final Grade Calculator</span>
                <p className="text-muted-foreground">Find out what score you need on your final exam</p>
              </a>
              <a
                href="/calculators/class-rank-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Class Rank Calculator</span>
                <p className="text-muted-foreground">Estimate your class rank based on GPA and class size</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
