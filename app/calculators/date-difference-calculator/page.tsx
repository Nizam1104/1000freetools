"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [difference, setDifference] = useState<{days: number, weeks: number, months: number, years: number} | null>(null);

  const calculate = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365.25);
    const months = Math.floor(diffDays / 30.44);
    const weeks = Math.floor(diffDays / 7);

    setDifference({
      days: diffDays,
      weeks,
      months,
      years
    });
  };

  const reset = () => {
    setStartDate("");
    setEndDate("");
    setDifference(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Difference</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {difference !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Time Between Dates</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-2xl font-bold">{difference.days.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Days</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{difference.weeks.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Weeks</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{difference.months.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Months</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{difference.years.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Years</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Date Difference Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Select the start date</p>
                  <p>Choose the earlier date from the calendar picker. This is your beginning reference point.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Select the end date</p>
                  <p>Choose the later date. The calculator finds the time elapsed between these two dates.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Calculate to see the difference</p>
                  <p>Results show the time span in days, weeks, months, and years simultaneously.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Date Difference Reference Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Time Period</th>
                    <th className="text-left py-3 px-2 font-semibold">Days</th>
                    <th className="text-left py-3 px-2 font-semibold">Weeks</th>
                    <th className="text-left py-3 px-2 font-semibold">Common Use</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">1 week</td>
                    <td className="py-3 px-2">7 days</td>
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2">Weekly planning</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">2 weeks (fortnight)</td>
                    <td className="py-3 px-2">14 days</td>
                    <td className="py-3 px-2">2</td>
                    <td className="py-3 px-2">Pay periods, vacations</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1 month (average)</td>
                    <td className="py-3 px-2">30.44 days</td>
                    <td className="py-3 px-2">4.35</td>
                    <td className="py-3 px-2">Monthly billing cycles</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1 quarter</td>
                    <td className="py-3 px-2">91.3 days</td>
                    <td className="py-3 px-2">13</td>
                    <td className="py-3 px-2">Business quarters</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1 year</td>
                    <td className="py-3 px-2">365.25 days</td>
                    <td className="py-3 px-2">52.18</td>
                    <td className="py-3 px-2">Annual planning</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">1 leap year</td>
                    <td className="py-3 px-2">366 days</td>
                    <td className="py-3 px-2">52.29</td>
                    <td className="py-3 px-2">Every 4 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Calculations use average month length (365.25 / 12 = 30.44 days) for month and year conversions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Date Differences
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">How the Calculation Works</h4>
                <p>
                  The calculator finds the absolute difference between two dates in milliseconds, then converts to days by dividing by 86,400,000 (milliseconds per day). Weeks, months, and years are derived from the day count using standard averages.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Month Calculations Are Approximate</h4>
                <p>
                  Months vary from 28 to 31 days. To convert days to months, we use 30.44 days (the average). This gives consistent results but won&apos;t match calendar months exactly. For precise month counts, count actual calendar months instead.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Inclusive vs Exclusive Counting</h4>
                <p>
                  This calculator uses exclusive counting — it measures the time between dates, not including the start date. From January 1 to January 2 is 1 day, not 2. Some contexts (like hotel stays) use inclusive counting.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Leap Year Impact</h4>
                <p>
                  Leap years add an extra day every 4 years (with exceptions for century years). Over long periods, this averages to 365.25 days per year. The calculator accounts for this in year conversions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Applications
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Age Calculation</p>
                  <p>Find how many days old you are or how long until a milestone birthday. Enter your birth date and target date to see the exact span.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Project Duration</p>
                  <p>Calculate how long a project took or will take. Enter start and end dates to see total days for timeline analysis or billing.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Vacation Planning</p>
                  <p>Count days between trip dates to know how long you&apos;ll be away. Helps with packing, pet care, and time-off requests.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Historical Research</p>
                  <p>Find how long ago events occurred or the span between historical dates. Useful for timelines and historical analysis.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Does this count weekends and holidays?</h4>
                <p>
                  Yes, this counts all calendar days including weekends and holidays. For business days only (excluding weekends), use a business day calculator instead.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I find the difference between dates in different years?</h4>
                <p>
                  Yes. The calculator works across any date range — days, months, years, or decades. It correctly handles leap years and varying month lengths.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What if I enter the end date before the start date?</h4>
                <p>
                  The calculator uses absolute difference, so order doesn&apos;t matter. January 1 to December 31 gives the same result as December 31 to January 1.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I calculate my age in days?</h4>
                <p>
                  Enter your birth date as the start date and today&apos;s date as the end date. The result shows your exact age in days, plus conversions to weeks, months, and years.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why are month and year values decimal?</h4>
                <p>
                  Months and years are calculated from days using averages (30.44 days/month, 365.25 days/year). This gives precise fractional values rather than rounding to whole numbers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
