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

        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How GPA Is Calculated</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
                <div>Grade Points = Grade Point Value × Credit Hours</div>
                <div>Total Points = Sum of all Grade Points</div>
                <div>GPA = Total Points ÷ Total Credit Hours</div>
              </div>
              <p className="text-muted-foreground text-sm">
                <strong>Example:</strong> A (4.0) in a 3-credit course = 12 points.
                B (3.0) in a 4-credit course = 12 points.
                GPA = (12 + 12) / (3 + 4) = 24/7 = 3.43
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Understanding GPA and Grade Scales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-2">What Is GPA</h4>
                <p className="text-sm text-muted-foreground">
                  GPA (Grade Point Average) is a number that summarizes your academic performance. Each letter grade has a point value (A=4.0, B=3.0, etc.). Multiply each grade's points by the course credits, add them up, and divide by total credits. A 4.0 GPA means all A's. A 2.0 GPA means all C's.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Weighted vs Unweighted GPA</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Two common GPA types:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-md">
                    <p className="font-semibold text-sm mb-2">Unweighted GPA</p>
                    <p className="text-xs text-muted-foreground">
                      All courses use the same 4.0 scale. An A in regular math equals an A in AP calculus. Maximum is 4.0. Most colleges look at this for fair comparison.
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-md">
                    <p className="font-semibold text-sm mb-2">Weighted GPA</p>
                    <p className="text-xs text-muted-foreground">
                      Harder courses get extra points. An A in AP might be 5.0 instead of 4.0. Maximum can exceed 4.0 (often 5.0). Rewards students who take challenging courses.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Why GPA Matters</h4>
                <p className="text-sm text-muted-foreground">
                  GPA affects college admissions, scholarship eligibility, and job prospects. Many scholarships require 3.0 or higher. Graduate programs often want 3.5+. Some employers screen resumes by GPA. But GPA isn't everything - experience and skills matter too.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GPA Scale Reference Table</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Letter Grade</TableHead>
                    <TableHead>Grade Points</TableHead>
                    <TableHead>Percentage Range</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>A+</TableCell>
                    <TableCell className="font-mono">4.0</TableCell>
                    <TableCell className="font-mono">97-100%</TableCell>
                    <TableCell>Excellent</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>A</TableCell>
                    <TableCell className="font-mono">4.0</TableCell>
                    <TableCell className="font-mono">93-96%</TableCell>
                    <TableCell>Excellent</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>A-</TableCell>
                    <TableCell className="font-mono">3.7</TableCell>
                    <TableCell className="font-mono">90-92%</TableCell>
                    <TableCell>Very Good</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>B+</TableCell>
                    <TableCell className="font-mono">3.3</TableCell>
                    <TableCell className="font-mono">87-89%</TableCell>
                    <TableCell>Good</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>B</TableCell>
                    <TableCell className="font-mono">3.0</TableCell>
                    <TableCell className="font-mono">83-86%</TableCell>
                    <TableCell>Good</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>B-</TableCell>
                    <TableCell className="font-mono">2.7</TableCell>
                    <TableCell className="font-mono">80-82%</TableCell>
                    <TableCell>Above Average</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>C+</TableCell>
                    <TableCell className="font-mono">2.3</TableCell>
                    <TableCell className="font-mono">77-79%</TableCell>
                    <TableCell>Average</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>C</TableCell>
                    <TableCell className="font-mono">2.0</TableCell>
                    <TableCell className="font-mono">73-76%</TableCell>
                    <TableCell>Average</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>D</TableCell>
                    <TableCell className="font-mono">1.0</TableCell>
                    <TableCell className="font-mono">60-69%</TableCell>
                    <TableCell>Passing</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>F</TableCell>
                    <TableCell className="font-mono">0.0</TableCell>
                    <TableCell className="font-mono">Below 60%</TableCell>
                    <TableCell>Failing</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground mt-3">
                Grade scales vary by school. Some use different cutoffs or include pluses/minuses. Check your school's specific grading policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Improving Your GPA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-semibold text-sm mb-3">Focus on High-Credit Courses</h4>
                <p className="text-xs text-muted-foreground">
                  A 4-credit course affects your GPA twice as much as a 2-credit course. Prioritize studying for high-credit classes. An A in a 4-credit course adds 16 points; an A in a 1-credit course adds only 4 points.
                </p>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-semibold text-sm mb-3">Understand Grade Recovery</h4>
                <p className="text-xs text-muted-foreground">
                  Raising a low GPA takes time. If you have 60 credits at 2.5 GPA and earn 4.0 for the next 15 credits, your new GPA is only 2.8. It takes 60 credits of straight A's to raise a 2.5 to 3.25. Stay consistent.
                </p>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-semibold text-sm mb-3">Retake Failed Courses</h4>
                <p className="text-xs text-muted-foreground">
                  Many schools let you retake failed courses and replace the grade. An F (0 points) becoming a B (3 points) in a 3-credit course adds 9 points to your total. This is the fastest way to recover from a bad semester.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-2">What is a good GPA?</h4>
                <p className="text-sm text-muted-foreground">
                  A 3.0 (B average) is considered good. A 3.5+ makes you competitive for most colleges and scholarships. A 3.8+ is excellent and opens doors to top programs. But "good" depends on your goals - trade schools may care less about GPA than Ivy League colleges.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">How do I calculate my semester GPA?</h4>
                <p className="text-sm text-muted-foreground">
                  Add up grade points for just that semester's courses, then divide by semester credits. If you earned 30 points in 10 credits, your semester GPA is 3.0. This is separate from your cumulative GPA, which includes all semesters.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Does GPA matter after graduation?</h4>
                <p className="text-sm text-muted-foreground">
                  Less and less over time. Your first job might ask for GPA. After 2-3 years of work experience, employers care more about your track record. Graduate schools still care about undergraduate GPA. But eventually, what you've done matters more than what grades you got.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Can I raise my GPA in one semester?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, but how much depends on how many credits you've already completed. With 30 credits at 2.5 GPA, earning 4.0 in 15 new credits raises you to 3.0. With 90 credits at 2.5, the same 15 credits of A's only raises you to 2.7. Earlier is easier.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">What if my school uses a different scale?</h4>
                <p className="text-sm text-muted-foreground">
                  Some schools use 5.0, 10.0, or percentage scales. The calculation method is the same - multiply grade points by credits, divide by total credits. Just use your school's grade point values. Many international schools use 10-point scales where 8.0+ is excellent.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <a href="/calculators/final-grade-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Final Grade Calculator</p>
                  <p className="text-xs text-muted-foreground">Calculate what you need on the final exam</p>
                </a>
                <a href="/calculators/grade-percentage-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Grade Percentage Calculator</p>
                  <p className="text-xs text-muted-foreground">Convert scores to letter grades</p>
                </a>
                <a href="/calculators/weighted-average-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Weighted Average Calculator</p>
                  <p className="text-xs text-muted-foreground">Calculate weighted averages</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
