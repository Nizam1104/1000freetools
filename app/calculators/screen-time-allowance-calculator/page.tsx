"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";

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

        {/* How It Works Section */}
        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6">How to Use This Calculator</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">1</div>
                  <h4 className="font-semibold mb-2">Enter Child&apos;s Age</h4>
                  <p className="text-sm text-muted-foreground">Input your child&apos;s age to get age-appropriate screen time recommendations.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">2</div>
                  <h4 className="font-semibold mb-2">Set School Days</h4>
                  <p className="text-sm text-muted-foreground">Specify how many school days per week to calculate weekly limits accurately.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">3</div>
                  <h4 className="font-semibold mb-2">Get Personalized Guidelines</h4>
                  <p className="text-sm text-muted-foreground">Receive daily limits, content breakdown, and expert recommendations instantly.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">AAP-Based Guidelines</h4>
                    <p className="text-sm text-muted-foreground">Recommendations aligned with American Academy of Pediatrics screen time guidelines.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Content Breakdown</h4>
                    <p className="text-sm text-muted-foreground">Suggested time allocation for educational, entertainment, and social content.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Age-Specific Advice</h4>
                    <p className="text-sm text-muted-foreground">Tailored recommendations from toddlers (0-2) through teenagers (16+).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Weekend Adjustments</h4>
                    <p className="text-sm text-muted-foreground">Automatic bonus time calculation for weekends and non-school days.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-6">
          <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What are the recommended screen time limits by age?",
    answer: "AAP recommends: 0-18 months no screens (except video calls), 18-24 months limited high-quality content, 2-5 years max 1 hour/day, 6+ years consistent limits ensuring screens don&apos;t replace sleep and physical activity.",
  },
{
    question: "Is educational screen time counted in the limit?",
    answer: "For younger children (under 5), educational content with parental co-viewing is encouraged within the limit. For school-age children, homework-related screen time is typically separate from recreational limits.",
  },
{
    question: "How can I enforce screen time limits?",
    answer: "Use parental controls, set device curfews, create a family media plan, keep bedrooms screen-free, and model healthy screen habits yourself. Consistency is key.",
  },
{
    question: "What are the signs of too much screen time?",
    answer: "Watch for sleep problems, eye strain, irritability when devices are removed, declining grades, reduced physical activity, and social withdrawal.",
  },
{
    question: "Should I allow screens before bedtime?",
    answer: "No. Experts recommend no screens 1-2 hours before bedtime. Blue light suppresses melatonin and can significantly disrupt sleep quality and duration.",
  }
  ]} />
</section>
        </div>

        {/* Related Tools Section */}
        <div className="mt-6">
        </div>
      </div>
    </div>
  );
}
