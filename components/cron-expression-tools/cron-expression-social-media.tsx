"use client";

import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Copy,
  Check,
  Share2,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

export default function CronExpressionSocialMedia() {
  const [selectedPlatform, setSelectedPlatform] = useState<
    "twitter" | "facebook" | "instagram" | "linkedin" | "all"
  >("all");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customTimes, setCustomTimes] = useState<
    { hour: string; minute: string }[]
  >([{ hour: "10", minute: "0" }]);
  const [weekdaysOnly, setWeekdaysOnly] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  const socialTemplates = useMemo(
    () => [
      {
        id: "morning_post",
        name: "Morning Post",
        platforms: ["twitter", "facebook", "instagram", "linkedin"],
        cron: "0 10 * * *",
        schedule: "Daily at 10:00 AM",
        description: "Morning engagement peak",
        bestFor: "News, updates, motivational content",
      },
      {
        id: "lunch_post",
        name: "Lunch Hour Post",
        platforms: ["twitter", "facebook", "instagram"],
        cron: "0 12 * * *",
        schedule: "Daily at 12:00 PM",
        description: "Lunch break browsing",
        bestFor: "Light content, promotions, engagement",
      },
      {
        id: "evening_post",
        name: "Evening Post",
        platforms: ["twitter", "facebook", "instagram", "linkedin"],
        cron: "0 18 * * *",
        schedule: "Daily at 6:00 PM",
        description: "After work engagement",
        bestFor: "Recaps, entertainment, discussions",
      },
      {
        id: "weekday_morning",
        name: "Weekday Morning",
        platforms: ["linkedin", "twitter"],
        cron: "0 9 * * 1-5",
        schedule: "Weekdays at 9:00 AM",
        description: "Business hours start",
        bestFor: "Professional content, B2B",
      },
      {
        id: "weekday_afternoon",
        name: "Weekday Afternoon",
        platforms: ["twitter", "linkedin"],
        cron: "0 14 * * 1-5",
        schedule: "Weekdays at 2:00 PM",
        description: "Afternoon engagement",
        bestFor: "Industry news, articles",
      },
      {
        id: "weekday_evening",
        name: "Weekday Evening",
        platforms: ["facebook", "instagram"],
        cron: "0 19 * * 1-5",
        schedule: "Weekdays at 7:00 PM",
        description: "Prime evening time",
        bestFor: "Visual content, stories",
      },
      {
        id: "weekend_morning",
        name: "Weekend Morning",
        platforms: ["instagram", "facebook"],
        cron: "0 10 * * 0,6",
        schedule: "Weekends at 10:00 AM",
        description: "Lazy weekend browsing",
        bestFor: "Lifestyle, entertainment",
      },
      {
        id: "three_times_daily",
        name: "Three Times Daily",
        platforms: ["twitter", "instagram"],
        cron: "0 10,14,18 * * *",
        schedule: "10 AM, 2 PM, 6 PM daily",
        description: "Maximum daily coverage",
        bestFor: "High-frequency accounts",
      },
      {
        id: "business_hours",
        name: "Business Hours",
        platforms: ["linkedin", "twitter"],
        cron: "0 9-17 * * 1-5",
        schedule: "Every hour, 9 AM - 5 PM, weekdays",
        description: "Full business day coverage",
        bestFor: "News accounts, live updates",
      },
      {
        id: "weekly_roundup",
        name: "Weekly Roundup",
        platforms: ["linkedin", "facebook"],
        cron: "0 15 * * 5",
        schedule: "Fridays at 3:00 PM",
        description: "End of week summary",
        bestFor: "Weekly recaps, highlights",
      },
      {
        id: "hourly_twitter",
        name: "Hourly Twitter",
        platforms: ["twitter"],
        cron: "0 * * * *",
        schedule: "Every hour",
        description: "Maximum frequency",
        bestFor: "News, real-time updates",
      },
      {
        id: "instagram_stories",
        name: "Instagram Stories",
        platforms: ["instagram"],
        cron: "0 8,12,17,21 * * *",
        schedule: "8 AM, 12 PM, 5 PM, 9 PM",
        description: "Story posting schedule",
        bestFor: "Daily stories, behind-the-scenes",
      },
    ],
    [],
  );

  const applyTemplate = useCallback((template: (typeof socialTemplates)[0]) => {
    setSelectedTemplate(template.id);
  }, []);

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  const filteredTemplates = useMemo(() => {
    if (selectedPlatform === "all") return socialTemplates;
    return socialTemplates.filter((t) =>
      t.platforms.includes(selectedPlatform),
    );
  }, [selectedPlatform, socialTemplates]);

  const generateCustomCron = useMemo(() => {
    const times = customTimes.map((t) => `0 ${t.minute} ${t.hour}`).join(",");
    const dayPart = weekdaysOnly ? "1-5" : "*";
    return `${times} * * ${dayPart}`;
  }, [customTimes, weekdaysOnly]);

  const platformIcons = {
    twitter: Twitter,
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
  } as const

  type Platform = keyof typeof platformIcons

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="size-5" />
            CRON for Social Media Posting
          </CardTitle>
          <CardDescription>
            Optimal posting schedules for Twitter, Facebook, Instagram, and
            LinkedIn
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Platform Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Platform</CardTitle>
          <CardDescription>
            Filter templates by social media platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-5 gap-3">
            <Button
              variant={selectedPlatform === "all" ? "default" : "outline"}
              onClick={() => setSelectedPlatform("all")}
            >
              All Platforms
            </Button>
            {(["twitter", "facebook", "instagram", "linkedin"] as const).map(
              (platform) => {
                const Icon = platformIcons[platform];
                return (
                  <Button
                    key={platform}
                    variant={
                      selectedPlatform === platform ? "default" : "outline"
                    }
                    onClick={() => setSelectedPlatform(platform)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="size-4" />
                    <span className="capitalize">{platform}</span>
                  </Button>
                );
              },
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Posting Templates</TabsTrigger>
          <TabsTrigger value="custom">Custom Schedule</TabsTrigger>
          <TabsTrigger value="best-times">Best Posting Times</TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => {
              const isSelected = selectedTemplate === template.id;
              return (
                <Card
                  key={template.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    isSelected && "ring-2 ring-primary",
                  )}
                  onClick={() => applyTemplate(template)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      {template.platforms.map((p) => {
                        const Icon = platformIcons[p as Platform];
                        return (
                          <Icon
                            key={p}
                            className={cn(
                              "size-4",
                              selectedPlatform !== "all" &&
                                selectedPlatform !== p &&
                                "opacity-30",
                            )}
                          />
                        );
                      })}
                    </div>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="flex items-center justify-between mb-1">
                        <code className="font-mono text-sm font-medium">
                          {template.cron}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(template.cron, template.id);
                          }}
                        >
                          {copied === template.id ? (
                            <Check className="size-3" />
                          ) : (
                            <Copy className="size-3" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {template.schedule}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Best for:</span>{" "}
                      {template.bestFor}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Custom Schedule Tab */}
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Posting Schedule</CardTitle>
              <CardDescription>
                Create a custom posting schedule for your social media
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="weekdays"
                  checked={weekdaysOnly}
                  onCheckedChange={(checked) =>
                    setWeekdaysOnly(checked as boolean)
                  }
                />
                <Label htmlFor="weekdays">
                  Weekdays only (Monday - Friday)
                </Label>
              </div>

              <div className="space-y-3">
                <Label>Posting Times</Label>
                {customTimes.map((time, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Select
                      value={time.hour}
                      onValueChange={(value) => {
                        const newTimes = [...customTimes];
                        newTimes[idx].hour = value;
                        setCustomTimes(newTimes);
                      }}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i === 0
                              ? "12 AM"
                              : i < 12
                                ? `${i} AM`
                                : i === 12
                                  ? "12 PM"
                                  : `${i - 12} PM`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="text-muted-foreground">:</span>
                    <Select
                      value={time.minute}
                      onValueChange={(value) => {
                        const newTimes = [...customTimes];
                        newTimes[idx].minute = value;
                        setCustomTimes(newTimes);
                      }}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["00", "15", "30", "45"].map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={customTimes.length === 1}
                      onClick={() =>
                        setCustomTimes(customTimes.filter((_, i) => i !== idx))
                      }
                    >
                      ×
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCustomTimes([
                      ...customTimes,
                      { hour: "12", minute: "0" },
                    ])
                  }
                >
                  + Add Time
                </Button>
              </div>

              <div className="rounded-lg border bg-muted/30 p-4">
                <Label>Generated CRON Expression</Label>
                <div className="flex items-center gap-2 mt-2">
                  <code className="flex-1 font-mono text-lg p-3 rounded-lg bg-background border">
                    {generateCustomCron}
                  </code>
                  <Button
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(generateCustomCron, "custom")
                    }
                  >
                    {copied === "custom" ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Best Times Tab */}
        <TabsContent value="best-times" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Best Posting Times by Platform</CardTitle>
              <CardDescription>
                Research-backed optimal posting times for maximum engagement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  platform: "Twitter",
                  icon: Twitter,
                  times: [
                    { time: "8-10 AM", description: "Morning commute" },
                    { time: "12-1 PM", description: "Lunch break" },
                    { time: "5-6 PM", description: "Evening commute" },
                  ],
                  bestDays: "Wednesday, Friday",
                  frequency: "3-5 times per day",
                },
                {
                  platform: "Facebook",
                  icon: Facebook,
                  times: [
                    { time: "9-10 AM", description: "Morning check-in" },
                    { time: "1-3 PM", description: "Afternoon break" },
                    { time: "7-8 PM", description: "Evening relaxation" },
                  ],
                  bestDays: "Thursday, Friday, Weekend",
                  frequency: "1-2 times per day",
                },
                {
                  platform: "Instagram",
                  icon: Instagram,
                  times: [
                    { time: "8-9 AM", description: "Morning scroll" },
                    { time: "12-1 PM", description: "Lunch browsing" },
                    { time: "7-9 PM", description: "Prime evening time" },
                  ],
                  bestDays: "Tuesday, Wednesday, Friday",
                  frequency: "1-3 times per day",
                },
                {
                  platform: "LinkedIn",
                  icon: Linkedin,
                  times: [
                    { time: "8-10 AM", description: "Before work" },
                    { time: "12 PM", description: "Lunch break" },
                    { time: "5-6 PM", description: "After work" },
                  ],
                  bestDays: "Tuesday, Wednesday, Thursday",
                  frequency: "1 time per day",
                },
              ].map((platform, idx) => {
                const Icon = platform.icon;
                return (
                  <div key={idx} className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="size-5" />
                      <h4 className="font-medium">{platform.platform}</h4>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4 mb-3">
                      {platform.times.map((time, i) => (
                        <div key={i} className="p-2 rounded bg-muted/50">
                          <p className="font-mono text-sm font-medium">
                            {time.time}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {time.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>
                        <strong>Best days:</strong> {platform.bestDays}
                      </span>
                      <span>
                        <strong>Frequency:</strong> {platform.frequency}
                      </span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>General Social Media Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-green-50 dark:bg-green-950/20">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                    Best Practices
                  </h4>
                  <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                    <li>• Post consistently at the same times</li>
                    <li>• Test different times for your audience</li>
                    <li>• Consider your audience's time zone</li>
                    <li>• Use scheduling tools for consistency</li>
                    <li>• Analyze engagement metrics regularly</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg border bg-amber-50 dark:bg-amber-950/20">
                  <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
                    Things to Avoid
                  </h4>
                  <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                    <li>• Posting too frequently (spam)</li>
                    <li>• Posting very late at night</li>
                    <li>• Ignoring platform-specific norms</li>
                    <li>• Inconsistent posting schedule</li>
                    <li>• Not adjusting for holidays/events</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
