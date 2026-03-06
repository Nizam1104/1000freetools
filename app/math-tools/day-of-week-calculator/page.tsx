"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DayOfWeekCalculator() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<{
    dayOfWeek: string;
    dayNumber: number;
    isWeekend: boolean;
    dayOfYear: number;
    weekNumber: number;
    quarter: number;
  } | null>(null);
  const [error, setError] = useState("");

  const calculateDayOfWeek = () => {
    if (!date) {
      setError("Please enter a date");
      setResult(null);
      return;
    }

    try {
      const inputDate = new Date(date);
      if (isNaN(inputDate.getTime())) {
        setError("Invalid date format");
        setResult(null);
        return;
      }

      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayIndex = inputDate.getDay();
      
      const startOfYear = new Date(inputDate.getFullYear(), 0, 1);
      const dayOfYear = Math.floor((inputDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      const weekNumber = Math.ceil(dayOfYear / 7);
      
      const month = inputDate.getMonth();
      const quarter = Math.floor(month / 3) + 1;

      setResult({
        dayOfWeek: days[dayIndex],
        dayNumber: dayIndex,
        isWeekend: dayIndex === 0 || dayIndex === 6,
        dayOfYear,
        weekNumber,
        quarter,
      });
      setError("");
    } catch (e) {
      setError("Error calculating day of week. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setDate("");
    setResult(null);
    setError("");
  };

  const loadToday = () => {
    const today = new Date();
    setDate(today.toISOString().split("T")[0]);
    setResult(null);
  };

  const loadExample = () => {
    setDate("2025-07-04");
    setResult(null);
  };

  const formatDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Day of Week Calculator – Find What Day Any Date Falls On</h1>
        <p className="text-muted-foreground">
          Discover what day of the week any date falls on with our free online day calculator. Instantly find the weekday for past, present, or future dates with additional date information.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Select a Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateDayOfWeek}>Find Day of Week</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadToday}>Today</Button>
          <Button variant="outline" onClick={loadExample}>Example Date</Button>
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
                {formatDate(date)}
              </p>
              <p className="text-5xl font-bold text-primary">{result.dayOfWeek}</p>
              <div className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${result.isWeekend ? 'bg-red-500/20 text-red-700 dark:text-red-400' : 'bg-green-500/20 text-green-700 dark:text-green-400'}`}>
                {result.isWeekend ? "Weekend" : "Weekday"}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.dayNumber}</p>
                <p className="text-sm text-muted-foreground">Day Number (0=Sun)</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.dayOfYear}</p>
                <p className="text-sm text-muted-foreground">Day of Year</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.weekNumber}</p>
                <p className="text-sm text-muted-foreground">Week of Year</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">Q{result.quarter}</p>
                <p className="text-sm text-muted-foreground">Quarter</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Date Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Year:</span>
                  <span className="ml-2 font-semibold">{new Date(date).getFullYear()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Month:</span>
                  <span className="ml-2 font-semibold">{new Date(date).toLocaleDateString("en-US", { month: "long" })}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Days in Month:</span>
                  <span className="ml-2 font-semibold">{new Date(new Date(date).getFullYear(), new Date(date).getMonth() + 1, 0).getDate()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Is Leap Year:</span>
                  <span className="ml-2 font-semibold">{(new Date(date).getFullYear() % 4 === 0 && new Date(date).getFullYear() % 100 !== 0) || new Date(date).getFullYear() % 400 === 0 ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">How Day of Week is Calculated</h2>
        <p className="text-muted-foreground">
          The day of week is determined using Zeller's congruence or similar algorithms that calculate the weekday based on the date. The Gregorian calendar repeats every 400 years, making these calculations deterministic.
        </p>
        <p className="text-muted-foreground">
          Modern programming languages use built-in date functions that account for all calendar rules including leap years and calendar reforms.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Days of the Week</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Weekdays (Monday-Friday)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Monday - Start of work week</li>
              <li>• Tuesday - Second weekday</li>
              <li>• Wednesday - Midweek (hump day)</li>
              <li>• Thursday - Fourth weekday</li>
              <li>• Friday - Last workday</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Weekend (Saturday-Sunday)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Saturday - First weekend day</li>
              <li>• Sunday - Last day of week</li>
              <li>• Typically non-working days</li>
              <li>• Used for rest and recreation</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Day Number Conventions</h2>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            Different systems use different numbering for days of the week:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded">
              <h4 className="font-semibold text-sm mb-2">US Convention (0-6)</h4>
              <code className="text-xs font-mono block">
                Sunday = 0<br />
                Monday = 1<br />
                ...<br />
                Saturday = 6
              </code>
            </div>
            <div className="p-3 bg-muted rounded">
              <h4 className="font-semibold text-sm mb-2">ISO 8601 (1-7)</h4>
              <code className="text-xs font-mono block">
                Monday = 1<br />
                Tuesday = 2<br />
                ...<br />
                Sunday = 7
              </code>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Fun Facts About Days</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Same Day Patterns</h3>
            <p className="text-sm text-muted-foreground">
              The same date falls on the same day of the week every 6 or 11 years (depending on leap years). After 28 years, the calendar repeats exactly.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Doomsday Rule</h3>
            <p className="text-sm text-muted-foreground">
              John Conway's Doomsday algorithm lets you mentally calculate the day of week for any date using anchor days that fall on the same weekday each year.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Friday the 13th</h3>
            <p className="text-sm text-muted-foreground">
              Every year has at least one Friday the 13th, and can have up to three. The pattern repeats every 400 years.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why does the calendar repeat every 400 years?</h3>
            <p className="text-sm text-muted-foreground">
              The Gregorian calendar has 146,097 days in 400 years, which is exactly divisible by 7 (days per week), causing the pattern to repeat.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What day was I born on?</h3>
            <p className="text-sm text-muted-foreground">
              Enter your birth date in the calculator above to find out what day of the week you were born!
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I calculate day of week mentally?</h3>
            <p className="text-sm text-muted-foreground">
              Use Zeller's congruence or the Doomsday algorithm. These methods use modular arithmetic to determine the weekday.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Is Sunday the first or last day?</h3>
            <p className="text-sm text-muted-foreground">
              It depends on convention. In the US, Sunday is often considered first. ISO 8601 standardizes Monday as day 1.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/date-arithmetic-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Date Arithmetic</p>
            <p className="text-xs text-muted-foreground">Add/subtract days</p>
          </a>
          <a href="/math-tools/date-difference-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Date Difference</p>
            <p className="text-xs text-muted-foreground">Days between</p>
          </a>
          <a href="/math-tools/age-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Age Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate age</p>
          </a>
        </div>
      </section>
    </div>
  );
}
