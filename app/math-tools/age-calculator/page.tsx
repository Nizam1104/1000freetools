"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const loadExample = () => {
    const today = new Date();
    const birth = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
    setBirthDate(birth.toISOString().split("T")[0]);
    setTargetDate("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
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

        <div className="flex gap-2">
          <Button onClick={calculateAge}>Calculate Age</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">How Age is Calculated</h2>
        <p className="text-muted-foreground">
          This calculator determines your exact age by calculating the difference between your birth date and the target date. It accounts for varying month lengths and leap years to give you a precise result in years, months, and days.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Age in Different Units</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Time Conversions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 year ≈ 365.25 days (accounting for leap years)</li>
              <li>• 1 year = 52 weeks + 1 day</li>
              <li>• 1 year = 12 months</li>
              <li>• Average month ≈ 30.44 days</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Fun Age Facts</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Your heart beats about 100,000 times per day</li>
              <li>• You breathe about 20,000 times per day</li>
              <li>• You spend about 1/3 of your life sleeping</li>
              <li>• Your age in seconds: years × 31,536,000</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Milestone Ages</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Age</th>
                <th className="text-left p-3">Significance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-semibold">18</td>
                <td className="p-3">Legal adulthood in most countries</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">21</td>
                <td className="p-3">Legal drinking age (US)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">25</td>
                <td className="p-3">Car rental age requirement</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">30</td>
                <td className="p-3">US Senate eligibility</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">35</td>
                <td className="p-3">US President eligibility</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">65</td>
                <td className="p-3">Traditional retirement age</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">100</td>
                <td className="p-3">Centenarian milestone</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do you calculate age accurately?</h3>
            <p className="text-sm text-muted-foreground">
              Age is calculated by finding the difference between dates, accounting for month lengths and leap years. We subtract years first, then adjust months and days based on whether the birthday has occurred this year.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why does age vary by country?</h3>
            <p className="text-sm text-muted-foreground">
              Some East Asian countries traditionally count age differently, starting at 1 at birth and adding a year on New Year's Day. Most Western countries use the anniversary method shown here.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can I calculate age for a past date?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! Enter any date in the "Calculate Age As Of" field to find someone's age on that specific date, useful for historical calculations or planning.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How is leap year handled?</h3>
            <p className="text-sm text-muted-foreground">
              Leap years (366 days) are automatically accounted for. If you were born on February 29, your legal birthday in non-leap years is typically March 1 or February 28, depending on jurisdiction.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/date-difference-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Date Difference</p>
            <p className="text-xs text-muted-foreground">Days between dates</p>
          </a>
          <a href="/math-tools/days-until-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Days Until</p>
            <p className="text-xs text-muted-foreground">Countdown calculator</p>
          </a>
          <a href="/math-tools/day-of-week-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Day of Week</p>
            <p className="text-xs text-muted-foreground">What day was it?</p>
          </a>
        </div>
      </section>
    </div>
  );
}
