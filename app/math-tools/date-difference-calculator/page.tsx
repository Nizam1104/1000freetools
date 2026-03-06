"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<{
    days: number;
    weeks: number;
    months: number;
    years: number;
    hours: number;
    inclusive: number;
  } | null>(null);
  const [error, setError] = useState("");

  const calculateDifference = () => {
    if (!startDate || !endDate) {
      setError("Please enter both start and end dates");
      setResult(null);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError("Invalid date format");
      setResult(null);
      return;
    }

    if (start > end) {
      setError("Start date must be before end date");
      setResult(null);
      return;
    }

    const diffTime = end.getTime() - start.getTime();
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const hours = Math.floor(diffTime / (1000 * 60 * 60));

    let years = end.getFullYear() - start.getFullYear();
    let months = years * 12 + (end.getMonth() - start.getMonth());
    
    if (end.getDate() < start.getDate()) {
      months--;
    }

    setResult({
      days,
      weeks,
      months,
      years: Math.floor(months / 12),
      hours,
      inclusive: days + 1,
    });
    setError("");
  };

  const reset = () => {
    setStartDate("");
    setEndDate("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    const today = new Date();
    const start = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(today.toISOString().split("T")[0]);
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Date Difference Calculator – Find Days Between Two Dates</h1>
        <p className="text-muted-foreground">
          Calculate the exact difference between any two dates in days, weeks, months, and years with our free online date difference calculator. Instant and accurate date comparison.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <Label>End Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateDifference}>Calculate Difference</Button>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-6 bg-primary text-primary-foreground rounded-lg text-center">
                <p className="text-4xl font-bold">{result.days.toLocaleString()}</p>
                <p className="text-sm opacity-80">Days</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold">{result.weeks.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Weeks</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold">{result.months.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Months</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold">{result.years}</p>
                <p className="text-sm text-muted-foreground">Years</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold">{result.hours.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Hours</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold">{result.inclusive.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Days (inclusive)</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Date Range</h4>
              <p className="text-sm text-muted-foreground">
                From <strong>{new Date(startDate).toLocaleDateString()}</strong> to <strong>{new Date(endDate).toLocaleDateString()}</strong>
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">How Date Difference is Calculated</h2>
        <p className="text-muted-foreground">
          This calculator computes the exact number of days between two dates by converting both dates to timestamps and finding the difference. It then converts this difference into weeks, months, and years for easier understanding.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Date Calculations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Time Periods</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 week = 7 days</li>
              <li>• 1 month ≈ 30.44 days (average)</li>
              <li>• 1 year = 365 days (366 in leap year)</li>
              <li>• 1 decade = 10 years</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Use Cases</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Project duration tracking</li>
              <li>• Vacation planning</li>
              <li>• Contract periods</li>
              <li>• Age calculations</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Example Calculations</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">One Year Difference</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Jan 1, 2024 to Jan 1, 2025<br />
              = 366 days (leap year)<br />
              = 52 weeks + 2 days<br />
              = 12 months
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Month to Month</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Mar 15 to Apr 15<br />
              = 31 days<br />
              = 4 weeks + 3 days<br />
              = 1 month
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Vacation Planning</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Jul 1 to Jul 14<br />
              = 13 days<br />
              = 1 week + 6 days<br />
              = 14 days (inclusive)
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Inclusive vs Exclusive Counting</h2>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            When counting days between dates, you can count either exclusively (not including start/end) or inclusively (including both dates).
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 border rounded">
              <h4 className="font-semibold text-sm mb-2">Exclusive (Standard)</h4>
              <p className="text-xs text-muted-foreground">
                Counts days between dates, not including start or end.<br />
                Example: Mon to Fri = 4 days
              </p>
            </div>
            <div className="p-3 border rounded">
              <h4 className="font-semibold text-sm mb-2">Inclusive</h4>
              <p className="text-xs text-muted-foreground">
                Counts all days including start and end.<br />
                Example: Mon to Fri = 5 days
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Does this account for leap years?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! The calculator automatically accounts for leap years when calculating the total number of days between dates.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between months and days?</h3>
            <p className="text-sm text-muted-foreground">
              Months vary in length (28-31 days), so the month count is approximate. For precise calculations, use the day count.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can I calculate business days only?</h3>
            <p className="text-sm text-muted-foreground">
              This calculator shows total calendar days. For business days (excluding weekends), subtract approximately 2/7 of the total days.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I count days inclusively?</h3>
            <p className="text-sm text-muted-foreground">
              Add 1 to the day count. For example, if the calculator shows 10 days, the inclusive count is 11 days.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/age-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Age Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate exact age</p>
          </a>
          <a href="/math-tools/days-until-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Days Until</p>
            <p className="text-xs text-muted-foreground">Countdown to date</p>
          </a>
          <a href="/math-tools/date-arithmetic-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Date Arithmetic</p>
            <p className="text-xs text-muted-foreground">Add/subtract days</p>
          </a>
        </div>
      </section>
    </div>
  );
}
