"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      // Custom grading based on the table defined above
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Grade Percentage Calculator – Convert Marks to Percentage & Letter Grade
          </h1>
          <p className="text-muted-foreground">
            Instantly convert your exam or assignment marks to a percentage grade with our Grade
            Percentage Calculator. Enter your score and the maximum marks to get your grade
            percentage, letter grade, and GPA equivalent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
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
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Grade Results</h3>
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
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter marks and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Grading Scale Reference</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">US Scale</h4>
              <div className="text-sm space-y-1">
                <div>A: 93-100%</div>
                <div>B: 83-86%</div>
                <div>C: 73-76%</div>
                <div>D: 63-66%</div>
                <div>F: 0-62%</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">UK Scale</h4>
              <div className="text-sm space-y-1">
                <div>First (1st): 70-100%</div>
                <div>2:1: 60-69%</div>
                <div>2:2: 50-59%</div>
                <div>Third: 40-49%</div>
                <div>Fail: 0-39%</div>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mt-4">
            <strong>Note:</strong> Grading scales may vary by institution. Always check your
            school's specific grading policy.
          </p>
        </div>
      </div>
    </div>
  );
}
