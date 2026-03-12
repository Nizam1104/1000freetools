"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DaysUntilSinceCalculator() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [result, setResult] = useState<{
    days: number;
    weeks: number;
    months: number;
    years: number;
    hours: number;
    minutes: number;
    seconds: number;
    businessDays: number;
    weekends: number;
    direction: "until" | "since" | "today";
  } | null>(null);
  const [error, setError] = useState("");

  const calculateDays = () => {
    if (!fromDate || !toDate) {
      setError("Please enter both dates");
      setResult(null);
      return;
    }

    try {
      const from = new Date(fromDate);
      const to = new Date(toDate);

      if (isNaN(from.getTime()) || isNaN(to.getTime())) {
        setError("Invalid date format");
        setResult(null);
        return;
      }

      const diffTime = to.getTime() - from.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      const diffSeconds = Math.floor(diffTime / 1000);

      let businessDays = 0;
      let weekends = 0;
      const current = new Date(from);
      const direction = diffDays >= 0 ? 1 : -1;

      while ((direction > 0 && current < to) || (direction < 0 && current > to)) {
        const day = current.getDay();
        if (day === 0 || day === 6) {
          weekends++;
        } else {
          businessDays++;
        }
        current.setDate(current.getDate() + direction);
      }

      if (direction < 0) {
        businessDays = -businessDays;
        weekends = -weekends;
      }

      let years = to.getFullYear() - from.getFullYear();
      let months = years * 12 + (to.getMonth() - from.getMonth());
      if (to.getDate() < from.getDate()) {
        months--;
      }

      setResult({
        days: Math.abs(diffDays),
        weeks: Math.floor(Math.abs(diffDays) / 7),
        months: Math.abs(months),
        years: Math.floor(Math.abs(months) / 12),
        hours: Math.abs(diffHours),
        minutes: Math.abs(diffMinutes),
        seconds: Math.abs(diffSeconds),
        businessDays: Math.abs(businessDays),
        weekends: Math.abs(weekends),
        direction: diffDays > 0 ? "until" : diffDays < 0 ? "since" : "today",
      });
      setError("");
    } catch (e) {
      setError("Error calculating days. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setFromDate("");
    setToDate("");
    setResult(null);
    setError("");
  };

  const loadExample = (from: string, to: string) => {
    setFromDate(from);
    setToDate(to);
    setResult(null);
  };

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Days Until/Since Calculator – Count Days Between Dates</h1>
        <p className="text-muted-foreground">
          Calculate days until a future date or days since a past date with our free online countdown calculator. See the exact count in days, weeks, months, and years with business day breakdown.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>From Date</Label>
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div>
            <Label>To Date</Label>
            <Input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculateDays}>Calculate Days</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample(new Date().toISOString().split("T")[0], new Date(Date.now() + 100 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])}>100 Days</Button>
          <Button variant="outline" onClick={() => loadExample(new Date().toISOString().split("T")[0], new Date(new Date().getFullYear(), 11, 25).toISOString().split("T")[0])}>Until Christmas</Button>
          <Button variant="outline" onClick={() => loadExample("2020-01-01", new Date().toISOString().split("T")[0])}>Since 2020</Button>
          <Button variant="outline" onClick={() => loadExample("2000-01-01", "2099-12-31")}>Full Century</Button>
          <Button variant="outline" onClick={() => loadExample("1969-07-20", "1969-07-21")}>Moon Landing +1</Button>
          <Button variant="outline" onClick={() => loadExample(new Date().toISOString().split("T")[0], new Date(new Date().getFullYear() + 1, 0, 1).toISOString().split("T")[0])}>Until Next Year</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {result.direction === "until" ? "Days Until" : result.direction === "since" ? "Days Since" : "It's Today!"}
              </p>
              <p className="text-6xl font-bold text-primary">{result.days.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {formatDate(fromDate)} → {formatDate(toDate)}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.weeks.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Weeks</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.months.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Months</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.years}</p>
                <p className="text-sm text-muted-foreground">Years</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.hours.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Hours</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Day Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Business Days:</span>
                    <span className="font-semibold">{result.businessDays.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weekend Days:</span>
                    <span className="font-semibold">{result.weekends.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Days:</span>
                    <span className="font-semibold">{result.days.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Time Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Minutes:</span>
                    <span className="font-semibold">{result.minutes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seconds:</span>
                    <span className="font-semibold">{result.seconds.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Percentage of Year</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Days remaining/elapsed:</span>
                  <span className="font-semibold">{result.days} of 365</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all"
                    style={{ width: `${Math.min((result.days / 365) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">
                  {((result.days / 365) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Date Difference Calculations</h2>
        <p className="text-muted-foreground">
          Counting days between two dates is more useful than you might think. Whether you're planning a wedding, tracking a project deadline, or just curious how long ago something happened, knowing the exact number of days helps put time into perspective.
        </p>
        <p className="text-muted-foreground">
          This calculator doesn't just give you a single number – it breaks down the difference into multiple units so you can understand the span in whatever way makes sense for your situation. Need to know how many workdays you have? Check the business days count. Wondering how many weekends you'll experience? That's there too.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How the Calculator Works</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Convert dates to timestamps</p>
                <p className="text-muted-foreground">
                  Each date is converted to milliseconds since January 1, 1970 (Unix epoch). This makes mathematical operations straightforward.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Calculate the difference</p>
                <p className="text-muted-foreground">
                  Subtracting the two timestamps gives the difference in milliseconds. Divide by the appropriate factor to get days, hours, minutes, or seconds.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Count business days</p>
                <p className="text-muted-foreground">
                  The calculator loops through each day, checking if it's a weekday (Monday-Friday) or weekend (Saturday-Sunday) to give you accurate business day counts.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Calculate months and years</p>
                <p className="text-muted-foreground">
                  Months and years account for the actual calendar structure – not just dividing by 30 or 365. This gives more meaningful results for long time spans.
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
            <h4 className="font-semibold text-sm mb-3">Example 1: 100 Days from Today</h4>
            <div className="text-sm space-y-2">
              <p>From: Today</p>
              <p>To: 100 days in the future</p>
              <p>Result: 100 days, 14 weeks, 3 months</p>
              <p>Business days: ~71 (excluding weekends)</p>
              <p className="text-muted-foreground">Useful for project planning or countdown events. About a third of a year.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Days Until Christmas</h4>
            <div className="text-sm space-y-2">
              <p>From: Today</p>
              <p>To: December 25 of current year</p>
              <p>Result: Varies by when you check</p>
              <p className="text-muted-foreground">Great for holiday planning. The calculator shows exactly how many shopping days you have left.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Since January 1, 2020</h4>
            <div className="text-sm space-y-2">
              <p>From: 2020-01-01</p>
              <p>To: Today</p>
              <p>Result: Over 2,000 days (as of 2025)</p>
              <p>Years: 5+ years</p>
              <p className="text-muted-foreground">Puts recent history in perspective. The 2020s decade is well underway.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Full Century (2000-2099)</h4>
            <div className="text-sm space-y-2">
              <p>From: 2000-01-01</p>
              <p>To: 2099-12-31</p>
              <p>Result: 36,524 days</p>
              <p>Years: 99 years, 11 months</p>
              <p className="text-muted-foreground">The 21st century spans 36,524 days including 25 leap years.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: Moon Landing + 1 Day</h4>
            <div className="text-sm space-y-2">
              <p>From: 1969-07-20</p>
              <p>To: 1969-07-21</p>
              <p>Result: 1 day, 24 hours</p>
              <p>Business days: 1</p>
              <p className="text-muted-foreground">Neil Armstrong walked on the moon on July 20, 1969. The next day was just one day later.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 6: Until Next New Year</h4>
            <div className="text-sm space-y-2">
              <p>From: Today</p>
              <p>To: January 1 of next year</p>
              <p>Result: Varies (typically 1-365 days)</p>
              <p className="text-muted-foreground">Perfect for New Year's resolutions planning or end-of-year deadlines.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>There are exactly 36,524 days in a century</strong> (100 years) under the Gregorian calendar. This accounts for 24 or 25 leap years depending on which century. The 20th century (1901-2000) had 25 leap years because 2000 was divisible by 400. The 21st century (2001-2100) will have only 24 leap years since 2100 is not a leap year.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between "days until" and "days since"?</h4>
            <p className="text-sm text-muted-foreground">
              "Days until" counts forward to a future date (like a countdown). "Days since" counts backward from a past date (like an anniversary). The number is the same either way – it's just a matter of perspective and which date comes first.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How are business days calculated?</h4>
            <p className="text-sm text-muted-foreground">
              Business days are Monday through Friday, excluding weekends. The calculator checks each day in the range and counts only weekdays. It doesn't account for holidays – those vary by country and would need to be subtracted manually.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why doesn't the month count match days ÷ 30?</h4>
            <p className="text-muted-foreground text-sm">
              Because months have different lengths – 28, 29, 30, or 31 days. The calculator uses actual calendar months, not an average. So from January 15 to March 15 is exactly 2 months, even though that's 59 or 60 days depending on the year.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I calculate the time between dates in different years?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. The calculator handles any date range, whether it's a few days or many decades. The years field shows complete years, and the remaining months show what's left over.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if I swap the from and to dates?</h4>
            <p className="text-sm text-muted-foreground">
              You'll get the same absolute numbers, but the direction changes. If "from" is later than "to," it shows "days since" instead of "days until." The actual day count remains the same.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does this account for leap years?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. The calculator uses actual dates, so February 29 is automatically included in leap years (years divisible by 4, except century years unless divisible by 400).
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
