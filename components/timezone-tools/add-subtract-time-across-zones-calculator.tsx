"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Clock, Plus, Minus, Calculator } from "lucide-react";

const timezones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
];

export default function AddSubtractTimeAcrossZonesCalculator() {
  const [baseTimezone, setBaseTimezone] = useState("UTC");
  const [baseDate, setBaseDate] = useState("");
  const [baseTime, setBaseTime] = useState("12:00");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [days, setDays] = useState("0");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [targetTimezone, setTargetTimezone] = useState("America/New_York");
  const [result, setResult] = useState<{
    originalTime: string;
    adjustedTime: string;
    targetTime: string;
    timeDifference: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculateTime = useCallback(() => {
    if (!baseDate || !baseTime) return;

    // Create base date in the base timezone
    const baseDateTime = new Date(`${baseDate}T${baseTime}:00`);
    
    // Add or subtract time
    const daysToAdd = operation === "add" ? parseInt(days) || 0 : -(parseInt(days) || 0);
    const hoursToAdd = operation === "add" ? parseInt(hours) || 0 : -(parseInt(hours) || 0);
    const minutesToAdd = operation === "add" ? parseInt(minutes) || 0 : -(parseInt(minutes) || 0);

    const adjustedDateTime = new Date(
      baseDateTime.getTime() +
        daysToAdd * 24 * 60 * 60 * 1000 +
        hoursToAdd * 60 * 60 * 1000 +
        minutesToAdd * 60 * 1000
    );

    // Format original time in base timezone
    const originalTime = new Intl.DateTimeFormat("en-US", {
      timeZone: baseTimezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(baseDateTime);

    // Format adjusted time in base timezone
    const adjustedTime = new Intl.DateTimeFormat("en-US", {
      timeZone: baseTimezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(adjustedDateTime);

    // Format in target timezone
    const targetTime = new Intl.DateTimeFormat("en-US", {
      timeZone: targetTimezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(adjustedDateTime);

    // Calculate time difference between base and target timezone
    const baseOffset = -baseDateTime.getTimezoneOffset() / 60;
    const targetOffsetStr = new Intl.DateTimeFormat("en-US", {
      timeZone: targetTimezone,
      timeZoneName: "shortOffset",
    }).formatToParts(adjustedDateTime);
    const targetOffsetPart = targetOffsetStr.find((p) => p.type === "timeZoneName")?.value || "";
    
    setResult({
      originalTime,
      adjustedTime,
      targetTime,
      timeDifference: targetOffsetPart,
    });
  }, [baseTimezone, baseDate, baseTime, operation, days, hours, minutes, targetTimezone]);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      const text = `Time Calculation Result

Original Time (${baseTimezone}):
${result.originalTime}

After ${operation} ${days} days, ${hours} hours, ${minutes} minutes:
${result.adjustedTime}

In ${targetTimezone}:
${result.targetTime}

Timezone Offset: ${result.timeDifference}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, baseTimezone, targetTimezone, operation, days, hours, minutes]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Add/Subtract Time Across Zones Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="baseTimezone">Base Timezone</Label>
              <select
                id="baseTimezone"
                value={baseTimezone}
                onChange={(e) => setBaseTimezone(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="baseDate">Base Date</Label>
              <Input
                id="baseDate"
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="baseTime">Base Time</Label>
              <Input
                id="baseTime"
                type="time"
                value={baseTime}
                onChange={(e) => setBaseTime(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <Label className="mb-3 block">Add or Subtract Time</Label>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={operation === "add" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setOperation("add")}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  variant={operation === "subtract" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setOperation("subtract")}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="ml-2 font-medium">
                  {operation === "add" ? "Add" : "Subtract"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-20"
                  min="0"
                />
                <span>Days</span>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-20"
                  min="0"
                  max="23"
                />
                <span>Hours</span>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="w-20"
                  min="0"
                  max="59"
                />
                <span>Minutes</span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="targetTimezone">Target Timezone</Label>
            <select
              id="targetTimezone"
              value={targetTimezone}
              onChange={(e) => setTargetTimezone(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md bg-background"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          <Button onClick={calculateTime} className="w-full">
            <Clock className="w-4 h-4 mr-2" />
            Calculate
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <Label>Original Time</Label>
                <p className="text-lg font-semibold mt-2">{result.originalTime}</p>
                <p className="text-sm text-muted-foreground">{baseTimezone}</p>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg">
                <Label>Adjusted Time</Label>
                <p className="text-lg font-semibold mt-2">{result.adjustedTime}</p>
                <p className="text-sm text-muted-foreground">
                  {baseTimezone} ({operation} {days}d {hours}h {minutes}m)
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <Label>Time in Target Timezone</Label>
                <p className="text-lg font-semibold mt-2">{result.targetTime}</p>
                <p className="text-sm text-muted-foreground">{targetTimezone}</p>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                Copy Results
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
