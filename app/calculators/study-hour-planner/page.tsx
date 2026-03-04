"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StudyPlanResult {
  subjects: Array<{ name: string; hours: number; sessions: number }>;
  totalHours: number;
  daysUntilExam: number;
  hoursPerDay: number;
  schedule: Array<{ day: string; subject: string; hours: number }>;
  recommendations: string[];
}

export default function StudyHourPlannerPage() {
  const [subjects, setSubjects] = useState<Array<{ name: string; difficulty: string; hours: string }>>([
    { name: "Subject 1", difficulty: "medium", hours: "" },
  ]);
  const [daysUntilExam, setDaysUntilExam] = useState<string>("");
  const [hoursPerDay, setHoursPerDay] = useState<string>("");
  const [result, setResult] = useState<StudyPlanResult | null>(null);

  const addSubject = () => {
    setSubjects([...subjects, { name: `Subject ${subjects.length + 1}`, difficulty: "medium", hours: "" }]);
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const updateSubject = (index: number, field: string, value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setSubjects(newSubjects);
  };

  const calculate = () => {
    const daysNum = parseInt(daysUntilExam) || 0;
    const hoursPerDayNum = parseFloat(hoursPerDay) || 0;

    if (daysNum === 0 || subjects.length === 0) return;

    // Calculate total available hours
    const totalAvailableHours = daysNum * hoursPerDayNum;

    // Weight factors for difficulty
    const difficultyWeights: Record<string, number> = {
      easy: 1,
      medium: 1.5,
      hard: 2,
    };

    // Calculate weighted hours for each subject
    let totalWeight = 0;
    const subjectWeights = subjects.map(subj => {
      const weight = difficultyWeights[subj.difficulty] || 1.5;
      totalWeight += weight;
      return { ...subj, weight };
    });

    // Allocate hours based on weight
    const allocatedSubjects = subjectWeights.map(subj => {
      const allocatedHours = (subj.weight / totalWeight) * totalAvailableHours;
      const sessions = Math.ceil(allocatedHours / 1.5); // ~1.5 hour sessions
      return {
        name: subj.name,
        hours: parseFloat(allocatedHours.toFixed(1)),
        sessions,
      };
    });

    // Generate schedule
    const schedule: Array<{ day: string; subject: string; hours: number }> = [];
    const subjectIndex = { current: 0, sessionCount: 0 };

    for (let day = 1; day <= Math.min(daysNum, 14); day++) {
      let dayHours = 0;
      let attempts = 0;

      while (dayHours < hoursPerDayNum && attempts < subjects.length * 2) {
        const subj = allocatedSubjects[subjectIndex.current % allocatedSubjects.length];
        if (subj.hours > 0) {
          const sessionHours = Math.min(1.5, hoursPerDayNum - dayHours, subj.hours);
          if (sessionHours > 0) {
            schedule.push({
              day: `Day ${day}`,
              subject: subj.name,
              hours: parseFloat(sessionHours.toFixed(1)),
            });
            dayHours += sessionHours;
            allocatedSubjects[subjectIndex.current % allocatedSubjects.length].hours -= sessionHours;
          }
        }
        subjectIndex.current++;
        attempts++;
      }
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📚 Total study time: ${totalAvailableHours} hours over ${daysNum} days`);
    recommendations.push(`⏰ Daily commitment: ${hoursPerDayNum} hours`);

    if (hoursPerDayNum < 2) {
      recommendations.push("⚠️ Less than 2 hours/day may not be enough for multiple subjects");
    } else if (hoursPerDayNum > 6) {
      recommendations.push("⚠️ More than 6 hours/day may lead to burnout - take breaks!");
    }

    recommendations.push("🍅 Use Pomodoro technique: 25 min study + 5 min break");
    recommendations.push("💤 Get 7-8 hours of sleep for memory consolidation");
    recommendations.push("📝 Review material within 24 hours for better retention");

    setResult({
      subjects: allocatedSubjects,
      totalHours: totalAvailableHours,
      daysUntilExam: daysNum,
      hoursPerDay: hoursPerDayNum,
      schedule: schedule.slice(0, 20), // Show first 20 entries
      recommendations,
    });
  };

  const reset = () => {
    setSubjects([{ name: "Subject 1", difficulty: "medium", hours: "" }]);
    setDaysUntilExam("");
    setHoursPerDay("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Study Hour Planner – Create a Personalized Study Schedule for Exams
          </h1>
          <p className="text-muted-foreground">
            Ace your exams with a smart study plan. Our Study Hour Planner helps you
            allocate study time across subjects based on difficulty, exam dates, and
            your daily availability. Build a realistic, balanced study schedule.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Subjects</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addSubject}>
                    + Add Subject
                  </Button>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {subjects.map((subj, index) => (
                    <div key={index} className="p-3 border rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <Input
                          value={subj.name}
                          onChange={(e) => updateSubject(index, "name", e.target.value)}
                          className="w-32"
                          placeholder="Subject name"
                        />
                        {subjects.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSubject(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Select
                          value={subj.difficulty}
                          onValueChange={(value) => updateSubject(index, "difficulty", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="days">Days Until Exam</Label>
                  <Input
                    id="days"
                    type="number"
                    value={daysUntilExam}
                    onChange={(e) => setDaysUntilExam(e.target.value)}
                    placeholder="30"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="hours-day">Hours/Day</Label>
                  <Input
                    id="hours-day"
                    type="number"
                    step="0.5"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(e.target.value)}
                    placeholder="3"
                  />
                </div>
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
              <h3 className="text-lg font-semibold mb-4">Study Plan</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Total Hours</p>
                      <p className="text-lg font-bold text-primary">{result.totalHours}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Days</p>
                      <p className="text-lg font-bold text-primary">{result.daysUntilExam}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Hours/Day</p>
                      <p className="text-lg font-bold text-primary">{result.hoursPerDay}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Subject Allocation</h4>
                    <div className="space-y-1">
                      {result.subjects.map((subj, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>{subj.name}</span>
                          <span>{subj.hours}h ({subj.sessions} sessions)</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Sample Schedule (First 2 weeks)</h4>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {result.schedule.map((item, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span className="font-medium">{item.day}</span>
                          <span>{item.subject}</span>
                          <span>{item.hours}h</span>
                        </div>
                      ))}
                    </div>
                  </div>

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
                  <p>Add subjects and click Create Plan to see schedule</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Effective Study Techniques
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Active recall:</strong> Test yourself instead of re-reading
                  </li>
                  <li>
                    <strong>Spaced repetition:</strong> Review at increasing intervals
                  </li>
                  <li>
                    <strong>Pomodoro:</strong> 25 min focus + 5 min break
                  </li>
                  <li>
                    <strong>Interleaving:</strong> Mix different subjects/topics
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Difficult subjects need more time but don&apos;t
                  neglect easier ones. Regular review of all material prevents forgetting.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
