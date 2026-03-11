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

  const loadExample = (start: string, end: string) => {
    setStartTime(start);
    setEndTime(end);
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
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("09:00", "17:30")}>9:00 - 17:30</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("09:00", "17:00")}>Work day</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("22:00", "06:00")}>Overnight</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("08:30", "16:45")}>8:30 - 16:45</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("19:00", "23:30")}>Evening shift</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("00:00", "23:59")}>Full day</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("14:00", "18:15")}>2 PM meeting</Button>
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

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Understanding Time Duration Calculations</h2>
          <p className="text-muted-foreground">
            Time duration calculations find the elapsed time between two clock times. This is different from converting time units – here you're measuring the span between a start and end time. It's essential for scheduling, payroll, project planning, and tracking work hours.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            The tricky part is overnight durations – when the end time is after midnight. If you start work at 10 PM and finish at 6 AM, that's 8 hours, not -16 hours! This calculator automatically handles overnight calculations by adding 24 hours when needed.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Calculate Time Duration</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Same Day Calculation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              When both times are on the same day, simply subtract start from end.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
              17:30 - 09:00 = 8 hours 30 minutes
            </code>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Overnight Calculation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              When end time is after midnight, add 24 hours to the end time.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
              06:00 + 24:00 = 30:00<br />
              30:00 - 22:00 = 8 hours
            </code>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Converting to Decimal</h4>
            <p className="text-sm text-muted-foreground mb-2">
              For payroll or billing, convert minutes to decimal hours.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
              8h 30m = 8 + 30/60 = 8.5 hours
            </code>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">12-Hour Format</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Convert AM/PM to 24-hour format for calculation.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
              2:00 PM = 14:00<br />
              12:00 AM = 00:00
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Standard work day</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Calculate duration from 9:00 AM to 5:30 PM
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Convert to 24-hour: 09:00 to 17:30
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              17:30 - 09:00 = 8 hours 30 minutes
            </p>
            <p className="text-sm text-muted-foreground">
              Decimal: 8.5 hours. Total minutes: 510.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Night shift</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Calculate duration from 10:00 PM to 6:00 AM (next day)
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Convert to 24-hour: 22:00 to 06:00
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              End is before start, so add 24 hours: 06:00 + 24:00 = 30:00
            </p>
            <p className="text-sm text-muted-foreground">
              30:00 - 22:00 = 8 hours. This is an overnight shift.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Meeting duration</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: A meeting runs from 2:15 PM to 4:45 PM. How long?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: 14:15 to 16:45
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              16:45 - 14:15 = 2 hours 30 minutes
            </p>
            <p className="text-sm text-muted-foreground">
              Decimal: 2.5 hours. Total minutes: 150.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Full day calculation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: How many hours from midnight to 11:59 PM?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: 00:00 to 23:59
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              23:59 - 00:00 = 23 hours 59 minutes
            </p>
            <p className="text-sm text-muted-foreground">
              Just 1 minute short of 24 hours. Total: 1,439 minutes.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Payroll calculation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Employee works 8:30 AM to 12:00 PM, then 1:00 PM to 5:15 PM. Total hours?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Morning: 08:30 to 12:00 = 3h 30m
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Afternoon: 13:00 to 17:15 = 4h 15m
            </p>
            <p className="text-sm text-muted-foreground">
              Total: 7h 45m = 7.75 hours for payroll.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm">
            The concept of dividing the day into 24 hours comes from ancient Egypt around 1500 BCE. They used sundials that divided daylight into 12 hours. Night was also divided into 12 hours based on star positions. The 60-minute hour and 60-second minute came from Babylonian base-60 mathematics, later adopted by Greek astronomers.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Time Duration Reference</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Standard Work Day</h4>
            <p className="text-sm text-muted-foreground mb-2">
              9:00 AM to 5:00 PM
            </p>
            <p className="text-lg font-bold">8 hours</p>
            <p className="text-xs text-muted-foreground">480 minutes</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Full Shift</h4>
            <p className="text-sm text-muted-foreground mb-2">
              8:00 AM to 4:30 PM
            </p>
            <p className="text-lg font-bold">8.5 hours</p>
            <p className="text-xs text-muted-foreground">510 minutes</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Night Shift</h4>
            <p className="text-sm text-muted-foreground mb-2">
              11:00 PM to 7:00 AM
            </p>
            <p className="text-lg font-bold">8 hours</p>
            <p className="text-xs text-muted-foreground">480 minutes</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">School Day</h4>
            <p className="text-sm text-muted-foreground mb-2">
              8:00 AM to 3:00 PM
            </p>
            <p className="text-lg font-bold">7 hours</p>
            <p className="text-xs text-muted-foreground">420 minutes</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Movie Length</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Typical feature film
            </p>
            <p className="text-lg font-bold">2 hours</p>
            <p className="text-xs text-muted-foreground">120 minutes</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">TV Episode</h4>
            <p className="text-sm text-muted-foreground mb-2">
              With commercials (1 hour slot)
            </p>
            <p className="text-lg font-bold">~42 minutes</p>
            <p className="text-xs text-muted-foreground">Actual content time</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate hours for payroll?</h4>
            <p className="text-sm text-muted-foreground">
              Calculate the duration, then convert to decimal hours. Divide minutes by 60 and add to hours. For example, 7h 45m = 7 + 45/60 = 7.75 hours. Multiply by hourly rate for pay.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if I work through midnight?</h4>
            <p className="text-sm text-muted-foreground">
              This calculator handles overnight shifts automatically. If end time is earlier than start time (like 22:00 to 06:00), it adds 24 hours to calculate the correct duration across midnight.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I subtract lunch break?</h4>
            <p className="text-sm text-muted-foreground">
              Calculate total time at work, then subtract break time separately. For example: 9:00-17:00 is 8 hours. Subtract 30-minute lunch = 7.5 hours worked.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I calculate duration across multiple days?</h4>
            <p className="text-sm text-muted-foreground">
              This calculator handles single overnight periods (up to 24 hours). For multi-day durations, calculate each day separately and add them up, or use a date/time calculator that handles full dates.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between duration and time of day?</h4>
            <p className="text-sm text-muted-foreground">
              Time of day is a specific moment (3:00 PM). Duration is a span of time (3 hours). You subtract two times of day to get a duration. Duration is measured in hours/minutes; time of day is shown on a clock.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How accurate is this calculator?</h4>
            <p className="text-sm text-muted-foreground">
              It calculates to the second. Enter times with minute precision (HH:MM) and get results in hours, minutes, and seconds. For time clock applications, this level of precision is more than sufficient.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/time-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Time Converter</p>
            <p className="text-xs text-muted-foreground">Convert time units</p>
          </a>
          <a href="/math-tools/date-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Date Calculator</p>
            <p className="text-xs text-muted-foreground">Date calculations</p>
          </a>
          <a href="/math-tools/hours-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Hours Calculator</p>
            <p className="text-xs text-muted-foreground">Work hours tracking</p>
          </a>
        </div>
      </section>
    </div>
  );
}
