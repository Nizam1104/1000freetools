"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RevisionPlanResult {
  examDate: string;
  daysUntilExam: number;
  subjects: Array<{ name: string; reviewDates: string[] }>;
  schedule: Array<{ date: string; subjects: string[] }>;
  recommendations: string[];
}

export default function RevisionPlannerPage() {
  const [examDate, setExamDate] = useState<string>("");
  const [subjects, setSubjects] = useState<string>("Math, Science, History");
  const [result, setResult] = useState<RevisionPlanResult | null>(null);

  const calculate = () => {
    if (!examDate) return;

    const exam = new Date(examDate);
    const today = new Date();
    const daysUntilExam = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExam <= 0) {
      setResult(null);
      return;
    }

    // Parse subjects
    const subjectList = subjects.split(",").map(s => s.trim()).filter(s => s);

    // Spaced repetition intervals (days before exam)
    const intervals = [1, 3, 7, 14, 21, 30];

    // Generate review dates for each subject
    const subjectPlans = subjectList.map((subject) => {
      const reviewDates: string[] = [];
      
      intervals.forEach((interval) => {
        const reviewDate = new Date(exam);
        reviewDate.setDate(reviewDate.getDate() - interval);
        
        if (reviewDate >= today) {
          reviewDates.push(reviewDate.toLocaleDateString());
        }
      });

      return { name: subject, reviewDates };
    });

    // Generate daily schedule
    const schedule: Array<{ date: string; subjects: string[] }> = [];
    const dateMap: Record<string, string[]> = {};

    subjectPlans.forEach((subject) => {
      subject.reviewDates.forEach((date) => {
        if (!dateMap[date]) {
          dateMap[date] = [];
        }
        dateMap[date].push(subject.name);
      });
    });

    Object.entries(dateMap)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .slice(0, 14) // Show next 14 scheduled days
      .forEach(([date, subjects]) => {
        schedule.push({ date, subjects });
      });

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📅 Exam date: ${exam.toLocaleDateString()}`);
    recommendations.push(`⏱️ Days until exam: ${daysUntilExam}`);
    recommendations.push(`📚 Subjects: ${subjectList.length}`);

    if (daysUntilExam < 7) {
      recommendations.push("⚠️ Less than a week - focus on high-yield topics");
      recommendations.push("📝 Do practice tests under exam conditions");
    } else if (daysUntilExam < 30) {
      recommendations.push("✅ Good amount of time - follow spaced repetition");
      recommendations.push("📖 Review all subjects systematically");
    } else {
      recommendations.push("🏆 Plenty of time - build strong foundations first");
      recommendations.push("📊 Create detailed study notes");
    }

    recommendations.push("🧠 Review each subject at least 3 times before exam");
    recommendations.push("😴 Get adequate sleep before exam day");
    recommendations.push("📝 Active recall is more effective than re-reading");

    setResult({
      examDate: exam.toLocaleDateString(),
      daysUntilExam,
      subjects: subjectPlans,
      schedule,
      recommendations,
    });
  };

  const reset = () => {
    setExamDate("");
    setSubjects("Math, Science, History");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Revision Planner – Create a Smart Spaced Repetition Study Schedule
          </h1>
          <p className="text-muted-foreground">
            Maximize exam retention with a science-backed revision plan. Our Revision
            Planner uses spaced repetition principles to schedule topic reviews at
            optimal intervals before your exam date.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="exam-date">Exam Date</Label>
                <Input
                  id="exam-date"
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subjects">Subjects (comma-separated)</Label>
                <Input
                  id="subjects"
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                  placeholder="Math, Science, History, English"
                />
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Spaced Repetition Schedule:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 1 day before exam</li>
                  <li>• 3 days before exam</li>
                  <li>• 7 days before exam</li>
                  <li>• 14 days before exam</li>
                  <li>• 21 days before exam</li>
                  <li>• 30 days before exam</li>
                </ul>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Create Plan
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Revision Schedule</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Days Until Exam</p>
                    <p className="text-4xl font-bold text-primary">{result.daysUntilExam}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Exam: {result.examDate}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Subject Review Schedule</h4>
                    <div className="space-y-2">
                      {result.subjects.map((subject, i) => (
                        <div key={i} className="p-3 bg-muted/50 rounded">
                          <p className="font-medium text-sm">{subject.name}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {subject.reviewDates.map((date, j) => (
                              <span key={j} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                                {date}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {result.schedule.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Upcoming Review Days</h4>
                      <div className="space-y-1">
                        {result.schedule.map((day, i) => (
                          <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                            <span className="font-medium">{day.date}</span>
                            <span>{day.subjects.join(", ")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Study Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter exam date and subjects to create revision plan</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Spaced Repetition Science
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Spaced repetition is a learning technique that incorporates increasing
                  intervals of time between subsequent review of previously learned material.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Ebbinghaus Forgetting Curve:</strong> We forget ~50% within an hour
                  </li>
                  <li>
                    <strong>Spacing Effect:</strong> Distributed practice beats cramming
                  </li>
                  <li>
                    <strong>Optimal Timing:</strong> Review just before you&apos;re about to forget
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Combine spaced repetition with active recall for
                  maximum retention. Test yourself instead of just re-reading notes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
