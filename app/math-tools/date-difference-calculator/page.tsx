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

  const loadExample = (type: string) => {
    const today = new Date();
    const examples: Record<string, { start: string; end: string }> = {
      year: {
        start: new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()).toISOString().split("T")[0],
        end: today.toISOString().split("T")[0]
      },
      month: {
        start: new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()).toISOString().split("T")[0],
        end: today.toISOString().split("T")[0]
      },
      week: {
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toISOString().split("T")[0],
        end: today.toISOString().split("T")[0]
      },
      quarter: {
        start: new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()).toISOString().split("T")[0],
        end: today.toISOString().split("T")[0]
      },
      decade: {
        start: new Date(today.getFullYear() - 10, today.getMonth(), today.getDate()).toISOString().split("T")[0],
        end: today.toISOString().split("T")[0]
      },
      project: {
        start: new Date(today.getFullYear(), 0, 1).toISOString().split("T")[0],
        end: new Date(today.getFullYear(), 11, 31).toISOString().split("T")[0]
      },
      vacation: {
        start: today.toISOString().split("T")[0],
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14).toISOString().split("T")[0]
      }
    };
    const ex = examples[type] || examples.year;
    setStartDate(ex.start);
    setEndDate(ex.end);
    setResult(null);
  };

  return (
    <div className="w-full mx-auto space-y-8">
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

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculateDifference}>Calculate Difference</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("year")}>1 Year</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("month")}>1 Month</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("week")}>1 Week</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("quarter")}>1 Quarter</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("decade")}>10 Years</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("project")}>Full Year</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("vacation")}>2 Weeks</Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Date Differences</h2>
        <p className="text-muted-foreground">
          Calculating the difference between two dates seems straightforward, but there are actually several ways to measure it. Do you count just the days between, or include both the start and end dates? Do you want the answer in total days, or broken into years, months, and days? Different situations call for different measurements.
        </p>
        <p className="text-muted-foreground">
          This calculator gives you multiple perspectives on the same date range. The total days tells you the exact span. Weeks are useful for project planning. Months and years help you understand the duration in human terms. Hours matter for precise timing. And the inclusive count is what you need when counting both endpoints – like counting days of a conference that runs from Monday to Friday (5 days inclusive, but only 4 days between).
        </p>
        <p className="text-muted-foreground">
          Date difference calculations are essential for tracking project timelines, calculating age, determining loan periods, planning events, measuring service tenure, and countless other applications where time matters.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">How Date Difference Is Calculated</h2>
        <div className="p-6 bg-muted rounded-lg">
          <div className="font-mono text-sm mb-4">
            Days = (End Date - Start Date) ÷ (24 × 60 × 60 × 1000)
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Dates are stored as milliseconds since January 1, 1970 (the Unix epoch). Subtracting two dates gives milliseconds; dividing by the number of milliseconds in a day gives the day count.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">Days</div>
                <div className="text-muted-foreground">Total calendar days between dates (exclusive of end date)</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">Weeks</div>
                <div className="text-muted-foreground">Days ÷ 7, rounded down to whole weeks</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">Hours</div>
                <div className="text-muted-foreground">Days × 24, total hours in the period</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">Months</div>
                <div className="text-muted-foreground">Calendar months, adjusting for day-of-month</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">Years</div>
                <div className="text-muted-foreground">Months ÷ 12, whole years</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">Inclusive</div>
                <div className="text-muted-foreground">Days + 1, counting both start and end dates</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Exclusive vs Inclusive Counting</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Exclusive (Days)</div>
                <div className="text-muted-foreground">Counts days BETWEEN the dates. Jan 1 to Jan 3 = 2 days (Jan 1 and Jan 2).</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Inclusive</div>
                <div className="text-muted-foreground">Counts all days INCLUDING both endpoints. Jan 1 to Jan 3 = 3 days (Jan 1, 2, and 3).</div>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="font-semibold text-amber-800">When to Use Each</div>
                <div className="text-amber-700">Use exclusive for "how many days until." Use inclusive for "how many days total" like hotel stays or event durations.</div>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Common Date Difference Uses</h3>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-muted rounded">
                <span className="font-semibold">Age Calculation:</span> Birth date to today
              </div>
              <div className="p-2 bg-muted rounded">
                <span className="font-semibold">Project Duration:</span> Start date to deadline
              </div>
              <div className="p-2 bg-muted rounded">
                <span className="font-semibold">Loan Period:</span> Disbursement to maturity
              </div>
              <div className="p-2 bg-muted rounded">
                <span className="font-semibold">Employment Tenure:</span> Hire date to today/end date
              </div>
              <div className="p-2 bg-muted rounded">
                <span className="font-semibold">Vacation Planning:</span> Departure to return
              </div>
              <div className="p-2 bg-muted rounded">
                <span className="font-semibold">Contract Terms:</span> Effective date to expiration
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Worked Examples</h2>
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 1: One Year Difference</h3>
            <p className="text-sm text-muted-foreground mb-3">Calculate the difference between January 15, 2024 and January 15, 2025.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Start Date:</strong> January 15, 2024</div>
              <div><strong>End Date:</strong> January 15, 2025</div>
              <div className="pt-2 border-t">
                <div><strong>Days:</strong> 366 (2024 is a leap year!)</div>
                <div><strong>Weeks:</strong> 52 weeks, 2 days</div>
                <div><strong>Months:</strong> 12 months</div>
                <div><strong>Years:</strong> 1 year</div>
              </div>
              <div className="text-muted-foreground">
                Note: A full year isn't always 365 days – leap years have 366.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 2: Project Timeline</h3>
            <p className="text-sm text-muted-foreground mb-3">A project runs from March 1, 2025 to May 31, 2025. How long is it?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Start Date:</strong> March 1, 2025</div>
              <div><strong>End Date:</strong> May 31, 2025</div>
              <div className="pt-2 border-t">
                <div>March: 31 days (March 1 to March 31 = 30 days, plus April and May)</div>
                <div>April: 30 days</div>
                <div>May: 31 days (but we count to May 31, not through it)</div>
              </div>
              <div className="font-semibold mt-2">
                <div><strong>Days:</strong> 91 days</div>
                <div><strong>Weeks:</strong> 13 weeks exactly</div>
                <div><strong>Months:</strong> 3 months (March 1 to May 31 is exactly 3 calendar months)</div>
              </div>
              <div className="text-muted-foreground">
                This is exactly one quarter of a year – perfect for quarterly projects.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 3: Vacation Duration</h3>
            <p className="text-sm text-muted-foreground mb-3">You're staying at a hotel from July 10 to July 17. How many nights?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Check-in:</strong> July 10</div>
              <div><strong>Check-out:</strong> July 17</div>
              <div className="pt-2 border-t">
                <div><strong>Days (exclusive):</strong> 7 days</div>
                <div><strong>Inclusive:</strong> 8 days</div>
              </div>
              <div className="text-muted-foreground">
                You stay 7 nights (July 10, 11, 12, 13, 14, 15, 16 – checking out on the 17th). Hotels charge per night, not per day, so you pay for 7 nights even though your trip spans 8 calendar days inclusive.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 4: Employment Tenure</h3>
            <p className="text-sm text-muted-foreground mb-3">Someone was hired on June 15, 2020 and left on September 30, 2024. How long did they work there?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Hire Date:</strong> June 15, 2020</div>
              <div><strong>End Date:</strong> September 30, 2024</div>
              <div className="pt-2 border-t">
                <div><strong>Total Days:</strong> 1,568 days</div>
                <div><strong>Years:</strong> 4 years</div>
                <div><strong>Months:</strong> 51 months (4 years × 12 + 3 months)</div>
                <div><strong>Weeks:</strong> 224 weeks</div>
              </div>
              <div className="text-muted-foreground">
                For resume purposes, you'd say "4 years, 3 months" of experience.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 5: Days Until an Event</h3>
            <p className="text-sm text-muted-foreground mb-3">Today is March 1, 2025. Your wedding is on June 15, 2025. How many days to plan?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Today:</strong> March 1, 2025</div>
              <div><strong>Wedding:</strong> June 15, 2025</div>
              <div className="pt-2 border-t">
                <div>March: 31 - 1 = 30 days remaining</div>
                <div>April: 30 days</div>
                <div>May: 31 days</div>
                <div>June: 15 days (up to the wedding)</div>
              </div>
              <div className="font-semibold mt-2">
                <div><strong>Total Days:</strong> 30 + 30 + 31 + 15 = 106 days</div>
              </div>
              <div className="text-muted-foreground">
                You have 106 days (about 15 weeks or 3.5 months) to plan your wedding!
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Quick Fact</h2>
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm">
            <strong>The Unix Epoch</strong> – January 1, 1970 at 00:00:00 UTC – is the reference point for most computer date calculations. Computers store dates as the number of milliseconds (or seconds) since this moment. This system will have a "Y2K-like" problem in year 2038 for 32-bit systems (the "Year 2038 Problem"), when the counter overflows. Modern 64-bit systems can represent dates for billions of years in either direction. The choice of 1970 was arbitrary – it was simply a convenient recent date when Unix was developed at Bell Labs.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-2">Should I count the start date, end date, or neither?</h3>
            <p className="text-sm text-muted-foreground">
              It depends on what you're measuring. For "days until" an event, count neither (exclusive). For hotel nights, count the start dates but not the checkout date. For event duration including both days, use inclusive counting. This calculator shows both exclusive days and inclusive days so you can choose.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How do you calculate age using date difference?</h3>
            <p className="text-sm text-muted-foreground">
              For age in years, use the years value from the calculator. But for precise age, you need to check if the birthday has occurred this year. If today is before your birthday, subtract 1 from the year difference. For example, born Jan 2000, today is Dec 2024: year difference is 24, but you're still 24 until your January birthday.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Why is the month count sometimes different from days ÷ 30?</h3>
            <p className="text-sm text-muted-foreground">
              Months aren't all 30 days – they range from 28 to 31. The calculator uses calendar months, not average months. January 15 to March 15 is exactly 2 calendar months, but it's 59 or 60 days (depending on leap year), not 60 exactly. Calendar months are more meaningful for human understanding.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How do I calculate business days only?</h3>
            <p className="text-sm text-muted-foreground">
              This calculator counts all calendar days. For business days (excluding weekends and holidays), you'd need a different calculation. Roughly: business days ≈ total days × 5/7. For 91 calendar days, that's about 65 business days. But you'd need to account for specific holidays for precision.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Can I calculate the difference between dates in different years?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. The calculator handles any date range, even spanning many years. December 31, 1999 to January 1, 2000 is 1 day. January 1, 2000 to January 1, 2025 is 25 years or 9,131 days (including leap years).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What's the maximum date range I can calculate?</h3>
            <p className="text-sm text-muted-foreground">
              JavaScript dates can represent dates from about 271,821 BC to 275,760 AD. For practical purposes, you can calculate differences across any realistic date range. The calculator will handle everything from same-day differences to spans of thousands of years.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How accurate is the hours calculation?</h3>
            <p className="text-sm text-muted-foreground">
              The hours value is days × 24, assuming each day has exactly 24 hours. This ignores daylight saving time changes, which can make some days 23 or 25 hours long. For most purposes, the 24-hour assumption is fine. If you need DST-aware calculations, you'd need timezone-specific handling.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
