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

interface CurveResult {
  originalScore: number;
  curveMethod: string;
  curvedScore: number;
  letterGradeBefore: string;
  letterGradeAfter: string;
  pointsAdded: number;
  classAverage?: number;
  standardDeviation?: number;
  explanation: string;
}

export default function ExamCorrectionCurveCalculatorPage() {
  const [originalScore, setOriginalScore] = useState<string>("");
  const [maxScore, setMaxScore] = useState<string>("100");
  const [curveMethod, setCurveMethod] = useState<string>("flat");
  const [flatPoints, setFlatPoints] = useState<string>("5");
  const [targetAverage, setTargetAverage] = useState<string>("75");
  const [classAverage, setClassAverage] = useState<string>("");
  const [result, setResult] = useState<CurveResult | null>(null);

  const calculate = () => {
    const scoreNum = parseFloat(originalScore);
    const maxNum = parseFloat(maxScore);
    const flatPointsNum = parseFloat(flatPoints);
    const targetAvgNum = parseFloat(targetAverage);
    const classAvgNum = parseFloat(classAverage);

    if (isNaN(scoreNum) || isNaN(maxNum)) return;

    let curvedScore = scoreNum;
    let explanation = "";
    let method = "";

    switch (curveMethod) {
      case "flat":
        // Add flat points to all scores
        curvedScore = Math.min(maxNum, scoreNum + flatPointsNum);
        method = `Flat curve: +${flatPointsNum} points`;
        explanation = `Added ${flatPointsNum} points to all scores. Capped at maximum (${maxNum}).`;
        break;

      case "sqrt":
        // Square root curve: √score × 10
        curvedScore = Math.sqrt(scoreNum) * 10;
        curvedScore = Math.min(maxNum, curvedScore);
        method = "Square root curve";
        explanation = `Formula: √${scoreNum} × 10 = ${curvedScore.toFixed(1)}. Benefits lower scores more.`;
        break;

      case "proportional":
        // Scale proportionally to reach target average
        if (classAvgNum && classAvgNum > 0) {
          const scale = targetAvgNum / classAvgNum;
          curvedScore = Math.min(maxNum, scoreNum * scale);
          method = `Proportional scaling (target: ${targetAvgNum}%)`;
          explanation = `Scaled by factor of ${scale.toFixed(2)} to raise class average from ${classAvgNum}% to ${targetAvgNum}%.`;
        } else {
          // Default scaling
          curvedScore = Math.min(maxNum, scoreNum * 1.1);
          method = "Proportional scaling (10%)";
          explanation = `Increased score by 10%.`;
        }
        break;

      case "bell":
        // Bell curve: normalize based on class stats
        if (classAvgNum) {
          const stdDev = maxNum * 0.15; // Assume 15% std dev
          const zScore = (scoreNum - classAvgNum) / stdDev;
          const targetAvg = targetAvgNum;
          const targetStdDev = maxNum * 0.12;
          curvedScore = targetAvg + (zScore * targetStdDev);
          curvedScore = Math.max(0, Math.min(maxNum, curvedScore));
          method = "Bell curve normalization";
          explanation = `Normalized based on class average (${classAvgNum}%) with target average of ${targetAvgNum}%.`;
        } else {
          // Simple bell curve approximation
          curvedScore = 60 + (scoreNum - 50) * 0.8;
          curvedScore = Math.max(0, Math.min(maxNum, curvedScore));
          method = "Bell curve (estimated)";
          explanation = `Applied bell curve distribution centered at 60%.`;
        }
        break;

      case "linear":
        // Linear scaling between min and max
        const minOriginal = 0;
        const minTarget = 50;
        const maxTarget = maxNum;
        if (scoreNum <= minOriginal) {
          curvedScore = minTarget;
        } else if (scoreNum >= maxNum) {
          curvedScore = maxTarget;
        } else {
          curvedScore = minTarget + ((scoreNum - minOriginal) / (maxNum - minOriginal)) * (maxTarget - minTarget);
        }
        method = "Linear interpolation";
        explanation = `Scaled linearly: lowest score → ${minTarget}, highest → ${maxTarget}.`;
        break;
    }

    curvedScore = Math.round(curvedScore * 10) / 10;

    // Determine letter grades
    const getLetterGrade = (score: number): string => {
      if (score >= 93) return "A";
      if (score >= 90) return "A-";
      if (score >= 87) return "B+";
      if (score >= 83) return "B";
      if (score >= 80) return "B-";
      if (score >= 77) return "C+";
      if (score >= 73) return "C";
      if (score >= 70) return "C-";
      if (score >= 67) return "D+";
      if (score >= 63) return "D";
      if (score >= 60) return "D-";
      return "F";
    };

    const letterGradeBefore = getLetterGrade(scoreNum);
    const letterGradeAfter = getLetterGrade(curvedScore);
    const pointsAdded = curvedScore - scoreNum;

    setResult({
      originalScore: scoreNum,
      curveMethod: method,
      curvedScore,
      letterGradeBefore,
      letterGradeAfter,
      pointsAdded: parseFloat(pointsAdded.toFixed(1)),
      classAverage: classAvgNum || undefined,
      standardDeviation: maxNum * 0.15,
      explanation,
    });
  };

  const reset = () => {
    setOriginalScore("");
    setMaxScore("100");
    setFlatPoints("5");
    setClassAverage("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Exam Correction Curve Calculator – Apply Grade Curves to Exam Scores
          </h1>
          <p className="text-muted-foreground">
            Easily apply bell curve or flat curve adjustments to exam scores with our
            Exam Correction Curve Calculator. Supports multiple curving methods including
            flat point addition, square root curve, and proportional scaling for fair grade distribution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="original-score">Original Score</Label>
                  <Input
                    id="original-score"
                    type="number"
                    value={originalScore}
                    onChange={(e) => setOriginalScore(e.target.value)}
                    placeholder="e.g., 72"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="max-score">Maximum Score</Label>
                  <Input
                    id="max-score"
                    type="number"
                    value={maxScore}
                    onChange={(e) => setMaxScore(e.target.value)}
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="curve-method">Curve Method</Label>
                <Select value={curveMethod} onValueChange={setCurveMethod}>
                  <SelectTrigger id="curve-method">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat Curve (Add Points)</SelectItem>
                    <SelectItem value="sqrt">Square Root Curve</SelectItem>
                    <SelectItem value="proportional">Proportional Scaling</SelectItem>
                    <SelectItem value="bell">Bell Curve</SelectItem>
                    <SelectItem value="linear">Linear Interpolation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {curveMethod === "flat" && (
                <div className="space-y-2">
                  <Label htmlFor="flat-points">Points to Add</Label>
                  <Input
                    id="flat-points"
                    type="number"
                    value={flatPoints}
                    onChange={(e) => setFlatPoints(e.target.value)}
                    placeholder="5"
                  />
                </div>
              )}

              {(curveMethod === "proportional" || curveMethod === "bell") && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="target-average">Target Average (%)</Label>
                    <Input
                      id="target-average"
                      type="number"
                      value={targetAverage}
                      onChange={(e) => setTargetAverage(e.target.value)}
                      placeholder="75"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="class-average">Class Average (%)</Label>
                    <Input
                      id="class-average"
                      type="number"
                      value={classAverage}
                      onChange={(e) => setClassAverage(e.target.value)}
                      placeholder="Optional"
                    />
                  </div>
                </div>
              )}

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
              <h3 className="text-lg font-semibold mb-4">Curved Score Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Original Score</p>
                      <p className="text-3xl font-bold">{result.originalScore}</p>
                      <p className="text-sm text-muted-foreground">Grade: {result.letterGradeBefore}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Curved Score</p>
                      <p className="text-3xl font-bold text-primary">{result.curvedScore}</p>
                      <p className="text-sm text-muted-foreground">Grade: {result.letterGradeAfter}</p>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg text-center ${result.pointsAdded > 0 ? "bg-green-50 dark:bg-green-950/20" : "bg-muted"
                    }`}>
                    <p className="text-sm">Points Added</p>
                    <p className={`text-2xl font-bold ${result.pointsAdded > 0 ? "text-green-600" : ""
                      }`}>
                      {result.pointsAdded > 0 ? "+" : ""}{result.pointsAdded}
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-2">{result.curveMethod}</p>
                    <p className="text-sm text-muted-foreground">{result.explanation}</p>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Grade Change:</strong> {result.letterGradeBefore} → {result.letterGradeAfter}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter score and select curve method to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Curve Methods Explained
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Flat Curve:</strong> Adds the same number of points to all scores.
                    Simple and fair for small adjustments.
                  </li>
                  <li>
                    <strong>Square Root Curve:</strong> √score × 10. Benefits lower scores more
                    dramatically while barely affecting high scores.
                  </li>
                  <li>
                    <strong>Proportional Scaling:</strong> Multiplies all scores by a factor to
                    reach a target class average.
                  </li>
                  <li>
                    <strong>Bell Curve:</strong> Normalizes scores to fit a normal distribution
                    with specified mean and standard deviation.
                  </li>
                  <li>
                    <strong>Linear Interpolation:</strong> Maps original scores to a new range,
                    setting minimum and maximum target scores.
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Curving should be used thoughtfully. Consider the
                  reason for curving and ensure it&apos;s applied consistently to all students.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-semibold mb-6">How to Apply Grade Curves</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Enter Original Score</h3>
              <p className="text-sm text-muted-foreground">Input the student's raw score and the maximum possible score for the exam.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Select Curve Method</h3>
              <p className="text-sm text-muted-foreground">Choose from flat curve, square root, proportional scaling, bell curve, or linear interpolation.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">View Curved Grade</h3>
              <p className="text-sm text-muted-foreground">See the adjusted score, new letter grade, points added, and explanation of the calculation.</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Exam Curve Calculator?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Multiple Curve Methods
              </h3>
              <p className="text-sm text-muted-foreground">Supports five different curving techniques to match your grading philosophy and class needs.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Instant Grade Conversion
              </h3>
              <p className="text-sm text-muted-foreground">See both numerical score and letter grade before and after curving in real-time.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Detailed Explanations
              </h3>
              <p className="text-sm text-muted-foreground">Each result includes a clear explanation of how the curved score was calculated.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Class Statistics Support
              </h3>
              <p className="text-sm text-muted-foreground">Enter class average for proportional and bell curve methods for accurate scaling.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Fair Grade Distribution
              </h3>
              <p className="text-sm text-muted-foreground">Helps ensure grades reflect student performance relative to exam difficulty.</p>
            </div>
          </div>

          <div className="mt-6 p-6 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Curve Method Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Method</th>
                    <th className="text-left py-2">Best For</th>
                    <th className="text-left py-2">Effect on Scores</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Flat Curve</td>
                    <td className="py-2">Small adjustments</td>
                    <td className="py-2">Adds same points to all</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Square Root</td>
                    <td className="py-2">Helping low scorers</td>
                    <td className="py-2">Benefits lower scores more</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Proportional</td>
                    <td className="py-2">Target average</td>
                    <td className="py-2">Scales all by same factor</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Bell Curve</td>
                    <td className="py-2">Normal distribution</td>
                    <td className="py-2">Normalizes to target mean</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Linear</td>
                    <td className="py-2">Setting min/max</td>
                    <td className="py-2">Maps to new range</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions About Grade Curving</h2>
          <div className="space-y-4">
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What is the purpose of curving grades?</h3>
              <p className="text-sm text-muted-foreground">Curving adjusts scores to account for exam difficulty, ensure fair grade distribution, or align with institutional standards. It helps when an exam was unexpectedly challenging.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Which curve method is fairest?</h3>
              <p className="text-sm text-muted-foreground">Fairness depends on context. Flat curves treat everyone equally. Square root curves help struggling students most. Proportional curves maintain relative rankings while raising averages.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Can curving lower a student's grade?</h3>
              <p className="text-sm text-muted-foreground">Most curve methods only raise scores. However, bell curve normalization could potentially lower high scores if the target distribution has a lower maximum. Always review results before applying.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How do I choose a target average for curving?</h3>
              <p className="text-sm text-muted-foreground">Common target averages are 75-80% (C+/B- range). Consider course level, institutional norms, and whether the exam tested essential competencies that should be mastered.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Should I curve all exams or just difficult ones?</h3>
              <p className="text-sm text-muted-foreground">Curve selectively when exams prove unexpectedly difficult or when scores don't reflect student preparation. Consistent curving on all exams may mask issues with exam design or instruction.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
      </div>
    </div>
  );
}
