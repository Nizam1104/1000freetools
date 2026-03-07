"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";

export default function GradePercentageCalculatorPage() {
  const [marksObtained, setMarksObtained] = useState<string>("");
  const [totalMarks, setTotalMarks] = useState<string>("");
  const [gradingSystem, setGradingSystem] = useState<"us" | "uk" | "india" | "australia" | "custom">("us");
  const [result, setResult] = useState<{
    percentage: number;
    letterGrade: string;
    gpa: number;
    status: string;
  } | null>(null);

  const customGrades = [
    { min: 90, grade: "A+", gpa: 4.0 },
    { min: 80, grade: "A", gpa: 4.0 },
    { min: 75, grade: "B+", gpa: 3.3 },
    { min: 70, grade: "B", gpa: 3.0 },
    { min: 65, grade: "C+", gpa: 2.3 },
    { min: 60, grade: "C", gpa: 2.0 },
    { min: 55, grade: "D+", gpa: 1.3 },
    { min: 50, grade: "D", gpa: 1.0 },
    { min: 0, grade: "F", gpa: 0.0 },
  ];

  const calculate = () => {
    const obtained = parseFloat(marksObtained);
    const total = parseFloat(totalMarks);

    if (isNaN(obtained) || isNaN(total) || total <= 0 || obtained < 0) return;

    const percentage = (obtained / total) * 100;
    const roundedPercentage = Math.round(percentage * 100) / 100;

    let letterGrade = "";
    let gpa = 0;
    let status = "";

    if (gradingSystem === "us") {
      if (roundedPercentage >= 93) { letterGrade = "A"; gpa = 4.0; status = "Excellent"; }
      else if (roundedPercentage >= 90) { letterGrade = "A-"; gpa = 3.7; status = "Excellent"; }
      else if (roundedPercentage >= 87) { letterGrade = "B+"; gpa = 3.3; status = "Good"; }
      else if (roundedPercentage >= 83) { letterGrade = "B"; gpa = 3.0; status = "Good"; }
      else if (roundedPercentage >= 80) { letterGrade = "B-"; gpa = 2.7; status = "Good"; }
      else if (roundedPercentage >= 77) { letterGrade = "C+"; gpa = 2.3; status = "Average"; }
      else if (roundedPercentage >= 73) { letterGrade = "C"; gpa = 2.0; status = "Average"; }
      else if (roundedPercentage >= 70) { letterGrade = "C-"; gpa = 1.7; status = "Average"; }
      else if (roundedPercentage >= 67) { letterGrade = "D+"; gpa = 1.3; status = "Below Average"; }
      else if (roundedPercentage >= 63) { letterGrade = "D"; gpa = 1.0; status = "Below Average"; }
      else if (roundedPercentage >= 60) { letterGrade = "D-"; gpa = 0.7; status = "Below Average"; }
      else { letterGrade = "F"; gpa = 0.0; status = "Failing"; }
    } else if (gradingSystem === "uk") {
      if (roundedPercentage >= 70) { letterGrade = "First (1st)"; gpa = 4.0; status = "Excellent"; }
      else if (roundedPercentage >= 60) { letterGrade = "2:1"; gpa = 3.3; status = "Good"; }
      else if (roundedPercentage >= 50) { letterGrade = "2:2"; gpa = 2.7; status = "Average"; }
      else if (roundedPercentage >= 40) { letterGrade = "Third (3rd)"; gpa = 2.0; status = "Pass"; }
      else { letterGrade = "Fail"; gpa = 0.0; status = "Failing"; }
    } else if (gradingSystem === "india") {
      if (roundedPercentage >= 90) { letterGrade = "O"; gpa = 10.0; status = "Outstanding"; }
      else if (roundedPercentage >= 80) { letterGrade = "A+"; gpa = 9.0; status = "Excellent"; }
      else if (roundedPercentage >= 70) { letterGrade = "A"; gpa = 8.0; status = "Very Good"; }
      else if (roundedPercentage >= 60) { letterGrade = "B+"; gpa = 7.0; status = "Good"; }
      else if (roundedPercentage >= 50) { letterGrade = "B"; gpa = 6.0; status = "Average"; }
      else if (roundedPercentage >= 40) { letterGrade = "C"; gpa = 5.0; status = "Pass"; }
      else { letterGrade = "F"; gpa = 0.0; status = "Failing"; }
    } else if (gradingSystem === "australia") {
      if (roundedPercentage >= 85) { letterGrade = "HD"; gpa = 4.0; status = "High Distinction"; }
      else if (roundedPercentage >= 75) { letterGrade = "D"; gpa = 3.0; status = "Distinction"; }
      else if (roundedPercentage >= 65) { letterGrade = "C"; gpa = 2.0; status = "Credit"; }
      else if (roundedPercentage >= 50) { letterGrade = "P"; gpa = 1.0; status = "Pass"; }
      else { letterGrade = "N"; gpa = 0.0; status = "Fail"; }
    } else {
      for (const grade of customGrades) {
        if (roundedPercentage >= grade.min) {
          letterGrade = grade.grade;
          gpa = grade.gpa;
          break;
        }
      }
      status = gpa >= 3.0 ? "Good" : gpa >= 2.0 ? "Average" : gpa > 0 ? "Needs Improvement" : "Failing";
    }

    setResult({
      percentage: roundedPercentage,
      letterGrade,
      gpa,
      status,
    });
  };

  const reset = () => {
    setMarksObtained("");
    setTotalMarks("");
    setResult(null);
  };

  // Generate grade distribution chart data
  const gradeDistributionData = result ? [
    { grade: "A Range", value: result.percentage >= 90 ? 100 : result.percentage >= 80 ? result.percentage - 80 : 0, fill: "#22c55e" },
    { grade: "B Range", value: result.percentage >= 80 && result.percentage < 90 ? 100 - (result.percentage - 80) : result.percentage >= 70 ? result.percentage - 70 : 0, fill: "#84cc16" },
    { grade: "C Range", value: result.percentage >= 70 && result.percentage < 80 ? 100 - (result.percentage - 70) : result.percentage >= 60 ? result.percentage - 60 : 0, fill: "#eab308" },
    { grade: "D Range", value: result.percentage >= 60 && result.percentage < 70 ? 100 - (result.percentage - 60) : result.percentage >= 50 ? result.percentage - 50 : 0, fill: "#f97316" },
    { grade: "F Range", value: result.percentage < 50 ? result.percentage : 0, fill: "#ef4444" },
  ].filter(d => d.value > 0) : [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="marksObtained">Marks Obtained</Label>
                <Input
                  id="marksObtained"
                  type="number"
                  placeholder="e.g., 85"
                  value={marksObtained}
                  onChange={(e) => setMarksObtained(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalMarks">Total/Maximum Marks</Label>
                <Input
                  id="totalMarks"
                  type="number"
                  placeholder="e.g., 100"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gradingSystem">Grading System</Label>
                <Select value={gradingSystem} onValueChange={(v) => setGradingSystem(v as "us" | "uk" | "india" | "australia" | "custom")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">US (A-F Scale)</SelectItem>
                    <SelectItem value="uk">UK (Degree Classification)</SelectItem>
                    <SelectItem value="india">India (10-Point Scale)</SelectItem>
                    <SelectItem value="australia">Australia (HD-P-N)</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Grade Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Percentage</p>
                    <p className="text-4xl font-bold text-primary">{result.percentage}%</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Letter Grade</p>
                      <p className="text-2xl font-bold">{result.letterGrade}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">GPA</p>
                      <p className="text-2xl font-bold">{result.gpa}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-xl font-bold">{result.status}</p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground">
                    <p>
                      <strong>Calculation:</strong> ({marksObtained} / {totalMarks}) × 100 = {result.percentage}%
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  <p>Enter marks and click Calculate to see results</p>
                </div>
              )}
            </div>
          </div>

          {gradeDistributionData.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Your Grade Position</h3>
              <div className="h-[200px]">
                <ChartContainer
                  config={{
                    grade: { label: "Grade Range", color: "hsl(var(--chart-1))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gradeDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="grade" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value">
                        {gradeDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>US Grading Scale (A-F)</CardTitle>
          <CardDescription>Standard American grading system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Letter Grade</TableHead>
                <TableHead>Percentage Range</TableHead>
                <TableHead>GPA (4.0 Scale)</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-green-600">A</TableCell>
                <TableCell className="font-mono">93-100%</TableCell>
                <TableCell className="font-mono">4.0</TableCell>
                <TableCell className="text-xs">Excellent</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-green-600">A-</TableCell>
                <TableCell className="font-mono">90-92%</TableCell>
                <TableCell className="font-mono">3.7</TableCell>
                <TableCell className="text-xs">Excellent</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-blue-600">B+</TableCell>
                <TableCell className="font-mono">87-89%</TableCell>
                <TableCell className="font-mono">3.3</TableCell>
                <TableCell className="text-xs">Good</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-blue-600">B</TableCell>
                <TableCell className="font-mono">83-86%</TableCell>
                <TableCell className="font-mono">3.0</TableCell>
                <TableCell className="text-xs">Good</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-blue-600">B-</TableCell>
                <TableCell className="font-mono">80-82%</TableCell>
                <TableCell className="font-mono">2.7</TableCell>
                <TableCell className="text-xs">Good</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-yellow-600">C+</TableCell>
                <TableCell className="font-mono">77-79%</TableCell>
                <TableCell className="font-mono">2.3</TableCell>
                <TableCell className="text-xs">Average</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-yellow-600">C</TableCell>
                <TableCell className="font-mono">73-76%</TableCell>
                <TableCell className="font-mono">2.0</TableCell>
                <TableCell className="text-xs">Average</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-yellow-600">C-</TableCell>
                <TableCell className="font-mono">70-72%</TableCell>
                <TableCell className="font-mono">1.7</TableCell>
                <TableCell className="text-xs">Average</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-orange-600">D+</TableCell>
                <TableCell className="font-mono">67-69%</TableCell>
                <TableCell className="font-mono">1.3</TableCell>
                <TableCell className="text-xs">Below Average</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-orange-600">D</TableCell>
                <TableCell className="font-mono">63-66%</TableCell>
                <TableCell className="font-mono">1.0</TableCell>
                <TableCell className="text-xs">Below Average</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-orange-600">D-</TableCell>
                <TableCell className="font-mono">60-62%</TableCell>
                <TableCell className="font-mono">0.7</TableCell>
                <TableCell className="text-xs">Below Average</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-red-600">F</TableCell>
                <TableCell className="font-mono">0-59%</TableCell>
                <TableCell className="font-mono">0.0</TableCell>
                <TableCell className="text-xs">Failing</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Note: Some institutions use different cutoffs. Always check your school's specific grading policy.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>International Grading Systems Comparison</CardTitle>
          <CardDescription>How different countries grade</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead>Top Grade</TableHead>
                <TableHead>Pass Mark</TableHead>
                <TableHead>Scale Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">United States</TableCell>
                <TableCell className="font-mono">A (93-100%)</TableCell>
                <TableCell className="font-mono">60% (D-)</TableCell>
                <TableCell className="text-xs">Letter (A-F)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">United Kingdom</TableCell>
                <TableCell className="font-mono">First (70%+)</TableCell>
                <TableCell className="font-mono">40% (Third)</TableCell>
                <TableCell className="text-xs">Classification</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">India</TableCell>
                <TableCell className="font-mono">O (90%+)</TableCell>
                <TableCell className="font-mono">40% (C)</TableCell>
                <TableCell className="text-xs">10-point GPA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Australia</TableCell>
                <TableCell className="font-mono">HD (85%+)</TableCell>
                <TableCell className="font-mono">50% (P)</TableCell>
                <TableCell className="text-xs">HD-D-C-P-N</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Germany</TableCell>
                <TableCell className="font-mono">1.0 (sehr gut)</TableCell>
                <TableCell className="font-mono">4.0 (ausreichend)</TableCell>
                <TableCell className="text-xs">1-6 (inverted)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">France</TableCell>
                <TableCell className="font-mono">18-20 (très bien)</TableCell>
                <TableCell className="font-mono">10/20</TableCell>
                <TableCell className="text-xs">0-20 scale</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Japan</TableCell>
                <TableCell className="font-mono">S (90%+)</TableCell>
                <TableCell className="font-mono">60% (D)</TableCell>
                <TableCell className="text-xs">S-A-B-C-D</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Germany uses an inverted scale where 1.0 is best and 6.0 is failing. France's 20/20 is theoretically perfect but rarely awarded – 16/20 is considered excellent.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Your Grade Percentage</CardTitle>
          <CardDescription>Step-by-step guide</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <p className="font-medium text-sm">Identify your marks obtained</p>
                <p className="text-xs text-muted-foreground">This is the score you received on the exam or assignment. For multiple assignments, add them all up first.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <p className="font-medium text-sm">Find the total possible marks</p>
                <p className="text-xs text-muted-foreground">This is the maximum score achievable. If you have multiple assignments, add up all the maximum scores.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <p className="font-medium text-sm">Divide and multiply by 100</p>
                <p className="text-xs text-muted-foreground">Percentage = (Marks Obtained ÷ Total Marks) × 100. For 85/100: (85 ÷ 100) × 100 = 85%.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">4</div>
              <div>
                <p className="font-medium text-sm">Look up your letter grade</p>
                <p className="text-xs text-muted-foreground">Use the grading scale for your institution. 85% is a B in the US, a First in the UK, and an A in India.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate my overall grade from multiple assignments?</h4>
            <p className="text-xs text-muted-foreground">
              Add up all marks obtained, then divide by total possible marks. If you scored 85/100, 45/50, and 18/25: total obtained = 148, total possible = 175. Percentage = (148/175) × 100 = 84.6%. Don't average the percentages – that gives wrong results if assignments have different weights.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between weighted and unweighted GPA?</h4>
            <p className="text-xs text-muted-foreground">
              Unweighted GPA treats all classes equally – an A in PE counts the same as an A in AP Physics. Weighted GPA gives extra points for honors/AP/IB classes. An A in AP might be 5.0 instead of 4.0. Weighted GPAs can exceed 4.0; unweighted cannot.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is 70% a good grade?</h4>
            <p className="text-xs text-muted-foreground">
              Depends on the system. In the US, 70% is a C- (average). In the UK, 70% is a First (excellent – top classification). In India, 70% is an A (very good). Context matters. Graduate programs often require 3.0+ GPA (roughly 83%+) for admission.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I convert my grade to a different country's system?</h4>
            <p className="text-xs text-muted-foreground">
              Use a grade conversion tool or WES (World Education Services) guidelines. Rough guide: US A (90-100%) ≈ UK First (70%+) ≈ India O/A (80%+) ≈ Australia HD (85%+). But conversion isn't exact – different systems test different skills.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What GPA do I need for medical/law school?</h4>
            <p className="text-xs text-muted-foreground">
              Competitive US medical schools expect 3.7+ GPA (roughly 90%+). Top law schools want 3.8+. But GPA isn't everything – MCAT/LSAT scores, research, and extracurriculars matter too. State schools often have lower thresholds for in-state applicants.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
