"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DateArithmeticCalculator() {
  const [startDate, setStartDate] = useState("");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [value, setValue] = useState<number>(0);
  const [unit, setUnit] = useState<"days" | "weeks" | "months" | "years">("days");
  const [result, setResult] = useState<Date | null>(null);
  const [error, setError] = useState("");

  const calculateDate = () => {
    if (!startDate) {
      setError("Please enter a start date");
      setResult(null);
      return;
    }

    try {
      const start = new Date(startDate);
      if (isNaN(start.getTime())) {
        setError("Invalid date format");
        setResult(null);
        return;
      }

      const resultDate = new Date(start);
      const multiplier = operation === "add" ? 1 : -1;

      switch (unit) {
        case "days":
          resultDate.setDate(resultDate.getDate() + (value * multiplier));
          break;
        case "weeks":
          resultDate.setDate(resultDate.getDate() + (value * 7 * multiplier));
          break;
        case "months":
          resultDate.setMonth(resultDate.getMonth() + (value * multiplier));
          break;
        case "years":
          resultDate.setFullYear(resultDate.getFullYear() + (value * multiplier));
          break;
      }

      setResult(resultDate);
      setError("");
    } catch (e) {
      setError("Error calculating date. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setStartDate("");
    setValue(0);
    setResult(null);
    setError("");
  };

  const loadExample = (type: string) => {
    const today = new Date();
    const examples: Record<string, { date: string; value: number; op: "add" | "subtract"; unit: "days" | "weeks" | "months" | "years" }> = {
      month: { 
        date: today.toISOString().split("T")[0], 
        value: 30, op: "add", unit: "days" 
      },
      quarter: { 
        date: today.toISOString().split("T")[0], 
        value: 90, op: "add", unit: "days" 
      },
      year: { 
        date: today.toISOString().split("T")[0], 
        value: 1, op: "add", unit: "years" 
      },
      weeks: { 
        date: today.toISOString().split("T")[0], 
        value: 12, op: "add", unit: "weeks" 
      },
      months: { 
        date: today.toISOString().split("T")[0], 
        value: 6, op: "add", unit: "months" 
      },
      past: { 
        date: today.toISOString().split("T")[0], 
        value: 365, op: "subtract", unit: "days" 
      },
      retirement: { 
        date: today.toISOString().split("T")[0], 
        value: 30, op: "add", unit: "years" 
      }
    };
    const ex = examples[type] || examples.month;
    setStartDate(ex.date);
    setValue(ex.value);
    setOperation(ex.op);
    setUnit(ex.unit);
    setResult(null);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getDayDifference = (): number => {
    if (!result) return 0;
    const start = new Date(startDate);
    const diffTime = result.getTime() - start.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Date Arithmetic Calculator – Add or Subtract Days, Weeks, Months, Years</h1>
        <p className="text-muted-foreground">
          Add or subtract time from any date with our free online date arithmetic calculator. Calculate future or past dates by adding/subtracting days, weeks, months, or years.
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
            <Label>Operation</Label>
            <Select value={operation} onValueChange={(v) => setOperation(v as "add" | "subtract")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add (+)</SelectItem>
                <SelectItem value="subtract">Subtract (-)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Value</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value) || 0)}
              min="0"
              placeholder="Enter number"
            />
          </div>
          <div>
            <Label>Unit</Label>
            <Select value={unit} onValueChange={(v) => setUnit(v as "days" | "weeks" | "months" | "years")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="days">Days</SelectItem>
                <SelectItem value="weeks">Weeks</SelectItem>
                <SelectItem value="months">Months</SelectItem>
                <SelectItem value="years">Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculateDate}>Calculate Date</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("month")}>+30 Days</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("quarter")}>+90 Days</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("weeks")}>+12 Weeks</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("months")}>+6 Months</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("year")}>+1 Year</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("past")}>-365 Days</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("retirement")}>+30 Years</Button>
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
                Result Date
              </p>
              <p className="text-3xl font-bold text-primary">{formatDate(result)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {result.toISOString().split("T")[0]}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <p className="text-2xl font-bold">{getDayDifference()}</p>
                <p className="text-sm text-muted-foreground">Days Difference</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-2xl font-bold">{Math.floor(Math.abs(getDayDifference()) / 7)}</p>
                <p className="text-sm text-muted-foreground">Weeks Difference</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-2xl font-bold">{result.toLocaleDateString("en-US", { weekday: "long" })}</p>
                <p className="text-sm text-muted-foreground">Day of Week</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Calculation Summary</h4>
              <p className="text-sm text-muted-foreground">
                {operation === "add" ? "Added" : "Subtracted"} {value} {unit} {operation === "add" ? "to" : "from"} {new Date(startDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Date Arithmetic</h2>
        <p className="text-muted-foreground">
          Date arithmetic is the math of adding and subtracting time from dates. It sounds simple, but dates are surprisingly tricky. Months have different lengths (28, 29, 30, or 31 days). Years can be 365 or 366 days (leap years). And what does "one month from January 31" even mean? February doesn't have 31 days.
        </p>
        <p className="text-muted-foreground">
          This calculator handles all these edge cases correctly. Adding months adjusts the month number and handles year rollovers. Adding years accounts for leap years. Adding days simply counts forward or backward on the calendar.
        </p>
        <p className="text-muted-foreground">
          Date arithmetic is essential for calculating deadlines, project timelines, loan maturities, contract expirations, and planning future events. Whether you're figuring out when a 90-day warranty expires or what date you'll retire, date arithmetic gives you the answer.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Date Arithmetic Rules</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Adding Days and Weeks</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Days</div>
                <div className="text-muted-foreground">Simply count forward (or backward) on the calendar. 30 days from March 15 is April 14.</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Weeks</div>
                <div className="text-muted-foreground">Multiply by 7, then add days. 4 weeks from any date is exactly 28 days later, same day of week.</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Key Fact</div>
                <div className="text-muted-foreground">Adding 7 days always gives the same day of the week. Add 7 to Tuesday, get Tuesday.</div>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Adding Months and Years</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Months</div>
                <div className="text-muted-foreground">Add to the month number. 3 months from March is June. If the day doesn't exist in the target month, use the last day.</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Years</div>
                <div className="text-muted-foreground">Add to the year number. 1 year from Feb 29, 2024 (leap year) is Feb 28, 2025 (not a leap year).</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Edge Case</div>
                <div className="text-muted-foreground">Jan 31 + 1 month = Feb 28 (or 29). There's no Feb 31, so we use the month's last day.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-3">Month Length Reference</h3>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2 text-sm">
            <div className="p-2 border rounded text-center">
              <div className="font-semibold">Jan</div>
              <div className="text-muted-foreground">31</div>
            </div>
            <div className="p-2 border rounded text-center">
              <div className="font-semibold">Feb</div>
              <div className="text-muted-foreground">28/29</div>
            </div>
            <div className="p-2 border rounded text-center">
              <div className="font-semibold">Mar</div>
              <div className="text-muted-foreground">31</div>
            </div>
            <div className="p-2 border rounded text-center">
              <div className="font-semibold">Apr</div>
              <div className="text-muted-foreground">30</div>
            </div>
            <div className="p-2 border rounded text-center">
              <div className="font-semibold">May</div>
              <div className="text-muted-foreground">31</div>
            </div>
            <div className="p-2 border rounded text-center">
              <div className="font-semibold">Jun</div>
              <div className="text-muted-foreground">30</div>
            </div>
            <div className="p-2 border rounded text-center">
              <div className="font-semibold">Jul</div>
              <div className="text-muted-foreground">31</div>
            </div>
            <div className="p-2 border rounded text-center">
              <div className="font-semibold">Aug</div>
              <div className="text-muted-foreground">31</div>
            </div>
            <div className="p-2 border rounded text-center">
              <div className="font-semibold">Sep</div>
              <div className="text-muted-foreground">30</div>
            </div>
            <div className="p-2 border rounded text-center">
              <div className="font-semibold">Oct</div>
              <div className="text-muted-foreground">31</div>
            </div>
            <div className="p-2 border rounded text-center">
              <div className="font-semibold">Nov</div>
              <div className="text-muted-foreground">30</div>
            </div>
            <div className="p-2 border rounded text-center">
              <div className="font-semibold">Dec</div>
              <div className="text-muted-foreground">31</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Memory aid: "Thirty days hath September, April, June, and November. All the rest have thirty-one. Except February alone..."
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Worked Examples</h2>
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 1: Project Deadline</h3>
            <p className="text-sm text-muted-foreground mb-3">A project starts on March 15, 2025 and runs for 90 days. When is the deadline?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Start Date:</strong> March 15, 2025</div>
              <div><strong>Duration:</strong> 90 days</div>
              <div className="pt-2 border-t">
                <div>March has 31 days: 31 - 15 = 16 days remaining in March</div>
                <div>April has 30 days: 90 - 16 = 74, then 74 - 30 = 44 remaining</div>
                <div>May has 31 days: 44 - 31 = 13 remaining</div>
                <div>June: Day 13</div>
              </div>
              <div className="font-semibold mt-2">
                Deadline: June 13, 2025
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 2: Contract Expiration</h3>
            <p className="text-sm text-muted-foreground mb-3">A 2-year contract starts on July 1, 2024. When does it expire?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Start Date:</strong> July 1, 2024</div>
              <div><strong>Duration:</strong> 2 years</div>
              <div className="pt-2 border-t font-mono">
                July 1, 2024 + 2 years = July 1, 2026
              </div>
              <div className="text-muted-foreground">
                Adding years is straightforward – just add to the year number. The month and day stay the same.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 3: Month-End Edge Case</h3>
            <p className="text-sm text-muted-foreground mb-3">What date is 1 month after January 31, 2025?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Start Date:</strong> January 31, 2025</div>
              <div><strong>Duration:</strong> 1 month</div>
              <div className="pt-2 border-t">
                <div>January 31 + 1 month would be February 31...</div>
                <div>But February 2025 only has 28 days!</div>
              </div>
              <div className="font-semibold mt-2">
                Result: February 28, 2025 (last day of February)
              </div>
              <div className="text-muted-foreground">
                When the target month doesn't have the same day number, we use the month's last day.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 4: Leap Year Birthday</h3>
            <p className="text-sm text-muted-foreground mb-3">Someone born on February 29, 2020 – when is their next birthday in a non-leap year?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Birth Date:</strong> February 29, 2020 (leap year)</div>
              <div><strong>Next birthday:</strong> February 29, 2024 (next leap year)</div>
              <div className="pt-2 border-t">
                <div>2021: Not a leap year → February 28, 2021</div>
                <div>2022: Not a leap year → February 28, 2022</div>
                <div>2023: Not a leap year → February 28, 2023</div>
                <div>2024: Leap year → February 29, 2024 ✓</div>
              </div>
              <div className="text-muted-foreground">
                People born on February 29 typically celebrate on February 28 in non-leap years.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 5: Retirement Planning</h3>
            <p className="text-sm text-muted-foreground mb-3">If you're 35 years old today (January 15, 2025), when will you turn 65?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Current Date:</strong> January 15, 2025</div>
              <div><strong>Years to add:</strong> 65 - 35 = 30 years</div>
              <div className="pt-2 border-t font-mono">
                January 15, 2025 + 30 years = January 15, 2055
              </div>
              <div className="text-muted-foreground">
                You'll turn 65 and reach traditional retirement age on January 15, 2055.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Quick Fact</h2>
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm">
            <strong>The Gregorian Calendar</strong> we use today was introduced by Pope Gregory XIII in 1582 to fix drift in the Julian calendar. The Julian calendar added a leap day every 4 years, but this was slightly too frequent. The Gregorian system skips leap years on century years not divisible by 400 (so 1900 wasn't a leap year, but 2000 was). This gives an average year length of 365.2425 days, accurate to within 1 day every 3,300 years. The calendar was adopted at different times worldwide – Greece didn't switch until 1923! When switching, countries had to skip 10-13 days to realign with the seasons.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-2">How do you determine if a year is a leap year?</h3>
            <p className="text-sm text-muted-foreground">
              A year is a leap year if: (1) it's divisible by 4, AND (2) if it's a century year (ending in 00), it must also be divisible by 400. So 2024 is a leap year (divisible by 4). 1900 was NOT a leap year (century year, not divisible by 400). 2000 WAS a leap year (century year, divisible by 400).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What happens when adding months to a month-end date?</h3>
            <p className="text-sm text-muted-foreground">
              If you add months to January 31, you get the last day of the target month. Jan 31 + 1 month = Feb 28 (or 29). Jan 31 + 2 months = Mar 31. This "end-of-month preservation" rule ensures consistent behavior for month-end dates.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Why is date arithmetic important for finance?</h3>
            <p className="text-sm text-muted-foreground">
              Loans, bonds, and derivatives all have maturity dates calculated from issue dates. Interest accrues over specific day counts. Payment schedules are often "monthly on the 15th" or "quarterly." Getting date arithmetic wrong can mean millions in mispriced contracts or missed payments.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What's the difference between business days and calendar days?</h3>
            <p className="text-sm text-muted-foreground">
              Calendar days count every day. Business days typically exclude weekends (Saturday and Sunday) and sometimes holidays. A 30-day deadline means 30 calendar days. A "30 business day" deadline is actually about 6 weeks in calendar time. This calculator uses calendar days.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How accurate is adding "1 month"?</h3>
            <p className="text-sm text-muted-foreground">
              Adding 1 month means adding 1 to the month number, not adding 30 days. January 15 + 1 month = February 15 (28-31 days depending on the year). This matches how we naturally think about months – "one month from today" means the same day next month, not exactly 30 days.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Can I calculate dates far in the past or future?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but with caveats. The Gregorian calendar rules apply proleptically (extended backward) for dates before 1582, even though the calendar didn't exist then. For very distant future dates, remember that calendar reform could happen. For most practical purposes (centuries in either direction), this calculator is accurate.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What day of the week will a future date fall on?</h3>
            <p className="text-sm text-muted-foreground">
              This calculator shows the day of the week for your result date. The pattern repeats every 400 years in the Gregorian calendar. A useful fact: the same calendar (same dates falling on same weekdays) repeats every 28 years for non-century years, or you can use the "Doomsday algorithm" to calculate mentally.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
