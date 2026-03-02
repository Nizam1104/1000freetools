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
                      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
                        restrictions.includes(item.id)
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
                  <div className={`p-4 rounded-lg text-center ${
                    result.duration >= 48 ? "bg-green-100 dark:bg-green-900/20" :
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
                About Dopamine Detox
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Dopamine detox involves temporarily avoiding high-stimulation activities
                  to reset your brain&apos;s reward system and reduce dependency on instant
                  gratification.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>4+ hours:</strong> Mini-detox for quick reset
                  </li>
                  <li>
                    <strong>24 hours:</strong> Full day detox - recommended starting point
                  </li>
                  <li>
                    <strong>48-72 hours:</strong> Extended detox for deeper reset
                  </li>
                  <li>
                    <strong>7 days:</strong> Complete lifestyle reset
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Start small and build up. The goal isn&apos;t
                  perfection but increased awareness of your habits and triggers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
