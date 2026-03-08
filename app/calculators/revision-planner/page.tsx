"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Revision Planner
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your exam date</p>
                    <p>Select the date of your exam from the calendar. The planner works backward from this date to schedule your review sessions.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">List your subjects</p>
                    <p>Enter all subjects you need to study, separated by commas. For example: &quot;Math, Physics, Chemistry, Biology&quot;.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Generate your plan</p>
                    <p>Click Create Plan to see your personalized revision schedule with spaced repetition intervals and study recommendations.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Spaced Repetition Review Schedule
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Review Session</th>
                      <th className="text-left py-3 px-2 font-semibold">Days Before Exam</th>
                      <th className="text-left py-3 px-2 font-semibold">Purpose</th>
                      <th className="text-left py-3 px-2 font-semibold">Retention Rate</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">First Review</td>
                      <td className="py-3 px-2">30 days</td>
                      <td className="py-3 px-2">Initial learning consolidation</td>
                      <td className="py-3 px-2">~60%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Second Review</td>
                      <td className="py-3 px-2">21 days</td>
                      <td className="py-3 px-2">Reinforce key concepts</td>
                      <td className="py-3 px-2">~70%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Third Review</td>
                      <td className="py-3 px-2">14 days</td>
                      <td className="py-3 px-2">Strengthen memory traces</td>
                      <td className="py-3 px-2">~80%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Fourth Review</td>
                      <td className="py-3 px-2">7 days</td>
                      <td className="py-3 px-2">Active recall practice</td>
                      <td className="py-3 px-2">~85%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Fifth Review</td>
                      <td className="py-3 px-2">3 days</td>
                      <td className="py-3 px-2">Final consolidation</td>
                      <td className="py-3 px-2">~90%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Final Review</td>
                      <td className="py-3 px-2">1 day</td>
                      <td className="py-3 px-2">Light review, confidence building</td>
                      <td className="py-3 px-2">~95%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Source: Based on Ebbinghaus forgetting curve research and modern spaced repetition studies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Effective Study Techniques
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Active Recall</h4>
                  <p>
                    Don&apos;t just re-read notes — test yourself. Close the book and try to explain the concept from memory. Use flashcards, practice questions, or teach the material to someone else. Active recall strengthens memory far better than passive review.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Interleaving</h4>
                  <p>
                    Mix different subjects or topics in a single study session instead of blocking one topic for hours. Studying Math for 30 minutes, then Physics for 30 minutes, then back to Math improves retention compared to 90 minutes of pure Math.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Elaboration</h4>
                  <p>
                    Connect new information to what you already know. Ask &quot;why does this make sense?&quot; and &quot;how does this relate to X?&quot; Creating mental connections makes information stickier and easier to retrieve later.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Sleep and Memory</h4>
                  <p>
                    Sleep is when memory consolidation happens. Pulling all-nighters before exams actually hurts performance. Aim for 7-9 hours per night, especially in the week before your exam.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">How many subjects should I study per day?</h4>
                  <p>
                    2-3 subjects per day works well for most students. This gives you enough variety to stay engaged while allowing deep focus on each topic. The planner automatically distributes subjects across your available days.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What if I have less than 30 days until my exam?</h4>
                  <p>
                    The planner adjusts automatically — it only shows review sessions that fall between today and your exam date. With less time, focus on high-yield topics and practice exams rather than trying to cover everything.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I study the day before the exam?</h4>
                  <p>
                    Yes, but keep it light. Review key formulas, definitions, or concepts — nothing new. The goal is confidence and activation, not learning. Stop studying 2-3 hours before bed to let your brain wind down.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How long should each study session be?</h4>
                  <p>
                    25-50 minute focused blocks work best for most people, with 5-10 minute breaks between. This matches natural attention spans. The Pomodoro Technique (25 min work, 5 min break) is a proven approach.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What if I miss a scheduled review day?</h4>
                  <p>
                    Don&apos;t panic — just do the review as soon as you can. Spaced repetition is forgiving. The key is getting multiple exposures to the material, not hitting exact dates. Adjust the schedule and keep going.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
