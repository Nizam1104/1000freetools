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
        ? gradePoint + 1 
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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Grade/GPA Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your Grade Point Average with our free online GPA calculator. Supports weighted and unweighted GPA, multiple courses, and credit hours for accurate academic planning.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding GPA</h2>
        <p className="text-muted-foreground">
          Grade Point Average (GPA) is a standardized way to measure academic achievement. It converts letter grades to numerical values and calculates a weighted average based on credit hours.
        </p>
        <p className="text-muted-foreground">
          Unweighted GPA uses a standard 4.0 scale for all courses. Weighted GPA gives extra points for honors, AP, or IB courses, typically on a 5.0 scale.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">GPA Scale</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Unweighted Scale</h3>
            <ul className="space-y-1 text-sm">
              <li>A = 4.0 (Excellent)</li>
              <li>B = 3.0 (Good)</li>
              <li>C = 2.0 (Average)</li>
              <li>D = 1.0 (Below Average)</li>
              <li>F = 0.0 (Failing)</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Weighted Scale (AP/Honors)</h3>
            <ul className="space-y-1 text-sm">
              <li>A = 5.0 (instead of 4.0)</li>
              <li>B = 4.0 (instead of 3.0)</li>
              <li>C = 3.0 (instead of 2.0)</li>
              <li>D = 2.0 (instead of 1.0)</li>
              <li>F = 0.0 (same)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">GPA Guidelines</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">College Admissions</h3>
            <ul className="space-y-1 text-sm">
              <li>• Ivy League: Typically 3.8+ unweighted</li>
              <li>• Top 50 universities: 3.5+ recommended</li>
              <li>• State universities: 3.0+ often sufficient</li>
              <li>• Community college: 2.0+ for admission</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Academic Standing</h3>
            <ul className="space-y-1 text-sm">
              <li>• Dean's List: Usually 3.5+ or 3.7+</li>
              <li>• Good Standing: 2.0+ minimum</li>
              <li>• Academic Probation: Below 2.0</li>
              <li>• Graduation Requirements: Varies by program</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How is GPA calculated?</h3>
            <p className="text-sm text-muted-foreground">
              Multiply each grade's point value by its credit hours, sum all points, then divide by total credits. For example: A (4.0) in a 3-credit course = 12 points.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's a good GPA?</h3>
            <p className="text-sm text-muted-foreground">
              It depends on your goals. For most colleges, 3.0+ is good. For competitive programs, aim for 3.5+. A 4.0 is perfect unweighted GPA.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How can I improve my GPA?</h3>
            <p className="text-sm text-muted-foreground">
              Focus on current classes, seek help early, manage your time well, and consider retaking courses if your school allows grade replacement.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/average-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Average Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate means</p>
          </a>
          <a href="/math-tools/percentage-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Percentage Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate percentages</p>
          </a>
          <a href="/math-tools/grade-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Grade Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate course grades</p>
          </a>
        </div>
      </section>
    </div>
  );
}
