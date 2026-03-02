"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Grading Scale Reference</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Standard (US)</h4>
              <div className="text-sm space-y-1">
                <div>A: 93-100% (4.0)</div>
                <div>B: 83-86% (3.0)</div>
                <div>C: 73-76% (2.0)</div>
                <div>D: 63-66% (1.0)</div>
                <div>F: 0-62% (0.0)</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">CBSE (India)</h4>
              <div className="text-sm space-y-1">
                <div>A1: 91-100% (10.0)</div>
                <div>A2: 81-90% (9.0)</div>
                <div>B1: 71-80% (8.0)</div>
                <div>B2: 61-70% (7.0)</div>
                <div>C1: 51-60% (6.0)</div>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mt-4">
            <strong>Note:</strong> Grading scales may vary by institution. Always verify with your
            school's specific grading policy.
          </p>
        </div>
      </div>
    </div>
  );
}
