"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    nextBirthday?: string;
  } | null>(null);
  const [error, setError] = useState("");

  const calculateAge = () => {
    if (!birthDate) {
      setError("Please enter your birth date");
      setResult(null);
      return;
    }

    const birth = new Date(birthDate);
    const target = targetDate ? new Date(targetDate) : new Date();

    if (isNaN(birth.getTime())) {
      setError("Invalid birth date");
      setResult(null);
      return;
    }

    if (targetDate && isNaN(target.getTime())) {
      setError("Invalid target date");
      setResult(null);
      return;
    }

    if (birth > target) {
      setError("Birth date cannot be in the future");
      setResult(null);
      return;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    let nextBirthday: string | undefined;
    if (!targetDate) {
      const currentYear = new Date().getFullYear();
      let nextBirthdayDate = new Date(currentYear, birth.getMonth(), birth.getDate());
      if (nextBirthdayDate < new Date()) {
        nextBirthdayDate = new Date(currentYear + 1, birth.getMonth(), birth.getDate());
      }
      const daysUntil = Math.ceil((nextBirthdayDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      nextBirthday = `in ${daysUntil} day${daysUntil !== 1 ? "s" : ""}`;
    }

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      nextBirthday,
    });
    setError("");
  };

  const reset = () => {
    setBirthDate("");
    setTargetDate("");
    setResult(null);
    setError("");
  };

  const loadExample = (exampleNum?: number) => {
    const examples = [
      { birth: "1998-06-15", target: "" },
      { birth: "2010-03-22", target: "2025-03-22" },
      { birth: "1985-12-01", target: "" },
      { birth: "2000-02-29", target: "2024-02-29" },
      { birth: "1970-07-04", target: "" },
    ];
    const example = examples[exampleNum !== undefined ? exampleNum % examples.length : 0];
    setBirthDate(example.birth);
    setTargetDate(example.target);
    setResult(null);
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Age Calculator – Find Your Exact Age in Years & Days</h1>
        <p className="text-muted-foreground">
          Calculate your exact age in years, months, and days with our free online age calculator. Enter your birthdate to find your precise age as of today or any specific date.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Birth Date</Label>
            <Input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div>
            <Label>Calculate Age As Of (optional)</Label>
            <Input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              placeholder="Leave empty for today"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {targetDate ? "" : "Defaults to today's date"}
            </p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculateAge}>Calculate Age</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Select onValueChange={(v) => loadExample(parseInt(v))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Load Example" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Example 1: Born 1998</SelectItem>
              <SelectItem value="1">Example 2: Born 2010, as of 2025</SelectItem>
              <SelectItem value="2">Example 3: Born 1985</SelectItem>
              <SelectItem value="3">Example 4: Leap year baby</SelectItem>
              <SelectItem value="4">Example 5: Born 1970</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-6 bg-primary text-primary-foreground rounded-lg text-center">
                <p className="text-4xl font-bold">{result.years}</p>
                <p className="text-sm opacity-80">Years</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-4xl font-bold">{result.months}</p>
                <p className="text-sm text-muted-foreground">Months</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-4xl font-bold">{result.days}</p>
                <p className="text-sm text-muted-foreground">Days</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Total Days</p>
                <p className="text-2xl font-bold">{result.totalDays.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Total Weeks</p>
                <p className="text-2xl font-bold">{result.totalWeeks.toLocaleString()}</p>
              </div>
              {result.nextBirthday && (
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Next Birthday</p>
                  <p className="text-2xl font-bold">{result.nextBirthday}</p>
                </div>
              )}
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Age Breakdown</h4>
              <p className="text-sm text-muted-foreground">
                You are {result.years} years, {result.months} months, and {result.days} days old.
                That's {result.totalDays.toLocaleString()} days or {result.totalWeeks.toLocaleString()} weeks since your birth.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Age Calculation</h2>
        <p className="text-muted-foreground">
          Calculating age sounds simple – just subtract birth year from current year, right? Not quite. Your exact age depends on whether your birthday has already happened this year. If you were born on March 15 and today is January 10, you haven't had your birthday yet, so you're one year younger than the year difference suggests.
        </p>
        <p className="text-muted-foreground">
          This calculator handles all the edge cases: leap years, different month lengths, and even calculates your age as of any historical or future date. It also tells you your total days alive and when your next birthday is.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How Age Is Calculated</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            Years = target year − birth year (adjusted if birthday hasn't occurred)<br />
            Months = target month − birth month (adjusted if day hasn't occurred)<br />
            Days = target day − birth day (borrowing from previous month if needed)
          </p>
        </div>
        <p className="text-muted-foreground">
          The calculation works backwards from the target date. First, we find the year difference. Then we check if the birthday month has passed – if not, we subtract one year. Next, we calculate months, borrowing from the year count if needed. Finally, we calculate days, borrowing from the previous month if the target day is earlier than the birth day.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>

        <div className="space-y-6">
          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Example 1: Age as of today</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Born: June 15, 1998 | Today: March 8, 2026
            </p>
            <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
              <p>Year difference: 2026 − 1998 = 28</p>
              <p>Birthday check: March comes before June, so subtract 1</p>
              <p>Years: 27</p>
              <p>Months: From June 15 to March 15 = 9 months backward = 8 months</p>
              <p>Days: 8 − 15 = −7, borrow from February (28 days in 2026)</p>
              <p>Days: 28 − 7 = 21 days</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Age: 27 years, 8 months, and 21 days (approximately).
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Example 2: Age on a specific date</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Born: March 22, 2010 | Calculate as of: March 22, 2025
            </p>
            <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
              <p>Year difference: 2025 − 2010 = 15</p>
              <p>Birthday check: Same day! No adjustment needed</p>
              <p>Years: 15</p>
              <p>Months: 0 (exact birthday)</p>
              <p>Days: 0 (exact birthday)</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              On their 15th birthday, they are exactly 15 years, 0 months, and 0 days old.
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Example 3: Leap year birthday</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Born: February 29, 2000 | Calculate as of: February 28, 2024
            </p>
            <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
              <p>Year difference: 2024 − 2000 = 24</p>
              <p>Birthday check: Feb 28 comes before Feb 29, subtract 1</p>
              <p>Years: 23</p>
              <p>Months: 11 (almost a full year)</p>
              <p>Days: 28 − 29 = −1, borrow from January (31 days)</p>
              <p>Days: 31 − 1 = 30 days</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Leap year babies celebrate on February 28 or March 1 in non-leap years.
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Example 4: Total days alive</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Born: December 1, 1985 | Calculate as of: March 8, 2026
            </p>
            <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
              <p>Years: 40 (birthday in December has passed)</p>
              <p>Months: 3 (December to March)</p>
              <p>Days: 7</p>
              <p>Total days: 40 × 365 + 10 leap days + 98 extra days</p>
              <p>Total days ≈ 14,708 days</p>
              <p>Total weeks: 14,708 ÷ 7 ≈ 2,101 weeks</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              That's over 14,000 days of life experience!
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-5 bg-accent/10 rounded-lg">
          <p className="text-muted-foreground">
            In Korea, traditional age counting works differently: you're 1 year old at birth (counting time in the womb), and everyone adds a year on New Year's Day, not on their birthday. So a baby born on December 31 would be 2 years old on January 1. South Korea officially switched to the international system in 2023, but the traditional method is still used socially.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why isn't age just current year minus birth year?</h4>
            <p className="text-sm text-muted-foreground">
              Because your birthday might not have happened yet this year. If you were born in December and it's currently March, you haven't had your birthday, so you're still the age you turned last year. The calculator accounts for this by checking if your birth month and day have passed.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do you calculate age for leap year babies?</h4>
            <p className="text-sm text-muted-foreground">
              People born on February 29 technically only have a birthday every 4 years. In non-leap years, most celebrate on February 28 or March 1. For age calculation, we treat February 28 as the cutoff – if the current date is before February 28, you haven't had your "birthday" yet.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I calculate my age on a future date?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! Enter any future date in the "Calculate Age As Of" field. This is useful for planning – like figuring out how old you'll be when you graduate, retire, or reach a milestone birthday.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the maximum age this calculator can handle?</h4>
            <p className="text-sm text-muted-foreground">
              The calculator works for any valid date combination. It can calculate ages for people born in the 1800s or earlier, and can project ages far into the future. The only limit is the date range supported by your browser (roughly year 0 to year 275,000).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do total days and total weeks differ slightly from years × 365?</h4>
            <p className="text-sm text-muted-foreground">
              Because of leap years! Every 4 years (with some exceptions for century years), we add an extra day. Over a lifetime, those extra days add up. A 40-year-old has lived through about 10 leap years, adding 10 extra days to their total.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How accurate is the "next birthday" countdown?</h4>
            <p className="text-sm text-muted-foreground">
              It's exact! The calculator finds your next birthday by checking if your birthday this year has already passed. If it has, it calculates the days until next year's birthday. The count updates based on today's date, so check back daily to watch it count down.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
