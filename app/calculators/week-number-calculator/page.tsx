"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WeekNumberCalculator() {
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<{week: number, year: number, start: string, end: string} | null>(null);

  const getISOWeek = (date: Date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return [d.getUTCFullYear(), weekNo];
  };

  const getWeekRange = (date: Date) => {
    const day = date.getDay() || 7;
    const start = new Date(date);
    start.setDate(date.getDate() - day + 1);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return {
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0]
    };
  };

  const calculate = () => {
    if (!date) return;

    const inputDate = new Date(date);
    const [year, week] = getISOWeek(inputDate);
    const { start, end } = getWeekRange(inputDate);

    setResult({
      week,
      year,
      start,
      end
    });
  };

  const reset = () => {
    setDate(new Date().toISOString().split("T")[0]);
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Week Number Calculator – Find ISO Week Number for Any Date</CardTitle>
          <CardDescription>
            Look up the week number for any date instantly. Our ISO week number calculator also shows the start and end dates for any given week of the year.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Select Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">ISO Week Number</p>
                <p className="text-4xl font-bold mt-1">Week {result.week}</p>
                <p className="text-lg font-medium mt-1">{result.year}</p>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Week Range</p>
                  <p className="text-lg font-medium mt-1">
                    {result.start} to {result.end}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">How to Find Week Number</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Select a Date</h3>
              <p className="text-sm text-muted-foreground">Choose any date using the date picker or enter manually.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Click Calculate</h3>
              <p className="text-sm text-muted-foreground">The calculator determines the ISO week number for your selected date.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">View Week Details</h3>
              <p className="text-sm text-muted-foreground">See the week number, year, and the full date range for that week.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Key Features of This Week Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">**ISO 8601 Standard**</h3>
            <p className="text-sm text-muted-foreground">Uses the international ISO week date standard for consistent week numbering.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Week Range Display**</h3>
            <p className="text-sm text-muted-foreground">Shows the Monday-to-Sunday date range for any week number.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Any Date Support**</h3>
            <p className="text-sm text-muted-foreground">Find week numbers for past, present, or future dates.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Free & Instant**</h3>
            <p className="text-sm text-muted-foreground">Get week numbers immediately without any registration.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is ISO week number?</h3>
            <p className="text-sm text-muted-foreground">ISO week numbers follow the ISO 8601 standard. Week 1 is the week containing the first Thursday of the year. Weeks start on Monday and are numbered 01-53.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How many weeks are in a year?</h3>
            <p className="text-sm text-muted-foreground">Most years have 52 weeks. Some years have 53 weeks when January 1st falls on a Thursday (or Wednesday in leap years).</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Why does week 1 sometimes start in the previous year?</h3>
            <p className="text-sm text-muted-foreground">ISO week 1 must contain January 4th. If Jan 1-3 fall in the previous week, they belong to week 52 or 53 of the prior year.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What day does the ISO week start?</h3>
            <p className="text-sm text-muted-foreground">ISO weeks always start on Monday and end on Sunday. This differs from some calendars that start weeks on Sunday.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How is week number used in business?</h3>
            <p className="text-sm text-muted-foreground">Week numbers are used for project planning, manufacturing schedules, financial reporting, and international coordination where consistent week references are needed.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Related Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/calculators/date-difference-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Date Difference Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate days between two dates for planning and scheduling.</p>
          </a>
          <a href="/calculators/business-days-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Business Days Calculator</h3>
            <p className="text-sm text-muted-foreground">Count working days excluding weekends and holidays.</p>
          </a>
          <a href="/calculators/countdown-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Countdown Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate time remaining until a future date or event.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
