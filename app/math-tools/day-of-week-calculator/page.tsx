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

  const loadExample = (dateStr: string) => {
    setDate(dateStr);
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
    <div className="w-full mx-auto space-y-8">
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculateDayOfWeek}>Find Day of Week</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadToday}>Today</Button>
          <Button variant="outline" onClick={() => loadExample("2025-07-04")}>July 4, 2025</Button>
          <Button variant="outline" onClick={() => loadExample("2000-01-01")}>Y2K (2000)</Button>
          <Button variant="outline" onClick={() => loadExample("1969-07-20")}>Moon Landing</Button>
          <Button variant="outline" onClick={() => loadExample("2030-12-25")}>Christmas 2030</Button>
          <Button variant="outline" onClick={() => loadExample("1990-06-14")}>World Cup 1990</Button>
          <Button variant="outline" onClick={() => loadExample("2026-02-14")}>Valentine's 2026</Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Day of Week Calculations</h2>
        <p className="text-muted-foreground">
          Finding what day of the week a date falls on might seem like magic, but it's actually straightforward math. Every 7 days, the cycle repeats – that's why we have seven days in a week. The calculator uses the built-in date handling of modern systems to give you instant, accurate results for any date in history or the future.
        </p>
        <p className="text-muted-foreground">
          Beyond just telling you the weekday, this tool provides extra context: whether it's a weekend, what week of the year it falls in, which quarter, and even what day number it is within the year. This information helps with planning, scheduling, and understanding where a date sits in the broader calendar.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How the Calculator Works</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Parse the input date</p>
                <p className="text-muted-foreground">
                  The calculator reads your date input and converts it into a standard date object that the system can work with.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Calculate the day index</p>
                <p className="text-muted-foreground">
                  Using the date object's getDay() method, it returns a number from 0 (Sunday) to 6 (Saturday).
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Compute additional details</p>
                <p className="text-muted-foreground">
                  Day of year is found by calculating milliseconds from January 1st. Week number divides day of year by 7. Quarter comes from the month number.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Display formatted results</p>
                <p className="text-muted-foreground">
                  All the information is presented clearly with visual indicators for weekends and organized data cards.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: July 4, 2025 (Independence Day)</h4>
            <div className="text-sm space-y-2">
              <p>Input: 2025-07-04</p>
              <p>Day of week: Friday</p>
              <p>Day of year: 185 (out of 365)</p>
              <p>Week number: 27</p>
              <p>Quarter: Q3</p>
              <p className="text-muted-foreground">July 4th falls on a Friday in 2025, making it a long weekend for Independence Day celebrations.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: January 1, 2000 (Y2K)</h4>
            <div className="text-sm space-y-2">
              <p>Input: 2000-01-01</p>
              <p>Day of week: Saturday</p>
              <p>Day of year: 1</p>
              <p>Week number: 1</p>
              <p>Quarter: Q1</p>
              <p className="text-muted-foreground">The millennium began on a Saturday. Year 2000 was a leap year (divisible by 400).</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: July 20, 1969 (Moon Landing)</h4>
            <div className="text-sm space-y-2">
              <p>Input: 1969-07-20</p>
              <p>Day of week: Sunday</p>
              <p>Day of year: 201</p>
              <p>Week number: 29</p>
              <p>Quarter: Q3</p>
              <p className="text-muted-foreground">Neil Armstrong stepped on the moon on a Sunday. One of the most watched events in television history.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: December 25, 2030 (Christmas)</h4>
            <div className="text-sm space-y-2">
              <p>Input: 2030-12-25</p>
              <p>Day of week: Wednesday</p>
              <p>Day of year: 359</p>
              <p>Week number: 52</p>
              <p>Quarter: Q4</p>
              <p className="text-muted-foreground">Christmas 2030 lands mid-week. December 25th is always day 359 in non-leap years.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: February 14, 2026 (Valentine's Day)</h4>
            <div className="text-sm space-y-2">
              <p>Input: 2026-02-14</p>
              <p>Day of week: Saturday</p>
              <p>Day of year: 45</p>
              <p>Week number: 7</p>
              <p>Quarter: Q1</p>
              <p className="text-muted-foreground">Valentine's Day 2026 falls on a Saturday – perfect for a weekend celebration. 2026 is not a leap year.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>The Gregorian calendar repeats every 400 years.</strong> This means the day-of-week pattern for any given date repeats exactly every 400 years. The year 2000 had the same calendar as 1600, and 2400 will match both. This 400-year cycle contains exactly 146,097 days, which is divisible by 7, bringing us back to the same weekday alignment.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How accurate is this calculator for historical dates?</h4>
            <p className="text-sm text-muted-foreground">
              The calculator uses the proleptic Gregorian calendar, which extends the current calendar system backward in time. This works well for dates after 1582 (when the Gregorian calendar was introduced). For earlier dates, different regions used different calendars, so the result may not match what people actually used at the time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I find the day for future dates like 2100?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. The calculator works for any date the system can handle – typically from year 0 to year 9999. Keep in mind that year 2100 will NOT be a leap year (it's divisible by 100 but not 400), even though 2000 was.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does "day of year" mean?</h4>
            <p className="text-sm text-muted-foreground">
              Day of year counts from January 1st as day 1. December 31st is day 365 in regular years and day 366 in leap years. So July 4th is typically around day 185-186 depending on whether it's a leap year.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is week number calculated?</h4>
            <p className="text-sm text-muted-foreground">
              This calculator uses a simple method: divide the day of year by 7 and round up. So days 1-7 are week 1, days 8-14 are week 2, and so on. Different standards (like ISO 8601) have more complex rules about which week is "week 1."
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do some years have 366 days?</h4>
            <p className="text-sm text-muted-foreground">
              Leap years add an extra day (February 29) to keep the calendar aligned with Earth's orbit around the sun. A year is a leap year if it's divisible by 4, except for century years which must be divisible by 400. So 2000 was a leap year, but 1900 and 2100 are not.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use this to plan events or deadlines?</h4>
            <p className="text-sm text-muted-foreground">
              Absolutely. Knowing what day a future date falls on helps with planning. If you need to schedule something for a weekday, you can quickly check if your target date is a Monday through Friday or falls on a weekend.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
