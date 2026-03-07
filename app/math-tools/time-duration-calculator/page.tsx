"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TimeDurationCalculator() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [format, setFormat] = useState<"12" | "24">("24");
  const [result, setResult] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    totalMinutes: number;
    totalSeconds: number;
    decimalHours: number;
    formatted: string;
    isOvernight: boolean;
  } | null>(null);
  const [error, setError] = useState("");

  const parseTime = (timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const calculateDuration = () => {
    if (!startTime || !endTime) {
      setError("Please enter both start and end times");
      setResult(null);
      return;
    }

    try {
      const start = parseTime(startTime);
      const end = parseTime(endTime);

      let diffMs = end.getTime() - start.getTime();
      let isOvernight = false;

      // Handle overnight (end time is next day)
      if (diffMs < 0) {
        diffMs += 24 * 60 * 60 * 1000;
        isOvernight = true;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(diffMs / (1000 * 60));
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      const decimalHours = diffMs / (1000 * 60 * 60);

      setResult({
        hours,
        minutes,
        seconds,
        totalMinutes,
        totalSeconds,
        decimalHours: Math.round(decimalHours * 100) / 100,
        formatted: `${hours}h ${minutes}m ${seconds}s`,
        isOvernight,
      });
      setError("");
    } catch (e) {
      setError("Error calculating duration. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setStartTime("");
    setEndTime("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setStartTime("09:00");
    setEndTime("17:30");
    setResult(null);
  };

  const loadWorkDay = () => {
    setStartTime("09:00");
    setEndTime("17:00");
    setResult(null);
  };

  const loadOvernight = () => {
    setStartTime("22:00");
    setEndTime("06:00");
    setResult(null);
  };

  const formatTimeDisplay = (timeStr: string): string => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":").map(Number);
    
    if (format === "12") {
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    }
    return timeStr;
  };

  const formatDuration = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Time Duration Calculator – Calculate Time Between Two Times</h1>
        <p className="text-muted-foreground">
          Calculate the duration between any two times with our free online time calculator. Find hours, minutes, and seconds between start and end times, including overnight calculations.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Label>Start Time</Label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            {startTime && (
              <p className="text-xs text-muted-foreground mt-1">
                {formatTimeDisplay(startTime)}
              </p>
            )}
          </div>
          <div className="flex-1">
            <Label>End Time</Label>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            {endTime && (
              <p className="text-xs text-muted-foreground mt-1">
                {formatTimeDisplay(endTime)}
              </p>
            )}
          </div>
          <div>
            <Label>Format</Label>
            <Select value={format} onValueChange={(v) => setFormat(v as "12" | "24")}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24">24-hour</SelectItem>
                <SelectItem value="12">12-hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateDuration}>Calculate Duration</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>9:00 - 17:30</Button>
          <Button variant="outline" onClick={loadWorkDay}>Work Day</Button>
          <Button variant="outline" onClick={loadOvernight}>Overnight</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Time Duration
                {result.isOvernight && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded text-xs">
                    Overnight
                  </span>
                )}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-primary">{result.hours}</span>
                <span className="text-xl text-muted-foreground">hours</span>
                <span className="text-5xl font-bold text-primary ml-4">{result.minutes}</span>
                <span className="text-xl text-muted-foreground">minutes</span>
                <span className="text-5xl font-bold text-primary ml-4">{result.seconds}</span>
                <span className="text-xl text-muted-foreground">seconds</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {formatTimeDisplay(startTime || "")} → {formatTimeDisplay(endTime || "")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.totalMinutes.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Minutes</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.totalSeconds.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Seconds</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.decimalHours}</p>
                <p className="text-sm text-muted-foreground">Decimal Hours</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Duration in Different Formats</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HH:MM:SS:</span>
                  <span className="font-mono font-semibold">
                    {result.hours.toString().padStart(2, "0")}:{result.minutes.toString().padStart(2, "0")}:{result.seconds.toString().padStart(2, "0")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hours:Minutes:</span>
                  <span className="font-mono font-semibold">{formatDuration(result.totalMinutes)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Decimal:</span>
                  <span className="font-mono font-semibold">{result.decimalHours} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minutes only:</span>
                  <span className="font-mono font-semibold">{result.totalMinutes} min</span>
                </div>
              </div>
            </div>

            {result.isOvernight && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  <strong>Note:</strong> End time is after midnight (next day). Duration calculated including the day change.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
