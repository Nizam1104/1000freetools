"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Semester {
  id: number;
  name: string;
  gpa: string;
  credits: string;
}

export default function CgpaCalculatorPage() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 1, name: "Semester 1", gpa: "", credits: "" },
    { id: 2, name: "Semester 2", gpa: "", credits: "" },
  ]);
  const [gradingScale, setGradingScale] = useState<"4.0" | "5.0" | "10.0">("4.0");
  const [result, setResult] = useState<{
    cgpa: number;
    totalSemesters: number;
    totalCredits: number;
    semesterBreakdown: { name: string; gpa: number; credits: number; points: number }[];
  } | null>(null);

  const addSemester = () => {
    setSemesters([...semesters, { id: Date.now(), name: `Semester ${semesters.length + 1}`, gpa: "", credits: "" }]);
  };

  const removeSemester = (id: number) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((s) => s.id !== id));
    }
  };

  const updateSemester = (id: number, field: keyof Semester, value: string) => {
    setSemesters(semesters.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    const breakdown: { name: string; gpa: number; credits: number; points: number }[] = [];

    for (const semester of semesters) {
      const gpa = parseFloat(semester.gpa);
      const credits = parseFloat(semester.credits);

      if (!isNaN(gpa) && !isNaN(credits) && credits > 0) {
        const points = gpa * credits;
        totalPoints += points;
        totalCredits += credits;
        breakdown.push({
          name: semester.name,
          gpa,
          credits,
          points: Math.round(points * 100) / 100,
        });
      }
    }

    if (totalCredits === 0) return;

    const cgpa = totalPoints / totalCredits;

    setResult({
      cgpa: Math.round(cgpa * 100) / 100,
      totalSemesters: breakdown.length,
      totalCredits,
      semesterBreakdown: breakdown,
    });
  };

  const reset = () => {
    setSemesters([
      { id: 1, name: "Semester 1", gpa: "", credits: "" },
      { id: 2, name: "Semester 2", gpa: "", credits: "" },
    ]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            CGPA Calculator – Calculate Your Cumulative GPA Across All Semesters
          </h1>
          <p className="text-muted-foreground">
            Track your academic performance across your entire degree with our CGPA Calculator.
            Enter your semester GPAs and credit hours to calculate your overall cumulative GPA.
            Supports 4.0, 5.0, and 10-point grading scales.
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
                    <SelectItem value="4.0">4.0 Scale</SelectItem>
                    <SelectItem value="5.0">5.0 Scale</SelectItem>
                    <SelectItem value="10.0">10.0 Scale (CGPA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Semesters</Label>
                {semesters.map((semester) => (
                  <div key={semester.id} className="space-y-2 p-3 border rounded-md">
                    <div className="flex gap-2 items-center">
                      <Input
                        placeholder="Semester name"
                        value={semester.name}
                        onChange={(e) => updateSemester(semester.id, "name", e.target.value)}
                        className="flex-1"
                      />
                      {semesters.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSemester(semester.id)}
                          className="text-destructive"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder={`GPA (0-${gradingScale})`}
                        value={semester.gpa}
                        onChange={(e) => updateSemester(semester.id, "gpa", e.target.value)}
                        step="0.01"
                        max={parseFloat(gradingScale)}
                      />
                      <Input
                        type="number"
                        placeholder="Credits"
                        value={semester.credits}
                        onChange={(e) => updateSemester(semester.id, "credits", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addSemester} className="w-full">
                  + Add Semester
                </Button>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate CGPA
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">CGPA Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Cumulative GPA</p>
                    <p className="text-4xl font-bold text-primary">{result.cgpa}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      across {result.totalSemesters} semesters ({result.totalCredits} credits)
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Semester Breakdown</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {result.semesterBreakdown.map((sem, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2 bg-muted rounded">
                          <div>
                            <p className="font-medium text-sm">{sem.name}</p>
                            <p className="text-xs text-muted-foreground">{sem.credits} credits</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{sem.gpa}</p>
                            <p className="text-xs text-muted-foreground">{sem.points} pts</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Performance Summary</p>
                    <div className="flex justify-between mt-2">
                      <span className="text-sm">Average per semester:</span>
                      <span className="font-bold">
                        {(result.cgpa).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your semester GPAs and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">How CGPA Is Calculated</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Semester Points = Semester GPA × Semester Credits</div>
            <div>Total Points = Sum of all Semester Points</div>
            <div>CGPA = Total Points ÷ Total Credits</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Example:</strong> Semester 1: 3.5 GPA × 15 credits = 52.5 points<br />
            Semester 2: 3.8 GPA × 15 credits = 57 points<br />
            CGPA = (52.5 + 57) / (15 + 15) = 109.5 / 30 = 3.65
          </p>
        </div>

        {/* SEO Content Section */}
        <div className="mt-12 space-y-12">
          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">How to Calculate Your CGPA</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Select Grading Scale</h3>
                  <p className="text-muted-foreground text-sm">Choose between 4.0, 5.0, or 10.0 grading scale based on your university system.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Add Semester Details</h3>
                  <p className="text-muted-foreground text-sm">Enter each semester's GPA and credit hours. Add as many semesters as needed.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-2">Get Your CGPA</h3>
                  <p className="text-muted-foreground text-sm">Instantly see your cumulative GPA with semester-by-semester breakdown.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Benefits */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Why Track Your CGPA?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">📊 Academic Progress Tracking</h3>
                <p className="text-muted-foreground text-sm">Monitor your overall academic performance across all semesters to stay on track for graduation goals.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🎓 Scholarship Eligibility</h3>
                <p className="text-muted-foreground text-sm">Many scholarships require minimum CGPA. Track your standing to maintain financial aid eligibility.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">💼 Job Applications</h3>
                <p className="text-muted-foreground text-sm">Employers often ask for CGPA. Know your exact number for resumes and application forms.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📈 Grade Improvement Planning</h3>
                <p className="text-muted-foreground text-sm">See how future semester grades will impact your CGPA to set realistic improvement targets.</p>
              </div>
            </div>
          </section>

          {/* Reference Table */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">CGPA to Letter Grade Conversion (4.0 Scale)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">CGPA Range</th>
                    <th className="text-left py-3 px-4">Letter Grade</th>
                    <th className="text-left py-3 px-4">Percentage</th>
                    <th className="text-left py-3 px-4">Classification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">3.7 - 4.0</td>
                    <td className="py-3 px-4">A / A+</td>
                    <td className="py-3 px-4">90-100%</td>
                    <td className="py-3 px-4">First Class with Distinction</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">3.0 - 3.69</td>
                    <td className="py-3 px-4">B+ / A-</td>
                    <td className="py-3 px-4">80-89%</td>
                    <td className="py-3 px-4">First Class</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">2.3 - 2.99</td>
                    <td className="py-3 px-4">C+ / B</td>
                    <td className="py-3 px-4">70-79%</td>
                    <td className="py-3 px-4">Second Class Upper</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">2.0 - 2.29</td>
                    <td className="py-3 px-4">C</td>
                    <td className="py-3 px-4">60-69%</td>
                    <td className="py-3 px-4">Second Class Lower</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Below 2.0</td>
                    <td className="py-3 px-4">D / F</td>
                    <td className="py-3 px-4">Below 60%</td>
                    <td className="py-3 px-4">Pass / Fail</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">CGPA Calculation FAQs</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How is CGPA calculated from semester GPA?</h3>
                <p className="text-muted-foreground text-sm">CGPA = Total Grade Points ÷ Total Credits. For each semester: multiply GPA by credits to get points, sum all points, then divide by total credits.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What's the difference between GPA and CGPA?</h3>
                <p className="text-muted-foreground text-sm">GPA (Grade Point Average) is for a single semester. CGPA (Cumulative GPA) is the overall average across all semesters of your degree.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How do I convert 10-point CGPA to 4-point scale?</h3>
                <p className="text-muted-foreground text-sm">Rough conversion: divide 10-point CGPA by 2.5. For precise conversion, use your university's official conversion formula as it varies by institution.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What CGPA is considered good?</h3>
                <p className="text-muted-foreground text-sm">On a 4.0 scale: 3.5+ is excellent, 3.0+ is good. On a 10-point scale: 8.5+ is excellent, 7.5+ is good. Requirements vary by field and goals.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Can I improve my CGPA in the final year?</h3>
                <p className="text-muted-foreground text-sm">Yes, but it depends on credits remaining. With more credits left, you have more impact. Calculate target grades needed using this calculator.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Related Education & Finance Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/compounding-frequency-comparison" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Compounding Frequency Calculator</h3>
                <p className="text-muted-foreground text-sm">Plan student loan repayments and understand investment growth for education savings.</p>
              </a>
              <a href="/calculators/cost-of-capital-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Cost of Capital Calculator</h3>
                <p className="text-muted-foreground text-sm">Evaluate education ROI and student loan financing options.</p>
              </a>
              <a href="/calculators/car-loan-affordability-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Car Loan Affordability Calculator</h3>
                <p className="text-muted-foreground text-sm">Budget for transportation costs while managing student finances.</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
