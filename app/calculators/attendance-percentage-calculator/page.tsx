"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      </div>
    </div>
  );
}
