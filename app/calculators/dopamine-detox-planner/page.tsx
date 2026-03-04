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

interface DopamineResult {
  duration: number;
  restrictions: string[];
  alternatives: string[];
  benefits: string[];
  difficultyLevel: string;
  recommendations: string[];
}

export default function DopamineDetoxPlannerPage() {
  const [duration, setDuration] = useState<string>("1");
  const [durationUnit, setDurationUnit] = useState<string>("day");
  const [restrictions, setRestrictions] = useState<string[]>(["social_media", "games"]);
  const [result, setResult] = useState<DopamineResult | null>(null);

  const toggleRestriction = (item: string) => {
    if (restrictions.includes(item)) {
      setRestrictions(restrictions.filter(r => r !== item));
    } else {
      setRestrictions([...restrictions, item]);
    }
  };

  const calculate = () => {
    const durationNum = parseFloat(duration) || 1;
    const totalHours = durationUnit === "day" ? durationNum * 24 : durationNum;

    // Restrictions list
    const restrictionLabels: Record<string, string> = {
      social_media: "Social Media",
      games: "Video Games",
      streaming: "Streaming/Netflix",
      junk_food: "Junk Food",
      shopping: "Online Shopping",
      porn: "Adult Content",
      news: "News/Reddit",
      phone: "Smartphone (except calls)",
    };

    const activeRestrictions = restrictions.map(r => restrictionLabels[r] || r);

    // Alternatives
    const alternatives = [
      "📖 Reading physical books",
      "🚶 Walking in nature",
      "🧘 Meditation or journaling",
      "💪 Exercise or yoga",
      "🎨 Creative hobbies (drawing, writing)",
      "👥 Face-to-face conversations",
      "🍳 Cooking healthy meals",
      "😴 Adequate sleep",
    ];

    // Benefits based on duration
    const benefits: string[] = [];
    if (totalHours >= 4) {
      benefits.push("🧠 Improved focus and concentration");
    }
    if (totalHours >= 12) {
      benefits.push("😴 Better sleep quality");
    }
    if (totalHours >= 24) {
      benefits.push("🎯 Increased motivation for meaningful tasks");
      benefits.push("📉 Reduced craving for instant gratification");
    }
    if (totalHours >= 48) {
      benefits.push("🔄 Reset dopamine sensitivity");
      benefits.push("💡 Enhanced creativity and problem-solving");
    }
    if (totalHours >= 72) {
      benefits.push("🧘 Improved emotional regulation");
      benefits.push("📈 Long-term habit reset");
    }

    // Difficulty level
    let difficultyLevel = "";
    if (restrictions.length <= 2 && totalHours < 12) {
      difficultyLevel = "🟢 Beginner - Good for first-timers";
    } else if (restrictions.length <= 4 && totalHours < 24) {
      difficultyLevel = "🟡 Intermediate - Moderate challenge";
    } else if (restrictions.length <= 6 && totalHours < 48) {
      difficultyLevel = "🟠 Advanced - Significant commitment";
    } else {
      difficultyLevel = "🔴 Expert - Full dopamine reset";
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`⏱️ Duration: ${durationNum} ${durationUnit}(s)`);
    recommendations.push(`🚫 Restrictions: ${activeRestrictions.length} items`);

    if (totalHours < 4) {
      recommendations.push("⏱️ Consider extending to at least 4 hours for benefits");
    }

    if (restrictions.length < 3) {
      recommendations.push("📝 Consider adding more restrictions for better results");
    }

    recommendations.push("📵 Remove temptations from your environment");
    recommendations.push("📝 Write down your reasons for doing this detox");
    recommendations.push("👥 Tell someone about your plan for accountability");
    recommendations.push("🔄 Plan your post-detox habits carefully");

    setResult({
      duration: totalHours,
      restrictions: activeRestrictions,
      alternatives,
      benefits,
      difficultyLevel,
      recommendations,
    });
  };

  const reset = () => {
    setDuration("1");
    setRestrictions(["social_media", "games"]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Dopamine Detox Planner – Plan a Digital Detox & Reset Your Dopamine Levels
          </h1>
          <p className="text-muted-foreground">
            Reset your reward system with our Dopamine Detox Planner. Schedule activity
            restrictions, set detox duration, and plan healthy low-stimulation alternatives
            to break addictive cycles and restore your natural motivation and focus.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="1"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={durationUnit} onValueChange={setDurationUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hour">Hours</SelectItem>
                      <SelectItem value="day">Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Activities to Avoid</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "social_media", label: "📱 Social Media" },
                    { id: "games", label: "🎮 Video Games" },
                    { id: "streaming", label: "📺 Streaming" },
                    { id: "junk_food", label: "🍔 Junk Food" },
                    { id: "shopping", label: "🛒 Shopping" },
                    { id: "porn", label: "🔞 Adult Content" },
                    { id: "news", label: "📰 News/Reddit" },
                    { id: "phone", label: "📱 Smartphone" },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${restrictions.includes(item.id)
                          ? "bg-primary/10 border border-primary"
                          : "bg-muted/50 border border-transparent"
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={restrictions.includes(item.id)}
                        onChange={() => toggleRestriction(item.id)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{item.label}</span>
                    </label>
                  ))}
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
              <h3 className="text-lg font-semibold mb-4">Detox Plan</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${result.duration >= 48 ? "bg-green-100 dark:bg-green-900/20" :
                      result.duration >= 24 ? "bg-blue-100 dark:bg-blue-900/20" :
                        result.duration >= 12 ? "bg-amber-100 dark:bg-amber-900/20" :
                          "bg-muted"
                    }`}>
                    <p className="text-sm text-muted-foreground">Detox Duration</p>
                    <p className="text-3xl font-bold">{result.duration} hours</p>
                    <p className="text-sm mt-1">{result.difficultyLevel}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Restrictions</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.restrictions.map((r, i) => (
                        <span key={i} className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded text-sm">
                          🚫 {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Expected Benefits</h4>
                    <ul className="space-y-1">
                      {result.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span>✅</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Healthy Alternatives</h4>
                    <ul className="space-y-1">
                      {result.alternatives.slice(0, 5).map((alt, i) => (
                        <li key={i} className="text-sm">{alt}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Select restrictions and click Create Plan</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Dopamine Detox Planner
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set your detox duration</p>
                    <p>Choose how long you want to detox. Beginners should start with 4-12 hours. A full 24-hour detox is recommended for meaningful results. Extended detoxes of 48-72 hours provide deeper resets.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select activities to avoid</p>
                    <p>Check the high-stimulation activities you want to abstain from. Common choices include social media, video games, streaming services, and junk food. More restrictions create a stronger detox effect.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click Create Plan to generate your detox</p>
                    <p>You will see your detox duration, difficulty level, expected benefits, healthy alternatives, and tips for success during your dopamine reset.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Dopamine Detox Duration Guide
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Duration</th>
                      <th className="text-left py-3 px-2 font-semibold">Level</th>
                      <th className="text-left py-3 px-2 font-semibold">Best For</th>
                      <th className="text-left py-3 px-2 font-semibold">Expected Benefits</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">4 hours</td>
                      <td className="py-3 px-2">Mini</td>
                      <td className="py-3 px-2">First-timers, busy schedules</td>
                      <td className="py-3 px-2">Brief mental reset, improved focus</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">12 hours</td>
                      <td className="py-3 px-2">Beginner</td>
                      <td className="py-3 px-2">Weekend mornings</td>
                      <td className="py-3 px-2">Better sleep quality, reduced cravings</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">24 hours</td>
                      <td className="py-3 px-2">Standard</td>
                      <td className="py-3 px-2">Full day detox</td>
                      <td className="py-3 px-2">Reset motivation, clearer thinking</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">48 hours</td>
                      <td className="py-3 px-2">Advanced</td>
                      <td className="py-3 px-2">Deep reset</td>
                      <td className="py-3 px-2">Dopamine sensitivity reset, creativity boost</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">72 hours</td>
                      <td className="py-3 px-2">Expert</td>
                      <td className="py-3 px-2">Habit transformation</td>
                      <td className="py-3 px-2">Long-term habit reset, emotional regulation</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">7 days</td>
                      <td className="py-3 px-2">Master</td>
                      <td className="py-3 px-2">Lifestyle change</td>
                      <td className="py-3 px-2">Complete system reset, new baseline</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Start with shorter durations and work your way up. Consistency matters more than length.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Dopamine Detox
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is a Dopamine Detox?</h4>
                  <p>
                    A dopamine detox is a period of time where you intentionally avoid high-stimulation activities that trigger dopamine release. The goal is not to eliminate dopamine, which is impossible and unhealthy, but to reduce your dependence on instant gratification and reset your reward system. Think of it as a palate cleanser for your brain.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Dopamine Matters</h4>
                  <p>
                    Dopamine is the motivation chemical. It drives you to pursue goals, seek rewards, and take action. When you constantly flood your brain with easy dopamine from scrolling, gaming, or binge-watching, your baseline dopamine levels drop. This makes normal activities feel boring and reduces your motivation for meaningful work.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Signs You Need a Detox</h4>
                  <p>
                    You might benefit from a dopamine detox if you find yourself reaching for your phone without thinking, unable to focus on tasks for more than a few minutes, feeling bored during quiet moments, or losing interest in hobbies that used to bring joy. These are signs of overstimulation.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Happens During a Detox</h4>
                  <p>
                    In the first few hours, you will feel restless and reach for distractions automatically. This is withdrawal. By hour 12 to 24, the mental noise quiets down. After 24 hours, many people report clearer thinking, increased motivation for meaningful tasks, and a renewed appreciation for simple activities like walking or reading.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for a Successful Dopamine Detox
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Prepare Your Environment</p>
                    <p>Remove temptations before you start. Delete social media apps, unplug the TV, put your phone in another room. Make high-dopamine activities inconvenient to access. Set up your space with books, journals, and healthy alternatives.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Plan Low-Stimulation Activities</p>
                    <p>Have a list ready: reading physical books, walking in nature, journaling, meditation, cooking simple meals, light exercise, face-to-face conversations. Boredom is part of the process. Let yourself be bored without reaching for stimulation.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Tell Someone About Your Plan</p>
                    <p>Accountability helps. Tell a friend or family member about your detox. They can check in on you and provide support. Some people do group detoxes together, which makes it easier to stay committed.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Plan Your Re-Entry Carefully</p>
                    <p>The day after your detox matters. Do not immediately return to all your old habits. Reintroduce technology and stimulation gradually. Keep the practices that felt good during the detox, like morning walks or reading before bed.</p>
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
                  <h4 className="font-medium text-foreground mb-2">Is dopamine detox scientifically proven?</h4>
                  <p>
                    The term dopamine detox is not a clinical diagnosis, but the underlying concept has scientific support. Research shows that excessive exposure to high-reward stimuli can downregulate dopamine receptors. Periods of reduced stimulation allow receptors to recover. The practice combines elements of cognitive behavioral therapy and mindfulness.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How long should a dopamine detox last?</h4>
                  <p>
                    For beginners, start with 4 to 12 hours. A full 24-hour detox provides noticeable benefits for most people. Extended detoxes of 48 to 72 hours offer deeper resets but require more commitment. The best duration is one you can complete consistently. Weekly mini-detoxes often work better than occasional long ones.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can I work during a dopamine detox?</h4>
                  <p>
                    Yes, but limit work to essential tasks only. Avoid multitasking and constant email checking. Use work as a focused activity rather than a distraction. If your job requires heavy computer or phone use, consider doing your detox on a weekend or day off.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What activities are allowed during a detox?</h4>
                  <p>
                    Low-stimulation activities are encouraged: walking, reading physical books, journaling, meditation, light exercise, cooking, cleaning, face-to-face conversations, and spending time in nature. The key is avoiding activities designed to hijack your attention with rapid rewards.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How often should I do a dopamine detox?</h4>
                  <p>
                    Many people benefit from a weekly mini-detox of 4 to 12 hours, such as a screen-free Sunday morning. A full 24-hour detox once a month provides a deeper reset. Listen to your body. If you feel constantly overstimulated, increase frequency. If you feel balanced, maintain with occasional detoxes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Related Tools
              </h3>
              <div className="space-y-2 text-sm">
                <a
                  href="/calculators/meditation-timer-scheduler"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Meditation Timer and Scheduler</span>
                  <p className="text-muted-foreground">Build a consistent meditation practice with guided timers</p>
                </a>
                <a
                  href="/calculators/screen-time-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Screen Time Calculator</span>
                  <p className="text-muted-foreground">Track and understand your daily screen usage</p>
                </a>
                <a
                  href="/calculators/sleep-cycle-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Sleep Cycle Calculator</span>
                  <p className="text-muted-foreground">Plan optimal sleep times for better rest</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
