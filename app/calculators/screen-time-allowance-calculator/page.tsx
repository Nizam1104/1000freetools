"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

interface ScreenTimeAllowance {
  age: number;
  dailyLimit: number;
  weeklyLimit: number;
  breakdown: {
    educational: number;
    entertainment: number;
    social: number;
  };
  guidelines: string[];
  recommendations: string[];
}

export default function ScreenTimeAllowanceCalculatorPage() {
  const [childAge, setChildAge] = useState<string>("");
  const [schoolDays, setSchoolDays] = useState<string>("5");
  const [result, setResult] = useState<ScreenTimeAllowance | null>(null);

  const calculate = () => {
    const ageNum = parseInt(childAge) || 0;
    const schoolDaysNum = parseInt(schoolDays) || 5;

    if (ageNum === 0) return;

    let dailyLimit = 0;
    let breakdown = { educational: 0, entertainment: 0, social: 0 };
    let guidelines: string[] = [];
    let recommendations: string[] = [];

    if (ageNum < 2) {
      dailyLimit = 0;
      guidelines = [
        "AAP recommends no screen time (except video calls)",
        "Focus on interactive play and human interaction",
        "Screen time can interfere with brain development",
      ];
      recommendations = [
        "📵 Avoid all screens except video calls with family",
        "🧸 Prioritize physical play and exploration",
        "📚 Read books together instead of screens",
      ];
    } else if (ageNum < 5) {
      dailyLimit = 60; // 1 hour max
      breakdown = { educational: 45, entertainment: 15, social: 0 };
      guidelines = [
        "Limit to 1 hour per day of high-quality content",
        "Co-view with child to help them understand",
        "Choose educational, age-appropriate content",
      ];
      recommendations = [
        "📺 Use parental controls and time limits",
        "👨‍👩‍👧 Watch together and discuss content",
        "🎓 Prioritize educational apps (PBS Kids, Khan Academy Kids)",
        "🚫 No screens 1 hour before bedtime",
      ];
    } else if (ageNum < 7) {
      dailyLimit = 90; // 1.5 hours
      breakdown = { educational: 45, entertainment: 30, social: 15 };
      guidelines = [
        "Consistent limits on screen time",
        "Ensure screens don't replace sleep, physical activity",
        "Designate screen-free times (meals, bedtime)",
      ];
      recommendations = [
        "⏰ Set clear daily limits and stick to them",
        "🍽️ Keep meals screen-free for family time",
        "🏃 Ensure 1+ hour of outdoor play daily",
        "📱 Use screen time tracking apps",
      ];
    } else if (ageNum < 10) {
      dailyLimit = 120; // 2 hours
      breakdown = { educational: 40, entertainment: 40, social: 20 };
      guidelines = [
        "2 hours max recreational screen time",
        "Homework/educational use is separate",
        "Monitor content and online interactions",
      ];
      recommendations = [
        "📋 Create a family media plan together",
        "🎮 Balance gaming with other activities",
        "🔒 Use parental controls for content filtering",
        "💬 Talk about online safety regularly",
      ];
    } else if (ageNum < 13) {
      dailyLimit = 150; // 2.5 hours
      breakdown = { educational: 30, entertainment: 50, social: 40 };
      guidelines = [
        "Balance screens with other activities",
        "Monitor social media use carefully",
        "Discuss digital citizenship",
      ];
      recommendations = [
        "📱 Consider a basic phone before smartphone",
        "🌐 Teach critical thinking about online content",
        "⏰ Set device curfew (no phones in bedroom)",
        "👥 Monitor social media for cyberbullying",
      ];
    } else if (ageNum < 16) {
      dailyLimit = 180; // 3 hours
      breakdown = { educational: 25, entertainment: 50, social: 45 };
      guidelines = [
        "Focus on healthy habits over strict limits",
        "Discuss responsible social media use",
        "Watch for signs of problematic use",
      ];
      recommendations = [
        "🤝 Negotiate limits together for buy-in",
        "📊 Use screen time reports to self-monitor",
        "🚫 No phones during homework or after 10pm",
        "💪 Encourage offline hobbies and sports",
      ];
    } else {
      dailyLimit = 210; // 3.5 hours
      breakdown = { educational: 20, entertainment: 50, social: 50 };
      guidelines = [
        "Prepare for adult self-regulation",
        "Discuss long-term impacts of screen habits",
        "Model healthy screen behavior",
      ];
      recommendations = [
        "🎯 Help them set their own limits",
        "💼 Discuss professional screen use boundaries",
        "😴 Emphasize sleep hygiene",
        "🧘 Teach mindfulness about tech use",
      ];
    }

    // Adjust for school days vs weekends
    const weekendBonus = ageNum >= 7 ? 30 : 0;
    const weeklyLimit = (dailyLimit * schoolDaysNum) + ((dailyLimit + weekendBonus) * (7 - schoolDaysNum));

    setResult({
      age: ageNum,
      dailyLimit,
      weeklyLimit: Math.round(weeklyLimit),
      breakdown,
      guidelines,
      recommendations,
    });
  };

  const reset = () => {
    setChildAge("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Screen-Time Allowance Calculator – Set Healthy Screen Time Limits for Kids
          </h1>
          <p className="text-muted-foreground">
            Set healthy digital boundaries for your children with our Screen-Time Allowance Calculator.
            Enter your child&apos;s age to get evidence-based daily screen time recommendations from
            AAP guidelines — broken down by content type.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="child-age">Child&apos;s Age (years)</Label>
                <Input
                  id="child-age"
                  type="number"
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  placeholder="e.g., 8"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="school-days">School Days per Week</Label>
                <Input
                  id="school-days"
                  type="number"
                  min="0"
                  max="7"
                  value={schoolDays}
                  onChange={(e) => setSchoolDays(e.target.value)}
                  placeholder="5"
                />
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Age Group Quick Reference:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 0-2 years: No screens (video calls OK)</li>
                  <li>• 2-5 years: 1 hour/day max</li>
                  <li>• 6-12 years: 2 hours/day recreational</li>
                  <li>• 13+ years: Focus on healthy habits</li>
                </ul>
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
              <h3 className="text-lg font-semibold mb-4">Screen Time Recommendations</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Daily Limit (Age {result.age})</p>
                    <p className="text-4xl font-bold text-primary">{result.dailyLimit} min</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {Math.floor(result.dailyLimit / 60)}h {result.dailyLimit % 60}m per day
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Weekly Limit</span>
                      <span className="font-semibold">{result.weeklyLimit} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Weekend Bonus</span>
                      <span className="font-semibold">
                        {result.age >= 7 ? "+30 min" : "None"}
                      </span>
                    </div>
                  </div>

                  {result.dailyLimit > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Suggested Breakdown</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">📚 Educational</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(result.breakdown.educational / result.dailyLimit) * 100}%` }} />
                            </div>
                            <span className="text-sm font-medium w-12 text-right">{result.breakdown.educational}m</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">🎮 Entertainment</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(result.breakdown.entertainment / result.dailyLimit) * 100}%` }} />
                            </div>
                            <span className="text-sm font-medium w-12 text-right">{result.breakdown.entertainment}m</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">💬 Social</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(result.breakdown.social / result.dailyLimit) * 100}%` }} />
                            </div>
                            <span className="text-sm font-medium w-12 text-right">{result.breakdown.social}m</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Guidelines</h4>
                    <ul className="space-y-1">
                      {result.guidelines.map((guideline, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{guideline}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your child&apos;s age and click Calculate to see recommendations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                AAP Screen Time Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  The American Academy of Pediatrics recommends:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>0-18 months:</strong> No screens except video chatting
                  </li>
                  <li>
                    <strong>18-24 months:</strong> Limited high-quality content with parent
                  </li>
                  <li>
                    <strong>2-5 years:</strong> 1 hour/day of high-quality programming
                  </li>
                  <li>
                    <strong>6+ years:</strong> Consistent limits, ensure screens don&apos;t
                    replace sleep, physical activity, and other healthy behaviors
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Create a Family Media Plan at healthychildren.org
                  to set personalized guidelines for your family.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
