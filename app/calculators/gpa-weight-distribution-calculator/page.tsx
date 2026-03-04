"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
}

export default function GPAWeightDistributionCalculatorPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Course 1", grade: "A", credits: 3 }
  ]);
  const [result, setResult] = useState<{
    gpa: number;
    totalCredits: number;
    courseContributions: { name: string; contribution: number; percentage: number }[];
  } | null>(null);

  const gradePoints: { [key: string]: number } = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "D-": 0.7,
    "F": 0.0
  };

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: `Course ${courses.length + 1}`, grade: "A", credits: 3 }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string | number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    const courseContributions: { name: string; contribution: number; percentage: number }[] = [];

    courses.forEach(course => {
      const points = gradePoints[course.grade] || 0;
      const weightedPoints = points * course.credits;
      totalPoints += weightedPoints;
      totalCredits += course.credits;

      courseContributions.push({
        name: course.name,
        contribution: points,
        percentage: (course.credits / totalCredits) * 100
      });
    });

    // Recalculate percentages with final total
    let runningCredits = 0;
    courses.forEach((course, index) => {
      runningCredits += course.credits;
      courseContributions[index].percentage = (course.credits / totalCredits) * 100;
    });

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

    setResult({
      gpa: Math.round(gpa * 100) / 100,
      totalCredits,
      courseContributions
    });
  };

  const reset = () => {
    setCourses([{ id: 1, name: "Course 1", grade: "A", credits: 3 }]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">GPA Weight Distribution Calculator – See How Each Course Impacts Your GPA</h1>
          <p className="text-muted-foreground">
            Understand how each course affects your GPA with our GPA Weight Distribution Calculator. Enter course grades and credit hours to see the weighted contribution of each subject to your overall GPA — great for strategic academic planning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              {courses.map((course, index) => (
                <div key={course.id} className="p-3 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Course {index + 1}</Label>
                    {courses.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeCourse(course.id)}>×</Button>
                    )}
                  </div>
                  <Input
                    placeholder="Course name"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Select value={course.grade} onValueChange={(value) => updateCourse(course.id, "grade", value)}>
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
                      onChange={(e) => updateCourse(course.id, "credits", parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              ))}

              <div className="flex gap-2 pt-4">
                <Button onClick={addCourse} variant="outline" className="flex-1">
                  + Add Course
                </Button>
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
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Cumulative GPA</p>
                    <p className="text-4xl font-bold text-primary">{result.gpa}</p>
                    <p className="text-xs text-muted-foreground mt-1">Total Credits: {result.totalCredits}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Course Contributions:</p>
                    {result.courseContributions.map((course, i) => (
                      <div key={i} className="p-2 bg-muted rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{course.name}</span>
                          <span className="text-sm text-muted-foreground">{course.percentage.toFixed(1)}% weight</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${course.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Grade: {course.contribution.toFixed(1)} points</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Add courses and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
