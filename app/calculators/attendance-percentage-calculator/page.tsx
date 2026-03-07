"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AttendancePercentageCalculatorPage() {
  const [classesAttended, setClassesAttended] = useState<string>("");
  const [totalClasses, setTotalClasses] = useState<string>("");
  const [targetAttendance, setTargetAttendance] = useState<string>("75");
  const [result, setResult] = useState<{
    attendancePercentage: number;
    status: string;
    classesCanMiss: number;
    classesToAttend: number;
    targetMet: boolean;
  } | null>(null);

  const calculate = () => {
    const attended = parseInt(classesAttended);
    const total = parseInt(totalClasses);
    const target = parseFloat(targetAttendance);

    if (isNaN(attended) || isNaN(total) || total <= 0 || attended < 0) return;

    const percentage = (attended / total) * 100;
    const roundedPercentage = Math.round(percentage * 100) / 100;

    // Determine status
    let status = "";
    if (roundedPercentage >= 90) status = "Excellent";
    else if (roundedPercentage >= 80) status = "Good";
    else if (roundedPercentage >= 75) status = "Meets Requirement";
    else if (roundedPercentage >= 60) status = "Needs Improvement";
    else status = "At Risk";

    // Calculate how many more classes can be missed while maintaining target
    const targetRatio = target / 100;
    const classesCanMiss = Math.max(0, Math.floor((attended - (total * targetRatio)) / (1 - targetRatio)));

    // Calculate how many more classes need to be attended to reach target
    let classesToAttend = 0;
    if (roundedPercentage < target) {
      // attended + x = target * (total + x)
      // x = (target * total - attended) / (1 - target)
      classesToAttend = Math.ceil(((targetRatio * total) - attended) / (1 - targetRatio));
    }

    setResult({
      attendancePercentage: roundedPercentage,
      status,
      classesCanMiss: roundedPercentage >= target ? classesCanMiss : 0,
      classesToAttend,
      targetMet: roundedPercentage >= target,
    });
  };

  const reset = () => {
    setClassesAttended("");
    setTotalClasses("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Attendance Percentage Calculator – Check If You Meet the Minimum Attendance Requirement
          </h1>
          <p className="text-muted-foreground">
            Instantly check your attendance percentage and find out how many more classes you can
            miss with our Attendance Calculator. Enter classes attended and total classes held to
            stay on top of your attendance requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="attended">Classes Attended</Label>
                <Input
                  id="attended"
                  type="number"
                  placeholder="e.g., 45"
                  value={classesAttended}
                  onChange={(e) => setClassesAttended(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="total">Total Classes Held</Label>
                <Input
                  id="total"
                  type="number"
                  placeholder="e.g., 60"
                  value={totalClasses}
                  onChange={(e) => setTotalClasses(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target">Target Attendance (%)</Label>
                <Input
                  id="target"
                  type="number"
                  placeholder="75"
                  value={targetAttendance}
                  onChange={(e) => setTargetAttendance(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Common requirement: 75%
                </p>
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
              <h3 className="text-lg font-semibold mb-4">Attendance Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${result.targetMet ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Attendance Percentage</p>
                    <p className={`text-4xl font-bold ${result.targetMet ? 'text-green-600' : 'text-red-600'}`}>
                      {result.attendancePercentage}%
                    </p>
                    <p className={`text-lg mt-1 ${result.targetMet ? 'text-green-600' : 'text-red-600'}`}>
                      {result.status}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Classes Attended</p>
                      <p className="text-2xl font-bold">{classesAttended}</p>
                      <p className="text-xs text-muted-foreground">out of {totalClasses}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Classes Missed</p>
                      <p className="text-2xl font-bold">{parseInt(totalClasses) - parseInt(classesAttended)}</p>
                    </div>
                  </div>

                  {result.targetMet ? (
                    <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700 dark:text-green-400">
                        <strong>✓ You can miss {result.classesCanMiss} more class(es)</strong>
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                        and still maintain {targetAttendance}% attendance
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200">
                      <p className="text-sm text-red-700 dark:text-red-400">
                        <strong>⚠ You need to attend {result.classesToAttend} more class(es)</strong>
                      </p>
                      <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                        to reach {targetAttendance}% attendance
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">How Attendance Is Calculated</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            Attendance % = (Classes Attended ÷ Total Classes) × 100
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Example:</strong> Attended 45 out of 60 classes<br />
            Attendance = (45 / 60) × 100 = 75%
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            <strong>Tip:</strong> Most institutions require 75% minimum attendance. Check your
            institution's specific requirements.
          </p>
        </div>

        {/* SEO Content Sections */}
        <div className="mt-12 space-y-12">
          {/* How to Use Section */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">How to Use This Attendance Percentage Calculator</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-medium mb-1">Enter your attendance numbers</h3>
                  <p className="text-muted-foreground">Input the number of classes you've attended and the total number of classes held so far.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-medium mb-1">Set your target attendance</h3>
                  <p className="text-muted-foreground">Enter the minimum attendance percentage required by your school, university, or employer. The default is 75%, which is a common requirement.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-medium mb-1">Review your results</h3>
                  <p className="text-muted-foreground">See your current attendance percentage, whether you meet the requirement, and how many more classes you can miss or need to attend.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Understanding Attendance Percentage Section */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Understanding Attendance Percentage</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Attendance percentage is a simple but important metric that shows what portion of scheduled classes, meetings, or events you've actually attended. It's calculated by dividing the number of sessions you attended by the total number of sessions held, then multiplying by 100 to get a percentage.
              </p>
              <p>
                <strong>Why it matters:</strong> Attendance isn't just about showing up. Many schools won't let you take exams or earn credit if your attendance drops below a certain threshold. Employers track attendance for performance reviews and compliance. Some programs have strict attendance policies tied to funding or accreditation requirements.
              </p>
              <p>
                <strong>The calculation:</strong> Attendance Percentage = (Present ÷ Total) × 100. If you attended 45 out of 60 classes, your attendance is (45 ÷ 60) × 100 = 75%.
              </p>
              <p>
                <strong>Typical requirements:</strong> Most high schools require 90% or higher attendance for course credit. Universities often set the bar at 75-80% for exam eligibility. Workplace policies vary widely, but consistent attendance below 85% may trigger performance reviews.
              </p>
            </div>
          </section>

          {/* Attendance Percentage Guidelines Table */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Attendance Percentage Guidelines</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Attendance Range</th>
                    <th className="text-left py-3 px-4 font-medium">Rating</th>
                    <th className="text-left py-3 px-4 font-medium">What It Means</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono">90-100%</td>
                    <td className="py-3 px-4 text-green-600 font-medium">Excellent</td>
                    <td className="py-3 px-4">Outstanding attendance. You're well above most requirements.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono">80-89%</td>
                    <td className="py-3 px-4 text-blue-600 font-medium">Good</td>
                    <td className="py-3 px-4">Solid attendance. You meet most requirements with room to spare.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono">70-79%</td>
                    <td className="py-3 px-4 text-yellow-600 font-medium">Fair</td>
                    <td className="py-3 px-4">Acceptable but may need improvement. You're close to minimum thresholds.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono">Below 70%</td>
                    <td className="py-3 px-4 text-red-600 font-medium">Poor</td>
                    <td className="py-3 px-4">At risk. You may face academic or employment consequences.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Common Attendance Requirements Section */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Common Attendance Requirements</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-medium mb-2">High Schools</h3>
                <p className="text-muted-foreground text-sm">
                  Most high schools require a minimum of 90% attendance for course credit. Missing more than 10% of school days can result in failing a class, regardless of grades.
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-medium mb-2">Universities & Colleges</h3>
                <p className="text-muted-foreground text-sm">
                  Universities typically require 75-80% attendance for exam eligibility. Some programs, especially in health sciences or labs, may have stricter requirements up to 90%.
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-medium mb-2">Employment</h3>
                <p className="text-muted-foreground text-sm">
                  Workplace attendance policies vary by company. Many employers expect 95% or higher. Consistent absences below this threshold may affect performance reviews and advancement.
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-medium mb-2">Sports Teams & Activities</h3>
                <p className="text-muted-foreground text-sm">
                  Extracurricular activities often require 90% attendance for participation or playing time. Coaches may have stricter rules during competition seasons.
                </p>
              </div>
            </div>
          </section>

          {/* Calculating Absences Allowed Section */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Calculating How Many Absences You Can Afford</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Knowing how many absences you can afford before dropping below your required attendance helps you plan ahead. Here's the formula:
              </p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                Maximum Absences = Total Days × (1 - Required Percentage)
              </div>
              <p>
                <strong>Example:</strong> If your school has 180 days and requires 90% attendance:<br />
                Maximum Absences = 180 × (1 - 0.90) = 180 × 0.10 = 18 absences
              </p>
              <p>
                This means you can miss up to 18 days and still maintain 90% attendance. Keep in mind that this is a maximum – life happens, and you might need a buffer for unexpected illness or emergencies.
              </p>
              <p>
                <strong>Important considerations:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Excused absences may still count toward your total absence count</li>
                <li>Some schools differentiate between excused and unexcused absences</li>
                <li>Tardy policies vary – three tardies might equal one absence</li>
                <li>Extended absences (medical, family emergency) may have special provisions</li>
              </ul>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">How is attendance percentage calculated?</h3>
                <p className="text-muted-foreground">
                  Attendance percentage is calculated by dividing the number of classes you attended by the total number of classes held, then multiplying by 100. For example, if you attended 45 out of 60 classes: (45 ÷ 60) × 100 = 75%.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">What is a good attendance percentage?</h3>
                <p className="text-muted-foreground">
                  A good attendance percentage is generally 90% or higher. This puts you in the "excellent" range and ensures you meet most academic and employment requirements. Anything above 80% is considered solid, while 70-79% may require improvement depending on your specific requirements.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">How many absences is too many?</h3>
                <p className="text-muted-foreground">
                  It depends on your total days and required percentage. For a typical 180-day school year with a 90% requirement, more than 18 absences would put you at risk. Use the formula: Maximum Absences = Total Days × (1 - Required Percentage) to find your specific limit.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Do excused absences count differently?</h3>
                <p className="text-muted-foreground">
                  Policies vary by institution. Some schools count excused absences the same as unexcused when calculating attendance percentage. Others may allow a certain number of excused absences without penalty. Check your school or employer's specific policy to understand how excused absences affect your record.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">How do I improve my attendance percentage?</h3>
                <p className="text-muted-foreground">
                  To improve your attendance: prioritize attending every class, set multiple alarms, plan for transportation delays, communicate with instructors about unavoidable absences, and track your attendance regularly using this calculator. If you're behind, remember that attending all future classes will gradually improve your percentage.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools Section */}
        </div>
      </div>
    </div>
  );
}
