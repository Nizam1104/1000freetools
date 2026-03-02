"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
}

export default function GpaCalculatorPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Course 1", grade: "", credits: "" },
    { id: 2, name: "Course 2", grade: "", credits: "" },
    { id: 3, name: "Course 3", grade: "", credits: "" },
  ]);
  const [gradingScale, setGradingScale] = useState<"4.0" | "5.0" | "10.0">("4.0");
  const [result, setResult] = useState<{
    gpa: number;
    totalCredits: number;
    totalPoints: number;
    letterGrade: string;
  } | null>(null);

  const gradePoints: Record<string, number> = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "D-": 0.7,
    "F": 0.0,
  };

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: "", grade: "", credits: "" }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    for (const course of courses) {
      const credits = parseFloat(course.credits);
      const gradePoint = gradePoints[course.grade] || 0;

      if (credits > 0 && course.grade) {
        totalPoints += gradePoint * credits;
        totalCredits += credits;
      }
    }

    if (totalCredits === 0) return;

    const gpa = totalPoints / totalCredits;
    const roundedGpa = Math.round(gpa * 100) / 100;

    // Determine letter grade based on GPA
    let letterGrade = "";
    if (roundedGpa >= 3.7) letterGrade = "A";
    else if (roundedGpa >= 3.3) letterGrade = "B+";
    else if (roundedGpa >= 3.0) letterGrade = "B";
    else if (roundedGpa >= 2.7) letterGrade = "B-";
    else if (roundedGpa >= 2.3) letterGrade = "C+";
    else if (roundedGpa >= 2.0) letterGrade = "C";
    else if (roundedGpa >= 1.7) letterGrade = "C-";
    else if (roundedGpa >= 1.0) letterGrade = "D";
    else letterGrade = "F";

    setResult({
      gpa: roundedGpa,
      totalCredits,
      totalPoints: Math.round(totalPoints * 100) / 100,
      letterGrade,
    });
  };

  const reset = () => {
    setCourses([
      { id: 1, name: "Course 1", grade: "", credits: "" },
      { id: 2, name: "Course 2", grade: "", credits: "" },
      { id: 3, name: "Course 3", grade: "", credits: "" },
    ]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            GPA Calculator – Calculate Your Grade Point Average Instantly
          </h1>
          <p className="text-muted-foreground">
            Calculate your current GPA quickly and accurately with our free GPA Calculator. Enter
            your grades and credit hours for each course to get your semester or cumulative GPA on
            a 4.0 scale. Perfect for students planning for scholarships and graduate school.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gradingScale">Grading Scale</Label>
                <Select value={gradingScale} onValueChange={(v) => setGradingScale(v as "4.0" | "5.0" | "10.0")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4.0">4.0 Scale (US Standard)</SelectItem>
                    <SelectItem value="5.0">5.0 Scale (Weighted)</SelectItem>
                    <SelectItem value="10.0">10.0 Scale (International)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Courses</Label>
                {courses.map((course) => (
                  <div key={course.id} className="space-y-2 p-3 border rounded-md">
                    <div className="flex gap-2 items-center">
                      <Input
                        placeholder="Course name"
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                        className="flex-1"
                      />
                      {courses.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCourse(course.id)}
                          className="text-destructive"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={course.grade}
                        onValueChange={(v) => updateCourse(course.id, "grade", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+ (4.0)</SelectItem>
                          <SelectItem value="A">A (4.0)</SelectItem>
                          <SelectItem value="A-">A- (3.7)</SelectItem>
                          <SelectItem value="B+">B+ (3.3)</SelectItem>
                          <SelectItem value="B">B (3.0)</SelectItem>
                          <SelectItem value="B-">B- (2.7)</SelectItem>
                          <SelectItem value="C+">C+ (2.3)</SelectItem>
                          <SelectItem value="C">C (2.0)</SelectItem>
                          <SelectItem value="C-">C- (1.7)</SelectItem>
                          <SelectItem value="D+">D+ (1.3)</SelectItem>
                          <SelectItem value="D">D (1.0)</SelectItem>
                          <SelectItem value="D-">D- (0.7)</SelectItem>
                          <SelectItem value="F">F (0.0)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="Credits"
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addCourse} className="w-full">
                  + Add Course
                </Button>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate GPA
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">GPA Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Your GPA</p>
                    <p className="text-4xl font-bold text-primary">{result.gpa}</p>
                    <p className="text-lg mt-1">Letter Grade: {result.letterGrade}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Credits</p>
                      <p className="text-2xl font-bold">{result.totalCredits}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Points</p>
                      <p className="text-2xl font-bold">{result.totalPoints}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">GPA Scale Reference</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>A (Excellent)</span>
                        <span>3.7 - 4.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>B (Good)</span>
                        <span>2.7 - 3.6</span>
                      </div>
                      <div className="flex justify-between">
                        <span>C (Average)</span>
                        <span>1.7 - 2.6</span>
                      </div>
                      <div className="flex justify-between">
                        <span>D (Below Average)</span>
                        <span>1.0 - 1.6</span>
                      </div>
                      <div className="flex justify-between">
                        <span>F (Failing)</span>
                        <span>0.0 - 0.9</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your courses and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">How GPA Is Calculated</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Grade Points = Grade Point Value × Credit Hours</div>
            <div>Total Points = Sum of all Grade Points</div>
            <div>GPA = Total Points ÷ Total Credit Hours</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Example:</strong> A (4.0) in a 3-credit course = 12 points. 
            B (3.0) in a 4-credit course = 12 points. 
            GPA = (12 + 12) / (3 + 4) = 24/7 = 3.43
          </p>
        </div>
      </div>
    </div>
  );
}
