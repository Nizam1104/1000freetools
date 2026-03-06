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
        <h2 className="text-2xl font-semibold">Time Duration Calculation</h2>
        <p className="text-muted-foreground">
          This calculator finds the elapsed time between two clock times. It automatically handles overnight durations where the end time is on the following day (e.g., 10 PM to 6 AM).
        </p>
        <p className="text-muted-foreground">
          Results are provided in multiple formats: hours/minutes/seconds, total minutes, total seconds, and decimal hours for easy use in calculations.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Time Format Reference</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">24-Hour Format (Military Time)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 00:00 = Midnight</li>
              <li>• 09:00 = 9:00 AM</li>
              <li>• 12:00 = Noon</li>
              <li>• 17:00 = 5:00 PM</li>
              <li>• 23:59 = 11:59 PM</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">12-Hour Format (AM/PM)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 12:00 AM = Midnight</li>
              <li>• 9:00 AM = Morning</li>
              <li>• 12:00 PM = Noon</li>
              <li>• 5:00 PM = Evening</li>
              <li>• 11:59 PM = Night</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Time Durations</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Work Schedules</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Standard workday: 9:00 AM - 5:00 PM = 8 hours<br />
              Extended shift: 8:00 AM - 6:00 PM = 10 hours<br />
              Night shift: 10:00 PM - 6:00 AM = 8 hours (overnight)
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Meeting Durations</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Quick standup: 15 minutes<br />
              Standard meeting: 1 hour<br />
              Workshop: 2-4 hours<br />
              Conference: 6-8 hours
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Time Conversions</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              1 hour = 60 minutes = 3,600 seconds<br />
              1.5 hours = 90 minutes<br />
              2.25 hours = 2h 15m<br />
              100 minutes = 1h 40m
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Applications</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Payroll & Timesheets</h3>
            <p className="text-sm text-muted-foreground">
              Calculate work hours for employee timesheets and payroll processing.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Project Management</h3>
            <p className="text-sm text-muted-foreground">
              Track time spent on tasks and estimate project durations.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Travel Planning</h3>
            <p className="text-sm text-muted-foreground">
              Calculate flight durations and travel time between destinations.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Event Planning</h3>
            <p className="text-sm text-muted-foreground">
              Schedule event segments and calculate total event duration.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I calculate overnight duration?</h3>
            <p className="text-sm text-muted-foreground">
              The calculator automatically detects when end time is earlier than start time and adds 24 hours. For example, 10 PM to 6 AM = 8 hours.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is decimal hours?</h3>
            <p className="text-sm text-muted-foreground">
              Decimal hours express time as a decimal number. For example, 1 hour 30 minutes = 1.5 hours. Useful for calculations and payroll.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can I calculate durations over multiple days?</h3>
            <p className="text-sm text-muted-foreground">
              This calculator handles overnight (next day) durations. For multiple days, multiply the daily duration by the number of days.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I convert minutes to hours?</h3>
            <p className="text-sm text-muted-foreground">
              Divide minutes by 60. For example, 150 minutes ÷ 60 = 2.5 hours (or 2 hours 30 minutes).
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/time-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Time Converter</p>
            <p className="text-xs text-muted-foreground">Convert units</p>
          </a>
          <a href="/math-tools/date-difference-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Date Difference</p>
            <p className="text-xs text-muted-foreground">Days between</p>
          </a>
          <a href="/math-tools/hours-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Hours Calculator</p>
            <p className="text-xs text-muted-foreground">Work hours</p>
          </a>
        </div>
      </section>
    </div>
  );
}
