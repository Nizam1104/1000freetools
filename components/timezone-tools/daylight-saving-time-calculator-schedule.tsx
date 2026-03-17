"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Copy, Check, Sun, Moon } from "lucide-react";

interface DSTSchedule {
  timezone: string;
  dstStart: string;
  dstEnd: string;
  isCurrentlyDST: boolean;
  daysUntilChange: number;
  nextChange: string;
  offsetStandard: string;
  offsetDaylight: string;
}

const dstRules: Record<string, { start: string; end: string; standardOffset: string; daylightOffset: string }> = {
  "America/New_York": {
    start: "Second Sunday in March",
    end: "First Sunday in November",
    standardOffset: "UTC-5",
    daylightOffset: "UTC-4",
  },
  "America/Chicago": {
    start: "Second Sunday in March",
    end: "First Sunday in November",
    standardOffset: "UTC-6",
    daylightOffset: "UTC-5",
  },
  "America/Los_Angeles": {
    start: "Second Sunday in March",
    end: "First Sunday in November",
    standardOffset: "UTC-8",
    daylightOffset: "UTC-7",
  },
  "Europe/London": {
    start: "Last Sunday in March",
    end: "Last Sunday in October",
    standardOffset: "UTC+0",
    daylightOffset: "UTC+1",
  },
  "Europe/Paris": {
    start: "Last Sunday in March",
    end: "Last Sunday in October",
    standardOffset: "UTC+1",
    daylightOffset: "UTC+2",
  },
  "Europe/Berlin": {
    start: "Last Sunday in March",
    end: "Last Sunday in October",
    standardOffset: "UTC+1",
    daylightOffset: "UTC+2",
  },
  "Australia/Sydney": {
    start: "First Sunday in October",
    end: "First Sunday in April",
    standardOffset: "UTC+10",
    daylightOffset: "UTC+11",
  },
  "Pacific/Auckland": {
    start: "Last Sunday in September",
    end: "First Sunday in April",
    standardOffset: "UTC+12",
    daylightOffset: "UTC+13",
  },
};

export default function DaylightSavingTimeCalculatorSchedule() {
  const [selectedTimezone, setSelectedTimezone] = useState("America/New_York");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [dstSchedule, setDstSchedule] = useState<DSTSchedule | null>(null);
  const [copied, setCopied] = useState(false);

  const getNthSundayOfMonth = useCallback((year: number, month: number, n: number, isLast = false): Date => {
    let date: Date;
    if (isLast) {
      // Last Sunday of the month
      date = new Date(year, month + 1, 0); // Last day of month
      while (date.getDay() !== 0) {
        date.setDate(date.getDate() - 1);
      }
    } else {
      // Nth Sunday of the month
      date = new Date(year, month, 1);
      let count = 0;
      while (count < n) {
        if (date.getDay() === 0) {
          count++;
          if (count === n) break;
        }
        date.setDate(date.getDate() + 1);
      }
    }
    date.setHours(2, 0, 0, 0); // 2:00 AM
    return date;
  }, []);

  const calculateDSTSchedule = useCallback(() => {
    const currentYear = parseInt(year);
    const rules = dstRules[selectedTimezone];

    if (!rules) {
      setDstSchedule(null);
      return;
    }

    let startDate: Date;
    let endDate: Date;

    // Parse start rule
    if (rules.start.includes("Second")) {
      startDate = getNthSundayOfMonth(currentYear, 2, 2); // March (0-indexed)
    } else if (rules.start.includes("Last")) {
      startDate = getNthSundayOfMonth(currentYear, 2, 0, true);
    } else if (rules.start.includes("First")) {
      startDate = getNthSundayOfMonth(currentYear, 9, 1); // October
    } else {
      startDate = new Date(currentYear, 2, 1);
    }

    // Parse end rule
    if (rules.end.includes("First")) {
      endDate = getNthSundayOfMonth(currentYear, 10, 1); // November
      if (endDate.getMonth() !== 10) {
        endDate = getNthSundayOfMonth(currentYear, 3, 0, true); // April for Southern hemisphere
      }
    } else if (rules.end.includes("Last")) {
      endDate = getNthSundayOfMonth(currentYear, 9, 0, true); // October
    } else {
      endDate = new Date(currentYear, 10, 1);
    }

    const now = new Date();
    const isDST = now >= startDate && now < endDate;

    const nextChange = isDST ? endDate : startDate;
    const daysUntilChange = Math.ceil((nextChange.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    const schedule: DSTSchedule = {
      timezone: selectedTimezone,
      dstStart: startDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      dstEnd: endDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      isCurrentlyDST: isDST,
      daysUntilChange: Math.max(0, daysUntilChange),
      nextChange: nextChange.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      offsetStandard: rules.standardOffset,
      offsetDaylight: rules.daylightOffset,
    };

    setDstSchedule(schedule);
  }, [selectedTimezone, year, getNthSundayOfMonth]);

  const copyToClipboard = useCallback(async () => {
    if (!dstSchedule) return;
    try {
      const text = `DST Schedule for ${dstSchedule.timezone} (${year})

DST Start: ${dstSchedule.dstStart}
DST End: ${dstSchedule.dstEnd}
Currently in DST: ${dstSchedule.isCurrentlyDST ? "Yes" : "No"}
Days until next change: ${dstSchedule.daysUntilChange}
Next change: ${dstSchedule.nextChange}
Standard Offset: ${dstSchedule.offsetStandard}
Daylight Offset: ${dstSchedule.offsetDaylight}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [dstSchedule, year]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="w-5 h-5" />
            Daylight Saving Time Calculator & Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                {Object.keys(dstRules).map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={calculateDSTSchedule} className="w-full">
            <Calendar className="w-4 h-4 mr-2" />
            Calculate DST Schedule
          </Button>

          {dstSchedule && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${dstSchedule.isCurrentlyDST ? "bg-green-50 dark:bg-green-950" : "bg-blue-50 dark:bg-blue-950"}`}>
                <div className="flex items-center gap-2 mb-2">
                  {dstSchedule.isCurrentlyDST ? (
                    <Sun className="w-5 h-5 text-green-600" />
                  ) : (
                    <Moon className="w-5 h-5 text-blue-600" />
                  )}
                  <p className="font-semibold">
                    Currently in DST: {dstSchedule.isCurrentlyDST ? "Yes" : "No"}
                  </p>
                </div>
                <p className="text-sm">
                  {dstSchedule.isCurrentlyDST
                    ? `Using ${dstSchedule.offsetDaylight} offset`
                    : `Using ${dstSchedule.offsetStandard} offset`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <Label className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    DST Start
                  </Label>
                  <p className="text-lg font-semibold mt-2">{dstSchedule.dstStart}</p>
                  <p className="text-sm text-muted-foreground">Clocks spring forward 1 hour</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Label className="flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    DST End
                  </Label>
                  <p className="text-lg font-semibold mt-2">{dstSchedule.dstEnd}</p>
                  <p className="text-sm text-muted-foreground">Clocks fall back 1 hour</p>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Next Time Change
                </Label>
                <p className="text-lg font-semibold mt-2">{dstSchedule.nextChange}</p>
                <p className="text-sm text-muted-foreground">
                  In {dstSchedule.daysUntilChange} days
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg text-center">
                  <Label>Standard Time</Label>
                  <p className="text-xl font-bold mt-1">{dstSchedule.offsetStandard}</p>
                </div>
                <div className="p-3 border rounded-lg text-center">
                  <Label>Daylight Time</Label>
                  <p className="text-xl font-bold mt-1">{dstSchedule.offsetDaylight}</p>
                </div>
              </div>

              <div className="relative">
                <Button variant="outline" onClick={copyToClipboard} className="w-full">
                  {copied ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  Copy Schedule
                </Button>
              </div>
            </div>
          )}

          <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg text-sm">
            <p className="font-semibold mb-2">Note:</p>
            <p className="text-muted-foreground">
              DST rules vary by country and may change. Some regions do not observe DST.
              Always verify with local authorities for official DST schedules.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
