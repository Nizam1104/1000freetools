"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BiorhythmCalculatorPage() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [targetDate, setTargetDate] = useState<string>("");
  const [result, setResult] = useState<{
    physical: number;
    emotional: number;
    intellectual: number;
    physicalStatus: string;
    emotionalStatus: string;
    intellectualStatus: string;
    overallDay: string;
  } | null>(null);

  const calculate = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = targetDate ? new Date(targetDate) : new Date();

    // Calculate days lived
    const daysLived = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    if (daysLived < 0) return;

    // Biorhythm cycles (in days)
    const physicalCycle = 23;
    const emotionalCycle = 28;
    const intellectualCycle = 33;

    // Calculate biorhythm values using sine wave
    const physical = Math.sin((2 * Math.PI * daysLived) / physicalCycle) * 100;
    const emotional = Math.sin((2 * Math.PI * daysLived) / emotionalCycle) * 100;
    const intellectual = Math.sin((2 * Math.PI * daysLived) / intellectualCycle) * 100;

    // Determine status for each cycle
    const getStatus = (value: number) => {
      if (value >= 80) return "Peak (+80-100%)";
      if (value >= 50) return "High (+50-80%)";
      if (value >= 20) return "Positive (+20-50%)";
      if (value >= -20) return "Neutral (-20-+20%)";
      if (value >= -50) return "Negative (-50--20%)";
      if (value >= -80) return "Low (-80--50%)";
      return "Critical (-100--80%)";
    };

    // Calculate overall day score
    const overallScore = (physical + emotional + intellectual) / 3;
    let overallDay: string;
    if (overallScore >= 60) overallDay = "Excellent Day!";
    else if (overallScore >= 30) overallDay = "Good Day";
    else if (overallScore >= -30) overallDay = "Average Day";
    else if (overallScore >= -60) overallDay = "Challenging Day";
    else overallDay = "Difficult Day";

    setResult({
      physical: Math.round(physical),
      emotional: Math.round(emotional),
      intellectual: Math.round(intellectual),
      physicalStatus: getStatus(physical),
      emotionalStatus: getStatus(emotional),
      intellectualStatus: getStatus(intellectual),
      overallDay
    });
  };

  const reset = () => {
    setBirthDate("");
    setTargetDate("");
    setResult(null);
  };

  // Set default target date to today
  useState(() => {
    const today = new Date().toISOString().split('T')[0];
    setTargetDate(today);
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Biorhythm Calculator – Track Your Physical, Emotional & Intellectual Cycles</h1>
          <p className="text-muted-foreground">
            Discover your natural performance rhythms with our Biorhythm Calculator. Enter your birth date to see your current physical, emotional, and intellectual cycle positions — helping you plan important activities on your peak days.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Date of Birth</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Leave as today for current readings</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate Cycles
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
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Overall Day Rating</p>
                    <p className={`text-2xl font-bold ${result.overallDay.includes("Excellent") ? "text-green-500" :
                        result.overallDay.includes("Good") ? "text-blue-500" :
                          result.overallDay.includes("Average") ? "text-yellow-500" :
                            result.overallDay.includes("Challenging") ? "text-orange-500" : "text-red-500"
                      }`}>{result.overallDay}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Physical (23 days)</span>
                        <span className="text-sm font-semibold">{result.physical}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${result.physical >= 50 ? "bg-green-500" :
                              result.physical >= 0 ? "bg-blue-500" :
                                result.physical >= -50 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                          style={{ width: `${Math.abs(result.physical)}%`, marginLeft: result.physical < 0 ? `${50 + result.physical / 2}%` : '50%' }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{result.physicalStatus}</p>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Emotional (28 days)</span>
                        <span className="text-sm font-semibold">{result.emotional}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${result.emotional >= 50 ? "bg-green-500" :
                              result.emotional >= 0 ? "bg-blue-500" :
                                result.emotional >= -50 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                          style={{ width: `${Math.abs(result.emotional)}%`, marginLeft: result.emotional < 0 ? `${50 + result.emotional / 2}%` : '50%' }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{result.emotionalStatus}</p>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Intellectual (33 days)</span>
                        <span className="text-sm font-semibold">{result.intellectual}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${result.intellectual >= 50 ? "bg-green-500" :
                              result.intellectual >= 0 ? "bg-blue-500" :
                                result.intellectual >= -50 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                          style={{ width: `${Math.abs(result.intellectual)}%`, marginLeft: result.intellectual < 0 ? `${50 + result.intellectual / 2}%` : '50%' }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{result.intellectualStatus}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-1">Understanding Your Cycles:</p>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• <strong>Physical:</strong> Energy, strength, endurance, coordination</li>
                      <li>• <strong>Emotional:</strong> Mood, creativity, sensitivity, relationships</li>
                      <li>• <strong>Intellectual:</strong> Logic, analysis, memory, decision-making</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your birth date and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Biorhythm Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your date of birth</p>
                    <p>Select your birth date from the calendar. Your biorhythm cycles start from the day you were born.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Choose a target date (optional)</p>
                    <p>Leave as today for current readings, or select a future date to plan ahead for important events.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review your cycle positions</p>
                    <p>See where each cycle stands and get an overall day rating to help plan your activities.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Biorhythm Cycle Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Cycle</th>
                      <th className="text-left py-3 px-2 font-semibold">Duration</th>
                      <th className="text-left py-3 px-2 font-semibold">Governs</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Physical</td>
                      <td className="py-3 px-2">23 days</td>
                      <td className="py-3 px-2">Energy, strength, coordination, health</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Emotional</td>
                      <td className="py-3 px-2">28 days</td>
                      <td className="py-3 px-2">Mood, creativity, empathy, relationships</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Intellectual</td>
                      <td className="py-3 px-2">33 days</td>
                      <td className="py-3 px-2">Logic, memory, analysis, decision-making</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Intuitive</td>
                      <td className="py-3 px-2">38 days</td>
                      <td className="py-3 px-2">Instinct, perception, awareness</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Aesthetic</td>
                      <td className="py-3 px-2">43 days</td>
                      <td className="py-3 px-2">Appreciation of beauty, artistic sense</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Biorhythm Theory
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Are Biorhythms?</h4>
                  <p>
                    Biorhythm theory proposes that human performance follows predictable sine wave cycles starting
                    at birth. Each cycle oscillates between positive and negative phases, with critical days occurring
                    when the cycle crosses the zero line. The theory originated in the late 1800s with German physician
                    Wilhelm Fliess and Austrian psychologist Hermann Swoboda.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Three Primary Cycles</h4>
                  <p>
                    The physical cycle (23 days) affects stamina, coordination, and physical well-being. The emotional
                    cycle (28 days) influences mood, creativity, and social interactions. The intellectual cycle
                    (33 days) governs analytical thinking, memory, and logical reasoning. These cycles run independently
                    and combine to create your overall daily state.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Critical Days</h4>
                  <p>
                    When a cycle crosses from positive to negative (or vice versa), that day is considered critical.
                    Performance may be unpredictable, and errors more likely. Some people report more accidents or
                    mistakes on critical days, though scientific evidence is limited.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Using Biorhythm Data
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Schedule important tasks on peak days</p>
                    <p>Plan presentations, exams, or competitions when your intellectual and physical cycles are high.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Take extra care on critical days</p>
                    <p>When cycles cross zero, be more cautious with driving, machinery, or important decisions.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use low phases for recovery</p>
                    <p>Physical low days are good for rest. Emotional lows can be times for reflection and planning.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Track your own patterns</p>
                    <p>Keep a journal to see if biorhythm predictions match your actual experience. Everyone is different.</p>
                  </div>
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
                  <h4 className="font-medium text-foreground mb-2">Are biorhythms scientifically proven?</h4>
                  <p>
                    Biorhythm theory is considered pseudoscience by most researchers. Controlled studies have not
                    consistently supported its predictions. However, many people find value in tracking their cycles
                    as a form of self-awareness, similar to mood tracking or journaling.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What does a negative cycle mean?</h4>
                  <p>
                    Negative doesn't mean bad — it means the cycle is in its releasing or resting phase. Physical
                    negative might mean lower energy but better flexibility. Emotional negative could mean more
                    introspection. Use low phases appropriately rather than fearing them.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can I improve my biorhythm scores?</h4>
                  <p>
                    You cannot change the cycle timing — they are fixed from birth. However, you can work with your
                    cycles rather than against them. Rest during physical lows, plan creative work during emotional
                    highs, and tackle complex problems during intellectual peaks.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What are double critical days?</h4>
                  <p>
                    Double critical days occur when two cycles cross zero on the same day. Triple critical days
                    (all three crossing) are rare. These days are thought to be especially unpredictable. Some
                    people report more accidents or mistakes on these days.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why is my overall day rating different from individual cycles?</h4>
                  <p>
                    The overall rating averages all three cycles. You might have one cycle peaking while another is
                    low, resulting in an average day. Pay attention to individual cycles for specific activities —
                    use physical peaks for exercise, intellectual peaks for studying, and emotional peaks for
                    social events.
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
