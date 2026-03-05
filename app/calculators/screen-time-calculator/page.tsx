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

interface AgeGroup {
  name: string;
  recommendedMax: number; // hours per day
  description: string;
}

const ageGroups: AgeGroup[] = [
  { name: "Toddler (2-4)", recommendedMax: 1, description: "Limited educational content only" },
  { name: "Child (5-7)", recommendedMax: 2, description: "Supervised recreational use" },
  { name: "Child (8-12)", recommendedMax: 2.5, description: "Balanced with other activities" },
  { name: "Teen (13-17)", recommendedMax: 3.5, description: "Monitor for healthy balance" },
  { name: "Adult (18+)", recommendedMax: 5, description: "Self-regulate for wellness" },
];

interface ScreenActivityResult {
  activity: string;
  duration: number;
  eyeStrainLevel: "low" | "medium" | "high";
  healthImpact: string;
}

interface ScreenTimeResult {
  totalHours: number;
  recommendedMax: number;
  percentageOfMax: number;
  status: "under" | "at" | "over";
  dailyBreakdown: ScreenActivityResult[];
  weeklyAverage: number;
  healthRecommendations: string[];
  eyeStrainRisk: string;
}

export default function ScreenTimeCalculatorPage() {
  const [ageGroup, setAgeGroup] = useState<string>("Adult (18+)");
  const [weekdayHours, setWeekdayHours] = useState<string>("4");
  const [weekendHours, setWeekendHours] = useState<string>("6");
  const [activities, setActivities] = useState<Array<{ type: string; hours: string }>>([
    { type: "work", hours: "2" },
    { type: "entertainment", hours: "1" },
    { type: "social", hours: "1" },
  ]);
  const [result, setResult] = useState<ScreenTimeResult | null>(null);

  const activityTypes = [
    { value: "work", label: "Work/Study" },
    { value: "entertainment", label: "Entertainment (TV, movies, games)" },
    { value: "social", label: "Social Media" },
    { value: "reading", label: "E-reading" },
    { value: "other", label: "Other" },
  ];

  const addActivity = () => {
    setActivities([...activities, { type: "other", hours: "0" }]);
  };

  const removeActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const updateActivity = (index: number, field: "type" | "hours", value: string) => {
    const newActivities = [...activities];
    newActivities[index] = { ...newActivities[index], [field]: value };
    setActivities(newActivities);
  };

  const calculate = () => {
    const weekday = parseFloat(weekdayHours) || 0;
    const weekend = parseFloat(weekendHours) || 0;

    // Calculate weekly average
    const weeklyTotal = (weekday * 5) + (weekend * 2);
    const weeklyAverage = weeklyTotal / 7;

    // Get recommended max for age group
    const ageData = ageGroups.find((a) => a.name === ageGroup);
    const recommendedMax = ageData?.recommendedMax || 5;

    // Calculate percentage of max
    const percentageOfMax = (weeklyAverage / recommendedMax) * 100;

    // Determine status
    let status: "under" | "at" | "over" = "under";
    if (percentageOfMax >= 120) status = "over";
    else if (percentageOfMax >= 90) status = "at";

    // Generate activity breakdown
    const dailyBreakdown: ScreenActivityResult[] = activities.map((activity) => {
      const hours = parseFloat(activity.hours) || 0;
      let eyeStrainLevel: "low" | "medium" | "high" = "medium";
      let healthImpact = "";

      if (activity.type === "work") {
        eyeStrainLevel = hours > 4 ? "high" : "medium";
        healthImpact = "Take 20-20-20 breaks every 20 minutes";
      } else if (activity.type === "entertainment") {
        eyeStrainLevel = hours > 3 ? "high" : "medium";
        healthImpact = "Consider blue light filters in evening";
      } else if (activity.type === "social") {
        eyeStrainLevel = "medium";
        healthImpact = "Set time limits to prevent doomscrolling";
      } else if (activity.type === "reading") {
        eyeStrainLevel = "low";
        healthImpact = "Use e-ink or warm light settings";
      } else {
        eyeStrainLevel = "medium";
        healthImpact = "Monitor for eye fatigue";
      }

      return {
        activity: activityTypes.find((t) => t.value === activity.type)?.label || activity.type,
        duration: hours,
        eyeStrainLevel,
        healthImpact,
      };
    });

    // Generate health recommendations
    const healthRecommendations: string[] = [];
    if (percentageOfMax > 100) {
      healthRecommendations.push("Consider reducing daily screen time by 30-60 minutes");
      healthRecommendations.push("Schedule screen-free activities daily");
    }
    if (weekday > 4) {
      healthRecommendations.push("Take regular breaks using the 20-20-20 rule");
    }
    healthRecommendations.push("Avoid screens 1 hour before bedtime");
    healthRecommendations.push("Use blue light filters in the evening");
    healthRecommendations.push("Maintain proper posture and screen distance");

    // Eye strain risk assessment
    let eyeStrainRisk = "Low";
    if (weeklyAverage > 6) eyeStrainRisk = "High";
    else if (weeklyAverage > 4) eyeStrainRisk = "Moderate";

    setResult({
      totalHours: parseFloat(weeklyAverage.toFixed(1)),
      recommendedMax: recommendedMax,
      percentageOfMax: parseFloat(percentageOfMax.toFixed(0)),
      status,
      dailyBreakdown,
      weeklyAverage: parseFloat(weeklyAverage.toFixed(1)),
      healthRecommendations,
      eyeStrainRisk,
    });
  };

  const reset = () => {
    setWeekdayHours("4");
    setWeekendHours("6");
    setActivities([
      { type: "work", hours: "2" },
      { type: "entertainment", hours: "1" },
      { type: "social", hours: "1" },
    ]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Screen Time Calculator – Track & Manage Your Digital Wellness
          </h1>
          <p className="text-muted-foreground">
            Monitor your daily screen exposure and get personalized recommendations for
            healthier digital habits. Enter your age and daily screen usage to see how
            you compare to recommended guidelines and get tips for better digital wellness.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age-group">Age Group</Label>
                <Select value={ageGroup} onValueChange={setAgeGroup}>
                  <SelectTrigger id="age-group">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ageGroups.map((age) => (
                      <SelectItem key={age.name} value={age.name}>
                        {age.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="weekday">Weekday (hours/day)</Label>
                  <Input
                    id="weekday"
                    type="number"
                    value={weekdayHours}
                    onChange={(e) => setWeekdayHours(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="weekend">Weekend (hours/day)</Label>
                  <Input
                    id="weekend"
                    type="number"
                    value={weekendHours}
                    onChange={(e) => setWeekendHours(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Activity Breakdown (optional)</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addActivity}>
                    + Add
                  </Button>
                </div>

                <div className="space-y-2">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex gap-2">
                      <Select
                        value={activity.type}
                        onValueChange={(value) => updateActivity(index, "type", value)}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {activityTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        value={activity.hours}
                        onChange={(e) => updateActivity(index, "hours", e.target.value)}
                        className="w-20"
                        placeholder="hrs"
                      />
                      {activities.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeActivity(index)}
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
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
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${result.status === "over" ? "bg-red-100 dark:bg-red-900/20" :
                      result.status === "at" ? "bg-amber-100 dark:bg-amber-900/20" :
                        "bg-green-100 dark:bg-green-900/20"
                    }`}>
                    <p className="text-sm text-muted-foreground">Daily Average</p>
                    <p className="text-3xl font-bold">{result.totalHours} hrs</p>
                    <p className={`text-sm mt-1 ${result.status === "over" ? "text-red-700 dark:text-red-300" :
                        result.status === "at" ? "text-amber-700 dark:text-amber-300" :
                          "text-green-700 dark:text-green-300"
                      }`}>
                      {result.percentageOfMax}% of recommended max ({result.recommendedMax} hrs)
                    </p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Weekly Average</span>
                      <span className="font-semibold">{result.weeklyAverage} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Eye Strain Risk</span>
                      <span className={`font-semibold ${result.eyeStrainRisk === "High" ? "text-red-600" :
                          result.eyeStrainRisk === "Moderate" ? "text-amber-600" :
                            "text-green-600"
                        }`}>
                        {result.eyeStrainRisk}
                      </span>
                    </div>
                  </div>

                  {result.dailyBreakdown.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Activity Breakdown</h4>
                      <div className="space-y-1">
                        {result.dailyBreakdown.map((item, i) => (
                          <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                            <span>{item.activity}</span>
                            <span>{item.duration}h ({item.eyeStrainLevel} strain)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1 text-sm">
                      {result.healthRecommendations.slice(0, 4).map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your screen time and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6">How the Screen Time Calculator Works</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">1</div>
                  <h4 className="font-semibold mb-2">Enter Your Usage</h4>
                  <p className="text-sm text-muted-foreground">Input weekday and weekend screen hours, plus breakdown by activity type.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">2</div>
                  <h4 className="font-semibold mb-2">Select Age Group</h4>
                  <p className="text-sm text-muted-foreground">Choose your age category to compare against recommended guidelines.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex-items-center justify-center text-xl font-bold mb-3">3</div>
                  <h4 className="font-semibold mb-2">Get Health Insights</h4>
                  <p className="text-sm text-muted-foreground">Receive personalized recommendations and eye strain risk assessment.</p>
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
                    <h4 className="font-semibold text-sm">Activity Breakdown</h4>
                    <p className="text-sm text-muted-foreground">Track work, entertainment, social media, and reading separately for detailed insights.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Eye Strain Assessment</h4>
                    <p className="text-sm text-muted-foreground">Get risk level evaluation based on your total daily screen exposure.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Guideline Comparison</h4>
                    <p className="text-sm text-muted-foreground">See how your usage compares to age-appropriate health recommendations.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Status Indicators</h4>
                    <p className="text-sm text-muted-foreground">Visual feedback shows if you&apos;re under, at, or over recommended limits.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1">What is considered excessive screen time?</h4>
                  <p className="text-sm text-muted-foreground">For adults, 6+ hours daily is associated with health risks. The 20-20-20 rule (every 20 minutes, look 20 feet away for 20 seconds) helps reduce eye strain regardless of total time.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">How does screen time affect sleep?</h4>
                  <p className="text-sm text-muted-foreground">Blue light from screens suppresses melatonin production, delaying sleep onset and reducing sleep quality. Avoid screens 1-2 hours before bed for better rest.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">What are symptoms of digital eye strain?</h4>
                  <p className="text-sm text-muted-foreground">Common symptoms include dry eyes, blurred vision, headaches, neck and shoulder pain, and difficulty focusing. Take regular breaks and adjust screen brightness.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Is work screen time different from entertainment?</h4>
                  <p className="text-sm text-muted-foreground">Yes, work screen time tends to be more focused with breaks, while entertainment often involves longer continuous sessions. Both contribute to total exposure and eye strain.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">How can I reduce screen time health effects?</h4>
                  <p className="text-sm text-muted-foreground">Use the 20-20-20 rule, enable blue light filters, maintain proper posture, adjust screen brightness to ambient light, and schedule regular screen-free activities.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Tools Section */}
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Related Health Tools</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/calculators/sleep-cycle-calculator" className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <h4 className="font-semibold text-sm mb-1">Sleep Cycle Calculator</h4>
                  <p className="text-sm text-muted-foreground">Optimize your sleep schedule for better rest and recovery.</p>
                </a>
                <a href="/calculators/meditation-timer-scheduler" className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <h4 className="font-semibold text-sm mb-1">Meditation Timer & Scheduler</h4>
                  <p className="text-sm text-muted-foreground">Build mindfulness habits to counter digital stress.</p>
                </a>
                <a href="/calculators/breathing-exercise-timer" className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <h4 className="font-semibold text-sm mb-1">Breathing Exercise Timer</h4>
                  <p className="text-sm text-muted-foreground">Take healthy breaks with guided breathing exercises.</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
