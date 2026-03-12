"use client";

import { useState } from "react";
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

const gradePoints: { [key: string]: number } = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
};

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Course 1', grade: 'A', credits: 3 }
  ]);
  const [gpaType, setGpaType] = useState<"unweighted" | "weighted">("unweighted");

  const addCourse = () => {
    setCourses([...courses, {
      id: Date.now(),
      name: `Course ${courses.length + 1}`,
      grade: 'A',
      credits: 3
    }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string | number) => {
    setCourses(courses.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const gradePoint = gradePoints[course.grade] || 0;
      const weightedPoint = gpaType === "weighted" && ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-'].includes(course.grade)
        ? Math.min(gradePoint + 1, 5.0)
        : gradePoint;

      totalPoints += weightedPoint * course.credits;
      totalCredits += course.credits;
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  const gpa = calculateGPA();
  const gpaRounded = Math.round(gpa * 100) / 100;

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return 'text-green-600';
    if (gpa >= 3.0) return 'text-blue-600';
    if (gpa >= 2.5) return 'text-yellow-600';
    if (gpa >= 2.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const getGPAMessage = (gpa: number) => {
    if (gpa >= 3.8) return 'Excellent! Dean\'s List territory';
    if (gpa >= 3.5) return 'Great job! Very competitive GPA';
    if (gpa >= 3.0) return 'Good work! Above average';
    if (gpa >= 2.5) return 'Decent, but room for improvement';
    if (gpa >= 2.0) return 'Passing, but consider extra help';
    return 'Academic probation risk - seek support';
  };

  const reset = () => {
    setCourses([{ id: 1, name: 'Course 1', grade: 'A', credits: 3 }]);
    setGpaType("unweighted");
  };

  const loadExample = (type: 'honors' | 'mixed' | 'struggling' | 'perfect') => {
    if (type === 'honors') {
      setCourses([
        { id: 1, name: 'AP Calculus', grade: 'A', credits: 4 },
        { id: 2, name: 'AP Physics', grade: 'A-', credits: 4 },
        { id: 3, name: 'English', grade: 'A', credits: 3 },
        { id: 4, name: 'History', grade: 'B+', credits: 3 },
      ]);
    } else if (type === 'mixed') {
      setCourses([
        { id: 1, name: 'Math', grade: 'B', credits: 3 },
        { id: 2, name: 'Science', grade: 'B+', credits: 3 },
        { id: 3, name: 'English', grade: 'A-', credits: 3 },
        { id: 4, name: 'Art', grade: 'A', credits: 2 },
        { id: 5, name: 'PE', grade: 'A', credits: 1 },
      ]);
    } else if (type === 'struggling') {
      setCourses([
        { id: 1, name: 'Math', grade: 'C', credits: 3 },
        { id: 2, name: 'Science', grade: 'C+', credits: 3 },
        { id: 3, name: 'English', grade: 'B-', credits: 3 },
        { id: 4, name: 'History', grade: 'C', credits: 3 },
      ]);
    } else {
      setCourses([
        { id: 1, name: 'AP Calculus', grade: 'A+', credits: 4 },
        { id: 2, name: 'AP Physics', grade: 'A+', credits: 4 },
        { id: 3, name: 'AP Chemistry', grade: 'A+', credits: 4 },
        { id: 4, name: 'English', grade: 'A+', credits: 3 },
      ]);
    }
    setGpaType("unweighted");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Grade/GPA Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your Grade Point Average with our free online GPA calculator. Supports weighted and unweighted GPA, multiple courses, and credit hours for accurate academic planning.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <Label>GPA Type:</Label>
          <Select value={gpaType} onValueChange={(v) => setGpaType(v as typeof gpaType)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unweighted">Unweighted (4.0 scale)</SelectItem>
              <SelectItem value="weighted">Weighted (5.0 scale)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample('honors')}>Honors Student</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample('mixed')}>Mixed Grades</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample('struggling')}>Struggling</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample('perfect')}>Perfect GPA</Button>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-2 font-semibold text-sm text-muted-foreground">
            <div className="col-span-4">Course Name</div>
            <div className="col-span-3">Grade</div>
            <div className="col-span-3">Credits</div>
            <div className="col-span-2"></div>
          </div>

          {courses.map((course) => (
            <div key={course.id} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-4">
                <Input
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                  placeholder="Course name"
                />
              </div>
              <div className="col-span-3">
                <Select
                  value={course.grade}
                  onValueChange={(v) => updateCourse(course.id, 'grade', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
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
              </div>
              <div className="col-span-3">
                <Input
                  type="number"
                  min="0"
                  max="10"
                  value={course.credits}
                  onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="col-span-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length === 1}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button onClick={addCourse}>+ Add Course</Button>
        </div>

        <div className="p-6 bg-muted rounded-lg">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground mb-2">Your {gpaType} GPA</p>
            <p className={`text-6xl font-bold ${getGPAColor(gpaRounded)}`}>{gpaRounded.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-2">{getGPAMessage(gpaRounded)}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-background rounded">
              <p className="text-xs text-muted-foreground">Total Courses</p>
              <p className="text-xl font-bold">{courses.length}</p>
            </div>
            <div className="p-3 bg-background rounded">
              <p className="text-xs text-muted-foreground">Total Credits</p>
              <p className="text-xl font-bold">{courses.reduce((sum, c) => sum + c.credits, 0)}</p>
            </div>
            <div className="p-3 bg-background rounded">
              <p className="text-xs text-muted-foreground">Total Points</p>
              <p className="text-xl font-bold">
                {Math.round(courses.reduce((sum, c) =>
                  sum + (gradePoints[c.grade] || 0) * c.credits, 0) * 100) / 100}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-semibold text-sm mb-3">Grade Scale Reference</h4>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2 text-xs">
            {Object.entries(gradePoints).map(([grade, points]) => (
              <div key={grade} className="p-2 bg-muted rounded text-center">
                <p className="font-semibold">{grade}</p>
                <p className="text-muted-foreground">{points}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding GPA</h2>
        <p className="text-muted-foreground">
          GPA (Grade Point Average) is a standardized way to measure academic performance. Each letter grade corresponds to a number of points – A = 4.0, B = 3.0, C = 2.0, and so on. Your GPA is the weighted average of these points, where courses with more credits count more heavily.
        </p>
        <p className="text-muted-foreground">
          Unweighted GPA uses a standard 4.0 scale regardless of course difficulty. Weighted GPA gives extra points for honors, AP, or IB courses – an A in an AP class might be worth 5.0 instead of 4.0. This rewards students for taking challenging courses.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Calculate GPA</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Convert each grade to points</p>
                <p className="text-muted-foreground">
                  A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0. Plus/minus grades adjust by ±0.3.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Multiply by credit hours</p>
                <p className="text-muted-foreground">
                  A 3-credit A gives 4.0 × 3 = 12 quality points. A 4-credit B gives 3.0 × 4 = 12 points.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Add up all quality points</p>
                <p className="text-muted-foreground">
                  Sum the points from all courses.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Divide by total credits</p>
                <p className="text-muted-foreground">
                  GPA = Total Quality Points ÷ Total Credit Hours
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Simple GPA Calculation</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Course 1 (3 credits): A = 4.0 → 4.0 × 3 = 12 points</div>
              <div>Course 2 (3 credits): B = 3.0 → 3.0 × 3 = 9 points</div>
              <div>Course 3 (4 credits): A- = 3.7 → 3.7 × 4 = 14.8 points</div>
              <div>Total: 35.8 points / 10 credits = 3.58 GPA</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Weighted vs Unweighted</h4>
            <div className="text-sm space-y-2">
              <p>Student takes 4 courses (all 3 credits): AP Calc (A), Regular English (B), AP Physics (A-), Art (A)</p>
              <div className="font-mono">Unweighted: (4.0 + 3.0 + 3.7 + 4.0) / 4 = 3.675</div>
              <div className="font-mono">Weighted: (5.0 + 3.0 + 4.7 + 4.0) / 4 = 4.175</div>
              <p className="text-muted-foreground mt-2">AP courses add +1.0 to the grade points in weighted GPA.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Impact of Credit Hours</h4>
            <div className="text-sm space-y-2">
              <p>Scenario A: A in 1-credit PE, C in 4-credit Math</p>
              <div className="font-mono">GPA = (4.0×1 + 2.0×4) / 5 = 12/5 = 2.4</div>
              <p className="mt-2">Scenario B: C in 1-credit PE, A in 4-credit Math</p>
              <div className="font-mono">GPA = (2.0×1 + 4.0×4) / 5 = 18/5 = 3.6</div>
              <p className="text-muted-foreground mt-2">Same grades, reversed credits = very different GPA!</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Semester GPA Calculation</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Fall Semester: 15 credits, 48 quality points → 3.20 GPA</div>
              <div>Spring Semester: 16 credits, 56 quality points → 3.50 GPA</div>
              <div>Cumulative: (48 + 56) / (15 + 16) = 104 / 31 = 3.35 GPA</div>
              <div className="text-muted-foreground mt-2">Not (3.20 + 3.50) / 2! Weight by credits.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            The 4.0 GPA scale was introduced at Harvard in the late 1800s and became standard across US colleges by the 1930s. Before that, schools used various systems including percentages, class rankings, and descriptive evaluations like "excellent" or "satisfactory."
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a good GPA?</h4>
            <p className="text-sm text-muted-foreground">
              It depends on your goals. For most colleges, 3.0+ is solid. Competitive universities often expect 3.7+. For graduate school, 3.5+ is typically preferred. However, GPA is just one factor – extracurriculars, essays, and test scores matter too.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do plus/minus grades affect GPA?</h4>
            <p className="text-sm text-muted-foreground">
              Plus adds about 0.3, minus subtracts about 0.3. A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, etc. Some schools don't use plus/minus, and some use different values (like A- = 3.67). Check your school's specific scale.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does an F hurt my GPA a lot?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, because F = 0.0 points. An F in a 4-credit course contributes zero to your quality points but still counts as 4 attempted credits. Retaking the course (if allowed) can replace or average with the F.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I raise my GPA?</h4>
            <p className="text-sm text-muted-foreground">
              Focus on high-credit courses first – they have more impact. Retake low-grade courses if possible. Consistent improvement matters: going from C's to B's to A's shows an upward trend that colleges notice.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between semester and cumulative GPA?</h4>
            <p className="text-sm text-muted-foreground">
              Semester GPA covers one term only. Cumulative GPA includes all coursework. Both matter – cumulative for overall standing, semester for recent performance and trends.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Do all schools use the 4.0 scale?</h4>
            <p className="text-sm text-muted-foreground">
              Most US schools do, but variations exist. Some use 5.0 or higher for weighted GPA. International schools may use different scales entirely (like 1-10 or 1-20). Always check the specific scale used.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
