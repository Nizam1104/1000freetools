"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MarkToGradeConverterPage() {
  const [marks, setMarks] = useState<string>("");
  const [maxMarks, setMaxMarks] = useState<string>("100");
  const [gradingScale, setGradingScale] = useState<"letter" | "gpa" | "points">("letter");
  const [scaleType, setScaleType] = useState<"standard" | "ib" | "cambridge" | "cbse">("standard");
  const [result, setResult] = useState<{
    percentage: number;
    grade: string;
    gradePoint: number;
    status: string;
  } | null>(null);

  // Standard letter grade scale
  const standardGrades = [
    { min: 93, grade: "A", point: 4.0, status: "Excellent" },
    { min: 90, grade: "A-", point: 3.7, status: "Excellent" },
    { min: 87, grade: "B+", point: 3.3, status: "Very Good" },
    { min: 83, grade: "B", point: 3.0, status: "Good" },
    { min: 80, grade: "B-", point: 2.7, status: "Good" },
    { min: 77, grade: "C+", point: 2.3, status: "Average" },
    { min: 73, grade: "C", point: 2.0, status: "Average" },
    { min: 70, grade: "C-", point: 1.7, status: "Below Average" },
    { min: 67, grade: "D+", point: 1.3, status: "Below Average" },
    { min: 63, grade: "D", point: 1.0, status: "Poor" },
    { min: 60, grade: "D-", point: 0.7, status: "Poor" },
    { min: 0, grade: "F", point: 0.0, status: "Fail" },
  ];

  // IB Scale (1-7)
  const ibGrades = [
    { min: 90, grade: "7", point: 4.0, status: "Excellent" },
    { min: 80, grade: "6", point: 3.7, status: "Very Good" },
    { min: 70, grade: "5", point: 3.0, status: "Good" },
    { min: 60, grade: "4", point: 2.0, status: "Satisfactory" },
    { min: 50, grade: "3", point: 1.0, status: "Mediocre" },
    { min: 40, grade: "2", point: 0.5, status: "Poor" },
    { min: 0, grade: "1", point: 0.0, status: "Very Poor" },
  ];

  // Cambridge IGCSE Scale
  const cambridgeGrades = [
    { min: 90, grade: "A*", point: 4.0, status: "Excellent" },
    { min: 80, grade: "A", point: 3.7, status: "Excellent" },
    { min: 70, grade: "B", point: 3.0, status: "Good" },
    { min: 60, grade: "C", point: 2.0, status: "Satisfactory" },
    { min: 50, grade: "D", point: 1.0, status: "Pass" },
    { min: 40, grade: "E", point: 0.5, status: "Marginal Pass" },
    { min: 0, grade: "U", point: 0.0, status: "Ungraded" },
  ];

  // CBSE Scale (India)
  const cbseGrades = [
    { min: 91, grade: "A1", point: 10.0, status: "Outstanding" },
    { min: 81, grade: "A2", point: 9.0, status: "Excellent" },
    { min: 71, grade: "B1", point: 8.0, status: "Very Good" },
    { min: 61, grade: "B2", point: 7.0, status: "Good" },
    { min: 51, grade: "C1", point: 6.0, status: "Above Average" },
    { min: 41, grade: "C2", point: 5.0, status: "Average" },
    { min: 33, grade: "D", point: 4.0, status: "Pass" },
    { min: 0, grade: "E", point: 0.0, status: "Fail" },
  ];

  const getGradeForPercentage = (percentage: number) => {
    let scale;
    if (scaleType === "ib") scale = ibGrades;
    else if (scaleType === "cambridge") scale = cambridgeGrades;
    else if (scaleType === "cbse") scale = cbseGrades;
    else scale = standardGrades;

    for (const item of scale) {
      if (percentage >= item.min) {
        return { grade: item.grade, point: item.point, status: item.status };
      }
    }
    return { grade: "F", point: 0.0, status: "Fail" };
  };

  const calculate = () => {
    const marksNum = parseFloat(marks);
    const maxNum = parseFloat(maxMarks);

    if (isNaN(marksNum) || isNaN(maxNum) || maxNum <= 0 || marksNum < 0) return;

    const percentage = (marksNum / maxNum) * 100;
    const roundedPercentage = Math.round(percentage * 100) / 100;

    const gradeInfo = getGradeForPercentage(roundedPercentage);

    setResult({
      percentage: roundedPercentage,
      grade: gradeInfo.grade,
      gradePoint: gradeInfo.point,
      status: gradeInfo.status,
    });
  };

  const reset = () => {
    setMarks("");
    setMaxMarks("100");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Mark to Grade Converter – Convert Exam Marks to Letter Grades Instantly
          </h1>
          <p className="text-muted-foreground">
            Quickly convert your numerical marks to letter grades or grade points with our
            Mark-to-Grade Converter. Supports custom grading scales including A–F, O/A/B/C, and
            10-point systems used globally.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="marks">Marks Obtained</Label>
                <Input
                  id="marks"
                  type="number"
                  placeholder="e.g., 85"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxMarks">Maximum Marks</Label>
                <Input
                  id="maxMarks"
                  type="number"
                  placeholder="100"
                  value={maxMarks}
                  onChange={(e) => setMaxMarks(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scaleType">Grading Scale</Label>
                <Select value={scaleType} onValueChange={(v) => setScaleType(v as "standard" | "ib" | "cambridge" | "cbse")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard (A-F, 4.0 GPA)</SelectItem>
                    <SelectItem value="ib">IB (1-7 Scale)</SelectItem>
                    <SelectItem value="cambridge">Cambridge IGCSE (A*-U)</SelectItem>
                    <SelectItem value="cbse">CBSE (A1-E, 10 Point)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gradingScale">Output Format</Label>
                <Select value={gradingScale} onValueChange={(v) => setGradingScale(v as "letter" | "gpa" | "points")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="letter">Letter Grade</SelectItem>
                    <SelectItem value="gpa">GPA / Grade Point</SelectItem>
                    <SelectItem value="points">All Information</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Convert
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Grade Conversion Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Percentage</p>
                    <p className="text-4xl font-bold text-primary">{result.percentage}%</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Letter Grade</p>
                      <p className="text-3xl font-bold">{result.grade}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Grade Point</p>
                      <p className="text-3xl font-bold">{result.gradePoint}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-xl font-bold">{result.status}</p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground">
                    <p>
                      <strong>Calculation:</strong> ({marks} / {maxMarks}) × 100 = {result.percentage}%
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter marks and click Convert to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Mark to Grade Converter
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your marks obtained</p>
                    <p>Type the score you received on your test or assignment. For example, if you scored 85 out of 100, enter &quot;85&quot;.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set the maximum marks and grading scale</p>
                    <p>Enter the total possible marks (default is 100). Choose your grading scale: Standard (A-F), IB (1-7), Cambridge IGCSE (A*-U), or CBSE (A1-E).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click Convert to see your grade</p>
                    <p>The calculator shows your percentage, letter grade, grade point (GPA), and performance status instantly.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Grading Scale Comparison Table
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Percentage</th>
                      <th className="text-left py-3 px-2 font-semibold">Standard (US)</th>
                      <th className="text-left py-3 px-2 font-semibold">IB Scale</th>
                      <th className="text-left py-3 px-2 font-semibold">Cambridge</th>
                      <th className="text-left py-3 px-2 font-semibold">CBSE (India)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">93-100%</td>
                      <td className="py-3 px-2">A (4.0)</td>
                      <td className="py-3 px-2">7</td>
                      <td className="py-3 px-2">A*</td>
                      <td className="py-3 px-2">A1 (10.0)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">90-92%</td>
                      <td className="py-3 px-2">A- (3.7)</td>
                      <td className="py-3 px-2">7</td>
                      <td className="py-3 px-2">A*</td>
                      <td className="py-3 px-2">A1 (10.0)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">80-89%</td>
                      <td className="py-3 px-2">B+ to B- (3.3-2.7)</td>
                      <td className="py-3 px-2">6</td>
                      <td className="py-3 px-2">A</td>
                      <td className="py-3 px-2">A2 (9.0)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">70-79%</td>
                      <td className="py-3 px-2">C+ to C- (2.3-1.7)</td>
                      <td className="py-3 px-2">5</td>
                      <td className="py-3 px-2">B</td>
                      <td className="py-3 px-2">B1 to B2 (8.0-7.0)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">60-69%</td>
                      <td className="py-3 px-2">D+ to D- (1.3-0.7)</td>
                      <td className="py-3 px-2">4</td>
                      <td className="py-3 px-2">C</td>
                      <td className="py-3 px-2">C1 to C2 (6.0-5.0)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">50-59%</td>
                      <td className="py-3 px-2">F (0.0)</td>
                      <td className="py-3 px-2">3</td>
                      <td className="py-3 px-2">D</td>
                      <td className="py-3 px-2">C1 to C2 (6.0-5.0)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Below 50%</td>
                      <td className="py-3 px-2">F (0.0)</td>
                      <td className="py-3 px-2">1-2</td>
                      <td className="py-3 px-2">E to U</td>
                      <td className="py-3 px-2">D to E (4.0-0.0)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Exact grade boundaries may vary by school or examination board. Check your institution's specific grading policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Grading Systems
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Standard Letter Grades (US System)</h4>
                  <p>
                    The A-F grading system is used across most US schools and universities. Each letter corresponds to a grade point on a 4.0 scale. A represents excellent work (93-100%), while F indicates failure (below 60%). Plus and minus modifiers provide finer distinctions within each letter grade.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">IB Grading Scale</h4>
                  <p>
                    The International Baccalaureate uses a 1-7 scale, where 7 is the highest. A score of 4 is considered passing. IB grades are based on a combination of internal assessments and external examinations. The final IB diploma requires a minimum of 24 points across six subjects.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Cambridge IGCSE Grades</h4>
                  <p>
                    Cambridge IGCSE uses grades A* through G, with U indicating ungraded. A* represents outstanding performance (90%+). The system is criterion-referenced, meaning grades reflect achievement against set standards rather than comparison with other students.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">CBSE Grading System (India)</h4>
                  <p>
                    The Central Board of Secondary Education in India uses a 10-point GPA scale with grades A1 through E. A1 (91-100%) carries 10 grade points. This system reduces mark differentiation and focuses on broader achievement bands to reduce student stress.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Understanding Your Grades
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Know your grading scale</p>
                    <p>Different schools and programs use different scales. Always confirm which system applies to your situation before interpreting grades.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Focus on improvement, not just the grade</p>
                    <p>A grade shows where you are now, not where you can be. Use feedback to identify areas for growth.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate what you need</p>
                    <p>Use this converter to figure out what score you need on remaining assignments to reach your target grade.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Understand weighted grades</p>
                    <p>Some courses weight different assignments differently. A test might count more than homework. Factor this into your planning.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I convert my percentage to a letter grade?</h4>
                  <p>
                    Enter your marks and the maximum possible marks in this calculator. Select your grading scale (Standard, IB, Cambridge, or CBSE). The tool calculates your percentage and shows the corresponding letter grade, grade point, and performance status.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What is a passing grade in the US system?</h4>
                  <p>
                    In most US schools, a D (60-69%) is the minimum passing grade, though some programs require a C (70%+) to pass. Graduate programs often require a B (80%+) average. Check your specific program requirements, as policies vary.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How does GPA conversion work?</h4>
                  <p>
                    Each letter grade corresponds to a grade point on a 4.0 scale. A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0. Plus grades add 0.3, minus grades subtract 0.3. Your GPA is the average of all your grade points, weighted by course credits.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What grade do I need for an A?</h4>
                  <p>
                    In the standard US system, you need 93% or higher for an A. Some schools use 90% as the A threshold. For an A-, you typically need 90-92%. Check your syllabus for your school's specific grade boundaries.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can I use this for weighted grades?</h4>
                  <p>
                    This calculator converts raw marks to grades. For weighted grades, first calculate your weighted percentage. For example, if a test worth 60% of your grade scored 85%, that contributes 0.6 × 85 = 51 percentage points to your final grade.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
